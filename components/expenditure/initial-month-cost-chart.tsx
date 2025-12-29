"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { useRouter } from "next/navigation";

interface ExpenseSegment {
  name: string;
  inr: number;
  usd: number;
  color: string;
  items: {
    name: string;
    inr: number;
    usd: number;
  }[];
  description: string;
  isRecurring?: boolean;
}

const expenseSegments: ExpenseSegment[] = [
  {
    name: "Licensing & Legal",
    inr: 420000,
    usd: 4615.38,
    color: "#3B82F6",
    description: "Regulatory compliance and corporate structure foundation costs.",
    isRecurring: false,
    items: [
      { name: "FCA Licensing (₹3,50,000 licence renting + ₹50,000 HMRC)", inr: 400000, usd: 4395.60 },
      { name: "Indian Company Formation (Pvt. Ltd.)", inr: 20000, usd: 219.78 },
    ],
  },
  {
    name: "Tech Devices (One-Time)",
    inr: 192000,
    usd: 2109.89,
    color: "#8B5CF6",
    description: "Hardware infrastructure for operational readiness and team productivity.",
    isRecurring: false,
    items: [
      { name: "LG Monitors (31k × 2)", inr: 62000, usd: 681.32 },
      { name: "Mac Mini", inr: 80000, usd: 879.12 },
      { name: "Webcams (5k × 2)", inr: 10000, usd: 109.89 },
      { name: "Office Chairs (5k × 2)", inr: 10000, usd: 109.89 },
      { name: "2TB SSD", inr: 10000, usd: 109.89 },
      { name: "DJI Mic", inr: 20000, usd: 219.78 },
    ],
  },
  {
    name: "Laptop Rent (Monthly)",
    inr: 14000,
    usd: 153.85,
    color: "#A78BFA",
    description: "Monthly rental cost for laptop infrastructure.",
    isRecurring: true,
    items: [
      { name: "Laptop Rent (7k × 2)", inr: 14000, usd: 153.85 },
    ],
  },
  {
    name: "Infrastructure",
    inr: 120000,
    usd: 1318.68,
    color: "#10B981",
    description: "Digital presence and physical workspace establishment.",
    isRecurring: false, // Website is one-time, Office Rent is recurring but kept together
    items: [
      { name: "Website", inr: 80000, usd: 879.12 },
      { name: "Office Rent", inr: 40000, usd: 439.56 },
    ],
  },
  {
    name: "Software Subscriptions",
    inr: 22600,
    usd: 248.35,
    color: "#F59E0B",
    description: "SaaS subscriptions and digital tools for operational efficiency.",
    isRecurring: true,
    items: [
      { name: "ChatGPT Business ×2", inr: 5300, usd: 58.24 },
      { name: "HubSpot Starter ×2", inr: 5300, usd: 58.24 },
      { name: "Canva Pro", inr: 500, usd: 5.49 },
      { name: "KrispCall Virtual Number", inr: 1500, usd: 16.48 },
      { name: "Otter.ai", inr: 1000, usd: 10.99 },
      { name: "Proton Mail + Drive", inr: 2000, usd: 21.98 },
      { name: "LinkedIn (2 accounts)", inr: 2000, usd: 21.98 },
      { name: "LinkedIn Sales Navigator", inr: 3000, usd: 32.97 },
      { name: "Structure Layout Tools", inr: 2000, usd: 21.98 },
    ],
  },
  {
    name: "Content Production",
    inr: 30000,
    usd: 329.67,
    color: "#EF4444",
    description: "Media production infrastructure for thought leadership and brand positioning.",
    isRecurring: true,
    items: [
      { name: "Studio / Hotel Expense", inr: 20000, usd: 219.78 },
      { name: "Camera Equipment Rental", inr: 10000, usd: 109.89 },
    ],
  },
  {
    name: "Marketing",
    inr: 215000,
    usd: 2362.64,
    color: "#06B6D4",
    description: "Brand collateral and acquisition channel investment for Month-1 launch.",
    isRecurring: false, // Visiting Cards is one-time, Ad Spend is recurring but kept together
    items: [
      { name: "Visiting Cards", inr: 35000, usd: 384.62 },
      { name: "Ad Spend (Month-1)", inr: 180000, usd: 1978.0 },
    ],
  },
  {
    name: "Salary",
    inr: 20000,
    usd: 219.78,
    color: "#EC4899",
    description: "Talent investment for content creation and social media management.",
    isRecurring: true,
    items: [
      { name: "Social Media Manager / Editor", inr: 20000, usd: 219.78 },
    ],
  },
  {
    name: "Contingency Reserve",
    inr: 20000,
    usd: 219.78,
    color: "#14B8A6",
    description: "Contingency reserve for operational flexibility and unforeseen requirements.",
    isRecurring: true,
    items: [
      { name: "Contingency Reserve", inr: 20000, usd: 219.78 },
    ],
  },
];

