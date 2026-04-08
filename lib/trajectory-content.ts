export interface ThesisTimelineNode {
  year: string;
  label: string;
}

export interface PestelFactor {
  key: "political" | "economic" | "social" | "technological" | "environmental" | "legal";
  label: string;
  summary: string;
  fullText: string;
}

export interface SwotQuadrant {
  key: "strengths" | "weaknesses" | "opportunities" | "threats";
  label: string;
  previewBullets: string[];
  fullText: string;
}

export interface TrajectoryYearCard {
  key: string;
  yearLabel: string;
  objective: string;
  revenueTargetLabel: string;
  revenueTargetUsd: number;
  services: string[];
  teamSizeLabel: string;
  moats: string[];
  revenueScenarios?: { base: string; bull: string; bear: string };
  decisionGates: { title: string; detail: string }[];
  fullNarrative: string;
}

export interface CompetitiveTier {
  key: "tier1" | "tier2" | "tier3";
  label: string;
  description: string;
  keyWeakness: string;
  readFullText: string;
}

export interface CompetitorCard {
  name: string;
  founded: string;
  positioning: string;
  weakness: string;
  boyarAdvantage: string;
  fullAnalysis: string;
}

export interface RiskCard {
  key: string;
  title: string;
  summary: string;
  severity: "low" | "medium" | "high";
  mitigant: string;
}

export interface MoatCard {
  key: string;
  title: string;
  tagline: string;
  keyStat: string;
  deepDive: string;
}

export interface RevenueMaturitySegment {
  key: "corporate" | "structuring" | "licensing" | "banking" | "fundAdmin" | "estate" | "other";
  label: string;
  pct: number;
  color: string;
}

/* ================================================================ */
/*  THESIS                                                          */
/* ================================================================ */

export const THESIS = {
  heading: "The Compounding Trajectory",
  goldQuote: "They started narrow, stayed disciplined, and compounded client relationships over decades.",
  paragraph: `Every decade, the global advisory landscape produces a handful of firms that become the institutional backbone for cross-border commerce in their era. Sovereign Group started from a single office in Gibraltar in 1987 and grew to manage over 20,000 structures with £20 billion+ in assets under administration across 20+ jurisdictions. Asiaciti Trust began in Hong Kong in 1978, stayed family-owned and independent, and became one of the most respected fiduciary names in Asia-Pacific over four decades. Vistra merged with Tricor in 2023 to create a $6.5 billion enterprise value platform with 9,000 professionals across 50+ jurisdictions.\n\nWhat all of these firms have in common: they started narrow, stayed disciplined, and compounded client relationships over decades. None of them tried to be everything on day one. They picked a jurisdiction, built a reputation, and expanded concentrically.\n\nBoyar Partners enters this landscape at a unique moment. The market conditions of 2025–2030 are structurally different — and more favorable to a new entrant — than anything the industry has seen in the past thirty years.`,
  timeline: [
    { year: "1978", label: "Asiaciti Trust" },
    { year: "1987", label: "Sovereign Group" },
    { year: "2023", label: "Vistra/Tricor $6.5B" },
    { year: "2025", label: "Boyar Partners" },
  ] as ThesisTimelineNode[],
};

/* ================================================================ */
/*  TIMING                                                          */
/* ================================================================ */

export const TIMING = {
  sectionTitle: "Why the Timing Is Right",
  sectionSubtitle: "The TCSP market is accelerating",
  miCADeadlineLabel: "July 1, 2026",
  regulatoryTitle: "MiCA Hard Deadline",
  regulatoryText:
    "Every crypto exchange, wallet, and custodian operating in the EU must hold the right permissions, follow the reporting cycle, and keep governance auditable by this date. That single deadline is Boyar's pipeline catalyst, because licensing and ongoing compliance create repeatable multi-year demand.",
  regulatoryBullets: [
    "Every CASP operating in EU must obtain MiCA authorization or cease operations",
    "Ongoing compliance obligations create recurring advisory revenue",
    "Licensing complexity requires specialized TCSP expertise most firms lack",
    "Early movers in MiCA advisory lock in multi-year client relationships",
  ],
  wealthTransferCounterTarget: 83.5,
  wealthTransferSubtitle: "wealth changing hands over the next two decades",
  wealthCards: [
    { pct: "30% by 2030", detail: "of HNWIs will have received generational wealth transfers" },
    { pct: "63% by 2035", detail: "of family wealth will have changed hands to next generation" },
    { pct: "84% by 2040", detail: "of current HNWI wealth will be held by inheritors" },
  ],
  inheritorSwitchLine: "81% of inheritors plan to switch firms.",
  millionaireMigrations: 142000,
  hnwiTarget: 626619,
  hnwiIncreasePct: "+33.4%",
  wealthGrowthPct: "Global HNWI wealth grew 4.2% in 2024",
};

/* ================================================================ */
/*  PESTEL                                                          */
/* ================================================================ */

export const PESTEL_FACTORS: PestelFactor[] = [
  {
    key: "political",
    label: "Political",
    summary: "Regulatory agendas tighten categories, then standardize licensing pathways.",
    fullText:
      "Governments worldwide are tightening regulatory frameworks for financial services, creating mandatory licensing categories where none existed five years ago. The EU's MiCA regulation, the UK's FCA registration requirements, and similar frameworks in Singapore (MAS), UAE (VARA/ADGM), and the Cayman Islands (CIMA) are creating a fragmented but expanding compliance surface area. For Boyar, this is structural demand — every new regulatory category creates clients who need formation, structuring, and ongoing compliance advisory. Political pressure toward transparency (beneficial ownership registers, CRS/FATCA reporting, substance requirements) further increases the complexity that clients need professional help to navigate. The trend is unidirectional: more regulation, more categories, more demand for specialized TCSP advisory.",
  },
  {
    key: "economic",
    label: "Economic",
    summary: "Wealth and cross-border complexity concentrate demand, not budgets.",
    fullText:
      "Global HNWI wealth reached $86.8 trillion in 2024, growing 4.2% year-over-year despite macroeconomic headwinds. Cross-border capital flows continue to increase, driven by globalization of investment portfolios, multi-jurisdictional business operations, and geographic diversification of personal wealth. The economic environment concentrates advisory demand — families with $10M+ in assets increasingly require multi-jurisdictional structures, and the complexity of managing these structures across regulatory regimes creates sustainable advisory relationships. Interest rate normalization has also increased the attractiveness of structured vehicles for tax planning and estate preservation. Boyar's positioning in the $2,500–$30,000 fee range per engagement means the firm captures the mid-market sweet spot: clients wealthy enough to need sophisticated structuring but underserved by the mega-firms focused on $100M+ mandates.",
  },
  {
    key: "social",
    label: "Social",
    summary: "Next-gen heirs prefer advisors who can execute compliance quickly.",
    fullText:
      "The Great Wealth Transfer — $83.5 trillion changing hands over the next two decades — is reshaping client expectations. Next-generation wealth holders (millennials and Gen Z inheritors) prefer digital-native advisory experiences, expect faster execution, and are more likely to operate businesses across multiple jurisdictions. Critically, 81% of inheritors plan to switch advisory firms upon receiving their inheritance. This creates a structural acquisition opportunity: the advisory relationships built by legacy firms over decades are about to reset. Social factors also include the 142,000 millionaire migrations projected for 2025 — individuals physically relocating across borders for tax, lifestyle, or political reasons, each requiring new corporate structures, trust arrangements, and banking relationships in their destination jurisdictions.",
  },
  {
    key: "technological",
    label: "Technological",
    summary: "Digital-native platforms require legacy-grade governance and structuring.",
    fullText:
      "The proliferation of digital assets, DeFi protocols, and tokenized securities has created an entirely new category of clients who need traditional TCSP services wrapped in crypto-native understanding. Exchanges, wallet providers, NFT marketplaces, and DeFi protocols all require corporate structures, regulatory licenses, banking relationships, and ongoing compliance — the exact services Boyar provides. The technological shift also means that advisory firms themselves must be digitally capable: clients expect real-time reporting, digital document management, and responsive communication channels. Legacy firms with paper-based processes and slow response times are losing ground to firms that can combine institutional-grade governance with modern delivery. Boyar's technology-forward approach — structured data pipelines, automated compliance monitoring, and digital-first client interaction — positions it to capture clients frustrated by the analog experience of traditional TCSPs.",
  },
  {
    key: "environmental",
    label: "Environmental",
    summary: "ESG and reporting add obligations across jurisdictions.",
    fullText:
      "ESG reporting requirements, carbon disclosure mandates, and sustainable finance regulations are adding new layers of compliance obligation to corporate structures. The EU's CSRD (Corporate Sustainability Reporting Directive), the UK's climate-related financial disclosures, and similar frameworks in Asia-Pacific are expanding the advisory surface area. For corporate structures that span multiple jurisdictions, ESG compliance becomes multiplicative — each jurisdiction's requirements must be met independently, creating advisory demand at every node of a multi-entity structure. Boyar integrates ESG compliance into its structuring advisory, ensuring that entities are formed and maintained in compliance with environmental and sustainability reporting requirements from day one, rather than retrofitting compliance after the fact.",
  },
  {
    key: "legal",
    label: "Legal",
    summary: "Licensing, AML, and beneficial ownership regimes expand the compliance surface area.",
    fullText:
      "The legal environment for cross-border structuring has fundamentally shifted over the past decade. AML/CFT requirements (6AMLD in the EU, equivalent frameworks globally) have increased the compliance burden for corporate service providers and their clients. Beneficial ownership transparency requirements — public registers in the EU, the US Corporate Transparency Act, and similar initiatives in the UK and Crown Dependencies — mean that structures must be carefully designed to meet disclosure requirements while achieving legitimate planning objectives. Licensing requirements for financial services (MiCA, FCA, MAS) have created new categories of regulated activity, each requiring specific corporate structures, governance frameworks, and ongoing compliance. For Boyar, the expanding legal complexity is a tailwind: every new requirement creates advisory demand, and the firms best positioned to navigate multi-jurisdictional legal complexity will compound their client relationships over time.",
  },
];

