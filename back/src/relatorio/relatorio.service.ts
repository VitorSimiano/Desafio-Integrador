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
}