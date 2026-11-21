/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

const jurisdictions = [
	"Belize",
	"Cook Islands",
	"Malta",
	"Panama",
	"Isle of Man",
	"Nevis",
	"Guernsey",
	"Switzerland",
	"Cayman Islands",
	"Liechtenstein",
	"Austria",
	"India",
];

const strategicUses = [
	"Long-term wealth preservation",
	"Succession and dynastic planning",
	"Asset protection with civil-law certainty",
	"Holding operating companies and investments",
	"Philanthropic or mixed private–charitable objectives",
	"Jurisdictions where trusts are unfamiliar or culturally unsuitable",
];

const foundationCharacteristics = [
	"Has separate legal personality",
	"Owns assets in its own name",
	"Operates through statutory governing bodies",
	"Does not rely on a trustee–beneficiary legal split",
];

const ongoingServices = [
	{
		title: "Governing Body Administration",
		items: [
			"Ongoing administration of the foundation council or board",
			"Maintenance of statutory registers and internal records",
			"Execution of council resolutions and decisions",
		],
	},
	{
		title: "Regulatory & Legal Compliance",
		items: [
			"Ongoing AML / KYC maintenance for founders, council members, beneficiaries",
			"Compliance with foundation law and supervisory authority requirements",
			"Annual filings, renewals, and statutory submissions",
		],
	},
	{
		title: "Asset Holding & Structuring",
		items: [
			"Holding of shares, SPVs, partnerships, real estate, IP, or investment portfolios",
			"Integration with operating entities and cross-border structures",
			"Oversight of asset deployment aligned with foundation purpose",
		],
	},
	{
		title: "Accounting & Financial Oversight",
		items: [
			"Foundation-level accounting and financial statements",
			"Coordination with auditors or external accountants (where required)",
			"Monitoring of endowment and asset sustainability",
		],
	},
	{
		title: "Beneficiary & Purpose Management",
		items: [
			"Administration of beneficiary entitlements or discretionary benefits",
			"Oversight of purpose execution (private or philanthropic)",
			"Handling amendments to beneficiary classes or objectives",
		],
	},
	{
		title: "Governance & Oversight Framework",
		items: [
			"Protector or supervisory board interaction",
			"Enforcement of founder intent as set out in statutes and regulations",
			"Periodic governance and relevance reviews",
		],
	},
	{
		title: "Banking & Custodian Coordination",
		items: [
			"Assistance with foundation bank and custody accounts",
			"Ongoing liaison with financial institutions",
			"Transaction authorisations and signatory management",
		],
	},
];

const foundationParticipants = [
	{
		role: "Founder",
		definition:
			"The individual or entity establishing and endowing the foundation.",
		responsibility:
			"Defines the foundation's purpose, governance framework, and initial assets.",
	},
	{
		role: "Foundation (Legal Entity)",
		definition: "The independent juridical person created upon incorporation.",
		responsibility:
			"Holds assets and operates in accordance with its statutes and governing law.",
	},
	{
		role: "Foundation Council / Board",
		definition: "The governing body of the foundation.",
		responsibility:
			"Manages and administers the foundation, executes decisions, and ensures compliance with statutes.",
	},
	{
		role: "Council Members / Directors",
		definition: "Individuals appointed to the governing body.",
		responsibility:
			"Exercise fiduciary duties and manage the foundation's affairs.",
	},
	{
		role: "Protector / Supervisory Authority",
		definition: "Oversight role with defined powers (where applicable).",
		responsibility:
			"Supervises council actions, approves key decisions, or enforces founder intent.",
	},
	{
		role: "Beneficiaries",
		definition: "Persons or entities entitled to benefit from the foundation.",
		responsibility:
			"Receive distributions or benefits as defined by statutes or regulations.",
	},
	{
		role: "Purpose Beneficiary",
		definition:
			"The objective or cause the foundation exists to serve (for purpose foundations).",
		responsibility:
			"Forms the non-personal purpose the foundation must pursue.",
	},
	{
		role: "Enforcer / Auditor of Purpose",
		definition: "Person responsible for ensuring purpose compliance.",
		responsibility:
			"Monitors adherence to stated objectives, especially in purpose foundations.",
	},
	{
		role: "Secretary / Administrator",
		definition: "Administrative officer or service provider.",
		responsibility:
			"Handles filings, records, correspondence, and regulatory interactions.",
	},
];

