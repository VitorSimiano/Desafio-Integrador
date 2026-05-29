export interface RelatorioItem {
  nome: string;
  total: number;
}

export interface ClienteResumo {
  cliente: string;
  totalPedidos: number;
  totalGasto: number;
}

export interface HistoricoCliente {
  cliente: string;
  quantidadeCompras: number;
}

export interface TempoCompra {
  cliente: string;
  mediaDias: number;
}