"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const FONT_AVENIR =
	"var(--font-avenir), Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

interface TrustPricingRow {
	readonly id: number;
	readonly jurisdiction: string;
	readonly supplierCostUsd: number | string;
	readonly boyarPriceUsd: number | string;
	readonly impliedGm: string;
	readonly whyThisGm: string;
	readonly suppliers: string;
}

interface FoundationPricingRow {
	readonly id: number;
	readonly jurisdiction: string;
	readonly supplierCostUsd: string;
	readonly boyarPriceUsd: string;
	readonly impliedGm: string;
	readonly whyThisGm: string;
	readonly suppliers: string;
}

const trustPricingRows: readonly TrustPricingRow[] = [
	{
		id: 1,
		jurisdiction: "Jersey",
		supplierCostUsd: 7000,
		boyarPriceUsd: 12000,
		impliedGm: "≈42%",
		whyThisGm:
			"Jersey pricing must sit in a credibility corridor acceptable to courts and private banks. GM reflects long-term fiduciary exposure and brand signalling, not formation work. This is standard for Channel Islands trustees.",
		suppliers: "GFSC Global",
	},
	{
		id: 2,
		jurisdiction: "Nevis",
		supplierCostUsd: 4565,
		boyarPriceUsd: 8000,
		impliedGm: "≈43%",
		whyThisGm:
			"Nevis is commercially sensitive: priced too low it looks retail, too high it loses competitiveness. This GM balances affordability with future amendment and enforcement optics. Typical among Trident-style providers.",
		suppliers: "Atrium Associates, Trident Trust",
	},
	{
		id: 3,
		jurisdiction: "Cook Islands",
		supplierCostUsd: 7000,
		boyarPriceUsd: 13000,
		impliedGm: "≈46%",
		whyThisGm:
			"Cook Islands trusts are premium firewall instruments. Higher GM is justified by litigation risk, court scrutiny, and reputational signalling. This GM is common among top-tier Cook Islands trustees.",
		suppliers: "Atrium Associates, Trident Trust, Southpac Trust",
	},
	{
		id: 4,
		jurisdiction: "Guernsey",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈30–40%)",
		whyThisGm:
			"Guernsey trustees price institutionally and avoid fixed anchoring. GM flexes with governance depth, asset size, and court exposure rather than a fixed target.",
		suppliers: "Avenue Trust, Sovereign Group",
	},
	{
		id: 5,
		jurisdiction: "Cayman Islands",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"Cayman trusts often intersect with funds and complex structures. GM reflects regulatory exposure and fiduciary insurance, not setup mechanics.",
		suppliers: "WB Corporate",
	},
	{
		id: 6,
		jurisdiction: "Singapore",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈30–40%)",
		whyThisGm:
			"Singapore trust pricing is conservative due to MAS scrutiny and tax overlays. GM is moderated by longevity and banking sensitivity.",
		suppliers: "Sovereign Group, BBCIncorp",
	},
	{
		id: 7,
		jurisdiction: "Hong Kong",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈30–40%)",
		whyThisGm:
			"HK trusts are priced cautiously due to regulatory perception and banking optics. Trustees avoid high visible GM and keep pricing opaque.",
		suppliers: "Sovereign Group, BBCIncorp",
	},
	{
		id: 8,
		jurisdiction: "Mauritius",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"Mauritius trusts are treaty- and tax-linked. GM reflects advisory load and restructuring risk over time.",
		suppliers: "Sovereign Group",
	},
	{
		id: 9,
		jurisdiction: "Isle of Man",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈30–40%)",
		whyThisGm:
			"Isle of Man trusts require UK-adjacent reputational discipline. GM is secondary to peer parity and court acceptance.",
		suppliers: "Atrium Associates, Trident Trust, Sovereign Group",
	},
	{
		id: 10,
		jurisdiction: "Bahamas",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"Bahamas trust pricing varies widely by asset class. Trustees preserve GM flexibility to avoid commoditisation.",
		suppliers: "Atrium Associates",
	},
	{
		id: 11,
		jurisdiction: "Seychelles",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈40–48%)",
		whyThisGm:
			"Higher GM compensates for banking friction and reputational management. Still kept within peer norms to avoid red flags.",
		suppliers: "Atrium Associates",
	},
	{
		id: 12,
		jurisdiction: "British Virgin Islands",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"BVI trusts face evolving regulatory perception. GM reflects compliance and restructuring risk rather than setup effort.",
		suppliers: "Atrium Associates",
	},
	{
		id: 13,
		jurisdiction: "Cyprus",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"EU exposure and tax sensitivity drive pricing. GM supports advisory involvement and regulatory navigation.",
		suppliers: "Atrium Associates, Sovereign Group",
	},
	{
		id: 14,
		jurisdiction: "United Kingdom",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈30–40%)",
		whyThisGm:
			"UK trusts are law-firm led with HMRC exposure. GM is moderated by scrutiny and long-term administration economics.",
		suppliers: "Sovereign Group",
	},
	{
		id: 15,
		jurisdiction: "USA (Delaware)",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈25–35%)",
		whyThisGm:
			"US trusts carry high fiduciary insurance and litigation exposure. Lower GM is acceptable due to longevity and scale.",
		suppliers: "Commonwealth Trust Company",
	},
	{
		id: 16,
		jurisdiction: "Uruguay",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈35–45%)",
		whyThisGm:
			"Niche jurisdiction with advisory-heavy onboarding. GM compensates for education and unfamiliarity risk.",
		suppliers: "Law and Trust",
	},
	{
		id: 17,
		jurisdiction: "Canada",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case (≈25–35%)",
		whyThisGm:
			"Canadian trusts are tax- and law-firm driven. GM is constrained by compliance burden and audit exposure.",
		suppliers: "ESC Corporate Services, Parr Business Law",
	},
];

