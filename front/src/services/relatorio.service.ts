import { api } from "../lib/api";

export async function vendasPorEstado() {
  const response = await api.get(
    "/relatorios/vendas-por-estado"
  );

  return response.data;
}

export async function vendasPorCidade() {
  const response = await api.get(
    "/relatorios/vendas-por-cidade"
  );

  return response.data;
}

export async function vendasPorPais() {
  const response = await api.get(
    "/relatorios/vendas-por-pais"
  );

  return response.data;
}

export async function topClientes() {
  const response = await api.get(
    "/relatorios/top-clientes"
  );

  return response.data;
}

export async function produtoMaisVendido() {
  const response = await api.get(
    "/relatorios/produto-mais-vendido"
  );

  return response.data;
}

export async function produtoMaiorValor() {
  const response = await api.get(
    "/relatorios/produto-maior-valor"
  );

  return response.data;
}

export async function clientesResumo() {
  const response = await api.get(
    "/relatorios/clientes-resumo"
  );

  return response.data;
}

export async function historicoPorCliente() {
  const response = await api.get(
    "/relatorios/historico-por-cliente"
  );

  return response.data;
}

export async function tempoMedioCompras() {
  const response = await api.get(
    "/relatorios/tempo-medio-compras"
  );

  return response.data;
}