/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

export default function OfficeRegistrationPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-white text-slate-900'>
				{/* Header */}
				<header className='sticky top-0 bg-white/95  border-b border-slate-200 z-30'>
					<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='text-sm text-slate-600 hover:text-slate-900 transition flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-semibold text-slate-900'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							Office Registration & Operational Presence Services
						</h1>
						<div className='w-8'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='relative z-10 py-16 sm:py-20'>
					{/* Introduction */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-16'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<p
								className='text-sm uppercase tracking-[0.2em] text-blue-600 mb-3 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Outsourced / Coordinated Infrastructure Function
							</p>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Registration, Operational Presence, and Inspection Readiness
							</h2>
							<p
								className='text-base text-slate-700 leading-relaxed mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides office registration and operational
								presence solutions to corporate, fiduciary, and special-purpose
								entities operating across multiple jurisdictions. Services are
								structured to support statutory compliance, economic substance
								requirements, banking expectations, and regulatory inspection
								readiness.
							</p>
							<div
								className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-slate-800 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Office solutions are delivered through vetted local providers
								under Boyar Partners’ coordination, oversight, and
								quality-control framework.
							</div>
						</motion.div>
					</section>

					{/* Jurisdictional Coverage */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.05 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Coverage
							</h3>
							<p
								className='text-sm text-slate-700 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Office registration and operational presence services are
								provided for entities operating in or structured through:
								Bahamas, Bahrain, Belize, Bermuda, British Virgin Islands,
								Cayman Islands, Cook Islands, Costa Rica, Cyprus, Delaware,
								Georgia, Gibraltar, Guernsey, Dubai (UAE Mainland), Dubai
								International Financial Centre, Abu Dhabi Global Market, Hong
								Kong, India, Ireland, Astana International Financial Centre,
								Labuan, Luxembourg, Malta, Marshall Islands, Mauritius,
								Montenegro, Nevis, Netherlands, Panama, Ras Al Khaimah (RAK
								ICC), Saint Kitts and Nevis, Saint Vincent and the Grenadines,
								Samoa, Seychelles, Singapore, Switzerland, United Kingdom, and
								Wyoming.
							</p>
						</motion.div>
					</section>

					{/* 01: Physical Office Registration */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									01
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Physical Office Registration
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Provision of physical premises required by law, regulation,
										economic substance rules, or banking expectations.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Registered and operational office address</li>
										<li>Dedicated or shared office space</li>
										<li>
											Furnished premises suitable for regulatory inspection
										</li>
										<li>Evidence of ongoing occupancy and use</li>
										<li>Utility and occupancy documentation support</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Solutions are proportionate to activity and risk profile,
										aligned with local expectations.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 02: Virtual Office Solutions */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									02
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Virtual Office Solutions
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Virtual arrangements to satisfy registered address and
										correspondence requirements where permitted.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Registered office address</li>
										<li>Mail handling and forwarding</li>
										<li>Call handling and basic reception</li>
										<li>Document receipt and scanning</li>
										<li>
											Address use for statutory and banking correspondence
										</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Deployed only where accepted by regulators, banks, and
										registries.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 03: IT & Equipment Infrastructure */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									03
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										IT & Equipment Infrastructure
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordinate technology and operational infrastructure
										evidencing real operational capability.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Includes
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>IT hardware procurement coordination</li>
										<li>Secure internet connectivity</li>
										<li>Business email and communication systems</li>
										<li>Basic data storage and access controls</li>
										<li>Evidence of equipment ownership or lease</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Infrastructure aligned to activity level and governance
										model.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 04: Registered Office & Statutory Address */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.25 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									04
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Registered Office & Statutory Address Services
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Statutory registered office services in line with local
										company law.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Registered office maintenance</li>
									<li>Statutory address compliance</li>
									<li>Registry correspondence handling</li>
									<li>Change-of-address filings and notifications</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* 05: Mail, Document & Records Management */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									05
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Mail, Document & Records Management
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Controlled handling of official correspondence and statutory
										records.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Secure mail receipt and forwarding</li>
									<li>Digital document archiving</li>
									<li>Registry and authority correspondence tracking</li>
									<li>Record retention aligned to statutory timelines</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* 06: Office Compliance & Inspection Readiness */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.35 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									06
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Office Compliance & Inspection Readiness
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Maintain inspection-ready premises and documentation for
										regulators and tax authorities.
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-sm font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope
									</p>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Preparation for regulator or tax authority visits</li>
										<li>Office evidence compilation</li>
										<li>Occupancy and usage documentation</li>
										<li>Coordination during inspections</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Relevant for regulated entities, substance-relevant
										companies, and bank-sensitive structures.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* 07: Local Service Coordination */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-6'>
								<div
									className='text-4xl font-light text-slate-300'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									07
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Local Service Coordination
									</h3>
									<p
										className='text-sm text-slate-700 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Coordinate with local vendors and service providers to
										sustain operations.
									</p>
								</div>
							</div>

							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Office service provider management</li>
									<li>IT support vendor coordination</li>
									<li>Facility management liaison</li>
									<li>Engagement with landlords/serviced office providers</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* Compliance & Regulatory Alignment */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.45 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Compliance & Regulatory Alignment
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<ul
										className='space-y-2 text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<li>Meet statutory registered office requirements</li>
										<li>
											Support economic substance and governance obligations
										</li>
										<li>
											Maintain consistency across corporate, tax, and banking
											records
										</li>
										<li>Present a low-risk operational profile</li>
									</ul>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Office arrangements are reviewed periodically as regulations
										or activities evolve.
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Delivery & Oversight Model */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<h3
								className='text-2xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery & Oversight Model
							</h3>
							<div className='bg-white border border-slate-200 rounded p-5'>
								<ul
									className='space-y-2 text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									<li>Services delivered through approved local providers</li>
									<li>
										Boyar Partners provides coordination, oversight, and quality
										control
									</li>
									<li>
										Documentation maintained to support audits, inspections, and
										bank reviews
									</li>
									<li>
										Services scale based on jurisdiction, regulatory intensity,
										and activity
									</li>
								</ul>
							</div>
						</motion.div>
					</section>

					{/* CTA / Positioning Statement */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 pb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.55 }}
							className='bg-blue-50 border border-blue-300 rounded-lg p-10 text-center'
						>
							<p
								className='text-xl text-slate-900 mb-4 font-semibold'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								“Boyar Partners provides office registration and operational
								infrastructure solutions designed to support compliant
								operations, economic substance requirements, and regulatory
								readiness across onshore and offshore jurisdictions.”
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
