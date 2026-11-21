/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function EstoniaCryptoProposalPage() {
	const router = useRouter();
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
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
							CRYPTO LICENSE — ESTONIA
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
								Proposal for Estonia Crypto License
							</h2>
							<p
								className='text-base text-offering-muted leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								(Executed via Boyar Partners' partner team)
							</p>

							<div className='bg-offering-tint rounded-sm p-6 border-l-4 border-offering-gold space-y-4'>
								<h3 className='text-xl font-semibold text-offering-ink uppercase tracking-wide'>
									General Information and Advantages
								</h3>
								<p className='text-offering-body leading-relaxed'>
									Given new updates in regulations, Estonia is considered one of
									the most reputable destinations for the setup of
									crypto-related businesses. Established KYC and AML policies
									and clear procedures enable a favorable business climate that
									attracts fintech projects from all over the world.
								</p>
								<p className='text-offering-body leading-relaxed'>
									Estonia being a leader in blockchain adoption enables
									companies regulated within the country to have account opening
									possibilities at top-tier banks around the world. The country
									itself offers a very attractive tax rate and a range of
									supporting complementary services companies, including
									industry-leading software development businesses.
								</p>
								<p className='text-offering-body leading-relaxed'>
									The Estonian crypto license covers currency exchange services,
									virtual currency transactions, and custody. The main advantage
									of this license is its strong regulatory foundation, clear
									political and AML environment, worldwide usage acceptance, and
									strong reputation for establishing partner relationships with
									top service providers.
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
								Structure of the Company
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{[
									{
										title: "Shareholder",
										content:
											"1 shareholder (natural person or legal entity), whereby the director must be an Estonian citizen and resident",
									},
									{
										title: "Directors",
										content:
											"At least one director could be the shareholder, if the shareholder is a natural person",
									},
									{
										title: "Registered local office",
										content: "Provided by Boyar Partners' partner team",
									},
									{
										title: "Anti-Money Laundering officer",
										content: "Mandatory – (search of this person is included)",
									},
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-offering-tint rounded-sm p-6 border border-offering-line'
									>
										<h4
											className='font-semibold text-offering-ink mb-3'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{item.title}
										</h4>
										<p
											className='text-offering-body leading-relaxed text-sm'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{item.content}
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
								Incorporation and Licensing
							</h3>
							<div className='space-y-6'>
								<div className='bg-offering-tint border-2 border-offering-line rounded-sm p-6'>
									<h4 className='font-semibold text-offering-ink mb-2'>
										Timeframe for the incorporation of the Company and licensing
									</h4>
									<p className='text-offering-body font-medium text-lg'>
										Approx. 3 months
									</p>
									<p className='text-offering-muted text-sm mt-2'>
										(5–7 days for incorporation) | (10 days for account opening)
										| (2–3 months for licensing)
									</p>
								</div>
								<div className='bg-offering-tint border-2 border-offering-line rounded-sm p-6'>
									<h4 className='font-semibold text-offering-ink mb-3'>
										Minimum capital requirements
									</h4>
									<ul className='space-y-2 text-offering-body'>
										<li>
											100,000 EUR in case the company provides exchange and
											custody services
										</li>
										<li>
											250,000 EUR on the condition that the VASP provides crypto
											transaction services (including exchange and custody)
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
								Procedure and Requirements
							</h3>
							<div className='space-y-6'>
								<div>
									<h4 className='font-semibold text-offering-ink mb-4 text-lg'>
										Application forms
									</h4>
									<p className='text-offering-body'>
										Provided by Boyar Partners' partner team
									</p>
								</div>
								<div className='border-t pt-6'>
									<h4 className='font-semibold text-offering-ink mb-4 text-lg'>
										Documents for company incorporation and licensing
									</h4>
									<div className='space-y-4'>
										<div>
											<h5 className='font-semibold text-offering-ink mb-3'>
												Required documents from all involved individuals:
											</h5>
											<ul className='space-y-2 ml-4'>
												{[
													"Notarized passport copy",
													"Notarized utility bill issued in the last 2 months",
													"CV for each individual",
												].map((doc, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-offering-body'
													>
														<span className='text-offering-blue font-semibold mt-1'>
															▪
														</span>
														{doc}
													</li>
												))}
											</ul>
										</div>
										<div className='bg-offering-tint rounded-sm p-4 border border-offering-line'>
											<h5 className='font-semibold text-offering-ink mb-3'>
												For a corporate shareholder required documents include:
											</h5>
											<ul className='space-y-2 ml-4'>
												{[
													"Articles of Association",
													"Registered office address document",
													"Register of directors",
													"Register of UBOs (shareholder register, or incumbency certificate, or share certificates)",
												].map((doc, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-offering-body'
													>
														<span className='text-offering-blue font-semibold mt-1'>
															▪
														</span>
														{doc}
													</li>
												))}
											</ul>
										</div>
									</div>
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
								Services
							</h3>
							<p className='text-offering-muted mb-4 italic'>
								(Delivered via Boyar Partners' partner teams)
							</p>
							<div className='bg-offering-tint border-2 border-offering-line rounded-sm p-6 mb-6'>
								<h4 className='font-semibold text-offering-ink mb-2'>Pricing</h4>
								<p className='text-offering-body font-medium'>
									Available at the time of enquiry
								</p>
							</div>
							<ul className='space-y-3'>
								{[
									"Professional and agent fees",
									"Incorporation of an Estonia company OU",
									"Entry of the company into the commercial register",
									"Preparation and adaptation of the company KYC to the relevant payments and crypto activity (Exchange / Custody wallet provision)",
									"AML and KYC officer search and training",
									"Submitting the application to Estonian Financial Intelligence Unit (FIU)",
									"Leading the client and liaising with the regulator to ensure successful license issuance",
									"Legalizing all of the company documents and translation into English language",
									"Assistance in selecting and renting an office in Estonia",
									"Assistance in company share capital contribution",
									"Opening of company bank account",
									"Opening the company a crypto liquidity account",
								].map((service, idx) => (
									<li
										key={idx}
										className='flex items-start gap-3 text-offering-body'
									>
										<span className='text-offering-blue font-semibold mt-1'>✓</span>
										{service}
									</li>
								))}
							</ul>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h3
								className='text-2xl font-semibold text-offering-ink mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Confidentiality & Taxation
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-offering-tint rounded-sm p-6 border border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-4 text-lg'>
										Confidentiality
									</h4>
									<ul className='space-y-2 text-sm'>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-ink font-semibold'>•</span>
											Beneficial owner: Disclosed to authorities
										</li>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-ink font-semibold'>•</span>
											Shareholder: Disclosed to authorities
										</li>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-ink font-semibold'>•</span>
											Directors: Disclosed to authorities
										</li>
									</ul>
								</div>
								<div className='bg-offering-tint rounded-sm p-6 border-2 border-offering-line'>
									<h4 className='font-semibold text-offering-ink mb-4 text-lg'>
										Taxation
									</h4>
									<ul className='space-y-2 text-sm'>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-blue font-semibold'>✓</span>
											Corporate income tax – 0%
										</li>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-blue font-semibold'>✓</span>
											Distributed dividends tax – 20%
										</li>
										<li className='flex items-center gap-2 text-offering-body'>
											<span className='text-offering-blue font-semibold'>✓</span>VAT tax
											– 20%
										</li>
									</ul>
									<p className='text-xs text-offering-muted mt-3'>
										Company must submit annual financial statements and reports
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
