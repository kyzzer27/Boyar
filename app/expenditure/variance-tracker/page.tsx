/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useMemo } from "react";

/* ─── Projected vs Actual data (example placeholder until live feeds) ─── */

interface MonthRow {
	month: string;
	label: string;
	projected: number;
	actual: number | null; // null = future month, not yet recorded
}

const VARIANCE_DATA: MonthRow[] = [
	{ month: "M1", label: "Jan 2026", projected: 1243600, actual: 1198450 },
	{ month: "M2", label: "Feb 2026", projected: 276600, actual: 291340 },
	{ month: "M3", label: "Mar 2026", projected: 296600, actual: 283920 },
	{ month: "M4", label: "Apr 2026", projected: 256600, actual: null },
	{ month: "M5", label: "May 2026", projected: 261600, actual: null },
	{ month: "M6", label: "Jun 2026", projected: 251600, actual: null },
	{ month: "M7", label: "Jul 2026", projected: 246600, actual: null },
	{ month: "M8", label: "Aug 2026", projected: 276600, actual: null },
	{ month: "M9", label: "Sep 2026", projected: 286600, actual: null },
	{ month: "M10", label: "Oct 2026", projected: 296600, actual: null },
	{ month: "M11", label: "Nov 2026", projected: 276600, actual: null },
	{ month: "M12", label: "Dec 2026", projected: 266600, actual: null },
];

/* Per-category variance breakdown (months with actuals only) */
interface CategoryVariance {
	category: string;
	projected: number;
	actual: number;
	flagged: boolean;
}

const CATEGORY_BREAKDOWN: CategoryVariance[] = [
	{ category: "Salaries & HR", projected: 487200, actual: 487200, flagged: false },
	{ category: "Software & SaaS", projected: 214800, actual: 231640, flagged: true },
	{ category: "Infrastructure", projected: 180000, actual: 172350, flagged: false },
	{ category: "Licensing & Legal", projected: 296000, actual: 310420, flagged: true },
	{ category: "Marketing", projected: 158000, actual: 141280, flagged: false },
	{ category: "Content Production", projected: 120000, actual: 118500, flagged: false },
	{ category: "Tech Devices", projected: 185000, actual: 169120, flagged: false },
	{ category: "Laptop Rent", projected: 72000, actual: 72000, flagged: false },
	{ category: "Miscellaneous", projected: 104000, actual: 71200, flagged: false },
];

/* ─── Helpers ─── */

function formatInr(value: number) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);
}

function formatCompact(value: number) {
	if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
	if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
	return `₹${value}`;
}

function variancePct(projected: number, actual: number) {
	if (projected === 0) return 0;
	return ((actual - projected) / projected) * 100;
}

function varianceColor(pct: number) {
	if (pct > 5) return "#ef4444"; // red – over budget
	if (pct < -5) return "#22c55e"; // green – under budget (savings)
	return "#a3a3a3"; // neutral
}

function varianceBg(pct: number) {
	if (pct > 5) return "rgba(239,68,68,0.04)";
	if (pct < -5) return "rgba(34,197,94,0.04)";
	return "transparent";
}

