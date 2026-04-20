/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function SeychellesForexProposalPage() {
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
							FOREX LICENSE — SEYCHELLES
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
								Proposal for Seychelles Forex License
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
									<div className='bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500 space-y-4'>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Seychelles is a country located in the African continent,
											and offers very favorable taxation and high privacy.
											Seychelles has a very favorable licensing environment, and
											companies looking to get the Dealers in Securities license
											are only subject to 1.5% corporate tax. At the same time,
											the minimum capital is only 50,000 USD, which is very
											advantageous when compared to other offshore forex
											licenses.
										</p>
									</div>
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
								Structure of the Company
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{[
									{
										title: "Shareholder",
										content:
											"At least 2 shareholders (does not need to be resident and no nationality restrictions)",
									},
									{
										title: "Directors",
										content:
											"At least 2 directors (does not need to be resident and no nationality restrictions)",
									},
									{
										title: "Registered local office",
										content: "Provided by Boyar Partners' partner team",
									},
									{
										title: "Anti-Money Laundering officer",
										content: "Mandatory",
									},
									{
										title: "Legal Advisor",
										content: "Mandatory",
									},
									{
										title: "Security Dealer's license local representative",
										content: "Mandatory",
									},
									{
										title: "Professional indemnity cover",
										content: "Mandatory",
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
											className='text-slate-700 leading-relaxed text-sm'
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
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Incorporation and Licensing
							</h3>
							<div className='space-y-6'>
								<div className='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Timeframe for the incorporation of the Company and licensing
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										Approx. 3–4 months
									</p>
									<p className='text-slate-600 text-sm mt-2'>
										(1–2 weeks for incorporation) | (10–14 weeks for licensing)
									</p>
								</div>
								<div className='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Minimum capital requirements
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										50,000 USD
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
													"Two professional reference letters",
													"Bank reference letter",
													"Employment letter from current employer",
													"Proof of source of funds for the regulator (50,000 USD)",
													"Certified academic certificates",
												].map((doc, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-slate-700'
													>
														<span className='text-emerald-600 font-bold mt-1'>
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
														<span className='text-emerald-600 font-bold mt-1'>
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
										"Local company formation in Seychelles",
										"Filling in and preparing all of the forms and documents",
										"Settlement of the government and local fees",
										"Office search",
										"Preparation and submission of application forms and necessary documents for the Seychelles forex license",
										"Assistance in preparation of the required manuals, including business plans, manuals and procedures",
										"Courier delivery of document hard copies",
										"Liaising with the regulator to ensure successful license application",
										"Company bank account opening",
									].map((service, idx) => (
										<li
											key={idx}
											className='flex items-start gap-3 text-slate-700'
										>
											<span className='text-emerald-600 font-bold mt-1'>✓</span>
											{service}
										</li>
									))}
								</ul>

								<h4 className='font-bold text-slate-900 mb-4'>
									Optional services:
								</h4>
								<ul className='space-y-3'>
									{[
										"Nominee Director (EU) – available on enquiry",
										"C2B account opening – available on enquiry",
										"Professional indemnity cover – available on enquiry",
										"Finding local auditor approved by the FSU – available on enquiry",
										"Provision of compliance and MLRO (for locating the candidate) – available on enquiry (salary depends on workload)",
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
											Beneficial owner: Not part of the public record
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-slate-900 font-bold'>•</span>
											Shareholder: Not part of the public record
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-slate-900 font-bold'>•</span>
											Directors: Not part of the public record
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
											Corporate income tax – 1.5%
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Other taxes – 0%
										</li>
									</ul>
									<p className='text-xs text-slate-600 mt-3'>
										Preparation of Annual returns are required
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
