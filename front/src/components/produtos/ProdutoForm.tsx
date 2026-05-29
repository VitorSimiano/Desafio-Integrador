"use client";

import { useEffect, useState } from "react";

import {
  Produto,
  ProdutoFormData,
} from "../../types/produto";

import { buscarCategorias } from "../../services/categoria.service";

interface Props {
  initialData?: Produto;
  onSubmit: (
    data: ProdutoFormData
  ) => Promise<void>;
  onCancel?: () => void;
}

export function ProdutoForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [categorias, setCategorias] =
    useState<any[]>([]);

  const [form, setForm] =
    useState<ProdutoFormData>({
      nome: initialData?.nome || "",
      preco: initialData?.preco || 0,
      estoque: initialData?.estoque || 0,
      categoriaId:
        initialData?.categoria?.id,
    });

  const [loading, setLoading] =
    useState(false);

  async function carregarCategorias() {
    const data = await buscarCategorias();
    setCategorias(data);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "preco" ||
        name === "estoque" ||
        name === "categoriaId"
          ? Number(value)
          : value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!form.nome) {
      alert("Nome obrigatório");
      return;
    }

    if (form.preco <= 0) {
      alert(
        "Preço deve ser maior que zero"
      );

      return;
    }

    if (form.estoque < 0) {
      alert(
        "Estoque não pode ser negativo"
      );

      return;
    }

    try {
      setLoading(true);

      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold">
        {initialData
          ? "Editar Produto"
          : "Novo Produto"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="estoque"
          placeholder="Estoque"
          value={form.estoque}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <select
          name="categoriaId"
          value={form.categoriaId || ""}
          onChange={handleChange}
          className="border rounded-xl p-3"
        >
          <option value="">
            Sem categoria
          </option>

          {categorias.map((categoria) => (
            <option
              key={categoria.id}
              value={categoria.id}
            >
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl px-6 py-3 font-semibold"
        >
          {loading
            ? "Salvando..."
            : "Salvar"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-200 hover:bg-slate-300 transition rounded-xl px-6 py-3 font-semibold"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}