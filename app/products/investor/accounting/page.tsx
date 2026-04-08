/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AccountingPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-white text-slate-900'>
				{/* Header */}
				<header className='sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-30'>
					<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='text-sm text-slate-600 hover:text-slate-900 transition flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-semibold text-slate-900'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							Accounting & Financial Reporting Services
						</h1>
						<div className='w-8'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='relative z-10 py-16 sm:py-20'>
					{/* Introduction */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-16'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<p
								className='text-sm uppercase tracking-[0.2em] text-blue-600 mb-3 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Outsourced / Supervised Function
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Accounting, Financial Reporting, and Payroll Oversight
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides outsourced accounting, financial
								reporting, and payroll oversight services to corporate,
								fiduciary, and special-purpose entities operating across
								multiple jurisdictions. Services are delivered through qualified
								third‑party accounting professionals under Boyar Partners’
								coordination and supervisory framework.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								The objective is to maintain accurate books, defensible
								financial records, timely reporting, and a consistently
								compliant financial posture aligned with local statutory
								requirements and international accounting standards.
							</div>
						</motion.div>
					</section>

					{/* Jurisdictional Coverage */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.05 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Coverage
							</h3>
							<p
								className='text-sm text-slate-700 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Services are provided for entities operating in or structured
								through: Bahamas, Bahrain, Belize, Bermuda, British Virgin
								Islands, Cayman Islands, Cook Islands, Costa Rica, Cyprus,
								Delaware, Georgia, Gibraltar, Guernsey, Dubai (UAE Mainland),
								Dubai International Financial Centre, Abu Dhabi Global Market,
								Hong Kong, India, Ireland, Astana International Financial
								Centre, Labuan, Luxembourg, Malta, Marshall Islands, Mauritius,
								Montenegro, Nevis, Netherlands, Panama, Ras Al Khaimah (RAK
								ICC), Saint Kitts and Nevis, Saint Vincent and the Grenadines,
								Samoa, Seychelles, Singapore, Switzerland, United Kingdom, and
								Wyoming.
							</p>
						</motion.div>
					</section>

					{/* 01: Bookkeeping & Day-to-Day Accounting */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									01
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Bookkeeping & Day‑to‑Day Accounting
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ongoing bookkeeping and transactional accounting
										proportionate to the scale and complexity of operations.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Recording of income and expenditure</li>
										<li>Classification of transactions</li>
										<li>Maintenance of general ledger</li>
										<li>Bank account reconciliations</li>
										<li>
											Review and validation of third‑party accounting records
										</li>
										<li>Intercompany transaction tracking</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Assurance
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Books maintained in audit‑ready form</li>
										<li>Suitable for tax and regulatory review</li>
										<li>
											Banking scrutiny and counterparty due diligence compatible
										</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 02: Preparation of Financial Documents & Statements */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									02
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Preparation of Financial Documents & Statements
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordination of periodic and annual financial statements in
										accordance with applicable standards.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Deliverables May Include
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Trial balances</li>
										<li>Management accounts</li>
										<li>Annual financial statements</li>
										<li>
											Consolidated financial statements (where applicable)
										</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Standards Applied
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>International Financial Reporting Standards (IFRS)</li>
										<li>Local GAAP or statutory frameworks</li>
										<li>US GAAP (where required)</li>
									</ul>
								</div>
							</div>

							<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									The applicable standard is determined based on jurisdiction,
									entity type, and regulatory expectations.
								</p>
							</div>
						</motion.div>
					</section>

					{/* 03: Financial Controller Support (Outsourced) */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									03
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Financial Controller Support (Outsourced)
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Enhanced oversight for entities that require disciplined
										financial control and coordination.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Responsibilities
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Oversight of bookkeeping and accounting providers</li>
										<li>Review of financial statements and reconciliations</li>
										<li>Internal financial controls monitoring</li>
										<li>Cash flow and liquidity oversight</li>
										<li>
											Coordination with tax, audit, and compliance advisors
										</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Relevant For
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Holding companies</li>
										<li>SPVs and special‑purpose entities</li>
										<li>Fund‑related entities</li>
										<li>Regulated or bank‑sensitive structures</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 04: Audit Supervision & Coordination */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.25 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									04
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Audit Supervision & Coordination
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Supervision and coordination of statutory or voluntary
										audits to ensure efficiency and minimal disruption.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Audit readiness assessment</li>
									<li>Liaison with external auditors</li>
									<li>Coordination of information and document flow</li>
									<li>Resolution of audit queries</li>
									<li>Support during regulatory or banking reviews</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* 05: Payroll Services (Select Jurisdictions) */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									05
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Payroll Services (Select Jurisdictions)
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Jurisdiction‑dependent payroll support aligned with local
										employment and tax laws.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Services Include
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Payroll calculation and processing</li>
										<li>Statutory deductions and contributions</li>
										<li>Payslip generation</li>
										<li>Coordination with local payroll agents</li>
										<li>Payroll reporting support</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope is jurisdiction‑dependent and tailored to local
										compliance obligations.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Compliance & Regulatory Alignment */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.35 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Compliance & Regulatory Alignment
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Accurate and complete financial records</li>
										<li>Timely statutory and regulatory filings</li>
										<li>
											Consistency across accounting, tax, and regulatory
											reporting
										</li>
										<li>Well‑documented, low‑risk compliance posture</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Support for corporate registry requirements</li>
										<li>Tax authority filings and documentation</li>
										<li>Economic substance assessments</li>
										<li>Banking and counterparty due diligence</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Delivery & Oversight Model */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery & Oversight Model
							</h3>
							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Accounting and payroll services are outsourced to qualified
										professionals
									</li>
									<li>
										Boyar Partners provides coordination, review, and
										supervisory oversight
									</li>
									<li>
										Engagements scale with jurisdictional intensity and
										operational complexity
									</li>
									<li>
										Independence between accounting, audit, and compliance
										functions is preserved
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* CTA / Positioning Statement */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 pb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.45 }}
							className='bg-blue-50 border border-blue-300 rounded-lg p-10 text-center'
						>
							<p
								className='text-xl text-slate-900 mb-4 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								“Boyar Partners provides outsourced accounting, financial
								reporting, audit coordination, and payroll oversight services
								designed to support compliant operations and transparent
								financial governance across onshore and offshore jurisdictions.”
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
