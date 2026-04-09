/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const services = [
	{
		id: 1,
		title: "Account Solutions",
		icon: "01",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Dedicated and Pooled Accounts",
				desc: "Structured to fit specific operational and compliance needs.",
			},
			{
				name: "Named & Dedicated IBANs",
				desc: "Available in USD, GBP, EUR, and 10+ additional currencies (subject to partner approval).",
			},
			{
				name: "Multi-Currency Accounts",
				desc: "Personalised IBAN structures with integrated FX capabilities.",
			},
			{
				name: "Escrow Account Structures",
				desc: "Available via regulated third-party providers.",
			},
		],
	},
	{
		id: 2,
		title: "Payment Infrastructure",
		icon: "02",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Global Reach",
				desc: "Payment capabilities across 200+ countries.",
			},
			{
				name: "Supported Networks",
				desc: "SWIFT, SEPA, SEPA Instant, Faster Payments, CHAPS, BACS, ACH, and other local clearing systems.",
			},
			{
				name: "Local Payment Remittance",
				desc: "Jurisdiction-appropriate settlement rails to reduce cross-border friction.",
			},
			{
				name: "Bulk Payment Processing",
				desc: "Partner-led solutions for mass payouts and supplier settlements.",
			},
			{
				name: "Payroll Solutions",
				desc: "Multi-currency payroll execution through compliant third-party systems.",
			},
		],
	},
	{
		id: 3,
		title: "Currency Support",
		icon: "03",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "30+ Supported Currencies",
				desc: "Including local rails for operational efficiency.",
			},
			{
				name: "FX-Optimised Structures",
				desc: "Competitive pricing frameworks and reduced conversion friction.",
			},
		],
	},
	{
		id: 4,
		title: "Card Processing",
		icon: "04",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Acquiring for Complex Markets",
				desc: "Access where traditional acquirers may decline. Coverage for Gambling, iGaming, Adult, iDating, Crypto, and Streaming.",
			},
			{
				name: "Global Card Acceptance",
				desc: "Visa, Mastercard, Amex, and other major networks (subject to underwriting).",
			},
			{
				name: "Multi-Currency Processing",
				desc: "Settlement in multiple currencies to reduce FX exposure.",
			},
			{
				name: "Chargeback & Risk Tooling",
				desc: "Partner-provided dispute mitigation frameworks.",
			},
			{
				name: "Recurring Billing Support",
				desc: "Subscription and membership billing models.",
			},
		],
	},
	{
		id: 5,
		title: "Open Banking",
		icon: "05",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "High-Risk Sector Coverage",
				desc: "Access to providers experienced in gaming, FX, and other regulated sectors.",
			},
			{
				name: "Instant Payments",
				desc: "Real-time bank-to-bank settlement where supported.",
			},
			{
				name: "Cross-Border Reach",
				desc: "Multi-currency execution across supported jurisdictions.",
			},
			{
				name: "API Connectivity",
				desc: "Partner APIs integrated into client systems.",
			},
			{
				name: "Lower Transaction Costs",
				desc: "Reduced reliance on card rails.",
			},
		],
	},
	{
		id: 6,
		title: "Crypto Services",
		icon: "06",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Digital Asset Transactions",
				desc: "Support for USDT (ERC20), BTC, USDC, ETH, XRP, and other major assets.",
			},
			{
				name: "Fiat–Crypto Interoperability",
				desc: "Conversion between dedicated IBANs and crypto wallets.",
			},
			{
				name: "Institutional Custody & Security",
				desc: "Wallet infrastructure provided by regulated custodians, with insurance coverage via Lloyd's of London.",
			},
		],
	},
	{
		id: 7,
		title: "Alternative Payment Methods",
		icon: "07",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "E-Wallets & Mobile Payments",
				desc: "PayPal, Skrill, Neteller, Alipay, WeChat Pay, and others.",
			},
			{
				name: "Accelerated Settlement Cycles",
				desc: "Faster processing compared to traditional methods.",
			},
			{
				name: "Regional Coverage",
				desc: "Asia-Pacific, LATAM, Central America, Africa, and MENA markets.",
			},
		],
	},
	{
		id: 8,
		title: "FX Services",
		icon: "08",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Real-Time FX Execution",
				desc: "Spot transactions with same-day or near-term settlement.",
			},
			{
				name: "Forward Contracts",
				desc: "Rate protection for up to five years.",
			},
			{
				name: "Hedging Frameworks",
				desc: "Designed strictly for risk mitigation, not speculation.",
			},
		],
	},
	{
		id: 9,
		title: "Banking-as-a-Service",
		icon: "09",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Account Issuance",
				desc: "Corporate and individual accounts across multiple currencies.",
			},
			{
				name: "Embedded FX & Payment Rails",
				desc: "SWIFT, Faster Payments, CHAPS, and local networks.",
			},
			{
				name: "Multi-Currency Cards",
				desc: "Mastercard virtual and physical issuance.",
			},
			{
				name: "API-First Architecture",
				desc: "Integration into SaaS platforms and mobile applications.",
			},
		],
	},
	{
		id: 10,
		title: "API Integration",
		icon: "10",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Mass Payment Automation",
				desc: "Automated processing at scale.",
			},
			{
				name: "Global Currency Coverage",
				desc: "Support for 50+ currencies.",
			},
			{
				name: "Sandbox Environments",
				desc: "Testing capabilities before production deployment.",
			},
			{
				name: "Scalable Infrastructure",
				desc: "Without the need for in-house buildout.",
			},
		],
	},
	{
		id: 11,
		title: "PCI Compliance",
		icon: "11",
		color: "from-blue-500 to-blue-600",
		textColor: "text-blue-600",
		borderColor: "border-blue-100",
		features: [
			{
				name: "Tokenisation Solutions",
				desc: "Replace traditional gateway-bound implementations.",
			},
			{
				name: "Vaulting Services",
				desc: "Secure storage and transfer of card data.",
			},
			{
				name: "Reduced PCI Scope",
				desc: "Significantly minimise regulatory burden and compliance requirements.",
			},
		],
	},
];

