"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";

interface RevenueRow {
  service: string;
  clients: number;
  unitUsd: number;
  newRevenue: number;
  renewals: number;
  renewalRevenue: number;
  total: number;
}

const revenueRows: RevenueRow[] = [
  { service: "Company Formation", clients: 16, unitUsd: 2500, newRevenue: 40000, renewals: 25, renewalRevenue: 43750, total: 83750 },
  { service: "Standalone Trust", clients: 3, unitUsd: 13000, newRevenue: 39000, renewals: 4, renewalRevenue: 36400, total: 75400 },
  { service: "Full Structure", clients: 5, unitUsd: 29700, newRevenue: 148500, renewals: 8, renewalRevenue: 166320, total: 314820 },
  { service: "Corporate Services", clients: 4, unitUsd: 3500, newRevenue: 14000, renewals: 0, renewalRevenue: 0, total: 14000 },
  { service: "Banking", clients: 8, unitUsd: 6500, newRevenue: 52000, renewals: 0, renewalRevenue: 0, total: 52000 },
];

const TOTAL_REVENUE_USD = 539970;
const TOTAL_REVENUE_INR = Math.round(539970 * 90.44);
const TOTAL_CLIENTS = revenueRows.reduce((sum, row) => sum + row.clients, 0);
const GROWTH_VS_YEAR3 = "71.1%";

const serviceColors: Record<string, string> = {
  "Company Formation": "#34d399",
  "Standalone Trust": "#a78bfa",
  "Full Structure": "#38bdf8",
  Banking: "#facc15",
  "Corporate Services": "#c084fc",
};

