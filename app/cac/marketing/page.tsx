"use client";

import { useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  { region: "Europe", allocation: 35, spendUsd: 5950, spendInr: 541450, color: "#38bdf8" },
  { region: "Asia & MENA", allocation: 30, spendUsd: 5100, spendInr: 464100, color: "#34d399" },
  { region: "North America", allocation: 25, spendUsd: 4250, spendInr: 386750, color: "#f472b6" },
  { region: "South Africa", allocation: 5, spendUsd: 850, spendInr: 77350, color: "#fbbf24" },
  { region: "South America", allocation: 5, spendUsd: 850, spendInr: 77350, color: "#a78bfa" },
];

const cpcBreakdown: CpcBreakdown[] = [
  { region: "Europe", cpc: 3.5, spendUsd: 5950, clicks: 1700 },
  { region: "Asia & MENA", cpc: 2.5, spendUsd: 5100, clicks: 2040 },
  { region: "North America", cpc: 5, spendUsd: 4250, clicks: 850 },
  { region: "South Africa", cpc: 1.5, spendUsd: 850, clicks: 567 },
  { region: "South America", cpc: 2.5, spendUsd: 850, clicks: 340 },
];

const funnelStages: FunnelStage[] = [
  { stage: "Paid Clicks", rate: "—", volume: 5497, description: "Targeted traffic from Google, Meta, YouTube, LinkedIn." },
  { stage: "Leads & Inquiries", rate: "30%", volume: 1649, description: "Form fills, WhatsApp, and email inquiries." },
  { stage: "Qualified Leads", rate: "60%", volume: 989, description: "Meets Boyar's investment and compliance criteria." },
  { stage: "Calls Booked", rate: "50%", volume: 495, description: "Consultations scheduled with strategy leads." },
  { stage: "High-Intent Prospects", rate: "40%", volume: 198, description: "Advanced diligence and proposal reviews." },
  { stage: "Closed Clients", rate: "9%", volume: 17, description: "Signed mandates in Year 1." },
];

const clientDistribution = [
  { service: "Company Formation", clients: 8 },
  { service: "Full Structure", clients: 2 },
  { service: "Office Registration", clients: 1 },
  { service: "Banking", clients: 2 },
  { service: "Corporate Services", clients: 4 },
];

const revenueProjection: RevenueRow[] = [
  { service: "Company Formation", clients: 8, priceUsd: 2500, revenueUsd: 20000, revenueInr: 1820000 },
  { service: "Full Structure", clients: 2, priceUsd: 29700, revenueUsd: 59400, revenueInr: 5405400 },
  { service: "Office Registration", clients: 1, priceUsd: 1500, revenueUsd: 1500, revenueInr: 136500 },
  { service: "Banking", clients: 2, priceUsd: 6500, revenueUsd: 13000, revenueInr: 1183000 },
  { service: "Corporate Services", clients: 4, priceUsd: 3500, revenueUsd: 14000, revenueInr: 1274000 },
];

const clickDistribution = [
  { region: "Europe", clicks: 1700, color: "#38bdf8" },
  { region: "Asia & MENA", clicks: 2040, color: "#34d399" },
  { region: "North America", clicks: 850, color: "#f472b6" },
  { region: "South Africa", clicks: 567, color: "#facc15" },
  { region: "South America", clicks: 340, color: "#a78bfa" },
];

const revenueDistribution = [
  { service: "Company Formation", revenue: 20000, color: "#34d399" },
  { service: "Full Structure", revenue: 59400, color: "#38bdf8" },
  { service: "Office Registration", revenue: 1500, color: "#f87171" },
  { service: "Banking", revenue: 13000, color: "#fbbf24" },
  { service: "Corporate Services", revenue: 14000, color: "#a78bfa" },
];

const CPC_BAR_COLOR = "linear-gradient(180deg,#60a5fa,#2563eb)";
const CLICK_BAR_COLOR = "linear-gradient(180deg,#34d399,#0f766e)";

