import { ChurnCliente } from "../../types/churn";
import { RiskBadge } from "./RiskBadge";

interface Props {
  clientes: ChurnCliente[];
}

export function ChurnTable({ clientes }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Risco</th>
            <th className="text-left p-4">Probabilidade</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr
              key={cliente.clienteId}
              className="border-t border-slate-200"
            >
              <td className="p-4 font-medium">
                {cliente.nome}
              </td>

              <td className="p-4">
                <RiskBadge
                  probability={cliente.probabilidade}
                />
              </td>

              <td className="p-4">
                {(cliente.probabilidade * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}