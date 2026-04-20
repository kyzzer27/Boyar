/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";

const crewServices = [
	{
		num: "01",
		title: "Payroll Services",
		definition: "Automated and compliant crew remuneration processing",
		purpose:
			"Automated payroll processing (monthly, fortnightly, or weekly). Multi-currency salary payments using efficient FX platforms. Secure digital payslips accessible 24/7 via desktop or mobile. MLC-compliant payroll formats accepted by statutory bodies. This ensures accuracy, transparency, and regulatory compliance for seafarer remuneration.",
	},
	{
		num: "02",
		title: "Human Resources Management",
		definition: "Comprehensive HR support for maritime employment",
		purpose:
			"Comprehensive HR support covering the full employment lifecycle, including crew onboarding and offboarding, preparation and administration of flag-state approved employment contracts and Seafarers' Employment Agreements, crew travel coordination, disciplinary procedures and grievance handling, and employee sickness documentation and welfare support. HR services ensure compliance with maritime, employment, and flag-state regulations while supporting crew welfare and continuity.",
	},
	{
		num: "03",
		title: "Quality Assurance & Compliance",
		definition: "Maritime Labour Convention adherence and auditing",
		purpose:
			"Full compliance with Maritime Labour Convention (MLC) requirements. Annual independent audits conducted by Lloyd's Register. Support for MLC annual inspections and audits. Payroll Assurance Scheme (PAS) accreditation from the Chartered Institute of Payroll Professionals. This provides assurance to owners, flag states, and inspectors that all employment and payroll processes meet industry gold standards.",
	},
];

const registrationServices = [
	{
		num: "01",
		title: "Flag Selection Advisory",
		definition: "Strategic analysis of global shipping registries",
		purpose:
			"Detailed analysis of global shipping registries. Comparison of regulatory frameworks, costs, and operational flexibility. Matching vessel usage and ownership profile to appropriate flag states. Flag selection is critical for regulatory exposure, crew rules, tax treatment, and operational freedom.",
	},
	{
		num: "02",
		title: "Vessel Registration & Deregistration",
		definition: "End-to-end registration management",
		purpose:
			"End-to-end handling of vessel registration and deregistration. Collection and submission of all registration documentation. Completion of registry forms and statutory filings. Liaison with flag authorities during and after registration. Payment and management of initial and annual registry fees. This ensures a smooth and compliant registration process across major global registries.",
	},
	{
		num: "03",
		title: "Local Representation",
		definition: "Flag-state statutory representation services",
		purpose:
			"Where required by the chosen flag state: Provision or arrangement of a local representative. Ongoing liaison between vessel owner and registry. Fulfilment of statutory local presence requirements. This is essential where owners are non-resident or non-incorporated in the flag jurisdiction.",
	},
];

const ownershipServices = [
	{
		num: "01",
		title: "Entity Formation for Vessel Ownership",
		definition: "Corporate structuring for yacht ownership",
		purpose:
			"Corporate and fiduciary structuring services to establish dedicated vessel-owning entities, including company or trust formation in suitable jurisdictions, due diligence collection and review, submission of incorporation and registration documents, initial FATCA and CRS classification, tax and VAT registration where applicable, economic substance classification, and bank account opening coordination. Proper ownership structuring supports asset protection, tax efficiency, and regulatory clarity.",
	},
	{
		num: "02",
		title: "Ongoing Corporate Administration",
		definition: "Continuous compliance and governance support",
		purpose:
			"Registered office and registered agent services. Company secretarial support. Director, trustee, or bank signatory provision. Government fee payments and annual renewals. Beneficial ownership reporting. Economic substance filings. FATCA / CRS sponsorship and reporting. Coordination of vessel insurance procurement. This avoids compliance lapses that could compromise registration or insurance coverage.",
	},
	{
		num: "03",
		title: "Financial Management & Accounting",
		definition: "Comprehensive vessel structure financial oversight",
		purpose:
			"Budgeting and cash-flow planning. Monthly account management and cash book support. Preparation of financial statements. Bookkeeping and statutory accounts. Financial planning for new builds and major refits. Management of prepaid credit and debit cards for crew expenses. This ensures financial discipline, transparency, and operational control.",
	},
];

const outsourcedBenefits = [
	"Provides access to regulated maritime expertise",
	"Ensures compliance with international conventions and flag rules",
	"Reduces operational and legal risk for owners",
	"Avoids the cost and complexity of in-house maritime administration",
];

export default function MarineServicesPage() {
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
									Marine Services
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Marine Services
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Yacht Ownership, Registration & Operational Support
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Marine services encompass the structuring, registration,
								operation, and ongoing administration of yachts and vessels for
								private clients, family offices, and corporates.
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
									Yacht ownership is a highly regulated, multi-jurisdictional
									activity involving maritime law, employment law, tax,
									corporate structuring, and international compliance. Proper
									structuring and outsourcing are essential to ensure:
								</p>
								<ul className='space-y-2 ml-6'>
									<li
										className='flex items-start gap-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-blue-600 font-bold'>•</span>
										<span>Regulatory and flag-state compliance</span>
									</li>
									<li
										className='flex items-start gap-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-blue-600 font-bold'>•</span>
										<span>Operational continuity</span>
									</li>
									<li
										className='flex items-start gap-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-blue-600 font-bold'>•</span>
										<span>Crew welfare and labour law adherence</span>
									</li>
									<li
										className='flex items-start gap-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-blue-600 font-bold'>•</span>
										<span>Asset protection and ownership transparency</span>
									</li>
									<li
										className='flex items-start gap-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-blue-600 font-bold'>•</span>
										<span>Financial and administrative efficiency</span>
									</li>
								</ul>
								<p
									className='font-semibold text-slate-900 mt-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									All marine services are delivered through specialist
									third-party suppliers, allowing owners to benefit from deep
									technical expertise without building in-house maritime
									infrastructure.
								</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Jurisdictional Note */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'
						>
							<h2
								className='text-2xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Coverage
							</h2>
							<p
								className='text-slate-700 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Yacht registration and related services are provided subject to
								availability and suitability, depending on vessel type and size,
								usage (private vs commercial), owner residency and structure,
								and tax, VAT, and compliance considerations. Flag selection and
								structuring are performed on a case-by-case basis, aligned with
								international maritime standards and owner objectives.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Crew Employment & Management */}
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
								Crew Employment & Management
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Crew employment is a core operational and compliance function
								governed by international maritime labour standards,
								particularly the Maritime Labour Convention (MLC).
							</p>
						</motion.div>

						<div className='space-y-6'>
							{crewServices.map((service, idx) => (
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

				{/* Vessel Registration & Flag Administration */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.7 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Vessel Registration & Flag Administration
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Comprehensive registration services ensuring compliance with
								international maritime standards and flag-state requirements.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{registrationServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.9 + idx * 0.05 }}
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

				{/* Vessel Ownership Structuring & Administration */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.0 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Vessel Ownership Structuring & Administration
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Corporate and fiduciary services for efficient and compliant
								yacht ownership structures.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{ownershipServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 1.2 + idx * 0.05 }}
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
								Outsourced Marine Services Model
							</h3>
							<p
								className='text-slate-700 mb-6 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								All marine services are delivered through specialist maritime,
								payroll, corporate, and compliance providers. This outsourced
								model:
							</p>
							<ul className='space-y-3 mb-6'>
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
								className='text-slate-900 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Without structured outsourcing, yacht owners would otherwise
								face fragmented service providers, regulatory exposure, and
								operational inefficiencies across jurisdictions.
							</p>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
