/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LuxembourgFundProposalPage() {
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
							ALTERNATIVE INVESTMENT LICENSE — LUXEMBOURG
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
								Proposal for Luxembourg Alternative Investment License
							</h2>
							<p
								className='text-base text-slate-600 leading-relaxed mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								(Executed via Boyar Partners' partner team)
							</p>

							<div className='bg-gradient-to-r from-slate-50 to-violet-50 rounded-xl p-6 border-l-4 border-violet-500 space-y-4'>
								<h3 className='text-xl font-bold text-slate-900 uppercase tracking-wide'>
									General Information and Advantages
								</h3>
								<p className='text-slate-700 leading-relaxed'>
									Luxembourg is a top preferred destination choice for global
									fund structures, holding over EUR 4.5 trillion in assets under
									management.
								</p>
								<p className='text-slate-700 leading-relaxed'>
									The Alternative Investment Fund License allows investments in
									cryptocurrencies, private equity, real estate, stocks and
									bonds, infrastructure projects, and more.
								</p>
								<p className='text-slate-700 leading-relaxed font-semibold'>
									Strong regulatory base, well-established AML policies, and
									institutional credibility support top-tier counterparty
									relationships.
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
								Investment Options
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
								{[
									"Cryptocurrencies",
									"Private Equity",
									"Real Estate",
									"Stocks",
									"Bonds",
									"Infrastructure Projects",
								].map((option, idx) => (
									<div
										key={idx}
										className='bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200'
									>
										<p className='text-slate-900 font-semibold'>{option}</p>
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
								Why Luxembourg?
							</h3>
							<ul className='space-y-3'>
								{[
									"Largest fund hub in Europe",
									"Established regulatory framework",
									"EUR 4.5 trillion in AUM",
									"Strong AML compliance regime",
									"International credibility",
									"Institutional investor access",
									"Tax-efficient structure",
									"Skilled financial professionals",
								].map((reason, idx) => (
									<li
										key={idx}
										className='flex items-start gap-3 text-slate-700 p-3 rounded-lg bg-slate-50 border border-slate-200'
									>
										<span className='text-violet-600 font-bold mt-1'>✓</span>
										<span>{reason}</span>
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
								Next Steps
							</h3>
							<div className='bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200'>
								<h4 className='font-bold text-slate-900 mb-3'>
									Pricing and Timeline
								</h4>
								<p className='text-slate-700 mb-4'>
									Available at the time of enquiry
								</p>
								<p className='text-slate-600 text-sm'>
									Our partner team's legal and financial experience further
									extends beyond the aforementioned area of expertise. Please
									get in touch with Boyar Partners to discuss any custom
									solutions that can be structured.
								</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