/* ================================================================ */
/*  SWOT                                                            */
/* ================================================================ */

export const SWOT_MATRIX: SwotQuadrant[] = [
  {
    key: "strengths",
    label: "Strengths",
    previewBullets: [
      "Category-focused discipline — structuring as vocation, not as a side offering",
      "Institution-ready compliance posture from day one",
      "Multi-jurisdiction execution capability across 53 jurisdictions via Boyar Network",
    ],
    fullText:
      "Boyar Partners' core strength is its founding discipline: structuring is the business, not a department within a larger operation. This means every process, every hire, and every partnership decision is optimized for advisory quality rather than volume throughput.\n\nKey strengths include:\n\n• Category focus — Boyar does not dilute its positioning by offering commodity formation alongside advisory structuring. Every client engagement starts with a diagnostic, not a checkout page.\n\n• Institution-ready compliance — The firm's compliance posture (AML/CFT frameworks, CDD procedures, ongoing monitoring) meets the standards expected by institutional counterparties from inception, not as a retrofit.\n\n• Multi-jurisdiction execution — The Boyar Network of 100+ vetted partners across 53 jurisdictions enables the firm to execute complex multi-jurisdictional structures without the overhead of maintaining physical offices in every location.\n\n• Advisory depth — The ability to convert 30% of formation inquiries into full structuring mandates ($9K–$12K blended revenue vs. $2,500 for standalone formation) demonstrates genuine advisory capability that competitors in Tier 1 (mass incorporators) cannot replicate.\n\n• Digital-native delivery — Modern client experience, structured data pipelines, and responsive communication set Boyar apart from legacy TCSPs still operating on paper-based systems.\n\n• Founder expertise — Deep personal expertise in corporate structuring, trust administration, and regulatory licensing provides the credibility required to win institutional-grade mandates.",
  },
  {
    key: "weaknesses",
    label: "Weaknesses",
    previewBullets: [
      "Single-founder dependency creates execution concentration risk",
      "Partner network dependency for multi-jurisdictional execution",
      "Brand awareness requires sustained building in a relationship-driven industry",
    ],
    fullText:
      "Boyar Partners operates with clear-eyed awareness of its vulnerabilities, and the trajectory plan incorporates specific mitigants for each.\n\n• Single-founder dependency — In Year 1–2, the firm's execution capacity is constrained by the founder's bandwidth. The mitigant is the phased hiring plan (first associate in Year 2, structured team buildout by Year 3) and the deliberate pacing of client acquisition to match execution capacity.\n\n• Partner network dependency — Multi-jurisdictional execution relies on the Boyar Network of vetted partners. If a key partner in a critical jurisdiction underperforms or exits, it could temporarily disrupt client delivery. Mitigant: maintain 2–3 vetted partners per key jurisdiction, and build internal capability in the highest-volume jurisdictions (Cyprus, UAE, Singapore) by Year 3–4.\n\n• Brand awareness ramp-up — In a relationship-driven industry, new entrants must earn trust through demonstrated execution before referral networks generate consistent deal flow. The 18-month brand-building timeline is realistic but creates a vulnerability window.\n\n• Capital constraints — As a bootstrapped operation, Boyar cannot invest in geographic expansion, technology platforms, or team buildout as quickly as venture-backed competitors. The mitigant is the capital-light model: leveraging the Boyar Network for geographic reach rather than opening offices.\n\n• Limited track record — New firm in a trust-based industry. Every successful mandate builds the track record, but the first 12–18 months require winning clients on capability and credibility rather than historical performance data.",
  },
  {
    key: "opportunities",
    label: "Opportunities",
    previewBullets: [
      "MiCA deadline creates repeatable licensing demand pipeline",
      "Wealth transfer unlocks restructuring budgets as 81% of inheritors switch firms",
      "Digital-native platforms need governance that legacy TCSPs can't deliver efficiently",
    ],
    fullText:
      "The opportunity landscape for Boyar Partners is structurally favorable across multiple dimensions:\n\n• MiCA-driven demand — The July 1, 2026 deadline creates a quantifiable pipeline: every crypto exchange, wallet provider, and custodian operating in the EU needs licensing advisory. A single VASP mandate at $75K can cascade into $150K–$200K of lifecycle revenue (formation + licensing + compliance + banking + ongoing administration). This is category-creating demand that did not exist three years ago.\n\n• The Great Wealth Transfer — $83.5 trillion changing hands, with 81% of inheritors planning to switch advisory firms. This is the largest client acquisition opportunity in the TCSP industry's history. Boyar's positioning as a next-generation, digital-native advisory firm maps directly to inheritor preferences.\n\n• Geographic arbitrage — 142,000 millionaire migrations projected for 2025. Each migration creates demand for new corporate structures, trust arrangements, banking relationships, and tax-efficient redomiciliation. Boyar's multi-jurisdictional capability captures this demand at every touchpoint.\n\n• Licensing as a service — The expansion of regulated categories (crypto, forex, fund management, insurance, banking) in multiple jurisdictions creates ongoing advisory opportunities. Each jurisdiction adds its own licensing requirements, and the complexity of maintaining licenses across jurisdictions favors advisory firms with deep regulatory knowledge.\n\n• Cross-sell economics — Once a client engages Boyar for formation or structuring, the cross-sell to corporate services, banking facilitation, licensing, and ongoing administration drives LTV from $2,500 (single service) to $69,000+ (multi-vertical, 3-year). This compounding economics model means client acquisition costs are amortized across a growing revenue base.",
  },
  {
    key: "threats",
    label: "Threats",
    previewBullets: [
      "MiCA timeline shifts could defer the licensing demand catalyst",
      "Client concentration risk in early years when deal volume is low",
      "Regulatory enforcement volatility can reshape compliance economics",
    ],
    fullText:
      "Boyar Partners identifies and monitors six primary threat categories:\n\n• MiCA timeline shifts — If the EU delays enforcement or extends transition periods, the licensing demand spike could defer by 6–18 months. Mitigant: Boyar's revenue model is not MiCA-dependent; formation, structuring, and corporate services generate baseline revenue independent of any single regulatory catalyst.\n\n• Client concentration — In Year 1–2, a small number of high-value mandates could represent a disproportionate share of revenue. Mitigant: deliberate pipeline diversification across service lines and jurisdictions, with a target of no single client exceeding 15% of annual revenue by Year 3.\n\n• Regulatory enforcement volatility — Shifts in regulatory intensity (either tightening or relaxation) can reshape the compliance advisory market. Mitigant: Boyar's advisory model is jurisdiction-agnostic and regulation-agnostic — the firm helps clients comply with whatever framework applies, rather than betting on any specific regulatory outcome.\n\n• Competitive response — Tier 1 mass incorporators (like Ocra, formation factories) could attempt to move upmarket into advisory structuring. Tier 3 legacy firms (like Vistra, Sovereign) could invest in digital delivery. Mitigant: the advisory moat — Boyar's combination of advisory depth + digital delivery + multi-jurisdictional execution is difficult to replicate quickly from either direction.\n\n• Banking relationship fragility — Partner banks may change policies, exit markets, or increase due diligence requirements. Mitigant: maintain 3–5 banking relationships per key jurisdiction and build the Boyar Network's banking referral capacity.\n\n• Key person risk — As detailed in the weaknesses, single-founder dependency is a genuine threat in Years 1–3. Mitigant: phased team buildout and the deliberate limitation of client acquisition to match execution capacity.",
  },
];