const marketingOpsMonthly = [
  { label: "Software Stack", amountInr: 10000 },
  { label: "YouTube & Content", amountInr: 30000 },
  { label: "Editor & Marketing Talent", amountInr: 15000 },
];

const AD_SPEND_USD = 17000;
const AD_SPEND_INR = 1547000;
const TOTAL_CLICKS = 5497;
const BLENDED_CPC_USD = 3.09;
const BLENDED_CPC_INR = 281.19;
const TOTAL_CLIENTS = 17;
const CAC_COST_INR = 2207000;
const MARKETING_CAC_INR = 129823;
const MARKETING_CAC_USD = 1426;
const TOTAL_REVENUE_USD = 107900;
const TOTAL_REVENUE_INR = 9818900;
const CAC_OPS_MONTHLY_INR = 55000;
const CAC_OPS_ANNUAL_INR = 660000;
const ROAS = TOTAL_REVENUE_USD / AD_SPEND_USD;
const EXCEL_FILE_PATH = "/files/Boyar_CAAC_Model_v2.xlsx";

const usdFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

const inrFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

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

export default function CACMarketingPage() {
  const maxClicks = Math.max(...cpcBreakdown.map((item) => item.clicks));
  const pieGradient = `conic-gradient(${buildPieGradient()})`;
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const totalClicks = useMemo(() => clickDistribution.reduce((sum, region) => sum + region.clicks, 0), []);
  const totalRevenue = useMemo(() => revenueDistribution.reduce((sum, service) => sum + service.revenue, 0), []);

  function handleDownloadConfirm() {
    const link = document.createElement("a");
    link.href = EXCEL_FILE_PATH;
    link.download = "Boyar_CAAC_Model_v2.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadPrompt(false);
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/tools" className="text-sm text-white/70 hover:text-white transition">
              ← Back to Tools
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Boyar Partners · CAC Module</p>
              <h1 className="text-2xl font-medium text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Marketing CAC – Investor Brief
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Launch Year: 2025</p>
              <p>Regions: Europe · Asia & MENA · North America · LATAM · South Africa</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowDownloadPrompt(true)}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white hover:bg-white/20 transition"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Download Excel File
            </button>
          </div>
          <section className="grid gap-8">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    The Boyar Partners CAC Module shows how a disciplined media plan converts paid attention into committed capital
                    across high-value jurisdictions. Year-one spend focuses on channel mix testing, regional CPC efficiency, and a
                    qualification-heavy funnel that keeps diligence time high while protecting unit economics. Investors see the
                    complete bridge from ad spend to realized revenue, with ROAS, CPC, CTC, and CAC fully reconciled.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Total Ad Budget" primary={usdFormatter(AD_SPEND_USD)} secondary={inrFormatter(AD_SPEND_INR)} />
                    <StatCard
                      label="Marketing CAC / Client"
                      primary={inrFormatter(MARKETING_CAC_INR)}
                      secondary={usdFormatter(MARKETING_CAC_USD, 0)}
                    />
                    <StatCard
                      label="Blended CPC"
                      primary={`${usdFormatter(BLENDED_CPC_USD, 2)} / click`}
                      secondary={`${inrFormatter(BLENDED_CPC_INR, 2)} / click`}
                    />
                    <StatCard label="ROAS" primary={`×${ROAS.toFixed(2)}`} secondary="Revenue ÷ Ad Spend" />
                  </div>
                </div>
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Funnel Snapshot</p>
                  <h2 className="mt-2 text-4xl font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                    {TOTAL_CLIENTS}
                  </h2>
                  <p className="text-sm text-white/70">Clients closed from 5,497 paid clicks.</p>
                  <div className="mt-6 space-y-3">
                    <ProgressLine label="Leads" value={1649} total={TOTAL_CLICKS} />
                    <ProgressLine label="Qualified" value={989} total={TOTAL_CLICKS} />
                    <ProgressLine label="Calls" value={495} total={TOTAL_CLICKS} />
                    <ProgressLine label="Closed" value={TOTAL_CLIENTS} total={TOTAL_CLICKS} />
                  </div>
                </div>
              </div>
            </motion.div>

            <SectionCard title="Year-1 Ad Spend & Platforms" subtitle="Global performance media stack aligned to regulated markets.">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-white/60">
                        <th className="pb-2 font-medium">Budget Component</th>
                        <th className="pb-2 font-medium">USD</th>
                        <th className="pb-2 font-medium">INR @ 91</th>
                        <th className="pb-2 font-medium">Platforms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-white/10 text-white/80">
                        <td className="py-3">Paid Ads</td>
                        <td>{usdFormatter(AD_SPEND_USD)}</td>
                        <td>{inrFormatter(AD_SPEND_INR)}</td>
                        <td className="text-xs text-white/60">Google Search · YouTube · Meta · LinkedIn</td>
                      </tr>
                      <tr className="border-t border-white/10 text-white">
                        <td className="py-3 font-semibold">Total</td>
                        <td className="font-semibold">{usdFormatter(AD_SPEND_USD)}</td>
                        <td className="font-semibold">{inrFormatter(AD_SPEND_INR)}</td>
                        <td>—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
                  <p className="text-sm text-white/70">
                    CPC is monitored weekly by region and channel, keeping bid strategies tightly correlated to buyer intent. Creative testing
                    rotates around regulatory ease, timeline certainty, and global structuring credibility—messages that over-index with
                    Boyar&apos;s qualified pipeline.
                  </p>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li>• 70% of spend remains on search intent (Google).</li>
                    <li>• LinkedIn powers global CFO and legal persona retargeting.</li>
                    <li>• Meta + YouTube deliver scale plus narrative control.</li>
                  </ul>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Regional Allocation" subtitle="Capital follows regulatory velocity and demand concentration.">
              <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Region</th>
                        <th className="px-4 py-3 text-left font-medium">Allocation %</th>
                        <th className="px-4 py-3 text-left font-medium">Spend (USD)</th>
                        <th className="px-4 py-3 text-left font-medium">Spend (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalAllocations.map((region) => (
                        <tr key={region.region} className="border-t border-white/10 text-white/80">
                          <td className="px-4 py-3 flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: region.color }} />
                            {region.region}
                          </td>
                          <td className="px-4 py-3">{region.allocation}%</td>
                          <td className="px-4 py-3">{usdFormatter(region.spendUsd)}</td>
                          <td className="px-4 py-3">{inrFormatter(region.spendInr)}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-white/10 text-white font-semibold">
                        <td className="px-4 py-3">Total</td>
                        <td className="px-4 py-3">100%</td>
                        <td className="px-4 py-3">{usdFormatter(AD_SPEND_USD)}</td>
                        <td className="px-4 py-3">{inrFormatter(AD_SPEND_INR)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-black/40 p-6">
                  <div className="relative h-64 w-64 max-w-full">
                    <div
                      className="absolute inset-0 rounded-full shadow-inner shadow-black/60"
                      style={{ backgroundImage: pieGradient }}
                    />
                    <div className="absolute inset-8 rounded-full bg-black/90 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Year-1</p>
                        <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                          Regional Mix
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full space-y-2 text-xs text-white/70">
                    <p>Europe + Asia = 65% of media due to immediate conversion velocity.</p>
                    <p>North America builds future pipeline in parallel.</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Regional CPC & Click Breakdown" subtitle="True cost to acquire attention in each corridor.">
              <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Region</th>
                        <th className="px-4 py-3 text-left font-medium">CPC (USD)</th>
                        <th className="px-4 py-3 text-left font-medium">Spend (USD)</th>
                        <th className="px-4 py-3 text-left font-medium">Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cpcBreakdown.map((row) => (
                        <tr key={row.region} className="border-t border-white/10 text-white/80">
                          <td className="px-4 py-3">{row.region}</td>
                          <td className="px-4 py-3">{usdFormatter(row.cpc, 2)}</td>
                          <td className="px-4 py-3">{usdFormatter(row.spendUsd)}</td>
                          <td className="px-4 py-3">{row.clicks.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-white/10 text-white font-semibold">
                        <td className="px-4 py-3">Total</td>
                        <td className="px-4 py-3">—</td>
                        <td className="px-4 py-3">{usdFormatter(AD_SPEND_USD)}</td>
                        <td className="px-4 py-3">{TOTAL_CLICKS.toLocaleString()} clicks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-sm text-white/70">Clicks per region</p>
                  <div className="mt-4 space-y-4">
                    {cpcBreakdown.map((row) => (
                      <div key={row.region}>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{row.region}</span>
                          <span>{row.clicks.toLocaleString()} clicks</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(row.clicks / maxClicks) * 100}%`,
                              background: "linear-gradient(90deg,#22d3ee,#38bdf8)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">Blended CPC</p>
                    <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                      {usdFormatter(BLENDED_CPC_USD, 2)}
                    </p>
                    <p className="text-sm text-white/60">({inrFormatter(BLENDED_CPC_INR, 2)} per click)</p>
                    <p className="mt-3 text-xs text-white/50">= {usdFormatter(AD_SPEND_USD)} ÷ {TOTAL_CLICKS.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="CAC Visual Analytics" subtitle="Visual summary of demand efficiency, pricing pressure, and service revenue mix.">
              <div className="grid gap-6 xl:grid-cols-2">
                <ChartCard title="Click Distribution by Region" description="Percentage share of 5,497 paid clicks.">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="relative mx-auto h-56 w-56">
                      <div
                        className="absolute inset-0 rounded-full shadow-inner shadow-black/60"
                        style={{ backgroundImage: `conic-gradient(${buildGenericPie(clickDistribution, "clicks")})` }}
                      />
                      <div className="absolute inset-10 rounded-full bg-black/90 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Clicks</p>
                          <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                            {totalClicks.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="flex-1 space-y-3 text-sm text-white/80">
                      {clickDistribution.map((item) => {
                        const pct = ((item.clicks / totalClicks) * 100).toFixed(1);
                        return (
                          <li key={item.region} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span>{item.region}</span>
                            </div>
                            <span>{pct}%</span>
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
                    barColor={CPC_BAR_COLOR}
                  />
                </ChartCard>

                <ChartCard title="Clicks by Region" description="Absolute clicks powering the funnel." >
                  <BarChart
                    data={cpcBreakdown.map((item) => ({ label: item.region, value: item.clicks }))}
                    maxValue={Math.max(...cpcBreakdown.map((item) => item.clicks))}
                    barColor={CLICK_BAR_COLOR}
                    unit=""
                    formatValue={(value) => `${value.toLocaleString()} clicks`}
                  />
                </ChartCard>

                <ChartCard title="Revenue Distribution by Service Type (USD)" description="Mandate concentration across service lines.">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="relative mx-auto h-56 w-56">
                      <div
                        className="absolute inset-0 rounded-full shadow-inner shadow-black/60"
                        style={{ backgroundImage: `conic-gradient(${buildGenericPie(revenueDistribution, "revenue")})` }}
                      />
                      <div className="absolute inset-10 rounded-full bg-black/90 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Revenue</p>
                          <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                            {usdFormatter(totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="flex-1 space-y-3 text-sm text-white/80">
                      {revenueDistribution.map((item) => {
                        const pct = ((item.revenue / totalRevenue) * 100).toFixed(1);
                        return (
                          <li key={item.service} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span>{item.service}</span>
                            </div>
                            <span>{pct}%</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ChartCard>
              </div>
            </SectionCard>

            <SectionCard title="Funnel Performance" subtitle="Qualification-heavy funnel keeps CAC defensible.">
              <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <div className="space-y-4">
                    {funnelStages.map((stage, index) => (
                      <div key={stage.stage} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-white/50 text-xs">{String(index + 1).padStart(2, "0")}</span>
                          <div>
                            <p className="font-medium text-white">{stage.stage}</p>
                            <p className="text-xs text-white/60">{stage.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-6 text-sm text-white/80">
                          <span>{stage.rate}</span>
                          <span>{stage.volume.toLocaleString()} </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex justify-between">
                      <span>Final Client Conversion vs Clicks</span>
                      <span>0.309%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Final Client Conversion vs Qualified</span>
                      <span>1.718%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LTV / CAC Focus</span>
                      <span>Company Formation drives 18.5% of revenue</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top-of-Funnel </span>
                      <span>5,497 verified clicks</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Narrative</p>
                    <p className="mt-2">
                      CAC efficiency is reinforced by qualification. Only 30% of traffic becomes an inquiry, yet each inquiry is routed through
                      compliance before sales time is spent. This keeps marketing-only CAC under $1.5K while preserving premium pricing per
                      mandate.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Final Client Distribution" subtitle="Revenue diversification across Boyar service lines.">
              <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Service Line</th>
                        <th className="px-4 py-3 text-left font-medium">Clients</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDistribution.map((row) => (
                        <tr key={row.service} className="border-t border-white/10 text-white/80">
                          <td className="px-4 py-3">{row.service}</td>
                          <td className="px-4 py-3">{row.clients}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-white/10 text-white font-semibold">
                        <td className="px-4 py-3">Total</td>
                        <td className="px-4 py-3">{TOTAL_CLIENTS}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">Service mix</p>
                  <div className="mt-4 space-y-4">
                    {clientDistribution.map((row) => {
                      const width = (row.clients / TOTAL_CLIENTS) * 100;
                      return (
                        <div key={row.service}>
                          <div className="flex justify-between text-xs text-white/60">
                            <span>{row.service}</span>
                            <span>{row.clients} clients</span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-sm text-white/70">
                    Company Formation is the entry point into Boyar&apos;s stack, while Full Structure mandates anchor the revenue curve.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Year-1 Revenue Projection" subtitle="Mandates tied directly to funnel output.">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Service</th>
                      <th className="px-4 py-3 text-left font-medium">Clients</th>
                      <th className="px-4 py-3 text-left font-medium">Price / Client (USD)</th>
                      <th className="px-4 py-3 text-left font-medium">Revenue (USD)</th>
                      <th className="px-4 py-3 text-left font-medium">Revenue (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueProjection.map((row) => (
                      <tr key={row.service} className="border-t border-white/10 text-white/80">
                        <td className="px-4 py-3">{row.service}</td>
                        <td className="px-4 py-3">{row.clients}</td>
                        <td className="px-4 py-3">{usdFormatter(row.priceUsd)}</td>
                        <td className="px-4 py-3">{usdFormatter(row.revenueUsd)}</td>
                        <td className="px-4 py-3">{inrFormatter(row.revenueInr)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10 text-white font-semibold">
                      <td className="px-4 py-3">TOTAL</td>
                      <td className="px-4 py-3">{TOTAL_CLIENTS}</td>
                      <td className="px-4 py-3">—</td>
                      <td className="px-4 py-3">{usdFormatter(TOTAL_REVENUE_USD)}</td>
                      <td className="px-4 py-3">{inrFormatter(TOTAL_REVENUE_INR)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Marketing-Only CAC Stack" subtitle="Transparent view of every rupee invested to acquire 17 clients.">
              <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">Monthly Ops</p>
                  <ul className="space-y-3 text-sm text-white/80">
                    {marketingOpsMonthly.map((item) => (
                      <li key={item.label} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>{inrFormatter(item.amountInr)}</span>
                      </li>
                    ))}
                    <li className="flex items-center justify-between border-t border-white/10 pt-3 text-white font-semibold">
                      <span>CAC Ops Monthly</span>
                      <span>{inrFormatter(CAC_OPS_MONTHLY_INR)}</span>
                    </li>
                    <li className="flex items-center justify-between text-white/80">
                      <span>CAC Ops Annual</span>
                      <span>{inrFormatter(CAC_OPS_ANNUAL_INR)}</span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/60">
                    Ops includes paid infrastructure, media production, and strategic marketing headcount dedicated to CAC.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="space-y-4 text-sm text-white/80">
                    <p>
                      <strong>Total CAC Cost:</strong> {inrFormatter(CAC_COST_INR)} (Ad Spend {inrFormatter(AD_SPEND_INR)} + Marketing Ops{" "}
                      {inrFormatter(CAC_OPS_ANNUAL_INR)})
                    </p>
                    <p>
                      <strong>Marketing-Only CAC (17 clients):</strong> {inrFormatter(MARKETING_CAC_INR)} ≈ {usdFormatter(MARKETING_CAC_USD)}
                    </p>
                    <p>
                      <strong>ROAS:</strong> {ROAS.toFixed(2)}× ({usdFormatter(TOTAL_REVENUE_USD)} ÷ {usdFormatter(AD_SPEND_USD)})
                    </p>
                    <p>
                      <strong>Revenue Coverage:</strong> {usdFormatter(TOTAL_REVENUE_USD)} ({inrFormatter(TOTAL_REVENUE_INR)}) in Year 1.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Investor takeaway</p>
                    <p className="mt-2">
                      CAC discipline leaves margin for scale. Even with conservative conversion assumptions, Boyar deploys ₹1.29L per client
                      to unlock mandates averaging $6.35 in revenue per ad dollar.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <motion.div
              className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs uppercase tracking-[0.5em] text-emerald-200">Proof of Efficiency</p>
              <h3 className="mt-3 text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Ad Spend → Qualified Flow → Revenue Certainty
              </h3>
              <p className="mt-3 text-white/80 text-sm max-w-2xl mx-auto">
                Boyar Partners converts intent-rich global demand into structured mandates with transparent CAC math. This marketing-only
                model is ready to absorb additional capital while keeping regional CPC, qualification rigor, and ROAS in investor-friendly
                territory.
              </p>
            </motion.div>
          </section>
        </main>

        <AnimatePresence>
          {showDownloadPrompt && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDownloadPrompt(false)}
              />
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
              >
                <div className="w-full max-w-md rounded-3xl border border-white/15 bg-black/90 p-6 text-center backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">Download</p>
                  <h3 className="mt-3 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                    Boyar_CAAC_Model_v2.xlsx
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    Would you like to download the full CAC Excel model?
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setShowDownloadPrompt(false)}
                      className="rounded-full border border-white/30 px-6 py-3 text-sm text-white/70 hover:bg-white/10 transition"
                    >
                      No
                    </button>
                    <button
                      onClick={handleDownloadConfirm}
                      className="rounded-full border border-white/10 bg-white/90 px-6 py-3 text-sm font-semibold text-black hover:bg-white transition"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      Yes, download
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

interface StatCardProps {
  label: string;
  primary: string;
  secondary?: string;
}

function StatCard({ label, primary, secondary }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs uppercase tracking-[0.4em] text-white/50">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
        {primary}
      </p>
      {secondary && <p className="text-sm text-white/60">{secondary}</p>}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <motion.section
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">{title}</p>
        <p className="mt-1 text-sm text-white/70">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}

interface ProgressLineProps {
  label: string;
  value: number;
  total: number;
}

interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl shadow-2xl">
      <div className="mb-4">
        <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
          {title}
        </p>
        <p className="text-xs text-white/60">{description}</p>
      </div>
      {children}
    </div>
  );
}

interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue: number;
  unit?: string;
  barColor: string;
  formatValue?: (value: number) => string;
}

function BarChart({ data, maxValue, unit, barColor, formatValue }: BarChartProps) {
  return (
    <div className="flex items-end gap-3 overflow-x-auto pb-2">
      {data.map((item) => {
        const height = (item.value / maxValue) * 100;
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center text-center text-xs text-white/70">
            <span className="mb-2 text-[10px] uppercase tracking-wide text-white/60">{item.label}</span>
            <div className="flex h-48 w-10 items-end rounded-full bg-white/5">
              <div
                className="w-full rounded-full"
                style={{
                  height: `${height}%`,
                  background: barColor,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                }}
              />
            </div>
            <span className="mt-2 text-[11px] font-semibold text-white">
              {formatValue ? formatValue(item.value) : `${item.value}${unit ? ` ${unit}` : ""}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProgressLine({ label, value, total }: ProgressLineProps) {
  const width = (value / total) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>{label}</span>
        <span>{value.toLocaleString()}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}


