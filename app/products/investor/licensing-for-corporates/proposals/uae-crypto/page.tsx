/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function UAECryptoProposalPage() {
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
				{/* Header */}
				<header className='sticky top-0 bg-white/95 border-b border-slate-200 z-50 shadow-sm'>
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
							CRYPTO LICENSE — UAE (DMCC)
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
						{/* Overview Section */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Proposal for UAE Crypto License
							</h2>
							<p
								className='text-base text-slate-600 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								(Executed via Boyar Partners' partner team)
							</p>

							<div className='space-y-6'>
								<div>
									<h3
										className='text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										General Information and Advantages
									</h3>
									<div className='bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-6 border-l-4 border-purple-500 space-y-4'>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Dubai Multi Commodities Centre – DMCC – is a Free Economic
											Zone of Dubai, created to set up a center of the commodity
											market in Dubai. Nowadays DMCC is considered the most
											fast-growing and modern Economic zone in UAE in general.
										</p>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											The center provides unique industrial market
											infrastructure and the whole range of services for a gold
											market, precious metals, diamonds and gemstones, energy
											resources and other commodity industries.
										</p>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											To carry any business activity on the territory of DMCC
											companies, both residents and non-residents of the UAE,
											have to get a special license. It should be noted that
											there are two different types of licenses.
										</p>
										<div className='mt-6 space-y-3 bg-white/50 rounded-lg p-4'>
											<div>
												<h4 className='font-bold text-slate-900 mb-1'>
													Commodities license
												</h4>
												<p className='text-slate-700 text-sm'>
													a document which allows sale and purchase of raw
													materials
												</p>
											</div>
											<div>
												<h4 className='font-bold text-slate-900 mb-1'>
													Non-commodities license
												</h4>
												<p className='text-slate-700 text-sm'>
													a document providing the right to provide customer
													services (including financial services)
												</p>
											</div>
										</div>
										<div className='mt-6'>
											<h4 className='font-bold text-slate-900 mb-3'>
												Advantages of free zone DMCC:
											</h4>
											<ul className='space-y-2'>
												{[
													"100% foreign ownership of the company: local sponsors are not required",
													"1% corporate tax for a period of 50 years",
													"No restrictions on the transfer of capital and income of the company",
													"2% import and re-export tax",
													"3% income tax",
													"No currency restrictions",
													"No restrictions on hiring foreign employees",
												].map((adv, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-slate-700'
													>
														<span className='text-purple-600 font-bold mt-1'>
															▪
														</span>
														{adv}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</motion.section>

						{/* Structure Section */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Structure of the Company
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{[
									{
										title: "Shareholder",
										content:
											"1 shareholder (natural person or legal entity) without any restriction of the nationality and residence",
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
										content: "Recommended",
									},
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200'
									>
										<h4
											className='font-bold text-slate-900 mb-3'
											style={{ fontFamily: "var(--font-benzin)" }}
										>
											{item.title}
										</h4>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{item.content}
										</p>
									</div>
								))}
							</div>
						</motion.section>

						{/* Incorporation and Licensing */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Incorporation and Licensing
							</h3>
							<div className='space-y-6'>
								<div className='bg-purple-50 border-2 border-purple-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Timeframe for the incorporation of the Company and licensing
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										Approx. 4–6 weeks
									</p>
									<p className='text-slate-600 text-sm mt-2'>
										(1–2 weeks for incorporation) | (2–4 weeks for licensing)
									</p>
								</div>
								<div className='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Minimum capital requirements
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										10,000 AED or 13,200 EUR share capital
									</p>
								</div>
							</div>
						</motion.section>

						{/* Procedure and Requirements */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Procedure and Requirements
							</h3>
							<div className='space-y-6'>
								<div>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Application forms
									</h4>
									<p className='text-slate-700'>
										Provided by Boyar Partners' partner team
									</p>
								</div>
								<div className='border-t pt-6'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Documents for company incorporation and licensing
									</h4>
									<div className='space-y-4'>
										<div>
											<h5 className='font-semibold text-slate-900 mb-3'>
												Required documents from all involved individuals
												(directors, shareholders and beneficial owners):
											</h5>
											<ul className='space-y-2 ml-4'>
												{[
													"Notarized passport copy",
													"Notarized utility bill issued in the last 2 months",
													"CV for each individual",
												].map((doc, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-slate-700'
													>
														<span className='text-purple-600 font-bold mt-1'>
															▪
														</span>
														{doc}
													</li>
												))}
											</ul>
										</div>
										<div className='bg-slate-50 rounded-lg p-4 border border-slate-200'>
											<h5 className='font-semibold text-slate-900 mb-3'>
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
														className='flex items-start gap-3 text-slate-700'
													>
														<span className='text-purple-600 font-bold mt-1'>
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

						{/* Services Section */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Services
							</h3>
							<p className='text-slate-600 mb-4 italic'>
								(Delivered via Boyar Partners' partner teams)
							</p>
							<div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-2'>Pricing</h4>
								<p className='text-slate-700 font-medium'>
									Available at the time of enquiry
								</p>
							</div>
							<div>
								<h4 className='font-bold text-slate-900 mb-4'>
									Services include:
								</h4>
								<ul className='space-y-3 mb-8'>
									{[
										"Professional and agent fees",
										"Incorporation of a Dubai Limited Liability Company",
										"Entry of the company into the commercial register",
										"Preparation and adaptation of the company KYC to the relevant crypto activity the company will perform in the business plan",
										"Submitting the application to the Dubai Multi Commodities Center to receive the crypto license",
										"Leading the client and liaising with the regulator to ensure successful license issuance",
										"Legalizing all of the company documents and sworn translation into English language",
										"Opening of company bank account",
										"Opening the company a crypto liquidity account",
									].map((service, idx) => (
										<li
											key={idx}
											className='flex items-start gap-3 text-slate-700'
										>
											<span className='text-purple-600 font-bold mt-1'>✓</span>
											{service}
										</li>
									))}
								</ul>
							</div>
						</motion.section>

						{/* Authorized Activities */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Authorized Activities
							</h3>
							<div className='space-y-6'>
								<div className='bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500'>
									<h4 className='font-bold text-slate-900 mb-2'>
										7229-99 Distributed Ledger Technology Services
									</h4>
									<p className='text-slate-700 leading-relaxed'>
										This activity includes providing database management
										solutions and ancillary services based on distributed ledger
										technologies, such as Blockchain. Companies with these
										activities are not permitted to trade in, or set up an
										exchange for, currencies or cryptocurrencies/commodities or
										provide any financial activity services, brokerage or
										payment processing.
									</p>
								</div>
								<div className='bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500'>
									<h4 className='font-bold text-slate-900 mb-2'>
										6599-92 Proprietary Trading in Crypto-commodities
									</h4>
									<p className='text-slate-700 leading-relaxed'>
										This activity includes the buying and selling (Proprietary
										Trading) of crypto-commodities developed on distributed
										ledger technology applications. This activity does not
										include acting as an exchange, providing brokerage services,
										financial services, banking services, payment processing, or
										storage services.
									</p>
								</div>
							</div>
						</motion.section>

						{/* Optional Services */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Optional Services
							</h3>
							<ul className='space-y-3'>
								{[
									"Nominee Director (EU) – available on enquiry",
									"Nominee Shareholder (EU) – available on enquiry",
									"Nominee (both) Shareholder and Director (same person) – available on enquiry",
									"C2B account opening – available on enquiry",
									"Opening Swiss crypto-friendly bank – available on enquiry",
								].map((service, idx) => (
									<li
										key={idx}
										className='flex items-start gap-3 text-slate-700'
									>
										<span className='text-slate-400 font-bold mt-1'>▪</span>
										{service}
									</li>
								))}
							</ul>
						</motion.section>

						{/* Confidentiality and Taxation */}
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Confidentiality & Taxation
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-slate-50 rounded-xl p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Confidentiality
									</h4>
									<ul className='space-y-2 text-sm'>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-slate-900 font-bold'>•</span>
											Beneficial owner: Disclosed to authorities
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-slate-900 font-bold'>•</span>
											Shareholder: Disclosed to authorities
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-slate-900 font-bold'>•</span>
											Directors: Disclosed to authorities
										</li>
									</ul>
								</div>
								<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Taxation
									</h4>
									<ul className='space-y-2'>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Corporate tax – 1%
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											VAT tax on the ICOs – 0%
										</li>
									</ul>
									<p className='text-xs text-slate-600 mt-3'>
										Lithuania company must submit annual financial statements
										and reports
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
