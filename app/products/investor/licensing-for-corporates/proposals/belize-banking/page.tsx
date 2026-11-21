/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
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
			<div className='offering-page relative min-h-screen bg-white'>
				<OfferingMark />
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h2
								className='offering-subject text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
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

							<p className='text-xs text-offering-muted italic'>
								*Held in a bank in Belize or in a Zone A Bank
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
								General Information and Advantages
							</h3>
							<div className='space-y-4 text-offering-body leading-relaxed'>
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
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
										className='flex items-start gap-4 p-3 rounded-sm bg-offering-tint border border-offering-line'
									>
										<span className='flex items-center justify-center w-8 h-8 rounded-full bg-offering-ink text-white font-semibold text-sm flex-shrink-0'>
											{idx + 1}
										</span>
										<p className='text-offering-body leading-relaxed'>{step}</p>
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
								Key Requirements
							</h3>
							<div className='space-y-6'>
								<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Minimum Capital Structure
									</h4>
									<p className='text-offering-body text-sm'>
										USD 500,000 held in a bank in Belize or in a Zone A Bank
									</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Documents Required
									</h4>
									<ul className='text-offering-body space-y-2 list-disc list-inside'>
										<li>Passport</li>
										<li>Proof of address</li>
										<li>Bank statement of the ultimate beneficial owner</li>
									</ul>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Staffing Requirements
									</h4>
									<p className='text-offering-body text-sm'>
										At least 1 compliance officer with a proven track record
									</p>
								</div>
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
									Pricing may be subject to change due to optional correspondent
									banking arrangements, SWIFT connectivity, card issuing, or
									acquiring solutions.
								</p>
							</div>

							<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
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
										Assistance with correspondent banking and infrastructure
										setup
									</li>
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
							<div className='grid grid-cols-1 gap-6 mb-8'>
								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>Taxation</h4>
									<p className='text-offering-body text-sm'>
										International banks in Belize are generally tax-neutral on
										qualifying international activities.
									</p>
								</div>

								<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
									<h4 className='font-semibold text-offering-ink mb-2'>Reporting</h4>
									<p className='text-offering-body text-sm'>
										Ongoing regulatory reporting and compliance filings are
										required in accordance with IFSC regulations.
									</p>
								</div>
							</div>

							<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
								<h4 className='font-semibold text-offering-ink mb-2'>
									Annual Renewal Fee
								</h4>
								<p className='text-offering-ink font-semibold text-lg'>USD 25,000</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
