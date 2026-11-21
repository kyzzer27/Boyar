/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
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

const fiduciaryServices: ServiceCategory[] = [
	{
		section: "Fiduciary Services",
		intro:
			"Professional fiduciary services providing independent governance, oversight, and administration across trust structures, private foundations, and multi-jurisdictional wealth vehicles.",
		items: [
			{
				num: "01",
				title: "Professional Trustee Services",
				definition:
					"Appointment of a licensed fiduciary as trustee for private trusts and PTCs.",
				purpose:
					"Ensures legally compliant trust administration in accordance with the trust deed and applicable jurisdiction law. The professional trustee holds legal title to trust assets, exercises fiduciary discretion in the interest of beneficiaries, and maintains all regulatory and reporting obligations — relieving the settlor and family of direct operational burden.",
			},
			{
				num: "02",
				title: "Protector & Advisory Roles",
				definition:
					"Independent appointment as protector or advisor within trust governance frameworks.",
				purpose:
					"Provides a structured layer of oversight and counterbalance to trustee authority. The protector or advisor monitors the trustee's exercise of discretion, holds consent rights over key decisions, and ensures the settlor's documented intent is preserved across generations. This role is particularly critical in family office structures where governance and family dynamics intersect.",
			},
			{
				num: "03",
				title: "Executor & Estate Administration",
				definition:
					"Fiduciary appointment as executor of testamentary estates across applicable jurisdictions.",
				purpose:
					"Manages the orderly administration of a deceased's estate — collecting, valuing, and distributing assets in accordance with the will and applicable succession law. Includes probate coordination, creditor management, tax filings, and cross-border asset repatriation where required.",
			},
			{
				num: "04",
				title: "Trust Register Maintenance",
				definition:
					"Ongoing upkeep of statutory and internal trust records as required under local trust law.",
				purpose:
					"Maintains comprehensive records of settlors, beneficiaries, controllers, protectors, and distributions. Satisfies regulatory inspection requirements and AML/CTF obligations across all trust jurisdictions. Reduces risk of compliance failure arising from incomplete or outdated documentation.",
			},
			{
				num: "05",
				title: "Beneficiary Communication & Distribution Management",
				definition:
					"Structured management of beneficiary relationships, onboarding, and distribution processing.",
				purpose:
					"Manages formal communications with beneficiaries, coordinates distribution requests against trust deed parameters, and maintains auditable records of all distributions, loans, and advances. Includes KYC refresh on beneficiaries as part of ongoing AML obligations.",
			},
			{
				num: "06",
				title: "FATCA / CRS Classification & Reporting",
				definition:
					"Tax transparency classification and reporting coordination for trust structures.",
				purpose:
					"Classifies the trust or holding entity under applicable FATCA and Common Reporting Standard frameworks. Coordinates compliant disclosure of financial accounts and controlling persons to relevant tax authorities, in coordination with the trust administrator and local counsel.",
			},
		],
	},
	{
		section: "Directorship Services",
		intro:
			"Independent directorship services for holding companies, SPVs, private trust companies, and operating entities — providing governance substance and regulatory compliance across jurisdictions.",
		items: [
			{
				num: "01",
				title: "Independent Non-Executive Director",
				definition:
					"Appointment of a professional independent director on the board of a corporate entity.",
				purpose:
					"Provides governance credibility and substance to holding companies, SPVs, and investment vehicles. The independent director participates in board resolutions, reviews and signs off on material decisions, and satisfies regulatory requirements relating to local control and management where substance is required. Critical for economic substance compliance in jurisdictions such as BVI, Cayman, Bermuda, Jersey, and Guernsey.",
			},
			{
				num: "02",
				title: "Nominee Director Services",
				definition:
					"Provision of a licensed nominee director for privacy and administrative purposes.",
				purpose:
					"Allows the beneficial owner to maintain confidentiality in public registry filings while retaining full economic and operational control through a signed Declaration of Trust or undisclosed principal agreement. Nominee arrangements are structured under legally binding side agreements and must comply with local beneficial ownership disclosure regimes.",
			},
			{
				num: "03",
				title: "Corporate Governance & Board Resolutions",
				definition:
					"Preparation and execution of board minutes, resolutions, and governance documentation.",
				purpose:
					"Maintains a complete and contemporaneous record of corporate decisions — required for regulatory compliance, banking relationships, and audit readiness. Includes resolutions for the opening of bank accounts, approval of major transactions, appointment of officers, and annual compliance filings.",
			},
			{
				num: "04",
				title: "Registered Agent & Registered Office",
				definition:
					"Provision of a statutory registered agent and registered office address in the jurisdiction of incorporation.",
				purpose:
					"Satisfies mandatory requirements under corporate law in all major offshore and mid-shore jurisdictions. The registered agent receives and forwards official correspondence, regulatory notices, and statutory filings on behalf of the company. Essential for maintaining good standing and avoiding default or strike-off.",
			},
			{
				num: "05",
				title: "Economic Substance Compliance",
				definition:
					"Advisory and implementation support for economic substance requirements in qualifying jurisdictions.",
				purpose:
					"Assists entities conducting relevant activities — including holding company activities, finance and leasing, headquarters activities, and intellectual property holding — to meet the directed and managed test, core income-generating activities requirements, and substance reporting obligations under applicable legislation. Applies to BVI, Cayman, Bermuda, Jersey, Guernsey, Isle of Man, and Bahamas.",
			},
			{
				num: "06",
				title: "Annual Compliance & Statutory Filing Coordination",
				definition:
					"Coordination of annual returns, renewals, and statutory filings across the entity's jurisdiction.",
				purpose:
					"Manages all recurring corporate maintenance obligations — including annual return filings, beneficial ownership register updates, licence renewals, and economic substance reports. Prevents inadvertent loss of good standing, regulatory penalties, or automatic dissolution due to missed filings.",
			},
		],
	},
	{
		section: "Private Trust Company (PTC) Governance",
		intro:
			"Specialised governance and administrative support for family-controlled Private Trust Companies — combining professional fiduciary oversight with retention of strategic family control.",
		items: [
			{
				num: "01",
				title: "PTC Incorporation & Licensing",
				definition:
					"Establishment of a Private Trust Company in a suitable jurisdiction with requisite licensing.",
				purpose:
					"Incorporates the PTC as a special purpose corporate entity authorised to act as trustee. Coordinates regulatory licensing (where required), preparation of constitutional documents, and establishment of the PTC governance framework. Common jurisdictions include BVI, Cayman, Nevis, Bahamas, and Jersey.",
			},
			{
				num: "02",
				title: "Licensed Administrator Appointment",
				definition:
					"Appointment of a licensed trust administrator to manage PTC operations on behalf of the family.",
				purpose:
					"Provides the licensed third-party administration required in most jurisdictions for PTCs not holding a direct trust licence. The administrator manages day-to-day trust administration, compliance, and regulatory reporting — enabling the family to focus on strategic oversight through their PTC board.",
			},
			{
				num: "03",
				title: "Family Director Support & Training",
				definition:
					"Governance training and ongoing support for family members serving as PTC directors.",
				purpose:
					"Equips family directors with the knowledge required to discharge their legal duties — including fiduciary obligations, conflict of interest management, and decision-making under trust law. Reduces governance risk arising from inexperienced family participation in fiduciary decision-making.",
			},
			{
				num: "04",
				title: "PTC Governance Policy & Operating Framework",
				definition:
					"Development and maintenance of the PTC's internal governance framework.",
				purpose:
					"Documents the policies and procedures governing PTC board meetings, investment decisions, distribution policy, conflict management, and succession of directors. Provides a durable institutional framework that outlasts any individual family member's involvement.",
			},
		],
	},
];

