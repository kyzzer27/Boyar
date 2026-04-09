"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";

const FONT_AVENIR =
	"var(--font-avenir), Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const SUPPLIERS: readonly string[] = [
	"Offshoreincorp",
	"BBCincorp",
	"Atrium Associates",
	"Trident Trust",
	"Chandrawat & Partners",
];

interface ServiceRow {
	readonly id: number;
	readonly service: string;
	readonly avgSupplierCostUsd: number;
	readonly boyarClientPriceUsd: number;
	readonly gmPercent: string;
	readonly pricingReasoning: string;
}

const nomineeServicesRows: readonly ServiceRow[] = [
	{
		id: 1,
		service: "Nominee Shareholder",
		avgSupplierCostUsd: 750,
		boyarClientPriceUsd: 1150,
		gmPercent: "34.8%",
		pricingReasoning:
			"Medium-risk role; name-lending with AML exposure. Priced above agent level to avoid regulatory red flags while maintaining strong margin.",
	},
	{
		id: 2,
		service: "Nominee Director",
		avgSupplierCostUsd: 900,
		boyarClientPriceUsd: 1250,
		gmPercent: "28.0%",
		pricingReasoning:
			"Active governance risk and personal liability. Priced competitively below institutional firms but above volume providers.",
	},
	{
		id: 3,
		service: "Nominee Trustee",
		avgSupplierCostUsd: 1300,
		boyarClientPriceUsd: 1750,
		gmPercent: "25.7%",
		pricingReasoning:
			"High fiduciary liability, litigation exposure, and insurance cost. Margin kept realistic to ensure sustainability and defensibility.",
	},
	{
		id: 4,
		service: "Nominee Trustor",
		avgSupplierCostUsd: 1300,
		boyarClientPriceUsd: 1750,
		gmPercent: "25.7%",
		pricingReasoning:
			"Strategic control role with legal exposure. Pricing aligned with trustee to reflect equivalent risk profile.",
	},
	{
		id: 5,
		service: "Foundation Council Member",
		avgSupplierCostUsd: 1300,
		boyarClientPriceUsd: 1750,
		gmPercent: "25.7%",
		pricingReasoning:
			"Decision-making authority under foundation charter. Pricing reflects governance and reputational risk.",
	},
	{
		id: 6,
		service: "Foundation Founder (Nominee)",
		avgSupplierCostUsd: 1300,
		boyarClientPriceUsd: 1750,
		gmPercent: "25.7%",
		pricingReasoning:
			"Structural role tied to foundation validity. Premium pricing avoids perception of artificial founder arrangements.",
	},
];

const documentServicesRows: readonly ServiceRow[] = [
	{
		id: 1,
		service: "POA – Nominee Signature Only",
		avgSupplierCostUsd: 650,
		boyarClientPriceUsd: 850,
		gmPercent: "23.5%",
		pricingReasoning:
			"Low drafting effort but high execution liability. Margin intentionally conservative to remain competitive.",
	},
	{
		id: 2,
		service: "POA – Notary Certified",
		avgSupplierCostUsd: 780,
		boyarClientPriceUsd: 1050,
		gmPercent: "25.7%",
		pricingReasoning:
			"Notarisation introduces jurisdictional and evidentiary risk; pricing reflects verification responsibility.",
	},
	{
		id: 3,
		service: "POA – Apostilled",
		avgSupplierCostUsd: 900,
		boyarClientPriceUsd: 1250,
		gmPercent: "28.0%",
		pricingReasoning:
			"Court / registry involvement and international enforceability justify premium over standard POA.",
	},
	{
		id: 4,
		service: "Declaration of Trust (DOT)",
		avgSupplierCostUsd: 650,
		boyarClientPriceUsd: 950,
		gmPercent: "31.6%",
		pricingReasoning:
			"Core trust evidence document; higher margin justified due to long-term legal reliance.",
	},
	{
		id: 5,
		service: "DOT – Notary Certified",
		avgSupplierCostUsd: 780,
		boyarClientPriceUsd: 1150,
		gmPercent: "32.2%",
		pricingReasoning:
			"Enhanced evidentiary value and dispute exposure; priced for legal robustness.",
	},
	{
		id: 6,
		service: "International Courier",
		avgSupplierCostUsd: 150,
		boyarClientPriceUsd: 180,
		gmPercent: "16.7%",
		pricingReasoning:
			"Pass-through logistical service; margin kept minimal to avoid client friction.",
	},
];

