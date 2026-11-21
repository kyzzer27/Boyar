/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const licenses = [
	{
		id: 1,
		title: "Forex License",
		jurisdiction: "Vanuatu",
		category: "Forex & Securities",
		timeframe: "3-5 months",
		capital: "USD 50,000",
		slug: "vanuatu-forex",
		excerpt:
			"Island jurisdiction in Asia Pacific, one of the oldest offshore zones. Principal license divided into Class A, B, or C under 2019 amendments.",
		highlights: [
			"Government bond requirement",
			"No residency restrictions",
			"Established regulatory framework",
		],
	},
	{
		id: 2,
		title: "Crypto License",
		jurisdiction: "United Arab Emirates",
		category: "Cryptocurrency",
		timeframe: "4-6 weeks",
		capital: "AED 10,000",
		slug: "uae-crypto",
		excerpt:
			"Dubai Multi Commodities Centre Free Zone. 100% foreign ownership, 1% corporate tax for 50 years, no capital transfer restrictions.",
		highlights: [
			"DMCC Free Zone",
			"Crypto-friendly regulations",
			"Institutional banking access",
		],
	},
	{
		id: 3,
		title: "Forex License",
		jurisdiction: "Seychelles",
		category: "Forex & Securities",
		timeframe: "3-4 months",
		capital: "USD 50,000",
		slug: "seychelles-forex",
		excerpt:
			"Favorable taxation and high privacy. Dealers in Securities license subject to 1.5% corporate tax. Competitive capital requirement.",
		highlights: [
			"High confidentiality",
			"Competitive capital",
			"Professional indemnity coverage",
		],
	},
	{
		id: 4,
		title: "Banking License",
		jurisdiction: "Puerto Rico",
		category: "Banking & Finance",
		timeframe: "6-7 months",
		capital: "USD 550,000",
		slug: "puerto-rico-banking",
		excerpt:
			"International Bank License regulated by OCIF. USD 300,000 blocked capital plus USD 250,000 working capital. US jurisdiction advantages.",
		highlights: [
			"US regulatory framework",
			"International operations",
			"Visa/Mastercard facilitation",
		],
	},
	{
		id: 5,
		title: "Forex License",
		jurisdiction: "Mauritius",
		category: "Forex & Securities",
		timeframe: "6-8 months",
		capital: "USD 33,000 - 333,000",
		slug: "mauritius-forex",
		excerpt:
			"Stable jurisdiction with dual license structure. Removed from FATF blacklist in 2021. Investment Dealers and Global Business licenses.",
		highlights: [
			"Dual license structure",
			"FATF compliant",
			"Flexible capital tiers",
		],
	},
	{
		id: 6,
		title: "Alternative Investment Fund",
		jurisdiction: "Luxembourg",
		category: "Investment Funds",
		timeframe: "Contact for details",
		capital: "Contact for details",
		slug: "luxembourg-fund",
		excerpt:
			"EUR 4.5 trillion in AUM. Alternative Investment Fund License for cryptocurrencies, private equity, real estate, infrastructure investments.",
		highlights: [
			"Leading fund domicile",
			"Institutional credibility",
			"Diversified investment options",
		],
	},
	{
		id: 7,
		title: "Crypto License",
		jurisdiction: "Lithuania",
		category: "Cryptocurrency",
		timeframe: "5-6 weeks",
		capital: "EUR 2,500",
		slug: "lithuania-crypto",
		excerpt:
			"SEPA member state with attractive tax rates. Clear political and AML environment. Low capital requirement compared to Estonia.",
		highlights: ["SEPA member", "ICO capability", "Low capital requirement"],
	},
	{
		id: 8,
		title: "Crypto License",
		jurisdiction: "Estonia",
		category: "Cryptocurrency",
		timeframe: "3 months",
		capital: "EUR 100,000 - 250,000",
		slug: "estonia-crypto",
		excerpt:
			"Leader in blockchain adoption with established KYC/AML policies. Enables top-tier banking worldwide. VASP services authorization.",
		highlights: [
			"Blockchain leader",
			"Top-tier banking access",
			"Regulatory maturity",
		],
	},
	{
		id: 9,
		title: "International Banking License",
		jurisdiction: "Commonwealth of Dominica",
		category: "Banking & Finance",
		timeframe: "4 months",
		capital: "USD 1,000,000",
		slug: "dominica-banking",
		excerpt:
			"Commonwealth of Dominica FSU-regulated banking license. International operations with Visa/Mastercard and correspondent banking setup.",
		highlights: [
			"Caribbean jurisdiction",
			"FATF compliant",
			"Correspondent banking",
		],
	},
	{
		id: 10,
		title: "Gaming License",
		jurisdiction: "Curaçao",
		category: "Gaming & Entertainment",
		timeframe: "1.5-2 months",
		capital: "No minimum",
		slug: "curacao-gaming",
		excerpt:
			"E-gaming licenses since 1996. One of the most respectable gaming jurisdictions. No VAT, 2% corporate tax, no tax on bets.",
		highlights: [
			"Established since 1996",
			"No minimum capital",
			"PGE structure",
		],
	},
	{
		id: 11,
		title: "MSB License",
		jurisdiction: "Canada",
		category: "Money Services",
		timeframe: "4-5 weeks",
		capital: "Minimal (EUR 1,000 advised)",
		slug: "canada-msb",
		excerpt:
			"Money Services Business license covering currency exchange, virtual currency, ATM operations, and cheque cashing. FINTRAC regulated.",
		highlights: [
			"Versatile MSB services",
			"FINTRAC regulated",
			"Low setup cost",
		],
	},
	{
		id: 12,
		title: "International Banking License",
		jurisdiction: "Belize",
		category: "Banking & Finance",
		timeframe: "13-17 weeks",
		capital: "USD 500,000",
		slug: "belize-banking",
		excerpt:
			"IFSC-regulated international banking license. Capital held in Belize or Zone A Bank. Full banking operations authorization.",
		highlights: [
			"Zone A Bank capital",
			"Full banking operations",
			"Central America hub",
		],
	},
	{
		id: 13,
		title: "Authorized Fund License",
		jurisdiction: "British Virgin Islands",
		category: "Investment Funds",
		timeframe: "6-8 weeks",
		capital: "USD 50,000",
		slug: "bvi-fund",
		excerpt:
			"Well-respected offshore fund jurisdiction. Authorized Fund category under Securities and Investment Business Regulations 2015.",
		highlights: [
			"Premier fund domicile",
			"Flexible structures",
			"Global recognition",
		],
	},
	{
		id: 14,
		title: "Forex License",
		jurisdiction: "British Virgin Islands",
		category: "Forex & Securities",
		timeframe: "6-8 weeks",
		capital: "USD 100,000 - 1,000,000",
		slug: "bvi-forex",
		excerpt:
			"Forex license regulated by BVI FSC under 2010 Business Act. Case-by-case capital assessment based on operational scope.",
		highlights: [
			"FSC regulated",
			"Flexible capital",
			"Established jurisdiction",
		],
	},
];

