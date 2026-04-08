"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";

interface LicensingTier {
  name: string;
  proposals: number;
  weight: number;
  fee: number;
  renewalFee: number;
}

const LICENSING_TIERS: LicensingTier[] = [
  { name: "Crypto / CASP", proposals: 5, weight: 0.45, fee: 12000, renewalFee: 4000 },
  { name: "Forex / Securities", proposals: 4, weight: 0.25, fee: 18000, renewalFee: 6000 },
  { name: "Banking", proposals: 3, weight: 0.1, fee: 35000, renewalFee: 15000 },
  { name: "Fund / Gaming", proposals: 3, weight: 0.2, fee: 20000, renewalFee: 5000 },
];

const BLENDED_FEE = LICENSING_TIERS.reduce((sum, t) => sum + t.weight * t.fee, 0);
const BLENDED_RENEWAL = LICENSING_TIERS.reduce((sum, t) => sum + t.weight * t.renewalFee, 0);
const RENEWAL_RATE = 0.55;

interface YearProjection {
  year: string;
  newClients: number;
  newRevenue: number;
  renewals: number;
  renewalRevenue: number;
  total: number;
  cumulative: number;
}

const YEARLY_NEW_CLIENTS = [0, 2, 3, 4, 5];

function buildProjection(): YearProjection[] {
  const years: YearProjection[] = [];
  let cumulative = 0;

  years.push({ year: "Y1", newClients: 0, newRevenue: 0, renewals: 0, renewalRevenue: 0, total: 0, cumulative: 0 });

  const y2new = 2;
  const y2rev = y2new * BLENDED_FEE;
  cumulative += y2rev;
  years.push({ year: "Y2", newClients: y2new, newRevenue: y2rev, renewals: 0, renewalRevenue: 0, total: y2rev, cumulative });

  const y3new = 3;
  const y3rev = y3new * BLENDED_FEE;
  const y3ren = 1;
  const y3renRev = y3ren * BLENDED_RENEWAL;
  const y3total = y3rev + y3renRev;
  cumulative += y3total;
  years.push({ year: "Y3", newClients: y3new, newRevenue: y3rev, renewals: y3ren, renewalRevenue: y3renRev, total: y3total, cumulative });

  const y4new = 4;
  const y4rev = y4new * BLENDED_FEE;
  const y4ren = 2;
  const y4renRev = y4ren * BLENDED_RENEWAL;
  const y4total = y4rev + y4renRev;
  cumulative += y4total;
  years.push({ year: "Y4", newClients: y4new, newRevenue: y4rev, renewals: y4ren, renewalRevenue: y4renRev, total: y4total, cumulative });

  const y5new = 5;
  const y5rev = y5new * BLENDED_FEE;
  const y5ren = 3;
  const y5renRev = y5ren * BLENDED_RENEWAL;
  const y5total = y5rev + y5renRev;
  cumulative += y5total;
  years.push({ year: "Y5", newClients: y5new, newRevenue: y5rev, renewals: y5ren, renewalRevenue: y5renRev, total: y5total, cumulative });

  return years;
}

const PROJECTION = buildProjection();
const FIVE_YEAR_CUMULATIVE = PROJECTION[PROJECTION.length - 1].cumulative;
const CORE_REVENUE = [111900, 212780, 315500, 539970, 672740];
const gridColor = "rgba(255,255,255,0.08)";
const tickColor = "rgba(255,255,255,0.5)";

