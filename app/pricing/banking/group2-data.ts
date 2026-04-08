/**
 * Banking Group 2 — Bank particulars (verbatim) by jurisdiction and bank/option.
 * Same outlook as Group 1: by jurisdiction, continuous serial numbers, flags.
 */

export interface BankingGroup2Row {
	readonly id: number;
	readonly jurisdiction: string;
	readonly bankOption: string;
	readonly bankParticulars: string;
	readonly supplierUsd: number;
	readonly boyarPriceUsd: number;
	readonly policyGmPercent: string;
	readonly actualGmPercent: string;
	readonly suppliers: string;
	readonly pricingReason: string;
}

const SUPPLIERS =
	"BG Advisors; Gatwick AG; Law & Trust; Trident Trust; BBCincorp; Bankaccounts.io; WB.Corporate; Pictet Group; HPT Group";

function row(
	id: number,
	jurisdiction: string,
	bankOption: string,
	bankParticulars: string,
	supplierUsd: number,
	boyarPriceUsd: number,
	policyGmPercent: string,
	actualGmPercent: string,
	pricingReason: string
): BankingGroup2Row {
	return {
		id,
		jurisdiction,
		bankOption,
		bankParticulars,
		supplierUsd,
		boyarPriceUsd,
		policyGmPercent,
		actualGmPercent,
		suppliers: SUPPLIERS,
		pricingReason,
	};
}

