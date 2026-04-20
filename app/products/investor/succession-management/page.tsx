/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";

const successionServices = [
	{
		num: "01",
		title: "Ownership, Control & Leadership Mapping",
		definition:
			"Comprehensive analysis of current ownership and decision-making structure",
		purpose:
			"Identification of current ownership, voting rights, and economic interests. Mapping of leadership roles, key decision-makers, and critical personnel. Distinction between ownership, control, management, and economic benefit. For corporates, this includes board composition, executive authority, and key-person dependency analysis.",
	},
	{
		num: "02",
		title: "Succession Strategy Design",
		definition: "Forward-looking transition planning and timeline development",
		purpose:
			"Definition of succession objectives including family-led continuity, professional management transition, partial or full ownership exit, and executive leadership succession. Design of phased or staged transition timelines. Alignment with shareholder, investor, and regulatory expectations. Strategies are designed to avoid value disruption and leadership vacuums.",
	},
	{
		num: "03",
		title: "Corporate & Family Governance Frameworks",
		definition: "Institutional governance structures for continuity",
		purpose:
			"Board succession planning, executive succession pipelines, family councils, advisory boards, or supervisory committees. Decision-making hierarchies and escalation protocols. Governance frameworks ensure continuity independent of individuals.",
	},
	{
		num: "04",
		title: "Corporate Succession Planning",
		definition: "Business and executive leadership transition management",
		purpose:
			"CEO, CXO, and senior management succession planning. Identification and preparation of internal successors. Contingency planning for sudden incapacity, resignation, or death. Integration with employment agreements, incentive plans, and shareholder structures. This is essential for investor assurance, lender confidence, and regulatory stability.",
	},
	{
		num: "05",
		title: "Business Ownership Succession",
		definition: "Structured transfer of business ownership",
		purpose:
			"Founder-led to next-generation transitions. Management buyout (MBO) or internal succession. Shareholder transition and buy-sell alignment. Separation of operating control from economic ownership. Ownership transitions are structured to preserve control integrity and enterprise value.",
	},
	{
		num: "06",
		title: "Integration with Corporate Structuring & Estate Planning",
		definition: "Alignment across legal, tax, and governance frameworks",
		purpose:
			"Alignment with holding companies, SPVs, trusts, and foundations. Liquidity planning for taxes, equalisation, or exits. Structuring of post-succession ownership and control. This ensures consistency between corporate, personal, and family succession outcomes.",
	},
	{
		num: "07",
		title: "Risk Mitigation & Continuity Planning",
		definition: "Pre-emptive protection against succession disruption",
		purpose:
			"Key-person risk mitigation. Conflict prevention between shareholders, heirs, and management. Pre-emptive structuring to reduce litigation and governance breakdown. Succession planning materially reduces business disruption and reputational risk.",
	},
	{
		num: "08",
		title: "Transition Execution & Ongoing Monitoring",
		definition: "Active implementation and periodic review",
		purpose:
			"Implementation of succession milestones. Monitoring of leadership and ownership transitions. Periodic review and recalibration as business or family dynamics evolve. Succession is treated as a living governance framework, not a one-time exercise.",
	},
];

const keyDocumentation = [
	"Board and executive succession policies",
	"Shareholder and partnership agreements",
	"Buy-sell agreements and option arrangements",
	"Family constitutions or governance charters",
	"Management continuity and incentive plans",
	"Trust deeds, foundation statutes, and letters of wishes",
	"Powers of attorney and emergency control frameworks",
];

const outsourcedBenefits = [
	"Provides multidisciplinary expertise across legal, tax, governance, and leadership domains",
	"Ensures jurisdiction-specific compliance",
	"Reduces execution and transition risk",
	"Allows founders, boards, and families to focus on strategic decision-making",
];

export default function SuccessionManagementPage() {
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
									Succession Management
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Succession Management
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Private Clients, Family Enterprises & Corporates
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Succession management is the structured planning, governance,
								and execution of leadership, ownership, and control transitions
								across individuals, families, and corporate organisations.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Strategic Purpose */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Definition & Strategic Purpose
							</h2>
							<div className='space-y-4 text-slate-700 leading-relaxed max-w-4xl'>
								<p style={{ fontFamily: "var(--font-avenir)" }}>
									For private clients and family enterprises, succession focuses
									on inter-generational continuity and preservation of legacy.
								</p>
								<p style={{ fontFamily: "var(--font-avenir)" }}>
									For corporates, succession management is a business-critical
									governance function designed to ensure operational resilience,
									investor confidence, and continuity of strategic direction.
								</p>
								<p
									className='font-semibold text-slate-900'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									In both contexts, succession management is treated as a
									forward-looking governance framework, not a reactive
									contingency plan.
								</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Services Section */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Scope of Succession Management Services
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Comprehensive succession management for private clients, family
								enterprises, and corporate organisations, ensuring leadership
								continuity and value preservation.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{successionServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
									className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors'
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
					</div>
				</section>

				{/* Key Documentation */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Key Succession Documentation
							</h2>
							<p
								className='text-slate-600 mb-8 max-w-4xl'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Succession management typically involves preparation and
								coordination of documentation ensuring clarity, enforceability,
								and continuity across both private and corporate contexts.
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{keyDocumentation.map((doc, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 1.3 + idx * 0.05 }}
										className='flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200'
									>
										<div className='flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2'></div>
										<span
											className='text-slate-700 text-sm'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{doc}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Outsourced Model Benefits */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.5 }}
							className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Outsourced Succession Management Model
							</h3>
							<p
								className='text-slate-700 mb-6 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Succession management services are delivered through specialist
								legal, governance, fiduciary, and corporate advisory partners.
								This outsourced model:
							</p>
							<ul className='space-y-3'>
								{outsourcedBenefits.map((benefit, idx) => (
									<li key={idx} className='flex items-start gap-3'>
										<span className='text-blue-600 font-bold text-lg'>✓</span>
										<span
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{benefit}
										</span>
									</li>
								))}
							</ul>
							<p
								className='text-slate-900 font-semibold mt-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Without a structured succession framework, corporates and
								private clients alike face elevated risks of value erosion,
								leadership instability, and stakeholder conflict.
							</p>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