/* ================================================================ */
/*  TRAJECTORY YEARS                                                */
/* ================================================================ */

export const TRAJECTORY_YEARS: TrajectoryYearCard[] = [
  {
    key: "y1",
    yearLabel: "Year 1 (2025)",
    objective: "ESTABLISH FOUNDATION & FIRST CLIENTS",
    revenueTargetLabel: "conservative estimate",
    revenueTargetUsd: 112000,
    services: ["Company Formation", "Trust & Foundations", "Corporate Services"],
    teamSizeLabel: "Founder-led",
    moats: ["Regulatory credentialing", "Jurisdiction depth", "Advisory positioning"],
    revenueScenarios: undefined,
    decisionGates: [
      { title: "Pipeline validation", detail: "Minimum 3 signed mandates by Q2 to confirm market positioning and pricing." },
      { title: "Banking network", detail: "At least 2 banking relationships activated in priority jurisdictions (Cyprus, UAE)." },
    ],
    fullNarrative: `Year 1 is about proving the model, not scaling it. The objective is to establish Boyar Partners as a credible advisory firm with a functioning operational infrastructure, a small but growing client base, and the regulatory credentials required to compete for institutional-grade mandates.

How Year 1 actually works:

The founder operates as sole practitioner, handling client acquisition, advisory delivery, compliance, and administration. This is deliberate — the constraint on scale forces discipline in client selection. Every mandate must be a reference case: executed flawlessly, documented thoroughly, and positioned as proof of concept for the advisory model.

Revenue target: ~$112K from 6 Company Formation engagements ($2,500 each = $15,000), 1 Standalone Trust ($13,000), 2 Full Structure mandates ($29,700 each = $59,400), 4 Corporate Services retainers ($3,500 each = $14,000), 2 Office Registrations ($1,500 each = $3,000), and 1 Banking facilitation ($6,500). Total: $110,900.

The critical task in Year 1 is building the Boyar Network — vetting and onboarding partners in priority jurisdictions. By year-end, the target is 15–20 vetted partners across 10+ jurisdictions, with particular focus on Cyprus (formation + licensing hub), UAE (HNWI migration destination), Singapore (Asia-Pacific gateway), and the Crown Dependencies (trust + fund administration).

Decision gates: If pipeline by mid-year does not support at least $80K annualized revenue, re-evaluate pricing, positioning, and marketing spend before committing to Year 2 hiring. If pipeline exceeds $150K, accelerate the first associate hire to Q4 rather than Q1 of Year 2.

KPIs: Revenue target ($112K), client satisfaction (100% referenceable), Boyar Network partners (15–20), banking relationships (2–3 activated), website/marketing pipeline (10+ qualified inquiries per month by Q4).`,
  },
  {
    key: "y2",
    yearLabel: "Year 2 (2026)",
    objective: "SCALE ADVISORY & ACTIVATE LICENSING",
    revenueTargetLabel: "base case range",
    revenueTargetUsd: 650000,
    services: ["Full Structure", "Licensing (MiCA)", "Corporate Services", "Banking"],
    teamSizeLabel: "3–5 people",
    moats: ["Partner network", "Repeatable compliance playbooks", "MiCA first-mover"],
    revenueScenarios: { base: "$500K–$750K", bull: "$900K–$1.2M", bear: "$250K–$400K" },
    decisionGates: [
      { title: "MiCA licensing traction", detail: "At least 2 MiCA licensing mandates signed by Q2 2026 to validate the licensing vertical." },
    ],
    fullNarrative: `Year 2 is the inflection year. The MiCA hard deadline (July 1, 2026) creates a quantifiable demand spike for licensing advisory, and Boyar must be positioned to capture it. Simultaneously, the renewal revenue from Year 1 clients begins to compound, and the first associate hire enables the founder to focus on business development and complex advisory while delegating administrative execution.

How Year 2 actually works:

The first associate handles day-to-day corporate services, compliance monitoring, and routine formation work. The founder concentrates on (a) licensing mandates — the highest-value, highest-complexity engagements — and (b) relationship development with referral sources (banks, law firms, accounting firms) who can channel formation and structuring inquiries.

Revenue composition shifts dramatically: Full Structure mandates ($29,700 each) become the revenue backbone, supplemented by MiCA licensing engagements ($75K–$150K each) and growing corporate services recurring revenue. Renewal revenue from Year 1 clients adds $61,180 at 70% renewal rates.

The Boyar Network expands to 35–50 partners across 20+ jurisdictions. Banking relationships deepen — the target is 5–8 activated banking partners, enabling Boyar to offer reliable banking facilitation as a service line rather than an ad hoc referral.

Bull case ($900K–$1.2M): 3+ MiCA mandates close in H1, plus strong formation/structuring pipeline driven by brand awareness gains. This triggers accelerated hiring (2 additional associates by Q3). Bear case ($250K–$400K): MiCA demand defers, licensing mandates slip to H2 or Year 3. Revenue depends on formation and structuring only, at slower pipeline growth. The business remains viable but scaling is delayed by 6–12 months.

Decision gates: If total revenue exceeds $600K by mid-year, commit to the full licensing vertical buildout (dedicated compliance analyst, expanded partner network for licensing jurisdictions). If revenue is below $300K by mid-year, reduce operating expenses and focus on pipeline conversion before hiring.`,
  },
  {
    key: "y3",
    yearLabel: "Year 3 (2027)",
    objective: "DEEPEN MOATS & EXPAND VERTICALS",
    revenueTargetLabel: "base case range",
    revenueTargetUsd: 2400000,
    services: ["Licensing lifecycle", "Banking facilitation", "Fund administration", "Trust services"],
    teamSizeLabel: "6–9 people",
    moats: ["Category credibility", "Execution throughput", "Renewal flywheel"],
    revenueScenarios: { base: "$1.5M–$3M", bull: "$3M–$4.5M", bear: "$800K–$1.2M" },
    decisionGates: [
      { title: "Vertical expansion", detail: "If licensing revenue exceeds $500K, launch fund administration vertical. If below $300K, double down on formation/structuring." },
    ],
    fullNarrative: `Year 3 is where the compounding model becomes visible. Renewal revenue from Year 1 and Year 2 clients now represents a meaningful base (~$148K from 22 renewals), new service verticals (fund administration, expanded licensing) increase average revenue per client, and the team has grown to support higher throughput without sacrificing advisory quality.

How Year 3 actually works:

The team now includes a senior compliance analyst (handling licensing and regulatory advisory), 2–3 corporate services associates (handling routine administration, filings, and reporting), and a business development manager (handling pipeline, marketing, and partner relationship management). The founder focuses on the most complex mandates — full structures involving 3+ jurisdictions, licensing applications for regulated categories, and strategic advisory for HNWI families.

Revenue composition: The licensing vertical is now proven — each MiCA or equivalent licensing mandate generates $75K–$150K in initial fees plus ongoing compliance revenue of $25K–$40K annually. Full Structure mandates ($29,700) continue to grow with renewal economics. Corporate services recurring revenue compounds as the entity base grows. New verticals (fund administration, estate planning introductions) begin contributing.

The Boyar Network reaches 60–80 partners across 30+ jurisdictions. The firm begins receiving inbound referrals from the network — partners sending clients to Boyar for structuring and advisory, reversing the Year 1 dynamic where Boyar primarily sent work outbound.

This is the year where brand compounds: successful mandates from Year 1–2 generate referrals, conference appearances build visibility, and published thought leadership (case studies, regulatory analysis) establishes Boyar as a recognized specialist in the TCSP space.`,
  },
  {
    key: "y4",
    yearLabel: "Year 4 (2028)",
    objective: "INSTITUTIONAL SCALE & PROCESS COMPOUNDING",
    revenueTargetLabel: "base case range",
    revenueTargetUsd: 5200000,
    services: ["Trust automation", "Multi-entity structuring", "Advanced licensing", "Family office advisory"],
    teamSizeLabel: "10–13 people",
    moats: ["Process compounding", "Higher-margin advisory depth", "Institutional referrals"],
    revenueScenarios: { base: "$4M–$6M", bull: "$6M–$8M", bear: "$2M–$3.5M" },
    decisionGates: [
      { title: "Geographic expansion", detail: "If revenue exceeds $4M, open first physical office in priority jurisdiction (Cyprus or Singapore)." },
    ],
    fullNarrative: `Year 4 is the institutional year. The firm transitions from a boutique practice to a structured advisory operation with dedicated verticals, middle management, and systematic processes that compound execution quality.

How Year 4 actually works:

The team now includes vertical leads for licensing, corporate services, and trust/structuring. Each vertical operates with defined processes, quality controls, and KPI tracking. The founder transitions from day-to-day execution to firm leadership — strategic direction, key relationship management, and quality oversight across verticals.

Technology investment increases: automated compliance monitoring for the growing entity base, client reporting dashboards, and structured data pipelines for regulatory filings across jurisdictions. These investments reduce marginal cost per client and increase renewal margins.

Revenue composition: Renewal revenue from the accumulated client base (37 renewals expected) now represents ~$246K of recurring income, demonstrating the compounding model. New mandates continue to grow in both volume and average value — the advisory reputation built in Years 1–3 enables the firm to command premium pricing for complex engagements.

The Boyar Network reaches 80–100 partners. Several network partners are now reliable bidirectional referral sources — they send Boyar their most complex structuring inquiries, and Boyar sends them administrative and filing work in jurisdictions where the partner has operational presence. This network effect is difficult for new entrants to replicate.

Decision gates: If revenue exceeds $5M, the firm evaluates acquisition of a small local TCSP (in Cyprus, Singapore, or UAE) to gain physical presence and local licenses without the time cost of building from scratch.`,
  },
  {
    key: "y5",
    yearLabel: "Year 5 (2029)",
    objective: "DIVERSIFICATION & RENEWAL FLYWHEEL",
    revenueTargetLabel: "base case range",
    revenueTargetUsd: 11800000,
    services: ["Licensing lifecycle", "Renewal flywheel", "Estate planning", "CBI facilitation"],
    teamSizeLabel: "13–18 people",
    moats: ["Retention and renewal compounding", "Institutional partner density", "Multi-vertical LTV"],
    revenueScenarios: { base: "$8M–$15M", bull: "$15M–$20M", bear: "$5M–$8M" },
    decisionGates: [
      { title: "Revenue concentration", detail: "No single client should exceed 10% of revenue. If concentration threshold is breached, accelerate pipeline diversification." },
    ],
    fullNarrative: `Year 5 is where the compound curve becomes unmistakable. The renewal flywheel — 73 entities under administration generating $128K+ in annual recurring revenue at 90%+ margin — provides a revenue floor that makes the business resilient to pipeline fluctuations.

How Year 5 actually works:

Revenue diversification across five verticals ensures that no single regulatory event, jurisdiction, or client segment can significantly impact the firm. The revenue mix at maturity: Corporate Services 30%, Structuring & Trust 25%, Licensing 20%, Banking 10%, Fund Administration 10%, CBI/Estate 5%.

The team is organized into three delivery pods: (1) Advisory & Structuring (complex mandates, licensing), (2) Operations & Compliance (entity administration, filings, renewals), and (3) Business Development & Network (pipeline, partnerships, marketing). Each pod has a lead who reports to the founder.

Cross-sell economics are fully visible: clients who engage Boyar for a single service generate an average of $18K in 3-year LTV. Clients who engage across multiple verticals generate $69K in 3-year LTV — a 3.8x multiplier. The advisory model's ability to convert formation inquiries into full structuring mandates (30% conversion rate) drives this multiplier.

The Boyar Network exceeds 100 vetted partners across 53 jurisdictions. The network itself becomes a moat — new entrants cannot replicate the breadth and depth of vetted relationships that Boyar has built over five years of operational partnership.

Annual recurring revenue from renewals exceeds $344K, providing a base that covers a significant portion of operating costs. New client acquisition adds incremental revenue on top of this compounding base, rather than being the sole source of income.`,
  },
  {
    key: "y6",
    yearLabel: "Year 6 (2030)",
    objective: "PLATFORM EXPANSION & ADVISORY SCALE",
    revenueTargetLabel: "projection range",
    revenueTargetUsd: 16000000,
    services: ["Full portfolio architecture", "Advisory scale", "Platform services", "Institutional partnerships"],
    teamSizeLabel: "20–25 people",
    moats: ["Brand and trust halo", "Global execution consistency", "Platform economics"],
    revenueScenarios: { base: "$12M–$20M", bull: "$20M–$30M", bear: "$8M–$12M" },
    decisionGates: [
      { title: "Platform or boutique", detail: "Strategic decision: remain a premium boutique or build toward platform economics with technology-enabled scale." },
    ],
    fullNarrative: `Year 6 marks the transition from growth-stage advisory firm to established platform. The decision at this stage is strategic: does Boyar remain a premium boutique (higher margins, controlled growth, founder-led quality) or invest in platform infrastructure (technology, team expansion, geographic offices) to pursue larger scale?

Both paths are viable. The boutique path generates $12M–$15M in revenue with 40%+ EBITDA margins, a team of 20–25, and the founder maintaining active involvement in the most important client relationships. The platform path requires investment ($2M–$5M in technology, office setup, and team buildout) but opens revenue potential of $20M–$30M by Year 7.

The Boyar Network at this stage is a genuine competitive moat. With 100+ partners across 53 jurisdictions, the firm can execute multi-jurisdictional structures that would require months of partner identification and vetting for a new entrant. Several network partners are now so deeply integrated that they function as virtual branch offices — handling local execution under Boyar's quality standards.

Brand recognition in the TCSP space is established. Boyar is invited to speak at industry conferences, contributes to regulatory consultations, and is cited in trade publications as a reference case for the "advisory-first TCSP" model. This brand halo reduces client acquisition costs and enables premium pricing.

Institutional referral partnerships — with private banks, law firms, family offices, and accounting firms — generate 40%+ of new mandates through warm introductions, reducing dependence on direct marketing and outbound business development.`,
  },
  {
    key: "y7",
    yearLabel: "Year 7 (2031–2032)",
    objective: "COMPOUNDING MACHINE AT FULL VELOCITY",
    revenueTargetLabel: "projection range",
    revenueTargetUsd: 26000000,
    services: ["Advanced licensing", "Network coordination", "Strategic advisory", "M&A advisory"],
    teamSizeLabel: "25–30 people",
    moats: ["Multi-vertical moat", "Jurisdiction moat expansion", "Institutional brand"],
    revenueScenarios: { base: "$15M–$30M", bull: "$30M–$50M", bear: "$10M–$15M" },
    decisionGates: [
      { title: "Exit or compound", detail: "At this valuation ($30M–$75M+ enterprise value at 3–5x revenue), the founder evaluates: continue compounding, bring in institutional capital, or explore strategic M&A." },
    ],
    fullNarrative: `Year 7 is where the trajectory becomes inevitable. The compounding machine — clients, renewals, network, brand, team, processes — is operating at full velocity.

Revenue: $15M–$30M in the base case, with a realistic bull case of $30M–$50M if the platform path was chosen in Year 6. Recurring revenue from entity administration and compliance alone exceeds $2M annually.

The firm at this stage manages 200+ active client relationships across 53 jurisdictions, with a team of 25–30 professionals organized into specialized verticals. Each vertical has its own P&L, team, and growth targets, but shares the common Boyar platform infrastructure (compliance, technology, network).

Strategic optionality is significant:
• Continue as an independent firm, compounding at 20–30% annually
• Bring in institutional capital (private equity, strategic investor) to accelerate platform buildout
• Explore merger with a complementary firm (geographic or vertical expansion)
• Partial founder exit — the firm's enterprise value at 3–5x revenue suggests $45M–$150M in potential valuation

The trajectory document's thesis is validated: disciplined focus, compounding client relationships, and concentric expansion have produced a firm that looks modest in Year 1, impressive by Year 3, and inevitable by Year 7.

This is not a hockey stick projection. It is a compound curve — the kind that rewards patience, discipline, and relentless execution across every client relationship, every jurisdiction, and every regulatory category.`,
  },
];

