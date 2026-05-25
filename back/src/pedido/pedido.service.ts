import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePedidoDto, CreateItemPedidoDto  } from './dto/create-pedido.dto';



@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

async criar(dto: CreatePedidoDto) {
  // Verifica se o cliente existe
  const cliente = await this.prisma.cliente.findUnique({
    where: { id: dto.clienteId },
  });
  if (!cliente) throw new NotFoundException('Cliente não encontrado');

  // Verifica produtos e estoque
  for (const item of dto.itens as CreateItemPedidoDto[]) {
    const produto = await this.prisma.produto.findUnique({
      where: { id: item.produtoId },
    });

    if (!produto) {
      throw new NotFoundException(`Produto #${item.produtoId} não encontrado`);
    }

    if (produto.estoque < Number(item.quantidade)) {
      throw new BadRequestException(
        `Produto "${produto.nome}" tem apenas ${produto.estoque} unidade(s) em estoque`
      );
    }
  }

  // Cria o pedido e já desconta o estoque
  const pedido = await this.prisma.pedido.create({
    data: {
      clienteId: dto.clienteId as number,
      categoriaId: dto.categoriaId,
      itens: {
        create: (dto.itens as CreateItemPedidoDto[]).map((item) => ({
          produtoId: item.produtoId as number,
          quantidade: item.quantidade as number,
        })),
      },
    },
    include: {
      itens: true,
      cliente: true,
    },
  });

  // Desconta o estoque de cada produto
  for (const item of dto.itens as CreateItemPedidoDto[]) {
    await this.prisma.produto.update({
      where: { id: item.produtoId as number },
      data: {
        estoque: {
          decrement: item.quantidade,
        },
      },
    });
  }

  return pedido;
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