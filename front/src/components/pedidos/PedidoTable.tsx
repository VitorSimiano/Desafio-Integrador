import { Pedido } from "../../types/pedido";
import { PedidoCard } from "./PedidoCard";

interface Props {
  pedidos: Pedido[];
  onDelete: (id: number) => void;
}

export function PedidoTable({
  pedidos,
  onDelete,
}: Props) {
  if (!pedidos.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {pedidos.map((pedido) => (
        <PedidoCard
          key={pedido.id}
          pedido={pedido}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
