/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function MauritiusForexProposalPage() {
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
							FOREX LICENSE — MAURITIUS
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
								Proposal for Mauritius Forex License
							</h2>
							<p
								className='text-base text-slate-600 leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								(Executed via Boyar Partners' partner team)
							</p>

							<div className='bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500 space-y-4'>
								<h3 className='text-xl font-bold text-slate-900 uppercase tracking-wide'>
									General Information and Advantages
								</h3>
								<p className='text-slate-700 leading-relaxed'>
									Mauritius is located in the African continent about 2000 km
									from mainland Africa. It is a very stable and well developed
									jurisdiction with high economic and political stability.
								</p>
								<p className='text-slate-700 leading-relaxed'>
									The country rose to prominence as a destination for company
									formation and forex licensing at the end of 2021 when
									Mauritius was taken off the FATF blacklist, which means that
									opening international accounts for Mauritian companies has
									become more straightforward.
								</p>
								<p className='text-slate-700 leading-relaxed'>
									The proposed company will hold two licenses:
								</p>
								<ul className='space-y-2 ml-4'>
									<li className='flex items-start gap-3 text-slate-700'>
										<span className='text-indigo-600 font-bold mt-1'>▪</span>
										Investment Dealers License
									</li>
									<li className='flex items-start gap-3 text-slate-700'>
										<span className='text-indigo-600 font-bold mt-1'>▪</span>
										Global Business License
									</li>
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
								Structure of the Company
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{[
									{
										title: "Shareholder",
										content:
											"At least 1 shareholder (no residency or nationality restrictions)",
									},
									{
										title: "Directors",
										content:
											"2 resident directors – Provided by Boyar Partners' partner team",
									},
									{
										title: "Registered local office",
										content: "Provided by Boyar Partners' partner team",
									},
									{ title: "Head of Dealing", content: "Mandatory" },
									{ title: "Assistant head of dealing", content: "Mandatory" },
									{ title: "Indemnity insurance", content: "Required" },
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
								<div className='bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>Timeframe</h4>
									<p className='text-slate-700 font-medium text-lg'>
										Approx. 6–8 months
									</p>
									<p className='text-slate-600 text-sm mt-2'>
										(1–2 weeks incorporation) | (6 months licensing)
									</p>
								</div>
								<div className='bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Minimum capital requirements
									</h4>
									<div className='space-y-2'>
										<div>
											<p className='text-slate-700 font-medium'>
												Full Service Dealer including underwriting:
											</p>
											<p className='text-slate-600 text-sm'>
												10,000,000 MUR (approx. 333,000 USD)
											</p>
										</div>
										<div>
											<p className='text-slate-700 font-medium'>
												Full Service Dealer excluding underwriting:
											</p>
											<p className='text-slate-600 text-sm'>
												1,000,000 MUR (approx. 33,000 USD)
											</p>
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
										Documents required
									</h4>
									<p className='text-slate-600 italic mb-3'>
										(Verbatim as provided – unchanged)
									</p>
									<p className='text-slate-700'>
										Standard documentation package as per Boyar Partners'
										partnership guidelines.
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
							<ul className='space-y-3'>
								{[
									"Full incorporation and licensing",
									"Compliance manuals preparation",
									"Regulator liaison",
									"Bank account opening",
									"Optional services available on enquiry",
								].map((service, idx) => (
									<li
										key={idx}
										className='flex items-start gap-3 text-slate-700'
									>
										<span className='text-indigo-600 font-bold mt-1'>✓</span>
										{service}
									</li>
								))}
							</ul>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Taxation
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Tax Rates
									</h4>
									<ul className='space-y-2'>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Corporate income tax – 0–3%*
										</li>
										<li className='flex items-center gap-2 text-slate-700'>
											<span className='text-green-600 font-bold'>✓</span>
											Other taxes – 0%
										</li>
									</ul>
									<p className='text-xs text-slate-600 mt-3'>
										*Effective tax rate explanation available on enquiry
									</p>
								</div>
								<div className='bg-slate-50 rounded-xl p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-4 text-lg'>
										Reporting
									</h4>
									<p className='text-slate-700 text-sm'>
										Annual financial statements and reports required
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
