export interface Cliente {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface ClienteFormData {
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  pais: string;
}