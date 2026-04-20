/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function PuertoRicoBankingProposalPage() {
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
							BANKING LICENSE — PUERTO RICO
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
								Puerto Rican International Bank License
							</h2>
							<p
								className='text-base text-slate-600 leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								(Executed via Boyar Partners' partner team)
							</p>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
								{[
									{
										label: "License type",
										value: "International Bank License",
									},
									{
										label: "Regulator",
										value: "Financial Services Unit (FSU)",
									},
									{ label: "Time for approval", value: "6–7 months" },
									{ label: "Minimum share capital", value: "$550,000" },
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "1" },
									{
										label: "Director Qualifications",
										value: "Financial Services Background",
									},
									{ label: "Required Staff", value: "1 compliance officer" },
									{ label: "Annual renewal", value: "$5,000" },
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200'
									>
										<p className='text-xs font-bold text-slate-600 uppercase tracking-wider mb-1'>
											{item.label}
										</p>
										<p className='text-slate-900 font-semibold'>{item.value}</p>
									</div>
								))}
							</div>

							<div className='bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Capital Structure
								</h4>
								<p className='text-slate-700 text-sm'>
									$300,000 blocked + $250,000 on balance sheet as working
									capital (crypto, shares/bonds)
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
								Work Timeline
							</h3>
							<div className='space-y-3'>
								{[
									"Formation of Puerto Rico subsidiary business corporation",
									"Preparation and drafting of shareholder & officer agreements",
									"Preparation and drafting of narrative business plan",
									"Prepare five-year financial projections",
									"Preparation and drafting of current financial statements",
									"Preparation and drafting of personal financial statements for owners",
									"Identification and draft letters naming principal representative and auditor",
									"Draft and prepare required bank charter and prospectus",
									"Preparation and drafting application with Puerto Rico Commissioner of Financial Institutions",
									"Respond and draft responses to OCIF application inquiries",
									"Receipt of banking license after answering and satisfying all of the questions from the OCIF",
								].map((step, idx) => (
									<div
										key={idx}
										className='flex items-start gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200'
									>
										<span className='flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex-shrink-0'>
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
								Pricing
							</h3>
							<div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-4'>
								<h4 className='font-bold text-slate-900 mb-3'>
									Available at the time of enquiry
								</h4>
								<p className='text-slate-700 text-sm leading-relaxed'>
									Pricing may be subject to change due to optional correspondent
									accounts, SWIFT connection, corporate cards and acquiring
									connections to be set up for the Bank.
								</p>
							</div>
							<p className='text-slate-600 text-sm italic'>
								Our partner team's legal and financial experience further
								extends beyond the aforementioned area of expertise. Please get
								in touch with Boyar Partners to discuss any custom solutions
								that can be structured.
							</p>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
