"use client";

import { useEffect, useState } from "react";

import { listarClientes } from "../../services/cliente.service";
import { listarProdutos } from "../../services/produto.service";
import { buscarCategorias } from "../../services/categoria.service";
import { PedidoResumo } from "./PedidoResumo";

interface Props {
  onSubmit: (data: any) => Promise<void>;
}

export function PedidoForm({
  onSubmit,
}: Props) {
  const [clientes, setClientes] =
    useState<any[]>([]);

  const [produtos, setProdutos] =
    useState<any[]>([]);

  const [categorias, setCategorias] =
    useState<any[]>([]);

  const [clienteId, setClienteId] =
    useState("");

  const [categoriaId, setCategoriaId] =
    useState("");

  const [produtoId, setProdutoId] =
    useState("");

  const [quantidade, setQuantidade] =
    useState(1);

  const [itens, setItens] = useState<any[]>(
    []
  );

  async function carregarDados() {
    const clientesData =
      await listarClientes();

    const produtosData =
      await listarProdutos();

    const categoriasData =
      await buscarCategorias();

    setClientes(clientesData);
    setProdutos(produtosData);
    setCategorias(categoriasData);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function adicionarItem() {
    if (!produtoId) return;

    setItens([
      ...itens,
      {
        produtoId: Number(produtoId),
        quantidade,
      },
    ]);

    setProdutoId("");
    setQuantidade(1);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!clienteId || itens.length === 0) {
      alert(
        "Selecione cliente e produtos"
      );

      return;
    }

    await onSubmit({
      clienteId: Number(clienteId),
      categoriaId: categoriaId
        ? Number(categoriaId)
        : undefined,
      produtos: itens,
    });

    setItens([]);
  }

  const total = itens.reduce(
    (acc, item) => {
      const produto = produtos.find(
        (p) => p.id === item.produtoId
      );

      return (
        acc +
        produto.preco * item.quantidade
      );
    },
    0
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold">
        Novo Pedido
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <select
          value={clienteId}
          onChange={(e) =>
            setClienteId(e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option value="">
            Selecione o cliente
          </option>

          {clientes.map((cliente) => (
            <option
              key={cliente.id}
              value={cliente.id}
            >
              {cliente.nome}
            </option>
          ))}
        </select>

        <select
          value={categoriaId}
          onChange={(e) =>
            setCategoriaId(e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option value="">
            Categoria (Opcional)
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

      <div className="grid md:grid-cols-3 gap-4">
        <select
          value={produtoId}
          onChange={(e) =>
            setProdutoId(e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option value="">
            Produto
          </option>

          {produtos.map((produto) => (
            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.nome}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) =>
            setQuantidade(
              Number(e.target.value)
            )
          }
          className="border rounded-xl p-3"
        />

        <button
          type="button"
          onClick={adicionarItem}
          className="bg-slate-800 text-white rounded-xl"
        >
          Adicionar
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {itens.map((item, index) => {
          const produto = produtos.find(
            (p) => p.id === item.produtoId
          );

          return (
            <div
              key={index}
              className="flex justify-between bg-slate-100 p-3 rounded-xl"
            >
              <span>
                {produto?.nome} x{" "}
                {item.quantidade}
              </span>

              <span>
                R${" "}
                {(
                  produto?.preco *
                  item.quantidade
                ).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <PedidoResumo total={total} />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-3 font-semibold"
      >
        Criar Pedido
      </button>
    </form>
  );
}