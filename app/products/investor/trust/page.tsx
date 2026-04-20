/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

const jurisdictions = [
	"Bahamas",
	"British Virgin Islands",
	"Cayman Islands",
	"Cook Islands",
	"Nevis",
	"Cyprus",
	"Isle of Man",
	"Seychelles",
	"Singapore",
	"Hong Kong",
	"Jersey",
	"Mauritius",
	"Guernsey",
	"Barbados",
	"Canada",
	"Uruguay",
	"Miami (United States)",
	"United Kingdom",
	"India",
	"Denmark",
];

const strategicPurposes = [
	"Forced heirship mitigation, where permitted by law",
	"Asset protection against future, unknown, or external claims",
	"Succession continuity, ensuring orderly transfer of wealth",
	"Probate avoidance, preventing assets from being locked in lengthy court processes",
	"Confidentiality, where public registries would otherwise disclose ownership",
	"Centralised governance over diverse asset classes and jurisdictions",
	"Tax planning and tax deferral, subject to applicable local and international laws",
];

const trustDocuments = [
	{
		num: "01",
		title: "Trust Deed",
		definition: "The principal legal instrument creating the trust.",
		purpose:
			"Establishes the trust, defines the trust type, governing law, duration, and objectives, sets out powers and duties of the trustee, and identifies beneficiaries or beneficiary classes. This document is legally binding and enforceable under the governing jurisdiction.",
	},
	{
		num: "02",
		title: "Supplemental Deed / Deed of Addition",
		definition: "A deed used to amend or supplement the original trust deed.",
		purpose:
			"Add or remove beneficiaries, modify administrative provisions, update governance mechanics without resettling the trust.",
	},
	{
		num: "03",
		title: "Letter of Wishes",
		definition:
			"A non-binding, confidential guidance document from the settlor.",
		purpose:
			"Expresses settlor's intentions regarding distributions, priorities, or philosophy. Guides trustee discretion without creating legal obligations. Allows flexibility without amending the trust deed. This document is not public and typically remains private between trustee and protector.",
	},
	{
		num: "04",
		title: "Trustee Acceptance Letter",
		definition: "Formal acceptance of fiduciary appointment by the trustee.",
		purpose:
			"Confirms assumption of fiduciary duties and acknowledges obligations under trust law and the trust deed.",
	},
	{
		num: "05",
		title: "Protector Appointment Deed",
		definition: "Instrument appointing the protector of the trust.",
		purpose:
			"Defines protector powers and limitations, establishes oversight and control framework.",
	},
	{
		num: "06",
		title: "Advisor Appointment Letters",
		definition:
			"Formal appointment of advisors (investment, legal, or protector advisors).",
		purpose:
			"Defines advisory scope and clarifies non-fiduciary vs fiduciary roles.",
	},
	{
		num: "07",
		title: "Deed of Appointment and Removal",
		definition:
			"A governance instrument regulating changes in trustees or protectors.",
		purpose:
			"Allows orderly replacement or succession of fiduciaries, ensures continuity without court involvement.",
	},
	{
		num: "08",
		title: "Asset Transfer Instruments",
		definition:
			"Documentation evidencing transfer of assets into the trust (share transfer deeds, assignment agreements, property transfer documents, IP assignment deeds).",
		purpose:
			"These documents perfect the legal transfer of ownership to the trustee.",
	},
	{
		num: "09",
		title: "Trust Register / Internal Trust Records",
		definition: "Internal administrative records maintained by the trustee.",
		purpose:
			"Records settlor, beneficiaries, protectors, trustees, maintains distribution history and resolutions. Required for regulatory inspections. Not publicly accessible but mandatory under modern trust regulation.",
	},
	{
		num: "10",
		title: "Trustee Resolutions",
		definition: "Formal decisions passed by the trustee.",
		purpose:
			"Approve investments, distributions, loans, or structural changes. Evidence proper exercise of fiduciary discretion.",
	},
	{
		num: "11",
		title: "Compliance & KYC Documentation Pack",
		definition: "Regulatory due diligence file maintained by the trustee.",
		purpose:
			"KYC on settlor, beneficiaries, protectors, and controllers, source of wealth and source of funds documentation, ongoing AML refresh requirements. This pack is continuously updated during the trust's lifetime.",
	},
	{
		num: "12",
		title: "FATCA / CRS Classification & Self-Certifications",
		definition: "Tax transparency and reporting documentation.",
		purpose:
			"Classify the trust for international reporting, enable compliant disclosures to tax authorities via trustee.",
	},
	{
		num: "13",
		title: "Banking & Custodian Account Opening Files",
		definition:
			"Account-related documentation linked to trust operations (where applicable).",
		purpose:
			"Enable trust-level banking and custody, authorise signatories and transaction permissions.",
	},
	{
		num: "14",
		title: "Private Trust Company (PTC) Documents",
		definition:
			"Additional documents when a PTC is used (Certificate of Incorporation, Memorandum & Articles of Association, Shareholder Registers, Director Appointment Resolutions, PTC Governance Policy, Service Agreements with licensed administrators).",
		purpose: "Enable corporate trustee structure with family oversight.",
	},
];

