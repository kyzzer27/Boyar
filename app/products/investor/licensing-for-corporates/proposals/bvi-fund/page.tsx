/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BVIFundProposalPage() {
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
							AUTHORIZED FUND LICENSE — BRITISH VIRGIN ISLANDS
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
								BVI Authorized Fund License
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
								{[
									{
										label: "License type",
										value: "Authorized Fund",
									},
									{
										label: "Regulator",
										value: "BVI Financial Services Commission",
									},
									{ label: "Time for approval", value: "6–8 weeks" },
									{
										label: "Minimum share capital",
										value: "USD 50,000",
									},
									{ label: "Minimum shareholders", value: "1" },
									{ label: "Minimum directors", value: "2" },
									{
										label: "Local Representative",
										value: "Required in BVI",
									},
									{
										label: "Registered Local Office",
										value: "Mandatory",
									},
									{ label: "Corporate tax", value: "0%" },
									{ label: "Incorporation timeline", value: "1 week" },
									{ label: "Authorisation timeline", value: "5-7 weeks" },
									{
										label: "Investor residency",
										value: "No restrictions",
									},
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
									The British Virgin Islands are among the most respected fund
									domiciles globally and remain a preferred jurisdiction for
									alternative investment structures. The BVI Authorized Fund
									regime, introduced in 2015 under the Securities and Investment
									Business Regulations, is designed for professional and
									semi-professional investors seeking flexibility and
									efficiency.
								</p>
								<p>
									The regime combines regulatory credibility with streamlined
									authorisation timelines and tax neutrality.
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
								Fund Structure
							</h3>
							<div className='space-y-4'>
								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>Shareholder</h4>
									<p className='text-slate-700'>
										At least 1 shareholder. No residency or nationality
										restrictions.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>Directors</h4>
									<p className='text-slate-700'>
										At least 2 directors. No residency or nationality
										restrictions.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Representative
									</h4>
									<p className='text-slate-700'>
										At least 1 representative (individual or entity) must be
										resident in the BVI.
									</p>
								</div>

								<div className='bg-slate-50 rounded-lg p-6 border border-slate-200'>
									<h4 className='font-bold text-slate-900 mb-2'>
										Registered Local Office
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
								Incorporation and Authorisation Timeline
							</h3>
							<div className='bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-6'>
								<h4 className='font-bold text-slate-900 mb-3'>
									Total Timeframe: 6–8 weeks
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>1 week for incorporation</li>
									<li>5–7 weeks for authorisation</li>
								</ul>
							</div>

							<div className='bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6'>
								<h4 className='font-bold text-slate-900 mb-2'>
									Minimum Capital Requirements
								</h4>
								<p className='text-slate-700 text-sm mb-3'>
									Minimum share capital: USD 50,000
								</p>
								<p className='text-slate-700 text-sm'>
									There is no minimum investment amount per investor.
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
										<li>Police clearance report</li>
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
										<li>Register of ultimate beneficial owners</li>
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
									Pricing may vary depending on fund structure and service
									providers.
								</p>
							</div>

							<div className='mb-6'>
								<h4 className='font-bold text-slate-900 mb-4'>
									Scope of Services Includes:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Local company and fund vehicle formation</li>
									<li>
										Preparation and completion of all regulatory documentation
									</li>
									<li>Settlement of government and local fees</li>
									<li>Office and service provider coordination</li>
									<li>
										Preparation and submission of the fund authorisation
										application
									</li>
									<li>
										Assistance with offering memorandum, business plans, and
										internal policies
									</li>
									<li>Courier delivery of documentation</li>
									<li>Liaison with the regulator until authorisation</li>
									<li>Coordination of fund bank account opening</li>
								</ul>
							</div>

							<div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
								<h4 className='font-bold text-slate-900 mb-3'>
									Optional Services:
								</h4>
								<ul className='text-slate-700 space-y-2 list-disc list-inside'>
									<li>Nominee Director services</li>
									<li>Approved auditor introduction</li>
									<li>Administrator and custodian coordination</li>
									<li>Compliance support</li>
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