const foundationPricingRows: readonly FoundationPricingRow[] = [
	{
		id: 1,
		jurisdiction: "Belize",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case",
		whyThisGm:
			"Belize foundations vary heavily by banking and asset profile. Firms preserve GM flexibility due to onboarding uncertainty and correspondent-bank sensitivity.",
		suppliers: "Atrium Associates",
	},
	{
		id: 2,
		jurisdiction: "Cook Islands",
		supplierCostUsd: "8,000 – 12,000",
		boyarPriceUsd: "16,000",
		impliedGm: "33–50% (effective ~40–42%)",
		whyThisGm:
			"Cook Islands foundations carry litigation, court, and reputational exposure similar to firewall trusts. GM reflects fiduciary liability and brand signalling, not formation effort. This GM is standard among premium trustees and accepted by UHNI clients.",
		suppliers: "Atrium Associates",
	},
	{
		id: 3,
		jurisdiction: "Isle of Man",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case",
		whyThisGm:
			"UK-adjacent regulation and reputational scrutiny require bespoke pricing. GM is adjusted for governance depth and advisory load rather than fixed targets.",
		suppliers: "Atrium Associates, Sovereign Group",
	},
	{
		id: 4,
		jurisdiction: "Nevis",
		supplierCostUsd: "4,500 – 6,500",
		boyarPriceUsd: "10,500",
		impliedGm: "38–45%",
		whyThisGm:
			"Nevis foundations are commercial but must not appear discounted. GM balances affordability with long-term amendment risk and enforcement optics. This band matches how Trident-style providers price Nevis vehicles.",
		suppliers: "Atrium Associates",
	},
	{
		id: 5,
		jurisdiction: "Panama",
		supplierCostUsd: "5,500 – 8,000",
		boyarPriceUsd: "11,500",
		impliedGm: "35–45%",
		whyThisGm:
			"Panama foundations face higher banking friction and documentation scrutiny. GM compensates for compliance overhead and restructuring risk while remaining competitive versus LATAM-focused boutiques.",
		suppliers: "Atrium Associates",
	},
	{
		id: 6,
		jurisdiction: "Bahamas",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case",
		whyThisGm:
			"Bahamas foundations are priced based on asset class and governance model. Firms preserve GM discretion due to wide variability in trustee involvement.",
		suppliers: "Sovereign Group",
	},
	{
		id: 7,
		jurisdiction: "Gibraltar",
		supplierCostUsd: "9,000 – 13,000",
		boyarPriceUsd: "18,000",
		impliedGm: "35–45%",
		whyThisGm:
			"Gibraltar foundations sit in a high-regulatory, EU-facing corridor. GM reflects court exposure, regulatory audits, and private-bank expectations. This range is standard for EU-adjacent fiduciary structures.",
		suppliers: "Sovereign Group",
	},
	{
		id: 8,
		jurisdiction: "United Arab Emirates",
		supplierCostUsd: "On Quote",
		boyarPriceUsd: "On Quote",
		impliedGm: "Case-by-case",
		whyThisGm:
			"UAE foundations vary by free zone, council structure, and family office overlay. GM is adjusted for regulatory interpretation risk and ongoing advisory involvement.",
		suppliers: "Sovereign Group",
	},
	{
		id: 9,
		jurisdiction: "Guernsey",
		supplierCostUsd: "12,000 – 18,000",
		boyarPriceUsd: "22,000",
		impliedGm: "30–40% (effective ~35%)",
		whyThisGm:
			"Guernsey foundations are institutional-grade. Lower GM than offshore firewall jurisdictions is acceptable because pricing volume and longevity are higher. This aligns with Channel Islands fiduciary economics.",
		suppliers: "Sovereign Group",
	},
];

