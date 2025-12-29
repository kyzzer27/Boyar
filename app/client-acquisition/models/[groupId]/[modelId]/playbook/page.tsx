"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter, useParams } from "next/navigation";

export default function PlaybookPage() {
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
              <h1 className="text-lg font-semibold text-black">ABM Execution Playbook</h1>
              <div className="w-20" /> {/* Spacer */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Title Page */}
          <div className="mb-16 text-center border-b border-gray-300 pb-12">
            <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              AI-DRIVEN ABM EXECUTION PLAYBOOK
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
              for Boyar Partners
            </h2>
            <p className="text-gray-600 text-lg mt-4">Internal Use — Founder & Partner Level</p>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              1. ABM OBJECTIVE
            </h2>
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p>
                To build a predictable deal pipeline of ultra-qualified prospects by combining:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Targeted account selection</li>
                <li>AI-driven intent detection</li>
                <li>Senior-founder credibility</li>
                <li>Personalised content touchpoints</li>
                <li>Controlled, high-trust communication</li>
              </ul>
              <p className="mt-4">
                The end goal is high-value, low-volume, high-certainty mandates in:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Structuring</li>
                <li>Trusts & foundations</li>
                <li>Fund formation</li>
                <li>Licensing (VASP / MSB / EMI / Forex)</li>
                <li>Tokenization architecture</li>
                <li>Banking facilitation</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              2. FOUNDATIONAL SETUP (NON-NEGOTIABLE)
            </h2>
            <p className="text-gray-800 mb-6 leading-relaxed">
              Before launching ABM, these components must be architected.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.1 Build the Target Account Universe (TAU)
                </h3>
                <div className="space-y-4 text-gray-800 leading-relaxed">
                  <p><strong>Size:</strong> 300–500 accounts</p>
                  <p><strong>Create 3 tiers:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Tier 1:</strong> Top 50 (high revenue, high complexity, warm access)</li>
                    <li><strong>Tier 2:</strong> 150 accounts (likely buyers)</li>
                    <li><strong>Tier 3:</strong> 300 accounts (long-cycle prospects)</li>
                  </ul>
                  <p className="mt-4"><strong>Assign each to 1 ICP:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Crypto/Web3/tokenization</li>
                    <li>FinTech / EMI/MSB</li>
                    <li>Funds/prop desks</li>
                    <li>Family offices / HNWIs</li>
                    <li>Cross-border SMEs</li>
                    <li>Licensing-driven entities</li>
                    <li>Tokenization hybrid players</li>
                  </ul>
                  <p className="mt-4"><strong>Tool:</strong> Excel → CRM → ABM platform.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.2 Deploy AI Intent Tracking Infrastructure
                </h3>
                <p className="text-gray-800 mb-4 leading-relaxed"><strong>Mandatory Tools (Best-in-Class Options):</strong></p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">AI Intent Platforms:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Apollo AI Signals</li>
                      <li>6sense</li>
                      <li>Clearbit Reveal</li>
                      <li>Demandbase One</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">Website intelligence:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Clearbit</li>
                      <li>Leadfeeder</li>
                      <li>Albacross</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">Social intent tools:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>LinkedIn Sales Navigator</li>
                      <li>Shield Analytics (optional)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">Email intelligence:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Instantly.ai</li>
                      <li>Clay.ai</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed"><strong>These tools detect when a target account:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800 mt-2">
                    <li>Visits certain key pages (offshore banking, VASP license, Cayman foundation etc.)</li>
                    <li>Reads competitor content</li>
                    <li>Downloads legal/regulatory documents</li>
                    <li>Publishes hiring patterns (growth stage indicator)</li>
                    <li>Gains investors (need for structuring)</li>
                    <li>Receives compliance warnings or flags</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.3 Build the ABM Content Library (Mandatory Components)
                </h3>
                <ol className="list-decimal list-inside ml-4 space-y-2 text-gray-800">
                  <li>Jurisdiction Guides: Cayman, BVI, Seychelles, Cook Islands, ADGM, DIFC</li>
                  <li>Licensing Playbooks: VASP, EMI, MSB, Forex, Fund licenses</li>
                  <li>Trust / Foundation Frameworks</li>
                  <li>Tokenization + SPV Playbooks</li>
                  <li>Banking Access Matrix (High Demand)</li>
                  <li>Regulatory Briefing Notes (Quarterly)</li>
                  <li>Case Studies (Anonymised)</li>
                </ol>
                <p className="mt-4 text-gray-800 leading-relaxed"><strong>Each asset must exist in:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>1-page summary</li>
                  <li>5–7 page briefing note</li>
                  <li>Executive slide version</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.4 Build the ABM Messaging Matrix
                </h3>
                <div className="space-y-4 text-gray-800 leading-relaxed">
                  <p>
                    You already received segment-specific messaging.
                  </p>
                  <p>
                    For ABM execution → insert these into a structured matrix:
                  </p>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Segment</li>
                      <li>Role</li>
                      <li>Trigger event</li>
                      <li>LinkedIn message</li>
                      <li>Email message</li>
                      <li>Follow-up message</li>
                      <li>Optional content attachment</li>
                    </ul>
                  </div>
                  <p className="mt-4">
                    This ensures personalisation at scale without losing boutique quality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              3. EXECUTION PROCESS — HOW ABM OPERATES
            </h2>
            <p className="text-gray-800 mb-6 leading-relaxed">
              ABM operates like a synchronised engine, not random outreach. Below is the operational flow.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  3.1 DAILY OPERATIONS (Inderjeet + Joel)
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">1. AI Intent Review (15 minutes)</h4>
                    <p className="text-gray-800 mb-2">Check which accounts show:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Surge in page visits</li>
                      <li>Leadership hiring</li>
                      <li>Funding updates</li>
                      <li>Regulatory search behaviour</li>
                      <li>Interest in "tokenization / banking / structuring"</li>
                    </ul>
                    <p className="mt-2 text-gray-800"><strong>Immediate action:</strong> Send a tailored message within 24 hours.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">2. Founder LinkedIn Activity (20 minutes)</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Publish micro-insights</li>
                      <li>Engage with target account posts</li>
                      <li>Accept relevant connections</li>
                    </ul>
                    <p className="mt-2 text-gray-800 italic">Consistency matters more than volume.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">3. Respond to Warm Signals (Ongoing)</h4>
                    <p className="text-gray-800 mb-2">AI will highlight:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>High-scoring accounts</li>
                      <li>Accounts showing "buying stage" behaviour</li>
                      <li>Anonymous visitors identified by Clearbit</li>
                    </ul>
                    <p className="mt-2 text-gray-800">Convert these into conversations.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  3.2 WEEKLY OPERATIONS
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">1. ABM Team Alignment (30-minute meeting)</h4>
                    <p className="text-gray-800 mb-2"><strong>Participants:</strong> Inderjeet, Joel, Operations, any sales reps.</p>
                    <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Which accounts are heating up</li>
                      <li>What follow-ups were done</li>
                      <li>Where founders need to intervene</li>
                      <li>New content needs</li>
                      <li>Structures that require explanation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">2. Publish One High-Value Content Piece</h4>
                    <p className="text-gray-800 mb-2"><strong>Examples:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>"2025 Banking Difficulty Matrix for Offshore Entities"</li>
                      <li>"Cayman vs BVI SPV for Tokenization Projects"</li>
                      <li>"Regulated Licensing Pathways for FinTech Firms"</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">3. Run Retargeting Ads to the TAU Only</h4>
                    <p className="text-gray-800 mb-2">Ads must be:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Professional</li>
                      <li>Minimalistic</li>
                      <li>Insight-driven (never salesy)</li>
                    </ul>
                    <p className="mt-2 text-gray-800"><strong>Budget:</strong> $20–$40/day is enough.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  3.3 MONTHLY OPERATIONS
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">1. Tier Review — Who Moves Up / Down</h4>
                    <p className="text-gray-800 mb-2">Based on:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Engagement</li>
                      <li>Intent scores</li>
                      <li>Interaction quality</li>
                      <li>Buying likelihood</li>
                    </ul>
                    <p className="mt-2 text-gray-800">Tier 2 → Tier 1 promotions trigger founder-level priority engagement.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">2. Account Deep-Dive Report</h4>
                    <p className="text-gray-800 mb-2">Each month, produce 5–7 detailed account dossiers:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>Ownership</li>
                      <li>Legal structure</li>
                      <li>Banking footprint</li>
                      <li>Licensing history</li>
                      <li>Funding</li>
                      <li>Compliance posture</li>
                      <li>Key decision-makers</li>
                    </ul>
                    <p className="mt-2 text-gray-800">These dossiers guide highly personalised outreach.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900">3. Private Roundtable / Briefing</h4>
                    <p className="text-gray-800 mb-2">Host:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li>CFO Roundtable</li>
                      <li>Crypto RegTech Fireside</li>
                      <li>Fund Formation Private Briefing</li>
                      <li>Licensing Workshop (invite-only)</li>
                    </ul>
                    <p className="mt-2 text-gray-800">These events convert high-intent accounts quickly.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              4. PERSONALISATION RULES (MANDATORY)
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Rule 1 — No mass messaging</h3>
                <p className="text-gray-800">Every touch must appear researched, intentional, and senior.</p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Rule 2 — Include one specific reference</h3>
                <p className="text-gray-800 italic">Example: "I saw your recent expansion announcement into Singapore — often this triggers the need for a secondary holding entity."</p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Rule 3 — Never sell. Always clarify.</h3>
                <p className="text-gray-800 mb-2">Your tone must feel like:</p>
                <p className="text-gray-800 italic">"We help you think through this."</p>
                <p className="text-gray-800 mt-2">Not:</p>
                <p className="text-gray-800 italic">"Buy from us."</p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Rule 4 — Attach a relevant briefing note</h3>
                <p className="text-gray-800">Never attach generic proposals.</p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Rule 5 — Founder-first credibility</h3>
                <p className="text-gray-800">ABM is most powerful when executed directly by founders.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              5. RISK CONTROLS
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Over-automation</h3>
                <p className="text-gray-800"><strong>Solution:</strong> AI assists awareness, founders handle selling.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Perceived aggressiveness</h3>
                <p className="text-gray-800"><strong>Solution:</strong> Use insight-led language, not sales language.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Sending sensitive content too early</h3>
                <p className="text-gray-800"><strong>Solution:</strong> Never share pricing or detailed structuring until intent is proven.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Compliance lapses</h3>
                <p className="text-gray-800"><strong>Solution:</strong> All discussions must remain general until KYC is completed.</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              6. ABM TOOL STACK (RECOMMENDED)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Core AI Layer</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>6sense (best option)</li>
                  <li>Apollo AI Signals (cost-effective)</li>
                  <li>Clearbit Reveal (website identification)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Outreach Layer</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>LinkedIn Sales Navigator</li>
                  <li>Clay.ai for personalisation at scale</li>
                  <li>Instantly.ai (email automation)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Content Layer</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Notion or HubSpot CMS</li>
                  <li>Canva / Figma (design)</li>
                  <li>YouTube (authority building)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Tracking Layer</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>HubSpot CRM</li>
                  <li>Monday / ClickUp for workflow</li>
                  <li>Google Analytics + Clearbit for intent tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              7. SUCCESS METRICS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Leading Indicators:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Identified accounts showing intent</li>
                  <li>% of TAU engaged</li>
                  <li>Founder-led conversations created</li>
                  <li>Meetings booked per ICP</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Lagging Indicators:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                  <li>Proposals issued</li>
                  <li>Win rates</li>
                  <li>Average deal size</li>
                  <li>Cycle time reduction</li>
                  <li>Lifetime value of clients</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              8. SUMMARY — HOW THE ENGINE WORKS
            </h2>
            <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
              <p className="text-lg text-gray-800 leading-relaxed">
                AI finds accounts → Founders engage → Personalized assets educate → Private meetings convert → High-value mandates close.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>ABM Execution Playbook</p>
            <p className="mt-2">Boyar Partners — Internal Use Only</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

