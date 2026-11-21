/** @format */

"use client";

import { OfferingMark } from "@/components/offerings/offering-mark";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";

const custodianServices = [
	{
		num: "01",
		title: "Account Management",
		definition: "Comprehensive custodial account oversight",
		purpose:
			"We manage all aspects of your investment accounts, ensuring accurate record-keeping, regulatory compliance, and seamless transaction processing with real-time monitoring.",
	},
	{
		num: "02",
		title: "Asset Custody",
		definition: "Secure holding of investment assets",
		purpose:
			"Your securities, cash, and other assets are held in segregated custody accounts with institutional-grade safeguards and insurance protection.",
	},
	{
		num: "03",
		title: "Tax Reporting",
		definition: "Comprehensive 1099 and tax documentation",
		purpose:
			"We prepare detailed tax reports including 1099s, performance statements, and cost basis tracking to simplify your annual tax preparation.",
	},
	{
		num: "04",
		title: "Settlement Services",
		definition: "Trade settlement and clearing operations",
		purpose:
			"Our settlement team ensures timely and accurate processing of all trades, with DTC settlement and coordination with clearing houses.",
	},
	{
		num: "05",
		title: "Corporate Actions",
		definition: "Dividend and proxy processing",
		purpose:
			"We handle all corporate events including dividend reinvestment, proxy voting coordination, and corporate reorganizations.",
	},
	{
		num: "06",
		title: "Performance Reporting",
		definition: "Detailed returns and performance analytics",
		purpose:
			"Comprehensive performance reports with attribution analysis, benchmarking, and customizable dashboards for investment tracking.",
	},
	{
		num: "07",
		title: "Risk Monitoring",
		definition: "Continuous portfolio risk assessment",
		purpose:
			"Advanced risk analytics monitor portfolio concentration, leverage, volatility, and compliance with investment policies.",
	},
	{
		num: "08",
		title: "Advisor Coordination",
		definition: "Seamless integration with investment advisors",
		purpose:
			"We work directly with your investment managers, supporting their strategies while maintaining independent custody oversight.",
	},
];

export default function CustodianServicesPage() {
	return (
		<ProtectedRoute>
			<div className='offering-page min-h-screen bg-white'>
				<div className='offering-floating-mark'><OfferingMark /></div>
				{/* Hero Section */}
				<section className='border-b border-offering-line'>
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
									Custodian Services
								</span>
							</div>

							<h1
								className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-offering-ink leading-tight'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Custodian Services
								<br />
								<span className='text-offering-ink'>
									Professional Asset Custody
								</span>
							</h1>

							<p
								className='text-lg text-offering-muted leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Comprehensive asset custody and account management services
								designed to safeguard your investments with institutional-grade
								protection and regulatory compliance.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Services Section */}
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
								Our Custodian Services
							</h2>
							<p
								className='text-offering-muted max-w-4xl leading-relaxed'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								We provide comprehensive custodial services ensuring your assets
								are held securely with full regulatory compliance and
								professional oversight.
							</p>
						</motion.div>

						<div className='space-y-6'>
							{custodianServices.map((service, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
									className='bg-white rounded-sm border border-offering-line overflow-hidden hover:border-offering-blue transition-colors'
								>
									<div className='flex items-start gap-6 p-6'>
										<div className='flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-sm bg-offering-ink text-white text-lg font-semibold shadow-none'>
											{service.num}
										</div>
										<div className='flex-1 min-w-0'>
											<h3
												className='text-lg font-semibold text-offering-ink mb-2'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{service.title}
											</h3>
											<p
												className='text-sm text-offering-muted mb-3 font-medium'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='text-offering-blue'>Key Definition:</span>{" "}
												{service.definition}
											</p>
											<p
												className='text-sm text-offering-body leading-relaxed'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												<span className='font-semibold text-offering-ink'>
													Purpose:
												</span>{" "}
												{service.purpose}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Key Benefits */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
							className='mt-12 bg-offering-tint rounded-sm p-8 border border-offering-line'
						>
							<h3
								className='text-xl font-semibold text-offering-ink mb-4'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								Key Benefits
							</h3>
							<ul className='space-y-3 text-offering-body'>
								<li className='flex items-start gap-3'>
									<span className='text-offering-blue font-semibold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Institutional-grade safeguards and insurance coverage
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-offering-blue font-semibold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Real-time account monitoring and reporting
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-offering-blue font-semibold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Regulatory compliance and tax optimization
									</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-offering-blue font-semibold text-lg'>✓</span>
									<span
										className='leading-relaxed'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Integrated advisor coordination services
									</span>
								</li>
							</ul>
						</motion.div>
					</div>
				</section>
			</div>
		</ProtectedRoute>
	);
}