function usdFormatter(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function percentFormatter(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function LicensingProjectionPage() {
  const [chartReady, setChartReady] = useState(false);
  const stackedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const areaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waterfallCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stackedChartRef = useRef<any>(null);
  const areaChartRef = useRef<any>(null);
  const waterfallChartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartReady) return;
    const Chart = (window as any).Chart;
    if (!Chart) return;

    if (stackedChartRef.current) stackedChartRef.current.destroy();
    if (areaChartRef.current) areaChartRef.current.destroy();
    if (waterfallChartRef.current) waterfallChartRef.current.destroy();

    const years = PROJECTION.map((y) => y.year);

    if (stackedCanvasRef.current) {
      const ctx = stackedCanvasRef.current.getContext("2d");
      if (ctx) {
        stackedChartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: years,
            datasets: [
              {
                label: "New revenue",
                data: PROJECTION.map((y) => y.newRevenue / 1000),
                backgroundColor: "#378ADD",
                borderRadius: 3,
                stack: "annual",
                order: 2,
              },
              {
                label: "Renewal revenue",
                data: PROJECTION.map((y) => y.renewalRevenue / 1000),
                backgroundColor: "#1D9E75",
                borderRadius: 3,
                stack: "annual",
                order: 2,
              },
              {
                type: "line",
                label: "Cumulative",
                data: PROJECTION.map((y) => y.cumulative / 1000),
                borderColor: "#E24B4A",
                backgroundColor: "transparent",
                borderWidth: 2,
                tension: 0.25,
                pointRadius: 5,
                pointBackgroundColor: "#E24B4A",
                pointBorderColor: "#E24B4A",
                fill: false,
                yAxisID: "y1",
                order: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context: any) {
                    const label = context.dataset.label ?? "";
                    const val = context.raw ?? 0;
                    return `${label}: ${usdFormatter(val * 1000)}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { color: gridColor },
                ticks: { color: tickColor },
              },
              y: {
                stacked: true,
                grid: { color: gridColor },
                ticks: {
                  color: tickColor,
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
                title: {
                  display: true,
                  text: "Annual ($K)",
                  color: tickColor,
                },
              },
              y1: {
                position: "right",
                grid: { drawOnChartArea: false },
                ticks: {
                  color: "rgba(239,68,68,0.8)",
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
                title: {
                  display: true,
                  text: "Cumulative ($K)",
                  color: "rgba(239,68,68,0.8)",
                },
              },
            },
          },
        });
      }
    }

    if (areaCanvasRef.current) {
      const ctx = areaCanvasRef.current.getContext("2d");
      if (ctx) {
        areaChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: years,
            datasets: [
              {
                label: "Core 6 services",
                data: CORE_REVENUE.map((v) => v / 1000),
                borderColor: "#378ADD",
                backgroundColor: "rgba(55,138,221,0.2)",
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#378ADD",
                borderWidth: 2,
                order: 2,
              },
              {
                label: "Licensing",
                data: PROJECTION.map((y) => y.total / 1000),
                borderColor: "#1D9E75",
                backgroundColor: "rgba(29,158,117,0.35)",
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#1D9E75",
                borderWidth: 2,
                order: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context: any) {
                    const label = context.dataset.label ?? "";
                    const val = context.raw ?? 0;
                    return `${label}: ${usdFormatter(val * 1000)}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: tickColor },
              },
              y: {
                stacked: true,
                grid: { color: gridColor },
                ticks: {
                  color: tickColor,
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
                title: {
                  display: true,
                  text: "Combined revenue ($K)",
                  color: tickColor,
                },
              },
            },
          },
        });
      }
    }

    if (waterfallCanvasRef.current) {
      const ctx = waterfallCanvasRef.current.getContext("2d");
      if (ctx) {
        const segments = [
          { label: "Y2 new", value: 34800 },
          { label: "Y3 new", value: 52200 },
          { label: "Y3 renew", value: 5800 },
          { label: "Y4 new", value: 69600 },
          { label: "Y4 renew", value: 11600 },
          { label: "Y5 new", value: 87000 },
          { label: "Y5 renew", value: 17400 },
        ];

        let running = 0;
        const base: number[] = [];
        const heights: number[] = [];
        segments.forEach((s) => {
          base.push(running / 1000);
          running += s.value;
          heights.push(s.value / 1000);
        });

        waterfallChartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: segments.map((s) => s.label),
            datasets: [
              {
                label: "Base",
                data: base,
                backgroundColor: "rgba(0,0,0,0)",
                hoverBackgroundColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderSkipped: false,
                stack: "waterfall",
              },
              {
                label: "Increment",
                data: heights,
                backgroundColor: (ctx2: any) => {
                  const idx = ctx2.dataIndex;
                  const label = segments[idx].label;
                  if (label.includes("renew")) return "#1D9E75";
                  return "#378ADD";
                },
                borderRadius: 3,
                stack: "waterfall",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context: any) {
                    if (context.datasetIndex === 0) return "";
                    const val = context.raw ?? 0;
                    return usdFormatter(val * 1000);
                  },
                },
                filter(tooltipItem: any) {
                  return tooltipItem.datasetIndex !== 0;
                },
              },
            },
            scales: {
              x: {
                grid: { color: gridColor },
                ticks: { color: tickColor },
              },
              y: {
                grid: { color: gridColor },
                ticks: {
                  color: tickColor,
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
                title: {
                  display: true,
                  text: "Cumulative build up ($K)",
                  color: tickColor,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (stackedChartRef.current) stackedChartRef.current.destroy();
      if (areaChartRef.current) areaChartRef.current.destroy();
      if (waterfallChartRef.current) waterfallChartRef.current.destroy();
    };
  }, [chartReady]);

  const licensingShareY5 = (PROJECTION[4].total / (PROJECTION[4].total + CORE_REVENUE[4])) * 100;

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js@4.4.6/dist/chart.umd.min.js"
          strategy="afterInteractive"
          onReady={() => setChartReady(true)}
        />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <Link href="/tools" className="text-sm text-white/70 transition hover:text-white">
              ← Back to Revenue Projection
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Licensing Revenue</p>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Licensing Revenue Projection
              </h1>
              <p className="mt-1 text-xs text-white/60">Five year outlook, Boyar Partners</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <motion.section
            className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Summary</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                label="Five year cumulative"
                value={usdFormatter(FIVE_YEAR_CUMULATIVE)}
                sub="14 new clients plus renewals"
                valueClass="text-emerald-400"
              />
              <SummaryCard
                label="Blended fee"
                value={usdFormatter(BLENDED_FEE)}
                sub="Tier weighted from 14 proposals"
              />
              <SummaryCard
                label="Renewal rate"
                value={percentFormatter(RENEWAL_RATE * 100, 0)}
                sub={`${usdFormatter(BLENDED_RENEWAL)}/yr per renewal`}
              />
              <SummaryCard
                label="Y5 licensing share"
                value={percentFormatter(licensingShareY5, 1)}
                sub="Of combined $777,140"
              />
            </div>
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Projection Table</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-white/80">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Year</th>
                    <th className="px-4 py-3 text-right font-medium">New clients</th>
                    <th className="px-4 py-3 text-right font-medium">New revenue</th>
                    <th className="px-4 py-3 text-right font-medium">Renewals</th>
                    <th className="px-4 py-3 text-right font-medium">Renewal rev</th>
                    <th className="px-4 py-3 text-right font-medium">Total</th>
                    <th className="px-4 py-3 text-right font-medium">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTION.map((row) => (
                    <tr
                      key={row.year}
                      className={classNames(
                        "border-t border-white/10",
                        row.year === "Y5" && "bg-white/5",
                      )}
                    >
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3 text-right">{row.newClients}</td>
                      <td className="px-4 py-3 text-right">{usdFormatter(row.newRevenue)}</td>
                      <td className="px-4 py-3 text-right">{row.renewals}</td>
                      <td className="px-4 py-3 text-right">{usdFormatter(row.renewalRevenue)}</td>
                      <td className="px-4 py-3 text-right text-white font-semibold">
                        {usdFormatter(row.total)}
                      </td>
                      <td
                        className={classNames(
                          "px-4 py-3 text-right font-semibold",
                          row.year === "Y5" ? "text-emerald-400" : "text-white",
                        )}
                      >
                        {usdFormatter(row.cumulative)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Revenue Trajectory</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Annual licensing revenue and cumulative build
            </h2>
            <div className="relative mt-6 h-64 w-full">
              <canvas ref={stackedCanvasRef} className="h-full w-full" />
            </div>
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Combined Impact</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Core revenue and licensing layered together
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-white/80">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Year</th>
                    <th className="px-4 py-3 text-right font-medium">Core 6 services</th>
                    <th className="px-4 py-3 text-right font-medium">Licensing</th>
                    <th className="px-4 py-3 text-right font-medium">Combined</th>
                    <th className="px-4 py-3 text-right font-medium">Licensing %</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTION.map((row, idx) => {
                    const core = CORE_REVENUE[idx];
                    const combined = core + row.total;
                    const share = combined > 0 ? (row.total / combined) * 100 : 0;
                    const highlight = idx === 4;
                    return (
                      <tr
                        key={row.year}
                        className={classNames(
                          "border-t border-white/10",
                          highlight && "bg-white/5",
                        )}
                      >
                        <td className="px-4 py-3">{row.year}</td>
                        <td className="px-4 py-3 text-right">{usdFormatter(core)}</td>
                        <td className="px-4 py-3 text-right">{usdFormatter(row.total)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-white">{usdFormatter(combined)}</td>
                        <td
                          className={classNames(
                            "px-4 py-3 text-right font-semibold",
                            highlight ? "text-emerald-400" : "text-white/80",
                          )}
                        >
                          {percentFormatter(share)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="relative mt-6 h-56 w-full">
              <canvas ref={areaCanvasRef} className="h-full w-full" />
            </div>
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Pricing Derivation</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              How the blended fee of {usdFormatter(BLENDED_FEE)} was derived
            </h2>
            <div className="mt-4 overflow-x-auto text-sm text-white/80">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium text-right">Proposals</th>
                    <th className="px-4 py-3 font-medium text-right">Weight</th>
                    <th className="px-4 py-3 font-medium text-right">Fee estimate</th>
                    <th className="px-4 py-3 font-medium text-right">Contribution</th>
                    <th className="px-4 py-3 font-medium text-right">Renewal fee</th>
                  </tr>
                </thead>
                <tbody>
                  {LICENSING_TIERS.map((tier) => {
                    const contribution = tier.weight * tier.fee;
                    return (
                      <tr key={tier.name} className="border-t border-white/10">
                        <td className="px-4 py-2">{tier.name}</td>
                        <td className="px-4 py-2 text-right">{tier.proposals} of 14</td>
                        <td className="px-4 py-2 text-right">{percentFormatter(tier.weight * 100, 0)}</td>
                        <td className="px-4 py-2 text-right">{usdFormatter(tier.fee)}</td>
                        <td className="px-4 py-2 text-right">{usdFormatter(contribution)}</td>
                        <td className="px-4 py-2 text-right">{usdFormatter(tier.renewalFee)}</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-2 font-semibold text-white">Blended average</td>
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2 font-semibold text-white">
                      {usdFormatter(BLENDED_FEE)}
                    </td>
                    <td className="px-4 py-2 font-semibold text-white">
                      {usdFormatter(BLENDED_RENEWAL)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
              {LICENSING_TIERS.map((tier, idx) => {
                const colors = ["#7F77DD", "#378ADD", "#D85A30", "#1D9E75"];
                return (
                  <div
                    key={tier.name}
                    className="h-full"
                    style={{ width: `${tier.weight * 100}%`, backgroundColor: colors[idx] }}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/60">
              {LICENSING_TIERS.map((tier, idx) => {
                const colors = ["#7F77DD", "#378ADD", "#D85A30", "#1D9E75"];
                return (
                  <div key={tier.name} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: colors[idx] }} />
                    <span>
                      {tier.name} {Math.round(tier.weight * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <InsightBlock
              borderColor="#7F77DD"
              title="MiCA is creating unprecedented demand"
              body="Over 40 CASP licenses have been issued across EU member states since December 2024 according to the ESMA public register. Every existing virtual asset provider must apply again by July 2026. Germany and Netherlands lead issuance. Enforcement has already produced hundreds of millions of euros in fines. Licensing advisory firms such as AdamSmith.lt, MAXCORP, and Gofaizen and Sherle are processing record volumes. Boyar's crypto tier at 45 percent weight is aligned with this MiCA driven demand."
            />
            <InsightBlock
              borderColor="#38bdf8"
              title="Professional services revenue per consultant sits around $199K"
              body="SPI Research's 2025 Professional Services Benchmark reports average revenue per consultant at about $199,000 in 2024. Boyar's Y5 licensing projection of $104,400 is roughly half the industry average, generated from a single service line with no dedicated headcount. On a per engagement basis, $17,400 sits comfortably within the boutique advisory range of $150,000 to $220,000 per consultant per year."
            />
            <InsightBlock
              borderColor="#10b981"
              title="Boutique consulting margins run between 15 and 30 percent"
              body="Industry benchmarks show that boutique consulting firms typically operate at 15 to 30 percent operating margins, with specialized firms sometimes reaching 50 percent and above. Boyar's licensing model retains 20 to 35 percent margin, with the balance going to fulfillment partners. The coordination only model keeps variable cost low, which means each licensing dollar is highly capital efficient."
            />
            <InsightBlock
              borderColor="#f97316"
              title="Fulfillment partners have already delivered more than 130 licenses"
              body="Boyar's primary fulfillment partner Manimama, an Estonian registered Ukrainian fintech law firm, has delivered more than 130 licenses globally. Their chief executive authored Ukraine's Virtual Assets draft law. Gatwick Law, established in 1995 and a UAE corporate service provider, gives Boyar a second fulfillment channel. These are working partnerships with an existing track record, not theoretical relationships. Boyar's fourteen proposal templates exist because these partners already deliver."
            />
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Sensitivity</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              How the five year outcome shifts under different assumptions
            </h2>
            <div className="mt-4 overflow-x-auto text-sm text-white/80">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Scenario</th>
                    <th className="px-4 py-3 font-medium">New clients (Y1 to Y5)</th>
                    <th className="px-4 py-3 font-medium text-right">Fee</th>
                    <th className="px-4 py-3 font-medium text-right">Renewal rate</th>
                    <th className="px-4 py-3 font-medium text-right">Five year cumulative</th>
                    <th className="px-4 py-3 font-medium text-right">vs base</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-2">Bear case</td>
                    <td className="px-4 py-2">0, 1, 2, 3, 3</td>
                    <td className="px-4 py-2 text-right">{usdFormatter(14000)}</td>
                    <td className="px-4 py-2 text-right">40%</td>
                    <td className="px-4 py-2 text-right">{usdFormatter(136800)}</td>
                    <td className="px-4 py-2 text-right text-red-400">-51%</td>
                  </tr>
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-2 font-semibold text-white">Base case</td>
                    <td className="px-4 py-2">0, 2, 3, 4, 5</td>
                    <td className="px-4 py-2 text-right font-semibold text-white">
                      {usdFormatter(BLENDED_FEE)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-white">
                      {percentFormatter(RENEWAL_RATE * 100, 0)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-white">
                      {usdFormatter(FIVE_YEAR_CUMULATIVE)}
                    </td>
                    <td className="px-4 py-2 text-right text-white/60">Reference</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-2">Bull case</td>
                    <td className="px-4 py-2">1, 3, 5, 6, 7</td>
                    <td className="px-4 py-2 text-right">{usdFormatter(21000)}</td>
                    <td className="px-4 py-2 text-right">65%</td>
                    <td className="px-4 py-2 text-right">{usdFormatter(543200)}</td>
                    <td className="px-4 py-2 text-right text-emerald-400">+95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-white/70">
              Bear case assumes MiCA demand cools, crypto winter extends, and only forex and fund clients convert. Bull
              case assumes one banking client at $35,000 per year and higher cross sell from MiCA driven CASP demand.
            </p>
          </motion.section>

          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Waterfall</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              How the Y5 number is built over time
            </h2>
            <div className="relative mt-6 h-64 w-full">
              <canvas ref={waterfallCanvasRef} className="h-full w-full" />
            </div>
          </motion.section>

          <motion.section
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ReasoningBlock
              title="Why Year 1 shows zero licensing revenue"
              body="Year 1 focuses on deploying ₹42.36 lakh to acquire 16 clients across six core services and on proving that the model works. Licensing engagements run between three and twelve months from proposal to delivered license. Even if a formation client asks about licensing in Month six, that revenue lands in Year 2. In practice, a client usually wants to see Boyar successfully deliver their company formation before trusting the firm with a licensing mandate worth more than $17,000. Year 1 builds pipeline rather than fee recognition. Content goes out, proposals are prepared, and partner relationships are tested. Revenue starts in Year 2."
            />
            <ReasoningBlock
              title="Why these new client volumes are conservative"
              body="Year 2 assumes two licensing clients that come from cross sell and inbound content. That is two out of roughly 28 cumulative core clients, a cross sell rate of about seven percent. For crypto and forex operators, this is a low conversion rate. Year 3 assumes three clients as the content pipeline reaches 24 months of maturity and the first referral arrives. Year 4 assumes four clients, one per quarter. Year 5 assumes five clients, one every ten weeks. At that point Boyar has nine completed engagements and real case studies. For a firm with fourteen jurisdiction templates and two established fulfillment partners, fourteen clients over five years is comfortably inside capacity."
            />
            <ReasoningBlock
              title="Why $17,400 is a fair blended fee"
              body="This figure is tier weighted from Boyar's own fourteen proposals and cross checked against more than fifteen market providers. EU CASP licenses run from about €8,500 to €25,000 through providers such as AdamSmith.lt, Gofaizen and Sherle, and MAXCORP. Forex licenses run from $15,000 to $60,000 through Atomiq Consulting. Banking licenses run from $135,000 to $300,000 through providers such as BankLicense.pro. The high crypto weight at 45 percent pulls the blended figure down to $17,400, which sits below a simple average of $21,250. A single banking client at $35,000 per year would push realized revenue above this assumption. The base case is deliberately conservative."
            />
            <ReasoningBlock
              title="Why 55 percent is the right renewal rate"
              body="Licensing renewals are complex and switching providers in the middle of a compliance cycle means explaining the client's entire regulatory history to a new team. That reality supports a renewal rate higher than 42 percent. At the same time some clients will build in house compliance after Year 1 or Year 2 and some crypto startups simply will not survive. That argues against a 70 percent rate. Fifty five percent means roughly one in two clients stays on for renewal. The renewal fee of $5,800 is cross checked against Boyar's own data on Belize banking, Mauritius forex, and Puerto Rico banking engagements."
            />
            <ReasoningBlock
              title="Why this model carries zero incremental CAC"
              body="Licensing keywords such as VASP license Cayman, EMI license, and MSB licensing are already present in Boyar's content strategy. Clients arrive through three existing channels: cross sell from formation and structure clients, inbound from content marketing that is already budgeted at ₹30,000 per month, and paid traffic through Google and LinkedIn that is already covered by the ₹15,60,000 marketing budget. Every licensing dollar arrives at effectively infinite marginal return on incremental acquisition spend."
            />
            <ReasoningBlock
              title="Why revenue is stated gross rather than net margin"
              body="All six existing services are shown in gross revenue terms. Corporate Services at $3,500 per client does not deduct Boyar's time cost. Licensing follows the same convention. Boyar outsources around 80 percent of the work to partners and retains 20 to 35 percent as advisory and coordination margin. The footnote for investors is simple: licensing revenue reflects the full advisory fee, while approximately 65 to 80 percent of engagement cost is shared with specialist regulatory partners. Boyar retains the client relationship, the engagement management, and the coordination margin."
            />
          </motion.section>

          <motion.section
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <InsightBlock
              borderColor="#38bdf8"
              title="Where do licensing clients come from"
              body="Licensing clients arrive through the same acquisition funnel as formation and structure mandates. The primary drivers are cross sell from existing clients, inbound leads from detailed licensing content, and referrals from fulfillment partners. No new marketing channel is required. The funnel that brings in formation clients already brings in licensing leads by design."
            />
            <InsightBlock
              borderColor="#10b981"
              title="Why only fourteen clients over five years"
              body="Fourteen clients across five years is intentionally cautious. By Year 5 the model assumes a run rate of five clients per year, roughly one new licensing engagement every ten weeks. Boyar already has fourteen licensing proposal templates and two execution partners with global track records. The base case uses far fewer clients than the firm's theoretical capacity."
            />
            <InsightBlock
              borderColor="#f97316"
              title="How the firm can be confident about pricing"
              body="The blend is not a guess. It reflects a weighted mix of Boyar's own proposals and a review of more than fifteen independent providers across CASP, forex, banking, and fund licensing. That market scan is already coded into this page. Pricing is validated against real quotes rather than a notional target."
            />
            <InsightBlock
              borderColor="#a855f7"
              title="What happens if licensing does not materialise"
              body="The five year core revenue stack without any licensing already reaches $672,740 by Year 5. Licensing at $104,400 is a 13.4 percent uplift. It is attractive but not load bearing. The investment case stands on formation, structure, and corporate services. Licensing turns that solid base into a more interesting equity story by adding a high margin advisory layer."
            />
          </motion.section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  sub: string;
  valueClass?: string;
}

function SummaryCard({ label, value, sub, valueClass }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">{label}</p>
      <p
        className={classNames("mt-2 text-lg font-semibold text-white", valueClass)}
        style={{ fontFamily: "var(--font-benzin)" }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-white/60">{sub}</p>
    </div>
  );
}

interface InsightBlockProps {
  borderColor: string;
  title: string;
  body: string;
}

function InsightBlock({ borderColor, title, body }: InsightBlockProps) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-black/60 p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="border-l-2 pl-4" style={{ borderColor }}>
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

interface ReasoningBlockProps {
  title: string;
  body: string;
}

function ReasoningBlock({ title, body }: ReasoningBlockProps) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-black/60 p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/80 leading-relaxed">{body}</p>
    </motion.div>
  );
}

function MarketFeeRangeChart() {}

