/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CuracaoGamingProposalPage() {
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
							GAMING LICENSE — CURAÇAO
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
								Curaçao E-Gaming License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "Unified Gaming License",
									},
									{
										label: "Regulator",
										value: "Gaming Commission of Curaçao",
									},
									{ label: "Time for approval", value: "1.5–2 months" },
									{ label: "Minimum share capital", value: "No minimum" },
									{ label: "Minimum shareholders", value: "1" },
									{
										label: "Local Director Required",
										value: "At least one co-director",
									},
									{
										label: "Registered Local Agent",
										value: "Mandatory",
									},
									{
										label: "AML Officer",
										value: "Required",
									},
									{ label: "Corporate tax", value: "2%" },
									{ label: "VAT", value: "0%" },
									{ label: "Tax on bets", value: "0%" },
									{
										label: "Incorporation timeline",
										value: "1–2 weeks",
									},
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
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								General Information and Advantages
							</h3>
							<div className='space-y-4 text-slate-700 leading-relaxed'>
								<p>
									Curaçao is a self-governing state within the Kingdom of the
									Netherlands. Curaçao began issuing e-gaming licenses in 1996
									and, over the past decades, has established itself as one of
									the most reputable and widely used jurisdictions for
									international online gaming operations.
								</p>
								<p>
									The jurisdiction is particularly attractive for online gaming
									operators due to its long regulatory history, internationally
									recognised licensing regime, and business-friendly tax
									environment. Curaçao offers no VAT, a low corporate income tax
									rate of 2%, and no tax on bets, making it an efficient
									jurisdiction for global gaming businesses.
								</p>
								<p>
									Curaçao is recognised as one of the world's oldest and most
									established gaming licensing jurisdictions, providing
									regulatory certainty and operational continuity for online
									gaming companies serving international markets.
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
								Company Structure
							</h3>
							<div className='space-y-6'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Shareholder</h4>
									<p className='text-slate-700'>
										1 shareholder (natural person or legal entity), with no
										restrictions on nationality or residency.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Directors</h4>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>
											At least one additional local co-director is required
										</li>
										<li>
											Board of Directors may be structured as a two-tier board
										</li>
										<li>
											One of the directors may also be the shareholder, if the
											shareholder is a natural person
										</li>
									</ul>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Registered Local Agent & Office
									</h4>
									<p className='text-slate-700'>
										Both a registered local agent and registered local office
										are mandatory requirements.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Anti-Money Laundering Officer
									</h4>
									<p className='text-slate-700'>Required.</p>
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
								Type of License and Special Requirements
							</h3>
							<div className='space-y-6'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Type of License
									</h4>
									<p className='text-slate-700'>
										One unified gaming license covering all types of online
										gaming activities (sub-license), issued by the Gaming
										Commission of Curaçao.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Anti-Money Laundering Requirements
									</h4>
									<p className='text-slate-700 mb-4'>
										The licensee must implement robust, risk-sensitive AML and
										CTF procedures designed to detect and prevent money
										laundering and terrorist financing activities. These
										include:
									</p>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>
											Identification and analysis of unusually large or complex
											transactions
										</li>
										<li>
											Identification of politically exposed persons (PEPs)
										</li>
										<li>Custom customer due diligence processes</li>
										<li>
											Internal systems for receiving and escalating suspicious
											activity reports
										</li>
										<li>
											Maintenance of client records and supporting documentation
										</li>
										<li>
											Ongoing risk assessment, compliance monitoring, staff
											training, and internal reporting mechanisms
										</li>
									</ul>
								</div>

								<div className='bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Hardware and Equipment Location (Permanent Establishment
										Requirement)
									</h4>
									<p className='text-slate-700 text-sm'>
										The licensee is required to maintain hardware infrastructure
										in Curaçao, with at least the client database hosted on a
										local server, in order to satisfy the Permanent
										Establishment (PE) requirement.
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
								Incorporation and Licensing Timeline
							</h3>
							<div className='bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Total Timeframe: 1.5–2 months
								</h4>
								<ul className='text-slate-700 space-y-1 list-disc list-inside text-sm'>
									<li>1–2 weeks for company incorporation</li>
									<li>2–4 weeks for licensing</li>
								</ul>
							</div>
							<div className='bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Minimum Capital Requirements
								</h4>
								<p className='text-slate-700'>
									No minimum share capital requirement.
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
								Procedure and Requirements
							</h3>
							<div className='space-y-6'>
								<div>
									<h4 className='font-bold text-slate-900 mb-3'>
										Documents Required from Individuals (Directors,
										Shareholders, Beneficial Owners)
									</h4>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>Notarised passport copy</li>
										<li>
											Notarised utility bill issued within the last 2 months
										</li>
										<li>Bank reference letter</li>
										<li>Curriculum Vitae (CV)</li>
										<li>Professional reference letter</li>
									</ul>
								</div>

								<div>
									<h4 className='font-bold text-slate-900 mb-3'>
										Documents Required from the Company
									</h4>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>Articles of Association</li>
										<li>AML and KYC policies</li>
										<li>
											Procedures addressing underage gambling and anti-money
											laundering controls
										</li>
									</ul>
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
								Services and Pricing
							</h3>
							<div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-3'>Pricing</h4>
								<p className='text-slate-700 text-sm mb-3'>
									Available at the time of enquiry.
								</p>
								<p className='text-slate-700 text-sm'>
									Pricing may vary depending on scope, optional services, and
									regulatory requirements.
								</p>
							</div>

							<div>
								<h4 className='font-bold text-slate-900 mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Professional and agent fees</li>
									<li>Incorporation of a Curaçao e-zone company</li>
									<li>
										Preparation of AML policies and Business Plan based on the
										operator's activities
									</li>
									<li>
										Submission and coordination of the gaming license
										application
									</li>
									<li>
										Liaison with the Curaçao Gaming Commission until license
										issuance
									</li>
								</ul>
							</div>

							<p className='text-slate-600 text-sm italic mt-6'>
								Services executed via licensed partner teams and local
								professionals.
							</p>
						</motion.section>

						<motion.section
							variants={itemVariants}
							className='bg-white rounded-2xl p-8 shadow-lg border border-slate-200'
						>
							<h3
								className='text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Confidentiality and Taxation
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>
										Beneficial Owner
									</h4>
									<p className='text-slate-700'>Disclosed to authorities.</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Shareholder</h4>
									<p className='text-slate-700'>Disclosed to authorities.</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Directors</h4>
									<p className='text-slate-700'>Part of public record.</p>
								</div>
							</div>

							<div>
								<h3 className='text-xl font-bold text-slate-900 mb-4'>
									Taxation
								</h3>
								<div className='space-y-3'>
									{[
										{
											label: "Corporate income tax",
											value: "2%",
										},
										{
											label: "VAT",
											value: "0%",
										},
										{
											label: "Other taxes",
											value: "0%",
										},
									].map((item, idx) => (
										<div
											key={idx}
											className='flex justify-between items-center bg-slate-50 rounded-lg p-4 border border-slate-200'
										>
											<p className='font-semibold text-slate-900'>
												{item.label}
											</p>
											<p className='text-slate-700 font-bold'>{item.value}</p>
										</div>
									))}
								</div>
							</div>

							<div className='mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>Reporting</h4>
								<p className='text-slate-700 text-sm'>
									The Curaçao company is required to submit annual financial
									statements and statutory reports in accordance with local
									regulations.
								</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
