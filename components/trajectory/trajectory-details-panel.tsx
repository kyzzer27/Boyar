"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TrajectoryDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialYearIndex: number; // 0 to 4
}

const YEAR_TABS = [
  { id: "year1", label: "Year 1" },
  { id: "year2", label: "Year 2" },
  { id: "year3", label: "Year 3" },
  { id: "year45", label: "Year 4–5" },
  { id: "year67", label: "Year 6–7" },
];

const SUBTABS: Record<string, { id: string; label: string }[]> = {
  year1: [
    { id: "y1-overview", label: "Overview" },
    { id: "y1-acquisition", label: "Acquisition & Operations" },
    { id: "y1-defensibility", label: "Defensibility" },
    { id: "y1-gates", label: "Gates & KPIs" },
  ],
  year2: [
    { id: "y2-overview", label: "Overview" },
    { id: "y2-operations", label: "Operations" },
    { id: "y2-defensibility", label: "Defensibility" },
    { id: "y2-gates", label: "Revenue & Gates" },
  ],
  year3: [
    { id: "y3-overview", label: "Overview" },
    { id: "y3-operations", label: "Operations" },
    { id: "y3-defensibility", label: "Compounding Moats" },
    { id: "y3-gates", label: "Revenue & Gates" },
  ],
  year45: [
    { id: "y45-overview", label: "Overview" },
    { id: "y45-operations", label: "Operations" },
    { id: "y45-maturity", label: "Maturity" },
    { id: "y45-gates", label: "Revenue & Gates" },
  ],
  year67: [
    { id: "y67-overview", label: "Overview" },
    { id: "y67-operations", label: "Team & Structure" },
    { id: "y67-gates", label: "Revenue & KPIs" },
  ],
};