/* ================================================================ */
/*  COMPETITIVE TIERS                                               */
/* ================================================================ */

export const COMPETITIVE_TIERS: CompetitiveTier[] = [
  {
    key: "tier1",
    label: "Mass Incorporators",
    description: "Formation as Transaction",
    keyWeakness: "Lower advisory depth and weaker compliance differentiation.",
    readFullText:
      "Tier 1 firms treat company formation as a commodity transaction. They compete on price ($500–$2,000 per incorporation), speed (24–48 hours), and volume. These firms process thousands of formations annually through standardized workflows with minimal advisory input.\n\nExamples: Ocra Worldwide, formation desk divisions of large accounting firms, online incorporation platforms.\n\nThe Tier 1 model has structural limitations: (1) No advisory upsell — clients receive a formation and nothing else. (2) No relationship depth — the interaction is transactional, with no ongoing advisory relationship. (3) Low switching costs — clients can move to any other incorporator for their next entity. (4) Thin margins — price competition drives margins below 20% on routine formations.\n\nBoyar's advantage over Tier 1: Advisory conversion. Boyar converts 30% of formation inquiries into full structuring mandates worth $9K–$12K — 4–5x the revenue of a standalone formation. Tier 1 firms cannot replicate this because they lack the advisory expertise to identify structuring opportunities and the credibility to advise on them.",
  },
  {
    key: "tier2",
    label: "Boyar Partners",
    description: "Structuring as Vocation",
    keyWeakness: "Execution capacity must keep up with disciplined demand.",
    readFullText:
      "Boyar Partners occupies a unique position: the advisory depth of a Tier 3 legacy firm, combined with the digital delivery and responsiveness that Tier 1 clients expect.\n\nStructuring as Vocation means that every engagement begins with a diagnostic — understanding the client's business, jurisdictional requirements, regulatory exposure, and long-term objectives — before recommending a structure. This advisory-first approach produces three compounding effects:\n\n1. Higher revenue per client — blended revenue of $9K–$12K vs. $2,500 for commodity formation\n2. Deeper client relationships — advisory creates ongoing dialogue, which creates cross-sell opportunities\n3. Higher switching costs — clients who have received tailored advisory structuring are less likely to move to a competitor who treats their needs as a commodity\n\nThe key risk in Tier 2 positioning is execution capacity: advisory-quality delivery requires experienced professionals, and scaling the team without diluting quality is the central management challenge of Years 2–4.\n\nBoyar's positioning advantage: the only firm in the market combining advisory depth (complex multi-jurisdictional structuring), digital delivery (modern client experience), and licensing capability (MiCA, VASP, EMI regulatory advisory) in a single platform. Legacy firms have advisory depth but lack digital delivery. Mass incorporators have digital delivery but lack advisory depth. Neither tier has built systematic licensing advisory capability.",
  },
  {
    key: "tier3",
    label: "Legacy Firms",
    description: "Structuring as Subset",
    keyWeakness: "Institutional pace and lower digital-native integration speed.",
    readFullText:
      "Tier 3 firms are the established players: Sovereign Group, Vistra, TMF Group, Intertrust, and similar multi-jurisdictional service providers. These firms have decades of history, thousands of employees, and physical offices in dozens of jurisdictions.\n\nTheir strength is institutional credibility and scale. Their weakness is that structuring is one service line among many — competing internally with fund administration, accounting, HR services, and payroll for management attention and investment. The advisory depth exists within these firms, but it is not their organizing principle.\n\nSpecific Tier 3 weaknesses:\n• Institutional pace — Decision-making is slow, compliance processes are bureaucratic, and client responsiveness suffers from organizational complexity.\n• Digital lag — Many legacy firms still operate paper-based or legacy-system workflows that cannot match the speed and transparency clients increasingly expect.\n• Talent dilution — The best advisors within Tier 3 firms are often promoted into management or reassigned across service lines, reducing the consistency of advisory quality at the client level.\n• Pricing opacity — Complex fee structures, undisclosed intermediary markups, and variable pricing across jurisdictions frustrate clients who expect transparent, predictable costs.\n\nBoyar's advantage over Tier 3: Boutique attention, transparent pricing, and modern delivery. Boyar's founder-led model ensures that the person advising on the structure is the person responsible for its execution — an accountability model that large firms cannot replicate.",
  },
];

