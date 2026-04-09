"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter } from "next/navigation";

export default function CitizenshipStewardshipPage() {
  const router = useRouter();
  
  return (
    <ProtectedRoute>
      <div className="cs-page">
        <style dangerouslySetInnerHTML={{ __html: `
          .cs-page {
            --font-heading: 'DM Sans', sans-serif;
            --font-body: 'DM Sans', sans-serif;
            --font-mono: 'DM Mono', monospace;
            --blue-500: #3b82f6;
            --blue-600: #2563eb;
            --blue-300: #93c5fd;
            --indigo-600: #4f46e5;
            --slate-900: #0f172a;
            --slate-800: #1e293b;
            --slate-700: #334155;
            --slate-600: #475569;
            --slate-500: #64748b;
            --slate-400: #94a3b8;
            --slate-300: #cbd5e1;
            --slate-200: #e2e8f0;
            --slate-100: #f1f5f9;
            --slate-50: #f8fafc;
            --white: #ffffff;
            
            min-height: 100vh;
            background: linear-gradient(135deg, var(--slate-50) 0%, var(--white) 50%, var(--slate-100) 100%);
            color: var(--slate-900);
            font-family: var(--font-body);
            font-size: 16px;
            line-height: 1.6;
          }
          .cs-page * { box-sizing: border-box; }
          
          /* ── HEADER ── */
          .cs-page header {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--slate-200);
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
          .cs-page .header-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 20px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .cs-page .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 500;
            color: var(--slate-600);
            text-decoration: none;
            cursor: pointer;
            transition: color 0.2s;
            background: none;
            border: none;
            font-family: var(--font-body);
          }
          .cs-page .back-btn:hover { color: var(--slate-900); }
          .cs-page .header-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--slate-500);
          }
          .cs-page .header-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--slate-400);
          }
          
          /* ── HERO ── */
          .cs-page .hero {
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid var(--slate-200);
            padding: 80px 32px 72px;
            margin: 0;
          }
          .cs-page .hero::before {
            content: '';
            position: absolute;
            top: -60px; right: 10%;
            width: 480px; height: 480px;
            background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-page .hero::after {
            content: '';
            position: absolute;
            bottom: -40px; left: 5%;
            width: 360px; height: 360px;
            background: radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-page .hero-inner {
            max-width: 1280px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          .cs-page .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 999px;
            padding: 6px 14px;
            margin-bottom: 24px;
          }
          .cs-page .pill-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: var(--blue-500);
          }
          .cs-page .pill span {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #1d4ed8;
          }
          .cs-page .hero h1 {
            font-family: var(--font-heading);
            font-size: clamp(36px, 5vw, 60px);
            font-weight: 700;
            color: var(--slate-900);
            line-height: 1.08;
            margin-bottom: 20px;
            max-width: 760px;
          }
          .cs-page .hero h1 .gradient {
            background: linear-gradient(135deg, var(--blue-600), var(--indigo-600));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .cs-page .hero-lead {
            font-size: 17px;
            color: var(--slate-600);
            max-width: 640px;
            line-height: 1.75;
            font-weight: 400;
          }
          
          /* ── SECTION WRAPPER ── */
          .cs-page section {
            border-bottom: 1px solid var(--slate-200);
            margin: 0;
          }
          .cs-page .section-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 72px 32px;
          }
          .cs-page .section-alt {
            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(8px);
          }
          
          /* ── SECTION HEADING ── */
          .cs-page .section-label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--blue-600);
            margin-bottom: 10px;
          }
          .cs-page .section-title {
            font-family: var(--font-heading);
            font-size: clamp(26px, 3vw, 34px);
            font-weight: 700;
            color: var(--slate-900);
            margin-bottom: 14px;
          }
          .cs-page .section-lead {
            font-size: 15px;
            color: var(--slate-600);
            max-width: 680px;
            line-height: 1.75;
            margin-bottom: 44px;
          }
          
          /* ── SERVICE CARDS (numbered) ── */
          .cs-page .service-list { display: flex; flex-direction: column; gap: 20px; }
          .cs-page .service-card {
            background: var(--white);
            border: 1px solid var(--slate-200);
            border-radius: 16px;
            padding: 28px 28px 28px 24px;
            display: flex;
            gap: 24px;
            align-items: flex-start;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .cs-page .service-card:hover {
            border-color: #bfdbfe;
            box-shadow: 0 4px 24px rgba(59,130,246,0.08);
          }
          .cs-page .service-num {
            flex-shrink: 0;
            width: 52px; height: 52px;
            background: linear-gradient(135deg, var(--blue-500), var(--indigo-600));
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 700;
            color: white;
            box-shadow: 0 4px 14px rgba(59,130,246,0.25);
            font-family: var(--font-mono);
          }
          .cs-page .service-body { flex: 1; min-width: 0; }
          .cs-page .service-title {
            font-family: var(--font-body);
            font-size: 17px;
            font-weight: 700;
            color: var(--slate-900);
            margin-bottom: 6px;
          }
          .cs-page .service-def {
            font-size: 13px;
            color: var(--blue-600);
            font-weight: 600;
            margin-bottom: 10px;
          }
          .cs-page .service-def span { color: var(--slate-500); font-weight: 400; }
          .cs-page .service-purpose {
            font-size: 14px;
            color: var(--slate-700);
            line-height: 1.7;
          }
          .cs-page .service-purpose strong { color: var(--slate-900); }
          
          /* ── JURISDICTION CHIPS ── */
          .cs-page .chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 8px;
          }
          .cs-page .chip {
            background: var(--white);
            border: 1px solid var(--slate-200);
            border-radius: 10px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 500;
            color: var(--slate-700);
            transition: border-color 0.2s, background 0.2s, color 0.2s;
            cursor: default;
          }
          .cs-page .chip:hover {
            border-color: #93c5fd;
            background: #eff6ff;
            color: #1d4ed8;
          }
          
          /* ── 2-COL GRID ── */
          .cs-page .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          @media (max-width: 700px) {
            .cs-page .grid-2 { grid-template-columns: 1fr; }
          }
          
          /* ── INFO CARDS ── */
          .cs-page .info-card {
            background: var(--white);
            border: 1px solid var(--slate-200);
            border-radius: 12px;
            padding: 20px;
          }
          .cs-page .info-card-title {
            font-size: 13px;
            font-weight: 700;
            color: var(--slate-900);
            margin-bottom: 12px;
          }
          .cs-page .info-list { list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0; margin: 0; }
          .cs-page .info-list li {
            font-size: 13px;
            color: var(--slate-700);
            display: flex;
            align-items: flex-start;
            gap: 8px;
            line-height: 1.55;
          }
          .cs-page .info-list li::before {
            content: '';
            flex-shrink: 0;
            width: 5px; height: 5px;
            border-radius: 50%;
            background: var(--blue-500);
            margin-top: 6px;
          }
          
          /* ── HIGHLIGHT BOX ── */
          .cs-page .highlight-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 12px;
            padding: 20px;
            font-size: 14px;
            color: var(--slate-700);
            line-height: 1.7;
          }
          .cs-page .highlight-box strong { color: var(--slate-900); }
          
          /* ── STANDOUT SECTION ── */
          .cs-page .standout {
            background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%);
            border: 1px solid #bfdbfe;
            border-radius: 20px;
            padding: 40px 40px;
          }
          .cs-page .standout h3 {
            font-family: var(--font-heading);
            font-size: 22px;
            font-weight: 700;
            color: var(--slate-900);
            margin-bottom: 16px;
          }
          .cs-page .standout p {
            font-size: 15px;
            color: var(--slate-700);
            line-height: 1.75;
            margin-bottom: 16px;
          }
          .cs-page .standout p:last-child { margin-bottom: 0; }
          
          /* ── BENEFIT LIST ── */
          .cs-page .benefit-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 4px; padding: 0;}
          .cs-page .benefit-list li {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            font-size: 14px;
            color: var(--slate-700);
            line-height: 1.65;
          }
          .cs-page .benefit-icon {
            flex-shrink: 0;
            color: var(--blue-600);
            font-size: 17px;
            margin-top: 1px;
          }
          
          /* ── CTA BLOCK ── */
          .cs-page .cta-block {
            background: linear-gradient(135deg, #eff6ff, #eef2ff);
            border: 1px solid #c7d2fe;
            border-radius: 20px;
            padding: 52px 44px;
            text-align: center;
          }
          .cs-page .cta-block p {
            font-family: var(--font-heading);
            font-size: clamp(17px, 2.2vw, 22px);
            font-weight: 600;
            color: var(--slate-900);
            line-height: 1.6;
            max-width: 760px;
            margin: 0 auto;
          }
          
          /* ── ALPHA SECTIONS ── */
          .cs-page .alpha-section {
            background: var(--slate-50);
            border: 1px solid var(--slate-200);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 20px;
          }
          .cs-page .alpha-section:last-child { margin-bottom: 0; }
          .cs-page .alpha-header {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 24px;
          }
          .cs-page .alpha-letter {
            font-family: var(--font-heading);
            font-size: 48px;
            font-weight: 300;
            color: var(--slate-300);
            line-height: 1;
            flex-shrink: 0;
          }
          .cs-page .alpha-title {
            font-family: var(--font-body);
            font-size: 20px;
            font-weight: 700;
            color: var(--slate-900);
            margin-bottom: 4px;
          }
          .cs-page .alpha-sub {
            font-size: 13px;
            color: var(--slate-600);
          }
          
          @media (max-width: 600px) {
            .cs-page .header-inner, .cs-page .hero, .cs-page .section-inner { padding-left: 20px; padding-right: 20px; }
            .cs-page .hero { padding-top: 56px; padding-bottom: 52px; }
            .cs-page .section-inner { padding-top: 52px; padding-bottom: 52px; }
            .cs-page .standout, .cs-page .cta-block { padding: 28px 24px; }
            .cs-page .alpha-section { padding: 24px 20px; }
          }
        `}} />

        {/* HEADER */}
        <header>
          <div className="header-inner">
            <button className="back-btn" onClick={() => router.back()}>← Back</button>
            <div className="header-badge">
              <div className="header-dot"></div>
              Private Clients
            </div>
          </div>
        </header>

        {/* HERO */}
        <div className="hero">
          <div className="hero-inner">
            <div className="pill">
              <div className="pill-dot"></div>
              <span>Citizenship & Stewardship</span>
            </div>
            <h1>
              Citizenship & Stewardship<br/>
              <span className="gradient">Planning & Advisory</span>
            </h1>
            <p className="hero-lead">
              Citizenship and stewardship planning encompasses the structured acquisition of alternative nationalities, residency rights, and long-term oversight frameworks for mobile individuals, families, and family enterprises operating across multiple jurisdictions.
            </p>
          </div>
        </div>

        {/* DEFINITION & STRATEGIC PURPOSE */}
        <section className="section-alt">
          <div className="section-inner">
            <div className="section-label">Definition & Strategic Purpose</div>
            <h2 className="section-title">A Forward-Looking Governance Framework</h2>
            <p className="section-lead">
              Citizenship and stewardship planning is not a transactional exercise. It is a long-term advisory engagement addressing legal status, mobility, domicile, and intergenerational continuity for high-net-worth individuals and families with cross-border lives and assets.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '860px' }}>
              <div className="highlight-box">
                For private clients and HNWIs, citizenship planning focuses on expanding optionality — securing access to favourable jurisdictions for residency, tax planning, mobility, and personal security.
              </div>
              <div className="highlight-box">
                For family enterprises, stewardship planning integrates citizenship structures with governance frameworks, succession planning, and cross-border asset protection to ensure continuity across generations.
              </div>
              <div className="highlight-box">
                <strong>In both contexts, citizenship and stewardship planning is treated as a proactive strategic framework — not a reactive response to tax or political pressure.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMME COVERAGE */}
        <section>
          <div className="section-inner">
            <div className="section-label">Programme Coverage</div>
            <h2 className="section-title">Citizenship & Residency Programmes</h2>
            <p className="section-lead">
              Advisory and structuring support is available across citizenship by investment, residency by investment, and long-term residency programmes in the following jurisdictions. Each programme is selected based on legal robustness, processing reliability, treaty network, and lifestyle or business utility for the client.
            </p>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '12px' }}>Citizenship by Investment (CBI)</p>
              <div className="chips-grid">
                <div className="chip">Antigua & Barbuda</div>
                <div className="chip">Dominica</div>
                <div className="chip">Grenada</div>
                <div className="chip">Saint Kitts & Nevis</div>
                <div className="chip">Saint Lucia</div>
                <div className="chip">Vanuatu</div>
                <div className="chip">Jordan</div>
                <div className="chip">Turkey</div>
                <div className="chip">Malta</div>
                <div className="chip">Egypt</div>
              </div>
            </div>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '12px' }}>Residency by Investment (RBI) & Golden Visa Programmes</p>
              <div className="chips-grid">
                <div className="chip">UAE (Dubai & Abu Dhabi)</div>
                <div className="chip">Portugal</div>
                <div className="chip">Greece</div>
                <div className="chip">Spain</div>
                <div className="chip">Malta</div>
                <div className="chip">Cyprus</div>
                <div className="chip">Italy</div>
                <div className="chip">Singapore</div>
                <div className="chip">Mauritius</div>
                <div className="chip">Cayman Islands</div>
                <div className="chip">Bahamas</div>
                <div className="chip">Montenegro</div>
                <div className="chip">Georgia</div>
                <div className="chip">Panama</div>
                <div className="chip">Costa Rica</div>
                <div className="chip">United Kingdom</div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '12px' }}>Long-Term & Special Residency Pathways</p>
              <div className="chips-grid">
                <div className="chip">Digital Nomad Visas (EU & LATAM)</div>
                <div className="chip">Non-Habitual Resident (NHR) — Portugal</div>
                <div className="chip">Flat Tax Regimes — Italy, Greece, Switzerland</div>
                <div className="chip">Retirement & Pensioner Visas</div>
                <div className="chip">Founder & Entrepreneur Visas</div>
              </div>
            </div>
            <div style={{ marginTop: '24px' }} className="highlight-box">
              Programme availability, investment thresholds, processing timelines, and eligibility criteria vary and are subject to legislative change. Each engagement begins with a current programme assessment.
            </div>
          </div>
        </section>

        {/* SCOPE OF SERVICES */}
        <section className="section-alt">
          <div className="section-inner">
            <div className="section-label">Scope of Services</div>
            <h2 className="section-title">Citizenship & Stewardship Advisory Services</h2>
            <p className="section-lead">
              Comprehensive advisory from initial eligibility assessment through programme completion, post-citizenship compliance, and long-term stewardship frameworks for private clients, families, and family enterprises.
            </p>
            <div className="service-list">
              <div className="service-card">
                <div className="service-num">01</div>
                <div className="service-body">
                  <div className="service-title">Eligibility Assessment & Programme Selection</div>
                  <div className="service-def">Key Definition: <span>Structured pre-advisory to identify optimal programme fit.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Analysis of client profile, nationality, source of wealth, tax residency, travel patterns, family composition, and long-term objectives. Comparative assessment across eligible CBI and RBI programmes. Identification of dominant jurisdiction based on legal security, processing speed, treaty network, visa-free access, and lifestyle factors. Eliminates unsuitable programmes early and focuses the engagement on viable pathways.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">02</div>
                <div className="service-body">
                  <div className="service-title">Citizenship by Investment (CBI) Advisory</div>
                  <div className="service-def">Key Definition: <span>Full end-to-end advisory and coordination for CBI applications.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Programme eligibility confirmation and documentation checklist. Selection of qualifying investment route (real estate, government fund, business investment). Due diligence file preparation — source of wealth, source of funds, background narrative, supporting evidence. Coordination with licensed local agents and programme authorities. Management of application lifecycle from submission to passport issuance. Family extension where applicable (spouse, children, dependent parents).
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">03</div>
                <div className="service-body">
                  <div className="service-title">Residency by Investment (RBI) & Golden Visa Advisory</div>
                  <div className="service-def">Key Definition: <span>Residency permit acquisition through qualifying investments or other approved routes.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Programme identification and qualification analysis. Investment structuring — real estate acquisition, capital transfer, government bond subscription, or fund investment. Coordination with local counsel and immigration authorities. Application preparation, translation, notarisation, and submission. Permit issuance, renewal tracking, and permanent residency pathway management. Physical presence planning aligned to residency obligations and tax treaties.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">04</div>
                <div className="service-body">
                  <div className="service-title">Tax Residency & Domicile Planning</div>
                  <div className="service-def">Key Definition: <span>Structured transition of tax residency and domicile to an optimal jurisdiction.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Analysis of current tax residency, domicile status, and treaty positions. Identification of target jurisdiction aligned to client's financial profile and lifestyle. Exit planning from current jurisdiction — including exit tax exposure, departure filings, and regulatory notifications. Residency day-count planning and documentation for new jurisdiction. Integration with trust, corporate, and estate planning frameworks. This service is provided in conjunction with qualified local tax advisors and does not constitute tax advice.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">05</div>
                <div className="service-body">
                  <div className="service-title">Due Diligence File Preparation & Source of Wealth</div>
                  <div className="service-def">Key Definition: <span>Comprehensive documentation of client background for programme and banking applications.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Construction of a complete KYC and due diligence file — biographical summary, source of wealth narrative, source of funds documentation, asset and liability overview, professional and business history, and supporting evidence (audited financials, corporate records, legal documents). Prepared to meet the requirements of programme authorities, government agencies, and private banking institutions simultaneously. Reduces re-submission risk and accelerates processing timelines.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">06</div>
                <div className="service-body">
                  <div className="service-title">Post-Citizenship & Post-Residency Compliance Management</div>
                  <div className="service-def">Key Definition: <span>Ongoing management of obligations arising from citizenship or residency status.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Physical presence tracking and residency obligation monitoring. Annual renewal, reporting, and re-registration where required. FATCA and CRS classification updates triggered by change of tax residency. Notification to banking, investment, and regulatory counterparties. Coordination across multiple jurisdictions where dual or multiple status applies. Citizenship and residency is not a one-time exercise — it is an ongoing compliance obligation.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">07</div>
                <div className="service-body">
                  <div className="service-title">Family Stewardship & Intergenerational Planning</div>
                  <div className="service-def">Key Definition: <span>Long-term governance of citizenship, residency, and wealth across generations.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Extension of citizenship and residency status to children, spouses, and dependants. Coordination of family citizenship profiles across multiple nationalities and jurisdictions. Integration with trust structures, family constitutions, and succession plans. Monitoring of citizenship status across family generations — including minors reaching majority and future generational transitions. Stewardship planning ensures citizenship assets do not erode through neglect, legislative change, or succession failure.
                  </div>
                </div>
              </div>

              <div className="service-card">
                <div className="service-num">08</div>
                <div className="service-body">
                  <div className="service-title">Integration with Corporate & Wealth Structuring</div>
                  <div className="service-def">Key Definition: <span>Alignment of citizenship and residency strategy with holding structures, trusts, and investment vehicles.</span></div>
                  <div className="service-purpose">
                    <strong>Purpose:</strong> Coordination between citizenship jurisdiction and corporate holding location. Alignment of personal tax residency with trust siting, operating entity jurisdiction, and banking relationships. Investment structuring to meet CBI/RBI qualifying asset requirements while serving portfolio objectives. Ensures citizenship and residency decisions do not create unintended corporate tax exposure, substance conflicts, or treaty complications.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY DOCUMENTATION */}
        <section>
          <div className="section-inner">
            <div className="section-label">Documentation</div>
            <h2 className="section-title">Key Documentation Across the Engagement</h2>
            <p className="section-lead">
              Citizenship and residency engagements involve preparation, coordination, and management of comprehensive documentation spanning identity, financial, legal, and compliance domains.
            </p>
            
            <div className="alpha-section">
              <div className="alpha-header">
                <div className="alpha-letter">A</div>
                <div>
                  <div className="alpha-title">Identity & Background Documentation</div>
                  <div className="alpha-sub">Core identity and biographical materials required across all programmes.</div>
                </div>
              </div>
              <div className="grid-2">
                <div className="info-card">
                  <div className="info-card-title">Includes</div>
                  <ul className="info-list">
                    <li>Valid passport copies (all nationalities held)</li>
                    <li>Birth certificates — client, spouse, and dependants</li>
                    <li>Marriage and divorce certificates where applicable</li>
                    <li>Notarised translations of all non-English documents</li>
                    <li>Police clearance certificates from all jurisdictions of residence (last 10 years)</li>
                    <li>Medical insurance certificates or health declarations</li>
                  </ul>
                </div>
                <div className="highlight-box" style={{ alignSelf: 'start' }}>
                  Document standards, apostille requirements, and translation specifications vary significantly by programme authority. All documents are coordinated to meet programme-specific requirements before submission.
                </div>
              </div>
            </div>

            <div className="alpha-section">
              <div className="alpha-header">
                <div className="alpha-letter">B</div>
                <div>
                  <div className="alpha-title">Source of Wealth & Financial Documentation</div>
                  <div className="alpha-sub">Financial substantiation required for programme due diligence and banking.</div>
                </div>
              </div>
              <div className="grid-2">
                <div className="info-card">
                  <div className="info-card-title">May Include</div>
                  <ul className="info-list">
                    <li>Audited financial statements (personal and corporate)</li>
                    <li>Business ownership documentation and corporate records</li>
                    <li>Property ownership certificates and valuations</li>
                    <li>Investment portfolio statements</li>
                    <li>Tax returns (last 3–5 years) from relevant jurisdictions</li>
                    <li>Inheritance, gift, or settlement documentation</li>
                    <li>Employment income evidence (contracts, payslips, P60/W-2)</li>
                  </ul>
                </div>
                <div className="info-card">
                  <div className="info-card-title">Source of Funds</div>
                  <ul className="info-list">
                    <li>Bank statements (last 6–12 months)</li>
                    <li>Proof of qualifying investment transfer</li>
                    <li>Wire transfer records and banking references</li>
                    <li>Escrow or investment completion certificates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="alpha-section">
              <div className="alpha-header">
                <div className="alpha-letter">C</div>
                <div>
                  <div className="alpha-title">Legal & Compliance Documentation</div>
                  <div className="alpha-sub">Legal instruments and regulatory filings across the engagement lifecycle.</div>
                </div>
              </div>
              <div className="grid-2">
                <div className="info-card">
                  <div className="info-card-title">Programme-Specific</div>
                  <ul className="info-list">
                    <li>Application forms (programme authority format)</li>
                    <li>Agent appointment letters and powers of attorney</li>
                    <li>Investment agreements, sale and purchase contracts</li>
                    <li>Government fee payment receipts</li>
                    <li>Certificate of Citizenship or Residence Permit</li>
                    <li>Oath of allegiance or registration documents</li>
                  </ul>
                </div>
                <div className="info-card">
                  <div className="info-card-title">Ongoing Compliance</div>
                  <ul className="info-list">
                    <li>Residency renewal applications and supporting packs</li>
                    <li>FATCA/CRS self-certifications (updated upon status change)</li>
                    <li>Day-count records and travel logs</li>
                    <li>Notifications to banks, regulators, and counterparties</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEWARDSHIP FRAMEWORK */}
        <section className="section-alt">
          <div className="section-inner">
            <div className="section-label">Stewardship Framework</div>
            <h2 className="section-title">Long-Term Stewardship & Oversight</h2>
            <p className="section-lead">
              Citizenship and residency assets require the same active stewardship as financial assets. Programme rules evolve, obligations persist, and family circumstances change — all of which require ongoing monitoring and management.
            </p>
            <div className="standout">
              <h3>What Stewardship Encompasses</h3>
              <p>
                Stewardship is the ongoing governance of citizenship and residency assets across the client's lifetime and beyond. It is not a post-acquisition formality — it is a structured advisory commitment to ensuring that citizenship and residency status remains valid, compliant, and strategically aligned as circumstances evolve.
              </p>
              <p>
                For families with multiple citizenships across several jurisdictions, stewardship becomes a governance function: tracking renewal dates, monitoring legislative changes, extending status to new family members, and ensuring no status lapses through administrative neglect.
              </p>
            </div>
            <div style={{ marginTop: '32px' }} className="grid-2">
              <div>
                <div className="info-card">
                  <div className="info-card-title">Stewardship Responsibilities</div>
                  <ul className="info-list">
                    <li>Residency permit renewal tracking and application management</li>
                    <li>Physical presence monitoring aligned to residency obligations</li>
                    <li>Legislative monitoring across citizenship and residency jurisdictions</li>
                    <li>Extension of status to new dependants and family members</li>
                    <li>Coordination between citizenship, trust, and corporate structures</li>
                    <li>Banking and investment account compliance updates</li>
                    <li>Periodic strategic review — is the citizenship structure still optimal?</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="info-card">
                  <div className="info-card-title">When Stewardship Becomes Critical</div>
                  <ul className="info-list">
                    <li>Programme rules change (investment thresholds, holding periods)</li>
                    <li>Clients relocate to a new primary residence jurisdiction</li>
                    <li>Family composition changes — marriage, children, divorce</li>
                    <li>Business or corporate structure reorganisation</li>
                    <li>Change in tax residency or domicile status</li>
                    <li>Inheritance or succession event within the family</li>
                    <li>Legislative reform in the host jurisdiction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTSOURCED MODEL */}
        <section>
          <div className="section-inner">
            <div className="section-label">Delivery Model</div>
            <h2 className="section-title">Outsourced Citizenship & Stewardship Advisory</h2>
            <p className="section-lead">
              Citizenship and stewardship services are delivered through specialist immigration counsel, licensed programme agents, fiduciary advisors, and regulatory professionals in each relevant jurisdiction. This outsourced model provides:
            </p>
            <div className="standout">
              <h3>Outsourced Advisory Model Benefits</h3>
              <ul className="benefit-list">
                <li>
                  <span className="benefit-icon">›</span>
                  Access to licensed and regulated programme agents with established authority relationships in CBI and RBI jurisdictions
                </li>
                <li>
                  <span className="benefit-icon">›</span>
                  Multidisciplinary expertise spanning immigration law, tax advisory, corporate structuring, and fiduciary services
                </li>
                <li>
                  <span className="benefit-icon">›</span>
                  Jurisdictional compliance — each programme engagement is executed under the regulatory requirements of the specific country
                </li>
                <li>
                  <span className="benefit-icon">›</span>
                  Reduced execution risk through structured project management, milestone tracking, and documentation control
                </li>
                <li>
                  <span className="benefit-icon">›</span>
                  Allows founders, families, and corporate clients to focus on strategic decisions rather than administrative coordination across multiple advisors
                </li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--slate-700)' }}>
                <strong>Without a structured advisory framework</strong>, clients engaging in citizenship or residency planning often face fragmented advice across immigration agents, tax advisors, and wealth managers — resulting in misaligned structures, overlooked compliance obligations, and suboptimal programme selection.
              </p>
            </div>
          </div>
        </section>

        {/* IMPORTANT CONSIDERATIONS */}
        <section className="section-alt">
          <div className="section-inner">
            <div className="section-label">Important Considerations</div>
            <h2 className="section-title">Regulatory & Compliance Alignment</h2>
            <p className="section-lead">
              Citizenship and residency planning operates within a complex and evolving international regulatory environment. The following considerations apply across all engagements.
            </p>
            <div className="grid-2">
              <div className="info-card">
                <div className="info-card-title">CRS & FATCA Implications</div>
                <ul className="info-list">
                  <li>Change of tax residency triggers CRS self-certification updates across all financial institutions</li>
                  <li>New citizenship or residency may alter FATCA classification and reporting obligations</li>
                  <li>Banks and investment managers require notification of all status changes</li>
                  <li>Failure to notify results in incorrect reporting and potential penalties</li>
                </ul>
              </div>
              <div className="info-card">
                <div className="info-card-title">Exit Tax & Departure Considerations</div>
                <ul className="info-list">
                  <li>Many jurisdictions impose exit taxes or deemed disposal rules upon departure</li>
                  <li>Treaty relief may be available but requires advance planning</li>
                  <li>Residency departure must be evidenced — tax authority certificates, final return filings</li>
                  <li>Day-count violations may result in deemed continued tax residency</li>
                </ul>
              </div>
              <div className="info-card">
                <div className="info-card-title">Substance & Genuine Residency</div>
                <ul className="info-list">
                  <li>Regulators increasingly scrutinise substance behind residency claims</li>
                  <li>Presence requirements must be demonstrably met and documented</li>
                  <li>Commercial activity, banking, and social ties may be assessed</li>
                  <li>Advance planning of physical presence is essential</li>
                </ul>
              </div>
              <div className="info-card">
                <div className="info-card-title">Programme Integrity & Due Diligence</div>
                <ul className="info-list">
                  <li>All CBI/RBI programmes conduct independent background checks</li>
                  <li>Political exposure, litigation history, and adverse media are assessed</li>
                  <li>Incomplete or inconsistent documentation results in programme rejection</li>
                  <li>Post-citizenship revocation is possible for misrepresentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="section-inner">
            <div className="cta-block">
              <p>
                "Boyar Partners provides structured citizenship and stewardship advisory, integrating programme selection, due diligence preparation, compliance management, and long-term oversight into a single coordinated engagement — across onshore, offshore, and international jurisdictions."
              </p>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