function usdFormatter(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function inrFormatter(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
}

function buildPieGradient() {
  const total = revenueRows.reduce((sum, row) => sum + row.total, 0);
  let cumulative = 0;

  return revenueRows
    .map((row) => {
      const start = cumulative;
      const slice = (row.total / total) * 100;
      cumulative += slice;
      return `${serviceColors[row.service]} ${start}% ${cumulative}%`;
    })
    .join(", ");
}

/** Same blue shades as burn rate assessment bar chart */
const BAR_BLUES = [
  "#60a5fa", // light
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af", // deep
];

interface RevenueByServiceBarChartProps {
  revenueRows: RevenueRow[];
  maxRevenue: number;
  usdFormatter: (value: number) => string;
}

function RevenueByServiceBarChart({ revenueRows, maxRevenue, usdFormatter }: RevenueByServiceBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const yAxisMax = Math.ceil(maxRevenue / 20000) * 20000 || 100000;
  const chartHeight = 200;
  const chartTop = 20;
  const chartBottom = 240;
  const chartWidth = 330;
  const startX = 50;
  const n = revenueRows.length;
  const barSpacing = chartWidth / n;
  const barWidth = Math.min(barSpacing * 0.65, 48);

  return (
    <motion.section
      className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Revenue by service</p>
      <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
        Year 4 Performance by Service (USD)
      </h3>
      <p className="mt-1 text-sm text-white/60">Bar chart: one bar per service, same style as burn rate assessment.</p>
      <div className="relative mt-6 h-80 w-full">
        <svg viewBox="0 0 400 280" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          <line x1={40} y1={240} x2={380} y2={240} stroke="rgba(148,163,184,0.5)" strokeWidth={0.5} />
          <line x1={40} y1={20} x2={40} y2={240} stroke="rgba(148,163,184,0.5)" strokeWidth={0.5} />
          {[0.25, 0.5, 0.75].map((r) => (
            <line key={r} x1={50} x2={380} y1={240 - r * 200} y2={240 - r * 200} stroke="rgba(148,163,184,0.2)" strokeWidth={0.5} strokeDasharray="4 4" />
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
            <text key={r} x={38} y={240 - r * 200 + 4} textAnchor="end" fontSize={8} fill="rgba(148,163,184,0.9)">
              {i === 0 ? "0" : `$${Math.round((yAxisMax * r) / 1000)}k`}
            </text>
          ))}
          {revenueRows.map((row, idx) => {
            const centerX = startX + idx * barSpacing + barSpacing / 2;
            const x = centerX - barWidth / 2;
            const fullHeight = (row.total / yAxisMax) * chartHeight;
            const yPos = chartBottom - fullHeight;
            const [firstWord, ...restWords] = row.service.split(" ");
            const secondLine = restWords.join(" ");
            return (
              <g key={row.service}>
                <rect
                  x={x}
                  y={yPos}
                  width={barWidth}
                  height={fullHeight}
                  fill={BAR_BLUES[idx % BAR_BLUES.length]}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: "pointer" }}
                />
                <text x={centerX} y={255} textAnchor="middle" fontSize={8} fill="rgba(148,163,184,0.9)">
                  <tspan x={centerX} dy={0}>{firstWord}</tspan>
                  {secondLine && <tspan x={centerX} dy={9}>{secondLine}</tspan>}
                </text>
              </g>
            );
          })}
          {hoveredIndex !== null && (
            <g>
              <rect
                x={50 + hoveredIndex * barSpacing + barSpacing / 2 - 55}
                y={20}
                width={110}
                height={44}
                fill="rgba(0,0,0,0.9)"
                rx={4}
                stroke="rgba(255,255,255,0.2)"
              />
              <text x={50 + hoveredIndex * barSpacing + barSpacing / 2} y={35} textAnchor="middle" fontSize={10} fill="white" fontWeight="bold">
                {revenueRows[hoveredIndex].service}
              </text>
              <text x={50 + hoveredIndex * barSpacing + barSpacing / 2} y={50} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.9)">
                {usdFormatter(revenueRows[hoveredIndex].total)}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {revenueRows.map((row, i) => (
          <div key={row.service} className="flex items-center gap-2 text-xs text-white/70">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: BAR_BLUES[i % BAR_BLUES.length] }} />
            <span>{row.service}</span>
            <span className="text-white/50">{usdFormatter(row.total)}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default function YearFourRevenuePage() {
  const router = useRouter();
  const pieGradient = `conic-gradient(${buildPieGradient()})`;
  const maxRevenue = Math.max(...revenueRows.map((row) => row.total));

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <button onClick={() => router.back()} className="text-sm text-white/70 transition hover:text-white">
              ← Back
              </button>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Year 4 Projection</p>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Revenue Stack · FY2029
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Total Clients: {TOTAL_CLIENTS}</p>
              <p>Growth vs Year 3: {GROWTH_VS_YEAR3}</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Revenue (USD)", value: usdFormatter(TOTAL_REVENUE_USD) },
              { label: "Total Revenue (INR)", value: inrFormatter(TOTAL_REVENUE_INR) },
              { label: "Clients Closed", value: TOTAL_CLIENTS.toString() },
              { label: "Renewals Value", value: usdFormatter(revenueRows.reduce((sum, row) => sum + row.renewalRevenue, 0)) },
            ].map((card) => (
              <motion.div
                key={card.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{card.label}</p>
                <p className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  {card.value}
                </p>
              </motion.div>
            ))}
          </section>

          <section className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Core Table</p>
                <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  Year 4 Revenue Projection
                </h2>
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
                Renewal base now exceeds $200K annually.
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm text-white/80">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Service Type</th>
                    <th className="px-4 py-3 text-right font-medium">Clients</th>
                    <th className="px-4 py-3 text-right font-medium">Per-Unit (USD)</th>
                    <th className="px-4 py-3 text-right font-medium">New Revenue</th>
                    <th className="px-4 py-3 text-right font-medium">Renewals</th>
                    <th className="px-4 py-3 text-right font-medium">Renewal Revenue</th>
                    <th className="px-4 py-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRows.map((row) => (
                    <tr key={row.service} className="border-t border-white/10">
                      <td className="px-4 py-3 text-white">{row.service}</td>
                      <td className="px-4 py-3 text-right">{row.clients}</td>
                      <td className="px-4 py-3 text-right">{usdFormatter(row.unitUsd)}</td>
                      <td className="px-4 py-3 text-right">{usdFormatter(row.newRevenue)}</td>
                      <td className="px-4 py-3 text-right">{row.renewals}</td>
                      <td className="px-4 py-3 text-right">{usdFormatter(row.renewalRevenue)}</td>
                      <td className="px-4 py-3 text-right text-white font-semibold">{usdFormatter(row.total)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10 text-white font-semibold">
                    <td className="px-4 py-3">TOTAL REVENUE (USD)</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">{usdFormatter(TOTAL_REVENUE_USD)}</td>
                  </tr>
                  <tr className="border-t border-white/10 text-white font-semibold">
                    <td className="px-4 py-3">TOTAL REVENUE (INR)</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">{inrFormatter(TOTAL_REVENUE_INR)}</td>
                  </tr>
                  <tr className="border-t border-white/10 text-white font-semibold">
                    <td className="px-4 py-3">GROWTH % vs Year 3</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">—</td>
                    <td className="px-4 py-3 text-right">{GROWTH_VS_YEAR3}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Revenue Depth</p>
              <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Renewal flywheel
              </h3>
              <div className="mt-6 space-y-4">
                {revenueRows.map((row) => {
                  const width = (row.total / maxRevenue) * 100;
                  return (
                    <div key={row.service}>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{row.service}</span>
                        <span>{usdFormatter(row.total)}</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${width}%`,
                            background: `linear-gradient(90deg, ${serviceColors[row.service]}, #ffffff)`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-white/10 bg-black/60 p-6 text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Service mix</p>
              <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Contribution pie
              </h3>
              <div className="mx-auto mt-6 h-48 w-48 rounded-full border border-white/10" style={{ background: pieGradient }} />
              <div className="mt-6 space-y-3 text-sm text-white/70">
                {revenueRows.map((row) => (
                  <div key={row.service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: serviceColors[row.service] }} />
                      <span>{row.service}</span>
                    </div>
                    <span>{((row.total / TOTAL_REVENUE_USD) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Narrative</p>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  Year 4 insights & outlook
                </h3>
              </div>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Renewal dominance",
                  body: "42 renewal mandates generate $201K, covering over half the topline and flattening acquisition pressure.",
                },
                {
                  title: "Growth consistency",
                  body: `Revenue expands ${GROWTH_VS_YEAR3} vs Year 3, driven by a heavier Full Structure mix.`,
                },
                {
                  title: "FX reserves",
                  body: `USD ${usdFormatter(TOTAL_REVENUE_USD)} converts to ${inrFormatter(TOTAL_REVENUE_INR)}, ensuring multi-region treasury depth.`,
                },
                {
                  title: "Next phase",
                  body: "Year 4 primes the Combined Projection view, where DAO, AML, and DAO services bridge annual + subscription revenue.",
                },
              ].map((block) => (
                <div key={block.title} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{block.title}</p>
                  <p className="mt-2 text-white/90">{block.body}</p>
                </div>
              ))}
            </div>
          </section>
          <RevenueByServiceBarChart
            revenueRows={revenueRows}
            maxRevenue={maxRevenue}
            usdFormatter={usdFormatter}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}

