const keyJurisdictions = [
	"British Virgin Islands",
	"Cayman Islands",
	"Jersey",
	"Guernsey",
	"Isle of Man",
	"Bahamas",
	"Nevis",
	"Cyprus",
	"Malta",
	"Singapore",
	"Hong Kong",
	"Mauritius",
	"Seychelles",
	"Bermuda",
	"Luxembourg",
	"Liechtenstein",
	"Panama",
	"Cook Islands",
];

const structuralBenefits = [
	"Independent governance reduces family conflict and protects against internal disputes over wealth distribution",
	"Professional fiduciaries provide regulatory credibility with banks, regulators, and counterparties",
	"Substance compliance maintained without the client bearing the burden of local operational presence",
	"Director liability managed through properly structured engagement letters and indemnity arrangements",
	"Continuity of administration preserved across incapacity, death, or generational transition events",
	"Separation between legal ownership and beneficial control achieved through compliant nominee and trust arrangements",
];

export default function FiduciaryDirectorshipPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='offering-page min-h-screen bg-white'>
				{/* Header */}
				<header className='offering-masthead sticky top-0 bg-white/95 border-b border-offering-line/80 z-30 shadow-none'>
					<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='group flex items-center gap-2 text-sm font-medium text-offering-muted hover:text-offering-ink transition-colors'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							<span className='inline-block transition-transform group-hover:-translate-x-1'>
								←
							</span>
							<span>Back</span>
						</button>
						<OfferingMark />
						<div className='flex items-center gap-3'>
							<div className='h-8 w-px bg-offering-line'></div>
							<span
								className='text-xs font-semibold tracking-widest text-offering-muted uppercase'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Private Clients
							</span>
						</div>
					</div>
				</header>

				{/* Hero Section */}
				<section className='relative overflow-hidden border-b border-offering-line'>
					<div className='absolute inset-0 -z-10'>
						<div className='absolute top-0 right-1/4 w-96 h-96 bg-offering-tint/40 rounded-full invisible'></div>
						<div className='absolute bottom-0 left-1/4 w-96 h-96 bg-offering-tint/30 rounded-full invisible'></div>
					</div>

					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='space-y-6 max-w-4xl'
						>
							<div className='inline-flex items-center gap-2 rounded-sm bg-offering-tint px-4 py-1.5 border border-offering-line'>
								<div className='h-2 w-2 rounded-full bg-offering-ink'></div>
								<span
									className='text-xs font-semibold text-offering-blue tracking-wide uppercase'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Fiduciary & Directorship
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-offering-ink leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Fiduciary & Directorship
								<br />
								<span className='text-offering-ink'>
									Independent Governance & Control
								</span>
							</h1>

							<p
								className='text-lg text-offering-muted leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Fiduciary and directorship services exist at the intersection of
								legal obligation and governance integrity. For high-net-worth
								individuals, family offices, and cross-border structures, the
								appointment of independent, licensed professionals in trustee,
								director, and protector roles is not optional — it is a
								regulatory, banking, and structural necessity that determines
								whether a structure holds under scrutiny.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Jurisdictional Coverage */}
				<section className='border-b border-offering-line bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Jurisdictional Coverage
							</h2>
							<p
								className='text-offering-muted mb-8 max-w-3xl'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Fiduciary and directorship appointments are coordinated through
								licensed local service providers across the following
								jurisdictions. Each jurisdiction is selected for its regulatory
								maturity, fiduciary licensing regime, banking access, and
								credibility in cross-border wealth structures.
							</p>

							<div className='flex flex-wrap gap-3'>
								{keyJurisdictions.map((jurisdiction, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.3 + idx * 0.03 }}
										className='inline-flex items-center px-4 py-2 rounded-sm bg-white border border-offering-line text-sm font-medium text-offering-body hover:border-offering-blue hover:bg-offering-tint transition-colors'
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
				{fiduciaryServices.map((category, categoryIndex) => (
					<section
						key={categoryIndex}
						className={`border-b border-offering-line ${categoryIndex % 2 === 1 ? "bg-white/50 " : ""}`}
					>
						<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='mb-12'
							>
								<h2
									className='text-3xl font-semibold text-offering-ink mb-4'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{category.section}
								</h2>
								<p
									className='text-offering-muted max-w-4xl leading-relaxed'
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
										className='bg-white rounded-sm border border-offering-line overflow-hidden hover:border-offering-blue transition-colors'
									>
										<div className='flex items-start gap-6 p-6'>
											<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-sm bg-offering-ink text-white text-lg font-semibold shadow-none'>
												{item.num}
											</div>
											<div className='flex-1 min-w-0'>
												<h3
													className='text-lg font-semibold text-offering-ink mb-2'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{item.title}
												</h3>
												<p
													className='text-sm text-offering-muted mb-3 font-medium'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='text-offering-blue'>Key Definition:</span>{" "}
													{item.definition}
												</p>
												<p
													className='text-sm text-offering-body leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													<span className='font-semibold text-offering-ink'>
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

				{/* Structural Benefits */}
				<section className='border-b border-offering-line'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Why Independent Fiduciary Appointments Matter
							</h2>
							<p
								className='text-offering-muted max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								The appointment of independent fiduciaries and directors is not
								merely a regulatory formality. For structures that need to
								withstand regulatory scrutiny, banking due diligence, and
								generational transitions, the quality and independence of
								governance appointments is structurally determinative.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{structuralBenefits.map((benefit, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
									className='flex items-start gap-3 bg-white/70  rounded-sm p-5 border border-offering-line/60'
								>
									<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-offering-ink mt-2'></div>
									<p
										className='text-sm text-offering-body leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{benefit}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Operational Note */}
				<section className='border-b border-offering-line bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='max-w-4xl'
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-6'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Delivery Model
							</h2>

							<div className='bg-offering-tint rounded-sm border border-offering-line p-8'>
								<p
									className='text-offering-body leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									All fiduciary and directorship services are delivered through
									licensed local professionals within each relevant jurisdiction.
									This model ensures:
								</p>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
									{[
										"Regulatory acceptance — appointees hold current local licences and authorisations",
										"Liability clarity — engagement terms, indemnity arrangements, and scope are formally documented",
										"Substance credibility — local appointments satisfy the directed and managed test in applicable jurisdictions",
										"Continuity — succession arrangements for fiduciary roles are pre-agreed and documented in governing instruments",
									].map((benefit, idx) => (
										<div
											key={idx}
											className='flex items-start gap-3 bg-white rounded-sm p-4 border border-offering-line'
										>
											<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-offering-ink mt-2'></div>
											<p
												className='text-sm text-offering-body leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{benefit}
											</p>
										</div>
									))}
								</div>

								<p
									className='text-offering-body leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Without a coordinated network of licensed local fiduciaries,
									clients would otherwise need to independently identify,
									appoint, manage, and replace trustees and directors across
									multiple jurisdictions — each with different licensing
									requirements, regulatory expectations, and professional
									standards. This model centralises coordination while preserving
									local regulatory credibility and fiduciary integrity.
								</p>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
