/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InBriefPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='min-h-screen bg-slate-50'>
				{/* Header */}
				<header className='sticky top-0 bg-white border-b border-gray-200 z-30 shadow-sm'>
					<div className='mx-auto max-w-5xl px-6 py-5 sm:px-8 flex items-center justify-between'>
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
							Service Overview
						</h1>
						<div className='w-8' aria-hidden='true'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='py-12 sm:py-16'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='mx-auto max-w-5xl px-6 sm:px-8'
					>
						{/* Document Container */}
						<div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
							<div
								className='p-10 sm:p-12 prose prose-sm max-w-none'
								style={{ fontFamily: "var(--font-avenir)" }}
							>
								{/* Title */}
								<div className='mb-8'>
									<p className='text-lg font-semibold text-slate-900 mb-2'>
										Boyar Partners offers:
									</p>
								</div>

								{/* Account Solutions */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Account Solutions
									</h2>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Dedicated and Pooled Accounts:</strong>{" "}
												Custom-fit for your business needs.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Named & Dedicated IBANs:</strong> Available in
												USD, GBP, EUR + 10+ currencies.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Multi-Currency Accounts:</strong> Personalised
												IBANs with seamless FX.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>Escrow Accounts</span>
										</li>
									</ul>
								</div>

								{/* Payment Infrastructure */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Payment Infrastructure
									</h2>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Global Reach:</strong> Send and receive payments
												in over 200 countries.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Supported Networks:</strong> Access to SWIFT,
												SEPA, SEPA Instant, Faster Payments, CHAPS, BACS, ACH,
												etc.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Local Payment Remittance:</strong> Move funds
												faster and reduce international transfer risks.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Bulk Payment Processing:</strong> Handle mass
												payouts and supplier settlements with ease.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Payroll Solutions:</strong> Pay employees in
												multiple currencies through compliant, efficient
												systems.
											</span>
										</li>
									</ul>
								</div>

								{/* Currency Support */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Currency Support
									</h2>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>30+ Currencies:</strong> Including local
												currency payment options for cross-border efficiency.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>FX-Friendly:</strong> Competitive rates and
												reduced conversion fees.
											</span>
										</li>
									</ul>
								</div>

								{/* Card Processing */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Card Processing
									</h2>
									<p className='text-gray-700 mb-3'>
										Payment processing for majority of industries can be
										challenging. Boyar Partners has partnered with
										card-processing solution providers to support businesses in
										sectors like Gambling, iGaming, Adult, iDating, Crypto, and
										Streaming. With our global reach, we offer acquiring
										services across the US, Europe, Asia, and beyond, allowing
										merchants to process payments from customers worldwide.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key Services We Provide:
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>
													Acquiring Services For Complex Market Environments:
												</strong>{" "}
												Payment solutions for you, even when other providers
												won't play ball.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Global Payment Acceptance:</strong> Process card
												payments from customers across the globe via major
												networks like Visa, Mastercard, Amex and more.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Multi-Currency Processing:</strong> Accept
												payments in multiple currencies, helping to reduce
												foreign exchange costs and expand your international
												reach.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Seamless Integration:</strong> Quick,
												hassle-free setup with your existing systems.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Chargeback Management:</strong> Tools to reduce
												disputes and protect your revenue.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Fast Payouts:</strong> Timely and reliable
												payouts to ensure smooth cash flow and operational
												efficiency.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Recurring Payments:</strong> Automate billing
												for subscription services or membership models, ensuring
												reliable revenue streams for your business.
											</span>
										</li>
									</ul>
									<p className='text-gray-700 mt-3'>
										With Boyar Partners, businesses gain access to the payment
										processing solutions they need to thrive on a global scale.
									</p>
								</div>

								{/* Open Banking */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Open Banking
									</h2>
									<p className='text-gray-700 mb-3'>
										Open banking made simple. Boyar Partners connects all types
										of businesses with secure, efficient solutions for faster,
										smoother payments.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key Open Banking Services We Provide:
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Open Banking for Challenging Sectors:</strong>{" "}
												We connect you to open banking providers who specialize
												in high-risk industries like gaming, forex (FX), and
												more.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Instant Payments:</strong> Real-time
												transactions directly between clients' bank accounts and
												your business, speeding up payments.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Cross-Border Payment Processing:</strong>{" "}
												Multi-currency options for a broader reach.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Seamless API Integration:</strong> Effortlessly
												integrate open banking into your existing systems with
												no hassle.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Reduced Transaction Fees:</strong> Lower fees
												than traditional methods.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Reliable Payouts:</strong> Timely and secure
												payouts to ensure smooth cash flow and client
												satisfaction.
											</span>
										</li>
									</ul>
								</div>

								{/* Crypto Services */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										Crypto Services
									</h2>
									<p className='text-gray-700 mb-3'>
										Boyar Partners partners with trusted crypto providers to
										offer a complete ecosystem for engaging with the
										decentralized economy. With a client base of over 4,000,000,
										our partners are recognized for their reliability and solid
										reputation in the market.
									</p>
									<p className='text-gray-700 mb-3'>
										Boyar Partners bridges the gap between traditional banking
										solutions and cryptocurrency transactions with one seamless
										solution.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key Crypto Services We Provide:
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Manage Crypto Faster and Smarter:</strong> Send,
												receive, and convert USDT (ERC20), BTC, USDC, ETH, XRP,
												and more with ease, using our partner's ecosystem.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Seamless Integration:</strong> One platform to
												manage both traditional and crypto transactions.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Competitive Rates:</strong> Enjoy highly
												competitive and transparent rates without needing
												third-party exchanges or additional wallets.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Dedicated IBANs & Wallets:</strong> Send,
												receive, and convert cryptocurrencies like USDT, ETH,
												and BTC directly to your dedicated IBANs or
												cryptocurrency wallets.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Safeguards & Security:</strong> All wallets are
												provided by BitGo and insured by Lloyd's of London,
												ensuring maximum security for your assets.
											</span>
										</li>
									</ul>
									<p className='text-gray-700 mt-3'>
										Let's simplify crypto for your business.
									</p>
								</div>

								{/* APMs */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										APMs
									</h2>
									<p className='text-gray-700 mb-3'>
										At Boyar Partners, we connect you to a wide range of
										alternative payment methods (APMs) to ensure you can accept
										payments from all over the world, no matter the industry.
										Whether you're in gaming, e-commerce, or other specialised
										sectors, APMs give you the flexibility and security you need
										to expand your business globally.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key APM Services We Provide
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Global Payment Acceptance:</strong> Accept
												payments from customers worldwide using a variety of
												APMs, including e-wallets, mobile payments, direct bank
												transfers, and more.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Localized Payment Options:</strong> Offer your
												customers payment options they trust, including PayPal,
												Skrill, Neteller, Alipay, WeChat Pay, and many more –
												boosting conversion rates, especially in local markets.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Faster Settlements:</strong> Enjoy quicker
												transaction times with alternative payment methods,
												speeding up cash flow and ensuring faster access to your
												funds.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Reduced Fees:</strong> APMs typically come with
												lower processing fees than traditional cards.
											</span>
										</li>
									</ul>
									<p className='font-semibold text-slate-900 mt-3 mb-2'>
										Strategic Regional Coverage
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>Asia-Pacific & Global Expansion</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>P2P Protocol Channels (CIS / MENA / Asia)</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												Premium Pay-In Channels (LATAM / Central America)
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>Bank Transfers & Mobile Money (Africa)</span>
										</li>
									</ul>
								</div>

								{/* FX Services */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										FX Services
									</h2>
									<p className='text-gray-700 mb-3'>
										Boyar Partners and its partners continue to solve problems
										in the FX industry. By combining today's technology with a
										human customer experience, we bridge the gap between the
										two. Our FX partners provide access to market-leading FX
										rates through proprietary platforms, accessible on both
										desktop and mobile for all our clients.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key FX Services We Provide:
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Real-Time FX Conversions:</strong> Instant
												currency conversions at competitive rates.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Spot Contracts:</strong> The most used foreign
												exchange transaction designed to address imminent
												currency needs, with funds settled in the beneficiary's
												account on the same trading day. Our partners provide up
												to two additional working days to make settlement.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Market Orders:</strong> Lock in rates for better
												control of currency risks.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Forward Contracts:</strong> Lock in a rate for
												up to 5 years, protecting your business from adverse
												currency fluctuations and mitigating risks in a live
												marketplace.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Hedging:</strong> Protect your business from
												currency losses by mitigating exposure risk. Hedging is
												intended to reduce risk, not generate profit.
											</span>
										</li>
									</ul>
									<p className='text-gray-700 mt-3'>
										Boyar Partners and its FX partners help you navigate the
										complexities of currency exchange with tailored solutions
										for your needs.
									</p>
								</div>

								{/* BaaS */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										BaaS
									</h2>
									<p className='text-gray-700 mb-3'>
										Boyar Partners partners with leading BaaS providers to offer
										businesses access to powerful APIs for creating, managing,
										and offering a range of financial products under your own
										brand.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>
										Key BaaS Services We Provide:
									</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Create and Manage Accounts:</strong> Easily set
												up and manage corporate and individual accounts, with
												support for USD, GBP, and multi-currency accounts.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Seamless Payments & Transfers:</strong> SWIFT,
												Faster Payments, CHAPS support.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Competitive FX Rates:</strong> Offer your
												clients the best FX rates across 30 currencies,
												providing value on international transactions.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Full Integration:</strong> Fully integrate into
												your SaaS platform, back-office operations, or mobile
												app to operate like a digital bank.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Expand Your Product Portfolio:</strong> Tap into
												new revenue streams by offering banking services that
												complement your current business model.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Multi-Currency Cards:</strong> Provide your
												clients with Mastercard plastic and virtual cards.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Card Management:</strong> Allow customers to
												manage card settings, including spending limits,
												subscription management, and recurring payments.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>API Integration:</strong> Transfer funds and
												generate accounts for both your business and customers
												through our API.
											</span>
										</li>
									</ul>
									<p className='text-gray-700 mt-3'>
										BaaS gives you the tools to expand your FinTech offerings
										and deliver seamless financial services to your customers,
										all under your own brand.
									</p>
								</div>

								{/* API Integration */}
								<div className='mb-8'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										API Integration
									</h2>
									<p className='text-gray-700 mb-3'>
										At Boyar Partners, we leverage the outstanding fraud
										prevention capabilities of our partners, with 115 bank
										accounts globally and award-winning fraud protection. Your
										transactions are monitored with network and rule-based
										screening, industry-standard encryption, and extended
										support, so you can rest easy.
									</p>
									<p className='text-gray-700 mb-3'>
										We offer reliable API infrastructure that allows you to
										seamlessly integrate bespoke payment solutions and leverage
										every payment tool provided by our partners. With automation
										becoming essential in client servicing, Boyar Partners
										ensures the right partner and API are chosen for your
										specific needs. We carefully assess the customer journey,
										pricing matrix, user transparency, live data feeds, and
										reporting functionality before recommending the best
										solution for your team.
									</p>
									<p className='font-semibold text-slate-900 mb-2'>Why API?</p>
									<ul className='space-y-2 text-gray-700 ml-4'>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Streamline Mass Payments:</strong> Simplify
												international payments with a powerful, easy-to-use
												Payments API.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Leverage Global Payment Capabilities:</strong>{" "}
												Integrate Boyar Partners' partners' payment tools to
												manage your core business efficiently.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Seamless Scaling:</strong> Avoid building your
												own system by scaling effortlessly with our partners'
												Payments API.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Automation:</strong> Automate invoices, payroll,
												and mass supplier payments with our robust payment
												platform.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Manage Recipient Accounts:</strong> Store
												account details in a single repository to reduce input
												errors.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>50+ Currencies:</strong> Make transfers to over
												200 countries.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Familiar Service:</strong> If you've used
												MoneyGram or ING Bank for international transfers,
												you've already used our partners' Payments API.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Open Sandbox Environment:</strong> Test and
												explore solutions in a risk-free environment before full
												implementation.
											</span>
										</li>
										<li className='flex gap-3'>
											<span className='text-blue-600 font-bold'>•</span>
											<span>
												<strong>Effortless Scaling:</strong> Grow your business
												without complexity, using a solution that grows with
												you.
											</span>
										</li>
									</ul>
								</div>

								{/* PCI Compliance */}
								<div className='mb-4'>
									<h2 className='text-xl font-bold text-slate-900 mb-3'>
										PCI Compliance
									</h2>
									<p className='text-gray-700'>
										Externalize your PCI DSS scope by using a compliance and
										tokenization platform through Boyar Partners. Our solution
										provides secure vault functionality typically offered by
										payment gateways, but with versatile tokenization suits that
										allow you to seamlessly collect and tokenize credit card
										data on both web and mobile platforms. Once tokenized, these
										tokens can be stored for free and shared directly with any
										integrated payment gateway. By leveraging this technology,
										you can reduce your PCI scope to the absolute
										minimum—eliminating the need to meet requirements 1–12. Say
										goodbye to the hassle of generating payment gateway-specific
										tokens and integrating frontend solutions. Focus on your
										core business while we handle everything else related to PCI
										compliance.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
