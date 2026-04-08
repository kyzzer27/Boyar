"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";

interface EMITier {
  name: string;
  riskLabel: string;
  riskLevel: "low" | "low-med" | "high" | "very-high";
  monthlyVolume: number;
  annualVolume: number;
  commissionRate: number;
  commissionBps: number;
  annualCommission: number;
  monthlyCommission: number;
  emiOwnFee: string;
  boyarShareOfEmiFee: string;
  color: string;
  profile: string;
  whyThisRate: string;
  whyEMI: string;
  stickiness: string;
  bankAccess: string;
  emiDependency: string;
}

const EMI_TIERS: EMITier[] = [
  {
    name: "Small fintech / SaaS",
    riskLabel: "LOW RISK",
    riskLevel: "low",
    monthlyVolume: 50000,
    annualVolume: 600000,
    commissionRate: 0.002,
    commissionBps: 20,
    annualCommission: 1200,
    monthlyCommission: 100,
    emiOwnFee: "0.5–1%",
    boyarShareOfEmiFee: "~25%",
    color: "#888780",
    profile: "Seed–Series A SaaS, digital nomad agency, e-com brand",
    whyThisRate: "Low-risk flows, thin EMI margin, small referral share",
    whyEMI: "Multi-currency payouts, instant SEPA, no bank friction",
    stickiness: "Medium — integrated into invoicing",
    bankAccess: "Easy",
    emiDependency: "Optional",
  },
  {
    name: "Mid-tier corporate",
    riskLabel: "LOW–MED RISK",
    riskLevel: "low-med",
    monthlyVolume: 100000,
    annualVolume: 1200000,
    commissionRate: 0.003,
    commissionBps: 30,
    annualCommission: 3600,
    monthlyCommission: 300,
    emiOwnFee: "0.5–1.5%",
    boyarShareOfEmiFee: "~25%",
    color: "#378ADD",
    profile: "TaaS, KPO, EdTech, offshore holding $5M–$20M billing",
    whyThisRate: "Higher volume tier, cross-border SWIFT+SEPA adds EMI margin",
    whyEMI: "IBAN issuance, multi-entity treasury, mid-market FX",
    stickiness: "Very high — 3–5yr IBAN lock-in with suppliers",
    bankAccess: "Moderate",
    emiDependency: "Preferred",
  },
  {
    name: "Forex broker",
    riskLabel: "HIGH RISK",
    riskLevel: "high",
    monthlyVolume: 500000,
    annualVolume: 6000000,
    commissionRate: 0.006,
    commissionBps: 60,
    annualCommission: 36000,
    monthlyCommission: 3000,
    emiOwnFee: "1.5–3%",
    boyarShareOfEmiFee: "~30%",
    color: "#D85A30",
    profile: "Offshore broker (Vanuatu, Seychelles, BVI)",
    whyThisRate: "EMIs charge brokers 1.5–3%. Boyar gets ~30% referral cut.",
    whyEMI: "Banks won't touch FX brokers. Skrill/Neteller = industry standard.",
    stickiness: "Extreme — switching = losing depositors",
    bankAccess: "Hard",
    emiDependency: "Required",
  },
  {
    name: "iGaming operator",
    riskLabel: "VERY HIGH RISK",
    riskLevel: "very-high",
    monthlyVolume: 2080000,
    annualVolume: 25000000,
    commissionRate: 0.008,
    commissionBps: 80,
    annualCommission: 200000,
    monthlyCommission: 16667,
    emiOwnFee: "2–5%",
    boyarShareOfEmiFee: "~25%",
    color: "#E24B4A",
    profile: "Curacao/MGA-licensed casino, sportsbook, poker",
    whyThisRate: "iGaming = highest EMI fees. Paysafe charges 2–5% on deposits.",
    whyEMI: "Regulatory mandate — MGA: 12.4% deposits, 25%+ withdrawals via e-wallets",
    stickiness: "Permanent — regulatory infrastructure, not a choice",
    bankAccess: "Very hard",
    emiDependency: "Mandated",
  },
  {
    name: "Crypto / VASP",
    riskLabel: "VERY HIGH RISK",
    riskLevel: "very-high",
    monthlyVolume: 2080000,
    annualVolume: 25000000,
    commissionRate: 0.01,
    commissionBps: 100,
    annualCommission: 250000,
    monthlyCommission: 20833,
    emiOwnFee: "1.5–4%",
    boyarShareOfEmiFee: "~35%",
    color: "#7F77DD",
    profile: "Mid-tier exchange, EU/UK fiat rails",
    whyThisRate: "Peak EMI pricing. On/off-ramp fees 1.5–4%. Top referral bracket.",
    whyEMI: "No alternative. Binance, Kraken, Gemini all confirmed EMI-dependent.",
    stickiness: "Operational lifeline — EMI is how users deposit/withdraw fiat",
    bankAccess: "Near impossible",
    emiDependency: "Existential",
  },
];