export default function LicensingForCorporatesPage() {
	const router = useRouter();
	const [selectedFilter, setSelectedFilter] = useState("All");

	const categories = [
		"All",
		"Forex & Securities",
		"Cryptocurrency",
		"Banking & Finance",
		"Investment Funds",
		"Gaming & Entertainment",
		"Money Services",
	];

	const filteredLicenses =
		selectedFilter === "All"
			? licenses
			: licenses.filter((license) => license.category === selectedFilter);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
							International Licensing for Corporates
						</h1>
						<div className='w-16' aria-hidden='true'></div>
					</div>
				</header>

				<main className='mx-auto max-w-7xl px-6 py-12 sm:px-8'>
					<motion.div
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						className='space-y-12'
					>
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-sm p-8 shadow-none border border-offering-line'
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Our Licensing Philosophy
							</h2>
							<div
								className='space-y-4 text-offering-body'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								<p className='offering-subject text-base leading-relaxed'>
									At Boyar Partners, international licensing is treated as a{" "}
									<span className='font-semibold text-offering-ink'>
										structural decision
									</span>{" "}
									rather than a transactional service. Regulatory authorisation
									is the cornerstone upon which banking access, counterparty
									confidence, investor acceptance, and long-term scalability are
									built.
								</p>
								<p className='text-base leading-relaxed'>
									We advise clients across{" "}
									<span className='font-semibold text-offering-ink'>
										regulated financial services, digital assets, gaming,
										banking, and investment management
									</span>
									, supporting them from jurisdiction selection through to
									regulatory approval and post-licensing operational alignment.
								</p>
								<div className='bg-offering-tint border-l-4 border-offering-gold rounded-r-sm p-6 mt-6'>
									<p className='text-sm leading-relaxed'>
										All licensing engagements are executed in coordination with
										licensed partner firms, local regulators, and
										jurisdiction-approved professionals, ensuring technical
										accuracy, regulatory integrity, and execution certainty.
									</p>
								</div>
							</div>
						</motion.section>

						<motion.section variants={itemVariants}>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery Framework
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								{[
									{
										title: "Advisory & Structuring",
										items: [
											"Jurisdiction suitability assessment",
											"License category determination",
											"Capital, substance, and staffing analysis",
										],
									},
									{
										title: "Execution via Partner Teams",
										items: [
											"Local company incorporation",
											"Regulatory application preparation",
											"Policy, manual, and business plan development",
											"Regulator liaison and responses",
										],
									},
									{
										title: "Post-Licensing Alignment",
										items: [
											"Banking and payment infrastructure",
											"Compliance staffing support",
											"Reporting and renewal guidance",
										],
									},
								].map((phase, idx) => (
									<div
										key={idx}
										className='bg-white rounded-sm p-6 shadow-none border border-offering-line'
									>
										<h3
											className='text-lg font-semibold text-offering-ink mb-4'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{phase.title}
										</h3>
										<ul className='space-y-2'>
											{phase.items.map((item, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm text-offering-muted'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='text-offering-blue mt-1'>▪</span>
													{item}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
							<div className='mt-6 bg-offering-ink rounded-sm p-8 text-white'>
								<h3
									className='text-xl font-semibold mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Commercial Terms
								</h3>
								<p
									className='text-sm text-offering-line leading-relaxed mb-3'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Licensing costs vary depending on regulatory scope, capital
									requirements, staffing obligations, and optional
									infrastructure.
								</p>
								<div className='inline-block bg-white/10  rounded-sm px-4 py-2 border border-white/20'>
									<p className='text-sm font-medium'>
										Pricing is available at the time of enquiry
									</p>
								</div>
								<p className='text-xs text-offering-line mt-4'>
									Any referenced estimates are indicative only and subject to
									change due to regulatory requirements, third-party costs, or
									optional services.
								</p>
							</div>
						</motion.section>

						<motion.section variants={itemVariants}>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Available License Types
							</h2>

							<div className='mb-8'>
								<div className='flex flex-wrap gap-3'>
									{categories.map((category) => (
										<button
											key={category}
											onClick={() => setSelectedFilter(category)}
											className={`px-5 py-2.5 rounded-sm font-medium transition-colors duration-300 ${
												selectedFilter === category
													? "bg-offering-ink text-white shadow-none"
													: "bg-white text-offering-muted hover:bg-offering-tint border-2 border-offering-line hover:border-offering-blue"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{category}
											{category !== "All" && (
												<span className='ml-2 text-xs opacity-70'>
													(
													{
														licenses.filter((l) => l.category === category)
															.length
													}
													)
												</span>
											)}
										</button>
									))}
								</div>
								<p
									className='text-sm text-offering-muted mt-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Showing {filteredLicenses.length} of {licenses.length}{" "}
									licenses
								</p>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{filteredLicenses.map((license, idx) => (
									<motion.div
										key={license.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: idx * 0.05 }}
									>
										<Link
											href={`/products/investor/licensing-for-corporates/proposals/${license.slug}`}
											className='block group'
										>
											<div className='bg-white rounded-sm p-6 shadow-none border-2 border-offering-line hover:border-offering-blue transition-colors duration-300 h-full'>
												<div className='flex items-start justify-between mb-4'>
													<div className='flex-1'>
														<h3
															className='text-lg font-semibold text-offering-ink mb-2 group-hover:text-offering-blue transition-colors'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{license.title}
														</h3>
														<p className='text-sm text-offering-muted mb-3'>
															{license.jurisdiction}
														</p>
													</div>
													<span className='text-offering-muted group-hover:text-offering-ink transition-colors'>
														→
													</span>
												</div>

												<p
													className='text-sm text-offering-muted leading-relaxed mb-4'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{license.excerpt}
												</p>

												<div className='flex flex-wrap gap-2 mb-4'>
													<span className='px-3 py-1 bg-offering-tint text-offering-body rounded-full text-xs font-medium'>
														{license.category}
													</span>
													<span className='px-3 py-1 bg-offering-tint text-offering-blue rounded-full text-xs font-medium'>
														{license.timeframe}
													</span>
													<span className='px-3 py-1 bg-offering-tint text-offering-blue rounded-full text-xs font-medium'>
														{license.capital}
													</span>
												</div>

												<div className='border-t border-offering-line pt-4'>
													<p className='text-xs text-offering-muted mb-2 font-semibold'>
														Key Highlights:
													</p>
													<ul className='space-y-1'>
														{license.highlights.map((highlight, i) => (
															<li
																key={i}
																className='text-xs text-offering-muted flex items-start gap-2'
															>
																<span className='text-offering-blue mt-0.5'>▪</span>
																{highlight}
															</li>
														))}
													</ul>
												</div>

												<div className='mt-4 pt-4 border-t border-offering-line'>
													<span className='text-sm font-medium text-offering-blue group-hover:text-offering-blue'>
														View Full Proposal →
													</span>
												</div>
											</div>
										</Link>
									</motion.div>
								))}
							</div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