const foundationDocuments = [
	{
		num: "01",
		title: "Foundation Charter / Statutes",
		description:
			"Constitutional document of the foundation. Defines purpose, governance, and operational framework.",
	},
	{
		num: "02",
		title: "Articles or Regulations",
		description:
			"Internal governance rules. Procedures for council decisions, amendments, and distributions.",
	},
	{
		num: "03",
		title: "Certificate of Incorporation / Registration",
		description: "Evidence of legal existence.",
	},
	{
		num: "04",
		title: "Founder Declaration / Endowment Deed",
		description: "Records initial asset contribution. Defines founder intent.",
	},
	{
		num: "05",
		title: "Council Appointment Resolutions",
		description: "Appoints council members or directors.",
	},
	{
		num: "06",
		title: "Protector / Supervisor Appointment Documents",
		description: "Establishes oversight authority (if applicable).",
	},
	{
		num: "07",
		title: "Beneficiary Register or Beneficiary Schedule",
		description: "Identifies beneficiaries or beneficiary classes.",
	},
	{
		num: "08",
		title: "Asset Transfer Documents",
		description:
			"Share transfers, assignments, or conveyances to the foundation.",
	},
	{
		num: "09",
		title: "Internal Registers & Statutory Records",
		description: "Council registers, beneficiary or purpose records.",
	},
	{
		num: "10",
		title: "Compliance & KYC Documentation Pack",
		description: "AML / CFT records, source of wealth and funds documentation.",
	},
	{
		num: "11",
		title: "FATCA / CRS Classification",
		description:
			"Tax reporting and classification documents (where applicable).",
	},
	{
		num: "12",
		title: "Banking & Custodian Account Documentation",
		description: "Account opening and mandate files.",
	},
];

