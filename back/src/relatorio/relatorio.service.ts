import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RelatorioService {
  constructor(private readonly prisma: PrismaService) {}

  // Quantidade de pedidos agrupados por estado do cliente
  async vendasPorEstado() {
    const resultado = await this.prisma.pedido.groupBy({
      by: ['clienteId'],
      _count: { id: true },
    });

    const pedidosComCliente = await this.prisma.pedido.findMany({
      include: { cliente: true },
    });

    const porEstado: Record<string, number> = {};
    for (const pedido of pedidosComCliente) {
      const estado = pedido.cliente.estado;
      porEstado[estado] = (porEstado[estado] || 0) + 1;
    }

    return Object.entries(porEstado).map(([estado, total]) => ({
      estado,
      total,
    }));
  }

  // Quantidade de pedidos agrupados por cidade do cliente
  async vendasPorCidade() {
    const pedidos = await this.prisma.pedido.findMany({
      include: { cliente: true },
    });

    const porCidade: Record<string, number> = {};
    for (const pedido of pedidos) {
      const cidade = pedido.cliente.cidade;
      porCidade[cidade] = (porCidade[cidade] || 0) + 1;
    }

    return Object.entries(porCidade).map(([cidade, total]) => ({
      cidade,
      total,
    }));
  }

  // Quantidade de pedidos agrupados por país do cliente
  async vendasPorPais() {
    const pedidos = await this.prisma.pedido.findMany({
      include: { cliente: true },
    });

    const porPais: Record<string, number> = {};
    for (const pedido of pedidos) {
      const pais = pedido.cliente.pais;
      porPais[pais] = (porPais[pais] || 0) + 1;
    }

    return Object.entries(porPais).map(([pais, total]) => ({
      pais,
      total,
    }));
  }

  // Top 10 clientes que mais fizeram pedidos
  async topClientes() {
    const pedidos = await this.prisma.pedido.findMany({
      include: { cliente: true },
    });

    const porCliente: Record<number, { nome: string; total: number }> = {};
    for (const pedido of pedidos) {
      const id = pedido.cliente.id;
      if (!porCliente[id]) {
        porCliente[id] = { nome: pedido.cliente.nome, total: 0 };
      }
      porCliente[id].total += 1;
    }

    return Object.values(porCliente)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }

  // Produto com maior quantidade total vendida
  async produtoMaisVendido() {
    const itens = await this.prisma.itemPedido.findMany({
      include: { produto: true },
    });

    const porProduto: Record<number, { nome: string; quantidade: number }> = {};
    for (const item of itens) {
      const id = item.produto.id;
      if (!porProduto[id]) {
        porProduto[id] = { nome: item.produto.nome, quantidade: 0 };
      }
      porProduto[id].quantidade += item.quantidade;
    }

    return Object.values(porProduto)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 10);
  }

  // Produto com maior valor total gerado (preço x quantidade vendida)
  async produtoMaiorValor() {
    const itens = await this.prisma.itemPedido.findMany({
      include: { produto: true },
    });

    const porProduto: Record<number, { nome: string; valorTotal: number }> = {};
    for (const item of itens) {
      const id = item.produto.id;
      if (!porProduto[id]) {
        porProduto[id] = { nome: item.produto.nome, valorTotal: 0 };
      }
      porProduto[id].valorTotal += item.produto.preco * item.quantidade;
    }

    return Object.values(porProduto)
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 10);
  }

async clientesComResumo() {
  const clientes = await this.prisma.cliente.findMany({
    include: {
      pedidos: {
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      },
    },
  });

  return clientes.map((cliente) => {
    const totalPedidos = cliente.pedidos.length;

    const valorTotalGasto = cliente.pedidos.reduce((totalPedido, pedido) => {
      const valorPedido = pedido.itens.reduce((totalItem, item) => {
        return totalItem + item.produto.preco * item.quantidade;
      }, 0);
      return totalPedido + valorPedido;
    }, 0);

    const ultimoPedido = cliente.pedidos.sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    )[0];

    const diasSemComprar = ultimoPedido
      ? Math.floor(
          (new Date().getTime() - new Date(ultimoPedido.criadoEm).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cidade: cliente.cidade,
      estado: cliente.estado,
      pais: cliente.pais,
      totalPedidos,
      valorTotalGasto: Number(valorTotalGasto.toFixed(2)),
      diasSemComprar,
    };
  });
}
// Histórico de compras por cliente — quando e quanto comprou
async historicoPorCliente() {
  const clientes = await this.prisma.cliente.findMany({
    include: {
      pedidos: {
        orderBy: { criadoEm: 'asc' },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      },
    },
  });

  return clientes.map((cliente) => {
    const historico = cliente.pedidos.map((pedido) => {
      const valorPedido = pedido.itens.reduce((total, item) => {
        return total + item.produto.preco * item.quantidade;
      }, 0);

      return {
        pedidoId: pedido.id,
        data: pedido.criadoEm,
        valorTotal: Number(valorPedido.toFixed(2)),
        quantidadeItens: pedido.itens.length,
      };
    });

    return {
      clienteId: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      totalPedidos: cliente.pedidos.length,
      historico,
    };
  });
}

// Tempo médio entre pedidos por cliente — base para calcular churn
async tempoMedioEntreCompras() {
  const clientes = await this.prisma.cliente.findMany({
    include: {
      pedidos: {
        orderBy: { criadoEm: 'asc' },
      },
    },
  });

  return clientes.map((cliente) => {
    const pedidos = cliente.pedidos;

    // Cliente com menos de 2 pedidos não tem intervalo calculável
    if (pedidos.length < 2) {
      return {
        clienteId: cliente.id,
        nome: cliente.nome,
        totalPedidos: pedidos.length,
        tempoMedioDias: null,
        risco: 'sem dados suficientes',
      };
    }

    // Calcula intervalo em dias entre cada pedido consecutivo
    const intervalos: number[] = [];
    for (let i = 1; i < pedidos.length; i++) {
      const anterior = new Date(pedidos[i - 1].criadoEm).getTime();
      const atual = new Date(pedidos[i].criadoEm).getTime();
      const dias = Math.floor((atual - anterior) / (1000 * 60 * 60 * 24));
      intervalos.push(dias);
    }

    const tempoMedioDias = Math.floor(
      intervalos.reduce((a, b) => a + b, 0) / intervalos.length
    );

    // Último pedido
    const ultimoPedido = pedidos[pedidos.length - 1];
    const diasSemComprar = Math.floor(
      (new Date().getTime() - new Date(ultimoPedido.criadoEm).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Classifica risco de churn
    let risco = 'baixo';
    if (diasSemComprar > tempoMedioDias * 2) risco = 'alto';
    else if (diasSemComprar > tempoMedioDias * 1.5) risco = 'médio';

    return {
      clienteId: cliente.id,
      nome: cliente.nome,
      totalPedidos: pedidos.length,
      tempoMedioDias,
      diasSemComprar,
      risco,
    };
  });
}
}