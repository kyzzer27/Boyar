"use client";

import { useState } from "react";

function SectionPanel({
  id,
  title,
  watermarkNum,
  children,
}: {
  id: string;
  index: number;
  title: string;
  watermarkNum: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="ob-panel relative overflow-hidden rounded-none border-b border-[#E0DDD0] px-0 py-10 sm:py-12"
    >
      <span
        className="pointer-events-none absolute right-0 top-4 text-[5rem] font-extralight tabular-nums text-black/[0.04] select-none sm:right-0 sm:top-6 sm:text-[6rem]"
        style={{ fontFamily: "var(--font-cinzel)" }}
        aria-hidden
      >
        {watermarkNum}
      </span>
      <h2
        className="relative mb-6 text-xl font-bold tracking-tight sm:text-2xl"
        style={{ fontFamily: "var(--font-cinzel)", color: "#FF0000" }}
      >
        {title}
      </h2>
      <div className="relative text-[15px] leading-[1.85] text-[#1a1a1a] font-medium">{children}</div>
    </section>
  );
}

function AccentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-[#FF0000]/30 bg-[#F7F5E8] py-3 pl-4 pr-4 rounded-r-lg">
      <p className="mb-2 text-sm font-bold text-[#1a1a1a]">{title}</p>
      <div className="space-y-1 text-[#4a4a4a]">{children}</div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-[#E0DDD0] bg-[#F7F5E8] p-4">
      <p className="mb-3 text-sm font-bold text-[#1a1a1a]">{title}</p>
      <ul className="space-y-1.5 text-sm text-[#4a4a4a]">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const navLabel = (num: number) => String(num).padStart(2, "0");

export function OnboardingDocument() {
  const [serviceTab, setServiceTab] = useState<"corporate" | "private" | "banking" | "tokenization">("corporate");

  return (
    <div className="mx-auto max-w-4xl">
      {/* Title block */}
      <header className="pb-10 border-b border-[#E0DDD0]">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7a7a7a] font-extrabold">BOYAR PARTNERS</p>
        <h1
          className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-cinzel)", color: "#000" }}
        >
          Institutional Client Onboarding &<br />
          <span style={{ color: "#FF0000" }}>Execution Governance Model</span>
        </h1>
      </header>

      {/* 01 Executive Overview */}
      <SectionPanel id="section-1" index={1} title="1. Executive Overview" watermarkNum={navLabel(1)}>
        <p className="mb-4">
          Boyar Partners will operate under a Risk-Weighted, Governance-Led Client Lifecycle Framework designed to:
        </p>
        <div className="mb-6 grid gap-2 sm:grid-cols-2">
          {[
            "Protect institutional credibility",
            "Minimize regulatory exposure",
            "Standardize execution quality",
            "Enable scalable service integration",
            "Ensure revenue integrity and compliance control",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]/40" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mb-4">This model is structured in alignment with:</p>
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {[
            "FATF Risk-Based Approach principles",
            "Big 4 financial services onboarding frameworks",
            "Global private banking KYC protocols",
            "Tier-1 fiduciary governance standards",
            "Institutional compliance monitoring architecture",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]/40" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p>The objective is to ensure that every client engagement transitions through a controlled, auditable, and risk-managed lifecycle.</p>
      </SectionPanel>

      {/* 02 Lifecycle Architecture */}
      <SectionPanel id="section-2" index={2} title="2. Institutional Client Lifecycle Architecture" watermarkNum={navLabel(2)}>
        <p className="mb-4">All closed mandates move through seven structured phases:</p>
        <div className="mb-6 grid gap-2 border border-[#E0DDD0] bg-[#F7F5E8] p-4 sm:grid-cols-2">
          {[
            "Mandate Activation",
            "Risk & Compliance Assessment",
            "Structuring Blueprint Development",
            "Execution & Regulatory Processing",
            "Integration & Implementation",
            "Completion & Documentation Control",
            "Ongoing Monitoring & Governance",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-bold tabular-nums" style={{ color: "#FF0000" }}>{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p>Each phase is governed by defined authority levels and documentation standards.</p>
      </SectionPanel>

      {/* 03 Phase I */}
      <SectionPanel id="section-3" index={3} title="3. Phase I – Mandate Activation Governance" watermarkNum={navLabel(3)}>
        <div className="space-y-6">
          <AccentBlock title="Trigger Conditions:">
            <p>Signed engagement agreement</p>
            <p>Initial advisory retainer received</p>
          </AccentBlock>
          <AccentBlock title="Institutional Controls:">
            <p>Unique client identifier creation</p>
            <p>Secure document repository allocation</p>
            <p>Dedicated Relationship Manager (RM) assignment</p>
            <p>Compliance Officer allocation</p>
            <p>Preliminary risk flagging</p>
          </AccentBlock>
          <AccentBlock title="Internal Deliverable:">
            <p>Client Onboarding Memorandum summarizing:</p>
            <p className="mt-2">Scope of engagement</p>
            <p>Service verticals involved</p>
            <p>Initial risk classification</p>
            <p>Execution roadmap</p>
          </AccentBlock>
        </div>
        <p className="mt-6">This ensures file-level accountability from Day 1.</p>
      </SectionPanel>

      {/* 04 Risk & Compliance */}
      <SectionPanel id="section-4" index={4} title="4. Phase II – Risk & Compliance Assessment Framework" watermarkNum={navLabel(4)}>
        <p className="mb-4">This phase precedes all execution activity.</p>
        <p className="mb-6">Aligned to international best practice, the following controls apply:</p>

        <div className="space-y-6">
          <div>
            <p className="mb-2 font-bold text-[#1a1a1a]">A. Identity & Ownership Verification</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>UBO mapping</span>
              <span>Multi-layer ownership tracing</span>
              <span>Corporate structure validation</span>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold text-[#1a1a1a]">B. Source of Wealth & Funds Validation</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>Document-backed substantiation</span>
              <span>Transaction flow expectation mapping</span>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold text-[#1a1a1a]">C. Risk Screening</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>Sanctions screening</span>
              <span>PEP identification</span>
              <span>Adverse media checks</span>
              <span>Jurisdiction risk mapping</span>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold text-[#1a1a1a]">D. Risk Scoring Model</p>
            <p className="mb-2">Each client is assigned a composite risk score across:</p>
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
              <span>Jurisdiction exposure</span>
              <span>Industry classification</span>
              <span>Banking dependency</span>
              <span>Regulatory intensity</span>
              <span>Transactional complexity</span>
              <span>Insurance / tokenization involvement</span>
            </div>
          </div>
        </div>

        <p className="mb-4 font-bold text-[#1a1a1a]">Risk Tiers:</p>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Standard", desc: "Routine approval" },
            { title: "Enhanced", desc: "Secondary compliance review" },
            { title: "High", desc: "Partner-level authorization" },
            { title: "Decline", desc: "Non-acceptance" },
          ].map((tier) => (
            <div
              key={tier.title}
              className="rounded-lg border border-[#E0DDD0] bg-[#F7F5E8] p-4 text-center"
            >
              <p className="font-bold text-[#1a1a1a]">{tier.title}</p>
              <p className="mt-1 text-sm text-[#4a4a4a]">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p>No operational execution begins without formal clearance.</p>
      </SectionPanel>

      {/* 05 Structuring Blueprint */}
      <SectionPanel id="section-5" index={5} title="5. Phase III – Structuring Blueprint Development" watermarkNum={navLabel(5)}>
        <p className="mb-4">This phase differentiates Boyar from transactional operators.</p>
        <p className="mb-2 font-bold text-[#1a1a1a]">Deliverables include:</p>
        <div className="mb-6 grid gap-2 border-l-[3px] border-[#FF0000]/20 pl-4">
          <p>Jurisdictional structuring rationale</p>
          <p>Regulatory impact assessment</p>
          <p>Banking feasibility assessment</p>
          <p>Compliance burden forecast</p>
          <p>Insurance or tokenization integration map (if applicable)</p>
          <p>Implementation sequencing plan</p>
        </div>
        <p className="mb-2">This structured advisory phase ensures:</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {["Reduced downstream rejection risk", "Improved banking success probability", "Clear regulatory positioning"].map((item) => (
            <div key={item} className="rounded-lg border border-[#E0DDD0] bg-[#F7F5E8] p-3 text-sm text-center">
              {item}
            </div>
          ))}
        </div>
      </SectionPanel>

      {/* 06 Service-Specific */}
      <SectionPanel id="section-6" index={6} title="6. Service-Specific Execution Frameworks" watermarkNum={navLabel(6)}>
        <p className="mb-6">Each vertical operates under defined procedural architecture.</p>

        <div className="mb-6 flex flex-wrap gap-1 border-b border-[#E0DDD0]">
          {(
            [
              { id: "corporate" as const, label: "Corporate Services" },
              { id: "private" as const, label: "Private & Wealth" },
              { id: "banking" as const, label: "Banking" },
              { id: "tokenization" as const, label: "Tokenization" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setServiceTab(id)}
              className="rounded-t-md px-4 py-2.5 text-sm font-bold transition-colors"
              style={{
                color: serviceTab === id ? "#FF0000" : "#7a7a7a",
                borderBottom: serviceTab === id ? "2px solid #FF0000" : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {serviceTab === "corporate" && (
          <div className="space-y-6 ob-tab-content">
            <p className="font-bold text-[#1a1a1a]">A. Corporate Services Handling Model — Company Formation</p>
            <AccentBlock title="Process Governance:">
              <p>Registry compliance verification</p>
              <p>Constitutional drafting review</p>
              <p>Director/shareholder eligibility checks</p>
              <p>Filing supervision</p>
              <p>Corporate record control</p>
            </AccentBlock>
            <AccentBlock title="Post-Incorporation Controls:">
              <p>Economic substance assessment</p>
              <p>Annual filing calendar creation</p>
              <p>Compliance trigger reminders</p>
              <p>Accounting system onboarding</p>
            </AccentBlock>
            <p>If banking required, file transitions to Banking Integration Workflow.</p>
          </div>
        )}

        {serviceTab === "private" && (
          <div className="space-y-6 ob-tab-content">
            <p className="font-bold text-[#1a1a1a]">B. Private Clients & Wealth Architecture — Trust Formation</p>
            <AccentBlock title="Governance Controls:">
              <p>Settlor KYC</p>
              <p>Beneficiary classification documentation</p>
              <p>Protector authority mapping</p>
              <p>Asset transfer validation</p>
              <p>Trustee acceptance documentation</p>
            </AccentBlock>
            <AccentBlock title="Post-Formation:">
              <p>Annual trust compliance review</p>
              <p>Distribution documentation tracking</p>
              <p>Regulatory reporting monitoring</p>
            </AccentBlock>
            <p className="font-bold text-[#1a1a1a]">Insurance & Captive Structuring</p>
            <p className="mb-2">Institutional Handling Includes:</p>
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
              <span>Feasibility & actuarial consultation</span>
              <span>Domicile regulatory mapping</span>
              <span>Capital adequacy review</span>
              <span>Reinsurance structuring</span>
              <span>Ongoing regulatory compliance calendar</span>
            </div>
            <p className="mb-2">For HNI policies:</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>Underwriting coordination</span>
              <span>Cross-border tax impact analysis</span>
              <span>Policy custody and periodic review</span>
            </div>
          </div>
        )}

        {serviceTab === "banking" && (
          <div className="space-y-6 ob-tab-content">
            <p className="font-bold text-[#1a1a1a]">C. Banking Services Handling Model</p>
            <p className="font-bold text-[#1a1a1a]">Offshore / Private Banking — Structured Process:</p>
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
              <span>Pre-submission partner bank screening</span>
              <span>Documentation normalization</span>
              <span>Submission supervision</span>
              <span>Compliance query management</span>
              <span>Account activation oversight</span>
            </div>
            <AccentBlock title="Decline Protocol:">
              <p>Immediate reassessment</p>
              <p>Alternative banking partner routing</p>
            </AccentBlock>
            <p className="font-bold text-[#1a1a1a]">Safeguarding Accounts — Additional Controls:</p>
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
              <span>EMI regulatory compliance review</span>
              <span>Transaction flow modeling</span>
              <span>Safeguarding segregation verification</span>
            </div>
            <p className="font-bold text-[#1a1a1a]">Forward Contracts & Treasury — Governance Framework:</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>FX exposure assessment</span>
              <span>Contract tenor planning</span>
              <span>Risk disclosure documentation</span>
              <span>Counterparty onboarding compliance</span>
              <span>Ongoing exposure monitoring</span>
            </div>
          </div>
        )}

        {serviceTab === "tokenization" && (
          <div className="space-y-6 ob-tab-content">
            <p className="font-bold text-[#1a1a1a]">D. Tokenization</p>
            <p className="mb-4">Tokenization involves elevated regulatory sensitivity.</p>
            <AccentBlock title="Execution Governance:">
              <p>Asset validation</p>
              <p>Legal classification review</p>
              <p>SPV structuring</p>
              <p>Smart contract compliance assessment</p>
              <p>Regulatory positioning</p>
              <p>AML framework integration</p>
              <p>Custody coordination</p>
            </AccentBlock>
            <p className="font-bold text-[#1a1a1a]">Post-issuance:</p>
            <p>Ongoing compliance supervision</p>
            <p>Secondary trading monitoring (if applicable)</p>
          </div>
        )}
      </SectionPanel>

      {/* 07 Completion & Documentation */}
      <SectionPanel id="section-7" index={7} title="7. Phase VI – Completion & Documentation Control" watermarkNum={navLabel(7)}>
        <p className="mb-4">A mandate is closed when:</p>
        <div className="mb-6 grid gap-2 sm:grid-cols-2">
          {[
            "Structure implemented",
            "Regulatory filings complete",
            "Banking operational (if applicable)",
            "Compliance file complete",
            "Final milestone payment received",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]/40" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mb-2">Client receives:</p>
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
          <span>Completion pack</span>
          <span>Compliance calendar</span>
          <span>Dedicated long-term RM</span>
        </div>
        <p>Internal closure memo archived.</p>
      </SectionPanel>

      {/* 08 Monitoring */}
      <SectionPanel id="section-8" index={8} title="8. Phase VII – Ongoing Monitoring & Governance" watermarkNum={navLabel(8)}>
        <p className="mb-6">Institutional-grade onboarding does not end at execution.</p>
        <p className="mb-4 font-bold text-[#1a1a1a]">Monitoring Structure</p>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <InfoCard title="Standard Clients:" items={["Annual KYC refresh", "Annual compliance review"]} />
          <InfoCard title="Enhanced Risk Clients:" items={["Semi-annual review", "Transaction pattern assessment"]} />
          <InfoCard title="High Risk Clients:" items={["Quarterly compliance review", "Partner oversight"]} />
        </div>
        <p className="mb-3 font-bold text-[#1a1a1a]">Quarterly Internal Reviews:</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span>Revenue concentration analysis</span>
          <span>Jurisdiction exposure review</span>
          <span>Risk portfolio balancing</span>
        </div>
      </SectionPanel>

      {/* 09 Governance Enhancements */}
      <SectionPanel id="section-9" index={9} title="9. Governance Enhancements (Advanced Institutional Layer)" watermarkNum={navLabel(9)}>
        <p className="mb-6">To elevate beyond traditional fiduciary operators, the following enhancements can be integrated:</p>
        <div className="space-y-4">
          {[
            {
              title: "1. Client Risk Heat Map Dashboard",
              sub: "Aggregate portfolio view of:",
              items: ["High-risk jurisdictions", "Industry exposure", "Revenue concentration", "Banking dependency"],
            },
            {
              title: "2. Dual-Control File Authorization",
              sub: "Two-person rule for:",
              items: ["High-risk approvals", "Tokenization structures", "Captive insurance formations"],
            },
            {
              title: "3. Structured Decline Policy",
              sub: "Documented refusal criteria:",
              items: ["Sanctioned jurisdictions", "Inadequate source of wealth", "Regulatory arbitrage intent"],
              extra: "Protects brand integrity.",
            },
            {
              title: "4. Compliance Escalation Committee",
              sub: "Monthly review of:",
              items: ["Complex files", "Regulatory changes", "Banking rejection trends"],
            },
            {
              title: "5. Digital Audit Trail Architecture",
              sub: "All document exchanges timestamped. Ensures defensibility under regulatory inquiry.",
              items: [],
            },
            {
              title: "6. Regulatory Horizon Scanning",
              sub: "Monitoring:",
              items: ["FATF updates", "OECD tax changes", "EU blacklists", "Crypto regulation shifts"],
              extra: "Integrated into onboarding advisories.",
            },
            {
              title: "7. Client Suitability Assessment",
              sub: "Particularly for:",
              items: ["Insurance wrappers", "Captives", "Forward contracts", "Tokenized offerings"],
              extra: "Ensures advisory defensibility.",
            },
            {
              title: "8. Service Integration Protocol",
              sub: "Cross-service referrals must trigger:",
              items: ["Updated risk review", "Updated engagement scope", "Revised compliance mapping"],
              extra: "Prevents fragmented risk exposure.",
            },
          ].map((block) => (
            <div key={block.title} className="border border-[#E0DDD0] bg-[#F7F5E8] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[#FF0000]" />
              <p className="mb-2 font-bold text-[#1a1a1a]">{block.title}</p>
              <p className="mb-2 text-sm text-[#4a4a4a]">{block.sub}</p>
              {block.items.length > 0 && (
                <ul className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {block.extra && <p className="text-sm text-[#4a4a4a]">{block.extra}</p>}
            </div>
          ))}
        </div>
      </SectionPanel>

      {/* 10 Technology */}
      <SectionPanel id="section-10" index={10} title="10. Technology Implementation Layer" watermarkNum={navLabel(10)}>
        <p className="mb-4">To operationalize this model, Boyar should implement:</p>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {[
            "CRM with compliance tagging capability",
            "Secure client portal",
            "Automated sanctions screening tools",
            "KYC workflow automation",
            "Document management with audit logs",
            "Compliance calendar automation",
            "Internal dashboard reporting",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 border border-[#E0DDD0] bg-[#F7F5E8] px-4 py-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]/50" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p>This converts governance design into scalable infrastructure.</p>
      </SectionPanel>

      {/* Final line */}
      <div className="py-10 border-b border-[#E0DDD0]">
        <p className="text-lg font-bold leading-relaxed text-[#1a1a1a]">
          This positions Boyar not as a startup incorporator, but as a structured advisory platform with institutional operating discipline.
        </p>
      </div>

      <footer className="py-8 text-center">
        <p className="text-[11px] uppercase tracking-[3px] text-[#7a7a7a] font-extrabold opacity-50">
          Boyar Partners — Confidential Investor Document — 2025
        </p>
      </footer>
    </div>
  );
}
