"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { useEffect, useRef, useState } from "react";

interface YearProjection {
  label: string;
  fiscal: string;
  totalUsd: number;
  totalInr: number;
  newRevenue: number;
  renewalRevenue: number;
  renewals: number;
  growth: string;
}

const projections: YearProjection[] = [
  {
    label: "Year 1",
    fiscal: "FY2026",
    totalUsd: 110900,
    totalInr: Math.round(110900 * 90.44),
    newRevenue: 110900,
    renewalRevenue: 0,
    renewals: 0,
    growth: "—",
  },
  {
    label: "Year 2",
    fiscal: "FY2027",
    totalUsd: 212780,
    totalInr: Math.round(212780 * 90.44),
    newRevenue: 151600,
    renewalRevenue: 61180,
    renewals: 9,
    growth: "91.9%",
  },
  {
    label: "Year 3",
    fiscal: "FY2028",
    totalUsd: 315500,
    totalInr: Math.round(315500 * 90.44),
    newRevenue: 167100,
    renewalRevenue: 148400,
    renewals: 22,
    growth: "48.3%",
  },
  {
    label: "Year 4",
    fiscal: "FY2029",
    totalUsd: 539970,
    totalInr: Math.round(539970 * 90.44),
    newRevenue: 293500,
    renewalRevenue: 246470,
    renewals: 37,
    growth: "71.1%",
  },
  {
    label: "Year 5",
    fiscal: "FY2030",
    totalUsd: 672740,
    totalInr: Math.round(672740 * 90.44),
    newRevenue: 328200,
    renewalRevenue: 344540,
    renewals: 50,
    growth: "24.6%",
  },
];

const totalFiveYearRevenueUsd = projections.reduce((sum, year) => sum + year.totalUsd, 0);
const totalFiveYearRevenueInr = projections.reduce((sum, year) => sum + year.totalInr, 0);
const totalRenewalUsd = projections.reduce((sum, year) => sum + year.renewalRevenue, 0);
const totalNewUsd = projections.reduce((sum, year) => sum + year.newRevenue, 0);
const totalRenewalMandates = projections.reduce((sum, year) => sum + year.renewals, 0);
const cagr =
  projections.length > 1
    ? Math.pow(
        projections[projections.length - 1].totalUsd / projections[0].totalUsd,
        1 / (projections.length - 1)
      ) - 1
    : 0;

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

const combinedInsights = [
  {
    title: "Renewal moat",
    body: `Renewals contribute ${usdFormatter(totalRenewalUsd)} (${(
      (totalRenewalUsd / totalFiveYearRevenueUsd) *
      100
    ).toFixed(1)}%) across five years, unlocking annuity-style visibility.`,
  },
  {
    title: "Capital efficiency",
    body: `New revenue totals ${usdFormatter(totalNewUsd)} with no increase in client volume after Year 3—proof of upsell discipline and pricing power.`,
  },
  {
    title: "Scale trajectory",
    body: `Topline compounds at a ${((cagr || 0) * 100).toFixed(1)}% CAGR (FY2026 → FY2030), making Boyar's runway attractive for growth capital.`,
  },
  {
    title: "Mandate depth",
    body: `${totalRenewalMandates}+ renewal mandates across Full Structure & Company Formation reinforce low churn and multi-year compliance stickiness.`,
  },
];

