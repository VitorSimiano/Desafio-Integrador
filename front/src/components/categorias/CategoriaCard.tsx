import { Trash2 } from "lucide-react";
import { Categoria } from "../../types/categoria";

interface Props {
  categoria: Categoria;
  onDelete: (id: number) => void;
}

export function CategoriaCard({ categoria, onDelete }: Props) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between">
      <div>
        <p className="font-bold text-slate-800">
          {categoria.nome}
        </p>

        <span className="text-sm text-slate-500">
          ID: {categoria.id}
        </span>
      </div>

      <button
        onClick={() => onDelete(categoria.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}