/* ─── Animation preset matching CAC page ─── */
const fadeUp = {
	initial: { opacity: 0, y: 28 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

/* ─── Sub-components (CAC-style) ─── */

function SectionCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
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

function StatCard({ label, value, sub, accent, color }: { label: string; value: string; sub: string; accent?: boolean; color?: string }) {
	return (
		<div className={`relative rounded-xl border p-5 overflow-hidden ${accent ? "border-[#c9a55c]/20 bg-[#c9a55c]/[0.04]" : "border-white/[0.06] bg-black/40"}`}>
			<p className="text-[9px] uppercase tracking-[0.4em] text-white/60 font-medium">{label}</p>
			<p
				className="mt-2 text-xl font-semibold tracking-tight"
				style={{ color: accent ? "#c9a55c" : color || "#fff", fontFamily: "var(--font-benzin)" }}
			>
				{value}
			</p>
			<p className="text-[11px] text-white/50 mt-1">{sub}</p>
		</div>
	);
}

/* ─── Component ─── */

export default function VarianceTrackerPage() {
	const router = useRouter();
	const [activeView, setActiveView] = useState<"monthly" | "category">("monthly");
	const [hoveredBar, setHoveredBar] = useState<number | null>(null);
	const chartRef = useRef<HTMLDivElement>(null);
	const isChartInView = useInView(chartRef, { once: true, margin: "0px" });

	const recorded = VARIANCE_DATA.filter((r) => r.actual !== null) as Array<
		MonthRow & { actual: number }
	>;
	const totalProjected = recorded.reduce((s, r) => s + r.projected, 0);
	const totalActual = recorded.reduce((s, r) => s + r.actual, 0);
	const netVariance = totalActual - totalProjected;
	const netPct = variancePct(totalProjected, totalActual);

	const catTotalProjected = CATEGORY_BREAKDOWN.reduce((s, c) => s + c.projected, 0);
	const catTotalActual = CATEGORY_BREAKDOWN.reduce((s, c) => s + c.actual, 0);
	const flaggedCount = CATEGORY_BREAKDOWN.filter((c) => c.flagged).length;

	/* Cumulative variance line for recorded months */
	const cumulativeVariance = useMemo(() => {
		let cumProj = 0;
		let cumAct = 0;
		return recorded.map((r) => {
			cumProj += r.projected;
			cumAct += r.actual;
			return { label: r.label, pct: variancePct(cumProj, cumAct) };
		});
	}, [recorded]);

	/* Chart values for bar chart */
	const allValues = VARIANCE_DATA.map((r) => r.projected).concat(
		recorded.map((r) => r.actual)
	);
	const maxVal = Math.max(...allValues) * 1.15;

	return (
		<ProtectedRoute>
			<div className="relative min-h-screen bg-black text-white">
				<div className="relative z-10">
					{/* Header — CAC-style */}
					<header className="relative z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur-lg">
						<div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
							<button
								onClick={() => router.back()}
								className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white/90 transition-colors duration-200 tracking-wide"
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
								Back
							</button>
							<div className="text-center">
								<p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a55c]/90 font-medium">Boyar Partners · Expenditure</p>
								<h1
									className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight"
									style={{ fontFamily: "var(--font-benzin)" }}
								>
									Variance Tracker
								</h1>
							</div>
							<div className="w-20" />
						</div>
					</header>

					{/* Main */}
					<main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 space-y-10">

						{/* ─── Showcase Banner ─── */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="rounded-xl border border-[#c9a55c]/20 bg-gradient-to-r from-[#c9a55c]/[0.06] via-[#c9a55c]/[0.02] to-transparent p-6 sm:p-7"
						>
							<div className="flex gap-4">
								<div className="flex-shrink-0 mt-0.5">
									<div className="h-9 w-9 rounded-lg bg-[#c9a55c]/10 border border-[#c9a55c]/20 flex items-center justify-center">
										<svg className="h-4.5 w-4.5 text-[#c9a55c]" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center gap-3">
										<h3 className="text-[13px] font-semibold text-[#c9a55c] uppercase tracking-[0.15em]">Showcase Preview</h3>
										<span className="inline-flex items-center rounded-full bg-[#c9a55c]/10 border border-[#c9a55c]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#c9a55c]">
											Demo Data
										</span>
									</div>
									<p className="text-[13px] text-white/70 leading-[1.75] max-w-3xl">
										This is a showcase of the Variance Tracker module. Once live, this tool will allow investors to see the
										<span className="text-white/90 font-medium"> difference between projected spend and actual spend</span> — month by month and category by category —
										providing full transparency on budget adherence, cost overruns, and savings across every operational line item.
									</p>
									<p className="text-[11px] text-white/40">
										Data shown below is illustrative. Live accounting feeds will replace these figures once integrated.
									</p>
								</div>
							</div>
						</motion.div>

						{/* ─── KPI Row ─── */}
						<motion.section
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1 }}
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								<StatCard
									label="Total Projected (YTD)"
									value={formatInr(totalProjected)}
									sub={`${recorded.length} months recorded`}
									color="#3b82f6"
								/>
								<StatCard
									label="Total Actual (YTD)"
									value={formatInr(totalActual)}
									sub={`${VARIANCE_DATA.length - recorded.length} months pending`}
									color="#8b5cf6"
								/>
								<StatCard
									label="Net Variance"
									value={`${netVariance >= 0 ? "+" : ""}${formatInr(netVariance)}`}
									sub={`${netPct >= 0 ? "+" : ""}${netPct.toFixed(1)}% vs projected`}
									color={netPct > 0 ? "#ef4444" : "#22c55e"}
								/>
								<StatCard
									label="Exception Flags"
									value={`${flaggedCount} categories`}
									sub={flaggedCount > 0 ? "Exceeding ±5% threshold" : "All within range"}
									color={flaggedCount > 0 ? "#f59e0b" : "#22c55e"}
									accent={flaggedCount > 0}
								/>
							</div>
						</motion.section>

						{/* ─── Toggle ─── */}
						<div className="flex gap-2">
							{(["monthly", "category"] as const).map((view) => (
								<button
									key={view}
									onClick={() => setActiveView(view)}
									className="rounded-full px-6 py-2 text-[12px] font-medium transition-all duration-200 uppercase tracking-[0.1em]"
									style={{
										background:
											activeView === view
												? "rgba(201,165,92,0.12)"
												: "transparent",
										color:
											activeView === view
												? "#c9a55c"
												: "rgba(255,255,255,0.5)",
										border:
											activeView === view
												? "1px solid rgba(201,165,92,0.25)"
												: "1px solid rgba(255,255,255,0.06)",
									}}
								>
									{view === "monthly" ? "Monthly View" : "Category Breakdown"}
								</button>
							))}
						</div>

						{/* ────── MONTHLY VIEW ────── */}
						{activeView === "monthly" && (
							<motion.div
								key="monthly"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								className="space-y-10"
							>
								{/* Grouped bar chart */}
								<SectionCard title="Projected vs Actual" subtitle="Monthly expenditure comparison across all 12 months.">
									<div className="flex items-center justify-end gap-5 mb-6 text-[11px] text-white/60">
										<span className="flex items-center gap-2">
											<span
												className="inline-block w-3 h-3 rounded-sm"
												style={{ background: "#3b82f6" }}
											/>
											Projected
										</span>
										<span className="flex items-center gap-2">
											<span
												className="inline-block w-3 h-3 rounded-sm"
												style={{ background: "#8b5cf6" }}
											/>
											Actual
										</span>
									</div>

									<div ref={chartRef} className="overflow-x-auto -mx-2 px-2 pb-2">
										<div style={{ minWidth: 680 }}>
											{/* Y-axis labels + chart area */}
											<div className="flex">
												{/* Y-axis labels */}
												<div className="flex flex-col justify-between pr-3 py-1" style={{ height: 260 }}>
													{[1, 0.75, 0.5, 0.25, 0].map((t) => (
														<span key={t} className="text-[9px] text-white/30 tabular-nums text-right" style={{ fontFamily: "Inter, sans-serif", minWidth: 44 }}>
															{formatCompact(maxVal * t)}
														</span>
													))}
												</div>

												{/* Chart plot area */}
												<div className="flex-1 relative" style={{ height: 260 }}>
													{/* Grid lines */}
													{[0, 0.25, 0.5, 0.75, 1].map((t) => (
														<div
															key={t}
															className="absolute left-0 right-0"
															style={{
																bottom: `${t * 100}%`,
																height: "1px",
																background: t === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
															}}
														/>
													))}

													{/* Bar groups */}
													<div className="flex items-end h-full">
														{VARIANCE_DATA.map((row, i) => {
															const isFuture = row.actual === null;
															const projH = (row.projected / maxVal) * 100;
															const actH = row.actual !== null ? (row.actual / maxVal) * 100 : 0;

															return (
																<div
																	key={row.month}
																	className="flex-1 flex items-end justify-center relative"
																	style={{ height: "100%" }}
																	onMouseEnter={() => setHoveredBar(i)}
																	onMouseLeave={() => setHoveredBar(null)}
																>
																	{/* Tooltip */}
																	{hoveredBar === i && (
																		<motion.div
																			initial={{ opacity: 0, y: 4 }}
																			animate={{ opacity: 1, y: 0 }}
																			transition={{ duration: 0.15 }}
																			className="absolute z-30 rounded-lg border border-white/[0.1] bg-[#0a0a0a]/95 backdrop-blur-sm px-3.5 py-2.5 text-center shadow-2xl pointer-events-none"
																			style={{ bottom: `${Math.max(projH, actH) + 4}%`, minWidth: 130 }}
																		>
																			<p className="text-[11px] font-semibold text-white mb-1">{row.label}</p>
																			<p className="text-[10px] text-blue-400 tabular-nums">Proj: {formatInr(row.projected)}</p>
																			{!isFuture && (
																				<p className="text-[10px] text-purple-400 tabular-nums mt-0.5">Act: {formatInr(row.actual!)}</p>
																			)}
																		</motion.div>
																	)}

																	{/* Projected bar */}
																	<motion.div
																		className="rounded-t-[3px]"
																		style={{
																			width: isFuture ? 14 : 12,
																			marginRight: isFuture ? 0 : 2,
																			background: isFuture
																				? "rgba(59,130,246,0.25)"
																				: "linear-gradient(180deg, #60a5fa, #3b82f6)",
																		}}
																		initial={{ height: 0 }}
																		animate={{ height: isChartInView ? `${projH}%` : "0%" }}
																		transition={{
																			duration: 0.7,
																			delay: i * 0.04,
																			ease: [0.25, 0.46, 0.45, 0.94],
																		}}
																	/>
																	{/* Actual bar */}
																	{!isFuture && (
																		<motion.div
																			className="rounded-t-[3px]"
																			style={{
																				width: 12,
																				background: "linear-gradient(180deg, #a78bfa, #8b5cf6)",
																			}}
																			initial={{ height: 0 }}
																			animate={{ height: isChartInView ? `${actH}%` : "0%" }}
																			transition={{
																				duration: 0.7,
																				delay: i * 0.04 + 0.1,
																				ease: [0.25, 0.46, 0.45, 0.94],
																			}}
																		/>
																	)}
																</div>
															);
														})}
													</div>
												</div>
											</div>

											{/* X-axis labels */}
											<div className="flex" style={{ paddingLeft: 47 }}>
												{VARIANCE_DATA.map((row) => {
													const isFuture = row.actual === null;
													return (
														<div key={row.month} className="flex-1 text-center pt-2">
															{isFuture && (
																<span className="block text-[7px] text-white/15 uppercase tracking-wider leading-none mb-0.5">est.</span>
															)}
															<span
																className="text-[10px] tabular-nums"
																style={{
																	color: isFuture ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)",
																	fontFamily: "Inter, sans-serif",
																}}
															>
																{row.label.split(" ")[0]}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</SectionCard>

								{/* Cumulative variance trend */}
								{cumulativeVariance.length > 1 && (
									<SectionCard title="Tracking Accuracy" subtitle="Cumulative variance trend across recorded months.">
										<div className="flex items-end gap-4 h-36">
											{cumulativeVariance.map((cv, i) => {
												const absPct = Math.abs(cv.pct);
												const barHeight = Math.max(
													absPct * 10,
													8
												);
												return (
													<motion.div
														key={cv.label}
														initial={{ height: 0, opacity: 0 }}
														animate={{
															height: barHeight,
															opacity: 1,
														}}
														transition={{
															duration: 0.5,
															delay: i * 0.08,
														}}
														className="flex-1 rounded-t-md relative group"
														style={{
															background: `linear-gradient(180deg, ${varianceColor(cv.pct)}, ${varianceColor(cv.pct)}88)`,
															opacity: 0.7,
															minWidth: 40,
														}}
													>
														<div
															className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap tabular-nums"
															style={{ color: varianceColor(cv.pct) }}
														>
															{cv.pct >= 0 ? "+" : ""}
															{cv.pct.toFixed(1)}%
														</div>
														<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/40 whitespace-nowrap">
															{cv.label.split(" ")[0]}
														</div>
													</motion.div>
												);
											})}
										</div>
										<div className="mt-10 pt-4 border-t border-white/[0.04] text-[11px] text-white/30 text-center flex items-center justify-center gap-6">
											<span className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm bg-[#22c55e]" /> Under budget</span>
											<span className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm bg-[#ef4444]" /> Over budget</span>
											<span className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm bg-[#a3a3a3]" /> Within ±5%</span>
										</div>
									</SectionCard>
								)}

								{/* Monthly table */}
								<SectionCard title="Month-by-Month Breakdown" subtitle="Granular view of projected spend vs actual recorded expenditure.">
									<div className="overflow-x-auto rounded-xl border border-white/[0.06]">
										<table className="w-full text-[13px]">
											<thead>
												<tr className="border-b border-white/[0.06] bg-white/[0.02]">
													<th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">Month</th>
													<th className="px-5 py-3.5 text-right text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
														Projected
													</th>
													<th className="px-5 py-3.5 text-right text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
														Actual
													</th>
													<th className="px-5 py-3.5 text-right text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
														Variance
													</th>
													<th className="px-5 py-3.5 text-right text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">%</th>
												</tr>
											</thead>
											<tbody>
												{VARIANCE_DATA.map((row, i) => {
													const isFuture = row.actual === null;
													const diff = isFuture
														? 0
														: row.actual! - row.projected;
													const pct = isFuture
														? 0
														: variancePct(
																row.projected,
																row.actual!
															);
													return (
														<motion.tr
															key={row.month}
															initial={{
																opacity: 0,
																x: -8,
															}}
															animate={{
																opacity: 1,
																x: 0,
															}}
															transition={{
																duration: 0.3,
																delay: i * 0.03,
															}}
															className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
															style={{
																background: isFuture
																	? "transparent"
																	: varianceBg(pct),
															}}
														>
															<td className="px-5 py-3.5 text-white/80 font-medium">
																{row.label}
																{isFuture && (
																	<span className="ml-2 text-[10px] text-white/25 uppercase tracking-wider">
																		upcoming
																	</span>
																)}
															</td>
															<td className="px-5 py-3.5 text-right text-white/60 tabular-nums">
																{formatInr(row.projected)}
															</td>
															<td className="px-5 py-3.5 text-right tabular-nums"
																style={{
																	color: isFuture
																		? "rgba(255,255,255,0.2)"
																		: "rgba(255,255,255,0.8)",
																}}
															>
																{isFuture
																	? "—"
																	: formatInr(row.actual!)}
															</td>
															<td
																className="px-5 py-3.5 text-right tabular-nums font-medium"
																style={{
																	color: isFuture
																		? "rgba(255,255,255,0.15)"
																		: varianceColor(pct),
																}}
															>
																{isFuture
																	? "—"
																	: `${diff >= 0 ? "+" : ""}${formatInr(diff)}`}
															</td>
															<td
																className="px-5 py-3.5 text-right tabular-nums font-medium"
																style={{
																	color: isFuture
																		? "rgba(255,255,255,0.15)"
																		: varianceColor(pct),
																}}
															>
																{isFuture
																	? "—"
																	: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`}
															</td>
														</motion.tr>
													);
												})}
											</tbody>
											<tfoot>
												<tr className="border-t border-white/[0.08] font-semibold bg-white/[0.02]">
													<td className="px-5 py-4 text-white">
														Total (recorded)
													</td>
													<td className="px-5 py-4 text-right text-blue-400 tabular-nums">
														{formatInr(totalProjected)}
													</td>
													<td className="px-5 py-4 text-right text-purple-400 tabular-nums">
														{formatInr(totalActual)}
													</td>
													<td
														className="px-5 py-4 text-right tabular-nums"
														style={{
															color: varianceColor(netPct),
														}}
													>
														{netVariance >= 0 ? "+" : ""}
														{formatInr(netVariance)}
													</td>
													<td
														className="px-5 py-4 text-right tabular-nums"
														style={{
															color: varianceColor(netPct),
														}}
													>
														{netPct >= 0 ? "+" : ""}
														{netPct.toFixed(1)}%
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
								</SectionCard>
							</motion.div>
						)}

						{/* ────── CATEGORY VIEW ────── */}
						{activeView === "category" && (
							<motion.div
								key="category"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								className="space-y-10"
							>
								{/* Category summary */}
								<SectionCard title="Category-Level Variance" subtitle="Cumulative Jan – Mar 2026 spend by operational category.">
									<div className="flex items-center justify-end mb-6">
										<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] text-amber-400 font-medium">
											<svg
												width="12"
												height="12"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2.5"
												strokeLinecap="round"
											>
												<path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{flaggedCount} flagged
										</span>
									</div>

									<div className="space-y-3">
										{CATEGORY_BREAKDOWN.map((cat, i) => {
											const pct = variancePct(
												cat.projected,
												cat.actual
											);
											const diff = cat.actual - cat.projected;
											const barRatio = cat.actual / catTotalActual;

											return (
												<motion.div
													key={cat.category}
													initial={{ opacity: 0, x: -12 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														duration: 0.3,
														delay: i * 0.04,
													}}
													className="rounded-xl border p-4 transition-colors hover:bg-white/[0.01]"
													style={{
														borderColor: cat.flagged
															? "rgba(245,158,11,0.25)"
															: "rgba(255,255,255,0.06)",
														background: cat.flagged
															? "rgba(245,158,11,0.04)"
															: "rgba(255,255,255,0.02)",
													}}
												>
													<div className="flex items-center justify-between mb-2">
														<div className="flex items-center gap-2">
															<span className="text-[13px] font-medium text-white/90">
																{cat.category}
															</span>
															{cat.flagged && (
																<span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 rounded px-1.5 py-0.5">
																	Exception
																</span>
															)}
														</div>
														<span
															className="text-[13px] font-semibold tabular-nums"
															style={{
																color: varianceColor(pct),
															}}
														>
															{pct >= 0 ? "+" : ""}
															{pct.toFixed(1)}%
														</span>
													</div>

													{/* Bar */}
													<div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-2">
														<motion.div
															initial={{ width: 0 }}
															animate={{
																width: `${barRatio * 100}%`,
															}}
															transition={{
																duration: 0.6,
																delay: i * 0.04,
																ease: [0.16, 1, 0.3, 1],
															}}
															className="h-full rounded-full"
															style={{
																background:
																	cat.flagged
																		? "linear-gradient(90deg, #f59e0b, #d97706)"
																		: "linear-gradient(90deg, #c9a55c, #e8d5a3)",
																opacity: 0.7,
															}}
														/>
													</div>

													<div className="flex justify-between text-[11px] text-white/40 tabular-nums">
														<span>
															Projected:{" "}
															{formatInr(cat.projected)}
														</span>
														<span>
															Actual:{" "}
															{formatInr(cat.actual)}
														</span>
														<span
															style={{
																color: varianceColor(pct),
															}}
														>
															{diff >= 0 ? "+" : ""}
															{formatInr(diff)}
														</span>
													</div>
												</motion.div>
											);
										})}
									</div>

									{/* Category totals */}
									<div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
										<span className="text-[13px] text-white/60 font-medium">
											Total across categories
										</span>
										<div className="flex gap-6 text-[13px] tabular-nums">
											<span className="text-blue-400">
												{formatInr(catTotalProjected)}
											</span>
											<span className="text-purple-400">
												{formatInr(catTotalActual)}
											</span>
											<span
												style={{
													color: varianceColor(
														variancePct(
															catTotalProjected,
															catTotalActual
														)
													),
												}}
												className="font-semibold"
											>
												{variancePct(catTotalProjected, catTotalActual) >= 0
													? "+"
													: ""}
												{variancePct(
													catTotalProjected,
													catTotalActual
												).toFixed(1)}
												%
											</span>
										</div>
									</div>
								</SectionCard>

								{/* Info callout — CAC style */}
								<motion.div
									className="rounded-xl border border-[#c9a55c]/15 bg-[#c9a55c]/[0.03] p-6"
									{...fadeUp}
								>
									<div className="flex gap-4">
										<div className="flex-shrink-0 mt-0.5">
											<div className="h-8 w-8 rounded-lg bg-[#c9a55c]/10 border border-[#c9a55c]/20 flex items-center justify-center">
												<svg
													className="h-4 w-4 text-[#c9a55c]"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1.5}
														d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
										</div>
										<div>
											<p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a55c]/80 font-medium">Methodology</p>
											<p className="text-[13px] text-white/70 mt-2 leading-[1.75]">
												Exception flags are raised when any category exceeds a ±5% variance threshold
												from projected spend. Categories with flags should be reviewed for budget
												reallocation or scope adjustment.
											</p>
											<p className="text-[11px] text-white/40 mt-2">
												Data shown is example-only until connected to live accounting feeds.
											</p>
										</div>
									</div>
								</motion.div>
							</motion.div>
						)}

						{/* ─── Closing CTA — CAC style ─── */}
						<motion.section
							className="rounded-xl border border-[#c9a55c]/20 bg-gradient-to-b from-[#c9a55c]/[0.04] to-transparent p-8 text-center"
							{...fadeUp}
						>
							<p className="text-[10px] uppercase tracking-[0.6em] text-[#c9a55c]/80 font-medium">Financial Transparency</p>
							<h3
								className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight"
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Projected → Tracked → Reconciled
							</h3>
							<p className="mt-4 text-white/70 text-[13px] max-w-2xl mx-auto leading-[1.75]">
								The Variance Tracker ensures every rupee deployed is measured against its projection. Once live, real-time
								feeds will power automated exception flagging, category-level reconciliation, and investor-grade reporting
								with zero ambiguity on budget adherence.
							</p>
						</motion.section>
					</main>
				</div>
			</div>
		</ProtectedRoute>
	);
}
