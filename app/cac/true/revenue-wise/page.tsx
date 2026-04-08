"use client";

import { useState, useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_REVENUE_USD = 110900;
const BLENDED_GM_PCT = 52.3;
const TOTAL_GROSS_PROFIT_USD = 58025;
const TOTAL_CAC_USD = 31200;
const NET_PROFIT_AFTER_CAC_USD = 26825;
const PORTFOLIO_GP_CAC = 1.9;
const CAC_PCT_OF_REVENUE = 28.1;
const NET_MARGIN_AFTER_CAC_PCT = 24.2;
const SUPPLIER_COSTS_USD = 52875;

const REVENUE_SHARE_TOP_1_PCT = 53.6;
const REVENUE_TOP_1_SERVICE = "Full Structure";
const PROFIT_SHARE_TOP_1_PCT = 73.1;
const PROFIT_TOP_1_SERVICE = "Full Structure";

const SCENARIOS = [
  { label: "Base case", revenue: 110900, profit: 26825, change: "—" },
  { label: "-1 Full Structure", revenue: 81200, profit: 17016, change: "-36.6%" },
  { label: "-2 Full Structures", revenue: 51500, profit: 7207, change: "-73.1%" },
  { label: "+1 Full Structure", revenue: 140600, profit: 36634, change: "+36.6%" },
];

const NET_PROFIT_BY_SERVICE = [
  { service: "Full Structure", profit: 19618, color: "#c9a55c" },
  { service: "Standalone Trust", profit: 4126, color: "#7c9eb5" },
  { service: "Banking", profit: 1842, color: "#9b8bb4" },
  { service: "Corporate Services", profit: 1364, color: "#a8a8a8" },
  { service: "Company Formation", profit: 5, color: "#6b8f71" },
  { service: "Office Registration", profit: -130, color: "#8b7355" },
];

const QUADRANTS = {
  stars: { title: "Stars", subtitle: "Low CAC burden, high return. Scale aggressively.", accent: "#c9a55c", services: [{ name: "Full Structure", cacRevPct: 17.0, returnOnCac: "2.95x" }, { name: "Standalone Trust", cacRevPct: 23.3, returnOnCac: "2.36x" }] },
  cashCows: { title: "Cash Cows", subtitle: "Moderate burden, solid return. Maintain.", accent: "#7c9eb5", services: [{ name: "Banking", cacRevPct: 36.7, returnOnCac: "1.77x" }] },
  questionMarks: { title: "Question Marks", subtitle: "Higher burden, moderate return. Monitor.", accent: "#8b7355", services: [{ name: "Office Registration", cacRevPct: 54.3, returnOnCac: "0.92x" }, { name: "Corporate Services", cacRevPct: 50.3, returnOnCac: "1.19x" }] },
  entryProducts: { title: "Entry Products", subtitle: "Pipeline feeder. Value is in conversion to higher-ticket services.", accent: "#a8a8a8", services: [{ name: "Company Formation", cacRevPct: 46.9, returnOnCac: "1.00x" }] },
};

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

const totalNetProfit = NET_PROFIT_BY_SERVICE.reduce((s, x) => s + x.profit, 0);
const maxProfit = Math.max(...NET_PROFIT_BY_SERVICE.map((d) => Math.abs(d.profit)));

export default function RevenueWiseCacPage() {
  const [activeScenario, setActiveScenario] = useState(0);

  const donutSegments = useMemo(() => {
    let acc = 0;
    return NET_PROFIT_BY_SERVICE.filter((d) => d.profit > 0).map((d) => {
      const pct = (d.profit / totalNetProfit) * 100;
      const start = acc;
      acc += pct;
      return { ...d, pct, start, end: acc };
    });
  }, []);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
            <Link href="/cac/true" className="text-[13px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-wide">← Back to True CAC</Link>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Boyar Partners · True CAC</p>
              <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>Revenue-wise CAC — Portfolio Economics</h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 space-y-10">

          {/* ═══ Bento Stats ═══ */}
          <motion.section className="grid grid-cols-2 lg:grid-cols-6 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {/* Large GP:CAC card */}
            <motion.div className="col-span-2 lg:row-span-2 rounded-2xl border border-[#c9a55c]/20 bg-gradient-to-br from-[#c9a55c]/[0.06] to-transparent p-6 flex flex-col justify-between" {...stagger(0)}>
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a55c]/70 font-medium">Portfolio GP:CAC</p>
              <div className="my-4">
                <motion.p className="text-6xl font-bold bg-gradient-to-b from-[#c9a55c] to-[#c9a55c]/60 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-benzin)" }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  {PORTFOLIO_GP_CAC}×
                </motion.p>
              </div>
              <p className="text-[11px] text-white/45">$1 acquisition → $1.90 gross profit</p>
            </motion.div>

            {/* Net Profit */}
            <motion.div className="col-span-2 rounded-xl border border-[#c9a55c]/15 bg-[#c9a55c]/[0.03] p-5" {...stagger(1)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a55c]/60 font-medium">Net Profit after CAC</p>
              <p className="mt-2 text-2xl font-bold text-[#c9a55c] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(NET_PROFIT_AFTER_CAC_USD)}</p>
              <p className="text-[10px] text-white/35 mt-1">Net margin: {NET_MARGIN_AFTER_CAC_PCT}%</p>
            </motion.div>

            {/* Revenue */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(2)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Revenue</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TOTAL_REVENUE_USD)}</p>
            </motion.div>

            {/* Gross Profit */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(3)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Gross Profit</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TOTAL_GROSS_PROFIT_USD)}</p>
            </motion.div>

            {/* Blended GM */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(4)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Blended GM</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{BLENDED_GM_PCT}%</p>
            </motion.div>

            {/* Total CAC */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(5)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Total CAC</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TOTAL_CAC_USD)}</p>
            </motion.div>

            {/* CAC % of Revenue */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(6)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">CAC % of Rev</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{CAC_PCT_OF_REVENUE}%</p>
            </motion.div>

            {/* Net Margin */}
            <motion.div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5" {...stagger(7)}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Net Margin</p>
              <p className="mt-2 text-lg font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{NET_MARGIN_AFTER_CAC_PCT}%</p>
            </motion.div>
          </motion.section>

          {/* ═══ Waterfall + Donut side by side ═══ */}
          <motion.section className="grid lg:grid-cols-[3fr,2fr] gap-4" {...fadeUp}>
            {/* Waterfall */}
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6">
              <div className="flex items-end gap-4 mb-5">
                <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
                <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Profit Contribution Waterfall</h2>
              </div>
              <svg viewBox="0 0 500 280" preserveAspectRatio="xMidYMid meet" className="w-full h-64">
                <defs>
                  <linearGradient id="revBar" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#a8a8a8" /><stop offset="100%" stopColor="#6b6b6b" /></linearGradient>
                  <linearGradient id="supplierBar" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8b7355" /><stop offset="100%" stopColor="#5a4a36" /></linearGradient>
                  <linearGradient id="gpBarW" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6b8f71" /><stop offset="100%" stopColor="#3d5a42" /></linearGradient>
                  <linearGradient id="cacBarW" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c9a55c" /><stop offset="100%" stopColor="#8b6914" /></linearGradient>
                </defs>
                <line x1={60} y1={240} x2={460} y2={240} stroke="rgba(148,163,184,0.2)" strokeWidth={1} />
                <line x1={60} y1={40} x2={60} y2={240} stroke="rgba(148,163,184,0.2)" strokeWidth={1} />
                {[0.25, 0.5, 0.75, 1].map((t, idx) => (<line key={idx} x1={60} x2={460} y1={240 - t * 160} y2={240 - t * 160} stroke="rgba(148,163,184,0.08)" strokeWidth={0.5} strokeDasharray="4 4" />))}
                {(() => {
                  const scale = 160 / TOTAL_REVENUE_USD;
                  const baseX = 90; const width = 50; const gap = 55;
                  const revHeight = TOTAL_REVENUE_USD * scale; const revY = 240 - revHeight;
                  const supplierHeight = SUPPLIER_COSTS_USD * scale;
                  const gpHeight = TOTAL_GROSS_PROFIT_USD * scale;
                  const cacHeight = TOTAL_CAC_USD * scale;
                  const netHeight = NET_PROFIT_AFTER_CAC_USD * scale;
                  return (<>
                    <g><rect x={baseX} y={revY} width={width} height={revHeight} fill="url(#revBar)" rx={3} /><text x={baseX + width / 2} y={revY - 6} fontSize={9} fill="white" textAnchor="middle">{usdFormatter(TOTAL_REVENUE_USD)}</text><text x={baseX + width / 2} y={255} fontSize={8} fill="rgba(255,255,255,0.55)" textAnchor="middle">Revenue</text></g>
                    <g><rect x={baseX + gap} y={revY + (revHeight - supplierHeight)} width={width} height={supplierHeight} fill="url(#supplierBar)" rx={3} /><line x1={baseX + width} y1={revY} x2={baseX + gap} y2={revY} stroke="rgba(148,163,184,0.25)" strokeWidth={1} /><text x={baseX + gap + width / 2} y={revY + (revHeight - supplierHeight) - 6} fontSize={9} fill="white" textAnchor="middle">-{usdFormatter(SUPPLIER_COSTS_USD)}</text><text x={baseX + gap + width / 2} y={255} fontSize={8} fill="rgba(139,115,85,0.9)" textAnchor="middle">Supplier</text></g>
                    <g><rect x={baseX + gap * 2} y={240 - gpHeight} width={width} height={gpHeight} fill="url(#gpBarW)" rx={3} /><line x1={baseX + gap + width} y1={revY} x2={baseX + gap * 2} y2={240 - gpHeight} stroke="rgba(148,163,184,0.25)" strokeWidth={1} /><text x={baseX + gap * 2 + width / 2} y={240 - gpHeight - 6} fontSize={9} fill="white" textAnchor="middle">{usdFormatter(TOTAL_GROSS_PROFIT_USD)}</text><text x={baseX + gap * 2 + width / 2} y={255} fontSize={8} fill="rgba(107,143,113,0.9)" textAnchor="middle">Gross Profit</text></g>
                    <g><rect x={baseX + gap * 3} y={240 - gpHeight + (gpHeight - cacHeight)} width={width} height={cacHeight} fill="url(#cacBarW)" rx={3} /><line x1={baseX + gap * 2 + width} y1={240 - gpHeight} x2={baseX + gap * 3} y2={240 - gpHeight} stroke="rgba(148,163,184,0.25)" strokeWidth={1} /><text x={baseX + gap * 3 + width / 2} y={240 - gpHeight + (gpHeight - cacHeight) - 6} fontSize={9} fill="white" textAnchor="middle">-{usdFormatter(TOTAL_CAC_USD)}</text><text x={baseX + gap * 3 + width / 2} y={255} fontSize={8} fill="rgba(201,165,92,0.9)" textAnchor="middle">CAC</text></g>
                    <g><rect x={baseX + gap * 4} y={240 - netHeight} width={width} height={netHeight} fill="url(#revBar)" rx={3} /><line x1={baseX + gap * 3 + width} y1={240 - gpHeight} x2={baseX + gap * 4} y2={240 - netHeight} stroke="rgba(148,163,184,0.25)" strokeWidth={1} /><text x={baseX + gap * 4 + width / 2} y={240 - netHeight - 6} fontSize={9} fill="white" textAnchor="middle">{usdFormatter(NET_PROFIT_AFTER_CAC_USD)}</text><text x={baseX + gap * 4 + width / 2} y={255} fontSize={8} fill="rgba(255,255,255,0.55)" textAnchor="middle">Net Profit</text></g>
                  </>);
                })()}
              </svg>
            </div>

            {/* Profit Donut + Legend */}
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 flex flex-col">
              <div className="flex items-end gap-4 mb-5">
                <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
                <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Profit by Service</h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutSegments.map((d) => `${d.color} ${d.start}% ${d.end}%`).join(", ")})` }} />
                  <div className="absolute inset-[22%] rounded-full bg-black flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/40">Net</p>
                      <p className="text-sm font-semibold text-white tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(NET_PROFIT_AFTER_CAC_USD)}</p>
                    </div>
                  </div>
                </div>

                {/* Service rows with inline bars */}
                <div className="w-full space-y-2">
                  {NET_PROFIT_BY_SERVICE.map((d) => (
                    <div key={d.service} className="flex items-center gap-3 text-[11px]">
                      <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="flex-1 text-white/60">{d.service}</span>
                      <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.max(0, (d.profit / maxProfit) * 100)}%`, backgroundColor: d.color }} />
                      </div>
                      <span className={`tabular-nums w-16 text-right ${d.profit >= 0 ? "text-white/60" : "text-red-400/80"}`}>{usdFormatter(d.profit)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ═══ Concentration & Scenarios ═══ */}
          <motion.section className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden" {...fadeUp}>
            <div className="px-6 pt-6 flex items-end gap-4 mb-6">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Concentration & Risk Analysis</h2>
            </div>

            {/* Concentration stats row */}
            <div className="px-6 grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c9a55c] to-transparent" />
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Revenue share — top 1 service</p>
                <div className="flex items-end gap-3 mt-3">
                  <p className="text-3xl font-bold text-[#c9a55c] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{REVENUE_SHARE_TOP_1_PCT}%</p>
                  <p className="text-[12px] text-white/50 pb-1">{REVENUE_TOP_1_SERVICE}</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c9a55c] to-transparent" />
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Profit share — top 1 service</p>
                <div className="flex items-end gap-3 mt-3">
                  <p className="text-3xl font-bold text-[#c9a55c] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{PROFIT_SHARE_TOP_1_PCT}%</p>
                  <p className="text-[12px] text-white/50 pb-1">{PROFIT_TOP_1_SERVICE}</p>
                </div>
              </div>
            </div>

            {/* Scenario selector — interactive cards */}
            <div className="px-6 pb-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-medium mb-4">Scenario sensitivity</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SCENARIOS.map((row, i) => {
                  const isActive = activeScenario === i;
                  const isBase = row.label === "Base case";
                  const isNegative = row.change.startsWith("-");
                  const isPositive = row.change.startsWith("+");
                  return (
                    <motion.button
                      key={row.label}
                      onClick={() => setActiveScenario(i)}
                      className={`relative rounded-xl border p-4 text-left transition-all duration-300 overflow-hidden ${isActive ? "border-[#c9a55c]/30 bg-[#c9a55c]/[0.06]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && <div className="absolute inset-0 bg-gradient-to-br from-[#c9a55c]/[0.08] to-transparent pointer-events-none" />}
                      <p className="text-[11px] text-white/60 mb-2 relative z-10">{row.label}</p>
                      <p className="text-lg font-semibold text-white tabular-nums relative z-10" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(row.revenue)}</p>
                      <div className="flex items-center justify-between mt-2 relative z-10">
                        <span className="text-[11px] text-white/50 tabular-nums">Profit: {usdFormatter(row.profit)}</span>
                        <span className={`text-[12px] font-medium tabular-nums ${isBase ? "text-white/40" : isNegative ? "text-red-400" : isPositive ? "text-emerald-400" : "text-white/50"}`}>{row.change}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* ═══ BCG Efficiency Frontier ═══ */}
          <motion.section className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6" {...fadeUp}>
            <div className="flex items-end gap-4 mb-6">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Efficiency Frontier</h2>
            </div>

            {/* Axis labels */}
            <div className="relative">
              <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] text-white/25 mb-2">
                <span>← Higher CAC Burden</span>
                <span>Higher Return →</span>
              </div>

              {/* 2x2 matrix */}
              <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06] rounded-xl overflow-hidden">
                {[
                  { q: QUADRANTS.questionMarks, pos: "top-left" },
                  { q: QUADRANTS.stars, pos: "top-right" },
                  { q: QUADRANTS.entryProducts, pos: "bottom-left" },
                  { q: QUADRANTS.cashCows, pos: "bottom-right" },
                ].map(({ q, pos }) => (
                  <div key={q.title} className="bg-black/80 p-5 min-h-[140px] relative group hover:bg-white/[0.02] transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-8 h-[2px] rounded-full" style={{ backgroundColor: q.accent }} />
                    <p className="text-[10px] uppercase tracking-[0.4em] font-medium mb-2" style={{ color: q.accent }}>{q.title}</p>
                    <p className="text-[12px] text-white/55 leading-relaxed mb-3">{q.subtitle}</p>
                    <div className="space-y-1.5">
                      {q.services.map((s) => (
                        <div key={s.name} className="flex items-center justify-between text-[11px]">
                          <span className="text-white/70">{s.name}</span>
                          <div className="flex items-center gap-3 text-white/50 tabular-nums">
                            <span>CAC:Rev {s.cacRevPct}%</span>
                            <span className="text-white/80 font-medium">{s.returnOnCac}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] text-white/25 mt-2">
                <span>← Lower CAC Burden</span>
                <span>Lower Return →</span>
              </div>
            </div>
          </motion.section>

          {/* ═══ Net Profit Bar Chart ═══ */}
          <motion.section className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6" {...fadeUp}>
            <div className="flex items-end gap-4 mb-5">
              <div className="h-5 w-[2px] rounded-full bg-[#c9a55c]/60" />
              <h2 className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-benzin)" }}>Net Profit after CAC — By Service</h2>
            </div>
            <div className="space-y-3">
              {NET_PROFIT_BY_SERVICE.map((d, i) => {
                const widthPct = Math.max(0, (d.profit / maxProfit) * 100);
                return (
                  <motion.div
                    key={d.service}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className="w-36 sm:w-44 flex-shrink-0 text-right">
                      <span className="text-[12px] text-white/60">{d.service}</span>
                    </div>
                    <div className="flex-1 relative h-7 rounded-lg bg-white/[0.04] overflow-hidden">
                      {d.profit > 0 ? (
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-lg"
                          style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}66)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.1 + i * 0.06 }}
                        />
                      ) : (
                        <div className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-red-500/60" />
                      )}
                    </div>
                    <div className="w-20 flex-shrink-0 text-right">
                      <span className={`text-[12px] font-medium tabular-nums ${d.profit >= 0 ? "text-white/70" : "text-red-400"}`}>{usdFormatter(d.profit)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ═══ Collapsibles ═══ */}
          <Collapsible title="Institutional Conclusion">
            <ul className="space-y-3 text-[13px] text-white/65 list-disc list-inside">
              <li>Acquisition profitability achieved from Day 1 — all services positive.</li>
              <li>Cost structure is transparent and traceable.</li>
              <li>Capital efficiency is concentrated in Full Structure and Trust.</li>
              <li>Model is not CAC-constrained — binding constraints are volume and mix.</li>
              <li>Structural improvement embedded — renewals in Year 2 carry zero incremental CAC.</li>
            </ul>
          </Collapsible>

          <Collapsible title="Methodology Appendix">
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><span className="text-white/75 font-medium">Activity-Based Costing</span> — Allocates acquisition cost pool to services by conversion and effort.</li>
              <li><span className="text-white/75 font-medium">DuPont Decomposition</span> — Breaks return on CAC into margin depth and revenue intensity.</li>
              <li><span className="text-white/75 font-medium">Contribution Margin Waterfall</span> — Revenue to supplier costs to gross profit to CAC to net profit.</li>
              <li><span className="text-white/75 font-medium">HHI Concentration Analysis</span> — Measures revenue and profit concentration by service.</li>
              <li><span className="text-white/75 font-medium">BCG Efficiency Frontier</span> — Quadrant view of CAC burden vs return for portfolio strategy.</li>
            </ul>
          </Collapsible>
        </main>
      </div>
    </ProtectedRoute>
  );
}
