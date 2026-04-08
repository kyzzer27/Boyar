"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { StructuralProtectionSvg } from "@/components/trajectory/structural-protection-svg";

const CREAM = "#FDFBEE";

const EXPENDITURE_EASE = [0.16, 1, 0.3, 1] as const;

const CHART_ANIMATION = {
  duration: 900,
  easing: "easeOutCubic" as const,
};

const chartViewport = { once: true, margin: "-80px" as const };

function ChartAppear({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={chartViewport}
      transition={{ duration: 0.65, ease: EXPENDITURE_EASE }}
      style={{ transformOrigin: "50% 50%" }}
    >
      {children}
    </motion.div>
  );
}

let chartJsPromise: Promise<void> | null = null;

function ensureChartJs(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { Chart?: unknown };
  if (w.Chart) return Promise.resolve();
  if (!chartJsPromise) {
    chartJsPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector('script[data-chartjs-cdn="trajectory"]');
      if (existing) {
        if (w.Chart) {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve());
        return;
      }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
      s.async = true;
      s.setAttribute("data-chartjs-cdn", "trajectory");
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Chart.js load failed"));
      document.body.appendChild(s);
    });
  }
  return chartJsPromise;
}

function useChartJsReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    void ensureChartJs().then(() => setReady(true));
  }, []);
  return ready;
}

function getChartCtor(): unknown {
  return (window as unknown as { Chart: new (c: HTMLCanvasElement, config: unknown) => { destroy: () => void } })
    .Chart;
}

const LOG_LABELS = ["Y0", "Y1", "Y2", "Y3", "Y5", "Y7", "Y10", "Y15", "Y20", "Y30", "Y37", "Y50"];

function GrowthLogLineChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: LOG_LABELS,
        datasets: [
          {
            label: "Sovereign Group",
            data: [0.1, 0.3, 0.6, 1.2, 3, 6, 12, 28, 45, 80, 108, null],
            borderColor: "#2A7D5F",
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: true,
          },
          {
            label: "Praxis IFM",
            data: [0.05, 0.15, 0.3, 0.6, 1.5, 3, 7, 16, 30, 55, null, 70],
            borderColor: "#1E4A6E",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#1E4A6E",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: true,
          },
          {
            label: "Highvern",
            data: [0.5, 1.5, 3, 5, 10, 18, null, null, null, null, null, null],
            borderColor: "#6B3FA0",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: true,
          },
          {
            label: "Fort",
            data: [0.05, 0.12, 0.25, 0.5, 1.2, 2.5, 6, 14, 25, 50, null, 65],
            borderColor: "#B8860B",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#B8860B",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: true,
          },
          {
            label: "Boyar Partners",
            data: [0, 0.11, 0.5, null, null, null, null, null, null, null, null, null],
            borderColor: "#C4402A",
            borderWidth: 2.5,
            borderDash: [5, 4],
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#C4402A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        interaction: { mode: "index", intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#4A3A18" },
            grid: { color: "rgba(74,58,24,0.08)" },
            title: { display: true, text: "Years since founding", color: "#6E5A3A" },
          },
          y: {
            type: "logarithmic",
            min: 0.05,
            max: 150,
            title: { display: true, text: "Estimated revenue ($M, log)", color: "#6E5A3A" },
            ticks: {
              color: "#6E5A3A",
              callback(tickValue: string | number) {
                const v = typeof tickValue === "number" ? tickValue : Number(tickValue);
                if (!Number.isFinite(v)) return "";
                if (Math.abs(v - 0.1) < 0.02) return "$0.1M";
                if (Math.abs(v - 1) < 0.05) return "$1M";
                if (Math.abs(v - 10) < 0.2) return "$10M";
                if (Math.abs(v - 100) < 2) return "$100M";
                return "";
              },
            },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
        },
      },
    });
    return () => {
      inst.current?.destroy();
      inst.current = null;
    };
  }, [chartReady]);

  return <canvas ref={ref} className="h-[320px] w-full max-w-full" />;
}

function ProofRadarChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "radar",
      data: {
        labels: [
          "Jurisdictions at launch",
          "Licensing capability",
          "Digital-native infra",
          "Traditional TCSP depth",
          "Market timing",
          "Founder experience",
        ],
        datasets: [
          {
            label: "Boyar Partners (at launch, 2025)",
            data: [10, 85, 90, 70, 95, 75],
            borderColor: "#C4402A",
            backgroundColor: "rgba(196,64,42,0.10)",
            pointBackgroundColor: "#C4402A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
          },
          {
            label: "Sovereign Group (at launch, 1987)",
            data: [1, 10, 5, 80, 60, 70],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.08)",
            borderWidth: 2,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
          },
          {
            label: "Highvern (at launch, 2016)",
            data: [6, 20, 30, 90, 50, 85],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.08)",
            borderWidth: 2,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false },
            pointLabels: { color: "#4A3A18" },
            grid: { color: "rgba(74,58,24,0.12)" },
            angleLines: { color: "rgba(74,58,24,0.08)" },
          },
        },
      },
    });
    return () => {
      inst.current?.destroy();
      inst.current = null;
    };
  }, [chartReady]);

  return <canvas ref={ref} className="h-[320px] w-full max-w-full" />;
}

const TRAJ_LABELS = ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7"];

function BoyarTrajectoryRangeChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: TRAJ_LABELS,
        datasets: [
          {
            label: "Boyar high",
            data: [0.112, 1.2, 3.5, 8, 20, null, null],
            borderColor: "#C4402A",
            backgroundColor: "rgba(196,64,42,0.06)",
            fill: "+1",
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: "#C4402A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: false,
          },
          {
            label: "Boyar low",
            data: [0.112, 0.5, 1.2, 3, 8, null, null],
            borderColor: "#C4402A",
            backgroundColor: "rgba(196,64,42,0.06)",
            fill: false,
            borderDash: [5, 4],
            tension: 0.4,
            borderWidth: 1.5,
            pointRadius: 3,
            pointBackgroundColor: "#C4402A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            spanGaps: false,
          },
          {
            label: "Sovereign",
            data: [0.1, 0.3, 0.6, 1.2, 3, 6, 12],
            borderColor: "#2A7D5F",
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        interaction: { mode: "index", intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#4A3A18" },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            min: 0,
            max: 22,
            ticks: {
              color: "#6E5A3A",
              callback(v: string | number) {
                const n = typeof v === "number" ? v : Number(v);
                if (n < 1 && n > 0) return `$${n.toFixed(3)}M`;
                if (Number.isInteger(n)) return `$${n}M`;
                return `$${n}M`;
              },
            },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
        },
      },
    });
    return () => {
      inst.current?.destroy();
      inst.current = null;
    };
  }, [chartReady]);

  return <canvas ref={ref} className="h-[300px] w-full max-w-full" />;
}

