import { Produto } from "../../types/produto";
import { ProdutoActions } from "./ProdutoActions";

interface Props {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
}

export function ProdutoTable({
  produtos,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">
              Nome
            </th>

            <th className="text-left p-4">
              Preço
            </th>

            <th className="text-left p-4">
              Estoque
            </th>

            <th className="text-left p-4">
              Categoria
            </th>

            <th className="text-left p-4">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr
              key={produto.id}
              className="border-t"
            >
              <td className="p-4 font-medium">
                {produto.nome}
              </td>

              <td className="p-4">
                R$ {produto.preco.toFixed(2)}
              </td>

              <td className="p-4">
                {produto.estoque}
              </td>

              <td className="p-4">
                {produto.categoria?.nome ||
                  "Sem categoria"}
              </td>

              <td className="p-4">
                <ProdutoActions
                  onEdit={() =>
                    onEdit(produto)
                  }
                  onDelete={() =>
                    onDelete(produto.id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}