export default function FoundationsPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='offering-page min-h-screen bg-white'>
				<OfferingMark />
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
									Foundation Services
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-offering-ink leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Foundations — Private Client
								<br />
								<span className='text-offering-ink'>
									Wealth & Governance Structures
								</span>
							</h1>

							<p
								className='offering-subject text-lg text-offering-muted leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								A Foundation is an independent legal entity established by a
								founder, endowed with assets, and governed in accordance with
								its constitutional documents for the benefit of specified
								beneficiaries or for defined private or public purposes.
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
								Foundation establishment and administration support is available
								across the following jurisdictions. These jurisdictions are
								selected for civil-law and hybrid foundation regimes, strong
								asset protection statutes, governance clarity, and international
								recognition.
							</p>

							<div className='flex flex-wrap gap-3'>
								{jurisdictions.map((jurisdiction, idx) => (
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

				{/* Definition and Strategic Role */}
				<section className='border-b border-offering-line'>
					<div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<h2
								className='text-3xl font-semibold text-offering-ink mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Definition and Strategic Role of Foundations
							</h2>

							<div className='space-y-8'>
								{/* Characteristics */}
								<div>
									<p
										className='text-offering-muted mb-6 leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Unlike a trust, a foundation:
									</p>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{foundationCharacteristics.map((characteristic, idx) => (
											<motion.div
												key={idx}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
												className='flex items-start gap-3 bg-white/70  rounded-sm p-5 border border-offering-line/60'
											>
												<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-offering-ink mt-2'></div>
												<p
													className='text-sm text-offering-body leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{characteristic}
												</p>
											</motion.div>
										))}
									</div>
								</div>

								{/* Strategic Uses */}
								<div>
									<p
										className='text-offering-muted mb-6 leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Foundations are commonly used for:
									</p>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{strategicUses.map((use, idx) => (
											<motion.div
												key={idx}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
												className='flex items-start gap-3 bg-white/70  rounded-sm p-5 border border-offering-line/60'
											>
												<div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-offering-ink mt-2'></div>
												<p
													className='text-sm text-offering-body leading-relaxed'
													style={{ fontFamily: "var(--font-avenir)" }}
												>
													{use}
												</p>
											</motion.div>
										))}
									</div>
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.8 }}
									className='bg-offering-tint rounded-sm p-6 border border-offering-line'
								>
									<p
										className='text-offering-body leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Foundations are particularly effective where clarity of
										ownership, governance permanence, and institutional
										recognition are required.
									</p>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Ongoing Services */}
				<section className='border-b border-offering-line bg-white/50 '>
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
								Scope of Services After Foundation Establishment
							</h2>
							<p
								className='text-offering-muted max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Once a foundation is incorporated, the following services are
								typically required and provided across most jurisdictions.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{ongoingServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
									className='bg-white rounded-sm border border-offering-line p-6 hover:border-offering-blue transition-colors'
								>
									<h3
										className='text-lg font-semibold text-offering-ink mb-4 flex items-center gap-2'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										<div className='h-2 w-2 rounded-full bg-offering-ink'></div>
										{service.title}
									</h3>
									<ul className='space-y-3'>
										{service.items.map((item, itemIdx) => (
											<li
												key={itemIdx}
												className='flex items-start gap-3 text-sm text-offering-body leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<div className='flex-shrink-0 w-1 h-1 rounded-full bg-offering-ink mt-2'></div>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Foundation Participants */}
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
								Foundation Participants — Roles and Definitions
							</h2>
							<p
								className='text-offering-muted max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								While structures vary by jurisdiction, foundations typically
								include the following roles.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{foundationParticipants.map((participant, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
									className='bg-white rounded-sm border border-offering-line p-6 hover:border-offering-blue transition-colors'
								>
									<h3
										className='text-lg font-semibold text-offering-ink mb-3'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										{participant.role}
									</h3>
									<div className='space-y-3'>
										<div>
											<p
												className='text-xs font-semibold text-offering-blue uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Definition
											</p>
											<p
												className='text-sm text-offering-body leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{participant.definition}
											</p>
										</div>
										<div>
											<p
												className='text-xs font-semibold text-offering-blue uppercase tracking-wider mb-1'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												Role
											</p>
											<p
												className='text-sm text-offering-body leading-relaxed'
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

				{/* Foundation Documentation */}
				<section className='border-b border-offering-line bg-white/50 '>
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
								Documentation Issued Upon Foundation Incorporation
							</h2>
							<p
								className='text-offering-muted max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Upon incorporation, the following documents are commonly issued.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{foundationDocuments.map((doc, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
									className='bg-white rounded-sm border border-offering-line overflow-hidden hover:border-offering-blue transition-colors'
								>
									<div className='flex items-start gap-6 p-6'>
										<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-sm bg-offering-ink text-white text-lg font-semibold shadow-none'>
											{doc.num}
										</div>
										<div className='flex-1 min-w-0'>
											<h3
												className='text-lg font-semibold text-offering-ink mb-2'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{doc.title}
											</h3>
											<p
												className='text-sm text-offering-body leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{doc.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Outsourced Administration Model */}
				<section className='border-b border-offering-line'>
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
								Outsourced Foundation Administration Model
							</h2>

							<div className='bg-offering-tint rounded-sm border border-offering-line p-8'>
								<p
									className='text-offering-body leading-relaxed mb-6'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Foundation formation and administration are conducted through
									licensed local service providers within each jurisdiction.
									This ensures:
								</p>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
									{[
										"Compliance with local foundation law",
										"Proper governance and statutory filings",
										"Regulatory credibility and substance",
										"Reduced operational and administrative burden for clients",
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
									Absent this structure, clients would otherwise need to
									independently manage legal, compliance, and regulatory
									obligations in each jurisdiction—significantly increasing risk
									and complexity.
								</p>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
