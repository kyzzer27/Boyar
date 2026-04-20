/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

interface ServiceItem {
	num: string;
	title: string;
	definition: string;
	purpose: string;
}

interface ServiceCategory {
	section: string;
	intro: string;
	items: ServiceItem[];
}

const philanthropyServices: ServiceCategory[] = [
	{
		section: "Philanthropic Structuring & Vehicles",
		intro:
			"Selecting the correct legal vehicle for philanthropic activity is as consequential as the giving itself. The wrong structure imposes tax inefficiency, governance risk, and reputational exposure. The right structure enables giving at scale — compounding impact across decades and generations.",
		items: [
			{
				num: "01",
				title: "Private Foundation Establishment",
				definition:
					"Formation of a private foundation as a dedicated legal entity for charitable giving.",
				purpose:
					"Establishes a permanent, independently governed vehicle for philanthropic activity — holding endowed capital, making grants, and operating programmes. The private foundation separates the donor's personal balance sheet from charitable assets, provides governance continuity beyond the founder's lifetime, and — depending on jurisdiction — delivers meaningful tax deductions on contributions. Commonly established in jurisdictions including Liechtenstein, Panama, Netherlands, Switzerland, Singapore, and the Bahamas.",
			},
			{
				num: "02",
				title: "Charitable Trust Formation",
				definition:
					"Establishment of a trust with exclusively charitable objects under applicable trust law.",
				purpose:
					"Creates a fiduciary structure where assets are held on trust for defined charitable purposes — rather than for identified beneficiaries. Charitable trusts are recognised under common law jurisdictions including Jersey, Cayman, BVI, Guernsey, and England & Wales, and typically enjoy exemption from income and capital gains tax on assets held within the structure. Suitable for donors seeking an irrevocable, purpose-bound commitment to philanthropic goals.",
			},
			{
				num: "03",
				title: "Donor-Advised Fund (DAF) Access",
				definition:
					"Coordinated access to donor-advised fund platforms for flexible charitable giving.",
				purpose:
					"Provides the donor with an immediate charitable tax deduction at the time of contribution, while retaining advisory rights over the timing and recipient of grants. DAFs are particularly effective for donors who wish to give a lump sum in a high-income year — capturing the deduction immediately — while distributing grants over time in accordance with a considered philanthropic strategy. Available through platforms in the US, UK, and select European jurisdictions.",
			},
			{
				num: "04",
				title: "Philanthropic Holding Structures",
				definition:
					"Integration of philanthropic giving vehicles within broader family wealth structures.",
				purpose:
					"Embeds charitable entities — foundations, trusts, or DAFs — within the family's existing holding architecture. Enables coordinated tax planning across personal, corporate, and charitable layers. Common applications include a family holding company donating appreciated securities to an associated foundation (capturing deduction and avoiding capital gains), or a family trust making distributions to a charitable sub-fund as part of a defined giving programme.",
			},
		],
	},
	{
		section: "Foundation Governance & Administration",
		intro:
			"A philanthropic foundation established without rigorous governance is an administrative liability. Board composition, grant policies, conflicts of interest, and regulatory reporting must be managed with the same discipline applied to commercial entities.",
		items: [
			{
				num: "01",
				title: "Foundation Board Governance",
				definition:
					"Structuring and ongoing support for foundation board composition, meetings, and resolutions.",
				purpose:
					"Designs the foundation's governance framework — defining board composition requirements, quorum rules, voting procedures, conflict of interest policies, and officer responsibilities. Prepares and maintains board resolutions and meeting minutes as part of ongoing administration. Ensures the foundation's governance satisfies regulatory expectations in its jurisdiction of establishment and any jurisdiction in which it operates.",
			},
			{
				num: "02",
				title: "Grant Programme Administration",
				definition:
					"Operational management of the foundation's grant-making programme.",
				purpose:
					"Manages the full grant lifecycle — from application intake and due diligence on proposed recipients, through grant agreement execution, fund disbursement, and post-grant reporting. Maintains complete grant records for regulatory filings and annual reporting. Coordinates KYC and sanctions screening on grant recipients to satisfy AML obligations applicable to charitable entities.",
			},
			{
				num: "03",
				title: "Regulatory Filing & Annual Reporting",
				definition:
					"Preparation and filing of all statutory and regulatory reports required of the foundation.",
				purpose:
					"Coordinates annual reporting, financial statement preparation, regulatory returns, and public benefit declarations as required under the foundation's governing legislation. Includes management of any public register entries or beneficial ownership disclosures applicable to the foundation and its controllers under local law.",
			},
			{
				num: "04",
				title: "Investment Policy Development",
				definition:
					"Establishing a formal investment policy for the foundation's endowment.",
				purpose:
					"Develops a written investment policy statement aligned with the foundation's mission, spending policy, and time horizon. Addresses asset allocation, permissible investment categories, ESG or mission-aligned investment criteria, and liquidity requirements. Ensures the board's investment decisions are documented and defensible against prudent investor standards applicable under the governing jurisdiction.",
			},
			{
				num: "05",
				title: "Impact Measurement Framework",
				definition:
					"Design and implementation of a framework for measuring philanthropic impact.",
				purpose:
					"Establishes measurable indicators of grant effectiveness and programme impact, aligned to the foundation's stated charitable objects. Enables the board to assess whether deployed capital is achieving its intended social outcomes — and to adjust the grant strategy accordingly. Increasingly required by regulators and relevant for foundations with reputational exposure in public benefit activities.",
			},
		],
	},
	{
		section: "Philanthropic Strategy & Advisory",
		intro:
			"Effective philanthropy is not the absence of strategy. Families that give at scale without a defined framework face governance disputes, mission drift, and diminishing impact over successive generations. Structured philanthropic advisory translates values into durable giving frameworks.",
		items: [
			{
				num: "01",
				title: "Philanthropic Mission & Strategy Development",
				definition:
					"Advisory process for defining and documenting the family's philanthropic mission.",
				purpose:
					"Facilitates structured conversation across family members to identify shared values, giving priorities, geographic focus, and time horizon. Produces a documented philanthropic strategy — covering mission statement, focus areas, grant-making approach (reactive versus proactive), annual budget, and success metrics. Provides the governance foundation for the foundation board and prevents mission drift as family composition evolves.",
			},
			{
				num: "02",
				title: "Family Philanthropy Governance",
				definition:
					"Frameworks for integrating multiple generations into philanthropic decision-making.",
				purpose:
					"Designs engagement models for next-generation family members — including youth advisory councils, learning grants, and phased involvement in grant committees. Addresses succession of philanthropic leadership and ensures the family's charitable intent is transferred alongside its financial capital. Reduces the risk of the foundation becoming a source of family conflict rather than a unifying institution.",
			},
			{
				num: "03",
				title: "Cross-Border Giving Compliance",
				definition:
					"Advisory on legal and tax requirements for international grant-making.",
				purpose:
					"International philanthropy involves complex legal, tax, and sanctions considerations. A foundation established in one jurisdiction making grants to recipients in others must navigate equivalency determinations, expenditure responsibility procedures, sanctions screening, and local charitable law requirements. This service coordinates the legal and compliance framework for foundations engaged in cross-border grant activity.",
			},
			{
				num: "04",
				title: "Strategic Philanthropy Integration with Estate Planning",
				definition:
					"Alignment of philanthropic giving with the family's broader estate and succession plan.",
				purpose:
					"Coordinates the philanthropic structure with the overall estate plan — including use of charitable remainder trusts, charitable lead trusts, testamentary foundation endowments, and legacy giving arrangements. Maximises the family's combined tax efficiency, ensures philanthropic intent is codified in succession documents, and provides clarity for advisors, executors, and future generations on the family's charitable objectives.",
			},
			{
				num: "05",
				title: "ESG & Mission-Aligned Investing",
				definition:
					"Advisory on aligning foundation investment policy with its charitable mission.",
				purpose:
					"Assists foundations in developing a coherent approach to mission-related investing — ranging from negative screens (excluding sectors inconsistent with the foundation's values) through to programme-related investments and impact investments designed to generate both financial return and social outcome. Ensures investment policy documentation satisfies legal requirements and provides fiduciary cover for the board.",
			},
		],
	},
];

