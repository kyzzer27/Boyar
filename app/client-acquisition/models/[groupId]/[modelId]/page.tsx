"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

const modelDetails: { [key: string]: { name: string; groupName: string } } = {
  "ai-driven-abm": {
    name: "AI-Driven ABM Enhancements",
    groupName: "Group 7 — Automation, Retargeting & AI-Driven Optimization",
  },
  "founder-led-origination": {
    name: "Founder-Led Origination",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "linkedin-executive-outreach": {
    name: "LinkedIn Executive Outreach",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "thought-leadership-media": {
    name: "Thought Leadership & Media Authority",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "offshore-masterclass": {
    name: "Offshore Masterclass Series",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "reputation-borrowing": {
    name: "Reputation Borrowing via Guest Appearances",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "private-webinars": {
    name: "Private Webinars / Closed-Door Briefings",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "cfo-gc-roundtable": {
    name: "CFO / GC Executive Roundtable Acquisition Model",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "youtube-expertise": {
    name: "YouTube Expertise Positioning",
    groupName: "Authority, Thought Leadership & Brand Positioning",
  },
  "thought-leadership-media": {
    name: "Thought Leadership & Media Authority",
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
  },
  "commission-based-representative": {
    name: "Commission-Based Representative Channel",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "family-office-uhnw": {
    name: "Family Office & UHNW Network",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "private-banker-wealth-manager": {
    name: "Private Banker & Wealth Manager Alliances",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "fund-manager-pipeline": {
    name: "Fund Manager Pipeline Programs",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "cross-border-ma-feeder": {
    name: "Cross-Border M&A Feeder Channel",
    groupName: "Group 6 — Solution-Specific & Industry-Specific Funnel",
  },
  "investor-club-syndicate": {
    name: "Investor Club & Syndicate Partnership",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "crypto-exchange-otc": {
    name: "Crypto Exchange & OTC Desk Partnerships",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "incubator-accelerator": {
    name: "Incubator & Accelerator Dealflow Access",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "law-firm-co-branded": {
    name: "Law Firm Strategic Co-Branded Funnels",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "strategic-partnerships-referral": {
    name: "Strategic Partnership & Referral Alliances",
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
  },
  "global-mobility-residency": {
    name: "Global Mobility & Residency Co-Marketing",
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
  },
  "website-seo-newsletter": {
    name: "Website SEO & Newsletter Inbound Model",
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
  },
  "high-intent-google": {
    name: "High-Intent Google Capture Model",
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
  },
  "jurisdiction-intel-report": {
    name: "Jurisdiction Intelligence Report (Gated) Model",
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
  },
  "compliance-lead-magnets": {
    name: "Compliance-Driven Lead Magnets (AML/ES/CRS)",
    groupName: "Group 3 — Digital Inbound & Search Capture",
  },
  "multi-jurisdiction-comparison": {
    name: "Multi-Jurisdiction Comparison Engines",
    groupName: "Group 3 — Digital Inbound & Search Capture",
  },
  "search-emergency-advisory": {
    name: "Search-Based Emergency Advisory Capture",
    groupName: "Group 3 — Digital Inbound & Search Capture",
  },
  "regulatory-update-alerts": {
    name: "Regulatory Update Alerts Funnel",
    groupName: "Group 3 — Digital Inbound & Search Capture",
  },
  "precision-linkedin-dealflow": {
    name: "Precision LinkedIn Dealflow Funnels",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "whatsapp-vip-nurture": {
    name: "WhatsApp VIP Lead Nurture Tracks",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "private-slack-telegram": {
    name: "Private Slack/Telegram Communities",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "high-net-worth-email": {
    name: "High-Net-Worth Email Drip Architecture",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "precision-retargeting": {
    name: "Precision Retargeting of High-Intent Segments",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "multi-touch-nurture": {
    name: "Multi-Touch Nurture Automation",
    groupName: "Group 4 — Social Outreach, Community & Nurture",
  },
  "referral-introducer-networks": {
    name: "Referral & Introducer Partner Network",
    groupName: "Group 5 — Partnership, Alliance & Ecosystem",
  },
  "family-office-acquisition": {
    name: "Family Office Acquisition Network",
    groupName: "Group 5 — Partnership, Alliance & Ecosystem",
  },
  "boutique-vc-angel": {
    name: "Boutique VC & Angel Syndicate Cross-Promotion",
    groupName: "Group 1 — Direct Origination & Partnership Channels",
  }
};

const modelButtons: { [key: string]: Array<{ id: string; label: string }> } = {
  "ai-driven-abm": [
    { id: "what-is-it", label: "What is it" },
    { id: "playbook", label: "Playbook" },
    { id: "messaging-scripts", label: "Messaging scripts" },
  ],
  "founder-led-origination": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "linkedin-executive-outreach": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "thought-leadership-media": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "offshore-masterclass": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "thought-leadership-media": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "commission-based-representative": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "family-office-uhnw": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "private-banker-wealth-manager": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "fund-manager-pipeline": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "cross-border-ma-feeder": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "investor-club-syndicate": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "crypto-exchange-otc": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "incubator-accelerator": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "law-firm-co-branded": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "strategic-partnerships-referral": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "private-webinars": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "cfo-gc-roundtable": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "global-mobility-residency": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "website-seo-newsletter": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "high-intent-google": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "jurisdiction-intel-report": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "compliance-lead-magnets": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "multi-jurisdiction-comparison": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "search-emergency-advisory": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "regulatory-update-alerts": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "precision-linkedin-dealflow": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "whatsapp-vip-nurture": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "private-slack-telegram": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "high-net-worth-email": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "precision-retargeting": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "multi-touch-nurture": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "referral-introducer-networks": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "family-office-acquisition": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
  "boutique-vc-angel": [
    { id: "what-is-it", label: "What is it" },
    { id: "execution-playbook", label: "Execution Playbook" },
  ],
};

export default function ModelDetailPage() {
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
    "youtube-expertise-positioning": "youtube-expertise",
    "youtube-expertise-model": "youtube-expertise",
    "youtube-expert": "youtube-expertise",
    "private-webinar": "private-webinars",
    "private-webinars": "private-webinars",
    "closed-door-briefings": "private-webinars",
    "executive-briefings": "private-webinars",
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
    (rawModelId?.includes("webinar") ? "private-webinars" : undefined) ??
    (rawModelId?.includes("brief") ? "private-webinars" : undefined) ??
    (rawModelId?.includes("mobility") ? "global-mobility-residency" : undefined) ??
    (rawModelId?.includes("residency") ? "global-mobility-residency" : undefined) ??
    (rawModelId?.includes("seo") ? "website-seo-newsletter" : undefined) ??
    (rawModelId?.includes("newsletter") ? "website-seo-newsletter" : undefined) ??
    (rawModelId?.includes("google") ? "high-intent-google" : undefined) ??
    (rawModelId?.includes("intent") ? "high-intent-google" : undefined) ??
  (rawModelId?.includes("roundtable") ? "cfo-gc-roundtable" : undefined) ??
  (rawModelId?.includes("cfo") ? "cfo-gc-roundtable" : undefined) ??
  (rawModelId?.includes("gc") ? "cfo-gc-roundtable" : undefined) ??
    rawModelId ??
    "founder-led-origination";

  // Ensure auth context persists across nested navigations and new tabs
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
  
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const resolvedButtons =
    modelButtons[modelId] ?? [
      { id: "what-is-it", label: "What is it" },
      { id: "execution-playbook", label: "Execution Playbook" },
    ];
  
  function formatNameFromId(id: string) {
    return id
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  const groupNameFallback = groupId
    ? formatNameFromId(groupId.replace("group", "").trim()) || "Model"
    : "Model";

  const modelData =
    modelDetails[modelId] ?? { name: formatNameFromId(modelId), groupName: groupNameFallback };

  if (!modelData) {
    return (
      <ProtectedRoute>
        <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
          <CircularBackground />
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Model not found</h1>
            <button
              onClick={() => router.push(`/client-acquisition/models/${groupId}`)}
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/80 backdrop-blur-md z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <button
              onClick={() => router.push(`/client-acquisition/models/${groupId}`)}
              className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-2"
            >
              ← Back
            </button>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              {modelData.name}
            </h1>
            <div className="w-12 sm:w-20" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-20 sm:pt-24 pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white"
                style={{ fontFamily: 'var(--font-benzin)' }}
              >
                {modelData.name}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                {modelData.groupName}
              </p>
            </motion.div>

            {/* Model Buttons */}
            <div className={`grid grid-cols-1 ${resolvedButtons.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 sm:gap-8`}>
              {resolvedButtons.map((button, index) => (
                <motion.button
                  key={button.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md p-8 sm:p-10 text-center hover:border-white/40 transition-all duration-300 min-h-[200px] flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (button.id === "what-is-it" || button.id === "execution-playbook") {
                      router.push(`/client-acquisition/models/${groupId}/${modelId}/${button.id}`);
                      return;
                    }
                    setSelectedButton(selectedButton === button.id ? null : button.id);
                  }}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      {button.label}
                    </h3>
                    
                    {/* Arrow indicator */}
                    <div className="flex items-center justify-center gap-2 text-white/60 group-hover:text-white/80 transition-colors mt-4">
                      <span className="text-sm">View</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                </motion.button>
              ))}
            </div>

            {/* Content Display Area */}
            <AnimatePresence>
              {selectedButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md"
                >
                  {selectedButton === "what-is-it" && modelId === "ai-driven-abm" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        AI-Driven ABM (Account-Based Marketing) Enhancements leverage artificial intelligence and machine learning to optimize account-based marketing strategies. This model uses AI to identify high-value target accounts, personalize messaging at scale, predict buying signals, and automate engagement workflows for maximum efficiency and conversion rates.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/abm-plan`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Full ABM Strategic Framework</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "founder-led-origination" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Founder-Led Origination Model is a high-trust, relationship-driven acquisition system where all meaningful client engagements are originated, qualified, and guided directly by the founders. This model positions Boyar Partners as a founder-led, boutique advisory firm where clients receive senior-level attention from the first conversation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "linkedin-executive-outreach" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The LinkedIn Executive Outreach Model is a structured, high-precision acquisition channel where founders use LinkedIn to build relationships with senior decision-makers. This model is not lead generation — it is executive network expansion for high-ticket advisory mandates.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "thought-leadership-media" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Thought Leadership & Media Authority Model positions Boyar Partners as a visible, credible advisory through jurisdiction briefings, regulatory explainers, banking intelligence, structuring frameworks, short expert videos, media features, and professional articles—building trust and authority before first contact.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "founder-led-origination" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                  {selectedButton === "what-is-it" && modelId === "youtube-expertise" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The YouTube Expertise Positioning Model uses concise, educational videos—jurisdiction explainers, regulatory breakdowns, tokenization frameworks, banking pathways, licensing deep-dives, founder-led insights—to prove Boyar’s authority to UHNWIs, founders, funds, Web3 teams, family offices, and professional intermediaries.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "youtube-expertise" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational blueprint for YouTube Expertise Positioning: tools, video architecture, formats, production workflow, distribution, governance, KPIs, and the authority-building success formula.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Comprehensive execution playbook covering network mapping, relationship intelligence, founder positioning, compliance frameworks, and operational guidelines for founder-led origination.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "commission-based-representative" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Commission-Based Representative Channel is a controlled, performance-driven acquisition model where Boyar Partners engages external advisors who refer qualified clients in exchange for commission. Representatives identify opportunities, warm up interest, and introduce prospects while founders handle all advisory engagement.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "linkedin-executive-outreach" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                  {selectedButton === "what-is-it" && modelId === "offshore-masterclass" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Offshore Masterclass Series is a structured acquisition channel delivering high-level educational sessions, jurisdiction briefings, compliance workshops, banking intelligence, licensing explainers, and tokenization/fund structuring masterclasses. Offered live, recorded, co-hosted, or privately, it positions Boyar as the premier authority before any sales conversation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "offshore-masterclass" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Full operational blueprint for the Offshore Masterclass Series: tools, production framework, outreach, hosting standards, follow-up, governance, KPIs, and the conversion sequence from education to mandates.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Comprehensive execution playbook covering tools, workflows, scripts, governance, and KPI system for LinkedIn Executive Outreach implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "thought-leadership-media" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Full operational blueprint for Thought Leadership & Media Authority: tools stack, monthly content architecture, weekly operating rhythm, distribution channels, governance standards, KPIs, and the trust-building success formula.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "family-office-uhnw" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Family Office & UHNW Network Model is a specialized, relationship-driven acquisition channel where Boyar Partners builds direct access to family offices and ultra-high-net-worth individuals through private introductions, reputation transfer, and long-term trust-building.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "commission-based-representative" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Comprehensive execution playbook covering commission system, tools, workflows, agreements, and procedures for Commission-Based Representative Channel implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "private-banker-wealth-manager" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Private Banker & Wealth Manager Alliances Model is a specialized, relationship-driven acquisition channel where Boyar Partners builds direct access to family offices and ultra-high-net-worth individuals through private banker and wealth manager networks.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "family-office-uhnw" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering network identification, engagement workflows, governance rules, and KPI system for Family Office & UHNW Network Channel implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "fund-manager-pipeline" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Fund Manager Pipeline Program is a structured acquisition channel where Boyar Partners identifies, nurtures, and converts emerging fund managers through full-cycle advisory services including jurisdiction selection, entity architecture, regulatory pathways, banking alignment, and administration frameworks.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "private-banker-wealth-manager" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering network identification, engagement workflows, governance rules, and KPI system for Private Banker & Wealth Manager Alliances implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "cross-border-ma-feeder" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Cross-Border M&A Feeder Channel is a specialist acquisition program where Boyar Partners positions itself as the structuring and regulatory arm for M&A advisors, investment banks, and deal-originators, creating a dealflow ecosystem that feeds multi-stage mandates from M&A transactions.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "fund-manager-pipeline" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering 4-layer pipeline structure, outreach playbook, governance protocols, and KPI system for Fund Manager Pipeline Programs implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "investor-club-syndicate" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Investor Club & Syndicate Partnership Model is a structured acquisition channel where Boyar Partners forms alliances with angel syndicates, investor clubs, and venture collectives, positioning itself as the preferred structuring and compliance advisor for their portfolio companies and syndicate members.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "cross-border-ma-feeder" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering alliance development framework, M&A transaction workflow, governance rules, and KPI system for Cross-Border M&A Feeder Channel implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "crypto-exchange-otc" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Crypto Exchange & OTC Desk Partnership Model is a strategic acquisition channel where Boyar Partners partners with crypto exchanges, OTC desks, and market makers, creating a continuous feeder model for structuring, licensing, and compliance services.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "investor-club-syndicate" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering alliance development framework, syndicate dealflow workflow, governance rules, and KPI system for Investor Club & Syndicate Partnership implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "incubator-accelerator" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Incubator & Accelerator Dealflow Access Model is a structured acquisition channel where Boyar Partners partners with startup incubators, accelerators, and innovation hubs, gaining early access to founders and creating repeat-volume feeders with predictable dealflow.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "crypto-exchange-otc" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering partnership development framework, exchange dealflow workflow, governance protocols, and KPI system for Crypto Exchange & OTC Desk Partnerships implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "law-firm-co-branded" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Law Firm Strategic Co-Branded Funnel Model is a partnership-driven acquisition channel where Boyar Partners collaborates with law firms to create co-branded advisory funnels, joint content, and referral exchanges, built on credibility, compliance, and reputation transfer.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "incubator-accelerator" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering partnership development framework, cohort engagement workflow, governance rules, and KPI system for Incubator & Accelerator Dealflow Access implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "what-is-it" && modelId === "strategic-partnerships-referral" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        What is it
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        The Strategic Partnership & Referral Alliance Model is a relationship-based acquisition channel where Boyar Partners forms long-term professional alliances with individuals and institutions whose clients frequently require offshore structuring, licensing, and compliance services.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/what-is-it`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Model Definition</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "law-firm-co-branded" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering partner development framework, co-branded funnel architecture, workflow, governance protocols, and KPI system for Law Firm Strategic Co-Branded Funnels implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "execution-playbook" && modelId === "strategic-partnerships-referral" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Execution Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Complete operational manual covering partnership activation framework, governance rules, and KPI system for Strategic Partnership & Referral Alliances implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/execution-playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "playbook" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Playbook
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Comprehensive execution playbook covering foundational setup, daily/weekly/monthly operations, personalization rules, risk controls, tool stack, and success metrics for AI-driven ABM implementation.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/playbook`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete ABM Execution Playbook</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                  
                  {selectedButton === "messaging-scripts" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                        Messaging Scripts
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Comprehensive messaging templates organized by target segment, including LinkedIn introductions, follow-up sequences, email scripts, and contextual triggers for precision outreach.
                      </p>
                      <motion.button
                        onClick={() => router.push(`/client-acquisition/models/${groupId}/${modelId}/messaging-scripts`)}
                        className="mt-4 px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Complete Messaging Scripts</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

