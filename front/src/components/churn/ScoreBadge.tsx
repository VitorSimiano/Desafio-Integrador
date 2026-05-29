interface Props {
  score: number;
}

export function ScoreBadge({ score }: Props) {
  const styles =
    score >= 80
      ? "bg-green-100 text-green-700"
      : score >= 50
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${styles}`}
    >
      {score}
    </span>
  );
}