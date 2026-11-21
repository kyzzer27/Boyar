/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function CanadaMSBProposalPage() {
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
							MSB LICENSE — CANADA
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
								Canada Money Services Business License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "Money Services Business (MSB)",
									},
									{
										label: "Regulator",
										value: "FINTRAC",
									},
									{ label: "Time for approval", value: "4–5 weeks" },
									{
										label: "Minimum share capital",
										value: "Recommended capital*",
									},
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "1" },
									{
										label: "Registered Local Office",
										value: "Mandatory",
									},
									{
										label: "AML Officer",
										value: "Recommended",
									},
									{ label: "Corporate tax", value: "2–12%" },
									{ label: "GST/VAT", value: "5%" },
									{
										label: "Incorporation timeline",
										value: "4–5 business days",
									},
									{ label: "Registration timeline", value: "~3 weeks" },
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
								*Sufficient paid-up capital to support operational scope and
								banking relationships
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
									Canada is regarded as one of the most reliable and
									well-regulated financial systems globally. It is a major G7
									economy with a strong reputation for regulatory transparency,
									financial stability, and AML integrity.
								</p>
								<p>
									The Canadian Money Services Business (MSB) license, regulated
									by FINTRAC (Financial Transactions and Reports Analysis Centre
									of Canada), allows entities to conduct a broad range of
									financial activities, including money transfer services,
									currency exchange, virtual currency transactions, ATM
									operations, cheque cashing, and issuance or redemption of
									money orders and bank drafts.
								</p>
								<p>
									The key advantages of the Canadian MSB license include
									regulatory credibility, global acceptance by banks and
									counterparties, relatively fast setup timelines, and minimal
									capital requirements compared to many EU and offshore payment
									licenses.
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
								Company Structure
							</h3>
							<div className='space-y-4'>
								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-2'>Shareholder</h4>
									<p className='text-offering-body'>
										1 shareholder (natural person or legal entity), with no
										restrictions on nationality or residency.
									</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-2'>Directors</h4>
									<p className='text-offering-body'>
										At least 1 director. The director may also be the
										shareholder if the shareholder is a natural person.
									</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-2'>
										Registered Local Office
									</h4>
									<p className='text-offering-body'>Mandatory.</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-2'>
										Anti-Money Laundering Officer
									</h4>
									<p className='text-offering-body'>
										Recommended. An experienced AML Compliance Officer may be
										appointed internally or externally.
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
								Incorporation and Licensing Timeline
							</h3>
							<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6 mb-6'>
								<h4 className='font-semibold text-offering-ink mb-3'>
									Total Timeframe: 4–5 weeks
								</h4>
								<ul className='text-offering-body space-y-2 list-disc list-inside'>
									<li>4–5 business days for company incorporation</li>
									<li>
										Approximately 3 weeks for MSB registration with FINTRAC
									</li>
								</ul>
							</div>

							<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
								<h4 className='font-semibold text-offering-ink mb-2'>
									Minimum Capital Requirements
								</h4>
								<p className='text-offering-body text-sm'>
									There is no formally prescribed minimum share capital.
									However, it is recommended that the company maintain
									sufficient paid-up capital to support its operational scope
									and banking relationships.
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
								Procedure and Requirements
							</h3>
							<div className='space-y-6'>
								<div>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Documents Required from Individuals (Directors,
										Shareholders, Beneficial Owners)
									</h4>
									<ul className='text-offering-body space-y-2 list-disc list-inside'>
										<li>Notarised passport copy</li>
										<li>
											Notarised utility bill issued within the last 3 months
										</li>
										<li>Curriculum Vitae (CV)</li>
									</ul>
								</div>

								<div>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Documents Required from Corporate Shareholders (if
										applicable)
									</h4>
									<ul className='text-offering-body space-y-2 list-disc list-inside'>
										<li>Articles of Association</li>
										<li>Registered office address document</li>
										<li>Register of directors</li>
										<li>
											Register of ultimate beneficial owners (shareholder
											register, incumbency certificate, or share certificates)
										</li>
									</ul>
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
									Pricing may vary depending on activity scope, compliance
									framework complexity, and optional services.
								</p>
							</div>

							<div className='mb-6'>
								<h4 className='font-semibold text-offering-ink mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-offering-body space-y-2 list-disc list-inside'>
									<li>
										Incorporation of a Canadian company (typically British
										Columbia Limited Liability Company)
									</li>
									<li>Entry of the company into the commercial register</li>
									<li>
										Preparation and adaptation of AML/KYC policies aligned with
										FINTRAC requirements
									</li>
									<li>MSB registration submission to FINTRAC</li>
									<li>
										Liaison with the regulator until successful registration
									</li>
									<li>AML Compliance Officer sourcing and training support</li>
									<li>Coordination of company bank account opening</li>
									<li>
										Coordination of crypto-friendly or payment-related accounts
										where applicable
									</li>
								</ul>
							</div>

							<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
								<h4 className='font-semibold text-offering-ink mb-3'>
									Optional Services:
								</h4>
								<ul className='text-offering-body space-y-2 list-disc list-inside'>
									<li>Nominee Director or Shareholder services</li>
									<li>
										Swiss or EU banking introductions (subject to feasibility)
									</li>
									<li>Ongoing compliance support and transaction monitoring</li>
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
								Confidentiality and Taxation
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Beneficial Owner
									</h4>
									<p className='text-offering-body'>Disclosed to authorities.</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>Shareholder</h4>
									<p className='text-offering-body'>Disclosed to authorities.</p>
								</div>

								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-3'>Directors</h4>
									<p className='text-offering-body'>Disclosed to authorities.</p>
								</div>
							</div>

							<div>
								<h3 className='text-xl font-semibold text-offering-ink mb-4'>
									Taxation
								</h3>
								<div className='space-y-3 mb-6'>
									{[
										{
											label: "Corporate income tax",
											value: "2–12%*",
										},
										{
											label: "GST / VAT",
											value: "5%",
										},
									].map((item, idx) => (
										<div
											key={idx}
											className='flex justify-between items-center bg-offering-tint rounded-sm p-4 border border-offering-line'
										>
											<p className='font-semibold text-offering-ink'>
												{item.label}
											</p>
											<p className='text-offering-body font-semibold'>{item.value}</p>
										</div>
									))}
								</div>

								<p className='text-xs text-offering-muted italic mb-6'>
									*Lower rate applies up to the British Columbia small business
									threshold of CAD 500,000
								</p>
							</div>

							<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
								<h4 className='font-semibold text-offering-ink mb-2'>Reporting</h4>
								<p className='text-offering-body text-sm'>
									Annual financial statements and ongoing regulatory reporting
									to FINTRAC are required.
								</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
