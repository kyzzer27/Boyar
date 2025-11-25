interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly delta?: string;
  readonly helper?: string;
}

export function MetricCard({ label, value, delta, helper }: MetricCardProps) {
  return (
    <div className="card-sheen rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      {delta ? (
        <p className="mt-2 text-sm text-gray-200">
          {delta} <span className="text-gray-500">vs last quarter</span>
        </p>
      ) : null}
      {helper ? <p className="mt-2 text-sm text-gray-500">{helper}</p> : null}
    </div>
  );
}