export function TrajectoryDetailsPanel({
  isOpen,
  onClose,
  initialYearIndex,
}: TrajectoryDetailsPanelProps) {
  // Derive the starting year and subtab synchronously from the prop so the
  // very first render already has valid content (instead of a blank flash
  // from activeSubtab === "").
  const safeIndex =
    initialYearIndex >= 0 && initialYearIndex < YEAR_TABS.length
      ? initialYearIndex
      : 0;
  const [activeYear, setActiveYear] = useState(
    () => YEAR_TABS[safeIndex].id
  );
  const [activeSubtab, setActiveSubtab] = useState(
    () => SUBTABS[YEAR_TABS[safeIndex].id][0].id
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Update active year when panel opens with a different index
  useEffect(() => {
    if (isOpen && initialYearIndex >= 0 && initialYearIndex < YEAR_TABS.length) {
      const yearId = YEAR_TABS[initialYearIndex].id;
      setActiveYear(yearId);
      setActiveSubtab(SUBTABS[yearId][0].id);
    }
  }, [isOpen, initialYearIndex]);

  // Ensure subtab is valid when year changes
  useEffect(() => {
    setActiveSubtab(SUBTABS[activeYear][0].id);
  }, [activeYear]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when open + reset panel scroll to top
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset panel scroll to top so content is visible
      requestAnimationFrame(() => {
        panelRef.current?.scrollTo({ top: 0 });
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialYearIndex]);

  const scrollToTabs = () => {
    const el = document.getElementById("trajectory-detail-header");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
            style={{ zIndex: 99998 }}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
            ref={panelRef}
            className="fixed top-0 bottom-0 right-0 w-full shadow-2xl overflow-y-auto"
            style={{
              zIndex: 99999,
              backgroundColor: "#FDFBEE",
              color: "#1a1a1a",
              fontFamily: "'Avenir', 'Inter', sans-serif",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="trajectory-panel-wrapper min-h-full pb-20 relative">
              
              <button
                onClick={onClose}
                className="fixed top-4 right-6 z-[220] flex h-10 w-10 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                style={{ color: "#000" }}
              >
                ✕
              </button>

              <header className="header" id="trajectory-detail-header">
                <div className="header-inner z-[150] pr-20">
                  <div className="logo">
                    BOYAR <span className="red">PARTNERS</span>
                  </div>
                  <div className="header-subtitle hidden sm:block">
                    Strategic Trajectory — Part II
                  </div>
                </div>
              </header>

              <section className="hero">
                <div className="hero-label">Part II — Investor Document</div>
                <h1>
                  The Boyar Trajectory<br />
                  <span className="red">Year by Year</span>
                </h1>
                <p>
                  From foundation to platform. A seven-year strategic trajectory built
                  on licensing-led differentiation, structural complexity as lock-in,
                  and deliberate service of the clients the industry ignores.
                </p>
              </section>

              <nav className="tabs-container">
                <div className="tabs">
                  {YEAR_TABS.map((tab) => (
                    <div
                      key={tab.id}
                      className={`tab ${activeYear === tab.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveYear(tab.id);
                        scrollToTabs();
                      }}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>
              </nav>

              <nav className="subtabs-container">
                <div className="subtabs">
                  {SUBTABS[activeYear]?.map((sub) => (
                    <div
                      key={sub.id}
                      className={`subtab ${activeSubtab === sub.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveSubtab(sub.id);
                        // Optional scroll to content
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              </nav>

              <main className="content-area pt-12">
                {/* Year 1 */}
                {activeYear === "year1" && (
                  <section className="year-section active">
                    {activeSubtab === "y1-overview" && (
                      <div className="sub-section active">
                        <div className="year-header">
                          <h2>
                            Year 1 (2025)<br />Foundation & <span className="red">Proof of Concept</span>
                          </h2>
                          <div className="objective">
                            Establish operational credibility. Prove unit economics. Build the first 15–20 client relationships.
                          </div>
                        </div>
                        <div className="stats-row">
                          <div className="stat-card">
                            <div className="stat-label">Revenue Target</div>
                            <div className="stat-value accent">~$112K</div>
                          </div>
                          <div className="stat-card">
                            <div className="stat-label">Headcount</div>
                            <div className="stat-value">1 FTE</div>
                          </div>
                          <div className="stat-card">
                            <div className="stat-label">Jurisdictions</div>
                            <div className="stat-value">8–10</div>
                          </div>
                          <div className="stat-card">
                            <div className="stat-label">Target Clients</div>
                            <div className="stat-value">15–20</div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="block-title">Active Service Lines</div>
                          <p>
                            Company Formation, Full Structure (cross-border), Standalone Trust, Corporate Services, Office Registration, Banking Introductions.
                          </p>
                        </div>
                        <div className="block">
                          <div className="block-title">Who Does the Work</div>
                          <p>
                            Year 1 is entirely founder-led. The founder handles all business development, client advisory, structuring decisions, and strategic relationships. Operational tasks — compliance filings, document preparation, basic bookkeeping — are outsourced to vetted freelancers and virtual assistants. No full-time hires. Key person insurance is secured in Year 1.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSubtab === "y1-acquisition" && (
                      <div className="sub-section active">
                        <div className="block">
                          <div className="block-title">How the First 15–20 Clients Actually Come In</div>
                          <p>
                            The realistic Year 1 acquisition model breaks down as: approximately 40% from the founder's existing professional network and warm referrals — people who already know the founder's work and will trust the new firm on the basis of personal reputation. 30% from paid digital marketing — the $17K paid media experiment targeting "company formation UAE," "VASP license EU," "offshore trust formation" across LinkedIn and Google Ads in 5 regions. This experiment isn't just about generating leads — it's about discovering which channels produce clients that convert to multi-service relationships, not just one-off formations. 20% from referral partnerships with law firms and accountants who serve the same client profile but don't offer formation or structuring services. 10% from organic content — jurisdiction comparison guides, regulatory analysis pieces, LinkedIn thought leadership — that positions the founder as a subject-matter authority.
                          </p>
                        </div>
                        <div className="two-col">
                          <div className="block">
                            <div className="block-title">How Jurisdictions Get Activated</div>
                            <p>
                              "Activating" a jurisdiction doesn't mean putting it on a website. It means building a functioning relationship chain: client need → Boyar advisory → local partner execution → banking access. For each of the initial 8–10 jurisdictions (UAE, UK, Singapore, BVI, Cayman, Malta, Cyprus, Hong Kong), Boyar identifies the 2–3 most common structuring needs in that market. UAE means freezone company formation plus holding structure plus banking. BVI means holding company for Asian clients plus registered agent. Singapore means private limited company plus employment pass plus banking. Boyar then vets and formalizes one local partner and one banking contact in each jurisdiction. Until that chain works end-to-end — formation, governance, banking — the jurisdiction isn't truly active.
                            </p>
                          </div>
                          <div className="block">
                            <div className="block-title">How Referral Partnerships Get Built</div>
                            <p>
                              The approach is not to cold-email 50 law firms. Boyar identifies 3–5 mid-tier firms in target jurisdictions that serve the same client profile (entrepreneurs, fintech founders, HNWIs relocating) but don't offer corporate formation or licensing. The firm proposes a structured reciprocal arrangement: the law firm refers the formation and structuring mandate to Boyar, Boyar refers back the legal work that arises from the structure — shareholder agreements, employment contracts, IP assignments, regulatory filings. It's reciprocal, not extractive. This is precisely how Sovereign built its early network — mutual referral with professionals who served the same client but offered complementary services.
                            </p>
                          </div>
                        </div>
                        <div className="block">
                          <div className="block-title">Digital Infrastructure as Differentiator</div>
                          <p>
                            Boyar builds a modern client-facing experience from day one — streamlined onboarding, structured advisory workflows, real-time communication, and clear reporting on engagement progress. This isn't a technology product; it's the baseline client experience that next-gen HNWIs and digital-economy entrepreneurs expect. The institutional quality of the advisory process — data-driven jurisdiction recommendations, structured comparison frameworks, clear governance documentation — signals from the first interaction that this is not a commodity incorporator.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSubtab === "y1-defensibility" && (
                      <div className="sub-section active">
                        <div className="block">
                          <div className="block-title">What Makes Boyar Defensible</div>
                          <p>
                            Year 1 has no moat in the traditional sense. Any established TCSP could replicate every service Boyar offers, serve the same clients more credibly, and do it with deeper banking relationships and more jurisdiction coverage. Pretending otherwise would be dishonest. What Year 1 does is establish two structural advantages that are real from the first engagement and that compound into genuine defensibility by Year 3.
                          </p>
                        </div>
                        <div className="moat-card">
                          <h4>The client profile nobody else wants to <span className="red">serve properly.</span></h4>
                          <p>
                            Three types of firms exist in cross-border structuring. Mass incorporators — 1st Formations, Offshore Company, BBCIncorp, Healy Consultants — who form entities fast and cheap but don't advise, don't structure, and don't care if the client's holding company is in the wrong jurisdiction for their treaty network. Law firms and legacy boutiques — Appleby, Carey Olsen, Walkers — who structure carefully and advise properly but charge $500–$1,000/hour because structuring is ancillary to their legal practice, not their core business. And established TCSPs — Sovereign, Amicorp, Dixcart, Vistra — who do both but are built for the $50M+ family, the listed company subsidiary, the private equity fund, and deprioritize the entrepreneur with $2M going cross-border for the first time.
                          </p>
                          <p>
                            Boyar deliberately builds its entire practice around the clients who fall between these three — HNWIs worth $2M–$20M, first-time cross-border entrepreneurs, crypto and fintech founders pre-Series A, iGaming operators setting up their first licensed entity, forex brokers, payment companies, clients with genuine structuring complexity but ticket sizes that don't justify law firm rates and risk profiles that make legacy TCSPs reluctant. These clients are underserved not because they're unprofitable but because legacy firms' compliance departments flag them, law firms overcharge them, and mass incorporators lack the competence to serve them. From the first client conversation in Year 1, Boyar is competing in a space where nobody else is trying to win.
                          </p>
                        </div>
                        <div className="moat-card">
                          <h4>Compliance architecture as a <span className="red">standard deliverable.</span></h4>
                          <p>
                            At a law firm, every compliance dimension of a cross-border structure is billed separately — substance requirements analysis is a memo at 5 billable hours, CRS reporting obligations are a separate engagement letter, POEM risk assessment is another invoice, economic substance documentation is another fee. The client pays $30K–$50K in legal fees on top of the structuring fee just to understand what their structure actually requires of them on an ongoing basis. At a mass incorporator, compliance doesn't exist at all — they hand over the formation certificate and the client is entirely alone figuring out whether they need economic substance in BVI, whether their UAE freezone company triggers POEM in India, whether the Singapore holding creates a permanent establishment somewhere they didn't expect, whether their structure is CRS-reportable in six jurisdictions simultaneously.
                          </p>
                          <p>
                            Boyar builds compliance mapping into every structuring engagement as standard. When the structure is designed, the client receives not just entity formation documents but a complete compliance calendar — what needs to be filed, where, when, and the consequences of missing it. Annual substance requirements, CRS/FATCA reporting obligations, beneficial ownership declarations, tax filing deadlines across every jurisdiction in the structure. The law firm charges separately for each piece. The mass incorporator doesn't offer it. Boyar delivers it as the baseline, and the client who has experienced this once — who has actually held a document that tells them exactly what their structure demands of them across every jurisdiction — will never go back to a provider that hands them a certificate and wishes them luck.
                          </p>
                        </div>
                        <div className="future-moats">
                          <h4>What Year 1 Is Building Toward</h4>
                          <p>
                            Three additional moats are being seeded in Year 1 that become genuinely defensible only once completed mandates prove them out. Licensing as a core service line — not an add-on or referral, but the primary high-value entry point that cascades into the full corporate services stack — seeds with every licensing conversation in Year 1 but doesn't become a moat until 3–5 mandates are completed by end of Year 2. The banking-as-a-service capability — not just introductions but banker-ready application packages structured to what specific banks' compliance teams expect, dramatically increasing approval rates — seeds with every banking relationship established in Year 1 but doesn't become a moat until a track record of successful account openings exists. And the high-risk client compliance framework — the robust onboarding and servicing infrastructure that makes Boyar the firm that crypto, iGaming, and forex clients can actually go to when everyone else has rejected them — seeds with every compliance workflow built in Year 1 but doesn't become a moat until those workflows have been tested and proven through actual client engagements. Year 1 plants all three. Years 2–3 prove them. By Year 4, they're the reason Boyar can't be replicated by a new entrant.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSubtab === "y1-gates" && (
                      <div className="sub-section active">
                        <div className="block"><div className="block-title">Decision Gates</div></div>
                        <div className="gates">
                          <div className="gate">
                            <div className="gate-number">Gate 1</div>
                            <div className="gate-text">First 5 paying clients secured within 6 months → triggers activation of paid media spend in remaining regions</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 2</div>
                            <div className="gate-text">3+ referral partnerships formalized → triggers expansion of jurisdiction coverage beyond initial 8–10</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 3</div>
                            <div className="gate-text">CAC validated at ≤$2,500 per client across at least 2 regions → triggers Year 2 marketing budget allocation</div>
                          </div>
                          <div className="gate-fallback">If Gate 1 is not met by month 8, pivot marketing strategy before increasing spend.</div>
                        </div>
                        <div className="block"><div className="block-title">Key Performance Indicators</div></div>
                        <div className="kpi-grid">
                          <div className="kpi"><div className="kpi-label">CAC</div><div className="kpi-value">≤ $2,500</div></div>
                          <div className="kpi"><div className="kpi-label">Revenue / Client</div><div className="kpi-value">≥ $5,600</div></div>
                          <div className="kpi"><div className="kpi-label">Pipeline Conversion</div><div className="kpi-value">≥ 15%</div></div>
                          <div className="kpi"><div className="kpi-label">Gross Margin</div><div className="kpi-value">≥ 55%</div></div>
                          <div className="kpi"><div className="kpi-label">Referral Partners</div><div className="kpi-value">3–5</div></div>
                        </div>
                        <div className="closing">
                          <h3>What Boyar Will Be <span className="red">Known For</span> at End of Year 1</h3>
                          <p>
                            The firm that actually structures, not just incorporates. Clients will talk about the difference between what they expected — a company formation — and what they received — a complete structural architecture with compliance mapping, banking preparation, and an advisor who understood their specific situation rather than running a template. That gap between expectation and delivery is what generates the referrals that build Year 2.
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Year 2 */}
                {activeYear === "year2" && (
                  <section className="year-section active">
                    {activeSubtab === "y2-overview" && (
                      <div className="sub-section active">
                        <div className="year-header">
                          <h2>
                            Year 2 (2026)<br />Vertical Expansion & <span className="red">Licensing Revenue</span>
                          </h2>
                          <div className="objective">
                            Activate the licensing vertical. Double the client base through renewals + new acquisition. Begin fund administration partnerships.
                          </div>
                        </div>
                        <div className="stats-row">
                          <div className="stat-card"><div className="stat-label">Revenue (Base)</div><div className="stat-value accent">$500K–$750K</div></div>
                          <div className="stat-card"><div className="stat-label">Headcount</div><div className="stat-value">2 FTE + 1 PT</div></div>
                          <div className="stat-card"><div className="stat-label">New Clients</div><div className="stat-value">20–25</div></div>
                          <div className="stat-card"><div className="stat-label">Licensing Avg.</div><div className="stat-value">$75K+</div></div>
                        </div>
                        <div className="block"><div className="block-title">New Service Lines</div></div>
                        <div className="service-grid">
                          <div className="service-item"><h5>Crypto / VASP Licensing</h5><p>MiCA's July 2026 deadline creates a hard demand cliff. Engagements run $50K–$500K.</p></div>
                          <div className="service-item"><h5>iGaming Licensing</h5><p>Curacao's new B2B/B2C model, Malta Gaming Authority, Isle of Man.</p></div>
                          <div className="service-item"><h5>EMI / MSB / Forex</h5><p>Payment institutions and MSBs need formation + licensing + banking in parallel.</p></div>
                          <div className="service-item"><h5>Citizenship & Residency</h5><p>Caribbean CBI programs, Portugal Golden Visa alternatives, UAE residency.</p></div>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y2-operations" && (
                      <div className="sub-section active">
                        <div className="two-col">
                          <div className="block">
                            <div className="block-title">How the Licensing Vertical Gets Built</div>
                            <p>The firm does not wait for MiCA-panicked founders to find it through search. Boyar goes where they already are: crypto conferences (Token2049, EBC, Consensus), fintech communities (startup accelerators in Lisbon, Berlin, Dubai), and Web3 legal forums. The firm publishes a definitive MiCA compliance guide — jurisdiction-by-jurisdiction comparison, timeline, capital requirements, governance checklist — and distributes it through the channels where crypto founders consume content. That guide becomes the top-of-funnel: a founder downloads it, sees the depth, and reaches out for a consultation. The first 2–3 licensing mandates come from the crypto/fintech ecosystem, not from Google Ads.</p>
                            <p>Once the first mandates are completed, case studies and referrals drive subsequent deal flow. A crypto exchange founder who gets licensed through Boyar tells two other founders. In a concentrated industry like crypto, reputation compounds faster than in traditional corporate services.</p>
                          </div>
                          <div className="block">
                            <div className="block-title">How Fund Admin Partnerships Work</div>
                            <p>Boyar identifies 2–3 established fund administrators already operating in target jurisdictions (Cayman, Luxembourg, Singapore). The partnership structure: Boyar owns the client relationship and the structuring mandate (holding company formation, SPV setup, governance documentation). The fund admin partner handles NAV calculations, investor reporting, and compliance monitoring. Boyar earns a referral fee — typically 15–25% of the ongoing admin fee — plus retains the corporate services mandate for the fund's SPV structure. The fund admin partner gets a new client without acquisition cost. This is a genuine win-win and precisely how most boutique TCSPs enter fund administration before building in-house capability.</p>
                          </div>
                        </div>
                        <div className="block">
                          <div className="block-title">How Renewals Compound</div>
                          <p>The renewal flywheel is not automatic — it requires a deliberate retention process. Every Company Formation client gets a 90-day post-formation check-in (is the bank account working? any compliance issues?), a 6-month review (do additional services make sense — registered office, corporate secretarial, accounting?), and a 10-month renewal reminder with a clear scope of what's included. The cross-sell happens naturally in these touchpoints — a client who formed a company in UAE mentions they're now looking at Singapore, or needs a trust for family assets, or their startup just closed a seed round and the holding structure needs restructuring for the new cap table. The renewal isn't just an invoice — it's a relationship maintenance cycle that generates organic cross-sell at zero additional acquisition cost.</p>
                          <p>Every Year-1 Company Formation client renewing generates ~$1,500–$2,000 in annual recurring revenue at 90%+ gross margin. By Year 2, there are 8+ renewal streams running in parallel with zero acquisition cost. Layer in corporate services renewals, trust administration fees, and registered office charges — the recurring base starts to feel like a SaaS business, except with higher margins.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y2-defensibility" && (
                      <div className="sub-section active">
                        <p>Year 1's two structural advantages — the underserved client profile and compliance architecture as standard — continue compounding. But Year 2 is where three additional moats stop being aspirational and become real, because completed mandates now prove them out.</p>
                        <div className="moat-card">
                          <h4>Licensing as <span className="red">core business,</span> not an add-on.</h4>
                          <p>Licensing is a primary revenue generator and highest-value client acquisition channel. The mass incorporators (BBCIncorp, etc.) can't do this because they don't understand the law. The legacy TCSPs (Sovereign, Amicorp) try to do it but treat it as a secondary, low-volume service line.</p>
                          <p>The first 2–4 completed mandates prove Boyar understands what a specific regulator actually wants — not what the law says, but exactly how to build the governance documentation for Lithuania or clear the 6-week pre-review for Malta GMA. That experiential knowledge is proprietary.</p>
                        </div>
                        <div className="moat-card">
                          <h4>The licensing-to-structure <span className="red">cascade.</span></h4>
                          <p>A single VASP licensing mandate at $75K generates $150K–$200K in total lifecycle revenue through cascaded services (formation fee, holding company setup, governance/director retainer, banking introductions, annual compliance, second jurisdiction expansion). No legacy TCSP has this built comprehensively as a unified delivery model.</p>
                        </div>
                        <div className="moat-card">
                          <h4>High-risk compliance framework becomes <span className="red">proven.</span></h4>
                          <p>The Year 1 workflows have been tested under actual scrutiny. The VASP founder rejected by three TCSPs finds a firm that can get them structured, licensed, and banked. That client's retention approaches 95%+ because their switching cost is existential, not financial. Finding another provider willing and able to take on their entire complex array of entities is highly improbable.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y2-gates" && (
                      <div className="sub-section active">
                        <div className="block"><div className="block-title">Revenue — Three Scenarios</div></div>
                        <p className="mb-6 text-[13px] text-[#7a7a7a] font-medium leading-[1.6]">In all three scenarios, Boyar remains profitable due to its lean cost structure. The variable is pace, not survival.</p>
                        <div className="scenarios">
                          <div className="scenario"><div className="scenario-label">Bear</div><div className="scenario-value">$250K–$400K</div><div className="scenario-desc">MiCA delays reduce licensing urgency + slower client acquisition + 2 licensing mandates only</div></div>
                          <div className="scenario"><div className="scenario-label">Base</div><div className="scenario-value">$500K–$750K</div><div className="scenario-desc">4 licensing mandates at $75K avg + 35–40 core clients + renewals</div></div>
                          <div className="scenario"><div className="scenario-label">Bull</div><div className="scenario-value bull">$900K–$1.2M</div><div className="scenario-desc">6+ licensing mandates + a marquee crypto client + faster referral partner deal flow</div></div>
                        </div>
                        <div className="block"><div className="block-title">Decision Gates</div></div>
                        <div className="gates">
                          <div className="gate">
                            <div className="gate-number">Gate 4</div>
                            <div className="gate-text">2+ licensing mandates closed by Q2 → triggers licensing specialist hire</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 5</div>
                            <div className="gate-text">Year 1 client retention ≥75% → validates renewal economics</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 6</div>
                            <div className="gate-text">30+ active client relationships across 3+ jurisdictions → triggers fund administration partnership discussions</div>
                          </div>
                          <div className="gate-fallback">If licensing mandates do not materialize by Q3, reallocate resources to core corporate services growth.</div>
                        </div>
                        <div className="block"><div className="block-title">Key Performance Indicators</div></div>
                        <div className="kpi-grid">
                          <div className="kpi"><div className="kpi-label">Licensing Avg.</div><div className="kpi-value">≥ $75K</div></div>
                          <div className="kpi"><div className="kpi-label">CAC Payback</div><div className="kpi-value">≤ 8 months</div></div>
                          <div className="kpi"><div className="kpi-label">New Clients</div><div className="kpi-value">20–25</div></div>
                          <div className="kpi"><div className="kpi-label">Client Retention</div><div className="kpi-value">≥ 75%</div></div>
                          <div className="kpi"><div className="kpi-label">Cross-sell</div><div className="kpi-value">≥ 1.3x</div></div>
                          <div className="kpi"><div className="kpi-label">Recurring Rev %</div><div className="kpi-value">≥ 30%</div></div>
                        </div>
                        <div className="closing">
                          <h3>What Boyar Will Be <span className="red">Known For</span> at End of Year 2</h3>
                          <p>
                            The firm that licenses what other firms won't touch. The crypto founder who needs a MiCA license, the iGaming operator who needs Malta GMA approval, the forex broker who needs an EMI in Lithuania — they've been told no by three other firms. Boyar says yes, structures it properly, gets it banked, and keeps it compliant. That reputation — the firm that actually gets difficult things done — travels through exactly the networks where Boyar's next clients already live.
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Year 3 */}
                {activeYear === "year3" && (
                  <section className="year-section active">
                    {/* Simplified for conciseness but faithful to intent */}
                    {activeSubtab === "y3-overview" && (
                      <div className="sub-section active">
                        <div className="year-header">
                          <h2>Year 3 (2027)<br />Geographic Density & <span className="red">Institutional Clients</span></h2>
                          <div className="objective">Expand active jurisdiction coverage to 25+. Land the first institutional/corporate client. Begin proprietary fund administration.</div>
                        </div>
                        <div className="stats-row">
                          <div className="stat-card"><div className="stat-label">Revenue (Base)</div><div className="stat-value accent">$1.2M–$2M</div></div>
                          <div className="stat-card"><div className="stat-label">Headcount</div><div className="stat-value">5 FTE</div></div>
                          <div className="stat-card"><div className="stat-label">Jurisdictions</div><div className="stat-value">25+</div></div>
                          <div className="stat-card"><div className="stat-label">Active Clients</div><div className="stat-value">60–80</div></div>
                        </div>
                        <div className="block">
                          <div className="block-title">Who Does the <span className="red">Work</span></div>
                          <p>Revenue trigger at $800K+ annualized activates the next build-out. A dedicated Licensing Specialist is hired — ideally with prior regulatory experience in MiCA, iGaming, or EMI licensing — to own the licensing pipeline and manage applications end-to-end. A Client Services Coordinator handles the growing volume of renewals, corporate administration, and client communication. The compliance function moves from part-time consulting to a dedicated in-house Compliance Officer. Total headcount: 5 FTE + expanding network.</p>
                        </div>
                        <div className="block"><div className="block-title">New Service Lines</div></div>
                        <div className="service-grid">
                          <div className="service-item"><h5>Cross-Border Transaction Advisory</h5><p>M&A structuring support, holding company optimization, transfer pricing advisory for mid-market companies expanding internationally.</p></div>
                          <div className="service-item"><h5>Estate Planning & Succession</h5><p>Natural extension from trust services; families with Boyar-managed trusts need multi-generational planning.</p></div>
                          <div className="service-item"><h5>Insurance Brokerage</h5><p>Key-person insurance, D&O, professional indemnity — embedded within corporate structuring mandates.</p></div>
                          <div className="service-item"><h5>Fund Administration (Proprietary)</h5><p>With 8–10 fund-adjacent clients from licensing work, basic fund admin moves in-house: NAV calculations, investor reporting, compliance monitoring. 40–60% margins.</p></div>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y3-operations" && (
                      <div className="sub-section active">
                        <div className="block">
                          <div className="block-title">How the First Institutional Client Happens</div>
                          <p>The path to institutional clients isn't cold outreach — it's graduation. Track which clients are raising capital, hiring across borders, and proactively reach out with a restructuring proposal before they realize they need one. A client with an EMI license in Lithuania and holding in Netherlands starts as a 2-entity structure. When they raise a Series B, they need a Singapore subsidiary for Asian expansion, a UAE branch for tax efficiency, and a cap table restructuring. Suddenly, they have 50+ employees across 3 jurisdictions. Boyar structures and manages this entirely. This is precisely how Tricor grew revenue 2x and EBITDA 2.5x during its partnership with Permira by riding the growth trajectory of its existing clients.</p>
                        </div>
                        <div className="block">
                          <div className="block-title">How the Boyar Network Takes Shape</div>
                          <p>By Year 3, the best informal relationships get formalized: vetted partners who agree to quality standards, response time SLAs, and pricing frameworks across 20–25 jurisdictions.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y3-defensibility" && (
                      <div className="sub-section active">
                        <p className="mb-6 text-[14px] text-[#4a4a4a] font-medium leading-[1.6]">Year 3 is where the moat system stops operating as individual advantages and begins reinforcing itself as an interlocking machine.</p>
                        <div className="moat-card">
                          <h4>Licensing cascade reaches <span className="red">critical mass.</span></h4>
                          <p>With 10–15 mandates completed, each generating $150K+ in cascade value, this creates a $1.5M–$2.25M total book with a highly stable recurring portion. The licensing vertical doesn't just generate its own revenue — it feeds every other service line in the firm. Every mandate pulls 4–6 additional service engagements into Boyar's book. The cascade architecture converts licensing into multi-service relationships.</p>
                        </div>
                        <div className="moat-card">
                          <h4>Client complexity reaches <span className="red">irreversibility.</span></h4>
                          <p>A client with a BVI holding company, a UAE operating entity, a Singapore trust, a VASP license in Lithuania, and banking relationships in Switzerland — all designed as an integrated architecture by Boyar — would need to find someone willing to take over the entire picture, understand why every piece exists in that specific configuration, and maintain the compliance calendar across every jurisdiction simultaneously. They face a switching cost of structural disruption no rational client would accept. The difference between a book of single-service clients and multi-vertical clients is the difference between $1.8M and $6.9M in three-year lifetime value from the same number of client relationships.</p>
                        </div>
                        <div className="moat-card">
                          <h4>Compliance framework becomes a <span className="red">referral engine.</span></h4>
                          <p>The law firm in Malta whose iGaming client needs a corporate structure sends them to Boyar because Boyar has proven it can actually get these clients banked. The accountant in Singapore whose crypto client needs a VASP license sends them to Boyar because three other firms already said no. Other professionals start referring their difficult clients because Boyar successfully structures what others reject.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y3-gates" && (
                      <div className="sub-section active">
                        <div className="block"><div className="block-title">Revenue — Three Scenarios</div></div>
                        <p className="mb-6 text-[13px] text-[#7a7a7a] font-medium leading-[1.6]">The recurring revenue base alone should represent 40–50% of total revenue by this point.</p>
                        <div className="scenarios">
                          <div className="scenario"><div className="scenario-label">Bear</div><div className="scenario-value">$600K–$1M</div><div className="scenario-desc">Slower geographic expansion, fund admin remains partner model, institutional client doesn't materialize until Year 4</div></div>
                          <div className="scenario"><div className="scenario-label">Base</div><div className="scenario-value">$1.2M–$2M</div><div className="scenario-desc">60–80 active clients, licensing maturing, fund admin fees beginning, cross-sell increasing</div></div>
                          <div className="scenario"><div className="scenario-label">Bull</div><div className="scenario-value bull">$2.5M–$3.5M</div><div className="scenario-desc">Marquee institutional client, fund admin proprietary earlier than planned, licensing mandates exceeding 6 per year</div></div>
                        </div>
                        <div className="block"><div className="block-title">Decision Gates</div></div>
                        <div className="gates">
                          <div className="gate">
                            <div className="gate-number">Gate 7</div>
                            <div className="gate-text">Jurisdiction coverage hits 20+ → triggers dedicated network manager role</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 8</div>
                            <div className="gate-text">First institutional client retained → validates upmarket transition</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 9</div>
                            <div className="gate-text">Licensing queue fills beyond 6 months → triggers pricing increase</div>
                          </div>
                          <div className="gate-fallback">If institutional client graduation doesn't occur, increase outbound efforts to Series A/B funded companies.</div>
                        </div>
                        <div className="block"><div className="block-title">Key Performance Indicators</div></div>
                        <div className="kpi-grid">
                          <div className="kpi"><div className="kpi-label">Rev/Jurisdiction</div><div className="kpi-value">≥ $40K</div></div>
                          <div className="kpi"><div className="kpi-label">Licensing GM</div><div className="kpi-value">≥ 65%</div></div>
                          <div className="kpi"><div className="kpi-label">Corp Services GM</div><div className="kpi-value">≥ 50%</div></div>
                          <div className="kpi"><div className="kpi-label">Retention</div><div className="kpi-value">≥ 80%</div></div>
                          <div className="kpi"><div className="kpi-label">Cross-sell</div><div className="kpi-value">≥ 1.5x</div></div>
                          <div className="kpi"><div className="kpi-label">Recurring %</div><div className="kpi-value">≥ 40–50%</div></div>
                        </div>
                        <div className="closing">
                          <h3>What Boyar Will Be <span className="red">Known For</span> at End of Year 3</h3>
                          <p>
                            The boutique that punches above its weight. Deep jurisdiction knowledge, institutional-grade structuring, and a client retention rate that the big players can't match because they're too large to provide the same level of intimate advisory. The firm that clients stay with not because of a contract but because leaving would mean rebuilding institutional knowledge that took three years to accumulate.
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Year 4-5 */}
                {activeYear === "year45" && (
                  <section className="year-section active">
                    {activeSubtab === "y45-overview" && (
                      <div className="sub-section active">
                        <div className="year-header">
                          <h2>Year 4–5 (2028–2029)<br />The Platform <span className="red">Emerges</span></h2>
                          <div className="objective">Transition from a services firm to a platform. Build the Boyar Network. Approach 53-jurisdiction coverage.</div>
                        </div>
                        <div className="stats-row">
                          <div className="stat-card"><div className="stat-label">Revenue (Base)</div><div className="stat-value accent">$3M–$5M</div></div>
                          <div className="stat-card"><div className="stat-label">Headcount</div><div className="stat-value">10–15</div></div>
                          <div className="stat-card"><div className="stat-label">Network Partners</div><div className="stat-value">50–100</div></div>
                          <div className="stat-card"><div className="stat-label">Active Clients</div><div className="stat-value">100+</div></div>
                        </div>
                        <div className="block"><div className="block-title">New Capabilities</div></div>
                        <div className="service-grid">
                          <div className="service-item"><h5>Boyar Network</h5><p>Curated alliance of law firms, tax advisors, compliance officers across 53 jurisdictions.</p></div>
                          <div className="service-item"><h5>Private Banking Desk</h5><p>Advisory desk matching clients with private banking across 10+ jurisdictions.</p></div>
                          <div className="service-item"><h5>Productized Licensing</h5><p>20+ mandates codified into fixed-scope, fixed-price packages with defined timelines.</p></div>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y45-operations" && (
                      <div className="sub-section active">
                        <div className="block">
                          <div className="block-title">Who Does the <span className="red">Work</span></div>
                          <p>Revenue trigger at $2M+ annualized activates the next build-out. 10–15 professionals in total. A Head of Business Development is hired to fully institutionalize referral partnerships. A Fund Administration Manager is hired to scale the proprietary offering. 2–3 Jurisdiction Specialists lead specific regions (e.g., Middle East, EU/EEA, Asia-Pacific). An Operations Manager oversees the technology stack and cross-border delivery workflows. The Boyar Network reaches 50–100 partners.</p>
                        </div>
                        <div className="block">
                          <div className="block-title">How "Platform" Works Operationally</div>
                          <p>First, productized licensing packages. 20+ mandates have been codified into fixed-scope and fixed-price packages. Second, systematized onboarding that doesn't require the founder. Third, the Boyar Network as coordinated delivery across 53 jurisdictions. Validated quality parameters and SLAs, allowing Boyar to execute complex mandates via its partners with the same confidence as doing it in-house.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y45-maturity" && (
                      <div className="sub-section active">
                        <div className="moat-card">
                          <h4>Licensing moat <span className="red">productizes.</span></h4>
                          <p>20+ mandates codified into fixed-scope packages. What was bespoke and founder-driven becomes repeatable and system-driven. Delivery cost decreases as processes standardize, pushing margins higher. Any competitor entering the space is operating at a 12–18 month disadvantage of failed applications.</p>
                        </div>
                        <div className="moat-card">
                          <h4>Recurring revenue reaches <span className="red">weather-proof</span> levels.</h4>
                          <p>By Year 5: approximately 73 retained formation clients generating $128K+ in annual recurring revenue from formation renewals alone — before trust administration fees, corporate services retainers, registered office charges, fund admin fees, and licensing compliance renewals. Total recurring 55–65% of revenue. Doesn't fluctuate with markets, doesn't require marketing spend.</p>
                        </div>
                        <div className="moat-card">
                          <h4>Cross-sell reaches <span className="red">2.0+</span> services per client.</h4>
                          <p>~50% of revenue from cross-sold services at zero CAC. The highest-performing partners are offered deeper arrangements: revenue sharing on cross-sold mandates, co-branding, or in select cases, equity participation. The lowest-performing partners are replaced. If the Network enables just 20 cross-border mandates per year that Boyar would otherwise have lost (average value $15K), that's $300K in incremental revenue from a network that costs effectively nothing beyond relationship maintenance.</p>
                        </div>
                        <div className="moat-card">
                          <h4>Competitive moat becomes <span className="red">visible.</span></h4>
                          <p>Boyar has something that takes most firms 15–20 years to build: a multi-jurisdictional network of vetted partners, a highly profitable recurring revenue base, and a reputation for handling complexity.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y45-gates" && (
                      <div className="sub-section active">
                        <div className="block"><div className="block-title">Revenue — Three Scenarios</div></div>
                        <div className="scenarios">
                          <div className="scenario"><div className="scenario-label">Bear</div><div className="scenario-value">$1.5M–$2.5M</div><div className="scenario-desc">Platform transition takes longer, some jurisdictions underperform, institutional clients grow slower than expected</div></div>
                          <div className="scenario"><div className="scenario-label">Base</div><div className="scenario-value">$3M–$5M</div><div className="scenario-desc">Recurring 55–65%, GM 50–60%</div></div>
                          <div className="scenario"><div className="scenario-label">Bull</div><div className="scenario-value bull">$6M–$8M</div><div className="scenario-desc">Fund admin scales faster, licensing productization drives volume, Network generates significant inbound deal flow</div></div>
                        </div>
                        <div className="block"><div className="block-title">Decision Gates</div></div>
                        <div className="gates">
                          <div className="gate">
                            <div className="gate-number">Gate 10</div>
                            <div className="gate-text">Recurring revenue exceeds operational fixed costs → firm achieves definitive financial stability</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 11</div>
                            <div className="gate-text">Network pipeline generates 30% of new business → validates platform model</div>
                          </div>
                          <div className="gate">
                            <div className="gate-number">Gate 12</div>
                            <div className="gate-text">Fund administration AUA exceeds $250M → triggers dedicated fund operations team</div>
                          </div>
                        </div>
                        <div className="block"><div className="block-title">Key Performance Indicators</div></div>
                        <div className="kpi-grid">
                          <div className="kpi"><div className="kpi-label">Network Partners</div><div className="kpi-value">50+</div></div>
                          <div className="kpi"><div className="kpi-label">Rev Concentration</div><div className="kpi-value">No client {'>'} 10%</div></div>
                          <div className="kpi"><div className="kpi-label">GM Blended</div><div className="kpi-value">≥ 50–60%</div></div>
                          <div className="kpi"><div className="kpi-label">Recurring %</div><div className="kpi-value">≥ 55–65%</div></div>
                          <div className="kpi"><div className="kpi-label">LTV (3yr)</div><div className="kpi-value">≥ $25K</div></div>
                          <div className="kpi"><div className="kpi-label">LTV:CAC</div><div className="kpi-value">≥ 5:1</div></div>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Year 6-7 */}
                {activeYear === "year67" && (
                  <section className="year-section active">
                    {activeSubtab === "y67-overview" && (
                      <div className="sub-section active">
                        <div className="year-header">
                          <h2>Year 6–7 (2030–2032)<br />Institutional <span className="red">Scale</span></h2>
                          <div className="objective">Establish Boyar as a top 20 independent boutique TCSP globally.</div>
                        </div>
                        <div className="stats-row">
                          <div className="stat-card"><div className="stat-label">Revenue (Base)</div><div className="stat-value accent">$8M–$15M</div></div>
                          <div className="stat-card"><div className="stat-label">Headcount</div><div className="stat-value">15–30</div></div>
                          <div className="stat-card"><div className="stat-label">Jurisdictions</div><div className="stat-value">53</div></div>
                          <div className="stat-card"><div className="stat-label">Active Clients</div><div className="stat-value">200+</div></div>
                          <div className="stat-card"><div className="stat-label">Network Partners</div><div className="stat-value">100+</div></div>
                          <div className="stat-card"><div className="stat-label">Rev/Employee</div><div className="stat-value">$300K–$500K</div></div>
                        </div>
                        <div className="block"><div className="block-title">What Gets Unlocked</div></div>
                        <div className="service-grid">
                          <div className="service-item"><h5>ESG & Sustainability</h5><p>Carbon credit trading structures, impact fund formation, ESG compliance reporting for institutional clients.</p></div>
                          <div className="service-item"><h5>Tokenization & RWA</h5><p>SPV architecture for tokenized real estate, specialized fund structures for real-world asset protocols.</p></div>
                          <div className="service-item"><h5>Family Office Services</h5><p>Trust services, succession planning, philanthropy, and insurance converged into a holistic offering for UHNW families.</p></div>
                          <div className="service-item"><h5>Proprietary Trustee</h5><p>Securing full trust licenses in key jurisdictions (BVI, Cayman, Jersey, Singapore) to capture highest-margin fiduciary services.</p></div>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y67-operations" && (
                      <div className="sub-section active">
                        <div className="block">
                          <div className="block-title">Who Does the <span className="red">Work</span></div>
                          <p>Revenue trigger at $5M+ annualized activates institutional scale. 15–30 professionals. Reorganization into four formal practice groups: Corporate Services, Licensing & Regulatory, Trust & Wealth Structuring, and Fund Administration. Each group led by a senior hire with autonomous P&L responsibility. The hiring principle throughout: Boyar hires only when revenue justifies the role and the hire directly unlocks the next revenue tier. No speculative hiring. Every role has a revenue trigger and a clear mandate. The team grows behind the revenue, never ahead of it, and the highest-performing partners are selectively offered equity participation or permanent roles. Network reaches 100+ vetted partners.</p>
                        </div>
                      </div>
                    )}
                    {activeSubtab === "y67-gates" && (
                      <div className="sub-section active">
                        <div className="block"><div className="block-title">Revenue — Three Scenarios</div></div>
                        <div className="scenarios">
                          <div className="scenario"><div className="scenario-label">Bear</div><div className="scenario-value">$4M–$7M</div><div className="scenario-desc">Year 5 targets by Year 7 — slower but compounding</div></div>
                          <div className="scenario"><div className="scenario-label">Base</div><div className="scenario-value">$8M–$15M</div><div className="scenario-desc">200+ clients, 53 jurisdictions, 60–70% recurring</div></div>
                          <div className="scenario"><div className="scenario-label">Bull</div><div className="scenario-value bull">$15M–$20M</div><div className="scenario-desc">Institutional clients scale beyond expectations, proprietary trustee services generate significant fee income, tokenization/RWA vertical takes off</div></div>
                        </div>
                        <div className="block"><div className="block-title">Key Performance Indicators</div></div>
                        <div className="kpi-grid">
                          <div className="kpi"><div className="kpi-label">Active Clients</div><div className="kpi-value">200+</div></div>
                          <div className="kpi"><div className="kpi-label">Network Partners</div><div className="kpi-value">100+</div></div>
                          <div className="kpi"><div className="kpi-label">Rev/Employee</div><div className="kpi-value">≥ $300K</div></div>
                          <div className="kpi"><div className="kpi-label">NPS</div><div className="kpi-value">Tracked</div></div>
                        </div>
                        <div className="block">
                          <div className="block-title">Context</div>
                          <p>For reference: Sovereign Group's annual revenue reached approximately $108.6 million by 2025, built over 37 years. Boyar doesn't need to reach that scale to be a highly successful, highly profitable boutique. A $10M–$15M revenue firm with 55%+ gross margins and 65%+ recurring revenue is an extraordinarily valuable asset — whether measured as a standalone business, an acquisition target, or a platform for further growth.</p>
                        </div>
                        <div className="closing">
                          <h3>The <span className="red">Critical</span> Insight</h3>
                          <p>Boyar's lean cost structure means it reaches profitability in every scenario. The variable isn't survival — it's the pace of growth. The renewal flywheel and recurring revenue base ensure that even in the bear case, the firm compounds rather than contracts. The licensing cascade, the high-risk client compliance framework, and the structural complexity of the client book create an interlocking system where each component makes every other component more valuable. By Year 7, the question is not whether Boyar is a successful firm — it's whether it remains independent or becomes part of something larger.</p>
                        </div>
                      </div>
                    )}
                  </section>
                )}
              </main>

              <footer className="footer pt-12 text-center text-xs tracking-widest text-[#7a7a7a] uppercase font-black opacity-50">
                <p>Boyar Partners — Confidential Investor Document — 2025</p>
              </footer>
            </div>

            <style>{`
              .trajectory-panel-wrapper {
                --bg: #FDFBEE;
                --surface: #F7F5E8;
                --surface-2: #F0EDDF;
                --border: #E0DDD0;
                --text: #1a1a1a;
                --text-muted: #4a4a4a;
                --text-dim: #7a7a7a;
                --accent: #FF0000;
                --black: #000;
                background: var(--bg) !important;
                color: var(--text) !important;
                font-family: 'Avenir', 'Inter', sans-serif !important;
                font-weight: 500;
                line-height: 1.7;
                font-size: 15px;
                -webkit-font-smoothing: antialiased;
              }
              .trajectory-panel-wrapper * { color: inherit; }
              .trajectory-panel-wrapper .red { color: var(--accent) !important; }
              .trajectory-panel-wrapper .header { position: sticky; top: 0; left: 0; right: 0; z-index: 100; background: rgba(253,251,238,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); will-change: transform; }
              .trajectory-panel-wrapper .header-inner { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
              .trajectory-panel-wrapper .logo { font-weight: 800; font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: var(--black) !important; }
              .trajectory-panel-wrapper .header-subtitle { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim) !important; font-weight: 500; }
              .trajectory-panel-wrapper .hero { padding: 80px 48px 60px; max-width: 1400px; margin: 0 auto; position: relative; }
              .trajectory-panel-wrapper .hero-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim) !important; margin-bottom: 20px; font-weight: 800; }
              .trajectory-panel-wrapper .hero h1 { font-size: 48px; font-weight: 800; line-height: 1.1; color: var(--black) !important; margin-bottom: 20px; max-width: 700px; }
              .trajectory-panel-wrapper .hero p { font-size: 16px; color: var(--text-muted) !important; max-width: 560px; line-height: 1.8; }
              .trajectory-panel-wrapper .tabs-container { position: sticky; top: 56px; z-index: 90; background: rgba(253,251,238,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); will-change: transform; }
              .trajectory-panel-wrapper .tabs { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; overflow-x: auto; scrollbar-width: none; }
              .trajectory-panel-wrapper .tab { padding: 18px 32px; font-size: 15px; font-weight: 800; letter-spacing: 1px; color: var(--text-dim) !important; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s ease; white-space: nowrap; }
              .trajectory-panel-wrapper .tab:hover { color: var(--text-muted) !important; }
              .trajectory-panel-wrapper .tab.active { color: var(--accent) !important; border-bottom-color: var(--accent); }
              .trajectory-panel-wrapper .subtabs-container { position: sticky; top: 112px; z-index: 80; background: rgba(247,245,232,0.98); backdrop-filter: blur(6px); border-bottom: 1px solid var(--border); will-change: transform; }
              .trajectory-panel-wrapper .subtabs { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; overflow-x: auto; scrollbar-width: none; }
              .trajectory-panel-wrapper .subtab { padding: 12px 20px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-dim) !important; cursor: pointer; border-bottom: 1px solid transparent; transition: all 0.25s ease; white-space: nowrap; flex-shrink: 0; }
              .trajectory-panel-wrapper .subtab:hover { color: var(--text-muted) !important; }
              .trajectory-panel-wrapper .subtab.active { color: var(--black) !important; border-bottom-color: var(--black); }
              .trajectory-panel-wrapper .content-area { max-width: 1400px; margin: 0 auto; padding: 0 48px; }
              .trajectory-panel-wrapper .year-section { animation: tpFadeIn 0.4s ease; }
              .trajectory-panel-wrapper .sub-section { animation: tpFadeIn 0.3s ease; }
              @keyframes tpFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
              .trajectory-panel-wrapper .year-header { padding: 48px 0 40px; border-bottom: 1px solid var(--border); margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; }
              .trajectory-panel-wrapper .year-header h2 { font-size: 36px; font-weight: 800; color: var(--black) !important; line-height: 1.15; }
              .trajectory-panel-wrapper .year-header .objective { font-size: 15px; color: var(--text-muted) !important; line-height: 1.7; border-left: 2px solid var(--accent); padding-left: 24px; }
              .trajectory-panel-wrapper .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 40px; }
              .trajectory-panel-wrapper .stat-card { background: var(--surface); padding: 24px 20px; }
              .trajectory-panel-wrapper .stat-card .stat-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim) !important; margin-bottom: 6px; font-weight: 800; }
              .trajectory-panel-wrapper .stat-card .stat-value { font-size: 20px; font-weight: 800; color: var(--black) !important; }
              .trajectory-panel-wrapper .stat-card .stat-value.accent { color: var(--accent) !important; }
              .trajectory-panel-wrapper .block { margin-bottom: 36px; }
              .trajectory-panel-wrapper .block-title { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent) !important; margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 12px; }
              .trajectory-panel-wrapper .block-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
              .trajectory-panel-wrapper .block p { color: var(--text) !important; line-height: 1.85; margin-bottom: 14px; font-size: 14.5px; font-weight: 500; }
              .trajectory-panel-wrapper .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 36px; }
              .trajectory-panel-wrapper .moat-card { background: var(--surface); border: 1px solid var(--border); padding: 32px; margin-bottom: 24px; position: relative; overflow: hidden; }
              .trajectory-panel-wrapper .moat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--accent); }
              .trajectory-panel-wrapper .moat-card h4 { font-size: 17px; font-weight: 800; color: var(--black) !important; margin-bottom: 14px; line-height: 1.3; }
              .trajectory-panel-wrapper .moat-card p { color: var(--text-muted) !important; line-height: 1.85; font-size: 14px; margin-bottom: 10px; font-weight: 500; }
              .trajectory-panel-wrapper .service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 36px; }
              .trajectory-panel-wrapper .service-item { background: var(--surface); padding: 22px; }
              .trajectory-panel-wrapper .service-item h5 { font-size: 13.5px; font-weight: 800; color: var(--black) !important; margin-bottom: 6px; }
              .trajectory-panel-wrapper .service-item p { font-size: 12.5px; color: var(--text-dim) !important; line-height: 1.6; font-weight: 500; }
              .trajectory-panel-wrapper .gates { background: var(--surface); border: 1px solid var(--border); padding: 32px; margin-bottom: 36px; }
              .trajectory-panel-wrapper .gate { display: grid; grid-template-columns: 72px 1fr; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border); align-items: start; }
              .trajectory-panel-wrapper .gate:last-child { border-bottom: none; }
              .trajectory-panel-wrapper .gate-number { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: var(--accent) !important; padding-top: 2px; }
              .trajectory-panel-wrapper .gate-text { font-size: 13.5px; color: var(--text-muted) !important; line-height: 1.7; font-weight: 500; }
              .trajectory-panel-wrapper .gate-fallback { padding: 14px 0 0; font-size: 13px; color: var(--text-dim) !important; font-style: italic; font-weight: 500; }
              .trajectory-panel-wrapper .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; margin-bottom: 36px; }
              .trajectory-panel-wrapper .kpi { border: 1px solid var(--border); padding: 18px; background: var(--surface); }
              .trajectory-panel-wrapper .kpi-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim) !important; margin-bottom: 6px; font-weight: 800; }
              .trajectory-panel-wrapper .kpi-value { font-size: 15px; font-weight: 800; color: var(--black) !important; }
              .trajectory-panel-wrapper .scenarios { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 36px; }
              .trajectory-panel-wrapper .scenario { background: var(--surface); padding: 24px 20px; text-align: center; }
              .trajectory-panel-wrapper .scenario-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim) !important; margin-bottom: 10px; font-weight: 800; }
              .trajectory-panel-wrapper .scenario-value { font-size: 22px; font-weight: 800; color: var(--black) !important; margin-bottom: 6px; }
              .trajectory-panel-wrapper .scenario-value.bull { color: var(--accent) !important; }
              .trajectory-panel-wrapper .scenario-desc { font-size: 11.5px; color: var(--text-dim) !important; line-height: 1.5; font-weight: 500; }
              .trajectory-panel-wrapper .closing { padding: 36px 0 60px; border-top: 1px solid var(--border); margin-top: 36px; }
              .trajectory-panel-wrapper .closing h3 { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim) !important; margin-bottom: 14px; font-weight: 800; }
              .trajectory-panel-wrapper .closing p { font-size: 16px; color: var(--text) !important; line-height: 1.8; max-width: 700px; font-weight: 500; }
              .trajectory-panel-wrapper .future-moats { background: rgba(255,0,0,0.08); border: 1px solid rgba(255,0,0,0.08); padding: 32px; margin-bottom: 36px; }
              .trajectory-panel-wrapper .future-moats h4 { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent) !important; margin-bottom: 16px; font-weight: 800; }
              .trajectory-panel-wrapper .future-moats p { color: var(--text-muted) !important; line-height: 1.85; font-size: 14px; margin-bottom: 10px; font-weight: 500; }
              @media(max-width:900px) {
                .trajectory-panel-wrapper .header-inner, .trajectory-panel-wrapper .tabs, .trajectory-panel-wrapper .subtabs, .trajectory-panel-wrapper .content-area, .trajectory-panel-wrapper .hero { padding-left: 20px; padding-right: 20px; }
                .trajectory-panel-wrapper .hero h1 { font-size: 28px; }
                .trajectory-panel-wrapper .year-header { grid-template-columns: 1fr; gap: 20px; }
                .trajectory-panel-wrapper .year-header h2 { font-size: 24px; }
                .trajectory-panel-wrapper .two-col { grid-template-columns: 1fr; }
                .trajectory-panel-wrapper .scenarios { grid-template-columns: 1fr; }
                .trajectory-panel-wrapper .tab { padding: 16px 20px; }
                .trajectory-panel-wrapper .subtabs-container { top: 104px; }
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(panelContent, document.body);
}