const jurisdictions = [
	"Liechtenstein",
	"Panama",
	"Netherlands",
	"Switzerland",
	"Singapore",
	"Bahamas",
	"Jersey",
	"Cayman Islands",
	"British Virgin Islands",
	"Guernsey",
	"England & Wales",
	"United States",
	"Ireland",
	"Malta",
	"Hong Kong",
	"Canada",
];

const structuralConsiderations = [
	"Charitable tax deductions are jurisdiction-specific — the donor's home tax residency determines deductibility, not the foundation's jurisdiction of establishment",
	"Private foundations are subject to minimum distribution requirements in several jurisdictions, including the US (5% of net investment assets annually) and Germany",
	"Foundations established for private benefit rather than public charitable purposes may not qualify for tax-exempt status — purpose drafting is critical",
	"Cross-border grant-making requires expenditure responsibility procedures or equivalency determinations to avoid characterisation as taxable expenditure (US foundations)",
	"AML obligations apply to charitable entities — particularly regarding KYC on major donors and due diligence on grant recipients in higher-risk jurisdictions",
	"Foundation assets must be demonstrably ring-fenced from the founder's personal estate to achieve legal separation for asset protection and tax purposes",
];

const philanthropicStructures = [
	{
		title: "Private Foundation",
		bestFor: "Families seeking permanent, independently governed giving vehicles with full endowment control",
		taxProfile: "Deductible contributions (jurisdiction-dependent); tax-exempt investment returns; minimum distribution requirements may apply",
		governance: "Independent board; formal grant policy; annual regulatory filing required",
	},
	{
		title: "Charitable Trust",
		bestFor: "Irrevocable commitments to defined charitable purposes; common law jurisdictions",
		taxProfile: "Income and capital gains tax exemption on trust assets; no personal deduction unless additional wrapper used",
		governance: "Trustee-managed; purpose-bound; enforceable by attorney general or enforcer",
	},
	{
		title: "Donor-Advised Fund",
		bestFor: "Donors wanting immediate deduction with flexible grant timing; lower administrative overhead",
		taxProfile: "Immediate deduction at contribution; no ongoing tax obligations at donor level",
		governance: "Administered by sponsoring organisation; donor retains advisory (not binding) rights over grants",
	},
	{
		title: "Charitable Lead / Remainder Trust",
		bestFor: "Estate planning integration; income stream to charity during term with remainder to family (or vice versa)",
		taxProfile: "Partial charitable deduction; estate and gift tax efficiency; structured income flows",
		governance: "Trustee-managed; irrevocable; requires actuarial valuation and IRS-compliant trust instrument (US structures)",
	},
];

