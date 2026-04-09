"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CompanyFormationPricingRow {
	readonly id: number;
	readonly region: string;
	readonly jurisdiction: string;
	readonly companyType: string;
	readonly supplierName: string;
	readonly supplierCostUsd: number | null;
	readonly boyarPriceUsd: number | null;
	readonly actualGmPercent: number | null;
	readonly targetedGmPolicy: string;
	readonly hasPolicyException: boolean;
	readonly reasoning: string;
}

const TARGET_POLICY_MIN = 43;
const TARGET_POLICY_MAX = 56;

const REGION_FILTERS: string[] = [
	"All regions",
	"Europe",
	"Caribbean",
	"Asia",
	"Middle East",
	"Balkans",
	"Africa",
	"Oceania",
];

function mapRegionForFilter(row: CompanyFormationPricingRow): string {
	// Special-case Balkans
	if (row.jurisdiction === "Montenegro") {
		return "Balkans";
	}
	// Otherwise, use Region exactly as written in the table data
	return row.region;
}

// Dataset copied 1:1 from the main Company Formation page so the table view stays in sync.
const companyFormationPricingRows: readonly CompanyFormationPricingRow[] = [
	{
		id: 1,
		region: "Caribbean",
		jurisdiction: "Bahamas",
		companyType: "IBC",
		supplierName: "CFS Formation",
		supplierCostUsd: 2609,
		boyarPriceUsd: 4750,
		actualGmPercent: 45,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Bank-critical, strong reputation, high LTV",
	},
	{
		id: 2,
		region: "Caribbean",
		jurisdiction: "Belize",
		companyType: "LLC",
		supplierName: "CFS Formation",
		supplierCostUsd: 896,
		boyarPriceUsd: 1950,
		actualGmPercent: 54,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Volume offshore, low LTV → margin upfront",
	},
	{
		id: 3,
		region: "Caribbean",
		jurisdiction: "BVI (British Virgin Islands)",
		companyType: "LLC",
		supplierName: "Intershore",
		supplierCostUsd: 1200,
		boyarPriceUsd: 2250,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Classic offshore, anchor pricing",
	},
	{
		id: 4,
		region: "Caribbean",
		jurisdiction: "Bermuda",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Bespoke insurance / fund structures",
	},
	{
		id: 5,
		region: "Caribbean",
		jurisdiction: "Cayman Islands",
		companyType: "Exempt IBC / LLC",
		supplierName: "CFS / WB Group",
		supplierCostUsd: 2937,
		boyarPriceUsd: 5500,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Premium, bank-first jurisdiction",
	},
	{
		id: 6,
		region: "Caribbean",
		jurisdiction: "Costa Rica",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Operating company, tax & labour driven",
	},
	{
		id: 7,
		region: "Caribbean",
		jurisdiction: "Nevis",
		companyType: "LLC",
		supplierName: "CFS / Trident Trust",
		supplierCostUsd: 2060,
		boyarPriceUsd: 3750,
		actualGmPercent: 45,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Asset-protection use, higher ops load",
	},
	{
		id: 8,
		region: "Caribbean",
		jurisdiction: "Panama",
		companyType: "LLC / S.A.",
		supplierName: "CFS Formation",
		supplierCostUsd: 1302,
		boyarPriceUsd: 2450,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Medium reputation & banking risk",
	},
	{
		id: 9,
		region: "Caribbean",
		jurisdiction: "Saint Vincent",
		companyType: "LLC",
		supplierName: "CFS Formation",
		supplierCostUsd: 1045,
		boyarPriceUsd: 1950,
		actualGmPercent: 46,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Price-sensitive, volume market",
	},
	{
		id: 10,
		region: "Caribbean",
		jurisdiction: "Anguilla",
		companyType: "BC",
		supplierName: "BBC Incorp",
		supplierCostUsd: 1300,
		boyarPriceUsd: 2350,
		actualGmPercent: 45,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Niche offshore, limited suppliers",
	},
	{
		id: 11,
		region: "Europe",
		jurisdiction: "United Kingdom",
		companyType: "Pvt Ltd / LLP",
		supplierName: "YourCompany Formation",
		supplierCostUsd: 889,
		boyarPriceUsd: 1750,
		actualGmPercent: 49,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Entry jurisdiction, fast close",
	},
	{
		id: 12,
		region: "Europe",
		jurisdiction: "Ireland",
		companyType: "Ltd / LLC",
		supplierName: "CFS / Artium",
		supplierCostUsd: 909,
		boyarPriceUsd: 1850,
		actualGmPercent: 51,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "EU credibility, accounting LTV",
	},
	{
		id: 13,
		region: "Europe",
		jurisdiction: "Netherlands",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Substance & VAT driven",
	},
	{
		id: 14,
		region: "Europe",
		jurisdiction: "Switzerland",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Bank-critical HNI jurisdiction",
	},
	{
		id: 15,
		region: "Europe",
		jurisdiction: "Luxembourg",
		companyType: "Sàrl",
		supplierName: "CFS / Trust Consult / Gatwick",
		supplierCostUsd: 13010,
		boyarPriceUsd: 21500,
		actualGmPercent: 40,
		targetedGmPolicy: "43–56%*",
		hasPolicyException: true,
		reasoning: "Institutional hub, LTV exception",
	},
	{
		id: 16,
		region: "Europe",
		jurisdiction: "Guernsey",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Private-client fiduciary structures",
	},
	{
		id: 17,
		region: "Europe",
		jurisdiction: "Gibraltar",
		companyType: "LLC",
		supplierName: "CFS / Gatwick / Artium",
		supplierCostUsd: 1485,
		boyarPriceUsd: 2950,
		actualGmPercent: 50,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Licensing & banking optionality",
	},
	{
		id: 18,
		region: "Europe",
		jurisdiction: "Cyprus",
		companyType: "LLC / Exempt",
		supplierName: "CFS / BBC / Artium",
		supplierCostUsd: 2026,
		boyarPriceUsd: 3750,
		actualGmPercent: 46,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Substance & tax structuring",
	},
	{
		id: 19,
		region: "Europe",
		jurisdiction: "Malta",
		companyType: "Pvt Ltd",
		supplierName: "Offshore Incorp / Gatwick",
		supplierCostUsd: 4200,
		boyarPriceUsd: 7500,
		actualGmPercent: 44,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "EU regulatory optionality",
	},
	{
		id: 20,
		region: "Europe",
		jurisdiction: "Georgia",
		companyType: "LLC / C-Corp / S-Corp",
		supplierName: "Offshore Incorp",
		supplierCostUsd: 800,
		boyarPriceUsd: 1650,
		actualGmPercent: 52,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Fast, low-cost entry",
	},
	{
		id: 21,
		region: "Europe",
		jurisdiction: "Montenegro",
		companyType: "LLC",
		supplierName: "AXA Consulting",
		supplierCostUsd: 1200,
		boyarPriceUsd: 2250,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Emerging EU-adjacent",
	},
	{
		id: 22,
		region: "Europe",
		jurisdiction: "Isle of Man",
		companyType: "LLC / Ltd",
		supplierName: "CFS Formation",
		supplierCostUsd: 4264,
		boyarPriceUsd: 7250,
		actualGmPercent: 41,
		targetedGmPolicy: "43–56%*",
		hasPolicyException: true,
		reasoning: "Private-client, strategic exception",
	},
	{
		id: 23,
		region: "Europe",
		jurisdiction: "Liechtenstein",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Ultra-bespoke HNI",
	},
	{
		id: 24,
		region: "Europe",
		jurisdiction: "Lithuania",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "EU operating companies",
	},
	{
		id: 25,
		region: "Europe",
		jurisdiction: "Latvia",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "AML & banking sensitive",
	},
	{
		id: 26,
		region: "Middle East",
		jurisdiction: "Bahrain",
		companyType: "LLC",
		supplierName: "Commitbiz",
		supplierCostUsd: 2650,
		boyarPriceUsd: 4750,
		actualGmPercent: 44,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "GCC credibility",
	},
	{
		id: 27,
		region: "Middle East",
		jurisdiction: "Dubai – UAE Mainland",
		companyType: "—",
		supplierName: "Commitbiz",
		supplierCostUsd: 4896,
		boyarPriceUsd: 7950,
		actualGmPercent: 38,
		targetedGmPolicy: "43–56%*",
		hasPolicyException: true,
		reasoning: "Volume market, renewal-led",
	},
	{
		id: 28,
		region: "Middle East",
		jurisdiction: "DIFC",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Regulated financial free zone",
	},
	{
		id: 29,
		region: "Middle East",
		jurisdiction: "RAK ICC",
		companyType: "—",
		supplierName: "CFS / Artium",
		supplierCostUsd: 3139,
		boyarPriceUsd: 5500,
		actualGmPercent: 43,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Offshore UAE, banking-sensitive",
	},
	{
		id: 30,
		region: "Asia",
		jurisdiction: "Hong Kong",
		companyType: "Pvt Ltd",
		supplierName: "BBC Incorp",
		supplierCostUsd: 1100,
		boyarPriceUsd: 2250,
		actualGmPercent: 51,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Bank-critical Asian hub",
	},
	{
		id: 31,
		region: "Asia",
		jurisdiction: "Singapore",
		companyType: "Pvt Ltd",
		supplierName: "BBC Incorp",
		supplierCostUsd: 1800,
		boyarPriceUsd: 3250,
		actualGmPercent: 45,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Premium Asian jurisdiction",
	},
	{
		id: 32,
		region: "Asia",
		jurisdiction: "India",
		companyType: "LLP / Pvt Ltd / GIFT",
		supplierName: "Local Provider",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Domestic regulatory driven",
	},
	{
		id: 33,
		region: "Asia",
		jurisdiction: "Kazakhstan (AIFC)",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Regulated financial centre",
	},
	{
		id: 34,
		region: "Asia",
		jurisdiction: "Labuan (Malaysia)",
		companyType: "CLS",
		supplierName: "—",
		supplierCostUsd: 5900,
		boyarPriceUsd: 9500,
		actualGmPercent: 38,
		targetedGmPolicy: "43–56%*",
		hasPolicyException: true,
		reasoning: "LTV-driven regulated hub",
	},
	{
		id: 35,
		region: "Africa",
		jurisdiction: "Mauritius",
		companyType: "Authorised Co.",
		supplierName: "BBC Incorp",
		supplierCostUsd: 3400,
		boyarPriceUsd: 5950,
		actualGmPercent: 43,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Treaty-based structuring",
	},
	{
		id: 36,
		region: "Indian Ocean",
		jurisdiction: "Seychelles",
		companyType: "LLC / IBC",
		supplierName: "CFS Formation",
		supplierCostUsd: 654,
		boyarPriceUsd: 1450,
		actualGmPercent: 55,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Reputation volatility premium",
	},
	{
		id: 37,
		region: "Oceania",
		jurisdiction: "Marshall Islands",
		companyType: "IBC",
		supplierName: "CFS Formation",
		supplierCostUsd: 914,
		boyarPriceUsd: 1950,
		actualGmPercent: 53,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Shipping / asset niche",
	},
	{
		id: 38,
		region: "Oceania",
		jurisdiction: "Samoa",
		companyType: "International Co.",
		supplierName: "BBC Incorp",
		supplierCostUsd: 1000,
		boyarPriceUsd: 1950,
		actualGmPercent: 49,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Simple offshore",
	},
	{
		id: 39,
		region: "USA",
		jurisdiction: "Delaware",
		companyType: "LLC / Inc / C-Corp",
		supplierName: "Harvard Services",
		supplierCostUsd: 310,
		boyarPriceUsd: 950,
		actualGmPercent: 67,
		targetedGmPolicy: "43–56%*",
		hasPolicyException: true,
		reasoning: "Entry funnel exception",
	},
	{
		id: 40,
		region: "USA",
		jurisdiction: "Wyoming",
		companyType: "—",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Flexible, deal-specific",
	},
	{
		id: 41,
		region: "Caribbean",
		jurisdiction: "Curaçao",
		companyType: "LLC / Limited by Shares",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning:
			"Licence-led (iGaming, VASP); pricing depends on licence scope, substance, and banking",
	},
	{
		id: 42,
		region: "North America",
		jurisdiction: "Canada",
		companyType: "INC / LTD / Corporation",
		supplierName: "Ownr / ESC Corporate Services",
		supplierCostUsd: null,
		boyarPriceUsd: 1550,
		actualGmPercent: 49,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning:
			"OECD onshore jurisdiction; supplier cost typically ranges from USD 518–814; pricing anchored below law firms, above DIY platforms; strong banking and treaty credibility",
	},
	{
		id: 43,
		region: "Europe (Crown Dependency)",
		jurisdiction: "Jersey",
		companyType: "LLC",
		supplierName: "GFSC Global / Jersey Business / HPT Group",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "High-reputation, substance-heavy jurisdiction; bespoke by design",
	},
	{
		id: 44,
		region: "North America (USA)",
		jurisdiction: "Nevada",
		companyType: "LLC",
		supplierName: "CFS Formation",
		supplierCostUsd: 1306,
		boyarPriceUsd: 2450,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "US onshore alternative to Delaware; clear market anchors",
	},
	{
		id: 45,
		region: "Europe",
		jurisdiction: "Portugal",
		companyType: "Private Limited Company",
		supplierName: "—",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "EU operating jurisdiction; tax residency & accounting scope vary",
	},
	{
		id: 46,
		region: "Eurasia",
		jurisdiction: "Armenia",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Emerging jurisdiction; regulatory and banking variability",
	},
	{
		id: 47,
		region: "Caribbean",
		jurisdiction: "Dominica",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Offshore jurisdiction with reputational sensitivity",
	},
	{
		id: 48,
		region: "Caribbean",
		jurisdiction: "Saint Lucia",
		companyType: "—",
		supplierName: "Gatwick AG",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Banking outcomes vary materially",
	},
	{
		id: 49,
		region: "Europe",
		jurisdiction: "Sweden",
		companyType: "Private Limited Company (AB)",
		supplierName: "Compyco",
		supplierCostUsd: 600,
		boyarPriceUsd: 1250,
		actualGmPercent: 52,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning:
			"High-quality EU jurisdiction; strong LTV via accounting & VAT",
	},
	{
		id: 50,
		region: "Africa",
		jurisdiction: "São Tomé and Príncipe",
		companyType: "—",
		supplierName: "Manimama",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Niche jurisdiction; limited banking depth",
	},
	{
		id: 51,
		region: "Caribbean",
		jurisdiction: "Turks and Caicos",
		companyType: "IBC",
		supplierName: "LawTrust.com",
		supplierCostUsd: 2250,
		boyarPriceUsd: 4250,
		actualGmPercent: 47,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning: "Law-firm-led offshore; premium positioning",
	},
	{
		id: 52,
		region: "Caribbean",
		jurisdiction: "Antigua and Barbuda",
		companyType: "LLC",
		supplierName: "OffshoreCompanies.com / BankAccounts.io / ABI Financial",
		supplierCostUsd: null,
		boyarPriceUsd: null,
		actualGmPercent: null,
		targetedGmPolicy: "43–56%",
		hasPolicyException: false,
		reasoning:
			"Offshore jurisdiction; banking and regulatory scope vary",
	},
	{
		id: 53,
		region: "South America",
		jurisdiction: "Uruguay",
		companyType: "S.A. (Sociedad Anónima)",
		supplierName: "Law & Trust Group",
		supplierCostUsd: 7500,
		boyarPriceUsd: 10000,
		actualGmPercent: 25,
		targetedGmPolicy: "Exception (25%)",
		hasPolicyException: true,
		reasoning:
			"Highly competitive LATAM jurisdiction with strong law-firm presence. Price anchored aggressively to win deals and feed downstream LTV (banking, accounting, substance). Portfolio GM remains protected via higher-margin jurisdictions.",
	},
] as const;

