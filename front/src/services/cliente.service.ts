import { api } from "../lib/api";
import { ClienteFormData } from "../types/cliente";

export async function listarClientes() {
  const response = await api.get("/clientes");
  return response.data;
}

export async function buscarCliente(id: number) {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
}

export async function criarCliente(
  data: ClienteFormData
) {
  const response = await api.post("/clientes", data);
  return response.data;
}

export async function atualizarCliente(
  id: number,
  data: ClienteFormData
) {
  const response = await api.put(
    `/clientes/${id}`,
    data
  );

  return response.data;
}

export async function deletarCliente(id: number) {
  const response = await api.delete(
    `/clientes/${id}`
  );

  return response.data;
}