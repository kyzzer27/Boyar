"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ABMPlanPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const modelId = params.modelId as string;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
              >
                ← Back
              </button>
              <h1 className="text-lg font-semibold text-black">ABM Strategic Framework</h1>
              <div className="w-20" /> {/* Spacer */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Title Page */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              Account-Based Marketing Strategy
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
              for Boyar Partners
            </h2>
            <p className="text-gray-600 text-lg">Prepared for: Executive Leadership</p>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              1. Executive Summary
            </h2>
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p>
                Boyar Partners operates in a niche advisory market defined by high-value transactions, complex regulatory environments, and decision-making by senior executives and HNWI stakeholders. The firm's primary acquisition objective is not volume but precision — securing a steady pipeline of engagements in structuring, offshore consulting, licensing, banking facilitation, fund administration, tokenization architecture, and trust/foundation setup.
              </p>
              <p>
                Account-Based Marketing (ABM) is the required model because it aligns with:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>High average engagement size</li>
                <li>Long sales cycles requiring education and credibility</li>
                <li>A buyer profile consisting of founders, CFOs, general counsels, fund managers, family offices, and entrepreneurs with global operations</li>
                <li>The need for tailored advisory positioning rather than transactional advertising</li>
              </ul>
              <p>
                ABM is adopted here as a full-funnel, cross-functional system.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              2. Target Account Definition
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6" style={{ fontFamily: 'var(--font-benzin)' }}>
              2.1 Ideal Customer Profiles (ICPs)
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold mb-2 text-black">ICP 1 — Crypto, Web3, Tokenization Projects</h4>
                <p className="text-gray-700 mb-2"><strong>Needs:</strong> Structuring, token issuance frameworks, Cayman/BVI SPVs, VASP licensing, banking rails</p>
                <p className="text-gray-700"><strong>Indicators:</strong> Active fundraising, exchange listings, new product roadmap, increasing headcount</p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold mb-2 text-black">ICP 2 — International SMEs & Scaling Enterprises</h4>
                <p className="text-gray-700 mb-2"><strong>Needs:</strong> Multi-jurisdiction expansion, corporate banking, compliance frameworks, restructuring</p>
                <p className="text-gray-700"><strong>Indicators:</strong> Hiring surge, new office announcements, regulatory filings, cross-border sales</p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold mb-2 text-black">ICP 3 — Investment Funds, Prop Desks, Boutique Asset Managers</h4>
                <p className="text-gray-700 mb-2"><strong>Needs:</strong> Fund formation, fund administration, regulatory licensing, custodial relationships</p>
                <p className="text-gray-700"><strong>Indicators:</strong> AUM increases, new fund strategies, partner announcements</p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold mb-2 text-black">ICP 4 — HNWI / Family Offices</h4>
                <p className="text-gray-700 mb-2"><strong>Needs:</strong> Trusts, foundations, succession tools, multi-jurisdiction structures</p>
                <p className="text-gray-700"><strong>Indicators:</strong> Estate planning activity, generational transfers, new acquisitions</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              3. Target Account Universe (TAU)
            </h2>
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p>
                A curated list of 300–500 accounts grouped by tiers:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Tier 1 (Top 50):</strong> High revenue potential, strategic profile, complex advisory needs</li>
                <li><strong>Tier 2 (Next 150):</strong> Mid-to-high potential, scalable engagements possible</li>
                <li><strong>Tier 3 (Remaining 300):</strong> Early-stage companies or long-cycle prospects</li>
              </ul>
              <p>
                Each account receives a differentiated engagement level and messaging cadence.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              4. Persona Mapping and Buying Committees
            </h2>
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p>
                Within each target account, key decision-makers include:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Founder / CEO</li>
                <li>CFO</li>
                <li>General Counsel</li>
                <li>COO / Head of Operations</li>
                <li>External legal counsel</li>
                <li>Board members or family office advisors</li>
              </ul>
              <p>
                Messaging must map to economic, strategic, and compliance-driven priorities.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              5. Content Architecture for ABM
            </h2>
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p>
                The content ecosystem supports individualized engagement:
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">Mandatory Assets</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Jurisdiction briefings (Cayman, BVI, Seychelles, Cook Islands, UAE, Luxembourg, DIFC)</li>
                <li>Licensing frameworks (VASP, EMI, MSB, fund licenses)</li>
                <li>Banking intelligence reports (global onboarding environment)</li>
                <li>Structuring playbooks (SPV architecture, profit extraction frameworks, succession vehicles)</li>
                <li>Quarterly regulatory updates</li>
                <li>Transactional case studies (anonymized)</li>
              </ul>
              <p className="mt-4">
                Each asset is tailored by segment and delivered via controlled distribution channels.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              6. Multi-Channel Execution Strategy
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">6.1 LinkedIn ABM Engine</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Precision outreach via Sales Navigator</li>
                  <li>Senior-level content publication</li>
                  <li>Micro-targeted connection sequences</li>
                  <li>Retargeting campaigns limited to the TAU</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">6.2 Email Personalization Tracks</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Segment-specific cadences</li>
                  <li>Consultation invitations linked to regulatory triggers</li>
                  <li>Executive memos referencing market events</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">6.3 Executive Briefings & Private Roundtables</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Closed-door webinar formats</li>
                  <li>Jurisdiction-specific masterclasses</li>
                  <li>Invitation-only sessions for fund managers and HNWI advisors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">6.4 Paid Media (Selective Use)</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Retargeting only — no broad acquisition</li>
                  <li>Ads served exclusively to known TAU visitors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              7. Engagement Framework
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Engagement Stage 1 — Awareness</h3>
                <p className="text-gray-800">Targeted content delivery, connection introduction, micro insight pieces.</p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Engagement Stage 2 — Consideration</h3>
                <p className="text-gray-800">1:1 email outreach, case study distribution, webinar invitations.</p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Engagement Stage 3 — Pre-Sales Activation</h3>
                <p className="text-gray-800">Exploratory calls, structural reviews, preliminary advisory recommendations.</p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Engagement Stage 4 — Conversion</h3>
                <p className="text-gray-800">Formal proposals, scoped engagements, compliance onboarding.</p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Engagement Stage 5 — Long-Cycle Relationship Management</h3>
                <p className="text-gray-800">Quarterly briefings, new jurisdiction releases, cross-service opportunities.</p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              8. KPIs and Measurement
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
              <li>Engagement rate per account</li>
              <li>Movement across engagement stages</li>
              <li>Discovery call conversion ratio</li>
              <li>Proposal issuance rate</li>
              <li>Close rate by tier</li>
              <li>Time-to-close (sales cycle compression)</li>
              <li>Revenue per account</li>
              <li>Cross-service adoption (structuring → banking → licensing → fund admin)</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              9. Governance of ABM System
            </h2>
            <div className="space-y-3 text-gray-800">
              <p><strong>Marketing:</strong> Content, account intelligence, channel management</p>
              <p><strong>Sales:</strong> Outreach, meeting conversion, proposal development</p>
              <p><strong>Partners:</strong> Advisory input, deal negotiation, relationship management</p>
              <p><strong>Operations:</strong> Streamlined onboarding and service delivery alignment</p>
              <p className="mt-4">All teams must operate under a unified account plan.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              10. Implementation Roadmap (90 Days)
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-gray-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Phase 1 — Foundation (Weeks 1–3)</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Finalize TAU list</li>
                  <li>Build messaging matrices</li>
                  <li>Deploy content library</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Phase 2 — Activation (Weeks 4–8)</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Launch LinkedIn and email sequences</li>
                  <li>Begin retargeting campaigns</li>
                  <li>Conduct two private briefings</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Phase 3 — Optimization (Weeks 9–12)</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Review engagement metrics</li>
                  <li>Reallocate focus to high-responsiveness accounts</li>
                  <li>Expand TAU with newly qualified companies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>Account-Based Marketing Strategy Document</p>
            <p className="mt-2">Boyar Partners — Confidential</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