/* ================================================================ */
/*  COMPETITORS                                                     */
/* ================================================================ */

export const COMPETITORS: CompetitorCard[] = [
  {
    name: "Dixcart",
    founded: "1972",
    positioning: "Family-owned, 7 offices across Crown Dependencies and Europe. Strong in trust administration and private client services.",
    weakness: "No presence in UAE, Singapore, or Asia-Pacific. Limited licensing capability.",
    boyarAdvantage: "MENA/APAC reach via Boyar Network + licensing vertical that Dixcart lacks entirely.",
    fullAnalysis:
      "Dixcart Group has operated for 50+ years as a family-owned TCSP with offices in the Isle of Man, Guernsey, Cyprus, Switzerland, Portugal, Latvia, and the UK. Their strength is deep expertise in traditional trust and corporate structures within European and Crown Dependency jurisdictions.\n\nHowever, Dixcart has not expanded into the markets driving HNWI migration — UAE, Singapore, and the broader Asia-Pacific region. As 142,000 millionaires migrate annually (predominantly toward UAE, Singapore, and Australia), Dixcart's geographic footprint becomes a structural limitation. The firm also has no licensing advisory capability — it cannot advise clients on MiCA compliance, VASP licensing, or EMI authorization.\n\nBoyar's advantage: The Boyar Network provides execution capability across the jurisdictions where Dixcart is absent, while Boyar's licensing vertical captures an entire service category that Dixcart cannot offer. Additionally, Boyar's digital-native delivery model appeals to next-generation clients who find Dixcart's traditional approach outdated.",
  },
  {
    name: "Amicorp",
    founded: "1992",
    positioning: "40+ offices, ~700 employees. Full-service TCSP with global footprint. Broad coverage.",
    weakness: "Bureaucratic processes, legacy systems. 1MDB association still affects brand perception.",
    boyarAdvantage: "Boutique attention and advisory depth. Cleaner brand without institutional baggage.",
    fullAnalysis:
      "Amicorp Group was founded in 1992 and has grown to approximately 700 employees across 40+ offices worldwide. The firm offers a comprehensive range of corporate, trust, fund, and compliance services — making it one of the most geographically diverse TCSPs in the market.\n\nAmicorp's weaknesses are structural: (1) Bureaucratic decision-making — clients report slow response times, complex internal approval processes, and difficulty reaching senior advisors. (2) The 1MDB association — Amicorp's historical involvement with entities connected to the 1MDB scandal, while legally resolved, continues to affect brand perception among compliance-sensitive institutional clients. (3) Commoditized service delivery — Amicorp's scale means that individual client relationships often lack the advisory depth that distinguishes a TCSP from an incorporation factory.\n\nBoyar's advantage: Founder-led advisory where the senior decision-maker is directly accessible to every client. No institutional baggage or compliance history concerns. The ability to offer equivalent jurisdictional coverage through the Boyar Network while maintaining boutique service quality — something Amicorp's institutional model cannot replicate.",
  },
  {
    name: "Astons",
    founded: "1989",
    positioning: "Dubai HQ, strong in CBI (citizenship by investment) and real estate structuring.",
    weakness: "Limited structuring depth. Primarily a CBI and immigration advisory practice.",
    boyarAdvantage: "Full-spectrum TCSP capability vs. Astons' narrow CBI focus.",
    fullAnalysis:
      "Astons was founded in 1989 and is headquartered in Dubai, with a strong presence in citizenship by investment (CBI), residency programs, and real estate advisory. The firm has built its brand around helping HNWIs obtain second passports and establish residency in favorable jurisdictions.\n\nAstons' limitation is narrow service scope: the firm excels at CBI and immigration advisory but lacks the corporate structuring depth required for complex multi-jurisdictional arrangements. A client who obtains a Cyprus or Caribbean passport through Astons still needs a separate advisor for company formation, trust establishment, banking relationships, and regulatory licensing.\n\nBoyar's advantage: Full-spectrum TCSP capability. Boyar can serve the same HNWI client from initial consultation through structure design, entity formation, banking facilitation, regulatory licensing, and ongoing administration — a complete lifecycle that Astons' CBI-focused model cannot match. For clients who have already engaged Astons for immigration, Boyar becomes the natural next-step advisor for corporate structuring.",
  },
  {
    name: "Ocra",
    founded: "1989",
    positioning: "Commodity incorporator. High-volume, low-touch formation services across 18 jurisdictions.",
    weakness: "No advisory capability. Pure formation factory with no client relationships beyond the transaction.",
    boyarAdvantage: "Advisory-first model. Boyar converts 30% of formation inquiries into $9K–$12K structuring mandates.",
    fullAnalysis:
      "Ocra Worldwide is a commodity incorporation firm operating across 18 jurisdictions. The firm's model is transactional: clients select a jurisdiction, pay a formation fee ($800–$2,000), and receive a shelf company or new incorporation with minimal advisory input.\n\nOcra's weakness is the absence of advisory capability. The firm does not assess whether the client's chosen jurisdiction is optimal, does not design multi-jurisdictional structures, and does not provide ongoing corporate services or compliance advisory. Each client interaction is a one-time transaction with no relationship continuity.\n\nBoyar's advantage: The advisory conversion model. Where Ocra processes a $1,500 formation and never speaks to the client again, Boyar's diagnostic approach converts 30% of equivalent formation inquiries into full structuring mandates worth $9K–$12K — a 6–8x revenue multiplier on the same initial inquiry. Moreover, Boyar's ongoing corporate services, compliance monitoring, and banking facilitation create recurring revenue from each client relationship that Ocra's transactional model cannot generate.",
  },
  {
    name: "Rosemont",
    founded: "2010",
    positioning: "Monaco-based boutique. High-end private client services. Luxury positioning.",
    weakness: "Single-jurisdiction concentration. Limited multi-jurisdictional execution capability.",
    boyarAdvantage: "Multi-jurisdictional execution across 53 jurisdictions + licensing capability.",
    fullAnalysis:
      "Rosemont is a Monaco-based boutique advisory firm focused on UHNWI clients. The firm's positioning is ultra-premium: luxury branding, exclusive client events, and personalized advisory relationships. Rosemont excels at serving the Monaco/Riviera UHNWI community with wealth structuring and family office advisory.\n\nRosemont's limitation is geographic concentration. The firm's expertise and relationships are centered on Monaco and, to a lesser extent, Western Europe. Clients with structuring needs in Asia-Pacific, the Middle East, or the Americas must look elsewhere. Additionally, Rosemont has no licensing advisory capability — the firm does not assist with regulatory applications for financial services, crypto, or fund management.\n\nBoyar's advantage: Multi-jurisdictional execution. While Rosemont serves Monaco-based UHNWIs in a single jurisdiction, Boyar's Network enables structuring across 53 jurisdictions — capturing the same UHNWI client segment but with the ability to execute wherever the client's business, investments, or family require. Boyar also brings licensing capability that Rosemont lacks, making Boyar the more comprehensive advisory partner for clients with regulatory needs beyond simple wealth structuring.",
  },
];

