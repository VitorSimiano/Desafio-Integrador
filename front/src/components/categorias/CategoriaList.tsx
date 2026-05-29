import { Categoria } from "../../types/categoria";
import { CategoriaCard } from "./CategoriaCard";

interface Props {
  categorias: Categoria[];
  onDelete: (id: number) => void;
}

export function CategoriaList({ categorias, onDelete }: Props) {
  if (!categorias.length) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-slate-500">
          Nenhuma categoria cadastrada.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {categorias.map((categoria) => (
        <CategoriaCard
          key={categoria.id}
          categoria={categoria}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}