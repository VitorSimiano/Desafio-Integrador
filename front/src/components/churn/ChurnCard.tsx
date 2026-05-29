import { AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  danger?: boolean;
}

export function ChurnCard({
  title,
  value,
  danger,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-slate-800">
          {value}
        </h2>
      </div>

      <div
        className={`p-4 rounded-2xl ${
          danger
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {danger ? (
          <AlertTriangle size={28} />
        ) : (
          <ShieldCheck size={28} />
        )}
      </div>
    </div>
  );
}