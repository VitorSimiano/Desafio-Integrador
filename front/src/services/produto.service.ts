import { api } from "../lib/api";
import { ProdutoFormData } from "../types/produto";

export async function listarProdutos() {
  const response = await api.get("/produtos");
  return response.data;
}

export async function buscarProduto(id: number) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}

export async function criarProduto(
  data: ProdutoFormData
) {
  const response = await api.post(
    "/produtos",
    data
  );

  return response.data;
}

export async function atualizarProduto(
  id: number,
  data: ProdutoFormData
) {
  const response = await api.put(
    `/produtos/${id}`,
    data
  );

  return response.data;
}

export async function deletarProduto(id: number) {
  const response = await api.delete(
    `/produtos/${id}`
  );

  return response.data;
}