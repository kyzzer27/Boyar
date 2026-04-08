/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jurisdictions = [
	"Switzerland",
	"Luxembourg",
	"Liechtenstein",
	"United Kingdom",
	"Canada",
];

const scopeServices = [
	{
		number: 1,
		title: "Entity Design & Incorporation",
		description:
			"Selection of appropriate legal vehicles (holding companies, operating entities, SPVs, partnerships) with drafting and filing of constitutional documents, registration with local commercial registries, and structuring of ownership, voting, and economic rights.",
		note: "Structures are tailored to reflect family control preferences, investment strategy, and succession objectives.",
	},
	{
		number: 2,
		title: "Corporate Governance & Compliance",
		description:
			"Maintenance of statutory registers and records, preparation of board resolutions and shareholder minutes, governance frameworks and internal controls, and beneficial ownership reporting and AML / CFT compliance.",
		note: "Governance is designed to support continuity, accountability, and regulatory resilience.",
	},
	{
		number: 3,
		title: "Company Secretarial & Legal Administration",
		description:
			"Company secretary and registered office services, annual filings and statutory submissions, liaison with legal counsel, auditors, and regulators, and ongoing legal housekeeping.",
		note: "This ensures the structure remains clean, compliant, and transaction-ready at all times.",
	},
	{
		number: 4,
		title: "Accounting, Tax & Reporting Coordination",
		description:
			"Preparation of financial statements, corporate tax and indirect tax registrations, coordination with auditors and tax advisors, and support for consolidated or group reporting.",
		note: "Accounting and tax alignment is critical to avoid structural inefficiencies and regulatory exposure.",
	},
	{
		number: 5,
		title: "Fiduciary, Directorship & Control Support",
		description:
			"Provision of independent or professional directors, board governance support, risk oversight and fiduciary compliance, and alignment of director duties with family or shareholder intent.",
		note: "This is particularly relevant for holding companies, regulated entities, and succession structures.",
	},
	{
		number: 6,
		title: "Banking, Custody & Treasury Integration",
		description:
			"Assistance with corporate bank and custodian account openings, mandate and signatory structuring, and treasury flow and capital movement coordination.",
		note: "Banking arrangements are aligned with substance, governance, and regulatory expectations.",
	},
];

const businessSuccessionServices = [
	{
		number: 7,
		title: "Ownership & Control Mapping",
		description:
			"Review of current ownership, voting rights, and economic interests, separation of ownership, control, and management where appropriate, and review and restructuring of shareholder agreements.",
	},
	{
		number: 8,
		title: "Successor & Continuity Structuring",
		description:
			"Identification of successors (family, management, third parties), structuring of phased or staged ownership transfer, and use of share classes, holding entities, or trusts to manage control.",
	},
	{
		number: 9,
		title: "Governance for Continuity",
		description:
			"Establishment of boards, advisory committees, or family councils, decision-making frameworks and escalation protocols, and continuity planning for key management roles.",
	},
	{
		number: 10,
		title: "Business Sale & Exit Readiness",
		description:
			"Corporate structures are optimised in advance to support potential exits through segregation of operating vs non-operating assets, use of holding companies or SPVs to ring-fence sale assets, removal or restructuring of non-core liabilities, and alignment of structure with buyer expectations and regulatory requirements.",
		note: "Exit pathways may include strategic sale, management buyout, family buyout, or partial liquidity events.",
	},
	{
		number: 11,
		title: "Post-Sale & Reinvestment Structuring",
		description:
			"Structuring of sale proceeds into investment holding entities, integration with trusts, foundations, or family office vehicles, and long-term governance and asset management alignment.",
	},
];

const keyDocuments = [
	"Memorandum / Articles of Association",
	"Shareholder or Partnership Agreements",
	"Board and Shareholder Resolutions",
	"Buy-Sell Agreements (cross-purchase, entity purchase, hybrid)",
	"Share class and voting rights instruments",
	"Governance charters and succession policies",
	"Pre-sale reorganisation documents",
];

const outsourcedBenefits = [
	"Reduces legal, regulatory, and administrative burden",
	"Ensures jurisdiction-specific compliance",
	"Provides access to experienced directors, secretaries, and advisors",
	"Maintains structures in a state of continuous readiness",
];

const positioningSummaryPoints = [
	"Day-to-day operations",
	"Long-term wealth preservation",
	"Business continuity",
	"Eventual succession or monetisation",
];

