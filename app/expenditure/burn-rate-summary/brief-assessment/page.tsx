/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BriefAssessmentPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<"assessment" | "benchmarking">(
		"assessment"
	);

	return (
		<ProtectedRoute>
			<div
				className='min-h-screen bg-white text-gray-900'
				style={{
					fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif",
				}}
			>
				{/* Header Bar */}
				<header className='bg-white border-b border-gray-200 sticky top-0 z-50'>
					<div className='mx-auto max-w-6xl px-12 py-4'>
						<div className='flex items-center justify-between'>
							<button
								onClick={() => router.back()}
								className='group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
							>
								<svg
									className='w-4 h-4 transition-transform group-hover:-translate-x-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M15 19l-7-7 7-7'
									/>
								</svg>
								Back
							</button>
							<div className='text-xs tracking-widest text-gray-500 font-light'>
								ASSESSMENT & BENCHMARKS
							</div>
							<div className='w-16' />
						</div>
					</div>

					{/* Tab Navigation */}
					<div className='border-b border-gray-200'>
						<div className='mx-auto max-w-6xl px-12'>
							<div className='flex gap-8'>
								<button
									onClick={() => setActiveTab("assessment")}
									className={`py-4 text-sm font-medium border-b-2 transition-colors ${
										activeTab === "assessment"
											? "border-gray-900 text-gray-900"
											: "border-transparent text-gray-500 hover:text-gray-700"
									}`}
								>
									Burn Rate Assessment
								</button>
								<button
									onClick={() => setActiveTab("benchmarking")}
									className={`py-4 text-sm font-medium border-b-2 transition-colors ${
										activeTab === "benchmarking"
											? "border-gray-900 text-gray-900"
											: "border-transparent text-gray-500 hover:text-gray-700"
									}`}
								>
									Benchmarking Framework
								</button>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				{activeTab === "assessment" ? (
					<main className='mx-auto max-w-6xl px-12 py-20'>
						{/* Title Section */}
						<div className='mb-24'>
							<h1 className='text-7xl font-light text-gray-900 mb-4 leading-tight tracking-tight'>
								Burn Rate Assessment
							</h1>
							<p className='text-xl text-gray-600 font-light'>
								Fiduciary & Offshore Advisory Platform
							</p>
							<div className='h-px w-20 bg-gray-900 mt-10'></div>
						</div>

						{/* Business Classification */}
						<section className='mb-20 pb-20 border-b border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Business Classification
							</h2>
							<div className='space-y-6'>
								<p className='text-gray-700 text-lg leading-relaxed font-light max-w-3xl'>
									The company is being built as a boutique fiduciary and
									offshore advisory platform, operating within the Trust &
									Corporate Service Provider (TCSP) segment alongside
									established firms such as Trident Trust and similar global
									operators.
								</p>
								<p className='text-gray-700 text-lg leading-relaxed font-light max-w-3xl'>
									This segment is characterised by high regulatory intensity,
									reputational dependency, and low tolerance for operational
									immaturity. Economics are driven by credibility and compliance
									rather than client volume.
								</p>
							</div>
						</section>

						{/* Assessment Title */}
						<div className='mb-16 pt-8'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest'>
								Assessment of Burn Rationale
							</h2>
						</div>

						{/* Assessment Points */}
						<div className='space-y-12'>
							{/* Point 1 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											1
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Regulatory Infrastructure Is a Non-Discretionary Entry
											Cost
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												TCSPs are required to establish AML/KYC frameworks,
												governance controls, risk policies, and jurisdictional
												compliance capability prior to onboarding clients. These
												costs are incurred irrespective of revenue and represent
												the minimum viable operating threshold.
											</p>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Independent 2025 market analysis confirms that growth in
												trust and corporate services is driven by regulatory
												complexity and cross-border structuring demand,
												increasing upfront institutional requirements for new
												entrants.
											</p>
											<div className='mt-6 pt-4 border-t border-gray-200'>
												<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
													Reference
												</p>
												<a
													href='https://www.prnewswire.com/news-releases/trust--corporate-service-market-to-grow-by-usd-1-79-billion-2025-2029-with-rising-adoption-for-tax-efficiency--structuring-report-on-how-ai-is-driving-market-transformation---technavio-302368510.html'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-gray-700 hover:text-gray-900 underline break-all font-light'
												>
													Trust & Corporate Service Market Analysis (2025-2029)
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* Point 2 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											2
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Banking and Counterparty Acceptance Creates Front-Loaded
											Costs
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Unlike most advisory models, fiduciary firms require
												acceptance by banks, trustees, registrars, and
												professional counterparties. This necessitates early
												investment in documentation standards, operating
												processes, and institutional presentation.
											</p>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Failure to meet these standards typically results in
												denial of access or de-risking, creating binary downside
												risk.
											</p>
										</div>
									</div>
								</div>
							</section>

							{/* Point 2A */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium'>
											2A
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											January-Style Front-Loading Is Industry-Standard
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Early-stage fiduciary and offshore advisory platforms
												typically incur disproportionate initial-period
												expenditure driven by unavoidable one-time setup
												requirements. These costs are structural in nature and
												do not represent the ongoing operating run-rate.
											</p>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Industry precedent indicates that front-loaded spend is
												commonly allocated toward:
											</p>
											<ul className='space-y-3 ml-6'>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													One-time entity, compliance, and governance
													establishment
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Core platform and process build-out
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Institutional branding and documentation standards
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Systems, tooling, and operational infrastructure
												</li>
											</ul>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Established TCSPs have consistently documented this
												pattern during their formative years. JTC Group, in
												commentary on its early growth phase, has noted:
											</p>
											<blockquote className='pl-6 py-4 border-l-2 border-gray-300 italic text-gray-700 text-lg leading-relaxed font-light'>
												&ldquo;Early investment in systems, governance, and
												people was essential to ensure long-term regulatory and
												client confidence.&rdquo;
											</blockquote>
										</div>
									</div>
								</div>
							</section>

							{/* Point 3 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											3
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Credibility Must Precede Revenue Generation
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												High-value fiduciary mandates are awarded based on
												perceived institutional robustness rather than price or
												speed. Client acquisition is episodic, high-ticket, and
												reputation-sensitive.
											</p>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												2025 sector commentary on offshore fiduciary services
												highlights that governance quality and operating
												maturity are prerequisites for participation in this
												market.
											</p>
											<div className='mt-6 pt-4 border-t border-gray-200'>
												<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
													Reference
												</p>
												<a
													href='https://www.armstrong-ts.com/offshore-fiduciary-services-a-compelling-opportunity-for-private-equity-investors/'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-gray-700 hover:text-gray-900 underline break-all font-light'
												>
													Offshore Fiduciary Services Analysis - Armstrong Trust
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* Point 4 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											4
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Intellectual Capital Is Structurally Front-Loaded
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Trust structuring and cross-border advisory require
												jurisdiction-specific legal and regulatory expertise.
												This knowledge base must be developed ex-ante and cannot
												be efficiently assembled post-mandate.
											</p>
										</div>
									</div>
								</div>
							</section>

							{/* Point 5 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											5
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Independent Fiduciary Firms Compete on Capability, Not
											Scale
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												2025 analysis of independent trust companies indicates
												that differentiation is driven by technical depth,
												governance quality, and regulatory competence rather
												than pricing or headcount.
											</p>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Lean operating models still require a stable baseline
												cost to sustain these capabilities.
											</p>
											<div className='mt-6 pt-4 border-t border-gray-200'>
												<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
													Reference
												</p>
												<a
													href='https://mercercapital.com/independent-trust-company-trends-in-2025/'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-gray-700 hover:text-gray-900 underline break-all font-light'
												>
													Independent Trust Company Trends (2025) - Mercer
													Capital
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* Point 6 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											6
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Stable Burn Profile Signals Operating Discipline
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Post-setup expenditure stabilises at a low, predictable
												level, indicating:
											</p>
											<ul className='space-y-3 ml-6'>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													No speculative hiring
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Founder-led execution
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Expansion tied to confirmed mandates
												</li>
											</ul>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												This profile is consistent with capital-efficient
												professional services platforms.
											</p>
										</div>
									</div>
								</div>
							</section>

							{/* Point 7 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											7
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Under-Investment Carries Material Downside Risk
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												Specialist offshore finance reporting documents that
												TCSPs which under-invest in compliance and governance
												face elevated risk of bank de-risking, regulatory
												intervention, and reputational impairment.
											</p>
											<div className='mt-6 pt-4 border-t border-gray-200'>
												<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
													Reference
												</p>
												<a
													href='https://www.offshoreinvestment.com/why-banks-are-de-risking-trust-and-corporate-service-providers/'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-gray-700 hover:text-gray-900 underline break-all font-light'
												>
													Bank De-Risking Analysis - Offshore Investment
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* Point 8 */}
							<section className='pb-12 border-b border-gray-200'>
								<div className='flex gap-8'>
									<div className='flex-shrink-0'>
										<div className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium'>
											8
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-6'>
											Burn Converts Capital Into Franchise Value
										</h3>
										<div className='space-y-6'>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												In fiduciary services, early capital deployment converts
												into:
											</p>
											<ul className='space-y-3 ml-6'>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Regulatory credibility
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Counterparty trust
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Brand legitimacy
												</li>
												<li className='text-gray-700 text-lg leading-relaxed font-light'>
													Long-term optionality for high-value mandates
												</li>
											</ul>
											<p className='text-gray-700 text-lg leading-relaxed font-light'>
												These assets are durable and difficult to replicate.
											</p>
										</div>
									</div>
								</div>
							</section>
						</div>

						{/* Conclusion */}
						<section className='mt-24 pt-20 border-t border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Conclusion
							</h2>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl'>
								The company&apos;s burn profile is consistent with sector
								economics for fiduciary and offshore advisory platforms.
								Expenditure is driven by regulatory readiness, institutional
								credibility, and intellectual capital formation. Each represents
								a prerequisite for sustainable revenue generation in this
								category. Independent 2025 industry coverage supports the
								necessity of upfront investment, with under-investment posing
								material access and reputational risks. The observed burn
								structure reflects front-loaded setup costs followed by a low,
								stable operating baseline. This indicates disciplined capital
								allocation aligned with long-term franchise building rather than
								growth-at-all-costs behaviour.
							</p>
						</section>
					</main>
				) : (
					<main className='mx-auto max-w-6xl px-12 py-20'>
						{/* Benchmarking Document */}
						<div className='mb-24'>
							<h1 className='text-7xl font-light text-gray-900 mb-4 leading-tight tracking-tight'>
								Benchmarking Framework Memo
							</h1>
							<p className='text-xl text-gray-600 font-light'>
								How Early-Stage Fiduciary & Offshore Advisory Platforms Are
								Correctly Assessed
							</p>
							<div className='h-px w-20 bg-gray-900 mt-10'></div>
						</div>

						{/* Purpose */}
						<section className='mb-20 pb-20 border-b border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Purpose of This Memo
							</h2>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl'>
								This memo explains why traditional early-stage benchmarking
								(peer revenue, burn multiples, or startup comparables) is
								inappropriate for fiduciary and offshore advisory platforms, and
								outlines the three accepted proxies used by institutional
								investors to evaluate such businesses.
							</p>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mt-6'>
								This framework reflects actual IC and LP practice in the
								fiduciary, trust, and corporate services sector.
							</p>
						</section>

						{/* Context */}
						<section className='mb-20 pb-20 border-b border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Context
							</h2>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-6'>
								Fiduciary and offshore advisory firms operate under
								compliance-led, credibility-first economics, where institutional
								readiness must be established before meaningful revenue
								generation.
							</p>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-4'>
								As a result:
							</p>
							<ul className='space-y-3 ml-6 max-w-4xl'>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Early-stage revenue and burn figures are rarely public
								</li>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Comparable &ldquo;new firm&rdquo; benchmarks do not exist
								</li>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Assessment relies on proxy analysis, not peer matching
								</li>
							</ul>
						</section>

						{/* Proxy 1 */}
						<section className='mb-16'>
							<div className='mb-8'>
								<h2 className='text-xl font-semibold text-gray-900 mb-2'>
									Proxy 1: Acquisition / PE Commentary (Most Reliable)
								</h2>
								<p className='text-base text-gray-600 font-medium'>
									Example: Intertrust Group Buyout
								</p>
							</div>

							<div className='space-y-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										What Reuters Makes Clear
									</h3>
									<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-6'>
										Value in fiduciary and corporate services firms is driven
										by:
									</p>
									<ul className='space-y-3 ml-6 max-w-4xl mb-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Compliance infrastructure
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Governance maturity
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Recurring fiduciary revenue
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Margin expansion occurs after scale, not at inception
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Early-stage cost bases are compliance-heavy by design
										</li>
									</ul>
									<div className='mt-6 pt-4 border-t border-gray-200'>
										<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
											Reference
										</p>
										<a
											href='https://www.reuters.com/world/intertrust-buyout-2022-01-31/'
											target='_blank'
											rel='noopener noreferrer'
											className='text-sm text-gray-700 hover:text-gray-900 underline font-light'
										>
											Reuters: Intertrust Group Buyout Analysis
										</a>
									</div>
								</div>

								<div className='bg-gray-50 p-8 rounded'>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										Why This Matters
									</h3>
									<p className='text-gray-700 text-lg leading-relaxed font-light'>
										Reuters explicitly frames fiduciary firms as
										institution-cost businesses first, revenue businesses
										second. This aligns with how private equity evaluates and
										prices such platforms.
									</p>
								</div>

								<div className='border-l-4 border-gray-900 pl-6'>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										IC Inference (Standard & Accepted)
									</h3>
									<ul className='space-y-3'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Early operating years typically run at low or negative
											margins
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Revenue lags institutional and compliance investment
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Front-loaded spend is structural, not discretionary
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Proxy 2 */}
						<section className='mb-16 pb-16 border-b border-gray-200'>
							<div className='mb-8'>
								<h2 className='text-xl font-semibold text-gray-900 mb-2'>
									Proxy 2: IPO Documents of Fiduciary Firms (Hard Numbers, Late
									Stage)
								</h2>
								<p className='text-base text-gray-600 font-medium'>
									Example: JTC Group (LSE-listed)
								</p>
							</div>

							<div className='space-y-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										Disclosed Facts
									</h3>
									<ul className='space-y-3 ml-6 max-w-4xl mb-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											JTC took 20+ years to reach institutional scale
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											IPO-stage revenues (much later): £147m+
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Cost base dominated by: Staff, Compliance, Governance and
											systems
										</li>
									</ul>
									<div className='mt-6 pt-4 border-t border-gray-200'>
										<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
											Reference
										</p>
										<a
											href='https://www.reuters.com/article/uk-jtc-group-ipo-idUKKCN1VX0Q8'
											target='_blank'
											rel='noopener noreferrer'
											className='text-sm text-gray-700 hover:text-gray-900 underline font-light'
										>
											Reuters: JTC Group IPO Coverage
										</a>
									</div>
								</div>

								<div className='bg-gray-50 p-8 rounded'>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										Why ICs Use This Proxy
									</h3>
									<p className='text-gray-700 text-lg leading-relaxed font-light mb-4'>
										Not to benchmark early profitability, but to
										backward-engineer the institutional cost base required to
										build a durable fiduciary platform.
									</p>
								</div>

								<div className='border-l-4 border-gray-900 pl-6'>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										IC Interpretation
									</h3>
									<ul className='space-y-3'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Institutional fiduciary firms become profitable only after
											prolonged upfront investment
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Early burn is an expected feature, not a failure mode
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Proxy 3 */}
						<section className='mb-16 pb-16 border-b border-gray-200'>
							<div className='mb-8'>
								<h2 className='text-xl font-semibold text-gray-900 mb-2'>
									Proxy 3: 2025 Industry Research on New Entrants
								</h2>
								<p className='text-base text-gray-600 font-medium'>
									Example: Trust & Corporate Services Market Growth (2025)
								</p>
							</div>

							<div className='space-y-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										Key Findings
									</h3>
									<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-4'>
										Market growth is driven by:
									</p>
									<ul className='space-y-3 ml-6 max-w-4xl mb-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Regulatory complexity
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Cross-border structuring demand
										</li>
									</ul>
									<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-4'>
										New entrants face:
									</p>
									<ul className='space-y-3 ml-6 max-w-4xl mb-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Higher upfront compliance costs
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Greater credibility thresholds
										</li>
									</ul>
									<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-4'>
										Barriers to entry are:
									</p>
									<ul className='space-y-3 ml-6 max-w-4xl mb-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Compliance and institutional trust
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Not market demand
										</li>
									</ul>
									<div className='mt-6 pt-4 border-t border-gray-200'>
										<p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>
											Reference
										</p>
										<a
											href='https://www.prnewswire.com/news-releases/trust--corporate-service-market-to-grow-by-usd-1-79-billion-2025-2029-with-rising-adoption-for-tax-efficiency--structuring-report-on-how-ai-is-driving-market-transformation---technavio-302368510.html'
											target='_blank'
											rel='noopener noreferrer'
											className='text-sm text-gray-700 hover:text-gray-900 underline font-light break-all'
										>
											Trust & Corporate Service Market Analysis (2025-2029)
										</a>
									</div>
								</div>

								<div className='bg-gray-50 p-8 rounded'>
									<h3 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4'>
										Relevance to Early-Stage Economics
									</h3>
									<p className='text-gray-700 text-lg leading-relaxed font-light mb-4'>
										This research supports a burn-before-revenue model, where:
									</p>
									<ul className='space-y-3 ml-6'>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Institutional readiness precedes monetisation
										</li>
										<li className='text-gray-700 text-lg leading-relaxed font-light'>
											Cost pressure exists at inception, not only at scale
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Consolidated View */}
						<section className='mb-16 pb-16 border-b border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Consolidated IC View
							</h2>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mb-6'>
								Across all three proxies:
							</p>
							<ul className='space-y-4 ml-6 max-w-4xl'>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Fiduciary platforms are built institution-first
								</li>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Early-stage burn reflects: Compliance, Governance,
									Counterparty acceptability
								</li>
								<li className='text-gray-700 text-lg leading-relaxed font-light'>
									Revenue and margin density follow after these foundations are
									established
								</li>
							</ul>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl mt-6'>
								As a result, absence of early-stage revenue benchmarks is normal
								and expected in this sector.
							</p>
						</section>

						{/* Closing Note */}
						<section className='mt-24 pt-20 border-t border-gray-200'>
							<h2 className='text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8'>
								Concluding Remarks
							</h2>
							<p className='text-gray-700 text-lg leading-relaxed font-light max-w-4xl'>
								The benchmarking framework outlined herein reflects established
								institutional practice for evaluating early-stage fiduciary and
								offshore advisory platforms. Given the absence of public
								comparables and the structural nature of pre-revenue
								institutional investment, reliance on proxy analysis represents
								the accepted methodology for IC-level assessment. This approach
								acknowledges that value creation in this sector follows a
								fundamentally different trajectory than venture-backed
								technology or consumer businesses, where revenue acceleration
								precedes operational maturity. In the fiduciary domain,
								institutional credibility must be secured before sustainable
								revenue generation becomes viable, making traditional burn
								multiples and peer revenue comparisons not merely difficult, but
								categorically inappropriate for investment evaluation.
							</p>
						</section>
					</main>
				)}

				{/* Footer */}
				<footer className='bg-white border-t border-gray-200 mt-24 py-12'>
					<div className='mx-auto max-w-6xl px-12'></div>
				</footer>
			</div>
		</ProtectedRoute>
	);
}
