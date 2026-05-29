interface Props {
  total: number;
}

export function PedidoResumo({ total }: Props) {
  return (
    <div className="bg-green-100 text-green-700 rounded-2xl p-6">
      <p className="text-sm font-medium">
        Valor Total do Pedido
      </p>

      <h2 className="text-3xl font-bold">
        R$ {total.toFixed(2)}
      </h2>
    </div>
  );
}