export const bankingGroup2Rows: readonly BankingGroup2Row[] = [
	row(
		1,
		"Armenia",
		"Top 10 Armenian Bank",
		"TOP 10 Armenian bank: Low cost SWIFT availability + NON CRS jurisdiction Offshore companies can be onboarded High risk companies accepted",
		4950,
		6900,
		"30–35%",
		"28.3%",
		"NON-CRS jurisdiction with high-risk acceptance; value driven by approval probability rather than operational features"
	),
	row(
		2,
		"Bahamas",
		"Private Banking Program",
		"Initial deposit minimum 300 000$ Multicurrency account: EUR, USD, GBP, CHF Also offers dedicated relationship manager, trading account, and private banking program for customers",
		6600,
		9200,
		"30–35%",
		"28.3%",
		"Private banking positioning with RM allocation and high deposit threshold supports premium anchoring"
	),
	row(
		3,
		"Belize",
		"Multicurrency Offshore Bank",
		"Incoming funds: 10$ Payment within the USA: 60$ International SWIFT: 75$ Available currencies: USD, EUR, CHF, CAD, GBP Outgoing Transfer 100.00$ Incoming wire transfers 10.00$",
		5300,
		7400,
		"25–30%",
		"28.4%",
		"Offshore usability with USD clearing; priced for volume competitiveness rather than exclusivity"
	),
	row(
		4,
		"Belize",
		"Alternative Offshore Bank",
		"Available currencies: USD, EUR, CHF, CAD, GBP Outgoing Transfer 100.00$ Incoming wire transfers 10.00$",
		5170,
		7200,
		"25–30%",
		"28.2%",
		"Slightly lower supplier cost and comparable functionality reflected in marginally lower price"
	),
	row(
		5,
		"British Virgin Islands",
		"Offshore Corporate Bank",
		"Monthly account opening fee varies case by case 100–500$ Incoming and outgoing SWIFT min 60$ Incoming transfers are charged at a flat rate min 60$ Outgoing transfers are charged as a % min 60$ Can take offshore companies",
		4840,
		6700,
		"25–30%",
		"27.8%",
		"Classic BVI offshore banking; pricing anchored to jurisdictional familiarity and offshore branding"
	),
	row(
		6,
		"Bulgaria",
		"SEPA & SWIFT Bank",
		"Direct SWIFT and SEPA accounts 7 Different Currencies (including USD) FREE Incoming SEPA & SWIFT SEPA OUT 1 EUR SWIFT OUT 10–15 EUR FREE monthly usage",
		5500,
		7300,
		"25–30%",
		"24.7%",
		"Fast EU onboarding and low failure rate allow competitive pricing with thinner margins"
	),
	row(
		7,
		"Bulgaria",
		"Tier-1 Global Bank",
		"TOP 10 Global bank: Options include: Citibank Raiffeisen bank Unicredit bank Swift 0.15% – 0.3% (depending on volume and client risk level) SEPA 5–15 EUR (depending on volume and client risk level)",
		5390,
		7500,
		"25–30%",
		"28.1%",
		"Tier-1 global bank branding improves reputational shielding and approval confidence"
	),
	row(
		8,
		"Cyprus",
		"Cyprus Bank – Physical Presence Required",
		"Inward transfers in EUR, GBP, SEK, DKK, CHF, NOK, BGN, RON, USD and RUB SEPA EUR (<2000 EUR) FREE SEPA EUR (2001 – 5000 EUR) 2 EUR SEPA EUR (5001 – 50 000 EUR) 10 EUR SEPA EUR (>50 001 EUR) 30 EUR SWIFT other currency (<2000 EUR) 3 EUR SWIFT other currency (2001 – 5000 EUR) 10 EUR SWIFT other currency (5001 – 50 000 EUR) 15 EUR SWIFT other currency (>50 001 EUR) 30 EUR Outward transfers in EUR (<50 000 EUR) 0.15% min 6 EUR, max 12 EUR (>50 001 EUR) 0.2% min 100 EUR, max 500 EUR Outward transfers (other currency) 0.2% min 6 EUR, max 500 EUR Physical visit is required, business has to have local presence in Cyprus",
		7450,
		9600,
		"30–35%",
		"29.5%",
		"Physical presence + local substance requirement increases friction; pricing anchored to certainty of approval rather than speed"
	),
	row(
		9,
		"Cyprus",
		"Cyprus Bank – High-Risk / Crypto Friendly",
		"Multicurrency account: EUR, USD, GBP, RUB,… DIRECT SWIFT and SEPA Account Minimum transaction is 20 EUR. Cost of transfer is 0.07% + 1% if the transfer is in foreign currency (other than EUR) Can take high risk: e.g CRYPTO",
		5170,
		7100,
		"25–30%",
		"27.2%",
		"Crypto acceptance inside EU SEPA framework materially increases value; priced aggressively to capture volume"
	),
	row(
		10,
		"Czech Republic",
		"Czech EMI / Banking Platform",
		"Direct SEPA Direct SWIFT Currencies: EUR, GBP, SGD, ILS, CAD, AUD, HKD, CZK, CHF, DKK, etc.; Easy transfers of the most popular crypto currencies: Bitcoin, Bitcoin Cash, Litecoin, Ethereum and Ripple; Instant exchange crypto to fiat and fiat to crypto; Free Crypto API integration; Prepaid cards for residents of EEA, Turkey or Israel (for company's UBOs, directors, employees, clients); White Label Solution for issuing SEPA IBANs for merchant's corporate clients + free API Integration on merchant's platform (available only for FCA/EMI licensed companies)",
		4950,
		6600,
		"25–30%",
		"25.0%",
		"Feature-dense EMI with crypto rails and API access; competitive pricing to remain attractive versus Lithuanian EMIs"
	),
	row(
		11,
		"Dominica",
		"Dominica Bank – Standard",
		"SEPA, SWIFT capabilities EUR, USD, GBP + other currencies are possible on demand crypto exchange Incoming SEPA/SWIFT 1.5% Outgoing SEPA 1.25% (min 6 eur) Outgoing SWIFT 2% (min 40 eur)",
		4950,
		6800,
		"25–30%",
		"27.2%",
		"Offshore-friendly jurisdiction with crypto exchange capability; pricing anchored to flexibility and speed"
	),
	row(
		12,
		"Dominica",
		"Dominica Bank – High-Risk Licensed",
		"SWIFT and SEPA account opening It is possible to open a multi-currency account (including HKD, CNY, USD, GBP, AUD, EUR,...) Incoming funds 0.5% (maximum 500EUR) (SEPA + SWIFT) SWIFT outgoing: 0.75% (maximum 900EUR) SEPA outgoing 0.5% (min10 EUR maximum 500 EUR) Take all high risk that have a license",
		5170,
		7200,
		"25–30%",
		"28.2%",
		"Licensed high-risk acceptance materially increases approval certainty; modest premium over standard Dominica option"
	),
	row(
		13,
		"Dominica",
		"Dominica Fintech / API Bank",
		"SWIFT AND SEPA ACCOUNT Multi-currency accounts 1. Payout via Wire, EFT, P2P, Fund any Visa/MC/UnionPay 2. Mass Transfer Payments via CSV/XML file upload, or via API 3. Versatile API, with IPN capability SEPA, SWIFT, ACH transfers Debit Card issuance Monthly maintenance FREE Incoming SEPA $8.95 Incoming SWIFT 0.05% (min $25) Incoming USD ACH $5 Outgoing EUR/USD 0.05%(min $50) Outgoing other currency 0.05% (min $50) Outgoing ACH $5 Funds transfer to any VISA/MasterCard, UnionPay Card $5 + 2.95%",
		5450,
		7500,
		"25–30%",
		"27.3%",
		"API-driven payouts and mass payments justify fintech premium while staying below EU EMI pricing"
	),
	row(
		14,
		"Germany",
		"German Bank – Corporate SWIFT",
		"Outgoing SWIFT payment 60 EUR Outgoing TARGET2 payment 60 EUR Outgoing SEPA payment 50 EUR Urgent (in addition to base tariff) 20 EUR OUR (in addition to base tariff Internal payment 20 EUR Incoming SEPA payment fee 20 EUR Incoming SWIFT payment fee 20 EUR Internal payment 5 EUR Dedicated Multi-currency swift is given.",
		5890,
		7800,
		"25–30%",
		"24.5%",
		"Tier-1 EU jurisdiction with high compliance friction; pricing reflects certainty and reputational shielding"
	),
	row(
		15,
		"Ireland",
		"Irish Multicurrency Bank",
		"Multicurrency EUR and GBP Incoming wire transfer: 0.49 GBP Outgoing wire transfer: 0.49 GBP Monthly fee: FREE DEBIT card issuance",
		4950,
		6600,
		"25–30%",
		"25.0%",
		"Fast onboarding EU bank with low transaction fees; competitively priced to compete with EMIs"
	),
	row(
		16,
		"Isle of Man",
		"Isle of Man Multicurrency Bank",
		"Multicurrency account 20+ currencies (GBP, HKD, EUR, USD...) BACS 0.5 GBP FASTER PAYMENTS 2 GBP CHAPS 25 GBP SWIFT 25 GBP",
		7700,
		10500,
		"30–35%",
		"26.7%",
		"Crown dependency with strong reputation; higher pricing justified by regulatory stability"
	),
	row(
		17,
		"Latvia",
		"Latvian Bank – SEPA Focused",
		"SEPA Transfers in EUR: 2 EUR SWIFT transfers EUR: 25 EUR (SHA) if under 50k volume; 70 EUR if over 50k volume SWIFT transfer USD: 25 EUR (SHA); if urgent transfer needed price will be 60 EUR SWIFT transfers in other currencies: 45 EUR (SHA)",
		7100,
		9200,
		"30–35%",
		"22.8%",
		"Higher compliance friction and onboarding scrutiny require pricing above Baltics average"
	),
	row(
		18,
		"Latvia",
		"Latvian Bank – Multicurrency",
		"Incoming payments: Credit of incoming payment to the Client's Bank account FREE Outgoing payments: EUR Payments - 20 EUR OUR; 15 EUR SHA USD Payments - 80 EUR OUR; 50 EUR SHA RUB Payments - 15 EUR OUR PLN Payments - 40 EUR OUR; 35 EUR SHA Other Currencies Payments - 50 EUR OUR; 40 EUR SHA",
		6000,
		8100,
		"25–30%",
		"25.9%",
		"Flexible multicurrency usage with moderate fees; priced for SME offshore demand"
	),
	row(
		19,
		"Liechtenstein",
		"Liechtenstein Bank – Medium Risk",
		"Direct SWIFT and SEPA Multi-currency account (EUR, USD, GBP, CHF, …) Incoming payments are free Outgoing payments tiered by volume Can accommodate medium-risk businesses with deposit of 500,000 EUR",
		7700,
		10800,
		"30–35%",
		"28.7%",
		"Private-banking style jurisdiction with substance requirements; priced below Switzerland"
	),
	row(
		20,
		"Liechtenstein",
		"Liechtenstein Bank – Crypto Friendly",
		"Direct SWIFT and SEPA accounts Multi-currency account (CHF, USD, EUR, … ) Incoming payments FREE Outgoing payments volume-based USD SWIFT 0.2% EUR SWIFT 0.1% Accepts crypto companies with turnover greater than 4,500,000 EUR yearly",
		7150,
		10200,
		"30–35%",
		"29.9%",
		"Rare crypto acceptance in Liechtenstein; premium justified by approval probability"
	),
	row(
		21,
		"Lithuania",
		"Lithuanian Bank – Standard",
		"Monthly maintenance 25 EUR Incoming payments SEPA 0.15% International 0.25% Outgoing payments SEPA 10 EUR International 0.25% Card order 100 EUR Card maintenance 15 EUR",
		4950,
		6600,
		"25–30%",
		"25.0%",
		"Cost-efficient EU banking; pricing kept aggressive to defend EMI competition"
	),
	row(
		22,
		"Lithuania",
		"Lithuanian Bank – Super High Risk",
		"FOR SUPER HIGH RISK BUSINESSES SEPA (in): 0.2% SWIFT (in): 0.2% + 10 EUR SEPA (out): 0.2% SWIFT: 1.7% + 30 EUR",
		4700,
		6800,
		"25–30%",
		"30.9%",
		"One of few EU options for very high-risk flows; pricing reflects risk absorption"
	),
	row(
		23,
		"Lithuania",
		"Lithuanian Bank – C2B IBAN",
		"BEST C2B Account option All clients receive EURO dedicated IBAN Incoming transactions SEPA 0.15% SWIFT 0.5% Outgoing transactions SEPA 0.15% SWIFT 0.5% Account maintenance 50–200 EUR",
		5350,
		7200,
		"25–30%",
		"25.7%",
		"Strong merchant-focused C2B flows; priced for scale rather than exclusivity"
	),
	row(
		24,
		"Luxembourg",
		"Luxembourg Bank – High Deposit",
		"DIRECT SWIFT AND SEPA Incoming payments: In EUR (SEPA/SWIFT) FREE In other currencies 0.175% (minimum 7 EUR, maximum 40EUR) Outgoing payments: SEPA payment (less than 250 000 EUR) 0.3 EUR SEPA payment (more than 250 000 EUR) 10 EUR SWIFT (EUR and other currency) 0.175% (minimum 7 EUR, maximum 40 EUR) Minimum deposit 250 000 EUR",
		7600,
		10200,
		"30–35%",
		"25.5%",
		"Tier-1 EU financial centre with high deposit threshold; pricing reflects reputational shielding and stability"
	),
	row(
		25,
		"Malta",
		"Malta Bank – Standard",
		"DIRECT SEPA AND SWIFT SEPA Inward transfer: free of charge SEPA Outward transfer: 4 EUR Target 2 Inward transfer: 0.1% (min 10 EUR, max 150 EUR) Target 2 Outward transfer: 10 EUR SWIFT Inward transfer: 0.1% (min 10 EUR, max 150 EUR) SWIFT Outward transfer: 0.25% (min 10 EUR, max 60 EUR)",
		7100,
		9300,
		"30–35%",
		"23.7%",
		"EU jurisdiction with higher AML scrutiny; priced to balance friction and EU access"
	),
	row(
		26,
		"Malta",
		"Malta Bank – High Volume SEPA",
		"DIRECT SEPA AND SWIFT SEPA incoming tiered pricing SEPA outgoing tiered pricing SWIFT in/out 0.15% (€25 Min, Max €5,000)",
		5300,
		7300,
		"25–30%",
		"27.4%",
		"Optimised for higher transaction volumes; competitive pricing to attract operating companies"
	),
	row(
		27,
		"Mauritius",
		"Mauritius Multicurrency Bank",
		"Multicurrency account (EUR, USD, GBP, CHF, etc..) Minimum account balance 5000 GBP Incoming SWIFT: FREE Outgoing SWIFT: 60$ Debit card issuance FREE",
		5200,
		7100,
		"25–30%",
		"26.8%",
		"Stable offshore-onshore hybrid jurisdiction; strong for Africa-linked structures"
	),
	row(
		28,
		"Nevis",
		"Nevis Bank – Corporate",
		"Multicurrency SWIFT USD, EUR Minimum balance: NO Account maintenance fee: FREE Minimum deposit: 100 000$ SWIFT (in): 25 USD SWIFT (out): 70 USD",
		5700,
		7800,
		"25–30%",
		"26.9%",
		"Offshore-friendly jurisdiction with no maintenance fees; pricing anchored to deposit requirement"
	),
	row(
		29,
		"Nevis",
		"Nevis Bank – Private Services",
		"Solutions offered: Personal Banking Business Banking Trust and Escrow Accounts Asset Management Investment Advisory Fund Custodian Services Family Office Wealth Planning Investment Banking & Brokerage SWIFT wire transfers in multiple currencies",
		5350,
		7500,
		"25–30%",
		"28.7%",
		"Broader private-bank style offering; modest premium over standard Nevis option"
	),
	row(
		30,
		"Puerto Rico",
		"Puerto Rico Bank – API Enabled",
		"Initial deposit minimum 10000$ International SWIFT 50$ Minimum balance 2500$ otherwise 50$ monthly fee Return wire 25$ API usage and integration FREE Monthly maintenance FREE",
		6000,
		8200,
		"25–30%",
		"26.8%",
		"USD banking with API integration and US rails; priced below mainland US crypto banks"
	),
	row(
		31,
		"Saint Lucia",
		"Saint Lucia Bank",
		"Custom flexible banking solution – inquire individually Minimum account balance – 5 000 USD",
		4400,
		6000,
		"25–30%",
		"26.7%",
		"Flexible offshore solution; pricing reflects bespoke onboarding effort"
	),
	row(
		32,
		"Saint Vincent & Grenadines",
		"SVG Multicurrency Bank",
		"Multicurrency account: USD, EUR, GBP, CHF, CAD, S$ SWIFT all currencies (in) 25$ SWIFT USD (out) 50–75$ SWIFT other currency (out) 60–80$",
		6000,
		8200,
		"25–30%",
		"26.8%",
		"Offshore jurisdiction with wide currency support; priced for flexibility"
	),
	row(
		33,
		"Slovakia",
		"Slovak Multicurrency Bank",
		"Multicurrency account: EUR, GBP, USD, CHF, CAD SEPA EUR incoming 0.2 EUR SWIFT incoming 0.2–0.3 EUR SEPA outgoing 1.5 EUR SWIFT outgoing 30–40 EUR",
		5350,
		7300,
		"25–30%",
		"26.7%",
		"EU banking with moderate scrutiny; pricing kept competitive for SMEs"
	),
	row(
		34,
		"Spain",
		"Spain Bank – Santander / BBVA / Caixa",
		"Account opening in Santander BBVA La Caixa Bank Currencies: EUR, USD SEPA in 5–15 EUR SEPA out 0.2% SWIFT in 0.25% SWIFT out 0.2% Can open for international companies",
		6300,
		8500,
		"25–30%",
		"25.9%",
		"Tier-1 EU banks with higher onboarding friction; pricing reflects certainty over speed"
	),
	row(
		35,
		"Switzerland",
		"Swiss Private Bank – Crypto Wallet",
		"Swiss private bank Multicurrency bank account opening (EUR, USD, CHF, DKK, GBP …) + Crypto wallet Incoming payments 0.05% Outgoing payments FREE Deposit of digital assets FREE",
		7700,
		11000,
		"30–35%",
		"30.0%",
		"Swiss private banking with crypto custody; pricing anchored to reputational shielding and asset safety"
	),
	row(
		36,
		"Switzerland",
		"Swiss Crypto Company Account",
		"Access to: SWIFT, SEPA, SIC, eur SIC Incoming payments: FREE Outgoing payments: 10–50 CHF (dependent on transaction volume) Currencies- CHF, EUR, USD, SGD Accepts deposits and withdrawals in BTC, ETH, BCH, XTZ, LTC and XRP Commission for Digital Asset: Incoming FREE Outgoing: 0.05%–0.2% CRYPTO company account",
		7480,
		10700,
		"30–35%",
		"30.1%",
		"Rare Swiss crypto-operational account; premium reflects regulatory difficulty"
	),
	row(
		37,
		"Switzerland",
		"Prestigious Swiss Bank – Remote",
		"Prestigious Swiss bank Direct Swift and SEPA Account maintenance: CHF 80–150 Incoming transaction fees: SEPA free, Switzerland free, other directions- 5CHF Outgoing transaction fees: SEPA free, Switzerland free, other destinations 5CHF Remote application + high risk accepted with deposit of up to 2 000 000 EUR",
		7700,
		11000,
		"30–35%",
		"30.0%",
		"Remote onboarding + high-risk acceptance with large deposits justify Swiss premium"
	),
	row(
		38,
		"Switzerland",
		"Swiss Multicurrency Bank",
		"Direct Swift and SEPA accounts Minimum deposit 10 000 EUR Incoming payments tiered by amount Outgoing payments tiered by amount including large-volume brackets",
		6875,
		9800,
		"30–35%",
		"29.8%",
		"Operational Swiss banking without private-bank minimums; priced below full private banks"
	),
	row(
		39,
		"United Kingdom",
		"UK EMI – Banking Circle",
		"Direct SWIFT and SEPA account Company will have direct accounts with Banking Circle bank from Denmark Incoming payments: SWIFT 0.1% min 25 EUR max 250 EUR SEPA 0.05% GBP Faster Payments 5 GBP Outgoing tiered SEPA and SWIFT fees 30+ currencies FX at 1.25% Account maintenance 50–100 EUR monthly",
		5700,
		7900,
		"25–30%",
		"27.8%",
		"Strong EMI infrastructure with SEPA + GBP rails; priced for operating businesses"
	),
	row(
		40,
		"United Kingdom",
		"UK Safeguarded Funds EMI",
		"All funds are Safeguarded at Lloyds Bank PLC API integration 30+ currencies FX exchange at market Mass payments Sample fees SEPA 5–15 EUR SWIFT 0.2–0.3% Can take EU high risk companies",
		6600,
		9000,
		"25–30%",
		"26.7%",
		"Safeguarding + API access justify premium over basic EMIs"
	),
	row(
		41,
		"United Kingdom",
		"UK Multicurrency IBAN",
		"Multicurrency IBAN supporting 15+ currencies Account maintenance 70 EUR Incoming SEPA & SWIFT tiered Outgoing SEPA & SWIFT tiered Faster Payments and CHAPS supported",
		4565,
		6400,
		"25–30%",
		"28.7%",
		"Cost-efficient UK solution for SMEs; priced aggressively"
	),
	row(
		42,
		"United Kingdom",
		"UK High-Risk Card Account",
		"Multicurrency EUR USD RUB Incoming funds FREE SEPA out 0.35 EUR SWIFT out 75 EUR + card issuance High risk",
		5280,
		7300,
		"25–30%",
		"27.7%",
		"High-risk acceptance with card issuance; competitive vs offshore EMIs"
	),
	row(
		43,
		"United Kingdom",
		"UK SEPA & Faster Payments",
		"Direct SWIFT and SEPA Incoming EUR & GBP FREE Outgoing UK Faster Payments FREE CHAPS 20 EUR SWIFT & SEPA 0.4% + fees",
		4290,
		6000,
		"25–30%",
		"28.5%",
		"Very fast onboarding and low costs; priced for volume"
	),
	row(
		44,
		"United States",
		"US Crypto-Friendly Bank",
		"CRYPTO friendly US bank Commercial banking Business accounts Savings accounts Corporate debit card ACH outgoing FREE SWIFT incoming 25–30 USD Minimum balance requirements",
		5450,
		7600,
		"25–30%",
		"28.3%",
		"US banking with crypto tolerance; priced below specialist US crypto banks"
	),
	row(
		45,
		"United States",
		"US ACH & SWIFT Bank",
		"ACH transfer 5–10$ Domestic SWIFT 40$ International SWIFT 70$ Monthly minimum commitment 1000$",
		4470,
		6200,
		"25–30%",
		"27.9%",
		"ACH and SWIFT domestic/international; minimum commitment priced for volume"
	),
];
