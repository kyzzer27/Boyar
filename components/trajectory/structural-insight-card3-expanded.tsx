"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { TokenisationStructureSvg } from "@/components/trajectory/tokenisation-structure-svg";

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

const DUAL_LINE_LABELS = [
  "Jan 2024",
  "Q2 2024",
  "Q3 2024",
  "Q4 2024",
  "Q1 2025",
  "Q2 2025",
  "Q3 2025",
  "Q4 2025",
  "Q1 2026",
];

function DualLineTreasuriesChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: DUAL_LINE_LABELS,
        datasets: [
          {
            label: "Tokenised Treasuries",
            data: [0.91, 1.4, 2.1, 2.8, 3.5, 4.1, 4.8, 5.3, 5.8],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2.5,
          },
          {
            label: "On-chain private credit",
            data: [8.2, 9.5, 11.0, 13.0, 14.5, 15.8, 16.9, 17.8, 18.9],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#2A7D5F",
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
            min: 0,
            max: 22,
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                return `$${v}B`;
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
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          Tokenised Treasuries (B)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          On-chain private credit (B)
        </span>
      </div>
    </ChartAppear>
  );
}

const ENTITY_LABELS = [
  "Fund vehicle",
  "Master SPV",
  "20 loan SPVs",
  "Feeder entities",
  "Admin + compliance",
  "Token compliance layer",
  "Total entities",
];

function EntityGroupedBarChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();
    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ENTITY_LABELS,
        datasets: [
          {
            label: "Traditional",
            data: [1, 1, 20, 3, 2, 0, 27],
            backgroundColor: "#1E4A6E",
            borderRadius: 5,
            barPercentage: 0.4,
            categoryPercentage: 0.7,
          },
          {
            label: "Tokenised",
            data: [1, 1, 20, 3, 2, 8, 35],
            backgroundColor: "#6B3FA0",
            borderRadius: 5,
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
            max: 40,
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
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#1E4A6E" }} />
          Entities generated per fund
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          Entities when tokenised
        </span>
      </div>
    </ChartAppear>
  );
}

const PROJ_LABELS = ["2024", "2025", "2026E", "2027E", "2028E", "2029E", "2030E"];

function RwaTcspDualLogChart({ chartReady }: { chartReady: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!chartReady || !ref.current) return;
    const Chart = getChartCtor() as new (c: HTMLCanvasElement, o: unknown) => { destroy: () => void };
    inst.current?.destroy();

    const windowBar = PROJ_LABELS.map((_, i) => (i >= 1 && i <= 6 ? 3000 : null));

    inst.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: PROJ_LABELS,
        datasets: [
          {
            type: "bar" as const,
            label: "Window",
            data: windowBar,
            backgroundColor: "rgba(184,134,11,0.08)",
            borderWidth: 0,
            barPercentage: 1,
            categoryPercentage: 1,
            order: 3,
            yAxisID: "y",
          },
          {
            type: "line" as const,
            label: "Tokenised RWA",
            data: [40, 65, 120, 250, 500, 1000, 2000],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#6B3FA0",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2.5,
            order: 1,
            yAxisID: "y",
          },
          {
            type: "line" as const,
            label: "TCSP demand",
            data: [0.4, 0.7, 1.2, 2.5, 5, 10, 20],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.06)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            borderWidth: 2,
            order: 2,
            yAxisID: "y2",
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
            type: "logarithmic" as const,
            position: "left",
            min: 10,
            max: 3000,
            title: { display: true, text: "RWA market ($B, log)", color: "#6B3FA0" },
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                if (v >= 1000) return `$${v / 1000}B`;
                return `$${v}B`;
              },
            },
            grid: { color: "rgba(74,58,24,0.08)" },
          },
          y2: {
            type: "logarithmic" as const,
            position: "right",
            min: 0.1,
            max: 30,
            title: { display: true, text: "TCSP demand ($B, log)", color: "#2A7D5F" },
            ticks: {
              color: "#6E5A3A",
              callback(value: number | string) {
                const v = Number(value);
                if (v >= 1) return `$${v}B`;
                return `$${v}B`;
              },
            },
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
      <div className="h-[300px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          Tokenised RWA market (B)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          TCSP structuring demand generated (B est.)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-8 shrink-0 rounded-sm" style={{ backgroundColor: "rgba(184,134,11,0.15)" }} />
          Boyar&apos;s operating window
        </span>
      </div>
    </ChartAppear>
  );
}

