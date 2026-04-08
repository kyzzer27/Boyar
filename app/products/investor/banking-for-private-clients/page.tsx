/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const jurisdictions = [
	{
		region: "Andorra",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "EUR, USD, Multicurrency",
		services:
			"Transactional Banking, Payment Processing, Debit/Credit Card, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime:
			"1–2 days / 3–5 days / 3–5 days / 3–7 days / 7–9 days / 7–14 days",
		fees: "EUR 2,850 / EUR 2,550 / EUR 3,500 / EUR 4,100 / EUR 4,400 / EUR 4,950",
	},
	{
		region: "Antigua and Barbuda",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP, CAD, AUD, XCD",
		services:
			"Transactional Banking, Lombard Loans, Payment Processing, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "3–5 days",
		fees: "EUR 8,700",
	},
	{
		region: "Armenia",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "EUR, USD, RUB, AMD, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Payment Processing, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Bahamas",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, Multicurrency",
		services:
			"Transactional Banking, Payment Processing, Discretionary Wealth Management",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Barbados",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, GBP, CAD",
		services:
			"Transactional Banking, Trade Finance, Discretionary Wealth Management, Lombard Loans, Payment Processing",
		personalVisit: "Not required",
		openingTime: "7–14 days / 3–4 days / 10–12 days",
		fees: "EUR 10,000 / EUR 7,500 / EUR 8,300",
	},
	{
		region: "Belize",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP, CAD, Multicurrency",
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
			"Lombard Loans, Debit/Credit Card, Transactional Banking, Brokerage",
		personalVisit: "Not required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "British Virgin Islands",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, GBP, HKD, CAD, EUR, Multicurrency",
		services:
			"Transactional Banking, Discretionary Wealth Management, Lombard Loans, Trade Finance, Payment Processing, Brokerage, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "9–15 days",
		fees: "EUR 4,400",
	},
	{
		region: "Bulgaria",
		eligibility: "Onshore Companies",
		currencies: "EUR, USD",
		services: "Transactional Banking, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "3–6 days / 9–10 days",
		fees: "EUR 5,000 / EUR 4,900",
	},
	{
		region: "Cayman Islands",
		eligibility: "Local Companies, Offshore Companies, Onshore Companies",
		currencies: "USD, EUR, GBP, CAD, AUD, JPY, SEK, CHF, Multicurrency",
		services:
			"Transactional Banking, Lombard Loans, Payment Processing, Debit/Credit Card, Brokerage, Discretionary Wealth Management, Trade Finance",
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
			"Transactional Banking, Discretionary Wealth Management, Brokerage, Debit/Credit Card",
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
		services: "Transactional Banking, Brokerage, Debit/Credit Card",
		personalVisit: "Not required",
		openingTime: "5–6 days / 5–7 days / 1 week",
		fees: "EUR 4,500 / EUR 4,700 / EUR 5,000",
	},
	{
		region: "Estonia",
		eligibility: "Onshore Companies, Local Companies",
		currencies: "EUR",
		services:
			"Transactional Banking, Discretionary Wealth Management, Brokerage",
		personalVisit: "Required",
		openingTime: "N/A",
		fees: "N/A",
	},
	{
		region: "Germany",
		eligibility: "Onshore Companies",
		currencies: "EUR",
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "10 days",
		fees: "EUR 5,400",
	},
	{
		region: "Gibraltar",
		eligibility: "Offshore Companies, Onshore Companies, Local Companies",
		currencies: "USD, EUR, GBP, Multicurrency",
		services:
			"Transactional Banking, Brokerage, Discretionary Wealth Management, Debit/Credit Card",
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
			"Transactional Banking, Discretionary Wealth Management, Brokerage, Debit/Credit Card",
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
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "8–10 days / 9–11 days",
		fees: "EUR 6,500 / EUR 5,500",
	},
	{
		region: "Liechtenstein",
		eligibility: "Onshore Companies, Local Companies, Offshore Companies",
		currencies: "CHF, EUR, Multicurrency",
		services: "Debit/Credit Card, Discretionary Wealth Management, Brokerage",
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
			"Discretionary Wealth Management, Transactional Banking, Brokerage, Debit/Credit Card",
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
			"Transactional Banking, Discretionary Wealth Management, Brokerage",
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
		services: "Transactional Banking",
		personalVisit: "Not required",
		openingTime: "6–8 days",
		fees: "EUR 4,900",
	},
	{
		region: "Spain",
		eligibility: "Offshore Companies, Onshore Companies",
		currencies: "EUR, USD",
		services: "Transactional Banking",
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
			"Debit/Credit Card, Discretionary Wealth Management, Brokerage, Transactional Banking",
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

const dualVisitRegions = new Set(["Hong Kong", "Malta", "Singapore"]);

// Extract unique currencies
const allCurrencies = Array.from(
	new Set(
		jurisdictions.flatMap((j) => j.currencies.split(", ").map((c) => c.trim()))
	)
).sort();

export default function BankingForPrivateClientsPage() {
	const router = useRouter();

	// Initialize from URL params
	const [filters, setFilters] = useState({
		searchTerm: "",
		filterVisit: "all",
		filterCurrency: "all",
	});
	const [expandedCard, setExpandedCard] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	const { searchTerm, filterVisit, filterCurrency } = filters;

	// Load filters from URL on mount
	useEffect(() => {
		const initializeFilters = () => {
			if (typeof window !== "undefined") {
				const params = new URLSearchParams(window.location.search);
				const visitParam = params.get("visit") || "all";
				const currencyParam = params.get("currency") || "all";
				const searchParam = params.get("search") || "";

				if (visitParam !== "all" || currencyParam !== "all" || searchParam) {
					setFilters({
						filterVisit: visitParam,
						filterCurrency: currencyParam,
						searchTerm: searchParam,
					});
				}
			}
			setMounted(true);
		};

		initializeFilters();
	}, []);

	// Update URL when filters change
	const updateFilters = (
		newVisit: string,
		newCurrency: string,
		newSearch: string
	) => {
		if (typeof window === "undefined") return;

		const params = new URLSearchParams();
		if (newVisit !== "all") params.set("visit", newVisit);
		if (newCurrency !== "all") params.set("currency", newCurrency);
		if (newSearch) params.set("search", newSearch);

		const queryString = params.toString();
		const newUrl = `/products/investor/banking-for-private-clients${
			queryString ? "?" + queryString : ""
		}`;
		window.history.replaceState(null, "", newUrl);
	};

	const handleFilterVisitChange = (value: string) => {
		setFilters((prev) => ({ ...prev, filterVisit: value }));
		updateFilters(value, filterCurrency, searchTerm);
	};

	const handleFilterCurrencyChange = (value: string) => {
		setFilters((prev) => ({ ...prev, filterCurrency: value }));
		updateFilters(filterVisit, value, searchTerm);
	};

	const handleSearchChange = (value: string) => {
		setFilters((prev) => ({ ...prev, searchTerm: value }));
		updateFilters(filterVisit, filterCurrency, value);
	};

	const filteredJurisdictions = useMemo(() => {
		return jurisdictions.filter((j) => {
			const matchesSearch = j.region
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesFilter =
				filterVisit === "all" ||
				(filterVisit === "required" &&
					(j.personalVisit === "Required" || dualVisitRegions.has(j.region))) ||
				(filterVisit === "not-required" &&
					(j.personalVisit === "Not required" ||
						dualVisitRegions.has(j.region)));
			const matchesCurrency =
				filterCurrency === "all" || j.currencies.includes(filterCurrency);
			return matchesSearch && matchesFilter && matchesCurrency;
		});
	}, [searchTerm, filterVisit, filterCurrency]);

	if (!mounted) {
		return (
			<ProtectedRoute>
				<div className='min-h-screen bg-white' />
			</ProtectedRoute>
		);
	}

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-white'>
				{/* Enhanced Header */}
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

				{/* Enhanced Overview Section with Stats */}
				<section className='py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden'>
					{/* Decorative Background Elements */}
					<div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-100 to-transparent rounded-full blur-3xl opacity-50'></div>
					<div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50'></div>

					<div className='mx-auto max-w-4xl px-6 sm:px-8 relative z-10'>
						{/* Stats Cards */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12'
						>
							{[
								{ label: "Jurisdictions", value: "43" },
								{ label: "Currencies", value: String(allCurrencies.length) },
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
										{stat.label === "Jurisdictions" && (
											<div className='mt-1 text-[11px] text-gray-500'>
												41 Remote • 2 Visit Required
											</div>
										)}
									</div>
								</motion.div>
							))}
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							{/* Introduction with Enhanced Card */}
							<div className='mb-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
								<p
									className='text-base text-gray-700 leading-relaxed mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Boyar Partners supports private clients in accessing
									international banking solutions through a curated network of
									established banking and financial institutions. Our role is to
									structure, assess, and coordinate private banking
									relationships aligned with the client&apos;s personal,
									investment, and cross-border requirements.
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
								<div className='bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border-l-4 border-slate-900 mt-6'>
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
										"Profiling client requirements and activity",
										"Assessing jurisdictional compatibility and reputational positioning",
										"Coordinating application, due diligence, and onboarding workflows",
										"Providing ongoing advisory where structural changes or new requirements arise",
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

							{/* Services Grid with Enhanced Cards */}
							<div className='mb-10'>
								<h2
									className='text-xl font-bold text-slate-900 mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Service Categories
								</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{[
										{
											title: "Core Private Banking Services",
											items: [
												"Multi-currency transactional accounts",
												"Cross-border payments and SWIFT transfers",
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
										<motion.div
											key={idx}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: idx * 0.1 }}
											className='group bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-300'
										>
											<div className='flex items-center gap-3 mb-4'>
												<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 flex items-center justify-center text-white font-bold text-sm'>
													{(idx + 1).toString().padStart(2, "0")}
												</div>
												<h3
													className='text-base font-semibold text-slate-900 flex-1'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{service.title}
												</h3>
											</div>
											<ul className='space-y-2.5'>
												{service.items.map((item, i) => (
													<li key={i} className='flex items-start gap-3'>
														<div className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0'></div>
														<span
															className='text-sm text-gray-600 leading-relaxed'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{item}
														</span>
													</li>
												))}
											</ul>
										</motion.div>
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
										client&apos;s overall profile.
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

				{/* Enhanced Jurisdictions Section */}
				<section className='py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white relative'>
					{/* Decorative Grid Pattern */}
					<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>

					<div className='mx-auto max-w-7xl px-6 sm:px-8 relative z-10'>
						<div className='mb-10'>
							<div className='flex items-center gap-4 mb-4'>
								<div className='w-1 h-8 bg-gradient-to-b from-slate-900 to-slate-600 rounded-full'></div>
								<h2
									className='text-3xl font-bold text-slate-900'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Jurisdictional Access
								</h2>
							</div>
							<p
								className='text-base text-gray-600 ml-8'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Explore banking solutions across 43 jurisdictions worldwide
							</p>

							{/* Quick Stats Pills */}
							<div className='flex flex-wrap gap-3 mt-6 ml-8'>
								<div className='px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm'>
									<span
										className='text-xs font-semibold text-slate-900'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										43
									</span>
									<span
										className='text-xs text-gray-500 ml-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Results
									</span>
								</div>
								<div className='px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm'>
									<span
										className='text-xs font-semibold text-green-600'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										41
									</span>
									<span
										className='text-xs text-gray-500 ml-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										No Visit Required
									</span>
								</div>
								<div className='px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm'>
									<span
										className='text-xs font-semibold text-slate-900'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{allCurrencies.length}
									</span>
									<span
										className='text-xs text-gray-500 ml-1'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Currencies Available
									</span>
								</div>
							</div>
						</div>

						{/* Enhanced Search and Filters Panel */}
						<div className='mb-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-200'>
							<div className='space-y-6'>
								{/* Search Bar with Icon */}
								<div className='flex flex-col sm:flex-row gap-4'>
									<div className='flex-1 relative group'>
										<div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-900 transition-colors'>
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
												/>
											</svg>
										</div>
										<input
											type='text'
											placeholder='Search by region...'
											value={searchTerm}
											onChange={(e) => handleSearchChange(e.target.value)}
											className='w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 caret-gray-900 transition-all'
											style={{ fontFamily: "var(--font-avenir)" }}
										/>
									</div>
									<div className='flex gap-2 flex-wrap'>
										<button
											onClick={() => handleFilterVisitChange("all")}
											className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
												filterVisit === "all"
													? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/30"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											All
										</button>
										<button
											onClick={() => handleFilterVisitChange("not-required")}
											className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
												filterVisit === "not-required"
													? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/30"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											No Visit Required
										</button>
										<button
											onClick={() => handleFilterVisitChange("required")}
											className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
												filterVisit === "required"
													? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/30"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Visit Required
										</button>
									</div>
								</div>

								{/* Currency Filter with Visual Separator */}
								<div>
									<div className='flex items-center gap-3 mb-3'>
										<div className='w-8 h-0.5 bg-gradient-to-r from-slate-900 to-slate-400'></div>
										<label
											className='text-xs font-bold text-slate-900 uppercase tracking-wider'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Currency Filter
										</label>
									</div>
									<div className='flex flex-wrap gap-2'>
										<button
											onClick={() => handleFilterCurrencyChange("all")}
											className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
												filterCurrency === "all"
													? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md"
													: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											All Currencies
										</button>
										<button
											onClick={() =>
												handleFilterCurrencyChange("Multicurrency")
											}
											className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 border ${
												filterCurrency === "Multicurrency"
													? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md border-slate-900"
													: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-gray-300"
											}`}
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Multicurrency
										</button>
										<div className='w-px h-8 bg-gray-300 mx-1'></div>
										{allCurrencies
											.filter((c) => c !== "Multicurrency")
											.map((currency) => (
												<button
													key={currency}
													onClick={() => handleFilterCurrencyChange(currency)}
													className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
														filterCurrency === currency
															? "bg-slate-900 text-white shadow-md scale-105"
															: "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
													}`}
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{currency}
												</button>
											))}
									</div>
								</div>
							</div>
						</div>

						{/* Enhanced Jurisdiction Cards */}
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
										<div className='group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300'>
											<button
												onClick={() =>
													setExpandedCard(
														expandedCard === jurisdiction.region
															? null
															: jurisdiction.region
													)
												}
												className='w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300'
											>
												<div className='flex items-center gap-4 flex-1'>
													<div className='w-12 h-12 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300'>
														<span className='text-white text-xs font-bold'>
															{index + 1}
														</span>
													</div>
													<div className='flex-1'>
														<h3
															className='text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{jurisdiction.region}
														</h3>
														<p
															className='text-xs text-gray-500 mt-1.5 line-clamp-1'
															style={{ fontFamily: "var(--font-avenir)" }}
														>
															{jurisdiction.eligibility}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-4'>
													{jurisdiction.personalVisit === "Required" && (
														<span className='px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200'>
															Visit Required
														</span>
													)}
													{jurisdiction.personalVisit === "Not required" && (
														<span className='px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200'>
															Remote OK
														</span>
													)}
													<motion.div
														animate={{
															rotate:
																expandedCard === jurisdiction.region ? 180 : 0,
														}}
														transition={{ duration: 0.3 }}
														className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300'
													>
														<span className='text-gray-600 group-hover:text-white transition-colors'>
															▼
														</span>
													</motion.div>
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
														<div className='px-6 pb-6 pt-4 border-t-2 border-gray-100 bg-gradient-to-b from-gray-50 to-white'>
															<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
																{[
																	{
																		icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
																		gradient: "from-blue-500 to-blue-600",
																		label: "Currencies",
																		value: jurisdiction.currencies,
																	},
																	{
																		icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
																		gradient: "from-purple-500 to-purple-600",
																		label: "Opening Time",
																		value: jurisdiction.openingTime,
																	},
																	{
																		icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
																		gradient: "from-green-500 to-green-600",
																		label: "Fees",
																		value: jurisdiction.fees,
																	},
																	{
																		icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
																		gradient: "from-orange-500 to-orange-600",
																		label: "Personal Visit",
																		value: jurisdiction.personalVisit,
																	},
																].map((field, idx) => (
																	<div
																		key={idx}
																		className='bg-white rounded-lg p-4 border border-gray-200 shadow-sm'
																	>
																		<div className='flex items-center gap-2 mb-3'>
																			<div
																				className={`w-8 h-8 rounded-lg bg-gradient-to-br ${field.gradient} flex items-center justify-center`}
																			>
																				<svg
																					className='w-4 h-4 text-white'
																					fill='none'
																					stroke='currentColor'
																					viewBox='0 0 24 24'
																				>
																					<path
																						strokeLinecap='round'
																						strokeLinejoin='round'
																						strokeWidth={2}
																						d={field.icon}
																					/>
																				</svg>
																			</div>
																			<h4
																				className='text-xs font-bold text-gray-900 uppercase tracking-wider'
																				style={{
																					fontFamily: "var(--font-avenir)",
																				}}
																			>
																				{field.label}
																			</h4>
																		</div>
																		<p
																			className='text-sm text-gray-700 font-medium'
																			style={{
																				fontFamily: "var(--font-avenir)",
																			}}
																		>
																			{field.value}
																		</p>
																	</div>
																))}
																<div className='md:col-span-2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm'>
																	<div className='flex items-center gap-2 mb-3'>
																		<div className='w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 flex items-center justify-center'>
																			<svg
																				className='w-4 h-4 text-white'
																				fill='none'
																				stroke='currentColor'
																				viewBox='0 0 24 24'
																			>
																				<path
																					strokeLinecap='round'
																					strokeLinejoin='round'
																					strokeWidth={2}
																					d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
																				/>
																			</svg>
																		</div>
																		<h4
																			className='text-xs font-bold text-gray-900 uppercase tracking-wider'
																			style={{
																				fontFamily: "var(--font-avenir)",
																			}}
																		>
																			Services Available
																		</h4>
																	</div>
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

						{/* Enhanced Empty State */}
						{filteredJurisdictions.length === 0 && (
							<div className='text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300'>
								<div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
									<svg
										className='w-8 h-8 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
										/>
									</svg>
								</div>
								<p
									className='text-gray-500 text-base font-medium'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									No jurisdictions found matching your search criteria.
								</p>
								<p
									className='text-gray-400 text-sm mt-2'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Try adjusting your filters or search terms
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
