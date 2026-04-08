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
    "ai-prospect-scoring": "ai-prospect-scoring",
    "ai-prospect-scoring-personalization": "ai-prospect-scoring",
    "ai-prospect-personalization": "ai-prospect-scoring",
    "prospect-scoring-personalization": "ai-prospect-scoring",
    "ai-scoring": "ai-prospect-scoring",
    "predictive-competitor-monitoring": "predictive-competitor-monitoring",
    "predictive-competitor": "predictive-competitor-monitoring",
    "competitor-monitoring": "predictive-competitor-monitoring",
    "algorithmic-linkedin-content": "algorithmic-linkedin-content",
    "algorithmic-linkedin": "algorithmic-linkedin-content",
    "linkedin-content-distribution": "algorithmic-linkedin-content",
    "ai-driven-abm": "ai-driven-abm",
    "ai-abm": "ai-driven-abm",
    "ai-driven-abm-enhancements": "ai-driven-abm",
    "abm-enhancements": "ai-driven-abm",
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
  const isLicensingAcceleratorModel = modelId === "licensing-accelerator";
  const isTokenizationDealflowModel = modelId === "tokenization-dealflow";
  const isGeoTargetedExpansionModel = modelId === "geo-targeted-expansion";
  const isEnterpriseLicensingExpansionModel = modelId === "enterprise-licensing-expansion";
  const isFintechApiEcosystemModel = modelId === "fintech-api-ecosystem";
  const isTokenizationStructuringHybridModel = modelId === "tokenization-structuring-hybrid";
  const isAiProspectScoringModel = modelId === "ai-prospect-scoring";
  const isPredictiveCompetitorMonitoringModel = modelId === "predictive-competitor-monitoring";
  const isAlgorithmicLinkedinContentModel = modelId === "algorithmic-linkedin-content";
  const isAiDrivenAbmModel = modelId === "ai-driven-abm";
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
  // Licensing Accelerator Funnels — Execution Playbook
  if (isLicensingAcceleratorModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Licensing Accelerator Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Licensing Accelerator Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools & Infrastructure Required
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM / pipeline tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion CRM, Folk</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Prospect identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Apollo.io</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, Substack / ConvertKit</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Encrypted Drive, Notion (gated resources)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Regulatory monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Regulator websites, Google Alerts, Lexology</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Diagnostic call scheduling</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Calendly, Google Meet / Zoom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Proposal delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion / PDF (fully branded)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Intelligence Asset Library (Build First)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Before any outreach, produce the following gated and ungated assets. These are the funnel entry points that establish authority before a prospect engages directly.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 1 — Licensing Jurisdiction Matrix (Gated PDF)</p>
                  <p className="text-justify">Side-by-side comparison of VASP / EMI / Fund licensing across Malta, Seychelles, Cayman, ADGM, Lithuania, and Gibraltar. Columns: timeline, capital requirement, substance requirement, banking access, MiCA compatibility, cost range.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 2 — "Why Licence Applications Fail" Briefing Note (Ungated)</p>
                  <p className="text-justify">7 common failure reasons across VASP, EMI, and fund licences. Designed to be shared freely and produce inbound diagnostic requests.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 3 — MiCA Transition Readiness Checklist (Gated)</p>
                  <p className="text-justify">A structured checklist for crypto businesses assessing CASP licence readiness: entity structure, UBO compliance, AML programme, whitepaper, MLRO appointment, capital adequacy, banking access.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 4 — Licensing Lifecycle Map (LinkedIn Carousel)</p>
                  <p className="text-justify">Visual breakdown of the 8 phases from licensing intent to approval and post-licence maintenance. Positions Boyar across the full advisory arc, not just the application phase.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 5 — Fund Licensing Pathway Guide (Gated PDF)</p>
                  <p className="text-justify">Covers Cayman CIMA, BVI FSC, Luxembourg AIFMD, DIFC DFSA, and Singapore MAS — with cost, timeline, and minimum AUM considerations for GP/fund manager use.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Prospect Identification & Signal Monitoring
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Monitor these signals weekly on LinkedIn and across Web3/fintech communities:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Hiring signals</p>
                    <p className="text-sm text-gray-800">Job posts for MLRO, Compliance Officer, AML Analyst, Regulatory Affairs Manager — these indicate an active licensing project.</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Content signals</p>
                    <p className="text-sm text-gray-800">Founders posting about MiCA, VARA, FCA, or specific licence types they are evaluating.</p>
                  </div>
                  <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Fundraising signals</p>
                    <p className="text-sm text-gray-800">Newly funded crypto or fintech companies — capital events almost always trigger a structuring + licensing mandate.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Expansion signals</p>
                    <p className="text-sm text-gray-800">Companies announcing EU market entry, new product verticals, or partnerships with regulated entities.</p>
                  </div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Deadline signals</p>
                    <p className="text-sm text-gray-800">Any mention of MiCA July 2026, VARA annual renewal, FSC substance reviews, or "licence transition" language.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-gray-900 text-sm">Community signals</p>
                    <p className="text-sm text-gray-800">Questions in Telegram groups, Discord servers, or LinkedIn about VASP/EMI licence timelines or jurisdiction selection.</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Outreach & Engagement Workflow (End-to-End)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Signal Detection & List Build</h3>
                  <p className="text-justify">Weekly: identify 15–20 prospects via the signals above. Log in CRM with trigger reason, licence type sought, jurisdiction signals, and urgency score (1–3).</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Connection Request</h3>
                  <p className="text-justify">Send a personalised LinkedIn connection request with a single relevant observation. No pitch.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Noticed your recent post on MiCA compliance timelines — we work on CASP licence architecture across Malta and Lithuania. Happy to connect and share what's worked."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Value-First Message (Post-Connection)</h3>
                  <p className="text-justify">Send one relevant intelligence asset. No call ask.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Sharing a brief jurisdiction matrix we put together for teams evaluating VASP licensing options — covers timelines, capital requirements, and banking access across the main jurisdictions. Useful if you're still mapping options."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Engagement Follow-Up</h3>
                  <p className="text-justify">If they respond, like, or open the asset: follow up within 24 hours with a soft diagnostic invitation.</p>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"If it helps, I can walk you through the full structure that fits your model — typically 30–40 minutes and gives you a clear picture of jurisdiction, entity, banking, and compliance requirements before you commit to anything."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Licensing Diagnostic Call (45 minutes)</h3>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Business model and transaction flows</li>
                    <li className="text-justify">Target jurisdictions and market footprint</li>
                    <li className="text-justify">Shareholder / UBO structure</li>
                    <li className="text-justify">AML programme maturity</li>
                    <li className="text-justify">Banking relationships and requirements</li>
                    <li className="text-justify">Licence type recommendation and timeline</li>
                    <li className="text-justify">Entity architecture required for the application</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Outcome: clear mandate scope and a verbal proposal.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Proposal Delivery (within 48 hours)</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-justify"><strong>Phase 1:</strong> Pre-application architecture (entity, UBOs, substance, AML) — $X</p>
                    <p className="text-justify"><strong>Phase 2:</strong> Application preparation, regulator liaison, documentation — $X</p>
                    <p className="text-justify"><strong>Phase 3:</strong> Banking onboarding and post-licence maintenance retainer — $X/year</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 7 — Mandate Execution</h3>
                  <p className="text-justify">Boyar executes across: corporate structuring, compliance documentation, AML/MLRO build-out, banking introductions, application preparation, regulator correspondence, and post-approval ongoing advisory.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Monthly Content Calendar
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Week 1 — Jurisdiction update:</strong> Regulatory change in one key licensing jurisdiction with Boyar's practical implication commentary.</li>
                  <li className="text-justify"><strong>Week 2 — Failure analysis:</strong> "Why [licence type] applications are rejected in [jurisdiction]" — specific, technical, valuable.</li>
                  <li className="text-justify"><strong>Week 3 — Structuring framework:</strong> Visual or carousel explaining entity architecture for a specific licence type.</li>
                  <li className="text-justify"><strong>Week 4 — Deadline / urgency piece:</strong> MiCA countdown, VARA renewal window, or FSC substance deadline update with action guidance.</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                  <p className="text-justify font-semibold">Every piece ends with a soft CTA: "If you'd like a 30-minute walkthrough of how this applies to your specific structure, happy to arrange."</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Never guarantee approval timelines</p>
                  <p className="text-justify">Regulators set their own timelines. Boyar optimises the application but does not control the regulator's decision schedule.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Scope phases clearly to prevent mandate creep</p>
                  <p className="text-justify">Each phase must be priced and scoped in writing before work begins.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — KYC before any application work begins</p>
                  <p className="text-justify">Full UBO disclosure and risk screening before any licence application architecture is produced. Non-negotiable.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Boyar positions as architect, not legal counsel</p>
                  <p className="text-justify">Local legal counsel is engaged where required. Boyar coordinates and leads the overall structure but does not provide legal opinions.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPI System
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Licensing diagnostics booked per month</li>
                    <li className="text-justify text-sm">Proposals issued and close rate</li>
                    <li className="text-justify text-sm">Average mandate value (Phase 1 + 2 + 3)</li>
                    <li className="text-justify text-sm">Licence types successfully applied for</li>
                    <li className="text-justify text-sm">Recurring retainer clients post-approval</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">LinkedIn engagement on licensing posts</li>
                    <li className="text-justify text-sm">Intelligence asset downloads</li>
                    <li className="text-justify text-sm">Signal-to-outreach conversion rate</li>
                    <li className="text-justify text-sm">Referrals sourced from licensing clients</li>
                    <li className="text-justify text-sm">Community mentions (Telegram/Discord)</li>
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
                  Signal detection → Intelligence asset delivery → Diagnostic call → Phased proposal → Full architecture mandate → Post-licence maintenance retainer → Referral to next licensing client. One licensing mandate produces $30K–$200K+ in total mandate value with 12–18 months of active engagement and multi-year renewal revenue. This is Boyar's single highest-ticket acquisition funnel.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Tokenization Dealflow Syndicates — Execution Playbook
  if (isTokenizationDealflowModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Tokenization Dealflow Syndicates</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Tokenization Dealflow Syndicates
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Tools & Infrastructure Required
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM / relationship tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion CRM, Folk</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Syndicate discovery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Telegram, Discord, CoinList</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, Mirror.xyz, Substack, Telegram broadcast</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Structure review delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion pages, Google Meet, branded PDF summaries</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Regulatory monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">ESMA, VARA, MAS, ADGM regulator feeds, Lexology</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Proposal delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion / branded PDF, DocuSign for engagement letters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Intelligence Asset Library (Build Before Outreach)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 1 — Tokenization Structure Architecture Diagram (Ungated)</p>
                  <p className="text-justify">Visual showing the standard Cayman Foundation + BVI OpCo + Token Issuance SPV architecture. Shareable on LinkedIn and in Web3 communities. Establishes Boyar as the firm that understands the full structural stack.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 2 — MiCA Token Classification Flowchart (Gated PDF)</p>
                  <p className="text-justify">Decision tree that helps project teams classify their token as utility, asset-referenced, or e-money under MiCA — and understand the compliance obligations that follow each classification.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 3 — RWA Tokenization Jurisdiction Guide (Gated PDF)</p>
                  <p className="text-justify">Covers Cayman, Liechtenstein, Luxembourg, BVI, and UAE for real-world asset tokenization — comparing legal treatment of tokenized securities, SPV requirements, investor eligibility, and banking access.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 4 — Pre-Launch Tokenization Compliance Checklist (Ungated)</p>
                  <p className="text-justify">15-point checklist covering entity, regulatory, banking, AML, whitepaper, and custody requirements before a token project launches. Designed to be shared by syndicate leads with their portfolio projects.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 5 — Syndicate Partner Deck (Private)</p>
                  <p className="text-justify">A concise 8-slide deck explaining Boyar's tokenization advisory capabilities, typical mandate scope, jurisdiction coverage, and referral arrangement terms — for the syndicate lead's first detailed conversation.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Syndicate Discovery & Prioritisation
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Identify and tier target syndicates across three categories:</p>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 1 — High Priority (approach first)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Active launchpads backing 5+ projects per quarter</li>
                    <li className="text-justify">RWA tokenization platforms with institutional backing</li>
                    <li className="text-justify">Web3 accelerators with structured cohort programmes</li>
                    <li className="text-justify">Deal clubs where syndicate lead is accessible on LinkedIn</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 2 — Medium Priority</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Private equity GPs exploring tokenized LP structures</li>
                    <li className="text-justify">Real estate developers with fractional tokenization interest</li>
                    <li className="text-justify">Family office investment clubs co-investing in digital assets</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 3 — Long-cycle (nurture)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Institutional asset managers evaluating tokenization pilots</li>
                    <li className="text-justify">Infrastructure providers (custodians, exchanges) with tokenization client bases</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Outreach & Engagement Workflow (End-to-End)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Syndicate Lead Identification</h3>
                  <p className="text-justify">Weekly: identify 5–10 syndicate leads via LinkedIn (search: "tokenization", "launchpad", "RWA", "Web3 syndicate"), Telegram group admins, and accelerator programme directors. Log in CRM with tier, project volume estimate, and contact route.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Warm Connection Request</h3>
                  <p className="text-justify">LinkedIn connection with a single relevant observation about their syndicate or a project they've backed. No pitch.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Noticed [Syndicate Name] has been active in RWA tokenization — we work with project teams on the structural and regulatory architecture that makes these launches viable. Happy to connect and share some frameworks we've developed."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Value-First Asset Delivery</h3>
                  <p className="text-justify">Send the Tokenization Structure Architecture Diagram or MiCA Classification Flowchart. Frame it as something useful for their portfolio projects.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Thought this might be useful for teams in your network evaluating structure options — it's a framework we use to map entity, regulatory, and banking requirements before a token launch. Happy to share a version tailored to a specific project if helpful."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Syndicate Partner Conversation</h3>
                  <p className="text-justify">If they engage: propose a 30-minute call to understand their deal pipeline and explain how Boyar can serve their portfolio projects. Share the Syndicate Partner Deck.</p>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"If it makes sense, happy to walk through how we typically support token projects at the structure and compliance stage — takes 30 minutes and might be useful context for your next cohort."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Free Structure Review (Conversion Engine)</h3>
                  <p className="text-justify">Offer a complimentary 30-minute tokenization structure review for any project in their pipeline. Cover:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Token classification under applicable law</li>
                    <li className="text-justify">Recommended entity and SPV architecture</li>
                    <li className="text-justify">Jurisdiction selection rationale</li>
                    <li className="text-justify">Banking pathway feasibility</li>
                    <li className="text-justify">VASP/CASP licensing requirements</li>
                    <li className="text-justify">Key compliance risks and mitigation steps</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Phased Mandate Proposal</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-justify"><strong>Phase 1:</strong> Entity formation + SPV structure — $X</p>
                    <p className="text-justify"><strong>Phase 2:</strong> Regulatory classification + whitepaper advisory + AML framework — $X</p>
                    <p className="text-justify"><strong>Phase 3:</strong> VASP/CASP licensing (if required) — $X</p>
                    <p className="text-justify"><strong>Phase 4:</strong> Banking onboarding + ongoing compliance retainer — $X/month</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 7 — Syndicate Referral Agreement</h3>
                  <p className="text-justify">For Tier 1 partners: formalise a referral arrangement with a signed referral agreement. Boyar pays a referral fee (typically 5–10% of mandate fees) for projects introduced by the syndicate lead.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Content Strategy (Web3 Authority Engine)
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Week 1 — Structure post:</strong> Diagram or carousel showing entity architecture for a specific token type. Publish on LinkedIn and share in 2–3 relevant Telegram groups.</li>
                  <li className="text-justify"><strong>Week 2 — Regulatory update:</strong> MiCA development, VARA update, or jurisdiction-specific token law change with practical implications for project teams.</li>
                  <li className="text-justify"><strong>Week 3 — Case framework:</strong> "How we would structure a [real estate / PE fund / commodity] tokenization project" — anonymised, educational, highly shareable.</li>
                  <li className="text-justify"><strong>Week 4 — Risk/compliance piece:</strong> Common tokenization compliance failures and how to avoid them. Attracts both project teams and syndicate leads who want to protect their portfolio.</li>
                </ul>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Governance Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Full KYC/AML screening before any mandate begins</p>
                  <p className="text-justify">Token projects carry elevated regulatory risk. UBO disclosure, source of funds, and risk assessment are mandatory before engagement letters are signed.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Boyar does not advise on token economics or investment returns</p>
                  <p className="text-justify">Boyar's scope is structure, compliance, licensing, and banking. Token economics and investment return projections are outside scope and must not be commented on.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Referral arrangements must be formally documented</p>
                  <p className="text-justify">All syndicate referral fee arrangements must be in a signed referral agreement before any project introductions are accepted.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Phase mandates clearly to avoid scope creep</p>
                  <p className="text-justify">Tokenization projects expand scope mid-engagement. Each phase must be separately scoped and priced before commencement.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. KPI System
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Active syndicate partnerships established</li>
                    <li className="text-justify text-sm">Free structure reviews conducted per month</li>
                    <li className="text-justify text-sm">Tokenization mandates won per quarter</li>
                    <li className="text-justify text-sm">Average mandate value per project</li>
                    <li className="text-justify text-sm">Referral conversion rate (intro → mandate)</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">LinkedIn engagement on tokenization content</li>
                    <li className="text-justify text-sm">Telegram/Discord community reach</li>
                    <li className="text-justify text-sm">Gated asset downloads per month</li>
                    <li className="text-justify text-sm">Syndicate leads in pipeline</li>
                    <li className="text-justify text-sm">Recurring retainer clients post-launch</li>
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
                  Syndicate relationship → Project referral → Free structure review → Phased mandate (entity + regulatory + banking + licensing) → Post-launch compliance retainer → Next referral from the same syndicate. Two active syndicate partnerships producing 4–6 referrals each per year = 8–12 tokenization mandates = $640K–$960K in annual revenue at maturity.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Geo-Targeted Corporate Expansion Funnels
  if (isGeoTargetedExpansionModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Geo-Targeted Corporate Expansion Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Geo-Targeted Corporate Expansion Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools & Infrastructure Required</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM / pipeline tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion CRM, Folk</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Prospect identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator (geo + industry filters)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Signal monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Alerts, LinkedIn notifications, Apollo.io</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, WhatsApp broadcast, Substack</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Document delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion corridor guides, branded PDFs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Diagnostic scheduling</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Calendly, Google Meet / Zoom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Proposal delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Branded PDF, DocuSign engagement letters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. Corridor Intelligence Assets (Build Before Outreach)</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Build one corridor guide per target route before starting outreach. These assets replace cold prospecting.</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 1 — India → UAE Expansion Guide (Gated PDF)</p>
                  <p className="text-justify">Entity options (DIFC, ADGM, Mainland, Freezone), banking landscape, substance requirements, tax treaty considerations, common structural mistakes, timeline and cost overview.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 2 — UK / EU → Cayman / BVI Holding Structure Guide (Gated PDF)</p>
                  <p className="text-justify">Why founders restructure offshore post-expansion, Cayman vs BVI for different business types, banking access, economic substance, and CIMA/FSC registration overview.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 3 — Crypto Relocation Corridor Map (Ungated LinkedIn Carousel)</p>
                  <p className="text-justify">Visual showing top relocation corridors for crypto businesses: source markets, destination jurisdictions, VASP licensing options, and banking feasibility ratings per corridor.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 4 — "5 Expansion Mistakes" Briefing Note (Ungated)</p>
                  <p className="text-justify">The 5 most costly structural mistakes companies make when expanding internationally — wrong jurisdiction, wrong entity type, no substance, banking not assessed upfront, UBO gaps. Widely shareable, produces inbound enquiries.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Asset 5 — Expansion Diagnostic Call Script (Internal)</p>
                  <p className="text-justify">Structured intake covering business model, source jurisdiction, destination requirements, timeline, banking needs, and compliance obligations. Used on every first diagnostic call to ensure consistent quality and complete information capture.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Signal Monitoring System (Weekly)</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Job posting signals</p>
                    <p className="text-sm text-gray-800">"Country Manager UAE", "Head of International Expansion", "VP APAC" — company is actively expanding into a new market.</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">LinkedIn announcement signals</p>
                    <p className="text-sm text-gray-800">Founders posting "excited to announce our expansion into [country]" or "we've opened our Dubai office."</p>
                  </div>
                  <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Funding signals</p>
                    <p className="text-sm text-gray-800">Newly funded companies in target source markets — capital events almost always trigger international expansion planning.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Community signals</p>
                    <p className="text-sm text-gray-800">Founders asking questions about UAE company formation, offshore banking, or Cayman structures in LinkedIn posts or groups.</p>
                  </div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Regulatory signals</p>
                    <p className="text-sm text-gray-800">Policy changes in source markets (India FEMA, UK tax changes) that incentivise international restructuring.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-gray-900 text-sm">Partnership signals</p>
                    <p className="text-sm text-gray-800">Companies announcing international partnerships — often precedes formal expansion and entity setup.</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Outreach & Engagement Workflow (End-to-End)</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Weekly Prospect List Build</h3>
                  <p className="text-justify">Use LinkedIn Sales Navigator filtered by: geography (source market), seniority (Founder / CEO / CFO / GC), industry, and recent activity. Build 20–30 prospects per active corridor weekly. Log in CRM with corridor, trigger signal, and urgency score 1–3.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Corridor-Specific Connection Request</h3>
                  <p className="text-justify">Reference their specific source market and destination. Never generic.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Noticed you're building in India and recently posted about UAE expansion — we help founders structure this move correctly from day one (entity, banking, substance). Happy to connect and share what works."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Corridor Guide Delivery (Post-Connection)</h3>
                  <p className="text-justify">Send the relevant corridor guide immediately after connecting. One document, no sales language.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Sharing our India to UAE Expansion Guide — covers entity options, banking landscape, and common mistakes we see at this stage. Useful whether you're planning now or in the next 6 months."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Engagement Follow-Up</h3>
                  <p className="text-justify">If they open, reply, or engage: follow up within 24–48 hours with a diagnostic invitation.</p>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Happy to do a quick 30-minute expansion diagnostic for your specific setup — we can map out the right structure, jurisdiction, and banking pathway before you commit to anything."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Expansion Diagnostic Call (30–45 minutes)</h3>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Business model and revenue flows</li>
                    <li className="text-justify">Source jurisdiction obligations and exit considerations</li>
                    <li className="text-justify">Target destination and entity type options</li>
                    <li className="text-justify">Banking requirements and access feasibility</li>
                    <li className="text-justify">Substance and compliance obligations in destination</li>
                    <li className="text-justify">Licensing requirements if applicable</li>
                    <li className="text-justify">Timeline, cost range, and recommended next steps</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Outcome: verbal mandate scope, written proposal within 48 hours.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Phased Expansion Mandate Proposal</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-justify"><strong>Phase 1:</strong> Entity formation in destination jurisdiction — $X</p>
                    <p className="text-justify"><strong>Phase 2:</strong> Banking introductions and account opening support — $X</p>
                    <p className="text-justify"><strong>Phase 3:</strong> Substance arrangement and compliance registration — $X</p>
                    <p className="text-justify"><strong>Phase 4:</strong> Licensing (if required) + annual maintenance retainer — $X/year</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Corridor Activation Sequencing</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Launch corridors sequentially — build authority in one before starting the next.</p>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Month 1–3 — Corridor 1: India → UAE</p>
                  <p className="text-justify">Highest volume, fastest conversion, strong founder community on LinkedIn. Build the guide, publish 4 pieces of corridor-specific content, run outreach to 60–90 Indian founders expanding to UAE.</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Month 4–6 — Corridor 2: Crypto / Web3 Relocation (multi-source → UAE / Malta / Lithuania)</p>
                  <p className="text-justify">High mandate value, MiCA urgency driving demand. Leverage tokenization and licensing content already produced for other models.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Month 7–9 — Corridor 3: UK / EU → Cayman / BVI</p>
                  <p className="text-justify">Fund managers and tech companies. Higher average mandate value. Leverage fund-related content and CFO/GC roundtable network already built.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. Monthly Content Calendar (Per Active Corridor)</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Week 1 — Structural post:</strong> "The right entity structure for [source] founders expanding to [destination]" — diagram or carousel format.</li>
                  <li className="text-justify"><strong>Week 2 — Banking reality post:</strong> "What banks actually require from [source] companies expanding to [destination]" — specific, practical, no competitor publishes this.</li>
                  <li className="text-justify"><strong>Week 3 — Mistake / risk post:</strong> "The 3 compliance mistakes [source] founders make when expanding to [destination]" — high engagement, triggers inbound DMs.</li>
                  <li className="text-justify"><strong>Week 4 — Regulatory update:</strong> Any change in source or destination jurisdiction affecting the corridor — positions Boyar as the current authority.</li>
                </ul>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Always perform source jurisdiction exit analysis</p>
                  <p className="text-justify">Expansion mandates must account for obligations in the source jurisdiction — tax exit, regulatory deregistration, and transfer pricing — not just the destination. Incomplete advice creates client risk and liability.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Banking feasibility assessed before entity formation</p>
                  <p className="text-justify">Forming an entity without confirming banking access first is the most common failure mode. Boyar assesses banking feasibility during the diagnostic, not after entity formation.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Full KYC before any mandate begins</p>
                  <p className="text-justify">UBO disclosure and source of funds verification before engagement letters are signed. Non-negotiable.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Local counsel engaged for destination-specific legal advice</p>
                  <p className="text-justify">Boyar coordinates the overall expansion architecture. Local legal counsel in the destination jurisdiction handles jurisdiction-specific legal opinions and filings.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>8. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Expansion diagnostics booked per month</li>
                    <li className="text-justify text-sm">Mandates won per corridor per quarter</li>
                    <li className="text-justify text-sm">Average mandate value per expansion client</li>
                    <li className="text-justify text-sm">Active corridors with published content</li>
                    <li className="text-justify text-sm">Referrals from existing expansion clients</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Corridor guide downloads per month</li>
                    <li className="text-justify text-sm">LinkedIn engagement on corridor content</li>
                    <li className="text-justify text-sm">Connection acceptance rate per corridor</li>
                    <li className="text-justify text-sm">Signal-to-outreach conversion rate</li>
                    <li className="text-justify text-sm">Annual maintenance retainers secured</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>9. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Corridor content published → Expansion signal detected → Targeted outreach with corridor guide → Diagnostic call → Multi-phase expansion mandate (entity + banking + compliance + licensing) → Annual maintenance retainer → Source-market referral loop. One corridor at authority level generates 4–8 mandates per quarter at $15K–$60K average value. Three active corridors = $500K–$1.5M annual revenue channel at maturity.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Enterprise Licensing Expansion Funnels
  if (isEnterpriseLicensingExpansionModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Enterprise Licensing Expansion Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Enterprise Licensing Expansion Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools & Infrastructure Required</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Enterprise CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot (company + contact hierarchy), Notion</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Prospect identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Crunchbase, Refinitiv</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Regulatory monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">ESMA, EBA, FCA, VARA, MAS regulator feeds, Lexology</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, Substack, industry newsletter sponsorships</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Proposal & mandate management</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion workspaces, DocuSign, encrypted Drive</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Enterprise meeting scheduling</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Calendly Enterprise, Google Meet, MS Teams</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. Enterprise Signal Detection System</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Monitor these enterprise-specific signals weekly. Each represents an active licensing expansion mandate opportunity:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">MiCA transition signals</p>
                    <p className="text-sm text-gray-800">EU crypto businesses posting about CASP authorisation, hiring for MiCA compliance roles, or announcing regulatory transition plans.</p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Market expansion announcements</p>
                    <p className="text-sm text-gray-800">Press releases or LinkedIn posts announcing entry into a new regulated market — always requires a new licence or passporting.</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Acquisition signals</p>
                    <p className="text-sm text-gray-800">Regulated firms making acquisitions of other licensed entities — change of control notifications and regulatory integration mandates follow immediately.</p>
                  </div>
                  <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Hiring signals</p>
                    <p className="text-sm text-gray-800">Jobs posted for "Head of Regulatory Expansion", "Multi-Jurisdiction Compliance Manager", "VASP Licensing Specialist" — active licensing project underway.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Funding rounds</p>
                    <p className="text-sm text-gray-800">Series B+ raises by regulated fintech or crypto companies — growth capital almost always earmarked for regulatory expansion.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-gray-900 text-sm">Product launch signals</p>
                    <p className="text-sm text-gray-800">Announcements of new regulated product lines (crypto custody, lending, tokenized assets) that require licence variation or new authorisation.</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Target Contact Identification Within Enterprise</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">For each enterprise target, identify and track the following stakeholders:</p>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Primary Decision-Makers (outreach first)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Chief Compliance Officer (CCO)</li>
                    <li className="text-justify">General Counsel (GC) / Head of Legal</li>
                    <li className="text-justify">Head of Regulatory Affairs</li>
                    <li className="text-justify">Chief Risk Officer (CRO)</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Secondary Influencers (engage after primary)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">CFO (controls advisory spend approval)</li>
                    <li className="text-justify">CEO / MD (final mandate sign-off)</li>
                    <li className="text-justify">Head of Strategy or Business Development</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Outreach & Engagement Workflow</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Enterprise Target List Build (Weekly)</h3>
                  <p className="text-justify">Identify 5–10 enterprise targets per week using the signal system above. For each target, map the org chart (CCO, GC, CFO) in CRM. Score by urgency: MiCA deadline = Tier 1, active expansion announced = Tier 1, funding round = Tier 2, general expansion interest = Tier 3.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — LinkedIn Connection to CCO / GC</h3>
                  <p className="text-justify">Connect with the primary decision-maker first. Reference a specific regulatory challenge relevant to their firm.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"With the MiCA CASP deadline approaching, I've been working with several compliance teams on the transition architecture — entity restructuring, banking, and application preparation across multiple jurisdictions. Thought it might be useful to connect given what [Company] is navigating."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Technical Asset Delivery</h3>
                  <p className="text-justify">Send one highly relevant technical document immediately after connecting. Enterprise compliance professionals evaluate advisors on technical depth — the document quality signals capability before any conversation.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Sharing our MiCA CASP Transition Architecture Brief — covers the 8-step application roadmap, entity structure requirements, banking considerations, and timeline planning for firms currently operating under national registrations. Useful context if you're currently mapping the transition."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Enterprise Discovery Call (60 minutes)</h3>
                  <p className="text-justify mb-2">A structured 60-minute call covering the full regulatory expansion picture:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Current licensing footprint (jurisdictions, licence types, entity structure)</li>
                    <li className="text-justify">Target expansion jurisdictions and timeline</li>
                    <li className="text-justify">Internal compliance team capacity and gaps</li>
                    <li className="text-justify">Banking relationships across entities</li>
                    <li className="text-justify">Regulatory deadlines and board-level commitments</li>
                    <li className="text-justify">Budget parameters for external advisory</li>
                    <li className="text-justify">Prior experience with external licensing advisors</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Outcome: full picture of the mandate scope. Multi-phase proposal delivered within 5 business days.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Multi-Phase Enterprise Proposal</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-justify"><strong>Phase 1 — Licensing Roadmap & Architecture:</strong> Full regulatory mapping across all target jurisdictions, entity structure design, banking feasibility assessment — $X</p>
                    <p className="text-justify mt-2"><strong>Phase 2 — Jurisdiction-by-Jurisdiction Execution:</strong> Application preparation, regulator liaison, documentation, entity formation per jurisdiction — $X per jurisdiction</p>
                    <p className="text-justify mt-2"><strong>Phase 3 — Banking & Compliance Infrastructure:</strong> Banking onboarding across new entities, AML/MLRO build-out, substance arrangement — $X</p>
                    <p className="text-justify mt-2"><strong>Phase 4 — Annual Compliance Retainer:</strong> Ongoing maintenance across all licensed entities, renewal management, regulatory change monitoring — $X/year</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Mandate Execution & Relationship Governance</h3>
                  <p className="text-justify">Assign a dedicated Boyar engagement lead. Establish monthly reporting cadence to CCO/GC. Create a shared regulatory calendar tracking all deadlines, submission windows, and renewal dates across every licensed entity in the group.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Enterprise Content Strategy</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Enterprise compliance professionals consume technical content. Generic offshore marketing does not reach them. Publish the following monthly:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>MiCA Transition Tracker:</strong> Monthly update on CASP application volumes, jurisdiction-specific timelines, and regulator stance changes across EU member states.</li>
                  <li className="text-justify"><strong>Multi-Jurisdiction Licensing Matrix:</strong> Quarterly update comparing licence requirements, timelines, capital, and banking access across Boyar's 15 core licensing jurisdictions.</li>
                  <li className="text-justify"><strong>Regulatory Change Bulletin:</strong> Bi-monthly summary of material regulatory changes affecting VASP, EMI, fund, and iGaming licences across key jurisdictions.</li>
                  <li className="text-justify"><strong>Case Architecture Briefs:</strong> Anonymised case studies of multi-jurisdiction licensing rollouts — showing the structural, banking, and compliance architecture Boyar uses for complex enterprise engagements.</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                  <p className="text-justify font-semibold">Distribution: LinkedIn (Inderjeet's profile), direct email to CCO/GC contacts in CRM, and industry newsletter placements in fintech and crypto compliance publications.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Always start with a Licensing Roadmap phase before execution</p>
                  <p className="text-justify">Enterprise mandates must begin with a structured mapping phase. Jumping to execution without a full regulatory architecture review creates liability and scope disputes.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Each jurisdiction is a separate scoped phase</p>
                  <p className="text-justify">Never price multi-jurisdiction rollouts as a single flat fee. Each jurisdiction has different complexity, timelines, and risk — price and scope each separately.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — KYC the enterprise group, not just the entity</p>
                  <p className="text-justify">Enterprise group KYC must cover all UBOs across the group structure, including parent entities, holding companies, and significant shareholders. Group-level AML risk assessment is mandatory.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Maintain written engagement governance throughout</p>
                  <p className="text-justify">Enterprise mandates require formal engagement letters, scope change documentation, and monthly reporting. Verbal scope expansions are not acceptable at enterprise level.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Enterprise discovery calls booked per month</li>
                    <li className="text-justify text-sm">Multi-phase proposals issued and close rate</li>
                    <li className="text-justify text-sm">Average enterprise mandate value</li>
                    <li className="text-justify text-sm">Annual retainer clients under management</li>
                    <li className="text-justify text-sm">Jurisdictions executed per enterprise client</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">CCO / GC connection acceptance rate</li>
                    <li className="text-justify text-sm">Technical content engagement (downloads, shares)</li>
                    <li className="text-justify text-sm">Enterprise peer referrals received</li>
                    <li className="text-justify text-sm">MiCA pipeline value (total mandates in scope)</li>
                    <li className="text-justify text-sm">Average time from first contact to mandate signed</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>8. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Enterprise signal detected → Technical content delivered to CCO/GC → Discovery call → Multi-phase proposal → Licensing roadmap executed → Jurisdiction-by-jurisdiction rollout → Annual retainer across all entities → Enterprise peer referral. One enterprise client = $150K–$500K initial mandate + $80K–$200K annual recurring. Three enterprise clients under retainer = a stable $240K–$600K annual recurring revenue base independent of new client acquisition.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // FinTech API Ecosystem Funnels
  if (isFintechApiEcosystemModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">FinTech API Ecosystem Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                FinTech API Ecosystem Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools & Infrastructure Required</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner relationship CRM</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot (partner pipeline), Notion partner tracker</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">API provider discovery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, Crunchbase, product directories</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Referral tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot referral source field, Notion referral log</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Co-branded content creation</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion, Figma, Canva Pro for partner collateral</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Partner communication</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Slack shared channels, WhatsApp, encrypted email</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Referral agreement management</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">DocuSign, encrypted Drive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. API Provider Target List & Prioritisation</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Build a tiered target list of API providers. Approach Tier 1 first — highest referral volume potential, most accessible partnership teams.</p>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 1 — KYC / AML Technology Vendors</p>
                  <p className="text-justify">Sumsub, Onfido, Sardine, Jumio, Veriff. Their clients are already building regulated products and need compliant AML frameworks — Boyar solves their immediate blocker. Partnership managers are highly motivated to refer.</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 1 — Crypto Infrastructure Providers</p>
                  <p className="text-justify">Fireblocks, BitGo, Copper, Alchemy, Chainalysis. Their clients need VASP licensing and compliant entity structures before accessing custody or trading infrastructure. Direct mandate pipeline.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Tier 2 — Banking-as-a-Service Platforms</p>
                  <p className="text-justify">Railsr, Swan, Solaris, Treezor, Modulr. Clients building on BaaS infrastructure need EMI/PI licences and compliant corporate structures. Longer partnership sales cycle but very high referral volume once established.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Tier 3 — Payment Processing APIs & FX Providers</p>
                  <p className="text-justify">Stripe Treasury, Adyen for Platforms, Currencycloud. Clients require appropriate licensing for their payment or FX use case. Slower referral activation but high mandate values per referral.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Partnership Development Workflow (End-to-End)</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Identify Partnership Manager at Target Provider</h3>
                  <p className="text-justify">Search LinkedIn for "Partnerships", "Business Development", "Partner Success", or "Ecosystem" roles at each target provider. These individuals are the correct entry point — not the CEO or sales team.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — LinkedIn Connection with Partnership Framing</h3>
                  <p className="text-justify">Connect with a message that leads with what Boyar does for their clients — not what Boyar wants from the provider.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"We work with fintech builders on licensing, entity structure, and banking — specifically the compliance architecture they need before integrating infrastructure like [Provider Name]. We've been thinking about how we might add value to your client onboarding process. Happy to connect and explore."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Partnership Discovery Call (30 minutes)</h3>
                  <p className="text-justify mb-2">A structured call to understand the provider's client base and onboarding pain points:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">What types of businesses are integrating your API?</li>
                    <li className="text-justify">What regulatory or compliance issues delay your clients' go-live?</li>
                    <li className="text-justify">Do you currently refer clients to external advisors for licensing or AML?</li>
                    <li className="text-justify">What does your ideal partner ecosystem look like?</li>
                    <li className="text-justify">What would make this a mutually beneficial relationship?</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Co-Produced Content Proposal</h3>
                  <p className="text-justify">Propose co-authoring a guide that helps the provider's clients get ready to integrate their API. This gives the provider valuable content and positions Boyar as the recommended advisory partner.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">Examples: "How to Get Licensed Before Integrating [Provider] Custody Infrastructure" / "The AML Framework Your Business Needs Before Going Live on [Provider]" / "Licensing Roadmap for Businesses Building on [Provider] BaaS Platform."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Partner Listing & Referral Agreement</h3>
                  <p className="text-justify">Formalise the partnership with a simple referral agreement covering: referral fee structure (typically 5–8% of mandate fees), referral process, confidentiality, and partner listing on the provider's website or partner directory. Boyar lists the provider as a recommended infrastructure partner in return.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Referral Client Intake & Mandate Conversion</h3>
                  <p className="text-justify mb-2">When a referral arrives from the API provider:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Respond within 4 business hours — speed signals professionalism to the client and the referring provider</li>
                    <li className="text-justify">Run a 45-minute licensing and structuring diagnostic covering business model, target market, licence type, entity needs, and banking requirements</li>
                    <li className="text-justify">Issue a phased mandate proposal within 48 hours</li>
                    <li className="text-justify">Update the API provider's partnership team on progress — maintaining the relationship loop is essential for continued referral flow</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 7 — Partner Relationship Maintenance (Monthly)</h3>
                  <p className="text-justify">Send a monthly partner update to each API provider's partnership team: number of referrals processed, mandates in progress, client milestones reached (licence approved, banking opened, entity formed). This keeps Boyar top of mind and demonstrates the value the partnership is generating for the provider's clients.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Referral Client Mandate Structure</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">API ecosystem referral clients follow a predictable mandate structure — use this as the standard proposal framework for all referrals:</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Phase 1 — Entity & Structure Setup</p>
                  <p className="text-justify">Incorporate the correct legal entity in the optimal jurisdiction for the client's use case and the API provider's requirements. Typical jurisdictions: Lithuania (EMI/VASP), Malta (EMI/VASP/iGaming), Seychelles (VASP/Forex), BVI (holding), UAE (VASP/payment). Fees: $3K–$12K.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Phase 2 — Regulatory Licensing</p>
                  <p className="text-justify">Prepare and submit the licence application for the relevant regulatory regime (EMI, PI, VASP, MSB). Includes UBO compliance, AML programme design, MLRO appointment, and regulator liaison throughout the process. Fees: $25K–$80K depending on licence type and jurisdiction.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Phase 3 — Banking & Payment Rails</p>
                  <p className="text-justify">Introduce client to appropriate banking partners, EMI account providers, or IBAN issuers compatible with their business model and the API provider's settlement requirements. Fees: $3K–$8K.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Phase 4 — AML Framework Build</p>
                  <p className="text-justify">Produce the compliant AML/CFT policy, KYC procedures, transaction monitoring framework, and MLRO oversight structure required by the API provider before go-live. Fees: $5K–$15K.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Phase 5 — Ongoing Compliance Retainer</p>
                  <p className="text-justify">Annual compliance maintenance: licence renewal, regulatory reporting, AML policy updates, banking relationship management. Fees: $1.5K–$4K/month.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Content Strategy to Support API Provider Partnerships</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Co-branded integration guides:</strong> One per API provider partner — distributed through the provider's client onboarding materials, newsletters, and partner directory.</li>
                  <li className="text-justify"><strong>LinkedIn content targeting fintech builders:</strong> Weekly posts addressing the regulatory questions faced by businesses building on payment, crypto, and BaaS APIs — establishes Boyar's authority in the developer/builder community.</li>
                  <li className="text-justify"><strong>API-specific licensing explainers:</strong> "What licence do you need to use [BaaS / crypto custody / payment API]?" — format easily shareable by API provider partner teams to their clients.</li>
                  <li className="text-justify"><strong>Monthly regulatory update for partner clients:</strong> A short update on regulatory changes affecting the fintech API ecosystem — distributed via the partner's newsletter or shared directly with their client base.</li>
                </ul>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — All referral arrangements must be formally documented</p>
                  <p className="text-justify">No verbal referral arrangements. Every API provider partnership requires a signed referral agreement before any client introductions are accepted.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Full KYC before any referral client mandate begins</p>
                  <p className="text-justify">API provider referral does not bypass Boyar's own KYC/AML screening. Every referred client undergoes full UBO disclosure and risk assessment before engagement letters are signed.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Respond to every referral within 4 business hours</p>
                  <p className="text-justify">Slow response to API provider referrals damages the partner relationship. A 4-hour maximum response commitment must be maintained for every inbound referral from an active partner.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Monthly partner reporting is non-negotiable</p>
                  <p className="text-justify">Partners who do not receive regular updates on referred client progress will stop referring. Monthly partner updates must be sent consistently regardless of pipeline volume.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Active API provider partnerships</li>
                    <li className="text-justify text-sm">Referrals received per partner per month</li>
                    <li className="text-justify text-sm">Referral-to-mandate conversion rate</li>
                    <li className="text-justify text-sm">Average mandate value per referral client</li>
                    <li className="text-justify text-sm">Recurring retainer clients from API channel</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Co-branded content pieces published</li>
                    <li className="text-justify text-sm">Partner directory listings secured</li>
                    <li className="text-justify text-sm">Average referral response time</li>
                    <li className="text-justify text-sm">Partner satisfaction score (monthly check-in)</li>
                    <li className="text-justify text-sm">Total pipeline value from API channel</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>8. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Partnership manager identified → Discovery call → Co-branded content produced → Referral agreement signed → Partner listing activated → Referrals arrive pre-qualified → Licensing diagnostic → Phased mandate (entity + licence + banking + AML) → Client goes live on API platform → Partner sends next referral. Three active API partnerships each producing 8–12 referrals per quarter = 24–36 pre-qualified mandates per quarter at $35K–$100K average value. This channel requires the least ongoing prospecting effort of any Boyar acquisition model once partnerships are established.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Tokenization + Structuring Hybrid Funnels
  if (isTokenizationStructuringHybridModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Tokenization + Structuring Hybrid Funnels</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Tokenization + Structuring Hybrid Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools & Infrastructure Required</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM / mandate tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot, Notion (multi-phase mandate tracker)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Prospect identification</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator, RWA community monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Architecture design & delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Figma / Miro (structure diagrams), Notion (client workspace)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Regulatory monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">ESMA MiCA tracker, VARA updates, Cayman CIMA feed</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Secure document management</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Encrypted Drive, DocuSign, ProtonMail for sensitive comms</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Content distribution</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn, Mirror.xyz, Substack, RWA Telegram groups</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. Hybrid Client Signal Detection</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Hybrid mandate clients broadcast clear signals. Monitor these weekly across LinkedIn, RWA communities, and crypto/fintech news:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">RWA tokenization announcements</p>
                    <p className="text-sm text-gray-800">Developers, fund managers, or family offices publicly exploring tokenization of real estate, PE interests, or commodities.</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">MiCA retroactive compliance signals</p>
                    <p className="text-sm text-gray-800">Existing token projects posting about MiCA transition challenges — often indicates both a token framework problem and a structural gap underneath it.</p>
                  </div>
                  <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Fund tokenization exploration</p>
                    <p className="text-sm text-gray-800">GPs or LPs discussing tokenized fund interests, secondary liquidity mechanisms, or on-chain fund administration.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Complex Web3 architecture questions</p>
                    <p className="text-sm text-gray-800">Founders posting about multi-entity crypto structures — foundation + opco + token — indicating they need the full hybrid architecture designed.</p>
                  </div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Family office digital asset allocation signals</p>
                    <p className="text-sm text-gray-800">UHNW family office representatives posting about integrating tokenized assets into their portfolio structures.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-gray-900 text-sm">Syndicate and launchpad referrals</p>
                    <p className="text-sm text-gray-800">Projects referred through tokenization dealflow syndicate relationships whose complexity exceeds a pure token advisory scope.</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Outreach & Engagement Workflow</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 1 — Signal Detection & Prospect Logging</h3>
                  <p className="text-justify">Weekly: identify 5–10 hybrid mandate prospects via the signals above. Log in CRM with asset class (real estate / fund / commodity / Web3), trigger signal, and complexity score (1 = simple hybrid, 3 = multi-entity, multi-jurisdiction, multi-licence). Tier 1 prospects receive outreach within 48 hours of signal detection.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 2 — Precision Connection Request</h3>
                  <p className="text-justify">Reference the specific intersection of structuring and tokenization in the connection note. Signal that Boyar understands both layers simultaneously.</p>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Noticed your recent posts on RWA tokenization — we work specifically on the intersection of corporate architecture and token frameworks, which is where most projects run into structural gaps. Happy to connect and share how we approach the foundation + SPV + token layer as a single integrated design."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 3 — Integrated Architecture Asset Delivery</h3>
                  <p className="text-justify">Send a relevant architecture diagram or hybrid framework document immediately after connecting. This is the primary trust-building mechanism for this client type.</p>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">"Sharing our integrated architecture framework for tokenized asset structures — shows how the foundation governance, SPV layer, token issuance mechanism, and MiCA compliance interact. Useful reference whether you're at early planning stage or already mid-execution."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 4 — Free Hybrid Architecture Diagnostic (45 minutes)</h3>
                  <p className="text-justify mb-2">The highest-converting call format in Boyar's toolkit for this client type. Cover both layers simultaneously:</p>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="font-semibold text-gray-900 text-sm mb-1">Corporate Structure Layer</p>
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Jurisdiction selection rationale</li>
                        <li>• Foundation vs trust vs company governance</li>
                        <li>• SPV architecture for asset holding</li>
                        <li>• UBO and ownership structure</li>
                        <li>• Banking and treasury requirements</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="font-semibold text-gray-900 text-sm mb-1">Token Framework Layer</p>
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Token classification (utility / security / ART / EMT)</li>
                        <li>• Applicable regulatory regime (MiCA / securities law)</li>
                        <li>• VASP/CASP licensing requirements</li>
                        <li>• Whitepaper and disclosure obligations</li>
                        <li>• Investor onboarding and AML framework</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-justify mt-3 font-semibold">Outcome: integrated architecture recommendation delivered verbally. Full written architecture brief and phased proposal within 5 business days.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 5 — Phased Hybrid Mandate Proposal</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-justify"><strong>Phase 1 — Architecture Design:</strong> Full integrated structure and token framework design document — jurisdiction selection, entity map, governance model, token classification, regulatory pathway. Delivered as a written brief. $X</p>
                    <p className="text-justify mt-2"><strong>Phase 2 — Corporate Structure Execution:</strong> Foundation/trust formation, SPV incorporation, UBO compliance, banking introductions. $X</p>
                    <p className="text-justify mt-2"><strong>Phase 3 — Token Framework & Regulatory:</strong> Whitepaper advisory, regulatory classification sign-off, VASP/CASP licence application, AML/KYC framework build. $X</p>
                    <p className="text-justify mt-2"><strong>Phase 4 — Banking & Treasury:</strong> Banking introductions across all entities, settlement account setup, treasury management framework. $X</p>
                    <p className="text-justify mt-2"><strong>Phase 5 — Ongoing Advisory Retainer:</strong> Annual compliance maintenance, licence renewal, regulatory change monitoring, corporate governance support. $X/month</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Stage 6 — Mandate Execution with Integrated Project Management</h3>
                  <p className="text-justify">Assign a single Boyar engagement lead who coordinates both the corporate structure workstream and the token framework workstream simultaneously. Establish a shared Notion workspace with the client showing all phase milestones, regulatory deadlines, and banking timelines in one place. Weekly status updates to the client's founding team.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Content Strategy (Hybrid Architecture Authority Engine)</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Content for this model must demonstrate simultaneous mastery of both the corporate and token layers. Generic tokenization content or generic structuring content will not attract hybrid mandate clients.</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Integrated architecture diagrams:</strong> Monthly LinkedIn carousel showing a complete hybrid structure for a specific use case — real estate tokenization, PE fund tokenization, commodity tokenization. Visual, technical, immediately useful to the target audience.</li>
                  <li className="text-justify"><strong>MiCA retroactive restructuring guides:</strong> "How to build the corporate architecture your token project should have had from day one" — targets the large segment of existing token projects with structural gaps now exposed by MiCA.</li>
                  <li className="text-justify"><strong>RWA tokenization jurisdiction comparison:</strong> Quarterly comparison of Cayman, Liechtenstein, Luxembourg, BVI, and UAE for hybrid structure + token issuance — covering legal treatment, tax, banking, and regulatory compatibility in a single framework.</li>
                  <li className="text-justify"><strong>Case architecture briefs:</strong> Anonymised summaries of hybrid mandate architecture — showing the multi-layer structure Boyar designed without identifying the client. These produce more inbound inquiries than any other content format for this audience.</li>
                </ul>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Architecture Design phase is mandatory before execution</p>
                  <p className="text-justify">No hybrid mandate proceeds to entity formation or token framework execution without a completed, signed-off Architecture Design document. Skipping this phase creates structural conflicts that are expensive and disruptive to correct mid-mandate.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Token classification must be confirmed before any corporate structure is finalised</p>
                  <p className="text-justify">The regulatory classification of the token (utility, security, ART, EMT) directly determines which corporate structure and which jurisdiction is optimal. Finalising the corporate structure before confirming token classification is a sequencing error that creates significant rework risk.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Full group KYC including all UBOs and token allocation recipients</p>
                  <p className="text-justify">Hybrid mandates often involve complex beneficial ownership structures across multiple entities. KYC must cover all UBOs at the corporate layer and all significant token allocation recipients at the token layer before any work begins.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Boyar does not advise on token pricing, tokenomics design, or investment returns</p>
                  <p className="text-justify">Boyar's scope is structure, compliance, licensing, and banking. Token pricing, tokenomics models, and investment return projections are outside scope and must not be commented on in any client communication.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Hybrid diagnostics booked per month</li>
                    <li className="text-justify text-sm">Architecture Design briefs issued</li>
                    <li className="text-justify text-sm">Full hybrid mandates won per quarter</li>
                    <li className="text-justify text-sm">Average total mandate value per hybrid client</li>
                    <li className="text-justify text-sm">Ongoing advisory retainers from hybrid clients</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Architecture diagram engagement on LinkedIn</li>
                    <li className="text-justify text-sm">Inbound inquiries from RWA communities</li>
                    <li className="text-justify text-sm">Referrals from tokenization dealflow syndicates</li>
                    <li className="text-justify text-sm">Case architecture brief downloads</li>
                    <li className="text-justify text-sm">Average phases per hybrid mandate</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Integrated architecture content published → Hybrid mandate signal detected → Precision outreach with architecture asset → Free hybrid diagnostic → Architecture Design brief → Phased mandate execution (structure + token framework + banking + licensing) → Ongoing advisory retainer → Referral to next hybrid client in same RWA or family office network. One hybrid mandate = $120K–$400K total fees. Three active hybrid clients under retainer = $360K–$1.2M in committed annual advisory revenue from the most sophisticated and durable client relationships Boyar can build.
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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
                  onClick={() => router.back()}
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

  // AI-Based Prospect Scoring
  if (isAiProspectScoringModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">AI-Based Prospect Scoring & Personalization</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                AI-Based Prospect Scoring & Personalization
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools Stack</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Function</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tool</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Prospect database</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Apollo.io</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Company data, contact details, intent signals</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Social signal monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Activity alerts, post monitoring, connection triggers</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Message personalisation</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Claude / ChatGPT</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Generate bespoke outreach messages per prospect</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">CRM & scoring tracker</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion + HubSpot</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Score tracking, pipeline staging, follow-up scheduling</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">News & regulatory alerts</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Alerts, Feedly</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Real-time detection of regulatory events affecting prospects</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Email sequencing</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot Sequences / Lemlist</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Automated follow-up delivery at optimal intervals</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Performance analytics</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">HubSpot reports, Notion dashboards</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Track response rates, conversion by segment, message performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. The Scoring System</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Every prospect in the CRM receives a score from 0–100, updated weekly. The score determines outreach priority for that week. Use this scoring matrix:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Signal</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Posted about MiCA / VARA / licensing challenge in last 7 days</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+30</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Announced fundraise or market expansion in last 14 days</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+25</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Engaged with Boyar's LinkedIn content (like / comment / share)</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+20</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Posted about banking challenges or corporate structure questions</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+20</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Hired for compliance / regulatory / legal role in last 30 days</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+15</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Seniority: Founder / CEO / CFO / GC / CCO</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+10</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Industry: crypto / fintech / fund management / trading</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+10</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Company size: 10–500 employees</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+5</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Previously opened Boyar email or clicked link</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+10</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">Referred by a Boyar partner or existing client</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">+25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Score 70–100</p>
                    <p className="text-sm text-gray-800">Outreach within 24 hours. Founder-led, fully personalised.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Score 40–69</p>
                    <p className="text-sm text-gray-800">Outreach this week. AI-personalised message, founder reviews before sending.</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <p className="font-semibold text-gray-900 text-sm">Score 0–39</p>
                    <p className="text-sm text-gray-800">Nurture track. Add to content distribution list. Re-score next week.</p>
                  </div>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Weekly Scoring & Personalisation Process</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Monday — Score Update (30 minutes)</h3>
                  <p className="text-justify">Review all active prospects in CRM. Update scores based on last week's signals (new LinkedIn activity, content engagement, company news). Identify all prospects scoring 70+ — these are this week's priority outreach list. Flag any prospect whose score has jumped by 20+ points — these require same-day outreach.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Monday — AI Personalisation Batch (20 minutes)</h3>
                  <p className="text-justify mb-2">For each priority prospect, paste the following into Claude or ChatGPT:</p>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mt-2">
                    <p className="text-gray-800 text-sm font-semibold mb-1">Prompt template:</p>
                    <p className="text-gray-800 text-sm italic">"Write a personalised LinkedIn connection request and a follow-up message for a prospect with the following profile: [Name], [Title] at [Company], operating in [industry], recently posted about [signal], company is based in [location] and appears to be expanding to [destination]. Boyar Partners offers [relevant service]. Tone: professional, technically credible, not salesy. Max 300 characters for connection request, max 150 words for follow-up message."</p>
                  </div>
                  <p className="text-justify mt-2">Review, lightly edit for authenticity, load into CRM. Total time per prospect: 3–4 minutes.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Tuesday–Thursday — Outreach Execution</h3>
                  <p className="text-justify">Send connection requests and follow-up messages from the Monday batch. Maximum 20–25 LinkedIn actions per day to stay within LinkedIn's activity limits. Log every action in CRM with timestamp and message sent.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Friday — Performance Review (20 minutes)</h3>
                  <p className="text-justify mb-2">Review the week's outreach performance:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Connection acceptance rate by segment</li>
                    <li className="text-justify">Reply rate by message type</li>
                    <li className="text-justify">Diagnostic calls booked from this week's outreach</li>
                    <li className="text-justify">Which message angles produced the highest response</li>
                    <li className="text-justify">Which prospect segments are converting and which are not</li>
                  </ul>
                  <p className="text-justify mt-2">Feed findings back into next week's scoring weights and message templates. The system improves every week.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. AI Personalisation Templates by Segment</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment: Crypto founder posting about MiCA</p>
                  <p className="text-gray-800 italic mt-1">"Noticed your recent post on MiCA — the CASP transition is creating real structural complexity for teams operating under national registrations. We've been mapping the application architecture across Malta, Lithuania, and Seychelles for teams at your stage. Happy to connect and share what's working."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment: Indian founder announcing UAE expansion</p>
                  <p className="text-gray-800 italic mt-1">"Congratulations on the UAE expansion — the entity and banking decisions at this stage have a significant impact on how smoothly the move lands. We work specifically with founders navigating this corridor. Happy to connect and share what we've seen work."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment: Fund manager posting about tokenized LP interests</p>
                  <p className="text-gray-800 italic mt-1">"Interesting post on tokenized fund structures — the intersection of Cayman LP architecture and MiCA-compliant token frameworks is where most of the structural complexity sits. We work on these hybrid mandates. Happy to connect and share the framework we use."</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Segment: CCO at regulated fintech — expansion hiring signal</p>
                  <p className="text-gray-800 italic mt-1">"Noticed [Company] is hiring for regulatory expansion roles — multi-jurisdiction licensing rollouts at scale require a different advisory model than single-jurisdiction work. We specialise in this. Happy to connect and share how we approach the architecture."</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Founder always reviews AI-generated messages before sending</p>
                  <p className="text-justify">AI generates drafts. The founder edits and approves every message before it is sent. No fully automated outreach — Boyar's reputation depends on every communication being genuinely considered.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — Maximum 20–25 LinkedIn actions per day</p>
                  <p className="text-justify">Exceeding LinkedIn's activity thresholds risks account restriction. Quality over volume — 20 highly personalised messages outperform 100 generic ones.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Score every prospect weekly without exception</p>
                  <p className="text-justify">The scoring system only works if scores are updated consistently. A prospect who scored 35 last week may score 75 this week after a regulatory announcement — without weekly updates, high-intent signals are missed.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Never use AI-generated messages verbatim for Tier 1 prospects</p>
                  <p className="text-justify">For prospects scoring 70+, AI drafts are starting points only. Every Tier 1 message must be personally reviewed and meaningfully edited to reflect genuine knowledge of the prospect's specific situation.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Connection acceptance rate (target: 35%+)</li>
                    <li className="text-justify text-sm">Reply rate to personalised messages (target: 15%+)</li>
                    <li className="text-justify text-sm">Diagnostic calls booked per week</li>
                    <li className="text-justify text-sm">Score-to-mandate conversion rate by tier</li>
                    <li className="text-justify text-sm">Average time from first contact to diagnostic call</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Best-performing message angle per segment</li>
                    <li className="text-justify text-sm">Highest-converting signal category</li>
                    <li className="text-justify text-sm">Average score of prospects who booked a call</li>
                    <li className="text-justify text-sm">Week-on-week improvement in response rate</li>
                    <li className="text-justify text-sm">Prospects rescued from cold status by re-scoring</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Weekly score update → Tier 1 prospects identified → AI generates personalised message batch → Founder reviews and sends in 30 minutes → Higher response rates across every channel → More diagnostic calls → More mandates → Performance data improves next week's scoring → Compounding improvement over time. At full operation: 20–25 personalised outreach actions per day, 35%+ acceptance rate, 15%+ reply rate, 3–5 diagnostic calls booked per week from outreach alone — at a total weekly time cost of under 2 hours for the founder.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Predictive Competitor Monitoring
  if (isPredictiveCompetitorMonitoringModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">Predictive Competitor Monitoring</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>
 
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Predictive Competitor Monitoring
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Tools Stack</h2>
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
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Competitor website monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Google Alerts, Visualping (page change detection)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn staff movement tracking</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn Sales Navigator (company follower + staff alerts)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Review and complaint monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Trustpilot, Google Reviews, Reddit, Trustpilot API</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Competitor content analysis</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">LinkedIn company pages, competitor blogs, SEMrush (optional)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Intelligence logging</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Notion competitor intelligence database</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Community monitoring</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800">Reddit (r/offshorebanking etc.), Telegram, LinkedIn groups</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. The Four Intelligence Tracks — Weekly Monitoring Process</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Track 1 — Competitor Positioning & Content (Every Monday, 20 minutes)</h3>
                  <p className="text-justify mb-2">Review the LinkedIn company pages and recent posts of Dixcart, Amicorp, Astons, Ocra, and Rosemont. Log in Notion:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">What topics are they publishing on this week?</li>
                    <li className="text-justify">What jurisdictions or services are they promoting?</li>
                    <li className="text-justify">What are they NOT publishing on — where are the gaps?</li>
                    <li className="text-justify">Is their content generic or technically specific?</li>
                    <li className="text-justify">What engagement are they receiving and on which topics?</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Output: identify 1–2 content gaps per week that Boyar can own with a more specific, more technical post on the same topic.</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Track 2 — Staff Movement Monitoring (Every Monday, 10 minutes)</h3>
                  <p className="text-justify mb-2">Check LinkedIn for recent departures from competitor firms. Set Sales Navigator alerts for all senior staff at each competitor. When a departure is detected:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Log the departure in Notion with the person's role, tenure, and apparent client relationships</li>
                    <li className="text-justify">Identify which client segments they managed based on their profile and published content</li>
                    <li className="text-justify">Flag their connections who are likely clients of that firm for priority outreach within 48 hours</li>
                  </ul>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-2">
                    <p className="text-gray-800 italic">Outreach to orphaned competitor clients: "Noticed there have been some changes at [Firm] recently — if you're evaluating your advisory arrangements, happy to have a brief conversation about how we approach [relevant service]."</p>
                  </div>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Track 3 — Client Dissatisfaction Monitoring (Every Wednesday, 15 minutes)</h3>
                  <p className="text-justify mb-2">Monitor these sources for competitor client complaints and dissatisfaction signals:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Trustpilot and Google Reviews</strong> — search each competitor name and read new negative reviews. Log recurring complaint themes.</li>
                    <li className="text-justify"><strong>Reddit</strong> — search r/offshorebanking, r/digitalnomad, r/expatfinance for mentions of competitors. Frustrated clients post publicly.</li>
                    <li className="text-justify"><strong>LinkedIn comments</strong> — monitor competitor posts for negative comments or complaints in the replies.</li>
                    <li className="text-justify"><strong>Telegram and WhatsApp groups</strong> — offshore and fintech communities frequently discuss service provider experiences.</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Output: log recurring complaint themes by competitor. Use these to write content that directly addresses those exact failure modes — "Why [problem] happens and how we approach it differently."</p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">Track 4 — Competitor Service & Pricing Intelligence (Monthly, 30 minutes)</h3>
                  <p className="text-justify mb-2">Monthly deep review of each competitor's:</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Website service pages — any new services, new jurisdictions, or removed offerings</li>
                    <li className="text-justify">Pricing signals — any public fee mentions, changes to minimum engagement thresholds</li>
                    <li className="text-justify">New hires — what roles are they hiring for? Indicates expansion direction.</li>
                    <li className="text-justify">Press releases and news — any new partnerships, office openings, or client announcements</li>
                  </ul>
                  <p className="text-justify mt-2 font-semibold">Output: monthly competitor intelligence brief (1-page Notion document) summarising material changes across all monitored competitors. Used to update Boyar's positioning and content calendar.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Converting Intelligence Into Content & Outreach</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Gap-fill content strategy</p>
                  <p className="text-justify">Each identified competitor content gap becomes a Boyar content piece. If no competitor is publishing technically precise MiCA CASP application guidance, Boyar publishes it. If no competitor is covering the banking access implications of Seychelles VASP registration, Boyar covers it. Own the gaps systematically, week by week.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Complaint-driven positioning content</p>
                  <p className="text-justify">Every recurring complaint theme about a competitor becomes a positioning asset for Boyar. "Slow execution timelines" → Boyar publishes "What a 90-day VASP licensing timeline actually looks like and how to compress it." "Lack of banking support" → Boyar publishes "The banking strategy that should be designed before your entity is formed." Never mention competitors by name — just solve the problems they leave unsolved.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Senior departure outreach</p>
                  <p className="text-justify">Within 48 hours of detecting a senior departure from a competitor: identify their likely client connections on LinkedIn, run those connections through Boyar's scoring model, and initiate personalised outreach to those scoring 50+. Timing is the entire advantage here — reach them during the instability window, not three months later.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Community dissatisfaction response</p>
                  <p className="text-justify">When a competitor client publicly complains in a community (Reddit, Telegram, LinkedIn) about a service failure: respond helpfully and professionally in the thread with relevant guidance — never pitch Boyar directly. Follow up with a private connection request offering to help further. The community sees Boyar as the firm that steps up when others fall short.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Notion Intelligence Database Structure</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Maintain a Notion database with the following tables:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Competitor Profiles:</strong> One page per competitor with strengths, weaknesses, service scope, pricing signals, key personnel, and last updated date</li>
                  <li className="text-justify"><strong>Weekly Intelligence Log:</strong> Date, competitor, intelligence item, category (content gap / staff movement / complaint / service change), and recommended Boyar action</li>
                  <li className="text-justify"><strong>Content Gap Tracker:</strong> Topics not covered by competitors that Boyar should own — with status (published / in draft / planned)</li>
                  <li className="text-justify"><strong>Orphaned Client Prospects:</strong> Prospects identified through staff departure monitoring — with outreach status and score</li>
                  <li className="text-justify"><strong>Complaint Theme Register:</strong> Recurring client complaint themes per competitor — used to inform Boyar's positioning content calendar</li>
                </ul>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Governance Controls</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 1 — Never name competitors negatively in public content</p>
                  <p className="text-justify">Boyar's content addresses problems and gaps — it never names competitors disparagingly. Naming competitors in negative contexts creates reputational and legal risk and reads as insecure. Position through superiority, not criticism.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 2 — All intelligence sources must be publicly available</p>
                  <p className="text-justify">No intelligence gathered through social engineering, false pretences, or access to non-public information. All monitoring is conducted through publicly visible sources only.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 3 — Outreach to orphaned competitor clients must be professional and non-predatory</p>
                  <p className="text-justify">Outreach to clients of firms experiencing disruption must be genuinely helpful in tone — offering value, not exploiting a competitor's misfortune. The message must stand on its own merits.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">Control 4 — Weekly monitoring is non-negotiable — intelligence decays rapidly</p>
                  <p className="text-justify">Staff departures detected three weeks late are useless. Content gaps filled two months after a competitor stops covering them are too late. The value of this model depends entirely on the timeliness and consistency of the monitoring cadence.</p>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. KPI System</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Content gaps identified and filled per month</li>
                    <li className="text-justify text-sm">Orphaned competitor clients contacted per month</li>
                    <li className="text-justify text-sm">Mandates won from competitor client outreach</li>
                    <li className="text-justify text-sm">Staff departures detected within 48 hours</li>
                    <li className="text-justify text-sm">Complaint themes converted into positioning content</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify text-sm">Competitor intelligence items logged per week</li>
                    <li className="text-justify text-sm">LinkedIn engagement on gap-fill content vs competitor content</li>
                    <li className="text-justify text-sm">Community responses generating inbound inquiries</li>
                    <li className="text-justify text-sm">Monthly competitor brief completed on schedule</li>
                    <li className="text-justify text-sm">Competitor positioning gaps currently owned by Boyar</li>
                  </ul>
                </div>
              </div>
            </section>
 
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Weekly monitoring → Content gaps identified → Boyar publishes what competitors don't → Dissatisfied competitor clients find Boyar's content → Inbound inquiry generated. Staff departure detected → Orphaned client outreach within 48 hours → High conversion rate. Complaint theme identified → Positioning content published → Boyar seen as the firm that solves what competitors leave broken. Total weekly time investment: 45 minutes. Total competitive advantage generated: Boyar systematically owns every gap its competitors leave open, in real time, week after week.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Algorithmic LinkedIn Content Distribution
  if (isAlgorithmicLinkedinContentModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">

          {/* Header */}
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">
                  Algorithmic LinkedIn Content Distribution
                </h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main
            className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8"
            style={{ textAlign: "left" }}
          >
            {/* Title Block */}
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1
                className="text-4xl font-bold mb-4 text-black"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Algorithmic LinkedIn Content Distribution
              </h1>
              <h2
                className="text-2xl font-semibold mb-2 text-gray-800"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Execution Playbook — Operational Blueprint for Boyar Partners
              </h2>
            </div>

            {/* Section 1: Tool Stack */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Required Tool Stack
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The tool stack for this model covers content production,
                  scheduling, performance analytics, engagement management,
                  and paid amplification. Each tool is selected for a specific
                  function — no single tool covers all layers.
                </p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-200">Function</th>
                        <th className="px-4 py-3 border-b border-gray-200">Tool</th>
                        <th className="px-4 py-3 border-b border-gray-200">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["LinkedIn profile performance analytics", "Shield Analytics", "Essential"],
                        ["Content scheduling & queue management", "Taplio or Buffer", "Essential"],
                        ["Carousel / document post design", "Canva Pro", "Essential"],
                        ["Content drafting & ideation", "Notion + Claude / ChatGPT", "Essential"],
                        ["Engagement pod coordination", "Lempod or manual WhatsApp group", "Essential"],
                        ["Hook testing & post optimisation", "Taplio AI or manual A/B log", "High priority"],
                        ["ABM signal cross-referencing", "Shield Analytics + HubSpot", "High priority"],
                        ["Paid amplification management", "LinkedIn Campaign Manager", "High priority"],
                        ["Hashtag performance tracking", "Shield Analytics", "Recommended"],
                        ["Content calendar planning", "Notion or Airtable", "Recommended"],
                        ["Competitor content monitoring", "Feedly + LinkedIn manual", "Recommended"],
                        ["Newsletter / long-form distribution", "LinkedIn Newsletter + Substack", "Optional"],
                      ].map(([func, tool, priority], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-2 border-b border-gray-100">{func}</td>
                          <td className="px-4 py-2 border-b border-gray-100 font-medium">{tool}</td>
                          <td className="px-4 py-2 border-b border-gray-100">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              priority === "Essential"
                                ? "bg-blue-100 text-blue-800"
                                : priority === "High priority"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify font-semibold">
                    Minimum viable stack (Month 1): Shield Analytics + Taplio
                    or Buffer + Canva Pro + Notion for content planning.
                    Add LinkedIn Campaign Manager from Month 2 when organic
                    winners are identified for paid amplification.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Profile Optimisation */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Profile Optimisation — The Foundation Before Publishing
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Before any content is published, both founder profiles must
                  be fully optimised. LinkedIn's algorithm favours posts from
                  profiles with complete, keyword-rich profiles because they
                  signal credibility and relevance to the platform's content
                  ranking system. An unoptimised profile suppresses distribution
                  before the first post goes live.
                </p>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Profile Checklist — Non-Negotiables</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        section: "Headline",
                        items: [
                          "Contains 3–4 core keywords matching ICP search behaviour",
                          "Example: 'Offshore Structuring | Licensing Advisory | Trust Services | Banking Access — Boyar Partners'",
                          "No fluffy descriptors (passionate, visionary, results-driven)",
                          "Keywords in headline directly improve discovery in LinkedIn search",
                        ],
                      },
                      {
                        section: "About Section",
                        items: [
                          "First 2 lines hook the reader before 'see more' cutoff",
                          "Covers: who Boyar serves, what problems solved, what makes it different",
                          "Includes social proof: jurisdictions covered, client types, specific outcomes",
                          "Ends with a clear but soft CTA (connect, message, or link to resource)",
                        ],
                      },
                      {
                        section: "Featured Section",
                        items: [
                          "3 featured items: one jurisdiction guide / framework PDF, one case study note, one 'start here' briefing",
                          "Featured section is the first thing visitors see after headline — it must demonstrate expertise immediately",
                          "Updated quarterly as new content assets are produced",
                        ],
                      },
                      {
                        section: "Experience & Skills",
                        items: [
                          "Current role description matches the headline keywords",
                          "Skills section includes: Corporate Structuring, Offshore Advisory, Trust Services, Licensing, Banking Advisory — top skills pinned",
                          "LinkedIn's algorithm uses skills for content topic matching and discovery",
                        ],
                      },
                    ].map(({ section, items }) => (
                      <div key={section} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="font-semibold text-sm text-gray-900 mb-2">{section}</p>
                        <ul className="list-disc ml-4 space-y-1 pl-0 text-sm text-gray-700" style={{ listStylePosition: "outside" }}>
                          {items.map((item, i) => (
                            <li key={i} className="text-justify">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Content Calendar System */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Content Calendar System — Monthly Planning Protocol
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Content is batch-produced monthly and scheduled in advance —
                  never written reactively on the day of posting. Reactive
                  posting produces inconsistent quality and breaks algorithm
                  momentum. The monthly planning session takes 2–3 hours and
                  produces a full calendar for the following 4 weeks.
                </p>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Monthly Content Planning Session Agenda</p>
                  <ol className="list-decimal ml-6 space-y-3 pl-0 text-gray-800" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">
                      <strong>Review last month's performance (30 mins):</strong> Which posts had the highest impressions, engagement rate, and comment quality? What topics resonated? What formats underperformed? Pull data from Shield Analytics.
                    </li>
                    <li className="text-justify">
                      <strong>Identify current regulatory and market events (20 mins):</strong> What is happening in the next 30 days that affects Boyar's ICP? FATF updates, jurisdiction changes, licensing news, banking environment shifts, fund regulation changes. Timely content consistently outperforms evergreen content.
                    </li>
                    <li className="text-justify">
                      <strong>Map content to ABM signal library (15 mins):</strong> Which intent signals are most active in the ABM system right now? Plan at least 2 posts that directly address those signals. If VASP licensing is trending in ABM, schedule a VASP post.
                    </li>
                    <li className="text-justify">
                      <strong>Draft content calendar (60 mins):</strong> Assign one post per slot in the schedule below. Confirm format, hook concept, and key insight for each post. Content does not need to be fully written — hooks and key points are enough for scheduling.
                    </li>
                    <li className="text-justify">
                      <strong>Assign production responsibilities (15 mins):</strong> Who writes which posts? Which posts require Canva design? Which are text-only? Confirm all assets will be ready 48 hours before scheduled post time.
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">Monthly Content Schedule Template</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800">
                      <thead className="bg-gray-100 text-gray-900">
                        <tr>
                          <th className="px-3 py-2 border-b border-gray-200">Week</th>
                          <th className="px-3 py-2 border-b border-gray-200">Post 1 (Mon/Tue)</th>
                          <th className="px-3 py-2 border-b border-gray-200">Post 2 (Thu/Fri)</th>
                          <th className="px-3 py-2 border-b border-gray-200">Format Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Week 1", "Jurisdiction comparison / framework", "Regulatory update or licensing news", "Document carousel + Text-only"],
                          ["Week 2", "Banking intelligence / VASP insight", "Counterintuitive take / myth-busting", "Text-only + Text-only"],
                          ["Week 3", "Anonymised case study / outcome", "Industry deep dive (crypto, funds, fintech)", "Text-only + Document carousel"],
                          ["Week 4", "Founder perspective / market opinion", "Poll or Q&A engagement post", "Text-only + Poll"],
                        ].map(([week, p1, p2, fmt], i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-3 py-2 border-b border-gray-100 font-semibold">{week}</td>
                            <td className="px-3 py-2 border-b border-gray-100">{p1}</td>
                            <td className="px-3 py-2 border-b border-gray-100">{p2}</td>
                            <td className="px-3 py-2 border-b border-gray-100 text-gray-600 text-xs">{fmt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Minimum: 8 posts per month across both founder profiles (4 each). Optimal: 12–16 posts per month for maximum algorithmic momentum.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Post Production SOP */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Post Production SOP — How Every Post Is Built
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Every post published under this model follows a defined
                  production process. No post goes live that has not been
                  through each step. The process takes 45–90 minutes per post
                  depending on format.
                </p>

                {[
                  {
                    step: "Step 1 — Define the Core Insight (5 mins)",
                    color: "bg-white border border-gray-200",
                    content: [
                      "What is the single most useful thing this post teaches the reader?",
                      "If you cannot state it in one sentence, the post does not have a clear enough insight — stop and refine before writing",
                      "The insight must pass the test: 'Could a Boyar ICP account not find this in 30 seconds of googling?' If yes, publish. If no, deepen or change the insight",
                      "Example of a passing insight: 'A BVI holding company triggers CFC rules in India under FEMA if the Indian founder holds more than 10% — most advisors miss this at the structuring stage'",
                    ],
                  },
                  {
                    step: "Step 2 — Write the Hook (15 mins)",
                    color: "bg-amber-50 border border-amber-200",
                    content: [
                      "Write 5 different hook options for the post before choosing one",
                      "Each hook must fit within 2 lines of the LinkedIn mobile preview (approximately 200 characters)",
                      "Hook types that consistently outperform: Counterintuitive statement, Specific statistic or number, Tension-framing ('Most advisors tell you X. Here is what they don't tell you'), Direct address to ICP pain ('If you're expanding into the UAE and haven't done this, read this first')",
                      "Choose the hook that creates the strongest pattern interrupt — the one that makes a CFO or founder stop scrolling in the first half-second",
                      "Never start a post with 'I am excited to share', 'In today's world', or any variation of 'We at Boyar Partners'",
                    ],
                  },
                  {
                    step: "Step 3 — Write the Body (20 mins)",
                    color: "bg-white border border-gray-200",
                    content: [
                      "Short paragraphs: maximum 2–3 lines per paragraph on desktop (1–2 on mobile). White space increases dwell time",
                      "Use line breaks between every idea — LinkedIn is not an essay platform",
                      "Structure options that perform well: Hook → Problem → Framework → Insight → CTA; Hook → List of insights (numbered) → Synthesis → CTA; Hook → Story / scenario → Lesson → CTA",
                      "Every body section must deliver value — no filler, no preamble, no lengthy context-setting",
                      "If the post is a document carousel, the body text introduces the carousel: '7 variables most founders get wrong when choosing their holding jurisdiction. I built this framework to fix that. Swipe →'",
                    ],
                  },
                  {
                    step: "Step 4 — Write the CTA (5 mins)",
                    color: "bg-white border border-gray-200",
                    content: [
                      "Every post ends with a CTA — but the CTA is never a hard sell",
                      "CTA hierarchy (in order of appropriateness): Ask a question to drive comments ('Which jurisdiction are you evaluating? Drop it below'); Invite them to save / share ('Save this for your next structuring meeting'); Offer a resource ('DM me and I'll send you the full framework'); Invite them to connect ('Follow for weekly structuring intelligence')",
                      "Never use: 'Book a call with us', 'Contact Boyar Partners today', 'Schedule a consultation' — these convert the post from expertise to advertisement and suppresses algorithmic distribution",
                      "The link to any external resource (guide, website, Calendly) always goes in the first comment — never in the post body",
                    ],
                  },
                  {
                    step: "Step 5 — Format & Design (15–30 mins for carousels; 5 mins for text-only)",
                    color: "bg-blue-50 border border-blue-200",
                    content: [
                      "Text-only posts: paste into LinkedIn's composer; confirm line breaks render correctly on mobile preview before publishing",
                      "Document carousels: design in Canva Pro using Boyar's brand colours and typography; maximum 10 slides; first slide is the hook in visual form; last slide is a summary + follow CTA",
                      "All carousel slides: consistent font, consistent colour palette, no stock photo backgrounds, no clip art — clean, professional, advisory-grade design",
                      "File format for carousels: PDF uploaded natively to LinkedIn (not a link to an external PDF). Native PDF uploads receive 3x more dwell time than linked documents",
                      "Video posts: recorded by founder, maximum 90 seconds, no green screen required — direct-to-camera is more credible than produced studio content for advisory positioning",
                    ],
                  },
                  {
                    step: "Step 6 — Hashtag Selection (5 mins)",
                    color: "bg-white border border-gray-200",
                    content: [
                      "Select exactly 3–5 hashtags per post. Never more than 5",
                      "Choose hashtags based on two criteria: relevance to the post topic, and whether Boyar's ICP accounts follow that hashtag",
                      "Do not use generic hashtags (#business, #growth, #success) — these are followed by billions of accounts, producing near-zero targeted distribution",
                      "Avoid hashtag repetition — vary hashtags across posts rather than using the same 5 every time. LinkedIn's algorithm deprioritises profiles that appear to be gaming hashtag discovery with static repetition",
                      "Place all hashtags at the very end of the post body — never embedded within the text",
                    ],
                  },
                  {
                    step: "Step 7 — Schedule & Timing (5 mins)",
                    color: "bg-white border border-gray-200",
                    content: [
                      "Schedule via Taplio or Buffer — never post manually unless posting in real-time for a breaking regulatory update",
                      "Optimal posting times for Boyar's ICP (based on LinkedIn global data for business-focused profiles): Tuesday 8–10am GMT / 9–11am UAE, Wednesday 9–11am GMT, Thursday 8–10am GMT",
                      "Avoid posting Friday afternoon, weekends, or outside 7am–12pm in target time zones — algorithm scores engagement relative to when posted; low-traffic windows reduce Stage 2 sample quality",
                      "Space posts minimum 48 hours apart — LinkedIn's algorithm suppresses same-account content that appears within 24 hours of a previous post",
                    ],
                  },
                ].map(({ step, color, content }) => (
                  <div key={step} className={`p-4 ${color} rounded-lg shadow-sm`}>
                    <p className="font-semibold text-gray-900 mb-2">{step}</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      {content.map((item, i) => (
                        <li key={i} className="text-justify">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Engagement Velocity Protocol */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Engagement Velocity Protocol — The 90-Minute Window
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The 60–90 minutes after a post goes live is the single most
                  critical period in its performance lifecycle. Everything in
                  this protocol is designed to maximise the quality and volume
                  of engagement during this window — which directly determines
                  how broadly LinkedIn distributes the post.
                </p>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">
                    The 90-Minute Launch Sequence
                  </p>
                  <ol className="list-decimal ml-6 space-y-4 pl-0 text-gray-800" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">
                      <strong>T+0 (Post goes live):</strong> The publishing
                      founder immediately posts a substantive first comment
                      beneath the post. This comment must add a new data point,
                      ask an open question, or extend the argument in the post.
                      It is not a summary — it is an addition. This seeds comment
                      activity before any other engagement arrives and signals
                      to the algorithm that the post is already generating
                      discussion. Place the external link (if any) in this first
                      comment.
                    </li>
                    <li className="text-justify">
                      <strong>T+5 mins:</strong> The second founder reacts to
                      the post with a comment (not a like — comments carry
                      more algorithmic weight). The comment must be at least
                      one full sentence and add genuine value or perspective to
                      the post topic.
                    </li>
                    <li className="text-justify">
                      <strong>T+10 mins:</strong> Notify the engagement pod
                      via the coordination channel (WhatsApp group or Lempod).
                      Share the post URL. Pod members engage within 15–30
                      minutes. Pod rule: every pod member comment must be
                      substantive (minimum 5 words, contextually relevant to
                      the post). Likes alone do not move the algorithm
                      meaningfully.
                    </li>
                    <li className="text-justify">
                      <strong>T+30 mins:</strong> Boyar's team members (if any)
                      and any relevant internal contacts engage with the post.
                      Share the post to relevant WhatsApp groups or Telegram
                      communities where ICP members are active — framed as
                      sharing a useful resource, not asking for engagement.
                    </li>
                    <li className="text-justify">
                      <strong>T+60–90 mins:</strong> Monitor Shield Analytics
                      or LinkedIn native analytics for impression velocity. If
                      the post is gaining traction (comment volume, profile
                      visits spiking), the publishing founder replies to every
                      comment received so far — LinkedIn's algorithm counts
                      reply comments as additional engagement signals, further
                      boosting distribution.
                    </li>
                    <li className="text-justify">
                      <strong>T+4 hours:</strong> If the post has performed
                      significantly above baseline (3x+ normal impressions),
                      flag it for paid amplification review. Begin LinkedIn
                      Campaign Manager boost targeting within 24 hours while
                      organic momentum is still active.
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                  <p className="text-justify">
                    <strong>Pod governance rule:</strong> Engagement pods work
                    only when every member genuinely reads the post before
                    commenting. A comment that is clearly unrelated to the post
                    content triggers LinkedIn's spam filter and can suppress
                    rather than boost distribution. Pod members must be briefed
                    on this — quality of comment is more important than speed
                    of comment.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Paid Amplification Protocol */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Paid Amplification Protocol — Boosting Organic Winners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Paid amplification is not used for every post — only for posts
                  that have already demonstrated organic resonance. This
                  approach dramatically outperforms running paid campaigns on
                  cold, untested content because the algorithm and the audience
                  have already validated the post's appeal.
                </p>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">
                    Amplification Trigger Thresholds
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800">
                      <thead className="bg-gray-100 text-gray-900">
                        <tr>
                          <th className="px-3 py-2 border-b border-gray-200">Metric</th>
                          <th className="px-3 py-2 border-b border-gray-200">Baseline (Avg Post)</th>
                          <th className="px-3 py-2 border-b border-gray-200">Amplification Trigger</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Impressions (48hrs)", "500–2,000", "3x baseline or above"],
                          ["Engagement rate", "2–4%", "Above 5%"],
                          ["Comment count", "3–8", "15+ substantive comments"],
                          ["Profile visits from post", "10–30", "60+ profile visits"],
                          ["Saves / bookmarks", "5–15", "30+ saves"],
                        ].map(([metric, baseline, trigger], i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-3 py-2 border-b border-gray-100">{metric}</td>
                            <td className="px-3 py-2 border-b border-gray-100 text-gray-600">{baseline}</td>
                            <td className="px-3 py-2 border-b border-gray-100 font-semibold text-green-700">{trigger}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">
                    LinkedIn Campaign Manager Setup — Amplification Campaign
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Campaign Objective",
                        desc: "Brand Awareness or Engagement — not Lead Generation. The goal is reach into ICP audiences, not clicks to a form. Lead conversion happens through the ABM follow-up process, not the ad itself.",
                      },
                      {
                        label: "Audience Targeting",
                        desc: "Job Title: Founder, CEO, CFO, General Counsel, Head of Compliance, Managing Partner, Fund Manager, Chief Investment Officer. Industry: Financial Services, Venture Capital, Cryptocurrency, Legal Services, Investment Management. Company Size: 10–500 employees. Geography: UAE, UK, Singapore, EU, USA, India (adjust based on post topic — a VASP post targets crypto-heavy regions; a trust post targets HNWI-heavy regions).",
                      },
                      {
                        label: "Ad Format",
                        desc: "Boost the organic post directly via 'Boost Post' in LinkedIn native, or create a Thought Leader Ad in Campaign Manager targeting the same post from the founder's personal profile. Thought Leader Ads consistently outperform company page-boosted posts for advisory firms because they retain the personal credibility of the founder's profile.",
                      },
                      {
                        label: "Budget & Duration",
                        desc: "USD 50–150 per boosted post. Run for 5–7 days — not longer, as diminishing returns appear after 7 days on most boosted posts. Prioritise frequency (5–8 impressions per target account per week) over broad reach. Concentrated repetition builds recognition faster than wide but thin distribution.",
                      },
                      {
                        label: "Post-Campaign Review",
                        desc: "After each boosted post, review: total impressions, click-through rate, profile visits generated, and whether any new ABM accounts appeared in HubSpot from the campaign. Boosted posts that generate ABM-qualifying engagement (ICP account viewed profile or connected) are logged as ABM-sourced leads.",
                      },
                    ].map(({ label, desc }) => (
                      <div key={label} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="font-semibold text-sm text-gray-900 mb-1">{label}</p>
                        <p className="text-sm text-justify text-gray-700">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Hook Library */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Hook Library — Proven Templates for Boyar Content
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The hook is the most important sentence in any LinkedIn post.
                  Below are 6 hook templates proven to stop scrolling for
                  Boyar's specific audience — each with an example customised
                  to Boyar's service lines.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      type: "Template 1 — The Counterintuitive Opener",
                      structure: "'[Common belief] is wrong. Here is what actually happens.'",
                      example: "'The Cayman Islands is not always the best choice for your fund. Here is the decision framework that changes the answer.'",
                      why: "Challenges existing knowledge — forces the reader to continue to find out why they are wrong.",
                      color: "bg-blue-50 border-l-4 border-blue-400",
                    },
                    {
                      type: "Template 2 — The Specific Number",
                      structure: "'[Specific number] of [ICP group] make this mistake. Are you one of them?'",
                      example: "'8 out of 10 fintech founders choose the wrong jurisdiction for their holding company. Here is the one they should have chosen.'",
                      why: "Specificity creates credibility. The number creates self-doubt — the reader wants to find out if they are in the 80%.",
                      color: "bg-green-50 border-l-4 border-green-400",
                    },
                    {
                      type: "Template 3 — The Direct Address",
                      structure: "'If you are [specific situation], you need to read this before [specific consequence].'",
                      example: "'If you are a VASP applicant in the UAE and your banking is not structured before you submit your licence application, here is what happens next.'",
                      why: "Speaks directly to a reader in a specific situation — maximum relevance for Tier 1 ABM accounts experiencing that situation.",
                      color: "bg-purple-50 border-l-4 border-purple-400",
                    },
                    {
                      type: "Template 4 — The Hidden Cost",
                      structure: "'Nobody talks about the cost of [common decision]. Here is what it actually costs.'",
                      example: "'Nobody talks about what a structuring mistake in Year 1 costs in Year 3. The number will surprise you.'",
                      why: "Creates urgency by surfacing a consequence the reader has not considered. Financial framing performs particularly well with CFO and founder audiences.",
                      color: "bg-amber-50 border-l-4 border-amber-400",
                    },
                    {
                      type: "Template 5 — The Framework Teaser",
                      structure: "'Here is the [X]-step framework [ICP group] use to [desired outcome]. Most advisors charge [amount] for this.'",
                      example: "'Here is the 5-variable framework CFOs use to decide between BVI and Cayman for their holding structure. Most law firms charge $5,000 for this analysis.'",
                      why: "Signals free, high-value expertise. 'Most advisors charge X' creates perceived value without a price tag on the post itself.",
                      color: "bg-red-50 border-l-4 border-red-400",
                    },
                    {
                      type: "Template 6 — The Regulatory Urgency Hook",
                      structure: "'[Regulatory change] just happened. Here is what it means for [ICP group] and what you need to do before [deadline].'",
                      example: "'The UAE just updated its VASP licensing requirements. Here is what changes for applicants already in the queue — and what it means for your timeline.'",
                      why: "Timeliness creates mandatory engagement — ICP accounts directly affected by the regulation must read the post to understand their exposure.",
                      color: "bg-indigo-50 border-l-4 border-indigo-400",
                    },
                  ].map(({ type, structure, example, why, color }) => (
                    <div key={type} className={`p-4 ${color} rounded-r-lg`}>
                      <p className="font-semibold text-gray-900">{type}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Structure:</span> <em>{structure}</em>
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Boyar Example:</span> "{example}"
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Why it works:</span> {why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 8: Weekly Operational Cadence */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Weekly Operational Cadence
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                {[
                  {
                    day: "Monday",
                    color: "bg-slate-50 border border-slate-200",
                    tasks: [
                      "Review Shield Analytics: weekend post performance, any late-breaking engagement",
                      "Confirm this week's scheduled posts are ready in Taplio / Buffer — check hooks, formatting, hashtags",
                      "Review ABM system: did any accounts engage with last week's content? Escalate if necessary",
                      "Prepare first comment for Tuesday post (written in advance, posted T+0 when post goes live)",
                    ],
                  },
                  {
                    day: "Tuesday",
                    color: "bg-blue-50 border border-blue-200",
                    tasks: [
                      "Post 1 goes live (8–10am GMT / 9–11am UAE). Execute 90-minute engagement velocity protocol immediately",
                      "Monitor through midday: are comments coming from ICP accounts? Respond to every comment within 2 hours",
                      "If post hits amplification threshold by end of day — flag for LinkedIn Campaign Manager boost",
                    ],
                  },
                  {
                    day: "Wednesday",
                    color: "bg-slate-50 border border-slate-200",
                    tasks: [
                      "Review Tuesday post analytics (24-hour snapshot): impressions, engagement rate, profile visits, follows",
                      "Identify any new accounts that engaged — cross-reference with ABM list; add if not already tracked",
                      "Begin drafting next week's posts if content calendar does not have them fully written",
                    ],
                  },
                  {
                    day: "Thursday",
                    color: "bg-green-50 border border-green-200",
                    tasks: [
                      "Post 2 goes live (8–10am GMT). Execute 90-minute engagement velocity protocol immediately",
                      "Monitor through midday — respond to all comments, reply to pod members' comments specifically",
                      "If running a paid boost on Tuesday's post — check campaign performance mid-week, adjust budget if needed",
                    ],
                  },
                  {
                    day: "Friday",
                    color: "bg-slate-50 border border-slate-200",
                    tasks: [
                      "Weekly analytics review in Shield Analytics: which post performed better this week and why?",
                      "Log the top-performing hook in the Hook Library — note what format, topic, and template it used",
                      "Identify any regulatory or market news from the week that should be turned into reactive content next week",
                      "Brief the engagement pod: share next week's tentative post schedule so pod members can plan their availability",
                    ],
                  },
                ].map(({ day, color, tasks }) => (
                  <div key={day} className={`p-4 ${color} rounded-lg shadow-sm`}>
                    <p className="font-semibold text-gray-900 mb-2">{day}</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      {tasks.map((task, i) => (
                        <li key={i} className="text-justify">{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Engagement Pod Setup & Rules */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Engagement Pod Setup & Operating Rules
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  An engagement pod is a group of professionals who commit to
                  engaging with each other's LinkedIn posts within the Stage 2
                  window. Done correctly, it is a legitimate mutual amplification
                  arrangement between complementary advisors. Done incorrectly,
                  it triggers LinkedIn's spam detection and suppresses
                  distribution.
                </p>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Who to Include in the Pod</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">
                      8–15 professionals maximum — larger pods produce lower
                      comment quality and increase spam risk
                    </li>
                    <li className="text-justify">
                      Ideal pod members: lawyers specialising in corporate or
                      tax law (complementary, not competing), accountants and
                      tax advisors, fintech / crypto advisors, banking
                      relationship managers, fund administrators, family office
                      advisors in non-overlapping service areas
                    </li>
                    <li className="text-justify">
                      Pod members should have LinkedIn profiles with 500+
                      connections and active posting histories — their
                      engagement carries more algorithmic weight than accounts
                      with thin profiles
                    </li>
                    <li className="text-justify">
                      Avoid adding direct competitors — even if the content
                      is non-competitive, the optics and future conflict risk
                      are not worth the marginal engagement benefit
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Non-Negotiable Pod Rules</p>
                  <div className="space-y-2">
                    {[
                      "Every comment must be substantive — minimum 5 words, contextually relevant to the post content. 'Great post!' is not acceptable and will be called out",
                      "Pod members must read the post before commenting — not just the hook. Off-topic comments damage the poster's credibility and can suppress distribution",
                      "Engagement must happen within 60 minutes of the post going live — engagement after 90 minutes has diminishing algorithmic value",
                      "Reciprocity is mandatory — if you receive pod engagement on your posts, you must engage with pod members' posts in return. Any member who consistently takes without giving is removed",
                      "No automation — all comments are written by the pod member personally. No bots, no Lempod auto-comments, no AI-generated pod responses",
                      "The pod coordination channel (WhatsApp group) is private — pod membership and coordination arrangements are not disclosed publicly",
                    ].map((rule, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="text-red-500 font-bold flex-shrink-0">→</span>
                        <span className="text-justify text-gray-700">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10: Content-ABM Integration Workflow */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                10. Content-to-ABM Integration Workflow
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Every post that earns engagement from an ICP-matched account
                  is an ABM event — not just a content metric. This workflow
                  ensures that LinkedIn content engagement feeds directly into
                  the ABM pipeline rather than being treated as a vanity metric.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      trigger: "Trigger 1 — ICP Account Likes or Saves a Post",
                      action: "Log in HubSpot. Add to Tier 3 awareness tracking. Flag for monitoring — if the same account engages with a second post, escalate to Tier 2.",
                      urgency: "Low",
                    },
                    {
                      trigger: "Trigger 2 — ICP Account Comments on a Post",
                      action: "Founder replies to the comment publicly (to drive further algorithmic distribution), then sends a personalised LinkedIn connection request within 24 hours referencing the comment. This is a warm outreach trigger — the account has self-identified as interested.",
                      urgency: "High",
                    },
                    {
                      trigger: "Trigger 3 — ICP Account Visits Founder Profile After Post",
                      action: "Shield Analytics captures profile visits from post. If the visitor matches ICP criteria, add to ABM Tier 2 immediately. Within 48 hours, send a LinkedIn connection request with a personalised note referencing a relevant insight from the post they viewed.",
                      urgency: "High",
                    },
                    {
                      trigger: "Trigger 4 — ICP Account Reshares a Post",
                      action: "A reshare is the strongest possible engagement signal — the account is voluntarily distributing Boyar's content to their network. Treat as Tier 1 immediately. Founder sends connection request within 24 hours + personalised message acknowledging the share and opening a relevant conversation.",
                      urgency: "Immediate",
                    },
                    {
                      trigger: "Trigger 5 — New Account Engages (Not Previously in ABM System)",
                      action: "Research the account within 48 hours. Score against ICP criteria. If it meets Tier 1 or Tier 2 threshold, add to the ABM system and initiate the appropriate outreach sequence. Content has surfaced a qualified account that manual prospecting would have missed.",
                      urgency: "Medium",
                    },
                  ].map(({ trigger, action, urgency }) => (
                    <div key={trigger} className={`p-4 rounded-lg shadow-sm border ${
                      urgency === "Immediate" ? "bg-red-50 border-red-200" :
                      urgency === "High" ? "bg-amber-50 border-amber-200" :
                      "bg-slate-50 border-slate-200"
                    }`}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-gray-900">{trigger}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          urgency === "Immediate" ? "bg-red-100 text-red-700" :
                          urgency === "High" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>{urgency}</span>
                      </div>
                      <p className="text-justify mt-2 text-sm text-gray-700">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 11: Governance Rules */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                11. Governance Rules — Non-Negotiables
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                {[
                  {
                    rule: "Rule 1 — Minimum 4 posts per founder profile per month, regardless of other pressures",
                    detail: "Algorithm momentum built over 6 months is destroyed by a 3-week posting gap. Content is batch-produced and scheduled in advance specifically to prevent this. If a founder is unavailable, pre-approved posts in the Taplio queue are published on schedule.",
                  },
                  {
                    rule: "Rule 2 — No promotional content in the post body",
                    detail: "Every post delivers value first. Service descriptions, pricing, calls to action linking to Boyar's website, and 'contact us' CTAs in post bodies are prohibited. LinkedIn's algorithm penalises promotional content. The audience disengages from it. All commercial information lives in comments, DMs, or profile links.",
                  },
                  {
                    rule: "Rule 3 — The 90-minute engagement protocol is executed for every post without exception",
                    detail: "A post without the first comment, pod notification, and team engagement in the first 90 minutes is algorithmically equivalent to a post with no distribution budget. The protocol is not optional — it is part of the post production process.",
                  },
                  {
                    rule: "Rule 4 — External links always in comments, never in post bodies",
                    detail: "LinkedIn's algorithm applies a reach penalty of approximately 30–50% to posts containing external URLs in the body. All links to Boyar's website, guides, Calendly, or any external resource are placed in the first comment only.",
                  },
                  {
                    rule: "Rule 5 — Every ICP engagement is logged in HubSpot within 48 hours",
                    detail: "Content-driven ABM intelligence is only useful if it is captured. Any ICP account that comments, reshares, or visits the founder profile after a post must be logged in HubSpot with the engagement type and date. Without this, the content-to-ABM integration workflow produces no pipeline.",
                  },
                  {
                    rule: "Rule 6 — Content quality never compromised for posting frequency",
                    detail: "If the monthly content calendar cannot be completed to quality standard in the available time, reduce frequency before reducing quality. Two excellent posts outperform eight mediocre ones — both algorithmically and in terms of ICP perception. Quality is the non-negotiable variable; frequency is the adjustable one.",
                  },
                ].map(({ rule, detail }) => (
                  <div key={rule} className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900">{rule}</p>
                    <p className="text-justify mt-1">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 12: KPI Dashboard */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                12. KPI Dashboard
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-3">Primary KPIs</p>
                    <div className="space-y-2">
                      {[
                        ["Avg impressions per post", "Month 1: 500+ → Month 6: 3,000+"],
                        ["Avg engagement rate", "> 3.5% (industry avg is 2%)"],
                        ["ICP account profile visits / month", "> 40 from content"],
                        ["New ABM accounts sourced from content", "5–10 / month"],
                        ["Posts hitting amplification threshold", "2–3 / month"],
                        ["Tier escalations from content engagement", "3–6 / month"],
                      ].map(([metric, target]) => (
                        <div key={metric} className="flex items-start justify-between text-sm gap-2">
                          <span className="text-gray-700">{metric}</span>
                          <span className="font-semibold text-green-700 text-right">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-3">Secondary KPIs</p>
                    <div className="space-y-2">
                      {[
                        ["LinkedIn connection requests accepted / month", "> 30 from content-warmed accounts"],
                        ["Comments from ICP accounts / month", "> 20"],
                        ["Reshares from ICP or adjacent accounts", "> 5 / month"],
                        ["Paid amplification ROAS (profile visits)", "> 5x spend"],
                        ["Newsletter subscribers growth", "> 50 / month at scale"],
                        ["Follower growth (ICP-matched)", "> 100 / month"],
                      ].map(([metric, target]) => (
                        <div key={metric} className="flex items-start justify-between text-sm gap-2">
                          <span className="text-gray-700">{metric}</span>
                          <span className="font-semibold text-blue-700 text-right">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Deployment Timeline</p>
                  <div className="space-y-2">
                    {[
                      ["Month 1", "Profile optimisation completed for both founders. Shield Analytics installed. Taplio / Buffer configured. Content calendar built. Engagement pod recruited (6–8 members). First 4 posts published with full 90-minute protocol."],
                      ["Month 2", "Pod at full operating strength (10–15 members). LinkedIn Campaign Manager set up. First paid amplification campaign run on best-performing Month 1 post. ABM integration workflow operational — ICP engagements logged in HubSpot."],
                      ["Month 3", "First full Shield Analytics review. Hook Library populated with top-performing hooks. Content calendar refined based on Month 1–2 performance data. Posting frequency assessed — increase if quality maintained."],
                      ["Month 4–6", "Algorithm momentum compounding — average impressions should be 2–3x Month 1 baseline. Paid amplification running on 2–3 posts per month. ABM pipeline receiving 5–8 content-sourced accounts monthly. First content-attributed mandates trackable."],
                    ].map(([month, desc]) => (
                      <div key={month} className="flex gap-3 text-sm">
                        <span className="font-semibold text-gray-900 w-20 flex-shrink-0">{month}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 13: Success Formula */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                13. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Engineered hook → Post goes live → 90-minute protocol executed
                  → Algorithm amplifies → ICP accounts reached → Engagement
                  logged → ABM tier elevated → Warm outreach triggered →
                  Diagnostic call booked → Mandate.
                </p>
                <p className="text-justify mt-3">
                  The posts that reach the right people are not the ones with
                  the most followers behind them. They are the ones engineered
                  most precisely to satisfy Stage 2 of LinkedIn's ranking
                  algorithm. Boyar's advantage is not audience size — it is
                  systematic, consistent execution of the mechanics that
                  determine distribution, applied to genuinely expert content
                  that no competitor in the TCSP and structuring space is
                  producing at the same quality or consistency.
                </p>
                <p className="text-justify mt-3 font-semibold">
                  At month 6, this system produces a compounding authority
                  signal that means Boyar Partners appears in the LinkedIn feeds
                  of thousands of qualified decision-makers every single week —
                  before a single cold outreach message is sent. That is the
                  structural advantage no ad budget can replicate.
                </p>
              </div>
            </section>

          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (isAiDrivenAbmModel) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white text-black">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-gray-700 hover:text-black transition flex items-center gap-2 text-sm font-medium"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold text-black">AI-Driven ABM Enhancements</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>AI-Driven ABM Enhancements</h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>Execution Playbook — Operational Blueprint for Boyar Partners</h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>1. Required Tool Stack</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">The lean ABM stack below covers account discovery, data enrichment, outreach personalisation, CRM tracking, and retargeting — and can be deployed progressively, starting with the minimum set before adding advanced layers.</p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-200">Function</th>
                        <th className="px-4 py-3 border-b border-gray-200">Tool</th>
                        <th className="px-4 py-3 border-b border-gray-200">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Account targeting & signal monitoring", "LinkedIn Sales Navigator", "Essential"],
                        ["AI data enrichment & research automation", "Clay.ai", "Essential"],
                        ["Contact discovery & email verification", "Apollo.io", "Essential"],
                        ["CRM & pipeline management", "HubSpot CRM", "Essential"],
                        ["AI personalisation at scale", "Lyne.ai / Clay workflows", "High priority"],
                        ["Intent signal monitoring (web)", "Bombora / G2 Buyer Intent", "High priority"],
                        ["Email sequence automation", "HubSpot Sequences / Lemlist", "High priority"],
                        ["LinkedIn content scheduling", "Buffer / Taplio", "Recommended"],
                        ["Retargeting ad management", "LinkedIn Campaign Manager", "Recommended"],
                        ["Content performance analytics", "Shield Analytics", "Recommended"],
                        ["Document tracking (opens, time spent)", "Notion + DocSend", "Optional"],
                        ["ABM reporting dashboard", "HubSpot Reports / Notion", "Optional"],
                      ].map(([func, tool, priority], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-2 border-b border-gray-100">{func}</td>
                          <td className="px-4 py-2 border-b border-gray-100 font-medium">{tool}</td>
                          <td className="px-4 py-2 border-b border-gray-100">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              priority === "Essential" ? "bg-blue-100 text-blue-800" :
                              priority === "High priority" ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-600"
                            }`}>{priority}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify font-semibold">Minimum viable stack (Month 1): Sales Navigator + Clay.ai + Apollo.io + HubSpot CRM. Deploy intent monitoring and retargeting from Month 2 onward once the ICP and scoring model are validated.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>2. Build the Ideal Client Profile (ICP) & Account Tier System</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">Before any AI tool is deployed, the ICP must be defined with precision. The ICP is the filter that determines which signals matter, which accounts get scored, and which outreach gets triggered. A poorly defined ICP produces false positives that waste founder time.</p>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Boyar Partners ICP Definition</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Firmographic Criteria</p>
                      <ul className={listClass} style={{ listStylePosition: "outside" }}>
                        <li className="text-justify">Company size: 5–500 employees</li>
                        <li className="text-justify">Revenue stage: Pre-revenue to $50M ARR</li>
                        <li className="text-justify">Sectors: Fintech, Web3/Crypto, Funds, Family Offices, Cross-Border SMEs, Licensing applicants</li>
                        <li className="text-justify">Geography: Global — with priority on UAE, UK, Singapore, EU, USA, India</li>
                        <li className="text-justify">Ownership: Founder-led or PE-backed with active expansion mandates</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Buyer Persona Criteria</p>
                      <ul className={listClass} style={{ listStylePosition: "outside" }}>
                        <li className="text-justify">Title: Founder, CEO, CFO, GC, COO, Head of Compliance, Managing Partner</li>
                        <li className="text-justify">Decision-making authority: Final or strong influence over structuring, licensing, banking decisions</li>
                        <li className="text-justify">Activity: Posting about expansion, hiring for regulatory roles, attending finance conferences</li>
                        <li className="text-justify">LinkedIn presence: Active profile, 500+ connections, recent activity</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Account Tier Classification</p>
                  <div className="space-y-3">
                    {[
                      { tier: "Tier 1 — Priority Accounts", color: "bg-red-50 border-l-4 border-red-400", desc: "Strong ICP match + active intent signal (fundraising, licensing application, regulatory hire, banking challenge). Founder direct outreach within 48 hours of signal detection." },
                      { tier: "Tier 2 — Warm Accounts", color: "bg-amber-50 border-l-4 border-amber-400", desc: "Good ICP match + partial signal (sector fit, expansion posting, but no acute trigger). Enter automated content nurture sequence; founder outreach triggered when signal strengthens." },
                      { tier: "Tier 3 — Awareness Accounts", color: "bg-blue-50 border-l-4 border-blue-400", desc: "Reasonable ICP fit, no current signal. Retargeting and content exposure only. Re-scored monthly. Escalated to Tier 2 when signals emerge." },
                    ].map(({ tier, color, desc }) => (
                      <div key={tier} className={`p-4 ${color} rounded-r-lg`}>
                        <p className="font-semibold text-gray-900">{tier}</p>
                        <p className="text-justify mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>3. Intent Signal Library — What AI Monitors</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">AI tools are configured to monitor the following signal categories across LinkedIn, news feeds, company websites, job boards, and regulatory databases. Each signal is mapped to a specific Boyar service line so outreach is immediately relevant.</p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-200">Signal</th>
                        <th className="px-4 py-3 border-b border-gray-200">Source</th>
                        <th className="px-4 py-3 border-b border-gray-200">Boyar Service Line</th>
                        <th className="px-4 py-3 border-b border-gray-200">Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Series A/B/C funding announcement", "LinkedIn, Crunchbase, press", "Corporate structuring, holding company", "1"],
                        ["Hiring: MLRO / Compliance Officer / GC", "LinkedIn Jobs, company page", "Licensing, AML/KYC advisory", "1"],
                        ["VASP / EMI / MSB licence application public", "Regulatory registry, news", "Licensing advisory", "1"],
                        ["International expansion announcement", "LinkedIn post, press release", "Jurisdiction selection, entity setup", "1"],
                        ["Banking / payment processing issue mentioned", "LinkedIn post, Twitter/X", "Banking introduction advisory", "1"],
                        ["Tokenisation or digital asset launch", "Blog, LinkedIn, press", "Tokenisation structuring", "1"],
                        ["Crypto exchange or OTC desk launch", "LinkedIn, company website", "VASP licensing, structuring", "1"],
                        ["Key executive join (CFO, GC, COO)", "LinkedIn activity", "Founder-targeted ABM outreach", "2"],
                        ["Company website visit (Boyar content)", "HubSpot tracking", "All service lines", "2"],
                        ["Engagement with Boyar LinkedIn post", "LinkedIn analytics", "Relevant service line by post topic", "2"],
                        ["Attending offshore / fintech conference", "Event registrations, posts", "Networking + ABM alignment", "2"],
                        ["Competitor mentions on LinkedIn", "Social monitoring", "Competitive intercept", "2"],
                        ["Job posting in new jurisdiction", "LinkedIn Jobs", "Jurisdiction + entity advisory", "3"],
                        ["Company restructuring or rebranding", "LinkedIn, press", "Corporate restructuring advisory", "3"],
                      ].map(([signal, source, service, tier], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-2 border-b border-gray-100">{signal}</td>
                          <td className="px-4 py-2 border-b border-gray-100 text-gray-600">{source}</td>
                          <td className="px-4 py-2 border-b border-gray-100 text-gray-600">{service}</td>
                          <td className="px-4 py-2 border-b border-gray-100">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              tier === "1" ? "bg-red-100 text-red-700" :
                              tier === "2" ? "bg-amber-100 text-amber-700" :
                              "bg-blue-100 text-blue-700"
                            }`}>T{tier}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>4. Account Discovery & AI Scoring Workflow</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">This is the operational core of the ABM system — the process by which Clay.ai, Sales Navigator, and Apollo.io work together to surface, enrich, and score accounts before any human touches the outreach.</p>
                {[
                  { step: "Step 1 — Account Discovery", color: "bg-white border border-gray-200", content: ["Use LinkedIn Sales Navigator to build segmented account lists by sector, geography, company size, and seniority of target contacts.", "Use Clay.ai to pull accounts from news feeds, Crunchbase fundraising data, job posting databases, and regulatory announcement feeds.", "Use Apollo.io to supplement with verified contact data (email, phone, LinkedIn URL) for decision-makers at discovered accounts.", "Set up automated Clay workflows to continuously scan sources and add new accounts matching ICP criteria into the discovery queue — removing the need for manual research."] },
                  { step: "Step 2 — Data Enrichment", color: "bg-white border border-gray-200", content: ["For each discovered account, Clay.ai automatically enriches the profile: company size, funding stage, recent news, LinkedIn activity of key contacts, technology stack (where detectable), and recent job postings.", "Enrichment also captures contextual intelligence: Has the founder posted about expansion? Has the company recently hired compliance? Is there a regulatory announcement on public record?", "This enrichment is appended to the CRM record in HubSpot, creating a fully contextualised account profile before outreach begins."] },
                  { step: "Step 3 — AI Scoring", color: "bg-white border border-gray-200", content: ["Each account is scored against the ICP criteria and signal library using a weighted scoring model configured in Clay.ai or HubSpot.", "Score components: ICP firmographic match (40%), buyer persona match (25%), active intent signal present (25%), Boyar content engagement (10%).", "Accounts scoring above threshold are automatically classified as Tier 1 and flagged for founder review within the same working day.", "Accounts scoring in mid-range are classified Tier 2 and entered into automated nurture. Low-scoring accounts go to Tier 3 awareness-only retargeting."] },
                  { step: "Step 4 — Human Review Gate (Tier 1 Only)", color: "bg-amber-50 border border-amber-200", content: ["Every Tier 1 account is reviewed by a founder before outreach is triggered. AI handles research; founders confirm relevance and approve the personalised message.", "This gate prevents false positives from entering outreach and maintains the boutique positioning — every Tier 1 message is founder-reviewed.", "Review time per account: 3–5 minutes with AI-prepared context brief already in CRM.", "Founder approves, edits, or downgrades the account. If approved, outreach sequence begins within 24 hours."] },
                ].map(({ step, color, content }) => (
                  <div key={step} className={`p-4 ${color} rounded-lg shadow-sm`}>
                    <p className="font-semibold text-gray-900 mb-2">{step}</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      {content.map((item, i) => (<li key={i} className="text-justify">{item}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>5. Personalisation Engine — Message Architecture</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">All outreach for Tier 1 accounts uses AI-generated context to build a personalised opening — not a generic template. The structure below applies across LinkedIn DM, email, and WhatsApp (where appropriate).</p>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Message Architecture — The 4-Part Formula</p>
                  <div className="space-y-3">
                    {[
                      { part: "Part 1 — Context Hook (1 sentence)", desc: "Reference the specific signal that triggered outreach. Not generic — specific to this account's event.", example: "Saw your announcement about expanding operations into the UAE — congrats on the milestone.", color: "bg-blue-50 border-l-4 border-blue-400" },
                      { part: "Part 2 — Relevance Bridge (1–2 sentences)", desc: "Connect the signal to a specific challenge or decision that Boyar solves — without pitching.", example: "Teams at your stage typically face a structural decision at this point around where to place the holding entity and how to approach UAE banking access.", color: "bg-green-50 border-l-4 border-green-400" },
                      { part: "Part 3 — Credential Signal (1 sentence)", desc: "One understated proof point — not a sales pitch, a credibility marker.", example: "We handle this specifically for fintech and Web3 teams across 35+ jurisdictions.", color: "bg-indigo-50 border-l-4 border-indigo-400" },
                      { part: "Part 4 — Low-Friction CTA (1 sentence)", desc: "A soft, non-pressured ask. Never 'book a call' at this stage. Offer value first.", example: "Happy to share a short framework we use for structuring decisions at this stage — no strings attached.", color: "bg-amber-50 border-l-4 border-amber-400" },
                    ].map(({ part, desc, example, color }) => (
                      <div key={part} className={`p-4 ${color} rounded-r-lg`}>
                        <p className="font-semibold text-gray-900">{part}</p>
                        <p className="text-justify text-sm text-gray-700 mt-1">{desc}</p>
                        <p className="text-justify text-sm mt-2 italic text-gray-600">Example: &quot;{example}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Personalisation by Service Line</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800">
                      <thead className="bg-gray-50 text-gray-900">
                        <tr>
                          <th className="px-3 py-2 border-b border-gray-200">Signal Trigger</th>
                          <th className="px-3 py-2 border-b border-gray-200">Lead Service Line</th>
                          <th className="px-3 py-2 border-b border-gray-200">Content Asset to Attach</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Fundraising announcement", "Holding company + structuring", "Jurisdiction comparison framework"],
                          ["VASP licence application", "Licensing advisory", "VASP jurisdiction matrix"],
                          ["Banking challenge mentioned", "Banking introduction", "Banking acceptance guide"],
                          ["International expansion post", "Entity setup + jurisdiction", "Expansion structuring guide"],
                          ["Tokenisation project", "Token structure advisory", "Token foundation + SPV overview"],
                          ["HNWI relocation signal", "Trust + citizenship", "Residency structuring brief"],
                          ["Fund launch announcement", "Fund administration + structure", "Fund vehicle comparison note"],
                        ].map(([signal, service, asset], i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-3 py-2 border-b border-gray-100">{signal}</td>
                            <td className="px-3 py-2 border-b border-gray-100">{service}</td>
                            <td className="px-3 py-2 border-b border-gray-100 text-gray-600">{asset}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>6. Multi-Touch Outreach Sequence by Tier</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">Tier 1 — Priority Outreach Sequence (Days 1–21)</p>
                  <ol className="list-decimal ml-6 space-y-3 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Day 1:</strong> Founder sends personalised LinkedIn connection request with 1-line note referencing the specific trigger signal. No pitch.</li>
                    <li className="text-justify"><strong>Day 3 (if connected):</strong> Send 4-part personalised message (Context Hook → Relevance Bridge → Credential Signal → Low-Friction CTA). Attach one relevant content asset (framework, jurisdiction brief).</li>
                    <li className="text-justify"><strong>Day 7 (if no reply):</strong> Second LinkedIn touchpoint — share a related insight post or jurisdiction update directly relevant to their sector. Comment on their recent post first to warm visibility.</li>
                    <li className="text-justify"><strong>Day 10:</strong> Email follow-up via Apollo.io verified address — reference the LinkedIn message, share the same framework, reiterate the low-friction offer. Keep it under 80 words.</li>
                    <li className="text-justify"><strong>Day 14 (if warm but uncommitted):</strong> Invite to a relevant resource — roundtable, briefing note, or jurisdiction deep-dive document. Position as value, not a pitch.</li>
                    <li className="text-justify"><strong>Day 21 (final Tier 1 touch):</strong> Short, direct message: "Happy to set up a 20-minute diagnostic call — no obligation. If timing isn't right, I'll keep you in the loop on relevant developments." Then move to Tier 2 nurture if no response.</li>
                  </ol>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">Tier 2 — Automated Nurture Sequence (Weeks 1–8)</p>
                  <ol className="list-decimal ml-6 space-y-3 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Week 1:</strong> LinkedIn connection request (no note). HubSpot adds to email nurture list — send first content asset (jurisdiction intelligence brief matching their sector).</li>
                    <li className="text-justify"><strong>Week 2:</strong> Automated email: regulatory update or licensing development relevant to their sector. Short, informative, no CTA other than "reply if you'd like to discuss."</li>
                    <li className="text-justify"><strong>Week 4:</strong> LinkedIn retargeting ad serves Boyar's most relevant thought leadership content (post, guide, or video) to this account's contacts. No outreach message — visibility only.</li>
                    <li className="text-justify"><strong>Week 6:</strong> Second email: share a different framework (banking acceptance, fund structure, or citizenship planning depending on sector). Invite to subscribe to Boyar's jurisdiction intelligence newsletter.</li>
                    <li className="text-justify"><strong>Week 8:</strong> AI re-scores the account. If engagement detected (email open, link click, LinkedIn profile visit), escalate to Tier 1 and trigger founder direct outreach. If no engagement, continue monthly nurture.</li>
                  </ol>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">Tier 3 — Awareness & Retargeting (Ongoing)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">LinkedIn retargeting ads serving Boyar content to decision-makers at Tier 3 companies — no direct outreach until a signal elevates the account to Tier 2 or Tier 1</li>
                    <li className="text-justify">Monthly newsletter send if email address available via Apollo</li>
                    <li className="text-justify">AI re-scoring runs monthly — any account showing new signal is automatically elevated to the appropriate tier and flagged</li>
                    <li className="text-justify">Tier 3 exists to keep Boyar visible in the account's awareness at near-zero cost while the account matures toward a buying window</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>7. Content Asset Library — ABM Ammunition</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">ABM outreach is only as good as the content assets it distributes. Each asset below serves a specific account segment and service line, ensuring that every outreach touch delivers relevant value — not generic marketing collateral.</p>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Priority Assets to Build (Phase 1)</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Jurisdiction Comparison Framework", desc: "One-page decision matrix comparing BVI, Cayman, Dubai, Singapore, Cyprus across 8 variables. Sent to all corporate structuring signals." },
                      { label: "VASP Licensing Matrix", desc: "Licensing requirements comparison across 10 jurisdictions for crypto/Web3 companies. Triggered by VASP-related signals." },
                      { label: "Banking Acceptance Guide", desc: "How Boyar approaches banking introductions for high-risk sectors — the process, timeline, and jurisdiction options. For banking-challenge signals." },
                      { label: "Fund Vehicle Comparison Note", desc: "Cayman vs BVI vs Luxembourg vs Singapore fund structures — when to use which. Triggered by fund launch signals." },
                      { label: "Expansion Structuring Guide", desc: "Entity placement framework for cross-border expansions — holding + operating + IP structure. For international expansion signals." },
                      { label: "Residency & Citizenship Brief", desc: "Second residency and citizenship options overview for HNWIs — programme comparison, timelines, costs. For HNWI relocation signals." },
                    ].map(({ label, desc }) => (
                      <div key={label} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="font-semibold text-sm text-gray-900">{label}</p>
                        <p className="text-sm text-gray-700 mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="text-justify"><strong>Asset Development Rule:</strong> Each content asset should be 1–2 pages maximum. It is a proof of expertise, not a full proposal. The goal is to demonstrate that Boyar understands the prospect's challenge deeply — not to answer every question before the first call.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>8. Weekly Execution Cadence</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                {[
                  { label: "Monday — Account Review", color: "bg-slate-50 border border-slate-200", items: ["Review Clay.ai and Sales Navigator alerts: new accounts flagged since last week", "Review HubSpot: which Tier 1 accounts have engaged with email or LinkedIn content", "Escalate any Tier 2 accounts showing signals to Tier 1 — set founder outreach", "Approve AI-drafted outreach messages for new Tier 1 accounts (3–5 per week)"] },
                  { label: "Tuesday–Thursday — Outreach Execution", color: "bg-slate-50 border border-slate-200", items: ["Send approved Tier 1 LinkedIn connection requests and personalised messages (founders)", "Send email follow-ups to Tier 1 accounts that connected but haven't replied (Day 10 touchpoint)", "Review replies and book diagnostic calls for warm responses", "Update CRM: tag every account with current status, last touch, next action date"] },
                  { label: "Friday — Analytics & Optimisation", color: "bg-slate-50 border border-slate-200", items: ["Review Shield Analytics: which LinkedIn posts drove profile visits from ICP accounts", "Review HubSpot email metrics: open rates, click-through rates, replies by segment", "Identify which content assets are converting best — scale production of top performers", "Update scoring model if false positives are appearing consistently in Tier 1 queue"] },
                ].map(({ label, color, items }) => (
                  <div key={label} className={`p-4 ${color} rounded-lg shadow-sm`}>
                    <p className="font-semibold text-gray-900 mb-2">{label}</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      {items.map((item, i) => (<li key={i} className="text-justify">{item}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>9. Monthly Review & Optimisation Protocol</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2">Performance Review</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">How many Tier 1 accounts were identified this month?</li>
                      <li className="text-justify">What was the connection acceptance rate on LinkedIn outreach?</li>
                      <li className="text-justify">What percentage of Tier 1 outreach produced a reply?</li>
                      <li className="text-justify">How many diagnostic calls were booked?</li>
                      <li className="text-justify">How many mandates are in active proposal stage?</li>
                      <li className="text-justify">Which content asset produced the most engagement?</li>
                      <li className="text-justify">Which sector produced the highest signal density?</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2">Optimisation Actions</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">If acceptance rate is below 30% → refine targeting criteria; check message tone</li>
                      <li className="text-justify">If reply rate is below 15% → review personalisation quality; test alternative CTAs</li>
                      <li className="text-justify">If calls booked is below target → check Tier 1 threshold; may be too many false positives</li>
                      <li className="text-justify">If one sector is outperforming → increase account discovery volume for that sector</li>
                      <li className="text-justify">If content asset clicks are low → replace the asset; test a new format or topic</li>
                      <li className="text-justify">Update ICP definition if consistently wrong sector is triggering Tier 1 alerts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>10. Governance Rules — Non-Negotiables</h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                {[
                  { rule: "Rule 1 — Founders review every Tier 1 message before it is sent", detail: "AI prepares. Founders approve. No Tier 1 outreach goes out without a founder reviewing the personalisation and confirming the account is genuinely relevant." },
                  { rule: "Rule 2 — No mass volume outreach at any tier", detail: "ABM is precision, not scale. Maximum 10–15 Tier 1 outreach messages per week. Quality of personalisation always beats volume of sends." },
                  { rule: "Rule 3 — All sensitive advisory discussions move off LinkedIn immediately", detail: "LinkedIn DMs are for initiating the relationship only. Any discussion involving specific client situations, pricing, or confidential structuring advice moves to a private call or secure email." },
                  { rule: "Rule 4 — Data privacy compliance is mandatory", detail: "All AI tools configured to use publicly available data sources only. No private profile scraping. All email outreach includes unsubscribe option. GDPR opt-out honoured within 48 hours." },
                  { rule: "Rule 5 — Every outreach must provide value before asking for anything", detail: "No cold pitches. Every message delivers an insight, framework, or relevant observation before any ask is made. The ask itself must be low-friction — never 'book a call' as a first message." },
                  { rule: "Rule 6 — CRM discipline is mandatory", detail: "Every account touched must be logged in HubSpot with status, last contact date, next action, and segment tag. An account not in CRM does not exist in the ABM system." },
                ].map(({ rule, detail }) => (
                  <div key={rule} className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900">{rule}</p>
                    <p className="text-justify mt-1">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>11. KPI Dashboard</h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2">Primary KPIs</p>
                    <div className="space-y-2">
                      {[
                        ["Tier 1 accounts identified / month", "10–20"],
                        ["LinkedIn connection acceptance rate", "> 35%"],
                        ["Reply rate (Tier 1 outreach)", "> 20%"],
                        ["Diagnostic calls booked / month", "4–8"],
                        ["Active proposals in pipeline", "2–4"],
                        ["Mandates won from ABM channel", "1–2 / month at scale"],
                      ].map(([metric, target]) => (
                        <div key={metric} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{metric}</span>
                          <span className="font-semibold text-green-700">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2">Secondary KPIs</p>
                    <div className="space-y-2">
                      {[
                        ["Email open rate (Tier 2 nurture)", "> 40%"],
                        ["Email click-through rate", "> 12%"],
                        ["Tier 2 → Tier 1 escalations / month", "3–6"],
                        ["Retargeting ad impression frequency", "5–8x / month"],
                        ["Content asset downloads", "Tracked per asset"],
                        ["Accounts in active Tier 2 nurture", "50–150"],
                      ].map(([metric, target]) => (
                        <div key={metric} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{metric}</span>
                          <span className="font-semibold text-blue-700">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-2">Deployment Timeline</p>
                  <div className="space-y-2">
                    {[
                      ["Month 1", "ICP definition, tool stack setup, Sales Navigator lists built, first 20 Tier 1 accounts identified and outreach begun, HubSpot pipeline configured"],
                      ["Month 2", "Clay.ai workflows active for automated discovery, Apollo.io email verified, Tier 2 nurture sequences live, LinkedIn retargeting campaigns running"],
                      ["Month 3", "First KPI review, scoring model refined, content asset library completed, Bombora intent monitoring added if budget allows"],
                      ["Month 4+", "Full ABM system operational, monthly optimisation cadence established, pipeline reporting integrated into founder weekly review"],
                    ].map(([month, desc]) => (
                      <div key={month} className="flex gap-3 text-sm">
                        <span className="font-semibold text-gray-900 w-20 flex-shrink-0">{month}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>12. Success Formula</h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">AI discovers → Signal triggers → Account scored → Founder approves → Personalised outreach sent → Value delivered before ask → Warm reply → Diagnostic call → Mandate.</p>
                <p className="text-justify mt-3">The AI-Driven ABM system removes the two biggest inefficiencies in boutique advisory acquisition: time wasted on unqualified prospects and outreach sent at the wrong moment. AI handles discovery, enrichment, scoring, and nurture — founders invest time only in accounts that are already warm, already relevant, and already primed to engage.</p>
                <p className="text-justify mt-3 font-semibold">At full deployment, this system produces a self-sustaining pipeline where the right account receives the right message at the right time — without the founder spending a single hour on cold prospecting.</p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }
}