const trustFrameworkFactors: readonly { title: string; body: string }[] = [
	{
		title: "1. Supplier Cost with Mandatory Risk Adjustment (Foundational Pricing Layer)",
		body: "Trust pricing begins with the base supplier cost, but this is not treated as a margin-driven calculation. Trustees and fiduciary administrators assume open-ended fiduciary liability, often extending for decades. As a result, pricing is structured to recover not only operational costs but also long-term exposure. Law firms and trustees price on the assumption of: Potential beneficiary disputes; Judicial scrutiny and court involvement; Regulatory examination across jurisdictions; Long-term fiduciary responsibility beyond the initial engagement. Industry reality: Trust pricing is risk-adjusted cost recovery, not cost-plus pricing. This explains why: Annual trustee fees frequently exceed initial setup fees; Premium trust jurisdictions are never positioned as \"low-cost\" offerings.",
	},
	{
		title: "2. Jurisdictional Reputation Benchmarking (Market Corridor Discipline)",
		body: "Pricing is benchmarked against: Fees charged by peer trustees within the same jurisdiction; Pricing levels that private banks, courts, and legal counsel expect to see. Each jurisdiction has an unwritten pricing corridor. Examples: Cook Islands or Jersey trusts priced below established norms are immediately flagged as non-serious; Nevis trusts priced too aggressively lose commercial viability. Industry reality: Pricing must fall within the accepted jurisdictional corridor to maintain credibility and bankability.",
	},
	{
		title: "3. Client Profile Assumption (Silent but Determinative Factor)",
		body: "Trust pricing assumes: High-net-worth or ultra-high-net-worth clients; Cross-border assets and reporting obligations; Involvement of professional advisors (lawyers, tax advisors, private bankers). Trust firms do not price for retail or mass-market clients, even if such clients approach them directly. Industry reality: Price reflects the assumed sophistication and risk profile of the client, not merely the administrative effort involved.",
	},
	{
		title: "4. Complexity Baseline Assumption (Future-State Pricing)",
		body: "Pricing is set based on expected lifecycle complexity, not the initial structure. Assumptions include: Multiple or evolving beneficiaries; Amendments over time; Periodic distributions; Interaction with banks, regulators, lawyers, and tax authorities. Even a \"simple\" trust at inception is priced based on what it is likely to become. Industry reality: Trusts are priced for their future operational complexity, not their day-one simplicity.",
	},
	{
		title: "5. Regulatory and Insurance Cost Pass-Through (Non-Negotiable Cost Layer)",
		body: "All serious fiduciary providers embed the cost of: Professional indemnity and fiduciary insurance; Regulatory audits and examinations; Internal compliance, governance, and reporting infrastructure. These costs are structural, unavoidable, and increase annually. Industry reality: Clients indirectly fund the trustee's regulatory and compliance survival through pricing.",
	},
	{
		title: "6. Brand Protection and Market Signalling (Reputational Pricing Discipline)",
		body: "Pricing is also a reputational control mechanism. Established trustees price to: Avoid being perceived as \"discount\" or \"commodity\" providers; Protect standing with: Private banks; Law firms; Courts and regulators. Industry reality: Pricing functions as a credibility and filtering signal, not merely a revenue tool.",
	},
	{
		title: "7. Longevity-Based Pricing (Lifecycle Economics)",
		body: "Trusts are long-duration legal instruments, not transactional products. Pricing assumes: A lifespan of 5 to 20+ years; Low churn; Ongoing fiduciary responsibility. As a result: Setup pricing is intentionally restrained to encourage entry; Economic sustainability is achieved through long-term administration, not upfront profit extraction. Industry reality: Trust economics are designed for lifetime value, not short-term margins.",
	},
	{
		title: "8. Competitive Parity, Not Price Competition (Peer Alignment Strategy)",
		body: "Reputed fiduciary firms: Do not compete on price; Avoid undercutting peers; Maintain parity with jurisdictional competitors; Apply a modest premium only where reputation justifies it. Industry reality: Undercutting peers leads to: Banking suspicion; Compliance scrutiny; Reputational degradation.",
	},
];

