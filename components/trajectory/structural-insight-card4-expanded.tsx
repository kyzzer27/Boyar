"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { SwitchingCostSvg } from "@/components/trajectory/switching-cost-svg";
import { SelfFundingFlywheelSvg } from "@/components/trajectory/self-funding-flywheel-svg";

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

const REV_LABELS = ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8"];

function RevenueModelLineChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: REV_LABELS,
        datasets: [
          {
            label: "Consulting / law firm",
            data: [100, 95, 110, 85, 105, 90, 100, 95],
            borderColor: "#C7B99A",
            borderWidth: 2,
            borderDash: [6, 4],
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#C7B99A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            fill: false,
          },
          {
            label: "SaaS",
            data: [100, 118, 135, 148, 160, 170, 178, 185],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.04)",
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            fill: true,
          },
          {
            label: "TCSP",
            data: [100, 140, 185, 235, 295, 360, 430, 510],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.06)",
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            fill: true,
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
            max: 550,
            title: { display: true, text: "Revenue index (Y1 = 100)", color: "#6E5A3A" },
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
      <div className="h-[300px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] sm:text-[12px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C7B99A" }} />
          Consulting / law firm (project-based)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          SaaS (subscription)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          TCSP (structural compounding)
        </span>
      </div>
    </ChartAppear>
  );
}

const LIFECYCLE_LABELS = [
  "Year 0\nFormation",
  "Year 1\n+Corp admin",
  "Year 2\n+Trust",
  "Year 3\n+Licensing",
  "Year 4\n+Banking",
  "Year 5\n+Succession",
];

function LifecycleStackedBarChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: LIFECYCLE_LABELS,
        datasets: [
          {
            label: "Formation",
            data: [5, 5, 5, 5, 5, 5],
            backgroundColor: "#B5D4F4",
          },
          {
            label: "Corp admin",
            data: [0, 15, 15, 15, 15, 15],
            backgroundColor: "#1E4A6E",
          },
          {
            label: "Trust",
            data: [0, 0, 35, 35, 35, 35],
            backgroundColor: "#2A7D5F",
          },
          {
            label: "Licensing",
            data: [0, 0, 0, 40, 40, 40],
            backgroundColor: "#6B3FA0",
          },
          {
            label: "Banking",
            data: [0, 0, 0, 0, 45, 45],
            backgroundColor: "#B8860B",
          },
          {
            label: "Succession",
            data: [0, 0, 0, 0, 0, 60],
            backgroundColor: "#C4402A",
            borderRadius: { topLeft: 5, topRight: 5, bottomLeft: 0, bottomRight: 0 },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              footer(tooltipItems: { parsed: { y?: number } }[]) {
                if (!tooltipItems.length) return "";
                const sum = tooltipItems.reduce(
                  (acc: number, item: { parsed: { y?: number } }) => acc + (Number(item.parsed.y) || 0),
                  0,
                );
                return `Total: $${sum}K`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: "#4A3A18", autoSkip: false, maxRotation: 0 },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            stacked: true,
            min: 0,
            max: 220,
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                return `$${value}K`;
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
      <div className="h-[320px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#B5D4F4" }} />
          Formation
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#1E4A6E" }} />
          + Corporate admin
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          + Trust
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          + Licensing
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#B8860B" }} />
          + Banking
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: "#C4402A" }} />
          + Succession
        </span>
      </div>
    </ChartAppear>
  );
}

function FinancialProfileRadarCard4({ chartReady }: { chartReady: boolean }) {
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
          "Retention rate",
          "Gross margin",
          "Revenue recurrence",
          "Switching cost",
          "Revenue per client growth",
        ],
        datasets: [
          {
            label: "TCSP",
            data: [92, 82, 85, 95, 88],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.10)",
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
          },
          {
            label: "SaaS",
            data: [88, 75, 90, 60, 70],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.08)",
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2,
          },
          {
            label: "Consulting",
            data: [45, 55, 20, 15, 30],
            borderColor: "#C7B99A",
            backgroundColor: "rgba(199,185,154,0.06)",
            pointBackgroundColor: "#C7B99A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2,
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
            pointLabels: {
              color: "#4A3A18",
              font: { size: 11, weight: "500" },
            },
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

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[320px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          TCSP (Boyar model)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          SaaS (benchmark)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C7B99A" }} />
          Consulting / law firm
        </span>
      </div>
    </ChartAppear>
  );
}

const PORTFOLIO_LABELS = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];

function PortfolioStackedBarChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: PORTFOLIO_LABELS,
        datasets: [
          {
            label: "Recurring from existing",
            data: [60, 130, 220, 340, 480],
            backgroundColor: "#2A7D5F",
          },
          {
            label: "Expansion revenue",
            data: [0, 40, 90, 160, 250],
            backgroundColor: "#B8860B",
          },
          {
            label: "New client revenue",
            data: [50, 80, 90, 100, 110],
            backgroundColor: "#6B3FA0",
            borderRadius: { topLeft: 5, topRight: 5, bottomLeft: 0, bottomRight: 0 },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              footer(tooltipItems: { parsed: { y?: number } }[]) {
                if (!tooltipItems.length) return "";
                const sum = tooltipItems.reduce(
                  (acc: number, item: { parsed: { y?: number } }) => acc + (Number(item.parsed.y) || 0),
                  0,
                );
                return `Total: $${sum}K`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: "#4A3A18" },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            stacked: true,
            min: 0,
            max: 900,
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                return `$${value}K`;
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
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Recurring from existing clients
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#B8860B" }} />
          Expansion revenue (upsell existing)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          New client revenue
        </span>
      </div>
    </ChartAppear>
  );
}

export function StructuralInsightCard4Expanded() {
  const chartReady = useChartJsReady();

  return (
    <div className="w-full px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      {/* Component 1 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B8860B]">04 — THE ECONOMICS</p>
        <h2
          className="mt-4 text-2xl font-bold leading-tight text-[#2C2C2A] sm:text-3xl md:text-4xl"
          style={{ fontFamily: "var(--font-benzin)" }}
        >
          The Revenue Model Compounds Like Software — Not Like Professional Services
        </h2>
        <p className="mx-auto mt-8 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The financial profile of the trust and corporate services industry is structurally different from almost every
          other professional service — and structurally better. Understanding this mechanic is essential to understanding
          why the model works.
        </p>
        <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          In a consulting firm, revenue is earned project by project. When a project ends, the revenue stops. In a law firm,
          matters conclude. The client may or may not return. In a TCSP, a client who forms a holding company pays an annual
          administration fee for as long as that company exists. The entity must have a registered agent, a registered
          office, annual filings, and compliance monitoring — by law. The client cannot opt out of these services without
          dissolving the structure entirely, which most will never do because the company holds assets, contracts, bank
          accounts, and legal relationships that depend on its continued existence. This is not a subscription that can be
          cancelled. It is embedded in the legal architecture of the client&apos;s business.
        </p>
      </section>

      {/* Component 2 */}
      <section className="mx-auto max-w-[720px] py-16">
        <RevenueModelLineChart chartReady={chartReady} />
      </section>

      {/* Component 3 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          One client. One initial formation at $5,000. Within five years, it becomes a $150,000–$200,000 lifecycle
          relationship:
        </p>
        <LifecycleStackedBarChart chartReady={chartReady} />
      </section>

      {/* Component 4 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The switching cost is not contractual — it&apos;s architectural:
        </p>
        <ChartAppear>
          <SwitchingCostSvg />
        </ChartAppear>
      </section>

      {/* Component 5 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The TCSP model outperforms both SaaS and consulting across every metric:
        </p>
        <FinancialProfileRadarCard4 chartReady={chartReady} />
      </section>

      {/* Component 6 */}
      <section className="mx-auto max-w-[720px] py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#1E4A6E" }}>
            <p className="text-[11px]" style={{ color: "#85B7EB" }}>
              Retention
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#E6F1FB" }}>
              90%+
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#2D5F3A" }}>
            <p className="text-[11px]" style={{ color: "#5DCAA5" }}>
              Gross margin
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#E1F5EE" }}>
              80%+
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#7A4A0A" }}>
            <p className="text-[11px]" style={{ color: "#FAC775" }}>
              Renewal marginal cost
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#FAEEDA" }}>
              ~0
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#4A2060" }}>
            <p className="text-[11px]" style={{ color: "#AFA9EC" }}>
              Expansion per client
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#EEEDFE" }}>
              40x
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#CECBF6" }}>
              $5K → $200K
            </p>
          </div>
        </div>
        <div className="mt-12">
          <PortfolioStackedBarChart chartReady={chartReady} />
        </div>
      </section>

      {/* Component 7 */}
      <section className="mx-auto max-w-[720px] py-16">
        <ChartAppear>
          <SelfFundingFlywheelSvg />
        </ChartAppear>
      </section>

      {/* Component 8 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          This produces a financial profile that looks more like SaaS than professional services: recurring revenue, high
          gross margins (80%+), structural retention, expanding revenue per client over time, and near-zero marginal cost
          on renewals. It is why every independent TCSP that has been run with discipline has funded its own growth without
          external capital — the business generates next year&apos;s revenue from this year&apos;s client base, plus
          expansion from new entities, new jurisdictions, and new service lines added to existing clients.
        </p>
      </section>
    </div>
  );
}
