"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/components/layout/app-shell";
import { ClientOnboardingModal } from "@/components/client-acquisition/client-onboarding-modal";

interface Tab {
  id: string;
  label: string;
  icon: string;
  value: string;
  content: {
    title: string;
    description: string;
    details: string[];
  };
}

const revenueSegments = [
  "Corporate Services",
  "Banking",
  "Fund admin",
  "Licensing",
];

const clientAcquisitionOptions = [
  "Acquisition channels",
  "Conversion metrics",
  "Client onboarding",
];


const tabs: Tab[] = [
  {
    id: "pitch",
    label: "Pitch",
    icon: "",
    value: "$2.5M",
    content: {
      title: "Pitch",
      description: "Investment pitch and market overview",
      details: [
        "Market analysis",
        "Business highlights",
        "Mission statement",
        "Key metrics"
      ]
    }
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: "",
    value: "$8.2M",
    content: {
      title: "Pricing",
      description: "Detailed pricing breakdown and tiers",
      details: [
        "Base packages",
        "Premium options",
        "Feature comparison",
        "Revenue projections"
      ]
    }
  },
  {
    id: "cac",
    label: "CAC Module",
    icon: "",
    value: "$12.4M",
    content: {
      title: "CAC Module",
      description: "Customer Acquisition Cost analysis",
      details: [
        "CAC by service",
        "Regional breakdown",
        "LTV:CAC ratios",
        "Trend analysis"
      ]
    }
  },
  {
    id: "revenue",
    label: "Revenue Projection",
    icon: "",
    value: "$5.9M",
    content: {
      title: "Revenue Projection",
      description: "Financial forecasts and projections",
      details: [
        "Revenue forecasts",
        "Growth projections",
        "Market trends",
        "Financial modeling"
      ]
    }
  },
  {
    id: "client-acquisition",
    label: "Client Acquisition",
    icon: "",
    value: "$4.1M",
    content: {
      title: "Client Acquisition",
      description: "Client acquisition strategies and analytics",
      details: [
        "Acquisition channels",
        "Conversion metrics",
        "Client onboarding",
      ],
    },
  },
  {
    id: "documents",
    label: "Company Documents",
    icon: "",
    value: "$3.2M",
    content: {
      title: "Company Documents",
      description: "Corporate documentation and files",
      details: [
        "Legal documents",
        "Corporate filings",
        "Compliance reports",
        "Archive management"
      ]
    }
  },
  {
    id: "vision",
    label: "Vision",
    icon: "",
    value: "$9.1M",
    content: {
      title: "Vision",
      description: "Company vision and strategic direction",
      details: [
        "Strategic vision",
        "Long-term goals",
        "Mission alignment",
        "Future roadmap"
      ]
    }
  },
  {
    id: "trajectory",
    label: "Trajectory",
    icon: "",
    value: "$0M",
    content: {
      title: "Trajectory",
      description: "Strategic trajectory and institutional scaling roadmap",
      details: [
        "Growth trajectory assumptions",
        "Client acquisition compounding",
        "Service-line expansion path",
        "Governance & risk evolution"
      ]
    }
  },
  {
    id: "expenditure",
    label: "Expenditure",
    icon: "",
    value: "$0M",
    content: {
      title: "Expenditure",
      description: "Expenditure tracking and analysis",
      details: [
        "Expense tracking",
        "Budget analysis",
        "Cost breakdown",
        "Financial reports"
      ]
    }
  },
  {
    id: "services-direct",
    label: "Services",
    icon: "",
    value: "$0M",
    content: {
      title: "Services",
      description: "",
      details: []
    }
  }
];

interface CircularTabsProps {
  role: UserRole;
  initialActiveTab?: string | null;
  initialRevenueSegment?: string | null;
}