function CompetitiveGapRadarChart({ chartReady }: { chartReady: boolean }) {
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
          "VASP licensing",
          "SPV formation",
          "Token compliance",
          "Trust structuring",
          "Banking intros",
          "Fund administration",
        ],
        datasets: [
          {
            label: "Boyar Partners",
            data: [85, 80, 80, 75, 80, 70],
            borderColor: "#2A7D5F",
            backgroundColor: "rgba(42,125,95,0.10)",
            pointBackgroundColor: "#2A7D5F",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2.5,
          },
          {
            label: "Traditional TCSP",
            data: [10, 90, 10, 90, 85, 80],
            borderColor: "#C7B99A",
            backgroundColor: "rgba(199,185,154,0.08)",
            pointBackgroundColor: "#C7B99A",
            pointBorderColor: CREAM,
            pointBorderWidth: 2,
            pointRadius: 5,
            borderWidth: 2,
          },
          {
            label: "Crypto-native firms",
            data: [70, 15, 85, 5, 10, 10],
            borderColor: "#6B3FA0",
            backgroundColor: "rgba(107,63,160,0.08)",
            pointBackgroundColor: "#6B3FA0",
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
      <div className="h-[300px] w-full">
        <canvas ref={ref} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px]" style={{ color: "#6E5A3A" }}>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#2A7D5F" }} />
          Boyar Partners (built for this)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#C7B99A" }} />
          Traditional TCSP (Sovereign, Dixcart)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: "#6B3FA0" }} />
          Crypto-native firms (no TCSP license)
        </span>
      </div>
    </ChartAppear>
  );
}

