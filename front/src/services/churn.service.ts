import { api } from "../lib/api";

export async function preverTodosClientes() {
  const response = await api.get("/churn/todos");
  return response.data;
}

export async function preverCliente(id: number) {
  const response = await api.get(`/churn/cliente/${id}`);
  return response.data;
}

export async function scoringClientes() {
  const response = await api.get("/churn/scoring");
  return response.data;
}