function CacNavButton({ label, onClick, index }: { label: string; onClick: () => void; index: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        const r = width / 2 - 2;
        setRadius(r);
        setCircumference(2 * Math.PI * r);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className="group relative w-32 sm:w-36 aspect-square rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-colors duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-md"
      style={{
        boxShadow: isHovered
          ? "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.15)"
          : "0 0 12px rgba(59, 130, 246, 0.10), 0 0 30px rgba(59, 130, 246, 0.05)",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {circumference > 0 && radius > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "rotate(-90deg)", zIndex: 5 }}
          viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.circle
            cx={(radius * 2 + 4) / 2}
            cy={(radius * 2 + 4) / 2}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isHovered ? 0 : circumference}
            initial={false}
            animate={{ strokeDashoffset: isHovered ? 0 : circumference }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-3 leading-snug text-[10px] sm:text-xs md:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
          {label}
        </span>
        <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
      </div>
    </motion.button>
  );
}

function AcquisitionButton({ option, index, router, setShowOnboardingModal, setActiveTab }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Small timeout ensures the DOM has settled its flexible grid dimensions before measuring width
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        const r = width / 2 - 2;
        setRadius(r);
        setCircumference(2 * Math.PI * r);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      key={option}
      className="group relative w-full aspect-square rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 flex flex-col items-center justify-center transition-colors duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 overflow-hidden"
      style={{
        fontFamily: 'var(--font-benzin)',
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (option === "Acquisition channels") {
          setActiveTab(null);
          router.push("/tools/realfood-iframe");
        } else if (option === "Conversion metrics") {
          setActiveTab(null);
          router.push("/client-acquisition/conversion-metrics");
        } else if (option === "Client onboarding") {
          setShowOnboardingModal(true);
        } else {
          console.log(`Selected Client Acquisition option: ${option}`);
        }
      }}
    >
      {/* Full circular border with wipe animation - Matches Pricing exactly */}
      {circumference > 0 && radius > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ transform: 'rotate(-90deg)', zIndex: 5 }}
          viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.circle
            cx={(radius * 2 + 4) / 2}
            cy={(radius * 2 + 4) / 2}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isHovered ? 0 : circumference}
            initial={false}
            animate={{
              strokeDashoffset: isHovered ? 0 : circumference
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </svg>
      )}

      {/* Button Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-2 text-center text-xs sm:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300 break-words w-full">
          {option}
        </span>
        <div className="mt-2 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full"></div>
      </div>

      {/* Background flare glows */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2"></div>
      </div>
    </motion.button>
  );
}