export default function PhilanthropySolutionsPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				{/* Header */}
				<header className='sticky top-0 bg-white/95 border-b border-slate-200/80 z-30 shadow-sm'>
					<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							<span className='inline-block transition-transform group-hover:-translate-x-1'>
								←
							</span>
							<span>Back</span>
						</button>
						<div className='flex items-center gap-3'>
							<div className='h-8 w-px bg-slate-300'></div>
							<span
								className='text-xs font-semibold tracking-widest text-slate-500 uppercase'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Private Clients
							</span>
						</div>
					</div>
				</header>

				{/* Hero Section */}
				<section className='relative overflow-hidden border-b border-slate-200'>
					<div className='absolute inset-0 -z-10'>
						<div className='absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl'></div>
						<div className='absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>
					</div>

					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='space-y-6 max-w-4xl'
						>
							<div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 border border-blue-200'>
								<div className='h-2 w-2 rounded-full bg-blue-500'></div>
								<span
									className='text-xs font-semibold text-blue-700 tracking-wide uppercase'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Philanthropy Solutions
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Philanthropy Solutions
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Structured Giving for Lasting Impact
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Philanthropy at the private wealth level is a discipline, not
								an impulse. For families committed to giving at scale — across
								generations, borders, and causes — the legal vehicle, governance
								framework, and tax architecture of the philanthropic structure
								are as consequential as the quantum of capital deployed. Done
								correctly, structured philanthropy compounds impact, preserves
								family alignment, and delivers material tax efficiency. Done
								without structure, it creates governance disputes, regulatory
								exposure, and diminishing returns.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Jurisdictional Coverage */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Coverage
							</h2>
							<p
								className='text-slate-600 mb-8 max-w-3xl'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Philanthropic structures are established and administered across
								the following jurisdictions. Jurisdiction selection is driven by
								the donor's tax residency, intended geographic focus of giving,
								desired governance model, and whether public benefit recognition
								or tax exemption is required.
							</p>

							<div className='flex flex-wrap gap-3'>
								{jurisdictions.map((jurisdiction, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.3 + idx * 0.03 }}
										className='inline-flex items-center px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-colors'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{jurisdiction}
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Services Sections */}
				{philanthropyServices.map((category, categoryIndex) => (
					<section
						key={categoryIndex}
						className={`border-b border-slate-200 ${categoryIndex % 2 === 0 ? "" : "bg-white/50 "}`}
					>
						<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='mb-12'
							>
								<h2
									className='text-3xl font-bold text-slate-900 mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{category.section}
								</h2>
								<p
									className='text-slate-600 max-w-4xl leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{category.intro}
								</p>
							</motion.div>

							<div className='space-y-6'>
								{category.items.map((item, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.4,
											delay: 0.3 + idx * 0.06,
										}}
										className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors'
									>
										<div className='flex items-start gap-6 p-6'>
											<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/20'>
												{item.num}
											</div>
											<div className='flex-1 min-w-0'>
												<h3
													className='text-lg font-bold text-slate-900 mb-2'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item.title}
												</h3>
												<p
													className='text-sm text-slate-600 mb-3 font-medium'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='text-blue-600'>Key Definition:</span>{" "}
													{item.definition}
												</p>
												<p
													className='text-sm text-slate-700 leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='font-semibold text-slate-900'>
														Purpose:
													</span>{" "}
													{item.purpose}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</section>
				))}

				{/* Structure Comparison */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Philanthropic Structures — At a Glance
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								The choice of philanthropic vehicle is driven by the donor's
								tax position, desired level of control, administrative capacity,
								and intended longevity of the giving programme. The following
								structures are the most commonly deployed across private client
								mandates.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{philanthropicStructures.map((structure, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
									className='bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 transition-colors'
								>
									<h3
										className='text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<div className='h-2 w-2 rounded-full bg-blue-500'></div>
										{structure.title}
									</h3>
									<div className='space-y-3'>
										<div>
											<p
												className='text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Best For
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{structure.bestFor}
											</p>
										</div>
										<div>
											<p
												className='text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Tax Profile
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{structure.taxProfile}
											</p>
										</div>
										<div>
											<p
												className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Governance
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{structure.governance}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Key Structural Considerations */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Key Structural Considerations
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Philanthropic structures operate at the intersection of tax law,
								charitable regulation, AML compliance, and family governance.
								The following considerations apply across the majority of
								private client philanthropy mandates and should be addressed at
								the point of structure design — not retrospectively.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{structuralConsiderations.map((consideration, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
									className='flex items-start gap-3 bg-white/70  rounded-xl p-5 border border-slate-200/60'
								>
									<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2'></div>
									<p
										className='text-sm text-slate-700 leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{consideration}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Operational Note */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='max-w-4xl'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery Model
							</h2>

							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'>
								<h3
									className='text-xl font-bold text-slate-900 mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Coordinated Across Legal, Tax, and Governance Disciplines
								</h3>
								<p
									className='text-slate-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Philanthropy mandates are delivered through a coordinated
									network of licensed local advisors — including trust
									attorneys, foundation administrators, tax counsel, and
									governance specialists within each relevant jurisdiction.
									This ensures:
								</p>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
									{[
										"Legal validity — foundation or trust instruments are drafted and executed under applicable local law by qualified legal professionals",
										"Tax efficiency — charitable deductibility and exemption analysis is performed by tax advisors resident in the donor's home jurisdiction",
										"Regulatory compliance — annual filings, beneficial ownership disclosures, and AML obligations are managed by the local administrator",
										"Governance continuity — board succession, grant policy updates, and investment policy reviews are maintained as standing ongoing services",
									].map((item, idx) => (
										<div
											key={idx}
											className='flex items-start gap-3 bg-white rounded-lg p-4 border border-blue-100'
										>
											<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2'></div>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{item}
											</p>
										</div>
									))}
								</div>

								<p
									className='text-slate-700 leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Without this coordination model, clients establishing
									philanthropic structures independently face fragmented advice
									across multiple professional disciplines, inconsistent
									governance documentation, and ongoing administrative burden
									that often results in regulatory non-compliance or — at worst
									— loss of tax-exempt status for the foundation. This model
									centralises oversight while preserving the legal and
									regulatory substance required for each jurisdiction.
								</p>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
