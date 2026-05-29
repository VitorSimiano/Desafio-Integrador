"use client";

import { useEffect, useState } from "react";

import {
  Produto,
  ProdutoFormData,
} from "../../types/produto";

import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../../services/produto.service";

import { ProdutoForm } from "../../components/produtos/ProdutoForm";
import { ProdutoTable } from "../../components/produtos/ProdutoTable";
import { ProdutoStats } from "../../components/produtos/ProdutoStats";

export default function ProdutosPage() {
  const [produtos, setProdutos] =
    useState<Produto[]>([]);

  const [editingProduto, setEditingProduto] =
    useState<Produto | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function carregarProdutos() {
    try {
      const data = await listarProdutos();
      setProdutos(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(
    data: ProdutoFormData
  ) {
    await criarProduto(data);

    carregarProdutos();
  }

  async function handleUpdate(
    data: ProdutoFormData
  ) {
    if (!editingProduto) return;

    await atualizarProduto(
      editingProduto.id,
      data
    );

    setEditingProduto(null);

    carregarProdutos();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Deseja remover este produto?"
    );

    if (!confirmDelete) return;

    await deletarProduto(id);

    carregarProdutos();
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const valorTotal = produtos.reduce(
    (acc, produto) =>
      acc +
      produto.preco * produto.estoque,
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Produtos
          </h1>

          <p className="text-slate-500">
            Gestão de produtos do sistema.
          </p>
        </div>

        <ProdutoStats
          totalProdutos={produtos.length}
          valorTotal={valorTotal}
        />

        <ProdutoForm
          initialData={
            editingProduto || undefined
          }
          onSubmit={
            editingProduto
              ? handleUpdate
              : handleCreate
          }
          onCancel={() =>
            setEditingProduto(null)
          }
        />

        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            Carregando...
          </div>
        ) : (
          <ProdutoTable
            produtos={produtos}
            onEdit={setEditingProduto}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}