"use client";

import { useState, useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_CAC_POOL_USD = 31200;
const CHANNEL_COSTS_USD = 23736;
const OVERHEAD_COSTS_USD = 7464;
const EFFECTIVE_CPL_USD = 54.94;
const COST_PER_EFFORT_DAY_USD = 18.34;

const SERVICE_COLORS: Record<string, string> = {
  "Company Formation": "#6b8f71",
  "Standalone Trust": "#7c9eb5",
  "Full Structure": "#c9a55c",
  "Corporate Services": "#a8a8a8",
  "Office Registration": "#8b7355",
  Banking: "#9b8bb4",
};

const TRUE_CAC_TABLE = [
  { service: "Company Formation", channelCac: 916, overheadCac: 256, trueCac: 1173, clients: 6, totalAbsorbed: 7038 },
  { service: "Standalone Trust", channelCac: 2199, overheadCac: 825, trueCac: 3024, clients: 1, totalAbsorbed: 3024 },
  { service: "Full Structure", channelCac: 3665, overheadCac: 1375, trueCac: 5041, clients: 2, totalAbsorbed: 10082 },
  { service: "Corporate Services", channelCac: 1374, overheadCac: 385, trueCac: 1759, clients: 4, totalAbsorbed: 7036 },
  { service: "Office Registration", channelCac: 687, overheadCac: 128, trueCac: 815, clients: 2, totalAbsorbed: 1630 },
  { service: "Banking", channelCac: 1832, overheadCac: 550, trueCac: 2383, clients: 1, totalAbsorbed: 2383 },
];

const UNIT_ECONOMICS = [
  { service: "Company Formation", trueCac: 1173, revenue: 2500, gmPct: 47, grossProfit: 1175, gpAfterCac: 2, returnOnCac: "1.00x" },
  { service: "Standalone Trust", trueCac: 3024, revenue: 13000, gmPct: 55, grossProfit: 7150, gpAfterCac: 4126, returnOnCac: "2.36x" },
  { service: "Full Structure", trueCac: 5041, revenue: 29700, gmPct: 50, grossProfit: 14850, gpAfterCac: 9809, returnOnCac: "2.95x" },
  { service: "Corporate Services", trueCac: 1759, revenue: 3500, gmPct: 60, grossProfit: 2100, gpAfterCac: 341, returnOnCac: "1.19x" },
  { service: "Office Registration", trueCac: 815, revenue: 1500, gmPct: 50, grossProfit: 750, gpAfterCac: -65, returnOnCac: "0.92x" },
  { service: "Banking", trueCac: 2383, revenue: 6500, gmPct: 65, grossProfit: 4225, gpAfterCac: 1842, returnOnCac: "1.77x" },
];

const DUPONT_TABLE = [
  { service: "Company Formation", marginDepth: "47%", revenueIntensity: "2.13x", returnOnCac: "1.00x" },
  { service: "Standalone Trust", marginDepth: "55%", revenueIntensity: "4.30x", returnOnCac: "2.36x" },
  { service: "Full Structure", marginDepth: "50%", revenueIntensity: "5.89x", returnOnCac: "2.95x" },
  { service: "Corporate Services", marginDepth: "60%", revenueIntensity: "1.99x", returnOnCac: "1.19x" },
  { service: "Office Registration", marginDepth: "50%", revenueIntensity: "1.84x", returnOnCac: "0.92x" },
  { service: "Banking", marginDepth: "65%", revenueIntensity: "2.73x", returnOnCac: "1.77x" },
];

const CONVERSION_DATA = [
  { service: "Company Formation", closeRate: "6.0%", leadsRequired: "16.7", cycleDays: "14", complexity: "Templated, clear need, minimal trust threshold" },
  { service: "Standalone Trust", closeRate: "2.5%", leadsRequired: "40.0", cycleDays: "45", complexity: "Fiduciary expertise, HNI decision-maker" },
  { service: "Full Structure", closeRate: "1.5%", leadsRequired: "66.7", cycleDays: "75", complexity: "Multi-entity coordination, founder-led sales" },
  { service: "Corporate Services", closeRate: "4.0%", leadsRequired: "25.0", cycleDays: "21", complexity: "Compliance-driven, moderate customisation" },
  { service: "Office Registration", closeRate: "8.0%", leadsRequired: "12.5", cycleDays: "7", complexity: "Lowest friction, typically an add-on" },
  { service: "Banking", closeRate: "3.0%", leadsRequired: "33.3", cycleDays: "30", complexity: "Jurisdiction-specific, compliance-heavy" },
];

const COST_ATTRIBUTION = [
  { component: "Marketing & Ads", monthly: 1648, allocation: "100%", monthlyCac: 1648, annualCac: 19776 },
  { component: "Content Production", monthly: 330, allocation: "100%", monthlyCac: 330, annualCac: 3960 },
  { component: "Technology & Software", monthly: 248, allocation: "50%", monthlyCac: 124, annualCac: 1488 },
  { component: "Human Resources", monthly: 220, allocation: "60%", monthlyCac: 132, annualCac: 1584 },
  { component: "Infrastructure (Office)", monthly: 440, allocation: "40%", monthlyCac: 176, annualCac: 2112 },
  { component: "Device Rental", monthly: 154, allocation: "40%", monthlyCac: 62, annualCac: 744 },
  { component: "Contingency", monthly: 220, allocation: "0%", monthlyCac: 0, annualCac: 0 },
];

const usdFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

const stagger = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] } });
const fadeUp = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } };

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden" {...fadeUp}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-[13px] text-white/80 hover:text-white transition group">
        <span style={{ fontFamily: "var(--font-benzin)" }}>{title}</span>
        <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white" /></motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="border-t border-white/[0.06] px-6 pb-6 pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const trueCacSorted = [...TRUE_CAC_TABLE].sort((a, b) => b.trueCac - a.trueCac);
