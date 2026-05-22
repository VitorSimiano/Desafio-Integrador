import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreatePedidoDto) {
    // Verifica se o cliente existe
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: dto.clienteId },
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    // Verifica se todos os produtos existem
    for (const item of dto.itens) {
      const produto = await this.prisma.produto.findUnique({
        where: { id: item.produtoId },
      });
      if (!produto) {
        throw new NotFoundException(`Produto #${item.produtoId} não encontrado`);
      }
    }

    // Cria o pedido junto com os itens de uma vez
    return this.prisma.pedido.create({
      data: {
        clienteId: dto.clienteId,
        categoriaId: dto.categoriaId,
        itens: {
          create: dto.itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
          })),
        },
      },
      include: {
        itens: true,
        cliente: true,
      },
    });
  }

  async listarTodos() {
    return this.prisma.pedido.findMany({
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });
  }

  async buscarPorId(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    if (!pedido) throw new NotFoundException(`Pedido #${id} não encontrado`);

    return pedido;
  }

  async remover(id: number) {
    await this.buscarPorId(id);

    // Deleta os itens primeiro, depois o pedido
    await this.prisma.itemPedido.deleteMany({
      where: { pedidoId: id },
    });

    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}