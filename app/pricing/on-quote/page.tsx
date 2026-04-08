"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	europeCaspRows,
	asiaMiddleEastRows,
	africaRows,
	americasRows,
	oceaniaRows,
	usCanadaRegistrations,
	forexRows,
} from "./licensing-data";

const FONT_HEADING =
	'"Copperplate Gothic Bold", "Copperplate Gothic", Copperplate, serif';
const FONT_AVENIR =
	"var(--font-avenir), Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const ON_QUOTE_GROUPS = [
	{ id: "1", label: "Private Banking" },
	{ id: "2", label: "International Licensing" },
	{ id: "3", label: "Insurance Solutions" },
	{ id: "4", label: "Custodian Services" },
] as const;

type GroupId = "1" | "2" | "3" | "4";

export default function OnQuotePricingPage() {
	const router = useRouter();
	const [activeGroup, setActiveGroup] = useState<GroupId>("1");

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-white text-gray-900">
				<header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
					<div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
						<button
							type="button"
							onClick={() => router.back()}
							className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
							style={{ fontFamily: FONT_AVENIR }}
						>
							<svg
								className="h-4 w-4 shrink-0 text-gray-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Back to Pricing
						</button>
						<h1
							className="min-w-0 flex-1 text-center text-xl font-semibold text-gray-900 sm:text-2xl"
							style={{ fontFamily: FONT_AVENIR }}
						>
							On Quote Pricing
						</h1>
						<div className="w-[120px] shrink-0" aria-hidden="true" />
					</div>
				</header>

				<main className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
					<nav
						aria-label="Choose group"
						className="mb-8 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1"
					>
						{ON_QUOTE_GROUPS.map((group) => {
							const isActive = activeGroup === group.id;
							return (
								<button
									key={group.id}
									type="button"
									onClick={() => setActiveGroup(group.id as GroupId)}
									aria-pressed={isActive}
									className={[
										"rounded-lg px-5 py-3 text-sm font-semibold transition-all",
										isActive
											? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
											: "text-slate-600 hover:text-slate-900",
									].join(" ")}
									style={{ fontFamily: FONT_AVENIR }}
								>
									{group.label}
								</button>
							);
						})}
					</nav>

					<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
						{activeGroup === "1" && <Group1PrivateBanking />}
						{activeGroup === "2" && <Group2InternationalLicensing />}
						{activeGroup === "3" && <Group3InsuranceSolutions />}
						{activeGroup === "4" && <Group4CustodianServices />}
					</div>
				</main>
			</div>
		</ProtectedRoute>
	);
}

