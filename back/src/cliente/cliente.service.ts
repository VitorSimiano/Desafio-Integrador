import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

 async criar(dto: CreateClienteDto) {
  const emailExiste = await this.prisma.cliente.findUnique({
    where: { email: dto.email },
  });

  if (emailExiste) {
    throw new ConflictException('Já existe um cliente com esse email');
  }

  return this.prisma.cliente.create({
    data: {
      nome: dto.nome as string,
      email: dto.email as string,
      cidade: dto.cidade as string,
      estado: dto.estado as string,
      pais: dto.pais as string,
    },
  });
}
  async buscarPorId(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente #${id} não encontrado`);
    }

    return cliente;
  }

  async atualizar(id: number, dto: UpdateClienteDto) {
    await this.buscarPorId(id); // já lança erro se não existir

    return this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remover(id: number) {
    await this.buscarPorId(id); // já lança erro se não existir

    return this.prisma.cliente.delete({
      where: { id },
    });
  }
  async listarTodos() {
  return this.prisma.cliente.findMany();
}
}