export default function CombinedProjectionPage() {
  const peakYear = projections.reduce((prev, curr) => (curr.totalUsd > prev.totalUsd ? curr : prev), projections[0]);
  const [chartReady, setChartReady] = useState(false);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartReady) return;
    const Chart = (window as any).Chart;
    if (!Chart) return;
    if (chartRef.current) chartRef.current.destroy();

    if (chartCanvasRef.current) {
      const ctx = chartCanvasRef.current.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: projections.map((y) => y.label),
            datasets: [
              {
                label: "New revenue",
                data: projections.map((y) => y.newRevenue / 1000),
                backgroundColor: "#38bdf8",
                borderRadius: 3,
                stack: "revenue",
                order: 2,
              },
              {
                label: "Renewal revenue",
                data: projections.map((y) => y.renewalRevenue / 1000),
                backgroundColor: "#34d399",
                borderRadius: 3,
                stack: "revenue",
                order: 2,
              },
              {
                type: "line",
                label: "Total",
                data: projections.map((y) => y.totalUsd / 1000),
                borderColor: "#f59e0b",
                backgroundColor: "transparent",
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: "#f59e0b",
                pointBorderColor: "#f59e0b",
                fill: false,
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
                    return `${label}: $${Math.round(val * 1000).toLocaleString()}`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: true,
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: { color: "rgba(255,255,255,0.6)" },
              },
              y: {
                stacked: true,
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: {
                  color: "rgba(255,255,255,0.6)",
                  callback(value: any) {
                    return "$" + value + "K";
                  },
                },
                title: {
                  display: true,
                  text: "Revenue ($K)",
                  color: "rgba(255,255,255,0.5)",
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [chartReady]);

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
            <Link href="/revenue/corporate-services" className="text-sm text-white/70 transition hover:text-white">
              ← Back to Corporate Services
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Combined Projection</p>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Five-Year Revenue Stack
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Runway: FY2026 – FY2030</p>
              <p>Data refresh: Nov 2025</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "5-Year Revenue (USD)", value: usdFormatter(totalFiveYearRevenueUsd) },
              { label: "5-Year Revenue (INR)", value: inrFormatter(totalFiveYearRevenueInr) },
              { label: "CAGR (FY26→FY30)", value: `${((cagr || 0) * 100).toFixed(1)}%` },
              { label: "Renewal Mandates", value: `${totalRenewalMandates}+` },
            ].map((card) => (
              <motion.div
                key={card.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{card.label}</p>
                <p className="mt-3 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  {card.value}
                </p>
              </motion.div>
            ))}
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Timeline view</p>
                <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  Year-over-Year Performance
                </h2>
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
                Peak year: {peakYear.label} ({peakYear.fiscal}) · {usdFormatter(peakYear.totalUsd)}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {projections.map((year) => (
                <motion.div
                  key={year.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{year.label}</p>
                  <p className="text-sm text-white/70">{year.fiscal}</p>
                  <p className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                    {usdFormatter(year.totalUsd)}
                  </p>
                  <p className="text-xs text-emerald-300/80">Growth: {year.growth}</p>
                  <div className="mt-4 space-y-2 text-xs text-white/70">
                    <div>
                      <span className="text-white/50">New:</span> {usdFormatter(year.newRevenue)}
                    </div>
                    <div>
                      <span className="text-white/50">Renewal:</span> {usdFormatter(year.renewalRevenue)}
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                        style={{ width: `${(year.totalUsd / peakYear.totalUsd) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <motion.section
            className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Visual Overview</p>
            <h2 className="mt-2 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Revenue Composition by Year
            </h2>
            <p className="mt-1 text-sm text-white/60">Stacked bars show new and renewal revenue. Line tracks total.</p>
            <div className="relative mt-6 h-72 w-full">
              <canvas ref={chartCanvasRef} className="h-full w-full" />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#38bdf8" }} />
                <span>New revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#34d399" }} />
                <span>Renewal revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                <span>Total revenue</span>
              </div>
            </div>
          </motion.section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Stacked Economics</p>
              <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                New vs Renewal contribution
              </h3>
              <div className="mt-6 space-y-4">
                {projections.map((year) => {
                  const total = year.newRevenue + year.renewalRevenue;
                  const newPct = total ? (year.newRevenue / total) * 100 : 0;
                  const renewalPct = total ? (year.renewalRevenue / total) * 100 : 0;
                  return (
                    <div key={year.label}>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{year.label}</span>
                        <span>{usdFormatter(year.totalUsd)}</span>
                      </div>
                      <div className="mt-1 flex h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-cyan-300"
                          style={{ width: `${newPct}%` }}
                        />
                        <div
                          className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500"
                          style={{ width: `${renewalPct}%` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-[11px] text-white/50">
                        <span>New {newPct.toFixed(0)}%</span>
                        <span>Renewal {renewalPct.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-white/10 bg-black/70 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Investor wrap</p>
              <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Why it matters
              </h3>
              <div className="mt-5 space-y-4 text-sm text-white/80">
                <div className="rounded-2xl border border-white/15 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Capital ask</p>
                  <p className="mt-2 text-white/90">
                    The five-year stack funds a capital-efficient growth loop: renewals cover ops while new capital fuels DAO, AML, and FATCA / CRS
                    rollouts across priority jurisdictions.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Use of funds</p>
                  <ul className="mt-2 space-y-1 text-white/85">
                    <li>• Productize compliance toolkits for recurring revenue.</li>
                    <li>• Expand acquisition pods in Europe, MENA, and North America.</li>
                    <li>• Invest in treasury + DAO infrastructure for global clients.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Narrative</p>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                  Combined projection highlights
                </h3>
              </div>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {combinedInsights.map((insight) => (
                <div key={insight.title} className="rounded-2xl border border-white/10 bg-black/35 p-5 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{insight.title}</p>
                  <p className="mt-2 text-white/90">{insight.body}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

















