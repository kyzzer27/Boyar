"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

interface Model {
  id: string;
  name: string;
}

const groupModels: { [key: string]: { groupName: string; models: Model[] } } = {
  "group-1": {
    groupName: "Group 1 — Founder-Led & Relationship Acquisition",
    models: [
      { id: "founder-led-origination", name: "Founder-Led Origination" },
      { id: "linkedin-executive-outreach", name: "LinkedIn Executive Outreach" },
      { id: "commission-based-representative", name: "Commission-Based Representative Channel" },
      { id: "family-office-uhnw", name: "Family Office & UHNW Network" },
      { id: "private-banker-wealth-manager", name: "Private Banker & Wealth Manager Alliances" },
      { id: "fund-manager-pipeline", name: "Fund Manager Pipeline Programs" },
      { id: "cross-border-ma-feeder", name: "Cross-Border M&A Feeder Channels" },
      { id: "investor-club-syndicate", name: "Investor Club Syndicate Partnerships" },
      { id: "crypto-exchange-otc", name: "Crypto Exchange / OTC Desk Partnerships" },
      { id: "incubator-accelerator", name: "Incubator & Accelerator Dealflow Access" },
      { id: "law-firm-co-branded", name: "Law Firm Strategic Co-Branded Funnels" },
      { id: "strategic-partnerships-referral", name: "Strategic Partnerships & Referral Alliances" },
    ]
  },
  "group-2": {
    groupName: "Group 2 — Authority, Thought Leadership & Brand Positioning",
    models: [
      { id: "thought-leadership-media", name: "Thought Leadership & Media Authority" },
      { id: "offshore-masterclass", name: "Offshore Masterclass Series" },
      { id: "reputation-borrowing", name: "Reputation Borrowing via Guest Appearances" },
      { id: "youtube-expertise", name: "YouTube Expertise Positioning" },
      { id: "private-webinars", name: "Private Webinars / Closed-Door Briefings" },
      { id: "cfo-gc-roundtable", name: "CFO / GC Executive Roundtable Acquisition Model" },
      { id: "website-seo-newsletter", name: "Website SEO & Newsletter Inbound Model" },
      { id: "high-intent-google", name: "High-Intent Google Capture Model" },
      { id: "jurisdiction-intel-report", name: "Jurisdiction Intelligence Report (Gated) Model" },
      { id: "global-mobility-residency", name: "Global Mobility & Residency Co-Marketing" },
    ]
  },
  "group-3": {
    groupName: "Group 3 — Digital Inbound & Search Capture",
    models: [
      { id: "website-seo-newsletter", name: "Website, SEO & Newsletter Inbound" },
      { id: "high-intent-google", name: "High-Intent Google Capture Model" },
      { id: "search-emergency-advisory", name: "Search-Based Emergency Advisory Capture" },
      { id: "jurisdiction-intel-report", name: "Jurisdiction Intelligence Report (Gated) Model" },
      { id: "compliance-lead-magnets", name: "Compliance-Driven Lead Magnets (AML/ES/CRS)" },
      { id: "multi-jurisdiction-comparison", name: "Multi-Jurisdiction Comparison Engines" },
      { id: "regulatory-update-alerts", name: "Regulatory Update Alerts Funnel" },
    ]
  },
  "group-4": {
    groupName: "Group 4 — Social Outreach, Community & Nurture",
    models: [
      { id: "precision-linkedin-dealflow", name: "Precision LinkedIn Dealflow Funnels" },
      { id: "whatsapp-vip-nurture", name: "WhatsApp VIP Lead Nurture Tracks" },
      { id: "private-slack-telegram", name: "Private Slack/Telegram Communities" },
      { id: "high-net-worth-email", name: "High-Net-Worth Email Drip Architecture" },
      { id: "precision-retargeting", name: "Precision Retargeting of High-Intent Segments" },
      { id: "multi-touch-nurture", name: "Multi-Touch Nurture Automation" },
    ]
  },
  "group-5": {
    groupName: "Group 5 — Partnership, Alliance & Ecosystem",
    models: [
      { id: "referral-introducer-networks", name: "Referral & Introducer Partner Networks" },
      { id: "family-office-acquisition", name: "Family Office Acquisition Network" },
      { id: "private-banker-wealth-alliances", name: "Private Banker & Wealth Manager Alliances" },
      { id: "fund-manager-pipeline-programs", name: "Fund Manager Pipeline Programs" },
      { id: "investor-club-syndicate-partnerships", name: "Investor Club Syndicate Partnerships" },
      { id: "crypto-exchange-otc-partnerships", name: "Crypto Exchange / OTC Desk Partnerships" },
      { id: "incubator-accelerator-dealflow", name: "Incubator & Accelerator Dealflow Access" },
      { id: "boutique-vc-angel", name: "Boutique VC & Angel Syndicate Cross-Promotion" },
      { id: "law-firm-strategic-co-branded", name: "Law Firm Strategic Co-Branded Funnels" },
      { id: "strategic-partnerships-alliances", name: "Strategic Partnerships & Referral Alliances" },
    ]
  },
  "group-6": {
    groupName: "Group 6 — Solution-Specific & Industry-Specific Funnel",
    models: [
      { id: "cross-border-ma-feeder", name: "Cross-Border M&A Feeder Channels" },
      { id: "licensing-accelerator", name: "Licensing Accelerator Funnels" },
      { id: "tokenization-dealflow", name: "Tokenization Dealflow Syndicates" },
      { id: "geo-targeted-expansion", name: "Geo-Targeted Corporate Expansion Funnels" },
      { id: "cfo-gc-roundtable-model", name: "CFO / GC Executive Roundtable Acquisition Model" },
      { id: "global-mobility-residency-co-marketing", name: "Global Mobility & Residency Co-Marketing" },
      { id: "enterprise-licensing-expansion", name: "Enterprise Licensing Expansion Funnels" },
      { id: "fintech-api-ecosystem", name: "FinTech API Ecosystem Funnels" },
      { id: "compliance-as-a-service", name: "Compliance-as-a-Service Onboarding Funnels" },
      { id: "tokenization-structuring-hybrid", name: "Tokenization + Structuring Hybrid Funnels" },
    ]
  },
  "group-7": {
    groupName: "Group 7 — Automation, Retargeting & AI-Driven Optimization",
    models: [
      { id: "ai-prospect-scoring", name: "AI-Based Prospect Scoring & Personalization" },
      { id: "precision-retargeting-segments", name: "Precision Retargeting of High-Intent Segments" },
      { id: "multi-touch-nurture-automation", name: "Multi-Touch Nurture Automation" },
      { id: "ai-driven-abm", name: "AI-Driven ABM Enhancements" },
      { id: "predictive-competitor-monitoring", name: "Predictive Competitor Monitoring" },
      { id: "algorithmic-linkedin-content", name: "Algorithmic LinkedIn Content Distribution" },
    ]
  }
};

