"use client";

import { useState } from "react";

interface Props {
  onCreate: (nome: string) => Promise<void>;
}

export function CategoriaForm({ onCreate }: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Nome obrigatório");
      return;
    }

    try {
      setLoading(true);
      await onCreate(nome);

      setNome("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Nova Categoria
      </h2>

      <input
        type="text"
        placeholder="Nome da categoria"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl p-3 font-semibold"
      >
        {loading ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}