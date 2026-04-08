/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RedomiciliationPage() {
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
							Redomiciliation (Continuation) Services
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
								Outbound & Inbound Corporate Migration
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								End-to-End Continuation Across Jurisdictions
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides end-to-end redomiciliation
								(continuation) services for entities seeking to migrate between
								jurisdictions while preserving legal identity, corporate
								history, and continuity of operations—where permitted by law.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Redomiciliation is jurisdiction-specific. Requirements depend on
								exporting and receiving laws and practices. Each engagement is
								managed as a structured project with defined milestones,
								documentation controls, and regulatory coordination.
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
								Services are provided for entities migrating from or into:
								Bahamas, Bahrain, Belize, Bermuda, British Virgin Islands,
								Cayman Islands, Cook Islands, Costa Rica, Cyprus, Delaware,
								Georgia, Gibraltar, Guernsey, Dubai (UAE Mainland), Dubai
								International Financial Centre, Abu Dhabi Global Market, Hong
								Kong, India, Ireland, Astana International Financial Centre,
								Labuan, Luxembourg, Malta, Marshall Islands, Mauritius,
								Montenegro, Nevis, Netherlands, Panama, Ras Al Khaimah (RAK
								ICC), Saint Kitts and Nevis, Saint Vincent and the Grenadines,
								Samoa, Seychelles, Singapore, Switzerland, United Kingdom, and
								Wyoming. Availability depends on both jurisdictions recognizing
								continuation in/out under company law.
							</p>
						</motion.div>
					</section>

					{/* A: Pre-Migration Assessment & Feasibility */}
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
									A
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Pre-Migration Assessment & Feasibility
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Structured feasibility review before initiating migration.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Assessment Areas
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Statutory permissibility of continuation out/in</li>
										<li>Constitutional document review</li>
										<li>Share capital and ownership structure</li>
										<li>Regulatory and licensing implications</li>
										<li>Tax, accounting, and substance considerations</li>
										<li>Banking and counterparty impact</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Establishes a clear migration pathway and identifies
										pre-conditions.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* B: Outbound Redomiciliation */}
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
									B
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Outbound Redomiciliation (Exporting Jurisdiction)
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Assistance to commence and complete migration out of the
										existing jurisdiction.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Confirm constitutional documents permit redomiciliation
									</li>
									<li>
										Draft and coordinate shareholder resolutions for office
										transfer and continuation
									</li>
									<li>
										Liaise with local registered agent and corporate registry
									</li>
									<li>Apply for consent to migrate out (where required)</li>
									<li>
										Settle outstanding government fees, penalties, or filings
									</li>
									<li>
										Coordinate certificates, declarations, and statutory
										confirmations
									</li>
								</ul>
							</div>

							<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Ensures exit in good standing without residual compliance
									exposure.
								</p>
							</div>
						</motion.div>
					</section>

					{/* C: Inbound Redomiciliation */}
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
									C
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Inbound Redomiciliation (Receiving Jurisdiction)
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Manage continuation into the new jurisdiction and initial
										statutory setup.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Inbound Scope
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>
											Apply to companies registry for consent to continue in
										</li>
										<li>
											Collate and submit supporting documents: constitutions,
											good standing, directors/shareholders, solvency
											declarations
										</li>
										<li>Amend constitutional documents where required</li>
										<li>
											Obtain Certificate of Continuation / Registration by Way
											of Continuation
										</li>
										<li>
											Provide registered office and registered agent services
										</li>
										<li>
											Complete initial statutory filings and notifications
										</li>
										<li>Coordinate banking setup or transition as needed</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Delivers a compliant, operational start in the receiving
										jurisdiction.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* D: Post-Continuation Compliance & Integration */}
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
									D
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Post-Continuation Compliance & Integration
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Stabilize operations, align records, and update regulatory
										positions.
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
										<li>Alignment of statutory registers</li>
										<li>Updating accounting and reporting frameworks</li>
										<li>Economic substance classification and notifications</li>
										<li>FATCA/CRS re-classification and reporting alignment</li>
										<li>
											Banking, counterparty, and contractual notifications
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ensures full and correct operation under new jurisdictional
										law.
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
							transition={{ duration: 0.5, delay: 0.3 }}
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
										<li>Legal continuity maintained throughout migration</li>
										<li>
											Good standing in exporting and receiving jurisdictions
										</li>
										<li>
											Avoid unintended dissolution, tax exposure, or breaches
										</li>
										<li>
											Well-documented, low-risk profile for registries,
											regulators, and banks
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Steps documented and sequenced to support audit, regulatory
										review, and due diligence.
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
							transition={{ duration: 0.5, delay: 0.35 }}
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
										Coordination through local professionals in each
										jurisdiction
									</li>
									<li>
										Boyar Partners provides project management, documentation
										control, and oversight
									</li>
									<li>Timelines aligned to outbound and inbound approvals</li>
									<li>
										Independence preserved between legal, accounting, and audit
										functions
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
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-blue-50 border border-blue-300 rounded-lg p-10 text-center'
						>
							<p
								className='text-xl text-slate-900 mb-4 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								“Boyar Partners provides structured outbound and inbound
								redomiciliation services, coordinating multi-jurisdictional
								requirements to ensure lawful continuation, regulatory
								alignment, and operational continuity across onshore and
								offshore jurisdictions.”
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