function RevenueSegmentButton({ segment, index, isActive, onClick }: { segment: string; index: number; isActive: boolean; onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        const r = width / 2 - 2;
        setRadius(r);
        setCircumference(2 * Math.PI * r);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={`group relative w-full aspect-square rounded-full border flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-white/40 bg-gradient-to-br from-white/20 to-white/10"
          : "border-white/10 bg-gradient-to-br from-white/8 to-white/3 hover:border-white/20 hover:from-white/12 hover:to-white/8"
      }`}
      style={{ fontFamily: "var(--font-benzin)", willChange: "transform, opacity" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ opacity: { delay: index * 0.1 }, scale: { delay: index * 0.1 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {circumference > 0 && radius > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "rotate(-90deg)", zIndex: 5 }}
          viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.circle
            cx={(radius * 2 + 4) / 2}
            cy={(radius * 2 + 4) / 2}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isHovered ? 0 : circumference}
            initial={false}
            animate={{ strokeDashoffset: isHovered ? 0 : circumference }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-2 text-center text-xs sm:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300 break-words w-full">
          {segment}
        </span>
        <div className="mt-2 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
      </div>
    </motion.button>
  );
}

export function CircularTabs({
  role,
  initialActiveTab = null,
  initialRevenueSegment = null,
}: CircularTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(initialActiveTab);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [restrictionNotice, setRestrictionNotice] = useState<string | null>(null);
  const [activeRevenueSegment, setActiveRevenueSegment] = useState<string | null>(initialRevenueSegment);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const [dimensions, setDimensions] = useState({ width: 620, height: 620 });

  useEffect(() => {
    // Calculate responsive dimensions
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;
      const size = isMobile ? 370 : isTablet ? 480 : 620;
      setDimensions({ width: size, height: size });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const isMobile = dimensions.width < 400;
  const radius = dimensions.width * (isMobile ? 0.37 : 0.40);

  // Rotation is now handled purely by CSS animation on a wrapper
  // (see `.dashboard-orbit` in globals.css). This avoids per-frame
  // React re-renders and is fully GPU-composited.

  const getTabPosition = (index: number, offset: number = 0) => {
    const angle = ((index * 2 * Math.PI) / tabs.length - Math.PI / 2) + (offset * Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, angle };
  };


  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const isCacTab = activeTabData?.id === "cac";
  const isRevenueTab = activeTabData?.id === "revenue";
  const isClientAcquisitionTab = activeTabData?.id === "client-acquisition";


  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const centerCircleSize = isMobile ? 110 : 160;
  const tabCircleSize = isMobile ? 65 : 95;

  useEffect(() => {
    if (!restrictionNotice) return;
    const timeout = setTimeout(() => setRestrictionNotice(null), 3500);
    return () => clearTimeout(timeout);
  }, [restrictionNotice]);

  useEffect(() => {
    if (!isRevenueTab) {
      setActiveRevenueSegment(null);
    }
  }, [isRevenueTab]);

  function handleCacAction(action: "marketing" | "true") {
    if (action === "marketing") {
      setActiveTab(null);
      router.push("/cac/marketing");
      return;
    }
    if (action === "true") {
      setActiveTab(null);
      router.push("/cac/true");
      return;
    }
  }

  const isInvestorLite = role === "investor-lite";
  const isAdmin = role === "admin";

  return (
    <div className="relative flex items-center justify-center w-full h-full p-4">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* Central Circle with Counter - Perfectly Centered */}
        <motion.div
          className="absolute rounded-full border-2 border-white/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center z-10"
          style={{ 
            width: centerCircleSize,
            height: centerCircleSize,
            top: `${centerY - centerCircleSize / 2}px`,
            left: `${centerX - centerCircleSize / 2}px`,
          }}
          animate={{
            scale: activeTab ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="text-2xl sm:text-3xl md:text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💰
          </motion.span>
        </motion.div>

        {/* Rotating wrapper for tabs + connecting lines (GPU-only CSS rotation) */}
        <div
          className="dashboard-orbit absolute inset-0 pointer-events-none"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            transformOrigin: "center center",
          }}
        >
        {/* Circular Tabs */}
        {tabs.map((tab, index) => {
          const { x, y } = getTabPosition(index, 0);
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;
          const isRestricted = isInvestorLite && tab.id === "documents";

          return (
            <motion.button
              key={tab.id}
              className={`absolute rounded-full border-2 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-1 text-white z-20 pointer-events-auto ${
                isRestricted ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}
              style={{
                width: tabCircleSize,
                height: tabCircleSize,
                top: `${centerY + y - tabCircleSize / 2}px`,
                left: `${centerX + x - tabCircleSize / 2}px`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isRestricted ? 1 : isActive ? (isMobile ? 1.15 : 1.3) : isHovered ? 1.15 : 1,
                opacity: 1,
                borderColor: isActive 
                  ? "rgba(255, 255, 255, 0.9)" 
                  : isHovered 
                  ? "rgba(255, 255, 255, 0.6)" 
                  : "rgba(255, 255, 255, 0.3)",
                backgroundColor: isActive 
                  ? "rgba(255, 255, 255, 0.2)" 
                  : "rgba(0, 0, 0, 0.7)",
              }}
              whileHover={
                isRestricted
                  ? undefined
                  : {
                      scale: 1.2,
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    }
              }
              whileTap={isRestricted ? undefined : { scale: 0.9 }}
              onHoverStart={() => setHoveredTab(tab.id)}
              onHoverEnd={() => setHoveredTab(null)}
              onClick={() => {
                if (isRestricted) {
                  setRestrictionNotice("Investor Lite tier cannot access Company Documents.");
                  return;
                }
                if (tab.id === "pitch") {
                  router.push("/pitch");
                } else if (tab.id === "expenditure") {
                  router.push("/expenditure");
                } else if (tab.id === "pricing") {
                  router.push("/pricing");
                } else if (tab.id === "trajectory") {
                  router.push("/tools/trajectory");
                } else if (tab.id === "services-direct") {
                  router.push("/tools/services-direct");
                } else if (tab.id === "documents") {
                  router.push("/tools/company-documents");
                } else if (tab.id === "vision") {
                  router.push("/tools/vision");
                } else {
                  if (tab.id === "revenue" && !isActive) {
                    setActiveRevenueSegment(null);
                  }
                  setActiveTab(isActive ? null : tab.id);
                }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="dashboard-orbit-counter text-[8px] sm:text-[10px] md:text-xs font-medium text-center px-1 sm:px-2">{tab.label}</span>
            </motion.button>
          );
        })}

        {/* Connecting Lines - Glowing Green */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 5 }} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <defs>
            <filter id="glow" x="0" y="0" width={dimensions.width} height={dimensions.height} filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {tabs.map((tab, index) => {
            const { x, y } = getTabPosition(index, 0);
            const isHighlighted = hoveredTab === tab.id || activeTab === tab.id;
            // Calculate line start at edge of center circle
            const dist = Math.sqrt(x * x + y * y);
            const edgeOffset = centerCircleSize / 2 + 2;
            const startX = dist > 0 ? centerX + (x / dist) * edgeOffset : centerX;
            const startY = dist > 0 ? centerY + (y / dist) * edgeOffset : centerY;
            // Calculate line end at edge of tab circle
            const tabEdgeOffset = tabCircleSize / 2 + 2;
            const endX = dist > 0 ? centerX + x - (x / dist) * tabEdgeOffset : centerX + x;
            const endY = dist > 0 ? centerY + y - (y / dist) * tabEdgeOffset : centerY + y;
            return (
              <motion.line
                key={tab.id}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#22c55e"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHighlighted ? 0.9 : 0.6,
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>
        </div>
        {/* End dashboard-orbit wrapper */}

      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {activeTab && activeTabData && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/85 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveTab(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-40 p-4 sm:p-6 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="bg-black border-2 border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  contain: "content",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <motion.span
                      className="text-3xl sm:text-4xl md:text-5xl"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                    >
                      {activeTabData.icon}
                    </motion.span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1"
                        style={{ fontFamily: 'var(--font-benzin)' }}
                      >
                        {activeTabData.content.title}
                      </h2>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab(null)}
                    className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>


                {!isCacTab && !isRevenueTab && !isClientAcquisitionTab && (
                  <>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                      {activeTabData.content.description}
                    </p>

                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {activeTabData.content.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <motion.span 
                            className="text-green-400 text-base sm:text-lg"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          >
                            ✓
                          </motion.span>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}


                {isRevenueTab && (
                  <motion.div
                    className="mt-10 grid grid-cols-2 gap-6 sm:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {revenueSegments.map((segment, index) => (
                      <RevenueSegmentButton
                        key={segment}
                        segment={segment}
                        index={index}
                        isActive={activeRevenueSegment === segment}
                        onClick={() => {
                          const isActive = activeRevenueSegment === segment;
                          if (segment === "Corporate Services") {
                            setActiveRevenueSegment(null);
                            setActiveTab(null);
                            router.push("/revenue/corporate-services");
                            return;
                          }
                          if (segment === "Banking") {
                            setActiveRevenueSegment(null);
                            setActiveTab(null);
                            router.push("/revenue/banking-projection");
                            return;
                          }
                          if (segment === "Fund admin") {
                            setActiveRevenueSegment(null);
                            setActiveTab(null);
                            router.push("/revenue/fund-administration");
                            return;
                          }
                          if (segment === "Licensing") {
                            setActiveRevenueSegment(null);
                            setActiveTab(null);
                            router.push("/revenue/licensing-projection");
                            return;
                          }
                          setActiveRevenueSegment(isActive ? null : segment);
                        }}
                      />
                    ))}

                    <motion.div
                      className="col-span-2 flex justify-center mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.a
                        href="/files/Boyar_Partners_Revenue_Projection_2026_v3_1.xlsx"
                        download="Boyar_Partners_Revenue_Projection_2026_v3_1.xlsx"
                        className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
                        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                      >
                        <div className="relative z-10 w-full flex flex-col items-center">
                          <span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                            Download in excel
                          </span>
                          <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
                          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
                          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
                        </div>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                )}


                {isCacTab && (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CacNavButton label="CAC model - marketing" onClick={() => handleCacAction("marketing")} index={0} />
                    <CacNavButton label="True CAC" onClick={() => handleCacAction("true")} index={1} />
                  </motion.div>
                )}

                {isClientAcquisitionTab && (
                  <motion.div
                    className="mt-10 grid grid-cols-2 gap-6 sm:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {clientAcquisitionOptions.map((option, index) => (
                      <AcquisitionButton
                        key={option}
                        option={option}
                        index={index}
                        router={router}
                        setShowOnboardingModal={setShowOnboardingModal}
                        setActiveTab={setActiveTab}
                      />
                    ))}
                  </motion.div>
                )}

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {restrictionNotice && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-white/20 bg-black/80 px-6 py-4 text-center text-sm text-white/90 backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {restrictionNotice}
          </motion.div>
        )}
      </AnimatePresence>

      <ClientOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />

    </div>
  );
}