const foundationFrameworkFactors: readonly { title: string; body: string }[] = [
	{
		title: "1. Formation Cost with Embedded Governance Risk Adjustment (Foundational Pricing Layer)",
		body: "Foundation pricing originates from statutory formation and administration costs but is not determined on a cost-plus basis. Foundations are separate legal persons, which introduces a distinct category of risk relative to trusts. Administrators assume responsibility not only for fiduciary conduct but also for entity-level governance, compliance, and regulatory exposure, often extending indefinitely. Pricing is therefore structured to account for: Long-term governance and decision-making exposure; Council, supervisory, or guardian roles carrying personal and institutional liability; Risk arising from misuse, mismanagement, or regulatory non-compliance; Ongoing amendments to foundation statutes, regulations, and governance instruments. Industry reality: Foundation pricing reflects governance risk recovery, not administrative effort. This explains why: Foundation setup fees frequently exceed trust setup fees in comparable jurisdictions; Foundations are rarely positioned as low-cost structures, even where local incorporation mechanics appear simple.",
	},
	{
		title: "2. Jurisdictional Legal Stature and Reputation Benchmarking (Structural Credibility Discipline)",
		body: "Foundation pricing is benchmarked against: Fees charged by peer foundation administrators within the same jurisdiction; Pricing levels expected by international banks, auditors, and regulators. Each foundation jurisdiction operates within a recognised pricing corridor, shaped by: The underlying legal framework (civil-law, hybrid, or statutory foundation regimes); Historical usage by family offices, holding structures, and institutional clients; International recognition and bankability. Examples: Foundations in jurisdictions such as Cook Islands, Guernsey, or Gibraltar priced below established norms are perceived as structurally weak; Foundations in Panama or Nevis priced materially above market norms lose commercial relevance. Industry reality: Foundation pricing must align with the legal stature and international perception of the jurisdiction, not merely with local filing costs.",
	},
	{
		title: "3. Client Governance Profile Assumption (Implicit but Determinative Factor)",
		body: "Foundation pricing assumes: Use by high-net-worth families, entrepreneurs, or asset-holding structures; Cross-border ownership and international banking relationships; Involvement of professional advisors, including legal, tax, and fiduciary specialists. Foundation administrators do not price structures for retail or casual users, regardless of jurisdiction. Industry reality: Pricing reflects the expected governance sophistication and oversight burden, not the simplicity of formation.",
	},
	{
		title: "4. Governance Complexity Baseline (Lifecycle-Based Pricing)",
		body: "Pricing is determined based on the expected governance lifecycle, rather than the founding documentation alone. Assumptions typically include: Amendments to statutes and internal regulations; Changes to council composition, supervisory bodies, or protectors; Asset inflows and outflows across jurisdictions; Interaction with banks, auditors, tax authorities, and regulators. Even where a foundation is initially passive, pricing assumes active governance requirements over time. Industry reality: Foundations are priced for future governance complexity, not day-one simplicity.",
	},
	{
		title: "5. Regulatory, Audit, and Compliance Cost Integration (Structural Cost Layer)",
		body: "Professional foundation administrators embed costs associated with: Regulatory supervision and periodic filings; Audit readiness and financial reporting obligations; Internal compliance systems, governance reviews, and risk controls. In many jurisdictions, foundations attract greater regulatory attention than trusts, particularly where they hold operating or investment assets. Industry reality: Foundation pricing incorporates the cost of regulatory survivability, not only administrative services.",
	},
	{
		title: "6. Institutional Signalling and Banking Acceptability (Reputational Pricing Discipline)",
		body: "Pricing serves as a critical signalling mechanism to: Private banks and custodians; Auditors and legal counterparties; Regulators and supervisory bodies. Established administrators price foundations to: Avoid perception as off-the-shelf or commodity entities; Reinforce the foundation's role as a governance and asset-holding vehicle. Industry reality: Pricing functions as a credibility filter, ensuring foundations are treated as institutional structures rather than aggressive structuring tools.",
	},
	{
		title: "7. Long-Term Entity Economics (Durational Pricing Logic)",
		body: "Foundations are designed as long-lived or perpetual legal entities. Pricing assumes: Multi-year or multi-decade existence; Low dissolution or replacement rates; Continuous fiduciary involvement at the entity level. Accordingly: Setup pricing is calibrated to enable entry without deterring legitimate use; Economic sustainability is achieved through long-term administration rather than front-loaded profit extraction. Industry reality: Foundation economics are structured around entity longevity, not transaction volume.",
	},
	{
		title: "8. Competitive Parity Within Foundation Markets (Peer Alignment Strategy)",
		body: "Reputed foundation administrators: Do not compete on price; Avoid undercutting peer providers; Maintain parity within jurisdictional pricing corridors; Apply modest premiums only where legal complexity or reputation warrants. Industry reality: Aggressive or discounted pricing undermines banking confidence, regulatory comfort, and long-term credibility.",
	},
];

