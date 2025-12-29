"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MayCategory {
  name: string;
  inr: number;
  usd: number;
  color: string;
  description: string;
  includes?: string[];
}

const MAY_CATEGORIES: MayCategory[] = [
  {
    name: "Technology & Software",
    inr: 22600,
    usd: 248.4,
    color: "#3B82F6",
    description:
      "The software stack remains unchanged, indicating that tools selected earlier are sufficient and fit-for-purpose. May focuses on maintaining operational efficiency.",
    includes: [
      "ChatGPT Business ×2",
      "HubSpot Starter ×2",
      "Canva Pro",
      "KrispCall",
      "Otter.ai",
      "Proton Mail + Drive",
      "LinkedIn (2 accounts)",
      "LinkedIn Sales Navigator",
      "Structure Layout Tools",
    ],
  },
  {
    name: "Infrastructure (Office)",
    inr: 40000,
    usd: 439.6,
    color: "#10B981",
    description:
      "Physical presence continues to support credibility, in-person meetings, and relationship-building. Office rent remains stable.",
    includes: ["Office rent"],
  },
  {
    name: "Device Rental",
    inr: 14000,
    usd: 153.9,
    color: "#8B5CF6",
    description:
      "Rental continues to be more capital-efficient than ownership at this stage. No upgrades or additional devices required in May.",
    includes: ["Laptop rent (2 units)"],
  },
  {
    name: "Content Production",
    inr: 30000,
    usd: 329.7,
    color: "#EF4444",
    description:
      "Content cadence and production quality remain consistent. May maintains steady output aligned with boutique positioning.",
    includes: ["Studio / Hotel expense", "Camera equipment rental"],
  },
  {
    name: "Marketing & Ads",
    inr: 115000,
    usd: 1263.7,
    color: "#F59E0B",
    description:
      "May represents a transition month where decision-makers begin re-engaging after fiscal-year execution. Ad spend is marginally increased compared to April to capture early movers, test refined messaging, and rebuild top-of-funnel activity without returning to peak spend levels. The focus remains on quality leads and conversion efficiency rather than volume.",
  },
  {
    name: "Human Resources",
    inr: 20000,
    usd: 219.8,
    color: "#EC4899",
    description:
      "Scope of work remains unchanged. Output consistency continues without additional headcount.",
    includes: ["Social Media Manager / Editor"],
  },
  {
    name: "Contingency Reserve",
    inr: 20000,
    usd: 219.8,
    color: "#14B8A6",
    description:
      "Reserve maintained for operational continuity. No structural change.",
  },
];

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

