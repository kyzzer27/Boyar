"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Segment {
  name: string;
  inr: number;
  usd: number;
  color: string;
  description: string;
}

const SEGMENTS: Segment[] = [
  {
    name: "One-Time Setup & Infrastructure",
    inr: 846000,
    usd: 9297,
    color: "#3B82F6",
    description:
      "Foundational, non-recurring investment to establish legitimacy and operational readiness. Includes licensing, company incorporation, website, and core devices.",
  },
  {
    name: "Core Operating Expenses",
    inr: 1279200,
    usd: 14056,
    color: "#10B981",
    description:
      "12 months cumulative of lean, outsourced operating model with controlled fixed costs. Includes software, office rent, laptop rentals, content production, and contingency reserve.",
  },
  {
    name: "Marketing & Growth",
    inr: 1480000,
    usd: 16264,
    color: "#F59E0B",
    description:
      "Seasonally diversified ad spend aligned with HNI and corporate planning cycles. Performance-driven and tracked separately through the CAC module.",
  },
];

// Monthly spending data
const MONTHLY_SPENDING = [
  1082600, // M1
  236600,  // M2
  226600,  // M3
  216600,  // M4
  221600,  // M5
  211600,  // M6
  206600,  // M7
  236600,  // M8
  246600,  // M9
  256600,  // M10
  236600,  // M11
  226600,  // M12
];

const MONTH_LABELS = [
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "M9",
  "M10",
  "M11",
  "M12",
];

const TOTAL_CAPITAL = 7700000;
const TOTAL_UTILIZED = 3605200;
const TOTAL_REMAINING = 4094800;

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
    maximumFractionDigits: 1,
  }).format(value);
}

