/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";

const operatingModelContent = [
	"Family office services are delivered through a dedicated outsourced partnership model, engaging specialist, industry-leading professionals across governance, structuring, investments, reporting, and risk management.",
	"This model allows families to access institutional-grade capabilities without bearing the fixed cost, staffing burden, or regulatory complexity of building and maintaining a fully in-house family office infrastructure.",
];

const scopeServices = [
	{
		num: "01",
		title: "Governance & Strategic Architecture",
		definition: "Support for creation and restructuring of family offices.",
		purpose:
			"Working alongside specialist partners, family office services support both the creation of new family offices and the review or restructuring of existing arrangements. Key areas include definition of long-term family objectives and investment philosophy, design of governance frameworks aligned with family values and risk tolerance, establishment of decision-making protocols and approval hierarchies, development of policies covering investments, distributions, succession, and conflict resolution, and alignment of ownership, control, and management across generations. This ensures continuity, discipline, and accountability as family wealth and complexity increase over time.",
	},
	{
		num: "02",
		title: "Wealth Structuring & Asset Holding",
		definition: "Integration of trusts, foundations, and corporate entities.",
		purpose:
			"Family offices are supported through a global suite of trust, foundation, and corporate structuring services, enabling efficient and compliant wealth organisation. This includes structuring holding companies and SPVs for operational and investment activities, establishment and administration of private trusts and foundations, integration of family businesses, investment portfolios, and alternative assets, succession-focused structuring for inter-generational wealth transition, and alignment of structures with tax, regulatory, and reporting considerations. Both single-family offices (SFOs) and multi-family offices (MFOs) are supported, depending on the family's scale and objectives.",
	},
	{
		num: "03",
		title: "Private Funds & Investment Vehicles",
		definition:
			"Support for private investment vehicles outside retail structures.",
		purpose:
			"Leveraging combined private client and fund administration expertise, family office services include support for private investment vehicles that sit outside traditional retail fund structures. This includes formation of private investment funds for family capital, establishment of lighter-touch investment vehicles not subject to full collective investment regulation, ongoing operational and administrative management, coordination with fund administrators, custodians, and legal counsel, and reporting aligned with family-level oversight rather than public fund disclosure. These structures are commonly used for private equity, venture capital, real estate, co-investments, and direct operating business exposure.",
	},
	{
		num: "04",
		title: "Private Family Insurance Coverage",
		definition:
			"Structuring of family insurance integrated with wealth planning.",
		purpose:
			"Family office services also extend to private family insurance structuring, typically coordinated with specialist insurance advisors and carriers. Coverage areas may include wealth protection and estate liquidity planning, key-person and succession-related insurance, asset-linked insurance wrappers, and risk mitigation for operating businesses and investment holdings. Insurance solutions are integrated into the broader wealth and succession framework rather than treated as standalone products.",
	},
];

const reportingCapabilities = [
	{
		num: "01",
		title: "Effortless Daily Data Collection",
		definition: "Automated aggregation and reconciliation of positions.",
		purpose:
			"Automated aggregation of trades and positions across managers and platforms, centralised reconciliation, reporting, and approval workflows, and reduced manual intervention and operational risk.",
	},
	{
		num: "02",
		title: "Standardised Data Architecture",
		definition: "Consistent data formats across asset classes.",
		purpose:
			"Consistent data formats across asset classes, elimination of fragmented reporting from disparate sources, and coverage across fund of funds, public market portfolios, real estate, private equity, and venture capital.",
	},
	{
		num: "03",
		title: "Segregation of Investment Mandates",
		definition: "Clear separation between discretionary and non-discretionary.",
		purpose:
			"Clear separation between discretionary and non-discretionary investments, independent performance reporting by investment type, and enhanced transparency and accountability.",
	},
	{
		num: "04",
		title: "Comprehensive Reporting & Analytics",
		definition:
			"Normalised reporting with multi-level filtering and drill-down.",
		purpose:
			"Normalised reporting covering attribution, exposure, P&L, and performance, filtering by strategy, trader, fund, sector, asset class, or geography, capital call and distribution tracking at both investment and family levels, consolidated family-level views with drill-down to individual UBO accounts, and simplified data outputs for tax compliance and advisory support.",
	},
	{
		num: "05",
		title: "System Integration & Security",
		definition: "Secure API integration with external systems.",
		purpose:
			"Secure API and data-file integration, compatibility with OMS, PMS, risk data vendors, custodians, and internal data warehouses, and controlled access with data confidentiality.",
	},
];

