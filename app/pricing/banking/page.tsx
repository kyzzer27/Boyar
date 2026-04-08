"use client";

import { getFlagForCountry } from "@/lib/country-flags";
import type { BankingPricingRow } from "./data";
import {
	bankingPricingRows,
	getRegionForJurisdiction,
	REGION_FILTERS,
} from "./data";
import type { BankingGroup2Row } from "./group2-data";
import { bankingGroup2Rows } from "./group2-data";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const FONT_AVENIR =
	"var(--font-avenir), Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function formatUsd(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

const BANKING_GROUPS = [
	{ id: "1", label: "Group 1", minId: 1, maxId: 141 },
	{ id: "2", label: "Group 2", minId: 1, maxId: 45 },
	{ id: "3", label: "Group 3", minId: 0, maxId: 0 },
] as const;

type GroupId = "1" | "2" | "3";

const GROUP2_JURISDICTIONS: string[] = [...new Set(bankingGroup2Rows.map((r) => r.jurisdiction))].sort();

export default function BankingPricingPage() {
	const router = useRouter();
	const [activeGroup, setActiveGroup] = useState<GroupId>("1");
	const [query, setQuery] = useState("");
	const [activeRegion, setActiveRegion] = useState<string>("All regions");
	const [group2JurisdictionFilter, setGroup2JurisdictionFilter] = useState<string>("");
	const [showPricingFactors, setShowPricingFactors] = useState(false);

	const rowsForGroup = useMemo(() => {
		if (activeGroup === "2") return bankingGroup2Rows;
		if (activeGroup === "3") return [];
		return bankingPricingRows;
	}, [activeGroup]);

	const filteredRows = useMemo(() => {
		let base = rowsForGroup;
		if (activeGroup === "2" && group2JurisdictionFilter) {
			base = base.filter((row) => row.jurisdiction === group2JurisdictionFilter);
		} else if (activeRegion !== "All regions") {
			base = base.filter(
				(row) => getRegionForJurisdiction(row.jurisdiction) === activeRegion
			);
		}
		const q = query.trim().toLowerCase();
		if (!q) return base;
		const searchWords = q.split(/\s+/).filter(Boolean);
		const searchable = (row: BankingPricingRow | BankingGroup2Row) => {
			const baseStr = [row.jurisdiction, row.suppliers, row.pricingReason, row.actualGmPercent].join(" ").toLowerCase();
			const bankPart = "bankOption" in row ? [row.bankOption, row.bankParticulars].join(" ") : ("bank" in row ? row.bank : "");
			return (baseStr + " " + bankPart).toLowerCase();
		};
		return base.filter((row) => {
			const text = searchable(row);
			return searchWords.every((word) => text.includes(word));
		});
	}, [activeRegion, activeGroup, group2JurisdictionFilter, query, rowsForGroup]);

	const rowsByJurisdiction = useMemo(() => {
		const map = new Map<string, typeof filteredRows>();
		for (const row of filteredRows) {
			const list = map.get(row.jurisdiction) ?? [];
			list.push(row);
			map.set(row.jurisdiction, list);
		}
		return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
	}, [filteredRows]);

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
							<svg className="h-4 w-4 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
							Back to Pricing
						</button>
						<h1
							className="min-w-0 flex-1 text-center text-xl font-semibold text-gray-900 sm:text-2xl"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Banking — Pricing
						</h1>
						<div className="w-[120px] shrink-0" aria-hidden="true" />
					</div>
				</header>

				<main className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
					{/* Group tabs (left) + Pricing factors (right) — same line */}
					<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<nav
							aria-label="Choose group"
							className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit"
						>
							{BANKING_GROUPS.map((group) => {
								const isActive = activeGroup === group.id;
								return (
									<button
										key={group.id}
										type="button"
										onClick={() => {
											setActiveGroup(group.id as GroupId);
											if (group.id === "2") {
												setActiveRegion("All regions");
												setGroup2JurisdictionFilter("");
											}
										}}
										aria-pressed={isActive}
										className={[
											"rounded-lg px-6 py-3 text-sm font-semibold transition-all",
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
						<button
							type="button"
							onClick={() => setShowPricingFactors(true)}
							className="shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Pricing factors
						</button>
					</div>

					{/* Continent/region filter — below group tabs (Group 2: "All regions" + jurisdiction dropdown) */}
					<nav
						aria-label="Filter by region"
						className="mb-8 flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5 min-h-[52px]"
					>
						{activeGroup === "2" ? (
							<>
								<button
									type="button"
									onClick={() => {
										setActiveRegion("All regions");
										setGroup2JurisdictionFilter("");
									}}
									aria-pressed={!group2JurisdictionFilter}
									className={[
										"shrink-0 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm",
										!group2JurisdictionFilter
											? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
											: "text-gray-600 hover:text-gray-900",
									].join(" ")}
									style={{ fontFamily: FONT_AVENIR }}
								>
									All regions
								</button>
								{/* Wrapper keeps dropdown trigger in a fixed slot so it doesn't shift when selection changes */}
								<div className="relative shrink-0 w-[220px]">
									<label className="sr-only" htmlFor="group2-jurisdiction-filter">
										Filter by jurisdiction
									</label>
									<select
										id="group2-jurisdiction-filter"
										value={group2JurisdictionFilter}
										onChange={(e) => setGroup2JurisdictionFilter(e.target.value)}
										className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-xs font-medium text-gray-700 shadow-sm transition focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:text-sm appearance-none bg-[length:12px] bg-[right_0.5rem_center] bg-no-repeat"
										style={{
											fontFamily: FONT_AVENIR,
											backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
										}}
									>
										<option value="">All jurisdictions</option>
										{GROUP2_JURISDICTIONS.map((j) => (
											<option key={j} value={j}>
												{j}
											</option>
										))}
									</select>
								</div>
							</>
						) : (
							REGION_FILTERS.map((region) => {
								const isActive = activeRegion === region;
								return (
									<button
										key={region}
										type="button"
										onClick={() => setActiveRegion(region)}
										aria-pressed={isActive}
										className={[
											"rounded-lg px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm",
											isActive
												? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
												: "text-gray-600 hover:text-gray-900",
										].join(" ")}
										style={{ fontFamily: FONT_AVENIR }}
									>
										{region}
									</button>
								);
							})
						)}
					</nav>

					<section aria-label="Banking pricing matrix" className="space-y-6">
						<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
							<p
								className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Pricing matrix
							</p>
							<h2
								className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Banking — Pricing by jurisdiction and bank
							</h2>
							<p className="mt-2 max-w-2xl text-sm text-gray-600">
								Boyar client prices and supplier costs by jurisdiction and bank. Use search and region filters to narrow results.
							</p>

							{/* Search bar */}
							<div className="mt-5">
								<label className="sr-only" htmlFor="banking-search">
									Search by jurisdiction or bank name
								</label>
								<input
									id="banking-search"
									type="search"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search by jurisdiction or bank name (e.g. HSBC, Barclays, DBS)…"
									className="w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
									style={{ fontFamily: FONT_AVENIR }}
								/>
							</div>

							<div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-600">
								<span>
									Showing <strong className="text-gray-900">{filteredRows.length}</strong> of{" "}
									<strong className="text-gray-900">{rowsForGroup.length}</strong> in {BANKING_GROUPS.find((g) => g.id === activeGroup)?.label ?? activeGroup}
								</span>
								{activeRegion !== "All regions" && (
									<span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
										{activeRegion}
									</span>
								)}
							</div>

							{rowsByJurisdiction.map(([jurisdiction, rows]) => {
								const flag = getFlagForCountry(jurisdiction);
								return (
								<div key={jurisdiction} className="mb-10">
									<h3
										className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg"
										style={{ fontFamily: FONT_AVENIR }}
									>
										{flag != null && <span aria-hidden>{flag}</span>}
										{jurisdiction}
									</h3>
									<div className="overflow-x-auto rounded-xl border border-gray-200">
										<table className="min-w-[900px] border-collapse text-sm">
											<thead>
												<tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
													<th className="w-10 px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
														#
													</th>
													<th className="px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
														Jurisdiction
													</th>
													{activeGroup === "2" ? (
														<>
															<th className="px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
																Bank / Option
															</th>
															<th className="min-w-[280px] px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
																Bank Particulars (verbatim)
															</th>
														</>
													) : (
														<th className="px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
															Bank
														</th>
													)}
													<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
														Supplier USD
													</th>
													<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
														Boyar Price USD
													</th>
													<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
														Policy GM %
													</th>
													<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
														Actual GM %
													</th>
													<th className="min-w-[220px] px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
														Suppliers
													</th>
													<th className="min-w-[200px] px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
														Pricing Reason
													</th>
												</tr>
											</thead>
											<tbody>
												{activeGroup === "2"
													? (rows as BankingGroup2Row[]).map((row) => (
															<tr
																key={row.id}
																className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
															>
																<td className="px-4 py-3.5 tabular-nums text-gray-600">{row.id}</td>
																<td className="px-4 py-3.5 font-semibold text-gray-900" style={{ fontFamily: FONT_AVENIR }}>
																	{row.jurisdiction}
																</td>
																<td className="px-4 py-3.5 font-medium text-gray-800" style={{ fontFamily: FONT_AVENIR }}>
																	{row.bankOption}
																</td>
																<td className="min-w-[280px] max-w-[420px] whitespace-normal px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
																	{row.bankParticulars}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{formatUsd(row.supplierUsd)}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{formatUsd(row.boyarPriceUsd)}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{row.policyGmPercent}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums font-medium text-gray-800">
																	{row.actualGmPercent}
																</td>
																<td className="min-w-[220px] max-w-[360px] whitespace-normal px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
																	{row.suppliers}
																</td>
																<td className="px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
																	{row.pricingReason}
																</td>
															</tr>
														))
													: (rows as BankingPricingRow[]).map((row) => (
															<tr
																key={row.id}
																className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
															>
																<td className="px-4 py-3.5 tabular-nums text-gray-600">{row.id}</td>
																<td className="px-4 py-3.5 font-semibold text-gray-900" style={{ fontFamily: FONT_AVENIR }}>
																	{row.jurisdiction}
																</td>
																<td className="px-4 py-3.5 font-medium text-gray-800" style={{ fontFamily: FONT_AVENIR }}>
																	{row.bank}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{formatUsd(row.supplierUsd)}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{formatUsd(row.boyarPriceUsd)}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
																	{row.policyGmPercent}
																</td>
																<td className="px-4 py-3.5 text-right tabular-nums font-medium text-gray-800">
																	{row.actualGmPercent}
																</td>
																<td className="min-w-[220px] max-w-[360px] whitespace-normal px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
																	{row.suppliers}
																</td>
																<td className="px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
																	{row.pricingReason}
																</td>
															</tr>
														))}
											</tbody>
										</table>
									</div>
								</div>
							);
							})}

							{filteredRows.length === 0 && (
								<p className="mt-6 text-center text-sm text-gray-500" style={{ fontFamily: FONT_AVENIR }}>
									No entries match your search or region filter. Try a different term or select All regions.
								</p>
							)}
						</div>
					</section>
				</main>

				{/* Pricing factors — slide-over panel with full framework */}
				{showPricingFactors && (
					<>
						<div
							className="fixed inset-0 z-40 bg-black/20"
							aria-hidden
							onClick={() => setShowPricingFactors(false)}
						/>
						<div
							className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[720px] flex-col border-l border-gray-200 bg-white shadow-2xl"
							role="dialog"
							aria-modal="true"
							aria-labelledby="pricing-factors-title"
						>
							<div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
								<h2
									id="pricing-factors-title"
									className="text-lg font-semibold text-gray-900"
									style={{ fontFamily: FONT_AVENIR }}
								>
									Pricing factors
								</h2>
								<button
									type="button"
									onClick={() => setShowPricingFactors(false)}
									className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
									aria-label="Close"
								>
									<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="flex-1 overflow-y-auto px-6 py-8">
								<div className="mx-auto max-w-[600px] space-y-10" style={{ fontFamily: FONT_AVENIR }}>
									<div>
										<h3 className="text-2xl font-semibold text-gray-900">Banking Onboarding Pricing Framework</h3>
										<p className="mt-1 text-sm font-medium uppercase tracking-widest text-gray-500">Institutional & Investor-Facing Methodology</p>
									</div>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">1. Banking as a Credence-Based Service</h4>
										<p className="text-sm leading-relaxed text-gray-700">
											Bank account onboarding operates as a credence product, not a conventional transactional service. Demand is therefore not governed by standard price elasticity.
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											Clients are not purchasing access to a bank account as a commodity. Instead, value is derived from outcomes, including:
										</p>
										<ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
											<li>Probability of successful onboarding</li>
											<li>Certainty of execution timelines</li>
											<li>Regulatory and compliance robustness</li>
											<li>Reputational insulation vis-à-vis banks, regulators, and counterparties</li>
										</ul>
										<p className="text-sm leading-relaxed text-gray-700">
											Because perceived value is outcome-driven rather than feature-driven, pricing power exists when positioning and structuring are executed correctly. As a result, effective pricing in banking advisory must be:
										</p>
										<ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
											<li>Value-anchored rather than cost-plus</li>
											<li>Tiered rather than flat</li>
											<li>Risk-weighted rather than uniform</li>
										</ul>
										<p className="text-sm leading-relaxed text-gray-700">
											This principle underpins margin sustainability and prevents commoditization.
										</p>
									</section>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">2. Supplier Cost Normalization Framework</h4>
										<p className="text-sm leading-relaxed text-gray-700">
											Supplier costs are normalized internally and categorized into defined pricing bands. These bands are used not only for margin modeling, but also to manage client perception, diligence expectations, and positioning.
										</p>
										<div className="overflow-x-auto rounded-lg border border-gray-200">
											<table className="w-full min-w-[320px] border-collapse text-sm">
												<caption className="sr-only">Supplier Cost Bands (USD)</caption>
												<thead>
													<tr className="border-b border-gray-200 bg-gray-50">
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Cost Band</th>
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Supplier Cost Range</th>
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Representative Jurisdictions</th>
													</tr>
												</thead>
												<tbody className="text-gray-700">
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Low</td><td className="px-4 py-3">$500 to $800</td><td className="px-4 py-3">Cyprus, Bulgaria, Baltics, Belize</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Mid</td><td className="px-4 py-3">$800 to $1,200</td><td className="px-4 py-3">Austria, Estonia, Germany (fintech), Czech Republic</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">High</td><td className="px-4 py-3">$1,200 to $1,800+</td><td className="px-4 py-3">Switzerland, Hong Kong, China, Private Banks</td></tr>
												</tbody>
											</table>
										</div>
										<p className="text-sm leading-relaxed text-gray-700">
											These bands function as pricing anchors, not merely accounting classifications.
										</p>
									</section>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">3. Margin Policy and Pricing Discipline</h4>
										<p className="text-sm leading-relaxed text-gray-700">
											Pricing is not applied as a fixed percentage markup. Instead, margin targets are defined after accounting for delivery friction, including:
										</p>
										<ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
											<li>Iterative onboarding and documentation cycles</li>
											<li>Compliance review and remediation</li>
											<li>Failed or abandoned applications</li>
											<li>Ongoing relationship and bank liaison management</li>
										</ul>
										<div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
											<p className="text-sm font-semibold text-gray-900">Target Gross Margin</p>
											<p className="text-sm text-gray-700">25% to 35% post-delivery friction</p>
										</div>
										<p className="text-sm leading-relaxed text-gray-700">
											This range reflects actual advisory economics rather than theoretical margins.
										</p>
										<div className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900">
											<p className="text-sm">Pricing Formula (Industry-Standard Advisory Model)</p>
											<p className="mt-2 text-sm">Boyar Price = (Supplier Cost + Risk Premium + Service Premium) ÷ (1 − Target Margin)</p>
										</div>
										<p className="text-sm leading-relaxed text-gray-700">
											This methodology is consistent with pricing practices used by established fiduciary and advisory firms, as opposed to low-margin introducers or resellers.
										</p>
									</section>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">4. Premium Structure</h4>
										<h5 className="text-sm font-semibold text-gray-800">A. Risk Premium (Mandatory)</h5>
										<p className="text-sm leading-relaxed text-gray-700">
											A fixed USD premium is applied based on client risk profile, independent of jurisdiction.
										</p>
										<div className="overflow-x-auto rounded-lg border border-gray-200">
											<table className="w-full min-w-[280px] border-collapse text-sm">
												<thead>
													<tr className="border-b border-gray-200 bg-gray-50">
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Client Profile</th>
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Risk Premium</th>
													</tr>
												</thead>
												<tbody className="text-gray-700">
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Low-risk trading / services</td><td className="px-4 py-3">$300</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Regulated fintech / crypto-lite</td><td className="px-4 py-3">$600</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">High-risk crypto, iGaming, FX</td><td className="px-4 py-3">$900 to $1,200</td></tr>
												</tbody>
											</table>
										</div>
										<p className="text-sm leading-relaxed text-gray-700">
											This mechanism ensures margin protection even when supplier pricing is compressed.
										</p>
										<h5 className="text-sm font-semibold text-gray-800">B. Service Premium (Strategic Lever)</h5>
										<p className="text-sm leading-relaxed text-gray-700">
											Service tiering is used to prevent price-based competition and protect positioning.
										</p>
										<div className="overflow-x-auto rounded-lg border border-gray-200">
											<table className="w-full min-w-[280px] border-collapse text-sm">
												<thead>
													<tr className="border-b border-gray-200 bg-gray-50">
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Service Tier</th>
														<th className="px-4 py-3 text-left font-semibold text-gray-900">Service Premium</th>
													</tr>
												</thead>
												<tbody className="text-gray-700">
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Standard (email-led handling)</td><td className="px-4 py-3">$250</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Managed (calls + document review)</td><td className="px-4 py-3">$500</td></tr>
													<tr className="border-b border-gray-100"><td className="px-4 py-3">Priority / white-glove</td><td className="px-4 py-3">$1,000+</td></tr>
												</tbody>
											</table>
										</div>
										<p className="text-sm leading-relaxed text-gray-700">
											Pricing concessions are avoided. Instead, service scope is adjusted.
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											Discounting is replaced by controlled service downgrades.
										</p>
									</section>

									<section className="space-y-6">
										<h4 className="text-base font-semibold text-gray-900">5. Illustrative Pricing Scenarios</h4>
										<div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
											<h5 className="text-sm font-semibold text-gray-900">Example A: Cyprus Bank</h5>
											<ul className="space-y-1 text-sm text-gray-700">
												<li>Supplier cost: $534</li>
												<li>Risk premium: $300</li>
												<li>Service premium: $500</li>
												<li>Internal cost basis: $1,334</li>
												<li>Target margin: 30%</li>
												<li>Indicative price: $1,334 ÷ 0.70 = $1,905 → rounded to $1,950</li>
												<li>Market positioning: Competitive</li>
												<li>Effective gross margin: ~31%</li>
											</ul>
										</div>
										<div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
											<h5 className="text-sm font-semibold text-gray-900">Example B: Austria / Germany Tier Bank</h5>
											<ul className="space-y-1 text-sm text-gray-700">
												<li>Supplier cost: $820</li>
												<li>Risk premium: $600</li>
												<li>Service premium: $500</li>
												<li>Cost basis: $1,920</li>
												<li>Indicative price: $1,920 ÷ 0.70 = $2,743 → $2,750</li>
												<li>This remains materially below private-bank onboarding fees typically ranging from $3,500 to $5,000.</li>
											</ul>
										</div>
										<div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
											<h5 className="text-sm font-semibold text-gray-900">Example C: Hong Kong / Swiss Private Bank</h5>
											<ul className="space-y-1 text-sm text-gray-700">
												<li>Supplier cost: $1,720</li>
												<li>Risk premium: $1,000</li>
												<li>Service premium: $1,000</li>
												<li>Cost basis: $3,720</li>
												<li>Indicative price: $3,720 ÷ 0.68 ≈ $5,470 → $5,500</li>
												<li>This pricing aligns with global private banking advisory benchmarks.</li>
											</ul>
										</div>
									</section>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">6. Competitive Positioning Without Margin Erosion</h4>
										<h5 className="text-sm font-semibold text-gray-800">Anchored Pricing with Controlled Concessions</h5>
										<p className="text-sm leading-relaxed text-gray-700">
											Base pricing is not discounted. Instead, concessions are structured through:
										</p>
										<ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
											<li>Removal of service premiums</li>
											<li>Bundling with corporate structuring services</li>
											<li>Rebates on secondary or follow-on accounts</li>
										</ul>
										<h5 className="text-sm font-semibold text-gray-800">&quot;Starting From&quot; Price Publication</h5>
										<p className="text-sm leading-relaxed text-gray-700">
											Externally communicated pricing uses anchored entry points, e.g.:
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											European SEPA Account: starting from $1,750
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											Risk premiums preserve internal margins while maintaining market accessibility.
										</p>
										<h5 className="text-sm font-semibold text-gray-800">Clear Separation Between Advisory and Introductions</h5>
										<p className="text-sm leading-relaxed text-gray-700">
											Services are positioned as:
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											Advisory and onboarding mandates, not transactional account-opening fees
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											This distinction is both legally sound and commercially effective.
										</p>
									</section>

									<section className="space-y-4">
										<h4 className="text-base font-semibold text-gray-900">7. Institutional Signaling and Scalability</h4>
										<ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
											<li>Tiered, outcome-driven pricing architecture</li>
											<li>Explicit risk-weighted premium structure</li>
											<li>Margin consistency across jurisdictions</li>
											<li>Diversified banking counterparties</li>
											<li>Clear expansion and upsell vectors (cards, APIs, secondary IBANs)</li>
										</ul>
										<p className="text-sm leading-relaxed text-gray-700">
											Flat pricing indicates brokerage behavior.
										</p>
										<p className="text-sm leading-relaxed text-gray-700">
											Framework-driven pricing signals a scalable advisory platform.
										</p>
									</section>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</ProtectedRoute>
	);
}