export default function ModelsPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const groupData = groupModels[groupId];

  // Group 1 models with their display names
  const group1Models = groupId === "group-1" ? [
    { id: "founder-led-origination", name: "Founder-Led Origination" },
    { id: "linkedin-executive-outreach", name: "LinkedIn Executive Outreach" },
    { id: "commission-based-representative", name: "Commission-Based Representative Channel" },
    { id: "family-office-uhnw", name: "Family Office & UHNW Network" },
    { id: "private-banker-wealth-manager", name: "Private Banker & Wealth Manager Alliances" },
    { id: "fund-manager-pipeline", name: "Fund Manager Pipeline Programs" },
    { id: "cross-border-ma-feeder", name: "Cross-Border M&A Feeder Channels" },
    { id: "investor-club-syndicate", name: "Investor Club Syndicate Partnerships" },
    { id: "crypto-exchange-otc", name: "Crypto Exchange / OTC Desk Partnerships" },
    { id: "incubator-accelerator", name: "Incubator & Accelerator Dealflow Access" },
    { id: "law-firm-co-branded", name: "Law Firm Strategic Co-Branded Funnels" },
    { id: "strategic-partnerships-referral", name: "Strategic Partnerships & Referral Alliances" },
  ] : [];

  const openStaticPdf = (modelId: string, type: "what-is-it" | "execution-playbook") => {
    const url = `/api/pdf?groupId=${groupId}&modelId=${modelId}&type=${type}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!groupData) {
    return (
      <ProtectedRoute>
        <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
          <CircularBackground />
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Group not found</h1>
            <button
              onClick={() => router.push("/client-acquisition/acquisition-channels")}
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
              onClick={() => router.push("/client-acquisition/acquisition-channels")}
              className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-2"
            >
              ← Back
            </button>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Models
            </h1>
            <div className="w-12 sm:w-20" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-20 sm:pt-24 pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                {groupData.groupName}
              </h2>
              {/* Download PDF Button for Group 1 */}
              {groupId === "group-1" && (
                <motion.button
                  onClick={() => setShowDownloadModal(true)}
                  className="mt-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg text-white transition-all duration-300 flex items-center gap-1.5 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </motion.button>
              )}
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mt-4">
                Select a model to view detailed information and implementation strategies
              </p>
            </motion.div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {groupData.models.map((model, index) => (
                <motion.button
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative rounded-xl border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md p-6 sm:p-8 text-left hover:border-white/40 transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // All models open their detail page; defaults will show “What is it” and “Execution Playbook”
                    router.push(`/client-acquisition/models/${groupId}/${model.id}`);
                  }}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  {/* Content */}
                  <div className="relative">
                    <h3
                      className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      {model.name}
                    </h3>
                    
                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors mt-4">
                      <span className="text-sm">View Details</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                {groupData.models.length}
              </div>
              <div className="text-gray-300 text-sm sm:text-base">Available Models</div>
            </motion.div>
          </div>
        </main>

        {/* Download PDF Modal */}
        <AnimatePresence>
          {showDownloadModal && groupId === "group-1" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDownloadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black border border-white/20 rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-benzin)' }}
                  >
                    Download PDFs
                  </h3>
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="text-white/60 hover:text-white transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {group1Models.map((model) => (
                    <div
                      key={model.id}
                      className="border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <h4 className="text-white font-semibold text-sm sm:text-base flex-1 min-w-[200px]">
                          {model.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => openStaticPdf(model.id, "what-is-it")}
                            className="px-3 py-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 hover:border-blue-500/60 rounded-lg text-white transition-all duration-300 flex items-center gap-1.5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>PDF 1</span>
                          </motion.button>
                          <motion.button
                            onClick={() => openStaticPdf(model.id, "execution-playbook")}
                            className="px-3 py-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 hover:border-green-500/60 rounded-lg text-white transition-all duration-300 flex items-center gap-1.5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>PDF 2</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}

