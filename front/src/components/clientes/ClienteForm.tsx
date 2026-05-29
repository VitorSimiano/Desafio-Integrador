"use client";

import { useState } from "react";
import {
  Cliente,
  ClienteFormData,
} from "../../types/cliente";

interface Props {
  initialData?: Cliente;
  onSubmit: (
    data: ClienteFormData
  ) => Promise<void>;
  onCancel?: () => void;
}

export function ClienteForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] =
    useState<ClienteFormData>({
      nome: initialData?.nome || "",
      email: initialData?.email || "",
      cidade: initialData?.cidade || "",
      estado: initialData?.estado || "",
      pais: initialData?.pais || "",
    });

  const [loading, setLoading] =
    useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !form.nome ||
      !form.email ||
      !form.cidade ||
      !form.estado ||
      !form.pais
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("E-mail inválido");
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
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        {initialData
          ? "Editar Cliente"
          : "Novo Cliente"}
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
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="estado"
          placeholder="Estado"
          value={form.estado}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="pais"
          placeholder="País"
          value={form.pais}
          onChange={handleChange}
          className="border rounded-xl p-3 md:col-span-2"
        />
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