function formatUsd(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export default function TrusteeServicesPricingPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-white text-gray-900">
				<header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
					<div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
						<button
							onClick={() => router.back()}
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Back
						</button>
						<h1
							className="text-xl font-semibold text-gray-900 sm:text-2xl"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Trustee & Nominee Services — Pricing
						</h1>
						<div className="w-24" aria-hidden="true" />
					</div>
				</header>

				<main className="mx-auto max-w-[1400px] px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
					{/* Suppliers */}
					<section aria-label="Partner suppliers" className="mb-12">
						<p
							className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Partner suppliers
						</p>
						<h2
							className="mt-2 text-lg font-semibold text-gray-900 sm:text-xl"
							style={{ fontFamily: FONT_AVENIR }}
						>
							Trustee & nominee service suppliers
						</h2>
						<div className="mt-5 flex flex-wrap gap-3">
							{SUPPLIERS.map((name) => (
								<span
									key={name}
									className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800"
									style={{ fontFamily: FONT_AVENIR }}
								>
									{name}
								</span>
							))}
						</div>
					</section>

					{/* Nominee & governance services table */}
					<section aria-label="Nominee and governance services" className="mb-14">
						<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
							<p
								className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Nominee & governance
							</p>
							<h2
								className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Nominee and governance services
							</h2>
							<p className="mt-2 max-w-2xl text-sm text-gray-600">
								Pricing for nominee shareholder, director, trustee, trustor, and foundation roles. All figures in USD.
							</p>

							<div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
								<table className="min-w-[720px] border-collapse text-sm">
									<thead>
										<tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
											<th className="px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
												Service
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												Avg Supplier Cost (USD)
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												Boyar Client Price (USD)
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												GM %
											</th>
											<th className="min-w-[320px] px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
												Pricing Reasoning
											</th>
										</tr>
									</thead>
									<tbody>
										{nomineeServicesRows.map((row) => (
											<tr
												key={row.id}
												className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
											>
												<td className="px-4 py-3.5 font-semibold text-gray-900" style={{ fontFamily: FONT_AVENIR }}>
													{row.service}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
													{formatUsd(row.avgSupplierCostUsd)}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
													{formatUsd(row.boyarClientPriceUsd)}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums font-medium text-gray-800">
													{row.gmPercent}
												</td>
												<td className="px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
													{row.pricingReasoning}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</section>

					{/* Documents & POA services table */}
					<section aria-label="Documents and POA services">
						<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
							<p
								className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Documents & POA
							</p>
							<h2
								className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl"
								style={{ fontFamily: FONT_AVENIR }}
							>
								Documents and power of attorney services
							</h2>
							<p className="mt-2 max-w-2xl text-sm text-gray-600">
								Pricing for POA, Declaration of Trust, and related document and courier services. All figures in USD.
							</p>

							<div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
								<table className="min-w-[720px] border-collapse text-sm">
									<thead>
										<tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
											<th className="px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
												Service
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												Avg Supplier Cost (USD)
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												Boyar Client Price (USD)
											</th>
											<th className="px-4 py-3.5 text-right" style={{ fontFamily: FONT_AVENIR }}>
												GM %
											</th>
											<th className="min-w-[320px] px-4 py-3.5 text-left" style={{ fontFamily: FONT_AVENIR }}>
												Pricing Reasoning
											</th>
										</tr>
									</thead>
									<tbody>
										{documentServicesRows.map((row) => (
											<tr
												key={row.id}
												className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
											>
												<td className="px-4 py-3.5 font-semibold text-gray-900" style={{ fontFamily: FONT_AVENIR }}>
													{row.service}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
													{formatUsd(row.avgSupplierCostUsd)}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums text-gray-700">
													{formatUsd(row.boyarClientPriceUsd)}
												</td>
												<td className="px-4 py-3.5 text-right tabular-nums font-medium text-gray-800">
													{row.gmPercent}
												</td>
												<td className="px-4 py-3.5 text-gray-600" style={{ fontFamily: FONT_AVENIR }}>
													{row.pricingReasoning}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
