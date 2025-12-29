"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/components/layout/app-shell";

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
  "Lead generation",
  "Client onboarding",
];

interface ProjectionStep {
  label: string;
  path?: string;
}

const corporateProjectionSteps: ProjectionStep[] = [
  { label: "Year 1", path: "/revenue/year-1" },
  { label: "Year 2", path: "/revenue/year-2" },
  { label: "Year 3", path: "/revenue/year-3" },
  { label: "Year 4", path: "/revenue/year-4" },
  { label: "Year 5", path: "/revenue/year-5" },
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
    id: "product",
    label: "Services",
    icon: "",
    value: "$15.8M",
    content: {
      title: "Services",
      description: "Services and product offerings",
      details: [
        "Service catalog",
        "Service descriptions",
        "Pricing information",
        "Status and availability"
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
        "Lead generation",
        "Client onboarding"
      ]
    }
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
  }
];

interface CircularTabsProps {
  role: UserRole;
  initialActiveTab?: string | null;
  initialRevenueSegment?: string | null;
  initialShowCorporatePopup?: boolean;
}

export function CircularTabs({
  role,
  initialActiveTab = null,
  initialRevenueSegment = null,
  initialShowCorporatePopup = false,
}: CircularTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(initialActiveTab);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [restrictionNotice, setRestrictionNotice] = useState<string | null>(null);
  const [activeRevenueSegment, setActiveRevenueSegment] = useState<string | null>(initialRevenueSegment);
  const [showCorporatePopup, setShowCorporatePopup] = useState(initialShowCorporatePopup);

  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    // Calculate responsive dimensions
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;
      const size = isMobile ? 320 : isTablet ? 400 : 500;
      setDimensions({ width: size, height: size });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const radius = dimensions.width * 0.36; // Responsive radius

  useEffect(() => {
    // Auto-rotate the entire circle slowly - Optimized with requestAnimationFrame
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      setRotation((prev) => (prev + 0.2 * (deltaTime / 50)) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getTabPosition = (index: number, offset: number = 0) => {
    const angle = ((index * 2 * Math.PI) / tabs.length - Math.PI / 2) + (offset * Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, angle };
  };


  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const isCacTab = activeTabData?.id === "cac";
  const isProductTab = activeTabData?.id === "product";
  const isRevenueTab = activeTabData?.id === "revenue";
  const isClientAcquisitionTab = activeTabData?.id === "client-acquisition";

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const centerCircleSize = dimensions.width * 0.32; // Responsive center circle
  const tabCircleSize = dimensions.width * 0.19; // Responsive tab circles

  useEffect(() => {
    if (!restrictionNotice) return;
    const timeout = setTimeout(() => setRestrictionNotice(null), 3500);
    return () => clearTimeout(timeout);
  }, [restrictionNotice]);

  useEffect(() => {
    if (!isRevenueTab) {
      setActiveRevenueSegment(null);
      setShowCorporatePopup(false);
    }
  }, [isRevenueTab]);

  function handleCacAction(action: "marketing" | "true") {
    if (action === "marketing") {
      setActiveTab(null);
      router.push("/cac/marketing");
      return;
    }
    console.log(`Selected CAC action: ${action}`);
  }

  function handleProductAction(action: "investor" | "admin") {
    if (action === "investor") {
      setActiveTab(null);
      router.push("/products/investor");
      return;
    }
    if (action === "admin") {
      // Check if user is admin
      if (!isAdmin) {
        setRestrictionNotice("Admin access required. Only administrators can access this section.");
        return;
      }
      // Handle admin product view
      setActiveTab(null);
      // router.push("/products/admin"); // Uncomment when admin page is created
      console.log(`Selected Product action: ${action}`);
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
            rotate: rotation,
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

        {/* Circular Tabs */}
        {tabs.map((tab, index) => {
          const { x, y } = getTabPosition(index, rotation);
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;
          const isRestricted = isInvestorLite && tab.id === "documents";

          return (
            <motion.button
              key={tab.id}
              className={`absolute rounded-full border-2 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-1 text-white z-20 ${
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
                scale: isRestricted ? 1 : isActive ? 1.3 : isHovered ? 1.15 : 1,
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
                } else {
                  setActiveTab(isActive ? null : tab.id);
                }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-center px-1 sm:px-2">{tab.label}</span>
            </motion.button>
          );
        })}

        {/* Connecting Lines - Glowing Green */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 5 }} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {tabs.map((tab, index) => {
            const { x, y } = getTabPosition(index, rotation);
            const isHighlighted = hoveredTab === tab.id || activeTab === tab.id;
            // Center of middle circle: 250, 250 (center of 500x500)
            // Center of tab circle: centerX + x, centerY + y
            return (
              <motion.line
                key={tab.id}
                x1={centerX}
                y1={centerY}
                x2={centerX + x}
                y2={centerY + y}
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

      {/* Popup Modal */}
      <AnimatePresence>
        {activeTab && activeTabData && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTab(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-40 p-4 sm:p-6"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="bg-black/95 border-2 border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-lg w-full backdrop-blur-xl shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
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

                {!isCacTab && !isProductTab && !isRevenueTab && !isClientAcquisitionTab && (
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

                {isProductTab && (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.button
                      onClick={() => handleProductAction("investor")}
                      className="w-32 sm:w-36 aspect-square rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition text-xs sm:text-sm text-center px-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.25)",
                          "0 0 35px rgba(255,255,255,0.55)",
                          "0 0 10px rgba(255,255,255,0.25)"
                        ],
                        borderColor: [
                          "rgba(255,255,255,0.35)",
                          "rgba(255,255,255,0.75)",
                          "rgba(255,255,255,0.35)"
                        ]
                      }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      Investor
                    </motion.button>
                    <motion.button
                      onClick={() => handleProductAction("admin")}
                      className={`w-32 sm:w-36 aspect-square rounded-full border border-white/20 bg-white/5 flex items-center justify-center transition text-xs sm:text-sm text-center px-4 ${
                        isAdmin 
                          ? "text-white hover:bg-white/10 cursor-pointer" 
                          : "text-white/40 cursor-not-allowed opacity-60"
                      }`}
                      style={{ fontFamily: 'var(--font-benzin)' }}
                      whileHover={isAdmin ? { scale: 1.05 } : {}}
                      whileTap={isAdmin ? { scale: 0.96 } : {}}
                      animate={isAdmin ? {
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.25)",
                          "0 0 35px rgba(255,255,255,0.55)",
                          "0 0 10px rgba(255,255,255,0.25)"
                        ],
                        borderColor: [
                          "rgba(255,255,255,0.35)",
                          "rgba(255,255,255,0.75)",
                          "rgba(255,255,255,0.35)"
                        ]
                      } : {
                        boxShadow: [
                          "0 0 5px rgba(255,255,255,0.1)",
                          "0 0 5px rgba(255,255,255,0.1)"
                        ],
                        borderColor: [
                          "rgba(255,255,255,0.2)",
                          "rgba(255,255,255,0.2)"
                        ]
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
                    >
                      Admin
                    </motion.button>
                  </motion.div>
                )}

                {isRevenueTab && (
                  <motion.div
                    className="mt-10 grid w-full gap-4 sm:grid-cols-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {revenueSegments.map((segment) => (
                      <motion.button
                        key={segment}
                        className={`rounded-2xl border px-4 py-6 text-center text-sm transition ${
                          activeRevenueSegment === segment
                            ? "border-white/70 bg-white/20 text-white"
                            : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/40"
                        }`}
                        style={{ fontFamily: 'var(--font-benzin)' }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          const isActive = activeRevenueSegment === segment;
                          if (segment === "Corporate Services") {
                            setActiveRevenueSegment("Corporate Services");
                            setShowCorporatePopup(true);
                            return;
                          }
                          setActiveRevenueSegment(isActive ? null : segment);
                          setShowCorporatePopup(false);
                        }}
                      >
                        {segment}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {isRevenueTab && activeRevenueSegment === "Corporate Services" && (
                  <motion.div
                    className="mt-6 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-center text-xs text-white/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Select a projection horizon to open detailed view.
                  </motion.div>
                )}

                {isCacTab && (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.button
                      onClick={() => handleCacAction("marketing")}
                      className="w-32 sm:w-36 aspect-square rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition text-xs sm:text-sm text-center px-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.25)",
                          "0 0 35px rgba(255,255,255,0.55)",
                          "0 0 10px rgba(255,255,255,0.25)"
                        ],
                        borderColor: [
                          "rgba(255,255,255,0.35)",
                          "rgba(255,255,255,0.75)",
                          "rgba(255,255,255,0.35)"
                        ]
                      }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      CAC model - marketing
                    </motion.button>
                    <motion.button
                      onClick={() => handleCacAction("true")}
                      className="w-32 sm:w-36 aspect-square rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition text-xs sm:text-sm text-center px-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.25)",
                          "0 0 35px rgba(255,255,255,0.55)",
                          "0 0 10px rgba(255,255,255,0.25)"
                        ],
                        borderColor: [
                          "rgba(255,255,255,0.35)",
                          "rgba(255,255,255,0.75)",
                          "rgba(255,255,255,0.35)"
                        ]
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
                    >
                      True CAC
                    </motion.button>
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
                      <motion.button
                        key={option}
                        className="w-full aspect-square rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition text-xs sm:text-sm text-center px-4"
                        style={{ fontFamily: 'var(--font-benzin)' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          boxShadow: [
                            "0 0 10px rgba(255,255,255,0.25)",
                            "0 0 35px rgba(255,255,255,0.55)",
                            "0 0 10px rgba(255,255,255,0.25)"
                          ],
                          borderColor: [
                            "rgba(255,255,255,0.35)",
                            "rgba(255,255,255,0.75)",
                            "rgba(255,255,255,0.35)"
                          ]
                        }}
                        transition={{
                          opacity: { delay: index * 0.1 },
                          scale: { delay: index * 0.1 },
                          boxShadow: { duration: 2.4, repeat: Infinity, delay: index * 0.2 },
                          borderColor: { duration: 2.4, repeat: Infinity, delay: index * 0.2 }
                        }}
                        onClick={() => {
                          if (option === "Acquisition channels") {
                            setActiveTab(null);
                            router.push("/client-acquisition/acquisition-channels");
                          } else if (option === "Conversion metrics") {
                            setActiveTab(null);
                            router.push("/client-acquisition/conversion-metrics");
                          } else {
                            console.log(`Selected Client Acquisition option: ${option}`);
                          }
                        }}
                      >
                        {option}
                      </motion.button>
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

      <AnimatePresence>
        {showCorporatePopup && activeRevenueSegment === "Corporate Services" && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCorporatePopup(false)}
            />
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <motion.div
                className="relative w-full max-w-md rounded-3xl border border-white/20 bg-black/95 p-6 text-white shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Corporate Services</p>
                    <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>
                      Projection Horizon
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCorporatePopup(false)}
                    className="text-white/70 hover:text-white text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="relative mx-auto mt-6 h-64 w-64 sm:h-72 sm:w-72">
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  {corporateProjectionSteps.map((step, index) => {
                    const angle = (index / corporateProjectionSteps.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 110;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div
                        key={step.label}
                        className="absolute top-1/2 left-1/2"
                        style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                      >
                        <motion.button
                          className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100/40 bg-emerald-400/10 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_18px_rgba(16,185,129,0.2)]"
                          style={{ fontFamily: 'var(--font-benzin)' }}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(16,185,129,0.35)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (step.path) {
                              setShowCorporatePopup(false);
                              setActiveTab(null);
                              router.push(step.path);
                            } else {
                              setRestrictionNotice(`${step.label} projection coming soon.`);
                            }
                          }}
                        >
                          {step.label}
                        </motion.button>
                      </div>
                    );
                  })}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.button
                      className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-white/40 to-white/10 text-center text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_0_22px_rgba(255,255,255,0.4)]"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowCorporatePopup(false);
                        setActiveTab(null);
                        router.push("/revenue/combined");
                      }}
                    >
                      Combined
                      <span className="text-[8px] tracking-[0.3em]">Projection</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
