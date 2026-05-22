import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreateCategoriaDto) {
    const existe = await this.prisma.categoria.findUnique({
      where: { nome: dto.nome },
    });

    if (existe) throw new ConflictException('Categoria já cadastrada');

    return this.prisma.categoria.create({ data: { nome: dto.nome as string } });
  }

  async listarTodos() {
    return this.prisma.categoria.findMany();
  }

  async buscarPorId(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException(`Categoria #${id} não encontrada`);
    return categoria;
  }

  async remover(id: number) {
    await this.buscarPorId(id);
    return this.prisma.categoria.delete({ where: { id } });
  }
}