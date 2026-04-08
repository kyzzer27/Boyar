/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EconomicSubstancePage() {
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
							Economic Substance & Governance Services
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
								Outsourced / Coordinated Compliance Function
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Advisory, Implementation, and Ongoing Compliance Support
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides economic substance advisory,
								implementation, and ongoing compliance support to entities
								operating across onshore and offshore jurisdictions subject to
								substance legislation. Services are delivered through qualified
								local providers under Boyar Partners’ coordination, oversight,
								and quality-control framework.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								The objective is to ensure entities demonstrate adequate
								economic presence, governance discipline, and regulatory
								alignment commensurate with their activities, while maintaining
								a consistently low-risk compliance posture.
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
								Economic substance services are provided for entities operating
								in or structured through: Bahamas, Bahrain, Belize, Bermuda,
								British Virgin Islands, Cayman Islands, Cook Islands, Costa
								Rica, Cyprus, Delaware, Georgia, Gibraltar, Guernsey, Dubai (UAE
								Mainland), Dubai International Financial Centre, Abu Dhabi
								Global Market, Hong Kong, India, Ireland, Astana International
								Financial Centre, Labuan, Luxembourg, Malta, Marshall Islands,
								Mauritius, Montenegro, Nevis, Netherlands, Panama, Ras Al
								Khaimah (RAK ICC), Saint Kitts and Nevis, Saint Vincent and the
								Grenadines, Samoa, Seychelles, Singapore, Switzerland, United
								Kingdom, and Wyoming.
							</p>
						</motion.div>
					</section>

					{/* 01: Economic Substance Classification Assistance */}
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
										Economic Substance Classification Assistance
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Determine substance status and classification under
										applicable local legislation.
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
										<li>Activity analysis against statutory categories</li>
										<li>
											Determination of core income-generating activities (CIGA)
										</li>
										<li>
											Assessment of exemption or reduced-substance eligibility
										</li>
										<li>Documentation of classification rationale</li>
										<li>
											Alignment with tax, regulatory, and banking disclosures
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										This assessment forms the foundation of all subsequent
										substance planning and reporting.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 02: Physical Office Space & Equipment */}
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
										Physical Office Space & Equipment
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Provision of adequate physical presence where required by
										local rules.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Registered and operational office space</li>
										<li>
											Furnished premises suitable for regulatory inspection
										</li>
										<li>IT and communication infrastructure</li>
										<li>Evidence of ongoing use and expenditure</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Office arrangements are proportionate to activity and
										consistent with local expectations.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 03: Full-Time or Part-Time Employees */}
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
										Full-Time or Part-Time Employees
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Structure local staffing aligned with economic substance
										requirements.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Support Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Determination of staffing thresholds</li>
										<li>Full-time and part-time arrangements</li>
										<li>
											Outsourced personnel and secondments (where permitted)
										</li>
										<li>
											Payroll coordination and employment documentation support
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Staffing models demonstrate real decision-making and
										operational capacity, not nominal presence.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 04: Economic Substance Notifications & Reporting */}
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
										Economic Substance Notifications & Reporting
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Timely and accurate submissions to competent authorities
										with defensible documentation.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Initial substance notifications</li>
										<li>Annual economic substance filings</li>
										<li>Data validation and consistency checks</li>
										<li>Filing calendar management</li>
										<li>Liaison with registered agents or reporting portals</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										All submissions are prepared to be defensible under
										regulatory review.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 05: Administration Services */}
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
										Administration Services
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ongoing support to sustain substance compliance and avoid
										degradation over time.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Maintenance of records evidencing local activity</li>
										<li>
											Coordination with registered agents and local providers
										</li>
										<li>
											Alignment of accounting, payroll, and substance data
										</li>
										<li>Ongoing monitoring of regulatory changes</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ensures continuity of compliance and reduces operational
										risk.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 06: Comprehensive Governance Services */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.35 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									06
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Comprehensive Governance Services
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Governance frameworks that demonstrate effective oversight,
										control, and accountability.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Governance Support Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Board and management structuring</li>
										<li>Local decision-making documentation</li>
										<li>Board and committee meeting coordination</li>
										<li>Resolution and minute drafting</li>
										<li>Delegation of authority frameworks</li>
										<li>Oversight of outsourced activities</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Governance arrangements support both economic substance and
										broader regulatory expectations.
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
							transition={{ duration: 0.5, delay: 0.4 }}
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
										<li>Meet statutory substance thresholds</li>
										<li>
											Maintain alignment across corporate, tax, accounting, and
											regulatory records
										</li>
										<li>
											Present a low-risk profile to regulators, tax authorities,
											and banks
										</li>
										<li>Remain audit-ready and inspection-ready</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Emphasis on proportionality, documentation, and
										sustainability—beyond minimal or purely formal compliance.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Delivery & Oversight Model */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.45 }}
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
										Services delivered through qualified local providers where
										required
									</li>
									<li>
										Boyar Partners provides coordination, oversight, and quality
										control
									</li>
									<li>
										Periodic reviews reflect changes in activity or regulation
									</li>
									<li>
										Independence between governance, accounting, and audit
										functions is maintained
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
							transition={{ duration: 0.5, delay: 0.5 }}
							className='bg-blue-50 border border-blue-300 rounded-lg p-10 text-center'
						>
							<p
								className='text-xl text-slate-900 mb-4 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								“Boyar Partners provides economic substance advisory,
								implementation, and governance services designed to ensure that
								entities demonstrate adequate presence, effective oversight, and
								sustained regulatory compliance across onshore and offshore
								jurisdictions.”
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
