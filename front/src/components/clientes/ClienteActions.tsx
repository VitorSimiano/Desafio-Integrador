import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export function ClienteActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}