"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Monthly burn data (January-December 2026)
const MONTHLY_BURN = [
  { month: "M1", label: "Jan 2026", burn: 1053000, cumulative: 1053000 }, // Includes one-time setup
  { month: "M2", label: "Feb 2026", burn: 236600, cumulative: 1289600 },
  { month: "M3", label: "Mar 2026", burn: 226600, cumulative: 1516200 },
  { month: "M4", label: "Apr 2026", burn: 216600, cumulative: 1732800 },
  { month: "M5", label: "May 2026", burn: 221600, cumulative: 1954400 },
  { month: "M6", label: "Jun 2026", burn: 211600, cumulative: 2166000 },
  { month: "M7", label: "Jul 2026", burn: 206600, cumulative: 2372600 },
  { month: "M8", label: "Aug 2026", burn: 236600, cumulative: 2609200 },
  { month: "M9", label: "Sep 2026", burn: 246600, cumulative: 2855800 },
  { month: "M10", label: "Oct 2026", burn: 256600, cumulative: 3112400 },
  { month: "M11", label: "Nov 2026", burn: 236600, cumulative: 3349000 },
  { month: "M12", label: "Dec 2026", burn: 226600, cumulative: 3575600 },
];

const TOTAL_CAPITAL = 7700000;
const CAPEX = 846000;
const TOTAL_UTILIZED = 3575600; // Cumulative from M1-M12
const REMAINING_CAPITAL = 4124400; // 7700000 - 3575600

