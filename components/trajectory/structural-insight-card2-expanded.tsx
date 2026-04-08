"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { OldVsNewArchitectureSvg } from "@/components/trajectory/old-vs-new-architecture-svg";
import { RelocationCascadeSvg } from "@/components/trajectory/relocation-cascade-svg";

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
  return (window as unknown as { Chart: new (ctx: HTMLCanvasElement, config: unknown) => { destroy: () => void } })
    .Chart;
}

const MILLIONAIRE_LABELS = [
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026E",
];

const MILLIONAIRE_DATA = [50, 55, 62, 70, 72, 38, 45, 88, 120, 134, 142, 165];

function millionaireBarColors(index: number): string {
  if (index === 5 || index === 6) return "#C7B99A";
  if (index >= 0 && index <= 4) return "#5DCAA5";
  if (index === 7) return "#5DCAA5";
  if (index === 8 || index === 9) return "#2A7D5F";
  if (index === 10 || index === 11) return "#1E5A42";
  return "#5DCAA5";
}

function MillionaireMigrationChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();

    const bgPlugin = {
      id: "migrationWindowBg",
      beforeDatasetsDraw(chart: {
        ctx: CanvasRenderingContext2D;
        chartArea: { top: number; bottom: number };
        scales: { x: { getPixelForTick: (i: number) => number } };
      }) {
        const { ctx, chartArea, scales } = chart;
        const xScale = scales.x;
        for (const i of [10, 11]) {
          const x = xScale.getPixelForTick(i);
          const prev = xScale.getPixelForTick(Math.max(0, i - 1));
          const next = xScale.getPixelForTick(Math.min(11, i + 1));
          const w = Math.min(Math.abs(x - prev), Math.abs(next - x)) * 1.1;
          ctx.save();
          ctx.fillStyle = "rgba(42,125,95,0.08)";
          ctx.fillRect(x - w / 2, chartArea.top, w, chartArea.bottom - chartArea.top);
          ctx.restore();
        }
      },
    };

    inst.current = new Chart(ref.current, {
      type: "bar",
      plugins: [bgPlugin],
      data: {
        labels: MILLIONAIRE_LABELS,
        datasets: [
          {
            label: "Millionaires relocating annually (thousands)",
            data: MILLIONAIRE_DATA,
            backgroundColor: MILLIONAIRE_DATA.map((_, i) => millionaireBarColors(i)),
            borderRadius: 4,
            barPercentage: 0.65,
            categoryPercentage: 0.85,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#4A3A18", autoSkip: false, maxRotation: 45 },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            min: 0,
            max: 180,
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                if (v >= 1000) return `${v / 1000}K`;
                return `${v}K`;
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

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[300px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Millionaires relocating annually (thousands)
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3 w-8 shrink-0 rounded-sm"
            style={{ backgroundColor: "rgba(42,125,95,0.15)" }}
          />
          Boyar entry window (2025–2030)
        </span>
      </div>
    </ChartAppear>
  );
}

const DEST_LABELS = [
  "UAE",
  "Singapore",
  "Italy",
  "Switzerland",
  "Saudi Arabia",
  "Portugal",
  "Greece",
  "Australia",
  "UK (outflow)",
  "China (outflow)",
];

const DEST_DATA = [9800, 3500, 2200, 1500, 2400, 800, 1200, 1000, -16500, -15200];

function MigrationDestinationsChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: DEST_LABELS,
        datasets: [
          {
            label: "Net flow",
            data: DEST_DATA,
            backgroundColor: DEST_DATA.map((d) => (d >= 0 ? "#2A7D5F" : "#C4402A")),
            borderRadius: 5,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                const sign = v >= 0 ? "+" : "";
                if (Math.abs(v) >= 1000) return `${sign}${v / 1000}K`;
                return `${sign}${v}`;
              },
            },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            ticks: { color: "#4A3A18", autoSkip: false },
            grid: { display: false },
          },
        },
      },
    });
    return () => {
      inst.current?.destroy();
      inst.current = null;
    };
  }, [chartReady]);

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[320px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Net millionaire inflow 2025
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C4402A" }} />
          Net millionaire outflow 2025
        </span>
      </div>
    </ChartAppear>
  );
}

const AREA_LABELS = [
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026E",
  "2027E",
  "2028E",
  "2029E",
  "2030E",
];

function ConvergenceAreaChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: AREA_LABELS,
        datasets: [
          {
            label: "Remedial demand (rebuilding old)",
            data: [20, 22, 28, 35, 50, 65, 80, 85, 75, 60, 45, 35],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2.5,
          },
          {
            label: "Relocation demand (migrating wealth)",
            data: [10, 8, 10, 18, 28, 35, 42, 50, 55, 58, 55, 50],
            borderColor: "#1E4A6E",
            backgroundColor: "rgba(30,74,110,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#1E4A6E",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2.5,
          },
          {
            label: "Greenfield demand (new asset classes)",
            data: [0, 0, 2, 5, 12, 22, 35, 48, 60, 70, 75, 80],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2.5,
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
            ticks: { color: "#4A3A18", autoSkip: false, maxRotation: 45 },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            stacked: true,
            min: 0,
            title: { display: true, text: "Relative demand intensity", color: "#6E5A3A" },
            ticks: { color: "#6E5A3A" },
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

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[280px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Remedial demand (rebuilding old)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#1E4A6E" }} />
          Relocation demand (migrating wealth)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          Greenfield demand (new asset classes)
        </span>
      </div>
    </ChartAppear>
  );
}

const ENTRY_LABELS = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
];

