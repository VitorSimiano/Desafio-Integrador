export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;

  categoria?: {
    id: number;
    nome: string;
  };
}

export interface ProdutoFormData {
  nome: string;
  preco: number;
  estoque: number;
  categoriaId?: number;
}