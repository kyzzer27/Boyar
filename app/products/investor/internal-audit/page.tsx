/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InternalAuditPage() {
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
							Internal Audit & Regulatory Assurance
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
								Outsourced / Independent Function
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Internal Audit & Regulatory Assurance Services
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides outsourced internal audit and regulatory
								assurance services to corporate, fiduciary, fund,
								special-purpose, and holding entities operating across multiple
								jurisdictions. The function is structured to enhance governance,
								strengthen risk oversight, and ensure sustained regulatory
								compliance across diverse legal regimes.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								These services are delivered through qualified third-party audit
								and compliance professionals under Boyar Partners' coordination
								and quality control framework, maintaining independence and
								objectivity.
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
								Internal audit and regulatory assurance services are provided
								for entities operating in or structured through: Bahamas,
								Bahrain, Belize, Bermuda, British Virgin Islands, Cayman
								Islands, Cook Islands, Costa Rica, Cyprus, Delaware, Georgia,
								Gibraltar, Guernsey, Dubai (UAE Mainland), Dubai International
								Financial Centre, Abu Dhabi Global Market, Hong Kong, India,
								Ireland, Astana International Financial Centre, Labuan,
								Luxembourg, Malta, Marshall Islands, Mauritius, Montenegro,
								Nevis, Netherlands, Panama, Ras Al Khaimah (RAK ICC), Saint
								Kitts and Nevis, Saint Vincent and the Grenadines, Samoa,
								Seychelles, Singapore, Switzerland, United Kingdom, and Wyoming.
							</p>
						</motion.div>
					</section>

					{/* Section 1 */}
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
										Development of Multi-Year Internal Audit Plans
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Plans are risk-based and aligned to jurisdictional
										expectations, entity scale, licensing intensity, and
										operating complexity.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Aligned With
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Jurisdiction-specific regulatory expectations</li>
										<li>Nature, scale, and complexity of operations</li>
										<li>Licensing and supervisory intensity</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Key Deliverables
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Enterprise risk assessment (inherent & residual)</li>
										<li>
											Audit universe definition and prioritised cycles (12-36
											months)
										</li>
										<li>Resource and outsourcing alignment</li>
										<li>Board-level audit planning documentation</li>
									</ul>
								</div>
							</div>

							<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Calibrated for regulated financial centres (DIFC, ADGM, AIFC,
									Luxembourg, Malta, Cayman) and offshore corporate registries.
								</p>
							</div>
						</motion.div>
					</section>

					{/* Section 2 */}
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
										Performing Internal Audit Reviews
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Independent reviews executed by outsourced professionals
										under Boyar Partners' oversight.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coverage Areas
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Corporate governance and control environment</li>
										<li>Financial controls and reporting processes</li>
										<li>
											Regulatory compliance (company law, substance, filings)
										</li>
										<li>AML, sanctions, and onboarding controls</li>
										<li>Operational risk and outsourcing oversight</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Outputs
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Structured audit reports and risk-rated findings</li>
										<li>Practical remediation recommendations</li>
										<li>Management response tracking</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 3 */}
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
										Assisting with Risk & Performance Measures
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Frameworks tailored to regulatory expectations across EU,
										UK, GCC, offshore, and US-linked structures.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Key Risk Indicators (KRIs) and control effectiveness metrics
									</li>
									<li>
										Compliance breach tracking and regulatory exposure
										dashboards
									</li>
									<li>
										Periodic risk reporting formats aligned to board
										expectations
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Section 4 */}
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
										Supporting Effective Corporate Governance
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ensuring clear oversight, accountability, and
										decision-making discipline across entity types.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Board and committee structures; delegation of authority
										frameworks
									</li>
									<li>
										Conflict of interest management and documentation of key
										decisions
									</li>
									<li>
										Oversight of outsourced service providers (holding
										companies, SPVs, funds, management entities, trust-linked
										entities)
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Section 5 */}
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
										Beneficial Owner (UBO) Reporting Oversight
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ensuring accurate, timely, and consistent beneficial
										ownership reporting across jurisdictions.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>UBO identification and verification support</li>
									<li>
										Alignment of internal records with registry filings;
										change-of-control monitoring
									</li>
									<li>
										Cross-jurisdiction consistency checks for EU, UK, UAE, and
										offshore registers
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Section 6 */}
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
										FATCA / CRS Classification Support
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Defensible classification across banking relationships and
										regulatory reviews.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Entity classification analysis: financial institution vs.
										non-financial entity
									</li>
									<li>
										Passive vs. active status assessment; controlling person
										identification
									</li>
									<li>
										Classification documentation support for regulators and
										banks
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Section 7 */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									07
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										FATCA / CRS Reporting Oversight
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordinated, accurate reporting with post-submission review
										and remediation.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Review of reportable accounts; data validation and
										consistency checks
									</li>
									<li>
										Reporting calendar management; liaison with reporting agents
										or portals
									</li>
									<li>
										Post-submission issue tracking and remediation support
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Compliance Rating & Posture */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.45 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Compliance Rating & Regulatory Posture
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>
											Well-documented compliance posture and low-risk profile
										</li>
										<li>
											Consistent adherence to corporate, tax, and reporting
											obligations
										</li>
										<li>
											Audit-ready documentation for regulators, banks, and
											counterparties
										</li>
									</ul>
								</div>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>
											Alignment with financial regulators, company registries,
											and tax authorities
										</li>
										<li>Banking compatibility and counterparty readiness</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Delivery Model */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery Model
							</h3>
							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>
										Services are outsourced to qualified professionals;
										independence preserved
									</li>
									<li>
										Boyar Partners provides coordination, scoping, and quality
										control
									</li>
									<li>
										Engagements are scalable based on jurisdiction and
										complexity
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* CTA */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 pb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.55 }}
							className='bg-blue-50 border border-blue-300 rounded-lg p-10 text-center'
						>
							<p
								className='text-xl text-slate-900 mb-4 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								"Boyar Partners provides outsourced internal audit and
								regulatory assurance services designed to strengthen governance,
								enhance risk oversight, and ensure sustained compliance across
								onshore and offshore jurisdictions."
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
