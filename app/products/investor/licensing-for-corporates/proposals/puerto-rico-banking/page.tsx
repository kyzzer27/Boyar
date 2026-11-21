/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
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
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h2
								className='offering-subject text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Puerto Rican International Bank License
							</h2>
							<p
								className='text-base text-offering-muted leading-relaxed mb-6'
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
										className='bg-offering-tint rounded-sm p-4 border border-offering-line'
									>
										<p className='text-xs font-semibold text-offering-muted uppercase tracking-wider mb-1'>
											{item.label}
										</p>
										<p className='text-offering-ink font-semibold'>{item.value}</p>
									</div>
								))}
							</div>

							<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6'>
								<h4 className='font-semibold text-offering-ink mb-2'>
									Capital Structure
								</h4>
								<p className='text-offering-body text-sm'>
									$300,000 blocked + $250,000 on balance sheet as working
									capital (crypto, shares/bonds)
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
								Pricing
							</h3>
							<div className='bg-offering-tint border-2 border-offering-line rounded-sm p-6 mb-4'>
								<h4 className='font-semibold text-offering-ink mb-3'>
									Available at the time of enquiry
								</h4>
								<p className='text-offering-body text-sm leading-relaxed'>
									Pricing may be subject to change due to optional correspondent
									accounts, SWIFT connection, corporate cards and acquiring
									connections to be set up for the Bank.
								</p>
							</div>
							<p className='text-offering-muted text-sm italic'>
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
