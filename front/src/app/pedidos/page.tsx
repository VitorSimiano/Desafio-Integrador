"use client";

import { useEffect, useState } from "react";

import {
  criarPedido,
  deletarPedido,
  listarPedidos,
} from "../../services/pedido.service";

import { Pedido } from "../../types/pedido";

import { PedidoForm } from "../../components/pedidos/PedidoForm";
import { PedidoTable } from "../../components/pedidos/PedidoTable";

export default function PedidosPage() {
  const [pedidos, setPedidos] =
    useState<Pedido[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function carregarPedidos() {
    try {
      const data = await listarPedidos();
      setPedidos(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: any) {
    await criarPedido(data);

    carregarPedidos();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Deseja remover o pedido?"
    );

    if (!confirmDelete) return;

    await deletarPedido(id);

    carregarPedidos();
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Pedidos
          </h1>

          <p className="text-slate-500">
            Gestão de pedidos do sistema.
          </p>
        </div>

        <PedidoForm onSubmit={handleCreate} />

        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            Carregando...
          </div>
        ) : (
          <PedidoTable
            pedidos={pedidos}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}