// Average monthly burn (excluding M1 one-time setup costs)
// M2-M12 operating months only
const AVG_MONTHLY_BURN = MONTHLY_BURN.slice(1).reduce((sum, m) => sum + m.burn, 0) / 11;

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BurnRateSummaryPage() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lineHoverIndex, setLineHoverIndex] = useState<number | null>(null);
  const barChartRef = useRef<SVGSVGElement>(null);
  const isBarChartInView = useInView(barChartRef, { once: false, margin: "0px" });

  const maxBurn = Math.max(...MONTHLY_BURN.map((m) => m.burn));
  const maxCumulative = Math.max(...MONTHLY_BURN.map((m) => m.cumulative));
  
  // Calculate remaining funds for line graph (from year 1 summary)
  const remainingFunds = MONTHLY_BURN.map((month) => TOTAL_CAPITAL - month.cumulative);
  const maxRemaining = Math.max(...remainingFunds);

  // Calculate runway (months remaining at current burn rate)
  const runwayMonths = Math.floor(REMAINING_CAPITAL / AVG_MONTHLY_BURN);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <CircularBackground />
        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push("/expenditure")}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Expenditure
                </button>
                <h1
                  className="text-xl sm:text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Burn Rate & Runway Overview
                </h1>
                <div className="w-24" />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            {/* Executive Overview */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Boyar Partners
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-white mb-4"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Executive Overview
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p>
                  Boyar Partners has been intentionally structured as a capital-light,
                  high-operating-leverage boutique advisory firm. The firm's cost architecture
                  prioritises credibility, flexibility, and scalability while preserving downside
                  protection and long runway visibility.
                </p>
                <p>
                  Capital deployment to date reflects a disciplined approach: limited,
                  credibility-critical capital expenditure combined with a predominantly
                  operating-expenditure-driven model that can be optimised and scaled in line
                  with demand.
                </p>
                <p>
                  As of December 2026, the firm has completed its full setup and first operating
                  year while preserving a majority of its capital base.
                </p>
              </div>
            </motion.section>

            {/* Key Metrics Grid */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Total Capital
                </p>
                <p
                  className="text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  {formatInr(TOTAL_CAPITAL)}
                </p>
                <p className="text-xs text-white/60">≈ {formatUsd(84615)}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Capital Utilized
                </p>
                <p
                  className="text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  {formatInr(TOTAL_UTILIZED)}
                </p>
                <p className="text-xs text-white/60">≈ {formatUsd(39624)}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Remaining Capital
                </p>
                <p
                  className="text-2xl font-semibold text-green-400 mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  {formatInr(REMAINING_CAPITAL)}
                </p>
                <p className="text-xs text-white/60">≈ {formatUsd(45323)}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Runway (Est.)
                </p>
                <p
                  className="text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  {runwayMonths}+ months
                </p>
                <p className="text-xs text-white/60">
                  @ {formatInr(Math.round(AVG_MONTHLY_BURN))}/month
                </p>
              </motion.div>
            </section>

            {/* Capital Structure */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Capital Structure Philosophy
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Capital Expenditure (CAPEX)</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    CAPEX has been deliberately kept minimal and non-recurring, restricted to areas
                    where outsourcing, rental, or deferral would materially weaken credibility or
                    execution readiness.
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                      Total CAPEX
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {formatInr(CAPEX)} (≈ {formatUsd(9297)})
                    </p>
                  </div>
                  <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
                    <li>Regulatory and licensing setup</li>
                    <li>Company incorporation</li>
                    <li>Core professional equipment</li>
                    <li>Website as a long-term digital asset</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Operating Expenditure (OPEX)</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    The firm's operating model is intentionally OPEX-driven, allowing for flexibility,
                    reversibility, and optimisation.
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                      Avg Monthly OPEX
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {formatInr(Math.round(AVG_MONTHLY_BURN))} (≈ {formatUsd(Math.round(AVG_MONTHLY_BURN / 91))})
                    </p>
                  </div>
                  <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
                    <li>Software and technology stack</li>
                    <li>Office infrastructure</li>
                    <li>Device rentals</li>
                    <li>Content production</li>
                    <li>Outsourced operational support</li>
                    <li>Paid marketing and acquisition</li>
                    <li>Contingency reserve</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Burn Rate Charts */}
            <section>
              {/* Monthly Burn Rate Bar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl w-full max-w-4xl mx-auto"
              >
                <h2
                  className="text-lg sm:text-xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Monthly Burn Rate — Jan to Dec 2026
                </h2>
                <p className="text-xs text-white/60 mb-6">
                  Operating expenditure by month, showing seasonal variation and cost discipline.
                </p>
                <div className="relative h-80 w-full">
                  <svg ref={barChartRef} viewBox="0 0 400 280" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                    {/* Axes */}
                    <line
                      x1={40}
                      y1={240}
                      x2={380}
                      y2={240}
                      stroke="rgba(148,163,184,0.5)"
                      strokeWidth={0.5}
                    />
                    <line
                      x1={40}
                      y1={20}
                      x2={40}
                      y2={240}
                      stroke="rgba(148,163,184,0.5)"
                      strokeWidth={0.5}
                    />
                    {/* Grid lines */}
                    {[0.25, 0.5, 0.75].map((ratio) => (
                      <line
                        key={ratio}
                        x1={50}
                        x2={380}
                        y1={240 - ratio * 200}
                        y2={240 - ratio * 200}
                        stroke="rgba(148,163,184,0.2)"
                        strokeWidth={0.5}
                        strokeDasharray="4 4"
                      />
                    ))}
                    {/* Y-axis label - positioned with more spacing */}
                    <text
                      x={5}
                      y={130}
                      textAnchor="middle"
                      fontSize={9}
                      fill="rgba(148,163,184,0.9)"
                      transform="rotate(-90 5 130)"
                      fontWeight="500"
                    >
                      Monthly Burn Rate (INR)
                    </text>
                    {(() => {
                      const yAxisMax = 1100000; // 11 lakh
                      const yAxisMin = 0;
                      const yAxisRange = yAxisMax - yAxisMin;
                      const yAxisLabels = [];
                      // Generate labels: 50K, 1L, 1.5L, 2L, 2.5L, 3L, 3.5L, 4L, 4.5L, 5L, 5.5L, 6L, 6.5L, 7L, 7.5L, 8L, 8.5L, 9L, 9.5L, 10L, 10.5L, 11L
                      for (let val = 50000; val <= 1100000; val += 50000) {
                        const ratio = (val - yAxisMin) / yAxisRange;
                        const yPos = 240 - (ratio * 200);
                        const label = val >= 100000 ? `${val / 100000}L` : `${val / 1000}K`;
                        yAxisLabels.push({ val, yPos, label });
                      }
                      // Show all labels as requested
                      return yAxisLabels.map((item, idx) => (
                        <g key={`y-axis-${idx}`}>
                          <line
                            x1={50}
                            x2={380}
                            y1={item.yPos}
                            y2={item.yPos}
                            stroke="rgba(148,163,184,0.2)"
                            strokeWidth={0.5}
                            strokeDasharray="4 4"
                          />
                          <text
                            x={38}
                            y={item.yPos + 4}
                            textAnchor="end"
                            fontSize={8}
                            fill="rgba(148,163,184,0.9)"
                            fontWeight="500"
                          >
                            {item.label}
                          </text>
                        </g>
                      ));
                    })()}
                    {/* Bars - 12 bars evenly spaced with 12 different shades */}
                    {MONTHLY_BURN.map((month, idx) => {
                      const barWidth = 22;
                      const chartWidth = 330; // 380 - 50 (more space for Y-axis)
                      const barSpacing = chartWidth / 12; // ~27.5 pixels per bar
                      const startX = 50;
                      const centerX = startX + (idx * barSpacing) + (barSpacing / 2);
                      const x = centerX - (barWidth / 2);
                      
                      // Y-axis max is 11L (1,100,000)
                      const yAxisMax = 1100000;
                      const fullHeight = (month.burn / yAxisMax) * 200;
                      const yPos = 240 - fullHeight;
                      
                      // Generate 12 different shades of blue (brighter and more vibrant)
                      // From light blue to deep blue
                      const shades = [
                        "#60A5FA", // Light blue
                        "#3B82F6", // Blue
                        "#2563EB", // Medium blue
                        "#1D4ED8", // Darker blue
                        "#1E40AF", // Deep blue
                        "#1E3A8A", // Very deep blue
                        "#1D4ED8", // Repeat pattern
                        "#2563EB",
                        "#3B82F6",
                        "#60A5FA",
                        "#93C5FD", // Lighter blue
                        "#DBEAFE", // Very light blue
                      ];
                      
                      const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      
                      return (
                        <g key={`bar-${idx}`}>
                          <rect
                            x={x}
                            y={yPos}
                            width={barWidth}
                            height={fullHeight}
                            fill={shades[idx]}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: "pointer" }}
                          />
                          <text
                            x={centerX}
                            y={258}
                            textAnchor="middle"
                            fontSize={8}
                            fill="rgba(148,163,184,0.9)"
                            fontWeight="500"
                          >
                            {monthLabels[idx]}
                          </text>
                        </g>
                      );
                    })}
                    {/* Hover tooltip */}
                    {hoveredIndex !== null && (
                      <g>
                        {(() => {
                          const chartWidth = 330;
                          const barSpacing = chartWidth / 12;
                          const tooltipX = 50 + (hoveredIndex * barSpacing) + (barSpacing / 2);
                          return (
                            <>
                              <rect
                                x={tooltipX - 60}
                                y={20}
                                width={120}
                                height={50}
                                fill="rgba(0,0,0,0.9)"
                                rx={4}
                                stroke="rgba(255,255,255,0.2)"
                              />
                              <text
                                x={tooltipX}
                                y={35}
                                textAnchor="middle"
                                fontSize={10}
                                fill="white"
                                fontWeight="bold"
                              >
                                {MONTHLY_BURN[hoveredIndex].label}
                              </text>
                              <text
                                x={tooltipX}
                                y={50}
                                textAnchor="middle"
                                fontSize={9}
                                fill="rgba(255,255,255,0.8)"
                              >
                                {formatInr(MONTHLY_BURN[hoveredIndex].burn)}
                              </text>
                              <text
                                x={tooltipX}
                                y={63}
                                textAnchor="middle"
                                fontSize={9}
                                fill="rgba(255,255,255,0.6)"
                              >
                                {formatUsd(MONTHLY_BURN[hoveredIndex].burn / 91)}
                              </text>
                            </>
                          );
                        })()}
                      </g>
                    )}
                    {/* X-axis label */}
                    <text
                      x={210}
                      y={270}
                      textAnchor="middle"
                      fontSize={9}
                      fill="rgba(148,163,184,0.8)"
                    >
                      Month (Jan–Dec 2026)
                    </text>
                  </svg>
                </div>
              </motion.div>

            </section>

            {/* Line Graph: Monthly Spending & Capital Depletion (from Year 1 Summary) */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-3xl border border-white/10 bg-black/70 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-lg sm:text-xl font-semibold text-white mb-1"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Monthly Spending & Capital Depletion
              </h2>
              <p className="text-xs text-white/60 mb-6">
                Cumulative spending trend and remaining capital position across 12 months of operations.
              </p>
              <div className="w-full max-w-4xl mx-auto">
                <div className="relative h-80 w-full">
                  {/* Hover tooltip */}
                  {lineHoverIndex !== null && (
                    <div
                      className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2
                                 rounded-2xl border border-white/20 bg-black/95 px-4 py-3 shadow-2xl
                                 text-[11px] sm:text-xs text-white/80 max-w-[240px] z-10"
                    >
                      <p
                        className="mb-1 font-semibold"
                        style={{ fontFamily: "var(--font-benzin)" }}
                      >
                        {MONTHLY_BURN[lineHoverIndex].label}
                      </p>
                      <p className="mb-1">
                        Cumulative Spend: {formatInr(MONTHLY_BURN[lineHoverIndex].cumulative)}
                      </p>
                      <p className="mb-1">
                        Remaining: {formatInr(remainingFunds[lineHoverIndex])}
                      </p>
                      <p className="text-white/70">
                        Monthly: {formatInr(MONTHLY_BURN[lineHoverIndex].burn)}
                      </p>
                    </div>
                  )}

                  <svg viewBox="0 0 400 280" className="h-full w-full">
                    {/* Axes */}
                    <line
                      x1={50}
                      y1={240}
                      x2={380}
                      y2={240}
                      stroke="rgba(148,163,184,0.5)"
                      strokeWidth={1}
                    />
                    <line
                      x1={50}
                      y1={20}
                      x2={50}
                      y2={240}
                      stroke="rgba(148,163,184,0.5)"
                      strokeWidth={1}
                    />
                    <line
                      x1={380}
                      y1={20}
                      x2={380}
                      y2={240}
                      stroke="rgba(34,197,94,0.5)"
                      strokeWidth={1}
                    />
                    {/* Horizontal grid lines */}
                    {[0.25, 0.5, 0.75].map((ratio) => (
                      <line
                        key={ratio}
                        x1={50}
                        x2={380}
                        y1={240 - ratio * 200}
                        y2={240 - ratio * 200}
                        stroke="rgba(148,163,184,0.2)"
                        strokeWidth={0.5}
                        strokeDasharray="4 4"
                      />
                    ))}
                    {/* Y-axis label for Cumulative Spending (left) */}
                    <text
                      x={5}
                      y={130}
                      textAnchor="middle"
                      fontSize={9}
                      fill="rgba(148,163,184,0.9)"
                      transform="rotate(-90 5 130)"
                      fontWeight="500"
                    >
                      Cumulative Spending (INR)
                    </text>
                    {/* Y-axis labels for spending (left) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <text
                        key={`spend-${ratio}`}
                        x={38}
                        y={240 - ratio * 200 + 4}
                        textAnchor="end"
                        fontSize={8}
                        fill="rgba(148,163,184,0.9)"
                        fontWeight="500"
                      >
                        {idx === 0
                          ? "0"
                          : `${Math.round((maxCumulative * ratio) / 100000)}L`}
                      </text>
                    ))}
                    {/* Y-axis label for Remaining Capital (right) */}
                    <text
                      x={395}
                      y={130}
                      textAnchor="middle"
                      fontSize={9}
                      fill="rgba(34,197,94,0.9)"
                      transform="rotate(90 395 130)"
                      fontWeight="500"
                    >
                      Remaining Capital (INR)
                    </text>
                    {/* Y-axis labels for remaining (right) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <text
                        key={`remain-${ratio}`}
                        x={388}
                        y={240 - ratio * 200 + 4}
                        textAnchor="start"
                        fontSize={8}
                        fill="rgba(34,197,94,0.9)"
                        fontWeight="500"
                      >
                        {idx === 0
                          ? "0"
                          : `${Math.round((maxRemaining * ratio) / 100000)}L`}
                      </text>
                    ))}
                    {/* X-axis labels */}
                    {MONTHLY_BURN.map((month, idx) => {
                      const chartWidth = 380 - 50; // 330
                      const step = chartWidth / (MONTHLY_BURN.length - 1);
                      const x = 50 + (idx * step);
                      return (
                        <text
                          key={month.month}
                          x={x}
                          y={255}
                          textAnchor="middle"
                          fontSize={9}
                          fill="rgba(148,163,184,0.9)"
                          fontWeight="500"
                        >
                          {month.month}
                        </text>
                      );
                    })}
                    {/* Spending line + area */}
                    {(() => {
                      const chartWidth = 380 - 50; // 330
                      const step = chartWidth / (MONTHLY_BURN.length - 1 || 1);
                      const points = MONTHLY_BURN.map((month, idx) => {
                        const x = 50 + step * idx;
                        const y = 240 - (month.cumulative / maxCumulative) * 200;
                        return { x, y };
                      });
                      const pathD =
                        points
                          .map((p, idx) =>
                            idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                          )
                          .join(" ") || "";
                      const areaD =
                        pathD &&
                        `${pathD} L ${points[points.length - 1].x} 240 L 50 240 Z`;
                      return (
                        <>
                          {areaD && (
                            <motion.path
                              d={areaD}
                              fill="url(#yearSpendAreaGradient)"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 0.3 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                          <defs>
                            <linearGradient
                              id="yearSpendLineGradient"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="50%" stopColor="#F59E0B" />
                              <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                            <linearGradient
                              id="yearSpendAreaGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                              <stop offset="100%" stopColor="rgba(15,23,42,0.05)" />
                            </linearGradient>
                          </defs>
                          {pathD && (
                            <motion.path
                              d={pathD}
                              fill="none"
                              stroke="url(#yearSpendLineGradient)"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                          {/* Spending dots */}
                          {points.map((p, idx) => (
                            <motion.circle
                              key={`spend-dot-${idx}`}
                              cx={p.x}
                              cy={p.y}
                              r={4}
                              fill="url(#yearSpendLineGradient)"
                              stroke="#000"
                              strokeWidth={1.5}
                              initial={{ opacity: 0, scale: 0.4 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{
                                duration: 0.3,
                                delay: 2.5 + idx * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              onMouseEnter={() => setLineHoverIndex(idx)}
                              onMouseLeave={() => setLineHoverIndex(null)}
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </>
                      );
                    })()}
                    {/* Remaining funds line */}
                    {(() => {
                      const chartWidth = 380 - 50; // 330
                      const step = chartWidth / (remainingFunds.length - 1 || 1);
                      const points = remainingFunds.map((val, idx) => {
                        const x = 50 + step * idx;
                        const y = 240 - (val / maxRemaining) * 200;
                        return { x, y };
                      });
                      const pathD =
                        points
                          .map((p, idx) =>
                            idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                          )
                          .join(" ") || "";
                      return (
                        <>
                          {pathD && (
                            <motion.path
                              d={pathD}
                              fill="none"
                              stroke="#22C55E"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              strokeDasharray="6 4"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                          {/* Remaining dots */}
                          {points.map((p, idx) => (
                            <motion.circle
                              key={`remain-dot-${idx}`}
                              cx={p.x}
                              cy={p.y}
                              r={4}
                              fill="#22C55E"
                              stroke="#000"
                              strokeWidth={1.5}
                              initial={{ opacity: 0, scale: 0.4 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{
                                duration: 0.3,
                                delay: 2.8 + idx * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              onMouseEnter={() => setLineHoverIndex(idx)}
                              onMouseLeave={() => setLineHoverIndex(null)}
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </motion.section>


            {/* Additional Sections */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Burn Rate Profile
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Baseline Operating Burn</h3>
                  <ul className="text-sm text-white/80 space-y-2 list-disc list-inside ml-4">
                    <li>Core non-marketing operating expenses average approximately ₹1.06 lakh per month</li>
                    <li>These costs are predictable, controllable, and optimisable</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Marketing Burn</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Marketing spend is treated as performance-linked OPEX, not a fixed overhead. Spend is
                    diversified across the year and aligned with known demand cycles for HNIs and corporates.
                    Higher spend periods coincide with peak planning and execution windows, while lower-intensity
                    months focus on optimisation and pipeline nurturing.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Seasonal Spend Intelligence</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-3">
                    Advertising and growth expenditure is not evenly distributed across months. Instead, it is
                    intentionally weighted toward periods with higher decision velocity, including:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2 list-disc list-inside ml-4">
                    <li>Year-start planning cycles</li>
                    <li>Fiscal year-end activity</li>
                    <li>Pre-year-end structuring and wealth-planning periods</li>
                  </ul>
                  <p className="text-sm text-white/80 leading-relaxed mt-3">
                    This seasonally informed allocation improves return on ad spend, reduces CAC volatility, and
                    avoids capital waste during low-intent periods.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Runway & Capital Position
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Capital Snapshot</h3>
                  <div className="grid gap-4 sm:grid-cols-3 mb-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                        Total Capital
                      </p>
                      <p className="text-xl font-semibold text-white">{formatInr(TOTAL_CAPITAL)}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                        Utilized
                      </p>
                      <p className="text-xl font-semibold text-white">{formatInr(TOTAL_UTILIZED)}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                        Remaining
                      </p>
                      <p className="text-xl font-semibold text-green-400">{formatInr(REMAINING_CAPITAL)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Approximately 54% of total capital remains intact after completing full operational setup,
                    twelve months of operations, and seasonally optimised marketing, including peak Q4 execution.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Runway Implication</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    At the current burn profile, the firm retains well over 12 months of additional runway.
                    No immediate external capital dependency exists. Management retains the ability to scale
                    selectively or remain capital-conservative as conditions dictate. This provides strong
                    strategic optionality going into the next phase.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Closing Statement
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Boyar Partners has engineered a capital-efficient advisory platform with disciplined CAPEX,
                flexible OPEX, and strong operating leverage. The burn profile is intentional, seasonally
                optimised, and governance-driven. With more than half of its capital preserved after Year-1
                execution, the firm enters its next phase with strategic optionality, resilience, and a clear
                pathway to scalable profitability.
              </p>
            </motion.section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