const ongoingServices = [
	{
		title: "Ongoing Trustee Administration",
		items: [
			"Day-to-day trust administration and record-keeping",
			"Maintenance of trust registers and statutory records",
			"Execution of trustee resolutions and deeds",
			"Coordination of distributions to beneficiaries",
		],
	},
	{
		title: "Regulatory & Compliance Oversight",
		items: [
			"Ongoing AML / KYC maintenance for all trust parties",
			"Periodic compliance reviews aligned with local trust law",
			"Regulatory filings, renewals, and notifications",
			"FATCA / CRS classification and reporting coordination",
		],
	},
	{
		title: "Asset Holding & Structuring Support",
		items: [
			"Holding of operating companies, investment SPVs, real estate, yachts, aircraft, or portfolios",
			"Integration with underlying companies, partnerships, or funds",
			"Monitoring of asset ownership consistency with trust deed provisions",
		],
	},
	{
		title: "Accounting & Financial Reporting",
		items: [
			"Trust-level accounting and financial statements (where required)",
			"Consolidation of underlying entities for reporting purposes",
			"Liaison with auditors, tax advisors, and external professionals",
		],
	},
	{
		title: "Governance & Control Framework",
		items: [
			"Implementation of protector or advisory oversight mechanisms",
			"Monitoring of trustee actions against trust objectives",
			"Periodic governance reviews for long-term relevance",
		],
	},
	{
		title: "Beneficiary & Succession Management",
		items: [
			"Handling of beneficiary onboarding and changes",
			"Documentation of distributions, loans, or advances",
			"Support during incapacity, death, or generational transitions",
		],
	},
	{
		title: "Multi-Jurisdictional Coordination",
		items: [
			"Coordination between trust jurisdiction and asset jurisdictions",
			"Alignment with local tax, regulatory, and reporting requirements",
			"Ongoing liaison with banks, custodians, and legal counsel",
		],
	},
];

const trustParticipants = [
	{
		role: "Settlor",
		definition:
			"The individual or entity that establishes the trust and transfers assets into it.",
		responsibility:
			"Sets the initial intent, objectives, and terms of the trust through the trust deed.",
	},
	{
		role: "Trustee",
		definition:
			"The legal owner of the trust assets, acting in a fiduciary capacity.",
		responsibility:
			"Administers the trust strictly in accordance with the trust deed and applicable law, owing duties of loyalty and care to the beneficiaries.",
	},
	{
		role: "Protector",
		definition: "An oversight role with defined powers over the trustee.",
		responsibility:
			"Provides checks and balances, often holding powers such as trustee appointment or removal, consent to key decisions, or veto rights.",
	},
	{
		role: "Advisor to the Protector",
		definition: "A professional or individual advising the protector.",
		responsibility:
			"Supports informed decision-making, particularly in complex legal, tax, or investment matters.",
	},
	{
		role: "Beneficiaries",
		definition: "Persons or entities entitled to benefit from the trust.",
		responsibility:
			"Receive distributions or other benefits as determined by the trust deed and trustee discretion.",
	},
	{
		role: "Appointor",
		definition:
			"The party with authority to appoint or remove trustees or protectors (where applicable).",
		responsibility:
			"Acts as a control mechanism within the governance framework.",
	},
	{
		role: "Enforcer",
		definition:
			"A party tasked with enforcing the trust's purpose (primarily in purpose trusts).",
		responsibility:
			"Ensures the trustee adheres to the stated non-charitable objectives.",
	},
	{
		role: "Private Trust Company (PTC) Directors",
		definition: "Directors of a company acting as trustee.",
		responsibility:
			"Allow families to retain strategic oversight while delegating administration to professionals.",
	},
];

