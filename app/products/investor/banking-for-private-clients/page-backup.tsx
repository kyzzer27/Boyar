/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const jurisdictions = [
	{
		region: "Andorra",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, CHF, CAD, AUD, SEK, NOK, NZD",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage/Securities, Debit/Credit Card, Lombard Loans",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Antigua and Barbuda",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP",
		services:
			"Transactional Banking, Debit/Credit Card, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Armenia",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "EUR, USD, RUB, AMD",
		services:
			"Transactional Banking, Payment Processing, Discretionary Wealth Management, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "1–2 weeks",
		fees: "EUR 4,500",
	},
	{
		region: "Bahamas",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, Multicurrency",
		services:
			"Transactional Banking, Brokerage/Securities, Lombard Loans, Discretionary Wealth Management, Debit/Credit Card, Trade Finance, Payment Processing",
		personalVisit: "Not required",
		openingTime: "9–13 days",
		fees: "EUR 6,000",
	},
	{
		region: "Barbados",
		eligibility: "Local Companies",
		currencies: "Multicurrency",
		services: "Transactional Banking, Trade Finance, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Belize",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies:
			"EUR, GBP, USD, CAD, CHF, AUD, AED, CNY, SEK, NOK, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Payment Processing, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "7–12 days",
		fees: "EUR 4,700 / EUR 4,800",
	},
	{
		region: "Bermuda",
		eligibility: "Local Companies",
		currencies: "Multicurrency",
		services:
			"Lombard Loans, Debit/Credit Card, Transactional Banking, Brokerage/Securities",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "British Virgin Islands",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, GBP, HKD, CAD, EUR, Multicurrency",
		services:
			"Transactional Banking, Discretionary Wealth Management, Lombard Loans, Trade Finance, Payment Processing, Brokerage/Securities, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "9–15 days",
		fees: "EUR 4,400",
	},
	{
		region: "Bulgaria",
		eligibility: "Onshore Companies",
		currencies: "EUR, USD",
		services: "Transactional Banking, Debit/Credit Card, SEPA, SWIFT",
		personalVisit: "Not required",
		openingTime: "3–6 days / 9–10 days",
		fees: "EUR 5,000 / EUR 4,900",
	},
	{
		region: "Cayman Islands",
		eligibility: "Local Companies, Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP, CAD, AUD, JPY, SEK, CHF, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Payment Processing, Debit/Credit Card, Brokerage/Securities, Discretionary Wealth Management, Trade Finance",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Cyprus",
		eligibility: "Local Companies, Onshore Companies, Offshore Companies",
		currencies: "EUR, Multicurrency",
		services: "Debit/Credit Card, Transactional Banking, Payment Processing",
		personalVisit: "Required",
		openingTime: "8–10 days / 5–9 days",
		fees: "EUR 6,750 / EUR 4,700",
	},
	{
		region: "Cook Islands",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, GBP, CAD, NZD, AUD, SGD, HKD",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage/Securities, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Curaçao",
		eligibility: "Local Companies, Offshore Companies, Onshore Companies",
		currencies: "USD, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Discretionary Wealth Management, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Czech Republic",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "EUR, GBP, SGD, CZK, CHF",
		services:
			"Transactional Banking, Payment Processing, Debit/Credit Card, Crypto Integration",
		personalVisit: "Not required",
		openingTime: "2 weeks",
		fees: "EUR 4,500",
	},
	{
		region: "Dominica",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, GBP, Multicurrency",
		services: "Transactional Banking, Brokerage/Securities, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "5–6 days / 5–7 days / 1 week",
		fees: "EUR 4,500 / EUR 4,700 / EUR 5,000",
	},
	{
		region: "Estonia",
		eligibility: "Onshore Companies, Local Companies",
		currencies: "EUR",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage/Securities",
		personalVisit: "Required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Germany",
		eligibility: "Onshore Companies",
		currencies: "EUR",
		services: "Transactional Banking, SEPA, SWIFT",
		personalVisit: "Not required",
		openingTime: "10 days",
		fees: "EUR 5,400",
	},
	{
		region: "Gibraltar",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, GBP, Multicurrency",
		services:
			"Transactional Banking, Brokerage/Securities, Discretionary Wealth Management, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Hong Kong",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "HKD, USD, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Trade Finance, Payment Processing, Discretionary Wealth Management, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Ireland",
		eligibility: "Local Companies",
		currencies: "EUR, Multicurrency",
		services: "Transactional Banking, Lombard Loans, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "3–4 days",
		fees: "EUR 4,500",
	},
	{
		region: "Isle of Man",
		eligibility: "Local Companies, Offshore Companies, Onshore Companies",
		currencies:
			"USD, AUD, EUR, CZK, DKK, HUF, SGD, JPY, NOK, GBP, ZAR, ILS, NZD, PLN, CHF, SEK, CAD, BGN",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage/Securities, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "2–3 days",
		fees: "EUR 7,000",
	},
	{
		region: "Kazakhstan",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "Multicurrency",
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Labuan",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies:
			"USD, JPY, SGD, EUR, GBP, Multicurrency, CAD, CHF, HKD, THB, AED",
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Latvia",
		eligibility: "Onshore Companies",
		currencies: "EUR",
		services: "Transactional Banking, SEPA, SWIFT",
		personalVisit: "Not required",
		openingTime: "8–10 days / 9–11 days",
		fees: "EUR 6,500 / EUR 5,500",
	},
	{
		region: "Liechtenstein",
		eligibility: "Onshore Companies, Local Companies, Offshore Companies",
		currencies: "CHF, EUR, Multicurrency",
		services:
			"Debit/Credit Card, Discretionary Wealth Management, Brokerage/Securities",
		personalVisit: "Not required",
		openingTime: "5–12 days / 2 weeks",
		fees: "EUR 7,000 / EUR 6,500",
	},
	{
		region: "Lithuania",
		eligibility: "Onshore Companies, Local Companies, Offshore Companies",
		currencies:
			"EUR, PLN, CNY, HUF, Multicurrency, CAD, GBP, CHF, HKD, USD, SEK, JPY",
		services: "Transactional Banking, Payment Processing, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "5–12 days / 7–10 days / 7–9 days / 10–12 days / 5–6 days",
		fees: "EUR 4,500 / EUR 4,300 / EUR 4,900 / EUR 6,500 / EUR 5,400 / EUR 4,800",
	},
	{
		region: "Luxembourg",
		eligibility: "Onshore Companies, Local Companies, Offshore Companies",
		currencies: "EUR, Multicurrency",
		services: "Transactional Banking, Debit/Credit Card, Payment Processing",
		personalVisit: "Not required",
		openingTime: "8–12 days",
		fees: "EUR 6,900",
	},
	{
		region: "Malta",
		eligibility: "Onshore Companies, Local Companies",
		currencies: "EUR, Multicurrency",
		services: "—",
		personalVisit: "Not required",
		openingTime: "10–14 days / 7–12 days",
		fees: "EUR 6,500 / EUR 4,850",
	},
	{
		region: "Mauritius",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "Multicurrency",
		services:
			"Discretionary Wealth Management, Transactional Banking, Brokerage/Securities, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "3–4 days",
		fees: "EUR 4,750",
	},
	{
		region: "Nevis",
		eligibility: "Offshore / Private Clients",
		currencies: "USD, EUR, GBP",
		services:
			"Personal Banking, Trust & Escrow, Asset Management, Investment Advisory",
		personalVisit: "Not required",
		openingTime: "6–7 days / 8–9 days",
		fees: "EUR 4,900 / EUR 5,200",
	},
	{
		region: "Panama",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, CAD, CHF, GBP",
		services:
			"Transactional Banking, Debit/Credit Card, Discretionary Wealth Management, Lombard Loans",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Puerto Rico",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies:
			"USD, HKD, AUD, CAD, CHF, CNY, DKK, EUR, GBP, JPY, NOK, NZD, SEK, SGD, TRY, ZAR, Multicurrency",
		services:
			"Transactional Banking, Debit/Credit Card, Payment Processing, Trade Finance",
		personalVisit: "Not required",
		openingTime: "4–7 days / 7–10 days / 10–12 days",
		fees: "EUR 5,500 / EUR 5,250 / EUR 5,100",
	},
	{
		region: "Saint Kitts and Nevis",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies:
			"USD, EUR, GBP, CHF, AUD, CAD, AED, JPY, SGD, HKD, Multicurrency",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage/Securities",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Saint Lucia",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies:
			"USD, EUR, GBP, HKD, CAD, CHF, AED, AUD, NZD, NOK, SEK, THB, JPY, ZAR, Multicurrency",
		services: "Transactional Banking, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "5–7 days",
		fees: "EUR 4,000",
	},
	{
		region: "Saint Vincent and the Grenadines",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP, CHF, CAD",
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "10–12 days",
		fees: "EUR 5,500",
	},
	{
		region: "Seychelles",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "USD",
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Singapore",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies:
			"USD, SGD, EUR, GBP, NZD, RMB, AUD, JPY, HKD, CHF, CAD, Multicurrency",
		services: "Transactional Banking, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Slovakia",
		eligibility: "Onshore Companies",
		currencies: "EUR, USD, GBP, CHF, CAD",
		services: "Transactional Banking, SEPA, SWIFT",
		personalVisit: "Not required",
		openingTime: "6–8 days",
		fees: "EUR 4,900",
	},
	{
		region: "Spain",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "EUR, USD",
		services: "Transactional Banking, SEPA, SWIFT",
		personalVisit: "Not required",
		openingTime: "10–14 days",
		fees: "EUR 5,750",
	},
	{
		region: "Switzerland",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies:
			"EUR, GBP, CHF, CAD, AUD, JPY, SGD, PLN, HKD, NOK, SEK, ILS, MXN, DKK, TRY, NZD, AED, Multicurrency",
		services:
			"Debit/Credit Card, Discretionary Wealth Management, Brokerage/Securities, Transactional Banking",
		personalVisit: "Not required",
		openingTime: "6–10 days / 10–15 days / 14–20 days / 10–20 days",
		fees: "EUR 6,250 / EUR 7,000 / EUR 6,800 / EUR 7,000",
	},
	{
		region: "United Kingdom",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "EUR, GBP, USD, CAD, Multicurrency",
		services: "Transactional Banking, Payment Processing, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "4–5 days / 5–7 days / 7–10 days / 7–8 days",
		fees: "EUR 5,200 / EUR 4,150 / EUR 6,000 / EUR 4,600 / EUR 3,900",
	},
	{
		region: "USA",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, Multicurrency",
		services:
			"Transactional Banking, Payment Processing, Lombard Loans, Debit/Credit Card, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime: "12–18 days / 8–12 days",
		fees: "EUR 5,000 / EUR 4,100",
	},
	{
		region: "Vanuatu",
		eligibility: "Local Companies, Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP",
		services:
			"Transactional Banking, Trade Finance, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
];

// Extract unique currencies
const allCurrencies = Array.from(
	new Set(
		jurisdictions.flatMap((j) => j.currencies.split(", ").map((c) => c.trim()))
	)
).sort();

export default function BankingForPrivateClientsPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedCard, setExpandedCard] = useState<string | null>(null);
	const [filterVisit, setFilterVisit] = useState<string>("all");
	const [filterCurrency, setFilterCurrency] = useState<string>("all");

	const filteredJurisdictions = useMemo(() => {
		return jurisdictions.filter((j) => {
			const matchesSearch = j.region
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesFilter =
				filterVisit === "all" ||
				(filterVisit === "required" && j.personalVisit === "Required") ||
				(filterVisit === "not-required" && j.personalVisit === "Not required");
			const matchesCurrency =
				filterCurrency === "all" || j.currencies.includes(filterCurrency);
			return matchesSearch && matchesFilter && matchesCurrency;
		});
	}, [searchTerm, filterVisit, filterCurrency]);

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-white'>
				{/* Header */}
				<header className='sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm'>
					<div className='mx-auto max-w-7xl px-6 py-5 sm:px-8'>
						<div className='flex items-center justify-between'>
							<button
								onClick={() => router.back()}
								className='group text-sm text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2 font-medium'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								<span className='inline-block transition-transform group-hover:-translate-x-1'>
									←
								</span>
								<span>Back</span>
							</button>
							<div className='text-center'>
								<h1
									className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Private Banking
								</h1>
								<div className='h-0.5 w-24 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mt-2'></div>
							</div>
							<div className='w-16' aria-hidden='true'></div>
						</div>
					</div>
				</header>

				{/* Overview Section */}
				<section className='py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden'>
					{/* Decorative Elements */}
					<div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-100 to-transparent rounded-full blur-3xl opacity-50'></div>
					<div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50'></div>

					<div className='mx-auto max-w-4xl px-6 sm:px-8 relative z-10'>
						{/* Stats Overview */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='grid grid-cols-3 gap-6 mb-12'
						>
							{[
								{ label: "Jurisdictions", value: "45+" },
								{ label: "Currencies", value: "30+" },
								{ label: "Services", value: "12+" },
							].map((stat, idx) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: idx * 0.1 }}
									className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
								>
									<div
										className='text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent mb-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{stat.value}
									</div>
									<div
										className='text-xs font-medium text-gray-500 uppercase tracking-wider'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{stat.label}
									</div>
								</motion.div>
							))}
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{/* Introduction */}
							<div className='mb-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
								<p
									className='text-base text-gray-700 leading-relaxed mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Boyar Partners supports private clients in accessing
									international banking solutions through a curated network of
									established banking and financial institutions. Our role is to
									structure, assess, and coordinate private banking
									relationships aligned with the client's personal, investment,
									and cross-border requirements.
								</p>
								<p
									className='text-base text-gray-700 leading-relaxed mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									We work with entrepreneurs, family offices, internationally
									mobile individuals, and asset-holding structures requiring
									stable, compliant, and jurisdiction-appropriate banking
									access.
								</p>
								<div className='pl-4 border-l-2 border-gray-300 mt-6'>
									<p
										className='text-sm text-gray-600 italic'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Boyar Partners does not operate as a bank. All banking
										services are provided by regulated third-party institutions.
									</p>
								</div>
							</div>

							{/* Our Approach */}
							<div className='mb-10'>
								<h2
									className='text-xl font-bold text-slate-900 mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Our Approach
								</h2>
								<p
									className='text-base text-gray-700 leading-relaxed mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Private banking is not a one-size-fits-all solution.
									Jurisdictional standards, client profile, asset origin, and
									intended use of the account materially affect both feasibility
									and long-term stability.
								</p>
								<p
									className='text-sm text-gray-600 mb-3'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Our approach is based on:
								</p>
								<ul className='space-y-2 ml-6'>
									{[
										"Jurisdictional suitability analysis",
										"Risk and compliance alignment",
										"Long-term account sustainability",
										"Access to institutions aligned with the client's profile",
									].map((item, idx) => (
										<li key={idx} className='flex items-start gap-3'>
											<span className='text-gray-400 mt-1.5'>•</span>
											<span
												className='text-base text-gray-700'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{item}
											</span>
										</li>
									))}
								</ul>
								<p
									className='text-sm text-gray-600 mt-4 italic'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Each engagement is assessed individually before any banking
									pathway is proposed.
								</p>
							</div>

							{/* Services Grid */}
							<div className='mb-10'>
								<h2
									className='text-xl font-bold text-slate-900 mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Private Banking Services
								</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
									{[
										{
											title: "International Account Access",
											items: [
												"Transactional banking",
												"Multi-currency accounts",
												"Debit and credit card facilities",
												"International payment capabilities (SWIFT, SEPA and equivalents)",
											],
										},
										{
											title: "Wealth & Investment-Oriented Banking",
											items: [
												"Discretionary wealth management",
												"Brokerage and custody services",
												"Portfolio-linked banking solutions",
												"Lombard and asset-backed lending (subject to institution criteria)",
											],
										},
										{
											title: "Cross-Border Banking Solutions",
											items: [
												"Multi-jurisdictional account structuring",
												"Currency diversification",
												"Cross-border payment optimisation",
												"Banking for expatriates and globally active individuals",
											],
										},
										{
											title: "Private Structures & Asset Holding",
											items: [
												"Personal holding entities",
												"Family office structures",
												"Trust and estate-linked arrangements",
												"Investment and asset-holding vehicles",
											],
										},
									].map((service, idx) => (
										<div
											key={idx}
											className='bg-gray-50 rounded-lg p-6 border border-gray-200'
										>
											<h3
												className='text-base font-semibold text-slate-900 mb-3'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{service.title}
											</h3>
											<ul className='space-y-2'>
												{service.items.map((item, i) => (
													<li key={i} className='flex items-start gap-2'>
														<span className='text-gray-400 text-xs mt-1'>
															▪
														</span>
														<span
															className='text-sm text-gray-600'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{item}
														</span>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</div>

							{/* Additional Sections */}
							<div className='space-y-8'>
								{/* Jurisdictional Coverage */}
								<div>
									<h2
										className='text-xl font-bold text-slate-900 mb-4'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Jurisdictional Coverage
									</h2>
									<p
										className='text-base text-gray-700 leading-relaxed mb-4'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Boyar Partners works across a broad range of jurisdictions,
										including Europe, the Caribbean, Asia-Pacific, and select
										offshore financial centres. Jurisdiction selection is driven
										by:
									</p>
									<ul className='space-y-2 ml-6 mb-4'>
										{[
											"Client residency and nationality",
											"Asset location and activity",
											"Regulatory expectations",
											"Currency and payment needs",
											"Long-term reputational considerations",
										].map((item, idx) => (
											<li key={idx} className='flex items-start gap-3'>
												<span className='text-gray-400 mt-1.5'>•</span>
												<span
													className='text-base text-gray-700'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item}
												</span>
											</li>
										))}
									</ul>
									<p
										className='text-sm text-gray-600 italic'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										No jurisdiction is recommended in isolation from the
										client's overall profile.
									</p>
								</div>

								{/* Compliance */}
								<div>
									<h2
										className='text-xl font-bold text-slate-900 mb-4'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Compliance & Governance
									</h2>
									<p
										className='text-base text-gray-700 leading-relaxed mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										All private banking access is subject to:
									</p>
									<ul className='space-y-2 ml-6 mb-4'>
										{[
											"Full KYC and source-of-funds review",
											"Institution-specific onboarding standards",
											"Jurisdictional regulatory requirements",
										].map((item, idx) => (
											<li key={idx} className='flex items-start gap-3'>
												<span className='text-gray-400 mt-1.5'>•</span>
												<span
													className='text-base text-gray-700'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item}
												</span>
											</li>
										))}
									</ul>
									<p
										className='text-sm text-gray-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Boyar Partners acts as an advisory and coordination layer,
										ensuring that client expectations are aligned with
										institutional compliance realities from the outset.
									</p>
								</div>

								{/* Client Profile */}
								<div>
									<h2
										className='text-xl font-bold text-slate-900 mb-4'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Client Profile
									</h2>
									<p
										className='text-base text-gray-700 leading-relaxed mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Our private banking services are typically suited for:
									</p>
									<ul className='space-y-2 ml-6'>
										{[
											"Entrepreneurs and business owners",
											"International investors",
											"Family offices and UHNW individuals",
											"Clients with cross-border financial activity",
											"Individuals seeking long-term, compliant banking relationships",
										].map((item, idx) => (
											<li key={idx} className='flex items-start gap-3'>
												<span className='text-gray-400 mt-1.5'>•</span>
												<span
													className='text-base text-gray-700'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item}
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Jurisdictions Section */}
				<section className='py-16 sm:py-20 bg-white border-t border-gray-200'>
					<div className='mx-auto max-w-7xl px-6 sm:px-8'>
						<div className='mb-8'>
							<h2
								className='text-2xl font-bold text-slate-900 mb-2'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Access
							</h2>
							<p
								className='text-sm text-gray-600'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Explore banking solutions across {jurisdictions.length}{" "}
								jurisdictions worldwide
							</p>
						</div>

						{/* Search and Filters */}
						<div className='mb-8 space-y-4'>
							{/* Search Bar */}
							<div className='flex flex-col sm:flex-row gap-4'>
								<div className='flex-1'>
									<input
										type='text'
										placeholder='Search by region...'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-500 caret-gray-900'
										style={{ fontFamily: "var(--font-avenir)" }}
									/>
								</div>
								<div className='flex gap-2'>
									<button
										onClick={() => setFilterVisit("all")}
										className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
											filterVisit === "all"
												? "bg-slate-900 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										All
									</button>
									<button
										onClick={() => setFilterVisit("not-required")}
										className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
											filterVisit === "not-required"
												? "bg-slate-900 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										No Visit Required
									</button>
									<button
										onClick={() => setFilterVisit("required")}
										className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
											filterVisit === "required"
												? "bg-slate-900 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Visit Required
									</button>
								</div>
							</div>

							{/* Currency Filter */}
							<div>
								<label
									className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Filter by Currency
								</label>
								<div className='flex flex-wrap gap-2'>
									<button
										onClick={() => setFilterCurrency("all")}
										className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
											filterCurrency === "all"
												? "bg-slate-900 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										All Currencies
									</button>
									<button
										onClick={() => setFilterCurrency("Multicurrency")}
										className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
											filterCurrency === "Multicurrency"
												? "bg-slate-900 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Multicurrency
									</button>
									{allCurrencies
										.filter((c) => c !== "Multicurrency")
										.map((currency) => (
											<button
												key={currency}
												onClick={() => setFilterCurrency(currency)}
												className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
													filterCurrency === currency
														? "bg-slate-900 text-white"
														: "bg-gray-100 text-gray-700 hover:bg-gray-200"
												}`}
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{currency}
											</button>
										))}
								</div>
							</div>
						</div>

						{/* Jurisdictions Cards */}
						<div className='space-y-3'>
							<AnimatePresence>
								{filteredJurisdictions.map((jurisdiction, index) => (
									<motion.div
										key={jurisdiction.region}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3, delay: index * 0.02 }}
									>
										<div className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors'>
											<button
												onClick={() =>
													setExpandedCard(
														expandedCard === jurisdiction.region
															? null
															: jurisdiction.region
													)
												}
												className='w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'
											>
												<div className='flex-1'>
													<h3
														className='text-base font-semibold text-slate-900'
														style={{ fontFamily: "var(--font-avenir)" }}
													>
														{jurisdiction.region}
													</h3>
													<p
														className='text-xs text-gray-500 mt-1'
														style={{ fontFamily: "var(--font-avenir)" }}
													>
														{jurisdiction.eligibility}
													</p>
												</div>
												<div className='flex items-center gap-4'>
													{jurisdiction.personalVisit === "Required" && (
														<span className='px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded'>
															Visit Required
														</span>
													)}
													<motion.span
														animate={{
															rotate:
																expandedCard === jurisdiction.region ? 180 : 0,
														}}
														transition={{ duration: 0.2 }}
														className='text-gray-400'
													>
														▼
													</motion.span>
												</div>
											</button>

											<AnimatePresence>
												{expandedCard === jurisdiction.region && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3 }}
														className='overflow-hidden'
													>
														<div className='px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50'>
															<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
																<div>
																	<h4
																		className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		Currencies
																	</h4>
																	<p
																		className='text-sm text-gray-700'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		{jurisdiction.currencies}
																	</p>
																</div>
																<div>
																	<h4
																		className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		Opening Time
																	</h4>
																	<p
																		className='text-sm text-gray-700'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		{jurisdiction.openingTime}
																	</p>
																</div>
																<div>
																	<h4
																		className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		Fees
																	</h4>
																	<p
																		className='text-sm text-gray-700'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		{jurisdiction.fees}
																	</p>
																</div>
																<div>
																	<h4
																		className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		Personal Visit
																	</h4>
																	<p
																		className='text-sm text-gray-700'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		{jurisdiction.personalVisit}
																	</p>
																</div>
																<div className='md:col-span-2'>
																	<h4
																		className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		Services Available
																	</h4>
																	<p
																		className='text-sm text-gray-700 leading-relaxed'
																		style={{ fontFamily: "var(--font-avenir)" }}
																	>
																		{jurisdiction.services}
																	</p>
																</div>
															</div>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>

						{filteredJurisdictions.length === 0 && (
							<div className='text-center py-12'>
								<p
									className='text-gray-500'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									No jurisdictions found matching your search criteria.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
