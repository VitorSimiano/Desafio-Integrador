import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: {
        nome: dto.nome as string,
        preco: dto.preco as number,
        estoque: dto.estoque as number,
        categoriaId: dto.categoriaId,
      },
    });
  }

  async listarTodos() {
    return this.prisma.produto.findMany({
      include: { categoria: true },
    });
  }

  async buscarPorId(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });
    if (!produto) throw new NotFoundException(`Produto #${id} não encontrado`);
    return produto;
  }

  async atualizar(id: number, dto: UpdateProdutoDto) {
    await this.buscarPorId(id);
    return this.prisma.produto.update({
      where: { id },
      data: dto,
    });
  }

  async remover(id: number) {
    await this.buscarPorId(id);
    return this.prisma.produto.delete({ where: { id } });
  }
}