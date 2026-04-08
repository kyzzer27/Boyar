// =============================================================================
// lib/chatbot/page-contexts.ts
// =============================================================================
// Structured content extracted from every dashboard page.
// The chatbot route uses this to inject ONLY the relevant page's context
// when an investor asks about a specific page/topic.
// =============================================================================
 
export interface PageContext {
  /** Unique slug used for matching */
  slug: string;
  /** Human-readable page title */
  title: string;
  /** Route path in the dashboard */
  route: string;
  /** Which section this belongs to (products, revenue, expenditure, etc.) */
  section: string;
  /** Keywords that trigger this page context */
  keywords: string[];
  /** The actual content summary — what the chatbot should use to answer */
  content: string;
}
 
export const PAGE_CONTEXTS: PageContext[] = [
  // =========================================================================
  // PRODUCTS — PRIVATE CLIENTS
  // =========================================================================
  {
    slug: "trust-private-clients",
    title: "Trusts — Private Client Wealth Structuring",
    route: "/products/investor/trust",
    section: "products",
    keywords: [
      "trust", "trusts", "trust page", "private client trust",
      "trust structuring", "trust deed", "settlor", "trustee",
      "protector", "beneficiary", "beneficiaries", "letter of wishes",
      "private trust company", "ptc", "trust administration",
      "trust documentation", "fiduciary", "trust register",
      "trust participants", "trust roles", "trust services",
      "asset protection trust", "succession trust", "probate avoidance",
      "trust jurisdiction", "cook islands trust", "bvi trust",
      "cayman trust", "nevis trust", "jersey trust",
    ],
    content: `PAGE: Trusts — Private Client Wealth Structuring
CATEGORY: Private Clients
ROUTE: /products/investor/trust
 
OVERVIEW:
Trusts are long-term legal arrangements designed to operate across decades and generations, addressing legal, fiscal, and intergenerational concerns for high-net-worth individuals and families. They are not transactional tools.
 
JURISDICTIONAL COVERAGE (20 jurisdictions):
Bahamas, British Virgin Islands, Cayman Islands, Cook Islands, Nevis, Cyprus, Isle of Man, Seychelles, Singapore, Hong Kong, Jersey, Mauritius, Guernsey, Barbados, Canada, Uruguay, Miami (United States), United Kingdom, India, Denmark.
 
Each jurisdiction is selected based on legal robustness, trust law maturity, regulatory credibility, and cross-border enforceability.
 
STRATEGIC PURPOSES OF TRUSTS:
1. Forced heirship mitigation, where permitted by law
2. Asset protection against future, unknown, or external claims
3. Succession continuity, ensuring orderly transfer of wealth
4. Probate avoidance, preventing assets from being locked in lengthy court processes
5. Confidentiality, where public registries would otherwise disclose ownership
6. Centralised governance over diverse asset classes and jurisdictions
7. Tax planning and tax deferral, subject to applicable local and international laws
 
TRUST DOCUMENTATION ISSUED UPON ESTABLISHMENT (14 documents):
Upon establishment of a trust (and, where applicable, a Private Trust Company), a defined set of legal and administrative documents is issued. These collectively govern intent, control, administration, compliance, and ongoing operation.
 
01. Trust Deed — The principal legal instrument creating the trust. Establishes the trust type, governing law, duration, objectives, powers and duties of the trustee, and identifies beneficiaries.
02. Supplemental Deed / Deed of Addition — Used to amend or supplement the original trust deed. Add/remove beneficiaries, modify administrative provisions, update governance mechanics without resettling the trust.
03. Letter of Wishes — A non-binding, confidential guidance document from the settlor. Expresses intentions regarding distributions, priorities, or philosophy. Guides trustee discretion without creating legal obligations. This document is not public and typically remains private between trustee and protector.
04. Trustee Acceptance Letter — Formal acceptance of fiduciary appointment by the trustee. Confirms assumption of fiduciary duties and acknowledges obligations under trust law and the trust deed.
05. Protector Appointment Deed — Instrument appointing the protector of the trust. Defines protector powers and limitations, establishes oversight and control framework.
06. Advisor Appointment Letters — Formal appointment of advisors (investment, legal, or protector advisors). Defines advisory scope and clarifies non-fiduciary vs fiduciary roles.
07. Deed of Appointment and Removal — A governance instrument regulating changes in trustees or protectors. Allows orderly replacement or succession of fiduciaries, ensures continuity without court involvement.
08. Asset Transfer Instruments — Documentation evidencing transfer of assets into the trust (share transfer deeds, assignment agreements, property transfer documents, IP assignment deeds). Perfects the legal transfer of ownership to the trustee.
09. Trust Register / Internal Trust Records — Internal administrative records maintained by the trustee. Records settlor, beneficiaries, protectors, trustees, maintains distribution history and resolutions. Required for regulatory inspections. Not publicly accessible but mandatory under modern trust regulation.
10. Trustee Resolutions — Formal decisions passed by the trustee. Approve investments, distributions, loans, or structural changes. Evidence proper exercise of fiduciary discretion.
11. Compliance & KYC Documentation Pack — Regulatory due diligence file maintained by the trustee. KYC on settlor, beneficiaries, protectors, and controllers, source of wealth and source of funds documentation, ongoing AML refresh requirements. Continuously updated during the trust's lifetime.
12. FATCA / CRS Classification & Self-Certifications — Tax transparency and reporting documentation. Classify the trust for international reporting, enable compliant disclosures to tax authorities via trustee.
13. Banking & Custodian Account Opening Files — Account-related documentation linked to trust operations. Enable trust-level banking and custody, authorise signatories and transaction permissions.
14. Private Trust Company (PTC) Documents — Additional documents when a PTC is used (Certificate of Incorporation, Memorandum & Articles of Association, Shareholder Registers, Director Appointment Resolutions, PTC Governance Policy, Service Agreements with licensed administrators). Enable corporate trustee structure with family oversight.
 
ONGOING SERVICES AFTER TRUST/PTC ESTABLISHMENT (7 categories):
 
1. Ongoing Trustee Administration:
   - Day-to-day trust administration and record-keeping
   - Maintenance of trust registers and statutory records
   - Execution of trustee resolutions and deeds
   - Coordination of distributions to beneficiaries
 
2. Regulatory & Compliance Oversight:
   - Ongoing AML / KYC maintenance for all trust parties
   - Periodic compliance reviews aligned with local trust law
   - Regulatory filings, renewals, and notifications
   - FATCA / CRS classification and reporting coordination
 
3. Asset Holding & Structuring Support:
   - Holding of operating companies, investment SPVs, real estate, yachts, aircraft, or portfolios
   - Integration with underlying companies, partnerships, or funds
   - Monitoring of asset ownership consistency with trust deed provisions
 
4. Accounting & Financial Reporting:
   - Trust-level accounting and financial statements (where required)
   - Consolidation of underlying entities for reporting purposes
   - Liaison with auditors, tax advisors, and external professionals
 
5. Governance & Control Framework:
   - Implementation of protector or advisory oversight mechanisms
   - Monitoring of trustee actions against trust objectives
   - Periodic governance reviews for long-term relevance
 
6. Beneficiary & Succession Management:
   - Handling of beneficiary onboarding and changes
   - Documentation of distributions, loans, or advances
   - Support during incapacity, death, or generational transitions
 
7. Multi-Jurisdictional Coordination:
   - Coordination between trust jurisdiction and asset jurisdictions
   - Alignment with local tax, regulatory, and reporting requirements
   - Ongoing liaison with banks, custodians, and legal counsel
 
TRUST PARTICIPANTS — KEY ROLES:
1. Settlor — The individual or entity that establishes the trust and transfers assets into it. Sets the initial intent, objectives, and terms through the trust deed.
2. Trustee — The legal owner of the trust assets, acting in a fiduciary capacity. Administers the trust strictly in accordance with the trust deed and applicable law, owing duties of loyalty and care to the beneficiaries.
3. Protector — An oversight role with defined powers over the trustee. Provides checks and balances, often holding powers such as trustee appointment or removal, consent to key decisions, or veto rights.
4. Advisor to the Protector — A professional or individual advising the protector. Supports informed decision-making, particularly in complex legal, tax, or investment matters.
5. Beneficiaries — Persons or entities entitled to benefit from the trust. Receive distributions or other benefits as determined by the trust deed and trustee discretion.
6. Appointor — The party with authority to appoint or remove trustees or protectors. Acts as a control mechanism within the governance framework.
7. Enforcer — A party tasked with enforcing the trust's purpose (primarily in purpose trusts). Ensures the trustee adheres to the stated non-charitable objectives.
8. Private Trust Company (PTC) Directors — Directors of a company acting as trustee. Allow families to retain strategic oversight while delegating administration to professionals.
 
OUTSOURCED TRUST ADMINISTRATION MODEL:
Trusts are administered through licensed local trust service providers within each jurisdiction. This ensures:
- Compliance with local trust law and regulatory expectations
- Access to experienced fiduciary professionals
- Reduced administrative burden for the client
- Seamless handling of jurisdiction-specific filings and obligations
 
Without this, clients would need to independently engage, coordinate, and monitor multiple service providers across jurisdictions — resulting in higher risk, fragmented compliance, and operational inefficiency. This model centralises coordination while preserving local substance, regulatory credibility, and fiduciary integrity.`,
  },
 
  {
    slug: "company-formation",
    title: "Company Formation",
    route: "/products/investor/company-formation",
    section: "products",
    keywords: [
      "company formation", "formation", "incorporate", "incorporation",
      "register company", "set up company", "new company", "entity formation",
      "bvi company", "cayman company", "singapore company", "hong kong company",
      "uk company", "uae company", "mauritius company", "gift city",
      "shelf company", "shelf companies",
    ],
    content: `PAGE: Company Formation
CATEGORY: Products — Investor View
ROUTE: /products/investor/company-formation
 
OVERVIEW:
Company formation is the entry point service for most Boyar Partners clients. It involves establishing legal entities across multiple jurisdictions for purposes including asset holding, trading operations, IP ownership, and investment structuring.
 
KEY DATA POINTS:
- Year 1 projection: 6 clients at $2,500 average = $15,000
- Advisory conversion target: 30% of formation inquiries convert to full structure mandates ($2,500 → $29,700 revenue per client)
- This conversion is what makes formation strategically important — it's not just a transaction, it's a funnel entry point
 
PRIMARY JURISDICTIONS:
BVI, Cayman Islands, UK, Singapore, Hong Kong, UAE (ADGM, DIFC, RAK), Mauritius, GIFT City India (IFSCA)
 
FORMATION TIMELINE: Typically 24-72 hours for standard jurisdictions, longer for regulated or substance-heavy jurisdictions.
 
RELATED SERVICES: Every formation leads to potential cross-sell into corporate services ($3,500/yr), banking introduction ($6,500), and potentially full structuring ($29,700).`,
  },
 
  {
    slug: "private-clients-overview",
    title: "Private Clients — Overview",
    route: "/products/investor/private-clients",
    section: "products",
    keywords: [
      "private clients", "private client overview", "hnwi services",
      "wealth structuring", "private wealth", "family wealth",
    ],
    content: `PAGE: Private Clients — Overview
CATEGORY: Products — Private Clients
ROUTE: /products/investor/private-clients
 
OVERVIEW:
The Private Clients section is the service category for HNWIs, family offices, and multi-generational wealth holders. It covers trust structuring, estate planning, succession management, foundations, insurance solutions, and citizenship stewardship.
 
This is distinct from the corporate services offering — private clients require long-term, relationship-driven advisory with higher revenue per engagement and longer client lifecycles.`,
  },
 
  {
    slug: "corporate-services",
    title: "Corporate Services",
    route: "/products/investor/corporate-services",
    section: "products",
    keywords: [
      "corporate services", "registered agent", "company secretary",
      "nominee director", "nominee shareholder", "compliance monitoring",
      "statutory records", "corporate maintenance", "annual filings",
      "registered office", "corporate governance",
    ],
    content: `PAGE: Corporate Services
CATEGORY: Products — Investor View
ROUTE: /products/investor/corporate-services
 
OVERVIEW:
Corporate services encompass the ongoing administration and compliance requirements for entities formed across multiple jurisdictions. This is the recurring revenue backbone of any TCSP business.
 
KEY DATA POINTS:
- Year 1 projection: 4 clients at $3,500 average = $14,000
- This is recurring revenue — entities need annual corporate services indefinitely
- By Year 5 target: 73 entities under administration generating $128K+ annual recurring at 90%+ gross margin
 
SERVICES INCLUDED:
- Registered Agent services — maintaining the entity's legal presence in the jurisdiction
- Company Secretary — statutory compliance, board minutes, resolutions
- Nominee Directors — where beneficial owner wishes to remain undisclosed
- Nominee Shareholders — same principle applied to share registers
- Compliance Monitoring — ongoing AML/KYC refresh, beneficial ownership registers
- Statutory Records Maintenance — share registers, director registers, charge registers
- Annual Filings — annual returns, financial statements, regulatory notifications
- Registered Office / Registered Address — physical address for statutory correspondence
- Corporate Governance Support — board meeting coordination, resolution drafting
 
JURISDICTIONAL COVERAGE:
Available across all Boyar formation jurisdictions. Each jurisdiction has specific statutory requirements that the corporate services offering addresses.
 
WHY THIS MATTERS FOR INVESTORS:
Corporate services create the renewal flywheel. Every entity formed becomes a recurring revenue stream. At 90%+ gross margin with near-zero incremental acquisition cost, this is the most capital-efficient revenue line in the business model.`,
  },
 
  {
    slug: "office-registration",
    title: "Office Registration / Registered Address",
    route: "/products/investor/office-registration",
    section: "products",
    keywords: [
      "office registration", "registered address", "virtual office",
      "registered office", "business address", "mail forwarding",
    ],
    content: `PAGE: Office Registration / Registered Address
CATEGORY: Products — Investor View
ROUTE: /products/investor/office-registration
 
OVERVIEW:
Office registration provides entities with a legal registered address in their jurisdiction of incorporation — a statutory requirement for most jurisdictions.
 
KEY DATA POINTS:
- Year 1 projection: 2 clients at $1,500 = $3,000
- Low-ticket but essential — every entity needs one
- Often bundled with corporate services for a combined offering`,
  },
 
  {
    slug: "banking-private-clients",
    title: "Banking for Private Clients",
    route: "/products/investor/banking-for-private-clients",
    section: "products",
    keywords: [
      "banking private clients", "private banking", "bank account opening",
      "banking introduction", "private bank account", "hnwi banking",
      "wealth management account", "private bank",
    ],
    content: `PAGE: Banking for Private Clients
CATEGORY: Products — Private Clients
ROUTE: /products/investor/banking-for-private-clients
 
OVERVIEW:
Banking introduction for private clients involves connecting HNWIs with appropriate private banking relationships across multiple jurisdictions.
 
KEY DATA POINTS:
- Banking introduction revenue projection Year 1: 1 client at $6,500
- Banking gross margin policy: 75-80%
- Suppliers: BG Advisors, Gatwick AG, Law & Trust, Trident Trust, BBCincorp, Bankaccounts.io, WB.Corporate, Pictet Group, HPT Group
- Coverage: 140+ bank options across 30+ jurisdictions
 
The banking page presents detailed banking options by jurisdiction, including specific bank names, supplier costs, Boyar pricing, actual gross margin percentages, and pricing rationale for each bank option.`,
  },
 
  {
    slug: "banking-corporates",
    title: "Banking for Corporates",
    route: "/products/investor/banking-for-corporates",
    section: "products",
    keywords: [
      "banking corporates", "corporate banking", "corporate bank account",
      "business banking", "corporate account opening", "sepa", "swift",
      "emi", "payment service provider",
    ],
    content: `PAGE: Banking for Corporates
CATEGORY: Products — Corporate Clients
ROUTE: /products/investor/banking-for-corporates
 
OVERVIEW:
Corporate banking introduction covers a wider range of banking solutions including traditional banks, EMIs (Electronic Money Institutions), and PSPs (Payment Service Providers) across multiple jurisdictions.
 
The page presents 45+ detailed banking options organized by jurisdiction, each with:
- Bank name and type (traditional bank, EMI, or PSP)
- Specific fee structures (SEPA, SWIFT, maintenance fees)
- Supplier cost vs Boyar price
- Policy gross margin (25-35%) and actual gross margin
- Pricing rationale
- Currency support
- Special features (crypto-friendly, high-risk acceptance, API integration)
 
GEOGRAPHIC COVERAGE: Armenia, Bahamas, Belize, BVI, Bulgaria, Cyprus, Czech Republic, Dominica, Germany, Ireland, Isle of Man, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Mauritius, Nevis, Puerto Rico, Saint Lucia, Saint Vincent & Grenadines, Slovakia, Spain, Switzerland, United Kingdom, United States.`,
  },
 
  {
    slug: "banking-institutions",
    title: "Banking for Institutions",
    route: "/products/investor/banking-for-institutions",
    section: "products",
    keywords: [
      "banking institutions", "institutional banking", "fund banking",
      "custodian banking",
    ],
    content: `PAGE: Banking for Institutions
CATEGORY: Products — Institutional Clients
ROUTE: /products/investor/banking-for-institutions
 
OVERVIEW:
Institutional banking covers specialized banking relationships for funds, fund administrators, and large institutional structures requiring multi-jurisdictional banking infrastructure.`,
  },
 
  {
    slug: "licensing-corporates",
    title: "Licensing for Corporates",
    route: "/products/investor/licensing-for-corporates",
    section: "products",
    keywords: [
      "licensing", "vasp", "mica", "crypto license", "forex license",
      "banking license", "gaming license", "igaming", "emi license",
      "fund license", "msb", "casp", "licensing proposals",
      "licensing for corporates", "regulatory license",
    ],
    content: `PAGE: Licensing for Corporates
CATEGORY: Products — Corporate Licensing
ROUTE: /products/investor/licensing-for-corporates
 
OVERVIEW:
Licensing is Boyar's planned competitive moat. No traditional TCSP has a dedicated VASP/MiCA/iGaming licensing practice. Boyar plans to be the first boutique TCSP with an integrated licensing vertical.
 
KEY DATA:
- MiCA hard deadline: July 1, 2026
- A single $75K VASP mandate projects to cascade into $150K-$200K lifecycle revenue
- First-mover advantage: a competitor entering in 2028 would need 2-3 years to match
- 14+ jurisdiction licensing templates ready
 
LICENSING PROPOSALS (14 detailed proposals):
1. Estonia — Crypto/VASP License
2. Lithuania — Crypto License
3. Luxembourg — Fund Management License
4. Seychelles — Forex License
5. Mauritius — Forex License
6. Curaçao — Gaming License
7. Puerto Rico — Banking License
8. UAE — Crypto/VASP License
9. Vanuatu — Forex License
10. Dominica — Banking License
11. Canada — MSB License
12. BVI — Forex License
13. Belize — Banking License
14. BVI — Fund Management License
 
Each proposal page contains jurisdiction-specific details including government fees, capital requirements, timeline, scope, and fulfillment partner information.
 
FULFILLMENT PARTNERS:
- Manimama (Estonian-registered Ukrainian fintech law firm) — delivered 130+ licenses globally, CEO authored Ukraine's Virtual Assets draft law
- Gatwick Law (established 1995, UAE corporate service provider) — second fulfillment channel
 
LICENSING CATEGORIES ACROSS JURISDICTIONS:
- Europe CASP/Crypto: Austria, Bulgaria, Croatia, Cyprus, Czech Republic, Estonia, Finland, France, Germany, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Slovakia, Slovenia, Spain, Sweden, plus Bosnia, Gibraltar, Norway, Switzerland, UK
- Asia & Middle East: Abu Dhabi (ADGM), Dubai (UAE), Georgia, UAE
- Africa: Anjouan (gambling), Seychelles (crypto), South Africa (FSP)
- Americas: Bermuda, BVI (multiple), Canada (crypto/MSB), Cayman Islands, Curaçao, El Salvador, Saint Lucia, Belize, Dominica, Puerto Rico
- Oceania: Australia
- Forex specifically: Vanuatu, Seychelles, Mauritius`,
  },
 
  {
    slug: "foundations",
    title: "Foundations",
    route: "/products/investor/foundations",
    section: "products",
    keywords: [
      "foundation", "foundations", "private foundation",
      "family foundation", "foundation structuring",
      "foundation council", "foundation governance",
    ],
    content: `PAGE: Foundations
CATEGORY: Products — Private Clients
ROUTE: /products/investor/foundations
 
OVERVIEW:
Foundations are civil-law alternatives to trusts, commonly used in jurisdictions where trust law is not well-established. They are separate legal entities (unlike trusts which are legal relationships) and are governed by foundation charters and bylaws.
 
Foundations serve similar strategic purposes to trusts — asset protection, succession planning, confidentiality, and governance — but through a different legal mechanism. They are particularly popular in Panama, Liechtenstein, Netherlands, and various civil-law European jurisdictions.
 
The page covers foundation documentation, governance structures (founder, foundation council, beneficiaries, guardian/protector), ongoing administration services, and jurisdictional coverage.`,
  },
 
  {
    slug: "estate-planning",
    title: "Estate Planning",
    route: "/products/investor/estate-planning",
    section: "products",
    keywords: [
      "estate planning", "estate", "inheritance", "succession",
      "wealth transfer", "generational wealth", "will", "probate",
    ],
    content: `PAGE: Estate Planning
CATEGORY: Products — Private Clients
ROUTE: /products/investor/estate-planning
 
OVERVIEW:
Estate planning covers the comprehensive structuring of wealth transfer across generations, including coordination of trusts, foundations, corporate structures, insurance policies, and testamentary instruments to ensure orderly succession.`,
  },
 
  {
    slug: "succession-management",
    title: "Succession Management",
    route: "/products/investor/succession-management",
    section: "products",
    keywords: [
      "succession management", "succession planning", "business succession",
      "family succession", "generational transition", "next generation",
    ],
    content: `PAGE: Succession Management
CATEGORY: Products — Private Clients
ROUTE: /products/investor/succession-management
 
OVERVIEW:
Succession management addresses the operational and governance aspects of transferring control of businesses and wealth structures to the next generation. This goes beyond estate planning to include governance training, family constitution development, and operational transition planning.`,
  },
 
  {
    slug: "citizenship-stewardship",
    title: "Citizenship & Residency Stewardship",
    route: "/products/investor/citizenship-stewardship",
    section: "products",
    keywords: [
      "citizenship", "residency", "cbi", "rbi", "passport",
      "citizenship by investment", "residency by investment",
      "golden visa", "second citizenship", "second passport",
      "immigration", "relocation",
    ],
    content: `PAGE: Citizenship & Residency Stewardship
CATEGORY: Products — Private Clients
ROUTE: /products/investor/citizenship-stewardship
 
OVERVIEW:
Citizenship and residency stewardship covers Citizenship by Investment (CBI) and Residency by Investment (RBI) programs across multiple jurisdictions. Boyar positions this as "stewardship" rather than processing — the emphasis is on long-term advisory relationship rather than transactional application filing.
 
This page presents detailed program information across multiple CBI/RBI jurisdictions including program requirements, investment thresholds, timelines, and strategic considerations for each.`,
  },
 
  {
    slug: "family-office",
    title: "Family Office Administration",
    route: "/products/investor/family-office",
    section: "products",
    keywords: [
      "family office", "family office administration", "single family office",
      "multi family office", "sfo", "mfo", "family governance",
    ],
    content: `PAGE: Family Office Administration
CATEGORY: Products — Private Clients
ROUTE: /products/investor/family-office
 
OVERVIEW:
Family office administration provides the operational infrastructure for single and multi-family offices, including governance frameworks, investment administration, reporting, compliance coordination, and vendor management.`,
  },
 
  {
    slug: "corporate-structuring",
    title: "Corporate Structuring",
    route: "/products/investor/corporate-structuring",
    section: "products",
    keywords: [
      "corporate structuring", "full structure", "multi-entity structure",
      "holding company", "operating company", "spv", "special purpose vehicle",
      "cross-border structure",
    ],
    content: `PAGE: Corporate Structuring
CATEGORY: Products — Investor View
ROUTE: /products/investor/corporate-structuring
 
OVERVIEW:
Corporate structuring is Boyar's highest-value service line. It involves designing and implementing multi-entity, multi-jurisdictional corporate structures for clients.
 
KEY DATA POINTS:
- Full structure mandate average: $29,700 per client
- Year 1 projection: 2 clients × $29,700 = $59,400 (53.6% of Year 1 revenue)
- Advisory conversion: 30% of formation inquiries convert to full structure mandates
- This $2,500 → $29,700 conversion is the core value proposition of the advisory moat`,
  },
 
  {
    slug: "custodian-services",
    title: "Custodian Services",
    route: "/products/investor/custodian-services",
    section: "products",
    keywords: [
      "custodian", "custody", "custodian services", "asset custody",
      "safekeeping", "digital asset custody",
    ],
    content: `PAGE: Custodian Services
CATEGORY: Products — Investor View
ROUTE: /products/investor/custodian-services
 
OVERVIEW:
Custodian services cover the safekeeping and administration of client assets held within trust and corporate structures, including traditional financial assets and digital assets.`,
  },
 
  {
    slug: "economic-substance",
    title: "Economic Substance",
    route: "/products/investor/economic-substance",
    section: "products",
    keywords: [
      "economic substance", "substance requirements", "local directors",
      "local employees", "physical presence", "substance compliance",
    ],
    content: `PAGE: Economic Substance
CATEGORY: Products — Investor View
ROUTE: /products/investor/economic-substance
 
OVERVIEW:
Economic substance compliance ensures that entities established in offshore and mid-shore jurisdictions meet the substance requirements mandated by local regulations and international frameworks like BEPS 2.0. This includes maintaining adequate local presence, decision-making, and operational activity within the jurisdiction.`,
  },
 
  {
    slug: "redomiciliation",
    title: "Redomiciliation",
    route: "/products/investor/redomiciliation",
    section: "products",
    keywords: [
      "redomiciliation", "company migration", "entity transfer",
      "change jurisdiction", "move company",
    ],
    content: `PAGE: Redomiciliation
CATEGORY: Products — Investor View
ROUTE: /products/investor/redomiciliation
 
OVERVIEW:
Redomiciliation is the legal process of transferring a company's domicile from one jurisdiction to another without dissolving and re-incorporating. This is used when clients need to change their entity's governing law — for tax, regulatory, or operational reasons.`,
  },
 
  {
    slug: "marine-services",
    title: "Marine Services",
    route: "/products/investor/marine-services",
    section: "products",
    keywords: [
      "marine services", "yacht", "vessel", "ship registration",
      "maritime", "flag state", "yacht registration",
    ],
    content: `PAGE: Marine Services
CATEGORY: Products — Investor View
ROUTE: /products/investor/marine-services
 
OVERVIEW:
Marine services cover yacht and vessel registration, ownership structuring, and ongoing administration. This includes flag state registration, operating company structuring, VAT optimization, crew management entities, and marine insurance coordination.`,
  },
 
  {
    slug: "tokenisation",
    title: "Tokenisation for Corporates",
    route: "/products/investor/tokenisation-for-corporates",
    section: "products",
    keywords: [
      "tokenisation", "tokenization", "security token", "sto",
      "digital securities", "token offering", "blockchain",
      "asset tokenisation",
    ],
    content: `PAGE: Tokenisation for Corporates
CATEGORY: Products — Corporate Services
ROUTE: /products/investor/tokenisation-for-corporates
 
OVERVIEW:
Tokenisation covers the structuring and administration of security token offerings (STOs) and asset tokenisation programs. This includes entity structuring for token issuance, regulatory compliance across jurisdictions, smart contract coordination, and ongoing token administration.`,
  },
 
  {
    slug: "insurance-solutions",
    title: "Insurance Solutions",
    route: "/products/investor/insurance-solutions",
    section: "products",
    keywords: [
      "insurance", "insurance solutions", "life insurance", "keyman insurance",
      "professional indemnity", "d&o insurance",
    ],
    content: `PAGE: Insurance Solutions
CATEGORY: Products — Private Clients
ROUTE: /products/investor/insurance-solutions
 
OVERVIEW:
Insurance solutions covers the coordination of insurance products that interface with trust and corporate structures — including life insurance within trusts, key person insurance for businesses, professional indemnity for fiduciaries, and D&O insurance for corporate directors.`,
  },
 
  {
    slug: "internal-audit",
    title: "Internal Audit",
    route: "/products/investor/internal-audit",
    section: "products",
    keywords: [
      "internal audit", "audit", "compliance audit", "governance audit",
    ],
    content: `PAGE: Internal Audit
CATEGORY: Products — Investor View
ROUTE: /products/investor/internal-audit
 
OVERVIEW:
Internal audit services provide independent assessment of compliance, governance, and operational effectiveness for client entities and structures.`,
  },
 
  {
    slug: "accounting",
    title: "Accounting & Internal Audit",
    route: "/products/investor/accounting",
    section: "products",
    keywords: [
      "accounting", "bookkeeping", "financial statements", "annual accounts",
      "management accounts", "tax returns",
    ],
    content: `PAGE: Accounting & Internal Audit
CATEGORY: Products — Investor View
ROUTE: /products/investor/accounting
 
OVERVIEW:
Accounting services cover the preparation of financial statements, management accounts, tax returns, and ongoing bookkeeping for entities administered by Boyar Partners across multiple jurisdictions.`,
  },
 
  {
    slug: "shelf-companies",
    title: "Shelf Companies",
    route: "/products/investor/shelf-companies",
    section: "products",
    keywords: [
      "shelf company", "shelf companies", "ready-made company",
      "aged company", "pre-incorporated",
    ],
    content: `PAGE: Shelf Companies
CATEGORY: Products — Investor View
ROUTE: /products/investor/shelf-companies
 
OVERVIEW:
Shelf companies are pre-incorporated entities available for immediate acquisition. They are used when clients need an entity with an established incorporation date — for banking relationships, tender qualifications, or credibility purposes.`,
  },
 
  // =========================================================================
  // REVENUE
  // =========================================================================
  {
    slug: "revenue-year1",
    title: "Revenue — Year 1 Projections",
    route: "/revenue/year-1",
    section: "revenue",
    keywords: [
      "year 1 revenue", "y1 revenue", "first year revenue",
      "revenue projections year 1", "year one", "110900",
    ],
    content: `PAGE: Revenue — Year 1 Projections
ROUTE: /revenue/year-1
 
YEAR 1 REVENUE TARGET: $110,900
 
BREAKDOWN:
- Company Formation: 6 clients × $2,500 = $15,000
- Standalone Trust: 1 client × $13,000 = $13,000
- Full Structure: 2 clients × $29,700 = $59,400
- Corporate Services: 4 clients × $3,500 = $14,000
- Office Registration: 2 clients × $1,500 = $3,000
- Banking Introduction: 1 client × $6,500 = $6,500
- Total: $110,900
 
KEY NOTES:
- All figures are PROJECTIONS — Boyar is pre-revenue
- Total clients Year 1: 16
- Average revenue per client: ~$6,930
- Full structure mandates represent 53.6% of Year 1 revenue despite being only 2 out of 16 clients`,
  },
 
  {
    slug: "revenue-year2",
    title: "Revenue — Year 2 Projections",
    route: "/revenue/year-2",
    section: "revenue",
    keywords: [
      "year 2 revenue", "y2 revenue", "second year revenue",
      "revenue projections year 2", "year two", "212780",
    ],
    content: `PAGE: Revenue — Year 2 Projections
ROUTE: /revenue/year-2
 
YEAR 2 REVENUE TARGET: $212,780 (91.9% growth over Year 1)
 
KEY DATA:
- Includes $61,180 in projected renewals from 9 Year 1 clients
- First licensing revenue expected in Year 2
- Growth driven by: renewals, new client acquisition, cross-sell, and first licensing mandates`,
  },
 
  // =========================================================================
  // EXPENDITURE
  // =========================================================================
  {
    slug: "expenditure",
    title: "Expenditure Dashboard",
    route: "/expenditure",
    section: "expenditure",
    keywords: [
      "expenditure", "costs", "expenses", "burn rate", "monthly cost",
      "software costs", "marketing spend", "salary", "devices",
      "infrastructure", "operating costs",
    ],
    content: `PAGE: Expenditure Dashboard
ROUTE: /expenditure
 
OVERVIEW:
The expenditure dashboard breaks down all operational costs month-by-month for Year 1, organized into categories: salary/HR, marketing, software, devices, infrastructure, legal, content production, and contingency.
 
KEY MONTHLY COSTS:
- Software stack: ₹22,600/month (9 tools)
- Office cabin: ₹40,000/month
- Laptop rentals: ₹14,000/month (2 units — deliberate capital efficiency over ₹3,00,000 hardware purchase)
- Content production: ₹30,000/month
- HR/Social media manager: ₹20,000/month
- Contingency: ₹20,000/month
- Fixed monthly total: ~₹1,46,600 + variable marketing
 
BURN RATE:
- Month 1 (setup heavy): ₹12.4L
- Months 2-6 average: ₹2.7L/month
- Months 7-12 average: ₹2.8L/month
- 12-month dashboard total: ₹36.1L
- Revenue projected to cover burn from Month 6+
 
SOFTWARE STACK (monthly costs):
ChatGPT Business ×2, domain hosting, design tools, CRM, email marketing, analytics, project management, communication tools.`,
  },
 
  // =========================================================================
  // CAC & ACQUISITION
  // =========================================================================
  {
    slug: "client-acquisition",
    title: "Client Acquisition Models",
    route: "/client-acquisition",
    section: "client-acquisition",
    keywords: [
      "client acquisition", "acquisition", "acquisition channels",
      "cac", "customer acquisition cost", "lead generation",
      "acquisition model", "acquisition strategy",
    ],
    content: `PAGE: Client Acquisition Models
ROUTE: /client-acquisition
 
OVERVIEW:
35+ planned acquisition strategies across 7+ groups:
1. Founder-led origination: LinkedIn executive outreach, offshore masterclass, reputation borrowing, private webinars, CFO/GC roundtable
2. Content & thought leadership: YouTube expertise, jurisdiction intel reports, thought-leadership media
3. Strategic partnerships: Law firm co-branded, commission-based reps, family office networks, fund manager pipeline, cross-border M&A feeder
4. Digital: Website SEO, high-intent Google Ads, precision LinkedIn dealflow, retargeting, compliance lead magnets
5. Community: WhatsApp VIP nurture, private Slack/Telegram, referral/introducer networks
6. AI-driven ABM and multi-touch nurture sequences
 
KEY METRICS:
- Year 1 paid media budget: $17K
- By Year 3 target: 65-70% of clients from referrals (zero CAC)
- Projected blended CAC by Year 3: $800-$1,000
- Advisory conversion: 30% of formation inquiries → full structure mandates`,
  },
 
  // =========================================================================
  // FUNDRAISING / THE ASK
  // =========================================================================
  {
    slug: "the-ask",
    title: "The Ask — Fundraising",
    route: "/tools/company-documents/the-ask",
    section: "fundraising",
    keywords: [
      "the ask", "fundraising", "investment", "raise", "pre-seed",
      "equity", "valuation", "pre-money", "post-money",
      "scenario a", "scenario b", "follow-on", "tranche",
      "shareholders agreement", "sha", "cap table",
      "1.30 crore", "137k", "20 percent equity",
    ],
    content: `PAGE: The Ask — Fundraising Details
ROUTE: /tools/company-documents/the-ask
 
PRE-SEED RAISE: ₹1.30 Crore (~$137K USD) for 20% post-money equity
 
VALUATION:
- Pre-money: ₹5.11 Crore (~$548K)
- Post-money: ₹6.39 Crore (~$685K)
 
COMPOSITION OF THE RAISE:
- Dashboard verified operational costs: ₹39.85L
- Unaccounted costs (networking, events, memberships, relationship travel): ₹11.5-21L estimated
- Buffer & extended runway: ₹69-79L
- Total raise: ₹1.30 Crore
 
THREE TRANCHES:
- Tranche 1 (Month 0, unconditional): ₹40 Lakhs — Legal foundation, regulatory setup, infrastructure, first 3 months operations
- Tranche 2 (Month 6, time-based): ₹50 Lakhs — Growth phase: marketing at scale, industry events, professional memberships, relationship infrastructure
- Tranche 3 (Month 9, time-based): ₹40 Lakhs — Scale phase: H2 marketing, late year events, extended runway, working capital
 
TWO SCENARIOS:
 
Scenario A — Equity Only:
- One document (SHA). Clean close. 20% post-money.
- No follow-on obligation, no trigger monitoring
- Board seat: 1 seat
- Anti-dilution: Waived
- ROFR: Founder holds ROFR
- Drag-along: Standard, founder's favour
- Governing law: Indian Law (Companies Act 2013)
 
Scenario B — Equity + Follow-On Right:
- Same Round 1 terms as Scenario A
- Additional: Follow-On Agreement — pro-rata participation right in Round 2
- Follow-on amount: ₹1.30 Crore (same as Round 1)
- Follow-on pricing: Round 2 market price (same terms as third-party investors)
- DUAL TRIGGERS required simultaneously:
  1. Round 2 pre-money valuation ≥ ₹15.33 Crore ($1.64M+) — minimum 3× baseline
  2. Third-party investors (excluding this investor) commit ≥ ₹2.33 Crore ($250K+)
- Exercise window: 15 business days
- Agreement expiry: 3 years from signing
 
EXIT SCENARIOS (at 20% stake on ₹1.30 Cr investment):
- Bear Case: Y5 revenue ₹14 Cr × 3x = ₹42 Cr EV → ₹8.4 Cr (6.5× MOIC)
- Conservative: Y5 revenue ₹23 Cr × 4x = ₹92 Cr EV → ₹18.4 Cr (14.2× MOIC)
- Base Case: Y5 revenue ₹37 Cr × 5x = ₹185 Cr EV → ₹37 Cr (28.5× MOIC)
- Bull Case: Y5 revenue ₹56 Cr × 6x = ₹336 Cr EV → ₹67.2 Cr (51.7× MOIC)
- Platform Exit (Y7): ₹112 Cr+ × 7x = ₹784 Cr+ EV → ₹156.8 Cr+ (120×+ MOIC)
 
UNIT ECONOMICS:
- Avg revenue per client (Y1): ₹6.9L
- Full structure mandate: ₹27.7L
- Gross margin target: 55-65%
- Single vertical LTV (3yr): ~₹16.8L
- Multi-vertical LTV (3yr): ~₹64.4L (3.8× single)
- Retention at 3+ verticals: 92%+
- Blended CAC by Y3: ₹74-93K
- LTV:CAC ratio (Y3): 69:1`,
  },
 
  // =========================================================================
  // COMPETITIVE LANDSCAPE
  // =========================================================================
  {
    slug: "competitive-landscape",
    title: "Competitive Landscape & Strategic Positioning",
    route: "/tools/trajectory/skip",
    section: "strategy",
    keywords: [
      "competitive landscape", "competitors", "competition",
      "market landscape", "tier 1", "tier 2", "tier 3",
      "dixcart", "amicorp", "astons", "ocra", "rosemont",
      "trident trust", "sovereign", "tmf", "vistra", "appleby",
      "moats", "competitive moat", "seven moats",
      "risks", "risk", "mitigant",
    ],
    content: `PAGE: Competitive Landscape & Strategic Positioning
ROUTE: /tools/trajectory/skip (Competitive Landscape section)
 
THREE-TIER MARKET STRUCTURE:
 
TIER 1 — MASS INCORPORATORS (Ocra Worldwide, Offshore Company Corp, 1st Formations, BBCincorp):
- Formation price: $1K-$3K, turnaround 24-48 hours
- Zero advisory depth, no structuring, no compliance, no banking
- Marketing-dependent acquisition, no compounding (CAC $50-$200, zero LTV beyond transaction)
- Cheapest on day one, often most expensive over 3 years
 
TIER 2 — BOYAR PARTNERS (planned positioning):
- Target blended revenue per client: $9K-$12K (4-5× Tier 1)
- Target pricing: 15-25% below Tier 3
- Plans to combine boutique advisory depth + multi-jurisdictional licensing + digital-native experience
- Not yet proven in market — strategic intent only
 
TIER 3 — LEGACY FIRMS (Sovereign, TMF, Vistra, IQ-EQ, Appleby, Carey Olsen, Walkers, Dixcart):
- Fee range: $15K-$50K+, decades of reputation and institutional credibility
- TCSP is typically 15-25% of total revenue — one department among many
- Advisor rotation every 18-24 months
- Referral-based acquisition built over decades
- Sovereign: 37 years, 20+ jurisdictions, £20B+ AuA
- TMF: acquired at 9× EBITDA
- IQ-EQ: 10-12× EBITDA
 
DIRECT COMPETITORS:
1. Dixcart (1972): Family-owned, 7 offices, Crown Dependencies and Europe. Strong trust admin for European HNWIs. No UAE, APAC, or licensing.
2. Amicorp (1992): ~700 employees, 40+ offices, $7B+ fund AuA. Global reach but bureaucratic, 1MDB association.
3. Astons (1989): Dubai HQ, strong in CBI/residency. Not full-spectrum TCSP.
4. Ocra Worldwide (1989): Commodity incorporator, 18 jurisdictions. Zero advisory.
5. Rosemont (2010, Monaco): Ultra-premium boutique for Monaco UHNWI. Single-jurisdiction concentration.
6. Trident Trust: Global institutional TCSP. Also one of Boyar's planned suppliers for trust/foundation services.
 
SEVEN PLANNED COMPETITIVE MOATS:
1. Advisory Moat — 30% formation-to-full-structure conversion ($2,500 → $29,700)
2. Relationship Moat — Named-advisor model, 2.0 services/client cross-sell target
3. Licensing Moat — First TCSP with dedicated VASP/MiCA/iGaming practice
4. Experience Moat — Digital-native from inception, targeting $83.5T wealth transfer
5. Renewal Flywheel — 73 entities by Y5, $128K+ annual recurring at 90%+ margin
6. Boyar Network — 100+ vetted partners across 53 jurisdictions
7. Multi-Vertical Architecture — Single-vertical 3yr LTV ~$18K vs multi-vertical ~$69K (3.8×)
 
SIX RISKS WITH MITIGANTS:
1. Founder Dependency (High) — Mitigant: first hire mid-Y2, key person insurance, process documentation
2. MiCA Timeline Shifts (High) — Mitigant: revenue model not MiCA-dependent, 5+ licensing verticals
3. Client Concentration (Medium) — Mitigant: target no client >15% by Y3
4. Banking Relationship Fragility (Medium) — Mitigant: 3-5 banking partners per jurisdiction
5. Competitive Pressure (Medium) — Mitigant: advisory and licensing moats take years to build
6. Regulatory Changes (High) — Mitigant: 53-jurisdiction coverage, every restructuring is billable`,
  },
 
  // =========================================================================
  // PRICING
  // =========================================================================
  {
    slug: "pricing",
    title: "Pricing Overview",
    route: "/pricing",
    section: "pricing",
    keywords: [
      "pricing", "fees", "cost", "how much", "price list",
      "formation pricing", "trust pricing", "banking pricing",
      "trustee fees", "pricing table", "margin", "gross margin",
    ],
    content: `PAGE: Pricing Overview
ROUTE: /pricing

OVERVIEW:
The pricing section covers detailed fee schedules for all Boyar services organized into categories:
- Banking pricing (141+ bank options with supplier cost, Boyar price, and gross margin for each)
- Company formation pricing by jurisdiction (53 jurisdictions)
- Trust & foundation pricing (17 trust jurisdictions, 9 foundation jurisdictions)
- Trustee & nominee services pricing
- On-quote licensing pricing

BANKING PRICING POLICY: 75-80% gross margin target (Group 1 private banks). 25-35% margin (Group 2 corporate/EMI banks).
FORMATION PRICING: 43-56% target GM. Varies by jurisdiction, average $2,500.
TRUST PRICING: Jersey $12,000, Cook Islands $13,000, Nevis $8,000. Others on quote. GM range 25-48%.
FOUNDATION PRICING: Guernsey $22,000, Gibraltar $18,000, Cook Islands $16,000, Panama $11,500, Nevis $10,500. Others on quote. GM range 30-50%.
TRUSTEE SERVICES: Nominee Shareholder $1,150, Nominee Director $1,250, Nominee Trustee $1,750, POA from $850.
BOYAR vs MARKET: 15-25% below Tier 3 legacy firms, 4-5× above Tier 1 mass incorporators`,
  },

  {
    slug: "banking-pricing",
    title: "Banking Pricing — Full Table",
    route: "/pricing/banking",
    section: "pricing",
    keywords: [
      "banking pricing", "bank account price", "banking cost",
      "banking margin", "bank fee", "banking fee",
      "andbank", "credit andorra", "morabanc", "bendura",
      "credit suisse", "deutsche bank", "erste bank", "julius baer",
      "pictet", "ubs", "lombard odier", "hsbc", "barclays",
      "standard chartered", "dbs", "ocbc", "emirates nbd",
      "first abu dhabi", "mashreq", "rakbank", "coutts",
      "revolut", "wise", "payoneer", "bank frick",
      "supplier cost banking", "boyar price banking",
      "switzerland banking", "hong kong banking", "uae banking",
      "uk banking", "singapore banking", "austria banking",
      "liechtenstein banking", "hungary banking", "latvia banking",
      "lithuania banking", "luxembourg banking", "malta banking",
      "germany banking", "poland banking",
    ],
    content: `PAGE: Banking Pricing — Full Table (141+ Banks, Group 1)
ROUTE: /pricing/banking
POLICY GROSS MARGIN: 75-80%

KEY HIGHLIGHTS:
- 141+ bank options across 30+ jurisdictions
- Supplier costs range from $534 (budget offshore) to $2,359 (premium UAE)
- Boyar prices range from $1,650 to $5,500
- Actual margins range from 52% to 79%

SELECTED BANKING PRICES (Jurisdiction | Bank | Supplier Cost | Boyar Price | Margin):
- Switzerland | Bank Julius Baer | $1,174 | $5,500 | 78.7%
- Switzerland | Pictet & Cie | $1,174 | $5,500 | 78.7%
- Switzerland | Lombard Odier & Cie | $1,174 | $5,500 | 78.7%
- Switzerland | UBS AG | $1,174 | $5,000 | 76.5%
- Switzerland | Credit Suisse AG | $1,055 | $4,500 | 76.6%
- Switzerland | Dukascopy Bank SA | $534 | $2,500 | 78.6%
- United Kingdom | Barclays Bank PLC | $1,779 | $4,800 | 63.0%
- United Kingdom | HSBC Bank plc | $1,779 | $4,800 | 63.0%
- United Kingdom | Coutts International | $819 | $3,200 | 74.4%
- United Kingdom | Revolut | $890 | $2,500 | 64.4%
- United Kingdom | Wise (TransferWise) | $771 | $2,200 | 65.0%
- Hong Kong | HSBC Bank (HK) PLC | $1,423 | $4,800 | 70.4%
- Hong Kong | DBS Bank | $1,720 | $5,200 | 66.9%
- Hong Kong | Standard Chartered Bank HK | $1,055 | $3,600 | 70.7%
- Singapore | Bank of Singapore Ltd | $949 | $3,400 | 72.1%
- Singapore | OCBC Bank | $949 | $3,200 | 70.3%
- UAE | Emirates NBD PJSC | $1,779 | $4,800 | 63.0%
- UAE | First Abu Dhabi Bank | $2,359 | $5,500 | 57.1%
- UAE | RAKBANK | $2,359 | $5,200 | 54.6%
- Liechtenstein | Bank Frick & Co. AG | $1,055 | $3,400 | 68.9% (crypto-friendly)
- Luxembourg | Banque de Luxembourg | $1,055 | $3,200 | 67.0%
- Monaco | Compagnie Monégasque de Banque | $937 | $3,200 | 70.7%
- United States | TD Bank | $1,364 | $3,800 | 64.1%
- India | State Bank of India | $700 | $2,050 | 65.9%

For full 141-bank pricing by specific jurisdiction or bank name, ask me directly.`,
  },

  {
    slug: "company-formation-pricing",
    title: "Company Formation Pricing — Full Table",
    route: "/pricing/company-formation/table",
    section: "pricing",
    keywords: [
      "company formation pricing", "formation cost", "formation price",
      "incorporate price", "company formation table",
      "bahamas formation", "bvi formation", "cayman formation",
      "singapore formation", "hong kong formation", "uk formation",
      "delaware formation", "dubai formation", "malta formation",
      "cyprus formation", "gibraltar formation", "mauritius formation",
      "seychelles formation", "nevis formation", "panama formation",
      "jersey formation", "luxembourg formation", "isle of man formation",
      "formation margin", "formation supplier cost",
    ],
    content: `PAGE: Company Formation Pricing — Full Table (53 Jurisdictions)
ROUTE: /pricing/company-formation/table
TARGET GM POLICY: 43-56%

COMPLETE PRICING (Region | Jurisdiction | Type | Supplier Cost | Boyar Price | GM):
Caribbean:
- Bahamas | IBC | $2,609 | $4,750 | 45%
- Belize | LLC | $896 | $1,950 | 54%
- BVI | LLC | $1,200 | $2,250 | 47%
- Cayman Islands | Exempt IBC/LLC | $2,937 | $5,500 | 47%
- Nevis | LLC | $2,060 | $3,750 | 45%
- Panama | LLC/S.A. | $1,302 | $2,450 | 47%
- Saint Vincent | LLC | $1,045 | $1,950 | 46%
- Anguilla | BC | $1,300 | $2,350 | 45%
- Turks and Caicos | IBC | $2,250 | $4,250 | 47%
- Curaçao | On Quote (licence-led)
Europe:
- United Kingdom | Pvt Ltd/LLP | $889 | $1,750 | 49%
- Ireland | Ltd/LLC | $909 | $1,850 | 51%
- Luxembourg | Sàrl | $13,010 | $21,500 | 40% (exception)
- Gibraltar | LLC | $1,485 | $2,950 | 50%
- Cyprus | LLC/Exempt | $2,026 | $3,750 | 46%
- Malta | Pvt Ltd | $4,200 | $7,500 | 44%
- Georgia | LLC | $800 | $1,650 | 52%
- Montenegro | LLC | $1,200 | $2,250 | 47%
- Isle of Man | LLC/Ltd | $4,264 | $7,250 | 41% (exception)
- Sweden | AB | $600 | $1,250 | 52%
Middle East:
- Bahrain | LLC | $2,650 | $4,750 | 44%
- Dubai UAE Mainland | $4,896 | $7,950 | 38% (exception)
- RAK ICC | $3,139 | $5,500 | 43%
Asia:
- Hong Kong | Pvt Ltd | $1,100 | $2,250 | 51%
- Singapore | Pvt Ltd | $1,800 | $3,250 | 45%
- Labuan Malaysia | CLS | $5,900 | $9,500 | 38% (exception)
Africa:
- Mauritius | Authorised Co. | $3,400 | $5,950 | 43%
- Seychelles | LLC/IBC | $654 | $1,450 | 55%
USA:
- Delaware | LLC/Inc/C-Corp | $310 | $950 | 67% (exception)
- Nevada | LLC | $1,306 | $2,450 | 47%
- Canada | INC/LTD | ~$518-814 | $1,550 | 49%
- Uruguay | S.A. | $7,500 | $10,000 | 25% (exception)
Oceania:
- Marshall Islands | IBC | $914 | $1,950 | 53%
- Samoa | International Co. | $1,000 | $1,950 | 49%`,
  },

  {
    slug: "trust-foundation-pricing",
    title: "Trust & Foundation Pricing",
    route: "/pricing/trust-foundations",
    section: "pricing",
    keywords: [
      "trust pricing", "trust price", "trust cost", "trust setup price",
      "trust margin", "trust supplier cost", "trust fee",
      "foundation pricing", "foundation price", "foundation cost",
      "foundation fee", "foundation margin",
      "jersey trust price", "nevis trust price", "cook islands trust",
      "guernsey trust", "cayman trust price", "singapore trust price",
      "cook islands foundation", "nevis foundation", "panama foundation",
      "gibraltar foundation", "guernsey foundation",
    ],
    content: `PAGE: Trust & Foundation Pricing
ROUTE: /pricing/trust-foundations

TRUST SETUP PRICING (17 Jurisdictions):
- Jersey | Supplier: $7,000 | Boyar: $12,000 | GM: ~42% | Suppliers: GFSC Global
- Nevis | Supplier: $4,565 | Boyar: $8,000 | GM: ~43% | Suppliers: Atrium Associates, Trident Trust
- Cook Islands | Supplier: $7,000 | Boyar: $13,000 | GM: ~46% | Suppliers: Atrium Associates, Trident Trust, Southpac Trust
- Guernsey | On Quote | GM: 30-40% | Suppliers: Avenue Trust, Sovereign Group
- Cayman Islands | On Quote | GM: 35-45% | Suppliers: WB Corporate
- Singapore | On Quote | GM: 30-40% | Suppliers: Sovereign Group, BBCIncorp
- Hong Kong | On Quote | GM: 30-40% | Suppliers: Sovereign Group, BBCIncorp
- Mauritius | On Quote | GM: 35-45% | Suppliers: Sovereign Group
- Isle of Man | On Quote | GM: 30-40% | Suppliers: Atrium, Trident Trust, Sovereign
- Bahamas | On Quote | GM: 35-45% | Suppliers: Atrium Associates
- Seychelles | On Quote | GM: 40-48%
- BVI | On Quote | GM: 35-45%
- Cyprus | On Quote | GM: 35-45%
- United Kingdom | On Quote | GM: 30-40%
- USA (Delaware) | On Quote | GM: 25-35% | Suppliers: Commonwealth Trust Company
- Uruguay | On Quote | GM: 35-45% | Suppliers: Law and Trust
- Canada | On Quote | GM: 25-35% | Suppliers: ESC Corporate Services, Parr Business Law

FOUNDATION SETUP PRICING (9 Jurisdictions):
- Cook Islands | Supplier: $8,000-$12,000 | Boyar: $16,000 | GM: 33-50%
- Nevis | Supplier: $4,500-$6,500 | Boyar: $10,500 | GM: 38-45%
- Panama | Supplier: $5,500-$8,000 | Boyar: $11,500 | GM: 35-45%
- Gibraltar | Supplier: $9,000-$13,000 | Boyar: $18,000 | GM: 35-45%
- Guernsey | Supplier: $12,000-$18,000 | Boyar: $22,000 | GM: 30-40%
- Belize | On Quote
- Isle of Man | On Quote
- Bahamas | On Quote
- UAE | On Quote`,
  },

  {
    slug: "trustee-services-pricing",
    title: "Trustee & Nominee Services Pricing",
    route: "/pricing/trustee-services",
    section: "pricing",
    keywords: [
      "trustee services pricing", "nominee pricing", "nominee cost",
      "nominee shareholder price", "nominee director price",
      "nominee trustee price", "poa price", "power of attorney cost",
      "declaration of trust cost", "dot price", "courier cost",
      "foundation council member price",
    ],
    content: `PAGE: Trustee & Nominee Services Pricing
ROUTE: /pricing/trustee-services
SUPPLIERS: Offshoreincorp, BBCincorp, Atrium Associates, Trident Trust, Chandrawat & Partners

NOMINEE & GOVERNANCE SERVICES:
- Nominee Shareholder | Supplier: $750 | Boyar: $1,150 | GM: 34.8%
- Nominee Director | Supplier: $900 | Boyar: $1,250 | GM: 28.0%
- Nominee Trustee | Supplier: $1,300 | Boyar: $1,750 | GM: 25.7%
- Nominee Trustor | Supplier: $1,300 | Boyar: $1,750 | GM: 25.7%
- Foundation Council Member | Supplier: $1,300 | Boyar: $1,750 | GM: 25.7%
- Foundation Founder (Nominee) | Supplier: $1,300 | Boyar: $1,750 | GM: 25.7%

DOCUMENTS & POA SERVICES:
- POA Nominee Signature Only | Supplier: $650 | Boyar: $850 | GM: 23.5%
- POA Notary Certified | Supplier: $780 | Boyar: $1,050 | GM: 25.7%
- POA Apostilled | Supplier: $900 | Boyar: $1,250 | GM: 28.0%
- Declaration of Trust (DOT) | Supplier: $650 | Boyar: $950 | GM: 31.6%
- DOT Notary Certified | Supplier: $780 | Boyar: $1,150 | GM: 32.2%
- International Courier | Supplier: $150 | Boyar: $180 | GM: 16.7%`,
  },
 
  // =========================================================================
  // TRAJECTORY
  // =========================================================================
  {
    slug: "trajectory",
    title: "Strategic Trajectory Plan",
    route: "/tools/trajectory",
    section: "strategy",
    keywords: [
      "trajectory", "trajectory plan", "strategic plan",
      "5 year plan", "growth plan", "roadmap",
      "year 1 plan", "year 2 plan", "year 3 plan",
      "decision gates", "gate 1", "gate 2",
    ],
    content: `PAGE: Strategic Trajectory Plan
ROUTE: /tools/trajectory
 
REVENUE TARGETS:
- Y1 (2025): ~$112K
- Y2 (2026): $500K-$1.2M
- Y3 (2027): $1.2M-$3.5M
- Y4-5 (2028-29): $3M-$8M
- Y6-7 (2030-32): $8M-$20M
 
KEY PRINCIPLES:
- Founder-led in Y1, first hire at $300K+ revenue
- Decision gates drive expansion (e.g., Gate 1: 5 clients in 6 months, Gate 4: 2+ licensing mandates)
- Revenue mix at maturity: Corporate Services 30%, Structuring/Trust 25%, Licensing 20%, Banking 10%, Fund Admin 10%, CBI/Estate 5%
 
MARKET TAILWINDS:
- MiCA July 2026 deadline
- $83.5T wealth transfer
- 142K millionaire migrations/year
- HNWI population growth
 
LICENSING CASCADE: Single $75K VASP mandate → $150-200K lifecycle revenue
RENEWAL FLYWHEEL: ~73 entities by Y5 → $128K+ recurring`,
  },
];
 
