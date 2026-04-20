/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";

interface ServiceItem {
	num: string;
	title: string;
	definition: string;
	purpose: string;
}

interface ServiceCategory {
	section: string;
	items: ServiceItem[];
}

const insuranceServices: ServiceCategory[] = [
	{
		section: "Insurance Products",
		items: [
			{
				num: "01",
				title: "Life Insurance Planning",
				definition: "Comprehensive life coverage strategies",
				purpose:
					"Tailored life insurance solutions designed to protect your family and business interests, with coverage analysis and optimization for tax efficiency.",
			},
			{
				num: "02",
				title: "Disability Insurance",
				definition: "Income protection during inability to work",
				purpose:
					"Long-term and short-term disability coverage ensuring financial stability if you cannot work, integrated with overall income protection strategy.",
			},
			{
				num: "03",
				title: "Long-Term Care Insurance",
				definition: "Protection against extended care costs",
				purpose:
					"Coverage for potential long-term care expenses, preserving assets and reducing burden on family members during extended care needs.",
			},
			{
				num: "04",
				title: "Umbrella Liability Coverage",
				definition: "Enhanced liability protection",
				purpose:
					"Additional liability layer protecting personal assets beyond standard homeowner and auto policies, critical for high-net-worth individuals.",
			},
			{
				num: "05",
				title: "Property & Casualty Insurance",
				definition: "Complete property protection coverage",
				purpose:
					"Comprehensive coverage for real estate, collectibles, and valuables with appropriate limits and deductibles aligned to your asset profile.",
			},
			{
				num: "06",
				title: "Annuity Strategies",
				definition: "Income generation and risk management",
				purpose:
					"Customized annuity solutions for retirement income, market protection, and legacy planning with favorable tax treatment.",
			},
			{
				num: "07",
				title: "Business Insurance",
				definition: "Enterprise-level protection programs",
				purpose:
					"Coverage addressing business risks including key person insurance, general liability, and specialized industry-specific protection.",
			},
			{
				num: "08",
				title: "Estate Insurance Planning",
				definition: "Insurance for estate liquidity needs",
				purpose:
					"Strategically placed insurance to provide liquidity for estate taxes and equalization of inherited assets among beneficiaries.",
			},
		],
	},
	{
		section: "Key Person Insurance",
		items: [
			{
				num: "01",
				title: "Business Valuation",
				definition: "Determining key person financial impact",
				purpose:
					"Comprehensive analysis of how critical personnel loss would impact business valuation, cash flow, and operational continuity.",
			},
			{
				num: "02",
				title: "Policy Placement",
				definition: "Securing appropriate coverage amounts",
				purpose:
					"Placing optimal life insurance policies on key individuals to protect against financial impact of unexpected loss.",
			},
			{
				num: "03",
				title: "Ownership & Beneficiary Strategy",
				definition: "Structuring policy ownership for tax benefits",
				purpose:
					"Strategic policy ownership arrangements ensuring death benefits reach intended recipients with favorable income tax treatment.",
			},
			{
				num: "04",
				title: "Ongoing Management",
				definition: "Monitoring and updating coverage needs",
				purpose:
					"Regular review of coverage adequacy as business grows, personnel changes, and circumstances evolve to ensure protection remains sufficient.",
			},
		],
	},
	{
		section: "Buy-Sell Coverage",
		items: [
			{
				num: "01",
				title: "Buy-Sell Agreement Structure",
				definition: "Documenting ownership transition framework",
				purpose:
					"Well-documented agreements ensuring smooth ownership transition, protecting remaining owners and providing liquidity to departing owners.",
			},
			{
				num: "02",
				title: "Funding Mechanisms",
				definition: "Insurance-funded buyout agreements",
				purpose:
					"Using life insurance policies as funding source for buy-sell obligations, ensuring liquidity available when transitions occur.",
			},
			{
				num: "03",
				title: "Valuation Methodologies",
				definition: "Fair market value determination",
				purpose:
					"Clear valuation formulas protecting all parties, ensuring fair pricing and avoiding disputes during ownership transitions.",
			},
		],
	},
];

export default function InsuranceSolutionsPage() {
	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				{/* Hero Section */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='space-y-6 max-w-4xl'
						>
							<div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 border border-blue-200'>
								<div className='h-2 w-2 rounded-full bg-blue-500'></div>
								<span
									className='text-xs font-semibold text-blue-700 tracking-wide uppercase'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Insurance Solutions
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Insurance Solutions
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Comprehensive Protection & Wealth Preservation
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Strategic insurance solutions designed to protect your wealth,
								family, and business interests with comprehensive coverage and
								tax-efficient structuring.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Services Sections */}
				{insuranceServices.map((category, categoryIndex) => (
					<section key={categoryIndex} className='border-b border-slate-200'>
						<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='mb-12'
							>
								<h2
									className='text-3xl font-bold text-slate-900 mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{category.section}
								</h2>
								<p
									className='text-slate-600 max-w-4xl leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{categoryIndex === 0 &&
										"Comprehensive insurance products tailored to protect and preserve your wealth across multiple dimensions."}
									{categoryIndex === 1 &&
										"Protect your business from the financial impact of losing critical personnel with strategic key person coverage."}
									{categoryIndex === 2 &&
										"Ensure smooth business ownership transitions with properly structured and funded buy-sell agreements."}
								</p>
							</motion.div>

							<div className='space-y-6'>
								{category.items.map((item, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.4,
											delay: 0.4 + idx * 0.05,
										}}
										className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors'
									>
										<div className='flex items-start gap-6 p-6'>
											<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/20'>
												{item.num}
											</div>
											<div className='flex-1 min-w-0'>
												<h3
													className='text-lg font-bold text-slate-900 mb-2'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item.title}
												</h3>
												<p
													className='text-sm text-slate-600 mb-3 font-medium'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='text-blue-600'>Key Definition:</span>{" "}
													{item.definition}
												</p>
												<p
													className='text-sm text-slate-700 leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='font-semibold text-slate-900'>
														Purpose:
													</span>{" "}
													{item.purpose}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</section>
				))}

				{/* Key Benefits */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
							className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'
						>
							<h3
								className='text-xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Why Choose Our Insurance Solutions
							</h3>
							<ul className='space-y-3 text-slate-700'>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Expert risk assessment and coverage recommendations
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Tax-efficient insurance structuring strategies
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordination with overall wealth plan
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ongoing monitoring and policy optimization
									</span>
								</li>
							</ul>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