export default function CorporateStructuringPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100'>
				{/* Header */}
				<div className='border-b border-gray-100 bg-white/80 backdrop-blur-sm'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex h-16 items-center justify-between'>
							<button
								onClick={() => router.back()}
								className='inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900'
							>
								<svg
									className='h-4 w-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M15 19l-7-7 7-7'
									/>
								</svg>
								Back to Private Clients
							</button>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Title */}
						<div className='mb-12'>
							<h1
								className='text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-slate-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Corporate Structuring
							</h1>
							<p
								className='text-xl text-slate-600 max-w-3xl'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Private Clients, Family Enterprises & Cross-Border Holdings
							</p>
						</div>

						{/* Definition & Strategic Purpose */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-6 text-slate-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Definition & Strategic Purpose
							</h2>
							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200'>
								<p
									className='text-gray-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Corporate structuring refers to the design, implementation,
									and ongoing governance of legal entities used to hold,
									operate, invest, or monetise assets on behalf of private
									clients, families, and closely held enterprises.
								</p>
								<p
									className='text-gray-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									For private clients, corporate structures are not created in
									isolation. They are designed to integrate with:
								</p>
								<ul className='space-y-2 ml-4 mb-6'>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Trusts and foundations
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Family office frameworks
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Estate and succession planning
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Business continuity and exit strategies
										</span>
									</li>
								</ul>
								<p
									className='text-gray-700 leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									A properly designed structure delivers control, protection,
									scalability, and long-term optionality, while remaining
									compliant with local and international regulatory regimes.
								</p>
							</div>
						</div>

						{/* Scope of Corporate Structuring Services */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-8 text-gray-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Scope of Corporate Structuring Services
							</h2>
							<div className='space-y-6'>
								{scopeServices.map((service, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.08 }}
										className='bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-200 transition-colors'
									>
										<div className='flex items-start gap-4'>
											<div className='flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold'>
												{service.number}
											</div>
											<div className='flex-1'>
												<h3
													className='text-lg font-bold mb-2 text-gray-900'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{service.title}
												</h3>
												<p
													className='text-gray-700 leading-relaxed mb-3'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{service.description}
												</p>
												{service.note && (
													<div className='bg-teal-50/50 rounded-lg p-3 border border-teal-100'>
														<p
															className='text-sm text-gray-700 leading-relaxed italic'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{service.note}
														</p>
													</div>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Business Succession & Sale */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-8 text-gray-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Business Succession & Sale (Integrated Structuring)
							</h2>

							{/* Strategic Objectives */}
							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 mb-8'>
								<h3
									className='text-xl font-bold mb-4 text-gray-900'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Strategic Objectives
								</h3>
								<p
									className='text-gray-700 leading-relaxed mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Business succession and sale planning is a core pillar of
									corporate structuring, particularly for family-owned and
									founder-led enterprises.
								</p>
								<ul className='space-y-2'>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Ensure continuity of operations
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Preserve enterprise value
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Facilitate orderly ownership transition or monetisation
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Align family, shareholder, and management interests
										</span>
									</li>
									<li className='flex items-start gap-3'>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2'></div>
										<span
											className='text-gray-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Provide liquidity in succession or exit scenarios
										</span>
									</li>
								</ul>
								<p
									className='text-gray-700 leading-relaxed mt-4 text-sm italic'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Succession and exit planning is treated as a governance and
									structuring exercise, not a last-minute transaction.
								</p>
							</div>

							{/* Succession Services */}
							<div className='space-y-6'>
								{businessSuccessionServices.map((service, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.08 }}
										className='bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-200 transition-colors'
									>
										<div className='flex items-start gap-4'>
											<div className='flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold'>
												{service.number}
											</div>
											<div className='flex-1'>
												<h4
													className='text-lg font-bold mb-2 text-gray-900'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{service.title}
												</h4>
												<p
													className='text-gray-700 leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{service.description}
												</p>
												{service.note && (
													<p
														className='text-gray-600 leading-relaxed mt-3 text-sm italic'
														style={{ fontFamily: "var(--font-avenir)" }}
													>
														{service.note}
													</p>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Key Corporate & Succession Documentation */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-8 text-gray-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Key Corporate & Succession Documentation
							</h2>
							<p
								className='text-gray-600 leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Typical documentation ensures legal clarity, enforceability, and
								transition certainty:
							</p>
							<div className='bg-white rounded-xl border border-gray-200 p-8'>
								<ul className='space-y-3'>
									{keyDocuments.map((doc, index) => (
										<li key={index} className='flex items-start gap-3'>
											<div className='flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold mt-0.5'>
												{index + 1}
											</div>
											<span
												className='text-gray-700 leading-relaxed flex-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{doc}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Outsourced Corporate Structuring Model */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-6 text-gray-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Outsourced Corporate Structuring Model
							</h2>
							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 mb-8'>
								<p
									className='text-gray-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Corporate structuring, succession, and sale preparation are
									delivered through licensed professional service providers in
									each jurisdiction. This outsourced model:
								</p>
								<ul className='space-y-3'>
									{outsourcedBenefits.map((benefit, index) => (
										<li key={index} className='flex items-start gap-3'>
											<div className='flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold'>
												{index + 1}
											</div>
											<span
												className='text-gray-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{benefit}
											</span>
										</li>
									))}
								</ul>
								<p
									className='text-gray-700 leading-relaxed mt-6 text-sm'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Without this model, clients would otherwise need to
									independently manage multi-jurisdictional compliance,
									governance, and transition planning—significantly increasing
									risk and inefficiency.
								</p>
							</div>
						</div>

						{/* Positioning Summary */}
						<div className='mb-16'>
							<h2
								className='text-3xl font-bold mb-6 text-gray-900'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Positioning Summary
							</h2>
							<div className='bg-white rounded-xl border border-gray-200 p-8'>
								<p
									className='text-gray-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									For private clients and family enterprises, corporate
									structuring is not static. It is a living framework that
									supports:
								</p>
								<ul className='space-y-3 mb-6'>
									{positioningSummaryPoints.map((point, index) => (
										<li key={index} className='flex items-start gap-3'>
											<div className='flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mt-2.5'></div>
											<span
												className='text-gray-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{point}
											</span>
										</li>
									))}
								</ul>
								<p
									className='text-gray-700 leading-relaxed font-semibold'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									When designed correctly, it delivers control today and
									optionality tomorrow.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