const maxTrueCac = Math.max(...TRUE_CAC_TABLE.map((r) => r.trueCac));
const totalAbsorbed = TRUE_CAC_TABLE.reduce((s, r) => s + r.totalAbsorbed, 0);

export default function GroupWiseCacPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("chart");

  const donutSegments = useMemo(() => {
    let cumulativePct = 0;
    return TRUE_CAC_TABLE.map((r) => {
      const pct = (r.totalAbsorbed / totalAbsorbed) * 100;
      const start = cumulativePct;
      cumulativePct += pct;
      return { ...r, pct, start, end: cumulativePct, color: SERVICE_COLORS[r.service] ?? "#94a3b8" };
    });
  }, []);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        {/* Header */}
        <header className="relative z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
            <Link href="/cac/true" className="text-[13px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-wide">← Back to True CAC</Link>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Boyar Partners · True CAC</p>
              <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>Group-wise CAC — Activity-Based Allocation</h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 space-y-10">

          {/* ═══ Hero Metrics Strip ═══ */}
          <motion.section className="grid grid-cols-2 lg:grid-cols-4 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {[
              { label: "Total CAC Pool", value: usdFormatter(TOTAL_CAC_POOL_USD), accent: true },
              { label: "Effective CPL", value: usdFormatter(EFFECTIVE_CPL_USD, 2) },
              { label: "Cost / Effort-Day", value: usdFormatter(COST_PER_EFFORT_DAY_USD, 2) },
              { label: "Services Covered", value: "6" },
            ].map((m, i) => (
              <motion.div key={m.label} className={`relative rounded-xl border p-5 overflow-hidden ${m.accent ? "border-[#c9a55c]/20 bg-[#c9a55c]/[0.04]" : "border-white/[0.06] bg-white/[0.02]"}`} {...stagger(i)}>
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">{m.label}</p>
                <p className={`mt-2 text-xl font-semibold tabular-nums ${m.accent ? "text-[#c9a55c]" : "text-white"}`} style={{ fontFamily: "var(--font-benzin)" }}>{m.value}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* ═══ Cost Pool Split ═══ */}
          <motion.section className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden" {...fadeUp}>
            <div className="px-6 pt-6 pb-2 flex items-end gap-4">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Cost Pool Construction</h2>
            </div>

            <div className="grid lg:grid-cols-[1fr,auto,1fr] items-stretch">
              {/* Channel */}
              <div className="p-6 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a55c]/70 font-medium mb-3">Channel Costs</p>
                  <p className="text-3xl font-bold text-[#c9a55c] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(CHANNEL_COSTS_USD)}</p>
                  <p className="text-[12px] text-white/50 mt-1">76.1% of total pool</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[12px] text-white/60 leading-relaxed">Channel costs are allocated by conversion rate: lower conversion implies more leads consumed per client, so a higher cost is attributed to that service.</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Effective CPL</span>
                    <span className="text-[14px] font-semibold text-white tabular-nums">{usdFormatter(EFFECTIVE_CPL_USD, 2)}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:flex flex-col items-center justify-center px-4">
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              {/* Overhead */}
              <div className="p-6 flex flex-col justify-between gap-6 border-t lg:border-t-0 border-white/[0.06]">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#7c9eb5]/80 font-medium mb-3">Overhead Costs</p>
                  <p className="text-3xl font-bold text-[#7c9eb5] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(OVERHEAD_COSTS_USD)}</p>
                  <p className="text-[12px] text-white/50 mt-1">23.9% of total pool</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[12px] text-white/60 leading-relaxed">Overhead is allocated by sales cycle length: longer cycles consume more effort-days, so a higher share of overhead is assigned to that service.</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Cost / Effort-Day</span>
                    <span className="text-[14px] font-semibold text-white tabular-nums">{usdFormatter(COST_PER_EFFORT_DAY_USD, 2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual bar */}
            <div className="mx-6 mb-6 mt-2 h-3 rounded-full overflow-hidden bg-white/[0.04] flex">
              <motion.div className="h-full" style={{ background: "linear-gradient(90deg, #c9a55c, #8b6914)" }} initial={{ width: 0 }} whileInView={{ width: `${(CHANNEL_COSTS_USD / TOTAL_CAC_POOL_USD) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
              <motion.div className="h-full flex-1" style={{ background: "linear-gradient(90deg, #7c9eb5, #3d5f73)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} />
            </div>

            <Collapsible title="View full cost attribution breakdown">
              <p className="text-[12px] text-white/55 mb-4">Detailed cost components, monthly spend, allocation %, and monthly contribution to CAC. Source: ABC model.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      {["Cost Component", "Monthly (USD)", "Allocation %", "Monthly to CAC", "Annual to CAC"].map((h, i) => (
                        <th key={h} className={`px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COST_ATTRIBUTION.map((row) => (
                      <tr key={row.component} className="border-b border-white/[0.04] text-white/65 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3">{row.component}</td>
                        <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(row.monthly)}</td>
                        <td className="px-5 py-3 text-right tabular-nums">{row.allocation}</td>
                        <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(row.monthlyCac)}</td>
                        <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(row.annualCac)}</td>
                      </tr>
                    ))}
                    <tr className="text-white font-semibold bg-white/[0.02]">
                      <td className="px-5 py-3">Total</td>
                      <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(COST_ATTRIBUTION.reduce((s, r) => s + r.monthly, 0))}</td>
                      <td className="px-5 py-3 text-right">—</td>
                      <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(COST_ATTRIBUTION.reduce((s, r) => s + r.monthlyCac, 0))}</td>
                      <td className="px-5 py-3 text-right tabular-nums">{usdFormatter(COST_ATTRIBUTION.reduce((s, r) => s + r.annualCac, 0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12px] text-white/45">Rounded to $2,600/month → $31,200/year. Rounding buffer absorbs minor untracked acquisition friction.</p>
            </Collapsible>
          </motion.section>

          {/* ═══ True CAC Per Service — Horizontal bars + tabbed detail ═══ */}
          <motion.section className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden" {...fadeUp}>
            <div className="px-6 pt-6 flex items-end gap-4 mb-1">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>True CAC Per Service</h2>
            </div>

            {/* Service bar rows — each service gets a row */}
            <div className="px-6 pt-4 pb-6 space-y-3">
              {trueCacSorted.map((row, i) => {
                const widthPct = (row.trueCac / maxTrueCac) * 100;
                const color = SERVICE_COLORS[row.service] ?? "#c9a55c";
                const isHovered = hoveredService === row.service;
                return (
                  <motion.div
                    key={row.service}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredService(row.service)}
                    onMouseLeave={() => setHoveredService(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-36 sm:w-44 flex-shrink-0 text-right">
                        <span className={`text-[12px] transition-colors duration-200 ${isHovered ? "text-white" : "text-white/60"}`}>{row.service}</span>
                      </div>
                      <div className="flex-1 relative h-8 rounded-lg bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3"
                          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 z-10">
                          <span className="text-[11px] font-medium text-white/90 tabular-nums">{usdFormatter(row.trueCac)}</span>
                        </div>
                      </div>
                      <div className="w-20 flex-shrink-0 text-right">
                        <span className="text-[11px] text-white/40 tabular-nums">{row.clients} clients</span>
                      </div>
                    </div>
                    {/* Expand detail on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="ml-40 sm:ml-48 mt-1 flex gap-6 text-[10px] text-white/50"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span>Channel: {usdFormatter(row.channelCac)}</span>
                          <span>Overhead: {usdFormatter(row.overheadCac)}</span>
                          <span>Total absorbed: {usdFormatter(row.totalAbsorbed)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Table/Chart toggle */}
            <div className="border-t border-white/[0.06] px-6 py-4">
              <div className="flex gap-1 mb-4">
                {(["chart", "table"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] rounded-md transition-all duration-200 ${activeTab === tab ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}>{tab}</button>
                ))}
              </div>

              {activeTab === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        {["Service", "Channel CAC", "Overhead CAC", "True CAC", "Clients", "Total Absorbed"].map((h, i) => (
                          <th key={h} className={`px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TRUE_CAC_TABLE.map((row) => (
                        <tr key={row.service} className="border-b border-white/[0.04] text-white/65 hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 flex items-center gap-2"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: SERVICE_COLORS[row.service] }} />{row.service}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{usdFormatter(row.channelCac)}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{usdFormatter(row.overheadCac)}</td>
                          <td className="px-4 py-3 text-right tabular-nums font-medium text-white">{usdFormatter(row.trueCac)}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{row.clients}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{usdFormatter(row.totalAbsorbed)}</td>
                        </tr>
                      ))}
                      <tr className="text-white font-semibold bg-white/[0.02]">
                        <td className="px-4 py-3">TOTAL</td>
                        <td className="px-4 py-3 text-right">—</td>
                        <td className="px-4 py-3 text-right">—</td>
                        <td className="px-4 py-3 text-right">—</td>
                        <td className="px-4 py-3 text-right tabular-nums">16</td>
                        <td className="px-4 py-3 text-right tabular-nums">{usdFormatter(totalAbsorbed)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "chart" && (
                <div className="grid md:grid-cols-[3fr,2fr] gap-6 items-center">
                  {/* Grouped bar chart — CAC vs GP */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">CAC vs Gross Profit by service</p>
                    <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid meet" className="w-full h-64">
                      <defs>
                        <linearGradient id="cacBar" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c9a55c" /><stop offset="100%" stopColor="#8b6914" /></linearGradient>
                        <linearGradient id="gpBar" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6b8f71" /><stop offset="100%" stopColor="#3d5a42" /></linearGradient>
                      </defs>
                      <line x1={50} y1={230} x2={380} y2={230} stroke="rgba(148,163,184,0.2)" strokeWidth={1} />
                      <line x1={50} y1={40} x2={50} y2={230} stroke="rgba(148,163,184,0.2)" strokeWidth={1} />
                      {[0.25, 0.5, 0.75, 1].map((t, idx) => (<line key={idx} x1={50} x2={380} y1={230 - t * 160} y2={230 - t * 160} stroke="rgba(148,163,184,0.08)" strokeWidth={0.5} strokeDasharray="4 4" />))}
                      {UNIT_ECONOMICS.map((row, index) => {
                        const maxVal = Math.max(...UNIT_ECONOMICS.flatMap((r) => [r.trueCac, r.grossProfit]));
                        const baseX = 60 + index * 55;
                        const width = 14;
                        const cacHeight = (row.trueCac / maxVal) * 160;
                        const gpHeight = (row.grossProfit / maxVal) * 160;
                        const label = { "Company Formation": "Comp.Form", "Standalone Trust": "Trust", "Full Structure": "Full Str.", "Corporate Services": "Corp.Svc", "Office Registration": "Office", Banking: "Banking" }[row.service] ?? row.service;
                        return (
                          <g key={row.service}>
                            <rect x={baseX} y={230 - cacHeight} width={width} height={cacHeight} rx={2} fill="url(#cacBar)" />
                            <rect x={baseX + width + 4} y={230 - gpHeight} width={width} height={gpHeight} rx={2} fill="url(#gpBar)" />
                            <text x={baseX + width + 2} y={242} fontSize={8} fill="rgba(255,255,255,0.55)" textAnchor="middle">{label}</text>
                          </g>
                        );
                      })}
                      <text x={20} y={140} fontSize={9} fill="rgba(255,255,255,0.4)" transform="rotate(-90 20 140)">USD</text>
                    </svg>
                    <div className="mt-2 flex gap-6 text-[11px] text-white/50 justify-center">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#c9a55c]" /> True CAC</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#6b8f71]" /> Gross Profit</span>
                    </div>
                  </div>

                  {/* Absorption donut */}
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">CAC absorption share</p>
                    <div className="relative w-44 h-44">
                      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutSegments.map((d) => `${d.color} ${d.start}% ${d.end}%`).join(", ")})` }} />
                      <div className="absolute inset-[22%] rounded-full bg-black flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-[8px] uppercase tracking-[0.3em] text-white/40">Pool</p>
                          <p className="text-sm font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TOTAL_CAC_POOL_USD)}</p>
                        </div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-[11px]">
                      {donutSegments.map((d) => (
                        <li key={d.service} className="flex items-center gap-2 text-white/60">
                          <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                          <span className="flex-1">{d.service}</span>
                          <span className="tabular-nums text-white/50">{d.pct.toFixed(1)}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* ═══ Unit Economics — Card Grid ═══ */}
          <motion.section {...fadeUp}>
            <div className="flex items-end gap-4 mb-6">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Unit Economics by Service</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UNIT_ECONOMICS.map((row, i) => {
                const color = SERVICE_COLORS[row.service] ?? "#c9a55c";
                const isPositive = row.gpAfterCac >= 0;
                return (
                  <motion.div
                    key={row.service}
                    className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden group hover:border-white/[0.12] transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[12px] text-white/80 font-medium">{row.service}</span>
                      <span className={`text-[14px] font-bold tabular-nums ${isPositive ? "text-emerald-400" : "text-red-400"}`} style={{ fontFamily: "var(--font-benzin)" }}>{row.returnOnCac}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px]">
                      <div>
                        <p className="text-white/40">Revenue</p>
                        <p className="text-white/80 tabular-nums">{usdFormatter(row.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-white/40">True CAC</p>
                        <p className="text-white/80 tabular-nums">{usdFormatter(row.trueCac)}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Gross Margin</p>
                        <p className="text-white/80 tabular-nums">{row.gmPct}%</p>
                      </div>
                      <div>
                        <p className="text-white/40">Gross Profit</p>
                        <p className="text-white/80 tabular-nums">{usdFormatter(row.grossProfit)}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] text-white/40">GP after CAC</span>
                      <span className={`text-[13px] font-semibold tabular-nums ${isPositive ? "text-emerald-400" : "text-red-400"}`}>{usdFormatter(row.gpAfterCac)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ═══ Conversion & Sales Cycle ═══ */}
          <Collapsible title="Conversion Rates & Sales Cycle Assumptions">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    {["Service", "Lead-to-Close Rate", "Leads Required", "Sales Cycle Days", "Complexity"].map((h, i) => (
                      <th key={h} className={`px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium ${i === 0 || i === 4 ? "text-left" : "text-right"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONVERSION_DATA.map((row) => (
                    <tr key={row.service} className="border-b border-white/[0.04] text-white/65 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">{row.service}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.closeRate}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.leadsRequired}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.cycleDays}</td>
                      <td className="px-4 py-3 text-white/45 max-w-[200px]">{row.complexity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>

          {/* ═══ DuPont — With inline mini bars ═══ */}
          <Collapsible title="Capital Efficiency Decomposition (DuPont Analysis)">
            <div className="space-y-3 mb-4">
              {DUPONT_TABLE.map((row) => {
                const color = SERVICE_COLORS[row.service] ?? "#c9a55c";
                const intensityNum = parseFloat(row.revenueIntensity);
                const maxIntensity = 5.89;
                return (
                  <div key={row.service} className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-[12px] text-white/80">{row.service}</span>
                      </div>
                      <span className="text-[13px] font-bold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{row.returnOnCac}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">Margin Depth</p>
                        <p className="text-[12px] text-white/70 tabular-nums">{row.marginDepth}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">Revenue Intensity</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(intensityNum / maxIntensity) * 100}%`, backgroundColor: color }} />
                          </div>
                          <span className="text-[12px] text-white/70 tabular-nums">{row.revenueIntensity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[12px] text-white/55 leading-relaxed">Full Structure wins on revenue intensity (5.89x), not margin depth. Banking wins on margin (65%). Company Formation&apos;s breakeven position is a revenue intensity constraint.</p>
          </Collapsible>

          {/* ═══ Methodology ═══ */}
          <Collapsible title="Methodology & Assumptions">
            <p className="text-[13px] text-white/55 leading-[1.75]">
              ABC allocates the total acquisition cost pool to each service using conversion rates (leads per closed client) and sales cycle length (effort-days). This was chosen over equal-weight and revenue-weight to reflect true resource consumption. Conversion and sales cycle assumptions are benchmarked from internal pipeline data. Founder salary is excluded from the cost pool; only direct acquisition and support costs are included.
            </p>
          </Collapsible>
        </main>
      </div>
    </ProtectedRoute>
  );
}