export default function TrustPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
				{/* Header */}
				<header className='sticky top-0 bg-white/90 border-b border-slate-200/80 z-30 shadow-sm'>
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
									Trust Services
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Trusts — Private Client
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Wealth Structuring
								</span>
							</h1>

							<p
								className='text-lg text-slate-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Trusts are not transactional tools; they are long-term legal
								arrangements designed to operate across decades and generations,
								addressing legal, fiscal, and intergenerational concerns for
								high-net-worth individuals and families.
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
								Trust structuring and ongoing administration support is
								available across the following jurisdictions. Each jurisdiction
								is selected based on legal robustness, trust law maturity,
								regulatory credibility, and cross-border enforceability.
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

				{/* Purpose and Strategic Use */}
				<section className='border-b border-slate-200'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Purpose and Strategic Use of Trusts
							</h2>
							<p
								className='text-slate-600 mb-8 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Trusts play a central role in private wealth management,
								succession planning, and asset structuring for individuals and
								families. Properly structured trusts can address a wide range of
								legal, fiscal, and intergenerational concerns, including:
							</p>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{strategicPurposes.map((purpose, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
										className='flex items-start gap-3 bg-white/70  rounded-xl p-5 border border-slate-200/60'
									>
										<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2'></div>
										<p
											className='text-sm text-slate-700 leading-relaxed'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											{purpose}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Trust Documentation */}
				<section className='border-b border-slate-200 bg-white/50 '>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className='mb-12'
						>
							<h2
								className='text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Trust Documentation Issued Upon Establishment
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Upon establishment of a trust (and, where applicable, a Private
								Trust Company), a defined set of legal and administrative
								documents is issued. These documents collectively govern intent,
								control, administration, compliance, and ongoing operation of
								the trust structure.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{trustDocuments.map((doc, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.7 + idx * 0.05 }}
									className='bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors'
								>
									<div className='flex items-start gap-6 p-6'>
										<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/20'>
											{doc.num}
										</div>
										<div className='flex-1 min-w-0'>
											<h3
												className='text-lg font-bold text-slate-900 mb-2'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{doc.title}
											</h3>
											<p
												className='text-sm text-slate-600 mb-3 font-medium'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='text-blue-600'>Key Definition:</span>{" "}
												{doc.definition}
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='font-semibold text-slate-900'>
													Purpose:
												</span>{" "}
												{doc.purpose}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Operational Note */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
							className='mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'
						>
							<h3
								className='text-xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Operational Note on Documentation Handling
							</h3>
							<p
								className='text-slate-700 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								All documentation is coordinated through licensed local
								fiduciary service providers within the trust jurisdiction. This
								ensures proper execution under local law, regulatory acceptance,
								ongoing document maintenance and updates, and reduced
								operational and compliance burden for clients. Absent such
								coordination, clients would otherwise need to independently
								manage document execution, compliance filings, and regulatory
								interactions—often across multiple jurisdictions and regulatory
								regimes.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Ongoing Services */}
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
								Scope of Services After Trust or PTC Establishment
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Once a Trust or Private Trust Company (PTC) has been
								established, the following services are typically required and
								provided across most jurisdictions.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{ongoingServices.map((service, idx) => (
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
										{service.title}
									</h3>
									<ul className='space-y-3'>
										{service.items.map((item, itemIdx) => (
											<li
												key={itemIdx}
												className='flex items-start gap-3 text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<div className='flex-shrink-0 w-1 h-1 rounded-full bg-slate-400 mt-2'></div>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Trust Participants */}
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
								Trust Participants — Key Roles and Definitions
							</h2>
							<p
								className='text-slate-600 max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								A trust operates through clearly defined legal roles. While
								structures may vary by jurisdiction, the following participants
								are commonly present.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{trustParticipants.map((participant, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
									className='bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 transition-colors'
								>
									<h3
										className='text-lg font-bold text-slate-900 mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{participant.role}
									</h3>
									<div className='space-y-3'>
										<div>
											<p
												className='text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Definition
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{participant.definition}
											</p>
										</div>
										<div>
											<p
												className='text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Role
											</p>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{participant.responsibility}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Outsourced Administration Model */}
				<section className='border-b border-slate-200'>
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
								Outsourced Trust Administration Model
							</h2>

							<div className='bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-8'>
								<p
									className='text-slate-700 leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Trusts are administered through licensed local trust service
									providers within each jurisdiction. This approach ensures:
								</p>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
									{[
										"Compliance with local trust law and regulatory expectations",
										"Access to experienced fiduciary professionals",
										"Reduced administrative burden for the client",
										"Seamless handling of jurisdiction-specific filings and obligations",
									].map((benefit, idx) => (
										<div
											key={idx}
											className='flex items-start gap-3 bg-white rounded-lg p-4 border border-slate-200'
										>
											<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2'></div>
											<p
												className='text-sm text-slate-700 leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{benefit}
											</p>
										</div>
									))}
								</div>

								<p
									className='text-slate-700 leading-relaxed'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Without such an arrangement, clients would otherwise be
									required to independently engage, coordinate, and monitor
									multiple service providers across jurisdictions—often
									resulting in higher risk, fragmented compliance, and
									operational inefficiency. This model centralises coordination
									while preserving local substance, regulatory credibility, and
									fiduciary integrity.
								</p>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
