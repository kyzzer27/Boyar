/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface CategoryAllocation {
	name: string;
	inr: number;
	usd: number;
	color: string;
	description: string;
	includes?: string[];
}

const EXCHANGE_RATE = 91;

// Must match segments in app/expenditure/monthly-cost/year-summary/page.tsx
const CATEGORY_DATA: CategoryAllocation[] = [
	{
		name: "Marketing & Growth (Paid Ads)",
		inr: 1560000,
		usd: 17143,
		color: "#3B82F6",
		description:
			"Seasonally diversified paid advertising across the full year (Jan–Dec 2026). Higher intensity during high-intent months (Jan, Mar, Sep–Nov) and lower during optimisation months (Apr–Jul). Marketing spend is best treated as a performance-linked growth lever, deployed selectively during periods of heightened decision-making.",
	},
	{
		name: "Core Operations (Recurring OPEX)",
		inr: 1759200,
		usd: 19332,
		color: "#10B981",
		description:
			"12-month cumulative of a lean, outsourced operating model with controlled fixed costs. Includes software stack, office rent, laptop rentals, content production, social media manager, and contingency reserve. Highly flexible and reversible, reducing downside risk during demand fluctuations.",
		includes: [
			"Software & Tools (₹22,600/mo)",
			"Office Rent (₹40,000/mo)",
			"Laptop Rentals (₹14,000/mo)",
			"Content Production (₹30,000/mo)",
			"Social Media Manager (₹20,000/mo)",
			"Contingency Reserve (₹20,000/mo)",
		],
	},
	{
		name: "One-Time Setup & Credibility (CAPEX)",
		inr: 917000,
		usd: 10077,
		color: "#F59E0B",
		description:
			"Front-loaded, non-recurring investments to establish regulatory legitimacy, professional execution capability, and client trust. Includes FCA licensing, Indian company incorporation, tech devices, website, and brand collateral. No vanity or asset-heavy CAPEX incurred.",
		includes: [
			"Licensing & Legal (₹6,10,000)",
			"Tech Devices (₹1,92,000)",
			"Website (₹80,000)",
			"Visiting Cards (₹35,000)",
		],
	},
];

const MONTHLY_SPEND = [
	{ month: "January", inr: 1243600 },
	{ month: "February", inr: 276600 },
	{ month: "March", inr: 296600 },
	{ month: "April", inr: 256600 },
	{ month: "May", inr: 261600 },
	{ month: "June", inr: 251600 },
	{ month: "July", inr: 246600 },
	{ month: "August", inr: 276600 },
	{ month: "September", inr: 286600 },
	{ month: "October", inr: 296600 },
	{ month: "November", inr: 276600 },
	{ month: "December", inr: 266600 },
] as const;

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

