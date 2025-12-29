"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter, useParams } from "next/navigation";

interface Segment {
  id: string;
  title: string;
  purpose: string;
  positioningStatement: string;
  linkedInIntro?: string;
  followUp?: string;
  emailScript?: string;
  contextualTrigger: string;
  depthMessage: string;
}

const segments: Segment[] = [
  {
    id: "segment-1",
    title: "SEGMENT 1 — Crypto / Web3 / Tokenization Projects",
    purpose: "Engage founders and executives managing token designs, regulatory strategy, or banking constraints.",
    positioningStatement: "Boyar Partners engages with digital asset teams that require compliant entity structuring, investor-ready frameworks, and stable banking environments in Cayman, BVI, Seychelles, ADGM, and EU regulatory regimes.",
    linkedInIntro: "Noticed your recent developments and thought it may be useful to share a brief framework we use when advising Web3 teams on compliant token structuring and banking pathways. We support several digital asset groups navigating Cayman/BVI and VASP requirements.\n\nIf helpful, I can outline the structure that consistently delivers regulatory clarity.",
    followUp: "Teams at your stage typically face two structural decisions:\n\n1. selecting the jurisdiction for the primary entity, and\n2. securing banking that aligns with token flows.\n\nIf you're considering either, I can provide a short, neutral comparison of the available models.",
    contextualTrigger: "Use when the project raises funds, updates roadmap, lists a token, expands team, or posts about regulatory needs.",
    depthMessage: "Happy to prepare a brief, high-level architecture based on your token function and investor geography — no obligation. It helps clarify the regulatory track before execution.",
  },
  {
    id: "segment-2",
    title: "SEGMENT 2 — FinTech / EMI / MSB Applicants",
    purpose: "Engage emerging fintechs who require licensing clarity and cross-border bankability.",
    positioningStatement: "Boyar Partners supports fintech firms aligning licensing, corporate structure, and banking relationships across Europe, the UK, offshore finance centers, and digital-asset jurisdictions.",
    linkedInIntro: "I noticed your current growth phase aligns with teams preparing for EMI/MSB authorization. We advise on licensing structures across the EU, UK, and offshore centers, ensuring alignment between regulatory filings and banking support.\n\nIf relevant, I'm happy to outline the pathway we see working most consistently.",
    followUp: "A common challenge is the disconnect between licensing ambitions, entity placement, and supervisory expectations.\n\nI can share a concise jurisdiction-specific comparison that simplifies early-stage decision-making.",
    contextualTrigger: "Use when the company announces fundraising, payment product expansion, new compliance hires, or multi-country rollout.",
    depthMessage: "Can prepare a short regulatory trajectory overview showing how licensing choices affect later banking and compliance obligations.",
  },
  {
    id: "segment-3",
    title: "SEGMENT 3 — Investment Funds / Prop Desks / Asset Managers",
    purpose: "Engage funds evaluating Cayman, BVI, Luxembourg, or Singapore vehicles.",
    positioningStatement: "Boyar Partners structures and administers fund vehicles for boutique managers, prop firms, and alternative asset platforms requiring cross-border banking and compliance certainty.",
    linkedInIntro: "We support boutique fund managers with formation, administration, and banking alignment. Your strategy profile fits segments where Cayman/BVI vehicles remain optimal.\n\nIf you're reviewing fund options, I can summarise the key strategic considerations.",
    followUp: "A well-designed structure reduces audit friction, improves LP transparency, and smooths onboarding with custodians and exchanges.\n\nHappy to outline the jurisdictional trade-offs relevant to your strategy.",
    contextualTrigger: "Use when the fund launches a new strategy, raises capital, hires portfolio managers, or registers new entities.",
    depthMessage: "Can also share an anonymised case study of a similar mandate and the structure that led to successful regulatory review.",
  },
  {
    id: "segment-4",
    title: "SEGMENT 4 — SMEs / Cross-Border Entrepreneurs",
    purpose: "Engage founders expanding into multiple regions needing compliant setups.",
    positioningStatement: "Boyar Partners assists growth-stage companies with multi-jurisdiction structuring, entity mapping, banking integration, and tax-efficient cross-border operations.",
    linkedInIntro: "With your geographic expansion, structuring and banking alignment become materially important. We assist scaling companies in establishing stable, compliant cross-border frameworks.\n\nIf useful, I can share a jurisdictional brief tailored to your sector.",
    followUp: "Operational friction usually arises from banking integration and compliance sequencing.\n\nWe can provide a clear roadmap that aligns structure, operations, and regulatory expectations.",
    contextualTrigger: "Use when the company enters new markets, opens subsidiaries, hires internationally, or restructures ownership.",
    depthMessage: "Happy to map a clean entity model based on your expansion pattern — often clarifies unnecessary complexity.",
  },
  {
    id: "segment-5",
    title: "SEGMENT 5 — HNWI / Family Offices",
    purpose: "Engage UHNW decision-makers considering succession, privacy, or protection structures.",
    positioningStatement: "Boyar Partners advises families on international trust and foundation frameworks, governance design, asset protection, and multi-jurisdiction planning.",
    linkedInIntro: "We assist families with trust and foundation structures for succession, governance, and asset protection. If you're currently reviewing your arrangements, I can share a comparative analysis of the strongest jurisdictions.",
    followUp: "The balance between statutory protection and administrative flexibility often determines the best option.\n\nA short discussion usually clarifies which jurisdiction provides optimal long-term stability.",
    contextualTrigger: "Use when a family office executive posts about investments, succession planning, governance updates, or new acquisitions.",
    depthMessage: "Can prepare a brief jurisdiction matrix comparing Cook Islands, Nevis, BVI, and Cayman options.",
  },
  {
    id: "segment-6",
    title: "SEGMENT 6 — Tokenization / Corporate Structuring Hybrid Deals",
    purpose: "Engage founders needing SPV layers, fund wrappers, and compliance architecture.",
    positioningStatement: "Boyar Partners structures hybrid frameworks for tokenized assets, combining corporate entities, SPVs, fund vehicles, and compliance pathways to satisfy investors, exchanges, and regulators.",
    emailScript: "Many tokenization projects now integrate SPVs and fund structures to meet investor and exchange requirements. We advise on full-cycle setups, including regulatory pathways, custodial arrangements, and administration.\n\nIf helpful, I can share the structuring models currently receiving the strongest regulatory acceptance.",
    contextualTrigger: "Use when a project posts about fractionalization, RWA tokenization, new partnerships, or exchange applications.",
    depthMessage: "Can outline an SPV → fund → token flow model tailored to your asset type.",
  },
  {
    id: "segment-7",
    title: "SEGMENT 7 — Licensing Prospects (VASP, EMI, MSB, Forex, Broker-Dealer)",
    purpose: "Engage businesses needing precise licensing navigation.",
    positioningStatement: "Boyar Partners guides clients through structuring, regulatory applications, supervisory interface, and compliant banking for VASP, EMI, MSB, FX, broker-dealer, and fund licenses.",
    emailScript: "With the tightening regulatory landscape, licensing strategy requires precise jurisdictional selection. We advise on structuring, application preparation, supervisory engagement, and ongoing compliance.\n\nIf helpful, I can outline the licensing trajectories applicable to your business model.",
    contextualTrigger: "Use when companies scale into payments, digital assets, FX, or trading.",
    depthMessage: "Can provide a short comparison of VASP/EMI/MSB options across EU, UK, BVI, Cayman, and Seychelles.",
  },
];

