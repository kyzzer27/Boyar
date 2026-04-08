/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";

const estatePlanningServices = [
	{
		num: "01",
		title: "Will Preparation & Review",
		definition: "Comprehensive testamentary document drafting",
		purpose:
			"Professional preparation of wills aligned with your wishes, family structure, and applicable inheritance laws, ensuring valid execution and proper asset distribution.",
	},
	{
		num: "02",
		title: "Trust Integration",
		definition: "Coordinating trusts within estate plans",
		purpose:
			"Strategic use of revocable and irrevocable trusts to manage asset transfers, provide for beneficiaries, and achieve tax efficiency during lifetime and at death.",
	},
	{
		num: "03",
		title: "Power of Attorney",
		definition: "Legal authority delegation for incapacity",
		purpose:
			"Establishing durable powers of attorney for financial and healthcare decisions, ensuring trusted individuals can act on your behalf if you become incapacitated.",
	},
	{
		num: "04",
		title: "Healthcare Directives",
		definition: "Medical decision-making instructions",
		purpose:
			"Living wills and healthcare proxies documenting your medical treatment preferences and appointing healthcare decision-makers for end-of-life situations.",
	},
	{
		num: "05",
		title: "Beneficiary Coordination",
		definition: "Alignment of asset transfer designations",
		purpose:
			"Review and coordination of beneficiary designations across retirement accounts, insurance policies, and transfer-on-death accounts to ensure consistency with estate plan.",
	},
	{
		num: "06",
		title: "Estate Tax Planning",
		definition: "Minimizing transfer tax obligations",
		purpose:
			"Strategies to reduce estate, gift, and generation-skipping transfer taxes through lifetime gifting, charitable planning, and trust structures.",
	},
	{
		num: "07",
		title: "Business Succession Integration",
		definition: "Coordinating business ownership transfer",
		purpose:
			"Aligning business succession plans with estate planning to ensure smooth ownership transition and adequate liquidity for estate settlement.",
	},
	{
		num: "08",
		title: "Charitable Planning",
		definition: "Philanthropic legacy structuring",
		purpose:
			"Incorporating charitable giving into estate plans through bequests, charitable trusts, donor-advised funds, and private foundations.",
	},
	{
		num: "09",
		title: "Digital Asset Planning",
		definition: "Management of online accounts and data",
		purpose:
			"Addressing digital assets including cryptocurrency, social media accounts, online businesses, and digital files with proper access instructions.",
	},
	{
		num: "10",
		title: "Family Governance",
		definition: "Multi-generational wealth transfer frameworks",
		purpose:
			"Establishing family governance structures, meetings, and communication protocols to prepare heirs and maintain family harmony during wealth transitions.",
	},
];

export default function EstatePlanningPage() {
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
									Estate Planning
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Estate Planning
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Comprehensive Wealth Transfer
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Strategic estate planning services ensuring your assets are
								distributed according to your wishes while minimizing taxes and
								providing for your loved ones and charitable causes.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Services Section */}
				<section className='border-b border-slate-200'>
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
								Our Estate Planning Services
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Comprehensive planning to protect your legacy and ensure smooth
								wealth transfer across generations with tax efficiency and legal
								certainty.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{estatePlanningServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
									className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-md transition-all'
								>
									<div className='flex items-start gap-6 p-6'>
										<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/20'>
											{service.num}
										</div>
										<div className='flex-1 min-w-0'>
											<h3
												className='text-lg font-bold text-slate-900 mb-2'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{service.title}
											</h3>
											<p
												className='text-sm text-slate-600 mb-3 font-medium'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='text-blue-600'>Key Definition:</span>{" "}
												{service.definition}
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='font-semibold text-slate-900'>
													Purpose:
												</span>{" "}
												{service.purpose}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Key Benefits */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
							className='mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'
						>
							<h3
								className='text-xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Why Estate Planning Matters
							</h3>
							<ul className='space-y-3 text-slate-700'>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ensure assets pass to intended beneficiaries efficiently
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Minimize estate taxes and settlement costs
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Provide for incapacity with healthcare and financial
										directives
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-blue-600 font-bold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Create lasting philanthropic impact aligned with your values
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