/* ================================================================ */
/*  MOATS                                                           */
/* ================================================================ */

export const MOATS: MoatCard[] = [
  {
    key: "advisory",
    title: "Advisory Moat",
    tagline: "Quantitative Rigor as Brand.",
    keyStat: "30% of Formation inquiries → Full Structure = $9K–$12K blended revenue.",
    deepDive:
      "The Advisory Moat is Boyar's foundational competitive advantage. Unlike Tier 1 mass incorporators who process formations as commodity transactions, Boyar begins every client engagement with a diagnostic — analyzing the client's business model, jurisdictional requirements, regulatory exposure, tax position, and long-term objectives.\n\nThis advisory-first approach produces measurable results: 30% of clients who inquire about a simple company formation ($2,500) are converted to full structuring mandates ($29,700) after the diagnostic reveals that their needs require a multi-jurisdictional solution. This 30% conversion rate at $9K–$12K blended revenue per engagement is 4–5x the revenue of a commodity formation.\n\nThe advisory moat compounds over time: every successfully executed complex structure becomes a reference case that attracts similar mandates. Clients who receive genuine advisory value become referral sources — not because Boyar asks for referrals, but because the structuring quality is visibly superior to what competitors deliver. The advisory reputation itself becomes the brand: 'Boyar told me something about my structure that my previous advisor missed' is the highest-value marketing any TCSP can produce.",
  },
  {
    key: "relationship",
    title: "Relationship Moat",
    tagline: "Boutique Exclusivity, Global Reach.",
    keyStat: "Cross-sell at 2.0 services/client = $3M from zero-CAC expansion.",
    deepDive:
      "The Relationship Moat is the economic engine of Boyar's compounding model. Once a client engages Boyar for any service, the advisory relationship creates natural cross-sell opportunities — and these cross-sells have zero incremental client acquisition cost (CAC).\n\nThe math: a single-service client (e.g., formation only) generates $2,500 in Year 1 and $1,750 in annual renewals. A multi-service client (formation + corporate services + banking facilitation) generates $12,000+ in Year 1 and $5,000+ in annual renewals. The cross-sell multiplier at 2.0 services per client (the Year 3 target) generates approximately $3M in cumulative revenue from zero-CAC expansion of existing client relationships.\n\nThe relationship moat is reinforced by Boyar's boutique model: the founder personally knows every client, understands their business evolution, and proactively identifies structuring needs before the client articulates them. This cannot be replicated by firms where relationship managers change every 18–24 months or where client accounts are managed by junior associates with limited advisory authority.",
  },
  {
    key: "licensing",
    title: "Licensing Moat",
    tagline: "Category Creation.",
    keyStat: "Single $75K VASP mandate → $150K–$200K lifecycle cascade.",
    deepDive:
      "The Licensing Moat is Boyar's highest-margin, highest-barrier-to-entry service vertical. Regulatory licensing (MiCA CASP authorization, VASP registration, EMI licensing, fund management licenses) requires deep expertise in both regulatory frameworks and corporate structuring — the exact intersection where Boyar operates.\n\nThe economics are compelling: a single VASP licensing mandate generates approximately $75K in initial advisory and application fees. But the lifecycle revenue cascade is where the real value compounds: the client needs a corporate structure ($5K–$15K), a registered office ($1,500–$3,000/year), ongoing compliance monitoring ($15K–$25K/year), banking relationships ($6,500), and annual regulatory filings ($5K–$10K/year). Total lifecycle revenue from a single licensing mandate: $150K–$200K over 3 years.\n\nThe licensing moat is difficult to replicate because it requires three capabilities simultaneously: (1) regulatory expertise to design compliant applications, (2) structuring expertise to build the corporate architecture required by regulators, and (3) jurisdictional relationships to navigate the application process with specific regulatory bodies. Tier 1 firms lack the regulatory expertise. Tier 3 firms have the expertise but are slow and expensive. Boyar combines all three at a price point and response time that neither tier can match.",
  },
  {
    key: "experience",
    title: "Experience Moat",
    tagline: "Digital-Native, Next-Gen Ready.",
    keyStat: "Modern delivery captures inheritors: 81% plan to switch firms.",
    deepDive:
      "The Experience Moat addresses a structural shift in client expectations. Next-generation wealth holders (millennials and Gen Z inheritors managing $83.5 trillion in transferred wealth) expect advisory services delivered with the same quality of digital experience they receive from consumer technology companies.\n\nLegacy TCSPs — operating on paper files, manual processes, and email-only communication — are structurally unable to meet these expectations without multi-million-dollar technology transformations. Boyar is built digital-native from inception: structured data pipelines, real-time client dashboards, digital document management, and responsive multi-channel communication.\n\nThe experience moat compounds as client expectations continue to rise. Every year, the gap between what next-gen clients expect and what legacy TCSPs deliver widens. Boyar's technology-forward approach means the firm can adopt new tools and platforms (AI-assisted compliance monitoring, automated regulatory reporting, client communication platforms) without the legacy-system integration burden that slows Tier 3 competitors.",
  },
  {
    key: "renewal",
    title: "Renewal Flywheel",
    tagline: "Compounding Revenue.",
    keyStat: "73 entities by Y5 → $128K+ annual recurring at 90%+ margin.",
    deepDive:
      "The Renewal Flywheel is the mathematical proof of Boyar's compounding model. Every entity formed, every structure established, every license obtained generates recurring annual revenue: registered office fees, annual filings, compliance monitoring, corporate secretarial services, and regulatory reporting.\n\nBy Year 5, the projected entity base is 73 active entities under administration. Each entity generates $1,750–$3,500 in annual recurring revenue for administration and compliance services. At 90%+ gross margin (recurring administration is low-marginal-cost work once systems are established), this creates a revenue floor of $128K+ annually that compounds as each new year adds more entities to the base.\n\nThe renewal flywheel has a second-order effect: clients whose entities are under Boyar administration are the primary source of cross-sell revenue. A client whose Cyprus holding company is administered by Boyar is the natural first call when that client needs a Singapore subsidiary, a trust arrangement, or a banking introduction. The administration relationship becomes the platform for ongoing advisory revenue.",
  },
  {
    key: "network",
    title: "Boyar Network",
    tagline: "Geographic Moat.",
    keyStat: "100+ vetted partners → 53 jurisdictions.",
    deepDive:
      "The Boyar Network is a curated ecosystem of vetted professional service partners — law firms, accounting firms, registered agents, compliance consultants, and banking introducers — spanning 53 jurisdictions worldwide.\n\nUnlike franchise networks or affiliate programs, the Boyar Network is built on bilateral quality standards: every partner is vetted against Boyar's compliance criteria (AML/CFT procedures, professional indemnity insurance, regulatory standing, reference checks), and every partner's work is quality-reviewed by Boyar before delivery to the end client.\n\nThe network creates a geographic moat: a new entrant attempting to replicate Boyar's multi-jurisdictional capability would need to identify, vet, negotiate terms with, and operationally integrate 100+ partners across 53 jurisdictions — a process that took Boyar 3–5 years of active relationship building.\n\nThe network also generates deal flow: as network partners become familiar with Boyar's advisory capabilities, they begin referring their own clients to Boyar for complex structuring needs that exceed their local expertise. This referral dynamic reverses the typical TCSP model (where the firm sends work outbound to partners) and creates an inbound deal flow channel with zero marketing cost.",
  },
  {
    key: "multi",
    title: "Multi-Vertical Architecture",
    tagline: "Wallet Share Moat.",
    keyStat: "Single-vertical: $18K 3yr LTV vs Multi-vertical: $69K 3yr LTV.",
    deepDive:
      "The Multi-Vertical Architecture is Boyar's structural response to the fundamental economics of TCSP advisory: client acquisition is expensive, but cross-selling to existing clients is nearly free.\n\nBoyar operates across six service verticals: Company Formation & Structuring, Corporate Services & Administration, Regulatory Licensing, Banking Facilitation, Trust & Estate Planning, and Fund Administration. Each vertical can independently acquire and serve clients, but the compounding magic happens when a client engages across multiple verticals.\n\nThe economics: a single-vertical client (formation only) generates $18K in 3-year lifetime value (initial fee + 2 years of renewal). A multi-vertical client (formation + corporate services + banking + licensing) generates $69K in 3-year lifetime value — a 3.8x multiplier with zero incremental acquisition cost.\n\nThe multi-vertical architecture creates a wallet share moat: once a client is engaged across 3+ verticals, the switching cost becomes prohibitive. Moving to a competitor would require transferring corporate administration, regulatory filings, banking relationships, and compliance monitoring simultaneously — a disruption that most clients will not undertake unless the alternative firm offers dramatically superior service (which, given Boyar's advisory quality, is unlikely).",
  },
];

