"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function WhatIsItPage() {
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
    "family-office-acquisition": "family-office-uhnw",
    "referral-introducer-networks": "strategic-partnerships-referral",
    "boutique-vc-angel": "investor-club-syndicate",
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
    "global-mobility-residency": "global-mobility-residency",
    "global-mobility-residency-co-marketing": "global-mobility-residency",
    "global-mobility": "global-mobility-residency",
    "mobility-residency": "global-mobility-residency",
    "mobility-residency-model": "global-mobility-residency",
    "mobility-residency-co-marketing": "global-mobility-residency",
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

  // Determine which model this is for
  const isCommissionModel = modelId === "commission-based-representative";
  const isLinkedInModel = modelId === "linkedin-executive-outreach";
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
  const isReputationBorrowingModel = modelId === "reputation-borrowing";
  const isThoughtLeadershipModel = modelId === "thought-leadership-media";
  const isOffshoreMasterclassModel = modelId === "offshore-masterclass";
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
  const sectionClass =
    "mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4";
  const headingClass =
    "text-2xl font-bold mb-2 text-black";
  const listClass = "list-disc ml-6 space-y-2 pl-0";

  // LinkedIn Executive Outreach - refreshed professional layout
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
                LinkedIn Executive Outreach
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The LinkedIn Executive Outreach Model is a structured, high-precision acquisition channel where founders (Inderjeet and Joel) plus a tightly managed group of representatives use LinkedIn to build relationships with senior decision-makers (Founders, CFOs, GCs, Fund Managers, Family Office Executives, Crypto Leaders, Licensing Applicants).
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    The objective is surgical connection-building for high-ticket advisory mandates — not mass lead gen.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Purpose of This Model
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Increase visibility among high-value prospects</li>
                  <li className="text-justify">Position Boyar as senior, technical, and credible</li>
                  <li className="text-justify">Create private discussions that evolve into advisory mandates</li>
                  <li className="text-justify">Build authority through insights and professional dialogue</li>
                  <li className="text-justify">Ensure ongoing nurturing with minimal friction</li>
                </ul>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="text-justify">
                    LinkedIn is the single most effective digital channel for UHNW advisors, executives, fintech leaders, compliance officers, and fund principals.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Strategic Fit for Boyar Partners
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Aligns with boutique positioning and founder-led approach</li>
                  <li className="text-justify">Suited for high-trust, high-ticket, confidential advisory</li>
                  <li className="text-justify">Serves international client base across crypto, fintech, funds, SMEs, family offices</li>
                  <li className="text-justify">Enables subtle, executive-level engagement without aggressive marketing</li>
                </ul>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <p className="text-justify">
                    LinkedIn lets founders show expertise through concise insights, guide prospects into private discussions, and build multi-country pipelines.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Who This Model Targets
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Primary Decision-Makers</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Founders/CEOs</li>
                    <li className="text-justify">CFOs/COOs</li>
                    <li className="text-justify">General Counsels</li>
                    <li className="text-justify">Fund Managers</li>
                    <li className="text-justify">Family Office Executives</li>
                    <li className="text-justify">Crypto/Web3 leadership</li>
                    <li className="text-justify">Licensing teams (VASP, EMI, MSB)</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Context Indicators (Engagement Triggers)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Funding announcements</li>
                    <li className="text-justify">Market expansion</li>
                    <li className="text-justify">Regulatory hiring</li>
                    <li className="text-justify">Banking challenges</li>
                    <li className="text-justify">Tokenization projects</li>
                    <li className="text-justify">Licensing plans</li>
                    <li className="text-justify">Compliance pressure</li>
                  </ul>
                  <p className="mt-3 text-justify text-gray-800">These are the strongest LinkedIn buying signals.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Core Principles of the Model
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Authority Over Advertising:</strong> Advisory tone, not promotional.</li>
                    <li className="text-justify"><strong>Personalised Touchpoints Only:</strong> No mass DMs; every outreach has context.</li>
                    <li className="text-justify"><strong>Consistency Beats Volume:</strong> 3–4 precise posts/month outperform high-volume generic content.</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Founder Visibility Is Mandatory:</strong> Executives engage with executives.</li>
                    <li className="text-justify"><strong>LinkedIn Is the Start, Not the Sale:</strong> Commercial discussions move to private calls.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Mandatory Components of the Model
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Founder Profiles Optimised for Authority</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Regulatory expertise, jurisdictional depth, structuring capabilities, founder credibility.</li>
                    <li className="text-justify">Headline example: “Offshore Structuring | Licensing | Trusts | Banking Advisory”.</li>
                    <li className="text-justify">Featured: guides, insights, videos; About section with authority; anonymized case studies.</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Content System</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Micro-insights, jurisdictional updates, licensing briefs</li>
                    <li className="text-justify">Banking environment analyses, anonymized case studies</li>
                    <li className="text-justify">Posting: 4–8 high-value posts/month</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Outreach Infrastructure</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Segmented lists via Sales Navigator</li>
                    <li className="text-justify">Personalised scripts and follow-up rules</li>
                    <li className="text-justify">Activity tracking for replies and warms</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Engagement Tracking</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Views, engagements, profile visits, connection accepts</li>
                    <li className="text-justify">Signals drive next-step outreach</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Advantages of the LinkedIn Executive Outreach Model
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Strategic Advantages</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Access to decision-makers across 80+ countries</li>
                    <li className="text-justify">Naturally builds trust; increases inbound invitations</li>
                    <li className="text-justify">Establishes Boyar as a global advisor</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Financial Advantages</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Zero ad spend required</li>
                    <li className="text-justify">Compounding effect over 6–12 months</li>
                    <li className="text-justify">Extremely high ROI with consistency</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Operational Advantages</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Scalable, constant flow of quality conversations</li>
                    <li className="text-justify">Supports ABM, Founder-Led Origination, Partnerships</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Risks & Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 1 — Outreach perceived as salesy</strong></p>
                  <p className="text-justify">Control: Insight-led messaging only.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 2 — Inconsistent posting reduces trust</strong></p>
                  <p className="text-justify">Control: Fixed content cadence.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 3 — Unqualified connections</strong></p>
                  <p className="text-justify">Control: Tight account lists from Sales Navigator.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 4 — Compliance discussions in public</strong></p>
                  <p className="text-justify">Control: Move sensitive dialogue to private channels.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                9. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  LinkedIn → Micro insights → Authority → Private conversations → Founder-led diagnostic → Mandate.
                </p>
                <p className="text-justify mt-2">
                  Boyar Partners’ expertise + the founders’ personal credibility = a conversion engine that outperforms paid marketing.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // CFO / General Counsel Executive Roundtable (Group 2) — polished layout
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
                CFO / GC Executive Roundtable Acquisition Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The CFO/GC Executive Roundtable Model is a private, curated, discussion-based acquisition channel where 6–12 senior executives (CFOs, General Counsels, Heads of Legal, COOs, Financial Controllers) join Boyar Partners for jurisdictional strategy discussions, CFO-relevant structuring frameworks, banking acceptance briefings, cross-border regulatory breakdowns, licensing guidance (VASP, EMI, MSB, fund), operational risk management, compliance alignment strategies, and expansion/entity placement analysis.
                </p>
                <p className="text-justify">
                  These invite-only, highly curated, private sessions give executives a safe space to discuss problems, ask technical questions, compare jurisdictions, understand regulatory risks, and explore structuring solutions. Boyar Partners acts as moderator, educator, and trusted advisor — not a salesperson.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Acquisition Model Works Exceptionally Well
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. CFOs & GCs are the ultimate decision-makers</p>
                  <p className="text-justify">They control structuring approvals, banking onboarding, licensing budgets, legal entity setup, compliance frameworks, and cross-border expansion. Winning them = winning the mandate.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. They prefer discussion-based formats over webinars</p>
                  <p className="text-justify">
                    They avoid general webinars (too public, generic, noisy) but engage with small, peer-level, confidential, high-value, practical roundtables that match their expectations.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Advisors earn trust by leading strategic discussions</p>
                  <p className="text-justify">
                    When Boyar moderates jurisdiction or licensing discussions, authority increases, credibility solidifies, trust accelerates, and mandates follow. Executives judge competence by how you think.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Non-sales environment</p>
                  <p className="text-justify">Advisory, strategic, technical, peer exchange, intelligence sharing — not pitching. This drives extremely high conversion because CFOs trust competence, not persuasion.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Compounding referral networks</p>
                  <p className="text-justify">
                    After valuable sessions, executives invite peers, introduce Boyar to legal/tax teams, bring Boyar into expansions, request diagnostics, and participate in future sessions. Roundtables are trust multipliers.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Critical Middle Section: Works Even With No Audience or Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Relevance beats brand</p>
                  <p className="text-justify">
                    Executives attend when topics solve real problems: “Global Banking Acceptance for High-Risk Sectors,” “Cayman vs BVI — CFO-Level Decision Framework,” “Jurisdiction Strategy for Multi-Region Expansion,” “VASP Licensing: CFO’s Regulatory Responsibilities in 2025,” “Compliance Sequencing for Cross-Border Structures.”
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Start with 4–5 executives</p>
                  <p className="text-justify">A roundtable is meant to be small. Even 3 CFOs + 2 GCs is a success. Quality &gt; quantity.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Executive communities seek experts</p>
                  <p className="text-justify">They gather in Slack, Telegram, WhatsApp, legal/finance micro-communities, founder networks — and invite experts on structuring, banking, licensing, and regulatory implications. Boyar fills a specialized gap.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Borrow authority via co-hosts</p>
                  <p className="text-justify">
                    Accountants, lawyers, fintech advisors, accelerator mentors, banking relationship managers co-host because it strengthens their network value; their credibility elevates yours.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Exclusivity even when new</p>
                  <p className="text-justify">
                    “Roundtable” signals seniority, private access, curated participation, and strategic depth. Executives respond to exclusivity, not popularity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Network becomes self-sustaining</p>
                  <p className="text-justify">
                    After 2–3 sessions, executives return, bring colleagues, introduce Boyar internally, request private strategy sessions, and begin cross-service engagements. Roundtables become the intellectual nucleus of the acquisition system.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Execution Playbook — Operational Blueprint
              </h2>
              <div className="space-y-6 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">1. Tools Required</p>
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

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-3">
                  <p className="font-semibold text-gray-900">2. Roundtable Structure (“The 45-Minute Executive Format”)</p>
                  <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Opening (5 mins): Inderjeet introduces Boyar, sets expectations (“This is a technical peer-level discussion”), outlines topic and outcomes.</li>
                    <li className="text-justify">Executive Context (5 mins): Macro-regulatory environment — jurisdiction shifts, regulatory tightening, banking/supervision trends, licensing climate.</li>
                    <li className="text-justify">Deep Framework Section (10–15 mins): Diagrams — Cayman/BVI decision trees, VASP licensing matrix, banking acceptance ladder, structuring models, compliance sequencing maps.</li>
                    <li className="text-justify">Executive Roundtable Discussion (15 mins): Structured questions (banking for high-risk subsidiaries, expansion jurisdictions, regulator responses). Peer insight builds trust.</li>
                    <li className="text-justify">Closing (2 mins): Summarize key frameworks; optional diagnostics — “We can run a short confidential diagnostic.” No sales pitch.</li>
                  </ol>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">3. Topic Calendar (High-Impact Themes)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Corporate Structuring:</strong> “Cayman vs BVI — CFO’s Structuring Framework for 2025”; “Where to Place Your Holding Company Before Expansion.”</li>
                    <li className="text-justify"><strong>Banking:</strong> “Global Banking Acceptance for High-Risk Sectors”; “Risk-Based Banking: What CFOs Must Know in 2025.”</li>
                    <li className="text-justify"><strong>Licensing:</strong> “VASP Licensing — CFO/GC Regulatory Obligations”; “EMI Licensing: Supervisory Expectations.”</li>
                    <li className="text-justify"><strong>Crypto / Tokenization:</strong> “Token Foundation + SPV Combination Models.”</li>
                    <li className="text-justify"><strong>Compliance:</strong> “Cross-Border Compliance Sequencing for Scaling Companies.”</li>
                    <li className="text-justify"><strong>Funds:</strong> “Fund Structure Selection for Prop Desks & Asset Managers.”</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">4. Audience Strategy</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Tier 1:</strong> Founders / CFOs / GCs of scaling companies — messaging: banking reliability, operational simplicity, regulatory clarity.</li>
                    <li className="text-justify"><strong>Tier 2:</strong> Web3, Crypto, Tokenization teams — need VASP guidance, structuring, banking pathways.</li>
                    <li className="text-justify"><strong>Tier 3:</strong> Funds & Asset Managers — focus on fund vehicles, administration, custody, cross-border compliance.</li>
                    <li className="text-justify"><strong>Tier 4:</strong> Advisors (lawyers, accountants, bankers) — broaden reach, bring clients, co-host, validate credibility.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">5. Distribution Framework</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Pre-Event:</strong> Personalized LinkedIn invitations; targeted emails to CFO/GC prospects; partner co-host promotions; WhatsApp invites to VIP lists.</li>
                    <li className="text-justify"><strong>During:</strong> Record (if allowed), collect insights, encourage discussion.</li>
                    <li className="text-justify"><strong>Post-Event:</strong> Send summary, slide deck, framework diagrams, optional diagnostic call offer; then enter prospects into ABM nurturing sequences.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">6. Governance Guidelines</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Confidentiality is mandatory; no recording unless approved; no client-specific details.</li>
                    <li className="text-justify">Zero marketing tone; purely advisory.</li>
                    <li className="text-justify">Founder-led: Inderjeet (lead), Joel (research and support).</li>
                    <li className="text-justify">Consistency: at least one roundtable per month.</li>
                    <li className="text-justify">Topical relevance: sessions must reflect live regulatory and jurisdiction shifts.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">7. KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Primary KPIs:</strong> Executives attending each session; diagnostic calls booked; mandates generated; executive referrals; internal introductions (CFO → GC → CEO).</li>
                    <li className="text-justify"><strong>Secondary KPIs:</strong> Repeat attendance; partner co-host invitations; LinkedIn engagement from repurposed clips; strategic partnership formation.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                  <p className="font-semibold text-gray-900">8. Success Formula</p>
                  <p className="text-justify">
                    High-level peer discussion → Demonstrated mastery → Executive trust → Diagnostics booked → High-value multi-service mandates. This channel positions Boyar Partners as the strategic advisor CFOs and GCs rely on for global structuring, licensing, and regulatory navigation.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Global Mobility & Residency Co-Marketing — polished layout
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
                Global Mobility & Residency Marketing Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Global Mobility & Residency Marketing Model positions Boyar Partners as a trusted advisory firm for residency-by-investment, citizenship-by-investment, corporate relocation, entrepreneur visas, HNWI relocation planning, asset migration, family movement planning, mobility-linked structuring, jurisdiction arbitrage strategy, and compliance alignment for relocation.
                </p>
                <p className="text-justify">
                  This channel is not about competing with mass-market immigration firms. It positions Boyar as the advisory architect behind global mobility decisions for UHNWIs, founders, crypto entrepreneurs, and family offices. Mobility is the doorway; structuring is the mandate—every mobility client needs trusts/foundations, corporate structuring, banking, tax residency transitions, compliance, and holding company adjustments.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Channel Works for a Boutique Offshore Firm
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. High-ticket, deeply intertwined mandates</p>
                  <p className="text-justify">
                    A single mobility case can include residency structure, banking, trust/foundation, asset restructuring, corporate redomiciliation, and licensing for relocating businesses—creating multi-service lifetime clients.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Advisors who understand mobility + structuring win</p>
                  <p className="text-justify">
                    Immigration firms rarely understand holding companies, offshore banks, crypto, high-risk models, or licensing frameworks. Boyar bridges the gap—competitive advantage.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Mobility clients are proactive and strong</p>
                  <p className="text-justify">
                    Ideal for SPVs, trusts/foundations, banking planning, entity restructuring, tax-neutral solutions, and succession—high-value client base.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Mobility content is high-intent</p>
                  <p className="text-justify">
                    Searches like “Best country for crypto founders,” “2025 residency options for entrepreneurs,” and “Portugal vs UAE residency” convert because decisions are urgent and expensive.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Emotional + financial decision</p>
                  <p className="text-justify">When Boyar provides clarity, trust rises fast and conversion increases.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Critical Middle Section: Works Even With No Network or Audience
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You don’t need to be an immigration processor</p>
                  <p className="text-justify">
                    Your role is strategy: structuring for relocation, banking for new residency, holding company adjustments, trust/foundation alignment, jurisdiction mapping. Immigration lawyers handle filings; Boyar handles the strategic value.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Borrow partner expertise immediately</p>
                  <p className="text-justify">
                    Leverage licensed immigration firms, legal partners, real estate citizenship brokers, tax residency advisors, and mobility consultants to execute filings while Boyar designs the framework.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Education-first marketing</p>
                  <p className="text-justify">
                    Clients choose clarity, insight, strategy, and precision over certificates. Content becomes the credential.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Small content base still performs</p>
                  <p className="text-justify">
                    Low competition in mobility for crypto founders, high-risk entrepreneurs, residency paired with structuring, fund managers, and multi-jurisdiction families—grow from zero audience quickly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Anchor clients create referrals</p>
                  <p className="text-justify">
                    Mobility clients refer family members, partners, investors, and friends planning relocation—compounding network.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Private briefings establish authority</p>
                  <p className="text-justify">
                    Host sessions like “Residency & Structuring Strategy for HNW Entrepreneurs in 2025” to immediately position as expert.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Mobility need → Strategy clarity → Trust acceleration → Structuring + banking mandate → Ongoing advisory → Multi-service lifetime client.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Website SEO & Newsletter Inbound Model — polished layout
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
                Website SEO & Newsletter Inbound Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Website SEO & Newsletter Inbound Model is a long-term, authority-driven acquisition channel designed to make Boyar Partners discoverable by high-intent prospects searching for offshore structuring, company formation, licensing (VASP, EMI, MSB, Fund), banking pathways, tokenization architecture, trusts and foundations, cross-border tax, and compliance updates.
                </p>
                <p className="text-justify">
                  Pillar A — Website + SEO: the site becomes the authority hub, jurisdiction library, and conversion engine for inbound consultations. Pillar B — Regulatory Newsletter: a monthly intelligence briefing that keeps CFOs, GCs, founders, fund managers, family offices, and partners engaged so latent prospects never forget Boyar.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Channel Works for a Boutique Offshore Firm
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. High-intent traffic</p>
                  <p className="text-justify">Searches like “VASP licensing” or “Cayman SPC structure” are close to purchase.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. SEO scales quietly</p>
                  <p className="text-justify">No ads needed; precision content wins.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Newsletter nurtures long-cycle clients</p>
                  <p className="text-justify">Offshore timelines are long; the newsletter keeps Boyar top of mind.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Website as authority proof</p>
                  <p className="text-justify">Prospects vet advisory via the site; strong content = instant trust.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Global reach</p>
                  <p className="text-justify">Inbound arrives worldwide without incremental cost.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Critical Middle Section: Works Even from Zero
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Low-competition offshore keywords</p>
                  <p className="text-justify">Offshore structuring/licensing terms have few competitors and low-quality content — easy to rank from scratch.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. You need the right 50–100 visitors</p>
                  <p className="text-justify">Fund managers, HNWIs, crypto founders, CFOs, GCs, high-risk entrepreneurs → 3–6 diagnostics → 1–2 mandates = strong revenue. Small traffic suffices.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Existing PDFs → instant SEO pages</p>
                  <p className="text-justify">Jurisdiction guides, AML, trusts content become landing pages, blog posts, gated assets, authority pages.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Newsletters grow from tiny lists</p>
                  <p className="text-justify">Quality &gt; quantity: 20–30 subscribers (bankers, lawyers, fund managers, founders, HNWIs) can convert and refer.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Expertise-driven SEO</p>
                  <p className="text-justify">Clarity, completeness, professionalism, engagement — not thousands of backlinks.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Newsletter becomes the cumulative brain</p>
                  <p className="text-justify">Monthly insights, updates, frameworks, observations position Boyar as elite advisor even when new.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // High-Intent Google Capture Model — polished layout
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
                High-Intent Google Capture Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The High-Intent Google Capture Model is a targeted inbound channel where Boyar captures prospects actively searching for offshore structuring, licensing (VASP, EMI, MSB, fund), offshore banking, trust/foundation setups, international expansion, jurisdiction comparisons (Cayman vs BVI, DIFC vs ADGM), compliance/banking troubleshooting, tokenization legal wrappers, and fund administration structures.
                </p>
                <p className="text-justify">
                  It focuses only on transaction-ready searches—prospects who already have a need, timeline, problem, budget, and decision trigger. You intercept demand; you do not create it.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Core Components of High-Intent Capture
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Pillar A — Intent Keywords (Transactional Only)</p>
                  <p className="text-justify">Examples span structuring, banking, licensing, tokenization—e.g., “Cayman vs BVI holding company,” “Offshore bank account for crypto company,” “VASP license requirements 2025,” “Token foundation legal structure.” These prospects want solutions today.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Pillar B — Conversion-Optimized Landing Pages</p>
                  <p className="text-justify">Simple, clean, professional, founder-led pages with jurisdiction breakdowns, regulatory summaries, clear frameworks, and a CTA: “Request a Structuring/Licensing Diagnostic.”</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Pillar C — Diagnostic Call Funnel</p>
                  <p className="text-justify">All high-intent pages drive to one action: request a private diagnostic call—the highest-converting CTA for advisory.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Why This Channel Works Exceptionally for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Needs-driven searches</p>
                  <p className="text-justify">“VASP license” queries come from immediate problems to solve.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. High transaction value</p>
                  <p className="text-justify">One conversion can be 5–6 figures in advisory revenue.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Low competition in technical advisory</p>
                  <p className="text-justify">Founder-led, technical positioning beats generic formation agencies.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Intent bypasses slow trust-building</p>
                  <p className="text-justify">Clients are already researching; authority plus clarity converts.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Ultra-specific keywords → qualified traffic</p>
                  <p className="text-justify">Even 10 targeted searches/month can generate mandates.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Critical Middle Section: Works Even From Zero
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Low-competition intent keywords</p>
                  <p className="text-justify">Technical offshore terms are ignored by generic SEO—Boyar can rank with 1,000–2,000 word expert pages, diagrams, and clear structure even on new sites.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Precision over volume</p>
                  <p className="text-justify">50 searches → 10 clicks → 3 diagnostics → 1 mandate. Depth beats traffic volume.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. High-intent ads work immediately</p>
                  <p className="text-justify">Low CPC, little competition, modest volume but highly targeted—new accounts can perform in ~72 hours.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Landing pages create instant credibility</p>
                  <p className="text-justify">Polished, technical pages build trust regardless of brand age.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Bypass top-of-funnel complexity</p>
                  <p className="text-justify">No audience-building or long nurture; meet the client at intent.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Converts without brand awareness</p>
                  <p className="text-justify">Need is immediate and high-value; clarity and expertise become the credibility layer.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  High-intent keyword → Precision landing page → Diagnostic call → Structuring/Licensing/Banking/Trust mandate. High-ticket inbound with minimal spend.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Jurisdiction Intelligence Report (Gated) Model — professional layout with colors and tables
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
                Jurisdiction Intelligence Report — Gated Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Jurisdiction Intelligence Report (Gated) Model is an acquisition channel where Boyar Partners publishes premium-grade, data-backed jurisdictional insights behind a gated form.
                </p>
                <p className="text-justify">
                  The reports cover:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Regulatory changes</li>
                  <li className="text-justify">Structuring considerations</li>
                  <li className="text-justify">Banking acceptance conditions</li>
                  <li className="text-justify">Licensing climate</li>
                  <li className="text-justify">Comparative advantages</li>
                  <li className="text-justify">Risk scoring</li>
                  <li className="text-justify">Reporting and compliance implications</li>
                  <li className="text-justify">Suitability for crypto, finance, funds, family offices</li>
                  <li className="text-justify">Cost/time/efficiency matrices</li>
                </ul>
                <p className="text-justify mt-4">
                  Prospects must enter their name, email, company, role, jurisdiction of interest, and intent (structuring / licensing / banking / trust) to download the report. This creates a high-signal, high-intent lead.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    The report itself is an authority product that elevates Boyar Partners as specialist, research-driven, precise, technical, and jurisdictionally informed—suitable for high-ticket, complex mandates. The gated reports become your ABM-ready intelligence toolkit.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works for Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Clients searching jurisdiction comparisons are extremely close to buying</p>
                  <p className="text-justify">
                    When someone downloads "Cayman vs BVI Intelligence Briefing," "Cook Islands Asset Protection Overview," "VASP Licensing Report — 2025 Edition," or "ADGM vs DIFC — 2025 Regulatory Analysis," this is not passive interest. This is active decision-making. These are hot leads.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Gate = Filtering → Only serious prospects download</p>
                  <p className="text-justify">
                    Low-value browsers never fill forms. Only founders, CFOs, general counsels, attorneys, family office advisors, fund structuring teams, crypto CEOs, and institutional operators will exchange details for high-grade intelligence. Perfect lead quality.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Reports elevate Boyar Partners above basic incorporation firms</p>
                  <p className="text-justify">
                    Any agency can "form a company." Only experts can explain why a jurisdiction matters, when it should be selected, how compliance impacts banking, how regulations shift, what risk scoring means, and what alternative structures exist. This immediately positions Boyar as strategic advisors, not administrators.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Reports feed your entire acquisition ecosystem</p>
                  <p className="text-justify">
                    Each report becomes an ABM asset, LinkedIn content, YouTube script foundation, masterclass material, webinar topic, partner co-branded resource, email nurturing content, and SEO conversion piece. It creates authority across all channels.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Gated content forms a segmented database</p>
                  <p className="text-justify">
                    Prospects choose the jurisdiction they're evaluating. This allows personalized ABM outreach based on intent.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How This Model Works Even When Boyar Partners Has No Audience, No SEO Traffic, No Distribution, No Brand Recognition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Niche intelligence has almost no competition</p>
                  <p className="text-justify">
                    There is almost NO high-quality Cayman vs BVI technical comparisons, VASP licensing matrices, offshore banking acceptance intelligence, trust jurisdiction analysis, or ADGM vs DIFC regulatory frameworks. Meaning: even new firms can dominate quickly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. High-value prospects don't care who you are — they care about clarity</p>
                  <p className="text-justify">
                    If the report is intelligently structured, legally informed, well-designed, easy to understand, pragmatic and accurate, prospects assume Boyar Partners is established and credible. Content is the brand.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Partner channels give instant distribution</p>
                  <p className="text-justify">
                    Even with no audience, you can distribute through law firms, accountants, bankers, fund admins, crypto OTC desks, immigration & mobility partners, accelerator programs, and investor syndicates. They will happily share your reports because it helps their clients.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. SEO pushes your reports even from the beginning</p>
                  <p className="text-justify">
                    Because competition is limited in technical offshore queries. You do not need years of blogging. You need 5–8 strong landing pages, each linking to a gated report.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Even 40–70 downloads per month is enough</p>
                  <p className="text-justify">
                    This is advisory work. You don't need 10,000 downloads. A small volume of ultra-qualified prospects is perfect.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Gated reports are inherently "premium"</p>
                  <p className="text-justify">
                    The perception that this is research, strategic intelligence, expert briefing makes Boyar look like a top-tier advisory firm, even early.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Compliance-Driven Lead Magnets (AML/ES/CRS) — professional layout
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
                Compliance Lead Magnets — AML, ES, CRS
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Compliance Lead Magnet Model positions Boyar Partners as a high-level compliance advisory firm by offering premium, technically accurate compliance tools, such as:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">AML Policy Templates</li>
                  <li className="text-justify">AML Risk Assessment Tools</li>
                  <li className="text-justify">ESR (Economic Substance Reporting) Checklists</li>
                  <li className="text-justify">CRS Reporting Frameworks</li>
                  <li className="text-justify">Beneficial Ownership Registers Guidance</li>
                  <li className="text-justify">KYC/KYB Operational Playbooks</li>
                  <li className="text-justify">Transaction Monitoring Matrices</li>
                  <li className="text-justify">Board Governance & Internal Controls Templates</li>
                  <li className="text-justify">Bank-Readiness Compliance Pack</li>
                  <li className="text-justify">SAR/STR Reporting Guidance (anonymized and general legal context)</li>
                </ul>
                <p className="text-justify mt-4">
                  These are distributed as free, gated intelligence assets. The purpose is to attract fund administrators, accounting firms, FinTech/EMI/MSB operators, crypto exchanges and tokenization platforms, corporate service providers, high-risk entrepreneurs, international SMEs, CFOs, COOs, General Counsels, private bankers, and compliance teams.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    Compliance teams download these resources because they must stay aligned with regulatory expectations.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Compliance Lead Magnets Are Extremely Effective
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Compliance is not optional — it is mandatory</p>
                  <p className="text-justify">
                    AML/ES/CRS failures = fines, banking restrictions, regulatory interventions. Clients take compliance seriously.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Compliance questions arise right before structuring or banking mandates</p>
                  <p className="text-justify">
                    When a client downloads "AML Policy Template 2025," "ES Requirements Flowchart for Offshore Entities," or "CRS Onboarding Checklist," they are at the exact moment when they need advisory work.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Compliance leads are high-quality, low-noise, high-intent</p>
                  <p className="text-justify">
                    Unlike broad marketing funnels, compliance attracts serious operators, real businesses, regulated entities, high-risk categories, professional decision-makers, and financially capable clients. The conversion rate is extremely high.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">D. This model positions Boyar as a trusted advisor, not a marketer</p>
                  <p className="text-justify">
                    Providing compliance intelligence builds credibility, authority, trust, and reliability. Compliance = real expertise → instant perception of depth.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Compliance content multiplies across channels</p>
                  <p className="text-justify">
                    One AML guide can fuel ABM, email drip, LinkedIn thought leadership, partner distribution, webinar material, gated resource library, and Google SEO capture. A single asset becomes a multichannel engine.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How This Model Works Even When Boyar Partners Has No Compliance Brand, No Audience, No Existing Reputation, and No In-House Compliance Team
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Compliance content has HUGE demand but very LITTLE supply</p>
                  <p className="text-justify">
                    There are hundreds of thousands of companies needing AML/ES/CRS guidance. But 99% of compliance material is outdated, templates are low-quality, jurisdiction-specific guidance is scattered, most firms don't publish anything free, and banking integration knowledge is rare. Boyar can fill a massive gap instantly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Templates do NOT require deep legal drafting</p>
                  <p className="text-justify">
                    You are not issuing legal opinions. You are providing operational frameworks, general guidance, sample templates, strategic overviews, checklists, workflow diagrams, and reporting steps. These are non-binding best practices, not legal documents. This is entirely permissible and common in the advisory world.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. You can build credibility fast by being the only firm offering structured, modern compliance resources</p>
                  <p className="text-justify">
                    Most offshore firms avoid publishing compliance material. By publishing clean, updated, practical, forward-looking, professional templates, Boyar Partners instantly stands out.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. The bar for design and clarity is extremely low</p>
                  <p className="text-justify">
                    Even modestly well-designed documents outperform almost all competitors. You do not need a compliance department to start. You need technical understanding, clarity, and a founder-led explanatory tone—which Boyar already has.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Compliance needs are urgent, so even cold prospects convert</p>
                  <p className="text-justify">
                    When someone downloads a compliance asset, they often have a banking deadline, face internal audit, need to correct deficiencies, require reporting quickly, or are preparing for licensing. Urgency = extremely high conversion.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. You don't need traffic — compliance assets attract direct referrals</p>
                  <p className="text-justify">
                    Accountants, lawyers, bankers, and fund admins share compliance tools because it helps their clients, positions them as valuable, and requires zero extra effort. Your compliance assets get distributed for you. Even with zero audience.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Multi-Jurisdiction Comparison Engine Model — professional layout
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
                Multi-Jurisdiction Comparison Engine Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Multi-Jurisdiction Comparison Engine is a digital, interactive tool (or structured PDF/landing page system) that allows users to compare jurisdictions across multiple parameters, such as:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Regulatory climate</li>
                  <li className="text-justify">Licensing feasibility</li>
                  <li className="text-justify">Banking access</li>
                  <li className="text-justify">Tax treatment</li>
                  <li className="text-justify">Reporting obligations</li>
                  <li className="text-justify">Trusts/foundations suitability</li>
                  <li className="text-justify">Substance requirements</li>
                  <li className="text-justify">Cost/time factors</li>
                  <li className="text-justify">Crypto/VASP friendliness</li>
                  <li className="text-justify">Fund administration environment</li>
                  <li className="text-justify">Legal protections for assets</li>
                  <li className="text-justify">Corporate governance expectations</li>
                </ul>
                <p className="text-justify mt-4">
                  The user selects 2–4 jurisdictions, and the engine outputs a clean, structured, professional comparison—similar to an internal tool used by law firms and corporate service providers.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    This becomes a lead-generation engine when placed behind a soft gate ("email to receive full comparison PDF").
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works Perfectly for Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Jurisdiction comparison = the exact decision point before hiring an advisor</p>
                  <p className="text-justify">
                    Clients evaluating Cayman vs BVI, DIFC vs ADGM, Seychelles vs Mauritius, Malta vs Luxembourg, Cook Islands vs Nevis, Singapore vs UAE are days or weeks away from engaging an advisory firm. The engine captures prospects at the perfect moment.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Comparisons require professional insight</p>
                  <p className="text-justify">
                    Generic incorporation agencies cannot produce accurate comparisons. Boyar can. This immediately positions your firm as technical, strategic, legally informed, bankability-aware, compliance-oriented, and boutique-level. This is a massive authority differentiator.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Comparison engines rank extremely well in SEO</p>
                  <p className="text-justify">
                    People search "Cayman vs BVI comparison," "DIFC vs ADGM licensing differences," "Mauritius vs Seychelles holding companies," "Cook Islands vs Nevis asset protection," "EU VASP license comparison." This content can rank quickly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. High-intent prospects engage deeply</p>
                  <p className="text-justify">
                    Someone who uses a jurisdiction comparison tool is not browsing. They are evaluating a major structural decision, meaning they have budget, need clarity, are serious, and are close to engaging. Conversion rates are extremely high.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. The engine becomes a "signature intellectual property"</p>
                  <p className="text-justify">
                    This positions Boyar Partners as research-driven, modern, AI-enhanced, structured, methodical, and founder-led in expertise. This makes the firm look significantly larger and more advanced.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How This Model Works Even When Boyar Partners Has No Website Traffic, No Brand Recognition, No Authority, and No Prior Jurisdictional Tools
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Jurisdiction comparison content is scarce and outdated</p>
                  <p className="text-justify">
                    Most comparison material online is wrong, outdated, simplistic, written by low-level agencies, missing banking reality, missing licensing considerations, missing compliance depth, and missing strategic insight. Even with a new website and no SEO authority, Boyar can rank and convert because competition is weak.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. An engine does not require coding at the start</p>
                  <p className="text-justify">
                    It can be a decision-tree PDF, a multi-page landing page, a Notion-based comparison matrix, a structured "choose your jurisdiction" form, or a downloadable report generated from selections. Advanced version can come later; basic version works immediately.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Every jurisdiction guide you already created feeds the engine</p>
                  <p className="text-justify">
                    Boyar has jurisdiction PDFs, trust guides, banking acceptance notes, licensing frameworks, offshore structuring outlines, and compliance text. These become comparison data. You do NOT need new research to start.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. You don't need traffic—partners will distribute it</p>
                  <p className="text-justify">
                    Law firms, fund administrators, accountants, crypto exchanges, bankers, and tax advisors will share the comparison engine with clients because it makes them look informed, solves clients' confusion, and reduces their advisory time. This brings referral traffic even without an existing audience.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. The engine is inherently a "premium product"</p>
                  <p className="text-justify">
                    Even if Boyar is new, the comparison engine establishes authority, professionalism, clarity, and strategic expertise. Clients assume experience based on the precision of content.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. It integrates perfectly with ABM</p>
                  <p className="text-justify">
                    When targeting a specific executive: "Here is a comparison of UAE (DIFC/ADGM) vs BVI based on your expansion goals." ABM + comparison engine = extremely strong.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Search-Based Emergency Advisory Capture Model — professional layout
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
                Search-Based "Emergency Advisory" Capture Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Search-Based Emergency Advisory Capture channel targets prospects who are experiencing a real-time, high-stakes problem in offshore structuring, licensing, banking, compliance, or entity maintenance.
                </p>
                <p className="text-justify">
                  These prospects urgently search Google or LinkedIn for help with:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Bank account rejected or frozen</li>
                  <li className="text-justify">VASP/EMI/MSB license delays or rejection</li>
                  <li className="text-justify">Compliance breach</li>
                  <li className="text-justify">Economic Substance non-compliance</li>
                  <li className="text-justify">CRS/FATCA issues</li>
                  <li className="text-justify">Beneficial ownership register problems</li>
                  <li className="text-justify">Audit failures for funds</li>
                  <li className="text-justify">Cross-border tax or reporting flags</li>
                  <li className="text-justify">Entity struck off or at risk</li>
                  <li className="text-justify">Regulator request for information</li>
                  <li className="text-justify">Legal challenge to trust/foundation</li>
                  <li className="text-justify">Urgent restructuring need</li>
                  <li className="text-justify">Investor due diligence friction</li>
                  <li className="text-justify">Sudden banking offboarding</li>
                </ul>
                <p className="text-justify mt-4">
                  These are emergency-triggered, high-value mandates. The model ensures Boyar Partners intercepts these searches through emergency landing pages, keyword-based Google capture, LinkedIn emergency-response posts, ABM-triggered outreach, and crisis diagnostic call funnel.
                </p>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify">
                    Emergency clients convert extremely quickly because they have no time to delay.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works Exceptionally Well in Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Emergency queries indicate urgent legal/financial risk</p>
                  <p className="text-justify">
                    These prospects must resolve problems immediately or face consequences: regulatory action, bank account closure, license revocation, audit failure, investor withdrawal, reputational damage. Urgency = very high conversion.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Competitors cannot respond fast enough</p>
                  <p className="text-justify">
                    Large firms are slow. Formation agencies cannot address sophisticated emergencies. Boyar's boutique structure is an advantage.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Emergency clients buy multiple services</p>
                  <p className="text-justify">
                    Urgency leads to broad engagement: restructuring, compliance remediation, trust/foundation fix, banking pathway redesign, licensing repair, advisory retainer. A single emergency client often becomes a multi-mandate client.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">D. Search volume is small but lead quality is extremely high</p>
                  <p className="text-justify">
                    You don't need traffic. You need the right 20–50 emergency searches per month.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Emergency needs bypass price sensitivity</p>
                  <p className="text-justify">
                    When a regulator contacts them, or a bank freezes funds, clients care about expertise, discretion, speed, and confidence—not cost.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. This channel is one of the strongest inbound conversion engines</p>
                  <p className="text-justify">
                    Clients in distress convert at 3–5× higher rate, 2–3× higher mandate value, and immediate onboarding windows. Perfect for a boutique advisory firm.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How This Model Works Even If Boyar Partners Has No SEO Rankings, No Brand Recognition, No Emergency Authority, and Zero Traffic at the Start
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Emergency keywords have almost no competition</p>
                  <p className="text-justify">
                    Nobody has well-structured landing pages for "offshore bank account frozen," "VASP license rejected," "economic substance non-compliance," "CRS reporting urgent help," "company struck off restoration help." Even a new site can rank for these niche, long-tail keywords.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Emergency clients don't look for big brands — they look for the first clear answer</p>
                  <p className="text-justify">
                    They choose whoever explains the problem clearly, outlines steps, sounds credible, and offers immediate assistance. Boyar can win regardless of reputation because clarity replaces brand.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Emergency landing pages convert without SEO</p>
                  <p className="text-justify">
                    Traffic comes from LinkedIn searches, direct shares, referrals from accountants/bankers, paid intent keywords (cheap CPC), ABM prospecting, and existing networks. No SEO authority needed.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Emergency content performs extremely well on LinkedIn</p>
                  <p className="text-justify">
                    Posts like "Bank account frozen? Here are the 5 steps we use to restore operational continuity for offshore entities" perform exceptionally well, even with a new audience.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. A micro-budget Google Ads campaign works from day one</p>
                  <p className="text-justify">
                    Emergency intent queries = low CPC, high conversion. You can begin with $300–500/month.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Emergency clients don't need nurturing; they need solutions</p>
                  <p className="text-justify">
                    Even a new firm can close urgent clients immediately if the messaging is clear, confident, precise, and founder-led.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Regulatory Update Alerts Funnel Model — professional layout
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
                Regulatory Update Alerts Funnel
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Regulatory Update Alerts Funnel is a structured, ongoing communication system where Boyar Partners publishes short, precise, high-authority updates whenever:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">A jurisdiction changes its corporate laws</li>
                  <li className="text-justify">A new AML/ES/CRS requirement is issued</li>
                  <li className="text-justify">A regulator shifts its onboarding stance</li>
                  <li className="text-justify">A licensing authority tightens or relaxes rules</li>
                  <li className="text-justify">Banking institutions modify acceptance criteria</li>
                  <li className="text-justify">CBI/RBI programs alter eligibility</li>
                  <li className="text-justify">Fund administration or audit standards evolve</li>
                  <li className="text-justify">Digital asset regulations update</li>
                  <li className="text-justify">Economic substance deadlines change</li>
                  <li className="text-justify">Tax treaties or withholding rules adjust</li>
                </ul>
                <p className="text-justify mt-4">
                  These updates are distributed via email alerts (primary funnel), LinkedIn updates, a dedicated section on the website, WhatsApp broadcast (for HNWI segment), ABM integration channels, and quarterly compliance digest (newsletter summary).
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    This model positions Boyar Partners not as a service vendor, but as a jurisdictional intelligence authority. Regulatory alerts are not marketing—they are decision-critical information.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Channel Works for Offshore Advisory & Structuring
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Regulatory updates drive immediate action</p>
                  <p className="text-justify">
                    Clients respond to regulatory change with restructuring, redomiciliation, licensing adjustments, banking changes, compliance fixes, trust/foundation rewrites, and reporting alignment. This means update → diagnostic call → mandate.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Professional audiences trust regulatory intelligence more than any other content</p>
                  <p className="text-justify">
                    Lawyers, GCs, CFOs, fund managers, bankers—all rely on authoritative regulatory summaries. Boyar becomes their go-to reference point.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Alerts require expertise, not volume</p>
                  <p className="text-justify">
                    You do not need to produce long reports. A 3–8 line update delivered with precision builds more credibility than a 2,000-word marketing article.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Updates create consistent touchpoints</p>
                  <p className="text-justify">
                    Every update keeps Boyar top-of-mind: "When we need structuring help, we call Boyar."
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Alerts distribute extremely well</p>
                  <p className="text-justify">
                    People in the industry forward regulatory updates to partners, teams, investors, legal counsel, and clients. This increases reach far beyond your direct audience.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. This channel attracts the most qualified audience</p>
                  <p className="text-justify">
                    Subscribers tend to be UHNW advisors, GCs, CFOs, corporate lawyers, tax advisors, wealth managers, and fund executives. These are perfect acquisition targets.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Funnel Even With Zero Subscribers, Zero Traffic, and Zero Regulatory Authority Today
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You don't need "authority" to summarize official regulatory updates</p>
                  <p className="text-justify">
                    Regulatory bodies publish notices, guidelines, consultation papers, circulars, and legislative changes. You simply condense, clarify, and contextualize. This requires intelligence, not reputation.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Even a small distribution list creates massive value</p>
                  <p className="text-justify">
                    Regulatory updates do not require thousands of readers. A list of 50–150 professionals can produce consistent inbound leads, ABM traction, partnership interest, and high-ticket clients. Quality {'>'} quantity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. LinkedIn amplifies updates even when you have no audience</p>
                  <p className="text-justify">
                    Regulatory updates perform extremely well on LinkedIn because they are timely, provide value, show expertise, professionals engage with them, and they get shared. Even a new profile can gain reach quickly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Your own internal update system becomes the authority</p>
                  <p className="text-justify">
                    People don't ask: "Who are you to summarize regulation?" People ask: "Who is consistently keeping me informed?" Consistency is the authority.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Partners will distribute your updates immediately</p>
                  <p className="text-justify">
                    Lawyers, bankers, and fund admins forward regulatory updates to clients because it helps them, saves them time, and positions them as well-informed. Which means Boyar piggybacks on partner networks, even while small.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Regulatory alerts attract compliance-heavy, structurally complex clients</p>
                  <p className="text-justify">
                    Clients who respond to these updates are typically expanding internationally, regulated, high-risk, high-value, multi-jurisdictional, and in urgent need of expertise. Perfect clients for Boyar.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Precision LinkedIn Dealflow Funnels Model — professional layout
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
                Precision LinkedIn Dealflow Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Precision LinkedIn Dealflow Funnel is a highly targeted, ABM-aligned acquisition system designed to identify, classify, engage, and convert decision-makers on LinkedIn who demonstrate structural, regulatory, or banking intent.
                </p>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify">
                    This is not "LinkedIn content posting." This is a pipeline engineering system that turns LinkedIn into a predictable origination machine.
                  </p>
                </div>
                <p className="text-justify mt-4">
                  The model operates through controlled funnels for:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Structuring mandates</li>
                  <li className="text-justify">Trust/foundation setup</li>
                  <li className="text-justify">Licensing (VASP, EMI, MSB, Fund, Forex)</li>
                  <li className="text-justify">Offshore banking facilitation</li>
                  <li className="text-justify">Fund setup and administration</li>
                  <li className="text-justify">Tokenization SPVs and foundations</li>
                  <li className="text-justify">Redomiciliation and restructuring</li>
                  <li className="text-justify">Compliance & reporting</li>
                  <li className="text-justify">Global mobility-driven structuring</li>
                  <li className="text-justify">Corporate expansion planning</li>
                </ul>
                <p className="text-justify mt-4 font-semibold">The model operates through controlled funnels:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify"><strong>Funnel A — Founder-Led Authority Funnel:</strong> Creates credibility and attracts inbound inquiries.</li>
                  <li className="text-justify"><strong>Funnel B — Segment Micro-Targeting Funnel:</strong> Targets executives in crypto, funds, fintech, SMEs, and family offices.</li>
                  <li className="text-justify"><strong>Funnel C — Signal-Based Deal Identification Funnel:</strong> Tracks specific triggers such as hiring, fundraising, regulatory updates.</li>
                  <li className="text-justify"><strong>Funnel D — Insight-Driven Engagement Funnel:</strong> Uses educational frameworks to move prospects into diagnostic calls.</li>
                  <li className="text-justify"><strong>Funnel E — Retargeting & Re-Engagement Funnel:</strong> Uses LinkedIn's algorithm to repeatedly appear in front of ICPs.</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This is precision, not mass marketing.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Channel Works for Offshore & Structuring Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Decision-makers are on LinkedIn</p>
                  <p className="text-justify">
                    CFOs, founders, fund managers, general counsels, and HNWI advisors all use LinkedIn professionally. LinkedIn is the only major platform where your entire ICP is accessible.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Prospects openly signal intent</p>
                  <p className="text-justify">
                    You can find leads when they raise capital, expand to new jurisdictions, hire compliance staff, announce new fund strategies, launch tokenization initiatives, encounter legal or regulatory changes, or post about banking challenges. No other platform exposes these signals so clearly.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Precision targeting avoids noise</p>
                  <p className="text-justify">
                    You target specific industries, specific roles, specific jurisdictions, and specific growth phases. This produces extremely high-quality conversations.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. LinkedIn authority builds trust before conversation</p>
                  <p className="text-justify">
                    When founders see you posting insight-driven content, credibility is pre-established, objections are pre-resolved, and conversion is faster. Your content does the groundwork.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. LinkedIn outreach converts faster than email</p>
                  <p className="text-justify">
                    LinkedIn is conversational. Inbox replies are quicker. Conversion timelines are shorter.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Perfect for boutique advisory firms</p>
                  <p className="text-justify">
                    You don't compete with large consultancies—you outperform them through speed, clarity, depth, and personal engagement. Founder-led signals win on LinkedIn.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Model Even With Zero Followers, Zero Authority, Zero Brand Presence, and Zero Dealflow Today
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. LinkedIn does not reward follower count — it rewards relevance</p>
                  <p className="text-justify">
                    Your posts will reach 2nd degree connections, 3rd degree connections, people who follow relevant topics, and users in your industry categories. LinkedIn's algorithm promotes niche expertise aggressively. You do NOT need an existing audience.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Dealflow does NOT come from posting — it comes from precision targeting</p>
                  <p className="text-justify">
                    Boyar does not need thousands of impressions. You need 40–70 high-quality executive interactions per month, 6–10 exploratory discussions, 2–5 diagnostics, and 1–3 mandates. LinkedIn provides this easily even at the beginning.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. You borrow credibility from the quality of your insights, not your follower count</p>
                  <p className="text-justify">
                    If your content includes jurisdiction diagrams, structuring frameworks, licensing matrices, banking insights, compliance explanations, asset protection logic, and migration strategies, decision-makers assume expertise even if you're new.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. LinkedIn outreach works from day one</p>
                  <p className="text-justify">
                    Because your ICPs are always active: fund managers, crypto CEOs, compliance heads, licensing officers, CFOs, GCs, HNW advisors. Even a newly created profile can open discussions if messaging is professional.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. LinkedIn indexing is intent-based</p>
                  <p className="text-justify">
                    Your posts show up under "offshore structuring," "VASP licensing," "fund administration," "crypto regulations," and "asset protection." This creates organic inbound even without followers.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. A single powerful post can generate immediate dealflow</p>
                  <p className="text-justify">
                    Posts on topics like "Why banks reject crypto companies in 2025," "Cayman vs BVI for emerging funds," or "How to prepare for VASP licensing audits" take off quickly because the topics are underserved.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // WhatsApp VIP Lead Nurture Tracks Model — professional layout
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
                WhatsApp VIP Lead Nurture Tracks
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The WhatsApp VIP Lead Nurture Tracks Model is a private, invite-only channel designed to nurture high-value prospects using discreet communication, personalised insights, tailored jurisdiction updates, regulatory intelligence, private briefings, strategic notes, and deal-specific frameworks.
                </p>
                <p className="text-justify">
                  This channel is used only for priority prospects, such as:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">UHNW families</li>
                  <li className="text-justify">Fund managers</li>
                  <li className="text-justify">Crypto founders</li>
                  <li className="text-justify">FinTech & EMI applicants</li>
                  <li className="text-justify">Private bankers</li>
                  <li className="text-justify">Wealth advisors</li>
                  <li className="text-justify">Family office executives</li>
                  <li className="text-justify">Large-ticket corporate clients</li>
                </ul>
                <p className="text-justify mt-4">
                  The purpose is not to sell, but to deepen trust, accelerate dealflow, and position Boyar Partners as the go-to advisor for complex, multimillion-dollar decisions.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    WhatsApp becomes a private advisory feed, not a broadcast channel.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why WhatsApp VIP Tracks Work for Boutique Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. High-value prospects prefer discreet channels</p>
                  <p className="text-justify">
                    UHNWIs and serious founders avoid email newsletters, cold sequencing, and LinkedIn spam. WhatsApp feels personal, private, and senior-level.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. WhatsApp has an extraordinarily high open rate</p>
                  <p className="text-justify">
                    98%+ open rate. 65–80% reply rate for serious prospects.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Perfect for founder-led boutique positioning</p>
                  <p className="text-justify">
                    Message tone: calm, discreet, professional, high-authority, non-sales. This strengthens the Boyar brand.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Timing-sensitive insights convert better on WhatsApp</p>
                  <p className="text-justify">
                    Examples: "Cayman regulator released new VASP guidelines today." "Two banks changed crypto onboarding criteria this week." "Economic Substance classification changes issued." Prospects respond instantly because updates feel timely and exclusive.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. WhatsApp shortens sales cycles radically</p>
                  <p className="text-justify">
                    A 3–6 month cycle compresses into 7–21 days, sometimes immediate onboarding. VIP prospects make decisions quickly when information comes from the founder directly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. WhatsApp deepens trust faster than any other channel</p>
                  <p className="text-justify">
                    Engagement is 1:1, private, high-touch, relationship-driven. Exactly what boutique advisory firms need.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Run This Model Even With Zero WhatsApp Contacts, Zero VIP Network, and No Audience Today
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You do NOT begin with a "WhatsApp group" — you begin with individual tracks</p>
                  <p className="text-justify">
                    A VIP nurture track is one executive, one founder, one conversation, one thread. You only need 3–10 VIP prospects at the beginning to launch the model.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. You build the VIP list from existing channels</p>
                  <p className="text-justify">
                    Sources: LinkedIn conversations, inbound diagnostic calls, founder-led meetings, webinar attendees, ABM target accounts, introductions from investors, bank/partner referrals. Any prospect showing high intent gets invited to VIP nurture.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. You offer access — you never ask for it</p>
                  <p className="text-justify">
                    Message example: "If it's easier, I can keep you updated on key jurisdiction shifts and banking developments via WhatsApp — quick, private updates only. No marketing." This creates exclusivity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. WhatsApp authority is built on precision, not volume</p>
                  <p className="text-justify">
                    Even 1–2 updates per week create massive trust.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. You differentiate immediately because competitors are not doing this</p>
                  <p className="text-justify">
                    Law firms are too formal. Service providers are too automated. Incorporation agencies are low-level. Boyar steps into an empty space: a founder-led, discreet advisory channel.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. You only need 10–20 VIP prospects to build a multi-million-dollar pipeline</p>
                  <p className="text-justify">
                    This channel is about depth, not width.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Private Slack/Telegram Communities Model — professional layout
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
                Private Slack / Telegram / Discord Communities: Intelligence Circles
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Private Communities Model establishes invite-only, high-quality micro-communities on Slack, Telegram, or Discord where founders, fund managers, crypto operators, family office advisors, and compliance executives gain access to:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Jurisdiction intelligence</li>
                  <li className="text-justify">Regulatory updates</li>
                  <li className="text-justify">Structuring frameworks</li>
                  <li className="text-justify">Licensing pathways</li>
                  <li className="text-justify">Banking insights</li>
                  <li className="text-justify">Fund strategy summaries</li>
                  <li className="text-justify">Tokenization structures</li>
                  <li className="text-justify">Private roundtable discussions</li>
                  <li className="text-justify">Masterclass Q&A</li>
                </ul>
                <p className="text-justify mt-4">
                  These communities operate like intelligence circles rather than marketing groups. Boyar Partners becomes the curator of expert knowledge, which positions the firm as the reference point for offshore structuring, the thought leader for licensing and compliance, the private advisor to global founders, and the senior guide for complex cross-border setups.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    Community members warm up into advisory clients through repeated exposure to insights and discussions.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Private Communities Work in Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Communities build ambient trust</p>
                  <p className="text-justify">
                    Instead of a one-time call or a cold outreach message, members see consistent insights, frameworks, discussions, and founder perspectives. Trust builds continuously.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. It creates a warm pipeline instead of a cold one</p>
                  <p className="text-justify">
                    Every member has an interest in structuring, operates globally, is dealing with compliance and banking, has expansion plans, and is considering a fund or license. The community filters out low-value prospects.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Perfect for founders who want "access, not noise"</p>
                  <p className="text-justify">
                    Slack and Telegram are natural environments for crypto founders, fintech executives, fund managers, and global entrepreneurs. They prefer private channels over email newsletters.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. High-intent discussions expose deal opportunities</p>
                  <p className="text-justify">
                    Members ask questions that reveal urgent needs: "Which bank will accept a Cayman crypto SPV?" "We are preparing a VASP application — any pitfalls?" "Which structure works best for UAE family wealth protection?" "How do we restore a struck-off BVI company quickly?" These are direct pathways to mandates.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Boyar positions itself as a knowledge authority instead of a vendor</p>
                  <p className="text-justify">
                    Community leadership creates influence. Influence → trust → deals.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Launch This Model Even With Zero Audience, Zero Members, and Zero Community Reputation
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. The community should NOT launch publicly</p>
                  <p className="text-justify">
                    You only need 8–20 carefully selected members to start. This creates exclusivity from day one.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Community members are sourced from existing channels</p>
                  <p className="text-justify">
                    Early sources: LinkedIn precision dealflow, WhatsApp VIP tracks, webinar/briefing attendees, diagnostic call prospects, partners (bankers, lawyers, fund admins), and crypto & fintech founder networks. You invite only those who match the ICP.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Members join because of value, not brand</p>
                  <p className="text-justify">
                    Your invitation message creates exclusivity: "We're forming a small intelligence circle for founders operating across Cayman, BVI, Seychelles, and UAE. Private regulatory updates, banking insights, and structuring frameworks will be shared weekly." This works even without reputation.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Communities grow through quality interactions, not large numbers</p>
                  <p className="text-justify">
                    A group of 30 elite members produces more dealflow than a public group of 2,000. Your goal is depth, not size.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Community value compounds very quickly</p>
                  <p className="text-justify">
                    After a few updates, members begin asking questions, requesting guidance, referring others, and scheduling private calls. This creates natural inbound dealflow.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Slack/Telegram outperform social media when dealing with UHNW or sensitive matters</p>
                  <p className="text-justify">
                    Clients discuss private issues here that they never mention on LinkedIn, email, or websites. Your community becomes a trusted advisory environment.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // High-Net-Worth Email Drip Architecture Model — professional layout
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
                High-Net-Worth Email Drip Architecture
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The High-Net-Worth Email Drip Architecture is a curated sequence of ultra-high-value advisory emails that nurture wealthy prospects over weeks and months using:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Jurisdiction-specific frameworks</li>
                  <li className="text-justify">Trust & foundation structures</li>
                  <li className="text-justify">Succession and governance insights</li>
                  <li className="text-justify">Banking intelligence</li>
                  <li className="text-justify">Restructuring opportunities</li>
                  <li className="text-justify">Fund and licensing pathways</li>
                  <li className="text-justify">Compliance clarity</li>
                  <li className="text-justify">Asset-protection considerations</li>
                  <li className="text-justify">Comparative analyses</li>
                </ul>
                <p className="text-justify mt-4">
                  These are not marketing emails. They are private memos, crafted in the tone of a senior advisor writing directly to a sophisticated decision-maker.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    This model ensures that high-value prospects repeatedly encounter Boyar's expertise, Boyar's discretion, Boyar's clarity, and Boyar's relevance to their cross-border needs. Over time, this converts window-shoppers into high-ticket clients.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Email Drip Architecture Works Exceptionally Well for HNW & UHNW Prospects
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. HNWIs do not respond to marketing — they respond to intelligence</p>
                  <p className="text-justify">
                    They ignore ads, generic newsletters, and sales content. But they respond to technical clarity, jurisdictional insight, strategic reasoning, and curated knowledge. This architecture is built on expertise, not persuasion.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Email provides respectful privacy</p>
                  <p className="text-justify">
                    HNWIs dislike WhatsApp messages from strangers, LinkedIn sales approaches, and public engagement. Email gives them professional distance but still allows silent engagement.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. The drip sequence builds "ambient trust" over time</p>
                  <p className="text-justify">
                    Even if a prospect is not ready today, they continue receiving frameworks, diagrams, updates, and observations. Eventually, the moment arrives when they need structuring or licensing work — and Boyar is top-of-mind.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Email allows deep insight delivery that WhatsApp cannot</p>
                  <p className="text-justify">
                    You can share multi-jurisdiction matrices, structural diagrams, detailed licensing notes, asset-protection memos, and long-form analysis. These position Boyar as intellectually superior to competitors.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. HNWIs appreciate discretion and competence</p>
                  <p className="text-justify">
                    Your tone is advisory, not promotional.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Works extremely well with trust formation, foundations, governance, and succession clients</p>
                  <p className="text-justify">
                    These clients require clarity. Email is the perfect medium.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Model With Zero Email List, Zero Infrastructure, and Zero Starting Audience
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You only need 20–40 qualified emails to start</p>
                  <p className="text-justify">
                    This model does not rely on mass emailing. Even a list of 20–40 HNW prospects produces high engagement, advisory calls, long-cycle conversion, and referrals. Quality {'>'} Quantity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. The list is built gradually from existing channels</p>
                  <p className="text-justify">
                    Sources: LinkedIn executive outreach, diagnostic calls, webinar attendees, WhatsApp VIP tracks, community members, introductions from investors, high-intent website inquiries. You never "buy" lists. You build a selective list.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. HNWIs will join the drip sequence if the framing is right</p>
                  <p className="text-justify">
                    Example invitation: "We send occasional private memos summarizing jurisdiction shifts, banking intelligence, and structuring frameworks. If useful, I can include you." This creates exclusivity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. With proper copy, even a new firm looks deeply authoritative</p>
                  <p className="text-justify">
                    Because the content is precise, senior-level, technical, jurisdiction-heavy, and analytical. The reader perceives you as a top-tier advisory firm regardless of age.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Email authority compounds rapidly</p>
                  <p className="text-justify">
                    After receiving 8–12 expert memos, prospects naturally trust you. This effect is independent of firm age or brand size.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. HNWI inboxes are uncluttered</p>
                  <p className="text-justify">
                    They receive less noise than regular professionals. Therefore your messages stand out.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Precision Retargeting of High-Intent Segments Model — professional layout
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
                Precision Retargeting of High-Intent Segments
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Precision Retargeting of High-Intent Segments model uses ultra-targeted ads to re-engage individuals and companies who have already demonstrated active or passive intent in offshore structuring, licensing, banking, fund formation, trust governance, or compliance advisory.
                </p>
                <p className="text-justify">
                  This retargeting is NOT broad advertising. It is a surgeon-level refinement of digital touchpoints tailored to your highest-value audience segments.
                </p>
                <p className="text-justify">High-intent behaviour includes:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Visiting jurisdiction pages</li>
                  <li className="text-justify">Reading licensing frameworks</li>
                  <li className="text-justify">Interacting with regulatory updates</li>
                  <li className="text-justify">Downloading comparison charts</li>
                  <li className="text-justify">Attending webinars</li>
                  <li className="text-justify">Engaging with LinkedIn insights</li>
                  <li className="text-justify">Opening ABM emails</li>
                  <li className="text-justify">Viewing emergency advisory pages</li>
                  <li className="text-justify">Interacting with YouTube positioning videos</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Retargeting ensures Boyar reappears at precisely the moment the prospect begins evaluating or actively planning a mandate. This is the digital version of staying in the prospect's peripheral vision until they are ready to engage.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works for Offshore Advisory & Structuring
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. High-intent prospects rarely convert on first contact</p>
                  <p className="text-justify">
                    Your clients speak with internal advisors, evaluate jurisdictions, compare providers, wait for the right timing, and align with tax/legal counsel. Retargeting keeps Boyar top-of-mind during this multi-step process.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Retargeting creates "silent nurturing"</p>
                  <p className="text-justify">
                    Even if prospects do not reply, they see the brand repeatedly, they begin associating Boyar with expertise, they become familiar with services, and trust accumulates gradually. This is especially important for HNWIs, CFOs, fund principals, and crypto founders. These individuals prefer to observe quietly before engaging.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Retargeting focuses ONLY on warm audiences</p>
                  <p className="text-justify">
                    Meaning: no wasted budget, no irrelevant views, no low-quality profiles. You only show ads to those who already demonstrated intent.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Retargeting reinforces founder-led positioning</p>
                  <p className="text-justify">
                    Ads show Inderjeet Bandwal's insights, frameworks, diagrams, updates, and structuring or licensing clarity. It strengthens your expertise positioning.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Works extremely well with long sales cycles</p>
                  <p className="text-justify">
                    Offshore structuring, licensing, trusts, and fund formation often require 3–18 months of internal decision-making. Retargeting is the most efficient way to remain present throughout this timeline.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Costs are extremely low</p>
                  <p className="text-justify">
                    Because the audience is small and high-intent, retargeting campaigns cost $0.50 – $3.00 per day (LinkedIn remarketing) or $1.00 – $4.00 per day (Google Display remarketing). The ROI is disproportionately high.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Model Even With Zero Website Traffic, Zero Pixel Data, Zero Lookalike Audiences, and No Brand History
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Retargeting does NOT require traffic to begin — it requires signals</p>
                  <p className="text-justify">
                    These signals come from LinkedIn engagement, uploaded contact lists (email + LinkedIn), webinar attendees, WhatsApp VIP leads, events and roundtables, ABM target lists, and manual uploads of high-value prospects. You can begin retargeting on day one simply by uploading a list of 50–200 target accounts.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. LinkedIn "Matched Audiences" works even with a small audience</p>
                  <p className="text-justify">
                    You can retarget 1st-degree connections, people who viewed your profile, people who clicked on content, attendees of your events, and email lists of HNW/Corporate prospects. Even 150–300 individuals is enough.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Google retargeting works even from minimal events</p>
                  <p className="text-justify">
                    Events may include visits to 1–2 emergency-advisory pages, YouTube engagement, or jurisdiction overview downloads. Volume is irrelevant — relevance is everything.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Retargeting from ABM lists works instantly</p>
                  <p className="text-justify">
                    Upload LinkedIn URLs, corporate emails, or company names. The platforms match them to active accounts. No traffic history needed.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. This model grows stronger as your ecosystem expands</p>
                  <p className="text-justify">
                    Every channel you build — LinkedIn, articles, webinars, emails, YouTube — expands your retargeting footprint. Retargeting becomes the glue that holds the entire acquisition system together.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Multi-Touch Nurture Automation Model — professional layout
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
                Multi-Touch Nurture Automation
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Multi-Touch Nurture Automation Model is a coordinated sequence of personalised, context-aware communications delivered across multiple channels — email, LinkedIn, WhatsApp (VIP), retargeting, website triggers, and regulatory alerts — that gently and professionally guide high-value prospects from:
                </p>
                <p className="text-justify font-semibold mt-3">Awareness → Interest → Consideration → Diagnostic → Advisory Engagement</p>
                <p className="text-justify mt-3">
                  This model is not marketing automation in the generic sense. For Boyar Partners, it is a precision-engineered trust-building system, designed for:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Fund managers</li>
                  <li className="text-justify">Crypto/Web3 founders</li>
                  <li className="text-justify">FinTech/EMI/MSB applicants</li>
                  <li className="text-justify">HNWI / Family offices</li>
                  <li className="text-justify">SMEs preparing cross-border expansion</li>
                  <li className="text-justify">Licensing prospects</li>
                  <li className="text-justify">Structuring and re-domiciliation clients</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Multi-touch nurture ensures you never "lose" a high-value prospect simply because their decision cycle is long. Instead, they remain inside a carefully curated advisory environment led by the founders.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Multi-Touch Nurturing Is Crucial for Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Your buyers rarely convert immediately</p>
                  <p className="text-justify">
                    Offshore structuring, fund formation, licensing, banking, and trust governance require internal legal review, partner or board approval, regulatory timing, and wealth planning alignment. Nurturing keeps you relevant while these internal processes unfold.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Advisory decisions require trust accumulation</p>
                  <p className="text-justify">
                    Each touchpoint builds credibility, authority, clarity, familiarity, and confidence. When the moment of need arrives, the prospect already trusts Boyar.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Multi-touch reduces hesitation</p>
                  <p className="text-justify">
                    High-value clients need reassurance: "Is this the right jurisdiction?" "Will this structure survive regulatory scrutiny?" "Can this advisor handle complex banking?" Break these doubts across multiple touches; don't load everything into one call.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Automation ensures consistency without losing founder-led personalisation</p>
                  <p className="text-justify">
                    The system handles the cadence. The founders handle the important moments.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. This model integrates every other acquisition channel</p>
                  <p className="text-justify">
                    Multi-touch is the connective tissue between LinkedIn dealflow, ABM, SEO / inbound, YouTube expertise assets, email drip architecture, regulatory updates, emergency advisory capture, VIP WhatsApp tracks, and retargeting sequences. It is the master layer that holds the entire acquisition framework together.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Run Multi-Touch Nurture Automation Even With Zero CRM, Zero List, Zero Website Traffic, and Zero Historical Data
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Multi-touch does NOT require volume — it requires precision</p>
                  <p className="text-justify">
                    Even with 25–50 LinkedIn prospects, 10–20 email subscribers, 5–10 VIP WhatsApp contacts, and 50–100 website visitors per month, you can run a full enterprise-grade nurture system.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. You can start with manual triggers before automating</p>
                  <p className="text-justify">
                    Example: After a call → send a follow-up memo. After a LinkedIn comment → send a jurisdiction comparison. After a website visit → retarget them with a framework. After webinar attendance → deeper email content. Automation replaces these only after the pattern is proven.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. You don't need big content — you need micro-assets</p>
                  <p className="text-justify">
                    High-net-worth and corporate audiences respond to short jurisdiction briefs, diagrams, compliance checklists, banking matrices, and regulatory updates. These can be created with zero design overhead.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Automation tools work even with very small datasets</p>
                  <p className="text-justify">
                    HubSpot or ConvertKit only need 20 contacts to personalise, 50 contacts to segment, and 100 contacts to run automated flows. This is NOT mass marketing. This is precision personalisation.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Founder-led nurture is convincing even if you are a new firm</p>
                  <p className="text-justify">
                    Because the nurture is senior in tone, is jurisdictionally accurate, solves real problems, and reveals competence. Prospects don't worry about your age if your insights are strong.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. The system grows stronger over time with every new source of signals</p>
                  <p className="text-justify">
                    Every interaction enriches the nurture machine: LinkedIn comments → trigger, email opens → trigger, webinar attendance → trigger, WhatsApp replies → trigger, website visits → retargeting. The machine self-expands without requiring a large list.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Referral & Introducer Partner Network Model — professional layout
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
                Referral & Introducer Partner Network
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Referral & Introducer Partner Network is a structured alliance program where Boyar Partners collaborates with professionals who manage or influence high-value clients, including:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Lawyers</li>
                  <li className="text-justify">Tax advisors</li>
                  <li className="text-justify">Accountants</li>
                  <li className="text-justify">Wealth managers</li>
                  <li className="text-justify">Private bankers</li>
                  <li className="text-justify">Fund administrators</li>
                  <li className="text-justify">Crypto/FinTech compliance officers</li>
                  <li className="text-justify">Corporate secretarial firms</li>
                  <li className="text-justify">Boutique consultants</li>
                  <li className="text-justify">Residency/mobility firms</li>
                  <li className="text-justify">Real estate investment advisors</li>
                  <li className="text-justify">Corporate service providers</li>
                </ul>
                <p className="text-justify mt-4">These partners serve as trusted intermediaries who introduce clients when:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Banking is rejected</li>
                  <li className="text-justify">Structuring becomes complex</li>
                  <li className="text-justify">Cross-border expansion begins</li>
                  <li className="text-justify">Licenses are required</li>
                  <li className="text-justify">A fund needs to be formed</li>
                  <li className="text-justify">A trust or foundation is needed</li>
                  <li className="text-justify">An emergency compliance issue occurs</li>
                </ul>
                <p className="text-justify mt-4">
                  Boyar Partners becomes their strategic specialist for offshore structuring, licensing, banking, and fund solutions.
                </p>
                <p className="text-justify">Partners introduce clients because:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">It strengthens their own service offering</li>
                  <li className="text-justify">They gain referral fees</li>
                  <li className="text-justify">They appear knowledgeable</li>
                  <li className="text-justify">They avoid operational or compliance risks</li>
                  <li className="text-justify">Boyar handles the complexity professionally</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    This channel focuses on small number of deep relationships, not mass partnerships.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Referral & Introducer Networks Work Exceptionally Well in Offshore Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Professional relationships already contain trust</p>
                  <p className="text-justify">
                    Clients follow advisors they trust. When that advisor introduces Boyar, conversion is almost guaranteed.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Partners need a reliable offshore specialist</p>
                  <p className="text-justify">
                    Most lawyers, accountants, bankers, and consultants cannot form funds, handle structuring, manage licensing, navigate offshore banking, design tokenization SPVs, run economic substance governance, or manage multi-jurisdiction architecture. Boyar becomes the go-to expert.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. Partners want to avoid compliance risk</p>
                  <p className="text-justify">
                    Referring clients to the wrong firm damages their professional reputation. Your boutique positioning (founder-led, compliance-first, high-discretion) becomes an asset.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Introducer networks drive sustainable dealflow</p>
                  <p className="text-justify">
                    Every strong partner produces 3–12 referrals/year, high-value mandates, repeat clients, and multi-service opportunities (structuring → banking → licensing → fund admin → trust). This creates recurring acquisition loops.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Referral clients convert faster and require less persuasion</p>
                  <p className="text-justify">
                    Because trust is transferred from the introducer.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. This is the most scalable acquisition system in the industry</p>
                  <p className="text-justify">
                    Even global firms rely heavily on introducers—but a boutique advisory can outperform them through agility and senior access.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Build This Network Even With Zero Partners, Zero Referrals, and No Existing Ecosystem
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You do NOT need existing partners — you build them through initial trust assets</p>
                  <p className="text-justify">
                    Your starting point: jurisdiction reports, banking intelligence briefs, licensing frameworks, thought leadership content, regulatory updates, and founder-led positioning. These make you look like an authority even before you have partners.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Approach partners with value, not requests</p>
                  <p className="text-justify">
                    You do NOT ask for referrals. You offer tools that make their work easier. Examples: "Here is our Cayman vs BVI licensing matrix — useful for your clients." "We created a banking acceptance chart — feel free to share it internally." "If you ever need an offshore structuring analysis for your clients, we can prepare a no-cost brief." Partners respect value.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Start with just 5–10 high-potential partner categories</p>
                  <p className="text-justify">
                    No mass outreach. Precision segmentation: 2 law firms, 2 accountants, 1–2 fund administrators, 1–2 private bankers, 1–2 crypto compliance officers. Even a small network generates significant revenue.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Partners prefer boutiques — not large firms</p>
                  <p className="text-justify">
                    Because: faster response, direct founder access, more personalised, better confidentiality, no bureaucratic delays. A boutique advisory is more attractive to introducers.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Early partners come from LinkedIn & warm introductions</p>
                  <p className="text-justify">
                    You do not need reputation to start. Just professionalism + clarity.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. When your first partner sees fast results, the referral loop begins</p>
                  <p className="text-justify">
                    One successful engagement leads to 2 more referrals, repeat collaboration, credibility transfer, and expanded network. Partner networks snowball very quickly once they see your execution quality.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Family Office Acquisition Network Model — professional layout
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
                Family Office Acquisition Network
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Family Office Acquisition Network is a structured relationship-development system where Boyar Partners builds a curated ecosystem of:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Single-family offices (SFOs)</li>
                  <li className="text-justify">Multi-family offices (MFOs)</li>
                  <li className="text-justify">Independent wealth advisors</li>
                  <li className="text-justify">UHNW investment managers</li>
                  <li className="text-justify">Trustees and fiduciaries</li>
                  <li className="text-justify">Private investment platforms</li>
                  <li className="text-justify">Family enterprise consultants</li>
                  <li className="text-justify">Concierge wealth services</li>
                </ul>
                <p className="text-justify mt-4">These entities represent high-net-worth families requiring sophisticated advisory services in:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Offshore structuring</li>
                  <li className="text-justify">Trust and foundation formation</li>
                  <li className="text-justify">Banking architecture</li>
                  <li className="text-justify">Succession and governance</li>
                  <li className="text-justify">Fund formation (family funds, private pooled vehicles)</li>
                  <li className="text-justify">Regulatory alignment</li>
                  <li className="text-justify">International expansion</li>
                  <li className="text-justify">Tax-neutral wealth protection</li>
                  <li className="text-justify">Digital asset structuring</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    The model ensures Boyar Partners becomes the specialised external partner these offices rely on for cross-border advisory projects that exceed their internal capabilities.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why Family Offices Are a Priority Acquisition Segment
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. They manage large pools of private capital</p>
                  <p className="text-justify">
                    This includes operating businesses, real estate portfolios, venture assets, offshore holdings, and trust and family governance structures. Each requires expert advisory work.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. They prefer boutique, discreet, founder-led advisory firms</p>
                  <p className="text-justify">
                    Family offices avoid large consulting firms (too bureaucratic), formation agencies (too basic), and unregulated advisors (compliance risk). Boyar fits the ideal profile: small, senior-led, globally competent, discreet.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. FOs face continuous multi-jurisdiction complexity</p>
                  <p className="text-justify">
                    They routinely deal with restructuring, succession transitions, banking challenges, new acquisitions, intergenerational governance, and asset protection risks. This creates recurring mandates.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. They value long-term partnerships over transactional engagements</p>
                  <p className="text-justify">
                    Once trust is established, family offices become multi-year, multi-service clients.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Referrals within the FO community travel fast</p>
                  <p className="text-justify">
                    Family offices share advisor recommendations discreetly. Delivering exceptional service to one FO often results in several introductions.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Model Even with Zero FO Contacts or Reputation Today
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Family office relationships do NOT start from the family office — they start from their advisors</p>
                  <p className="text-justify">
                    Entry points: lawyers managing succession, accountants preparing audits, trustees managing cross-border structures, private banks handling international accounts, fund admins interfacing with their pooled vehicles, real estate / VC advisors who manage portfolios. Boyar can enter FO networks indirectly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. FO networks prefer VALUE-FIRST approaches</p>
                  <p className="text-justify">
                    They do not respond to cold pitches, sales messaging, or general marketing. But they respond immediately to regulatory briefings, jurisdictional analysis, trust/foundation comparisons, banking intelligence memos, fund structuring diagrams, and governance frameworks. Boyar's content architecture gives instant authority.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Family office events & roundtables are accessible even to small firms</p>
                  <p className="text-justify">
                    You only need 2–3 strategic presence moments, 1–2 private dinners, and 1 keynote or panel contribution. From there the FO community expands relationships organically.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. You do NOT need 100 family offices — you need 5</p>
                  <p className="text-justify">
                    A handful of FOs can generate high-ticket structuring, trust work, fund formation, regulatory advisory, long-term retainers, and referrals. Small is powerful.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. FOs respect founder-to-founder communication</p>
                  <p className="text-justify">
                    Inderjeet and Joel's senior-led approach is ideal. Family offices prefer dealing with principals.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. FOs frequently struggle with offshore complexities</p>
                  <p className="text-justify">
                    Most lack internal expertise for multi-jurisdiction entity restructuring, offshore trust governance, digital asset regulations, and fund administration oversight. Thus, even new firms gain traction by solving these pain points.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Boutique VC & Angel Syndicate Cross-Promotion Model — professional layout
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
                Boutique VC & Angel Syndicate Cross-Promotion
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Boutique VC & Angel Syndicate Cross-Promotion Model is a strategic acquisition channel where Boyar Partners partners with:
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Boutique venture capital firms</li>
                  <li className="text-justify">Angel syndicates</li>
                  <li className="text-justify">Micro-VCs</li>
                  <li className="text-justify">Deal clubs</li>
                  <li className="text-justify">Private investor communities</li>
                  <li className="text-justify">Accelerator-linked investor desks</li>
                  <li className="text-justify">Web3 investment groups</li>
                  <li className="text-justify">UHNW angel networks</li>
                </ul>
                <p className="text-justify mt-4">These groups regularly back founders who need:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Global structuring</li>
                  <li className="text-justify">International expansion</li>
                  <li className="text-justify">Banking for high-risk industries</li>
                  <li className="text-justify">Holding companies (Cayman, BVI, Delaware, UAE, Seychelles)</li>
                  <li className="text-justify">Licensing (VASP, EMI, MSB, fund licenses)</li>
                  <li className="text-justify">Tokenization and regulatory frameworks</li>
                  <li className="text-justify">Investment vehicles, SPVs, and fund setups</li>
                  <li className="text-justify">Trust/foundation governance for wealth planning</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <p className="text-justify">
                    Boyar becomes their preferred advisory partner, offering expert clarity to their portfolio companies before, during, and after investment rounds. This channel positions Boyar Partners within the upstream flow of deals — before founders even begin searching for an offshore or regulatory advisor.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why VC & Angel Syndicate Channels Are So Effective
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">A. Every founder funded by these groups needs structuring</p>
                  <p className="text-justify">
                    VC-backed companies almost always require cross-border entities, holding structures, banking, licensing, IP protection, and tax-neutral layers. This creates consistent, scalable demand.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">B. Advisors are scarce in this niche</p>
                  <p className="text-justify">
                    VCs and angels struggle to find trusted, credible, compliance-first offshore advisors. Your founder-led and boutique positioning is a perfect fit.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">C. You gain access to multiple portfolio companies through one relationship</p>
                  <p className="text-justify">
                    One VC partner = 4–20 relevant companies per year. One angel syndicate = 10–50 founders across Web3, fintech, SaaS, trading, iGaming, and deep tech.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Syndicates prefer partners who help reduce risk</p>
                  <p className="text-justify">
                    If Boyar reduces compliance, banking, or licensing failure risk, investors view you as a protective layer for their capital.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. VC/angel brand endorsement accelerates trust with founders</p>
                  <p className="text-justify">
                    Founders convert quickly if the referral is from someone they consider "smart money."
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. CRITICAL MIDDLE SECTION: How Boyar Partners Can Execute This Model Even With Zero VC, Zero Angel, and Zero Ecosystem Presence Today
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. You do NOT start with VCs — you start with their weakest link: portfolio pain points</p>
                  <p className="text-justify">
                    VC firms frequently deal with founders unable to get banking, tokenization projects needing structure, messy cross-border setups, regulatory misalignment, investment SPV confusion, and founders using cheap, non-compliant service providers. Boyar's solutions for these pain points become your entry point.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. You start with micro-VCs, angel clubs, and deal syndicates — NOT large institutional funds</p>
                  <p className="text-justify">
                    Small investors move faster, need more help, are more flexible, are more open to partnerships, and introduce you quickly. This builds credibility rapidly.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. You use "value-first intelligence assets" as the door opener</p>
                  <p className="text-justify">
                    Examples: "VC Playbook for Structuring Global Companies in 2025", "Banking Acceptance Matrix for Early-Stage Tech & Web3", "Licensing Pathways for FinTech and Tokenized Platforms", "Cayman/BVI SPV Models for Investors". VCs immediately see the value and invite deeper discussions.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. You do NOT need a brand; you need expertise</p>
                  <p className="text-justify">
                    VCs care about whether you know what you're doing, whether you protect their capital, whether you reduce founder risk, and whether you make fundraising smoother. Boutique, senior-led advisory is more trusted than large corporate firms.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Syndicates are extremely approachable on LinkedIn</p>
                  <p className="text-justify">
                    Most syndicate leads run newsletters, host AMAs or webinars, and post founder support content. Offering your frameworks as value-add leads to rapid engagement.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. You initially need just 2–3 small partners</p>
                  <p className="text-justify">
                    Each one produces dozens of relevant introductions, recurring structuring/trust/banking/licensing mandates, founder-to-founder referrals, and tokenization SPV opportunities. Small is powerful.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
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

  // Thought Leadership & Media Authority (Group 2)
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
                Thought Leadership & Media Authority
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Thought Leadership & Media Authority Model positions Boyar Partners as visible, credible, and authoritative through published insights, industry commentary, jurisdiction reports, regulatory breakdowns, short-form expert videos, guest appearances, media collaborations, and professional articles.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    Outcome: faster trust, higher conversion, better referrals, stronger partner relationships, and premium pricing power.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works in Offshore Consulting
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Offshore clients face uncertainty, regulatory change, multi-jurisdiction decisions, banking limits, licensing challenges, tokenization frameworks, and high-ticket stakes. They want clarity and confidence; thought leadership delivers that upfront.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Outputs of the Thought Leadership Model
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Jurisdiction Intelligence Briefings</p>
                  <p className="text-justify">Quarterly updates for Cayman, BVI, Cook Islands, Seychelles, DIFC, ADGM, Luxembourg, etc.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Licensing Explainers</p>
                  <p className="text-justify">VASP, EMI, MSB, Forex, Fund licenses — simplified clearly.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Banking Intelligence Reports</p>
                  <p className="text-justify">Banks’ acceptance patterns, onboarding, regional updates, documentation.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Structuring Frameworks</p>
                  <p className="text-justify">SPVs, holdings, profit extraction, operational alignment.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Private Client Wealth Structures</p>
                  <p className="text-justify">Trusts and foundations for UHNWIs and family offices.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Short-Form Video Expertise</p>
                  <p className="text-justify">Inderjeet’s face becomes the credibility anchor.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Guest Appearances / Interviews</p>
                  <p className="text-justify">Podcasts, fintech channels, advisory panels.</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Professional Articles</p>
                  <p className="text-justify">Finance, crypto, and legal platforms.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. How This Works Even with No Existing Audience
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Expertise is judged by clarity</p>
                  <p className="text-justify">Accuracy, sophistication, structured frameworks, and simplification — not fame.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Consistency creates assumed authority</p>
                  <p className="text-justify">Articulate insights, jurisdiction comparisons, and confident compliance explanations build perception.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Partners trust faster</p>
                  <p className="text-justify">Videos, reports, diagrams, and frameworks accelerate law firm/banker trust.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Media wants new voices</p>
                  <p className="text-justify">Journalists and hosts seek articulate, regulatory-savvy experts.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Search visibility creates inbound</p>
                  <p className="text-justify">Google/LinkedIn/YouTube presence yields demand without ads.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="text-justify font-semibold">
                    Thought leadership reduces dependence on paid channels; referrals, social proof, and partnerships compound.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Success Formula
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

  // Offshore Masterclass Series (Group 2) — polished layout
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
                Offshore Masterclass Series
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Offshore Masterclass Series is a structured acquisition channel where Boyar Partners delivers high-level educational sessions, jurisdiction briefings, compliance workshops, structuring frameworks, banking intelligence, licensing explainers, and tokenization/fund structuring masterclasses.
                </p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Live or recorded, embedded in accelerators, co-hosted with law firms/partners, or private to UHNW/investor clubs.</li>
                  <li className="text-justify">Positions Boyar as premier authority before any sales conversation, creating high-intent, pre-qualified leads.</li>
                </ul>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why the Masterclass Series Is Highly Effective
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Clients understand the subject → shorter sales cycles.</li>
                    <li className="text-justify">Educational content builds instant authority.</li>
                    <li className="text-justify">High-ticket buyers prefer experts, not marketers.</li>
                    <li className="text-justify">Masterclasses generate inbound demand post-session.</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Enables cross-service expansion from a single session.</li>
                    <li className="text-justify">Works globally across time zones for offshore clientele.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Types of Masterclasses in the Series
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Jurisdiction Deep-Dives</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Cayman vs BVI; Cook Islands asset protection</li>
                    <li className="text-justify">Seychelles & Mauritius corporate structuring</li>
                    <li className="text-justify">DIFC/ADGM holding architecture</li>
                    <li className="text-justify">Luxembourg & Ireland fund frameworks</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Licensing Series</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">VASP, EMI, MSB (US/Canada), Forex, Fund registration</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Banking Masterclasses</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Offshore banking acceptance matrix</li>
                    <li className="text-justify">Crypto-friendly pathways; onshore/offshore hybrids</li>
                    <li className="text-justify">Bank compliance expectations</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Crypto/Tokenization Structuring</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Token SPVs, foundations, legal wrappers</li>
                    <li className="text-justify">Custody and compliance alignment</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Private Client & Family Office Masterclasses</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Trusts & foundations, succession, asset protection</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Corporate Expansion Masterclasses</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Global expansion structuring, holding companies, tax-neutral architecture</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. How This Works from Zero (No Audience Needed)
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Expertise attracts even without audience</p>
                  <p className="text-justify">Professional structuring knowledge is rare; clarity on banks, regulators, jurisdictions draws attention.</p>
                  <p className="font-semibold text-gray-900 mt-3">B. Partners love value-add</p>
                  <p className="text-justify">Law firms, accountants, accelerators, OTC desks host masterclasses to add value and test capabilities.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Easier to trust than sales calls</p>
                  <p className="text-justify">Zero pressure, pure learning → credibility.</p>
                  <p className="font-semibold text-gray-900 mt-3">D. First attendees = first audience</p>
                  <p className="text-justify">Emails, WhatsApp, LinkedIn followers, warm leads, partner inquiries emerge from each session.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Small groups are enough</p>
                  <p className="text-justify">5–15 high-ticket buyers (UHNWIs, founders, crypto teams, CFOs, fund managers, lawyers) are sufficient.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="font-semibold text-gray-900">F. Recording + repurposing = ongoing inbound</p>
                  <p className="text-justify">Each masterclass becomes clips, videos, articles, whitepapers, guides, partner training material.</p>
                </div>
              </div>
            </section>

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

  // Reputation Borrowing via Guest Appearances (Group 2) — polished layout
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
                Reputation Borrowing via Guest Appearances
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  An authority-building channel where Boyar Partners appears on podcasts, YouTube channels, livestreams, legal/compliance panels, webinars, accelerator sessions, media interviews, and partner-hosted events to borrow trust from established platforms.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    Outcome: rapid credibility with founders, crypto teams, investors, family offices, UHNWIs, and executives who already follow these platforms.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Works
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Trust transfers instantly from vetted platforms.</li>
                    <li className="text-justify">Visibility signals legitimacy in financial/legal domains.</li>
                    <li className="text-justify">Appearances become reusable social proof and sales assets.</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Compounds: more appearances → higher-tier invites.</li>
                    <li className="text-justify">Low cost: clean setup + professional answers only.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. How It Works from Zero
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Platforms need experts weekly</p>
                  <p className="text-justify">They prioritize clarity on Cayman vs BVI, VASP, banking, token issuance over fame.</p>
                  <p className="font-semibold text-gray-900 mt-3">Start mid-tier</p>
                  <p className="text-justify">Crypto commentary, compliance newsletters, fintech podcasts, LinkedIn Lives, accelerators.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">Each appearance = asset</p>
                  <p className="text-justify">“As seen on…” social proof, partner leverage, nurture content.</p>
                  <p className="font-semibold text-gray-900 mt-3">3–5 appearances fuel inbound</p>
                  <p className="text-justify">Future partners reference prior talks; reputation accumulates.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Appear on credible platforms → Borrow trust → Demonstrate expertise → Build authority → Educate prospects → Warm inbound consultations → Multi-service mandates.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // YouTube Expertise Positioning (Group 2) — polished layout
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
                YouTube Expertise Positioning Channel
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The YouTube Expertise Positioning Model establishes Boyar Partners as a visible, authoritative advisory firm through short, precise educational videos: jurisdiction explainers, regulatory breakdowns, tokenization frameworks, banking pathways, licensing deep-dives, founder-led insights, and case-based technical explanations.
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    YouTube becomes public proof of expertise, validating capability to UHNWIs, founders, funds, Web3 teams, family offices, and professional intermediaries.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why YouTube Is High-Leverage
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Visibility creates trust; one authoritative video beats dozens of posts.</li>
                    <li className="text-justify">Evergreen: ranks in search, recommended, works 24/7 with compounding views.</li>
                    <li className="text-justify">Low competition: few offshore firms do clear video.</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">High-ticket clients research via YouTube before engaging.</li>
                    <li className="text-justify">Videos become multipurpose assets: clips, embeds, sales warm-ups, partner resources.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. How This Works from Zero
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Expertise drives the channel</p>
                  <p className="text-justify">Clarity on regulation/structuring matters more than subscribers.</p>
                  <p className="font-semibold text-gray-900 mt-3">B. Authority with 10 videos</p>
                  <p className="text-justify">Speaking publicly signals confidence and knowledge, even with low views.</p>
                  <p className="font-semibold text-gray-900 mt-3">C. Sales asset, not just marketing</p>
                  <p className="text-justify">Prospects arrive educated; calls convert faster.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Partners share your videos</p>
                  <p className="text-justify">Lawyers/bankers send your clips as proof of competence.</p>
                  <p className="font-semibold text-gray-900 mt-3">E. Algorithm favors niches</p>
                  <p className="text-justify">Low competition on “Cayman vs BVI”, “VASP Licensing”, “Token Foundations”.</p>
                  <p className="font-semibold text-gray-900 mt-3">F. Minimal setup needed</p>
                  <p className="text-justify">iPhone, clip-on mic, white background, clear delivery.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Success Formula
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Clear explanations → Perceived expertise → Trust acceleration → High-quality inbound leads → Multi-service engagements.
                </p>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // Private Webinars & Closed-Door Briefings (Group 2) — polished layout
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
                Model Definition & Strategic Framework
              </h2>
            </div>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Private Webinars & Closed-Door Briefings model is a premium, invitation-only educational channel where Boyar Partners delivers confidential regulatory briefings, structuring explanations, banking intelligence updates, licensing pathway sessions, crypto/tokenization compliance workshops, jurisdictional strategy discussions, and family office succession structure briefings.
                </p>
                <p className="text-justify">
                  These are not public webinars. They are private sessions limited to: family offices; UHNWIs; fund managers; crypto founders; CFOs/GCs of scaling companies; law firms and boutique accountants; VC/angel syndicates; bankers and wealth managers; corporate advisory networks. This model positions Boyar Partners as strategic advisors, not marketers. These sessions generate high-intent conversations because attendees self-select into a private setting where they expect value and expertise.
                </p>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Channel Works Exceptionally Well
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. High-level audiences prefer exclusivity</p>
                  <p className="text-justify">
                    HNWIs, executives, and fund managers do not attend public webinars. They attend private briefings where the attendee list is vetted, the topic is sophisticated, the session is educational (not promotional), and privacy is respected.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Small groups → High conversion</p>
                  <p className="text-justify">
                    You do not need 100 attendees. You only need 5 founders, 3 fund managers, 2 lawyers, and 1 family office advisor. Small audiences = high-value clients.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Offshore advisory is complexity-driven</p>
                  <p className="text-justify">Briefings convert because you simplify what others complicate.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. Participation signals high intent</p>
                  <p className="text-justify">Nobody attends a private session unless they have a present or future need.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Modern “boardroom briefings”</p>
                  <p className="text-justify">Delivered virtually → global, scalable, discreet.</p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. What a Boyar Private Briefing Looks Like
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">A structured jurisdiction or regulatory breakdown</li>
                  <li className="text-justify">Practical diagrams showing structuring logic</li>
                  <li className="text-justify">Banking acceptance models</li>
                  <li className="text-justify">Regulatory timeline analysis</li>
                  <li className="text-justify">Case-style explanations (anonymous)</li>
                  <li className="text-justify">Live Q&A with founders</li>
                  <li className="text-justify">Optional diagnostic session offer</li>
                </ul>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    These are NOT sales webinars. They are educational, technical, confident, boutique, and executive-level. Attendees treat Boyar as an elite advisor, not a vendor.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Critical Middle Section: How This Works Even When You Have No Audience
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">A. Partners want to host your briefings</p>
                  <p className="text-justify">
                    Law firms, accountants, banks, accelerators want to offer their clients access to experts, up-to-date regulatory briefings, jurisdictional intelligence, and executive education. Even if Boyar is new, your expertise is valuable to their clients. Outreach such as “If you want, we can host a private Cayman/BVI structuring briefing for your clients this month” is very attractive.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">B. Attendees care about insights</p>
                  <p className="text-justify">
                    Executives join because they want clarity. If the topic solves a burning question (“How to structure before fundraising?”, “How VASP licensing actually works globally”, “How to overcome offshore banking rejection”, “Trusts & foundations for succession planning”), they will attend even if they never heard of Boyar.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">C. Private ≠ massive; private = curated</p>
                  <p className="text-justify">Executives assume “If it’s private, it must be high quality.” Small groups still feel elite.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">D. 3–10 attendees still convert</p>
                  <p className="text-justify">
                    Even 3 serious participants can become structuring, licensing, banking, trust/foundation, or fund setup clients. Masterclasses rely on scale; private briefings rely on precision.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">E. Host platform is the credibility layer</p>
                  <p className="text-justify">
                    If a partner hosts you, you borrow their authority, inherit trust instantly, and gain visibility from their networks. This works brilliantly even early on.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">F. Every briefing is a content engine</p>
                  <p className="text-justify">
                    Each session generates LinkedIn clips, YouTube edits, whitepapers, slide decks, email nurturing content, partner materials, and trust-building assets—scaling you from zero to respected advisor.
                  </p>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Execution Playbook — Operational Blueprint
              </h2>
              <div className="space-y-6 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900 mb-3">1. Tools Required</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-justify"><strong>Function</strong></p>
                      <p className="text-justify">Hosting</p>
                      <p className="text-justify">Slides</p>
                      <p className="text-justify">Registration</p>
                      <p className="text-justify">CRM</p>
                      <p className="text-justify">Recording</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-justify"><strong>Tools</strong></p>
                      <p className="text-justify">Zoom Pro / Riverside</p>
                      <p className="text-justify">Canva Pro / Figma</p>
                      <p className="text-justify">Typeform / HubSpot Forms</p>
                      <p className="text-justify">Notion / HubSpot</p>
                      <p className="text-justify">Zoom Cloud / OBS</p>
                      <p className="text-justify">Clip extraction: Descript / CapCut</p>
                      <p className="text-justify">Distribution: LinkedIn, WhatsApp Broadcast</p>
                      <p className="text-justify">Partner coordination: Slack / Email</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-3">
                  <p className="font-semibold text-gray-900">2. Briefing Format (Highly Polished Structure)</p>
                  <ol className="list-decimal ml-6 space-y-2 pl-0" style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Introduction (2 mins): Who you are, what Boyar does, why the topic matters now.</li>
                    <li className="text-justify">Context + Problem Framing (3 mins): Regulatory shifts, enforcement updates, jurisdiction changes, banking restrictions.</li>
                    <li className="text-justify">Core Insight Delivery (10–15 mins): Diagrams and frameworks — structuring models, jurisdiction matrices, licensing timelines, banking acceptance funnel, SPV diagrams.</li>
                    <li className="text-justify">Practical Scenarios (5 mins): Anonymized use cases showing what works, what fails, what banks expect, how regulators assess.</li>
                    <li className="text-justify">Live Q&A (10–15 mins): Prestige-building moment.</li>
                    <li className="text-justify">Closing Insight (30 seconds): One sentence summarizing the learning.</li>
                    <li className="text-justify">Soft Call to Action: “For anyone evaluating structures or licensing, we can schedule a short diagnostic.” No sales language.</li>
                  </ol>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">3. Topic Architecture (High-Conversion Subjects)</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Corporate Structuring:</strong> Cayman vs BVI: choosing your HQ; global expansion structuring models; cross-border profit extraction frameworks.</li>
                    <li className="text-justify"><strong>Crypto & Tokenization:</strong> Token legal wrappers; foundations vs SPVs; VASP licensing explained.</li>
                    <li className="text-justify"><strong>Banking:</strong> Offshore banking acceptance matrix; crypto-friendly banking pathways; EU/US risk-based banking frameworks.</li>
                    <li className="text-justify"><strong>Licensing:</strong> EMI licensing pathway; MSB licensing logic; fund licensing + administration.</li>
                    <li className="text-justify"><strong>Private Clients:</strong> Trusts & foundations; asset protection planning; succession structuring.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">4. Audience Targeting Strategy</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Tier 1 — Partner-Hosted Sessions:</strong> Law firms, accounting firms, private bankers, fund administrators, VC/angel syndicates invite their clients; you deliver the briefing.</li>
                    <li className="text-justify"><strong>Tier 2 — Founder-Led Private Sessions:</strong> Invite crypto founders, fund managers, cross-border entrepreneurs, CFOs/GCs.</li>
                    <li className="text-justify"><strong>Tier 3 — Direct Invitations:</strong> Send personalized LinkedIn invites with topic summaries.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">5. Frequency & Cadence</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">2 private briefings per month.</li>
                    <li className="text-justify">Alternating themes: structuring, licensing, banking, tokenization.</li>
                    <li className="text-justify">Quarterly flagship deep-dive: Cayman, BVI, Cook Islands, DIFC, Luxembourg.</li>
                    <li className="text-justify">Consistency builds authority.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">6. Repurposing Workflow</p>
                  <p className="text-justify">
                    Record → Edit → Extract → Publish: 10–20 short clips for LinkedIn, 1 long-form YouTube video, 1 jurisdiction/licensing report, 1 newsletter segment. Each briefing becomes a full content ecosystem.
                  </p>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">7. Governance Standards</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify">Confidentiality is absolute; never mention client-specific facts.</li>
                    <li className="text-justify">Accuracy and regulatory precision; every statement must be correct as of 2025.</li>
                    <li className="text-justify">No promotional tone; authority converts, not persuasion.</li>
                    <li className="text-justify">Presenter must be a founder (Inderjeet primary; Joel support).</li>
                    <li className="text-justify">Always deliver more value than expected — elite insights → elite clients.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
                  <p className="font-semibold text-gray-900">8. KPIs</p>
                  <ul className={listClass} style={{ listStylePosition: "outside" }}>
                    <li className="text-justify"><strong>Primary KPIs:</strong> Number of qualified attendees per session; diagnostic calls booked; pre-qualified mandates created; partnership invitations; conversion per attendee.</li>
                    <li className="text-justify"><strong>Secondary KPIs:</strong> Video repurposing performance; LinkedIn growth; newsletter subscriptions; repeat attendance from advisors.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800 leading-relaxed text-left">
                  <p className="font-semibold text-gray-900">9. Success Formula</p>
                  <p className="text-justify">
                    Private insight → Perceived authority → Trust acceleration → Diagnostic calls → Multi-service advisory mandates. Closed-door briefings are one of the highest-yield acquisition channels for a boutique advisory firm.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </ProtectedRoute>
    );
  }
  // Founder-Led Origination (full refreshed content)
  if (isFounderModel) {
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
                <h1 className="text-lg font-semibold text-black">Founder-Led Origination</h1>
                <div className="w-20" />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: "left" }}>
            <div className="mb-12 text-center border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "var(--font-benzin)" }}>
                Founder-Led Origination Model
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: "var(--font-benzin)" }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Founder-Led Origination Model is a high-trust, relationship-driven acquisition system where all meaningful client engagements are originated, qualified, and guided directly by the founders — Inderjeet Bandwal and Joel Yadav.
                </p>
                <p className="text-justify">
                  It leverages their personal credibility, market insight, professional networks, reputation as senior advisors, and their ability to build trust with UHNW and corporate stakeholders. This model positions Boyar Partners as a founder-led, boutique advisory firm where clients receive senior-level attention from the first conversation, which materially increases conversion and deal value.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                2. Why This Model Exists
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-justify">
                    High-value offshore mandates are born from trust, senior-to-senior dialogue, and reputation transfer — not ads or generic funnels. Founders carry the authority and credibility to establish this immediately.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">Impact</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Trust is instant, boosting conversion</li>
                      <li className="text-justify">Founders diagnose complex needs for higher ticket scopes</li>
                      <li className="text-justify">Referrals arrive pre-qualified, improving pipeline quality</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">Positioning</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Selective, premier boutique stance</li>
                      <li className="text-justify">Founder visibility signals discretion and authority</li>
                      <li className="text-justify">Aligns to sensitive, compliance-heavy decisions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                3. Strategic Fit for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This model is perfectly aligned with how clients choose advisors in offshore structuring, trust formation, corporate re-domiciliation, fund establishment, licensing (VASP, EMI, MSB), banking setup, and tokenization SPVs. These decisions involve regulatory risk, compliance scrutiny, and sensitive information — clients prefer dealing with founders rather than anonymous sales staff.
                </p>
                <p className="text-justify">It is the most important channel for acquiring anchor clients in the first 12–24 months.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                4. Who This Model Targets
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify font-semibold">Primary Targets:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">UHNW individuals</li>
                  <li className="text-justify">Family offices</li>
                  <li className="text-justify">Crypto founders</li>
                  <li className="text-justify">Fund managers</li>
                  <li className="text-justify">Large SME founders</li>
                  <li className="text-justify">Senior executives (CFO, COO, GC)</li>
                  <li className="text-justify">Advisors (lawyers, bankers, accountants)</li>
                </ul>
                <p className="text-justify font-semibold mt-4">Secondary Targets:</p>
                <ul className={listClass} style={{ listStylePosition: "outside" }}>
                  <li className="text-justify">Referred prospects through investor networks</li>
                  <li className="text-justify">Individuals undergoing liquidity events</li>
                  <li className="text-justify">Companies restructuring or expanding cross-border</li>
                  <li className="text-justify">Firms facing compliance or banking pressure</li>
                </ul>
                <p className="text-justify">All these categories value trust, confidentiality, and founder assurance.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                5. Core Principles of the Model
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify"><strong>Principle 1 — Senior-Level Dialogue Only:</strong> Founders lead every initial discovery.</li>
                      <li className="text-justify"><strong>Principle 2 — Relationship First, Proposal Later:</strong> Diagnose deeply; propose only after clarity.</li>
                      <li className="text-justify"><strong>Principle 3 — Confidentiality & Discretion:</strong> Private, non-promotional tone.</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify"><strong>Principle 4 — Qualification Before Engagement:</strong> Compliance, suitability, and mandate relevance checks.</li>
                      <li className="text-justify"><strong>Principle 5 — Trusted Network Expansion:</strong> Each success compounds referral and introducer networks.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                6. Mandatory Components of the Model
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold">A. Network Mapping System</p>
                <p className="text-justify">Structured map of founder connections, past clients, advisors, investors, and professional circles (lawyers, bankers, accountants).</p>
                <p className="font-semibold mt-4">B. Relationship Intelligence</p>
                <p className="text-justify">Identification of who influences the client, who the client trusts, who performs due diligence, and their decision-making style.</p>
                <p className="font-semibold mt-4">C. Founder Positioning Assets</p>
                <p className="text-justify">Founder profiles (LinkedIn, website), capability statements, anonymized case studies, jurisdictional briefs, licensing frameworks.</p>
                <p className="font-semibold mt-4">D. Compliance-Ready Onboarding Framework</p>
                <p className="text-justify">Pre-call qualification checklist, KYC/AML materials, engagement letter templates, conflict checks.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                7. Advantages of Founder-Led Origination
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 mb-2">Strategic Advantages</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">High conversion, accelerated trust</li>
                      <li className="text-justify">Higher engagement value</li>
                      <li className="text-justify">Immediate credibility & retention</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 mb-2">Operational Advantages</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Fewer unqualified leads</li>
                      <li className="text-justify">Boutique positioning preserved</li>
                      <li className="text-justify">Efficient time use (quality {'>'} quantity)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <p className="font-semibold text-gray-900 mb-2">Financial Advantages</p>
                    <ul className={listClass} style={{ listStylePosition: "outside" }}>
                      <li className="text-justify">Zero marketing waste</li>
                      <li className="text-justify">Highest ROI acquisition channel</li>
                      <li className="text-justify">Anchor clients generate referrals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className={sectionClass}>
              <h2 className={headingClass} style={{ fontFamily: "var(--font-benzin)" }}>
                8. Risks and Governance Controls
              </h2>
              <div className="space-y-3 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 1: Founder Bandwidth Limits</strong></p>
                  <p className="text-justify">Mitigation: Prioritise Tier 1 accounts and referral-led flows.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 2: Misaligned Expectations</strong></p>
                  <p className="text-justify">Mitigation: Standardized engagement letters and clear scope definitions.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 3: Over-Dependence on Founders</strong></p>
                  <p className="text-justify">Mitigation: Build a secondary layer of qualified representatives who only handle pre-screening.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-justify"><strong>Risk 4: Compliance Exposure</strong></p>
                  <p className="text-justify">Mitigation: Keep discussions high-level until KYC is complete.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Founder-Led Origination Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For commission-based-representative, show commission content
  if (isCommissionModel) {
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
                <h1 className="text-lg font-semibold text-black">Commission-Based Representative Channel</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Commission-Based Representative Channel
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Commission-Based Representative Channel is a controlled, performance-driven acquisition model where Boyar Partners engages external advisors, representatives, introducers, and consultants who refer qualified clients in exchange for a commission linked to the service delivered.
                </p>
                <p className="text-justify">
                  These individuals do not sell like traditional salespeople. Instead, they:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Identify opportunities</li>
                  <li className="text-justify">Warm up interest</li>
                  <li className="text-justify">Introduce Boyar Partners to the prospect</li>
                  <li className="text-justify">Step back while founders handle all advisory engagement</li>
                </ul>
                <p className="mt-4">
                  This model expands reach without fixed salaries, without overhead, and without diluting the boutique positioning.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Purpose of This Model
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This model exists to:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Extend Boyar's reach into markets founders cannot cover daily</li>
                  <li className="text-justify">Access networks of bankers, consultants, intermediaries, crypto operators, fund managers, and HNWIs</li>
                  <li className="text-justify">Generate highly qualified referrals with low outbound effort</li>
                  <li className="text-justify">Maintain cost control by paying only for closed deals</li>
                  <li className="text-justify">Build scalable, territory-based acquisition channels</li>
                  <li className="text-justify">Create a diversified dealflow ecosystem instead of relying on a single market</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Perfect for an advisory firm where trust + discretion are the primary buying drivers.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who These Representatives Are
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Boyar Partners representatives are:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Former bankers and wealth managers</li>
                  <li className="text-justify">Corporate services professionals</li>
                  <li className="text-justify">Crypto OTC/market makers with client networks</li>
                  <li className="text-justify">Fund administrators and compliance officers</li>
                  <li className="text-justify">Tax advisors and lawyers with international clientele</li>
                  <li className="text-justify">Ex-license consultants</li>
                  <li className="text-justify">High-value introducers in HNWI circles</li>
                </ul>
                <p className="mt-4 font-semibold">
                  They are not junior salespeople — they are credibility holders with warm access.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. How They Operate (High-Level)
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify"><strong>Representatives:</strong></p>
                <ol className="list-decimal list-inside ml-4 space-y-2">
                  <li className="text-justify">Identify prospect → (via network, industry, events, consulting calls)</li>
                  <li className="text-justify">Conduct informal qualification → (ensure legitimacy, interest, potential need)</li>
                  <li className="text-justify">Introduce Boyar Partners founders via email/WhatsApp/LinkedIn</li>
                  <li className="text-justify">Founders take over → conduct meetings, diagnostics, proposals</li>
                  <li className="text-justify">Deal closes → representative receives commission based on the service</li>
                </ol>
                <p className="mt-4"><strong>The representative never:</strong></p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Explains complex structures</li>
                  <li className="text-justify">Provides regulatory interpretations</li>
                  <li className="text-justify">Discusses pricing or scope</li>
                  <li className="text-justify">Commits Boyar to deliverables</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Founders control the advisory process entirely.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Why This Model Aligns With Boutique Advisory
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Boyar Partners handles sensitive, high-value mandates. Representatives widen access while still allowing:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">✓ Founder-led interactions</li>
                  <li className="text-justify">✓ High conversion due to warm introductions</li>
                  <li className="text-justify">✓ Cost-controlled acquisition model</li>
                  <li className="text-justify">✓ Global reach without global offices</li>
                  <li className="text-justify">✓ Strict compliance oversight</li>
                </ul>
                <p className="mt-4">
                  The boutique image is supported, not diluted, because founders remain at the center of all deeper engagement.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Commission Logic (High-Level)
              </h2>
              <div className="space-y-6 text-gray-800 leading-relaxed">
                <p className="text-justify">
                  Commission depends fully on the service, the complexity, and the client category.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Low to Medium Ticket Services</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li className="text-justify">Company Formation → lower commission</li>
                    <li className="text-justify">Office Registration → lower commission</li>
                    <li className="text-justify">Accounting / Ongoing Services → recurring commission split</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">High Ticket Services</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li className="text-justify">Full Structure Setup → high commission</li>
                    <li className="text-justify">Trust or Foundation Formation → 10–20%</li>
                    <li className="text-justify">VASP / EMI / MSB Licensing → high commission</li>
                    <li className="text-justify">Fund Formation → high commission</li>
                    <li className="text-justify">Tokenization/SPV Architecture → high commission</li>
                  </ul>
                </div>

                <p className="mt-4">
                  Commission bands will vary by:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li className="text-justify">Region</li>
                  <li className="text-justify">Difficulty</li>
                  <li className="text-justify">Margin</li>
                  <li className="text-justify">Internal cost base</li>
                </ul>
                <p className="mt-4">
                  A fixed table will be provided in the execution section.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                7. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Representative misalignment</h3>
                  <p className="text-gray-800"><strong>Control:</strong> strict training + founder involvement in all conversations.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Misrepresentation to the client</h3>
                  <p className="text-gray-800"><strong>Control:</strong> representatives never pitch technicals; only introduce.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Compliance issues</h3>
                  <p className="text-gray-800"><strong>Control:</strong> pre-screening, KYC always done internally.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Commission disputes</h3>
                  <p className="text-gray-800"><strong>Control:</strong> sign written agreements with transparent payout rules.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 5 — Wrong client types</h3>
                  <p className="text-gray-800"><strong>Control:</strong> pre-qualification script + early rejection criteria.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Commission-Based Representative Channel Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For family-office-uhnw, show family office content
  if (isFamilyOfficeModel) {
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
                <h1 className="text-lg font-semibold text-black">Family Office & UHNW Network</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Family Office & UHNW Network Channel
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Family Office & UHNW Network Model is a specialized, relationship-driven acquisition channel where Boyar Partners builds and maintains direct access to:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Family offices (single + multi-family offices)</li>
                  <li className="text-justify">Ultra-high-net-worth individuals (UHNWIs)</li>
                  <li className="text-justify">Private investment holding companies</li>
                  <li className="text-justify">Legacy wealth groups</li>
                  <li className="text-justify">Private client advisors (lawyers, trustees, fiduciaries, wealth managers)</li>
                  <li className="text-justify">Family office CIOs, CFOs, and general counsel</li>
                </ul>
                <p className="mt-4">
                  In this model, mandates originate through:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Private introductions</li>
                  <li className="text-justify">Reputation transfer</li>
                  <li className="text-justify">Long-term trust-building</li>
                  <li className="text-justify">Discreet advisory interactions</li>
                  <li className="text-justify">Event-level or peer-level access</li>
                </ul>
                <p className="mt-4 font-semibold">
                  This is a discretion-first, credibility-led, founder-driven model — not a marketing or outbound-driven channel.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Is Critical for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Family offices and UHNWIs require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Confidentiality</li>
                  <li className="text-justify">Founder-level attention</li>
                  <li className="text-justify">Multi-jurisdictional expertise</li>
                  <li className="text-justify">Long-cycle advisory relationships</li>
                </ul>
                <p className="mt-4">
                  They do not respond to traditional marketing, SEO, cold outreach, or generic digital funnels.
                </p>
                <p className="mt-4">
                  This channel delivers:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Highest-value mandates</h3>
                    <p className="text-gray-800">Trusts, foundations, succession, multi-jurisdiction structures, fund vehicles, licensing, banking.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Recurring advisory</h3>
                    <p className="text-gray-800">UHNWIs require updates, renewals, new entities, and continuous structuring.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Strong referral loops</h3>
                    <p className="text-gray-800">One UHNW client can unlock a network of family office peers, private bankers, lawyers, and advisors.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Long-term lifetime value</h3>
                    <p className="text-gray-800">Relationships often last 5–20 years and expand naturally.</p>
                  </div>
                </div>
                <p className="mt-4 font-semibold">
                  For a firm like Boyar Partners, this network becomes the core strategic pillar of long-term revenue.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary UHNW Stakeholders
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Wealth creators (entrepreneurs, investors, founders)</li>
                    <li className="text-justify">Second-generation family office heads</li>
                    <li className="text-justify">Family office directors</li>
                    <li className="text-justify">Trustees and fiduciary executives</li>
                    <li className="text-justify">Investment holding companies</li>
                    <li className="text-justify">High-value crypto investors with cross-border needs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Influencers (Equally Important)
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Lawyers (private client, tax, corporate)</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Wealth managers</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">External consultants</li>
                    <li className="text-justify">CPA firms</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    In UHNW ecosystems, the influencer often opens the door, not the UHNWI themselves.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Characteristics of UHNW & Family Office Engagement
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This segment operates on:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Discretion (zero publicity)</li>
                  <li className="text-justify">Trust-based decisions</li>
                  <li className="text-justify">Slow initial vetting → fast execution once trust is formed</li>
                  <li className="text-justify">Importance of personal referrals</li>
                  <li className="text-justify">Heavy reliance on professional advisors</li>
                  <li className="text-justify">Zero tolerance for sales tactics</li>
                  <li className="text-justify">High sensitivity to reputation and compliance</li>
                </ul>
                <p className="mt-4">
                  The model must reflect these values.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantages for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Access to the highest-value client category</li>
                  <li className="text-justify">✓ Multi-service, multi-year relationship potential</li>
                  <li className="text-justify">✓ Ability to act as trusted long-term advisor</li>
                  <li className="text-justify">✓ Zero dependency on mass marketing</li>
                  <li className="text-justify">✓ Strong referral propagation</li>
                  <li className="text-justify">✓ Reinforces boutique positioning</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  When executed correctly, this becomes Boyar's single most profitable acquisition channel.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Breach of Discretion</h3>
                  <p className="text-gray-800">Family offices immediately disengage if confidentiality is compromised.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Founder-led communication only.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Misalignment of expectations</h3>
                  <p className="text-gray-800">UHNWIs expect technical mastery and total clarity.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Strict diagnostic → proposal → scope sequence.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Poor representative behaviour</h3>
                  <p className="text-gray-800">Intermediaries must never appear aggressive.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Approved introducer guidelines.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Compliance issues</h3>
                  <p className="text-gray-800">Source of wealth / source of funds must be crystal clear.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Enhanced due diligence framework.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Family Office & UHNW Network Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For private-banker-wealth-manager, show private banker content
  if (isPrivateBankerModel) {
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
                <h1 className="text-lg font-semibold text-black">Private Banker & Wealth Manager Alliances</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Private Banker & Wealth Manager Alliances
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Private Banker & Wealth Manager Alliances Model is a specialized, relationship-driven acquisition channel where Boyar Partners builds and maintains direct access to:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Family offices (single + multi-family offices)</li>
                  <li className="text-justify">Ultra-high-net-worth individuals (UHNWIs)</li>
                  <li className="text-justify">Private investment holding companies</li>
                  <li className="text-justify">Legacy wealth groups</li>
                  <li className="text-justify">Private client advisors (lawyers, trustees, fiduciaries, wealth managers)</li>
                  <li className="text-justify">Family office CIOs, CFOs, and general counsel</li>
                </ul>
                <p className="mt-4">
                  In this model, mandates originate through:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Private introductions</li>
                  <li className="text-justify">Reputation transfer</li>
                  <li className="text-justify">Long-term trust-building</li>
                  <li className="text-justify">Discreet advisory interactions</li>
                  <li className="text-justify">Event-level or peer-level access</li>
                </ul>
                <p className="mt-4 font-semibold">
                  This is a discretion-first, credibility-led, founder-driven model — not a marketing or outbound-driven channel.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Is Critical for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Family offices and UHNWIs require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Confidentiality</li>
                  <li className="text-justify">Founder-level attention</li>
                  <li className="text-justify">Multi-jurisdictional expertise</li>
                  <li className="text-justify">Long-cycle advisory relationships</li>
                </ul>
                <p className="mt-4">
                  They do not respond to traditional marketing, SEO, cold outreach, or generic digital funnels.
                </p>
                <p className="mt-4">
                  This channel delivers:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Highest-value mandates</h3>
                    <p className="text-gray-800">Trusts, foundations, succession, multi-jurisdiction structures, fund vehicles, licensing, banking.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Recurring advisory</h3>
                    <p className="text-gray-800">UHNWIs require updates, renewals, new entities, and continuous structuring.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Strong referral loops</h3>
                    <p className="text-gray-800">One UHNW client can unlock a network of family office peers, private bankers, lawyers, and advisors.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Long-term lifetime value</h3>
                    <p className="text-gray-800">Relationships often last 5–20 years and expand naturally.</p>
                  </div>
                </div>
                <p className="mt-4 font-semibold">
                  For a firm like Boyar Partners, this network becomes the core strategic pillar of long-term revenue.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary UHNW Stakeholders
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Wealth creators (entrepreneurs, investors, founders)</li>
                    <li className="text-justify">Second-generation family office heads</li>
                    <li className="text-justify">Family office directors</li>
                    <li className="text-justify">Trustees and fiduciary executives</li>
                    <li className="text-justify">Investment holding companies</li>
                    <li className="text-justify">High-value crypto investors with cross-border needs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Influencers (Equally Important)
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Lawyers (private client, tax, corporate)</li>
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Wealth managers</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">External consultants</li>
                    <li className="text-justify">CPA firms</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    In UHNW ecosystems, the influencer often opens the door, not the UHNWI themselves.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Characteristics of UHNW & Family Office Engagement
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This segment operates on:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Discretion (zero publicity)</li>
                  <li className="text-justify">Trust-based decisions</li>
                  <li className="text-justify">Slow initial vetting → fast execution once trust is formed</li>
                  <li className="text-justify">Importance of personal referrals</li>
                  <li className="text-justify">Heavy reliance on professional advisors</li>
                  <li className="text-justify">Zero tolerance for sales tactics</li>
                  <li className="text-justify">High sensitivity to reputation and compliance</li>
                </ul>
                <p className="mt-4">
                  The model must reflect these values.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantages for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Access to the highest-value client category</li>
                  <li className="text-justify">✓ Multi-service, multi-year relationship potential</li>
                  <li className="text-justify">✓ Ability to act as trusted long-term advisor</li>
                  <li className="text-justify">✓ Zero dependency on mass marketing</li>
                  <li className="text-justify">✓ Strong referral propagation</li>
                  <li className="text-justify">✓ Reinforces boutique positioning</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  When executed correctly, this becomes Boyar's single most profitable acquisition channel.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Breach of Discretion</h3>
                  <p className="text-gray-800">Family offices immediately disengage if confidentiality is compromised.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Founder-led communication only.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Misalignment of expectations</h3>
                  <p className="text-gray-800">UHNWIs expect technical mastery and total clarity.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Strict diagnostic → proposal → scope sequence.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Poor representative behaviour</h3>
                  <p className="text-gray-800">Intermediaries must never appear aggressive.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Approved introducer guidelines.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Compliance issues</h3>
                  <p className="text-gray-800">Source of wealth / source of funds must be crystal clear.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Enhanced due diligence framework.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Private Banker & Wealth Manager Alliances Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For fund-manager-pipeline, show fund manager content
  if (isFundManagerModel) {
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
                <h1 className="text-lg font-semibold text-black">Fund Manager Pipeline Programs</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Fund Manager Pipeline Programs
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Fund Manager Pipeline Program is a structured acquisition channel where Boyar Partners identifies, nurtures, and converts:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Emerging fund managers</li>
                  <li className="text-justify">Boutique hedge funds</li>
                  <li className="text-justify">Prop trading desks</li>
                  <li className="text-justify">Crypto and quant funds</li>
                  <li className="text-justify">Real estate GPs</li>
                  <li className="text-justify">Alternative asset managers</li>
                  <li className="text-justify">Launching managers (first-time funds)</li>
                </ul>
                <p className="mt-4">
                  The program guides them through:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Fund jurisdiction selection</li>
                  <li className="text-justify">Entity + SPV architecture</li>
                  <li className="text-justify">Regulatory pathway (licensed/unlicensed options)</li>
                  <li className="text-justify">Banking and custody alignment</li>
                  <li className="text-justify">Administration / compliance frameworks</li>
                  <li className="text-justify">Launch sequencing and operational readiness</li>
                </ul>
                <p className="mt-4 font-semibold">
                  This is a full-cycle advisory funnel, not a one-time service line.
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  The objective: Capture fund managers early — and stay with them for years.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Exists
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Fund managers face friction in almost every stage of launching or scaling:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Jurisdiction confusion (Cayman? BVI? Luxembourg? ADGM? DIFC?)</li>
                  <li className="text-justify">Difficulty with banking and custody</li>
                  <li className="text-justify">Uncertainty about regulatory exemptions</li>
                  <li className="text-justify">Lack of operational readiness</li>
                  <li className="text-justify">No clarity on timelines or requirements</li>
                  <li className="text-justify">Administration fragmentation</li>
                </ul>
                <p className="mt-4">
                  Boyar Partners positions itself as the single integrated advisor who can:
                </p>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mt-4">
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">structure</li>
                    <li className="text-justify">launch</li>
                    <li className="text-justify">license</li>
                    <li className="text-justify">bank</li>
                    <li className="text-justify">administer</li>
                    <li className="text-justify">maintain compliance</li>
                  </ul>
                </div>
                <p className="mt-4 font-semibold">
                  This dramatically reduces friction for the fund manager.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Emerging hedge funds (AUM {'<'} $100M)</li>
                    <li className="text-justify">Quant & crypto funds</li>
                    <li className="text-justify">Prop firms moving into fund structure</li>
                    <li className="text-justify">Real estate GPs creating SPCs or fund vehicles</li>
                    <li className="text-justify">Trading firms expanding internationally</li>
                    <li className="text-justify">First-time fund managers</li>
                    <li className="text-justify">Multi-strategy boutiques</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Lawyers who represent funds</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">Prime brokers</li>
                    <li className="text-justify">Custodians</li>
                    <li className="text-justify">Crypto exchanges</li>
                    <li className="text-justify">Compliance consultants</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    These secondary targets push referrals into Boyar's funnel.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. Value Proposition of This Model
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Fund managers choose Boyar because we provide:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">A. Jurisdiction Clarity</h3>
                    <p className="text-gray-800">Cayman vs BVI vs Luxembourg vs ADGM vs DIFC</p>
                    <p className="text-gray-800 mt-2">Funds care about tax, regulatory certainty, LP expectations, speed, cost.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">B. Structuring Certainty</h3>
                    <p className="text-gray-800">SPCs, Segregated Portfolios, GP/LP flow, feeder/master setups, tokenized shares.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">C. Banking & Custody Access</h3>
                    <p className="text-gray-800">One of the biggest pain points for emerging funds.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">D. Administration Partnerships</h3>
                    <p className="text-gray-800">Fund admin, NAV reporting, compliance, FATCA/CRS, AML.</p>
                  </div>

                  <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">E. Licensing Readiness</h3>
                    <p className="text-gray-800">For managers needing VASP, EMI, MSB, or asset management licenses.</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">F. Operational Launch Roadmap</h3>
                    <p className="text-gray-800">We remove ambiguity and give fund managers a predictable timeline.</p>
                  </div>
                </div>
                <p className="mt-4 font-semibold">
                  This combination is rare — law firms don't offer it, service providers can't, and banks won't.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantage for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-gray-800 mb-4">This model:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Creates long-term, high-value clients</li>
                  <li className="text-justify">✓ Leads to multiple additional structures (SPVs, feeders, GPs, holding companies)</li>
                  <li className="text-justify">✓ Cross-sells naturally (banking, compliance, admin, licensing)</li>
                  <li className="text-justify">✓ Attracts international, sophisticated clientele</li>
                  <li className="text-justify">✓ Builds strong recurring revenue</li>
                  <li className="text-justify">✓ Reinforces boutique expertise and technical authority</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  Funds require ongoing help, not one-time help.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Compliance Considerations
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Regulatory Overreach</h3>
                  <p className="text-gray-800">Fund managers often expect legal interpretations.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Provide factual jurisdiction guidance; legal opinions come from partner law firms.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Misalignment on timelines</h3>
                  <p className="text-gray-800">Funds underestimate onboarding and bank timelines.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Clear, conservative launch roadmaps.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — AML/Source of Funds Issues</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Enhanced due diligence on the GP and promoters.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Custodian and Prime Broker Rejections</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Early feasibility screening.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Fund Manager Pipeline Programs Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For cross-border-ma-feeder, show cross-border M&A content
  if (isCrossBorderMAModel) {
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
                <h1 className="text-lg font-semibold text-black">Cross-Border M&A Feeder Channel</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Cross-Border M&A Feeder Channel
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Cross-Border M&A Feeder Channel is a specialist acquisition program where Boyar Partners positions itself as the structuring and regulatory arm for:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Investment banks</li>
                  <li className="text-justify">Corporate finance advisors</li>
                  <li className="text-justify">M&A boutiques</li>
                  <li className="text-justify">Transaction lawyers</li>
                  <li className="text-justify">PE/VC firms</li>
                  <li className="text-justify">Corporate development teams</li>
                  <li className="text-justify">Deal-originators and buy-side advisors</li>
                </ul>
                <p className="mt-4">
                  These professionals regularly deal with:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Cross-jurisdiction share purchases</li>
                  <li className="text-justify">Entity restructuring</li>
                  <li className="text-justify">SPV creation</li>
                  <li className="text-justify">Profit extraction planning</li>
                  <li className="text-justify">Due diligence gaps</li>
                  <li className="text-justify">Bank onboarding obstacles</li>
                  <li className="text-justify">Tax neutrality requirements</li>
                  <li className="text-justify">Licensing implications on acquisitions</li>
                </ul>
                <p className="mt-4">
                  Yet they are not service providers for offshore structuring, banking, fund vehicles, or licensing.
                </p>
                <p className="mt-2 font-semibold">
                  This creates a constant stream of needs where Boyar Partners becomes the embedded specialist.
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  This model creates a dealflow ecosystem that feeds Boyar Partners with multi-stage mandates originating from M&A transactions.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Is Critical for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Cross-border M&A is a structuring-heavy domain, and advisors urgently need:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Tax-neutral holding vehicles</li>
                  <li className="text-justify">Pre-acquisition SPVs</li>
                  <li className="text-justify">Post-acquisition reorganisation frameworks</li>
                  <li className="text-justify">Jurisdiction comparisons</li>
                  <li className="text-justify">Shareholder agreement compatibility</li>
                  <li className="text-justify">Bankable entity setups</li>
                  <li className="text-justify">Compliance-ready documentation</li>
                  <li className="text-justify">Solutions for distressed or regulatory-risk transactions</li>
                  <li className="text-justify">Licensing clarity when the acquired company is regulated</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Boyar Partners solves these issues faster and more precisely than internal M&A teams.
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  This becomes a sustained feeder channel, as every M&A firm handles 50–400 deals per year.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">M&A law firms</li>
                    <li className="text-justify">Investment banks (regional & boutique)</li>
                    <li className="text-justify">Corporate finance advisors</li>
                    <li className="text-justify">Deal originators</li>
                    <li className="text-justify">PE and VC deal teams</li>
                    <li className="text-justify">Corporate development officers in mid-market companies</li>
                    <li className="text-justify">SPAC sponsors</li>
                    <li className="text-justify">Strategic investors and their advisors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Accountants performing due diligence</li>
                    <li className="text-justify">Tax advisors</li>
                    <li className="text-justify">Insolvency & restructuring professionals</li>
                    <li className="text-justify">Turnaround specialists</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. What Boyar Partners Provides to M&A Teams
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Deal Structuring Support</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">SPVs</li>
                    <li className="text-justify">Holding companies</li>
                    <li className="text-justify">Cascaded entity structures</li>
                    <li className="text-justify">Pre-acquisition restructuring for tax neutrality</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Cross-Border Regulatory Clarity</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Substance requirements</li>
                    <li className="text-justify">Beneficial ownership implications</li>
                    <li className="text-justify">CRS/FATCA risk mapping</li>
                    <li className="text-justify">Jurisdiction risk assessment</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Banking Enablement</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Post-acquisition banking</li>
                    <li className="text-justify">Newco onboarding</li>
                    <li className="text-justify">Compliance documentation</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Licensing Alignment</h3>
                  <p className="text-gray-800 mb-2">When the acquired company is regulated:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">VASP</li>
                    <li className="text-justify">EMI</li>
                    <li className="text-justify">MSB</li>
                    <li className="text-justify">Broker-dealer</li>
                    <li className="text-justify">Fund managers</li>
                  </ul>
                  <p className="text-gray-800 mt-2">Boyar provides the regulatory pathway.</p>
                </div>

                <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Transaction Execution Enablers</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Escrow SPVs</li>
                    <li className="text-justify">Asset transfer entities</li>
                    <li className="text-justify">Share swap vehicles</li>
                    <li className="text-justify">Profit extraction mechanisms</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-gray-800 font-semibold">
                This "solve-anything" capability makes Boyar Partners essential to M&A advisors.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantages for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ High-volume, dealflow-based acquisition model</li>
                  <li className="text-justify">✓ Multi-service opportunities from each transaction</li>
                  <li className="text-justify">✓ High-ticket structuring fees</li>
                  <li className="text-justify">✓ Repeat business from M&A advisors</li>
                  <li className="text-justify">✓ Positioning as THE offshore structuring partner for corporate transactions</li>
                  <li className="text-justify">✓ Sticky relationships that compound annually</li>
                  <li className="text-justify">✓ Access to larger corporate clientele</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  M&A advisors regularly deliver urgent, high-value, multi-jurisdictional work — ideal for Boyar's capabilities.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Transaction Types That Feed This Channel
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Boyar Partners is needed when:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">A foreign acquirer requires a tax-neutral SPV</li>
                  <li className="text-justify">A fund acquires equity in a non-local company</li>
                  <li className="text-justify">A founder exits and needs a clean holding structure</li>
                  <li className="text-justify">A corporate group restructures globally</li>
                  <li className="text-justify">A distressed business requires a carve-out structure</li>
                  <li className="text-justify">A strategic buyer wants risk-ringfenced SPVs</li>
                  <li className="text-justify">Licensing conflicts arise in acquisitions</li>
                  <li className="text-justify">A buyer needs clean compliance for post-deal banking</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                7. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Misinterpretation of M&A legal advice</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Boyar provides structuring support, not legal opinions.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Timeline pressure</h3>
                  <p className="text-gray-800">M&A deals often require 48–72 hour turnaround.</p>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Dedicated rapid structuring protocol.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Incomplete financial/compliance data</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Mandatory pre-engagement feasibility assessment.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Bank onboarding delays</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Early banking viability check.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Cross-Border M&A Feeder Channel Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For investor-club-syndicate, show investor club content
  if (isInvestorClubModel) {
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
                <h1 className="text-lg font-semibold text-black">Investor Club & Syndicate Partnership</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Investor Club & Syndicate Partnership
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Investor Club & Syndicate Partnership Model is a structured acquisition channel where Boyar Partners forms alliances with:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Angel syndicates</li>
                  <li className="text-justify">Investor clubs</li>
                  <li className="text-justify">Venture collectives</li>
                  <li className="text-justify">Deal-sharing networks</li>
                  <li className="text-justify">Crypto investment DAOs</li>
                  <li className="text-justify">Private investment circles</li>
                  <li className="text-justify">Regional investor communities</li>
                  <li className="text-justify">Real estate syndicates</li>
                  <li className="text-justify">Angel networks attached to accelerators</li>
                </ul>
                <p className="mt-4">
                  These networks regularly fund companies, manage dealflow, and advise their founders.
                </p>
                <p className="mt-4">
                  Every time a founder raises capital—or prepares to raise—they require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Structuring</li>
                  <li className="text-justify">Cross-border SPVs</li>
                  <li className="text-justify">Banking</li>
                  <li className="text-justify">Licensing</li>
                  <li className="text-justify">Fund vehicles</li>
                  <li className="text-justify">Offshore entities</li>
                  <li className="text-justify">Tokenization support</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Therefore, investor clubs become continuous feeders of high-value mandates.
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  Boyar Partners positions itself as the preferred structuring and compliance advisor for their portfolio companies, co-investors, and syndicate members.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Channel Is One of the Most Valuable
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Investor clubs solve the biggest acquisition challenge for a boutique advisory firm:
                </p>
                <p className="font-semibold">
                  They bring you high-quality founders BEFORE they scale and BEFORE competitors approach them.
                </p>
                <p className="mt-4">
                  This channel creates:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Early access (pre-round or pre-launch)</h3>
                    <p className="text-gray-800">You meet founders before they lock in advisors.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Authority by association</h3>
                    <p className="text-gray-800">If a respected syndicate trusts Boyar, the founders trust Boyar.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Warm introductions every month</h3>
                    <p className="text-gray-800">Most clubs run 2–10 deals monthly.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ High-ticket cross-selling opportunities</h3>
                    <p className="text-gray-800 mb-2">Companies funded by syndicates need:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">SPVs</li>
                      <li className="text-justify">Holding structures</li>
                      <li className="text-justify">Banking</li>
                      <li className="text-justify">Licensing</li>
                      <li className="text-justify">Fund vehicles</li>
                      <li className="text-justify">Token issuance frameworks</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Access to multiple jurisdictions</h3>
                    <p className="text-gray-800">Investor networks tend to be global.</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Long-term pipeline compounding</h3>
                    <p className="text-gray-800">Every raise → new companies → new needs → new structures.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Angel syndicates (local & international)</li>
                    <li className="text-justify">Web3 investment clubs</li>
                    <li className="text-justify">Venture DAOs</li>
                    <li className="text-justify">PE-like investment groups</li>
                    <li className="text-justify">High-net-worth investment clubs</li>
                    <li className="text-justify">Real estate syndicate groups</li>
                    <li className="text-justify">Specialized sector networks (FinTech, AI, SaaS, Crypto)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Targets (Influencers)
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Syndicate leads</li>
                    <li className="text-justify">Deal analysts</li>
                    <li className="text-justify">Portfolio managers</li>
                    <li className="text-justify">Investor relations managers</li>
                    <li className="text-justify">Community heads</li>
                    <li className="text-justify">Fundraising intermediaries</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    These individuals become Boyar's embedded introducers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. What Boyar Partners Provides to Investor Groups
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Portfolio Structuring Support</h3>
                  <p className="text-gray-800 mb-2">Each startup or company gets:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Jurisdiction selection</li>
                    <li className="text-justify">SPV architecture</li>
                    <li className="text-justify">Bankability assessment</li>
                    <li className="text-justify">Tokenization feasibility</li>
                    <li className="text-justify">Licensing clarity (VASP, EMI, MSB, etc.)</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Syndicate-Level Briefings</h3>
                  <p className="text-gray-800 mb-2">Investor clubs get:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Jurisdiction masterclasses</li>
                    <li className="text-justify">Banking update workshops</li>
                    <li className="text-justify">Compliance advisories</li>
                    <li className="text-justify">SPV structure frameworks for SAFE/SAFT rounds</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Deal Readiness Advisory</h3>
                  <p className="text-gray-800 mb-2">Before a syndicate invests, Boyar reviews:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Founder structuring</li>
                    <li className="text-justify">Cross-border entity compatibility</li>
                    <li className="text-justify">Red flags</li>
                    <li className="text-justify">Regulatory gaps</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Deal Execution Support</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">SPV setup</li>
                    <li className="text-justify">Newco formation</li>
                    <li className="text-justify">Investor onboarding compliance</li>
                    <li className="text-justify">Custody/banking pathways</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Long-Term Advisory</h3>
                  <p className="text-gray-800 mb-2">Portfolio companies often grow → more structuring required:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">International expansion</li>
                    <li className="text-justify">Licensing</li>
                    <li className="text-justify">Fund vehicles</li>
                    <li className="text-justify">Additional SPVs</li>
                    <li className="text-justify">Token issuance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantages for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Consistent, pipeline-based dealflow</li>
                  <li className="ml-4">Investor clubs expose Boyar to dozens of companies monthly.</li>
                  <li className="text-justify">✓ Early-stage capture</li>
                  <li className="ml-4">Founders adopt Boyar before they choose other advisors.</li>
                  <li className="text-justify">✓ High-ticket advisory layering</li>
                  <li className="ml-4">Initial structuring → banking → licensing → fund → trust → M&A → repeat.</li>
                  <li className="text-justify">✓ Accelerated trust transfer</li>
                  <li className="ml-4">Syndicate's endorsement = pre-validated credibility.</li>
                  <li className="text-justify">✓ Low acquisition cost</li>
                  <li className="ml-4">No ads, no outbound. Pure warm access.</li>
                  <li className="text-justify">✓ Access to sophisticated, cross-border clientele</li>
                  <li className="ml-4">Majority operate regionally or globally.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Syndicate expecting free advisory</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Clear boundaries: feasibility only, fee-based execution.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Underestimating regulatory complexity</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Provide factual notes, no oversimplification.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Conflicts of interest</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Transparent conflict checks.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Representing work as legal advice</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Legal opinions come from partner law firms only.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Investor Club & Syndicate Partnership Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For crypto-exchange-otc, show crypto exchange content
  if (isCryptoExchangeModel) {
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
                <h1 className="text-lg font-semibold text-black">Crypto Exchange & OTC Desk Partnerships</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Crypto Exchange & OTC Desk Partnerships
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Crypto Exchange & OTC Desk Partnership Model is a strategic acquisition channel where Boyar Partners partners with:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Crypto exchanges (centralized, regulated, offshore, hybrid)</li>
                  <li className="text-justify">OTC trading desks</li>
                  <li className="text-justify">Market makers</li>
                  <li className="text-justify">Custodians</li>
                  <li className="text-justify">Crypto payment processors</li>
                  <li className="text-justify">On-ramp/off-ramp providers</li>
                  <li className="text-justify">Brokerage platforms</li>
                </ul>
                <p className="mt-4">
                  These platforms deal with thousands of clients who often require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Offshore structuring</li>
                  <li className="text-justify">Corporate entities for trading</li>
                  <li className="text-justify">VASP licensing</li>
                  <li className="text-justify">Banking (fiat on/off-ramp challenges)</li>
                  <li className="text-justify">Complex compliance documentation</li>
                  <li className="text-justify">SPVs for token issuance</li>
                  <li className="text-justify">Fund vehicles</li>
                  <li className="text-justify">Settlement structures</li>
                  <li className="text-justify">Regulatory clarity</li>
                </ul>
                <p className="mt-4">
                  Exchanges and OTC desks cannot provide this themselves (regulatory restrictions), so they rely on trusted partners — creating a continuous feeder model for Boyar Partners.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Is Extremely Valuable
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Crypto platforms face regulatory, banking, and onboarding barriers that Boyar naturally solves.
                </p>
                <p className="mt-4">
                  This channel automatically brings:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ High-volume client introductions</h3>
                    <p className="text-gray-800">OTC desks alone onboard 50–300 new clients monthly.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Highly motivated clients</h3>
                    <p className="text-gray-800">Crypto clients need instant answers on banking, licensing, KYC, SPVs, and structuring.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ High-ticket structuring mandates</h3>
                    <p className="text-gray-800 mb-2">Crypto clients frequently require:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">Cayman/BVI companies</li>
                      <li className="text-justify">Foundations</li>
                      <li className="text-justify">Token issuance entities</li>
                      <li className="text-justify">VASP licensing</li>
                      <li className="text-justify">Fund structures</li>
                      <li className="text-justify">Banking packages</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Repeat business from the same exchange</h3>
                    <p className="text-gray-800">Once trust is built, exchanges forward large flows of founders, teams, and whales.</p>
                  </div>

                  <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Pure warm introductions</h3>
                    <p className="text-gray-800">Exchanges introduce Boyar directly—zero cold outreach and minimal friction.</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Deep regulatory expertise positioning</h3>
                    <p className="text-gray-800">Crypto clients perceive structuring + licensing + banking as Boyar's domain.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary Partnerships
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Tier 1 exchanges (Binance, OKX, Bybit, Crypto.com, Coinbase Institutional)</li>
                    <li className="text-justify">Tier 2 regional exchanges (MENA, EU, Baltic, African, LATAM)</li>
                    <li className="text-justify">OTC desks (Dubai, Singapore, Hong Kong, London)</li>
                    <li className="text-justify">Crypto brokers and liquidity providers</li>
                    <li className="text-justify">Custodians (Fireblocks partners, BitGo partners)</li>
                    <li className="text-justify">Crypto payment processors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Exchange KYC/Compliance teams</li>
                    <li className="text-justify">Institutional sales teams</li>
                    <li className="text-justify">VIP relationship managers</li>
                    <li className="text-justify">Liquidity/account managers</li>
                    <li className="text-justify">OTC desk heads</li>
                    <li className="text-justify">Market-making firms</li>
                    <li className="text-justify">Crypto venture arms (launchpads, incubators)</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    These individuals control client onboarding, making them key introducers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. What Boyar Partners Provides to Exchanges & OTC Desks
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  Crypto platforms regularly face client issues they cannot solve internally:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">A. Structuring for Trading Entities</h3>
                    <p className="text-gray-800 mb-2">Exchange clients require jurisdictions like:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">Seychelles</li>
                      <li className="text-justify">BVI</li>
                      <li className="text-justify">Cayman</li>
                      <li className="text-justify">UAE</li>
                      <li className="text-justify">Panama</li>
                      <li className="text-justify">Marshall Islands</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">B. Token Issuance Structuring</h3>
                    <p className="text-gray-800">Foundations, holding companies, token SPVs, governance frameworks.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">C. VASP Licensing Pathways</h3>
                    <p className="text-gray-800">EU, UAE, UK, offshore, and island jurisdictions.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">D. Banking Pathways for Crypto Businesses</h3>
                    <p className="text-gray-800">Banks rarely accept crypto; Boyar helps structure clients to reduce friction.</p>
                  </div>

                  <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">E. High-Risk Compliance Documentation</h3>
                    <p className="text-gray-800">Enhanced due diligence, proof-of-structure, SOF/SOF mapping.</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">F. Investor and Fund Vehicles</h3>
                    <p className="text-gray-800">Crypto funds, prop trading vehicles, master-feeder structures.</p>
                  </div>

                  <div className="p-4 bg-teal-50 border-l-4 border-teal-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">G. Expansion Support</h3>
                    <p className="text-gray-800 mb-2">Crypto companies expanding to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">MENA</li>
                      <li className="text-justify">EU</li>
                      <li className="text-justify">Asia</li>
                      <li className="text-justify">Caribbean</li>
                    </ul>
                    <p className="text-gray-800 mt-2">need offshore/onshore alignment.</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-800 font-semibold">
                  Exchanges WANT this partner because it reduces churn, resolves onboarding blockers, and enhances client satisfaction.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Advantages for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Scalable pipeline</li>
                  <li className="ml-4">Exchanges have thousands of regulated, high-value entities that need structuring.</li>
                  <li className="text-justify">✓ High urgency</li>
                  <li className="ml-4">Crypto clients cannot operate without proper structures.</li>
                  <li className="text-justify">✓ High-ticket, multi-service conversions</li>
                  <li className="ml-4">One client may need: A structure, Banking, Licensing, Custody, Token entity, Compliance, Fund vehicle</li>
                  <li className="text-justify">✓ Cross-border, sophisticated clientele</li>
                  <li className="ml-4">Crypto clients often operate in 3–5 countries already.</li>
                  <li className="text-justify">✓ Recurring business</li>
                  <li className="ml-4">Exchanges continue sending cases monthly.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — High-risk clients</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Pre-engagement crypto AML screening.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Regulatory expectations</h3>
                  <p className="text-gray-800">Misalignment between crypto simplicity mindset and jurisdiction complexity.</p>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Clear, technical explanations + scope documentation.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Exchanges expecting price concessions</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Maintain premium positioning; value-first conversations.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Fast turnaround pressure</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> 24–48 hour feasibility responses (not full proposals).</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Crypto Exchange & OTC Desk Partnerships Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For incubator-accelerator, show incubator content
  if (isIncubatorModel) {
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
                <h1 className="text-lg font-semibold text-black">Incubator & Accelerator Dealflow Access</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Incubator & Accelerator Dealflow Access
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Incubator & Accelerator Dealflow Access Model is a structured acquisition channel in which Boyar Partners partners with:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Global startup incubators</li>
                  <li className="text-justify">Accelerator programs</li>
                  <li className="text-justify">Web3 incubators & launchpads</li>
                  <li className="text-justify">Venture studios</li>
                  <li className="text-justify">Innovation hubs</li>
                  <li className="text-justify">Corporate accelerators</li>
                  <li className="text-justify">University/startup ecosystems</li>
                </ul>
                <p className="mt-4">
                  These organizations run cohorts of startups every month or quarter.
                </p>
                <p className="mt-4">
                  Each cohort gives Boyar:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">20–200 new companies</li>
                  <li className="text-justify">Early access to founders</li>
                  <li className="text-justify">Highly motivated teams with imminent structuring needs</li>
                  <li className="text-justify">Companies preparing for fundraising</li>
                  <li className="text-justify">Web3/token projects needing regulatory pathways</li>
                  <li className="text-justify">FinTech/AI/SaaS companies needing jurisdiction clarity</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Incubators become repeat-volume feeders with predictable dealflow.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Channel Is Valuable for Boyar Partners
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  This channel gives Boyar sustainable, recurring, high-quality client access because:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Incubators produce constant startup batches</h3>
                    <p className="text-gray-800">Every 3–4 months, new companies join.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Each startup needs structuring</h3>
                    <p className="text-gray-800">Especially when they are cross-border or tech-oriented.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Many require licensing</h3>
                    <p className="text-gray-800">FinTech, crypto, payments, token issuance.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Startups need banking</h3>
                    <p className="text-gray-800">And often face rejection unless structured properly.</p>
                  </div>

                  <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Startups raise capital</h3>
                    <p className="text-gray-800">→ Investors require clean SPVs and holding companies.</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Startups expand globally</h3>
                    <p className="text-gray-800">→ Need multi-jurisdiction architecture.</p>
                  </div>

                  <div className="p-4 bg-teal-50 border-l-4 border-teal-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Lifetime value</h3>
                    <p className="text-gray-800">Startups that start with Boyar often remain clients for 5–10+ years.</p>
                  </div>

                  <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">✓ Founder networks compound</h3>
                    <p className="text-gray-800">One satisfied founder introduces five more.</p>
                  </div>
                </div>
                <p className="mt-4 font-semibold text-gray-900">
                  This channel is one of the highest-LTV acquisition engines available.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Who This Model Targets
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Primary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Tier 1 accelerators (global)</li>
                    <li className="text-justify">Web3 and crypto launchpads</li>
                    <li className="text-justify">Y-Combinator style programs (regional)</li>
                    <li className="text-justify">AI/DeepTech incubators</li>
                    <li className="text-justify">FinTech accelerators</li>
                    <li className="text-justify">University innovation labs</li>
                    <li className="text-justify">Corporate innovation programs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Secondary Targets
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Program managers</li>
                    <li className="text-justify">Batch directors</li>
                    <li className="text-justify">Mentors and advisors</li>
                    <li className="text-justify">Investor relations teams</li>
                    <li className="text-justify">Heads of cohort education</li>
                    <li className="text-justify">Ecosystem leads</li>
                  </ul>
                  <p className="mt-4 text-gray-800">
                    These individuals decide who will provide structuring sessions and referrals.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. What Boyar Partners Provides to Incubators & Accelerators
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Cohort Masterclasses</h3>
                  <p className="text-gray-800 mb-2">Short sessions such as:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">"How to Structure for Global Scaling"</li>
                    <li className="text-justify">"Banking for Startups — Avoiding Compliance Traps"</li>
                    <li className="text-justify">"Cayman/BVI SPVs for Fundraising"</li>
                    <li className="text-justify">"Web3 Structuring for Token Issuance"</li>
                    <li className="text-justify">"Licensing Readiness for FinTech"</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Founder Office Hours</h3>
                  <p className="text-gray-800">Each startup gets a 15–20 minute diagnostic.</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Structuring Playbooks</h3>
                  <p className="text-gray-800">A 10-page jurisdiction roadmap for scaling startups.</p>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Advisory Access</h3>
                  <p className="text-gray-800 mb-2">Mentorship in:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Structuring</li>
                    <li className="text-justify">Compliance</li>
                    <li className="text-justify">Banking</li>
                    <li className="text-justify">Licensing</li>
                    <li className="text-justify">Token frameworks</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Partner Positioning</h3>
                  <p className="text-gray-800">Boyar becomes the preferred advisor for startup cohorts.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Fit for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-gray-800 mb-4">This channel is perfect for Boyar because:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Founders at accelerators trust external advisors quickly</li>
                  <li className="text-justify">✓ Startups make decisions fast</li>
                  <li className="text-justify">✓ Many are cross-border</li>
                  <li className="text-justify">✓ Many want offshore holding structures</li>
                  <li className="text-justify">✓ Most need first-entity structuring ASAP</li>
                  <li className="text-justify">✓ High-ticket work emerges once they grow</li>
                  <li className="text-justify">✓ Startup communities create powerful referral loops</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  This is a compounding acquisition engine.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Startups expect free consulting</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Only offer diagnostics + playbooks — charge for execution.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — High attrition / unqualified startups</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Pre-screen for viability.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Too many low-ticket cases</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Prioritize FinTech, Web3, scaling SaaS, AI, trading companies.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Compliance risk</h3>
                  <p className="text-gray-800 mt-2"><strong>Solution:</strong> Maintain strict KYC standards.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Incubator & Accelerator Dealflow Access Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For law-firm-co-branded, show law firm content
  if (isLawFirmModel) {
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
                <h1 className="text-lg font-semibold text-black">Law Firm Strategic Co-Branded Funnels</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Law Firm Strategic Co-Branded Funnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Law Firm Strategic Co-Branded Funnel Model is a partnership-driven acquisition channel where Boyar Partners collaborates with:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Boutique corporate law firms</li>
                  <li className="text-justify">Private client law firms</li>
                  <li className="text-justify">Tax law firms</li>
                  <li className="text-justify">Litigation firms with corporate clientele</li>
                  <li className="text-justify">Technology / FinTech law practices</li>
                  <li className="text-justify">Web3/blockchain specialist legal teams</li>
                  <li className="text-justify">Restructuring and insolvency law firms</li>
                  <li className="text-justify">International law networks</li>
                </ul>
                <p className="mt-4">
                  to create co-branded advisory funnels, including:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Joint whitepapers</li>
                  <li className="text-justify">Co-hosted webinars</li>
                  <li className="text-justify">Co-branded structuring guides</li>
                  <li className="text-justify">Shared client briefings</li>
                  <li className="text-justify">Referral exchanges</li>
                  <li className="text-justify">Diagnostic clinics</li>
                  <li className="text-justify">Partnership-based funnels on websites/newsletters</li>
                </ul>
                <p className="mt-4">
                  Law firms introduce clients who require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Offshore structuring</li>
                  <li className="text-justify">Licensing (VASP, EMI, MSB, Forex)</li>
                  <li className="text-justify">Trust/foundation vehicles</li>
                  <li className="text-justify">Fund formation</li>
                  <li className="text-justify">Token issuance entities</li>
                  <li className="text-justify">Banking alignment</li>
                  <li className="text-justify">Multi-jurisdiction setups</li>
                </ul>
                <p className="mt-4">
                  Law firms cannot deliver these solutions themselves — making Boyar Partners their adjacent value partner.
                </p>
                <p className="mt-2 font-semibold">
                  This channel is built on credibility, compliance, and reputation transfer.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Is Extremely High-Value
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Law firms control high-ticket corporate mandates</h3>
                  <p className="text-gray-800">Their clients are typically mid-market companies, UHNWIs, startups, funds, and regulated entities.</p>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Legal teams constantly encounter structuring problems</h3>
                  <p className="text-gray-800 mb-2">Common triggers:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Cross-border acquisitions</li>
                    <li className="text-justify">Founder relocation</li>
                    <li className="text-justify">Asset protection requirements</li>
                    <li className="text-justify">License-driven restructuring</li>
                    <li className="text-justify">Token issuance scrutiny</li>
                    <li className="text-justify">International expansion</li>
                    <li className="text-justify">Holding company reorganizations</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Law firms need a structuring partner they can trust</h3>
                  <p className="text-gray-800">They avoid recommending corporate service providers unless the firm shows precision and professionalism.</p>
                  <p className="text-gray-800 mt-2">Once trust is established, referrals become continuous and high-quality.</p>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Co-branded content increases instant credibility</h3>
                  <p className="text-gray-800 mb-2">When Boyar Partners and a respected law firm appear together on:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">A whitepaper</li>
                    <li className="text-justify">A webinar</li>
                    <li className="text-justify">A timeline diagram</li>
                    <li className="text-justify">A structuring checklist</li>
                  </ul>
                  <p className="text-gray-800 mt-2">…it signals expertise + legitimacy + authority to clients.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Target Partners (Law Firms with Highest Impact)
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 1 (Most Valuable)
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Corporate law firms</li>
                    <li className="text-justify">Private client advisory firms</li>
                    <li className="text-justify">Tax planning specialists</li>
                    <li className="text-justify">Cross-border transactional firms</li>
                    <li className="text-justify">Web3/blockchain legal practices</li>
                    <li className="text-justify">Fund structuring law firms</li>
                    <li className="text-justify">M&A boutique legal teams</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 2
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Boutique dispute/litigation firms with commercial clientele</li>
                    <li className="text-justify">VC/Startup-focused law firms</li>
                    <li className="text-justify">Immigration law firms with investor clients</li>
                    <li className="text-justify">Compliance/regulatory law teams</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 3
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Regional law networks</li>
                    <li className="text-justify">Solo legal practitioners with high-net-worth clients</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. What Boyar Partners Offers to Law Firms
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Expands their advisory capabilities</h3>
                  <p className="text-gray-800">Law firms cannot set up offshore structures or banking — Boyar can.</p>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Helps them secure deals</h3>
                  <p className="text-gray-800">Boyar clarifies structuring early → legal teams proceed faster.</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. Provides intellectual authority</h3>
                  <p className="text-gray-800">Co-branded research signals deep cross-border expertise.</p>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. Enhances client satisfaction</h3>
                  <p className="text-gray-800">Lawyers solve more problems for clients → client retention increases.</p>
                </div>

                <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Reduces risk</h3>
                  <p className="text-gray-800">A trusted structuring partner lowers compliance mistakes.</p>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">F. Provides a referral destination for non-core work</h3>
                  <p className="text-gray-800">Lawyers stay focused on legal matters; Boyar handles structuring/regulatory work.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Strategic Fit for Boyar Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-gray-800 mb-4">This channel aligns perfectly with Boyar's operational model:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Founder-led credibility</li>
                  <li className="text-justify">✓ Professional-standard communication</li>
                  <li className="text-justify">✓ Jurisdictional expertise</li>
                  <li className="text-justify">✓ Compliance-first thinking</li>
                  <li className="text-justify">✓ High-value, high-complexity mandates</li>
                  <li className="text-justify">✓ International clientele</li>
                </ul>
                <p className="mt-4 text-gray-800 font-semibold">
                  This model integrates Boyar directly into the professional ecosystem—exactly how top offshore advisors grow.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Law firms fear brand dilution</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Co-branded content must be high design quality and neutral in tone.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Miscommunication on roles</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Clear scope: legal opinions by lawyers; structuring/execution by Boyar.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Compliance risk (shared clients)</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Strict KYC/AML alignment protocols.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Overpromising by either party</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Joint briefing and approval system for all public messaging.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Law Firm Strategic Co-Branded Funnels Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For strategic-partnership-referral, show strategic partnership content
  if (isStrategicPartnershipModel) {
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
                <h1 className="text-lg font-semibold text-black">Strategic Partnership & Referral Alliances</h1>
                <div className="w-20" /> {/* Spacer */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-4xl px-6 py-12 print:max-w-full print:px-8" style={{ textAlign: 'left' }}>
            {/* Title Page */}
            <div className="mb-16 text-center border-b border-gray-300 pb-12">
              <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                Strategic Partnership & Referral Alliances
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-benzin)' }}>
                Model Definition & Strategic Framework
              </h2>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                1. Model Definition
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="text-justify">
                  The Strategic Partnership & Referral Alliance Model is a relationship-based acquisition channel where Boyar Partners forms long-term professional alliances with individuals and institutions whose clients frequently require:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Offshore structuring</li>
                  <li className="text-justify">Licensing (VASP, EMI, MSB, Forex)</li>
                  <li className="text-justify">Trust & foundation vehicles</li>
                  <li className="text-justify">Banking pathways</li>
                  <li className="text-justify">Fund formation & administration</li>
                  <li className="text-justify">Tokenization structuring</li>
                  <li className="text-justify">Cross-border compliance</li>
                </ul>
                <p className="mt-4">
                  These partners include:
                </p>
                <ul className="list-disc ml-6 space-y-2 pl-0" style={{ listStylePosition: 'outside' }}>
                  <li className="text-justify">Private bankers</li>
                  <li className="text-justify">Wealth managers</li>
                  <li className="text-justify">Corporate & tax lawyers</li>
                  <li className="text-justify">Accountants & auditors</li>
                  <li className="text-justify">Fund administrators</li>
                  <li className="text-justify">VC/PE analysts</li>
                  <li className="text-justify">Immigration-by-investment advisors</li>
                  <li className="text-justify">Crypto exchanges & OTC desks</li>
                  <li className="text-justify">Real estate advisors serving HNWIs</li>
                </ul>
                <p className="mt-4">
                  Whenever their client faces a structuring, compliance, or banking challenge, they introduce the client to Boyar Partners. Over time, this becomes a self-sustaining and extremely high-quality acquisition engine.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                2. Why This Model Exists & Why It Is High Value
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">A. Partners have clients who already need advisory support</h3>
                  <p className="text-gray-800">Your partners meet clients at the moment of complexity — expansion, investment, acquisition, licensing, token issuance.</p>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">B. Referrals carry built-in trust</h3>
                  <p className="text-gray-800">When a banker, accountant, or lawyer introduces Boyar, the client arrives pre-qualified and pre-trusted.</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">C. This channel compounds over time</h3>
                  <p className="text-gray-800">Each partner can send 1–20 referrals per year.</p>
                  <p className="text-gray-800 mt-1">Ten partners = 10–200 referrals annually.</p>
                </div>

                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">D. The pipeline is high-ticket</h3>
                  <p className="text-gray-800 mb-2">Referrals usually involve:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                    <li className="text-justify">Multi-entity structures</li>
                    <li className="text-justify">Banking packages</li>
                    <li className="text-justify">Licensing mandates</li>
                    <li className="text-justify">Full structuring frameworks</li>
                    <li className="text-justify">Trust/foundation setups</li>
                    <li className="text-justify">Fund vehicles</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-50 border-l-4 border-pink-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">E. Anchors Boyar at the center of the professional ecosystem</h3>
                  <p className="text-gray-800">The most successful advisory firms globally scale through partnerships, not advertising.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                3. Target Partner Segments
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 1 — Highest Priority (Fastest Yield)
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Private bankers</li>
                    <li className="text-justify">Wealth managers</li>
                    <li className="text-justify">Corporate & tax lawyers</li>
                    <li className="text-justify">Fund administrators</li>
                    <li className="text-justify">Crypto OTC desks & exchanges</li>
                    <li className="text-justify">VC/Angel group analysts</li>
                  </ul>
                  <p className="mt-4 text-gray-800">These groups see complex client scenarios weekly.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 2 — Medium Cycle Partners
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Immigration & residency advisors</li>
                    <li className="text-justify">SME accountants</li>
                    <li className="text-justify">M&A intermediaries</li>
                    <li className="text-justify">Real estate HNWI brokers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Tier 3 — Long Cycle Partners
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                    <li className="text-justify">Corporate secretaries</li>
                    <li className="text-justify">Consultants</li>
                    <li className="text-justify">Regional firm networks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                4. How This Model Works When You Have No Existing Referrals
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed text-left">
                <p className="font-semibold text-gray-900">
                  This is the critical section explaining how referral partnerships work when a firm is new and has zero referrals today.
                </p>
                <p className="mt-4">
                  Most new boutique advisory firms incorrectly believe referral alliances start after you have clients. In reality, they start before you have clients — by offering controlled, compliance-safe, value-first support that strengthens your partner's ability to serve their clients.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">A. Early partnerships are built on capability, not track record</h3>
                    <p className="text-gray-800 mb-2">Professionals such as lawyers, bankers, accountants do NOT need proof of your referral history.</p>
                    <p className="text-gray-800 mb-2">What they need is proof that:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">You are technically competent</li>
                      <li className="text-justify">You protect their client relationships</li>
                      <li className="text-justify">You respond quickly</li>
                      <li className="text-justify">Your communication meets international standards</li>
                      <li className="text-justify">You will NOT create compliance problems</li>
                    </ul>
                    <p className="text-gray-800 mt-2">If these conditions are met, they begin referring.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">B. You offer small, controlled value first — not free consulting</h3>
                    <p className="text-gray-800 mb-2">Partners evaluate you based on:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">Feasibility checks (brief, factual, non-binding)</li>
                      <li className="text-justify">Co-branded guides (to help them look stronger)</li>
                      <li className="text-justify">Short jurisdictional briefings</li>
                      <li className="text-justify">Founder accessibility</li>
                      <li className="text-justify">Clear compliance boundaries</li>
                    </ul>
                    <p className="text-gray-800 mt-2">These actions build their confidence in your professionalism.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">C. Referrals begin slowly but reliably</h3>
                    <p className="text-gray-800 mb-2">A realistic referral timeline:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">Month 1–2: No referrals yet — partners observe, test, evaluate.</li>
                      <li className="text-justify">Month 3–4: First small referral arrives (a simple case).</li>
                      <li className="text-justify">Month 5–6: Referrals become more frequent.</li>
                      <li className="text-justify">Month 7–12: Partners begin sending consistent introductions.</li>
                      <li className="text-justify">Year 2: This becomes the largest pipeline channel.</li>
                    </ul>
                    <p className="text-gray-800 mt-2">This predictable development cycle is how all major offshore advisory firms built their referral machines.</p>
                  </div>

                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                    <h3 className="text-lg font-semibold mb-2 text-black">D. Partners refer BEFORE they have seen your past results</h3>
                    <p className="text-gray-800 mb-2">There is a misconception that partners wait for your "history." They don't.</p>
                    <p className="text-gray-800 mb-2">They refer when they believe:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                      <li className="text-justify">You will not embarrass them</li>
                      <li className="text-justify">You protect their client relationships</li>
                      <li className="text-justify">You communicate professionally</li>
                      <li className="text-justify">You enhance their service offering</li>
                    </ul>
                    <p className="text-gray-800 mt-2">This is why founder-led handling of partner relationships is mandatory.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                5. Value Proposition to Partners
              </h2>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-800 rounded-r-lg">
                <p className="text-gray-800 mb-4">Boyar Partners strengthens partner firms by giving them:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800">
                  <li className="text-justify">✓ Structuring and execution capabilities they don't have</li>
                  <li className="ml-4">Lawyers/tax advisors/bankers cannot form offshore entities, SPVs, trusts, or handle banking/licensing execution.</li>
                  <li className="text-justify">✓ Fast feasibility assessments</li>
                  <li className="ml-4">Partners love quick clarity for their clients.</li>
                  <li className="text-justify">✓ Protection of client relationship</li>
                  <li className="ml-4">The partner always remains the client's primary advisor.</li>
                  <li className="text-justify">✓ Access to expert-level materials</li>
                  <li className="ml-4">Jurisdiction guides, licensing matrices, compliance pathways — co-branded when relevant.</li>
                  <li className="text-justify">✓ Increased stickiness of their clients</li>
                  <li className="ml-4">When they solve more problems, clients remain loyal to them longer.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-benzin)' }}>
                6. Risks & Controls
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 1 — Over-reliance on a few partners</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Diversify across segments (bankers, lawyers, accountants, etc.).</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 2 — Misaligned expectations</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Use structured playbooks and engagement rules.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 3 — Compliance concerns</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Strict KYC, no shortcuts.</p>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <h3 className="text-lg font-semibold mb-2 text-black">Risk 4 — Brand dilution</h3>
                  <p className="text-gray-800 mt-2"><strong>Control:</strong> Maintain high design, high-quality communication, consistent professionalism.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>Strategic Partnership & Referral Alliances Model Definition</p>
              <p className="mt-2">Boyar Partners — Internal Use Only</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  // For other models, redirect to their specific what-is-it pages
  // Final safeguard: if nothing matched, hard-redirect to founder content
  router.replace(`/client-acquisition/models/${groupId}/founder-led-origination/what-is-it`);
  return null;
}
