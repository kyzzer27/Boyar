"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AcquisitionChannel {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

const acquisitionChannels: AcquisitionChannel[] = [
  {
    id: "group-1",
    name: "Group 1 — Founder-Led & Relationship Acquisition",
    description: "Personal networks, founder-led introductions, high-touch relationship building, and direct connections leveraging executive presence and industry relationships.",
    icon: "",
    color: "from-blue-500/20 to-blue-600/10",
    metrics: [
      { label: "Active Relationships", value: "250+" },
      { label: "Conversion Rate", value: "35%" },
      { label: "Avg. Deal Size", value: "$85K" }
    ]
  },
  {
    id: "group-2",
    name: "Group 2 — Authority, Thought Leadership & Brand Positioning",
    description: "Industry publications, speaking engagements, expert content, white papers, research reports, and positioning as a trusted advisor in the market.",
    icon: "",
    color: "from-purple-500/20 to-purple-600/10",
    metrics: [
      { label: "Publications/Month", value: "8" },
      { label: "Speaking Engagements", value: "12/yr" },
      { label: "Brand Awareness", value: "+65%" }
    ]
  },
  {
    id: "group-3",
    name: "Group 3 — Digital Inbound & Search Capture",
    description: "SEO optimization, Google Ads, content marketing, landing pages, and capturing high-intent searches from prospects actively seeking solutions.",
    icon: "",
    color: "from-green-500/20 to-green-600/10",
    metrics: [
      { label: "Monthly Traffic", value: "15K+" },
      { label: "Organic Keywords", value: "2,100" },
      { label: "Lead Generation", value: "180/mo" }
    ]
  },
  {
    id: "group-4",
    name: "Group 4 — Social Outreach, Community & Nurture",
    description: "LinkedIn engagement, social media presence, community building, email nurturing sequences, and long-term relationship development.",
    icon: "",
    color: "from-pink-500/20 to-pink-600/10",
    metrics: [
      { label: "Social Followers", value: "18.5K" },
      { label: "Engagement Rate", value: "5.8%" },
      { label: "Nurture Pipeline", value: "320" }
    ]
  },
  {
    id: "group-5",
    name: "Group 5 — Partnership, Alliance & Ecosystem",
    description: "Strategic partnerships with law firms, accounting firms, consultants, and complementary service providers for mutual referrals and co-marketing.",
    icon: "",
    color: "from-orange-500/20 to-orange-600/10",
    metrics: [
      { label: "Active Partners", value: "45" },
      { label: "Monthly Referrals", value: "28" },
      { label: "Partnership Revenue", value: "$125K" }
    ]
  },
  {
    id: "group-6",
    name: "Group 6 — Solution-Specific & Industry-Specific Funnel",
    description: "Targeted campaigns for specific services (company formation, compliance, etc.) and industry verticals (crypto, fintech, real estate) with tailored messaging.",
    icon: "",
    color: "from-red-500/20 to-red-600/10",
    metrics: [
      { label: "Active Campaigns", value: "15" },
      { label: "Industry Verticals", value: "8" },
      { label: "Conversion Rate", value: "22%" }
    ]
  },
  {
    id: "group-7",
    name: "Group 7 — Automation, Retargeting & AI-Driven Optimization",
    description: "Automated retargeting campaigns, AI-powered lead scoring, programmatic advertising, and data-driven optimization of acquisition channels.",
    icon: "",
    color: "from-cyan-500/20 to-cyan-600/10",
    metrics: [
      { label: "Automation Rate", value: "75%" },
      { label: "ROAS Improvement", value: "+42%" },
      { label: "Cost Efficiency", value: "-28%" }
    ]
  }
];

export default function AcquisitionChannelsPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/80 backdrop-blur-md z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <button
              onClick={() => router.push("/tools")}
              className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-2"
            >
              ← Back
            </button>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Acquisition Channels
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
                style={{ fontFamily: 'var(--font-benzin)' }}
              >
                Acquisition Channels
              </h2>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                Explore our diverse range of client acquisition strategies and channels driving business growth
              </p>
            </motion.div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {acquisitionChannels.map((channel, index) => (
                <motion.button
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md overflow-hidden hover:border-white/40 transition-all duration-300 text-left w-full cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/client-acquisition/models/${channel.id}`)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative p-6 sm:p-8">
                    {/* Title */}
                    <div className="mb-4">
                      <h3
                        className="text-xl sm:text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: 'var(--font-benzin)' }}
                      >
                        {channel.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                      {channel.description}
                    </p>

                    {/* Metrics */}
                    {channel.metrics && (
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {channel.metrics.map((metric, metricIndex) => (
                          <div
                            key={metricIndex}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-400 text-xs sm:text-sm">
                              {metric.label}
                            </span>
                            <span
                              className="text-white font-semibold text-sm sm:text-base"
                              style={{ fontFamily: 'var(--font-benzin)' }}
                            >
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Click Indicator */}
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors mt-4">
                      <span className="text-sm">View Models</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md"
            >
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center"
                style={{ fontFamily: 'var(--font-benzin)' }}
              >
                Channel Performance Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                    7
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">Acquisition Groups</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                    $45K+
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">Monthly Investment</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                    150+
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">Monthly Leads</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

