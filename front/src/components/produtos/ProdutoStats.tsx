interface Props {
  totalProdutos: number;
  valorTotal: number;
}

export function ProdutoStats({
  totalProdutos,
  valorTotal,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-slate-500 text-sm">
          Total de Produtos
        </p>

        <h2 className="text-4xl font-bold text-slate-800">
          {totalProdutos}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-slate-500 text-sm">
          Valor Total em Estoque
        </p>

        <h2 className="text-4xl font-bold text-slate-800">
          R$ {valorTotal.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}