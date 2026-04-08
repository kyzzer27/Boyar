/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CompanyFormationPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-white text-slate-900'>
				{/* Header */}
				<header className='sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-30'>
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
							Company Formation
						</h1>
						<div className='w-8'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='relative z-10 py-16 sm:py-20'>
					{/* Introduction Section */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<h2
								className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-3'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Formation of Companies & Legal Entities
							</h2>
							<p
								className='text-lg text-blue-600 font-medium mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								All Served Jurisdictions – Definitive Scope
							</p>
							<p
								className='text-base text-slate-700 mb-8 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides advisory and execution services for the
								formation of corporate, partnership, special-purpose, and
								fiduciary-linked entities across the following jurisdictions:
							</p>
							<div className='bg-slate-50 border border-slate-200 rounded-lg p-8'>
								<p
									className='text-sm text-slate-700 leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
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
							</div>
						</motion.div>
					</section>

					{/* Section 1: Corporate & Limited Liability Entities */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									01
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Corporate & Limited Liability Entities
									</h3>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Operating, holding, investment companies
									</p>
								</div>
							</div>

							<div className='space-y-5'>
								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Private Limited Company / Company Limited by Shares
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										UK, Ireland, Cyprus, Malta, Netherlands, India, Singapore,
										Hong Kong, Mauritius
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Public Limited Company (PLC)
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										UK, Ireland, Malta, Cyprus, India
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Limited Liability Company (LLC)
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Delaware, Wyoming, Bahamas, Cayman Islands, Nevis, Belize,
										UAE
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Corporation / Incorporated Company (Inc.)
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										USA, Marshall Islands
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Unlimited Company
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ireland, UK, select EU jurisdictions
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Non-Resident Company
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Georgia, Cyprus, Panama, Costa Rica – subject to local rules
									</p>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-slate-900 font-semibold'>
											Purpose:
										</span>{" "}
										Trading, regional HQs, holding, IP ownership, regulated
										activity (with licensing)
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 2: International / Offshore Companies */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									02
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										International / Offshore Companies
									</h3>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										International Business Companies (IBC)
									</p>
								</div>
							</div>

							<div className='space-y-5'>
								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Seychelles, Belize, British Virgin Islands, Nevis, Marshall
										Islands, Saint Vincent and the Grenadines, Samoa
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Non-resident use, restricted from local trade, subject to
										economic substance and AML laws
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Mauritius – Global Business Companies (GBC)
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Treaty-eligible subject to substance, FSC-regulated, used
										for investment holding, funds, regional structuring
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 3: Exempted Companies */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									03
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Exempted Companies
									</h3>
								</div>
							</div>

							<div className='space-y-5'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Exempt from local taxation and exchange controls, prohibited
									from domestic business, fully subject to economic substance
									legislation
								</p>
								<div>
									<p
										className='text-slate-900 font-semibold mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Formed in:
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Cayman Islands, Bahamas, Bermuda
									</p>
								</div>
								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-slate-900 font-semibold'>Use:</span>{" "}
										Funds, SPVs, structured finance, holding vehicles
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 4: Partnership Structures */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.25 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									04
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Partnership Structures
									</h3>
								</div>
							</div>

							<div className='space-y-5'>
								<p
									className='text-slate-900 font-semibold mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Statutory partnerships formed
								</p>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											General Partnership (GP)
										</p>
									</div>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Limited Partnership (LP)
										</p>
									</div>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Limited Liability Partnership (LLP)
										</p>
									</div>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Exempt Limited Partnership (ELP) – Cayman Islands, Bermuda
										</p>
									</div>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Special Limited Partnership (SLP) – Luxembourg
										</p>
									</div>
									<div className='flex items-start gap-3'>
										<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Limited Partnership with Legal Personality – Malta,
											Luxembourg
										</p>
									</div>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded p-5 mt-6'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-slate-900 font-semibold'>Use:</span>{" "}
										Funds, private equity, VC, joint ventures, tax-transparent
										structures
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 5: Special Purpose Entities */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									05
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Special Purpose Entities (SPE / SPV)
									</h3>
								</div>
							</div>

							<div className='space-y-5'>
								<p
									className='text-sm text-slate-700'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Boyar Partners structures and incorporates Special Purpose
									Vehicles (SPVs) and Special Purpose Entities (SPEs) designed
									for clearly defined commercial, financial, regulatory, or
									asset-holding objectives.
								</p>

								<div className='space-y-4'>
									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Special Purpose Vehicle (SPV)
										</p>
										<p
											className='text-sm text-slate-700 mb-3'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											A legally distinct entity created for a single or limited
											purpose, such as asset holding, financing, or risk
											isolation
										</p>
										<p
											className='text-xs text-slate-600'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											<span className='text-slate-700 font-semibold'>
												Jurisdictions:
											</span>{" "}
											Cayman Islands, Luxembourg, Malta, Netherlands, Mauritius,
											Delaware, Wyoming, UAE (ADGM, DIFC), Ireland, Bahamas
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Holding Company
										</p>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Used to hold shares in subsidiaries, intellectual
											property, real estate, and financial investments
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Trading Company
										</p>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Used for international trading, commodities,
											import–export, and service delivery
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Investment Company
										</p>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Used for portfolio investments, private equity / VC
											holdings, and asset management structures
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Fund Vehicles
										</p>
										<p
											className='text-sm text-slate-700 mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Structured for collective investment, subject to local
											regulatory regimes. Corporate funds, limited partnerships,
											unit trusts, SICAV / SICAF
										</p>
										<p
											className='text-xs text-slate-600'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											<span className='text-slate-700 font-semibold'>
												Jurisdictions:
											</span>{" "}
											Cayman Islands, Luxembourg, Malta, Ireland, Mauritius,
											ADGM, DIFC, Guernsey
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Captive Insurance Company
										</p>
										<p
											className='text-sm text-slate-700 mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											A regulated insurance entity established to insure group
											risks and manage internal risk financing
										</p>
										<p
											className='text-xs text-slate-600'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											<span className='text-slate-700 font-semibold'>
												Jurisdictions:
											</span>{" "}
											Bermuda, Cayman Islands, Malta, Guernsey, Luxembourg
										</p>
									</div>

									<div className='bg-white border border-slate-200 rounded p-5'>
										<p
											className='text-slate-900 font-semibold mb-2'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Management Company
										</p>
										<p
											className='text-sm text-slate-700'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Used to employ staff, earn management fees, and provide
											advisory or administrative services
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 6: Trust-Linked Entities */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.35 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									06
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Trust-Linked & Fiduciary-Adjacent Entities
									</h3>
								</div>
							</div>

							<div className='space-y-5'>
								<div>
									<p
										className='text-slate-900 font-semibold mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Formed in:
									</p>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Cayman Islands, Bahamas, Malta, Panama, Mauritius, Nevis,
										Guernsey
									</p>
								</div>

								<div>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Structures
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Private Trust Company (PTC)
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Foundation Company
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Corporate Trustee Company
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Purpose Trust Holding Company
											</p>
										</div>
									</div>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<span className='text-slate-900 font-semibold'>Use:</span>{" "}
										Private wealth, succession, family office, fund governance
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 7: United States Entity Formation */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									07
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										United States – Entity Formation
									</h3>
									<p
										className='text-sm text-slate-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										US-Specific Structures
									</p>
								</div>
							</div>

							<div className='space-y-5'>
								<div>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										US Entity Types Offered
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Single-Member LLC, Multi-Member LLC
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												C-Corporation (C-Corp) – Separate taxable legal person
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												S-Corporation – Pass-through taxation
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Series LLC – Available in Delaware and Wyoming for asset
												segregation
											</p>
										</div>
									</div>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded p-5'>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										State filing and registration, EIN assistance, operating
										agreements, beneficial ownership information alignment,
										banking-ready documentation
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 8: Scope of Formation Services */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.45 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									08
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Scope of Formation Services
									</h3>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Jurisdiction and entity-type advisory
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Name search and reservation
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Drafting and filing of constitutional documents
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Share capital or membership structuring
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Appointment of directors, shareholders, managers, partners
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Registered office and registered agent provision
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Government registry liaison and approvals
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Initial compliance classification (tax, substance, AML)
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
									<p
										className='text-sm text-slate-700'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Post-incorporation compliance roadmap
									</p>
								</div>
							</div>
						</motion.div>
					</section>

					{/* Section 9: Documents Issued Upon Incorporation */}
					<section className='mx-auto max-w-5xl px-6 sm:px-8 mb-12'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							className='bg-slate-50 border border-slate-200 rounded-lg p-8'
						>
							<div className='flex items-start gap-5 mb-8'>
								<div
									className='text-4xl font-light text-slate-300 flex-shrink-0'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									09
								</div>
								<div className='flex-1'>
									<h3
										className='text-2xl font-semibold text-slate-900 mb-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Documents Issued Upon Incorporation
									</h3>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Constitutional & Registry
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Certificate of Incorporation / Formation
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Memorandum & Articles / Charter
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Company Registry Extract
											</p>
										</div>
									</div>
								</div>

								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Ownership & Governance
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Register of Members / Shareholders
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Register of Directors / Officers
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Share Certificates (where applicable)
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Operating Agreement (LLC)
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Partnership Agreement (LP / LLP)
											</p>
										</div>
									</div>
								</div>

								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Corporate Actions
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Initial Board and Shareholder Resolutions
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Capitalisation / Share Issuance Records
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Authority and Appointment Resolutions
											</p>
										</div>
									</div>
								</div>

								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Compliance
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Registered Office Confirmation
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Registered Agent Consent
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Beneficial Ownership Filing Confirmation
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Economic Substance Classification
											</p>
										</div>
									</div>
								</div>

								<div className='bg-white border border-slate-200 rounded p-5'>
									<p
										className='text-slate-900 font-semibold mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Banking & Legal Use
									</p>
									<div className='space-y-2'>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Certified True Copies
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Certificate of Good Standing (if required)
											</p>
										</div>
										<div className='flex items-start gap-3'>
											<div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0'></div>
											<p
												className='text-sm text-slate-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Apostille / notarisation (on request)
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</section>

					{/* CTA Section */}
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
								Professional Formation Services
							</p>
							<p
								className='text-slate-700 max-w-3xl mx-auto'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners provides end-to-end formation services for
								companies, international business companies, exempted companies,
								partnerships, SPVs, and fiduciary-linked entities across leading
								onshore and offshore jurisdictions, ensuring full statutory
								compliance, economic substance alignment, and banking
								compatibility.
							</p>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
