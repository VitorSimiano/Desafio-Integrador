"use client";

import { useEffect, useState } from "react";

import {
  Cliente,
  ClienteFormData,
} from "../../types/cliente";

import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "../../services/cliente.service";

import { ClienteForm } from "../../components/clientes/ClienteForm";
import { ClienteTable } from "../../components/clientes/ClienteTable";

export default function ClientesPage() {
  const [clientes, setClientes] =
    useState<Cliente[]>([]);

  const [editingCliente, setEditingCliente] =
    useState<Cliente | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function carregarClientes() {
    try {
      const data = await listarClientes();
      setClientes(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(
    data: ClienteFormData
  ) {
    await criarCliente(data);

    carregarClientes();
  }

  async function handleUpdate(
    data: ClienteFormData
  ) {
    if (!editingCliente) return;

    await atualizarCliente(
      editingCliente.id,
      data
    );

    setEditingCliente(null);

    carregarClientes();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Deseja remover este cliente?"
    );

    if (!confirmDelete) return;

    await deletarCliente(id);

    carregarClientes();
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Clientes
          </h1>

          <p className="text-slate-500">
            Gerenciamento de clientes do sistema.
          </p>
        </div>

        <ClienteForm
          initialData={editingCliente || undefined}
          onSubmit={
            editingCliente
              ? handleUpdate
              : handleCreate
          }
          onCancel={() =>
            setEditingCliente(null)
          }
        />

        {loading ? (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            Carregando...
          </div>
        ) : (
          <ClienteTable
            clientes={clientes}
            onEdit={setEditingCliente}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}