export default function CategoryWiseSpendAllocation() {
	const router = useRouter();
	const [pieProgress, setPieProgress] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const totalInr = CATEGORY_DATA.reduce((sum, c) => sum + c.inr, 0);
	const totalUsd = CATEGORY_DATA.reduce((sum, c) => sum + c.usd, 0);
	const TOTAL_CLIENTS = 16;
	const TOTAL_REVENUE_USD = 111900;
	const FX_RATE = 91;
	const costPerClientInr = Math.round(totalInr / TOTAL_CLIENTS);
	const costPerClientUsd = Math.round(costPerClientInr / FX_RATE);
	const revenuePerClientUsd = Math.round(TOTAL_REVENUE_USD / TOTAL_CLIENTS);
	const revenuePerClientInr = revenuePerClientUsd * FX_RATE;
	const revenueCostRatio = (
		revenuePerClientUsd / costPerClientUsd
	).toFixed(1);
	const capexInr =
		CATEGORY_DATA.find(
			(c) => c.name.includes("CAPEX") || c.name.includes("One-Time")
		)?.inr ?? 0;
	const opexInr = totalInr - capexInr;
	const capexPct = Math.round((capexInr / totalInr) * 100);
	const opexPct = 100 - capexPct;

	const monthlyTotalInr = MONTHLY_SPEND.reduce((sum, m) => sum + m.inr, 0);

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

	const pieSlices = useMemo(() => {
		let currentAngle = -90;
		return CATEGORY_DATA.map((category) => {
			const percentageValue = (category.inr / totalInr) * 100;
			const angle = percentageValue * 3.6;
			const startAngle = currentAngle;
			const endAngle = currentAngle + angle;
			currentAngle += angle;
			return {
				...category,
				startAngle,
				endAngle,
				percentage: percentageValue,
				largeArcFlag: angle > 180 ? 1 : 0,
			};
		});
	}, [totalInr]);

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

	function getPath(
		radius: number,
		startAngle: number,
		endAngle: number,
		largeArcFlag: number
	) {
		const start = polarToCartesian(0, 0, radius, endAngle);
		const end = polarToCartesian(0, 0, radius, startAngle);
		return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
	}

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-black text-white'>
				<CircularBackground />

				<header className='relative z-10 border-b border-white/10 bg-black/90'>
					<div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8'>
						<button
							onClick={() => router.back()}
							className='text-sm text-white/70 hover:text-white transition'
						>
							← Back to Expenditure
						</button>
						<div className='text-center flex-1'>
							<p className='text-xs uppercase tracking-[0.3em] text-white/60'>
								Boyar Partners · Annual Expenditure
							</p>
							<h1
								className='mt-1 text-xl sm:text-2xl font-medium text-white'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Category-Wise Spend Allocation (Jan–Dec 2026)
							</h1>
						</div>
						<div className='text-right text-xs text-white/60'>
							<p>Exchange Rate: 1 USD = 91 INR</p>
							<p>Total Capital Deployed: {formatInr(totalInr)}</p>
						</div>
					</div>
				</header>

				<main className='relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10'>
					{/* Overview Section */}
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className='rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8  shadow-xl'
					>
						<div className='grid gap-6 md:grid-cols-[1.6fr,1.1fr]'>
							<div className='space-y-4 text-sm sm:text-base leading-relaxed text-white/80'>
								<p className='text-white/80'>
									The allocation reflects a growth-forward yet
									capital-disciplined advisory model, consistent with best
									practices observed in boutique professional services firms and
									fiduciary advisory platforms, where credibility and client
									acquisition precede scale efficiency. Early-stage advisory
									firms typically allocate 40–50% of deployable capital to
									acquisition and visibility, while maintaining a lean operating
									core to preserve runway.
								</p>
								<p className='text-white/80'>
									This spending framework demonstrates capital maturity—spend
									aligned to intent, not habit—alongside strong downside
									protection through flexible cost structures and substantial
									runway optionality. The structure enables rapid burn reduction
									if required, scaling without proportional cost increase, and
									strong runway protection.
								</p>
							</div>
							<div className='grid gap-3 text-sm sm:grid-cols-3'>
								<div className='rounded-2xl border border-white/10 bg-black/40 p-4'>
									<p className='text-xs uppercase tracking-[0.3em] text-white/60'>
										Total Capital Deployed
									</p>
									<p
										className='mt-2 text-2xl font-semibold text-white'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										{formatInr(totalInr)}
									</p>
									<p className='text-xs text-white/60'>{formatUsd(totalUsd)}</p>
								</div>
								<div className='rounded-2xl border border-white/10 bg-black/40 p-4'>
									<p className='text-xs uppercase tracking-[0.3em] text-white/60'>
										Allocation Strategy
									</p>
									<p className='mt-2 text-sm text-white/80'>
										Growth-forward yet capital-disciplined, with a balanced
										split between acquisition, operating core, and credibility
										CAPEX. Majority of the cost base remains flexible and can
										be moderated quickly if required.
									</p>
								</div>
								<div className='rounded-2xl border border-white/10 bg-black/40 p-4'>
									<p className='text-xs uppercase tracking-[0.3em] text-white/60'>
										CAPEX : OPEX Ratio
									</p>
									<p
										className='mt-2 text-2xl font-semibold text-white'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										{capexPct}% : {opexPct}%
									</p>
									<p className='mt-1 text-xs text-white/60'>
										Low capital intensity — scales through operating leverage,
										not asset investment.
									</p>
								</div>
							</div>
						</div>
					</motion.section>

					{/* Unit Cost Per Client Bridge */}
					<motion.section
						className="rounded-2xl border border-white/10 bg-black/40 p-5"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						<div className="grid gap-4 sm:grid-cols-3">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-white/60">
									Total Cost Per Client
								</p>
								<p
									className="mt-1 text-xl font-semibold text-white"
									style={{ fontFamily: "var(--font-benzin)" }}
								>
									{formatInr(costPerClientInr)}
								</p>
								<p className="text-xs text-white/50">{formatUsd(costPerClientUsd)}</p>
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-white/60">
									Avg Revenue Per Client
								</p>
								<p
									className="mt-1 text-xl font-semibold text-emerald-400"
									style={{ fontFamily: "var(--font-benzin)" }}
								>
									{formatInr(revenuePerClientInr)}
								</p>
								<p className="text-xs text-white/50">{formatUsd(revenuePerClientUsd)}</p>
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-white/60">
									Revenue / Cost Ratio
								</p>
								<p
									className="mt-1 text-xl font-semibold text-white"
									style={{ fontFamily: "var(--font-benzin)" }}
								>
									{revenueCostRatio}x
								</p>
								<p className="text-xs text-white/50">
									Revenue exceeds total operating cost
								</p>
							</div>
						</div>
						<p className="mt-3 text-xs text-white/50">
							Total Year 1 expenditure ({formatInr(totalInr)}) divided by 16
							projected clients. Average revenue per client exceeds total
							operating cost per client — confirming positive economics at the
							operating level.
						</p>
					</motion.section>

					{/* Charts Row */}
					<section className='grid gap-8 lg:grid-cols-[1.2fr,1.1fr]'>
						{/* Pie Chart */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.05 }}
							className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '
						>
							<h2
								className='text-lg sm:text-xl font-semibold text-white mb-1'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Category-Wise Spend Allocation
							</h2>
							<p className='text-xs text-white/60 mb-6'>
								Annual-level allocation of {formatInr(totalInr)} capital across
								three major categories.
							</p>
							<div className='flex flex-col items-center gap-6 md:flex-row md:items-start'>
								<div className='relative mx-auto h-64 w-64 flex-shrink-0'>
									<div className='h-full w-full flex items-center justify-center'>
										<svg
											width='256'
											height='256'
											viewBox='-110 -110 220 220'
											className='h-full w-full'
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
															stroke='#000'
															strokeWidth={2}
															initial={{
																opacity: 0,
																scale: 0.92,
																transformOrigin: "0 0",
															}}
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
									<div className='pointer-events-none absolute inset-10 rounded-full bg-black/90 flex flex-col items-center justify-center text-center'>
										<p className='text-[10px] uppercase tracking-[0.4em] text-white/50'>
											Jan–Dec 2026
										</p>
										<p
											className='mt-1 text-sm font-semibold text-white'
											style={{ fontFamily: "var(--font-benzin)" }}
										>
											Spend Mix
										</p>
									</div>
								</div>
								<div className='flex-1 space-y-2 text-xs sm:text-sm'>
									{pieSlices.map((slice) => (
										<div
											key={slice.name}
											className='flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 cursor-pointer transition-all hover:bg-white/10'
											onMouseEnter={() =>
												setHoveredIndex(
													CATEGORY_DATA.indexOf(
														CATEGORY_DATA.find((c) => c.name === slice.name) ||
															CATEGORY_DATA[0]
													)
												)
											}
											onMouseLeave={() => setHoveredIndex(null)}
										>
											<div className='flex items-center gap-2'>
												<span
													className='h-2.5 w-2.5 rounded-full flex-shrink-0'
													style={{ backgroundColor: slice.color }}
												/>
												<span className='text-white/80'>{slice.name}</span>
											</div>
											<div className='text-right flex-shrink-0'>
												<p className='text-xs text-white/70'>
													{slice.percentage.toFixed(1)}%
												</p>
												<p className='text-[11px] text-white/50'>
													{formatInr(slice.inr)}
												</p>
											</div>
										</div>
									))}
									{hoveredIndex !== null && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											className='mt-3 rounded-2xl border border-white/15 bg-black/80 p-3 text-[11px] sm:text-xs text-white/80'
										>
											<p
												className='mb-1 font-semibold'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												{CATEGORY_DATA[hoveredIndex].name}
											</p>
											<p>{CATEGORY_DATA[hoveredIndex].description}</p>
										</motion.div>
									)}
								</div>
							</div>
						</motion.div>

						{/* Key Metrics */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1 }}
							className='space-y-3'
						>
							<div className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '>
								<h3
									className='text-lg sm:text-xl font-semibold text-white mb-4'
									style={{ fontFamily: "var(--font-benzin)" }}
								>
									Structural Insights
								</h3>
								<div className='space-y-3'>
									<div className='rounded-xl border border-white/10 bg-white/5 p-3'>
										<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-2'>
											Growth vs Non-Growth
										</p>
										<div className='grid grid-cols-2 gap-2'>
											<div className='text-left'>
												<p className='text-2xl font-bold text-blue-400'>
													{((CATEGORY_DATA[0].inr / totalInr) * 100).toFixed(1)}%
												</p>
												<p className='text-[10px] text-white/60'>
													Growth (Marketing)
												</p>
											</div>
											<div className='text-left'>
												<p className='text-2xl font-bold text-green-400'>
													{(
														((CATEGORY_DATA[1].inr + CATEGORY_DATA[2].inr) /
															totalInr) *
														100
													).toFixed(1)}
													%
												</p>
												<p className='text-[10px] text-white/60'>
													Operations + Setup
												</p>
											</div>
										</div>
									</div>

									<div className='rounded-xl border border-white/10 bg-white/5 p-3'>
										<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-2'>
											CAPEX : OPEX Ratio
										</p>
										<div className='grid grid-cols-2 gap-2'>
											<div className='text-left'>
												<p className='text-2xl font-bold text-orange-400'>
													{((CATEGORY_DATA[2].inr / totalInr) * 100).toFixed(1)}%
												</p>
												<p className='text-[10px] text-white/60'>CAPEX</p>
											</div>
											<div className='text-left'>
												<p className='text-2xl font-bold text-emerald-400'>
													{(
														((CATEGORY_DATA[0].inr + CATEGORY_DATA[1].inr) /
															totalInr) *
														100
													).toFixed(1)}
													%
												</p>
												<p className='text-[10px] text-white/60'>
													OPEX + Marketing
												</p>
											</div>
										</div>
									</div>

									<div className='rounded-xl border border-white/10 bg-white/5 p-3'>
										<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-2'>
											Cost Flexibility Mix
										</p>
										<div className='space-y-2'>
											<div className='flex items-center gap-2'>
												<div
													className='h-1 flex-1 rounded-full bg-gradient-to-r from-green-500 to-green-600'
													style={{ width: "65%" }}
												></div>
												<p className='text-[10px] text-white/60'>
													Flexible 65%
												</p>
											</div>
											<div className='flex items-center gap-2'>
												<div
													className='h-1 flex-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600'
													style={{ width: "22%" }}
												></div>
												<p className='text-[10px] text-white/60'>
													Semi-Fixed 22%
												</p>
											</div>
											<div className='flex items-center gap-2'>
												<div
													className='h-1 flex-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-600'
													style={{ width: "13%" }}
												></div>
												<p className='text-[10px] text-white/60'>
													Non-Recurring 13%
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Category-Wise Spend Table */}
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
						className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '
					>
						<h2
							className='text-lg sm:text-xl font-semibold text-white mb-4'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Annual (Jan–Dec 2026) — Category-Wise Spend Table
						</h2>
						<div className='overflow-x-auto rounded-2xl border border-white/10'>
							<table className='w-full text-xs sm:text-sm'>
								<thead className='bg-white/5 text-white/60'>
									<tr>
										<th className='px-4 py-3 text-left font-medium'>
											Category
										</th>
										<th className='px-4 py-3 text-right font-medium'>INR</th>
										<th className='px-4 py-3 text-right font-medium'>USD</th>
										<th className='px-4 py-3 text-right font-medium'>
											% of Total
										</th>
									</tr>
								</thead>
								<tbody>
									{CATEGORY_DATA.map((category) => (
										<tr
											key={category.name}
											className='border-t border-white/10 text-white/80 hover:bg-white/5 transition-colors'
										>
											<td className='px-4 py-3'>
												<div className='flex items-center gap-2'>
													<span
														className='h-2.5 w-2.5 rounded-full flex-shrink-0'
														style={{ backgroundColor: category.color }}
													/>
													<span>{category.name}</span>
												</div>
											</td>
											<td className='px-4 py-3 text-right font-mono'>
												{formatInr(category.inr)}
											</td>
											<td className='px-4 py-3 text-right font-mono'>
												{formatUsd(category.usd)}
											</td>
											<td className='px-4 py-3 text-right'>
												<span className='inline-block bg-white/10 rounded px-2 py-1'>
													{((category.inr / totalInr) * 100).toFixed(1)}%
												</span>
											</td>
										</tr>
									))}
									<tr className='border-t border-white/10 text-white font-semibold bg-white/10'>
										<td className='px-4 py-3'>Total (Annual 2026)</td>
										<td className='px-4 py-3 text-right font-mono'>
											{formatInr(totalInr)}
										</td>
										<td className='px-4 py-3 text-right font-mono'>
											{formatUsd(totalUsd)}
										</td>
										<td className='px-4 py-3 text-right'>
											<span className='inline-block bg-white/20 rounded px-2 py-1'>
												100.0%
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p className='text-xs text-white/60 mt-4 leading-relaxed'>
							This table presents the annual allocation across all twelve months
							(January–December 2026) consolidated at the category level. Each
							category&apos;s spend remains constant throughout the year as per
							the baseline framework. The allocation reflects capital deployment
							aligned to growth intent (Marketing), operational resilience
							(Core Operations), and credibility infrastructure (CAPEX), with
							percentages directly reflecting the live category allocation
							above.
						</p>
					</motion.section>

					{/* Monthly Breakdown 2026 */}
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.25 }}
						className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '
					>
						<h2
							className='text-lg sm:text-xl font-semibold text-white mb-4'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Monthly Spend Projection (Jan–Dec 2026)
						</h2>
						<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
							{MONTHLY_SPEND.map((item) => (
								<div
									key={item.month}
									className='rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors'
								>
									<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-2'>
										{item.month}
									</p>
									<p className='text-sm font-mono text-white/90'>
										{formatInr(item.inr)}
									</p>
									<p className='text-xs font-mono text-white/60'>
										{formatUsd(item.inr / EXCHANGE_RATE)}
									</p>
								</div>
							))}
						</div>

						<div className='mt-6 rounded-2xl border border-white/15 bg-white/10 p-4'>
							<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-3'>
								Annual Total (12 Months)
							</p>
							<div className='grid gap-4 sm:grid-cols-3'>
								<div>
									<p className='text-xs text-white/70 mb-1'>Total INR</p>
									<p
										className='text-2xl sm:text-3xl font-bold text-blue-400'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										{formatInr(monthlyTotalInr)}
									</p>
								</div>
								<div>
									<p className='text-xs text-white/70 mb-1'>Total USD</p>
									<p
										className='text-2xl sm:text-3xl font-bold text-emerald-400'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										{formatUsd(monthlyTotalInr / EXCHANGE_RATE)}
									</p>
								</div>
								<div>
									<p className='text-xs text-white/70 mb-1'>Exchange Rate</p>
									<p
										className='text-2xl sm:text-3xl font-bold text-amber-400'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										1 USD = 91 INR
									</p>
								</div>
							</div>
						</div>

						<p className='text-xs text-white/60 mt-4 leading-relaxed'>
							Monthly spend varies throughout 2026 based on strategic timing and
							seasonal demand cycles. January includes significant one-time
							setup costs (₹12,43,600), while subsequent months reflect
							steady-state operations (₹2,46,600–₹2,96,600). Higher marketing
							spend occurs during high-intent months (January, March,
							August–November), while lower spend months focus on optimisation
							and efficiency (April–July). Total annual expenditure is aligned
							with the consolidated Year‑1 view and reconciles to the same
							{formatInr(totalInr)} baseline used in the burn‑rate and monthly
							cost modules.
						</p>
					</motion.section>

					{/* Detailed Breakdown Sections */}
					<section className='space-y-6'>
						{CATEGORY_DATA.map((category, idx) => (
							<motion.div
								key={category.name}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
								className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '
							>
								<div className='flex items-start gap-4 mb-4'>
									<div
										className='h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center'
										style={{
											backgroundColor: `${category.color}20`,
											borderColor: category.color,
											borderWidth: "2px",
										}}
									>
										<div
											className='h-8 w-8 rounded-lg'
											style={{ backgroundColor: category.color, opacity: 0.7 }}
										/>
									</div>
									<div className='flex-1'>
										<h3
											className='text-lg sm:text-xl font-semibold text-white'
											style={{ fontFamily: "var(--font-benzin)" }}
										>
											{category.name}
										</h3>
										<p className='text-xs text-white/60 mt-1'>
											{formatInr(category.inr)} • {formatUsd(category.usd)}
										</p>
									</div>
									<div className='text-right text-lg sm:text-2xl font-bold text-white'>
										{((category.inr / totalInr) * 100).toFixed(1)}%
									</div>
								</div>

								<p className='text-sm text-white/80 leading-relaxed mb-4'>
									{category.description}
								</p>

								{category.includes && (
									<div className='mt-4 pt-4 border-t border-white/10'>
										<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-3'>
											Sub-Allocations
										</p>
										<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
											{category.includes.map((item) => (
												<div
													key={item}
													className='rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70'
												>
													{item}
												</div>
											))}
										</div>
									</div>
								)}
							</motion.div>
						))}
					</section>

					{/* IC-Level Interpretation */}
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.45 }}
						className='rounded-3xl border border-white/10 bg-black/80 p-6 sm:p-8 '
					>
						<h3
							className='text-lg sm:text-xl font-semibold text-white mb-4'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							How an Investment Committee Reads This
						</h3>
						<div className='grid gap-4 sm:grid-cols-2'>
							{[
								{
									label: "Capital Maturity",
									description:
										"Spend aligned to intent, not habit. Intent-aligned growth strategy.",
								},
								{
									label: "Downside Protection",
									description:
										"No structural cost traps. Highly flexible 65% cost base.",
								},
								{
									label: "Operating Leverage",
									description:
										"Revenue can scale faster than costs. Minimal headcount leverage.",
								},
								{
									label: "Runway Resilience",
									description:
										"Over 50% capital preserved post Year-1. Strong contingency reserves.",
								},
							].map((item, i) => (
								<div
									key={i}
									className='rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all'
								>
									<p className='text-xs uppercase tracking-[0.2em] text-white/60 mb-2'>
										{item.label}
									</p>
									<p className='text-sm text-white/80'>{item.description}</p>
								</div>
							))}
						</div>
					</motion.section>

					{/* Board-Level Summary */}
					<motion.section
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.5 }}
						className='rounded-3xl border border-white/10 bg-white/10 p-6 sm:p-8 '
					>
						<h3
							className='text-lg sm:text-xl font-semibold text-white mb-4'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Board-Level Closing Summary
						</h3>
						<p className='text-sm leading-relaxed text-white/90'>
							The category-wise spend allocation reflects a disciplined,
							capital-efficient advisory platform. Growth spend is
							intent-aligned and reversible, operating costs are lean and
							largely outsourced, and CAPEX is restricted to
							credibility-critical investments. The resulting structure offers
							strong downside protection, positive operating leverage, and
							substantial runway optionality. This approach balances growth
							momentum with disciplined capital allocation, consistent with
							institutional best practices for early-stage professional services
							firms.
						</p>
					</motion.section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
