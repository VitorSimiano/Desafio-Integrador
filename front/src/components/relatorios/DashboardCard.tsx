interface Props {
  title: string;
  value: string | number;
}

export function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-slate-800">
        {value}
      </h2>
    </div>
  );
}