const outsourcedAdvantages = [
	"Access to institutional-grade capabilities without the fixed cost and complexity of a fully in-house team",
	"Flexible staffing and resource allocation scaled to family needs",
	"Specialist expertise across governance, structures, investments, administration, and reporting",
	"Regulatory compliance and operational management handled by dedicated professionals",
	"Enhanced focus on family strategy and long-term legacy planning",
];

export default function FamilyOfficePage() {
	const router = useRouter();

	const staggerContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.08, delayChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='max-w-7xl mx-auto'
				>
					{/* Header */}
					<button
						onClick={() => router.back()}
						className='text-slate-600 hover:text-slate-900 text-sm mb-8 flex items-center gap-2'
					>
						← Back
					</button>

					<div className='mb-16'>
						<h1 className='text-5xl font-bold text-slate-900 mb-4'>
							Family Office Solutions
						</h1>
						<p className='text-slate-600 text-lg max-w-3xl'>
							Comprehensive family office services designed to support
							governance, wealth structuring, investments, reporting, and family
							legacy planning.
						</p>
					</div>

					{/* Operating Model */}
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className='mb-16'
					>
						<h2 className='text-2xl font-bold text-slate-900 mb-6'>
							Operating Model
						</h2>
						<div className='space-y-6'>
							{operatingModelContent.map((paragraph, idx) => (
								<motion.p
									key={idx}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.1 * idx, duration: 0.5 }}
									className='text-slate-700 leading-relaxed'
								>
									{paragraph}
								</motion.p>
							))}
						</div>
					</motion.section>

					{/* Scope of Services */}
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='mb-16'
					>
						<h2 className='text-2xl font-bold text-slate-900 mb-8'>
							Scope of Services
						</h2>
						<motion.div
							variants={staggerContainerVariants}
							initial='hidden'
							animate='visible'
							className='grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							{scopeServices.map((service) => (
								<motion.div
									key={service.num}
									variants={itemVariants}
									className='border border-slate-200 rounded-lg p-8 hover:border-blue-200 transition-colors'
								>
									<span className='inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4'>
										{service.num}
									</span>
									<h3 className='text-xl font-bold text-slate-900 mb-3'>
										{service.title}
									</h3>
									<p className='text-slate-600 text-sm mb-4'>
										{service.definition}
									</p>
									<p className='text-slate-700 text-sm leading-relaxed'>
										{service.purpose}
									</p>
								</motion.div>
							))}
						</motion.div>
					</motion.section>

					{/* Reporting Capabilities */}
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.6 }}
						className='mb-16'
					>
						<h2 className='text-2xl font-bold text-slate-900 mb-8'>
							Reporting Capabilities
						</h2>
						<motion.div
							variants={staggerContainerVariants}
							initial='hidden'
							animate='visible'
							className='grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							{reportingCapabilities.map((capability) => (
								<motion.div
									key={capability.num}
									variants={itemVariants}
									className='border border-slate-200 rounded-lg p-8 hover:border-blue-200 transition-colors'
								>
									<span className='inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4'>
										{capability.num}
									</span>
									<h3 className='text-xl font-bold text-slate-900 mb-3'>
										{capability.title}
									</h3>
									<p className='text-slate-600 text-sm mb-4'>
										{capability.definition}
									</p>
									<p className='text-slate-700 text-sm leading-relaxed'>
										{capability.purpose}
									</p>
								</motion.div>
							))}
						</motion.div>
					</motion.section>

					{/* Outsourced Model Benefits */}
					<motion.section
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className='mb-12'
					>
						<h2 className='text-2xl font-bold text-slate-900 mb-8'>
							Advantages of Outsourced Partnership
						</h2>
						<motion.div
							variants={staggerContainerVariants}
							initial='hidden'
							animate='visible'
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
						>
							{outsourcedAdvantages.map((advantage, idx) => (
								<motion.div
									key={idx}
									variants={itemVariants}
									className='border border-slate-200 rounded-lg p-6 hover:border-blue-200 transition-colors'
								>
									<p className='text-slate-700 text-sm leading-relaxed'>
										{advantage}
									</p>
								</motion.div>
							))}
						</motion.div>
					</motion.section>
				</motion.div>
			</div>
		</ProtectedRoute>
	);
}
