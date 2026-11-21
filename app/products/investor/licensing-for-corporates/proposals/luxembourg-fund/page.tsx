/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h2
								className='offering-subject text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Proposal for Luxembourg Alternative Investment License
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
									Luxembourg is a top preferred destination choice for global
									fund structures, holding over EUR 4.5 trillion in assets under
									management.
								</p>
								<p className='text-offering-body leading-relaxed'>
									The Alternative Investment Fund License allows investments in
									cryptocurrencies, private equity, real estate, stocks and
									bonds, infrastructure projects, and more.
								</p>
								<p className='text-offering-body leading-relaxed font-semibold'>
									Strong regulatory base, well-established AML policies, and
									institutional credibility support top-tier counterparty
									relationships.
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
										className='bg-offering-tint rounded-sm p-4 border border-offering-line'
									>
										<p className='text-offering-ink font-semibold'>{option}</p>
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
										className='flex items-start gap-3 text-offering-body p-3 rounded-sm bg-offering-tint border border-offering-line'
									>
										<span className='text-offering-blue font-semibold mt-1'>✓</span>
										<span>{reason}</span>
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
								Next Steps
							</h3>
							<div className='bg-offering-tint rounded-sm p-6 border-2 border-offering-line'>
								<h4 className='font-semibold text-offering-ink mb-3'>
									Pricing and Timeline
								</h4>
								<p className='text-offering-body mb-4'>
									Available at the time of enquiry
								</p>
								<p className='text-offering-muted text-sm'>
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
