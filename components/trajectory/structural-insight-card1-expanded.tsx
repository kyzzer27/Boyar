"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { RegulationFlowchartSvg } from "@/components/trajectory/regulation-flowchart-svg";

const CREAM = "#FDFBEE";

/** Same easing as expenditure pie / line charts (category-wise, burn-rate, monthly-cost pages) */
const EXPENDITURE_EASE = [0.16, 1, 0.3, 1] as const;

/** Chart.js draw after wrapper settles (matches expenditure motion rhythm) */
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
  return (window as unknown as { Chart: new (ctx: CanvasRenderingContext2D | HTMLCanvasElement, config: unknown) => { destroy: () => void } }).Chart;
}

function RadarChartBlock({ chartReady }: { chartReady: boolean }) {
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
          "OECD Pillar Two",
          "FATF Travel Rule",
          "MiCA",
          "Substance laws",
          "AML6",
          "Beneficial ownership",
        ],
        datasets: [
          {
            label: "Regulatory pressure",
            data: [95, 73, 88, 82, 65, 70],
            borderColor: "#C4402A",
            backgroundColor: "rgba(196,64,42,0.10)",
            pointBackgroundColor: "#C4402A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
          },
          {
            label: "Advisory demand",
            data: [90, 60, 95, 85, 55, 60],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.10)",
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
          },
          {
            label: "Competitor elimination",
            data: [70, 40, 80, 90, 45, 50],
            borderColor: "#B8860B",
            backgroundColor: "rgba(184,134,11,0.10)",
            pointBackgroundColor: "#B8860B",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
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
              font: { size: 11.5, weight: "500" },
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
    <>
      <div className="h-[340px] w-full">
        <canvas ref={ref} />
      </div>
      <motion.div
        className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
        style={{ color: "#6E5A3A" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={chartViewport}
        transition={{ delay: 0.28, duration: 0.45, ease: EXPENDITURE_EASE }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C4402A" }} />
          Regulatory pressure
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Advisory demand created
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#B8860B" }} />
          Competitor elimination
        </span>
      </motion.div>
    </>
  );
}

function MicaBarChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: [
          "CASP licenses issued (EU-wide, Q1 2026)",
          "VASPs requiring licensing (estimated)",
        ],
        datasets: [
          {
            label: "values",
            data: [135, 10000],
            backgroundColor: ["#2A7D5F", "#C4402A"],
            borderRadius: 6,
            barPercentage: 0.5,
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
            ticks: { color: "#4A3A18", autoSkip: false, maxRotation: 0 },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y: {
            type: "logarithmic",
            min: 10,
            max: 100000,
            ticks: {
              color: "#6E5A3A",
              callback(value: number) {
                if ([100, 1000, 10000, 100000].includes(value)) return value.toLocaleString();
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

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="h-[260px] w-full">
        <canvas ref={ref} />
      </div>
      <motion.div
        className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
        style={{ color: "#6E5A3A" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={chartViewport}
        transition={{ delay: 0.25, duration: 0.45, ease: EXPENDITURE_EASE }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          CASP licenses issued (~135)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C4402A" }} />
          VASPs needing licenses (estimated)
        </span>
      </motion.div>
    </ChartAppear>
  );
}

function SubstanceGroupedBar({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: [
          "Formation",
          "Directors",
          "Board mtgs",
          "Compliance",
          "Transfer pricing",
          "Substance docs",
          "Banking intro",
          "Total Y1",
        ],
        datasets: [
          {
            label: "Pre-substance",
            data: [1500, 0, 0, 0, 0, 0, 0, 1500],
            backgroundColor: "#C7B99A",
            borderRadius: 4,
            barPercentage: 0.4,
            categoryPercentage: 0.7,
          },
          {
            label: "Post-substance",
            data: [5000, 4000, 2500, 3000, 2000, 1500, 5000, 23000],
            backgroundColor: "#1E4A6E",
            borderRadius: 4,
            barPercentage: 0.4,
            categoryPercentage: 0.7,
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
            max: 25000,
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                if (v >= 1000) return `$${v / 1000}K`;
                return `$${v}`;
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
      <div className="h-[310px] w-full">
        <canvas ref={ref} />
      </div>
      <motion.div
        className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
        style={{ color: "#6E5A3A" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={chartViewport}
        transition={{ delay: 0.25, duration: 0.45, ease: EXPENDITURE_EASE }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C7B99A" }} />
          Pre-substance: one-time fee
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#1E4A6E" }} />
          Post-substance: annual recurring
        </span>
      </motion.div>
    </ChartAppear>
  );
}

function EffectsDonut({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["New advisory demand", "Competitor elimination", "Rising switching costs"],
        datasets: [
          {
            data: [45, 30, 25],
            backgroundColor: ["#1E4A6E", "#C4402A", "#2A7D5F"],
            borderWidth: 3,
            borderColor: CREAM,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "58%",
        animation: CHART_ANIMATION,
        plugins: { legend: { display: false } },
      },
    });
    return () => {
      inst.current?.destroy();
      inst.current = null;
    };
  }, [chartReady]);

  return (
    <ChartAppear className="w-full max-w-[720px]">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <div className="mx-auto h-[240px] w-[240px] shrink-0 md:mx-0">
          <canvas ref={ref} />
        </div>
        <motion.div
          className="min-w-0 flex-1 space-y-4 text-left"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={chartViewport}
          transition={{ delay: 0.1, duration: 0.6, ease: EXPENDITURE_EASE }}
          style={{ transformOrigin: "50% 0%" }}
        >
          <div>
            <div className="flex items-start gap-2">
              <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#1E4A6E" }} />
              <div>
                <p className="font-bold" style={{ color: "#2C2C2A" }}>
                  New advisory demand
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#6E5A3A" }}>
                  Existing clients must restructure. Every regulation = new billable engagement.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-2">
              <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C4402A" }} />
              <div>
                <p className="font-bold" style={{ color: "#2C2C2A" }}>
                  Competitor elimination
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#6E5A3A" }}>
                  32% of small firms cite steep costs. Low-quality incorporators cannot survive.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-2">
              <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
              <div>
                <p className="font-bold" style={{ color: "#2C2C2A" }}>
                  Rising switching costs
                </p>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#6E5A3A" }}>
                  Multi-jurisdictional structures are architecturally locked in. 90%+ retention.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ChartAppear>
  );
}

export function StructuralInsightCard1Expanded() {
  const chartReady = useChartJsReady();

  return (
    <div className="w-full px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-[720px] text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Most industries suffer when regulation increases. Margins compress, compliance costs rise, growth slows. The
          trust and corporate services industry operates on the opposite logic: every new regulation is a new billable
          engagement.
        </p>
        <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          When CRS was introduced, clients restructured. When the OECD pushed beneficial ownership transparency, clients
          needed advisory to redesign. When jurisdictions introduced substance requirements, every shell company became a
          restructuring mandate.
        </p>
      </section>

      {/* Component 2 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={chartViewport}
          variants={{
            show: { transition: { staggerChildren: 0.09 } },
            hidden: {},
          }}
        >
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#2D5F3A" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#9FE1CB" }}>
              OECD Pillar Two
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#E1F5EE" }}>
              147
            </p>
            <p className="mt-1 text-sm" style={{ color: "#5DCAA5" }}>
              jurisdictions adopted
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#1E4A6E" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#85B7EB" }}>
              FATF Travel Rule
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#E6F1FB" }}>
              85 / 117
            </p>
            <p className="mt-1 text-sm" style={{ color: "#B5D4F4" }}>
              jurisdictions (up from 65)
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#6E2020" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#F09595" }}>
              MiCA penalties
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#FCEBEB" }}>
              €540M+
            </p>
            <p className="mt-1 text-sm" style={{ color: "#F7C1C1" }}>
              euros issued
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#7A4A0A" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#FAC775" }}>
              MiCA licenses issued
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#FAEEDA" }}>
              ~135
            </p>
            <p className="mt-1 text-sm" style={{ color: "#EF9F27" }}>
              vs 100,000s VASPs needed
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#4A3A18" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#D3D1C7" }}>
              Substance jurisdictions
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#F1EFE8" }}>
              6
            </p>
            <p className="mt-1 text-sm" style={{ color: "#B4B2A9" }}>
              JE, GG, BVI, KY, BM, IoM
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#6E3518" }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EXPENDITURE_EASE }}
          >
            <p className="text-sm" style={{ color: "#F0997B" }}>
              Small firms citing barriers
            </p>
            <p className="mt-2 text-[28px] font-semibold leading-tight" style={{ color: "#FAECE7" }}>
              32%
            </p>
            <p className="mt-1 text-sm" style={{ color: "#F5C4B3" }}>
              being eliminated
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Component 3 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <ChartAppear className="flex w-full flex-col items-center">
          <h3 className="mb-6 text-center text-lg font-semibold text-[#2C2C2A]">
            Radar chart — regulatory pressure analysis
          </h3>
          <RadarChartBlock chartReady={chartReady} />
        </ChartAppear>
      </section>

      {/* Component 4 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <ChartAppear className="flex w-full flex-col items-center">
          <h3 className="mb-6 text-center text-lg font-semibold text-[#2C2C2A]">
            Regulation-to-revenue flow
          </h3>
          <div className="w-full">
            <RegulationFlowchartSvg />
          </div>
        </ChartAppear>
      </section>

      {/* Component 5 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          MiCA requires every crypto service provider to obtain full licensing by July 2026. The gap between supply and
          demand is staggering:
        </p>
        <MicaBarChart chartReady={chartReady} />
      </section>

      {/* Component 6 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Economic substance requirements ended the post-box company. Here&apos;s what that did to per-client revenue:
        </p>
        <SubstanceGroupedBar chartReady={chartReady} />
      </section>

      {/* Component 7 */}
      <section className="mx-auto mt-20 max-w-[720px]">
        <p className="mb-8 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Each regulation does three things simultaneously:
        </p>
        <EffectsDonut chartReady={chartReady} />
      </section>

      {/* Component 8 */}
      <section className="mx-auto mt-20 max-w-[720px] text-center">
        <p className="text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Each of these regulations does three things simultaneously: it creates new advisory demand from existing
          clients who must adapt, it eliminates low-quality competitors who cannot handle the compliance cost (32% of
          small trust firms already cite steep compliance upgrade costs as barriers), and it raises the switching cost
          for clients who are already with a capable firm. The floor of the industry rises. The ceiling stays unlimited.
          The middle — where a firm like Boyar operates — widens.
        </p>
        <p className="mt-6 text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Sovereign Group grew through every one of these regulatory waves over 37 years. Every wave that was supposed to
          &quot;kill offshore&quot; instead killed the weakest players and concentrated demand with quality firms. The
          current wave is the biggest yet — and Boyar is entering at exactly the moment when the bottom tier is being
          eliminated and the demand for analytical depth is at its peak.
        </p>
      </section>
    </div>
  );
}