const ENTRY_LINE = [25, 30, 40, 55, 72, 92, 100, 98, 90, 82, 75, 70, 68];

function EntryWindowChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();

    const barData = ENTRY_LABELS.map((_, i) => (i >= 5 && i <= 10 ? 110 : 0));

    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ENTRY_LABELS,
        datasets: [
          {
            type: "bar" as const,
            label: "Window",
            data: barData,
            backgroundColor: ENTRY_LABELS.map((_, i) =>
              i >= 5 && i <= 10 ? "rgba(184,134,11,0.10)" : "transparent",
            ),
            borderWidth: 0,
            barPercentage: 1,
            categoryPercentage: 1,
            order: 2,
          },
          {
            type: "line" as const,
            label: "Combined structuring demand",
            data: ENTRY_LINE,
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.08)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            order: 1,
            pointRadius: 5,
            pointBackgroundColor: ENTRY_LABELS.map((_, i) => (i === 5 ? "#B8860B" : "#2A7D5F")),
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
          x: {
            ticks: { color: "#4A3A18", autoSkip: false, maxRotation: 45 },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            min: 0,
            max: 110,
            title: { display: true, text: "Relative demand (indexed)", color: "#6E5A3A" },
            ticks: { color: "#6E5A3A" },
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

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[260px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Combined structuring demand
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3 w-8 shrink-0 rounded-sm"
            style={{ backgroundColor: "rgba(184,134,11,0.15)" }}
          />
          Optimal entry window
        </span>
      </div>
    </ChartAppear>
  );
}

export function StructuralInsightCard2Expanded() {
  const chartReady = useChartJsReady();

  return (
    <div className="w-full px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      {/* Component 1 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The international corporate structuring industry operated on a stable architecture for roughly 30 years. A
          company was formed in a low-tax jurisdiction, administered by a registered agent, and existed largely as a
          legal shell — a post box with a bank account. The client paid a formation fee, an annual renewal, and the
          structure sat quietly doing what it was designed to do.
        </p>
        <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          That architecture is now being dismantled — not by market forces, but by coordinated regulatory action.
        </p>
      </section>

      {/* Component 2 */}
      <section className="mx-auto max-w-[720px] py-16">
        <ChartAppear>
          <OldVsNewArchitectureSvg />
        </ChartAppear>
      </section>

      {/* Component 3 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          142,000 millionaires physically relocated across borders in 2025 — nearly triple the rate of a decade ago:
        </p>
        <MillionaireMigrationChart chartReady={chartReady} />
      </section>

      {/* Component 4 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The destinations are concentrated in exactly the jurisdictions Boyar is activating:
        </p>
        <MigrationDestinationsChart chartReady={chartReady} />
      </section>

      {/* Component 5 */}
      <section className="mx-auto max-w-[720px] py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#2D5F3A" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={chartViewport}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "#5DCAA5" }}>
              FORCE 1: REBUILD
            </p>
            <p className="mt-2 text-[13px] font-medium" style={{ color: "#E1F5EE" }}>
              Old structures forced to restructure
            </p>
            <p className="mt-3 text-2xl font-medium" style={{ color: "#9FE1CB" }}>
              147
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#5DCAA5" }}>
              jurisdictions adopted Pillar Two
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#1E4A6E" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={chartViewport}
            transition={{ duration: 0.5, delay: 0.06, ease: EXPENDITURE_EASE }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "#85B7EB" }}>
              FORCE 2: RELOCATE
            </p>
            <p className="mt-2 text-[13px] font-medium" style={{ color: "#E6F1FB" }}>
              Mass physical relocation of wealth
            </p>
            <p className="mt-3 text-2xl font-medium" style={{ color: "#B5D4F4" }}>
              142K
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#85B7EB" }}>
              millionaires relocated, 2025
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#4A2060" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={chartViewport}
            transition={{ duration: 0.5, delay: 0.12, ease: EXPENDITURE_EASE }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "#AFA9EC" }}>
              FORCE 3: CREATE
            </p>
            <p className="mt-2 text-[13px] font-medium" style={{ color: "#EEEDFE" }}>
              New asset classes need structuring
            </p>
            <p className="mt-3 text-2xl font-medium" style={{ color: "#CECBF6" }}>
              $65B
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#AFA9EC" }}>
              institutional RWA value locked
            </p>
          </motion.div>
        </div>
        <div className="mt-12">
          <ConvergenceAreaChart chartReady={chartReady} />
        </div>
      </section>

      {/* Component 6 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Each relocating millionaire triggers a cascade of structuring work:
        </p>
        <ChartAppear>
          <RelocationCascadeSvg />
        </ChartAppear>
      </section>

      {/* Component 7 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The firms operational during the 2025–2030 window will build the relationships that define the next two
          decades:
        </p>
        <EntryWindowChart chartReady={chartReady} />
      </section>

      {/* Component 8 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The old structures are being forced to rebuild. The new structures are being created from scratch. Both are
          happening simultaneously, in the same jurisdictions, often for the same clients. The volume of structuring work —
          both remedial and greenfield — is at a level the industry has never experienced. And because this demand is
          concentrated in a specific window, roughly 2025 to 2030, the firms that are operational during this period will
          build the client relationships, the jurisdictional expertise, and the compounding renewal base that define the
          next two decades of the industry.
        </p>
        <p className="mx-auto mt-8 max-w-[600px] text-center text-[20px] italic leading-relaxed text-[#B8860B]">
          &ldquo;That is the window Boyar Partners is entering.&rdquo;
        </p>
      </section>
    </div>
  );
}
