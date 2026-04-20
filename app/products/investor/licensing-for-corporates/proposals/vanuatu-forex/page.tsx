/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function VanuatuForexProposalPage() {
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
							FOREX LICENSE — VANUATU
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
								Proposal for Vanuatu Forex License
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
									<div className='bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border-l-4 border-blue-500 space-y-4'>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Vanuatu is an Island located in the Asia Pacific, and is
											currently one of the oldest offshore zones. Due to the
											fact that Vanuatu is on the FATF grey list, finding
											European banking for this company is very challenging.
										</p>
										<p
											className='text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											As of 8 January 2019, Amendments of Financial Dealers
											Licensing Act came in force, dividing Principal's license
											into Class A, Class B or Class C Principal's License.
										</p>
										<div className='mt-6 space-y-4'>
											<div>
												<h4 className='font-bold text-slate-900 mb-2'>
													Class A Principal's License:
												</h4>
												<p className='text-slate-700 text-sm ml-4'>
													means to carry on or purport to carry on the business
													of dealing in any of the following securities:
												</p>
												<ul className='ml-8 mt-2 space-y-1 text-sm text-slate-700'>
													<li>• debenture stocks; or</li>
													<li>• loan stock, bonds; or</li>
													<li>• certificate of deposit; or</li>
													<li>• proceeds of Foreign Exchange</li>
												</ul>
											</div>
											<div>
												<h4 className='font-bold text-slate-900 mb-2'>
													Class B Principal's License:
												</h4>
												<p className='text-slate-700 text-sm ml-4'>
													means to carry on or purport to carry on the business
													of dealing in future contracts and derivative products
													but not limited to futures and options
												</p>
											</div>
											<div>
												<h4 className='font-bold text-slate-900 mb-2'>
													Class C Principal's License:
												</h4>
												<p className='text-slate-700 text-sm ml-4'>
													means to carry on or purport to carry on the business
													of dealing in any of the following securities:
												</p>
												<ul className='ml-8 mt-2 space-y-1 text-sm text-slate-700'>
													<li>
														• shares in share capital of a corporation; or
													</li>
													<li>• proceeds of precious metals; or</li>
													<li>• proceeds of commodities; or</li>
													<li>
														• a right despite whether or not conferred by
														warrant, subscribe for shares or debt securities; or
													</li>
													<li>• a right under depository receipt;</li>
													<li>
														• an option to acquire or dispose of any security
														falling within any other provision of the Act; or
													</li>
													<li>
														• a right under a contract for the acquisition of
														securities.
													</li>
												</ul>
											</div>
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
											"At least 1 shareholder (does not need to be resident and no nationality restrictions)",
									},
									{
										title: "Directors",
										content:
											"At least 1 director (does not need to be resident and no nationality restrictions)",
									},
									{
										title: "Registered local office",
										content: "Not Required",
									},
									{
										title: "Head of Dealing",
										content: "Mandatory",
									},
									{
										title: "Assistant head of dealing",
										content: "Mandatory",
									},
									{
										title: "Indemnity insurance",
										content: "Required",
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
								<div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Timeframe for the incorporation of the Company and licensing
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										Approx. 3–5 months
									</p>
									<p className='text-slate-600 text-sm mt-2'>
										(1–2 week for incorporation) | (3 months for licensing)
									</p>
								</div>
								<div className='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Minimum capital requirements
									</h4>
									<p className='text-slate-700 font-medium text-lg'>
										50,000 USD government bond
									</p>
									<p className='text-slate-600 text-sm mt-2'>
										There is not a required minimum share capital, there is only
										a 50,000 USD government bond
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
													"Notarized utility bill issued in the last 3 months",
													"CV for each individual",
													"Two professional reference letters",
													"Police report from native country notarized and translated to English",
													"Bank statement proving source of funds",
												].map((doc, idx) => (
													<li
														key={idx}
														className='flex items-start gap-3 text-slate-700'
													>
														<span className='text-blue-600 font-bold mt-1'>
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
														<span className='text-blue-600 font-bold mt-1'>
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
								<ul className='space-y-3 mb-6'>
									{[
										"Local company formation in Vanuatu",
										"Filling in and preparing all of the forms and documents",
										"Settlement of the government and local fees",
										"Office search",
										"Preparation and submission of application forms and necessary documents for the Vanuatu Financial Services Commission (VFSC)",
										"Assistance in preparation of the required manuals, including business plans, manuals and procedures",
										"Courier delivery of document hard copies",
										"Liaising with the regulator to ensure successful license application",
									].map((service, idx) => (
										<li
											key={idx}
											className='flex items-start gap-3 text-slate-700'
										>
											<span className='text-blue-600 font-bold mt-1'>✓</span>
											{service}
										</li>
									))}
								</ul>
							</div>
							<div className='bg-slate-50 rounded-xl p-6 border border-slate-200'>
								<h4 className='font-bold text-slate-900 mb-4'>
									Optional services:
								</h4>
								<ul className='space-y-3'>
									{[
										"Nominee Director (EU) – available at the time of enquiry",
										"C2B account opening – available at the time of enquiry",
										"Finding local auditor approved by the regulator – available at the time of enquiry",
										"Provision of compliance and MLRO (for locating the candidate) – available at the time of enquiry (salary depends on the workload of the MLRO)",
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

						{/* Taxation and Reporting */}
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
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Taxes
									</h4>
									<ul className='space-y-2'>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Corporate income tax – 0%
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Other taxes – 0%
										</li>
									</ul>
								</div>
								<div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Reporting
									</h4>
									<p className='text-slate-700'>
										The proposed company will be required to file its audited
										financial statements and tax return within 3 months from its
										balance sheet date
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