export default function MessagingScriptsPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const modelId = params.modelId as string;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
              >
                ← Back
              </button>
              <h1 className="text-lg font-semibold text-black">Messaging Scripts</h1>
              <div className="w-20" /> {/* Spacer */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Title Page */}
          <div className="mb-16 text-center border-b border-gray-300 pb-12">
            <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              Messaging Scripts
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
              Account-Based Marketing Communication Framework
            </h2>
            <p className="text-gray-600 text-lg mt-4">Segmented messaging templates for precision outreach</p>
          </div>

          {/* Segments */}
          {segments.map((segment, index) => (
            <section key={segment.id} className="mb-16 last:mb-0">
              {/* Segment Header */}
              <div className="bg-gray-50 border-l-4 border-gray-800 pl-6 pr-6 py-4 mb-6">
                <h2 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                  {segment.title}
                </h2>
              </div>

              {/* Purpose */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">Purpose</h3>
                <p className="text-gray-800 leading-relaxed">{segment.purpose}</p>
              </div>

              {/* Positioning Statement */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">Positioning Statement</h3>
                <p className="text-gray-800 leading-relaxed italic">{segment.positioningStatement}</p>
              </div>

              {/* LinkedIn Intro or Email Script */}
              {(segment.linkedInIntro || segment.emailScript) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">
                    {segment.linkedInIntro ? "LinkedIn Intro" : "Email Script"}
                  </h3>
                  <div className="p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{segment.linkedInIntro || segment.emailScript}</p>
                  </div>
                </div>
              )}

              {/* Follow-Up */}
              {segment.followUp && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">Follow-Up</h3>
                  <div className="p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{segment.followUp}</p>
                  </div>
                </div>
              )}

              {/* Contextual Trigger */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">Contextual Trigger</h3>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">{segment.contextualTrigger}</p>
                </div>
              </div>

              {/* Depth Message */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wide text-sm">Depth Message</h3>
                <div className="p-5 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">{segment.depthMessage}</p>
                </div>
              </div>

              {/* Divider */}
              {index < segments.length - 1 && (
                <div className="border-t border-gray-300 mt-12 pt-8"></div>
              )}
            </section>
          ))}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>Messaging Scripts Reference Guide</p>
            <p className="mt-2">Boyar Partners — Confidential</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