// =============================================================================
// PAGE MATCHING FUNCTION
// =============================================================================
 
/**
 * Given a user message, find the most relevant page context(s).
 * Returns the page context content strings that should be injected
 * into the system prompt.
 */
export function findRelevantPages(userMessage: string): PageContext[] {
  const lower = userMessage.toLowerCase();
  const words = lower.split(/\s+/);
 
  // Score each page by keyword matches
  const scored = PAGE_CONTEXTS.map((page) => {
    let score = 0;
 
    for (const keyword of page.keywords) {
      // Exact phrase match gets highest score
      if (lower.includes(keyword)) {
        // Longer keyword phrases are more specific = higher score
        score += keyword.split(/\s+/).length * 3;
      }
    }
 
    // Also check if page title words appear in the query
    const titleWords = page.title.toLowerCase().split(/\s+/);
    for (const tw of titleWords) {
      if (tw.length > 3 && words.includes(tw)) {
        score += 1;
      }
    }
 
    // Route-based matching (if user mentions a route)
    if (lower.includes(page.route.toLowerCase())) {
      score += 20;
    }
 
    return { page, score };
  });
 
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
 
  // Return top matches with score > 0 (max 3 pages to stay within token limits)
  const matches = scored
    .filter((s) => s.score > 0)
    .slice(0, 3)
    .map((s) => s.page);
 
  return matches;
}
 
/**
 * Build the page context injection string for the system prompt.
 */
export function buildPageContextPrompt(pages: PageContext[]): string {
  if (pages.length === 0) return "";
 
  const contextBlocks = pages.map((p) => p.content).join("\n\n---\n\n");
 
  return `
=== RELEVANT PAGE CONTEXT (use this EXACT information when answering) ===
The user is asking about content from a specific dashboard page. Use the EXACT data below to answer. Do NOT mix information from other pages or the general knowledge base. If the information below answers the question, use it verbatim. Do not assume, invent, or supplement with data from other pages.
 
${contextBlocks}
 
=== END OF PAGE CONTEXT ===
`;
}
