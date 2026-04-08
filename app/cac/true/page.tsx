"use client";

import { useEffect, useRef, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const TOTAL_CAC_POOL_USD = 31200;
const TRUE_AVG_CAC_USD = 1950;
const PORTFOLIO_GP_CAC = 1.9;
const NET_PROFIT_AFTER_CAC_USD = 27332;
const GROSS_PROFIT_USD = TOTAL_CAC_POOL_USD * PORTFOLIO_GP_CAC;

const usdFormatter = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

function NavButton({ label, route, index, hoveredButton, setHoveredButton, router }: {
  label: string; route: string; index: number;
  hoveredButton: string | null; setHoveredButton: (id: string | null) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        const r = width / 2 - 2;
        setRadius(r);
        setCircumference(2 * Math.PI * r);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isHovered = hoveredButton === label;

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "grayscale(0.6)" }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, filter: "grayscale(0)", transition: { duration: 0.3 } }}
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      onClick={() => router.push(route)}
      className="group relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-md"
      style={{
        boxShadow: isHovered ? "0 0 15px rgba(59,130,246,0.3), 0 0 30px rgba(59,130,246,0.15)" : "0 0 12px rgba(59,130,246,0.10), 0 0 30px rgba(59,130,246,0.05)",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {circumference > 0 && radius > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "rotate(-90deg)", zIndex: 5 }} viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`} preserveAspectRatio="xMidYMid meet">
          <motion.circle cx={(radius * 2 + 4) / 2} cy={(radius * 2 + 4) / 2} r={radius} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={isHovered ? 0 : circumference} initial={false} animate={{ strokeDashoffset: isHovered ? 0 : circumference }} transition={{ duration: 0.6, ease: "easeInOut" }} />
        </svg>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-3 leading-snug text-[10px] sm:text-xs md:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">{label}</span>
        <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
      </div>
    </motion.button>
  );
}

export default function TrueCacHubPage() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const cacPct = (TOTAL_CAC_POOL_USD / (TOTAL_CAC_POOL_USD + GROSS_PROFIT_USD)) * 100;
  const gpPct = 100 - cacPct;

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
            <Link href="/tools" className="text-[13px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-wide">← Back to Tools</Link>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Boyar Partners · CAC Module</p>
              <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-benzin)" }}>True CAC — Institutional Projection</h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 space-y-12">

          {/* ─── Hero: GP:CAC Centerpiece ─── */}
          <motion.section
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-[1fr,auto,1fr] items-stretch">
              {/* Left: description + two stats */}
              <div className="p-8 flex flex-col justify-between gap-8">
                <p className="text-[13px] leading-[1.8] text-white/65 max-w-md">
                  This module presents the fully-loaded customer acquisition cost
                  model using Activity-Based Costing methodology. All channel and
                  overhead costs are attributed to services by conversion rates and
                  sales cycle effort, producing a transparent, audit-ready True CAC by
                  service.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/50">Total CAC Pool</p>
                    <p className="mt-1.5 text-lg font-semibold tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TOTAL_CAC_POOL_USD)}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/50">True Avg CAC</p>
                    <p className="mt-1.5 text-lg font-semibold tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(TRUE_AVG_CAC_USD)}</p>
                  </div>
                </div>
              </div>

              {/* Center: large ratio ring */}
              <div className="flex items-center justify-center p-8 lg:px-12">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
                    <motion.circle
                      cx="100" cy="100" r="88" fill="none"
                      stroke="url(#gpGrad)" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 88}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - gpPct / 100) }}
                      transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <motion.circle
                      cx="100" cy="100" r="88" fill="none"
                      stroke="url(#cacGrad)" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * gpPct / 100}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    />
                    <defs>
                      <linearGradient id="gpGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6b8f71" /><stop offset="100%" stopColor="#3d5a42" /></linearGradient>
                      <linearGradient id="cacGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c9a55c" /><stop offset="100%" stopColor="#8b6914" /></linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-white/40">GP : CAC</p>
                    <motion.p
                      className="text-5xl sm:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
                      style={{ fontFamily: "var(--font-benzin)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {PORTFOLIO_GP_CAC.toFixed(1)}×
                    </motion.p>
                    <p className="text-[10px] text-white/40 mt-1">Gross Profit to CAC</p>
                  </div>
                </div>
              </div>

              {/* Right: net profit + visual breakdown */}
              <div className="p-8 flex flex-col justify-between gap-8">
                <div className="rounded-xl border border-[#c9a55c]/15 bg-[#c9a55c]/[0.04] p-5">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a55c]/70">Net Profit after CAC</p>
                  <p className="mt-2 text-2xl font-bold text-[#c9a55c] tabular-nums" style={{ fontFamily: "var(--font-benzin)" }}>{usdFormatter(NET_PROFIT_AFTER_CAC_USD)}</p>
                  <p className="mt-1 text-[11px] text-white/40">After fully-loaded acquisition costs</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#6b8f71] to-[#3d5a42]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/60">Gross Profit</span>
                        <span className="text-white/80 tabular-nums font-medium">{usdFormatter(GROSS_PROFIT_USD)}</span>
                      </div>
                      <div className="mt-1 h-1 rounded-sm bg-white/[0.06]">
                        <motion.div className="h-1 rounded-sm bg-gradient-to-r from-[#6b8f71] to-[#3d5a42]" initial={{ width: 0 }} animate={{ width: `${gpPct}%` }} transition={{ duration: 1, delay: 0.5 }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#c9a55c] to-[#8b6914]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/60">CAC Pool</span>
                        <span className="text-white/80 tabular-nums font-medium">{usdFormatter(TOTAL_CAC_POOL_USD)}</span>
                      </div>
                      <div className="mt-1 h-1 rounded-sm bg-white/[0.06]">
                        <motion.div className="h-1 rounded-sm bg-gradient-to-r from-[#c9a55c] to-[#8b6914]" initial={{ width: 0 }} animate={{ width: `${cacPct}%` }} transition={{ duration: 1, delay: 0.7 }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/40 pt-1">$1 spent on acquisition → $1.90 gross profit</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ─── Navigation ─── */}
          <motion.section
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/35">Explore detailed breakdowns</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14">
              <NavButton label="Group-wise CAC" route="/cac/true/group-wise" index={0} hoveredButton={hoveredButton} setHoveredButton={setHoveredButton} router={router} />
              <NavButton label="Revenue-wise CAC" route="/cac/true/revenue-wise" index={1} hoveredButton={hoveredButton} setHoveredButton={setHoveredButton} router={router} />
            </div>
          </motion.section>

          {/* ─── Methodology ─── */}
          <motion.div
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#c9a55c]/60 via-[#c9a55c]/20 to-transparent" />
            <div className="pl-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/60 font-medium mb-3">Methodology</p>
              <p className="text-[13px] text-white/60 leading-[1.8]">
                Activity-Based Costing allocates the total acquisition cost pool
                to each service using conversion rates (channel cost per closed
                client) and effort-weighted overhead (cost per sales cycle day).
                This yields a True CAC per service that can be compared directly to
                gross profit for unit economics and portfolio strategy.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