function Group1PrivateBanking() {
	return (
		<div className="space-y-8" style={{ fontFamily: FONT_AVENIR }}>
			<h2
				className="text-[32px] font-bold leading-tight text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Why Private Banking Is Priced on a Case-by-Case (On-Quote) Basis
			</h2>

			<p className="text-base leading-relaxed text-gray-700 font-normal">
				Private banking is not a standardized financial product. In real-world
				practice, even at top-tier global banks and private banking desks, no
				two private banking engagements are priced the same. Pricing is
				determined only after a detailed assessment of the client's profile,
				structure, jurisdictional exposure, and operational complexity.
			</p>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					1. Client Risk Profile Directly Impacts Bank Cost
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Private banks price based on risk, not just assets. Key variables
					include:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Client nationality and residency</li>
					<li>Source of wealth and source of funds</li>
					<li>
						Industry exposure (e.g. crypto, trading, commodities, family
						office structures)
					</li>
					<li>Political exposure (PEP considerations)</li>
					<li>Transaction behavior expectations</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Each of these factors affects:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Internal compliance workload</li>
					<li>Ongoing monitoring intensity</li>
					<li>Enhanced due diligence requirements</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Since these costs vary materially per client, flat pricing would be
					commercially and operationally inaccurate.
				</p>
			</section>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					2. Jurisdictional Banking Rules Are Not Uniform
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Private banking costs differ significantly depending on:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>
						Booking jurisdiction (EU, Switzerland, Middle East, Asia, Caribbean)
					</li>
					<li>Correspondent banking relationships</li>
					<li>Local regulatory capital requirements</li>
					<li>FATCA / CRS exposure</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					For example, a Swiss-booked account for a multi-jurisdictional family
					office carries substantially different compliance and reporting
					obligations compared to a non-EU booking center.
				</p>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					As a result, pricing must be structured after jurisdictional alignment
					is confirmed, not before.
				</p>
			</section>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					3. Asset Size Alone Does Not Define Complexity
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					While asset size is relevant, it is not the sole pricing driver. Two
					clients with identical net worths may have vastly different cost
					profiles depending on:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Number of accounts required</li>
					<li>Currency exposure</li>
					<li>Custody requirements</li>
					<li>Investment mandate complexity</li>
					<li>Use of external asset managers (EAMs)</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Private banks therefore price based on engagement structure, not a
					headline AUM figure.
				</p>
			</section>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					4. Service Scope Varies Per Client
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Private banking engagements may include:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Dedicated relationship management</li>
					<li>Multi-currency custody</li>
					<li>Discretionary or advisory mandates</li>
					<li>Credit facilities (Lombard, margin, structured lending)</li>
					<li>Family office coordination</li>
					<li>Cross-border tax and reporting coordination</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Each additional layer changes operational cost, legal exposure, and
					staffing requirements, making flat pricing commercially unworkable.
				</p>
			</section>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					5. Alignment With Global Private Banking Norms
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					In practice:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Tier-1 private banks</li>
					<li>International custodians</li>
					<li>Family-office desks</li>
					<li>Multi-booking private banking platforms</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					All operate on individually quoted pricing, often approved internally
					only after full onboarding review.
				</p>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Offering flat pricing in private banking would be non-standard,
					misleading, and inconsistent with real banking operations.
				</p>
			</section>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					Conclusion
				</h3>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Private banking pricing is intentionally on-quote because:
				</p>
				<ul className="list-inside list-disc space-y-1 text-base text-gray-700 font-normal">
					<li>Risk is individualized</li>
					<li>Compliance effort is variable</li>
					<li>Jurisdictional rules differ</li>
					<li>Service scope is bespoke</li>
					<li>Costs cannot be standardized without mispricing</li>
				</ul>
				<p className="text-base leading-relaxed text-gray-700 font-normal">
					Accordingly, pricing is finalized only after client onboarding
					assessment and structural clarity, ensuring transparency, regulatory
					alignment, and long-term sustainability for both the client and the
					banking partner.
				</p>
			</section>
		</div>
	);
}

