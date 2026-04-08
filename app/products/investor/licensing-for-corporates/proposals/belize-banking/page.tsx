/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BelizeBankingProposalPage() {
	const router = useRouter();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.1, 0.25, 1] as const,
			},
		},
	};

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50'>
				<header className='sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm'>
					<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='group flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							<span className='group-hover:-translate-x-1 transition-transform duration-300'>
								←
							</span>
							Back
						</button>
						<h1
							className='text-2xl font-bold text-slate-900'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							BANKING LICENSE — BELIZE
						</h1>
						<div className='w-16' aria-hidden='true'></div>
					</div>
				</header>

				<main className='mx-auto max-w-6xl px-6 py-12 sm:px-8'>
					<motion.div
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						className='space-y-8'
					>
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Belize International Banking License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "International Bank License",
									},
									{
										label: "Regulator",
										value: "International Financial Services Commission (IFSC)",
									},
									{ label: "Time for approval", value: "13–17 weeks" },
									{
										label: "Minimum share capital",
										value: "USD 500,000*",
									},
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "1" },
									{
										label: "Director Qualifications",
										value: "Financial services background",
									},
									{
										label: "Required Staff",
										value: "1 compliance officer",
									},
									{ label: "Annual renewal", value: "USD 25,000" },
									{
										label: "Corporate tax",
										value: "0% (international activities)",
									},
									{ label: "Jurisdiction", value: "Central America" },
									{
										label: "Capital holding",
										value: "Belize or Zone A Bank",
									},
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200'
									>
										<p className='text-xs font-bold text-slate-600 uppercase tracking-wider mb-1'>
											{item.label}
										</p>
										<p className='text-slate-900 font-semibold text-sm'>
											{item.value}
										</p>
									</div>
								))}
							</div>

							<p className='text-xs text-slate-500 italic'>
								*Held in a bank in Belize or in a Zone A Bank
							</p>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								General Information and Advantages
							</h3>
							<div className='space-y-4 text-slate-700 leading-relaxed'>
								<p>
									Belize is a well-established jurisdiction for international
									banking, offering a recognised regulatory framework under the
									supervision of the Belize International Financial Services
									Commission (IFSC).
								</p>
								<p>
									The Belize International Banking License is suitable for
									institutions seeking to operate cross-border banking
									activities, including deposits, lending, and international
									payment services, within a tax-neutral environment.
								</p>
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Procedural Timeline
							</h3>
							<div className='space-y-3'>
								{[
									"Formation of a company in Belize",
									"Preparation and drafting of shareholder and officer agreements",
									"Preparation and drafting of a narrative business plan",
									"Preparation of three-year financial projections",
									"Preparation of personal financial statements for owners",
									"Identification and appointment of principal representative and auditor",
									"Drafting of bank charter and prospectus",
									"Submission of banking license application to the IFSC",
									"Responding to regulator queries",
									"Receipt of international banking license",
								].map((step, idx) => (
									<div
										key={idx}
										className='flex items-start gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200'
									>
										<span className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex-shrink-0'>
											{idx + 1}
										</span>
										<p className='text-slate-700 leading-relaxed'>{step}</p>
									</div>
								))}
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Key Requirements
							</h3>
							<div className='space-y-6'>
								<div className='bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Minimum Capital Structure
									</h4>
									<p className='text-slate-700 text-sm'>
										USD 500,000 held in a bank in Belize or in a Zone A Bank
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Documents Required
									</h4>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>Passport</li>
										<li>Proof of address</li>
										<li>Bank statement of the ultimate beneficial owner</li>
									</ul>
								</div>

								<div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Staffing Requirements
									</h4>
									<p className='text-slate-700 text-sm'>
										At least 1 compliance officer with a proven track record
									</p>
								</div>
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Services and Pricing
							</h3>
							<div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-3'>Pricing</h4>
								<p className='text-slate-700 text-sm mb-3'>
									Available at the time of enquiry.
								</p>
								<p className='text-slate-700 text-sm'>
									Pricing may be subject to change due to optional correspondent
									banking arrangements, SWIFT connectivity, card issuing, or
									acquiring solutions.
								</p>
							</div>

							<div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
								<h4 className='font-bold text-slate-900 mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Bank incorporation and structuring</li>
									<li>
										Drafting of all legal, regulatory, and financial
										documentation
									</li>
									<li>
										Preparation of business plans and financial projections
									</li>
									<li>Regulator liaison and application management</li>
									<li>
										Assistance with correspondent banking and infrastructure
										setup
									</li>
								</ul>
							</div>

							<p className='text-slate-600 text-sm italic mt-6'>
								Services executed via licensed partner teams and local
								professionals.
							</p>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Taxation and Reporting
							</h3>
							<div className='grid grid-cols-1 gap-6 mb-8'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Taxation</h4>
									<p className='text-slate-700 text-sm'>
										International banks in Belize are generally tax-neutral on
										qualifying international activities.
									</p>
								</div>

								<div className='bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>Reporting</h4>
									<p className='text-slate-700 text-sm'>
										Ongoing regulatory reporting and compliance filings are
										required in accordance with IFSC regulations.
									</p>
								</div>
							</div>

							<div className='bg-amber-50 rounded-lg p-6 border border-amber-200'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Annual Renewal Fee
								</h4>
								<p className='text-slate-900 font-bold text-lg'>USD 25,000</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
