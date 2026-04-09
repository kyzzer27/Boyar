"use client";

import { useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface RegionalAllocation {
  region: string;
  allocation: number;
  spendUsd: number;
  spendInr: number;
  color: string;
}

interface CpcBreakdown {
  region: string;
  cpc: number;
  spendUsd: number;
  clicks: number;
}

interface FunnelStage {
  stage: string;
  rate: string;
  volume: number;
  description: string;
}

interface RevenueRow {
  service: string;
  clients: number;
  priceUsd: number;
  revenueUsd: number;
  revenueInr: number;
}

const regionalAllocations: RegionalAllocation[] = [
  { region: "Europe", allocation: 35, spendUsd: 6000, spendInr: 546000, color: "#c9a55c" },
  { region: "Asia & MENA", allocation: 30, spendUsd: 5143, spendInr: 468013, color: "#7c9eb5" },
  { region: "North America", allocation: 25, spendUsd: 4286, spendInr: 390026, color: "#a8a8a8" },
  { region: "South Africa", allocation: 5, spendUsd: 857, spendInr: 77987, color: "#6b8f71" },
  { region: "South America", allocation: 5, spendUsd: 857, spendInr: 77987, color: "#8b7355" },
];

const cpcBreakdown: CpcBreakdown[] = [
  { region: "Europe", cpc: 3.5, spendUsd: 6000, clicks: 1714 },
  { region: "Asia & MENA", cpc: 2.5, spendUsd: 5143, clicks: 2057 },
  { region: "North America", cpc: 5, spendUsd: 4286, clicks: 857 },
  { region: "South Africa", cpc: 1.5, spendUsd: 857, clicks: 571 },
  { region: "South America", cpc: 2.5, spendUsd: 857, clicks: 343 },
];

const funnelStages: FunnelStage[] = [
  { stage: "Paid Clicks", rate: "—", volume: 5542, description: "Targeted traffic from Google, Meta, YouTube, LinkedIn." },
  { stage: "Leads & Inquiries", rate: "30%", volume: 1663, description: "Form fills, WhatsApp, and email inquiries." },
  { stage: "Qualified Leads", rate: "60%", volume: 998, description: "Meets Boyar's investment and compliance criteria." },
  { stage: "Calls Booked", rate: "50%", volume: 499, description: "Consultations scheduled with strategy leads." },
  { stage: "High-Intent Prospects", rate: "40%", volume: 200, description: "Advanced diligence and proposal reviews." },
  { stage: "Closed Clients", rate: "8%", volume: 16, description: "Signed mandates in Year 1." },
];

const clientDistribution = [
  { service: "Company Formation", clients: 6 },
  { service: "Standalone Trust", clients: 1 },
  { service: "Full Structure", clients: 2 },
  { service: "Corporate Services", clients: 4 },
  { service: "Office Registration", clients: 2 },
  { service: "Banking", clients: 1 },
];

const revenueProjection: RevenueRow[] = [
  { service: "Company Formation", clients: 6, priceUsd: 2500, revenueUsd: 15000, revenueInr: 1410000 },
  { service: "Standalone Trust", clients: 1, priceUsd: 13000, revenueUsd: 13000, revenueInr: 1222000 },
  { service: "Full Structure", clients: 2, priceUsd: 29700, revenueUsd: 59400, revenueInr: 5583600 },
  { service: "Corporate Services", clients: 4, priceUsd: 3500, revenueUsd: 14000, revenueInr: 1316000 },
  { service: "Office Registration", clients: 2, priceUsd: 1500, revenueUsd: 3000, revenueInr: 282000 },
  { service: "Banking", clients: 1, priceUsd: 6500, revenueUsd: 6500, revenueInr: 611000 },
];

const clickDistribution = [
  { region: "Europe", clicks: 1714, color: "#c9a55c" },
  { region: "Asia & MENA", clicks: 2057, color: "#7c9eb5" },
  { region: "North America", clicks: 857, color: "#a8a8a8" },
  { region: "South Africa", clicks: 571, color: "#6b8f71" },
  { region: "South America", clicks: 343, color: "#8b7355" },
];

const revenueDistribution = [
  { service: "Company Formation", revenue: 15000, color: "#6b8f71" },
  { service: "Standalone Trust", revenue: 13000, color: "#7c9eb5" },
  { service: "Full Structure", revenue: 59400, color: "#c9a55c" },
  { service: "Corporate Services", revenue: 14000, color: "#a8a8a8" },
  { service: "Office Registration", revenue: 3000, color: "#8b7355" },
  { service: "Banking", revenue: 6500, color: "#9b8bb4" },
];

const marketingOpsMonthly = [
  { label: "Software Stack", amountInr: 10000 },
  { label: "YouTube & Content", amountInr: 30000 },
  { label: "Editor & Marketing Talent", amountInr: 15000 },
];

const AD_SPEND_USD = 17000;
const AD_SPEND_INR = 1598000;
const TOTAL_CLICKS = 5497;
const BLENDED_CPC_USD = 3.09;
const BLENDED_CPC_INR = 290.70;
const TOTAL_CLIENTS = 16;
const CAC_COST_INR = 2258000;
const MARKETING_CAC_INR = 99875;
const MARKETING_CAC_USD = 1063;
const TOTAL_REVENUE_USD = 110900;
const TOTAL_REVENUE_INR = 10424600;
const CAC_OPS_MONTHLY_INR = 55000;
const CAC_OPS_ANNUAL_INR = 660000;
const ROAS = TOTAL_REVENUE_USD / AD_SPEND_USD;
const EXCEL_FILE_PATH = "/files/Boyar_CAC_Module_v2_1.xlsx";

const usdFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

const inrFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

function buildPieGradient() {
  let cumulative = 0;
  return regionalAllocations
    .map((region) => {
      const start = cumulative;
      const end = cumulative + region.allocation;
      cumulative = end;
      return `${region.color} ${start}% ${end}%`;
    })
    .join(", ");
}

function buildGenericPie<T extends { color: string }>(data: T[], valueKey: keyof T) {
  const total = data.reduce((sum, item) => sum + Number(item[valueKey]), 0);
  let cumulative = 0;
  return data
    .map((item) => {
      const start = cumulative;
      const portion = (Number(item[valueKey]) / total) * 100;
      const end = cumulative + portion;
      cumulative = end;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ");
}

const fadeUp = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } };

export default function CACMarketingPage() {
  const router = useRouter();
  const maxClicks = Math.max(...cpcBreakdown.map((item) => item.clicks));
  const pieGradient = `conic-gradient(${buildPieGradient()})`;
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const totalClicks = useMemo(() => clickDistribution.reduce((sum, region) => sum + region.clicks, 0), []);
  const totalRevenue = useMemo(() => revenueDistribution.reduce((sum, service) => sum + service.revenue, 0), []);

  function handleDownloadConfirm() {
    const link = document.createElement("a");
    link.href = EXCEL_FILE_PATH;
    link.download = "Boyar_CAC_Module_v2_1.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadPrompt(false);
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">

        <header className="relative z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
            <button onClick={() => router.back()} className="text-[13px] text-white/70 hover:text-white/90 transition-colors duration-200 tracking-wide">
              ← Back
              </button>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/90 font-medium">Boyar Partners · CAC Module</p>
              <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>
                Marketing CAC – Investor Brief
              </h1>
            </div>
            <div className="text-right text-[11px] text-white/60 leading-relaxed">
              <p>Launch Year: 2026</p>
              <p>Regions: Europe · Asia & MENA · N. America · LATAM · S. Africa</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 space-y-10">

          {/* Download CTA — matches expenditure style */}
          <div className="flex justify-end">
            <motion.button
              onClick={() => setShowDownloadPrompt(true)}
              className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
              style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              whileHover={{ scale: 1.05, filter: "grayscale(0)", transition: { duration: 0.3 } }}
            >
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                  Download in excel
                </span>
                <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
                <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
              </div>
            </motion.button>
          </div>

          {/* ─── Hero Summary ─── */}
          <motion.section {...fadeUp} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1 space-y-6">
                <p className="text-[13px] text-white/60 leading-[1.75]">
                  The Boyar Partners CAC Module shows how a disciplined media plan converts paid attention into committed capital
                  across high-value jurisdictions. Year-one spend focuses on channel mix testing, regional CPC efficiency, and a
                  qualification-heavy funnel that keeps diligence time high while protecting unit economics. Investors see the
                  complete bridge from ad spend to realized revenue, with ROAS, CPC, CTC, and CAC fully reconciled.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard label="Total Ad Budget" primary={usdFormatter(AD_SPEND_USD)} secondary={inrFormatter(AD_SPEND_INR)} />
                  <StatCard label="Marketing CAC / Client" primary={inrFormatter(MARKETING_CAC_INR)} secondary={usdFormatter(MARKETING_CAC_USD, 0)} />
                  <StatCard label="Blended CPC" primary={`${usdFormatter(BLENDED_CPC_USD, 2)} / click`} secondary={`${inrFormatter(BLENDED_CPC_INR, 2)} / click`} />
                  <StatCard label="ROAS" primary={`${ROAS.toFixed(2)}×`} secondary="Revenue ÷ Ad Spend" accent />
                </div>
              </div>
              <div className="w-full lg:w-80 rounded-xl border border-white/[0.06] bg-black/60 p-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-medium">Funnel Snapshot</p>
                <h2 className="mt-3 text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>
                  <span className="bg-gradient-to-r from-[#c9a55c] to-[#e8d5a3] bg-clip-text text-transparent">{TOTAL_CLIENTS}</span>
                </h2>
                <p className="mt-1 text-[13px] text-white/70">Clients closed from 5,542 paid clicks.</p>
                <div className="mt-6 space-y-3">
                  <ProgressLine label="Leads" value={1649} total={TOTAL_CLICKS} />
                  <ProgressLine label="Qualified" value={989} total={TOTAL_CLICKS} />
                  <ProgressLine label="Calls" value={495} total={TOTAL_CLICKS} />
                  <ProgressLine label="Closed" value={TOTAL_CLIENTS} total={TOTAL_CLICKS} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ─── Ad Spend & Platforms ─── */}
          <SectionCard title="Year-1 Ad Spend & Platforms" subtitle="Global performance media stack aligned to regulated markets.">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Budget Component</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">USD</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">INR @ 91</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.04] text-white/70">
                      <td className="px-5 py-4">Paid Ads</td>
                      <td className="px-5 py-4 tabular-nums">{usdFormatter(AD_SPEND_USD)}</td>
                      <td className="px-5 py-4 tabular-nums">{inrFormatter(AD_SPEND_INR)}</td>
                      <td className="px-5 py-4 text-[11px] text-white/60">Google Search · YouTube · Meta · LinkedIn</td>
                    </tr>
                    <tr className="text-white bg-white/[0.02]">
                      <td className="px-5 py-4 font-semibold">Total</td>
                      <td className="px-5 py-4 font-semibold tabular-nums">{usdFormatter(AD_SPEND_USD)}</td>
                      <td className="px-5 py-4 font-semibold tabular-nums">{inrFormatter(AD_SPEND_INR)}</td>
                      <td className="px-5 py-4 text-white/60">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6 space-y-5">
                <p className="text-[13px] text-white/85 leading-[1.75]">
                  CPC is monitored weekly by region and channel, keeping bid strategies tightly correlated to buyer intent. Creative testing
                  rotates around regulatory ease, timeline certainty, and global structuring credibility—messages that over-index with
                  Boyar&apos;s qualified pipeline.
                </p>
                <ul className="space-y-3 text-[13px] text-white/60">
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1 w-1 rounded-full bg-[#c9a55c] shrink-0" />70% of spend remains on search intent (Google).</li>
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1 w-1 rounded-full bg-[#c9a55c] shrink-0" />LinkedIn powers global CFO and legal persona retargeting.</li>
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1 w-1 rounded-full bg-[#c9a55c] shrink-0" />Meta + YouTube deliver scale plus narrative control.</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* ─── Regional Allocation ─── */}
          <SectionCard title="Regional Allocation" subtitle="Capital follows regulatory velocity and demand concentration.">
            <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Region</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Allocation</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Spend (USD)</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Spend (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalAllocations.map((region) => (
                      <tr key={region.region} className="border-b border-white/[0.04] text-white/70 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: region.color }} />
                          {region.region}
                        </td>
                        <td className="px-5 py-3.5 tabular-nums">{region.allocation}%</td>
                        <td className="px-5 py-3.5 tabular-nums">{usdFormatter(region.spendUsd)}</td>
                        <td className="px-5 py-3.5 tabular-nums">{inrFormatter(region.spendInr)}</td>
                      </tr>
                    ))}
                    <tr className="text-white font-semibold bg-white/[0.02]">
                      <td className="px-5 py-3.5">Total</td>
                      <td className="px-5 py-3.5 tabular-nums">100%</td>
                      <td className="px-5 py-3.5 tabular-nums">{usdFormatter(AD_SPEND_USD)}</td>
                      <td className="px-5 py-3.5 tabular-nums">{inrFormatter(AD_SPEND_INR)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.06] bg-black/40 p-6">
                <div className="relative h-56 w-56">
                  <div className="absolute inset-0 rounded-full" style={{ backgroundImage: pieGradient }} />
                  <div className="absolute inset-[22%] rounded-full bg-black flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[9px] uppercase tracking-[0.5em] text-white/60">Year-1</p>
                      <p className="text-sm font-semibold text-white/90 mt-0.5" style={{ fontFamily: "var(--font-benzin)" }}>Regional Mix</p>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-1.5 text-[12px] text-white/70">
                  <p>Europe + Asia = 65% of media due to immediate conversion velocity.</p>
                  <p>North America builds future pipeline in parallel.</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ─── CPC & Click Breakdown ─── */}
          <SectionCard title="Regional CPC & Click Breakdown" subtitle="True cost to acquire attention in each corridor.">
            <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Region</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">CPC (USD)</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Spend (USD)</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cpcBreakdown.map((row) => (
                      <tr key={row.region} className="border-b border-white/[0.04] text-white/70 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5">{row.region}</td>
                        <td className="px-5 py-3.5 tabular-nums">{usdFormatter(row.cpc, 2)}</td>
                        <td className="px-5 py-3.5 tabular-nums">{usdFormatter(row.spendUsd)}</td>
                        <td className="px-5 py-3.5 tabular-nums">{row.clicks.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="text-white font-semibold bg-white/[0.02]">
                      <td className="px-5 py-3.5">Total</td>
                      <td className="px-5 py-3.5">—</td>
                      <td className="px-5 py-3.5 tabular-nums">{usdFormatter(AD_SPEND_USD)}</td>
                      <td className="px-5 py-3.5 tabular-nums">{TOTAL_CLICKS.toLocaleString()} clicks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">Clicks per region</p>
                <div className="mt-5 space-y-4">
                  {cpcBreakdown.map((row) => (
                    <div key={row.region}>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-white/70">{row.region}</span>
                        <span className="text-white/70 tabular-nums font-medium">{row.clicks.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-sm bg-white/[0.06]">
                        <motion.div
                          className="h-1.5 rounded-sm"
                          style={{ background: "linear-gradient(90deg, #c9a55c, #e8d5a3)" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.clicks / maxClicks) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-white/60">Blended CPC</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>
                    <span className="bg-gradient-to-r from-[#c9a55c] to-[#e8d5a3] bg-clip-text text-transparent">{usdFormatter(BLENDED_CPC_USD, 2)}</span>
                  </p>
                  <p className="mt-1 text-[12px] text-white/60">({inrFormatter(BLENDED_CPC_INR, 2)} per click)</p>
                  <p className="mt-3 text-[11px] text-white/60">= {usdFormatter(AD_SPEND_USD)} ÷ {TOTAL_CLICKS.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ─── CAC Visual Analytics ─── */}
          <SectionCard title="CAC Visual Analytics" subtitle="Visual summary of demand efficiency, pricing pressure, and service revenue mix.">
            <div className="grid gap-5 xl:grid-cols-2">
              <ChartCard title="Click Distribution by Region" description="Percentage share of 5,542 paid clicks.">
                <div className="flex flex-col gap-6 lg:flex-row items-center">
                  <div className="relative mx-auto h-48 w-48 shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ backgroundImage: `conic-gradient(${buildGenericPie(clickDistribution, "clicks")})` }} />
                    <div className="absolute inset-[22%] rounded-full bg-black flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-[8px] uppercase tracking-[0.4em] text-white/60">Clicks</p>
                        <p className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>{totalClicks.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-2.5 text-[13px] text-white/80">
                    {clickDistribution.map((item) => {
                      const pct = ((item.clicks / totalClicks) * 100).toFixed(1);
                      return (
                        <li key={item.region} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
                            <span>{item.region}</span>
                          </div>
                          <span className="tabular-nums font-medium text-white/80">{pct}%</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ChartCard>

              <ChartCard title="CPC by Region (USD)" description="Market-driven cost per click pressures.">
                <BarChart
                  data={cpcBreakdown.map((item) => ({ label: item.region, value: item.cpc }))}
                  maxValue={Math.max(...cpcBreakdown.map((item) => item.cpc))}
                  unit="USD"
                  barColor="linear-gradient(180deg, #c9a55c, #8b6914)"
                />
              </ChartCard>

              <ChartCard title="Clicks by Region" description="Absolute clicks powering the funnel.">
                <BarChart
                  data={cpcBreakdown.map((item) => ({ label: item.region, value: item.clicks }))}
                  maxValue={Math.max(...cpcBreakdown.map((item) => item.clicks))}
                  barColor="linear-gradient(180deg, #7c9eb5, #3d5f73)"
                  unit=""
                  formatValue={(value) => `${value.toLocaleString()}`}
                />
              </ChartCard>

              <ChartCard title="Revenue Distribution by Service Type (USD)" description="Mandate concentration across service lines.">
                <div className="flex flex-col gap-6 lg:flex-row items-center">
                  <div className="relative mx-auto h-48 w-48 shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ backgroundImage: `conic-gradient(${buildGenericPie(revenueDistribution, "revenue")})` }} />
                    <div className="absolute inset-[22%] rounded-full bg-black flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-[8px] uppercase tracking-[0.4em] text-white/60">Revenue</p>
                        <p className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(totalRevenue)}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-2.5 text-[13px] text-white/80">
                    {revenueDistribution.map((item) => {
                      const pct = ((item.revenue / totalRevenue) * 100).toFixed(1);
                      return (
                        <li key={item.service} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
                            <span>{item.service}</span>
                          </div>
                          <span className="tabular-nums font-medium text-white/80">{pct}%</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ChartCard>
            </div>
          </SectionCard>

          {/* ─── Funnel Performance ─── */}
          <SectionCard title="Funnel Performance" subtitle="Qualification-heavy funnel keeps CAC defensible.">
            <div className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6">
                <div className="space-y-0">
                  {funnelStages.map((stage, index) => {
                    const widthPct = (stage.volume / funnelStages[0].volume) * 100;
                    return (
                      <div key={stage.stage} className="group relative py-4 border-b border-white/[0.04] last:border-0">
                        <div className="absolute inset-y-0 left-0 rounded-r-sm opacity-[0.04]" style={{ width: `${widthPct}%`, background: "linear-gradient(90deg, #c9a55c, transparent)" }} />
                        <div className="relative flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-white/20 text-[11px] tabular-nums font-medium w-5">{String(index + 1).padStart(2, "0")}</span>
                            <div>
                              <p className="text-[13px] font-medium text-white/90">{stage.stage}</p>
                              <p className="text-[11px] text-white/60 mt-0.5">{stage.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-6 text-[13px] tabular-nums pl-9 sm:pl-0">
                            <span className="text-white/60 w-10 text-right">{stage.rate}</span>
                            <span className="text-white/80 font-medium w-16 text-right">{stage.volume.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6 space-y-5">
                <div className="space-y-3">
                  {[
                    ["Final Client Conversion vs Clicks", "0.291%"],
                    ["Final Client Conversion vs Qualified", "1.617%"],
                    ["LTV / CAC Focus", "Company Formation drives 13.4% of revenue"],
                    ["Top-of-Funnel", "5,542 verified clicks"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-start gap-4 text-[13px]">
                      <span className="text-white/70">{label}</span>
                      <span className="text-white/85 text-right tabular-nums shrink-0">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Narrative</p>
                  <p className="mt-3 text-[13px] text-white/85 leading-[1.75]">
                    CAC efficiency is reinforced by qualification. Only 30% of traffic becomes an inquiry, yet each inquiry is routed through
                    compliance before sales time is spent. This keeps marketing-only CAC under $1.5K while preserving premium pricing per
                    mandate.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ─── Client Distribution ─── */}
          <SectionCard title="Final Client Distribution" subtitle="Revenue diversification across Boyar service lines.">
            <div className="grid gap-5 lg:grid-cols-[1fr,1fr]">
              <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Service Line</th>
                      <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Clients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientDistribution.map((row) => (
                      <tr key={row.service} className="border-b border-white/[0.04] text-white/70 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5">{row.service}</td>
                        <td className="px-5 py-3.5 tabular-nums">{row.clients}</td>
                      </tr>
                    ))}
                    <tr className="text-white font-semibold bg-white/[0.02]">
                      <td className="px-5 py-3.5">Total</td>
                      <td className="px-5 py-3.5 tabular-nums">{TOTAL_CLIENTS}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">Service mix</p>
                <div className="mt-5 space-y-4">
                  {clientDistribution.map((row) => {
                    const width = (row.clients / TOTAL_CLIENTS) * 100;
                    return (
                      <div key={row.service}>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-white/70">{row.service}</span>
                          <span className="text-white/70 tabular-nums font-medium">{row.clients} clients</span>
                        </div>
                        <div className="h-1.5 rounded-sm bg-white/[0.06]">
                          <motion.div
                            className="h-1.5 rounded-sm"
                            style={{ background: "linear-gradient(90deg, #c9a55c, #e8d5a3)" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${width}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 text-[13px] text-white/70 leading-[1.7]">
                  Company Formation is the entry point into Boyar&apos;s stack, while Full Structure mandates anchor the revenue curve.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* ─── Revenue Projection ─── */}
          <SectionCard title="Year-1 Revenue Projection" subtitle="Mandates tied directly to funnel output.">
            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Service</th>
                    <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Clients</th>
                    <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Price / Client</th>
                    <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Revenue (USD)</th>
                    <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Revenue (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueProjection.map((row) => (
                    <tr key={row.service} className="border-b border-white/[0.04] text-white/70 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5">{row.service}</td>
                      <td className="px-5 py-3.5 tabular-nums">{row.clients}</td>
                      <td className="px-5 py-3.5 tabular-nums">{usdFormatter(row.priceUsd)}</td>
                      <td className="px-5 py-3.5 tabular-nums">{usdFormatter(row.revenueUsd)}</td>
                      <td className="px-5 py-3.5 tabular-nums">{inrFormatter(row.revenueInr)}</td>
                    </tr>
                  ))}
                  <tr className="text-white font-semibold bg-white/[0.02]">
                    <td className="px-5 py-3.5">TOTAL</td>
                    <td className="px-5 py-3.5 tabular-nums">{TOTAL_CLIENTS}</td>
                    <td className="px-5 py-3.5 text-white/60">—</td>
                    <td className="px-5 py-3.5 tabular-nums">{usdFormatter(TOTAL_REVENUE_USD)}</td>
                    <td className="px-5 py-3.5 tabular-nums">{inrFormatter(TOTAL_REVENUE_INR)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* ─── Marketing-Only CAC Stack ─── */}
          <SectionCard title="Marketing-Only CAC Stack" subtitle="Transparent view of every rupee invested to acquire 16 clients.">
            <div className="grid gap-5 lg:grid-cols-[1fr,1fr]">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-6 space-y-5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">Monthly Ops</p>
                <ul className="space-y-3">
                  {marketingOpsMonthly.map((item) => (
                    <li key={item.label} className="flex items-center justify-between text-[13px]">
                      <span className="text-white/85">{item.label}</span>
                      <span className="text-white/85 tabular-nums font-medium">{inrFormatter(item.amountInr)}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-[13px] text-white font-semibold">
                    <span>CAC Ops Monthly</span>
                    <span className="tabular-nums">{inrFormatter(CAC_OPS_MONTHLY_INR)}</span>
                  </li>
                  <li className="flex items-center justify-between text-[13px] text-white/80">
                    <span>CAC Ops Annual</span>
                    <span className="tabular-nums">{inrFormatter(CAC_OPS_ANNUAL_INR)}</span>
                  </li>
                </ul>
                <p className="text-[11px] text-white/60">
                  Ops includes paid infrastructure, media production, and strategic marketing headcount dedicated to CAC.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5">
                <div className="space-y-4 text-[13px] text-white/60 leading-[1.75]">
                  <p><span className="text-white/90 font-medium">Total CAC Cost:</span> {inrFormatter(CAC_COST_INR)} (Ad Spend {inrFormatter(AD_SPEND_INR)} + Marketing Ops {inrFormatter(CAC_OPS_ANNUAL_INR)})</p>
                  <p><span className="text-white/90 font-medium">Marketing-Only CAC (16 clients):</span> {inrFormatter(MARKETING_CAC_INR)} ≈ {usdFormatter(MARKETING_CAC_USD)}</p>
                  <p><span className="text-white/90 font-medium">ROAS:</span> {ROAS.toFixed(2)}× ({usdFormatter(TOTAL_REVENUE_USD)} ÷ {usdFormatter(AD_SPEND_USD)})</p>
                  <p><span className="text-white/90 font-medium">Revenue Coverage:</span> {usdFormatter(TOTAL_REVENUE_USD)} ({inrFormatter(TOTAL_REVENUE_INR)}) in Year 1.</p>
                </div>
                <div className="rounded-lg border border-[#c9a55c]/15 bg-[#c9a55c]/[0.03] p-5">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Investor takeaway</p>
                  <p className="mt-3 text-[13px] text-white/85 leading-[1.75]">
                    CAC discipline leaves margin for scale. Even with conservative conversion assumptions, Boyar deploys ₹0.98L per client
                    to unlock mandates averaging $6.53 in revenue per ad dollar.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ─── Closing CTA ─── */}
          <motion.section
            className="rounded-xl border border-[#c9a55c]/20 bg-gradient-to-b from-[#c9a55c]/[0.04] to-transparent p-8 text-center"
            {...fadeUp}
          >
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#c9a55c]/80 font-medium">Proof of Efficiency</p>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>
              Ad Spend → Qualified Flow → Revenue Certainty
            </h3>
            <p className="mt-4 text-white/70 text-[13px] max-w-2xl mx-auto leading-[1.75]">
              Boyar Partners converts intent-rich global demand into structured mandates with transparent CAC math. This marketing-only
              model is ready to absorb additional capital while keeping regional CPC, qualification rigor, and ROAS in investor-friendly
              territory.
            </p>
          </motion.section>
        </main>

        {/* Download Modal */}
        <AnimatePresence>
          {showDownloadPrompt && (
            <>
              <motion.div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDownloadPrompt(false)} />
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-7 text-center">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-white/60">Download</p>
                  <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                    Boyar_CAC_Module_v2_1.xlsx
                  </h3>
                  <p className="mt-2 text-[13px] text-white/70">Would you like to download the full CAC Excel model?</p>
                  <div className="mt-7 flex items-center justify-center gap-3">
                    <button onClick={() => setShowDownloadPrompt(false)} className="rounded-lg border border-white/10 px-6 py-2.5 text-[12px] text-white/70 hover:bg-white/[0.04] transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={handleDownloadConfirm}
                      className="rounded-lg bg-[#c9a55c] px-6 py-2.5 text-[12px] font-semibold text-black hover:bg-[#d4b06a] transition-colors"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}

/* ─── Sub-components ─── */

interface StatCardProps { label: string; primary: string; secondary?: string; accent?: boolean }

function StatCard({ label, primary, secondary, accent }: StatCardProps) {
  return (
    <div className={`relative rounded-xl border p-4 overflow-hidden ${accent ? "border-[#c9a55c]/20 bg-[#c9a55c]/[0.04]" : "border-white/[0.06] bg-black/40"}`}>
      <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 font-medium">{label}</p>
      <p className={`mt-2 text-lg font-semibold tracking-tight ${accent ? "text-[#c9a55c]" : "text-white"}`} style={{ fontFamily: "var(--font-benzin)" }}>
        {primary}
      </p>
      {secondary && <p className="text-[12px] text-white/60 mt-0.5">{secondary}</p>}
    </div>
  );
}

interface SectionCardProps { title: string; subtitle: string; children: React.ReactNode }

function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <motion.section className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8" {...fadeUp}>
      <div className="mb-6 flex items-end gap-4">
        <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">{title}</p>
          <p className="mt-1 text-[12px] text-white/60">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

interface ChartCardProps { title: string; description: string; children: React.ReactNode }

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/30 p-6">
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>{title}</p>
        <p className="text-[11px] text-white/60 mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}

interface BarChartProps { data: { label: string; value: number }[]; maxValue: number; unit?: string; barColor: string; formatValue?: (value: number) => string }

function BarChart({ data, maxValue, unit, barColor, formatValue }: BarChartProps) {
  return (
    <div className="flex items-end gap-4 overflow-x-auto pb-2">
      {data.map((item, i) => {
        const height = (item.value / maxValue) * 100;
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center text-center min-w-[48px]">
            <span className="mb-2 text-[10px] text-white/60 tracking-wide">{item.label}</span>
            <div className="flex h-44 w-8 items-end rounded-sm bg-white/[0.04] overflow-hidden">
              <motion.div
                className="w-full rounded-sm"
                style={{ background: barColor }}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <span className="mt-2 text-[11px] font-medium text-white/70 tabular-nums">
              {formatValue ? formatValue(item.value) : `${item.value}${unit ? ` ${unit}` : ""}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface ProgressLineProps { label: string; value: number; total: number }

function ProgressLine({ label, value, total }: ProgressLineProps) {
  const width = (value / total) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1.5">
        <span className="text-white/60">{label}</span>
        <span className="text-white/60 tabular-nums font-medium">{value.toLocaleString()}</span>
      </div>
      <div className="h-1 w-full rounded-sm bg-white/[0.06]">
        <motion.div
          className="h-1 rounded-sm"
          style={{ background: "linear-gradient(90deg, #c9a55c, #e8d5a3)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