function Group2InternationalLicensing() {
	return (
		<div className="space-y-8" style={{ fontFamily: FONT_AVENIR }}>
			<h2
				className="text-[32px] font-bold leading-tight text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Why These International Licenses Are Offered on a Quote-Based Basis
			</h2>

			<p className="text-base leading-relaxed text-gray-700 font-normal">
				International licensing is inherently jurisdiction-specific and
				applicant-specific. While license titles may appear uniform, regulators
				assess each application based on ownership structure, nationality and
				residency of controllers, business model complexity, target markets,
				capital positioning, compliance architecture, substance requirements, and
				regulatory history. These variables directly affect regulatory scrutiny,
				approval timelines, mandatory local appointments, audit and compliance
				costs, and the level of engagement required with local counsel and
				regulators. In many jurisdictions, licensing success depends not only on
				meeting statutory thresholds but on how the application is structured,
				positioned, and supported throughout the regulatory process. As these
				factors differ materially from case to case, and often evolve during
				regulator interaction, pricing cannot be standardised. Accordingly, all
				licensing services are offered strictly on a quote-based basis,
				determined only after a full assessment of the applicant profile,
				jurisdictional exposure, and regulatory pathway, in line with
				institutional and regulator-facing best practice.
			</p>

			<section className="space-y-4">
				<h3
					className="text-[32px] font-bold text-gray-900"
					style={{ fontFamily: FONT_HEADING }}
				>
					International Licenses Offered (Quote-Based)
				</h3>
				<h4 className="text-lg font-semibold text-gray-800">
					Europe: CASP / Crypto / Financial Licenses
				</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{europeCaspRows.map((r, i) => (
								<tr
									key={i}
									className="border-b border-gray-100"
								>
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">
					Asia & Middle East
				</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{asiaMiddleEastRows.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">Africa</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{africaRows.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">Americas</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{americasRows.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">Oceania</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{oceaniaRows.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">
					United States & Canada: Registrations
				</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Registration
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{usCanadaRegistrations.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.registration}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h4 className="text-lg font-semibold text-gray-800">Forex Licenses</h4>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="w-full min-w-[320px] border-collapse text-base">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									Jurisdiction
								</th>
								<th className="px-4 py-3 text-left font-semibold text-gray-900">
									License
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 font-normal">
							{forexRows.map((r, i) => (
								<tr key={i} className="border-b border-gray-100">
									<td className="px-4 py-3">{r.jurisdiction}</td>
									<td className="px-4 py-3">{r.license}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}

function Group3InsuranceSolutions() {
	return (
		<div className="space-y-8" style={{ fontFamily: FONT_AVENIR }}>
			<h2
				className="text-[32px] font-bold leading-tight text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Insurance Solutions
			</h2>

			<h3
				className="text-[32px] font-bold text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Why Private Client Insurance Is Offered on a Quote-Based Basis
			</h3>

			<p className="text-base leading-relaxed text-gray-700 font-normal">
				Private client insurance and personalised coverage are not standard
				retail products but bespoke risk-management solutions structured around
				the individual client's profile, assets, lifestyle, and jurisdictional
				exposure. Coverage terms, underwriting requirements, insurer
				participation, and premium structures vary materially depending on
				factors such as asset type and location, cross-border residency, usage
				patterns, valuation methodology, claims history, and regulatory
				considerations. In many cases, coverage is placed through specialist
				underwriters, Lloyd's syndicates, or private insurance desks, where
				pricing is determined only after detailed risk assessment and insurer
				alignment. As each engagement involves a distinct underwriting process,
				insurer appetite, and coverage architecture, pricing cannot be
				standardised in advance. Accordingly, private client insurance services
				are offered strictly on a quote-based basis, ensuring coverage is
				accurately structured, appropriately priced, and aligned with the client's
				long-term risk profile and confidentiality requirements.
			</p>
		</div>
	);
}

function Group4CustodianServices() {
	return (
		<div className="space-y-8" style={{ fontFamily: FONT_AVENIR }}>
			<h2
				className="text-[32px] font-bold leading-tight text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Custodian Services
			</h2>

			<h3
				className="text-[32px] font-bold text-gray-900"
				style={{ fontFamily: FONT_HEADING }}
			>
				Why Custodian Services Are Offered on a Quote-Based Basis
			</h3>

			<p className="text-base leading-relaxed text-gray-700 font-normal">
				Custodian services are not standardised products but institutional
				arrangements structured around the nature of the assets, jurisdiction of
				custody, regulatory exposure, and the legal framework governing
				ownership and control. The scope of custody, whether securities, digital
				assets, private holdings, or multi-jurisdictional portfolios, directly
				affects onboarding requirements, reporting obligations, operational
				complexity, and risk assumed by the custodian. In many cases, access is
				facilitated through professional references, trustees, or private banks,
				with differing cost structures and acceptance criteria across custodial
				platforms. As each mandate involves a distinct asset profile,
				jurisdictional setup, and level of custodial responsibility, pricing
				cannot be fixed in advance. Accordingly, custodian services are offered
				strictly on an on-quote basis, determined only after a full assessment
				of the client's structure, assets, and custody pathway, in line with
				institutional custody standards.
			</p>
		</div>
	);
}