function formatTrustUsd(value: number | string): string {
	if (typeof value === "string") return value;
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

type TabId = "trust" | "foundation";

export default function TrustFoundationsPricingPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<TabId>("trust");
	const [trustSearch, setTrustSearch] = useState("");
	const [foundationSearch, setFoundationSearch] = useState("");

	const filteredTrustRows = useMemo(() => {
		const q = trustSearch.trim().toLowerCase();
		if (!q) return trustPricingRows;
		return trustPricingRows.filter(
			(row) =>
				row.jurisdiction.toLowerCase().includes(q) ||
				row.suppliers.toLowerCase().includes(q) ||
				row.whyThisGm.toLowerCase().includes(q) ||
				row.impliedGm.toLowerCase().includes(q)
		);
	}, [trustSearch]);

	const filteredFoundationRows = useMemo(() => {
		const q = foundationSearch.trim().toLowerCase();
		if (!q) return foundationPricingRows;
		return foundationPricingRows.filter(
			(row) =>
				row.jurisdiction.toLowerCase().includes(q) ||
				row.suppliers.toLowerCase().includes(q) ||
				row.whyThisGm.toLowerCase().includes(q) ||
				row.impliedGm.toLowerCase().includes(q)
		);
	}, [foundationSearch]);

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-slate-100 text-slate-900">
				<header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
					<div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-4 sm:px-10 lg:px-12">
						<div className="flex items-center justify-between">
							<button
								onClick={() => router.back()}
								className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Back
							</button>
							<h1
								className="text-xl font-semibold text-slate-900 sm:text-2xl"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Trust & Foundation — Pricing
							</h1>
							<div className="w-24" aria-hidden="true" />
						</div>

						{/* Tab bar: instant switch between Trust and Foundation */}
						<nav
							aria-label="Choose product"
							className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit"
						>
							<button
								type="button"
								onClick={() => setActiveTab("trust")}
								aria-pressed={activeTab === "trust"}
								className={[
									"rounded-lg px-6 py-3 text-sm font-semibold transition-all",
									activeTab === "trust"
										? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
										: "text-slate-600 hover:text-slate-900",
								].join(" ")}
								style={{ fontFamily: FONT_AVENIR }}
							>
								Trust
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("foundation")}
								aria-pressed={activeTab === "foundation"}
								className={[
									"rounded-lg px-6 py-3 text-sm font-semibold transition-all",
									activeTab === "foundation"
										? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
										: "text-slate-600 hover:text-slate-900",
								].join(" ")}
								style={{ fontFamily: FONT_AVENIR }}
							>
								Foundation
							</button>
						</nav>
					</div>
				</header>

				<main className="mx-auto max-w-[1600px] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
					{/* —— TRUST (visible only when tab active) —— */}
					{activeTab === "trust" && (
						<section
							aria-label="Trust pricing and framework"
							className="space-y-8"
						>
							<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<p
									className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Pricing matrix
								</p>
								<h2
									className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Trust Setup Pricing by Jurisdiction
								</h2>
								<p className="mt-2 max-w-2xl text-sm text-slate-600">
									Boyar Trust setup prices and implied GM by jurisdiction. Search by jurisdiction, supplier, or rationale.
								</p>
								<div className="mt-4">
									<label className="sr-only" htmlFor="trust-search">
										Search trust jurisdictions
									</label>
									<input
										id="trust-search"
										value={trustSearch}
										onChange={(e) => setTrustSearch(e.target.value)}
										placeholder="Search jurisdiction, supplier, rationale…"
										className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
										style={{ fontFamily: FONT_AVENIR }}
									/>
								</div>
								<p className="mt-3 text-xs text-slate-500">
									Showing {filteredTrustRows.length} of {trustPricingRows.length} jurisdictions
								</p>

								<div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
									<table className="min-w-[880px] border-collapse text-sm">
										<thead>
											<tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Jurisdiction</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Supplier Cost (USD)</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Boyar Trust Setup Price (USD)</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Implied GM</th>
												<th className="min-w-[280px] px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Why This GM Is Market-Correct (Industry Logic)</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Supplier(s)</th>
											</tr>
										</thead>
										<tbody>
											{filteredTrustRows.map((row) => (
												<tr
													key={row.id}
													className="border-b border-slate-100 transition-colors hover:bg-slate-50"
												>
													<td className="px-4 py-3 font-semibold text-slate-900" style={{ fontFamily: FONT_AVENIR }}>{row.jurisdiction}</td>
													<td className="px-4 py-3 text-slate-700">{formatTrustUsd(row.supplierCostUsd)}</td>
													<td className="px-4 py-3 text-slate-700">{formatTrustUsd(row.boyarPriceUsd)}</td>
													<td className="px-4 py-3 font-medium text-slate-800">{row.impliedGm}</td>
													<td className="px-4 py-3 text-slate-600" style={{ fontFamily: FONT_AVENIR }}>{row.whyThisGm}</td>
													<td className="px-4 py-3 text-slate-600">{row.suppliers}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<p
									className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Trust Pricing Framework
								</p>
								<h3
									className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Industry-Standard Methodology Used by Leading Fiduciary Law Firms and Global Trustees
								</h3>
								<p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
									This document outlines the pricing philosophy and methodology applied by established fiduciary law firms and global trust service providers (including large international trustee groups and reputable boutique firms). The objective is to explain how trust pricing is actually determined in practice, rather than how it may appear in simplified commercial models.
								</p>
								<div className="mt-6 space-y-5">
									{trustFrameworkFactors.map((factor, idx) => (
										<div
											key={idx}
											className="rounded-xl border border-slate-200 bg-slate-50/80 p-5"
										>
											<h4
												className="text-sm font-semibold text-slate-800"
												style={{ fontFamily: FONT_AVENIR }}
											>
												{factor.title}
											</h4>
											<p
												className="mt-2 text-sm leading-relaxed text-slate-600"
												style={{ fontFamily: FONT_AVENIR }}
											>
												{factor.body}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					)}

					{/* —— FOUNDATION (visible only when tab active) —— */}
					{activeTab === "foundation" && (
						<section
							aria-label="Foundation pricing and framework"
							className="space-y-8"
						>
							<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<p
									className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Pricing matrix
								</p>
								<h2
									className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Foundation Setup Pricing by Jurisdiction
								</h2>
								<p className="mt-2 max-w-2xl text-sm text-slate-600">
									Boyar foundation setup prices and implied GM by jurisdiction. Search by jurisdiction, supplier, or rationale.
								</p>
								<div className="mt-4">
									<label className="sr-only" htmlFor="foundation-search">
										Search foundation jurisdictions
									</label>
									<input
										id="foundation-search"
										value={foundationSearch}
										onChange={(e) => setFoundationSearch(e.target.value)}
										placeholder="Search jurisdiction, supplier, rationale…"
										className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
										style={{ fontFamily: FONT_AVENIR }}
									/>
								</div>
								<p className="mt-3 text-xs text-slate-500">
									Showing {filteredFoundationRows.length} of {foundationPricingRows.length} jurisdictions
								</p>

								<div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
									<table className="min-w-[880px] border-collapse text-sm">
										<thead>
											<tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Jurisdiction</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Supplier Cost (USD) – Market Range</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Boyar Setup Price (USD)</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Implied GM</th>
												<th className="min-w-[280px] px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Why This GM Is Used (Industry Logic)</th>
												<th className="px-4 py-3 text-left" style={{ fontFamily: FONT_AVENIR }}>Supplier(s)</th>
											</tr>
										</thead>
										<tbody>
											{filteredFoundationRows.map((row) => (
												<tr
													key={row.id}
													className="border-b border-slate-100 transition-colors hover:bg-slate-50"
												>
													<td className="px-4 py-3 font-semibold text-slate-900" style={{ fontFamily: FONT_AVENIR }}>{row.jurisdiction}</td>
													<td className="px-4 py-3 text-slate-700">{row.supplierCostUsd}</td>
													<td className="px-4 py-3 text-slate-700">{row.boyarPriceUsd}</td>
													<td className="px-4 py-3 font-medium text-slate-800">{row.impliedGm}</td>
													<td className="px-4 py-3 text-slate-600" style={{ fontFamily: FONT_AVENIR }}>{row.whyThisGm}</td>
													<td className="px-4 py-3 text-slate-600">{row.suppliers}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<p
									className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Foundation Pricing Framework
								</p>
								<h3
									className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Institutional Methodology Applied by Leading Fiduciary Law Firms and Global Foundation Administrators
								</h3>
								<p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
									This document sets out the pricing methodology used by established fiduciary law firms and global foundation administrators operating across international financial centres, including Caribbean, European, and hybrid jurisdictions. The purpose of this framework is to articulate how foundation pricing is determined in professional practice, reflecting governance exposure, regulatory interaction, and long-term fiduciary responsibility, rather than simplified administrative or transactional cost models.
								</p>
								<div className="mt-6 space-y-5">
									{foundationFrameworkFactors.map((factor, idx) => (
										<div
											key={idx}
											className="rounded-xl border border-slate-200 bg-slate-50/80 p-5"
										>
											<h4
												className="text-sm font-semibold text-slate-800"
												style={{ fontFamily: FONT_AVENIR }}
											>
												{factor.title}
											</h4>
											<p
												className="mt-2 text-sm leading-relaxed text-slate-600"
												style={{ fontFamily: FONT_AVENIR }}
											>
												{factor.body}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					)}
				</main>
			</div>
		</ProtectedRoute>
	);
}
