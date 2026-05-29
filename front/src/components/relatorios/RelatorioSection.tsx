interface Props {
  title: string;
  children: React.ReactNode;
}

export function RelatorioSection({
  title,
  children,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      {children}
    </section>
  );
}