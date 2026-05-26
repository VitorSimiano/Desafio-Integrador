import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChurnService {
  constructor(
    private readonly http: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async preverChurnCliente(clienteId: number) {
    // Busca os dados do cliente no banco
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
      include: {
        pedidos: {
          include: {
            itens: {
              include: { produto: true },
            },
          },
        },
      },
    });

    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    // Calcula os dados necessários pro modelo
    const totalPedidos = cliente.pedidos.length;

    const valorTotalGasto = cliente.pedidos.reduce((total, pedido) => {
      return total + pedido.itens.reduce((t, item) => {
        return t + item.produto.preco * item.quantidade;
      }, 0);
    }, 0);

    const ultimoPedido = cliente.pedidos.sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    )[0];

    const diasSemComprar = ultimoPedido
      ? Math.floor(
          (new Date().getTime() - new Date(ultimoPedido.criadoEm).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 365;

    // Chama o Python
    const { data } = await firstValueFrom(
      this.http.post('http://localhost:8000/prever-churn', {
        total_pedidos: totalPedidos,
        valor_total_gasto: valorTotalGasto,
        dias_sem_comprar: diasSemComprar,
      }),
    );

    // Retorna tudo junto pro frontend
    return {
      clienteId: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      totalPedidos,
      valorTotalGasto: Number(valorTotalGasto.toFixed(2)),
      diasSemComprar,
      churn: data.churn,
      probabilidade: data.probabilidade,
      risco: data.risco,
    };
  }

  async preverChurnTodos() {
    const clientes = await this.prisma.cliente.findMany({
      include: {
        pedidos: {
          include: {
            itens: {
              include: { produto: true },
            },
          },
        },
      },
    });

    const resultados = await Promise.all(
      clientes.map((cliente) => this.preverChurnCliente(cliente.id))
    );

    return resultados.sort((a, b) => b.probabilidade - a.probabilidade);
  }
}