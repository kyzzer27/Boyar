/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function BVIForexProposalPage() {
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
							FOREX LICENSE — BRITISH VIRGIN ISLANDS
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
								BVI Forex License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "Forex License",
									},
									{
										label: "Regulator",
										value: "BVI Financial Services Commission",
									},
									{ label: "Time for approval", value: "6–8 weeks" },
									{
										label: "Minimum share capital",
										value: "USD 100,000 - 1,000,000*",
									},
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "2" },
									{
										label: "Registered Local Office",
										value: "Mandatory",
									},
									{
										label: "Compliance Officer",
										value: "Mandatory",
									},
									{ label: "Corporate tax", value: "0%" },
									{ label: "Company incorporation", value: "1 week" },
									{ label: "Licensing timeline", value: "6 weeks" },
								].map((item, idx) => (
									<div
										key={idx}
										className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200'
									>
										<p className='text-xs font-bold text-slate-600 uppercase tracking-wider mb-1'>
											{item.label}
										</p>
										<p className='text-slate-900 font-semibold text-sm'>
											{item.value}
										</p>
									</div>
								))}
							</div>

							<p className='text-xs text-slate-500 italic'>
								*Case-by-case basis depending on business model and risk profile
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
								General Information and Advantages
							</h3>
							<div className='space-y-4 text-slate-700 leading-relaxed'>
								<p>
									The British Virgin Islands (BVI) are located approximately 100
									km from Puerto Rico in the Caribbean and are an overseas
									territory of the United Kingdom. The jurisdiction is
									internationally recognised as one of the most established and
									reputable offshore financial centres in the world.
								</p>
								<p>
									The BVI forex license is regulated by the BVI Financial
									Services Commission (FSC) under the Securities and Investment
									Business Act, 2010. The jurisdiction offers strong regulatory
									credibility, a flexible licensing framework, and an
									internationally accepted legal system based on English common
									law.
								</p>
								<p>
									BVI is particularly suitable for forex brokers seeking global
									credibility without excessive regulatory rigidity, while still
									maintaining robust compliance standards.
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
							<div className='space-y-4'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>Shareholder</h4>
									<p className='text-slate-700'>
										At least 1 shareholder (natural person or legal entity). No
										residency or nationality restrictions apply.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>Directors</h4>
									<p className='text-slate-700'>
										At least 2 directors (natural person or legal entity). No
										residency or nationality restrictions apply.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Registered Local Office
									</h4>
									<p className='text-slate-700'>Mandatory.</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Compliance Officer
									</h4>
									<p className='text-slate-700'>Mandatory.</p>
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
								<h4 className='font-bold text-slate-900 mb-3'>
									Total Timeframe: 6–8 weeks
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>1 week for company incorporation</li>
									<li>6 weeks for licensing</li>
								</ul>
							</div>

							<div className='bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Minimum Capital Requirements
								</h4>
								<p className='text-slate-700 text-sm'>
									There is no officially fixed minimum capital requirement.
									Capital is determined on a case-by-case basis by the
									regulator. In practice, expected capital typically ranges
									between USD 100,000 and USD 1,000,000, depending on the
									business model and risk profile.
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
											Notarised utility bill issued within the last 3 months
										</li>
										<li>Curriculum Vitae (CV)</li>
										<li>Two professional reference letters</li>
										<li>Certified academic diploma</li>
									</ul>
								</div>

								<div>
									<h4 className='font-bold text-slate-900 mb-3'>
										Documents Required from Corporate Shareholders (if
										applicable)
									</h4>
									<ul className='text-slate-700 space-y-2 list-disc list-inside'>
										<li>Articles of Association</li>
										<li>Registered office address document</li>
										<li>Register of directors</li>
										<li>
											Register of ultimate beneficial owners (shareholder
											register, incumbency certificate, or share certificates)
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
									Pricing may vary depending on regulatory scope, capital
									structuring, and optional services.
								</p>
							</div>

							<div className='mb-6'>
								<h4 className='font-bold text-slate-900 mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Local company formation in the British Virgin Islands</li>
									<li>
										Preparation and completion of all regulatory forms and
										documentation
									</li>
									<li>Settlement of government and local regulatory fees</li>
									<li>Office and substance coordination</li>
									<li>
										Preparation and submission of the forex license application
									</li>
									<li>
										Assistance with business plans, internal manuals, and
										compliance procedures
									</li>
									<li>Courier delivery of regulatory documentation</li>
									<li>Liaison with the regulator until license issuance</li>
									<li>Coordination of company bank account opening</li>
								</ul>
							</div>

							<div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
								<h4 className='font-bold text-slate-900 mb-3'>
									Optional Services:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Nominee Director services</li>
									<li>C2B / payment account opening</li>
									<li>Professional indemnity insurance</li>
									<li>Approved auditor introduction</li>
									<li>Compliance officer / MLRO sourcing</li>
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
									<p className='text-slate-700'>
										Not part of the public record.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Shareholder</h4>
									<p className='text-slate-700'>
										Not part of the public record.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-3'>Directors</h4>
									<p className='text-slate-700'>
										Not part of the public record.
									</p>
								</div>
							</div>

							<div>
								<h3 className='text-xl font-bold text-slate-900 mb-4'>
									Taxation
								</h3>
								<div className='space-y-3 mb-6'>
									{[
										{
											label: "Corporate income tax",
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

							<div className='bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>Reporting</h4>
								<p className='text-slate-700 text-sm'>
									Preparation and filing of annual returns are required.
								</p>
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
