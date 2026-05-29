import { api } from "../lib/api";
import { CreatePedidoData } from "../types/pedido";

export async function listarPedidos() {
  const response = await api.get("/pedidos");
  return response.data;
}

export async function buscarPedido(id: number) {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
}

export async function criarPedido(
  data: CreatePedidoData
) {
  const response = await api.post(
    "/pedidos",
    data
  );

  return response.data;
}

export async function deletarPedido(id: number) {
  const response = await api.delete(
    `/pedidos/${id}`
  );

  return response.data;
}