interface PortfolioMix {
  name: string;
  label: string;
  color: string;
  counts: number[];
}

const PORTFOLIOS: PortfolioMix[] = [
  { name: "A", label: "SaaS-heavy", color: "#10b981", counts: [5, 3, 2, 0, 0] },
  { name: "B", label: "Balanced", color: "#38bdf8", counts: [3, 3, 2, 1, 1] },
  { name: "C", label: "High-risk weighted", color: "#f59e0b", counts: [1, 2, 3, 2, 2] },
];

function portfolioTotal(mix: PortfolioMix): number {
  return mix.counts.reduce((sum, count, i) => sum + count * EMI_TIERS[i].annualCommission, 0);
}

function usdFormatter(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function BankingProjectionPage() {
  const [chartReady, setChartReady] = useState(false);
  const bubbleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const barCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bubbleChartRef = useRef<any>(null);
  const lineChartRef = useRef<any>(null);
  const barChartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartReady) return;
    const Chart = (window as any).Chart;
    if (!Chart) {
      return;
    }

    if (bubbleChartRef.current) {
      bubbleChartRef.current.destroy();
      bubbleChartRef.current = null;
    }
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
      lineChartRef.current = null;
    }
    if (barChartRef.current) {
      barChartRef.current.destroy();
      barChartRef.current = null;
    }

    if (bubbleCanvasRef.current) {
      const ctx = bubbleCanvasRef.current.getContext("2d");
      if (ctx) {
        bubbleChartRef.current = new Chart(ctx, {
          type: "bubble",
          data: {
            datasets: EMI_TIERS.map((tier) => ({
              label: tier.name,
              data: [
                {
                  x: tier.annualVolume / 1_000_000,
                  y: tier.annualCommission / 1_000,
                  r:
                    tier.name === "Small fintech / SaaS"
                      ? 6
                      : tier.name === "Mid-tier corporate"
                      ? 9
                      : tier.name === "Forex broker"
                      ? 14
                      : tier.name === "iGaming operator"
                      ? 20
                      : 22,
                },
              ],
              backgroundColor: tier.color,
            })),
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
                    const y = context.raw?.y ?? 0;
                    return `${label} → ${usdFormatter(y * 1000)}/yr`;
                  },
                },
              },
            },
            layout: {
              padding: {
                bottom: 10,
              },
            },
            scales: {
              x: {
                type: "logarithmic",
                min: 0.4,
                max: 40,
                title: {
                  display: true,
                  text: "Annual EMI volume ($M)",
                  color: "rgba(255,255,255,0.7)",
                },
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: {
                  color: "rgba(255,255,255,0.5)",
                  font: { size: 9 },
                  maxRotation: 45,
                  minRotation: 45,
                  callback(value: any) {
                    return `$${value}M`;
                  },
                },
              },
              y: {
                type: "logarithmic",
                min: 0.8,
                max: 400,
                title: {
                  display: true,
                  text: "Boyar commission ($K/yr)",
                  color: "rgba(255,255,255,0.7)",
                },
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: {
                  color: "rgba(255,255,255,0.5)",
                  font: { size: 9 },
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
              },
            },
          },
        });
      }
    }

    if (lineCanvasRef.current) {
      const ctx = lineCanvasRef.current.getContext("2d");
      if (ctx) {
        lineChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: EMI_TIERS.map((t) => t.name),
            datasets: [
              {
                label: "Annual commission per client",
                data: EMI_TIERS.map((t) => t.annualCommission),
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                fill: true,
                tension: 0.35,
                pointRadius: 6,
                pointBackgroundColor: EMI_TIERS.map((t) => t.color),
                pointBorderColor: EMI_TIERS.map((t) => t.color),
                pointBorderWidth: 2,
                borderWidth: 2,
                yAxisID: "y",
              },
              {
                label: "Monthly volume",
                data: EMI_TIERS.map((t) => t.monthlyVolume),
                borderColor: "rgba(255, 255, 255, 0.25)",
                backgroundColor: "transparent",
                borderDash: [6, 4],
                fill: false,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: "rgba(255,255,255,0.4)",
                borderWidth: 1.5,
                yAxisID: "y1",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context: any) {
                    const label = context.dataset.label ?? "";
                    const val = context.raw ?? 0;
                    return `${label}: ${usdFormatter(val)}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { color: "rgba(255,255,255,0.06)" },
                ticks: {
                  color: "rgba(255,255,255,0.6)",
                  font: { size: 10 },
                  maxRotation: 20,
                },
              },
              y: {
                type: "logarithmic",
                position: "left",
                title: {
                  display: true,
                  text: "Annual commission ($)",
                  color: "rgba(255,255,255,0.6)",
                  font: { size: 11 },
                },
                grid: { color: "rgba(255,255,255,0.06)" },
                ticks: {
                  color: "rgba(255,255,255,0.6)",
                  font: { size: 10 },
                  callback(value: any) {
                    if (value >= 1000) return "$" + Math.round(value / 1000) + "K";
                    return "$" + value;
                  },
                },
              },
              y1: {
                type: "logarithmic",
                position: "right",
                title: {
                  display: true,
                  text: "Monthly volume ($)",
                  color: "rgba(255,255,255,0.35)",
                  font: { size: 11 },
                },
                grid: { drawOnChartArea: false },
                ticks: {
                  color: "rgba(255,255,255,0.35)",
                  font: { size: 10 },
                  callback(value: any) {
                    if (value >= 1_000_000) return "$" + (value / 1_000_000).toFixed(1) + "M";
                    if (value >= 1000) return "$" + Math.round(value / 1000) + "K";
                    return "$" + value;
                  },
                },
              },
            },
          },
        });
      }
    }

    if (barCanvasRef.current) {
      const ctx = barCanvasRef.current.getContext("2d");
      if (ctx) {
        const labels = EMI_TIERS.map((tier) => tier.name);
        barChartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: PORTFOLIOS.map((mix) => ({
              label: `Portfolio ${mix.name}`,
              data: mix.counts.map((count, i) => (count * EMI_TIERS[i].annualCommission) / 1000),
              backgroundColor: mix.color,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: { color: "rgba(255,255,255,0.8)", font: { size: 10 } },
              },
              tooltip: {
                callbacks: {
                  label(context: any) {
                    const label = context.dataset.label ?? "";
                    const y = context.raw ?? 0;
                    return `${label}: ${usdFormatter(y * 1000)}/yr`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
              },
              y: {
                grid: { color: "rgba(255,255,255,0.08)" },
                ticks: {
                  color: "rgba(255,255,255,0.7)",
                  callback(value: any) {
                    return `$${value}K`;
                  },
                },
                title: {
                  display: true,
                  text: "Annual commission ($K)",
                  color: "rgba(255,255,255,0.7)",
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (bubbleChartRef.current) {
        bubbleChartRef.current.destroy();
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, [chartReady]);

  const totalA = portfolioTotal(PORTFOLIOS[0]);
  const totalB = portfolioTotal(PORTFOLIOS[1]);
  const totalC = portfolioTotal(PORTFOLIOS[2]);

  const portfolioSlices = PORTFOLIOS.map((mix) => {
    const total = portfolioTotal(mix);
    return mix.counts.map((count, i) => ({
      name: EMI_TIERS[i].name,
      color: EMI_TIERS[i].color,
      value: count * EMI_TIERS[i].annualCommission,
      pct: total > 0 ? (count * EMI_TIERS[i].annualCommission) / total : 0,
    }));
  });

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
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Banking Revenue</p>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                EMI Commission Scenarios
              </h1>
              <p className="mt-1 text-xs text-white/60">Passive referral commission by client risk tier</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Section 1: Header metrics row */}
          <motion.section
            className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Headline Economics</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Annual commission per client by tier
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {EMI_TIERS.map((tier) => (
                <div key={tier.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">{tier.name}</p>
                  <p
                    className={classNames(
                      "mt-2 text-xl font-semibold",
                      tier.name === "Small fintech / SaaS"
                        ? "text-white/50"
                        : tier.name === "Mid-tier corporate"
                        ? "text-sky-400"
                        : tier.name === "Forex broker"
                        ? "text-orange-400"
                        : tier.name === "iGaming operator"
                        ? "text-red-400"
                        : "text-purple-400",
                    )}
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {usdFormatter(tier.annualCommission)}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    {tier.commissionBps} bps · {usdFormatter(tier.monthlyVolume)}/mo
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 2: Scenario cards */}
          <motion.section
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {EMI_TIERS.slice(0, 4).map((tier) => (
              <div key={tier.name} className="rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
                <div className="h-1 w-full rounded-t-3xl" style={{ backgroundColor: tier.color }} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                      {tier.name}
                    </h3>
                    <span
                      className={classNames(
                        "rounded-full px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                        tier.riskLevel === "low"
                          ? "bg-white/5 text-white/60 border border-white/15"
                          : tier.riskLevel === "low-med"
                          ? "bg-sky-500/10 text-sky-300 border border-sky-500/30"
                          : tier.riskLevel === "high"
                          ? "bg-orange-500/10 text-orange-300 border border-orange-500/30"
                          : "bg-red-500/10 text-red-300 border border-red-500/30",
                      )}
                    >
                      {tier.riskLabel}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2 text-xs text-white/70">
                    <ScenarioRow label="Profile" value={tier.profile} />
                    <ScenarioRow label="Monthly EMI volume" value={usdFormatter(tier.monthlyVolume)} />
                    <ScenarioRow
                      label="Annual volume"
                      value={usdFormatter(tier.annualVolume)}
                    />
                    <ScenarioRow
                      label="Commission rate"
                      value={`${(tier.commissionBps / 100).toFixed(2)}% (${tier.commissionBps} bps)`}
                    />
                    <ScenarioRow label="Why this rate" value={tier.whyThisRate} />
                    <ScenarioRow label="Why EMI" value={tier.whyEMI} />
                    <ScenarioRow label="Stickiness" value={tier.stickiness} />
                  </dl>
                  <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Annual commission</p>
                    <p
                      className={classNames(
                        "mt-1 text-lg font-semibold text-white",
                      )}
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      {usdFormatter(tier.annualCommission)}
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      {tier.name === "Small fintech / SaaS"
                        ? "$100/mo · high count potential, low per-unit yield"
                        : tier.name === "Mid-tier corporate"
                        ? "$300/mo · Boyar's bread-and-butter formation client"
                        : tier.name === "Forex broker"
                        ? "$3,000/mo · 30x a SaaS client, same referral effort"
                        : "$16,667/mo · one operator = 167 SaaS clients"}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Crypto / VASP full-width card */}
            <div className="sm:col-span-2 rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
              <div className="h-1 w-full rounded-t-3xl" style={{ backgroundColor: EMI_TIERS[4].color }} />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                    {EMI_TIERS[4].name}
                  </h3>
                  <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-300">
                    {EMI_TIERS[4].riskLabel}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-xs text-white/70 sm:grid-cols-2">
                  <ScenarioRow label="Profile" value={EMI_TIERS[4].profile} />
                  <ScenarioRow label="Monthly EMI volume" value={usdFormatter(EMI_TIERS[4].monthlyVolume)} />
                  <ScenarioRow label="Annual volume" value={usdFormatter(EMI_TIERS[4].annualVolume)} />
                  <ScenarioRow
                    label="Commission rate"
                    value={`${(EMI_TIERS[4].commissionBps / 100).toFixed(2)}% (${EMI_TIERS[4].commissionBps} bps)`}
                  />
                  <ScenarioRow label="Why this rate" value={EMI_TIERS[4].whyThisRate} />
                  <ScenarioRow label="Why EMI" value={EMI_TIERS[4].whyEMI} />
                  <ScenarioRow label="Stickiness" value={EMI_TIERS[4].stickiness} />
                </div>
                <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Annual commission</p>
                  <p
                    className="mt-1 text-lg font-semibold text-purple-300"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {usdFormatter(EMI_TIERS[4].annualCommission)}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    $20,833/mo · a single crypto client is a business-altering referral
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            208× gap between lowest and highest tier.{" "}
            <span className="font-medium text-white">
              One iGaming or crypto client generates more passive income than the entire SaaS portfolio combined.
            </span>{" "}
            Commission scales with risk and volume — not effort.
          </motion.div>

          {/* Section 3: Bubble chart */}
          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Commission Yield</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Commission yield by annual volume (log scale)
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Bubble size indicates the absolute dollar yield from each client tier. Axes are logarithmic — small SaaS
              sits in the bottom-left; crypto and iGaming dominate the top-right.
            </p>
            <div className="relative mt-6 h-96 w-full">
              <canvas ref={bubbleCanvasRef} className="h-full w-full" />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
              {EMI_TIERS.map((tier) => (
                <div key={tier.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span>{tier.name}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 3b: Line graph — commission scaling */}
          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Commission Scaling</p>
            <h2
              className="mt-2 text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              How commission scales across risk tiers
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Solid line: annual commission Boyar earns per client. Dashed line: monthly client volume through EMI. Both
              axes are logarithmic — the curve shows how volume and rate combine to make high-risk tiers structurally
              more valuable.
            </p>
            <div className="relative mt-6 h-72 w-full">
              <canvas ref={lineCanvasRef} className="h-full w-full" />
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 rounded-full bg-sky-400" />
                <span>Annual commission (left axis)</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="h-0.5 w-5 rounded-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 6px, transparent 6px, transparent 10px)",
                  }}
                />
                <span>Monthly volume (right axis)</span>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Comparison table */}
          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Tier Comparison</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              Economics per client type
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm text-white/80">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium" />
                    {EMI_TIERS.map((tier) => (
                      <th key={tier.name} className="px-4 py-3 text-left font-medium">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow
                    label="Monthly volume"
                    values={EMI_TIERS.map((tier) => usdFormatter(tier.monthlyVolume))}
                  />
                  <ComparisonRow
                    label="Commission rate"
                    values={EMI_TIERS.map((tier) => `${(tier.commissionBps / 100).toFixed(2)}%`)}
                  />
                  <ComparisonRow
                    label="EMI's own fee"
                    values={EMI_TIERS.map((tier) => tier.emiOwnFee)}
                  />
                  <ComparisonRow
                    label="Boyar's share of EMI fee"
                    values={EMI_TIERS.map((tier) => tier.boyarShareOfEmiFee)}
                  />
                  <ComparisonRow
                    label="Monthly commission"
                    values={EMI_TIERS.map((tier) => usdFormatter(tier.monthlyCommission))}
                  />
                  <tr className="bg-white/5">
                    <td className="px-4 py-3 text-left text-sm font-semibold text-white">Annual commission</td>
                    {EMI_TIERS.map((tier) => (
                      <td key={tier.name} className="px-4 py-3 text-sm font-semibold" style={{ color: tier.color }}>
                        {usdFormatter(tier.annualCommission)}
                      </td>
                    ))}
                  </tr>
                  <ComparisonRow
                    label="Clients needed for $36K/yr"
                    values={[
                      "30",
                      "10",
                      "1",
                      "0.18",
                      "0.14",
                    ]}
                  />
                  <ComparisonRow label="Bank access" values={EMI_TIERS.map((tier) => tier.bankAccess)} />
                  <ComparisonRow label="EMI dependency" values={EMI_TIERS.map((tier) => tier.emiDependency)} />
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Section 5: Portfolio mix projections */}
          <motion.section
            className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Portfolio Mix</p>
            <h2 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
              10-client portfolios by risk mix
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PortfolioMetricCard
                label="A — SaaS-heavy"
                value={usdFormatter(totalA)}
                sublabel="10 clients · no crypto/iGaming"
                color="#10b981"
              />
              <PortfolioMetricCard
                label="B — Balanced"
                value={usdFormatter(totalB)}
                sublabel="10 clients · 1 iGaming + 1 crypto"
                color="#38bdf8"
              />
              <PortfolioMetricCard
                label="C — High-risk weighted"
                value={usdFormatter(totalC)}
                sublabel="10 clients · 2 iGaming + 2 crypto"
                color="#f59e0b"
              />
            </div>

            <div className="mt-6 overflow-x-auto text-xs text-white/80">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-white/5 text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Client type</th>
                    <th className="px-4 py-3 font-medium">Rate</th>
                    <th className="px-4 py-3 font-medium">Annual vol</th>
                    <th className="px-4 py-3 font-medium">$ / client / yr</th>
                    <th className="px-4 py-3 font-medium">A</th>
                    <th className="px-4 py-3 font-medium">B</th>
                    <th className="px-4 py-3 font-medium">C</th>
                  </tr>
                </thead>
                <tbody>
                  {EMI_TIERS.map((tier, idx) => (
                    <tr key={tier.name} className="border-t border-white/10">
                      <td className="px-4 py-2">{tier.name}</td>
                      <td className="px-4 py-2">{(tier.commissionBps / 100).toFixed(2)}%</td>
                      <td className="px-4 py-2">{usdFormatter(tier.annualVolume)}</td>
                      <td className="px-4 py-2">{usdFormatter(tier.annualCommission)}</td>
                      <td className="px-4 py-2">{PORTFOLIOS[0].counts[idx]}</td>
                      <td className="px-4 py-2">{PORTFOLIOS[1].counts[idx]}</td>
                      <td className="px-4 py-2">{PORTFOLIOS[2].counts[idx]}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-2 font-semibold text-white">Total (10 clients)</td>
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2 font-semibold text-emerald-300">{usdFormatter(totalA)}</td>
                    <td className="px-4 py-2 font-semibold text-sky-300">{usdFormatter(totalB)}</td>
                    <td className="px-4 py-2 font-semibold text-amber-300">{usdFormatter(totalC)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              {PORTFOLIOS.map((mix, mixIdx) => {
                const slices = portfolioSlices[mixIdx];
                return (
                  <div key={mix.name}>
                    <p
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: "var(--font-benzin)", color: mix.color }}
                    >
                      Portfolio {mix.name} · {mix.label} ({usdFormatter(portfolioTotal(mix))}/yr)
                    </p>
                    <div className="mt-1 flex h-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                      {slices.map((slice) => (
                        <div
                          key={slice.name}
                          className="h-full"
                          style={{
                            width: `${slice.pct * 100}%`,
                            backgroundColor: slice.color,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-white/60">
                      {mixIdx === 0
                        ? "8 low/mid-risk clients = ~22% of revenue. 2 forex brokers = ~78%."
                        : mixIdx === 1
                        ? "Balanced mix: 8 low/mid + 2 high-risk clients. iGaming and crypto dominate revenue despite being 20% of client count."
                        : "High-risk weighted: 4 gaming/crypto clients drive the majority of revenue. The remaining 6 clients smooth risk, not revenue."}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <div className="relative h-72 w-full">
                <canvas ref={barCanvasRef} className="h-full w-full" />
              </div>
            </div>
          </motion.section>

          {/* Section 6: Structural Logic */}
          <motion.section
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <InsightCard
              title="Higher risk = higher EMI fees = higher referral cut"
              body="EMIs charge 0.5–1% for SaaS, 1.5–3% for forex, 2–5% for iGaming. Boyar's referral cut is ~25–35% of the EMI's own fee. The rate mechanically scales with risk tier."
            />
            <InsightCard
              title="Bank rejection drives EMI dependency"
              body="Traditional banks reject forex, iGaming, and crypto. These sectors use EMIs because there is no other fiat rail. Structural lock-in means zero voluntary churn."
            />
            <InsightCard
              title="$25M/yr volume is mid-tier for gaming and crypto"
              body="Paysafe processed $167B in 2025. A single mid-tier exchange or casino doing $25M/yr is a rounding error for the EMI but a transformative referral for Boyar."
            />
            <InsightCard
              title="Boyar is introducer, not processor"
              body="Zero operational cost, zero regulatory exposure. The EMI processes transactions and holds funds. Boyar earns commission for the introduction. Pure margin, permanently recurring."
            />
          </motion.section>

          <motion.div
            className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/75"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            All three portfolios have exactly 10 clients. The 8.5× revenue gap ({usdFormatter(totalA)} vs{" "}
            {usdFormatter(totalC)}) comes entirely from mix. Every formation client in crypto, forex, or iGaming that
            Boyar routes to an EMI partner converts a one-time $6,500 banking fee into a compounding passive stream
            worth $36K–$250K per year.{" "}
            <span className="font-semibold text-white">
              The banking fee is the introduction. The EMI commission is the business model.
            </span>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

interface ScenarioRowProps {
  label: string;
  value: string;
}

function ScenarioRow({ label, value }: ScenarioRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-1.5 last:border-b-0 last:pb-0">
      <span className="text-white/50">{label}</span>
      <span className="text-right text-white/80">{value}</span>
    </div>
  );
}

interface ComparisonRowProps {
  label: string;
  values: string[];
}

function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <tr className="border-t border-white/10">
      <td className="px-4 py-3 text-left text-sm text-white/70">{label}</td>
      {values.map((v, idx) => (
        <td key={idx} className="px-4 py-3 text-sm text-white/75">
          {v}
        </td>
      ))}
    </tr>
  );
}

interface PortfolioMetricCardProps {
  label: string;
  value: string;
  sublabel: string;
  color: string;
}

function PortfolioMetricCard({ label, value, sublabel, color }: PortfolioMetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">{label}</p>
      <p
        className="mt-2 text-lg font-semibold"
        style={{ fontFamily: "var(--font-benzin)", color }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-white/60">{sublabel}</p>
    </div>
  );
}

interface InsightCardProps {
  title: string;
  body: string;
}

function InsightCard({ title, body }: InsightCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-2">Structural Logic</p>
      <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/75 leading-relaxed">{body}</p>
    </div>
  );
}