function ServiceCard({
	service,
	index,
}: {
	service: (typeof services)[0];
	index: number;
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			className='group relative mb-6 sm:mb-8'
			style={{ breakInside: "avoid-column" }}
		>
			<div
				className={`relative rounded-lg border ${
					service.borderColor
				} bg-white cursor-pointer transition-all duration-300 hover:border-gray-300 hover:shadow-lg ${
					isExpanded ? "overflow-visible" : "overflow-hidden"
				}`}
				onClick={() => setIsExpanded(!isExpanded)}
				style={{
					position: isExpanded ? "relative" : "relative",
					zIndex: isExpanded ? 50 : "auto",
				}}
			>
				{/* Top accent line */}
				<div
					className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
				></div>

				{/* Content */}
				<div className='relative p-6'>
					{/* Header */}
					<div className='flex items-start justify-between mb-4'>
						<div className='flex items-center gap-4 flex-1'>
							<div
								className={`text-3xl font-bold ${service.textColor} flex-shrink-0`}
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								{service.icon}
							</div>
							<div className='flex-1 min-w-0'>
								<h3
									className={`text-lg font-semibold ${service.textColor}`}
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									{service.title}
								</h3>
							</div>
						</div>
						<motion.span
							animate={{ rotate: isExpanded ? 180 : 0 }}
							transition={{ duration: 0.3 }}
							className='text-xl text-gray-400 flex-shrink-0 ml-2'
						>
							▼
						</motion.span>
					</div>

					{/* Features */}
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{
							opacity: isExpanded ? 1 : 0,
							height: isExpanded ? "auto" : 0,
						}}
						transition={{ duration: 0.3 }}
						className='overflow-hidden'
					>
						<div className='space-y-3 pt-4 border-t border-gray-100'>
							{service.features.map((feature, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.05 }}
									className='flex items-start gap-3'
								>
									<div
										className={`flex-shrink-0 w-5 h-5 rounded-full ${service.textColor} flex items-center justify-center mt-0.5 text-xs font-bold`}
									>
										✓
									</div>
									<div>
										<p
											className={`font-medium ${service.textColor} text-sm`}
											style={{
												fontFamily: "var(--font-avenir)",
											}}
										>
											{feature.name}
										</p>
										<p
											className='text-gray-600 text-xs mt-1 leading-relaxed'
											style={{
												fontFamily: "var(--font-avenir)",
											}}
										>
											{feature.desc}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}

export default function BankingForCorporatesPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50'>
				{/* Header */}
				<header className='sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-30'>
					<div className='mx-auto max-w-7xl px-6 py-5 sm:px-8 flex items-center justify-between'>
						<button
							onClick={() => router.back()}
							className='text-sm text-gray-600 hover:text-gray-900 transition flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-bold text-slate-900'
							style={{ fontFamily: "var(--font-avenir)" }}
						>
							Banking for Corporates
						</h1>
						<div className='w-8' aria-hidden='true'></div>
					</div>
				</header>

				{/* Hero Section */}
				<section className='relative py-16 sm:py-20 border-b border-gray-200'>
					<div className='mx-auto max-w-7xl px-6 sm:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='text-center max-w-3xl mx-auto'
						>
							<h2
								className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Banking & Payment Solutions
								<br />
								<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									for Global Business
								</span>
							</h2>
							<p
								className='text-lg text-gray-600 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Through Boyar Partners' dedicated network of banking, payment,
								and financial infrastructure partners, we provide comprehensive
								solutions across 11 core service areas—all coordinated from a
								single operational layer.
							</p>
						</motion.div>

						{/* Decorative elements */}
						<div className='absolute inset-0 -z-10 overflow-hidden'>
							<div className='absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20'></div>
							<div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20'></div>
						</div>
					</div>
				</section>

				{/* Services Grid */}
				<section className='py-20 sm:py-28'>
					<div className='mx-auto max-w-7xl px-6 sm:px-8'>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='mb-12'
						>
							<div className='flex items-center gap-3 mb-2'>
								<h3
									className='text-3xl font-bold text-slate-900'
									style={{ fontFamily: "var(--font-avenir)" }}
								>
									Core Service Areas
								</h3>
								<button
									onClick={() =>
										router.push(
											"/products/investor/banking-for-corporates/in-brief"
										)
									}
									className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors duration-300'
									style={{ fontFamily: "var(--font-avenir)" }}
									title='Quick overview of all services'
								>
									In brief
									<span className='text-xs'>→</span>
								</button>
							</div>
							<div className='h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full'></div>
							<p
								className='text-gray-600 mt-4 max-w-2xl'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Click on any service to explore detailed capabilities and
								features tailored for your business requirements.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-max'>
							{services.map((service, index) => (
								<ServiceCard key={service.id} service={service} index={index} />
							))}
						</div>
					</div>
				</section>

				{/* Closing Section */}
				<section className='py-16 sm:py-20 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200'>
					<div className='mx-auto max-w-4xl px-6 sm:px-8 text-center'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h3
								className='text-2xl sm:text-3xl font-bold text-slate-900 mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Ready to Get Started?
							</h3>
							<p
								className='text-gray-600 mb-8 leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Boyar Partners acts as the structuring, onboarding, and
								partner-coordination layer throughout this entire process,
								ensuring seamless integration and compliance at every step.
							</p>
							<button
								onClick={() => router.back()}
								className='inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all duration-300'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Back
								<span>→</span>
							</button>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