function getPath(
  radius: number,
  startAngle: number,
  endAngle: number,
  largeArcFlag: number
) {
  const start = {
    x: radius * Math.cos(startAngle - Math.PI / 2),
    y: radius * Math.sin(startAngle - Math.PI / 2),
  };
  const end = {
    x: radius * Math.cos(endAngle - Math.PI / 2),
    y: radius * Math.sin(endAngle - Math.PI / 2),
  };
  return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

export default function Year1SummaryPage() {
  const router = useRouter();
  const [pieProgress, setPieProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lineHoverIndex, setLineHoverIndex] = useState<number | null>(null);

  // Calculate cumulative spending and remaining funds
  const cumulativeSpending = MONTHLY_SPENDING.reduce((acc, val, idx) => {
    acc.push(idx === 0 ? val : acc[idx - 1] + val);
    return acc;
  }, [] as number[]);

  const remainingFunds = cumulativeSpending.map((spent) => TOTAL_CAPITAL - spent);

  useEffect(() => {
    const timer = setTimeout(() => setPieProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate pie chart slices
  const totalInr = SEGMENTS.reduce((sum, s) => sum + s.inr, 0);
  const pieSlices = SEGMENTS.reduce((acc, segment, idx) => {
    const startAngle =
      idx === 0
        ? 0
        : acc[idx - 1].endAngle;
    const percentage = (segment.inr / totalInr) * 100;
    const angle = (percentage / 100) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    acc.push({
      name: segment.name,
      inr: segment.inr,
      usd: segment.usd,
      percentage,
      color: segment.color,
      startAngle,
      endAngle,
      largeArcFlag: angle > Math.PI ? 1 : 0,
    });
    return acc;
  }, [] as Array<{
    name: string;
    inr: number;
    usd: number;
    percentage: number;
    color: string;
    startAngle: number;
    endAngle: number;
    largeArcFlag: number;
  }>);

  const maxSpending = Math.max(...cumulativeSpending);
  const maxRemaining = Math.max(...remainingFunds);

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
                  onClick={() => router.push("/expenditure/monthly-cost?skipAnimation=1")}
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
                  Back to Monthly Cost
                </button>
                <h1
                  className="text-xl sm:text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Year 1 Summary — December 2026
                </h1>
                <div className="w-24" /> {/* Spacer for centering */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            {/* Overview Section */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Fund Utilisation Summary — Up to December 2026
              </h2>
              <p className="text-sm text-white/70 mb-6">
                This note provides a consolidated overview of how funds have been deployed up to December 2026, how much capital remains, and how spending is distributed across key operational segments.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Total Capital Available
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {formatInr(TOTAL_CAPITAL)}
                  </p>
                  <p className="text-xs text-white/60">≈ {formatUsd(84615)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Total Funds Utilised
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {formatInr(TOTAL_UTILIZED)}
                  </p>
                  <p className="text-xs text-white/60">≈ {formatUsd(39624)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Funds Remaining
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold text-green-400"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {formatInr(TOTAL_REMAINING)}
                  </p>
                  <p className="text-xs text-white/60">≈ {formatUsd(44991)}</p>
                  <p className="mt-1 text-xs text-white/50">
                    ~53% of capital remains
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Charts Row */}
            <section className="grid gap-8 lg:grid-cols-[1.2fr,1.1fr]">
              {/* Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
              >
                <h2
                  className="text-lg sm:text-xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Capital Allocation by Segment
                </h2>
                <p className="text-xs text-white/60 mb-6">
                  Distribution of total funds utilised across three core operational segments.
                </p>
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="relative mx-auto h-64 w-64 flex-shrink-0">
                    <div className="h-full w-full flex items-center justify-center">
                      <svg
                        width="256"
                        height="256"
                        viewBox="-110 -110 220 220"
                        className="h-full w-full"
                      >
                        <g>
                          {pieSlices.map((slice, index) => {
                            const animatedEnd =
                              slice.startAngle +
                              (slice.endAngle - slice.startAngle) * pieProgress;
                            const path = getPath(
                              100,
                              slice.startAngle,
                              animatedEnd,
                              slice.largeArcFlag
                            );
                            return (
                              <motion.path
                                key={slice.name}
                                d={path}
                                fill={slice.color}
                                stroke="#000"
                                strokeWidth={2}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{
                                  opacity: 1,
                                  scale: hoveredIndex === index ? 1.04 : 1,
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: 0.2 + index * 0.08,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                              />
                            );
                          })}
                        </g>
                      </svg>
                    </div>
                    <div className="pointer-events-none absolute inset-10 rounded-full bg-black/90 flex flex-col items-center justify-center text-center">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                        Year 1
                      </p>
                      <p
                        className="mt-1 text-sm font-semibold text-white"
                        style={{ fontFamily: "var(--font-benzin)" }}
                      >
                        Allocation
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-xs sm:text-sm">
                    {pieSlices.map((slice) => (
                      <div
                        key={slice.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: slice.color }}
                          />
                          <span className="text-white/80">{slice.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/70">
                            {slice.percentage.toFixed(1)}%
                          </p>
                          <p className="text-[11px] text-white/50">
                            {formatInr(slice.inr)} · {formatUsd(slice.usd)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {hoveredIndex !== null && (
                      <div className="mt-3 rounded-2xl border border-white/15 bg-black/60 p-3 text-[11px] sm:text-xs text-white/80">
                        <p className="mb-1 font-semibold" style={{ fontFamily: "var(--font-benzin)" }}>
                          {SEGMENTS[hoveredIndex].name}
                        </p>
                        <p>{SEGMENTS[hoveredIndex].description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
              >
                <h2
                  className="text-lg sm:text-xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  Segment-Wise Spend Comparison
                </h2>
                <p className="text-xs text-white/60 mb-6">
                  Relative scale of spending across the three core operational segments.
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  {SEGMENTS.map((segment) => {
                    const width = (segment.inr / totalInr) * 100;
                    return (
                      <div key={segment.name}>
                        <div className="mb-1 flex items-center justify-between text-white/70">
                          <span>{segment.name}</span>
                          <span className="text-[11px] text-white/50">
                            {formatInr(segment.inr)}
                          </span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${segment.color}, rgba(255,255,255,0.7))`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </section>

            {/* Line Chart: Monthly Spending & Remaining Funds */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
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
                        {MONTH_LABELS[lineHoverIndex]}
                      </p>
                      <p className="mb-1">
                        Cumulative Spend: {formatInr(cumulativeSpending[lineHoverIndex])}
                      </p>
                      <p className="mb-1">
                        Remaining: {formatInr(remainingFunds[lineHoverIndex])}
                      </p>
                      <p className="text-white/70">
                        Monthly: {formatInr(MONTHLY_SPENDING[lineHoverIndex])}
                      </p>
                    </div>
                  )}

                  <svg viewBox="0 0 400 280" className="h-full w-full">
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
                    {/* Horizontal grid lines */}
                    {[0.25, 0.5, 0.75].map((ratio) => (
                      <line
                        key={ratio}
                        x1={40}
                        x2={380}
                        y1={240 - ratio * 200}
                        y2={240 - ratio * 200}
                        stroke="rgba(148,163,184,0.2)"
                        strokeWidth={0.5}
                        strokeDasharray="4 4"
                      />
                    ))}
                    {/* Y-axis labels for spending (left) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <text
                        key={`spend-${ratio}`}
                        x={36}
                        y={240 - ratio * 200 + 4}
                        textAnchor="end"
                        fontSize={9}
                        fill="rgba(148,163,184,0.8)"
                      >
                        {idx === 0
                          ? "0"
                          : `${Math.round((maxSpending * ratio) / 100000)}L`}
                      </text>
                    ))}
                    {/* Y-axis labels for remaining (right) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <text
                        key={`remain-${ratio}`}
                        x={384}
                        y={240 - ratio * 200 + 4}
                        textAnchor="start"
                        fontSize={9}
                        fill="rgba(34,197,94,0.8)"
                      >
                        {idx === 0
                          ? "0"
                          : `${Math.round((maxRemaining * ratio) / 100000)}L`}
                      </text>
                    ))}
                    {/* X-axis labels */}
                    {MONTH_LABELS.map((label, idx) => {
                      const x = 40 + (idx * (380 - 40)) / (MONTH_LABELS.length - 1);
                      return (
                        <text
                          key={label}
                          x={x}
                          y={255}
                          textAnchor="middle"
                          fontSize={9}
                          fill="rgba(148,163,184,0.8)"
                        >
                          {label}
                        </text>
                      );
                    })}
                    {/* Spending line + area */}
                    {(() => {
                      const step = (380 - 40) / (cumulativeSpending.length - 1 || 1);
                      const points = cumulativeSpending.map((val, idx) => {
                        const x = 40 + step * idx;
                        const y = 240 - (val / maxSpending) * 200;
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
                        `${pathD} L ${points[points.length - 1].x} 240 L 40 240 Z`;
                      return (
                        <>
                          {areaD && (
                            <motion.path
                              d={areaD}
                              fill="url(#yearSpendAreaGradient)"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.3 }}
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
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 1.5 + idx * 0.05,
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
                      const step = (380 - 40) / (remainingFunds.length - 1 || 1);
                      const points = remainingFunds.map((val, idx) => {
                        const x = 40 + step * idx;
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
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 1.8 + idx * 0.05,
                              }}
                              onMouseEnter={() => setLineHoverIndex(idx)}
                              onMouseLeave={() => setLineHoverIndex(null)}
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </>
                      );
                    })()}
                    {/* Legend */}
                    <g>
                      <line
                        x1={50}
                        y1={30}
                        x2={80}
                        y2={30}
                        stroke="url(#yearSpendLineGradient)"
                        strokeWidth={2.5}
                      />
                      <text
                        x={90}
                        y={33}
                        fontSize={10}
                        fill="rgba(255,255,255,0.8)"
                      >
                        Cumulative Spending
                      </text>
                      <line
                        x1={50}
                        y1={50}
                        x2={80}
                        y2={50}
                        stroke="#22C55E"
                        strokeWidth={2.5}
                        strokeDasharray="6 4"
                      />
                      <text
                        x={90}
                        y={53}
                        fontSize={10}
                        fill="rgba(255,255,255,0.8)"
                      >
                        Remaining Capital
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </motion.section>

            {/* Summary Section */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Capital Allocation Insight
              </h2>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Marketing & Growth
                  </p>
                  <p className="text-2xl font-semibold text-white">~41%</p>
                  <p className="text-xs text-white/60 mt-1">
                    {formatInr(1480000)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Core Operations
                  </p>
                  <p className="text-2xl font-semibold text-white">~35%</p>
                  <p className="text-xs text-white/60 mt-1">
                    {formatInr(1279200)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    One-Time Setup
                  </p>
                  <p className="text-2xl font-semibold text-white">~24%</p>
                  <p className="text-xs text-white/60 mt-1">
                    {formatInr(846000)}
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-white/80">
                <p>
                  This allocation is consistent with best practices for boutique advisory firms, where early emphasis is placed on:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Regulatory and credibility foundations</li>
                  <li>Operational stability via outsourcing</li>
                  <li>Targeted, high-intent client acquisition</li>
                </ul>
                <p className="mt-4">
                  No segment shows disproportionate or uncontrolled spending.
                </p>
              </div>
            </motion.section>

            {/* Runway Section */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Runway & Forward Position
              </h2>
              <p className="text-sm text-white/70 mb-4">
                With {formatInr(TOTAL_REMAINING)} still available after December 2026, the firm retains significant flexibility to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-white/80 ml-4 mb-4">
                <li>Extend runway comfortably beyond 12 additional months</li>
                <li>Absorb deal-linked outsourced execution costs</li>
                <li>Increase marketing spend selectively where ROI justifies</li>
                <li>Scale cautiously without immediate capital dependency</li>
              </ul>
              <p className="text-sm text-white/70">
                At the current cost structure, the firm is not capital-constrained.
              </p>
            </motion.section>

            {/* Closing Note */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Closing Note
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Capital deployment to date reflects disciplined financial management, seasonally intelligent marketing allocation, a lean outsourced operating model, and strong runway preservation. The objective has been to build credibility, traction, and optionality — without over-committing capital early. This position allows the firm to scale deliberately and from a position of strength.
              </p>
            </motion.section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

