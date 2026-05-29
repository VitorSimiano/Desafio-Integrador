"use client";

import { useEffect, useState } from "react";

import { Categoria } from "../../types/categoria";

import {
  criarCategoria,
  deletarCategoria,
  listarCategorias,
} from "../../services/categoria.service";
import { CategoriaForm } from "../../components/categorias/CategoriaForm";
import { CategoriaList } from "../../components/categorias/CategoriaList";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarCategorias() {
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(nome: string) {
    await criarCategoria(nome);
    carregarCategorias();
  }

  async function handleDelete(id: number) {
    await deletarCategoria(id);
    carregarCategorias();
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Categorias
          </h1>

          <p className="text-slate-500">
            Gerencie as categorias do sistema.
          </p>
        </div>

        <CategoriaForm onCreate={handleCreate} />

        {loading ? (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            Carregando...
          </div>
        ) : (
          <CategoriaList
            categorias={categorias}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}