/* ================================================================ */
/*  RISKS                                                           */
/* ================================================================ */

export const RISKS: RiskCard[] = [
  {
    key: "founder",
    title: "Single-Founder Dependency",
    summary: "Execution risk if the core founder is constrained.",
    severity: "high",
    mitigant:
      "The single-founder model is a deliberate Year 1–2 design choice, not an oversight. Mitigants: (1) Phased hiring plan — first associate in Year 2, structured team by Year 3. (2) Deliberate pacing — client acquisition is limited to match execution capacity, preventing quality degradation. (3) Process documentation — every client workflow is documented in sufficient detail that a trained associate can execute it. (4) Insurance — key person insurance and professional indemnity coverage from inception. (5) Boyar Network — partner firms can absorb client administration if the founder is temporarily unavailable. The goal is to make the founder's personal involvement a quality differentiator in Year 1, not a single point of failure by Year 3.",
  },
  {
    key: "mica",
    title: "MiCA Timeline Shifts",
    summary: "Regulatory delays can defer category demand.",
    severity: "high",
    mitigant:
      "MiCA enforcement is already in progress — the regulation entered into force in June 2023, with CASP authorization requirements taking effect July 1, 2026. While transition periods could be extended, the regulatory infrastructure is deployed and irreversible. Mitigants: (1) Boyar's revenue model is not MiCA-dependent — formation, structuring, and corporate services generate baseline revenue independent of any single regulatory event. (2) Even if the MiCA deadline shifts by 6–12 months, the licensing demand doesn't disappear — it defers. Clients who need VASP authorization will need it eventually. (3) Boyar is building licensing capability for multiple regulatory categories (EMI, fund management, insurance intermediation) across multiple jurisdictions — diversifying beyond any single regulatory catalyst. The worst-case scenario: MiCA licensing revenue shifts from Year 2 to Year 3, reducing Year 2 revenue by $150K–$300K but not threatening the firm's viability.",
  },
  {
    key: "concentration",
    title: "Client Concentration",
    summary: "Revenue may over-index to a small cohort of mandates.",
    severity: "medium",
    mitigant:
      "Client concentration is a mathematical inevitability in Year 1–2 (small client base, high-value mandates). Mitigants: (1) Target no single client exceeding 15% of annual revenue by Year 3, and 10% by Year 5. (2) Actively diversify the pipeline across service lines (formation, structuring, licensing, corporate services) and client segments (HNWI families, crypto firms, traditional corporates). (3) Build recurring revenue (corporate services renewals) that provides a diversified revenue base independent of any single mandate. (4) Maintain pipeline discipline — even when a large mandate is tempting, ensure that smaller mandates continue to flow to prevent concentration creep.",
  },
  {
    key: "banking",
    title: "Banking Relationship Fragility",
    summary: "Partner gating can temporarily limit throughput.",
    severity: "medium",
    mitigant:
      "Banking relationships are the most fragile link in the TCSP value chain. Banks may change policies, exit client segments, increase due diligence requirements, or terminate TCSP relationships with minimal notice. Mitigants: (1) Maintain 3–5 banking relationships per key jurisdiction — no single banking partner should be a bottleneck. (2) Build the Boyar Network's banking referral capacity so that banking facilitation is distributed across multiple network partners, not concentrated in Boyar's direct relationships. (3) Develop relationships with digital banks and fintech banking platforms that are more receptive to TCSP-introduced clients. (4) Provide banking partners with consistently high-quality due diligence packages, reducing their compliance burden and making Boyar a preferred introduction source.",
  },
  {
    key: "competitive",
    title: "Competitive Pressure",
    summary: "Institutional players can move quickly into adjacent niches.",
    severity: "medium",
    mitigant:
      "Competitive threats come from two directions: (1) Tier 1 mass incorporators moving upmarket into advisory structuring. (2) Tier 3 legacy firms investing in digital delivery and licensing capability. Mitigants: (1) The advisory moat — genuine advisory conversion (30% of formation inquiries → full structures) requires expertise and credibility that cannot be bought or quickly built. (2) The licensing moat — MiCA/VASP licensing capability requires deep regulatory knowledge that takes years to develop. (3) The relationship moat — founder-led client relationships with direct access to senior decision-makers cannot be replicated by institutional firms with rotating relationship managers. (4) Speed advantage — by the time competitors recognize and respond to Boyar's positioning, the firm will have 3–5 years of executed mandates, established relationships, and compounding brand equity.",
  },
  {
    key: "regulatory",
    title: "Regulatory Changes",
    summary: "Enforcement intensity shifts can reshape compliance cost.",
    severity: "high",
    mitigant:
      "Regulatory risk is bidirectional: increased enforcement creates advisory demand (positive for Boyar), while regulatory relaxation could reduce compliance obligations and advisory budgets (negative). Mitigants: (1) Boyar's advisory model is regulation-agnostic — the firm helps clients comply with whatever framework applies, rather than betting on any specific regulatory outcome. (2) The trend is unidirectional toward more regulation, more categories, and more compliance requirements. Even in jurisdictions that relax specific rules, the overall compliance surface area continues to expand. (3) Boyar's geographic diversification across 53 jurisdictions means that regulatory changes in any single jurisdiction affect only a portion of the client base. (4) The firm's advisory positioning actually benefits from regulatory uncertainty — clients need more advisory support during periods of regulatory change, not less.",
  },
];