export function StructuralInsightCard3Expanded() {
  const chartReady = useChartJsReady();

  return (
    <div className="w-full px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      {/* Component 1 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          In March 2024, BlackRock launched BUIDL — a tokenised money market fund on Ethereum. It reached $2.9 billion in
          assets. JP Morgan has processed over $900 billion in tokenised repo transactions through its Onyx platform.
          Franklin Templeton, Ondo Finance, and Securitize followed. Tokenised U.S. Treasury products reached $5.8 billion
          by March 2026 — a 539% expansion from January 2024. Total institutional RWA (Real-World Asset) value locked hit $65
          billion in 2025. Active on-chain private credit exceeds $18.9 billion in loans, with cumulative originations
          reaching $33.66 billion. Over 200 institutional RWA projects are active. McKinsey projects the tokenised asset
          market at $2 trillion by 2030. The Bank for International Settlements projects 10% of global GDP could be
          tokenised by 2034.
        </p>
      </section>

      {/* Component 2 */}
      <section className="mx-auto max-w-[720px] py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#4A2060" }}>
            <p className="text-sm" style={{ color: "#AFA9EC" }}>
              BlackRock BUIDL
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#EEEDFE" }}>
              $2.9B
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#CECBF6" }}>
              tokenised fund on Ethereum
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#1E4A6E" }}>
            <p className="text-sm" style={{ color: "#85B7EB" }}>
              JP Morgan Onyx
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#E6F1FB" }}>
              $900B+
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#B5D4F4" }}>
              tokenised repo transactions
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#2D5F3A" }}>
            <p className="text-sm" style={{ color: "#5DCAA5" }}>
              Total RWA locked
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#E1F5EE" }}>
              $65B
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#9FE1CB" }}>
              institutional value on-chain
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#7A4A0A" }}>
            <p className="text-sm" style={{ color: "#FAC775" }}>
              Tokenised Treasuries
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#FAEEDA" }}>
              $5.8B
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#EF9F27" }}>
              539% growth since Jan 2024
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#6E3518" }}>
            <p className="text-sm" style={{ color: "#F0997B" }}>
              On-chain private credit
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#FAECE7" }}>
              $18.9B
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#F5C4B3" }}>
              $33.66B cumulative originated
            </p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#4A3A18" }}>
            <p className="text-sm" style={{ color: "#D3D1C7" }}>
              McKinsey 2030 projection
            </p>
            <p className="mt-2 text-[28px] font-medium leading-tight" style={{ color: "#F1EFE8" }}>
              $2T
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#B4B2A9" }}>
              BIS: 10% global GDP by 2034
            </p>
          </div>
        </div>
      </section>

      {/* Component 3 */}
      <section className="mx-auto max-w-[720px] py-16">
        <DualLineTreasuriesChart chartReady={chartReady} />
      </section>

      {/* Component 4 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mx-auto max-w-[640px] text-center text-[18px] font-bold leading-relaxed text-[#4A3A18]">
          The insight that every market report overlooks: every single tokenised asset requires traditional corporate
          structuring underneath it.
        </p>
        <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          A tokenised real estate fund needs a Special Purpose Vehicle to hold the property. A tokenised Treasury product
          needs a regulated fund entity with custodian arrangements. A private credit token needs an SPV with legal
          isolation, governance documentation, and multi-jurisdictional compliance. The token lives on a blockchain. The
          legal structure underneath it is a company, a trust, or a fund.
        </p>
        <div className="mt-10">
          <ChartAppear>
            <TokenisationStructureSvg />
          </ChartAppear>
        </div>
      </section>

      {/* Component 5 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          Private credit has grown to $1.7 trillion globally. A single fund with 20 underlying loans generates 25+
          entities:
        </p>
        <EntityGroupedBarChart chartReady={chartReady} />
      </section>

      {/* Component 6 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The tokenised RWA market is heading to $2 trillion by 2030. Every dollar generates TCSP structuring demand:
        </p>
        <RwaTcspDualLogChart chartReady={chartReady} />
      </section>

      {/* Component 7 */}
      <section className="mx-auto max-w-[720px] py-16">
        <p className="mb-6 text-center text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          The competitive gap that makes this urgent — what each firm type can and cannot do:
        </p>
        <CompetitiveGapRadarChart chartReady={chartReady} />
      </section>

      {/* Component 8 */}
      <section className="mx-auto max-w-[720px] py-16 text-center">
        <p className="mx-auto max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          This is TCSP work. And virtually no TCSP is doing it. Sovereign Group, Dixcart, the Channel Islands firms — none
          of them have a tokenisation practice. The work is there. The demand is institutional. The firms that should be
          servicing it are not present.
        </p>
        <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-[#4A3A18] sm:text-lg">
          This convergence is amplified by the private credit explosion. Private credit has grown to $1.7 trillion globally
          in assets under management. A single private credit fund with 20 underlying loans can generate 25+ entities —
          each requiring formation, administration, and annual compliance. When private credit meets tokenisation — which
          is already happening at institutional scale — the structuring complexity multiplies. Each tokenised private
          credit deal needs the full SPV/trust infrastructure plus the token compliance layer.
        </p>
        <p className="mx-auto mt-8 max-w-[720px] text-base font-bold leading-relaxed text-[#4A3A18] sm:text-lg">
          The firms that build expertise in structuring for tokenised assets during this 2025–2030 window — while the
          infrastructure layer of a new financial system is being constructed — will own the next two decades of deal flow in
          the fastest-growing segment of the TCSP market. This knowledge is experiential, not theoretical, and it compounds
          with every completed mandate.
        </p>
      </section>
    </div>
  );
}