export function StructuralInsightCard5Expanded() {
  const chartReady = useChartJsReady();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Component 1: Section header */}
      <header className="space-y-4">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#2A7D5F]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          05 — THE PROOF
        </p>
        <h2
          className="text-2xl font-bold leading-tight text-[#2C2C2A] sm:text-3xl lg:text-4xl"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          This Industry Has Never Produced a Failed Independent Firm That Was Run With Discipline
        </h2>
        <p
          className="max-w-[720px] text-lg font-bold leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          This is the most important point for an investor — and it is the one nobody talks about.
        </p>
      </header>

      {/* Component 2: Four proof firm cards */}
      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Sovereign */}
        <article
          className="rounded-[12px] p-5"
          style={{ backgroundColor: "#2D5F3A" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-[#5DCAA5]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            FOUNDED 1987 — GIBRALTAR
          </p>
          <h3
            className="mt-2 text-[18px] font-medium text-[#E1F5EE]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Sovereign Group
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[20px] font-bold text-[#9FE1CB]">$108.6M</p>
              <p className="text-[11px] text-[#5DCAA5]">annual revenue</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#9FE1CB]">20,000+</p>
              <p className="text-[11px] text-[#5DCAA5]">structures managed</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#9FE1CB]">£20B+</p>
              <p className="text-[11px] text-[#5DCAA5]">assets under admin</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#9FE1CB]">37 yrs</p>
              <p className="text-[11px] text-[#5DCAA5]">uninterrupted growth</p>
            </div>
          </div>
          <p
            className="mt-4 border-t-[0.5px] border-[rgba(93,202,165,0.3)] pt-3 text-[11px] text-[#5DCAA5]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Zero external capital. 500+ employees. 20+ jurisdictions. Owned by senior staff.
          </p>
        </article>

        {/* Praxis IFM */}
        <article
          className="rounded-[12px] p-5"
          style={{ backgroundColor: "#1E4A6E" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-[#85B7EB]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            ESTABLISHED 50+ YEARS AGO
          </p>
          <h3
            className="mt-2 text-[18px] font-medium text-[#E6F1FB]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Praxis IFM
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[20px] font-bold text-[#B5D4F4]">50+</p>
              <p className="text-[11px] text-[#85B7EB]">years independent</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#B5D4F4]">10</p>
              <p className="text-[11px] text-[#85B7EB]">jurisdictions</p>
            </div>
          </div>
          <p
            className="mt-4 border-t-[0.5px] border-[rgba(133,183,235,0.3)] pt-3 text-[11px] text-[#85B7EB]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            BVI, Guernsey, Hong Kong, IoM, Malta, Mauritius, Switzerland, UAE, London. Still winning mandates.
          </p>
        </article>

        {/* Highvern */}
        <article
          className="rounded-[12px] p-5"
          style={{ backgroundColor: "#4A2060" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-[#AFA9EC]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            MBO FROM PRIVATE BANK, 2016
          </p>
          <h3
            className="mt-2 text-[18px] font-medium text-[#EEEDFE]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Highvern
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[20px] font-bold text-[#CECBF6]">9</p>
              <p className="text-[11px] text-[#AFA9EC]">years founder-led</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#CECBF6]">6→8</p>
              <p className="text-[11px] text-[#AFA9EC]">jurisdictions by mid-2025</p>
            </div>
          </div>
          <p
            className="mt-4 border-t-[0.5px] border-[rgba(175,169,236,0.3)] pt-3 text-[11px] text-[#AFA9EC]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Combined with Permian mid-2025. Still independent. The exact trajectory Boyar is modelling.
          </p>
        </article>

        {/* Fort */}
        <article
          className="rounded-[12px] p-5"
          style={{ backgroundColor: "#7A4A0A" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-[#FAC775]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            ESTABLISHED 1973 — GUERNSEY
          </p>
          <h3
            className="mt-2 text-[18px] font-medium text-[#FAEEDA]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Fort
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[20px] font-bold text-[#EF9F27]">52</p>
              <p className="text-[11px] text-[#FAC775]">years independent</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#EF9F27]">2025</p>
              <p className="text-[11px] text-[#FAC775]">acquired Cogent</p>
            </div>
          </div>
          <p
            className="mt-4 border-t-[0.5px] border-[rgba(250,199,117,0.3)] pt-3 text-[11px] text-[#FAC775]"
            style={{ fontFamily: "var(--font-avenir)" }}
          >
            Independently owned. Expanded private wealth via acquisition. Still growing, 52 years later.
          </p>
        </article>
      </div>

      {/* Component 3: Growth timelines log chart */}
      <div className="mt-20 space-y-4">
        <p
          className="max-w-3xl text-base leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          The pattern is identical every time. One jurisdiction. One founder. Disciplined expansion:
        </p>
        <ChartAppear>
          <GrowthLogLineChart chartReady={chartReady} />
        </ChartAppear>
        <ul
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#2A7D5F]" />
            <span className="text-[#4A3A18]">Sovereign Group (1987→)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[#1E4A6E]" />
            <span className="text-[#4A3A18]">Praxis IFM (~1972→)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[#6B3FA0]" />
            <span className="text-[#4A3A18]">Highvern (2016→)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[#B8860B]" />
            <span className="text-[#4A3A18]">Fort (1973→)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-[#C4402A]" />
            <span className="text-[#4A3A18]">Boyar Partners (2025→)</span>
          </li>
        </ul>
      </div>

      {/* Component 4: Structural protection SVG */}
      <div className="mt-20 space-y-4">
        <p
          className="max-w-3xl text-base leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          The reason no disciplined independent TCSP has ever failed is structural:
        </p>
        <StructuralProtectionSvg />
      </div>

      {/* Component 5: Radar */}
      <div className="mt-20 space-y-4">
        <p
          className="max-w-3xl text-base leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          How Boyar compares to where the proof firms started:
        </p>
        <ChartAppear>
          <ProofRadarChart chartReady={chartReady} />
        </ChartAppear>
        <ul
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#C4402A]" />
            <span className="text-[#4A3A18]">Boyar Partners (at launch, 2025)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#2A7D5F]" />
            <span className="text-[#4A3A18]">Sovereign Group (at launch, 1987)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#6B3FA0]" />
            <span className="text-[#4A3A18]">Highvern (at launch, 2016)</span>
          </li>
        </ul>
      </div>

      {/* Component 6: Trajectory metric cards + range chart */}
      <div className="mt-20 space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-[12px] p-5" style={{ backgroundColor: "#6E2020" }}>
            <p className="text-[11px] text-[#F09595]">Y1 (2025)</p>
            <p className="mt-2 text-2xl font-bold text-[#FCEBEB]">~$112K</p>
            <p className="mt-1 text-[11px] text-[#F7C1C1]">Foundation + proof</p>
          </article>
          <article className="rounded-[12px] p-5" style={{ backgroundColor: "#7A4A0A" }}>
            <p className="text-[11px] text-[#FAC775]">Y2–3 (2026–27)</p>
            <p className="mt-2 text-2xl font-bold text-[#FAEEDA]">$0.5–3.5M</p>
            <p className="mt-1 text-[11px] text-[#EF9F27]">Licensing + expansion</p>
          </article>
          <article className="rounded-[12px] p-5" style={{ backgroundColor: "#2D5F3A" }}>
            <p className="text-[11px] text-[#5DCAA5]">Y4–5 (2028–29)</p>
            <p className="mt-2 text-2xl font-bold text-[#E1F5EE]">$3–8M</p>
            <p className="mt-1 text-[11px] text-[#9FE1CB]">Platform emerges</p>
          </article>
        </div>
        <ChartAppear>
          <BoyarTrajectoryRangeChart chartReady={chartReady} />
        </ChartAppear>
        <ul
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#C4402A]" />
            <span className="text-[#4A3A18]">Boyar projected (conservative–aggressive)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-[#2A7D5F]" />
            <span className="text-[#4A3A18]">Sovereign actual (from founding, inflation-adjusted)</span>
          </li>
        </ul>
      </div>

      {/* Component 7: Point 5 closing */}
      <div className="mt-20 space-y-8">
        <p
          className="max-w-[720px] text-base leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          Boyar Partners is entering with the same structural advantages that made Sovereign a $108 million
          business — but with two additions that Sovereign did not have at launch: licensing capability as a
          core service line from day one, and infrastructure built natively for the digital-economy client that
          is the fastest-growing segment of the addressable market.
        </p>
        <blockquote
          className="mx-auto max-w-[640px] text-center text-lg italic leading-relaxed text-[#B8860B]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          &ldquo;The question is not whether the model works. Thirty-seven years of evidence across multiple
          independent firms, in multiple jurisdictions, through multiple economic cycles, say it works. The
          question is whether the founder has the discipline to execute it. That is the bet.&rdquo;
        </blockquote>
      </div>

      {/* Component 8: Part I closing */}
      <div className="mt-24 border-t-0 pt-0">
        <div
          className="mx-auto my-0 h-px max-w-[200px] bg-[#C7B99A]"
          style={{ marginTop: "3rem", marginBottom: "2rem" }}
        />
        <p
          className="max-w-[720px] text-base leading-relaxed text-[#4A3A18]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          These forces are not independent. Regulatory complexity forces existing structures to be rebuilt. The
          rebuilding is happening at the same moment that new asset classes, new client types, and mass physical
          relocation are creating greenfield demand that has no historical precedent. The economics of the
          business — recurring revenue, compounding client relationships, structural retention, profitability from
          year one — mean that the firm which enters this window with the right positioning does not need
          external capital to survive. It needs discipline to compound.
        </p>
        <p
          className="mx-auto mt-8 max-w-[600px] text-center text-[22px] font-bold leading-snug text-[#2C2C2A]"
          style={{ fontFamily: "var(--font-avenir)" }}
        >
          That is what Boyar Partners is built to do.
        </p>
      </div>
    </div>
  );
}