/* ================================================================ */
/*  REVENUE MATURITY SEGMENTS                                       */
/* ================================================================ */

export const REVENUE_MATURITY_SEGMENTS: RevenueMaturitySegment[] = [
  { key: "corporate", label: "Corporate Services", pct: 30, color: "#f472b6" },
  { key: "structuring", label: "Structuring & Trust", pct: 25, color: "#38bdf8" },
  { key: "licensing", label: "Licensing", pct: 20, color: "#facc15" },
  { key: "banking", label: "Banking", pct: 10, color: "#c084fc" },
  { key: "fundAdmin", label: "Fund Admin", pct: 10, color: "#f87171" },
  { key: "estate", label: "CBI/Estate", pct: 5, color: "#34d399" },
  { key: "other", label: "Other", pct: 0, color: "#0ea5e9" },
];

/* ================================================================ */
/*  AMBITION — PART V                                               */
/* ================================================================ */

export const AMBITION_PART_V = {
  heading: "WHAT AMBITION LOOKS LIKE",
  line: "A firm where the partner who structures your holding company in Singapore is the same person who introduces you to the private banker in Geneva and advises on your family trust in New Zealand.",
  stats: [
    { value: 200, suffix: "+", label: "active clients" },
    { value: 53, suffix: "", label: "jurisdictions" },
    { value: 0, suffix: "", label: "$10M–$15M revenue", display: "$10M–$15M" },
    { value: 60, suffix: "%+", label: "recurring revenue" },
    { value: 100, suffix: "+", label: "network partners" },
  ] as { value: number; suffix: string; label: string; display?: string }[],
  finalLine: "Not a hockey stick — a compound curve.",
  closing: "The kind that looks modest in Year 1, impressive by Year 3, and inevitable by Year 7.",
  fullText:
    "Part V: What Ambition Looks Like\n\nThis is not a pitch about disruption. Boyar Partners is not trying to replace the advisory industry — it is trying to earn a permanent, compounding position within it.\n\nThe ambition is specific: build a firm where the partner who structures your holding company in Singapore is the same person who introduces you to the private banker in Geneva and advises on your family trust in New Zealand. A firm where the advisory relationship compounds across jurisdictions, across services, and across generations.\n\nAt maturity, Boyar Partners will manage 200+ active client relationships across 53 jurisdictions, generating $10M–$15M in annual revenue with 60%+ recurring. The Boyar Network of 100+ vetted partners will function as a distributed advisory platform — each partner contributing jurisdictional expertise while Boyar maintains the client relationship, the advisory standard, and the compliance framework.\n\nThe revenue architecture at maturity is deliberately diversified: Corporate Services (30%), Structuring & Trust (25%), Licensing (20%), Banking (10%), Fund Administration (10%), CBI/Estate Planning (5%). No single vertical dominates. Revenue concentration risk gets systematically diversified by Year 5.\n\nThis is not a hockey stick projection. It is a compound curve — the kind that looks modest in Year 1, impressive by Year 3, and inevitable by Year 7. The kind that rewards patience, discipline, and relentless execution across every client relationship, every jurisdiction, and every regulatory category.\n\nThe firms that defined the TCSP industry — Sovereign, Asiaciti, Vistra — all started exactly this way. They picked a jurisdiction, built a reputation, and expanded concentrically. They compounded client relationships over decades. They became the institutional backbone for cross-border commerce in their era.\n\nBoyar Partners intends to do the same. The only question is not whether the model works — the model has been proven by every firm that came before. The question is whether this team, in this market, at this moment, can execute with the discipline required to compound. The trajectory plan says yes. The next seven years will prove it.",
};
