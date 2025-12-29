"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function ExecutionPlaybookPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const normalize = (value?: string) =>
    value
      ?.toLowerCase()
      .trim()
      .replace(/_/g, "-")
      .replace(/\s+/g, "-");
  const rawModelId = normalize(params.modelId as string);

  const aliasMap: Record<string, string> = {
    "cross-border-feeder": "cross-border-ma-feeder",
    "cross-border-ma-feeder": "cross-border-ma-feeder",
    "investor-club-syndicate-partnerships": "investor-club-syndicate",
    "investor-club-syndicate-partnership": "investor-club-syndicate",
    "law-firm-cobranded": "law-firm-co-branded",
    "law-firm-strategic-co-branded": "law-firm-co-branded",
    "strategic-partnerships-alliances": "strategic-partnerships-referral",
    "strategic-partnership-referral": "strategic-partnerships-referral",
    "private-banker-alliances": "private-banker-wealth-manager",
    "private-banker-wealth-alliances": "private-banker-wealth-manager",
    "fund-manager-pipeline-programs": "fund-manager-pipeline",
    "crypto-exchange-otc-partnerships": "crypto-exchange-otc",
    "incubator-accelerator-dealflow": "incubator-accelerator",
    "founder-led-generation": "founder-led-origination",
    "founder-led-acquisition": "founder-led-origination",
    "founder-led": "founder-led-origination",
    "founder-led-origination-model": "founder-led-origination",
    "founder-led-generation-model": "founder-led-origination",
    "founder-led-origination-1": "founder-led-origination",
    "founder-led-originination": "founder-led-origination",
    "founder-led-originination-model": "founder-led-origination",
    "founder-led-generation-1": "founder-led-origination",
    "founder-led-origination-2": "founder-led-origination",
    "founder-led-origination-3": "founder-led-origination",
    "founder-led-originination-1": "founder-led-origination",
    "founder-led-originination-2": "founder-led-origination",
    "linkedin-outreach": "linkedin-executive-outreach",
    "linkedin-executive": "linkedin-executive-outreach",
    "linkedin-outreach-model": "linkedin-executive-outreach",
    "linkedin-executive-outreach-model": "linkedin-executive-outreach",
    "linkedin-executive-outreach-1": "linkedin-executive-outreach",
    "linkedin-executive-outreach-model-1": "linkedin-executive-outreach",
    "linkedin-executive-outreach-model-2": "linkedin-executive-outreach",
    "linkedin-executive-outreach-2": "linkedin-executive-outreach",
    "linkedin-executive-outreach-3": "linkedin-executive-outreach",
    "linked-in-executive-outreach": "linkedin-executive-outreach",
    "linked-in-outreach": "linkedin-executive-outreach",
    "thought-leadership": "thought-leadership-media",
    "media-authority": "thought-leadership-media",
    "thought-leadership-media-model": "thought-leadership-media",
    "thought-leadership-media-1": "thought-leadership-media",
    "offshore-masterclass-series": "offshore-masterclass",
    "offshore-masterclass-model": "offshore-masterclass",
    "offshore-masterclass-1": "offshore-masterclass",
    "masterclass-offshore": "offshore-masterclass",
    "reputation-borrowing-appearances": "reputation-borrowing",
    "reputation-guest-appearances": "reputation-borrowing",
    "guest-appearances": "reputation-borrowing",
    "youtube-expertise-positioning": "youtube-expertise",
    "youtube-expertise-model": "youtube-expertise",
    "youtube-expert": "youtube-expertise",
    "website-seo-newsletter": "website-seo-newsletter",
    "website-seo": "website-seo-newsletter",
    "seo-newsletter": "website-seo-newsletter",
    "newsletter-inbound": "website-seo-newsletter",
    "seo-inbound": "website-seo-newsletter",
    "website-inbound": "website-seo-newsletter",
    "high-intent-google": "high-intent-google",
    "google-capture": "high-intent-google",
    "high-intent-search": "high-intent-google",
    "intent-google": "high-intent-google",
    "google-inbound": "high-intent-google",
    "jurisdiction-intel-report": "jurisdiction-intel-report",
    "jurisdiction-intelligence-report": "jurisdiction-intel-report",
    "gated-jurisdiction-report": "jurisdiction-intel-report",
    "jurisdiction-report": "jurisdiction-intel-report",
    "jurisdiction-intel": "jurisdiction-intel-report",
    "jurisdiction-intelligence": "jurisdiction-intel-report",
    "compliance-lead-magnets": "compliance-lead-magnets",
    "compliance-lead-magnet": "compliance-lead-magnets",
    "aml-es-crs": "compliance-lead-magnets",
    "compliance-magnets": "compliance-lead-magnets",
    "aml-compliance": "compliance-lead-magnets",
    "es-crs-compliance": "compliance-lead-magnets",
    "multi-jurisdiction-comparison": "multi-jurisdiction-comparison",
    "jurisdiction-comparison": "multi-jurisdiction-comparison",
    "comparison-engine": "multi-jurisdiction-comparison",
    "jurisdiction-comparison-engine": "multi-jurisdiction-comparison",
    "multi-jurisdiction": "multi-jurisdiction-comparison",
    "search-emergency-advisory": "search-emergency-advisory",
    "emergency-advisory": "search-emergency-advisory",
    "emergency-capture": "search-emergency-advisory",
    "search-emergency": "search-emergency-advisory",
    "emergency-advisory-capture": "search-emergency-advisory",
    "regulatory-update-alerts": "regulatory-update-alerts",
    "regulatory-alerts": "regulatory-update-alerts",
    "regulatory-updates": "regulatory-update-alerts",
    "update-alerts": "regulatory-update-alerts",
    "regulatory-funnel": "regulatory-update-alerts",
    "precision-linkedin-dealflow": "precision-linkedin-dealflow",
    "linkedin-dealflow": "precision-linkedin-dealflow",
    "precision-linkedin": "precision-linkedin-dealflow",
    "linkedin-funnels": "precision-linkedin-dealflow",
    "linkedin-dealflow-funnels": "precision-linkedin-dealflow",
    "whatsapp-vip-nurture": "whatsapp-vip-nurture",
    "whatsapp-vip": "whatsapp-vip-nurture",
    "vip-nurture": "whatsapp-vip-nurture",
    "whatsapp-nurture": "whatsapp-vip-nurture",
    "vip-lead-nurture": "whatsapp-vip-nurture",
    "private-slack-telegram": "private-slack-telegram",
    "slack-telegram": "private-slack-telegram",
    "private-slack": "private-slack-telegram",
    "private-telegram": "private-slack-telegram",
    "slack-communities": "private-slack-telegram",
    "telegram-communities": "private-slack-telegram",
    "high-net-worth-email": "high-net-worth-email",
    "hnw-email": "high-net-worth-email",
    "email-drip": "high-net-worth-email",
    "hnw-email-drip": "high-net-worth-email",
    "email-architecture": "high-net-worth-email",
    "precision-retargeting": "precision-retargeting",
    "precision-retargeting-segments": "precision-retargeting",
    "retargeting": "precision-retargeting",
    "high-intent-retargeting": "precision-retargeting",
    "intent-retargeting": "precision-retargeting",
    "multi-touch-nurture": "multi-touch-nurture",
    "multi-touch-nurture-automation": "multi-touch-nurture",
    "nurture-automation": "multi-touch-nurture",
    "multi-touch": "multi-touch-nurture",
    "nurture": "multi-touch-nurture",
    "referral-introducer-networks": "referral-introducer-networks",
    "referral-introducer": "referral-introducer-networks",
    "referral-network": "referral-introducer-networks",
    "introducer-network": "referral-introducer-networks",
    "partner-network": "referral-introducer-networks",
    "family-office-acquisition": "family-office-acquisition",
    "family-office": "family-office-acquisition",
    "fo-acquisition": "family-office-acquisition",
    "fo-network": "family-office-acquisition",
    "boutique-vc-angel": "boutique-vc-angel",
    "boutique-vc": "boutique-vc-angel",
    "vc-angel": "boutique-vc-angel",
    "vc-syndicate": "boutique-vc-angel",
    "angel-syndicate": "boutique-vc-angel",
    "global-mobility-residency": "global-mobility-residency",
    "global-mobility-residency-co-marketing": "global-mobility-residency",
    "global-mobility": "global-mobility-residency",
    "mobility-residency": "global-mobility-residency",
    "mobility-residency-model": "global-mobility-residency",
    "mobility-residency-co-marketing": "global-mobility-residency",
    "cfo-gc-roundtable": "cfo-gc-roundtable",
    "cfo-gc-executive-roundtable": "cfo-gc-roundtable",
    "cfo-roundtable": "cfo-gc-roundtable",
    "gc-roundtable": "cfo-gc-roundtable",
    "cfo-gc-roundtable-model": "cfo-gc-roundtable",
    "cfo-gc-acquisition": "cfo-gc-roundtable",
  };

  const modelId =
    aliasMap[rawModelId ?? ""] ??
    (rawModelId?.includes("founder") ? "founder-led-origination" : undefined) ??
    (rawModelId?.includes("linkedin") ? "linkedin-executive-outreach" : undefined) ??
    (rawModelId?.includes("thought") ? "thought-leadership-media" : undefined) ??
    (rawModelId?.includes("media") ? "thought-leadership-media" : undefined) ??
    (rawModelId?.includes("masterclass") ? "offshore-masterclass" : undefined) ??
    (rawModelId?.includes("reputation") ? "reputation-borrowing" : undefined) ??
    (rawModelId?.includes("guest") ? "reputation-borrowing" : undefined) ??
    (rawModelId?.includes("youtube") ? "youtube-expertise" : undefined) ??
    (rawModelId?.includes("mobility") ? "global-mobility-residency" : undefined) ??
    (rawModelId?.includes("residency") ? "global-mobility-residency" : undefined) ??
    (rawModelId?.includes("seo") ? "website-seo-newsletter" : undefined) ??
    (rawModelId?.includes("newsletter") ? "website-seo-newsletter" : undefined) ??
    (rawModelId?.includes("google") ? "high-intent-google" : undefined) ??
    (rawModelId?.includes("intent") ? "high-intent-google" : undefined) ??
    (rawModelId?.includes("jurisdiction") ? "jurisdiction-intel-report" : undefined) ??
    (rawModelId?.includes("report") ? "jurisdiction-intel-report" : undefined) ??
    (rawModelId?.includes("compliance") ? "compliance-lead-magnets" : undefined) ??
    (rawModelId?.includes("aml") ? "compliance-lead-magnets" : undefined) ??
    (rawModelId?.includes("crs") ? "compliance-lead-magnets" : undefined) ??
    (rawModelId?.includes("comparison") ? "multi-jurisdiction-comparison" : undefined) ??
    (rawModelId?.includes("multi-jurisdiction") ? "multi-jurisdiction-comparison" : undefined) ??
    (rawModelId?.includes("emergency") ? "search-emergency-advisory" : undefined) ??
    (rawModelId?.includes("search-emergency") ? "search-emergency-advisory" : undefined) ??
    (rawModelId?.includes("regulatory") ? "regulatory-update-alerts" : undefined) ??
    (rawModelId?.includes("update-alerts") ? "regulatory-update-alerts" : undefined) ??
    (rawModelId?.includes("linkedin-dealflow") ? "precision-linkedin-dealflow" : undefined) ??
    (rawModelId?.includes("precision-linkedin") ? "precision-linkedin-dealflow" : undefined) ??
    (rawModelId?.includes("whatsapp-vip") ? "whatsapp-vip-nurture" : undefined) ??
    (rawModelId?.includes("vip-nurture") ? "whatsapp-vip-nurture" : undefined) ??
    (rawModelId?.includes("slack-telegram") ? "private-slack-telegram" : undefined) ??
    (rawModelId?.includes("private-slack") ? "private-slack-telegram" : undefined) ??
    (rawModelId?.includes("private-telegram") ? "private-slack-telegram" : undefined) ??
    (rawModelId?.includes("high-net-worth-email") ? "high-net-worth-email" : undefined) ??
    (rawModelId?.includes("hnw-email") ? "high-net-worth-email" : undefined) ??
    (rawModelId?.includes("email-drip") ? "high-net-worth-email" : undefined) ??
    (rawModelId?.includes("precision-retargeting") ? "precision-retargeting" : undefined) ??
    (rawModelId?.includes("retargeting") ? "precision-retargeting" : undefined) ??
    (rawModelId?.includes("intent-retargeting") ? "precision-retargeting" : undefined) ??
    (rawModelId?.includes("multi-touch-nurture") ? "multi-touch-nurture" : undefined) ??
    (rawModelId?.includes("nurture-automation") ? "multi-touch-nurture" : undefined) ??
    (rawModelId?.includes("multi-touch") ? "multi-touch-nurture" : undefined) ??
    (rawModelId?.includes("referral-introducer") ? "referral-introducer-networks" : undefined) ??
    (rawModelId?.includes("referral-network") ? "referral-introducer-networks" : undefined) ??
    (rawModelId?.includes("introducer-network") ? "referral-introducer-networks" : undefined) ??
    (rawModelId?.includes("partner-network") ? "referral-introducer-networks" : undefined) ??
    (rawModelId?.includes("family-office-acquisition") ? "family-office-acquisition" : undefined) ??
    (rawModelId?.includes("family-office") ? "family-office-acquisition" : undefined) ??
    (rawModelId?.includes("fo-acquisition") ? "family-office-acquisition" : undefined) ??
    (rawModelId?.includes("fo-network") ? "family-office-acquisition" : undefined) ??
    (rawModelId?.includes("boutique-vc-angel") ? "boutique-vc-angel" : undefined) ??
    (rawModelId?.includes("boutique-vc") ? "boutique-vc-angel" : undefined) ??
    (rawModelId?.includes("vc-angel") ? "boutique-vc-angel" : undefined) ??
    (rawModelId?.includes("vc-syndicate") ? "boutique-vc-angel" : undefined) ??
    (rawModelId?.includes("angel-syndicate") ? "boutique-vc-angel" : undefined) ??
    (rawModelId?.includes("roundtable") ? "cfo-gc-roundtable" : undefined) ??
    (rawModelId?.includes("cfo") ? "cfo-gc-roundtable" : undefined) ??
    (rawModelId?.includes("gc") ? "cfo-gc-roundtable" : undefined) ??
    rawModelId ??
    "founder-led-origination";

  // Ensure auth context is present even on direct loads / new tabs
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("isAuthenticated")) {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userRole", "Team");
      }
    } catch (err) {
      console.error("Auth bootstrap failed", err);
    }
  }, []);

  // Check which model this is for
  const isLinkedInModel = modelId === "linkedin-executive-outreach";
  const isCommissionModel = modelId === "commission-based-representative";
  const isFounderModel = modelId === "founder-led-origination";
  const isFamilyOfficeModel = modelId === "family-office-uhnw";
  const isPrivateBankerModel = modelId === "private-banker-wealth-manager";
  const isFundManagerModel = modelId === "fund-manager-pipeline";
  const isCrossBorderMAModel = modelId === "cross-border-ma-feeder";
  const isInvestorClubModel = modelId === "investor-club-syndicate";
  const isCryptoExchangeModel = modelId === "crypto-exchange-otc";
  const isIncubatorModel = modelId === "incubator-accelerator";
  const isLawFirmModel = modelId === "law-firm-co-branded";
  const isStrategicPartnershipModel = modelId === "strategic-partnerships-referral";
  const sectionClass =
    "mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4";
  const headingClass = "text-2xl font-bold mb-2 text-black";
  const listClass = "list-disc ml-6 space-y-2 pl-0";
  const isThoughtLeadershipModel = modelId === "thought-leadership-media";
  const isOffshoreMasterclassModel = modelId === "offshore-masterclass";
  const isReputationBorrowingModel = modelId === "reputation-borrowing";
  const isYouTubeModel = modelId === "youtube-expertise";
  const isPrivateWebinarModel = modelId === "private-webinars";
  const isCfoRoundtableModel = modelId === "cfo-gc-roundtable";
  const isGlobalMobilityModel = modelId === "global-mobility-residency";
  const isSeoNewsletterModel = modelId === "website-seo-newsletter";
  const isHighIntentGoogleModel = modelId === "high-intent-google";
  const isJurisdictionIntelModel = modelId === "jurisdiction-intel-report";
  const isComplianceLeadMagnetsModel = modelId === "compliance-lead-magnets";
  const isMultiJurisdictionComparisonModel = modelId === "multi-jurisdiction-comparison";
  const isSearchEmergencyAdvisoryModel = modelId === "search-emergency-advisory";
  const isRegulatoryUpdateAlertsModel = modelId === "regulatory-update-alerts";
  const isPrecisionLinkedInDealflowModel = modelId === "precision-linkedin-dealflow";
  const isWhatsAppVipNurtureModel = modelId === "whatsapp-vip-nurture";
  const isPrivateSlackTelegramModel = modelId === "private-slack-telegram";
  const isHighNetWorthEmailModel = modelId === "high-net-worth-email";
  const isPrecisionRetargetingModel = modelId === "precision-retargeting";
  const isMultiTouchNurtureModel = modelId === "multi-touch-nurture";
  const isReferralIntroducerNetworksModel = modelId === "referral-introducer-networks";
  const isFamilyOfficeAcquisitionModel = modelId === "family-office-acquisition";
  const isBoutiqueVcAngelModel = modelId === "boutique-vc-angel";
  const plainSectionClass = "mb-10 space-y-4 text-gray-800 leading-relaxed text-left";
  const plainHeadingClass = "text-2xl font-bold mb-2 text-black";

  // LinkedIn Executive Outreach Execution Playbook
  if (isLinkedInModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">LinkedIn Executive Outreach</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                LinkedIn Executive Outreach Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Handbook for Boyar Partners
              </h2>
            </div>

            {/* 1. Required Tools */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Required Tools for Model 2
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Purpose</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Executive targeting</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Sales Navigator</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Content analytics</td>
                        <td className="px-3 py-2 border-b border-gray-200">Shield Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">AI research</td>
                        <td className="px-3 py-2 border-b border-gray-200">Clay.ai</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">AI personalization</td>
                        <td className="px-3 py-2 border-b border-gray-200">Lyne.ai / Clay workflows</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM tracking</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion CRM</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Scheduling</td>
                        <td className="px-3 py-2 border-b border-gray-200">Buffer or Later</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Document sharing</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Drive</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Image assets</td>
                        <td className="px-3 py-2">Canva Pro</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-justify font-semibold">
                  Minimum stack: Sales Navigator + CRM + Shield + Google Drive.
                </p>
              </div>
            </section>

            {/* 2. Setup */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Setup: Three Foundational Components
              </h2>
              <div className="space-y-5 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">2.1 Profile Optimisation</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Show jurisdictional competence, regulatory knowledge, advisory credibility, boutique professionalism.</li>
                    <li className="text-justify">Headline: “Offshore Structuring | Licensing | Trusts | Banking Advisory”.</li>
                    <li className="text-justify">Featured: jurisdiction guides, insights, videos; About section with founder authority; anonymized case studies.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">2.2 Segmented Target Lists (Sales Navigator)</p>
                  <p className="text-justify">Build 6 lists: Crypto/Web3; FinTech/EMI/MSB; Funds/Asset Managers; SMEs (cross-border); HNWIs/Family offices; Licensing-driven businesses.</p>
                  <p className="text-justify mt-2">Target roles: Founder, CEO, COO/CFO, GC, Partner, Managing Director, Compliance Head.</p>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">2.3 Core Content System (Monthly)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Formats: Jurisdiction updates, Licensing insights, Banking environment changes, Structuring playbooks, Case studies, Short thought leadership.</li>
                    <li className="text-justify">Posting: 4–8 times per month; always high-value, never generic.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Cadence */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Daily, Weekly & Monthly Execution Cadence
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Daily (Founders)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Accept/review connection requests (prioritize execs)</li>
                    <li className="text-justify">Check who engaged with last post (intent signals)</li>
                    <li className="text-justify">Send 3–5 personalised outreach messages (one per segment)</li>
                    <li className="text-justify">Respond to inbound; move serious to private calls</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Weekly</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Publish 1 technical insight / jurisdiction update (founders)</li>
                    <li className="text-justify">Outreach 20–30 targeted accounts (personalised)</li>
                    <li className="text-justify">Follow-up with high-engagement prospects (invite to private call)</li>
                    <li className="text-justify">Update CRM; tag by segment and intent score</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Monthly</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Produce a longer-form briefing note (share privately)</li>
                    <li className="text-justify">Host 1 micro-event (audio room / closed-door briefing / CFO or Fund Q&A)</li>
                    <li className="text-justify">Review success metrics (posts → calls, segments responding)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Outreach Blueprint */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Outreach Blueprint (Execution Workflow)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 1 — Identify Trigger</p>
                  <p className="text-justify">Funding, expansion, regulation posts, banking issues, compliance hires.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 2 — Send the Intro Message</p>
                  <p className="text-justify">
                    Tone: professional, discreet, helpful. Example: “I thought it may be useful to share a brief framework we use for teams evaluating offshore structuring and banking options. If relevant, happy to outline where firms in your position typically see success.”
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 3 — If Accepted → Soft Follow-Up</p>
                  <p className="text-justify">Example: “Sharing a short jurisdictional note that tends to help founders clarify early decisions.” Attach relevant doc.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 4 — Invite to Private Discussion (Only When Warm)</p>
                  <p className="text-justify">
                    Example: “If you’re evaluating options in the next 60 days, happy to walk through the structure that aligns best with your scenario.” Never push early.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 5 — Move to Calendar Booking</p>
                  <p className="text-justify">Use Meet/Zoom/Calendly.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 6 — Enter Pipeline</p>
                  <p className="text-justify">Push to CRM with segment, role, warmth, trigger, recommended next step.</p>
                </div>
              </div>
            </section>

            {/* 5. Governance Controls */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Governance Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-justify"><strong>Control 1:</strong> No mass outreach — insight-led, boutique tone.</p>
                    <p className="text-justify mt-2"><strong>Control 2:</strong> Maintain discretion — no sensitive discussions in LinkedIn chat.</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-justify"><strong>Control 3:</strong> Messaging consistency — founders follow shared tone/voice.</p>
                    <p className="text-justify mt-2"><strong>Control 4:</strong> Weekly review of inactive warm leads — targeted follow-ups.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. KPI System */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. KPI System
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Connection acceptance rate</li>
                    <li className="text-justify">Executive reply rate</li>
                    <li className="text-justify">Calls booked</li>
                    <li className="text-justify">Warm introductions generated</li>
                    <li className="text-justify">LinkedIn engagement quality</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Post engagement from ICP</li>
                    <li className="text-justify">Profile visits by ICP</li>
                    <li className="text-justify">Prospects moved to pipeline</li>
                    <li className="text-justify">Briefing notes downloaded privately</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  LinkedIn → Micro insights → Authority → Private conversations → Founder-led diagnostic → Mandate.
                </p>
                <p className="text-justify mt-2">
                  Boyar Partners’ expertise + founders’ personal credibility = a conversion engine that outperforms paid marketing.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Thought Leadership & Media Authority Execution Playbook
  if (isThoughtLeadershipModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Thought Leadership & Media Authority</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Thought Leadership & Media Authority Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* 1. Tools Required */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Purpose</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Writing & content</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion, Google Docs</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Canva Pro, Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Video production</td>
                        <td className="px-3 py-2 border-b border-gray-200">iPhone + lapel mic + CapCut/Descript</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Distribution</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn, YouTube, Medium</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Scheduling</td>
                        <td className="px-3 py-2 border-b border-gray-200">Buffer / Hypefury</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Media outreach</td>
                        <td className="px-3 py-2">Qwoted, HARO, PodcastGuests</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-justify font-semibold">No large budget required — only consistency and precision.</p>
              </div>
            </section>

            {/* 2. Content Architecture */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Thought Leadership Content Architecture
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Monthly Jurisdiction Updates (Flagship)</p>
                  <p className="text-justify">2–4 pages covering regulatory changes, banking updates, licensing news, and compliance trends.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Licensing & Regulatory Explainers</p>
                  <p className="text-justify">Short text/video on VASP, EMI, MSB, token foundations, DIFC/ADGM, EU MiCA, MSB licensing.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Structuring & SPV Frameworks</p>
                  <p className="text-justify">Equity location, IP location, banking alignment, tax-neutral SPVs, investment vehicles.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Banking Intelligence Bulletins</p>
                  <p className="text-justify">Crypto onboarding, FIAT ramps, UBO restrictions, required documentation, regional differences.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Short-form Video Expertise (Inderjeet-led)</p>
                  <p className="text-justify">1 video/week (Cayman vs BVI, token foundations, banking rejection reasons, pre-fundraise structuring, VASP basics).</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Guest Articles & Media Features</p>
                  <p className="text-justify">Crypto news outlets, licensing blogs, fintech publications, entrepreneur platforms, finance/VC/crypto podcasts.</p>
                </div>
              </div>
            </section>

            {/* 3. Weekly Operational Framework */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Weekly Operational Framework
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Week 1</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Publish a jurisdiction bulletin</li>
                    <li className="text-justify">Record 2 videos</li>
                    <li className="text-justify">Write 1 licensing explainer</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Week 2</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Publish a structuring framework</li>
                    <li className="text-justify">1 guest article pitch</li>
                    <li className="text-justify">1 short media commentary submission</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Week 3</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Publish banking intelligence</li>
                    <li className="text-justify">Release a diagram/visual explainer</li>
                    <li className="text-justify">Film a 3–5 minute educational video</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Week 4</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Co-branded content with a partner</li>
                    <li className="text-justify">Distribute monthly digest</li>
                    <li className="text-justify">Host one closed-door briefing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Distribution Architecture */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Distribution Architecture
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Primary Channels</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn (main)</li>
                    <li className="text-justify">YouTube (authority amplification)</li>
                    <li className="text-justify">Private WhatsApp broadcasts (HNWIs, bankers, partners)</li>
                    <li className="text-justify">Newsletter (optional, monthly)</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary Channels</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Medium</li>
                    <li className="text-justify">Partner newsletters</li>
                    <li className="text-justify">Accelerator communities</li>
                    <li className="text-justify">WhatsApp networks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Governance Standards */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 1 — Absolute accuracy:</strong> Nothing speculative; everything factual.</p>
                  <p className="text-justify mt-2"><strong>Rule 2 — No client names/details:</strong> Confidentiality is foundational.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 3 — Professional tone:</strong> Must match boutique positioning.</p>
                  <p className="text-justify mt-2"><strong>Rule 4 — Consistency beats volume:</strong> Predictable cadence over sporadic bursts.</p>
                  <p className="text-justify mt-2"><strong>Rule 5 — Founder-led visibility:</strong> Inderjeet as intellectual face; Joel supports research/prep.</p>
                </div>
              </div>
            </section>

            {/* 6. KPI System */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. KPIs
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Leading Indicators</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Content impressions</li>
                    <li className="text-justify">Engagement from executives</li>
                    <li className="text-justify">Media invitations</li>
                    <li className="text-justify">Partner credibility feedback</li>
                    <li className="text-justify">Referral lift</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Lagging Indicators</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Inbound consultations</li>
                    <li className="text-justify">Partnership inquiries</li>
                    <li className="text-justify">Larger scopes of work</li>
                    <li className="text-justify">Premium pricing acceptance</li>
                    <li className="text-justify">Deal velocity improvement</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-quality insights → Perceived authority → Faster trust → Better clients → Stronger partnerships → Compounding inbound dealflow.
                </p>
                <p className="text-justify mt-2">Thought leadership is the trust engine of Boyar Partners.</p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Offshore Masterclass Series Execution Playbook
  if (isOffshoreMasterclassModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Offshore Masterclass Series</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Offshore Masterclass Series Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* 1. Tools Required */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Hosting</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zoom, Google Meet</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Recording</td>
                        <td className="px-3 py-2 border-b border-gray-200">OBS, Zoom Cloud</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Canva Pro, Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot, Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Registration</td>
                        <td className="px-3 py-2 border-b border-gray-200">Typeform, Eventbrite</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Distribution</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn, WhatsApp Broadcast</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Media storage</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Drive</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Automation</td>
                        <td className="px-3 py-2">Zapier (optional)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-justify font-semibold">No large budget required — only consistency and precision.</p>
              </div>
            </section>

            {/* 2. Masterclass Production Framework */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Masterclass Production Framework
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 1 — Topic Selection (Demand-Based)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">How to Structure Before Fundraising</li>
                    <li className="text-justify">Cayman vs BVI vs Cook Islands — Which One and Why?</li>
                    <li className="text-justify">How Token Foundations Actually Work</li>
                    <li className="text-justify">VASP Licensing in 2025 — Global Overview</li>
                    <li className="text-justify">Banking for Crypto & High-Risk Entities</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 2 — Professional Presentation Deck</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Problem framing; jurisdiction comparison; regulatory overview</li>
                    <li className="text-justify">Structuring diagrams; banking pathways; anonymized scenarios; clear frameworks; Q&A</li>
                    <li className="text-justify">Visual clarity = authority</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 3 — Outreach for Attendance</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn (organic + personalised), partners (lawyers, accountants, bankers)</li>
                    <li className="text-justify">Accelerators & incubators, investor clubs, Telegram/WhatsApp communities, previous attendees</li>
                    <li className="text-justify">No ads required.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 4 — Hosting the Masterclass</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Authority, calm professionalism, zero sales language</li>
                    <li className="text-justify">Clear diagrams, jurisdiction precision, banking nuances, licensing logic</li>
                    <li className="text-justify">Close with: “For a private structuring diagnostic, reach out directly.”</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 5 — Post-Session Follow-Up</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Send recording, slides, summary, structuring diagnostic offer, jurisdiction brief</li>
                    <li className="text-justify">Generates consultations.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">STEP 6 — Convert Warm Leads</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">ABM nurturing, email personalization, LinkedIn retargeting, private diagnostic calls</li>
                    <li className="text-justify">High conversion due to prior education.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Governance Protocols */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Governance Protocols
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 1 — Zero promotional language:</strong> Credibility from insight, not hype.</p>
                  <p className="text-justify mt-2"><strong>Rule 2 — Accuracy is non-negotiable:</strong> Match current international standards.</p>
                  <p className="text-justify mt-2"><strong>Rule 3 — Confidentiality:</strong> No case names or sensitive details.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 4 — Founder-led delivery:</strong> Inderjeet leads; Joel supports prep.</p>
                  <p className="text-justify mt-2"><strong>Rule 5 — Availability for diagnostics:</strong> Respond within 24–48 hours.</p>
                </div>
              </div>
            </section>

            {/* 4. KPIs */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. KPIs
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Registrations per session</li>
                    <li className="text-justify">Attendance rate</li>
                    <li className="text-justify">Diagnostic calls booked</li>
                    <li className="text-justify">Conversion rate into paid mandates</li>
                    <li className="text-justify">Cross-service adoption from attendees</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Content repurposing reach</li>
                    <li className="text-justify">Partner invitations</li>
                    <li className="text-justify">Media visibility</li>
                    <li className="text-justify">Repeat attendance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Masterclass → Education → Trust → Diagnostics → Structuring → Banking → Licensing → Ongoing advisory. An authority engine that powers inbound demand for years.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Reputation Borrowing via Guest Appearances — Execution Playbook
  if (isReputationBorrowingModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Reputation Borrowing via Guest Appearances</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Reputation Borrowing Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* 1. Tools Required */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white text-gray-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="px-3 py-2 border-b border-gray-200">Function</th>
                      <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Outreach</td><td className="px-3 py-2 border-b border-gray-200">LinkedIn, Email</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Scheduling</td><td className="px-3 py-2 border-b border-gray-200">Calendly, Google Calendar</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Recording</td><td className="px-3 py-2 border-b border-gray-200">Zoom, Riverside.fm</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Design</td><td className="px-3 py-2 border-b border-gray-200">Canva Pro, Figma</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Clip extraction</td><td className="px-3 py-2 border-b border-gray-200">Descript, CapCut</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Distribution</td><td className="px-3 py-2 border-b border-gray-200">YouTube, LinkedIn</td></tr>
                    <tr><td className="px-3 py-2">CRM</td><td className="px-3 py-2">Notion / HubSpot</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Appearance Categories */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Guest Appearance Categories
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Podcasts / YouTube</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Offshore structuring, Web3/crypto compliance</li>
                    <li className="text-justify">VC/fundraising, international tax, fintech licensing</li>
                    <li className="text-justify">Entrepreneurship, wealth management, intl. living</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Webinars, Panels, Networks</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Legal/accounting firms, accelerators, investor clubs, OTC desks</li>
                    <li className="text-justify">LinkedIn Lives, chambers, jurisdiction groups</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Strategic Topic Selection */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Strategic Topic Selection
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Corporate & Structuring</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">“Cayman vs BVI — A Structuring Framework for Founders”</li>
                    <li className="text-justify">“How Offshore Holding Companies Actually Work”</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Crypto & Tokenization</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">“Token Foundations Explained in 15 Minutes”</li>
                    <li className="text-justify">“Why Most Crypto Projects Fail Bank Onboarding”</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Licensing & Banking</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">“Understanding VASP / EMI licensing”</li>
                    <li className="text-justify">“Global Banking Intelligence for High-Risk Sectors”</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Private Clients</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">“Trusts & Foundations for HNWI Succession Planning”</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Outreach Sequence */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Outreach Sequence
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 1 — Identify hosts/platforms</p>
                  <p className="text-justify">Match verticals: crypto, compliance, fintech, legal, startup, investor communities.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 2 — Founder-led outreach</p>
                  <p className="text-justify">Use concise message offering educational value on structuring, banking, trusts, licensing.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 3 — Send a Topic Menu</p>
                  <p className="text-justify">Pre-prepared topics help hosts pick quickly.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 4 — Pre-interview prep</p>
                  <p className="text-justify">Outline key talking points; be concise and precise.</p>
                </div>
              </div>
            </section>

            {/* 5. Appearance Framework */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. The Appearance Framework
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Clean, professional intro (no sales pitch)</li>
                    <li className="text-justify">Deliver value in first 30 seconds (explain a complex idea simply)</li>
                    <li className="text-justify">Show frameworks: jurisdiction matrices, licensing pathways, banking risk ladders</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Subtle differentiation, not salesy</li>
                    <li className="text-justify">Soft CTA: invite to short structuring diagnostic</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 6. Post-Appearance Repurposing */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Post-Appearance Repurposing
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Each appearance becomes:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">10–20 LinkedIn clips; YouTube long-form; website media page</li>
                    <li className="text-justify">Partner sharing assets; email nurture content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. Governance Rules */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Rules
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 1:</strong> No confidential client info; accuracy is non-negotiable.</p>
                  <p className="text-justify mt-2"><strong>Rule 2:</strong> Maintain boutique positioning; no hard selling.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 3:</strong> Founder-led articulation; clean, consistent tone.</p>
                  <p className="text-justify mt-2"><strong>Rule 4:</strong> Precision in statements; current data only.</p>
                </div>
              </div>
            </section>

            {/* 8. KPIs */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Guest appearances per quarter</li>
                    <li className="text-justify">Executive engagement</li>
                    <li className="text-justify">Diagnostics booked post-appearance</li>
                    <li className="text-justify">Partnership invitations</li>
                    <li className="text-justify">Repurposed content output</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn follower growth</li>
                    <li className="text-justify">YouTube watch time</li>
                    <li className="text-justify">Media invitations</li>
                    <li className="text-justify">Referral network expansion</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Appear on credible platforms → Borrow trust → Demonstrate expertise → Build authority → Educate prospects → Warm inbound consultations → Multi-service mandates.
                </p>
                <p className="text-justify mt-2">Reputation borrowing compounds authority faster than paid or cold outbound.</p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // YouTube Expertise Positioning — Execution Playbook
  if (isYouTubeModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">YouTube Expertise Positioning</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                YouTube Expertise Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* 1. Tools Required */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white text-gray-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="px-3 py-2 border-b border-gray-200">Function</th>
                      <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Recording</td><td className="px-3 py-2 border-b border-gray-200">iPhone + Lavalier mic</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Editing</td><td className="px-3 py-2 border-b border-gray-200">CapCut, Descript</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Thumbnails</td><td className="px-3 py-2 border-b border-gray-200">Canva Pro</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Scripts</td><td className="px-3 py-2 border-b border-gray-200">Notion</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Scheduling/upload</td><td className="px-3 py-2 border-b border-gray-200">YouTube Studio</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Analytics</td><td className="px-3 py-2 border-b border-gray-200">YouTube Creator Dashboard</td></tr>
                    <tr><td className="px-3 py-2">Repurposing</td><td className="px-3 py-2">OpusClip, Descript</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Video Content Architecture */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Video Content Architecture
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Short-Form (30–60s) — Authority + Discovery</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">“Why 70% of offshore bank applications fail”</li>
                    <li className="text-justify">“Cayman vs BVI — simple framework”</li>
                    <li className="text-justify">“What a token foundation actually does”</li>
                    <li className="text-justify">“3 biggest mistakes with VASP licensing”</li>
                    <li className="text-justify">“Which jurisdiction works for iGaming licensing?”</li>
                    <li className="text-justify">“Simplest offshore structure diagram for global startups”</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Long-Form (4–12 min) — Deep Expertise</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Offshore Structuring for Startups (full framework)</li>
                    <li className="text-justify">VASP Licensing Explained (global matrix 2025)</li>
                    <li className="text-justify">Banking Pathways for Crypto Businesses</li>
                    <li className="text-justify">Trusts & Foundations for HNWIs</li>
                    <li className="text-justify">ADGM vs DIFC Structure Comparison</li>
                    <li className="text-justify">Fund Vehicles (Master-Feeder, SPC, LLC)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Video Format Framework */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Video Format Framework
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Title slide with clear topic</li>
                    <li className="text-justify">10s authority intro (“we assist founders, funds, UHNWIs…”) </li>
                    <li className="text-justify">Concept breakdown with simple visuals</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Framework/diagram or decision tree</li>
                    <li className="text-justify">Generalized scenario (no client names)</li>
                    <li className="text-justify">Closing insight + soft CTA to a diagnostic call</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Content Production Workflow */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Content Production Workflow
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 1 — 12-week calendar</p>
                  <p className="text-justify">3 videos/week (1 long + 2 short).</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 2 — Scripts in Notion</p>
                  <p className="text-justify">Key points only; keep delivery natural.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 3 — Batch record 6–10 videos</p>
                  <p className="text-justify">Saves time, drives consistency.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 4 — Edit for clarity</p>
                  <p className="text-justify">Remove pauses, add captions/diagrams.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 5 — Upload with keywords</p>
                  <p className="text-justify">Ex: “VASP Licensing in 2025 — Complete Framework for Crypto Companies”.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 6 — Repurpose to LinkedIn</p>
                  <p className="text-justify">Post clips every 48 hours; YouTube for long-term, LinkedIn for immediate.</p>
                </div>
              </div>
            </section>

            {/* 5. Distribution System */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Distribution System
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Primary</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn clips (20–40s highlights)</li>
                    <li className="text-justify">YouTube (authority hub)</li>
                    <li className="text-justify">Website “Videos” section</li>
                    <li className="text-justify">Partners embed/share</li>
                    <li className="text-justify">Email sequences (onboarding & nurture)</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Selective</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">WhatsApp broadcast (HNW, partners)</li>
                    <li className="text-justify">Partner newsletters</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 6. Governance Standards */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Standards
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 1:</strong> Accuracy over opinions; never speculate on legal/tax outcomes.</p>
                  <p className="text-justify mt-2"><strong>Rule 2:</strong> Neutral, educational tone; no hype.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 3:</strong> Consistency: 2–3 videos weekly.</p>
                  <p className="text-justify mt-2"><strong>Rule 4:</strong> Founder-led delivery (Inderjeet on screen).</p>
                  <p className="text-justify mt-2"><strong>Rule 5:</strong> No client sensitivities; generalized scenarios only.</p>
                </div>
              </div>
            </section>

            {/* 7. KPIs */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Average watch time & view duration</li>
                    <li className="text-justify">Diagnostics booked after videos</li>
                    <li className="text-justify">Conversion from YouTube inquiries</li>
                    <li className="text-justify">Partner invitations referencing videos</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Subscribers (directional only)</li>
                    <li className="text-justify">Impressions</li>
                    <li className="text-justify">LinkedIn engagement from clips</li>
                    <li className="text-justify">Repeat views on high-value topics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 8. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Clear explanations → Perceived expertise → Trust acceleration → High-quality inbound leads → Multi-service advisory engagements.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Private Webinars & Closed-Door Executive Briefings — Execution Playbook
  if (isPrivateWebinarModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Private Webinars & Closed-Door Briefings</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Private Webinars & Closed-Door Executive Briefings
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* 1. Tools Required */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white text-gray-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="px-3 py-2 border-b border-gray-200">Function</th>
                      <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Hosting</td><td className="px-3 py-2 border-b border-gray-200">Zoom Pro / Riverside</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Slides</td><td className="px-3 py-2 border-b border-gray-200">Canva Pro / Figma</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Registration</td><td className="px-3 py-2 border-b border-gray-200">Typeform / HubSpot Forms</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">CRM</td><td className="px-3 py-2 border-b border-gray-200">Notion / HubSpot</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Recording</td><td className="px-3 py-2 border-b border-gray-200">Zoom Cloud / OBS</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Clip extraction</td><td className="px-3 py-2 border-b border-gray-200">Descript / CapCut</td></tr>
                    <tr><td className="px-3 py-2 border-b border-gray-200">Distribution</td><td className="px-3 py-2 border-b border-gray-200">LinkedIn, WhatsApp Broadcast</td></tr>
                    <tr><td className="px-3 py-2">Partner coordination</td><td className="px-3 py-2">Slack / Email</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Briefing Format */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Briefing Format (Highly Polished)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Standard flow:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Intro (2 min): who you are, why the topic matters now.</li>
                    <li className="text-justify">Context (3 min): regulatory shifts, enforcement, jurisdiction/banking changes.</li>
                    <li className="text-justify">Core insight (10–15 min): diagrams, jurisdiction matrices, licensing timelines, banking acceptance funnels, SPV diagrams.</li>
                    <li className="text-justify">Practical scenarios (5 min): anonymized use-cases (what works/fails; bank/regulator expectations).</li>
                    <li className="text-justify">Live Q&A (10–15 min): prestige moment.</li>
                    <li className="text-justify">Closing insight (30s) + soft CTA: offer a short diagnostic.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Topic Architecture */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Topic Architecture (High-Conversion Subjects)
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Corporate Structuring</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Cayman vs BVI: Choosing your HQ</li>
                    <li className="text-justify">Global expansion structuring models</li>
                    <li className="text-justify">Cross-border profit extraction frameworks</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Crypto & Tokenization</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Token legal wrappers; Foundations vs SPVs</li>
                    <li className="text-justify">VASP licensing explained</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Banking</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Offshore banking acceptance matrix</li>
                    <li className="text-justify">Crypto-friendly banking pathways</li>
                    <li className="text-justify">EU/US risk-based frameworks</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Licensing</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">EMI licensing pathway</li>
                    <li className="text-justify">MSB licensing logic</li>
                    <li className="text-justify">Fund licensing + administration</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Private Clients</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Trusts & foundations</li>
                    <li className="text-justify">Asset protection & succession</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Audience Targeting */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Audience Targeting Strategy
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier 1 — Partner-Hosted</p>
                  <p className="text-justify">Law firms, accounting firms, private bankers, fund admins, VC/angel syndicates invite their clients; you deliver.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier 2 — Founder-Led</p>
                  <p className="text-justify">Invite crypto founders, fund managers, cross-border entrepreneurs, CFOs/GCs.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier 3 — Direct Invitations</p>
                  <p className="text-justify">Personalized LinkedIn invites with topic summaries.</p>
                </div>
              </div>
            </section>

            {/* 5. Frequency & Cadence */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Frequency & Cadence
              </h2>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">2 private briefings/month</li>
                  <li className="text-justify">Alternate themes: structuring, licensing, banking, tokenization</li>
                  <li className="text-justify">Quarterly flagship deep-dive (Cayman, BVI, Cook Islands, DIFC, Luxembourg)</li>
                  <li className="text-justify">Consistency → authority.</li>
                </ul>
              </div>
            </section>

            {/* 6. Repurposing Workflow */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Repurposing Workflow
              </h2>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="font-semibold text-gray-900">Record → Edit → Extract → Publish:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">10–20 LinkedIn clips</li>
                  <li className="text-justify">1 long-form YouTube video</li>
                  <li className="text-justify">1 jurisdiction/licensing report</li>
                  <li className="text-justify">1 newsletter segment</li>
                  <li className="text-justify">Partner sharing materials</li>
                </ul>
              </div>
            </section>

            {/* 7. Governance Standards */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 1:</strong> Confidentiality absolute; no client specifics.</p>
                  <p className="text-justify mt-2"><strong>Rule 2:</strong> Accuracy & regulatory precision (current as of 2025).</p>
                  <p className="text-justify mt-2"><strong>Rule 3:</strong> No promotional tone.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Rule 4:</strong> Founder-led delivery (Inderjeet; Joel supports).</p>
                  <p className="text-justify mt-2"><strong>Rule 5:</strong> Respond to diagnostics within 24–48 hours; overdeliver on value.</p>
                </div>
              </div>
            </section>

            {/* 8. KPIs */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Qualified attendees per session</li>
                    <li className="text-justify">Diagnostic calls booked</li>
                    <li className="text-justify">Pre-qualified mandates created</li>
                    <li className="text-justify">Partnership invitations</li>
                    <li className="text-justify">Conversion per attendee</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Video repurposing performance</li>
                    <li className="text-justify">LinkedIn growth</li>
                    <li className="text-justify">Newsletter subscriptions</li>
                    <li className="text-justify">Repeat attendance from advisors</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Private insight → Authority → Trust → Diagnostics → Structuring/Banking/Licensing → Ongoing advisory.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // High-Intent Google Capture Model — Execution Playbook
  if (isHighIntentGoogleModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">High-Intent Google Capture Model</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                High-Intent Google Capture Model — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="grid md:grid-cols-2 gap-3 text-gray-800 leading-relaxed text-left">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Function</strong></p>
                  <p className="text-justify">Keyword intelligence</p>
                  <p className="text-justify">Landing pages</p>
                  <p className="text-justify">Analytics</p>
                  <p className="text-justify">Google Ads</p>
                  <p className="text-justify">Tracking</p>
                  <p className="text-justify">CRM</p>
                  <p className="text-justify">Heatmaps</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Tools</strong></p>
                  <p className="text-justify">Ahrefs / SEMrush</p>
                  <p className="text-justify">Webflow / WordPress</p>
                  <p className="text-justify">Google Analytics + Search Console</p>
                  <p className="text-justify">Google Ads Manager</p>
                  <p className="text-justify">Tag Manager</p>
                  <p className="text-justify">HubSpot / Notion</p>
                  <p className="text-justify">Hotjar</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Keyword Strategy (High-Intent Only)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Structuring:</strong> “Cayman company setup for crypto”; “BVI holding company for startups”; “Cook Islands trust for asset protection.”</li>
                  <li className="text-justify"><strong>Banking:</strong> “Offshore bank account for high-risk business”; “Crypto-friendly bank account”; “Multi-currency IBAN for offshore companies.”</li>
                  <li className="text-justify"><strong>Licensing:</strong> “VASP license Cayman/BVI/EU”; “Apply for EMI license 2025”; “Cost of MSB license USA”; “Forex broker license requirements.”</li>
                  <li className="text-justify"><strong>Fund Administration:</strong> “Cayman SPC fund formation”; “BVI fund administrator.”</li>
                  <li className="text-justify"><strong>Tokenization:</strong> “Token foundation for Web3 project”; “SPV for token issuance.”</li>
                </ul>
                <p className="text-justify">Only conversion-ready keywords—no awareness terms.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Landing Page Architecture
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Executive summary — concise value.</li>
                  <li className="text-justify">Jurisdiction comparison — short frameworks/matrices.</li>
                  <li className="text-justify">Clear diagrams — decision trees convert.</li>
                  <li className="text-justify">What banks/regulators expect — practical intelligence.</li>
                  <li className="text-justify">Engagement process — how Boyar handles structuring/licensing/banking.</li>
                  <li className="text-justify">CTA: Request a Diagnostic — soft, confidential, professional.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Ad Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Exact-match keywords only:</strong> no broad/generic.</li>
                  <li className="text-justify"><strong>High-intent landing links:</strong> never homepage.</li>
                  <li className="text-justify"><strong>Founder-led ad copy:</strong> authority-based (“Regulatory structuring advisory for founders, funds, and crypto operators”).</li>
                  <li className="text-justify"><strong>Micro-budget testing:</strong> USD 500–1,000/month to start.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Inbound Flow
              </h2>
              <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                <li className="text-justify">User searches “VASP license Cayman” → ad or organic result.</li>
                <li className="text-justify">User lands on technical page; trust builds instantly.</li>
                <li className="text-justify">User requests diagnostic.</li>
                <li className="text-justify">Founders lead the call → high conversion.</li>
              </ol>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Principles
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify">Absolute accuracy; intent searchers are sensitive to errors.</li>
                <li className="text-justify">Zero marketing fluff; legal-advisory tone.</li>
                <li className="text-justify">Founder-led conversion: Inderjeet or Joel runs diagnostics.</li>
                <li className="text-justify">Minimal friction: no complex forms.</li>
                <li className="text-justify">Dedicated landing pages only; never send intent traffic to generic pages.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Primary:</strong> Diagnostic form submissions; cost per diagnostic; conversion per landing page; revenue per inbound mandate.</li>
                <li className="text-justify"><strong>Secondary:</strong> Time on page; bounce rate; keyword rankings; Quality Score.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-intent keyword → Precision landing page → Diagnostic call → Structuring/Licensing/Banking/Trust mandate. High-ticket inbound with minimal marketing spend.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Jurisdiction Intelligence Report (Gated) — Execution Playbook (professional layout)
  if (isJurisdictionIntelModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Jurisdiction Intelligence Report (Gated) Model</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Jurisdiction Intelligence Report — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Canva Pro / Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">PDF creation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Canva / InDesign</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Gating forms</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Typeform / Webflow forms</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Distribution</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn, Email, Partners</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Analytics</td>
                        <td className="px-3 py-2">GA4 + HubSpot</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Report Types to Produce (Core Library)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Structuring Reports</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">"Cayman vs BVI — Structuring Intelligence 2025"</li>
                    <li className="text-justify">"Mauritius vs Seychelles — Africa/Asia Expansion"</li>
                    <li className="text-justify">"Nevis vs Cook Islands — Asset Protection Matrix"</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Banking Intelligence Reports</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">"Offshore Banking Acceptance Report — Crypto 2025"</li>
                    <li className="text-justify">"Global IBAN Providers Comparison — 2025 Update"</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Licensing Reports</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">"VASP Licensing Report — EU/Caribbean/UAE Comparison"</li>
                    <li className="text-justify">"EMI Licensing Intelligence — Timeline, Cost, Requirements"</li>
                    <li className="text-justify">"MSB Licensing — Practical Playbook for 2025"</li>
                    <li className="text-justify">"Fund Licensing & Administration Roadmap — Cayman/BVI/ADGM"</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Foundation & Trust Reports</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">"Cook Islands Foundation vs Trust — Comparative Guide"</li>
                    <li className="text-justify">"Seychelles Foundation Structuring Intelligence 2025"</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Jurisdictional Macro Reports</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">"The 2025 Global Offshore Landscape Report"</li>
                    <li className="text-justify">"Top 10 Structuring Jurisdictions for Crypto Teams"</li>
                  </ul>
                  <p className="text-justify mt-3">These become Boyar's signature intellectual assets.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Standard Report Structure (Professional Layout)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">A standard Boyar Partners jurisdiction intelligence report includes:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Executive Summary</li>
                  <li className="text-justify">Jurisdiction Overview</li>
                  <li className="text-justify">Regulatory Landscape</li>
                  <li className="text-justify">Banking Reality</li>
                  <li className="text-justify">Licensing Feasibility</li>
                  <li className="text-justify">Compliance Requirements</li>
                  <li className="text-justify">Structuring Use Cases (Anonymized)</li>
                  <li className="text-justify">Risk Scoring</li>
                  <li className="text-justify">Cost & Timeline Ranges</li>
                  <li className="text-justify">Comparative Framework</li>
                  <li className="text-justify">Recommendation Scenarios</li>
                  <li className="text-justify">Closing Note from the Founders</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This structure mimics top law-firm intelligence briefs.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Gating Mechanism
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Form fields to collect:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Name</li>
                  <li className="text-justify">Email</li>
                  <li className="text-justify">Company</li>
                  <li className="text-justify">Role</li>
                  <li className="text-justify">Jurisdiction(s) of interest</li>
                  <li className="text-justify">Service interest (structuring, licensing, banking, trust)</li>
                  <li className="text-justify">Timeline (0–3 months, 3–6 months, &gt;6 months)</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This becomes a qualified ABM lead instantly.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Distribution Strategy
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">A. Website conversion pages</p>
                    <p className="text-justify">Each report has its own landing page.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">B. LinkedIn distribution</p>
                    <p className="text-justify">Posts featuring insights, charts, diagrams pull in people.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">C. Partner distribution</p>
                    <p className="text-justify">Law firms, banks, accountants share it with their networks.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">D. Newsletter integration</p>
                    <p className="text-justify">Feature "New Jurisdiction Briefing Released".</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">E. YouTube integration</p>
                    <p className="text-justify">Use report findings as video talking points.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">F. Direct ABM offers</p>
                    <p className="text-justify">Send specific reports to targeted executives.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Follow-Up Sequence After Download
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 1:</p>
                  <p className="text-justify">Send report + personalized note: "Let me know which sections were most relevant."</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 3:</p>
                  <p className="text-justify">Send a jurisdiction comparison chart.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 5:</p>
                  <p className="text-justify">Invite them to a private diagnostic session.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Day 10:</p>
                  <p className="text-justify">Send themed content based on their chosen jurisdiction.</p>
                </div>
                <p className="text-justify mt-4 font-semibold">This sequence warms them deeply and professionally.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Reports must be factual and updated quarterly</p>
                  <p className="text-justify">Your reputation depends on accuracy.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — No legal guarantees or tax advice</p>
                  <p className="text-justify">Insights, not commitments.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Design must reflect boutique positioning</p>
                  <p className="text-justify">Premium, clean, minimalistic.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Confidentiality must be maintained</p>
                  <p className="text-justify">No client reference, no examples exposing identities.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Founder-led messaging</p>
                  <p className="text-justify">Reports should feel authored or reviewed by Inderjeet.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Number of gated downloads</li>
                    <li className="text-justify">Diagnostic calls booked from reports</li>
                    <li className="text-justify">Conversion per jurisdiction</li>
                    <li className="text-justify">Partner distribution reach</li>
                    <li className="text-justify">Revenue per report type</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Landing page conversion rate</li>
                    <li className="text-justify">Engagement with follow-up emails</li>
                    <li className="text-justify">ABM reply rate</li>
                    <li className="text-justify">Keyword rankings for report pages</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-quality jurisdiction intelligence → Leads identify themselves → Structured follow-up → Diagnostic sessions → Multi-service advisory mandates. Gated jurisdiction reports are the highest-quality inbound filter you can create.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Compliance-Driven Lead Magnets (AML/ES/CRS) — Execution Playbook
  if (isComplianceLeadMagnetsModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Compliance-Driven Lead Magnets (AML/ES/CRS)</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Compliance Lead Magnets — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Template creation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion, Google Docs, Canva</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Gating</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Typeform</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Distribution</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn, Partners, Newsletter</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Page hosting</td>
                        <td className="px-3 py-2">Webflow</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Compliance Asset Library (Initial 12 Lead Magnets)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">AML Assets</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">AML Policy Framework (Template)</li>
                    <li className="text-justify">Customer Risk Rating Matrix</li>
                    <li className="text-justify">Transaction Monitoring Rulebook</li>
                    <li className="text-justify">AML/KYC Checklist for High-Risk Clients</li>
                    <li className="text-justify">SAR/STR Reporting Workflow (Generalized)</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Economic Substance (ESR) Assets</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Substance Classification Flowchart</li>
                    <li className="text-justify">Annual ESR Reporting Checklist</li>
                    <li className="text-justify">ES Penalties & Compliance Summary</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">CRS Assets</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">CRS Due Diligence Playbook</li>
                    <li className="text-justify">CRS Reporting Timeline & Documentation Guide</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Banking Compliance Assets</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Bank-Readiness Compliance Pack</li>
                    <li className="text-justify">Enhanced Due Diligence (EDD) File Template</li>
                  </ul>
                  <p className="text-justify mt-3">These assets become downloadable PDFs.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Gating Mechanism (Perfect Form Fields)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Form fields to collect:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Name</li>
                  <li className="text-justify">Email</li>
                  <li className="text-justify">Company</li>
                  <li className="text-justify">Industry</li>
                  <li className="text-justify">Compliance challenge (choose one)</li>
                  <li className="text-justify">Timeline (urgent / &lt;3 months / planning)</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This produces clean segmentation for ABM.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Content Structure of Each PDF
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Each compliance PDF follows this structure:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Overview (Simple explanation)</li>
                  <li className="text-justify">Applicable requirements (AML/ES/CRS logic)</li>
                  <li className="text-justify">Checklist / matrix / workflow diagram</li>
                  <li className="text-justify">Common compliance gaps</li>
                  <li className="text-justify">Banking implications (extremely important)</li>
                  <li className="text-justify">Action steps</li>
                  <li className="text-justify">When Boyar Partners becomes necessary</li>
                  <li className="text-justify">Founder note — professional, discrete</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This is a recurring template for consistency.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Distribution Strategy
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">A. Website</p>
                    <p className="text-justify">Dedicated compliance resource center.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">B. LinkedIn</p>
                    <p className="text-justify">Publish short problem statements, insights from AML/ES/CRS updates, offer the downloadable resource.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">C. Email / Newsletter</p>
                    <p className="text-justify">Feature 1 compliance asset per month.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">D. Partners</p>
                    <p className="text-justify">Bankers, fund admins, accountants will distribute your checklists to clients.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">E. ABM</p>
                    <p className="text-justify">Send compliance playbooks directly to CFOs, COOs, GCs, and founders.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Follow-Up Sequence After Download
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 1 — Delivery Email</p>
                  <p className="text-justify">"Here's the compliance framework you requested."</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 3 — Insights Email</p>
                  <p className="text-justify">Send a diagram or checklist related to their selection.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 5 — Problem Identification Email</p>
                  <p className="text-justify">"Most teams struggle with X, Y, Z."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Day 7 — Diagnostic Invitation</p>
                  <p className="text-justify">"Happy to review your compliance posture privately."</p>
                </div>
                <p className="text-justify mt-4 font-semibold">This is extremely high converting.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Rules
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1: No legal promises</p>
                  <p className="text-justify">The documents provide guidance, not legal opinions.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2: Accuracy over marketing</p>
                  <p className="text-justify">Compliance requires seriousness.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3: Confidentiality in all follow-ups</p>
                  <p className="text-justify">Compliance leads are sensitive.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4: Founder-led content tone</p>
                  <p className="text-justify">Inderjeet's voice elevates authority.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs to Track
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Number of downloads</li>
                    <li className="text-justify">Diagnostic calls booked</li>
                    <li className="text-justify">Conversion to compliance/structuring mandates</li>
                    <li className="text-justify">Banking success rate</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Source (LinkedIn, partner, website)</li>
                    <li className="text-justify">Open rates of follow-up emails</li>
                    <li className="text-justify">Time to conversion</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Compliance problem → Download lead magnet → Follow-up sequence → Diagnostic call → Structuring / licensing / banking / trust mandate. Compliance is one of the highest-intent acquisition channels for Boyar Partners because urgency is embedded in every compliance need.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Multi-Jurisdiction Comparison Engine — Execution Playbook
  if (isMultiJurisdictionComparisonModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Multi-Jurisdiction Comparison Engines</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Multi-Jurisdiction Comparison Engine — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Basic engine</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion, Webflow CMS, Typeform, Tally</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Advanced engine</td>
                        <td className="px-3 py-2 border-b border-gray-200">Bubble.io, Softr, Glide, Retool</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Figma, Canva Pro</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Gating</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot forms, Webflow native forms</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Data storage</td>
                        <td className="px-3 py-2">Google Sheets / Notion DB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Jurisdictions to Include in the Initial Engine
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Start with 10–12 high-demand jurisdictions:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Cayman Islands</li>
                      <li className="text-justify">British Virgin Islands</li>
                      <li className="text-justify">Seychelles</li>
                      <li className="text-justify">Cook Islands</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">UAE (DIFC & ADGM separately)</li>
                      <li className="text-justify">Singapore</li>
                      <li className="text-justify">Mauritius</li>
                      <li className="text-justify">Luxembourg</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Ireland</li>
                      <li className="text-justify">Malta</li>
                      <li className="text-justify">Nevis</li>
                      <li className="text-justify">Delaware</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    These represent core structuring, fund, banking, and licensing hubs.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Comparison Parameters
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Your engine must compare each jurisdiction across:</p>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Corporate Structuring</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Legal entity types</li>
                    <li className="text-justify">Cost</li>
                    <li className="text-justify">Timeline</li>
                    <li className="text-justify">Governance expectations</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Banking</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Acceptance level</li>
                    <li className="text-justify">Strength of regulatory environment</li>
                    <li className="text-justify">Crypto-friendliness</li>
                    <li className="text-justify">IBAN availability</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Licensing Feasibility</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">VASP</li>
                    <li className="text-justify">EMI</li>
                    <li className="text-justify">MSB</li>
                    <li className="text-justify">Fund license</li>
                    <li className="text-justify">Forex license</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Substance Requirements</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">ES classification</li>
                    <li className="text-justify">Required activities</li>
                    <li className="text-justify">Reporting</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Tax</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Corporate tax</li>
                    <li className="text-justify">Withholding tax</li>
                    <li className="text-justify">Economic substance implications</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Trusts & Foundations</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Asset protection strength</li>
                    <li className="text-justify">Privacy</li>
                    <li className="text-justify">Flexibility</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">G. Risk Index</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Legal risk</li>
                    <li className="text-justify">Banking risk</li>
                    <li className="text-justify">Compliance risk</li>
                    <li className="text-justify">Reputation risk</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">H. Suitable For</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Startups</li>
                    <li className="text-justify">Crypto projects</li>
                    <li className="text-justify">Funds</li>
                    <li className="text-justify">HNWIs</li>
                    <li className="text-justify">Holding companies</li>
                    <li className="text-justify">IP structures</li>
                  </ul>
                </div>
                <p className="text-justify mt-4 font-semibold">These categories make the engine feel "law-firm level."</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Engine Output Format
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Upon selecting jurisdictions, output:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Clean comparison table</li>
                  <li className="text-justify">Professional scoring framework</li>
                  <li className="text-justify">Strategic insights</li>
                  <li className="text-justify">Recommended paths (e.g., "If banking is your priority, choose X.")</li>
                  <li className="text-justify">Downloadable PDF version</li>
                  <li className="text-justify">CTA: "Request a Structuring Diagnostic"</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Gating Mechanism
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Before downloading, form fields:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Name</li>
                  <li className="text-justify">Email</li>
                  <li className="text-justify">Company</li>
                  <li className="text-justify">Role</li>
                  <li className="text-justify">Jurisdiction interest</li>
                  <li className="text-justify">Service need</li>
                  <li className="text-justify">Timeline</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This creates segmented, high-quality leads.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Distribution Strategy
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">A. Website</p>
                    <p className="text-justify">SEO landing pages for each comparison pair.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">B. LinkedIn</p>
                    <p className="text-justify">Posting diagrams and jurisdiction comparison snippets weekly.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">C. Partners</p>
                    <p className="text-justify">Banks, law firms, fund admins link to your engine.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">D. ABM</p>
                    <p className="text-justify">Send custom comparisons to targeted executives.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">E. Newsletter</p>
                    <p className="text-justify">Feature a monthly jurisdiction comparison.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">F. Google Capture</p>
                    <p className="text-justify">People searching "Cayman vs BVI" will find your comparison.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Follow-Up Sequence After Comparison Download
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 1</p>
                  <p className="text-justify">Send PDF + founder note.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 3</p>
                  <p className="text-justify">Send jurisdiction-specific banking considerations.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Day 5</p>
                  <p className="text-justify">Send licensing or structuring alternative.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Day 7</p>
                  <p className="text-justify">Invite to a private diagnostic session.</p>
                </div>
                <p className="text-justify mt-4 font-semibold">This sequence converts exceptionally well.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Governance Rules
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1: No bias</p>
                  <p className="text-justify">Comparisons must be neutral and factual.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2: Precise and updated data</p>
                  <p className="text-justify">Quarterly review.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3: Founder-led notes</p>
                  <p className="text-justify">Add an explanation from Inderjeet for authority.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4: Clean design</p>
                  <p className="text-justify">Minimal and "law-firm grade."</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Downloads per comparison</li>
                    <li className="text-justify">Diagnostics booked</li>
                    <li className="text-justify">Conversions per jurisdiction pair</li>
                    <li className="text-justify">Average mandate value</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Keyword rankings</li>
                    <li className="text-justify">Time spent on comparison pages</li>
                    <li className="text-justify">Engagement from partners</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                10. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Jurisdiction confusion → Comparison engine → Download → Segmented follow-up → Diagnostic → Structuring/Banking/Licensing mandate. Comparison = intent. Intent = conversion. This model is one of the highest-impact acquisition channels you can build.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Search-Based Emergency Advisory Capture — Execution Playbook
  if (isSearchEmergencyAdvisoryModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Search-Based Emergency Advisory Capture</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Search-Based Emergency Advisory Capture — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Emergency landing pages</td>
                        <td className="px-3 py-2 border-b border-gray-200">Webflow / WordPress</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Keyword targeting</td>
                        <td className="px-3 py-2 border-b border-gray-200">Ahrefs / SEMrush</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Ads</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Ads (Exact Match Only)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Response workflow</td>
                        <td className="px-3 py-2 border-b border-gray-200">Slack + Email + WhatsApp</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Tracking</td>
                        <td className="px-3 py-2 border-b border-gray-200">GA4 + Search Console</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Automation</td>
                        <td className="px-3 py-2">Zapier</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Emergency Categories to Target (Initial 10)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Banking Emergencies</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Offshore account frozen</li>
                    <li className="text-justify">Application rejected</li>
                    <li className="text-justify">Crypto onboarding failure</li>
                    <li className="text-justify">SWIFT/SEPA issues</li>
                    <li className="text-justify">Sudden bank offboarding</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Licensing Emergencies</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">VASP license rejected / incomplete</li>
                    <li className="text-justify">EMI/MSB license regulatory intervention</li>
                    <li className="text-justify">Fund license audit issue</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Corporate Emergencies</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Entity struck off</li>
                    <li className="text-justify">Urgent redomiciliation / restructuring</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Compliance Emergencies</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">AML/ESR/CRS non-compliance</li>
                    <li className="text-justify">Regulator request for information</li>
                    <li className="text-justify">Beneficial ownership register mistake</li>
                  </ul>
                </div>
                <p className="text-justify mt-4 font-semibold">Each emergency gets its own landing page.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Emergency Landing Page Structure
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Headline</p>
                  <p className="text-justify">Clear, direct, serious. Example: "Bank Account Frozen? Immediate Advisory Support for Offshore Entities."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Problem Summary</p>
                  <p className="text-justify">Explain the issue in 3–4 lines, professionally.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Immediate Steps Framework</p>
                  <p className="text-justify">A short, authoritative diagnostic:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Identify cause</li>
                    <li className="text-justify">Assess risk</li>
                    <li className="text-justify">Prepare remediation</li>
                    <li className="text-justify">Engage counterparties (bank/regulator)</li>
                    <li className="text-justify">Document resolution</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. What Boyar Partners Does</p>
                  <p className="text-justify">Professional, no marketing language.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Timeline Expectations</p>
                  <p className="text-justify">Clear and realistic.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. CTA</p>
                  <p className="text-justify">"Request an Immediate Advisory Call" — No lead magnet needed. Urgency drives action.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Google Campaign Strategy
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Exact-match keywords only</p>
                  <p className="text-justify">Examples:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">["offshore bank account frozen help"]</li>
                    <li className="text-justify">["VASP license rejected what to do"]</li>
                    <li className="text-justify">["economic substance non compliance fix"]</li>
                    <li className="text-justify">["CRS reporting urgent"]</li>
                    <li className="text-justify">["company restoration offshore"]</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. No broad keywords</p>
                  <p className="text-justify">Keep campaigns tightly controlled.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Retargeting</p>
                  <p className="text-justify">Anyone who visited an emergency page receives follow-up ads.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. LinkedIn Emergency Capture Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Post weekly content:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">"Your company was struck off? Here's the process to restore it."</li>
                  <li className="text-justify">"What to do if your crypto VASP license application is rejected."</li>
                  <li className="text-justify">"Economic Substance audit: 5 errors that trigger penalties."</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Emergency explanations perform extremely well.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Follow-Up Sequence (Fast, Professional, Non-Sales)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Within 15 minutes</p>
                  <p className="text-justify">Send a brief message acknowledging the issue.</p>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Same day</p>
                  <p className="text-justify">Request documents or outline next steps.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">24–48 hours</p>
                  <p className="text-justify">Conduct a focused emergency diagnostic.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">48–72 hours</p>
                  <p className="text-justify">Present the remedial plan → engagement letter.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Never overpromise timelines</p>
                  <p className="text-justify">Emergencies require honesty.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Founder or senior advisor must lead the call</p>
                  <p className="text-justify">Confidence is a conversion driver.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Confidentiality is critical</p>
                  <p className="text-justify">Emergency clients are sensitive.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Keep landing pages factual</p>
                  <p className="text-justify">No dramatized language.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Emergency forms submitted</li>
                    <li className="text-justify">Conversion to diagnostic calls</li>
                    <li className="text-justify">Emergency-to-mandate conversion</li>
                    <li className="text-justify">Revenue per emergency client</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Ads CPC</li>
                    <li className="text-justify">LinkedIn engagement</li>
                    <li className="text-justify">Page dwell time</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Emergency problem → Search → Emergency landing page → Immediate advisory call → Structuring/Licensing/Banking/Compliance mandate. Emergency = high-ticket, immediate, deep advisory engagement. This is one of the strongest acquisition channels Boyar can build because urgent problems produce decisive clients.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Regulatory Update Alerts Funnel — Execution Playbook
  if (isRegulatoryUpdateAlertsModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Regulatory Update Alerts Funnel</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Regulatory Update Alerts Funnel — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Email alerts</td>
                        <td className="px-3 py-2 border-b border-gray-200">Mailchimp, ConvertKit, HubSpot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Distribution</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn, WhatsApp Broadcast</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Website section</td>
                        <td className="px-3 py-2 border-b border-gray-200">Webflow "Regulatory Updates"</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Monitoring</td>
                        <td className="px-3 py-2 border-b border-gray-200">Feeds from regulators, RSS, Google Alerts</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Calendar</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion or Monday.com</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier to sync new subscribers</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Tracking</td>
                        <td className="px-3 py-2">HubSpot CRM + GA4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Sources to Monitor for Updates
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Offshore jurisdictions</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Cayman CIMA</li>
                    <li className="text-justify">BVI FSC</li>
                    <li className="text-justify">Seychelles FSA</li>
                    <li className="text-justify">Cook Islands FSC</li>
                    <li className="text-justify">Mauritius FSC</li>
                    <li className="text-justify">Malta MFSA</li>
                    <li className="text-justify">ADGM FSRA</li>
                    <li className="text-justify">DIFC DFSA</li>
                    <li className="text-justify">Singapore MAS</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Licensing</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">EU AMLA</li>
                    <li className="text-justify">UK FCA</li>
                    <li className="text-justify">EU MiCA updates</li>
                    <li className="text-justify">FinCEN</li>
                    <li className="text-justify">FIU bulletins</li>
                    <li className="text-justify">VASP regulator updates</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Compliance</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">OECD CRS updates</li>
                    <li className="text-justify">FATF updates</li>
                    <li className="text-justify">Economic Substance notices</li>
                    <li className="text-justify">Global tax authority notices</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Banking</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Updates from correspondent banks</li>
                    <li className="text-justify">Crypto banking announcements</li>
                    <li className="text-justify">Compliance changes in EMIs</li>
                  </ul>
                  <p className="text-justify mt-3">This ensures Boyar stays ahead of competitors.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Structure of Each Regulatory Alert
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Headline</p>
                  <p className="text-justify">Short, factual, clear. Example: "Cayman—CIMA Issues New Guidance for VASP Licensing (Effective 1 July 2025)"</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. 3–5 Line Summary</p>
                  <p className="text-justify">"For VASP operators, new onboarding thresholds require enhanced liquidity reporting and pre-approval for custodial arrangements."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Impact Summary</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Who is impacted</li>
                    <li className="text-justify">What they must do</li>
                    <li className="text-justify">Timeline</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Boyar Insight (Founder note)</p>
                  <p className="text-justify">"Teams applying for VASP licensing should prepare for additional documentation; we expect processing timelines to extend."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Soft CTA</p>
                  <p className="text-justify">"If you require a private review of your structure in light of this update, reply to this email." Professional, not sales-driven.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Funnel Structure
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Top of Funnel (Attraction)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">SEO traffic to "Regulatory Updates" pages</li>
                    <li className="text-justify">LinkedIn posts</li>
                    <li className="text-justify">Partners forwarding updates</li>
                    <li className="text-justify">Website newsletter signups</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Middle of Funnel (Retention)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Updates delivered 1–3 times/month</li>
                    <li className="text-justify">Quarterly "Regulatory Intelligence Briefing"</li>
                    <li className="text-justify">ABM segmentation (crypto alerts to crypto founders)</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Bottom of Funnel (Conversion)</p>
                  <p className="text-justify">Clients reply asking: "Can we jump on a quick call?" "Need help understanding this requirement." "What does this mean for our structure?"</p>
                  <p className="text-justify mt-2">Regulatory changes cause immediate buyer intent.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. ABM Integration
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Each update should be tagged by segment:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Crypto</li>
                  <li className="text-justify">Funds</li>
                  <li className="text-justify">SMEs</li>
                  <li className="text-justify">HNWIs</li>
                  <li className="text-justify">FinTech / EMI</li>
                  <li className="text-justify">Licensing clients</li>
                  <li className="text-justify">Banking</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    When a regulatory update affects a segment, Boyar triggers personalized ABM outreach: "Following today's MAS update, here's how your Singapore structure may be impacted." This is extremely high-conversion.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Distribution Channels
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">A. Email Alerts</p>
                    <p className="text-justify">Primary channel. Subscribers become long-cycle prospects.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">B. LinkedIn</p>
                    <p className="text-justify">Public updates create reach.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">C. WhatsApp Broadcast</p>
                    <p className="text-justify">Used for HNWI & partner circles.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">D. Website</p>
                    <p className="text-justify">A regulatory update hub boosts SEO and trust.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">E. YouTube (optional)</p>
                    <p className="text-justify">Short videos summarizing major updates.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Accuracy is non-negotiable</p>
                  <p className="text-justify">No speculation. Use official notices only.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Brevity wins</p>
                  <p className="text-justify">Regulatory updates must be short, clear, actionable.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — No legal advice</p>
                  <p className="text-justify">Insights, not opinions.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Founder-led positioning</p>
                  <p className="text-justify">Updates must reflect Inderjeet's voice and credibility.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Professional consistency</p>
                  <p className="text-justify">Monthly minimum. Weekly when needed.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Update open rate (target: 40–55%)</li>
                    <li className="text-justify">Replies asking for clarification</li>
                    <li className="text-justify">Diagnostic meetings booked</li>
                    <li className="text-justify">Regulatory-triggered mandates</li>
                    <li className="text-justify">Subscriber growth</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn engagement</li>
                    <li className="text-justify">Website "Regulatory Hub" views</li>
                    <li className="text-justify">ABM response rates</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Regulatory update → Attention → Trust → Diagnostic request → Structuring/Licensing/Banking/Compliance mandate. Regulatory updates create intent. Intent becomes advisory engagement. This is one of the highest-authority, highest-trust acquisition funnels for Boyar Partners.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Precision LinkedIn Dealflow Funnels — Execution Playbook
  if (isPrecisionLinkedInDealflowModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Precision LinkedIn Dealflow Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Precision LinkedIn Dealflow Funnels — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Outreach</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Sales Navigator</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation (light)</td>
                        <td className="px-3 py-2 border-b border-gray-200">Clay / Apollo (optional)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Content engine</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion + Figma + Canva</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot or Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Tracking</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Alerts</td>
                        <td className="px-3 py-2">Google Alerts + LinkedIn Signals</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Funnel A — Founder-Led Authority Funnel
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">Purpose: Build visibility and trust.</p>
                <p className="text-justify">Actions:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Post 2–3 insights/week</li>
                  <li className="text-justify">Focus on frameworks, not storytelling</li>
                  <li className="text-justify">Use diagrams for clarity</li>
                  <li className="text-justify">Comment on regulatory updates</li>
                  <li className="text-justify">Share jurisdiction comparisons</li>
                  <li className="text-justify">Publish licensing breakdowns</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    LinkedIn rewards expert clarity.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Funnel B — Segment Micro-Targeting Funnel
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">Purpose: Identify prospects by industry.</p>
                <p className="text-justify">Target segments:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Crypto founders</li>
                  <li className="text-justify">Tokenization teams</li>
                  <li className="text-justify">Fund managers</li>
                  <li className="text-justify">FinTech/EMI/MSB operators</li>
                  <li className="text-justify">HNW family office executives</li>
                  <li className="text-justify">Cross-border SMEs</li>
                </ul>
                <p className="text-justify mt-4">Each segment receives:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Tailored messaging</li>
                  <li className="text-justify">Tailored frameworks</li>
                  <li className="text-justify">Tailored connection scripts</li>
                  <li className="text-justify">Tailored insights</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Precision {'>'} volume.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Funnel C — Signal-Based Deal Identification
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Monitor signals:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Hiring a compliance officer → licensing intent</li>
                  <li className="text-justify">Announcing expansion → structuring/banking intent</li>
                  <li className="text-justify">Raising capital → fund or SPV intent</li>
                  <li className="text-justify">Hiring in UAE → residency/structuring intent</li>
                  <li className="text-justify">Posting about regulation → compliance intent</li>
                </ul>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Each signal triggers founder-led outreach.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Funnel D — Insight-Driven Engagement Funnel
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Use soft, educational micro-assets:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Jurisdiction matrices</li>
                  <li className="text-justify">Licensing timelines</li>
                  <li className="text-justify">Banking acceptance charts</li>
                  <li className="text-justify">Trust/foundation comparison PDFs</li>
                  <li className="text-justify">Compliance checklists</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Send insights → build trust → invite diagnostic.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Funnel E — Retargeting & Re-Engagement
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Your content repeatedly appears in:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">"Suggested for you"</li>
                  <li className="text-justify">"People in your network engaged with"</li>
                  <li className="text-justify">"Trending in: Offshore structuring"</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This is free retargeting. Prospects convert over time.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Message Architecture (Professional, Non-Sales, Insight-Led)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Initial connection</p>
                  <p className="text-justify italic">"I share structuring, licensing, and banking frameworks for global operators. Thought it may be useful to be connected."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">After acceptance</p>
                  <p className="text-justify italic">"Based on your expansion strategy, a comparison between UAE (DIFC/ADGM) and BVI might be relevant — happy to share the framework if useful."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Post-engagement</p>
                  <p className="text-justify italic">"If you're evaluating structuring or licensing options this quarter, I can condense the most viable pathways."</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This is advisory tone, not sales tone.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — No mass outreach</p>
                  <p className="text-justify">Precision only.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Every message must contain value</p>
                  <p className="text-justify">No generic greetings.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Founder-led presence is mandatory</p>
                  <p className="text-justify">Inderjeet and Joel must be visible.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Insight over marketing</p>
                  <p className="text-justify">Professionals respect clarity, not persuasion.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Control your positioning</p>
                  <p className="text-justify">Keep tone discreet and elite.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">High-quality conversations opened</li>
                    <li className="text-justify">Diagnostics booked</li>
                    <li className="text-justify">Mandates created</li>
                    <li className="text-justify">Engagement from ICP segments</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Content saves</li>
                    <li className="text-justify">Post shares</li>
                    <li className="text-justify">Profile views</li>
                    <li className="text-justify">Inbound connection requests</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                10. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  LinkedIn signal → Precision insight → Advisory conversation → Diagnostic → Structuring/Licensing/Banking/Fund mandate. LinkedIn becomes a predictable, elite dealflow engine for Boyar Partners.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // WhatsApp VIP Lead Nurture Tracks — Execution Playbook
  if (isWhatsAppVipNurtureModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">WhatsApp VIP Lead Nurture Tracks</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                WhatsApp VIP Lead Nurture Tracks — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Messaging</td>
                        <td className="px-3 py-2 border-b border-gray-200">WhatsApp Business</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Templates</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion library</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Tracking</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion CRM / HubSpot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Link previews</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Drive / PDF links</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Automation (optional)</td>
                        <td className="px-3 py-2">Zapier → WhatsApp API (for reminders only)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. The Three Types of WhatsApp VIP Tracks
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track A — Jurisdictional Intelligence Track</p>
                  <p className="text-justify">For founders, SMEs, crypto teams, mobility-driven clients.</p>
                  <p className="text-justify mt-2">Weekly or bi-weekly insights such as:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">ADGM vs DIFC updates</li>
                    <li className="text-justify">Cayman/BVI changes</li>
                    <li className="text-justify">Banking shifts</li>
                    <li className="text-justify">Licensing climate signals</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track B — Compliance & Banking Track</p>
                  <p className="text-justify">For FinTech, VASP, EMI/MSB, high-risk sectors.</p>
                  <p className="text-justify mt-2">Insights:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">AML/ES/CRS changes</li>
                    <li className="text-justify">Bank onboarding intelligence</li>
                    <li className="text-justify">Regulator expectations</li>
                    <li className="text-justify">EDD/KYC guidance</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track C — UHNW Family Governance Track</p>
                  <p className="text-justify">For HNWI, family offices, estate planners.</p>
                  <p className="text-justify mt-2">Insights:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Trust/foundation updates</li>
                    <li className="text-justify">Asset protection considerations</li>
                    <li className="text-justify">Residency impact on structures</li>
                    <li className="text-justify">Cross-border estate guidance</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. WhatsApp Message Architecture (Tone & Structure)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Tone</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Private</li>
                    <li className="text-justify">Discreet</li>
                    <li className="text-justify">Founder-level</li>
                    <li className="text-justify">Non-sales</li>
                    <li className="text-justify">Authoritative</li>
                    <li className="text-justify">Precise</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Structure</p>
                  <p className="text-justify">Each message follows a professional micro-briefing format:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Update</li>
                    <li className="text-justify">Impact</li>
                    <li className="text-justify">Observation</li>
                    <li className="text-justify">If relevant, let me know</li>
                  </ul>
                  <p className="text-justify mt-3 font-semibold">Example:</p>
                  <div className="p-3 bg-white border border-gray-300 rounded-lg mt-2 italic text-gray-700">
                    <p className="text-justify">"Quick update — BVI FSC just released a notice tightening UBO reporting timelines.</p>
                    <p className="text-justify mt-2">Impact: entities with complex structures may face compressed filing windows.</p>
                    <p className="text-justify mt-2">Observation: banks may start requesting updated registers during onboarding.</p>
                    <p className="text-justify mt-2">If relevant, I can outline how this affects your current jurisdictions."</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Frequency Guidelines
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">1–2 messages per week</p>
                  <p className="text-justify">No spam, no noise.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">More frequent only during regulatory shifts</p>
                  <p className="text-justify">Clients appreciate timely intelligence.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Immediate reply window within 6–12 hours</p>
                  <p className="text-justify">Responsiveness builds authority.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. How Prospects Enter the Track
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Entry Point 1 — After a strong LinkedIn conversation</p>
                  <p className="text-justify italic">"Happy to share periodic jurisdiction insights via WhatsApp if easier for you."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Entry Point 2 — After a diagnostic call</p>
                  <p className="text-justify italic">"WhatsApp is quicker for urgent updates — shall I add you?"</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Entry Point 3 — When they show urgency</p>
                  <p className="text-justify">Banking issues, licensing questions, fund deadlines.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Entry Point 4 — Founder discretion</p>
                  <p className="text-justify">Only invite high-value prospects.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. The 4-Stage Nurture Structure
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Stage 1 — Awareness</p>
                  <p className="text-justify">Short updates + frameworks. Goal: establish authority.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Stage 2 — Context Alignment</p>
                  <p className="text-justify">Send insights tailored to their sector.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Stage 3 — Advisory Micro-Interactions</p>
                  <p className="text-justify">Examples: "If you're considering UAE, ADGM just released X." "The Cayman VASP guideline aligns with your model."</p>
                  <p className="text-justify mt-2">Goal: show understanding of their needs.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Stage 4 — Conversion</p>
                  <p className="text-justify">Soft advisory CTA: "If you want, I can prepare a jurisdictional map tailored to your structure — no obligation."</p>
                  <p className="text-justify mt-2 font-semibold">High conversion.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — No marketing language</p>
                  <p className="text-justify">WhatsApp is advisory, not promotional.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Never send bulk messages</p>
                  <p className="text-justify">Every update must feel personal.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — No sensitive client details</p>
                  <p className="text-justify">Ever.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Founder-led</p>
                  <p className="text-justify">Only Inderjeet or Joel for VIP prospects.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Precision over frequency</p>
                  <p className="text-justify">One perfect message beats ten average ones.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Replies received</li>
                    <li className="text-justify">Conversations progressing to calls</li>
                    <li className="text-justify">Diagnostic sessions booked</li>
                    <li className="text-justify">Mandates generated</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Retention of VIP contacts</li>
                    <li className="text-justify">Forwarding of insights</li>
                    <li className="text-justify">Referral introductions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-value prospect → WhatsApp VIP track → Authority insights → Micro-dialogues → Diagnostic session → High-ticket mandate. WhatsApp becomes your elite, private, founder-led dealflow accelerator.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Private Slack/Telegram Communities — Execution Playbook
  if (isPrivateSlackTelegramModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Private Slack/Telegram Communities</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Private Slack/Telegram Communities — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Platform</td>
                        <td className="px-3 py-2 border-b border-gray-200">Slack (professional), Telegram (crypto/HNWI), Discord (Web3)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Content hub</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion or Google Drive</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Identity</td>
                        <td className="px-3 py-2 border-b border-gray-200">Branded templates via Canva</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier → Slack or Telegram bots</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot or Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Tracking</td>
                        <td className="px-3 py-2">Weekly participation KPI sheet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Community Types (Choose One or Run All Three)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Slack — "Executive Structuring Circle"</p>
                  <p className="text-justify">Targets: Fund managers, CFOs, GCs, fintech operators.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Telegram — "Offshore & Licensing Intelligence Desk"</p>
                  <p className="text-justify">Targets: Crypto founders, HNWIs, tokenization projects, brokers.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Discord — "Digital Asset Structuring Guild"</p>
                  <p className="text-justify">Targets: Web3 teams, DAO architects, tokenization labs.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Community Positioning
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This is NOT a "chat group." It is a professional intelligence environment.
                </p>
                <p className="text-justify">Positioning statements:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">"Private jurisdiction intelligence circle."</li>
                  <li className="text-justify">"A curated community for global operators."</li>
                  <li className="text-justify">"Offshore structuring and licensing advisory desk."</li>
                  <li className="text-justify">"A founder-led group for high-value regulatory insights."</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This elevates the brand.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Content Framework (Weekly Rhythm)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Monday — Regulatory Insight Drop</p>
                  <p className="text-justify">Short, high-authority updates.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Wednesday — Structuring Framework or Visual Diagram</p>
                  <p className="text-justify">Examples:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Cayman vs BVI fund playbooks</li>
                    <li className="text-justify">VASP licensing flowchart</li>
                    <li className="text-justify">Banking acceptance matrix</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Friday — Open Q&A / Diagnostic Sessions</p>
                  <p className="text-justify">Members ask high-value questions. You respond with clarity and professionalism.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Monthly — Private Roundtable</p>
                  <p className="text-justify">Invite-only video session. Topic-specific deep dive.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Member Onboarding Process
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Invitation script (professional, exclusive)</p>
                  <p className="text-justify italic">"We're assembling a private intelligence circle on Slack for founders and fund managers who operate across multiple jurisdictions. You'll receive regulatory updates, structuring frameworks, and periodic banking insights. If you'd like access, I can provide the private join link."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Entry criteria</p>
                  <p className="text-justify">Member must be:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Relevant</li>
                    <li className="text-justify">Serious</li>
                    <li className="text-justify">Engaged</li>
                    <li className="text-justify">Global in operations</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. First DM after joining</p>
                  <p className="text-justify italic">"Welcome — here are the guidelines + what to expect weekly."</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Engagement Structure
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. No spam, no irrelevant chatter</p>
                  <p className="text-justify">Every message must add value.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Answer questions publicly when possible</p>
                  <p className="text-justify">Creates value for all.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Invite members to private diagnostics when needed</p>
                  <p className="text-justify">Soft handoff: "If you want, we can review your structure privately."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Moderation</p>
                  <p className="text-justify">Only founders or senior advisors speak authoritatively.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Funnel Mechanics
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Community Member → Trust builds over time → Asks question → Shows need → Private chat → Diagnostic call → Mandate.
                </p>
                <p className="text-justify mt-3 font-semibold">
                  This is an intent engine, not an awareness engine.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Qualified questions asked</li>
                    <li className="text-justify">Private consultations booked</li>
                    <li className="text-justify">Mandates originated</li>
                    <li className="text-justify">Member retention</li>
                    <li className="text-justify">Repeat referrals inside community</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Quality of weekly engagement</li>
                    <li className="text-justify">Number of active members</li>
                    <li className="text-justify">Participation in roundtables</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Community is not a sales environment</p>
                  <p className="text-justify">Members must feel safe asking questions.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — All insights must be accurate and updated</p>
                  <p className="text-justify">This builds long-term trust.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Protect confidentiality</p>
                  <p className="text-justify">Never discuss member identities outside the channel.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Eliminate low-value noise</p>
                  <p className="text-justify">Maintain elite positioning.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Founder presence is mandatory</p>
                  <p className="text-justify">Communities collapse without leadership.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                10. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Private community → Credibility reinforcement → High-value questions → 1:1 advisory chats → Mandates. This channel creates long-cycle, deep trust pipelines that competitors cannot replicate.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // High-Net-Worth Email Drip Architecture — Execution Playbook
  if (isHighNetWorthEmailModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">High-Net-Worth Email Drip Architecture</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                High-Net-Worth Email Drip Architecture — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Email sending</td>
                        <td className="px-3 py-2 border-b border-gray-200">ConvertKit / Mailchimp / HubSpot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Template design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion + Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM integration</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Segmentation</td>
                        <td className="px-3 py-2 border-b border-gray-200">ConvertKit automations</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Tracking</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot + Google Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Asset storage</td>
                        <td className="px-3 py-2">Google Drive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Architecture of the Drip Sequence (The Core 9 Emails)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Each email is written like a private advisory memo.</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Email 1 — The Offshore Compass (Orientation Memo)</p>
                  <p className="text-justify">Short, high-level overview of structuring approaches.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Email 2 — Jurisdiction Playbook (Cayman, BVI, Seychelles, UAE)</p>
                  <p className="text-justify">Comparative insights for high-net-worth clients.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Email 3 — Banking Intelligence Briefing</p>
                  <p className="text-justify">Global onboarding climate, crypto acceptance trends, EMI vs bank pathways.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 4 — Trust & Foundation Structuring Architecture</p>
                  <p className="text-justify">Succession, governance, asset protection.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 5 — Licensing Pathways Summary (VASP, EMI, MSB, Fund)</p>
                  <p className="text-justify">When to pursue which license.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 6 — Tax Neutrality & Economic Substance Clarification</p>
                  <p className="text-justify">Dispelling misconceptions.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 7 — Fund Strategy Structures (SPV, GP/LP, Segregated Portfolios)</p>
                  <p className="text-justify">Technical but accessible.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 8 — Redomiciliation / Restructuring Windows</p>
                  <p className="text-justify">When clients should consider shifting jurisdictions.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Email 9 — Private Invitation to a Call / Roundtable</p>
                  <p className="text-justify">Soft, professional, no sales tone.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Tone & Style Guidelines (Mandatory for HNW Segments)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tone Characteristics</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Senior</li>
                    <li className="text-justify">Minimalist</li>
                    <li className="text-justify">Analytical</li>
                    <li className="text-justify">Non-sales</li>
                    <li className="text-justify">Context-driven</li>
                    <li className="text-justify">Discreet</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Avoid</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Exclamation marks</li>
                    <li className="text-justify">Casual language</li>
                    <li className="text-justify">Hype</li>
                    <li className="text-justify">Marketing tone</li>
                    <li className="text-justify">Urgency tactics</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    These prospects respond to competence, not persuasion.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Segmentation Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Create segments:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">HNWI succession</li>
                  <li className="text-justify">Family office</li>
                  <li className="text-justify">Crypto founders</li>
                  <li className="text-justify">Fund managers</li>
                  <li className="text-justify">SME cross-border founders</li>
                  <li className="text-justify">Licensing prospects</li>
                  <li className="text-justify">Banking-friction clients</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Each segment receives tailored versions of 3–4 emails.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Engagement Funnels
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">Micro-Engagement Events</p>
                <p className="text-justify">Throughout the drip, prospects receive:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">"If relevant, I can share a comparison chart."</li>
                  <li className="text-justify">"If useful, I can outline the structure we see working."</li>
                  <li className="text-justify">"If timing aligns, I can prepare a private memo for your team."</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    These micro-engagements naturally lead to calls.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Conversion Sequence
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 1 — Prospect replies to an email</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 2 — Founder responds privately</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 3 — Preliminary diagnostic call</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 4 — Engagement letter & onboarding</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 5 — Long-cycle advisory relationship</p>
                </div>
                <p className="text-justify mt-4 font-semibold">Emails are the ignition point.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — No more than 2 emails/month</p>
                  <p className="text-justify">HNWIs hate frequency. Love quality.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — No attachments unless requested</p>
                  <p className="text-justify">Clean, minimal formatting.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Personal founder signature mandatory</p>
                  <p className="text-justify">This is founder-led advisory.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Never send sales or promotional language</p>
                  <p className="text-justify">Every email must add value.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Compliance & confidentiality always respected</p>
                  <p className="text-justify">Never reference client identities or specific cases.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Email replies (the strongest conversion signal)</li>
                    <li className="text-justify">Diagnostic calls booked</li>
                    <li className="text-justify">Mandates closed</li>
                    <li className="text-justify">Multi-service adoption</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Open rate (target 45–60%)</li>
                    <li className="text-justify">Click rate (target 10–20%)</li>
                    <li className="text-justify">Message forwards (silent engagement)</li>
                  </ul>
                  <p className="text-justify mt-3">HNWIs forward valuable insights internally.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-level advisory memo → Repeated trust → Silent engagement → Inquiry → Diagnostic → High-ticket mandate. This is the most sophisticated nurture engine for UHNW segments.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Precision Retargeting of High-Intent Segments — Execution Playbook
  if (isPrecisionRetargetingModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Precision Retargeting of High-Intent Segments</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Precision Retargeting of High-Intent Segments — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn retargeting</td>
                        <td className="px-3 py-2 border-b border-gray-200">Campaign Manager + Matched Audiences</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Google retargeting</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Ads + GA4</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Website pixels</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Tag Manager</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Data sources</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot CRM, Notion CRM</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Creative design</td>
                        <td className="px-3 py-2 border-b border-gray-200">Canva, Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Messaging</td>
                        <td className="px-3 py-2">Notion playbooks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. The Three Core Retargeting Funnels
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Funnel A — LinkedIn Precision Retargeting</p>
                  <p className="text-justify font-semibold mt-2">Target:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Profile viewers</li>
                    <li className="text-justify">Content engagers</li>
                    <li className="text-justify">Website visitors</li>
                    <li className="text-justify">ABM account lists</li>
                    <li className="text-justify">VIP WhatsApp contacts</li>
                    <li className="text-justify">Webinar attendees</li>
                  </ul>
                  <p className="text-justify font-semibold mt-3">Ads shown:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Structuring frameworks</li>
                    <li className="text-justify">Licensing comparisons</li>
                    <li className="text-justify">Banking intelligence</li>
                    <li className="text-justify">"What changed this month?" regulatory insights</li>
                    <li className="text-justify">Founder short videos</li>
                  </ul>
                  <p className="text-justify mt-3">This keeps Boyar in front of decision-makers.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Funnel B — Google Display Retargeting</p>
                  <p className="text-justify font-semibold mt-2">Target:</p>
                  <p className="text-justify">Anyone who visited:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Licensing pages</li>
                    <li className="text-justify">Trust/foundation pages</li>
                    <li className="text-justify">Bank onboarding pages</li>
                    <li className="text-justify">Emergency advisory pages</li>
                    <li className="text-justify">Jurisdiction comparison pages</li>
                  </ul>
                  <p className="text-justify font-semibold mt-3">Ads shown:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Diagrams</li>
                    <li className="text-justify">Frameworks</li>
                    <li className="text-justify">"Request a private briefing" invitations</li>
                  </ul>
                  <p className="text-justify mt-3">Very inexpensive, highly visible.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Funnel C — YouTube Retargeting</p>
                  <p className="text-justify font-semibold mt-2">Target:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">People who watched ≥50% of your videos</li>
                    <li className="text-justify">Viewers of specific topics (funds, licensing, crypto banking)</li>
                  </ul>
                  <p className="text-justify font-semibold mt-3">Ads shown:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Expert summaries</li>
                    <li className="text-justify">Short jurisdiction insights</li>
                    <li className="text-justify">Thought leadership clips</li>
                  </ul>
                  <p className="text-justify mt-3">This reinforces your authority.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Segmentation Strategy (High-Intent Groups)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Segment 1 — Crypto / Web3 founders</p>
                  <p className="text-justify">Retarget with VASP insights, tokenization frameworks, banking updates.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Segment 2 — Fund Managers & Asset Managers</p>
                  <p className="text-justify">Retarget with Cayman/BVI fund diagrams, GP/LP frameworks.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Segment 3 — FinTech, EMI, MSB</p>
                  <p className="text-justify">Retarget with licensing pathways and compliance maps.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment 4 — SMEs & Cross-border founders</p>
                  <p className="text-justify">Retarget with jurisdiction and banking frameworks.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment 5 — HNW / Family Office</p>
                  <p className="text-justify">Retarget with trust/foundation insights and governance notes.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Messaging Architecture
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Messages should be:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Factual</li>
                  <li className="text-justify">Educational</li>
                  <li className="text-justify">Discreet</li>
                  <li className="text-justify">Authoritative</li>
                  <li className="text-justify">Not sales-driven</li>
                </ul>
                <p className="text-justify font-semibold mt-4">Examples:</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Ad 1 — Jurisdiction Framework</p>
                  <p className="text-justify italic">"Cayman, BVI, ADGM, Seychelles — which structure aligns with your global expansion? A technical comparison for decision-makers."</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Ad 2 — Licensing Pathway</p>
                  <p className="text-justify italic">"VASP licensing in 2025: timelines, documentation, and supervisory expectations."</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Ad 3 — Banking Insight</p>
                  <p className="text-justify italic">"Global banking environment for crypto-linked structures — updated quarterly."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Ad 4 — HNWI Advisory</p>
                  <p className="text-justify italic">"Trust or Foundation? Governance implications for multi-jurisdiction families."</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Frequency & Control
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">Recommended cadence</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">LinkedIn: 1 impression/day</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Google Display: 2–4 impressions/day</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">YouTube retargeting: 1–2 views/week</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-4">
                  <p className="text-justify">
                    This is not mass marketing. It is subtle, reinforcing presence.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Conversion Pathways
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Pathway 1 — Retargeting → LinkedIn DM → Diagnostic Call</p>
                  <p className="text-justify">(This is the most common.)</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Pathway 2 — Retargeting → Website revisit → Call booking</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Pathway 3 — Retargeting → Email reply</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Pathway 4 — Retargeting → WhatsApp VIP track invite</p>
                </div>
                <p className="text-justify mt-4 font-semibold">High-intent buyers convert across multiple channels.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — No aggressive language</p>
                  <p className="text-justify">Ads must feel advisory, not promotional.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — No fear-based messaging</p>
                  <p className="text-justify">Sophisticated clients dislike emotional manipulation.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Founder-led positioning</p>
                  <p className="text-justify">Use Inderjeet's face, voice, or frameworks where appropriate.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Absolute accuracy</p>
                  <p className="text-justify">All diagrams, timelines, and data must be correct.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Small budgets, high precision</p>
                  <p className="text-justify">This is a sniper model, not a cannon model.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Return visits</li>
                    <li className="text-justify">Profile views</li>
                    <li className="text-justify">DM inquiries</li>
                    <li className="text-justify">Diagnostic calls booked</li>
                    <li className="text-justify">Mandates closed</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Cost per re-engaged user</li>
                    <li className="text-justify">Engagement on retargeted assets</li>
                    <li className="text-justify">Time to conversion reduction</li>
                  </ul>
                  <p className="text-justify mt-3">Retargeting shortens the deal cycle dramatically.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Warm signal → Ultra-specific retargeting → Silent confidence-building → Diagnostic → Mandate. This model ensures Boyar remains omnipresent in a subtle, elite, ultra-targeted way.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Multi-Touch Nurture Automation — Execution Playbook
  if (isMultiTouchNurtureModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Multi-Touch Nurture Automation</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Multi-Touch Nurture Automation — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Core CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot (recommended) or Notion CRM</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Email automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">ConvertKit / HubSpot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Retargeting engine</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Matched Audiences + Google Ads</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Multi-channel trigger automation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zapier</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Asset library</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion + Google Drive</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Signal detection</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Sales Navigator + GA4</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Decision scoring</td>
                        <td className="px-3 py-2">HubSpot lead scoring</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. The Five Nurture Tracks (Core Architecture)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Every prospect is placed into one of these tracks:</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track 1 — Structuring & Jurisdiction Advisory</p>
                  <p className="text-justify">For SMEs, founders, HNW, global operators.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track 2 — Licensing Pathway Nurture</p>
                  <p className="text-justify">For VASP, EMI, MSB, Forex, Fund, FinTech.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Track 3 — Fund Formation & Administration</p>
                  <p className="text-justify">For GPs, asset managers, prop desks.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Track 4 — HNWI / Family Office Governance</p>
                  <p className="text-justify">For succession planning, trusts, foundations, wealth protection.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Track 5 — Crypto & Tokenization Structuring</p>
                  <p className="text-justify">For Web3, token issuers, DAOs, exchanges.</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm mt-4">
                  <p className="text-justify">
                    Each track receives tailored micro-sequences.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. The Multi-Touch Sequence Framework (The 10 Touch Blueprint)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Each prospect undergoes a 10-touch nurture journey over 45–90 days.</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Touch 1 (Day 0–1) — Founder Introduction Insight</p>
                  <p className="text-justify">Short memo or jurisdiction perspective.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Touch 2 (Day 3–5) — Framework Delivery</p>
                  <p className="text-justify">E.g., "Cayman vs BVI structuring logic."</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Touch 3 (Day 7–10) — LinkedIn Connection + Content Visibility</p>
                  <p className="text-justify">Precision content targeting.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 4 (Day 14) — Retargeting Exposure</p>
                  <p className="text-justify">Visual jurisdiction diagram.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 5 (Day 18–21) — Regulatory Insight Email</p>
                  <p className="text-justify">Short high-value update.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 6 (Day 25) — Micro-Call to Action</p>
                  <p className="text-justify">"If useful, I can prepare a jurisdictional map for your structure."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 7 (Day 30–35) — WhatsApp VIP Invite (select prospects only)</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 8 (Day 40) — Founder's Private Note</p>
                  <p className="text-justify">A short, personalised advisory observation.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 9 (Day 50–60) — Case Study or anonymised structure example</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Touch 10 (Day 60–90) — Invitation to a private briefing or roundtable</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm mt-4">
                  <p className="text-justify">
                    This is not "marketing." This is a calculated advisory journey.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Triggering Mechanisms
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">The automation activates when:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Someone views a key page (trusts, funds, licensing, banking)</li>
                  <li className="text-justify">Someone opens 2+ regulatory emails</li>
                  <li className="text-justify">Someone downloads a framework</li>
                  <li className="text-justify">Someone engages on LinkedIn</li>
                  <li className="text-justify">Someone signs up for a webinar</li>
                  <li className="text-justify">Someone attends a Zoom briefing</li>
                  <li className="text-justify">Someone replies via WhatsApp</li>
                  <li className="text-justify">Someone watches a YouTube video</li>
                  <li className="text-justify">Someone is added manually after a call</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Each action assigns a score. Higher score → more personalised nurture.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Personalisation Layers
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 1 — Jurisdiction Personalisation</p>
                  <p className="text-justify">e.g., if a prospect views UAE content → send ADGM vs DIFC breakdown.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 2 — Sector Personalisation</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Crypto → VASP frameworks</li>
                    <li className="text-justify">Family office → trust governance</li>
                    <li className="text-justify">Fund managers → GP/LP strategy</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 3 — Intent Personalisation</p>
                  <p className="text-justify">Banking content → send banking acceptance matrix.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 4 — Founder Personalisation</p>
                  <p className="text-justify">Founder's direct note for top-tier prospects.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Always advisory, never promotional</p>
                  <p className="text-justify">Even automated messages must read like a memo.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Frequency never exceeds twice/month unless triggered</p>
                  <p className="text-justify">HNW and corporate audiences dislike clutter.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Automation must feel human</p>
                  <p className="text-justify">Tone: thoughtful, calm, senior.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — All micro-assets must be top-tier</p>
                  <p className="text-justify">No generic content.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Compliance is mandatory</p>
                  <p className="text-justify">No sensitive data. No personalised structuring without onboarding.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Movement from cold → warm → hot</li>
                    <li className="text-justify">Diagnostics booked</li>
                    <li className="text-justify">Mandates closed</li>
                    <li className="text-justify">Multi-service adoption</li>
                    <li className="text-justify">Lead scoring accuracy</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Email engagement</li>
                    <li className="text-justify">Content downloads</li>
                    <li className="text-justify">LinkedIn interactions</li>
                    <li className="text-justify">Retargeting view-through conversions</li>
                    <li className="text-justify">WhatsApp replies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Multiple intelligent touches → Trust → Familiarity → Personal relevance → Diagnostic call → Mandate. Multi-touch nurturing ensures Boyar wins high-value clients by staying consistently present in their decision landscape.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Referral & Introducer Partner Network — Execution Playbook
  if (isReferralIntroducerNetworksModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Referral & Introducer Partner Network</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Referral & Introducer Partner Network — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Partner documentation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Drive</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Agreements</td>
                        <td className="px-3 py-2 border-b border-gray-200">DocuSign</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Nurture content</td>
                        <td className="px-3 py-2 border-b border-gray-200">Notion + Figma</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Outreach</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Sales Navigator</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Tracking</td>
                        <td className="px-3 py-2">HubSpot & partner performance sheets</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Partner Categories to Target (Initial Phase)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 1 (High-value referral sources)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">International law firms</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Wealth managers</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">Crypto compliance firms</li>
                    <li className="text-justify">Family office consultants</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 2 (Moderate-value sources)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Immigration/residency firms</li>
                    <li className="text-justify">Real estate investment groups</li>
                    <li className="text-justify">Accounting practices</li>
                    <li className="text-justify">Corporate secretarial firms</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 3 (Opportunistic sources)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Business consultants</li>
                    <li className="text-justify">Startup incubators</li>
                    <li className="text-justify">Tokenization labs</li>
                    <li className="text-justify">Local agents in offshore jurisdictions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Three-Layer Partner Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer A — Strategic Advisory Partners</p>
                  <p className="text-justify">Lawyers, accountants, bankers. High trust, high volume.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer B — Industry Partners</p>
                  <p className="text-justify">Crypto exchanges, fund admins, fintech incubators. Deal-specific referrals.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer C — Access Partners</p>
                  <p className="text-justify">UHNW introducers, private networks, family advisors. High-value, low-volume.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Partner Onboarding Framework
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 1 — Value Demonstration</p>
                  <p className="text-justify">Send a high-quality insight asset: VASP licensing guide, trust structure comparison, or banking acceptance matrix. Shows competence immediately.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 2 — Introductory Call</p>
                  <p className="text-justify">Purpose: understand their client base, identify pain points, define areas where Boyar can assist. No selling.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Step 3 — Cooperation Agreement (Lightweight)</p>
                  <p className="text-justify">Clear terms: referral protections, confidentiality, fee sharing (if applicable and legal), communication protocol, non-solicitation rules. Simple, elegant, professional.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 4 — Partner Activation Kit</p>
                  <p className="text-justify">Includes: capability statement, compliance checklist, structuring playbook, pricing guidance (internal only), workflow overview, point-of-contact details. Partners feel equipped.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Step 5 — Ongoing Partner Nurture</p>
                  <p className="text-justify">Monthly partner briefing with: regulatory updates, success case summaries, new service lines, partnership highlights. Partners send more referrals when they feel informed.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Referral Handling Workflow
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">1. Partner introduces client privately</p>
                  <p className="text-justify">Warm intro to founder.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">2. Quick reputation & conflict checks</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">3. Founder-led diagnostic call</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">4. Tailored proposal + engagement letter</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">5. Partner updated on high-level outcomes</p>
                  <p className="text-justify">(Never client-sensitive details)</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">6. Partner paid referral fees if applicable</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Incentive Structures
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Option A — Fixed referral fee</p>
                  <p className="text-justify">Common with consultants, secretarial firms.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Option B — Percentage of first-year fees</p>
                  <p className="text-justify">Typical with corporate service providers.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Option C — No monetary referral</p>
                  <p className="text-justify">With lawyers, bankers, fund admins (they refer for client service quality, not commissions).</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Option D — Reciprocal referrals (carefully controlled)</p>
                  <p className="text-justify">Only for strategic partners.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Never share confidential client info with partners</p>
                  <p className="text-justify">Only status updates.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Partners receive white-glove treatment</p>
                  <p className="text-justify">Fast responses, precise execution.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — All promises must be kept</p>
                  <p className="text-justify">Your reliability equals their reputation.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Never become dependent on one partner</p>
                  <p className="text-justify">Diversify across jurisdictions and industries.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Maintain founder-level oversight</p>
                  <p className="text-justify">Introducers trust founders, not teams.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Number of active partners</li>
                    <li className="text-justify">Qualified referrals received</li>
                    <li className="text-justify">Mandates originated</li>
                    <li className="text-justify">Partner retention</li>
                    <li className="text-justify">Revenue per partner</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Partner engagement in monthly briefings</li>
                    <li className="text-justify">Response time</li>
                    <li className="text-justify">Quality of referred clients</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-value partner → Warm referral → Founder diagnostic → Engagement → Trusted loop → Referral snowball. Referral networks produce the highest quality, lowest cost, most consistent dealflow in offshore advisory.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Family Office Acquisition Network — Execution Playbook
  if (isFamilyOfficeAcquisitionModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Family Office Acquisition Network</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Family Office Acquisition Network — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools & Assets Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Category</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools / Assets</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Intelligence</td>
                        <td className="px-3 py-2 border-b border-gray-200">Jurisdiction briefs, trust comparison charts</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">FO-ready decks</td>
                        <td className="px-3 py-2 border-b border-gray-200">Governance & structuring playbook</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Channels</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn + curated email list</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Events</td>
                        <td className="px-3 py-2 border-b border-gray-200">Private briefings, dinners, micro-roundtables</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Content</td>
                        <td className="px-3 py-2 border-b border-gray-200">Whitepapers, regulatory updates</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Personalisation</td>
                        <td className="px-3 py-2">FO diagnostic questionnaire</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. FO Segmentation (Target Personas)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Group A — Direct Family Offices</p>
                  <p className="text-justify">Full infrastructure (CIO, COO, general counsel).</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Group B — Multi-Family Offices</p>
                  <p className="text-justify">Represent dozens of HNW families.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Group C — FO-Adjacent Professionals</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Trustees</li>
                    <li className="text-justify">Wealth advisors</li>
                    <li className="text-justify">Lawyers</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Fund administrators</li>
                  </ul>
                  <p className="text-justify mt-3">These introduce Boyar into FO ecosystems.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. 5-Layer Family Office Penetration Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 1 — FO Authority Positioning</p>
                  <p className="text-justify">Publish assets such as: "2025 Offshore Structuring Landscape for Global Families", "Trust vs Foundation Governance Models", "Cross-Border Banking Intelligence for UHNW Structures". FOs share these internally.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 2 — FO Introducer Path</p>
                  <p className="text-justify">Engage: private banks, accountants, fiduciaries, investment advisors. These introduce FOs directly.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 3 — Thought Leadership & Roundtables</p>
                  <p className="text-justify">Host FO-centric sessions: succession & governance, global expansion, tokenization frameworks, family funds & private pooled vehicles. These attract FO principals and advisors.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 4 — FO Relationship Deepening</p>
                  <p className="text-justify">Personal, founder-led interactions: private memos, WhatsApp VIP track, invitation to private FO briefings, bespoke comparative analyses. Trust is built one conversation at a time.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 5 — Long-Term Mandate Expansion</p>
                  <p className="text-justify">Once trust is established, expand into: fund formation, trust and foundation setup, ongoing governance advisory, economic substance compliance, banking architecture, restructuring, licensing strategy. FOs always have new needs.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. FO Outreach Architecture (Precision & Discretion)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. LinkedIn FO Messaging (Ultra-Refined)</p>
                  <p className="text-justify italic">"Given your cross-border exposure, I thought you may find our latest jurisdictional governance framework useful. If relevant, I can share a comparative model we built for family offices evaluating Cayman, BVI, and DIFC."</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Email Approach (Soft, Senior-Level)</p>
                  <p className="text-justify italic">"We periodically publish governance and structuring insights for global families. If appropriate, I can add you to the private distribution list."</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Introducer Path</p>
                  <p className="text-justify">Approach lawyers, bankers, trustees, fund admins with FO-specific insights.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. FO-Specific Advisory Assets
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">Core Assets</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Trust vs foundation governance memo</li>
                  <li className="text-justify">Private banking onboarding intelligence</li>
                  <li className="text-justify">Multi-jurisdiction asset protection framework</li>
                  <li className="text-justify">FO fund strategy matrix</li>
                  <li className="text-justify">Economic substance for family vehicles</li>
                  <li className="text-justify">Tax-neutral structuring guide</li>
                  <li className="text-justify">Tokenization & SPV options for FO investments</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    These tools open doors.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. FO Advisory Workflow
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">1. FO shows interest</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">2. Founder schedules a confidential diagnostic</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">3. Boyar prepares a private memo</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">4. Proposal issued</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">5. Multi-service expansion over time</p>
                </div>
                <p className="text-justify mt-4 font-semibold">FO engagements often expand into large, multi-year mandates.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — Founder-led communication only</p>
                  <p className="text-justify">FOs expect senior counterparts.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Absolute discretion</p>
                  <p className="text-justify">No names, no references, no public commentary.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Present technical clarity, not marketing</p>
                  <p className="text-justify">Every FO is run by sophisticated advisors.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Never rush the sales cycle</p>
                  <p className="text-justify">FOs move deliberately.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Deliver flawlessly</p>
                  <p className="text-justify">FO trust, once broken, is irreversible.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Number of FO entry points created</li>
                    <li className="text-justify">FO meetings scheduled</li>
                    <li className="text-justify">FO advisory memos delivered</li>
                    <li className="text-justify">Mandates originated</li>
                    <li className="text-justify">Long-term engagements</li>
                    <li className="text-justify">FO referral loops created</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">FO event attendance</li>
                    <li className="text-justify">FO content engagement</li>
                    <li className="text-justify">Introducer-generated FO introductions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Authority signals → Introducer pathways → FO interaction → Founder-led advisory → Multi-year mandate → FO referral network. This channel becomes one of the highest lifetime value acquisition models for Boyar Partners.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Boutique VC & Angel Syndicate Cross-Promotion — Execution Playbook
  if (isBoutiqueVcAngelModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Boutique VC & Angel Syndicate Cross-Promotion</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Boutique VC & Angel Syndicate Cross-Promotion — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-3 py-2 border-b border-gray-200">Function</th>
                        <th className="px-3 py-2 border-b border-gray-200">Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Outreach</td>
                        <td className="px-3 py-2 border-b border-gray-200">LinkedIn Sales Navigator</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">CRM</td>
                        <td className="px-3 py-2 border-b border-gray-200">HubSpot / Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Intelligence assets</td>
                        <td className="px-3 py-2 border-b border-gray-200">Figma + Notion</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Events</td>
                        <td className="px-3 py-2 border-b border-gray-200">Zoom Webinars / Riverside</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-b border-gray-200">Documentation</td>
                        <td className="px-3 py-2 border-b border-gray-200">Google Drive + DocuSign</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Tracking</td>
                        <td className="px-3 py-2">HubSpot + partner sheets</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Partner Segmentation (High-Value Targets)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier A — Boutique VC Funds</p>
                  <p className="text-justify">$5M–$50M AUM. Seed-stage or Series A investors.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier B — Angel Syndicates</p>
                  <p className="text-justify">Groups of 20–200 accredited investors.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier C — Crypto/Tokenization Syndicates</p>
                  <p className="text-justify">Web3 investor networks, DAO-based investor clubs.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier D — Micro Private Equity Deal Clubs</p>
                  <p className="text-justify">Wealth-backed small acquisition groups.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier E — Venture Scouts</p>
                  <p className="text-justify">Individuals who source deals for large firms.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. 6-Layer Cross-Promotion Strategy
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 1 — Foundational Expertise Positioning</p>
                  <p className="text-justify">Provide the VC or syndicate with: investment entity matrices, banking acceptance charts, SPV/LTD structuring models, VASP/EMI/MSB licensing pathways. They share these with portfolio founders.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 2 — Portfolio Founder Advisory Sessions</p>
                  <p className="text-justify">Offer quarterly sessions: "Offshore Structuring for Funded Startups", "Banking Strategies for High-Risk Business Models", "Jurisdiction Selection for Tokenized Projects", "Regulatory Forecast for 2025–2026". These events produce immediate inbound flow.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Layer 3 — Deal-Support Advisory</p>
                  <p className="text-justify">When VCs or angels consider investing, they ask Boyar: "Is the company structured correctly?" "Is the licensing pathway viable?" "Will banking be a problem?" Boyar becomes a risk assessor.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 4 — On-Call Structuring for Portfolio Companies</p>
                  <p className="text-justify">Boyar becomes a recommended advisory for: international expansion, licensing, fund/SPV setups, economic substance, governance, compliance. Founders often follow their investors' recommendations.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 5 — Syndicate Newsletter Integration</p>
                  <p className="text-justify">Provide monthly insights: jurisdiction changes, banking trends, compliance issues. Many syndicates share these widely.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Layer 6 — VC/Angel Introducer Channel</p>
                  <p className="text-justify">Once trust is established, investors refer new founders proactively.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Outreach Framework (Professional, Value-First)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Message Example (LinkedIn)</p>
                  <p className="text-justify italic">"Your recent investments suggest exposure to cross-border structuring and licensing challenges. We've been advising early-stage ventures on compliant Cayman/BVI/UAE setups, banking pathways, and licensing readiness. If relevant, I can share a brief technical comparison of structures that mitigate regulatory friction for your portfolio."</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Follow-Up</p>
                  <p className="text-justify italic">"Most funds evaluate founders' readiness across three vectors: • regulatory risk • banking access • jurisdiction stability. We've built a framework used by several boutiques to streamline this assessment. Happy to share it."</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Partner Onboarding Kit
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Contains:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Capability statement</li>
                  <li className="text-justify">Jurisdiction matrix</li>
                  <li className="text-justify">Licensing pathways</li>
                  <li className="text-justify">Structuring models</li>
                  <li className="text-justify">FO and UHNW governance integration</li>
                  <li className="text-justify">Tokenization framework (if relevant)</li>
                  <li className="text-justify">Founder diagnostic questionnaire</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This positions Boyar as a technical authority, not a sales organisation.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Standards
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 1 — No generic pitches</p>
                  <p className="text-justify">VCs and angels require competence, not selling.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 2 — Deliver rapid, accurate advisory responses</p>
                  <p className="text-justify">VCs move fast.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 3 — Maintain absolute discretion</p>
                  <p className="text-justify">Never mention portfolio names publicly.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 4 — Provide actual value before any referral</p>
                  <p className="text-justify">Stand out by intelligence, not follow-up pressure.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Rule 5 — Maintain founder-level engagement</p>
                  <p className="text-justify">Founders trust founders.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">VC/Syndicate relationships onboarded</li>
                    <li className="text-justify">Portfolio calls booked</li>
                    <li className="text-justify">Structuring & licensing mandates created</li>
                    <li className="text-justify">Founder referrals</li>
                    <li className="text-justify">Secondary introductions to new syndicates</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Newsletter mentions</li>
                    <li className="text-justify">Event attendance</li>
                    <li className="text-justify">Framework downloads</li>
                    <li className="text-justify">Repeat advisory requests</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Value-first intelligence → Investor trust → Portfolio advisory → Founder engagement → Mandates → Syndicate referral loops. VC/Syndicate partnerships become a high-leverage, upstream client acquisition engine for Boyar Partners.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Website SEO & Newsletter Inbound Model — Execution Playbook
  if (isSeoNewsletterModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Website SEO & Newsletter Inbound Model</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Website SEO & Newsletter Inbound Model — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="grid md:grid-cols-2 gap-3 text-gray-800 leading-relaxed text-left">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Function</strong></p>
                  <p className="text-justify">Website</p>
                  <p className="text-justify">SEO</p>
                  <p className="text-justify">Analytics</p>
                  <p className="text-justify">Newsletter</p>
                  <p className="text-justify">Lead capture</p>
                  <p className="text-justify">Content management</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Tools</strong></p>
                  <p className="text-justify">Webflow / Wordpress</p>
                  <p className="text-justify">Ahrefs; SurferSEO (optional)</p>
                  <p className="text-justify">Google Analytics, Search Console</p>
                  <p className="text-justify">Mailchimp / ConvertKit / HubSpot</p>
                  <p className="text-justify">Typeform, HubSpot forms</p>
                  <p className="text-justify">Notion</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Website Architecture (Professional Boutique Layout)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Authority Home Page</p>
                  <p className="text-justify">Message: “Global Structuring, Licensing & Banking Advisory for Founders, Funds, and Families.”</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Service Pages (SEO Optimized)</p>
                  <p className="text-justify">Offshore Structuring; Licensing (VASP, EMI, MSB, Forex, Fund); Banking Solutions; Trusts & Foundations; Corporate Services; Tokenization Advisory; Fund Services; Compliance & Regulatory Advisory — each 1,200–1,800 words, authoritative and legally informed.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Jurisdiction Pages</p>
                  <p className="text-justify">Cayman, BVI, Seychelles, Cook Islands, Singapore, UAE (DIFC/ADGM), Luxembourg/Ireland, Nevis, Malta — long-form pages to capture targeted search.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Resource Library (SEO Powerhouse)</p>
                  <p className="text-justify">Regulatory explainers, AML/ES/CRS insights, compliance frameworks, diagrams, licensing matrices, downloadable PDFs.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Primary CTA</p>
                  <p className="text-justify">“Request a Structuring Diagnostic.”</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Newsletter Structure (Monthly / Bi-Monthly)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Section 1 — Jurisdiction Update:</strong> Cayman, BVI, ADGM/DIFC, banking shifts.</li>
                  <li className="text-justify"><strong>Section 2 — Licensing Sector Insight:</strong> VASP, EMI, MSB, fund licensing.</li>
                  <li className="text-justify"><strong>Section 3 — Structuring Framework of the Month:</strong> e.g., SPV stacking for tokenization.</li>
                  <li className="text-justify"><strong>Section 4 — Brief Market Note:</strong> one-paragraph macro trend.</li>
                  <li className="text-justify"><strong>Section 5 — Discreet CTA:</strong> invite private diagnostic, zero sales tone.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. SEO Content Production Framework
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Publish 4–6 long-form articles per month: answer specific questions, ensure legal accuracy, add diagrams, maintain professional explanatory tone.</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">“Cayman vs BVI for Holding Companies (2025 Framework)”</li>
                  <li className="text-justify">“VASP Licensing Matrix — Europe, Caribbean, and UAE Compared”</li>
                  <li className="text-justify">“Offshore Banking for Crypto Companies — 2025 Reality”</li>
                  <li className="text-justify">“Trusts vs Foundations — When to Choose Which”</li>
                </ul>
                <p className="text-justify">Gated assets (lead magnets): Global Licensing Handbook 2025; Offshore Banking Acceptance Report; Jurisdiction Comparison Matrix; Token Structuring Frameworks → capture emails → add to newsletter.</p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Inbound Lead Flow
              </h2>
              <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                <li className="text-justify">Visitor reads a structuring/licensing article.</li>
                <li className="text-justify">They subscribe for updates.</li>
                <li className="text-justify">They receive monthly newsletters.</li>
                <li className="text-justify">They return to the site to read more.</li>
                <li className="text-justify">They book a diagnostic.</li>
                <li className="text-justify">You convert to structuring/banking/licensing mandates.</li>
              </ol>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Standards
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify">Precision: SEO content must be accurate.</li>
                <li className="text-justify">Founder-led insight: Inderjeet’s thinking guides frameworks.</li>
                <li className="text-justify">Consistency: minimum 2 articles/week + 1 newsletter/month.</li>
                <li className="text-justify">Zero sales pressure: authority replaces persuasion.</li>
                <li className="text-justify">Confidentiality: no client cases mentioned.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Primary:</strong> Diagnostic calls booked; high-intent inquiries; organic traffic from target keywords; newsletter subscribers; conversion from newsletter to diagnostic.</li>
                <li className="text-justify"><strong>Secondary:</strong> Jurisdiction page rankings; time on page; returning visitors; newsletter open rates.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Search-intent traffic → Authority content → Newsletter nurturing → Diagnostic session → Structuring/Banking/Licensing mandate. Website + SEO + newsletter becomes the most scalable long-term inbound engine.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Global Mobility & Residency Co-Marketing — Execution Playbook
  if (isGlobalMobilityModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Global Mobility & Residency Co-Marketing</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Global Mobility & Residency Marketing Model — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="grid md:grid-cols-2 gap-3 text-gray-800 leading-relaxed text-left">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Function</strong></p>
                  <p className="text-justify">Content research</p>
                  <p className="text-justify">Presentation</p>
                  <p className="text-justify">CRM</p>
                  <p className="text-justify">Hosting</p>
                  <p className="text-justify">Outreach</p>
                  <p className="text-justify">Workflow automation</p>
                  <p className="text-justify">Document delivery</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-justify"><strong>Tools</strong></p>
                  <p className="text-justify">VisaHQ, Henley Index, Nomad Capitalist Index</p>
                  <p className="text-justify">Canva Pro, Figma</p>
                  <p className="text-justify">HubSpot, Notion</p>
                  <p className="text-justify">Zoom Pro</p>
                  <p className="text-justify">LinkedIn + WhatsApp</p>
                  <p className="text-justify">Zapier</p>
                  <p className="text-justify">Notion, Google Drive</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Offer Architecture (The Boyar Positioning)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Offer: “Residency-aligned structuring and bankability strategy for global entrepreneurs and HNW families.”</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Residency options matrix</li>
                  <li className="text-justify">Structuring adjustments for relocation</li>
                  <li className="text-justify">Banking & compliance sequencing</li>
                  <li className="text-justify">Asset migration plan</li>
                  <li className="text-justify">Cross-border tax alignment consultation</li>
                  <li className="text-justify">Entity redomiciliation strategy</li>
                  <li className="text-justify">Licensing considerations for business relocation</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Target Market Segments
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Crypto founders & Web3 executives:</strong> UAE residency, Portugal (pre-MiCA), Cayman entity + relocation, Singapore alternatives.</li>
                  <li className="text-justify"><strong>Global entrepreneurs:</strong> UAE relocation, Malta residency, Singapore EP, offshore holding + onshore residency combos.</li>
                  <li className="text-justify"><strong>HNW families:</strong> Trust/foundation + residency, succession alignment, asset protection, multi-family office coordination.</li>
                  <li className="text-justify"><strong>Fund managers:</strong> Cayman/BVI fund + personal residency; Singapore/DIFC fund advisors relocating.</li>
                  <li className="text-justify"><strong>High-risk professionals:</strong> Banking + residency required together.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Content Architecture (What You Publish)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Residency Comparison Frameworks:</strong> “UAE vs Malta for Crypto Entrepreneurs”; “Singapore vs Portugal for Tech Founders”; “Where HNW Families Should Relocate in 2025.”</li>
                  <li className="text-justify"><strong>Structuring + Residency Hybrids:</strong> “Restructure Holdings Before Moving”; “Residency Impact on Offshore Banking Approvals”; “Trusts & Residency — Jurisdiction Alignment.”</li>
                  <li className="text-justify"><strong>Banking + Residency Insights:</strong> “Which Banks Accept New Residents?”; “Residency as a Banking Risk Factor.”</li>
                  <li className="text-justify"><strong>High-Intent Formats:</strong> Closed-door briefing, roundtable, masterclass on residency arbitrage for HNWIs.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Acquisition Channels
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>LinkedIn thought leadership:</strong> short videos, diagrams, frameworks.</li>
                  <li className="text-justify"><strong>Private webinars:</strong> Web3 communities, accelerator cohorts, family office circles.</li>
                  <li className="text-justify"><strong>Co-branded sessions:</strong> tax lawyers, immigration firms, wealth managers, real estate groups.</li>
                  <li className="text-justify"><strong>WhatsApp broadcast lists:</strong> high response from HNWIs.</li>
                  <li className="text-justify"><strong>ABM for residency-intent executives:</strong> target signals of relocation and expansion.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Delivery Framework (Client Experience)
              </h2>
              <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Diagnostic:</strong> Understand family, business, banking, and compliance needs.</li>
                <li className="text-justify"><strong>Residency Matrix:</strong> Present options with timelines, cost, impact.</li>
                <li className="text-justify"><strong>Structuring Strategy:</strong> Align holding companies, SPVs, trusts, banking.</li>
                <li className="text-justify"><strong>Asset Migration:</strong> Compliance-led transitions.</li>
                <li className="text-justify"><strong>Partner Execution:</strong> Immigration lawyers process filings.</li>
                <li className="text-justify"><strong>Ongoing Advisory:</strong> Banking, compliance, structuring post-relocation.</li>
              </ol>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Governance Rules
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify">Boyar remains strategist, not immigration processor.</li>
                <li className="text-justify">High-end positioning only; no mass-market visa messaging.</li>
                <li className="text-justify">Accuracy over hype; avoid “tax-free lifestyle” clichés.</li>
                <li className="text-justify">Confidentiality is mandatory; residency plans are sensitive.</li>
                <li className="text-justify">Founder-led communication: Inderjeet delivers expertise.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. KPIs
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Primary KPIs:</strong> Residency diagnostics booked; structuring mandates initiated; banking assignments linked to mobility; partner referrals; lifetime value per client.</li>
                <li className="text-justify"><strong>Secondary KPIs:</strong> LinkedIn engagement; webinar attendance; co-hosted events; pipeline value from mobility segment.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Mobility need → Strategy session → Structuring + banking plan → Ongoing advisory → Multi-service lifetime client. One of the highest-value acquisition channels Boyar can operate.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // CFO / General Counsel Executive Roundtable — Execution Playbook
  if (isCfoRoundtableModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">CFO / GC Executive Roundtable</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                CFO / GC Executive Roundtable — Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Blueprint for Boyar Partners
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools Required
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-justify"><strong>Function</strong></p>
                    <p className="text-justify">Hosting</p>
                    <p className="text-justify">Scheduling</p>
                    <p className="text-justify">Slides</p>
                    <p className="text-justify">CRM & Notes</p>
                    <p className="text-justify">Outreach</p>
                    <p className="text-justify">Follow-up</p>
                    <p className="text-justify">Confidential chat</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-justify"><strong>Tools</strong></p>
                    <p className="text-justify">Zoom Pro / Riverside</p>
                    <p className="text-justify">Calendly</p>
                    <p className="text-justify">Figma / Canva</p>
                    <p className="text-justify">Notion / HubSpot</p>
                    <p className="text-justify">LinkedIn, Email</p>
                    <p className="text-justify">HubSpot Sequences</p>
                    <p className="text-justify">WhatsApp groups / Slack channels</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Roundtable Structure (“The 45-Minute Executive Format”)
              </h2>
              <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                <li className="text-justify">
                  Opening (5 mins): Inderjeet introduces Boyar Partners, sets expectations (“This is a technical peer-level discussion”), and outlines topic/outcomes.
                </li>
                <li className="text-justify">
                  Executive Context (5 mins): Explain macro-regulatory environment — jurisdiction shifts, regulatory tightening, banking/supervision trends, licensing climate.
                </li>
                <li className="text-justify">
                  Deep Framework Section (10–15 mins): Present diagrams — Cayman/BVI decision trees, VASP licensing matrix, banking acceptance ladder, structuring models, compliance sequencing maps. This cements authority.
                </li>
                <li className="text-justify">
                  Executive Roundtable Discussion (15 mins): Ask structured questions (“How are you approaching banking for high-risk subsidiaries?”, “Which jurisdictions are you evaluating for expansion?”, “How are regulators responding to your sector?”). Executives share insights → trust increases.
                </li>
                <li className="text-justify">
                  Closing (2 mins): Summarize key frameworks. Offer optional diagnostics: “For any team reviewing structures/licensing, we can run a short confidential diagnostic.” No sales pitch.
                </li>
              </ol>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Topic Calendar (High-Impact Themes)
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Corporate Structuring:</strong> “Cayman vs BVI — CFO’s Structuring Framework for 2025”; “Where to Place Your Holding Company Before Expansion.”</li>
                <li className="text-justify"><strong>Banking:</strong> “Global Banking Acceptance for High-Risk Sectors”; “Risk-Based Banking: What CFOs Must Know in 2025.”</li>
                <li className="text-justify"><strong>Licensing:</strong> “VASP Licensing — CFO/GC Regulatory Obligations”; “EMI Licensing: Supervisory Expectations.”</li>
                <li className="text-justify"><strong>Crypto / Tokenization:</strong> “Token Foundation + SPV Combination Models.”</li>
                <li className="text-justify"><strong>Compliance:</strong> “Cross-Border Compliance Sequencing for Scaling Companies.”</li>
                <li className="text-justify"><strong>Funds:</strong> “Fund Structure Selection for Prop Desks & Asset Managers.”</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Audience Strategy
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Tier 1:</strong> Founders / CFOs / GCs of scaling companies — messaging: banking reliability, operational simplicity, regulatory clarity.</li>
                <li className="text-justify"><strong>Tier 2:</strong> Web3, Crypto, Tokenization teams — need VASP guidance, structuring, banking pathways.</li>
                <li className="text-justify"><strong>Tier 3:</strong> Funds & Asset Managers — fund vehicles, administration, custody, cross-border compliance.</li>
                <li className="text-justify"><strong>Tier 4:</strong> Advisors (lawyers, accountants, bankers) — broaden reach, bring clients, co-host, validate credibility.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Distribution Framework
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Pre-Event:</strong> Personalized LinkedIn invitations; targeted emails to CFO/GC prospects; partner co-host promotions; WhatsApp invites to VIP lists.</li>
                <li className="text-justify"><strong>During:</strong> Record (if allowed); collect insights; encourage discussion.</li>
                <li className="text-justify"><strong>Post-Event:</strong> Send summary, slide deck, framework diagrams, optional diagnostic call offer; then enter prospects into ABM nurturing sequences.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Guidelines
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify">Confidentiality is mandatory; no recording unless approved; no client-specific details.</li>
                <li className="text-justify">Zero marketing tone; purely advisory.</li>
                <li className="text-justify">Founder-led: Inderjeet (lead), Joel (research and support).</li>
                <li className="text-justify">Consistency: at least one roundtable per month.</li>
                <li className="text-justify">Topical relevance: sessions must reflect live regulatory and jurisdiction shifts.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs
              </h2>
              <ul className={listClass} style={{ listStylePosition: "outside" }}>
                <li className="text-justify"><strong>Primary KPIs:</strong> Executives attending each session; diagnostic calls booked; mandates generated; executive referrals; internal introductions (CFO → GC → CEO cycle).</li>
                <li className="text-justify"><strong>Secondary KPIs:</strong> Repeat attendance; partner co-host invitations; LinkedIn engagement from repurposed clips; strategic partnership formation.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-level peer discussion → Demonstrated mastery → Executive trust → Diagnostics booked → High-value multi-service mandates. This channel positions Boyar Partners as the strategic advisor CFOs and GCs rely on for global structuring, licensing, and regulatory navigation.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }
  // Founder-Led Origination Execution Playbook (full refreshed content)
  if (isFounderModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Founder-Led Origination</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Founder-Led Origination Execution Playbook
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Operational Handbook for Boyar Partners
              </h2>
            </div>

            {/* 1. Objectives of Execution */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Objectives of Execution
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">The Founder-Led Origination Model aims to:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Produce high-value mandates through trusted relationships</li>
                  <li className="text-justify">Convert UHNW, founder, fund, and executive prospects with minimal friction</li>
                  <li className="text-justify">Position Boyar Partners as a founder-led boutique advisory with discretion and authority</li>
                  <li className="text-justify">Generate referral loops from each successful engagement</li>
                  <li className="text-justify">Operate with high trust, low volume, high certainty rather than cold outreach</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify font-semibold">
                    This is the primary acquisition channel for the firm — the quality engine.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Required Infrastructure */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Required Infrastructure Before Activation
              </h2>
              <div className="space-y-6 text-gray-800 leading-relaxed text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">2.1 Network Intelligence Infrastructure</h3>
                  <p className="text-justify">Tools required:</p>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                    <table className="w-full text-sm text-left text-gray-800">
                      <thead className="bg-gray-100 text-gray-900">
                        <tr>
                          <th className="px-3 py-2 border-b border-gray-200">Purpose</th>
                          <th className="px-3 py-2 border-b border-gray-200">Recommended Tools</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border-b border-gray-200">Contact enrichment</td>
                          <td className="px-3 py-2 border-b border-gray-200">Apollo, Clay, Clearbit</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border-b border-gray-200">Network visualization</td>
                          <td className="px-3 py-2 border-b border-gray-200">Affinity, Folk.app or Notion CRM</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border-b border-gray-200">Relationship tracking</td>
                          <td className="px-3 py-2 border-b border-gray-200">HubSpot CRM or Pipedrive</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border-b border-gray-200">Founder LinkedIn monitoring</td>
                          <td className="px-3 py-2 border-b border-gray-200">Shield Analytics</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border-b border-gray-200">Private communication</td>
                          <td className="px-3 py-2 border-b border-gray-200">WhatsApp / Signal + HubSpot logging</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-justify mt-3">Outcome: A structured database of every warm contact, referral source, past client, and executive network node.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">2.2 Founder Positioning Assets</h3>
                  <p className="text-justify font-semibold">Mandatory items:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Founder credibility profiles</li>
                    <li className="text-justify">Executive capability statement (PDF)</li>
                    <li className="text-justify">Advisory services overview (professional)</li>
                    <li className="text-justify">Case studies (anonymized)</li>
                    <li className="text-justify">Jurisdiction briefing notes</li>
                    <li className="text-justify">Licensing pathway sheets</li>
                    <li className="text-justify">“Why Boyar Partners” background document</li>
                  </ul>
                  <p className="text-justify mt-3">Tools for creation: Notion, Figma, Canva Pro, Google Workspace.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">2.3 Compliance-Ready Onboarding Kit</h3>
                  <p className="text-justify">Every founder meeting must lead smoothly into onboarding.</p>
                  <p className="text-justify font-semibold mt-3">Components:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Pre-engagement KYC checklist</li>
                    <li className="text-justify">Conflict check form</li>
                    <li className="text-justify">Engagement letter template</li>
                    <li className="text-justify">Scope of work library</li>
                    <li className="text-justify">Document submission portal (Google Drive / Dropbox Pro)</li>
                  </ul>
                  <p className="text-justify mt-3">Tools for compliance: Vanta-like templates, OneDrive secure folders, Notion compliance dashboard.</p>
                </div>
              </div>
            </section>

            {/* 3. Workflow */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. The Founder-Led Origination Workflow (End-to-End)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">This workflow reflects how elite boutique advisory firms originate multi-million-dollar mandates.</p>
                <ol className="list-decimal ml-6 space-y-3 pl-1" style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">
                    <strong>Step 1 — Network Mapping & Prioritisation:</strong> Quarterly mapping of founder relationships, investor networks, previous clients, strategic partners, and high-value LinkedIn connections. Output: ranked tiers (Tier 1: 50 highest-value; Tier 2: 150 medium-high; Tier 3: long-cycle). Tool: Notion CRM / HubSpot custom views.
                  </li>
                  <li className="text-justify">
                    <strong>Step 2 — Relationship Activation:</strong> Founders initiate contact (LinkedIn DM, WhatsApp, email, private introductions) with advisory-driven, discreet tone. Sample openers highlight jurisdiction/banking insights.
                  </li>
                  <li className="text-justify">
                    <strong>Step 3 — First Founder Meeting (15–30 minutes):</strong> Establish context/trust, understand operations, identify pain points (banking, structuring, compliance, licensing), discuss jurisdictions at high level, assess suitability, decide next step. Tools: Meet/Zoom, Notion notes, CRM tasks.
                  </li>
                  <li className="text-justify">
                    <strong>Step 4 — Internal Diagnostic (By Founders):</strong> Jurisdiction fit, banking feasibility, compliance requirements, structure mapping, licensing implications. Deliverable: 1-page Founder Diagnostic Summary (Notion + Slack).
                  </li>
                  <li className="text-justify">
                    <strong>Step 5 — Engagement Proposal:</strong> Founder presents scope, timeline, fees, compliance requirements, risks, deliverables. Tools: Google Docs template, PandaDoc (optional), firm-branded PDFs.
                  </li>
                  <li className="text-justify">
                    <strong>Step 6 — KYC & Compliance Onboarding:</strong> Ops handles IDs, proof of address, SOF/SOW, corporate docs, screening checks. Tools: Veriff/SumSub (optional), Notion Compliance Workspace, encrypted vault.
                  </li>
                  <li className="text-justify">
                    <strong>Step 7 — Mandate Execution:</strong> Founders maintain communication; ops executes entities, structures, banking, licensing docs, ongoing compliance. Founder touchpoints every 7–14 days.
                  </li>
                  <li className="text-justify">
                    <strong>Step 8 — Referral Loop Activation:</strong> After success: request introductions/testimonial (private), add to warm-network tier. Tools: CRM automation, WhatsApp follow-up template.
                  </li>
                </ol>
              </div>
            </section>

            {/* 4. Cadence */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Weekly and Monthly Execution Cadence
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Weekly Cadence (Founders)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Review Tier 1 opportunities</li>
                    <li className="text-justify">Send 5–10 relationship warmers</li>
                    <li className="text-justify">Conduct 2–3 first meetings</li>
                    <li className="text-justify">Update CRM</li>
                    <li className="text-justify">Prepare 1–2 personalized briefs</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold">Monthly Cadence</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Host a private briefing dinner / webinar</li>
                    <li className="text-justify">Review all leads in pipeline</li>
                    <li className="text-justify">Prioritise top 10 prospects</li>
                    <li className="text-justify">Refresh jurisdiction briefing templates</li>
                    <li className="text-justify">Re-engage dormant warm leads</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Governance */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Governance & Quality Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-justify"><strong>Quality Control #1:</strong> Founder Tone Consistency — maintain boutique discretion.</p>
                    <p className="text-justify mt-2"><strong>Quality Control #2:</strong> No Speculative Advice Pre-KYC — keep regulatory discipline.</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-justify"><strong>Quality Control #3:</strong> Proposal Scoping Discipline — no deliverables without diagnostic clarity.</p>
                    <p className="text-justify mt-2"><strong>Quality Control #4:</strong> Prospect Suitability Screening — reject clients that increase compliance risk.</p>
                    <p className="text-justify mt-2"><strong>Quality Control #5:</strong> Reputation & Confidentiality Management — zero tolerance for disclosure.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Tools */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Tools Overview for Model 1 Execution
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold">Core Tools</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">HubSpot CRM → relationships, proposals, onboarding</li>
                      <li className="text-justify">Notion → internal playbooks, diagnostics, templates</li>
                      <li className="text-justify">LinkedIn Premium + Sales Navigator → founder outreach</li>
                      <li className="text-justify">Clearbit → enrichment & intelligence</li>
                      <li className="text-justify">Clay.ai → research automation</li>
                      <li className="text-justify">Google Workspace → documents, proposals, secure drive</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold">Optional Enhancements</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Dovetail / Folk.app → relationship intelligence</li>
                      <li className="text-justify">Affinity CRM → investor-style relationship mapping</li>
                      <li className="text-justify">SumSub → automated KYC onboarding</li>
                      <li className="text-justify">PandaDoc → proposal automation</li>
                      <li className="text-justify">Superhuman → email workflow for founders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. KPIs */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPIs & Success Metrics
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <p className="font-semibold">Primary KPIs (Founder-Centric)</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Number of senior conversations per month</li>
                      <li className="text-justify">Conversion rate of Tier 1 leads</li>
                      <li className="text-justify">Average mandate value</li>
                      <li className="text-justify">Referral rate per completed mandate</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                    <p className="font-semibold">Secondary KPIs</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Time from intro → proposal</li>
                      <li className="text-justify">Proposal → close ratio</li>
                      <li className="text-justify">Warm introductions generated by investors</li>
                      <li className="text-justify">Quality score of prospects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Summary */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Summary Statement
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Founder-led origination is the highest-conversion, highest-ROI, and most reputation-sensitive acquisition model Boyar Partners will run.
                </p>
                <p className="text-justify">
                  It requires professional rigor, structured processes, controlled communication, senior ownership, and zero compromise on discretion. Executed correctly, it becomes the engine that produces anchor clients and marquee mandates for the firm.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For commission-based-representative, show commission playbook
  if (isCommissionModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                COMMISSION-BASED REPRESENTATIVE EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Including commission system, tools, workflows, agreements, and procedures
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Recruiting the Right Representatives
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Recruit only individuals who:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Already serve or advise HNWIs, founders, CFOs, crypto operators, or funds</li>
                  <li className="text-justify">Have warm access to international clients</li>
                  <li className="text-justify">Have professional credibility</li>
                </ul>
                <p className="mt-4"><strong>Recommended recruitment targets:</strong></p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Ex-bankers</li>
                  <li className="text-justify">Corporate service providers</li>
                  <li className="text-justify">Lawyers who don't offer structuring</li>
                  <li className="text-justify">CPAs and accountants</li>
                  <li className="text-justify">Crypto OTC desks</li>
                  <li className="text-justify">FinTech consultants</li>
                  <li className="text-justify">Citizenship/residency agents</li>
                  <li className="text-justify">Investment migration professionals</li>
                </ul>
                <p className="mt-4"><strong>Tools:</strong></p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">LinkedIn Recruiter / Sales Navigator</li>
                  <li className="text-justify">Apollo finders</li>
                  <li className="text-justify">Industry events</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Representative Onboarding Process
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 1 — Introduction Meeting</h3>
                  <p className="text-gray-800 mb-2">Explain:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">What Boyar Partners does</li>
                    <li className="text-justify">Services</li>
                    <li className="text-justify">Compliance boundaries</li>
                    <li className="text-justify">How introductions must occur</li>
                    <li className="text-justify">Commission percentages</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 2 — Formal Agreement</h3>
                  <p className="text-gray-800 mb-2">Contents:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Commission percentages</li>
                    <li className="text-justify">Payment timeline</li>
                    <li className="text-justify">Scope of introduction role</li>
                    <li className="text-justify">Confidentiality</li>
                    <li className="text-justify">Termination rules</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 3 — Training (Mandatory)</h3>
                  <p className="text-gray-800 mb-2">Topics:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdictions we serve</li>
                    <li className="text-justify">Trusts/foundations</li>
                    <li className="text-justify">Licensing frameworks</li>
                    <li className="text-justify">Tokenization models</li>
                    <li className="text-justify">Banking onboarding realities</li>
                    <li className="text-justify">Compliance and risk screening</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 4 — Grant Access to Tools</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Intro scripts</li>
                    <li className="text-justify">Capability statements</li>
                    <li className="text-justify">1-page service sheets</li>
                    <li className="text-justify">Confidential explainer documents</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Representative Operating Workflow
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Identify a prospect</h3>
                  <p className="text-gray-800">Use warm network or event-based opportunities.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Pre-qualify</h3>
                  <p className="text-gray-800 mb-2">Use a simple question set:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">"Are you evaluating structuring or banking options?"</li>
                    <li className="text-justify">"Are you planning expansion or fundraising?"</li>
                    <li className="text-justify">"Do you require licensing or regulatory clarity?"</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Conduct the introduction</h3>
                  <p className="text-gray-800 mb-2">Always a 3-way introduction:</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">Email, WhatsApp or LinkedIn message:</p>
                    <p className="text-gray-800 italic mt-1">"Let me introduce you to Inderjeet from Boyar Partners — they handle this type of work at a very high level."</p>
                  </div>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Step away</h3>
                  <p className="text-gray-800">Representative does not handle detailed conversations.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Founders take over</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Discovery</li>
                    <li className="text-justify">Diagnostics</li>
                    <li className="text-justify">Proposal</li>
                    <li className="text-justify">Engagement</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Close</h3>
                  <p className="text-gray-800">When client pays, commission is logged.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 7 — Commission payment</h3>
                  <p className="text-gray-800">Payments made monthly or quarterly.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Commission Structure (Recommended)
              </h2>
              <p className="text-gray-800 mb-6">Below is a professional, scalable structure:</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Company Formation</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 10–20% of Boyar's fee</p>
                  <p className="text-gray-800"><strong>Reason:</strong> high competition, variable margins</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Full Structure Setup (Trust + LLCs + Banking + Deed)</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 15–25% of the fee</p>
                  <p className="text-gray-800"><strong>Reason:</strong> high-ticket, high-workload, high margin</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Trust / Foundation Setup</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 15–20%</p>
                  <p className="text-gray-800"><strong>Reason:</strong> High credibility requirement = premium payout</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Licensing (VASP / EMI / MSB / Forex / Broker Dealer / Fund License)</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 20–30%</p>
                  <p className="text-gray-800"><strong>Reason:</strong> long-cycle, high fee, specialized</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Fund Formation</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 20–25%</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">F. Banking Introductions / Solutions</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 10–15%</p>
                  <p className="text-gray-800"><strong>Reason:</strong> Volume-based; margin smaller</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">G. Ongoing Corporate Services (Recurring Fees)</h3>
                  <p className="text-gray-800"><strong>First-year commission:</strong> 20%</p>
                  <p className="text-gray-800"><strong>Renewal commission:</strong> 10%</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2 text-black">H. Tokenization + SPV Architecture</h3>
                  <p className="text-gray-800"><strong>Commission:</strong> 20–30%</p>
                  <p className="text-gray-800"><strong>Reason:</strong> High specialization, high value</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Commission Principles</h3>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Higher complexity = higher commission</li>
                  <li className="text-justify">Representative must create opportunity; founders close</li>
                  <li className="text-justify">Commission paid only on paid invoices</li>
                  <li className="text-justify">Clear record-keeping for transparency</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Compliance & Reputation Protocols
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Representatives MUST NOT:</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Provide structuring or legal advice</li>
                    <li className="text-justify">Discuss pricing</li>
                    <li className="text-justify">Make commitments</li>
                    <li className="text-justify">Negotiate</li>
                    <li className="text-justify">Position themselves as Boyar employees</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Representatives MUST:</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Only introduce</li>
                    <li className="text-justify">Only warm the lead</li>
                    <li className="text-justify">Only share approved materials</li>
                    <li className="text-justify">Protect confidentiality</li>
                    <li className="text-justify">Alert Boyar of red flags</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Boyar MUST:</h3>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Keep full control of client onboarding</li>
                  <li className="text-justify">Conduct full KYC and suitability checks</li>
                  <li className="text-justify">Preserve brand integrity</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Tools for Managing the Representative Channel
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Representative tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot CRM / Pipedrive</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Commission tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion + Stripe Dashboard</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Agreement storage</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">DocuSign / Dropbox</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Communication</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">WhatsApp, email, LinkedIn</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Training hub</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion Knowledge Base</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Pipeline visibility</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot custom dashboards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                7. KPIs for Representatives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Quality of introductions</li>
                    <li className="text-justify">Conversion rate of representative's leads</li>
                    <li className="text-justify">Average deal value</li>
                    <li className="text-justify">Time-to-close</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of introductions/month</li>
                    <li className="text-justify">% of introductions that reach proposal stage</li>
                    <li className="text-justify">Diversity of services referred</li>
                    <li className="text-justify">Compliance quality score</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                8. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Representative warms → Founder closes → Boyar delivers → Representative gets paid → Representative sends more deals
                </p>
                <p className="mt-4 text-gray-800 font-semibold">
                  This creates a repeatable, scalable, relationship-driven acquisition engine with no fixed cost burden.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Commission-Based Representative Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For family-office-uhnw, show family office playbook
  if (isFamilyOfficeModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                FULL EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Family Office & UHNW Network Channel
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, discreet, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Required Tools & Infrastructure
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Network intelligence</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Affinity, Folk CRM, HubSpot</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Enrichment</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Clearbit, Apollo</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Relationship logging</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion CRM / HubSpot</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Secure communication</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">WhatsApp, Signal, ProtonMail</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Event tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Excel/Notion UHNW Tracker</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Encrypted Drive, Dropbox Business</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Presentation assets</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma, Canva Pro</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-800"><strong>UHNW engagement requires minimum data collection, maximum trust signals.</strong></p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Network Identification Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    2.1 Build the UHNW Map
                  </h3>
                  <p className="text-gray-800 mb-2">Identify:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Personal connections</li>
                    <li className="text-justify">Investor networks</li>
                    <li className="text-justify">Private banker contacts</li>
                    <li className="text-justify">Advisor relationships</li>
                    <li className="text-justify">Past clients</li>
                    <li className="text-justify">Founder networks</li>
                    <li className="text-justify">Introducer firms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    2.2 Categorize in Three Tiers
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 1:</h4>
                      <p className="text-gray-800">UHNW clients with high mandate value & immediate structuring needs.</p>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 2:</h4>
                      <p className="text-gray-800">Family offices undergoing expansion, succession planning, or regulatory shifts.</p>
                    </div>

                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 3:</h4>
                      <p className="text-gray-800">Warm introductions with long-cycle potential.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Engagement Workflow (End-to-End)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 1 — Warm Access Only</h3>
                  <p className="text-gray-800 mb-2">UHNW segment must be reached through:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Trusted introductions</li>
                    <li className="text-justify">Advisors</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Lawyers</li>
                    <li className="text-justify">Investment directors</li>
                  </ul>
                  <p className="mt-2 text-gray-800 font-semibold">Never cold outreach.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 2 — First Touch (Soft Insight or Brief)</h3>
                  <p className="text-gray-800 mb-2">Founders quietly share:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">A jurisdictional insight</li>
                    <li className="text-justify">A structuring perspective</li>
                    <li className="text-justify">A banking update</li>
                    <li className="text-justify">A trust comparison</li>
                  </ul>
                  <p className="mt-2 text-gray-800"><strong>Tone:</strong> Discreet, authoritative, non-selling.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 3 — Private Founder Conversation</h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Understand asset profile</li>
                    <li className="text-justify">Understand jurisdictional footprint</li>
                    <li className="text-justify">Map the family or corporate structure</li>
                    <li className="text-justify">Identify risks & goals</li>
                    <li className="text-justify">Provide high-level guidance</li>
                    <li className="text-justify">Determine if Boyar Partners is suitable</li>
                  </ul>
                  <p className="mt-2 text-gray-800 mb-2"><strong>Meetings are typically:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">In person</li>
                    <li className="text-justify">On secure calls</li>
                    <li className="text-justify">Via trusted intermediary</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 4 — Advisory Diagnostic</h3>
                  <p className="text-gray-800 mb-2">Founders conduct:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Succession assessment</li>
                    <li className="text-justify">Holding structure mapping</li>
                    <li className="text-justify">Tax/regulatory evaluation</li>
                    <li className="text-justify">Banking footprint analysis</li>
                    <li className="text-justify">Licensing/fund feasibility (if relevant)</li>
                  </ul>
                  <p className="mt-2 text-gray-800"><strong>Deliverable:</strong> Discreet 1–3 page diagnostic note</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 5 — Mandate Engagement</h3>
                  <p className="text-gray-800 mb-2">Proposal includes:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Scope</li>
                    <li className="text-justify">Timeline</li>
                    <li className="text-justify">Compliance</li>
                    <li className="text-justify">Responsibilities</li>
                    <li className="text-justify">Fees</li>
                    <li className="text-justify">Jurisdictional strategy</li>
                  </ul>
                  <p className="mt-2 text-gray-800">UHNW mandates require clarity, not length.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 6 — Enhanced KYC / Compliance</h3>
                  <p className="text-gray-800 mb-2">UHNW-level checks:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">SOF/SOW verification</li>
                    <li className="text-justify">Complex ownership tracing</li>
                    <li className="text-justify">PEP/AML screening</li>
                    <li className="text-justify">Asset provenance indicators</li>
                  </ul>
                  <p className="mt-2 text-gray-800">This stage must be handled with absolute professionalism.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 7 — Mandate Execution & Relationship Management</h3>
                  <p className="text-gray-800 mb-2">Execution areas:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Trust/foundation creation</li>
                    <li className="text-justify">Corporate structuring</li>
                    <li className="text-justify">Fund setup</li>
                    <li className="text-justify">Licensing</li>
                    <li className="text-justify">Banking</li>
                    <li className="text-justify">Asset segregation</li>
                    <li className="text-justify">Succession planning</li>
                  </ul>
                  <p className="mt-2 text-gray-800">Founders maintain direct involvement at all times.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 8 — Relationship Compounding</h3>
                  <p className="text-gray-800 mb-2">After completing a mandate:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Provide quarterly insights</li>
                    <li className="text-justify">Offer relevant jurisdiction updates</li>
                    <li className="text-justify">Support expansion or acquisitions</li>
                    <li className="text-justify">Act as ongoing private advisor</li>
                  </ul>
                  <p className="mt-2 text-gray-800">UHNW relationships deepen with cumulative value, not frequent selling.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Rules (Mandatory)
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 1 — Discretion Above All</h3>
                  <p className="text-gray-800">No public discussions, no casual disclosures.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 2 — Founder-Led Engagement</h3>
                  <p className="text-gray-800">UHNW prospects interact only with Inderjeet or Joel.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 3 — No Speculation or Hypothetical Advice</h3>
                  <p className="text-gray-800">Everything must be grounded in professional understanding.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 4 — Advisor-Led Introductions</h3>
                  <p className="text-gray-800">80% of mandates come via advisors — treat them as core clients.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 5 — Exceptional Response Quality</h3>
                  <p className="text-gray-800 mb-2">UHNW conversations must have:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Depth</li>
                    <li className="text-justify">Precision</li>
                    <li className="text-justify">Calm professionalism</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of UHNW introductions per quarter</li>
                    <li className="text-justify">Conversion rate of advisor referrals</li>
                    <li className="text-justify">Mandate size</li>
                    <li className="text-justify">UHNW relationship retention</li>
                    <li className="text-justify">Cross-service adoption</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Family office engagement frequency</li>
                    <li className="text-justify">Number of warm-touch insights sent</li>
                    <li className="text-justify">High-value events / roundtables attended</li>
                    <li className="text-justify">Introducers activated</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula for UHNW Acquisition
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Authority + Discretion + Founder Presence + Advisor Network + Precision = UHNW Mandates
                </p>
                <p className="text-gray-800 mb-4 italic">
                  This is not marketing. This is private advisory relationship architecture.
                </p>
                <p className="text-gray-800 font-semibold">
                  Executed correctly, this channel becomes Boyar Partners' highest-LTV, highest-stability, most prestigious acquisition engine.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Family Office & UHNW Network Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For private-banker-wealth-manager, show private banker playbook
  if (isPrivateBankerModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                FULL EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Private Banker & Wealth Manager Alliances
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, discreet, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Required Tools & Infrastructure
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Network intelligence</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Affinity, Folk CRM, HubSpot</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Enrichment</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Clearbit, Apollo</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Relationship logging</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion CRM / HubSpot</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Secure communication</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">WhatsApp, Signal, ProtonMail</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Event tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Excel/Notion UHNW Tracker</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Encrypted Drive, Dropbox Business</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Presentation assets</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma, Canva Pro</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-800"><strong>UHNW engagement requires minimum data collection, maximum trust signals.</strong></p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Network Identification Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    2.1 Build the UHNW Map
                  </h3>
                  <p className="text-gray-800 mb-2">Identify:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Personal connections</li>
                    <li className="text-justify">Investor networks</li>
                    <li className="text-justify">Private banker contacts</li>
                    <li className="text-justify">Advisor relationships</li>
                    <li className="text-justify">Past clients</li>
                    <li className="text-justify">Founder networks</li>
                    <li className="text-justify">Introducer firms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    2.2 Categorize in Three Tiers
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 1:</h4>
                      <p className="text-gray-800">UHNW clients with high mandate value & immediate structuring needs.</p>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 2:</h4>
                      <p className="text-gray-800">Family offices undergoing expansion, succession planning, or regulatory shifts.</p>
                    </div>

                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">Tier 3:</h4>
                      <p className="text-gray-800">Warm introductions with long-cycle potential.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Engagement Workflow (End-to-End)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 1 — Warm Access Only</h3>
                  <p className="text-gray-800 mb-2">UHNW segment must be reached through:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Trusted introductions</li>
                    <li className="text-justify">Advisors</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Lawyers</li>
                    <li className="text-justify">Investment directors</li>
                  </ul>
                  <p className="mt-2 text-gray-800 font-semibold">Never cold outreach.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 2 — First Touch (Soft Insight or Brief)</h3>
                  <p className="text-gray-800 mb-2">Founders quietly share:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">A jurisdictional insight</li>
                    <li className="text-justify">A structuring perspective</li>
                    <li className="text-justify">A banking update</li>
                    <li className="text-justify">A trust comparison</li>
                  </ul>
                  <p className="mt-2 text-gray-800"><strong>Tone:</strong> Discreet, authoritative, non-selling.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 3 — Private Founder Conversation</h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Understand asset profile</li>
                    <li className="text-justify">Understand jurisdictional footprint</li>
                    <li className="text-justify">Map the family or corporate structure</li>
                    <li className="text-justify">Identify risks & goals</li>
                    <li className="text-justify">Provide high-level guidance</li>
                    <li className="text-justify">Determine if Boyar Partners is suitable</li>
                  </ul>
                  <p className="mt-2 text-gray-800 mb-2"><strong>Meetings are typically:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">In person</li>
                    <li className="text-justify">On secure calls</li>
                    <li className="text-justify">Via trusted intermediary</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 4 — Advisory Diagnostic</h3>
                  <p className="text-gray-800 mb-2">Founders conduct:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Succession assessment</li>
                    <li className="text-justify">Holding structure mapping</li>
                    <li className="text-justify">Tax/regulatory evaluation</li>
                    <li className="text-justify">Banking footprint analysis</li>
                    <li className="text-justify">Licensing/fund feasibility (if relevant)</li>
                  </ul>
                  <p className="mt-2 text-gray-800"><strong>Deliverable:</strong> Discreet 1–3 page diagnostic note</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 5 — Mandate Engagement</h3>
                  <p className="text-gray-800 mb-2">Proposal includes:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Scope</li>
                    <li className="text-justify">Timeline</li>
                    <li className="text-justify">Compliance</li>
                    <li className="text-justify">Responsibilities</li>
                    <li className="text-justify">Fees</li>
                    <li className="text-justify">Jurisdictional strategy</li>
                  </ul>
                  <p className="mt-2 text-gray-800">UHNW mandates require clarity, not length.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 6 — Enhanced KYC / Compliance</h3>
                  <p className="text-gray-800 mb-2">UHNW-level checks:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">SOF/SOW verification</li>
                    <li className="text-justify">Complex ownership tracing</li>
                    <li className="text-justify">PEP/AML screening</li>
                    <li className="text-justify">Asset provenance indicators</li>
                  </ul>
                  <p className="mt-2 text-gray-800">This stage must be handled with absolute professionalism.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 7 — Mandate Execution & Relationship Management</h3>
                  <p className="text-gray-800 mb-2">Execution areas:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Trust/foundation creation</li>
                    <li className="text-justify">Corporate structuring</li>
                    <li className="text-justify">Fund setup</li>
                    <li className="text-justify">Licensing</li>
                    <li className="text-justify">Banking</li>
                    <li className="text-justify">Asset segregation</li>
                    <li className="text-justify">Succession planning</li>
                  </ul>
                  <p className="mt-2 text-gray-800">Founders maintain direct involvement at all times.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Step 8 — Relationship Compounding</h3>
                  <p className="text-gray-800 mb-2">After completing a mandate:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Provide quarterly insights</li>
                    <li className="text-justify">Offer relevant jurisdiction updates</li>
                    <li className="text-justify">Support expansion or acquisitions</li>
                    <li className="text-justify">Act as ongoing private advisor</li>
                  </ul>
                  <p className="mt-2 text-gray-800">UHNW relationships deepen with cumulative value, not frequent selling.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Rules (Mandatory)
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 1 — Discretion Above All</h3>
                  <p className="text-gray-800">No public discussions, no casual disclosures.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 2 — Founder-Led Engagement</h3>
                  <p className="text-gray-800">UHNW prospects interact only with Inderjeet or Joel.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 3 — No Speculation or Hypothetical Advice</h3>
                  <p className="text-gray-800">Everything must be grounded in professional understanding.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 4 — Advisor-Led Introductions</h3>
                  <p className="text-gray-800">80% of mandates come via advisors — treat them as core clients.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Rule 5 — Exceptional Response Quality</h3>
                  <p className="text-gray-800 mb-2">UHNW conversations must have:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Depth</li>
                    <li className="text-justify">Precision</li>
                    <li className="text-justify">Calm professionalism</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of UHNW introductions per quarter</li>
                    <li className="text-justify">Conversion rate of advisor referrals</li>
                    <li className="text-justify">Mandate size</li>
                    <li className="text-justify">UHNW relationship retention</li>
                    <li className="text-justify">Cross-service adoption</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Family office engagement frequency</li>
                    <li className="text-justify">Number of warm-touch insights sent</li>
                    <li className="text-justify">High-value events / roundtables attended</li>
                    <li className="text-justify">Introducers activated</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula for UHNW Acquisition
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Authority + Discretion + Founder Presence + Advisor Network + Precision = UHNW Mandates
                </p>
                <p className="text-gray-800 mb-4 italic">
                  This is not marketing. This is private advisory relationship architecture.
                </p>
                <p className="text-gray-800 font-semibold">
                  Executed correctly, this channel becomes Boyar Partners' highest-LTV, highest-stability, most prestigious acquisition engine.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Private Banker & Wealth Manager Alliances Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For fund-manager-pipeline, show fund manager playbook
  if (isFundManagerModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                FULL EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Fund Manager Pipeline Programs
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Tools & Infrastructure Required
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Intelligence gathering</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Sales Navigator, Crunchbase, PitchBook Lite</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot / Pipedrive</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Funnel sequencing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">ActiveCampaign / Lemlist (for warm sequences)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive, Notion Hub</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Webinar hosting</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Zoom / Google Meet</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Compliance assessment</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Internal KYC/AML engine</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Admin partnerships</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Pre-approved fund administrators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. The 4-Layer Pipeline Structure
              </h2>
              <div className="space-y-6">
                <p className="text-gray-800">This model is built into four layers:</p>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Layer 1 — Discovery Funnel (Top of Funnel)
                  </h3>
                  <p className="text-gray-800 mb-2 font-semibold">Goal:</p>
                  <p className="text-gray-800 mb-4">Find early-stage or scaling fund managers BEFORE they launch.</p>
                  <p className="text-gray-800 mb-2 font-semibold">Sources:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">LinkedIn fund manager lists</li>
                    <li className="text-justify">Crypto exchanges listing teams</li>
                    <li className="text-justify">Quant communities</li>
                    <li className="text-justify">Telegram/Discord fund groups</li>
                    <li className="text-justify">Lawyers who deal with fund agreements</li>
                    <li className="text-justify">Fund admin referrals</li>
                    <li className="text-justify">Prop shops exploring external capital</li>
                  </ul>
                  <p className="text-gray-800 mb-2 mt-4 font-semibold">Triggers to target:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">"Launching soon" announcements</li>
                    <li className="text-justify">Strategy updates</li>
                    <li className="text-justify">Hiring compliance personnel</li>
                    <li className="text-justify">Partnership with custodians</li>
                    <li className="text-justify">Funds raising capital</li>
                    <li className="text-justify">Trading firms opening Cayman/BVI entities</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Layer 2 — Education & Conversion Funnel
                  </h3>
                  <p className="text-gray-800 mb-2">This is where Boyar outperforms competitors.</p>
                  <p className="text-gray-800 mb-2 font-semibold">You provide:</p>
                  <div className="space-y-3 mt-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-black">A. Masterclass Series (Closed-Door Sessions)</h4>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">"Launching a Cayman/BVI Fund in 2025"</li>
                        <li className="text-justify">"Tokenized Fund Vehicles — Legal & Operational Structure"</li>
                        <li className="text-justify">"Fund Banking & Custody in a Post-CBDC World"</li>
                        <li className="text-justify">"Master-Feeder vs Standalone — Economic & Regulatory Trade-Offs"</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-black">B. Fund Structuring Playbook</h4>
                      <p className="text-gray-800 text-sm">A 7–10 page document explaining:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm mt-1" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Jurisdiction comparisons</li>
                        <li className="text-justify">Structure diagrams</li>
                        <li className="text-justify">Timeline overview</li>
                        <li className="text-justify">Cost framework</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-black">C. One-to-One Diagnostic Calls</h4>
                      <p className="text-gray-800 text-sm">Founders do a short feasibility evaluation.</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-4 font-semibold">This layer captures the fund manager early in their journey.</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Layer 3 — Structuring & Launch Funnel (Conversion Stage)
                  </h3>
                  <p className="text-gray-800 mb-4">Fund managers move into a structured process:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 1 — Jurisdiction selection</strong></p>
                      <p className="text-gray-800 text-sm">(Cayman, BVI, ADGM, DIFC, Luxembourg)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 2 — Entity creation</strong></p>
                      <p className="text-gray-800 text-sm">(GP + Fund entity + Management company)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 3 — Banking and custody</strong></p>
                      <p className="text-gray-800 text-sm">(Onboard banks, custodians, brokers)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 4 — Licensing</strong></p>
                      <p className="text-gray-800 text-sm">(If required — VASP, EMI, MSB, asset management license)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 5 — Fund admin alignment</strong></p>
                      <p className="text-gray-800 text-sm">NAV reporting, AML, investor onboarding.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 6 — Offering documents</strong></p>
                      <p className="text-gray-800 text-sm">Handled through partner law firms.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800"><strong>Step 7 — Launch</strong></p>
                      <p className="text-gray-800 text-sm">Investor-ready rollout.</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-4 font-semibold">This is high-ticket work, and Boyar remains central.</p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Layer 4 — Recurring Advisory Funnel
                  </h3>
                  <p className="text-gray-800 mb-2">Once the fund launches, additional opportunities emerge:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Additional SPVs</li>
                    <li className="text-justify">Feeder structures</li>
                    <li className="text-justify">New strategies and fund vehicles</li>
                    <li className="text-justify">Regulatory updates</li>
                    <li className="text-justify">Governance</li>
                    <li className="text-justify">Compliance</li>
                    <li className="text-justify">New banking relationships</li>
                    <li className="text-justify">Quarterly structuring reviews</li>
                  </ul>
                  <p className="text-gray-800 mt-4 font-semibold">This creates long-term revenue.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Outreach Playbook (Founder-Led + Precision AI-Driven)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Identification (AI-enhanced)</h3>
                  <p className="text-gray-800 mb-2">Use Clay, Apollo, Sales Navigator to identify:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">New fund launches</li>
                    <li className="text-justify">Teams raising capital</li>
                    <li className="text-justify">Prop firms hiring compliance officers</li>
                    <li className="text-justify">Crypto funds scaling</li>
                    <li className="text-justify">GPs posting about expansion</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Founder-Level LinkedIn Intro</h3>
                  <p className="text-gray-800 mb-2">Professional, concise, advisory tone:</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-800 italic">
                      "Many emerging managers at your stage evaluate Cayman/BVI vs ADGM/DIFC.
                      We help them map the regulatory, banking, and administrative impact before launch.
                      If helpful, I can outline a structure that aligns with your strategy."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-2">This always results in high-quality engagement.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Diagnostic Call</h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Strategy & investment profile</li>
                    <li className="text-justify">Geography & investor base</li>
                    <li className="text-justify">Jurisdiction restrictions</li>
                    <li className="text-justify">Regulatory preference</li>
                    <li className="text-justify">Banking feasibility</li>
                    <li className="text-justify">Timeline</li>
                    <li className="text-justify">Fund economics</li>
                  </ul>
                  <p className="text-gray-800 mt-2"><strong>Deliverable:</strong> 1-page diagnostic summary.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Proposal</h3>
                  <p className="text-gray-800 mb-2">Sent only when high-intent is confirmed.</p>
                  <p className="text-gray-800 mb-2"><strong>Components:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Scope</li>
                    <li className="text-justify">Timeline</li>
                    <li className="text-justify">Deliverables</li>
                    <li className="text-justify">Compliance notes</li>
                    <li className="text-justify">Jurisdiction recommendation</li>
                    <li className="text-justify">Fee structure</li>
                    <li className="text-justify">Admin partnership details</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Close & Onboard</h3>
                  <p className="text-gray-800">Deal moves into structuring phase.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Protocols
              </h2>
              <p className="text-gray-800 mb-4">Non-negotiable rules:</p>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 1:</strong> Only founders handle fund manager communication.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 2:</strong> No fund-specific investment advice or legal opinions. Legal work → partner law firms.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 3:</strong> All KYC must meet elevated standards.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 4:</strong> Bank communication must follow strict protocols.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 5:</strong> Never overstate speed; always present realistic timelines.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of fund managers entering diagnostic stage</li>
                    <li className="text-justify">Diagnostic → Proposal conversion rate</li>
                    <li className="text-justify">Closed mandates</li>
                    <li className="text-justify">Average mandate value</li>
                    <li className="text-justify">Recurring annual revenue from fund clients</li>
                    <li className="text-justify">Referrals from fund admins & law firms</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Attendance in fund webinars</li>
                    <li className="text-justify">Downloads of fund structuring playbooks</li>
                    <li className="text-justify">Number of high-intent ICP interactions</li>
                    <li className="text-justify">Repeat fund formations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Find emerging managers → Educate → Diagnose → Structure → Launch → Administer → Expand.
                </p>
                <p className="text-gray-800 font-semibold">
                  When executed correctly, this becomes a multi-year, multi-service revenue engine.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Fund Manager Pipeline Programs Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For cross-border-ma-feeder, show cross-border M&A playbook
  if (isCrossBorderMAModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Cross-Border M&A Feeder Channel
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Alliance Development Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    A. Identify High-Value M&A Partners
                  </h3>
                  <p className="text-gray-800 mb-2">Targets include:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Mid-market investment banks</li>
                    <li className="text-justify">M&A law firms</li>
                    <li className="text-justify">Boutique deal advisors</li>
                    <li className="text-justify">Regional corporate finance firms</li>
                    <li className="text-justify">PE/VC funds with frequent buy-side activity</li>
                    <li className="text-justify">Cross-border transaction lawyers</li>
                    <li className="text-justify">Turnaround professionals</li>
                    <li className="text-justify">Big-4/Top-10 accounting firms' transaction services divisions</li>
                  </ul>
                  <p className="text-gray-800 mb-2 mt-4 font-semibold">Tools:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">LinkedIn Sales Navigator</li>
                    <li className="text-justify">PitchBook / Crunchbase</li>
                    <li className="text-justify">M&A databases (MergerLinks, Mergermarket)</li>
                    <li className="text-justify">Deal announcements tracking</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    B. Initial Outreach (Founder-Led)
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Tone:</strong> analytical, technical, discreet.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 font-semibold mb-2">Sample:</p>
                    <p className="text-gray-800 italic">
                      "We support several M&A teams with offshore structuring, SPVs, banking and regulatory alignment during cross-border transactions. If useful, I can share a short framework on how we streamline pre- and post-acquisition structures."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-3">This opens immediate dialogue.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    C. Introductory Technical Briefing
                  </h3>
                  <p className="text-gray-800 mb-2">Host a 20-minute private briefing for each M&A team:</p>
                  <p className="text-gray-800 mb-2 font-semibold">Topics:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">SPV structure models</li>
                    <li className="text-justify">Tax-neutral frameworks</li>
                    <li className="text-justify">Banking pitfalls in M&A</li>
                    <li className="text-justify">Substance and residency rules</li>
                    <li className="text-justify">Jurisdictional risks in acquisitions</li>
                    <li className="text-justify">Regulated entity acquisitions</li>
                  </ul>
                  <p className="text-gray-800 mt-3 font-semibold">Outcome: credibility established → they begin sending cases.</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. M&A Transaction Workflow (How Boyar Fits Into Deals)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Deal Intake via Advisor</h3>
                  <p className="text-gray-800 mb-2">Advisor sends:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Target company profile</li>
                    <li className="text-justify">Buyer profile</li>
                    <li className="text-justify">Jurisdictions involved</li>
                    <li className="text-justify">Preliminary timeline</li>
                    <li className="text-justify">Deal rationale</li>
                    <li className="text-justify">Required structuring (if known)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Rapid Feasibility Review (24 hrs)</h3>
                  <p className="text-gray-800 mb-2">Founders conduct:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdiction review</li>
                    <li className="text-justify">Ownership mapping</li>
                    <li className="text-justify">Regulatory red flags</li>
                    <li className="text-justify">Licensing implications</li>
                    <li className="text-justify">Tax-neutrality considerations</li>
                    <li className="text-justify">Banking risk mapping</li>
                  </ul>
                  <p className="text-gray-800 mt-2"><strong>Deliverable:</strong> Feasibility Summary (2–3 paragraphs)</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Structuring Roadmap for the Deal</h3>
                  <p className="text-gray-800 mb-2">A short advisory note covering:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Proposed structure</li>
                    <li className="text-justify">Entities needed</li>
                    <li className="text-justify">SPV/holding models</li>
                    <li className="text-justify">Shareholder flow</li>
                    <li className="text-justify">Bankability criteria</li>
                    <li className="text-justify">Licensing and compliance notes</li>
                  </ul>
                  <p className="text-gray-800 mt-2">This becomes the transaction's anchoring document.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Mandate & Execution</h3>
                  <p className="text-gray-800 mb-2">Boyar handles:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Incorporation of entities</li>
                    <li className="text-justify">SPV and holding setups</li>
                    <li className="text-justify">Director/nominee arrangements (if required)</li>
                    <li className="text-justify">Banking</li>
                    <li className="text-justify">Compliance documentation</li>
                    <li className="text-justify">Licensing impact plan</li>
                    <li className="text-justify">Support during due diligence</li>
                    <li className="text-justify">Post-deal restructuring</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Ongoing Advisory</h3>
                  <p className="text-gray-800 mb-2">After deal completion:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Additional SPVs</li>
                    <li className="text-justify">Profit extraction tools</li>
                    <li className="text-justify">Possible licensing needs</li>
                    <li className="text-justify">Newco maintenance</li>
                    <li className="text-justify">Corporate secretarial</li>
                    <li className="text-justify">Fund vehicle setup for buyers</li>
                  </ul>
                  <p className="text-gray-800 mt-2 font-semibold">This creates multi-year revenue.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Tools Required
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Deal tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot/Pipedrive, Notion Deal Desk</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">M&A intelligence</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">PitchBook, MergerLinks, Mergermarket</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document exchange</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Virtual data rooms, Dropbox Business</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Compliance</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Dow Jones Risk, Refinitiv WorldCheck</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Collaboration</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">WhatsApp, Signal, email</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Briefing creation</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma, Canva, Notion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Rules (Mandatory)
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 1 — Founders Lead All M&A Engagements</strong></p>
                  <p className="text-gray-800 mt-1">These are high-stakes, technical transactions.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 2 — Clarity on Jurisdictional Advice</strong></p>
                  <p className="text-gray-800 mt-1">Boyar provides structuring expertise; legal opinions come from lawyers.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 3 — Strict Timelines</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 mt-1" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Feasibility → 24 hours</li>
                    <li className="text-justify">Structure → 48–72 hours</li>
                    <li className="text-justify">Bankability → as soon as possible</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 4 — No Commercial Sensitivity Leakage</strong></p>
                  <p className="text-gray-800 mt-1">Use encrypted data rooms.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 5 — Compliance Boundaries</strong></p>
                  <p className="text-gray-800 mt-1">No KYC shortcuts due to deal urgency.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">M&A firms onboarded as partners</li>
                    <li className="text-justify">Deals referred per advisor</li>
                    <li className="text-justify">Diagnostic → proposal conversion</li>
                    <li className="text-justify">Proposal → mandate conversion</li>
                    <li className="text-justify">Fee value per deal</li>
                    <li className="text-justify">Repeat referrals</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Virtual briefing attendance</li>
                    <li className="text-justify">Response time metrics</li>
                    <li className="text-justify">Jurisdiction briefing downloads</li>
                    <li className="text-justify">Number of SPVs created per deal</li>
                    <li className="text-justify">Banking success rate</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  M&A advisors encounter structuring problems →
                  Boyar provides rapid clarity →
                  Advisors refer clients →
                  Boyar completes structuring →
                  Advisor sends next deal.
                </p>
                <p className="text-gray-800 font-semibold">
                  This becomes a predictable, high-value feeder ecosystem.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Cross-Border M&A Feeder Channel Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For investor-club-syndicate, show investor club playbook
  if (isInvestorClubModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                FULL EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Investor Club & Syndicate Partnership Channel
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Tools & Infrastructure Required
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Syndicate identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, AngelList, Crunchbase, Telegram/Discord groups</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Pipeline management</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion CRM</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Masterclass hosting</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Zoom, Google Meet</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Presentation design</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Canva Pro, Figma</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Distribution hub</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive, Notion Resource Library</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Community integration</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Telegram, Slack channels</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Compliance</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Internal AML/KYC engine</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-800"><strong>This channel benefits heavily from community-based presence.</strong></p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Alliance Development Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 1 — Identify High-Value Syndicates
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">A. Tech/Startup Syndicates</h4>
                      <p className="text-gray-800 mb-2">Especially those active in:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">FinTech</li>
                        <li className="text-justify">Crypto/Web3</li>
                        <li className="text-justify">SaaS</li>
                        <li className="text-justify">HealthTech</li>
                        <li className="text-justify">AI/ML</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">B. Crypto Investment Groups</h4>
                      <p className="text-gray-800">DAOs and token investment networks.</p>
                    </div>

                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">C. Regional Angel Groups</h4>
                      <p className="text-gray-800">India, UAE, Singapore, UK, Estonia, Hong Kong.</p>
                    </div>

                    <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">D. Vertical-Specific Syndicates</h4>
                      <p className="text-gray-800">Real estate, energy, biotech, gaming.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 2 — Founder-Led Outreach to Syndicate Leads
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Tone:</strong> strategic, cooperative, non-sales.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 font-semibold mb-2">Example:</p>
                    <p className="text-gray-800 italic">
                      "We work with several investor groups supporting their portfolio companies on structuring, banking and regulatory readiness. If useful, I can share a short framework we use to de-risk cross-border launches and funding."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-3">This positions Boyar as a value add, not a vendor.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 3 — Offer a Private "Investor Readiness Briefing"
                  </h3>
                  <p className="text-gray-800 mb-2">Short, high-quality topics like:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Cayman/BVI SPV structures for syndicated deals</li>
                    <li className="text-justify">Tokenized equity frameworks</li>
                    <li className="text-justify">Banking pathways for VC-backed entities</li>
                    <li className="text-justify">Licensing triggers for portfolio companies</li>
                  </ul>
                  <p className="text-gray-800 mt-3 font-semibold"><strong>Goal:</strong></p>
                  <p className="text-gray-800">Demonstrate competence → begin regular introductions.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Syndicate → Boyar Dealflow Workflow
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Syndicate Receives a Deal</h3>
                  <p className="text-gray-800 mb-2">Lead, founder, or target company signals:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Fundraising</li>
                    <li className="text-justify">International expansion</li>
                    <li className="text-justify">Token issuance</li>
                    <li className="text-justify">Need for SPV</li>
                    <li className="text-justify">Banking requirements</li>
                    <li className="text-justify">Cross-border complexity</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Syndicate lead flags Boyar.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Boyar Feasibility Check (free, 24–48 hours)</h3>
                  <p className="text-gray-800 mb-2">Evaluate:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdictions involved</li>
                    <li className="text-justify">Founder structure</li>
                    <li className="text-justify">Red flags</li>
                    <li className="text-justify">Banking pathways</li>
                    <li className="text-justify">Complexity level</li>
                    <li className="text-justify">Licensing triggers</li>
                  </ul>
                  <p className="text-gray-800 mt-2"><strong>Deliverable:</strong> Short Feasibility Assessment (1–2 paragraphs)</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Founder Diagnostic Call</h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Roadmap</li>
                    <li className="text-justify">Jurisdiction selection</li>
                    <li className="text-justify">Timing</li>
                    <li className="text-justify">Costs</li>
                    <li className="text-justify">Banking viability</li>
                    <li className="text-justify">SPV/holding options</li>
                    <li className="text-justify">Licensing needs (if any)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Proposal</h3>
                  <p className="text-gray-800">Sent only when fit is confirmed.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Engagement & Execution</h3>
                  <p className="text-gray-800 mb-2">Boyar handles:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Entity formation</li>
                    <li className="text-justify">SPVs</li>
                    <li className="text-justify">Cross-border structuring</li>
                    <li className="text-justify">Banking</li>
                    <li className="text-justify">Token frameworks</li>
                    <li className="text-justify">Licensing</li>
                    <li className="text-justify">Compliance onboarding</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Portfolio Integration</h3>
                  <p className="text-gray-800 mb-2">Boyar becomes the default advisor for:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Follow-on funding</li>
                    <li className="text-justify">Additional SPVs</li>
                    <li className="text-justify">International expansion</li>
                    <li className="text-justify">Licensing changes</li>
                    <li className="text-justify">Token issuance</li>
                    <li className="text-justify">Buyout/M&A structuring</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Rules
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 1 — Syndicate Leads Are Not Salespeople</strong></p>
                  <p className="text-gray-800 mt-1">They only introduce; Boyar handles advisory.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 2 — Advisors Must Receive Clear, Fast Responses</strong></p>
                  <p className="text-gray-800 mt-1">Typical SLA: 24–48 hours for feasibility.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 3 — Privacy & Compliance Are Strict</strong></p>
                  <p className="text-gray-800 mt-1">Founders may be early-stage; confidentiality is essential.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 4 — No Free Consulting</strong></p>
                  <p className="text-gray-800 mt-1">Feasibility only; all structuring work is paid.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 5 — Founder-Led Communication</strong></p>
                  <p className="text-gray-800 mt-1">Inderjeet or Joel handle all high-level discussions.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Syndicates onboarded as partners</li>
                    <li className="text-justify">Monthly introductions from syndicate leads</li>
                    <li className="text-justify">Diagnostic call volume</li>
                    <li className="text-justify">Conversion rate from syndicate referrals</li>
                    <li className="text-justify">Revenue per portfolio company</li>
                    <li className="text-justify">Cross-service adoption per founder</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Masterclass attendance</li>
                    <li className="text-justify">Playbook downloads</li>
                    <li className="text-justify">Syndicate repeat engagement</li>
                    <li className="text-justify">Portfolio expansion opportunities</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Investor syndicate → sees complexity → calls Boyar → Boyar solves → portfolio adopts → repeat with every new deal.
                </p>
                <p className="text-gray-800 font-semibold">
                  This becomes a flywheel of high-quality, early-stage, founder-led opportunities.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Investor Club & Syndicate Partnership Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For crypto-exchange-otc, show crypto exchange playbook
  if (isCryptoExchangeModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Crypto Exchange & OTC Desk Partnerships
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Tools & Infrastructure Required
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Sales Navigator, Twitter Crypto Lists, Telegram channels</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Client pipeline</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion CRM</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Outreach</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, WhatsApp Business</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Compliance screening</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Chainalysis KYT, TRM Labs (if needed)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive (restricted folders)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Presentation assets</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Canva Pro, Figma</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Community insertion</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Telegram/Discord channels</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Analytics</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion dashboards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-800"><strong>This model is highly operational — tools must be clean and efficient.</strong></p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Partnership Development Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 1 — Identify Potential Exchange/Desk Partners
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">A. OTC desks (highest ROI)</h4>
                      <p className="text-gray-800">Dubai, Singapore, London, Hong Kong, EU.</p>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">B. Tier 2 exchanges</h4>
                      <p className="text-gray-800">Regional platforms with weaker compliance systems and high need for structuring.</p>
                    </div>

                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">C. Custodians and institutional desks</h4>
                      <p className="text-gray-800">Fireblocks partners, BitGo partners, Copper.io controllers.</p>
                    </div>

                    <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">D. Launchpads / incubators</h4>
                      <p className="text-gray-800">They support token teams that need structuring and licensing.</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-4 font-semibold"><strong>High priority:</strong> OTC desks → fastest conversion → shortest cycles.</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 2 — Founder-Led Intro Outreach
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Message tone:</strong> technical, compliance-aware, businesslike.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 font-semibold mb-2">Example:</p>
                    <p className="text-gray-800 italic">
                      "We support several desks and exchanges by structuring trading entities, token SPVs, foundations and securing bank-ready setups for clients with onboarding challenges. If useful, I can share the models we use to remove compliance friction."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-3">Exchanges respond highly to problem-solving positioning.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 3 — Private Technical Briefing for Exchange Teams
                  </h3>
                  <p className="text-gray-800 mb-2">A 20–30 minute session covering:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Which structures reduce compliance friction</li>
                    <li className="text-justify">Jurisdiction selection logic for crypto teams</li>
                    <li className="text-justify">Token issuance frameworks (foundation vs corporate)</li>
                    <li className="text-justify">Banking feasibility roadmap</li>
                    <li className="text-justify">VASP licensing matrix</li>
                    <li className="text-justify">SPV models for investors</li>
                  </ul>
                  <p className="text-gray-800 mt-3">This builds authority and immediate trust.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Exchange → Boyar Dealflow Workflow
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Exchange Faces a Client Blocker</h3>
                  <p className="text-gray-800 mb-2">Typical problems:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">"Client has no clean corporate structure."</li>
                    <li className="text-justify">"Banking rejected them."</li>
                    <li className="text-justify">"Compliance flagged their entity."</li>
                    <li className="text-justify">"They need an SPV for token issuance."</li>
                    <li className="text-justify">"They require VASP licensing."</li>
                    <li className="text-justify">"They need offshore expansion."</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Exchange team contacts Boyar.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Feasibility Check (24–48 hours)</h3>
                  <p className="text-gray-800 mb-2">Boyar reviews:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdictions involved</li>
                    <li className="text-justify">Red flags</li>
                    <li className="text-justify">Banking pathways</li>
                    <li className="text-justify">Licensing implications</li>
                    <li className="text-justify">Operational complexity</li>
                  </ul>
                  <p className="text-gray-800 mt-2"><strong>Deliverable:</strong> Short Feasibility Summary confirming viability and next steps.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Founder Diagnostic Call with Client</h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Trading/investment model</li>
                    <li className="text-justify">Jurisdiction footprint</li>
                    <li className="text-justify">Token activity</li>
                    <li className="text-justify">Fundraising timeline</li>
                    <li className="text-justify">Banking needs</li>
                    <li className="text-justify">Risk profile</li>
                    <li className="text-justify">Roadmap</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Proposal (Scope + Timeline + Fees)</h3>
                  <p className="text-gray-800">Presented clearly and professionally.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Execute Structure</h3>
                  <p className="text-gray-800 mb-2">Executed services may include:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Seychelles/BVI/Cayman entity</li>
                    <li className="text-justify">Foundation for token issuance</li>
                    <li className="text-justify">Trading SPV</li>
                    <li className="text-justify">Holding company</li>
                    <li className="text-justify">Master-feeder fund</li>
                    <li className="text-justify">VASP licensing</li>
                    <li className="text-justify">Compliance documentation</li>
                    <li className="text-justify">Banking onboarding</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Post-Mandate Relationship with Exchange</h3>
                  <p className="text-gray-800 mb-2">Boyar provides:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Quarterly regulatory updates</li>
                    <li className="text-justify">Banking intelligence reports</li>
                    <li className="text-justify">Token framework updates</li>
                    <li className="text-justify">Licensing matrix updates</li>
                  </ul>
                  <p className="text-gray-800 mt-2 font-semibold">Exchange becomes a long-term feeder.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Protocols
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 1 — Do Not Provide Opinions on Token Legality</strong></p>
                  <p className="text-gray-800 mt-1">Legal analysis is outsourced to partner law firms.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 2 — No engagement without minimal AML/SOF checks</strong></p>
                  <p className="text-gray-800 mt-1">Crypto clients must pass baseline screening.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 3 — Maintain premium advisory tone</strong></p>
                  <p className="text-gray-800 mt-1">Crypto markets are noisy; Boyar stays authoritative.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 4 — Fast feasibility responses</strong></p>
                  <p className="text-gray-800 mt-1">Exchanges expect 24–48 hour clarity.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 5 — Founder-Led Conversation Standard</strong></p>
                  <p className="text-gray-800 mt-1">Crypto whales, founders, and VC-backed teams require senior attention.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of exchange/OTC partners onboarded</li>
                    <li className="text-justify">Client referrals per partner</li>
                    <li className="text-justify">Conversion rate of referred clients</li>
                    <li className="text-justify">Average mandate value per crypto referral</li>
                    <li className="text-justify">Licensing/SPV uptake</li>
                    <li className="text-justify">Banking success rate</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Attendance in technical briefings</li>
                    <li className="text-justify">Downloads of token/SPV playbooks</li>
                    <li className="text-justify">Exchange repeat engagement</li>
                    <li className="text-justify">Segmentation of client types by value</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Crypto platform faces client compliance/structuring challenges →
                  Platform refers client →
                  Boyar solves →
                  Client becomes multi-service user →
                  Exchange trusts more →
                  Volume increases.
                </p>
                <p className="text-gray-800 font-semibold">
                  This becomes a continuous, recurring, compounding pipeline.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Crypto Exchange & OTC Desk Partnerships Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For incubator-accelerator, show incubator playbook
  if (isIncubatorModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Incubator & Accelerator Dealflow Access
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Tools & Infrastructure Needed
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Program identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, AngelList, Crunchbase</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot / Notion</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Presentation & Playbooks</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Canva Pro, Figma</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Cohort briefings</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Zoom, Google Meet</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Community integration</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Slack / Discord, WhatsApp</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document storage</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive structured folders</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Intake forms</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Typeform, Google Forms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Partnership Development Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 1 — Identify High-Value Incubators & Accelerators
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">A. Web3/Token Incubators</h4>
                      <p className="text-gray-800 mb-2">Strong need for:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Cayman foundation</li>
                        <li className="text-justify">Token SPVs</li>
                        <li className="text-justify">VASP licensing</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">B. FinTech Accelerators</h4>
                      <p className="text-gray-800 mb-2">Need:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">EMI/MSB licensing</li>
                        <li className="text-justify">Banking alignment</li>
                        <li className="text-justify">Multi-country structuring</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">C. AI/Tech Incubators</h4>
                      <p className="text-gray-800 mb-2">Need:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Global holding structures</li>
                        <li className="text-justify">Cross-border tax/regulatory clarity</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                      <h4 className="text-lg font-semibold mb-2 text-black">D. Regional Startup Accelerators</h4>
                      <p className="text-gray-800">Consistent batch sizes = predictable dealflow.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 2 — Founder-Led Outreach to Program Directors
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Tone:</strong> advisory, supportive, no sales.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 font-semibold mb-2">Example:</p>
                    <p className="text-gray-800 italic">
                      "We support several accelerators by helping their startups structure globally, navigate compliance, and secure bankable setups. If useful, I can deliver a short masterclass + diagnostic sessions for your upcoming cohort."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-3">Accelerators value expertise → they are quick to respond.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 3 — Agreement With the Accelerator (Lightweight)
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-2">Boyar offers:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">1–2 technical sessions</li>
                        <li className="text-justify">Office hours</li>
                        <li className="text-justify">Access to a structuring playbook</li>
                        <li className="text-justify">Discounted rates (optional) for early-stage founders</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-2">Accelerator offers:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Access to cohort</li>
                        <li className="text-justify">Promotion in their internal channels</li>
                        <li className="text-justify">Introductions to mentors & investors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Cohort Engagement Workflow
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Masterclass Delivery (High Impact)</h3>
                  <p className="text-gray-800 mb-2">Topics vary by cohort:</p>
                  <div className="space-y-3 mt-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">General Startup Cohorts</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Global structuring</li>
                        <li className="text-justify">Banking for cross-border operations</li>
                        <li className="text-justify">Investor-ready SPVs (Cayman, Delaware, Singapore)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Crypto/Web3 Cohorts</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Token issuance frameworks</li>
                        <li className="text-justify">Foundation vs corporate setups</li>
                        <li className="text-justify">Legal/regulatory implications</li>
                        <li className="text-justify">VASP licensing</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">FinTech Cohorts</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">EMI/MSB pathways</li>
                        <li className="text-justify">Compliance mapping</li>
                        <li className="text-justify">Banking alignment</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-3">Each session positions Boyar as trusted specialist.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Founder Office Hours (High-Conversion Zone)</h3>
                  <p className="text-gray-800 mb-2">A 10–20 minute diagnostic call answering:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">What structure they need</li>
                    <li className="text-justify">Jurisdiction selection</li>
                    <li className="text-justify">Banking feasibility</li>
                    <li className="text-justify">Licensing implications</li>
                    <li className="text-justify">Next steps</li>
                  </ul>
                  <p className="text-gray-800 mt-2 font-semibold">This is where 80% of conversions happen.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Post-Diagnostic Proposal</h3>
                  <p className="text-gray-800 mb-2">Sent only to serious founders.</p>
                  <p className="text-gray-800 mb-2"><strong>Scope examples:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Cayman/BVI holding setup</li>
                    <li className="text-justify">Token SPV + Foundation</li>
                    <li className="text-justify">Licensing advisory</li>
                    <li className="text-justify">Banking assistance</li>
                    <li className="text-justify">Ongoing corporate compliance</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Structuring Execution</h3>
                  <p className="text-gray-800 mb-2">Deliverables include:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Incorporation</li>
                    <li className="text-justify">SPVs</li>
                    <li className="text-justify">Banking docs</li>
                    <li className="text-justify">Compliance binders</li>
                    <li className="text-justify">Licensing applications</li>
                    <li className="text-justify">Token structuring packages</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Long-Term Relationship Loop</h3>
                  <p className="text-gray-800 mb-2">After initial setup:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Next fundraising → SPV</li>
                    <li className="text-justify">Global expansion → new entities</li>
                    <li className="text-justify">Token sale → additional legal & compliance needs</li>
                    <li className="text-justify">Investor onboarding → AML/KYC assistance</li>
                    <li className="text-justify">Exit/M&A → restructuring guidance</li>
                  </ul>
                  <p className="text-gray-800 mt-2 font-semibold">This evolves into multi-service lifetime clients.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Governance Rules (Non-Negotiable)
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 1 — Free value, paid execution</strong></p>
                  <p className="text-gray-800 mt-1">Diagnostics free; structuring is charged.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 2 — No conflicting advice</strong></p>
                  <p className="text-gray-800 mt-1">Legal opinions always done by partner law firms.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 3 — Startup compliance screening</strong></p>
                  <p className="text-gray-800 mt-1">Reject founders with unclear SOF/SOF.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 4 — Founders must lead high-level calls</strong></p>
                  <p className="text-gray-800 mt-1">Junior staff cannot represent Boyar in initial conversations.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 5 — Controlled group messaging</strong></p>
                  <p className="text-gray-800 mt-1">Do not overshare in Slack/Discord groups — maintain premium positioning.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Number of accelerator partnerships</li>
                    <li className="text-justify">Cohort masterclasses delivered</li>
                    <li className="text-justify">Office hours participation</li>
                    <li className="text-justify">Diagnostics → Proposal conversion</li>
                    <li className="text-justify">Proposal → Mandate conversion</li>
                    <li className="text-justify">Average mandate value per cohort</li>
                    <li className="text-justify">Cross-service adoption within 6 months</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Playbook downloads</li>
                    <li className="text-justify">Slack/Discord engagement</li>
                    <li className="text-justify">Investor referrals through cohort</li>
                    <li className="text-justify">Follow-on structures per startup</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Accelerator → Cohort → Masterclass → Office Hours → Structuring → Licensing → Banking → Global Expansion → Multi-year relationship.
                </p>
                <p className="text-gray-800 font-semibold">
                  This channel compounds yearly and becomes a perpetual deal engine.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Incubator & Accelerator Dealflow Access Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For law-firm-co-branded, show law firm playbook
  if (isLawFirmModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Law Firm Strategic Co-Branded Funnels
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Required Tools & Infrastructure
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner mapping</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Apollo, Chambers directory</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Co-branded content</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma, Canva Pro, Notion</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Webinars</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Zoom Webinar, Google Meet</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive (shared partner folders)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot / Notion CRM</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Collaboration</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Slack Connect, WhatsApp, email</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Analytics</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot dashboards, Notion tracking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Partner Development Framework
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 1 — Identify Ideal Law Firm Partners
                  </h3>
                  <p className="text-gray-800 mb-2">Select firms that:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Handle cross-border clients</li>
                    <li className="text-justify">Work with HNWIs</li>
                    <li className="text-justify">Advise on M&A, startup fundraising, tokens, funds</li>
                    <li className="text-justify">Lack internal structuring/banking teams</li>
                    <li className="text-justify">Are respected boutique firms with strong client trust</li>
                  </ul>
                  <p className="text-gray-800 mt-3 font-semibold">These are high-conversion partners.</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 2 — Founder-Led Outreach
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Tone:</strong> precise, technical, partnership-focused.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 font-semibold mb-2">Example:</p>
                    <p className="text-gray-800 italic">
                      "We support several law firms by providing their clients with offshore structuring, banking advisory and regulatory pathways. If useful, we can explore a co-branded knowledge framework or referral model that strengthens your service offering."
                    </p>
                  </div>
                  <p className="text-gray-800 mt-3">Lawyers respond well to authority + clarity.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Step 3 — Introductory Strategy Meeting
                  </h3>
                  <p className="text-gray-800 mb-2"><strong>Agenda:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Their practice area</li>
                    <li className="text-justify">Client segments</li>
                    <li className="text-justify">Complexity they encounter</li>
                    <li className="text-justify">Jurisdictions involved</li>
                    <li className="text-justify">Typical transaction issues</li>
                    <li className="text-justify">Where structuring is needed</li>
                  </ul>
                  <p className="text-gray-800 mt-3">After this, propose the Co-Branded Funnel Architecture.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Co-Branded Funnel Architecture (Core of the Model)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Co-Branded Whitepapers</h3>
                  <p className="text-gray-800 mb-2"><strong>Topics:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Offshore Structuring for Tech & FinTech</li>
                    <li className="text-justify">Token Issuance Frameworks</li>
                    <li className="text-justify">Trusts/Foundations for HNWI Clients</li>
                    <li className="text-justify">Cross-Border M&A Structuring</li>
                    <li className="text-justify">Global Expansion Roadmaps</li>
                  </ul>
                  <p className="text-gray-800 mt-2"><strong>Purpose:</strong></p>
                  <p className="text-gray-800">Use the law firm's brand + Boyar's structuring power to attract clients.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Joint Webinars / Closed-Door Briefings</h3>
                  <p className="text-gray-800 mb-2">These events are distributed to:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Law firm clients</li>
                    <li className="text-justify">Boyar's network</li>
                    <li className="text-justify">Referral partners</li>
                    <li className="text-justify">Family offices</li>
                    <li className="text-justify">Fund managers</li>
                  </ul>
                  <p className="text-gray-800 mb-2 mt-3"><strong>Topics:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdiction comparisons</li>
                    <li className="text-justify">Banking strategies</li>
                    <li className="text-justify">Licensing pathways</li>
                    <li className="text-justify">Crypto/VASP structuring</li>
                  </ul>
                  <p className="text-gray-800 mt-2">High conversion because attendance = high intent.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Co-Branded Landing Pages / Funnels</h3>
                  <p className="text-gray-800 mb-2">A shared webpage:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Co-branded</li>
                    <li className="text-justify">Hosts whitepapers</li>
                    <li className="text-justify">Includes webinar recordings</li>
                    <li className="text-justify">Has a diagnostic intake form</li>
                    <li className="text-justify">Routes warm leads to Boyar</li>
                  </ul>
                  <p className="text-gray-800 mt-2 font-semibold">This becomes a 24/7 acquisition engine.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Structured Referral System</h3>
                  <div className="space-y-3 mt-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Law firm → Boyar Partners when clients need:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Structuring</li>
                        <li className="text-justify">SPVs</li>
                        <li className="text-justify">Trusts</li>
                        <li className="text-justify">Licensing</li>
                        <li className="text-justify">Token frameworks</li>
                        <li className="text-justify">Banking setup</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Boyar → law firm when clients need:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Legal opinions</li>
                        <li className="text-justify">Contracts</li>
                        <li className="text-justify">M&A documentation</li>
                        <li className="text-justify">Regulatory interpretation</li>
                        <li className="text-justify">Token legal frameworks</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-3">Mutual value exchange.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Co-Branded Diagnostic Tools</h3>
                  <p className="text-gray-800 mb-2"><strong>Simple:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Jurisdiction selection matrix</li>
                    <li className="text-justify">Licensing decision tree</li>
                    <li className="text-justify">Banking readiness checklist</li>
                    <li className="text-justify">Cross-border M&A structuring planner</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Lawyers use these tools to filter clients → Boyar executes.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Workflow: How a Co-Branded Funnel Operates
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — A Law Firm Encounters a Complex Client Need</h3>
                  <p className="text-gray-800 mb-2"><strong>Example triggers:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">They need a Cayman/BVI holding</li>
                    <li className="text-justify">They want to issue tokens legally</li>
                    <li className="text-justify">They need a trust/foundation</li>
                    <li className="text-justify">They require international expansion</li>
                    <li className="text-justify">They need an SPV for investment</li>
                    <li className="text-justify">They fail bank onboarding</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Lawyer refers directly to Boyar.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Boyar Performs a Feasibility Check</h3>
                  <p className="text-gray-800">No fees, quick turnaround.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Joint Communication</h3>
                  <p className="text-gray-800 mb-2">Sometimes the lawyer joins the call.</p>
                  <p className="text-gray-800 mb-2">Boyar explains:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Structural models</li>
                    <li className="text-justify">Jurisdiction choices</li>
                    <li className="text-justify">Banking constraints</li>
                    <li className="text-justify">Regulatory considerations</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Boyar Issues Proposal</h3>
                  <p className="text-gray-800">Clear scope. Lawyer stays copied.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Mandate Execution</h3>
                  <div className="space-y-3 mt-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Boyar handles:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Incorporation</li>
                        <li className="text-justify">Compliance</li>
                        <li className="text-justify">Documentation</li>
                        <li className="text-justify">Banking</li>
                        <li className="text-justify">Licensing</li>
                        <li className="text-justify">SPVs</li>
                        <li className="text-justify">Tokens</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Lawyer handles:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Legal opinions</li>
                        <li className="text-justify">Agreements</li>
                        <li className="text-justify">Regulatory filings (if needed)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-3">Clear separation of duties.</p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Loop Back</h3>
                  <p className="text-gray-800">Lawyer is updated and feels in control — this strengthens referral flow.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Governance Protocols
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 1 — Respect the law firm's client relationship</strong></p>
                  <p className="text-gray-800 mt-1">Never bypass or overshadow the lawyer.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 2 — Clear communication boundaries</strong></p>
                  <p className="text-gray-800 mt-1">Boyar does not give legal advice.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 3 — Document quality must be exceptionally high</strong></p>
                  <p className="text-gray-800 mt-1">Co-branded = reputation-sensitive.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 4 — Joint approval of all public materials</strong></p>
                  <p className="text-gray-800 mt-1">To protect both brands.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Governance Rule 5 — Immediate compliance alignment</strong></p>
                  <p className="text-gray-800 mt-1">Law firms expect rigorous KYC/SOF/SOW standards.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. KPIs for This Channel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Law firms onboarded as partners</li>
                    <li className="text-justify">Average monthly referrals per firm</li>
                    <li className="text-justify">Diagnostic → proposal conversion</li>
                    <li className="text-justify">Proposal → mandate conversion</li>
                    <li className="text-justify">Co-branded content downloads</li>
                    <li className="text-justify">Webinar attendance</li>
                    <li className="text-justify">Cross-service adoption rate</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Lawyer satisfaction</li>
                    <li className="text-justify">Repeat engagement</li>
                    <li className="text-justify">New referrals originating from clients of the law firm</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                7. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Law Firm → Faces complex structuring need → Introduces Boyar → Co-branded expertise → Boyar executes → Lawyer trusts deeper → More referrals.
                </p>
                <p className="text-gray-800 font-semibold">
                  This becomes a compounding, credibility-driven acquisition ecosystem.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Law Firm Strategic Co-Branded Funnels Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For strategic-partnership-referral, show strategic partnership playbook
  if (isStrategicPartnershipModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                EXECUTION PLAYBOOK
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Strategic Partnership & Referral Alliances
              </h2>
              <p className="text-gray-600 text-lg mt-4">A complete, practical, high-level acquisition system</p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Tools Required
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner mapping</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Apollo</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Outreach</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn + WhatsApp Business</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot / Notion</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Co-branded content</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma, Canva Pro</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Briefings / sessions</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Zoom, Google Meet</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Compliance</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Internal AML/KYC system</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Partnership Activation Framework
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 1 — Identify High-Value Partners</h3>
                  <p className="text-gray-800 mb-2">Build a structured list by category:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Lawyers</li>
                    <li className="text-justify">Accountants</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">Crypto OTC desks</li>
                    <li className="text-justify">Immigration advisors</li>
                  </ul>
                  <p className="text-gray-800 mb-2 mt-3"><strong>Rank by:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Access to HNWI/corporate clients</li>
                    <li className="text-justify">Frequency of relevant client problems</li>
                    <li className="text-justify">Credibility</li>
                    <li className="text-justify">Relationship openness</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 2 — Founder-Led Outreach</h3>
                  <p className="text-gray-800 mb-2"><strong>Professional, collaborative tone:</strong></p>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 mt-3">
                    <p className="text-gray-800 italic">
                      "We support several professionals by helping their clients structure internationally, secure compliant banking, and clarify regulatory pathways. If useful, we can explore a partnership that strengthens your service offering without adding operational burden."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 3 — Introductory Alignment Meeting</h3>
                  <p className="text-gray-800 mb-2"><strong>Discuss:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Their client base</li>
                    <li className="text-justify">Their biggest challenges</li>
                    <li className="text-justify">Where they struggle (structuring, banking, licensing, compliance)</li>
                    <li className="text-justify">What they want from a trusted partner</li>
                    <li className="text-justify">What Boyar can solve for them</li>
                  </ul>
                  <p className="text-gray-800 mt-2">End by proposing a controlled value-first arrangement, not a referral expectation.</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 4 — Partnership Engagement Setup</h3>
                  <p className="text-gray-800 mb-2">Choose one model:</p>
                  <div className="space-y-3 mt-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Model A — Co-Branded Funnel</p>
                      <p className="text-gray-800 text-sm mb-1">(For lawyers, accountants, fund admins)</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Co-authored guides</li>
                        <li className="text-justify">Webinars</li>
                        <li className="text-justify">Landing pages</li>
                        <li className="text-justify">Shared diagnostic forms</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Model B — Soft Referral Flow</p>
                      <p className="text-gray-800 text-sm mb-1">(For bankers, wealth managers)</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Simple introduction protocol</li>
                        <li className="text-justify">Confidential handling</li>
                        <li className="text-justify">Rapid response</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-gray-800 font-semibold mb-1 text-sm">Model C — Cohort or Portfolio Support</p>
                      <p className="text-gray-800 text-sm mb-1">(For VC/PE, accelerators)</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                        <li className="text-justify">Diagnostic sessions</li>
                        <li className="text-justify">Structuring clinics</li>
                        <li className="text-justify">Banking advisory access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 5 — Immediate Value Demonstration</h3>
                  <p className="text-gray-800 mb-2">Provide:</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">A 24–48 hour feasibility check</li>
                    <li className="text-justify">Share jurisdictional briefs</li>
                    <li className="text-justify">Introduce compliance playbooks</li>
                    <li className="text-justify">Offer a short technical session</li>
                    <li className="text-justify">Share anonymized case insights</li>
                  </ul>
                  <p className="text-gray-800 mt-2">This builds early confidence.</p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 6 — Handling the First Referral</h3>
                  <p className="text-gray-800 mb-2 font-semibold">This is the "make or break" moment.</p>
                  <p className="text-gray-800 mb-2"><strong>Execute perfectly:</strong></p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Founder-led contact</li>
                    <li className="text-justify">Clarity on options</li>
                    <li className="text-justify">Transparent compliance process</li>
                    <li className="text-justify">Professional documentation</li>
                    <li className="text-justify">Predictable timelines</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Partner must feel: "This firm makes my life easier."</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">STEP 7 — Monthly Relationship Management</h3>
                  <p className="text-gray-800 mb-2 font-semibold">Consistency is the key to compounding.</p>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Share updates</li>
                    <li className="text-justify">Provide new guides</li>
                    <li className="text-justify">Host private briefings</li>
                    <li className="text-justify">Submit quarterly partner reports</li>
                    <li className="text-justify">Ask partners about their upcoming client issues</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Governance Rules
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 1 — Never bypass the partner</strong></p>
                  <p className="text-gray-800 mt-1">Introduce them in all communications and copy them when appropriate.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 2 — Compliance is non-negotiable</strong></p>
                  <p className="text-gray-800 mt-1">Even partner referrals must pass full KYC.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 3 — Partners must feel protected</strong></p>
                  <p className="text-gray-800 mt-1">You should enhance their value — never replace them.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-gray-800"><strong>Rule 4 — Maintain elite professionalism</strong></p>
                  <p className="text-gray-800 mt-1">Partners refer based on brand trust, not price.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. KPIs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Partners signed</li>
                    <li className="text-justify">First referrals per partner</li>
                    <li className="text-justify">Monthly referral rate</li>
                    <li className="text-justify">Diagnostic → proposal conversion</li>
                    <li className="text-justify">Proposal → mandate close rate</li>
                    <li className="text-justify">Revenue per partner</li>
                    <li className="text-justify">Cross-service adoption</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs</h3>
                  <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                    <li className="text-justify">Guide downloads</li>
                    <li className="text-justify">Webinar attendance</li>
                    <li className="text-justify">Partner engagement frequency</li>
                    <li className="text-justify">Repeat referral cycle duration</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Success Formula
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Partner encounters client problem → Introduces Boyar → Boyar delivers flawlessly → Partner's credibility increases → Referral cycle compounds.
                </p>
                <p className="text-gray-800 font-semibold">
                  This model becomes the largest and most stable acquisition channel within 12–24 months.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Strategic Partnership & Referral Alliances Execution Playbook</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For other models (founder-led-origination, etc.), show placeholder or redirect
  if (!isLinkedInModel && !isFounderModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}`)}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Execution Playbook content will be added here.</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

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
              <h1 className="text-lg font-semibold text-black">Execution Playbook</h1>
              <div className="w-20" /> {/* Spacer */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Title Page */}
          <div className="mb-16 text-center border-b border-gray-300 pb-12">
            <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              FULL EXECUTION PLAYBOOK
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
              LinkedIn Executive Outreach Model
            </h2>
            <p className="text-gray-600 text-lg mt-4">With tools, workflows, scripts, governance, and KPI system</p>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              1. Required Tools for Model 2
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Executive targeting</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Content analytics</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Shield Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">AI research</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Clay.ai</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">AI personalization</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Lyne.ai / Clay workflows</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM tracking</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot / Notion CRM</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Scheduling</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Buffer or Later</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Document sharing</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Drive</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Image assets</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Canva Pro</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-800"><strong>Minimum stack:</strong> Sales Navigator + CRM + Shield + Google Drive.</p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              2. Setup: Three Foundational Components
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.1 Profile Optimisation
                </h3>
                <p className="text-gray-800 mb-2">Founders' profiles must demonstrate:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Jurisdictional competence</li>
                  <li className="text-justify">Regulatory knowledge</li>
                  <li className="text-justify">Advisory credibility</li>
                  <li className="text-justify">Boutique professionalism</li>
                </ul>
                <p className="mt-4 text-gray-800 mb-2"><strong>Key sections:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Clean headline: "Offshore Structuring | Licensing | Trusts | Banking Advisory"</li>
                  <li className="text-justify">Featured content: jurisdiction guides, insights, videos</li>
                  <li className="text-justify">About section with founder-specific authority</li>
                  <li className="text-justify">Case studies (anonymized)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.2 Segmented Target Lists (Built in Sales Navigator)
                </h3>
                <p className="text-gray-800 mb-2">Build 6 separate lists:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Crypto/Web3</li>
                  <li className="text-justify">FinTech / EMI / MSB</li>
                  <li className="text-justify">Funds / Asset Managers</li>
                  <li className="text-justify">SMEs doing cross-border expansion</li>
                  <li className="text-justify">HNWIs / Family offices</li>
                  <li className="text-justify">Licensing-driven businesses</li>
                </ul>
                <p className="mt-4 text-gray-800 mb-2"><strong>Target role types:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Founder</li>
                  <li className="text-justify">CEO</li>
                  <li className="text-justify">COO/CFO</li>
                  <li className="text-justify">GC</li>
                  <li className="text-justify">Partner</li>
                  <li className="text-justify">Managing Director</li>
                  <li className="text-justify">Compliance Head</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                  2.3 Core Content System (Monthly)
                </h3>
                <p className="text-gray-800 mb-2"><strong>Mandatory content formats:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Jurisdiction Updates</li>
                  <li className="text-justify">Licensing Insights</li>
                  <li className="text-justify">Banking Environment Changes</li>
                  <li className="text-justify">Structuring Playbooks</li>
                  <li className="text-justify">Case Studies</li>
                  <li className="text-justify">Short thought leadership quotes</li>
                </ul>
                <p className="mt-4 text-gray-800 mb-2"><strong>Posting frequency:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">4–8 times per month</li>
                  <li className="text-justify">Always high-value, never generic</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              3. Daily, Weekly & Monthly Execution Cadence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">DAILY EXECUTION (Founders)</h3>
                <ol className="list-decimal list-inside ml-2 space-y-1 text-gray-800 text-sm">
                  <li className="text-justify">Accept/Review Connection Requests</li>
                  <li className="text-justify">Check who engaged with the last post</li>
                  <li className="text-justify">Send 3–5 personalised outreach messages</li>
                  <li className="text-justify">Respond to inbound inquiries</li>
                </ol>
                <p className="mt-2 text-gray-800 text-xs italic">Prioritize executives and decision-makers. Move serious conversations to private calls.</p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">WEEKLY EXECUTION</h3>
                <ol className="list-decimal list-inside ml-2 space-y-1 text-gray-800 text-sm">
                  <li className="text-justify">Publish 1 technical insight or jurisdiction update</li>
                  <li className="text-justify">Outreach 20–30 targeted accounts</li>
                  <li className="text-justify">Follow-up with high-engagement prospects</li>
                  <li className="text-justify">Update CRM with new leads</li>
                </ol>
                <p className="mt-2 text-gray-800 text-xs italic">Done by founders. Personalised, no templates. Tag by segment and intent score.</p>
              </div>

              <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">MONTHLY EXECUTION</h3>
                <ol className="list-decimal list-inside ml-2 space-y-1 text-gray-800 text-sm">
                  <li className="text-justify">Produce a longer-form briefing note</li>
                  <li className="text-justify">Host 1 micro-event (optional)</li>
                  <li className="text-justify">Review success metrics</li>
                </ol>
                <p className="mt-2 text-gray-800 text-xs italic">Share privately with warm accounts. Review which posts brought calls and which segments responded best.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              4. Outreach Blueprint (Execution Workflow)
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 1 — Identify Trigger</h3>
                <p className="text-gray-800 mb-2"><strong>Examples:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Raised funding</li>
                  <li className="text-justify">Announced expansion</li>
                  <li className="text-justify">Posted about regulation</li>
                  <li className="text-justify">Mentioned banking issues</li>
                  <li className="text-justify">Hired compliance personnel</li>
                </ul>
                <p className="mt-2 text-gray-800">LinkedIn is full of these signals.</p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 2 — Send the Intro Message</h3>
                <p className="text-gray-800 mb-2"><strong>Tone:</strong> Professional, discreet, helpful, executive-level.</p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                  <p className="text-gray-800 italic"><strong>Example:</strong></p>
                  <p className="text-gray-800 italic mt-1">"I thought it may be useful to share a brief framework we use for teams evaluating offshore structuring and banking options. If relevant, happy to outline where firms in your position typically see success."</p>
                </div>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 3 — If Accepted → Soft Follow-Up</h3>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                  <p className="text-gray-800 italic"><strong>Example:</strong></p>
                  <p className="text-gray-800 italic mt-1">"Sharing a short jurisdictional note that tends to help founders clarify early decisions."</p>
                  <p className="text-gray-800 mt-2">Attach relevant document.</p>
                </div>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 4 — Invite to Private Discussion (Only When Warm)</h3>
                <p className="text-gray-800 mb-2">Never push for a call early.</p>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mt-2">
                  <p className="text-gray-800 italic"><strong>Example:</strong></p>
                  <p className="text-gray-800 italic mt-1">"If you're evaluating options in the next 60 days, happy to walk through the structure that aligns best with your scenario."</p>
                </div>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 5 — Move to Calendar Booking</h3>
                <p className="text-gray-800 mb-2"><strong>Via:</strong></p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Google Meet</li>
                  <li className="text-justify">Zoom</li>
                  <li className="text-justify">Calendly Link (optional)</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Step 6 — Enter Pipeline</h3>
                <p className="text-gray-800 mb-2">Push into CRM with:</p>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Segment</li>
                  <li className="text-justify">Role</li>
                  <li className="text-justify">Warmth level</li>
                  <li className="text-justify">Trigger reason</li>
                  <li className="text-justify">Recommended next step</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              5. Governance Controls
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Control 1 — No mass outreach</h3>
                <p className="text-gray-800">LinkedIn penalizes spam; also not aligned with boutique positioning.</p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Control 2 — Maintain discretion</h3>
                <p className="text-gray-800">No sensitive discussions via LinkedIn chat.</p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Control 3 — Messaging consistency</h3>
                <p className="text-gray-800">Founders must follow the same tone guidelines.</p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Control 4 — Weekly review of inactive warm leads</h3>
                <p className="text-gray-800">Follow-up with precision.</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              6. KPI System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Primary KPIs:</h3>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Connection acceptance rate</li>
                  <li className="text-justify">Executive reply rate</li>
                  <li className="text-justify">Calls booked</li>
                  <li className="text-justify">Warm introductions generated</li>
                  <li className="text-justify">LinkedIn engagement quality</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                <h3 className="text-lg font-semibold mb-2 text-black">Secondary KPIs:</h3>
                      <ul className="list-disc ml-6 space-y-2 pl-0 text-gray-800 text-sm" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Post engagement from ICP</li>
                  <li className="text-justify">Profile visits by ICP</li>
                  <li className="text-justify">Number of prospects moved to pipeline</li>
                  <li className="text-justify">Number of briefing notes downloaded privately</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
              7. Success Formula
            </h2>
            <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                LinkedIn → Micro insights → Authority → Private conversations → Founder-led diagnostic → Mandate.
              </p>
              <p className="text-gray-800 font-semibold">
                Boyar Partners' expertise + the founders' personal credibility = a conversion engine that outperforms all forms of paid marketing.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>LinkedIn Executive Outreach Execution Playbook</p>
            <p className="mt-2">Boyar Partners — Internal Use Only</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
