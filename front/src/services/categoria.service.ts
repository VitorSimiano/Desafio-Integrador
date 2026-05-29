import { api } from "../lib/api";
import { Categoria } from "../types/categoria";

export const listarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/categorias");
  return response.data;
};

export const criarCategoria = async (nome: string) => {
  const response = await api.post("/categorias", { nome });
  return response.data;
};

export const deletarCategoria = async (id: number) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};

export const buscarCategorias = async () => {
  const response = await api.get("/categorias");
  return response.data;
};