function formatUsd(value: number | null) {
	if (value === null) return "On Quote";
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatPercent(value: number | null) {
	if (value === null) return "—";
	return `${value}%`;
}

function isWithinPolicy(gm: number | null) {
	if (gm === null) return null;
	return gm >= TARGET_POLICY_MIN && gm <= TARGET_POLICY_MAX;
}

export default function CompanyFormationTablePage() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [activeRegion, setActiveRegion] = useState<string>("All regions");
	const [onlyExceptions, setOnlyExceptions] = useState(false);
	const [onlyOnQuote, setOnlyOnQuote] = useState(false);

	const regions = useMemo(() => REGION_FILTERS, []);

	const filteredRows = useMemo(() => {
		const q = query.trim().toLowerCase();
		return companyFormationPricingRows
			.filter((row) => (activeRegion === "All regions" ? true : mapRegionForFilter(row) === activeRegion))
			.filter((row) => (onlyExceptions ? row.hasPolicyException : true))
			.filter((row) => (onlyOnQuote ? row.supplierCostUsd === null || row.boyarPriceUsd === null : true))
			.filter((row) => {
				if (!q) return true;
				const haystack = [
					row.region,
					row.jurisdiction,
					row.companyType,
					row.supplierName,
					row.targetedGmPolicy,
					row.reasoning,
				]
					.join(" ")
					.toLowerCase();
				return haystack.includes(q);
			});
	}, [activeRegion, onlyExceptions, onlyOnQuote, query]);

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-white text-gray-900">
				<header className="border-b border-gray-200 bg-white">
					<div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
						<button
							onClick={() => router.back()}
							className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							← Back
						</button>
						<p className="hidden text-xs uppercase tracking-[0.35em] text-gray-500 sm:block">Table View</p>
						<div className="w-[120px]" aria-hidden="true" />
					</div>
				</header>

				<main className="mx-auto max-w-[1600px] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
					<section aria-label="Company Formation pricing table" className="space-y-10">
						<div>
							<p className="text-xs uppercase tracking-[0.45em] text-gray-500">Pricing Tool</p>
							<h1
								className="mt-4 text-balance text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl"
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Company Formation – Table View
							</h1>
							<p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
								Neutral, tabular format of the same Company Formation matrix as the main pricing page. All values and reasoning are shown in full.
							</p>
						</div>

						{/* Table card */}
						<div className="rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm sm:p-8">
							{/* Filters block */}
							<div className="space-y-4">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
										Pricing table – all jurisdictions
									</p>
									<p className="mt-2 text-sm text-gray-700">
										Use search, region, and policy filters to slice the Company Formation pricing matrix.
									</p>
								</div>

								<div className="grid gap-4 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:items-end">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Search</p>
										<input
											value={query}
											onChange={(e) => setQuery(e.target.value)}
											placeholder="Jurisdiction, supplier, rationale…"
											className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none ring-0 transition focus:border-gray-500 focus:ring-2 focus:ring-blue-300"
										/>
									</div>
									<div className="space-y-3">
										<div>
											<p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Region</p>
											<div className="mt-2 flex flex-wrap gap-2">
												{regions.map((r) => {
													const isActive = r === activeRegion;
													return (
														<button
															key={r}
															type="button"
															onClick={() => setActiveRegion(r)}
															className={[
																"rounded-full border px-3 py-1.5 text-xs transition",
																isActive
																	? "border-blue-500 bg-blue-50 text-blue-700"
																	: "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50",
															].join(" ")}
														>
															{r}
														</button>
													);
												})}
											</div>
										</div>
										<div className="flex flex-wrap items-center gap-4">
											<label className="flex items-center gap-2 text-sm text-gray-700">
												<input
													type="checkbox"
													checked={onlyExceptions}
													onChange={(e) => setOnlyExceptions(e.target.checked)}
													className="h-4 w-4 rounded border-gray-400 text-blue-600"
												/>
												<span>Exceptions only</span>
											</label>
											<label className="flex items-center gap-2 text-sm text-gray-700">
												<input
													type="checkbox"
													checked={onlyOnQuote}
													onChange={(e) => setOnlyOnQuote(e.target.checked)}
													className="h-4 w-4 rounded border-gray-400 text-blue-600"
												/>
												<span>On Quote only</span>
											</label>
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-1 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
									<p>
										Showing <span className="font-semibold text-gray-900">{filteredRows.length}</span> of{" "}
										<span className="font-semibold text-gray-900">{companyFormationPricingRows.length}</span>
									</p>
									<p>
										Policy target GM:{" "}
										<span className="font-semibold text-gray-900">
											{TARGET_POLICY_MIN}%–{TARGET_POLICY_MAX}%
										</span>
									</p>
								</div>
							</div>

							{/* Table block */}
							<div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
								<table className="min-w-[900px] border-collapse text-sm">
									<thead className="bg-gray-50 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
										<tr>
											<th className="border-b border-gray-200 px-4 py-3 text-left">#</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Region</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Jurisdiction</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Company Type</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Supplier Name</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Supplier Cost (USD)</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Boyar Price (USD)</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Actual GM</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Targeted GM (Policy)</th>
											<th className="border-b border-gray-200 px-4 py-3 text-left">Reasoning (Why priced this way)</th>
										</tr>
									</thead>
									<tbody>
										{filteredRows.map((row) => {
											const policy = isWithinPolicy(row.actualGmPercent);
											const state = row.hasPolicyException ? "exception" : policy === null ? "quote" : policy ? "in" : "out";
											const rowBg =
												state === "exception"
													? "bg-blue-50"
													: state === "out"
														? "bg-amber-50"
														: "bg-white";

											return (
												<tr key={row.id} className={`${rowBg} border-t border-gray-200`}>
													<td className="px-4 py-3 align-top text-gray-800">{row.id}</td>
													<td className="px-4 py-3 align-top text-gray-800">{row.region}</td>
													<td className="px-4 py-3 align-top font-semibold text-gray-900">{row.jurisdiction}</td>
													<td className="px-4 py-3 align-top text-gray-800">{row.companyType}</td>
													<td className="px-4 py-3 align-top text-gray-800">{row.supplierName}</td>
													<td className="px-4 py-3 align-top text-gray-800">{formatUsd(row.supplierCostUsd)}</td>
													<td className="px-4 py-3 align-top text-gray-800">{formatUsd(row.boyarPriceUsd)}</td>
													<td className="px-4 py-3 align-top text-gray-800">{formatPercent(row.actualGmPercent)}</td>
													<td className="px-4 py-3 align-top text-gray-800">{row.targetedGmPolicy}</td>
													<td className="px-4 py-3 align-top text-gray-800">
														<p className="whitespace-pre-wrap">{row.reasoning}</p>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						{/* Pricing playbook card (Avenir, white, professional) */}
						<div className="rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm sm:p-8">
							<header>
								<p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
									Pricing Playbook
								</p>
								<h2
									className="mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl"
									style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
								>
									Pricing Framework: Core Strategic Factors Applied
								</h2>
							</header>

							<div className="mt-6 grid gap-5 md:grid-cols-2">
								<div className="space-y-4">
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											1. Reference Price Framing
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Pricing is anchored against higher-priced institutional alternatives (law firms, banks, fiduciaries) so Boyar&apos;s
											fees are perceived as value-efficient rather than discounted commodity pricing.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											2. Jurisdiction Reputation Risk Premium
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Jurisdictions with higher regulatory, banking or blacklist risk (for example Seychelles, Panama, Nevis) carry an
											upfront risk premium versus lower-volatility hubs such as Singapore, the UK or Luxembourg.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											3. Client Screening Cost
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Pricing is intentionally set to deter high-friction, low-quality prospects (heavy KYC friction, repeated scope
											changes, banking failures) while remaining appropriate for serious, long-term clients.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											4. Sales Cycle Length Cost
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Slow-closing, bank-critical or institutional jurisdictions (for example Cayman Islands, Switzerland, Luxembourg)
											carry higher margins or advisory components to compensate for longer decision cycles.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											5. Cannibalisation Control
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Where multiple jurisdictions can serve the same mandate (for example BVI vs Cayman for holding structures), pricing is
											designed to preserve clear positioning between &quot;bank-first premium&quot; and &quot;efficient workhorse&quot;
											options.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											6. Portfolio Margin Optimisation
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Margins are governed at portfolio level, not line by line. Some jurisdictions act as loss leaders or volume drivers,
											while others carry higher strategic margin to balance the book.
										</p>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											7. Geographic Cross-Subsidisation
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Premium regions such as EU financial centres and Singapore are designed to over-earn so that price-sensitive offshore
											jurisdictions can under-earn within controlled bands.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											8. Channel-Based Pricing
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Pricing recognises the economics of direct inbound, partner-referred and repeat client channels so that commissions,
											concessions and referral fees do not erode net margin.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											9. Price Integrity Over Time
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Review cycles, FX buffers and emergency triggers are defined so that pricing remains stable and credible rather than
											constantly shifting with every supplier change.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											10. Psychological Ownership Bias
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Value is priced upfront rather than back-loaded into add-ons, recognising that price sensitivity drops materially once
											a client has committed to a jurisdiction and structure.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											11. Exit Cost Awareness
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Formation is treated as the entry point into a long-run relationship. Renewal, annual compliance and cross-sell
											products are deliberately structured with stronger margin, reflecting high client switching costs.
										</p>
									</div>
									<div>
										<h3
											className="text-sm font-semibold text-gray-900"
											style={{ fontFamily: "Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
										>
											12. Regulatory Optionality Pricing
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-gray-700">
											Jurisdictions that embed future options (fund or licence conversion, banking upgrades, tax residency pathways) price
											that option value into upfront formation fees, even when the option is not immediately exercised.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}

