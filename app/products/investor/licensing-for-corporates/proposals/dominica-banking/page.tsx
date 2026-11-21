/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
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
			<div className='offering-page relative min-h-screen bg-white'>
				<header className='offering-masthead sticky top-0 bg-white/95 border-b border-offering-line z-50 shadow-none'>
					<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='group flex items-center gap-2 text-sm text-offering-muted hover:text-offering-ink transition-colors font-medium'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							<span className='group-hover:-translate-x-1 transition-transform duration-300'>
								←
							</span>
							Back
						</button>
						<h1
							className='text-2xl font-semibold text-offering-ink'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							BANKING LICENSE — DOMINICA
						</h1>
						<div className='offering-mark-slot w-16'><OfferingMark /></div>
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
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
										className='bg-offering-tint rounded-sm p-4 border border-offering-line'
									>
										<p className='text-xs font-semibold text-offering-muted uppercase tracking-wider mb-1'>
											{item.label}
										</p>
										<p className='text-offering-ink font-semibold text-sm'>
											{item.value}
										</p>
									</div>
								))}
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								General Information and Advantages
							</h3>
							<div className='space-y-4 text-offering-body leading-relaxed'>
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
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
										className='bg-offering-tint rounded-sm p-4 border border-offering-line'
									>
										<p className='text-xs font-semibold text-offering-muted uppercase tracking-wider mb-2'>
											{item.label}
										</p>
										<p className='text-offering-ink font-semibold'>{item.value}</p>
									</div>
								))}
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
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
										className='flex items-start gap-4 bg-offering-tint rounded-sm p-4 border border-offering-line'
									>
										<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-offering-tint text-offering-blue font-semibold text-sm'>
											{idx + 1}
										</div>
										<p className='pt-1 text-offering-body'>{step}</p>
									</motion.div>
								))}
							</div>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Services and Pricing
							</h3>
							<div className='bg-offering-tint border-2 border-offering-line rounded-sm p-6 mb-6'>
								<h4 className='font-semibold text-offering-ink mb-3'>Pricing</h4>
								<p className='text-offering-body text-sm mb-3'>
									Available at the time of enquiry.
								</p>
								<p className='text-offering-body text-sm'>
									Pricing may vary depending on correspondent banking setup,
									SWIFT connectivity, card issuing, and acquiring arrangements.
								</p>
							</div>

							<div>
								<h4 className='font-semibold text-offering-ink mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-offering-body space-y-2 list-disc list-inside'>
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

							<p className='text-offering-muted text-sm italic mt-6'>
								Services executed via licensed partner teams and local
								professionals.
							</p>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Taxation and Reporting
							</h3>
							<div className='space-y-6'>
								<div>
									<h4 className='font-semibold text-offering-ink mb-3'>Taxation</h4>
									<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
										<p className='text-offering-body'>
											International banking entities operate under a
											tax-efficient regime, subject to applicable Dominica
											regulations.
										</p>
									</div>
								</div>

								<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
									<h4 className='font-semibold text-offering-ink mb-2'>Reporting</h4>
									<p className='text-offering-body text-sm'>
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
