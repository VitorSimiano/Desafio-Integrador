import { Cliente } from "../../types/cliente";
import { ClienteActions } from "./ClienteActions";

interface Props {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
}

export function ClienteTable({
  clientes,
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
              E-mail
            </th>

            <th className="text-left p-4">
              Cidade
            </th>

            <th className="text-left p-4">
              Estado
            </th>

            <th className="text-left p-4">
              País
            </th>

            <th className="text-left p-4">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr
              key={cliente.id}
              className="border-t"
            >
              <td className="p-4 font-medium">
                {cliente.nome}
              </td>

              <td className="p-4">
                {cliente.email}
              </td>

              <td className="p-4">
                {cliente.cidade}
              </td>

              <td className="p-4">
                {cliente.estado}
              </td>

              <td className="p-4">
                {cliente.pais}
              </td>

              <td className="p-4">
                <ClienteActions
                  onEdit={() =>
                    onEdit(cliente)
                  }
                  onDelete={() =>
                    onDelete(cliente.id)
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