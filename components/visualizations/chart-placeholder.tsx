interface ChartPlaceholderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly variant?: "bar" | "line" | "donut";
}

const gradients: Record<NonNullable<ChartPlaceholderProps["variant"]>, string> = {
  bar: "from-white/50 via-gray-500/20 to-transparent",
  line: "from-gray-200/60 via-white/30 to-transparent",
  donut: "from-gray-400/40 via-white/20 to-transparent",
};

export function ChartPlaceholder({
  title,
  subtitle,
  variant = "bar",
}: ChartPlaceholderProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-gray-300">{subtitle}</p> : null}
      <div className="mt-4 h-48 rounded-2xl border border-white/5 bg-gradient-to-br from-black via-black/70 to-black/40 p-4">
        <div
          className={`h-full w-full rounded-2xl bg-gradient-to-r ${gradients[variant]} opacity-80`}
        />
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Placeholder visualization · connect charting library later.
      </p>
    </div>
  );
}

