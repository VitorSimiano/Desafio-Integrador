export interface PedidoProduto {
  produtoId: number;
  quantidade: number;
}

export interface CreatePedidoData {
  clienteId: number;
  categoriaId?: number;
  produtos: PedidoProduto[];
}

export interface Pedido {
  id: number;

  cliente: {
    id: number;
    nome: string;
  };

  categoria?: {
    id: number;
    nome: string;
  };

  produtos: {
    produto: {
      id: number;
      nome: string;
      preco: number;
    };

    quantidade: number;
  }[];

  total: number;
}