import { Trash2 } from "lucide-react";
import { Pedido } from "../../types/pedido";

interface Props {
  pedido: Pedido;
  onDelete: (id: number) => void;
}

export function PedidoCard({
  pedido,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Pedido #{pedido.id}
          </h2>

          <p className="text-slate-500">
            Cliente: {pedido.cliente.nome}
          </p>
        </div>

        <button
          onClick={() => onDelete(pedido.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 />
        </button>
      </div>

      {pedido.categoria && (
        <div className="bg-slate-100 px-3 py-2 rounded-xl w-fit">
          {pedido.categoria.nome}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {pedido.produtos.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm"
          >
            <span>
              {item.produto.nome} x{" "}
              {item.quantidade}
            </span>

            <span>
              R${" "}
              {(
                item.produto.preco *
                item.quantidade
              ).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between font-bold text-lg">
        <span>Total</span>

        <span>
          R$ {pedido.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}