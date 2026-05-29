export interface ChurnCliente {
  clienteId: number;
  nome: string;
  churn: boolean;
  probabilidade: number;
}

export interface ScoringCliente {
  clienteId: number;
  nome: string;
  score: number;
}