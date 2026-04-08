/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ShelfCompaniesPage() {
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
							Shelf Companies (Ready-Made Entities) Services
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
								Outsourced / Availability-Based Offering
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Pre-Incorporated Entities with Controlled Transfer
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides shelf company solutions in jurisdictions
								where pre-incorporated entities are legally permissible. Shelf
								companies are maintained in good standing with no operational
								history, transferred through controlled change of ownership and
								governance.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								The objective is to support time-sensitive commercial needs
								while ensuring statutory compliance, transparency of beneficial
								ownership, and regulatory alignment.
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
								className='text-sm text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Services are offered subject to availability and statutory
								permissibility for entities in: Bahamas, Bahrain, Belize,
								Bermuda, British Virgin Islands, Cayman Islands, Cook Islands,
								Costa Rica, Cyprus, Delaware, Georgia, Gibraltar, Guernsey,
								Dubai (UAE Mainland), Dubai International Financial Centre, Abu
								Dhabi Global Market, Hong Kong, India, Ireland, Astana
								International Financial Centre, Labuan, Luxembourg, Malta,
								Marshall Islands, Mauritius, Montenegro, Nevis, Netherlands,
								Panama, Ras Al Khaimah (RAK ICC), Saint Kitts and Nevis, Saint
								Vincent and the Grenadines, Samoa, Seychelles, Singapore,
								Switzerland, United Kingdom, and Wyoming.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded p-4 text-sm text-slate-700'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Availability varies by jurisdiction, entity type, and
								incorporation date.
							</div>
						</motion.div>
					</section>

					{/* 01: Provision of Ready-Made Companies */}
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
										Provision of Ready-Made Companies
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Access to pre-incorporated entities with no trading or
										operational history.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Entities Include
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Legally formed and registered companies</li>
										<li>No trading or operational history</li>
										<li>Maintained in good standing with registry</li>
										<li>Clean statutory records</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Maintained by licensed local providers until client
										transfer.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 02: Ownership & Control Transfer */}
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
										Ownership & Control Transfer
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Controlled transfer of ownership and governance upon client
										selection.
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
										<li>Share transfer or issuance documentation</li>
										<li>Director and officer appointment/resignation</li>
										<li>Shareholder and director register updates</li>
										<li>Beneficial ownership identification and reporting</li>
										<li>Local registry alignment</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Transfers executed to ensure clear, documented continuity.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 03: Constitutional Document Alignment */}
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
										Constitutional Document Alignment
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Update or restate constitutional documents to reflect client
										requirements and local standards.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										May Include
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Memorandum & Articles amendments</li>
										<li>Articles restatement</li>
										<li>Operating Agreements (LLC)</li>
										<li>Partnership or shareholder agreements</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										All changes filed and recorded per local law.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 04: Statutory Filings & Registry Updates */}
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
										Statutory Filings & Registry Updates
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Manage all post-transfer statutory filings and registry
										updates.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Registry notifications</li>
									<li>Registered office and agent confirmations</li>
									<li>Director and shareholder updates</li>
									<li>Certificates of incumbency or good standing</li>
								</ul>
							</div>

							<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Ensures entity remains fully compliant immediately following
									transfer.
								</p>
							</div>
						</motion.div>
					</section>

					{/* 05: Banking & Operational Readiness (Optional) */}
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
										Banking & Operational Readiness (Optional)
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordinate post-transfer operational setup where required.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Support May Include
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Banking introductions or account transition</li>
										<li>Office registration or virtual office arrangements</li>
										<li>Accounting and compliance onboarding</li>
										<li>Economic substance classification and notifications</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Services scoped separately, aligned to regulatory
										expectations.
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
										<li>No misleading corporate history represented</li>
										<li>
											Beneficial ownership accurately disclosed and recorded
										</li>
										<li>All local AML, KYC, and registry requirements met</li>
										<li>
											Low-risk compliance posture from inception under new
											ownership
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Shelf companies are not substitutes for compliance,
										substance, or regulatory obligations.
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
									<li>Sourced from approved local providers</li>
									<li>
										Boyar Partners coordinates due diligence, documentation, and
										transfer
									</li>
									<li>All transfers documented and audit-ready</li>
									<li>Post-transfer compliance obligations clearly mapped</li>
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
								"Boyar Partners provides access to compliant, ready-made
								corporate entities in select jurisdictions, facilitating
								efficient ownership transfer while ensuring full statutory
								compliance and transparency."
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
