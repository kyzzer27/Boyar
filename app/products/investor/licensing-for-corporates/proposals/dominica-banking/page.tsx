/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DominicaBankingProposalPage() {
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
							BANKING LICENSE — DOMINICA
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
								Dominica International Banking License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "International Bank License",
									},
									{
										label: "Regulator",
										value: "Financial Services Unit (FSU)",
									},
									{ label: "Time for approval", value: "Approx. 4 months" },
									{
										label: "Minimum share capital",
										value: "USD 1,000,000",
									},
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "1" },
									{
										label: "Director qualifications",
										value: "Financial services background",
									},
									{
										label: "Compliance officer",
										value: "At least 1, proven track record",
									},
									{ label: "Board meeting location", value: "Anywhere" },
									{
										label: "Annual renewal fee",
										value: "USD 250",
									},
									{
										label: "Renewal if operations closed",
										value: "USD 20,000 donation",
									},
									{
										label: "Capital requirement type",
										value: "Cash, crypto, shares, bonds",
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
									Dominica is an established Caribbean jurisdiction offering an
									International Banking License under the supervision of the
									Financial Services Unit (FSU). The jurisdiction is suitable
									for institutions seeking to operate international banking
									activities, including deposits, lending, correspondent
									banking, and card issuing, within a flexible regulatory and
									tax-efficient environment.
								</p>
								<p>
									Dominica offers relatively fast approval timelines compared to
									other international banking jurisdictions and allows
									operational flexibility with board meetings permitted outside
									the jurisdiction.
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
								Key License Information
							</h3>
							<div className='space-y-4'>
								{[
									{
										label: "License Type",
										value: "International Bank License",
									},
									{
										label: "Regulator",
										value: "Financial Services Unit (FSU)",
									},
									{
										label: "Time for Approval",
										value: "Approx. 4 months",
									},
									{
										label: "Minimum Share Capital",
										value:
											"USD 1,000,000 (maintained as working capital: cash, crypto assets, shares, or bonds)",
									},
									{
										label: "Minimum Number of Shareholders",
										value: "1",
									},
									{
										label: "Minimum Number of Directors",
										value: "1",
									},
									{
										label: "Director Qualifications",
										value: "Director must have a financial services background",
									},
									{
										label: "Other Staff",
										value:
											"At least 1 compliance officer with a proven track record",
									},
									{
										label: "Location of Board Meetings",
										value: "Anywhere",
									},
									{
										label: "Documents Required",
										value:
											"Passport, proof of address, and bank statement of the ultimate beneficial owner",
									},
									{
										label: "Annual Renewal Fee",
										value: "USD 250",
									},
									{
										label: "Renewal in Case of Closure",
										value: "USD 20,000 donation",
									},
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-slate-50 rounded-lg p-4 border border-slate-200'
									>
										<p className='text-xs font-bold text-slate-600 uppercase tracking-wider mb-2'>
											{item.label}
										</p>
										<p className='text-slate-900 font-semibold'>{item.value}</p>
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
								Work Timeline and Procedure
							</h3>
							<div className='space-y-3'>
								{[
									"Formation of a Dominica International Business Corporation",
									"Preparation and drafting of shareholder and officer agreements",
									"Preparation and drafting of a narrative business plan",
									"Preparation of five-year financial projections",
									"Preparation of current financial statements",
									"Preparation of personal financial statements for owners",
									"Identification and appointment of principal representative and auditor",
									"Drafting of bank charter and prospectus",
									"Submission of banking license application to the Financial Services Unit",
									"Responding to regulator queries and information requests",
									"Facilitation of card network relationships (Visa and Mastercard)",
									"Preparation of internal policies and banking agreements",
									"Facilitation of IBAN/SWIFT and correspondent banking relationships",
									"Arrangement of required physical presence and local director",
									"Preparation and review of deposit, loan, and related banking agreements",
								].map((step, idx) => (
									<motion.div
										key={idx}
										variants={itemVariants}
										className='flex items-start gap-4 bg-slate-50 rounded-lg p-4 border border-slate-200'
									>
										<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm'>
											{idx + 1}
										</div>
										<p className='pt-1 text-slate-700'>{step}</p>
									</motion.div>
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
								Services and Pricing
							</h3>
							<div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-3'>Pricing</h4>
								<p className='text-slate-700 text-sm mb-3'>
									Available at the time of enquiry.
								</p>
								<p className='text-slate-700 text-sm'>
									Pricing may vary depending on correspondent banking setup,
									SWIFT connectivity, card issuing, and acquiring arrangements.
								</p>
							</div>

							<div>
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
										Assistance with correspondent banking, IBAN/SWIFT access,
										and card programs
									</li>
									<li>Compliance staffing coordination</li>
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
							<div className='space-y-6'>
								<div>
									<h4 className='font-bold text-slate-900 mb-3'>Taxation</h4>
									<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
										<p className='text-slate-700'>
											International banking entities operate under a
											tax-efficient regime, subject to applicable Dominica
											regulations.
										</p>
									</div>
								</div>

								<div className='bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>Reporting</h4>
									<p className='text-slate-700 text-sm'>
										Ongoing regulatory reporting and compliance filings are
										required in accordance with Financial Services Unit
										guidelines.
									</p>
								</div>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