function calculatePieData(segments: ExpenseSegment[]) {
  const total = segments.reduce((sum, seg) => sum + seg.inr, 0);
  let currentAngle = -90; // Start from top
  return segments.map((segment) => {
    const percentage = (segment.inr / total) * 100;
    const angle = (segment.inr / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;
    return {
      ...segment,
      percentage,
      startAngle,
      endAngle,
      largeArcFlag: angle > 180 ? 1 : 0,
    };
  });
}

function getPathData(
  startAngle: number,
  endAngle: number,
  radius: number,
  largeArcFlag: number
) {
  const start = polarToCartesian(0, 0, radius, endAngle);
  const end = polarToCartesian(0, 0, radius, startAngle);
  return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

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

interface InitialMonthCostChartProps {
  onClose?: () => void;
}

export function InitialMonthCostChart({ onClose }: InitialMonthCostChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const pieData = calculatePieData(expenseSegments);
  const total = expenseSegments.reduce((sum, seg) => sum + seg.inr, 0);
  const totalUSD = expenseSegments.reduce((sum, seg) => sum + seg.usd, 0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimationProgress(easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={onClose}
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Boyar Partners · Expenditure Module</p>
              <h1 className="text-2xl font-medium text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                Initial Month Cost – Investor Brief
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Launch Month: Month-1</p>
              <p>Total: {inrFormatter(total)} ({usdFormatter(totalUSD, 0)})</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid gap-8">
            {/* Overview Section */}
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    The Month-1 expenditure framework establishes operational infrastructure, regulatory compliance, and market entry capabilities for Boyar Partners. This initial investment covers licensing requirements, technology infrastructure, content production assets, and acquisition channel activation. Each cost segment is strategically allocated to support immediate operational readiness while maintaining capital efficiency and transparency for investor oversight.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Total Month-1 Cost" primary={inrFormatter(total)} secondary={usdFormatter(totalUSD, 0)} />
                    <StatCard label="Licensing & Legal" primary={inrFormatter(expenseSegments[0].inr)} secondary={`${pieData[0].percentage.toFixed(1)}%`} />
                    <StatCard label="Tech Infrastructure" primary={inrFormatter(expenseSegments[1].inr)} secondary={`${pieData[1].percentage.toFixed(1)}%`} />
                    <StatCard label="Marketing Investment" primary={inrFormatter(expenseSegments[6].inr)} secondary={`${pieData[6].percentage.toFixed(1)}%`} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recurring vs One-Time Costs */}
            <SectionCard 
              title="Recurring vs One-Time Cost Breakdown" 
              subtitle="Month-1 cost structure distinguishing between ongoing operational expenses and initial setup investments."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-4">Month-1 Recurring Costs</p>
                  <div className="space-y-3 text-sm">
                    {expenseSegments
                      .filter(seg => seg.isRecurring)
                      .map((segment, index) => (
                        <div key={index} className="flex items-center justify-between text-white/80">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
                            <span>{segment.name}</span>
                          </div>
                          <span className="font-medium">{inrFormatter(segment.inr)}</span>
                        </div>
                      ))}
                    {/* Ad Spend from Marketing segment */}
                    <div className="flex items-center justify-between text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#06B6D4" }} />
                        <span>Ad Spend</span>
                      </div>
                      <span className="font-medium">{inrFormatter(180000)}</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-white font-semibold">
                      <span>Total Recurring Cost</span>
                      <span>{inrFormatter(
                        expenseSegments.filter(seg => seg.isRecurring).reduce((sum, seg) => sum + seg.inr, 0) + 180000
                      )}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-4">
                      Note: Excludes travel costs as they are variable. Office Rent (₹40,000) from Infrastructure is recurring but included in one-time segment for Month-1 allocation.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-4">One-Time Setup Costs</p>
                  <div className="space-y-3 text-sm">
                    {expenseSegments
                      .filter(seg => !seg.isRecurring)
                      .map((segment, index) => {
                        // For Marketing segment, show only Visiting Cards (exclude Ad Spend)
                        if (segment.name === "Marketing") {
                          return (
                            <div key={index} className="flex items-center justify-between text-white/80">
                              <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
                                <span>Visiting Cards</span>
                              </div>
                              <span className="font-medium">{inrFormatter(35000)}</span>
                            </div>
                          );
                        }
                        return (
                          <div key={index} className="flex items-center justify-between text-white/80">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
                              <span>{segment.name}</span>
                            </div>
                            <span className="font-medium">{inrFormatter(segment.inr)}</span>
                          </div>
                        );
                      })}
                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-white font-semibold">
                      <span>Total One-Time Cost</span>
                      <span>{inrFormatter(
                        expenseSegments.filter(seg => !seg.isRecurring).reduce((sum, seg) => {
                          // For Marketing, only count Visiting Cards (35000), not Ad Spend
                          if (seg.name === "Marketing") {
                            return sum + 35000;
                          }
                          return sum + seg.inr;
                        }, 0)
                      )}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-4">
                      One-time investments include licensing, hardware, website development, and initial brand collateral that do not recur monthly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-200 mb-1">Month-1 Recurring Cost Total</p>
                    <p className="text-white/80">Excludes variable travel expenses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                      {inrFormatter(
                        expenseSegments.filter(seg => seg.isRecurring).reduce((sum, seg) => sum + seg.inr, 0) + 180000
                      )}
                    </p>
                    <p className="text-xs text-white/60">
                      ({usdFormatter(
                        expenseSegments.filter(seg => seg.isRecurring).reduce((sum, seg) => sum + seg.usd, 0) + 1978.0, 0
                      )})
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Expenditure Allocation Table */}
            <SectionCard 
              title="Expenditure Allocation by Segment" 
              subtitle="Strategic cost distribution across operational, regulatory, and growth investment categories."
            >
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Segment</th>
                      <th className="px-4 py-3 text-left font-medium">Allocation %</th>
                      <th className="px-4 py-3 text-left font-medium">Cost (INR)</th>
                      <th className="px-4 py-3 text-left font-medium">Cost (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pieData.map((segment, index) => (
                      <tr key={index} className="border-t border-white/10 text-white/80">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
                          {segment.name}
                        </td>
                        <td className="px-4 py-3">{segment.percentage.toFixed(1)}%</td>
                        <td className="px-4 py-3">{inrFormatter(segment.inr)}</td>
                        <td className="px-4 py-3">{usdFormatter(segment.usd, 0)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10 text-white font-semibold">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3">100%</td>
                      <td className="px-4 py-3">{inrFormatter(total)}</td>
                      <td className="px-4 py-3">{usdFormatter(totalUSD, 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Pie Chart Visualization */}
            <SectionCard 
              title="Cost Allocation Visualization" 
              subtitle="Visual representation of Month-1 expenditure distribution across investment categories. Hover over segments for details, click for full breakdown."
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 w-full max-w-md mx-auto">
                  <div 
                    className="relative h-64 w-64 mx-auto flex-shrink-0"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ 
                        x: e.clientX - rect.left, 
                        y: e.clientY - rect.top 
                      });
                    }}
                  >
                    <svg 
                      width="256" 
                      height="256" 
                      viewBox="-110 -110 220 220" 
                      className="w-full h-full cursor-pointer"
                      style={{ display: 'block' }}
                    >
                      <g>
                        {pieData.map((slice, index) => {
                          const animatedEndAngle =
                            slice.startAngle + (slice.endAngle - slice.startAngle) * animationProgress;

                          const pathData = getPathData(
                            slice.startAngle,
                            animatedEndAngle,
                            100,
                            slice.largeArcFlag
                          );

                          const isHovered = hoveredSegment === index;
                          const isSelected = selectedSegment === index;

                          return (
                            <motion.path
                              key={index}
                              d={pathData}
                              fill={slice.color}
                              stroke={isHovered || isSelected ? "#fff" : "#000"}
                              strokeWidth={isHovered || isSelected ? "3" : "2"}
                              initial={{ opacity: 0 }}
                              animate={{ 
                                opacity: 1,
                                scale: isHovered ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              onMouseEnter={() => setHoveredSegment(index)}
                              onMouseLeave={() => setHoveredSegment(null)}
                              onClick={() => setSelectedSegment(index)}
                              style={{ cursor: "pointer", transformOrigin: "0 0" }}
                            />
                          );
                        })}
                      </g>
                    </svg>
                    
                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {hoveredSegment !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute z-50 pointer-events-none"
                          style={{
                            left: tooltipPosition.x < 128 ? `${tooltipPosition.x + 20}px` : `${tooltipPosition.x - 20}px`,
                            top: tooltipPosition.y < 128 ? `${tooltipPosition.y + 20}px` : `${tooltipPosition.y - 20}px`,
                            transform: tooltipPosition.x < 128 
                              ? (tooltipPosition.y < 128 ? 'translate(0, 0)' : 'translate(0, -100%)')
                              : (tooltipPosition.y < 128 ? 'translate(-100%, 0)' : 'translate(-100%, -100%)'),
                          }}
                        >
                        <div className="bg-black/95 border border-white/20 rounded-lg p-3 shadow-2xl backdrop-blur-xl min-w-[200px]">
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: expenseSegments[hoveredSegment].color }} 
                            />
                            <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                              {expenseSegments[hoveredSegment].name}
                            </p>
                          </div>
                          <div className="space-y-1 text-xs text-white/80">
                            <p>{expenseSegments[hoveredSegment].description}</p>
                            <p className="pt-2 border-t border-white/10">
                              <span className="font-semibold">Cost: </span>
                              {inrFormatter(expenseSegments[hoveredSegment].inr)} ({usdFormatter(expenseSegments[hoveredSegment].usd, 0)})
                            </p>
                            <p>
                              <span className="font-semibold">Allocation: </span>
                              {pieData[hoveredSegment].percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="w-full space-y-2 text-xs text-white/70 text-center">
                    <p>Licensing & Legal represents 39.3% of initial investment, establishing regulatory foundation and compliance framework.</p>
                    <p>Tech infrastructure and marketing combined account for 42.5% of Month-1 expenditure, enabling operational readiness and market entry.</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Popup Modal for Selected Segment */}
            <AnimatePresence>
              {selectedSegment !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                  onClick={() => setSelectedSegment(null)}
                >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black/95 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span 
                        className="h-4 w-4 rounded-full" 
                        style={{ backgroundColor: expenseSegments[selectedSegment].color }} 
                      />
                      <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                        {expenseSegments[selectedSegment].name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedSegment(null)}
                      className="text-white/60 hover:text-white transition"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="text-sm text-white/70 mb-2">{expenseSegments[selectedSegment].description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60 text-xs mb-1">Total Cost</p>
                          <p className="text-white font-semibold">
                            {inrFormatter(expenseSegments[selectedSegment].inr)}
                          </p>
                          <p className="text-white/60 text-xs">
                            {usdFormatter(expenseSegments[selectedSegment].usd, 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-1">Allocation</p>
                          <p className="text-white font-semibold">
                            {pieData[selectedSegment].percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "var(--font-benzin)" }}>
                        Line Items
                      </h4>
                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-white/5 text-white/60">
                            <tr>
                              <th className="px-4 py-2 text-left font-medium">Item</th>
                              <th className="px-4 py-2 text-right font-medium">Cost (INR)</th>
                              <th className="px-4 py-2 text-right font-medium">Cost (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expenseSegments[selectedSegment].items.map((item, itemIndex) => (
                              <tr key={itemIndex} className="border-t border-white/5 text-white/80">
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2 text-right">{inrFormatter(item.inr)}</td>
                                <td className="px-4 py-2 text-right">{usdFormatter(item.usd, 1)}</td>
                              </tr>
                            ))}
                            <tr className="border-t border-white/10 text-white font-semibold">
                              <td className="px-4 py-2">Segment Total</td>
                              <td className="px-4 py-2 text-right">{inrFormatter(expenseSegments[selectedSegment].inr)}</td>
                              <td className="px-4 py-2 text-right">{usdFormatter(expenseSegments[selectedSegment].usd, 0)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detailed Breakdown by Segment */}
            <SectionCard 
              title="Detailed Breakdown by Segment" 
              subtitle="Line-item transparency for each expenditure category with full cost attribution."
            >
              <div className="space-y-6">
                {expenseSegments.map((segment, segmentIndex) => {
                  const segmentData = pieData[segmentIndex];
                  return (
                    <motion.div
                      key={segmentIndex}
                      id={`segment-${segmentIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: segmentIndex * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-black/40 p-6"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: segment.color }} />
                          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>
                            {segment.name}
                          </h3>
                          <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-white/60 flex items-center gap-1">
                              Click here
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                            <button
                              onClick={() => {
                                if (segmentIndex === 0) {
                                  router.push("/expenditure/licensing-legal");
                                } else if (segmentIndex === 1) {
                                  router.push("/expenditure/tech-devices");
                                } else if (segmentIndex === 2) {
                                  router.push("/expenditure/laptop-rent");
                                } else if (segmentIndex === 3) {
                                  router.push("/expenditure/infrastructure");
                                } else if (segmentIndex === 4) {
                                  router.push("/expenditure/software-subscriptions");
                                } else if (segmentIndex === 5) {
                                  router.push("/expenditure/content-production");
                                } else if (segmentIndex === 6) {
                                  router.push("/expenditure/marketing");
                                } else if (segmentIndex === 7) {
                                  router.push("/expenditure/salary");
                                } else if (segmentIndex === 8) {
                                  router.push("/expenditure/contingency-reserve");
                                } else {
                                  const el = document.getElementById(`segment-${segmentIndex}`);
                                  if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                                  }
                                }
                              }}
                              className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 transition-all"
                              style={{ fontFamily: "var(--font-benzin)" }}
                            >
                              Reasoning
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {inrFormatter(segment.inr)} ({usdFormatter(segment.usd, 0)})
                          </p>
                          <p className="text-xs text-white/60">{segmentData.percentage.toFixed(1)}% of total</p>
                        </div>
                      </div>
                      <p className="mb-4 text-sm text-white/70">{segment.description}</p>
                      <div className="overflow-hidden rounded-xl border border-white/5">
                        <table className="w-full text-sm">
                          <thead className="bg-white/5 text-white/60">
                            <tr>
                              <th className="px-4 py-2 text-left font-medium">Item</th>
                              <th className="px-4 py-2 text-right font-medium">Cost (INR)</th>
                              <th className="px-4 py-2 text-right font-medium">Cost (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {segment.items.map((item, itemIndex) => (
                              <tr key={itemIndex} className="border-t border-white/5 text-white/80">
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2 text-right">{inrFormatter(item.inr)}</td>
                                <td className="px-4 py-2 text-right">{usdFormatter(item.usd, 1)}</td>
                              </tr>
                            ))}
                            <tr className="border-t border-white/10 text-white font-semibold">
                              <td className="px-4 py-2">Segment Total</td>
                              <td className="px-4 py-2 text-right">{inrFormatter(segment.inr)}</td>
                              <td className="px-4 py-2 text-right">{usdFormatter(segment.usd, 0)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Summary Note */}
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Investor Note</p>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Month-1 expenditure reflects one-time infrastructure setup, regulatory compliance requirements, and initial market entry investment. 
                Subsequent months will see reduced costs as one-time items (licensing, hardware, website) are amortized, while recurring operational 
                expenses (SaaS subscriptions, office rent, salary) continue at established rates. Travel costs are variable and excluded from 
                this fixed-cost framework. All expenditures are documented and available for investor review through monthly reporting cycles.
              </p>
            </motion.div>
          </section>
        </main>
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
