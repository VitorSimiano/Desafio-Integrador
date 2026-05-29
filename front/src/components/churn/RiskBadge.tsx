interface Props {
  probability: number;
}

export function RiskBadge({ probability }: Props) {
  const percent = probability * 100;

  const risk =
    percent >= 70
      ? "ALTO"
      : percent >= 40
      ? "MÉDIO"
      : "BAIXO";

  const styles =
    percent >= 70
      ? "bg-red-100 text-red-700"
      : percent >= 40
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${styles}`}
    >
      {risk}
    </span>
  );
}