export default function May2026MonthlyCostPage() {
  const router = useRouter();
  const [pieProgress, setPieProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lineHoverIndex, setLineHoverIndex] = useState<number | null>(null);

  const totalInr = MAY_CATEGORIES.reduce((sum, c) => sum + c.inr, 0);
  const totalUsd = MAY_CATEGORIES.reduce((sum, c) => sum + c.usd, 0);

  useEffect(() => {
    const duration = 3000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setPieProgress(eased);
      if (raw < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  let currentAngle = -90;
  const pieSlices = MAY_CATEGORIES.map((category) => {
    const angle = (category.inr / totalInr) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;
    return {
      ...category,
      startAngle,
      endAngle,
      percentage: (category.inr / totalInr) * 100,
      largeArcFlag: angle > 180 ? 1 : 0,
    };
  });

  function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function getPath(radius: number, startAngle: number, endAngle: number, largeArcFlag: number) {
    const start = polarToCartesian(0, 0, radius, endAngle);
    const end = polarToCartesian(0, 0, radius, startAngle);
    return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/expenditure/monthly-cost?skipAnimation=1")}
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back to Monthly Cost
            </button>
            <div className="text-center flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Boyar Partners · Monthly Expenditure
              </p>
              <h1
                className="mt-1 text-xl sm:text-2xl font-medium text-white"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                May 2026 — Monthly Expenditure Breakdown
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Exchange Rate: 1 USD = 91 INR</p>
              <p>Nature: Optimisation + selective momentum build</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid gap-6 md:grid-cols-[1.6fr,1.1fr]">
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-white/80">
                  May 2026 represents a transition month where decision-makers begin
                  re-engaging after fiscal-year execution. Marketing spend is marginally
                  increased compared to April to capture early movers, test refined messaging,
                  and rebuild top-of-funnel activity without returning to peak spend levels.
                </p>
                <p className="text-white/80">
                  The focus remains on quality leads and conversion efficiency rather than
                  volume. All other categories remain stable, indicating operational maturity
                  and fit-for-purpose infrastructure. This approach balances growth momentum
                  with disciplined capital allocation.
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Total Month Cost (May 2026)
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    {formatInr(totalInr)}
                  </p>
                  <p className="text-xs text-white/60">{formatUsd(totalUsd)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Operating Profile
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    No new licensing or legal costs. Marketing spend marginally increased
                    to capture early movers. Travel & networking remain variable.
                  </p>
                </div>
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
                Category-Wise Spend Allocation
              </h2>
              <p className="text-xs text-white/60 mb-6">
                Animated month-level allocation of May burn across operating
                categories.
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
                            initial={{ opacity: 0, scale: 0.92, transformOrigin: "0 0" }}
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
                      May 2026
                    </p>
                    <p
                      className="mt-1 text-sm font-semibold text-white"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      Spend Mix
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
                          {slice.percentage.toFixed(1)}% of month
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
                        {MAY_CATEGORIES[hoveredIndex].name}
                      </p>
                      <p>{MAY_CATEGORIES[hoveredIndex].description}</p>
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
                Operating Intensity by Category
              </h2>
              <p className="text-xs text-white/60 mb-6">
                Animated horizontal bars showing relative scale of monthly
                commitments. Travel & networking is variable and therefore
                intentionally excluded from this fixed-cost graph.
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                {MAY_CATEGORIES.map((category) => {
                  const width = (category.inr / totalInr) * 100;
                  return (
                    <div key={category.name}>
                      <div className="mb-1 flex items-center justify-between text-white/70">
                        <span>{category.name}</span>
                        <span className="text-[11px] text-white/50">
                          {formatInr(category.inr)}
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${width}%` }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, rgba(255,255,255,0.7))`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* Line Chart: Cost Trend Across Categories */}
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
              May Cost Curve by Category
            </h2>
            <p className="text-xs text-white/60 mb-6">
              Professional line visualization of how May spend builds up across
              operating categories, from technology foundation through growth and
              contingency buffers.
            </p>
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative h-64 w-full">
                {/* Hover tooltip – middle left, just outside graph */}
                {lineHoverIndex !== null && (
                  <div
                    className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2
                               rounded-2xl border border-white/20 bg-black/95 px-4 py-3 shadow-2xl
                               text-[11px] sm:text-xs text-white/80 max-w-[220px]"
                  >
                    <p
                      className="mb-1 font-semibold"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      {MAY_CATEGORIES[lineHoverIndex].name}
                    </p>
                    <p className="mb-1">
                      {formatInr(MAY_CATEGORIES[lineHoverIndex].inr)} ·{" "}
                      {formatUsd(MAY_CATEGORIES[lineHoverIndex].usd)}
                    </p>
                    <p className="text-white/70">
                      {MAY_CATEGORIES[lineHoverIndex].description}
                    </p>
                  </div>
                )}

                <svg viewBox="0 0 320 180" className="h-full w-full">
                  {/* Axes */}
                  <line
                    x1={32}
                    y1={150}
                    x2={310}
                    y2={150}
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth={0.5}
                  />
                  <line
                    x1={32}
                    y1={20}
                    x2={32}
                    y2={150}
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth={0.5}
                  />
                  {/* Horizontal grid lines */}
                  {[0.25, 0.5, 0.75].map((ratio) => (
                    <line
                      key={ratio}
                      x1={32}
                      x2={310}
                      y1={150 - ratio * 110}
                      y2={150 - ratio * 110}
                      stroke="rgba(148,163,184,0.2)"
                      strokeWidth={0.5}
                      strokeDasharray="4 4"
                    />
                  ))}
                  {/* Y-axis labels (approximate INR levels) */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                    <text
                      key={ratio}
                      x={28}
                      y={150 - ratio * 110 + 4}
                      textAnchor="end"
                      fontSize={9}
                      fill="rgba(148,163,184,0.8)"
                    >
                      {idx === 0
                        ? "0"
                        : `${Math.round((totalInr * ratio) / 1000) * 1}k`}
                    </text>
                  ))}
                  {/* Line + area */}
                  {(() => {
                    const max = totalInr;
                    const step = (310 - 32) / (MAY_CATEGORIES.length - 1 || 1);
                    const points = MAY_CATEGORIES.map((cat, idx) => {
                      const x = 32 + step * idx;
                      const y = 150 - (cat.inr / max) * 110;
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
                      `${pathD} L ${points[points.length - 1].x} 150 L 32 150 Z`;
                    return (
                      <>
                        {areaD && (
                          <motion.path
                            d={areaD}
                            fill="url(#mayAreaGradient)"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.35 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                        <defs>
                          <linearGradient
                            id="mayLineGradient"
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
                            id="mayAreaGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
                            <stop offset="100%" stopColor="rgba(15,23,42,0.05)" />
                          </linearGradient>
                        </defs>
                        {pathD && (
                          <motion.path
                            d={pathD}
                            fill="none"
                            stroke="url(#mayLineGradient)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                        {points.map((p, idx) => (
                          <motion.circle
                            key={MAY_CATEGORIES[idx].name}
                            cx={p.x}
                            cy={p.y}
                            r={4}
                            fill={MAY_CATEGORIES[idx].color}
                            stroke="#0F172A"
                            strokeWidth={1}
                            initial={{ opacity: 0, scale: 0.4 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                              duration: 0.3,
                              delay: 2.5 + idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            onMouseEnter={() => setLineHoverIndex(idx)}
                            onMouseLeave={() => setLineHoverIndex(null)}
                          />
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-4 text-[10px] sm:text-xs text-white/60">
                <p>
                  May shows transition momentum: marketing spend marginally increased to
                  capture early movers and rebuild top-of-funnel activity, while all
                  other categories remain stable.
                </p>
                <p>
                  Travel & networking expenses remain variable and are incurred only
                  when value-accretive, reported separately from fixed costs.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Detailed narrative per category */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            <h2
              className="text-lg sm:text-xl font-semibold text-white mb-4"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Category-by-Category View — May 2026
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {MAY_CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <p className="text-sm font-semibold text-white">
                        {category.name}
                      </p>
                    </div>
                    <div className="text-right text-xs text-white/70">
                      <p>{formatInr(category.inr)}</p>
                      <p>{formatUsd(category.usd)}</p>
                    </div>
                  </div>
                  {category.includes && category.includes.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                        Includes
                      </p>
                      <ul className="space-y-1 text-[11px] text-white/70">
                        {category.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-white/50 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {category.name === "Marketing & Ads" && (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3">
                      <p className="text-[10px] text-emerald-200 mb-2">
                        <span className="font-semibold">Change vs April:</span>{" "}
                        ₹5,000 increase
                      </p>
                      <p className="text-[10px] text-emerald-200/90 leading-relaxed">
                        May represents a transition month where decision-makers begin
                        re-engaging after fiscal-year execution. Ad spend is marginally
                        increased to capture early movers, test refined messaging, and
                        rebuild top-of-funnel activity without returning to peak spend levels.
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-white/80 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Travel & Networking Variable Note */}
            <div className="mt-6 rounded-2xl border border-blue-400/30 bg-blue-400/10 p-4">
              <div className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Travel & Networking
                  </p>
                  <p className="text-xs text-white/70">
                    Variable | Not fixed. May may include selective client meetings
                    or networking interactions. All such expenses remain value-driven
                    and pre-reported.
                  </p>
                </div>
              </div>
            </div>
            {/* Potential / Situational Expenses */}
            <div className="mt-6 rounded-2xl border border-purple-400/30 bg-purple-400/10 p-4">
              <div className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Potential / Situational Expenses (Not Committed)
                  </p>
                  <p className="text-[10px] text-white/60 mb-2 italic">
                    Based on boutique advisory patterns with outsourced services
                  </p>
                  <p className="text-xs text-white/70 mb-2">
                    These may arise in May only if deal activity or execution requires,
                    and are not assumed in the base burn:
                  </p>
                  <ul className="space-y-1 text-[11px] text-white/70 ml-4 list-disc">
                    <li>External legal opinion / memo fees (for complex client structures)</li>
                    <li>One-off consultant or jurisdiction specialist fees</li>
                    <li>Client onboarding costs charged by third-party providers</li>
                    <li>Short-term travel for high-probability deal meetings</li>
                  </ul>
                  <p className="text-xs text-white/70 mt-3">
                    All such expenses, if incurred, would be:
                  </p>
                  <ul className="space-y-1 text-[11px] text-white/70 ml-4 list-disc mt-1">
                    <li>Deal-linked</li>
                    <li>Pre-approved internally</li>
                    <li>Reported transparently to investors</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tabular summary + investor note */}
          <section className="grid gap-8 lg:grid-cols-[1.2fr,1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-xl"
            >
              <h2
                className="text-lg sm:text-xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                May 2026 — Category-Wise Spend Table
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Category</th>
                      <th className="px-4 py-2 text-right font-medium">INR</th>
                      <th className="px-4 py-2 text-right font-medium">USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MAY_CATEGORIES.map((category) => (
                      <tr
                        key={category.name}
                        className="border-t border-white/10 text-white/80"
                      >
                        <td className="px-4 py-2">{category.name}</td>
                        <td className="px-4 py-2 text-right">
                          {formatInr(category.inr)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatUsd(category.usd)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10 text-white font-semibold">
                      <td className="px-4 py-2">Total (May 2026)</td>
                      <td className="px-4 py-2 text-right">
                        {formatInr(totalInr)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatUsd(totalUsd)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-2">
                Investor Summary — May 2026
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                May reflects a transition month where decision-makers begin re-engaging
                after fiscal-year execution. Marketing spend is marginally increased compared
                to April to capture early movers, test refined messaging, and rebuild
                top-of-funnel activity without returning to peak spend levels.
              </p>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                The focus remains on quality leads and conversion efficiency rather than
                volume. All other categories remain stable, indicating operational maturity
                and fit-for-purpose infrastructure. Travel & networking expenses remain
                variable and are incurred only when value-accretive.
              </p>
            </motion.div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

