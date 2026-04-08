"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TrajectoryMap } from "./trajectory-map";

export type PlayPhase = "idle" | "highlight" | "shrunk";
type ContentView = "global" | "apac" | "europe" | "northamerica" | "restofworld" | "competitive";

const TAM_PIE_DATA = [
  { label: "North America", value: 34, color: "#B31942" },
  { label: "Europe", value: 31, color: "#003399" },
  { label: "APAC", value: 24, color: "#16a34a" },
  { label: "MENA", value: 6, color: "#b48c64" },
  { label: "Rest", value: 5, color: "#64748b" },
] as const;

const SPLIT_PIE_DATA = [
  { label: "Domestic structuring", value: 60, color: "#10b981", dollar: "$8.7B" },
  { label: "Offshore & cross-border structuring", value: 40, color: "#f59e0b", dollar: "$5.8B" },
] as const;

const FIRM_SIZE_PIE_DATA = [
  { label: "Large TCSPs firms", value: 38, color: "#0f766e" },
  { label: "Mid size TCSPs firms", value: 11, color: "#1e3a8a" },
  { label: "Boutique TCSPs firms", value: 51, color: "#334155" },
] as const;

const APAC_BREAKDOWN_DATA = [
  { label: "East Asia (China, Japan, Korea, HK, Taiwan)", value: 46, color: "#16a34a" },
  { label: "South Asia (India, Sri Lanka, Bangladesh)", value: 20, color: "#22d3ee" },
  { label: "Southeast Asia (Singapore, Malaysia, Thailand, etc.)", value: 21, color: "#f59e0b" },
  { label: "Oceania (Australia, New Zealand)", value: 13, color: "#a78bfa" },
] as const;

const EUROPE_BREAKDOWN_DATA = [
  { label: "EU Core (Lux, Ireland, Netherlands)", value: 35, color: "#003399" },
  { label: "UK & Crown Dependencies", value: 30, color: "#C8102E" },
  { label: "Switzerland", value: 18, color: "#D52B1E" },
  { label: "EU Emerging (Cyprus, Malta)", value: 10, color: "#f59e0b" },
  { label: "Rest of Europe", value: 7, color: "#64748b" },
] as const;

const EUROPE_SUB_REGIONS = [
  { name: "EU Core", tam: "$1.58B", share: "35%", color: "#003399", countries: "Luxembourg, Ireland, Netherlands", note: "Luxembourg is #1 EU fund centre and #2 globally. Ireland growing post-Brexit. Netherlands: holding company hub." },
  { name: "UK & Crown Dependencies", tam: "$1.35B", share: "30%", color: "#C8102E", countries: "London, Jersey, Guernsey, Isle of Man", note: "FCA-regulated. Post-Brexit independent regime. Jersey administers £1.4T in funds from 50 sq miles." },
  { name: "Switzerland", tam: "$0.81B", share: "18%", color: "#D52B1E", countries: "Geneva, Zurich", note: "FINMA-regulated. Deep trust tradition. Swiss trustees administer trusts under BVI, Jersey, NZ, Singapore law." },
  { name: "EU Emerging", tam: "$0.45B", share: "10%", color: "#f59e0b", countries: "Cyprus, Malta, Monaco, Madrid", note: "Cyprus: 12.5% tax, EU gateway. Malta: cost-effective for smaller managers. Both growing rapidly." },
] as const;

const EUROPE_HUBS = [
  { hub: "Luxembourg", regulator: "CSSF", specialty: "Fund administration #1 in Europe. SIF, SICAR, RAIF vehicles. Distributes to 70+ countries.", maturity: "Dominant" },
  { hub: "London", regulator: "FCA", specialty: "Private client & corporate services. Post-Brexit independent AML regime. Major global hub.", maturity: "Mature" },
  { hub: "Jersey", regulator: "JFSC", specialty: "Trust law centre of excellence. PE fund domicile. £1.4T funds administered. Pop: 108,000.", maturity: "Mature" },
  { hub: "Switzerland", regulator: "FINMA", specialty: "Privacy & stability premium. Serves LatAm and MENA HNWIs from Geneva/Zurich.", maturity: "Mature" },
  { hub: "Ireland", regulator: "CBI", specialty: "UCITS passport advantage. Post-Brexit fund domicile migration from UK.", maturity: "Growing" },
  { hub: "Cyprus", regulator: "CySEC", specialty: "12.5% corporate tax. EU member. 65+ double tax treaties. HNW structuring gateway.", maturity: "Emerging" },
  { hub: "Malta", regulator: "MFSA", specialty: "Cost-effective AIF regimes. Gaming industry structures. Flexible for smaller managers.", maturity: "Emerging" },
] as const;

const EUROPE_COMPETITORS = [
  { name: "TMF Group", hq: "Netherlands", revenue: "€907M", note: "World's largest TCSP. 87 countries. Europe is home base." },
  { name: "Intertrust (CSC)", hq: "Netherlands", revenue: "~€600M", note: "37.5% EBITDA margin historically. Acquired by CSC 2023." },
  { name: "JTC Group", hq: "Jersey", revenue: "LSE-listed", note: "14,000+ clients. Strong fund & private client services." },
  { name: "Ocorian", hq: "Jersey", revenue: "n/a", note: "100+ staff in Luxembourg alone. Fund admin, AIFM, corporate services." },
  { name: "Trident Trust", hq: "BVI/Multi", revenue: "n/a", note: "12 European offices. Serves LatAm clients from Geneva. 400 staff, 25 languages." },
  { name: "Apex Group (Sanne)", hq: "Bermuda/Jersey", revenue: "n/a", note: "Acquired Sanne 2022. Fund admin specialist. Global scale." },
] as const;

const NA_BREAKDOWN_DATA = [
  { label: "United States", value: 82, color: "#B31942" },
  { label: "Canada", value: 14, color: "#FF0000" },
  { label: "Mexico & Caribbean", value: 4, color: "#006847" },
] as const;

const NA_SUB_REGIONS = [
  { name: "United States", tam: "$4.04B", share: "82%", color: "#B31942", countries: "Delaware, Wyoming, South Dakota, Nevada, New York", note: "Largest TCSP market globally. 7.9M HNWIs. Home to 66% of Fortune 500 (Delaware). SEC filed 46 crypto enforcement actions in 2024." },
  { name: "Canada", tam: "$0.69B", share: "14%", color: "#FF0000", countries: "Ontario, British Columbia, Alberta", note: "Growing HNWI population. Strong cross-border structuring demand with US. Active PE fund administration market." },
  { name: "Mexico & Caribbean", tam: "$0.20B", share: "4%", color: "#006847", countries: "BVI, Cayman Islands, Bahamas, Bermuda, Mexico", note: "Caribbean offshore centres are globally significant but counted partly under NA. BVI alone hosts 400,000+ active companies." },
] as const;

const NA_KEY_JURISDICTIONS = [
  { jurisdiction: "Delaware", specialty: "66% of Fortune 500 incorporated. Court of Chancery (no juries). Gold standard for VC-backed startups.", status: "Dominant" },
  { jurisdiction: "Wyoming", specialty: "Anonymous LLCs. Statutory Foundations. #1 state tax climate (Tax Foundation 2025). $60/year maintenance.", status: "Rising" },
  { jurisdiction: "South Dakota", specialty: "Dynasty trusts with no rule against perpetuities. 8 new digital asset trust charters granted in 2024.", status: "Rising" },
  { jurisdiction: "Nevada", specialty: "No corporate income tax. Asset protection trusts. Privacy protections.", status: "Mature" },
  { jurisdiction: "BVI", specialty: "400,000+ active companies. Global standard for holding structures. Used heavily by APAC and MENA clients.", status: "Dominant" },
  { jurisdiction: "Cayman Islands", specialty: "24,591 registered funds. $4.97T in fund NAV. World's #1 hedge fund domicile.", status: "Dominant" },
] as const;

const NA_COMPETITORS = [
  { name: "CSC (incl. Intertrust)", hq: "Delaware", revenue: "~$2B+", note: "Acquired Intertrust 2023. Largest registered agent in the US. 1.8M+ entities served." },
  { name: "Corporation Service Co.", hq: "Delaware", revenue: "n/a", note: "Corporate governance, compliance, entity management for Fortune 500." },
  { name: "Wilmington Trust (M&T)", hq: "Delaware", revenue: "n/a", note: "Trust administration, wealth management. Bank-owned TCSP." },
  { name: "TMF Group", hq: "Netherlands", revenue: "€907M global", note: "Growing US presence. Acquired KPK faServ (India), RSM BPS (LatAm) in 2024-25." },
  { name: "JTC Group", hq: "Jersey", revenue: "LSE-listed", note: "Acquired New York Private Trust Company (NYPTC) for $270M in 2023." },
  { name: "Maples Group", hq: "Cayman", revenue: "n/a", note: "Dominant in Cayman fund administration. Major BVI and Irish presence." },
] as const;

const ROW_BREAKDOWN_DATA = [
  { label: "MENA", value: 55, color: "#b48c64" },
  { label: "South America", value: 27, color: "#14b8a6" },
  { label: "Africa", value: 18, color: "#a78bfa" },
] as const;

const ROW_SUB_REGIONS = [
  { name: "MENA", tam: "$0.87B", share: "55%", color: "#b48c64", countries: "UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman", note: "Dubai hosts 75% of the region's family offices. DIFC saw 200 new family offices in 2024 alone, 33% YoY growth." },
  { name: "South America", tam: "$0.43B", share: "27%", color: "#14b8a6", countries: "Brazil, Argentina, Chile, Colombia, Panama", note: "LatAm HNWIs structure through BVI, Cayman, and Panama. Swiss TCSPs in Geneva specialise in serving LatAm clients." },
  { name: "Africa", tam: "$0.29B", share: "18%", color: "#a78bfa", countries: "South Africa, Mauritius, Kenya, Nigeria", note: "Mauritius is the India to Africa financial bridge. 54% of India's FDI historically routed through Mauritius." },
] as const;

const MENA_HUBS = [
  { hub: "DIFC (Dubai)", regulator: "DFSA", specialty: "800+ family businesses. Top 120 families manage $1.2T in wealth. Foundation structures up 51% in 2024.", status: "Dominant" },
  { hub: "ADGM (Abu Dhabi)", regulator: "FSRA", specialty: "Common law jurisdiction within UAE. Growing fund management and family office hub.", status: "Rising" },
  { hub: "Saudi Arabia (SEZs)", regulator: "CMA/SAMA", specialty: "Vision 2030 driving $1T+ diversification. RHQ programme requiring MNCs to base in KSA.", status: "Emerging" },
  { hub: "Bahrain", regulator: "CBB", specialty: "Islamic finance hub. Sharia-compliant structuring. Competitive alternative to UAE.", status: "Niche" },
  { hub: "Qatar (QFC)", regulator: "QFCRA", specialty: "Sovereign wealth proximity. Growing corporate services demand post-World Cup.", status: "Growing" },
] as const;

const ROW_CORRIDORS = [
  { from: "GCC HNWIs", to: "UK / Jersey", flow: "Trust structures, London real estate holdings", growth: "High" },
  { from: "GCC HNWIs", to: "BVI / Cayman", flow: "Fund vehicles, holding companies", growth: "High" },
  { from: "India diaspora (UAE)", to: "India / Singapore", flow: "Family office structuring, reverse investment", growth: "High" },
  { from: "Saudi corporates", to: "Multiple", flow: "Vision 2030 outbound acquisitions", growth: "Rising" },
  { from: "LatAm HNWIs", to: "Geneva / BVI / Cayman", flow: "Wealth protection, trust planning, fund structures", growth: "Medium" },
  { from: "LatAm HNWIs", to: "Panama / Delaware", flow: "Holding companies, trade structures", growth: "Medium" },
  { from: "African PE/DFIs", to: "Mauritius", flow: "India to Africa corridor, fund domicile, admin", growth: "Medium" },
  { from: "South Africa HNWIs", to: "Jersey / Guernsey / Mauritius", flow: "Emigration trusts, offshore asset protection", growth: "Medium" },
] as const;

const COMPETITIVE_TIERS = [
  { tier: "Tier 1", label: "Global Scale TCSPs", color: "#3B82F6", firms: "TMF Group · CSC/Intertrust · Vistra · Citco", revenue: "$500M–$1B+", jurisdictions: "50–87 countries", clients: "MNCs, PE funds, large corporates", strength: "Scale, institutional trust, one-stop-shop for Fortune 500", weakness: "Expensive, impersonal, slow for bespoke work. TMF charges premium rates that price out HNWIs and smaller family offices.", boyarRelation: "referral" as const, boyarNote: "Not competitors. Too institutional for Boyar's target clients. But their clients needing APAC boutique work = referral opportunity." },
  { tier: "Tier 2", label: "Mid-Size Specialist TCSPs", color: "#10B981", firms: "JTC · Ocorian · Trident Trust · Hawksford · Apex/Sanne", revenue: "$100M–$500M", jurisdictions: "10–30 countries", clients: "PE funds, family offices, HNWIs", strength: "Specialist expertise, personal service, jurisdiction depth. Trident serves LatAm from Geneva. JTC acquired NYPTC for US trust.", weakness: "Western cost base limits pricing flexibility. Limited direct presence in India corridor. None headquartered in APAC's fastest-growing source markets.", boyarRelation: "partner" as const, boyarNote: "Natural referral partners. Trident Dubai serves MENA HNWIs who need APAC structuring. JTC and Ocorian need an India-corridor partner. Boyar fills this gap." },
  { tier: "Tier 3", label: "Tech Platforms", color: "#F59E0B", firms: "Osome · Sleek · Statrys · easyCorp", revenue: "$5M–$50M", jurisdictions: "1–3 (HK, SG, UK only)", clients: "SMEs, startups, solopreneurs", strength: "Speed, digital-first, low price. Osome raised $75M. Formation in HK from ~$800.", weakness: "Zero trust capability. Zero advisory. Zero banking introductions. Zero cross-border structuring. No multi-jurisdiction service. Company formation only.", boyarRelation: "irrelevant" as const, boyarNote: "Different market entirely. Osome serves a $800 HK incorporation client. Boyar serves a $29,700 Full Structure client. Zero service overlap." },
  { tier: "Tier 4", label: "Local Boutique TCSPs", color: "#8B5CF6", firms: "Hundreds of single-jurisdiction firms (BVI, Cayman, Cyprus, Jersey, Malta, etc.)", revenue: "$1M–$20M", jurisdictions: "1 (home jurisdiction only)", clients: "Local referrals, law firm overflow, walk-in formations", strength: "Deep local expertise, low cost, long-standing local relationships, regulatory familiarity", weakness: "No cross-border capability. Cannot serve clients who need structures across multiple jurisdictions. No advisory layer — pure execution.", boyarRelation: "supplier" as const, boyarNote: "Suppliers and execution partners, not competitors. Boyar uses local boutiques as in-jurisdiction partners — the firm that files the BVI formation or administers the Jersey trust on Boyar's behalf." },
] as const;

const BOYAR_POSITIONING = {
  jurisdictions: "40+",
  services: "Formation + Trust + Full Structure + Banking + Corporate Services",
  priceRange: "$2,500–$29,700",
  clients: "HNWIs, entrepreneurs, family businesses seeking cross-border structuring",
  differentiators: [
    { point: "Cross-border capability", detail: "that tech platforms don't have" },
    { point: "Boutique pricing", detail: "that global TCSPs can't match" },
    { point: "Full-stack advisory", detail: "that local boutiques can't deliver" },
    { point: "India corridor access", detail: "that no Western-domiciled TCSP naturally serves" },
    { point: "Licensed and banking-accepted", detail: "across 40+ jurisdictions: the regulatory moat that takes 12–18 months to build" },
  ],
};

const TAM_SOURCES = [
  {
    source: "The Business Research Company",
    year: "2025",
    estimate: "$14.33B",
    growth: "4.7% CAGR → $17.25B by 2029",
  },
  {
    source: "Verified Market Research",
    year: "2024",
    estimate: "$15.5B",
    growth: "5.0% CAGR → $21.81B by 2031",
  },
  {
    source: "Business Research Insights",
    year: "2025",
    estimate: "$11.93B",
    growth: "6.5% CAGR → $22.35B by 2035",
  },
  {
    source: "Technavio",
    year: "2025",
    estimate: "+$1.79B",
    growth: "3.9% CAGR (2025 to 2029)",
  },
  {
    source: "Research and Markets",
    year: "2025",
    estimate: "$14.33B",
    growth: "4.7% CAGR → $17.25B by 2029",
  },
] as const;

function getPiePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = (startDeg * Math.PI) / 180;
  const end = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(start);
  const y1 = cy - r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy - r * Math.sin(end);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 0 ${x2} ${y2} Z`;
}

function TAMPieChart({
  visible,
  size = "default",
  align = "center",
  showLegend = true,
  centerLabel = "TAM",
  data = TAM_PIE_DATA,
}: {
  visible: boolean;
  size?: "default" | "small";
  align?: "center" | "left";
  showLegend?: boolean;
  centerLabel?: string;
  data?: typeof TAM_PIE_DATA | typeof SPLIT_PIE_DATA | typeof FIRM_SIZE_PIE_DATA | typeof APAC_BREAKDOWN_DATA | typeof EUROPE_BREAKDOWN_DATA | typeof NA_BREAKDOWN_DATA | typeof ROW_BREAKDOWN_DATA;
}) {
  const cx = 100;
  const cy = 100;
  const r = size === "small" ? 72 : 72;
  const centerR = size === "small" ? 36 : 36;
  const textSize = size === "small" ? (centerLabel.length > 4 ? 9 : 11) : (centerLabel.length > 8 ? 10 : 14);
  let cumulative = 0;
  const paths = data.map(({ value, color }) => {
    const startDeg = cumulative;
    cumulative += (value / 100) * 360;
    const endDeg = cumulative;
    return { d: getPiePath(cx, cy, r, startDeg, endDeg), color };
  });

  return (
    <motion.div
      className={`flex flex-col gap-4 ${align === "left" ? "items-start self-start -ml-2" : "items-center"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: align === "left" ? 0.5 : 0.3 }}
    >
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className={size === "small" ? "h-44 w-44 md:h-48 md:w-48" : "h-48 w-48 md:h-56 md:w-56"}
        >
          {paths.map(({ d, color }, i) => (
            <path key={i} d={d} fill={color} stroke="#0f172a" strokeWidth={1.5} />
          ))}
          <circle cx={cx} cy={cy} r={centerR} fill="black" />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: "#fff", fontSize: textSize, fontWeight: 600 }}
          >
            {centerLabel}
          </text>
        </svg>
      </div>
      {showLegend && (
        <ul
          className={`flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/90 ${align === "left" ? "justify-start" : "justify-center"}`}
        >
          {data.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span>
                {item.label} {item.value}%
                {"dollar" in item && item.dollar && ` (${item.dollar})`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

interface TrajectoryViewProps {
  onClose: () => void;
  closeLabel?: "Close" | "Back";
}

export function TrajectoryView({
  onClose,
  closeLabel = "Close",
}: TrajectoryViewProps) {
  const router = useRouter();
  const [playPhase, setPlayPhase] = useState<PlayPhase>("idle");
  const [showText, setShowText] = useState(false);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [contentView, setContentView] = useState<ContentView>("global");
  const [contentVisible, setContentVisible] = useState(false);
  const [apacAnimatedNumber, setApacAnimatedNumber] = useState(0);
  const [europeAnimatedNumber, setEuropeAnimatedNumber] = useState(0);
  const [naAnimatedNumber, setNaAnimatedNumber] = useState(0);
  const [rowAnimatedNumber, setRowAnimatedNumber] = useState(0);
  const shrinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const handlePlayRef = useRef(() => {});
  const handleBackRef = useRef(() => {});

  const highlightAPAC = playPhase !== "idle";
  const wholeMapOrange = playPhase === "highlight" || playPhase === "shrunk";
  const isFullScreenPanel = contentView === "competitive";

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handlePlayRef.current();
      if (e.key === "ArrowLeft") handleBackRef.current();
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  function handlePlay() {
    if (playCount === 0) {
      // First click — existing global TAM animation
      setPlayPhase("highlight");
      setShowText(false);
      setContentView("global");
      setContentVisible(false);
      setAnimatedNumber(0);
      if (shrinkTimeoutRef.current) clearTimeout(shrinkTimeoutRef.current);
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      shrinkTimeoutRef.current = setTimeout(() => {
        setPlayPhase("shrunk");
        shrinkTimeoutRef.current = null;
        // Show text 1 second after black screen appears
        textTimeoutRef.current = setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          textTimeoutRef.current = null;
          // Start number rolling animation
          startNumberAnimation();
          setPlayCount(1);
        }, 1000);
      }, 2000);
    } else if (playCount === 1) {
      // Second click — transition to APAC deep dive
      if (shrinkTimeoutRef.current) clearTimeout(shrinkTimeoutRef.current);
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setContentVisible(false);
      setShowText(false);

      setTimeout(() => {
        setContentView("apac");
        setApacAnimatedNumber(0);

        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          startApacNumberAnimation();
          setPlayCount(2);
        }, 300);
      }, 500);
    } else if (playCount === 2) {
      setContentVisible(false);
      setShowText(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setTimeout(() => {
        setContentView("europe");
        setEuropeAnimatedNumber(0);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          startEuropeNumberAnimation();
          setPlayCount(3);
        }, 300);
      }, 500);
    } else if (playCount === 3) {
      setContentVisible(false);
      setShowText(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setTimeout(() => {
        setContentView("northamerica");
        setNaAnimatedNumber(0);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          startNaNumberAnimation();
          setPlayCount(4);
        }, 300);
      }, 500);
    } else if (playCount === 4) {
      setContentVisible(false);
      setShowText(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setTimeout(() => {
        setContentView("restofworld");
        setRowAnimatedNumber(0);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          startRowNumberAnimation();
          setPlayCount(5);
        }, 300);
      }, 500);
    } else if (playCount === 5) {
      setContentVisible(false);
      setShowText(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setTimeout(() => {
        setContentView("competitive");
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(6);
        }, 300);
      }, 500);
    }
  }

  function handleBack() {
    if (playCount <= 0) return;
    if (shrinkTimeoutRef.current) clearTimeout(shrinkTimeoutRef.current);
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (playCount === 1) {
      setContentVisible(false);
      setShowText(false);
      setPlayPhase("idle");
      setPlayCount(0);
    } else if (playCount === 2) {
      setContentVisible(false);
      setShowText(false);
      setTimeout(() => {
        setContentView("global");
        setAnimatedNumber(14.5);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(1);
        }, 300);
      }, 300);
    } else if (playCount === 3) {
      setContentVisible(false);
      setShowText(false);
      setTimeout(() => {
        setContentView("apac");
        setApacAnimatedNumber(3.48);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(2);
        }, 300);
      }, 300);
    } else if (playCount === 4) {
      setContentVisible(false);
      setShowText(false);
      setTimeout(() => {
        setContentView("europe");
        setEuropeAnimatedNumber(4.5);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(3);
        }, 300);
      }, 300);
    } else if (playCount === 5) {
      setContentVisible(false);
      setShowText(false);
      setTimeout(() => {
        setContentView("northamerica");
        setNaAnimatedNumber(4.93);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(4);
        }, 300);
      }, 300);
    } else if (playCount === 6) {
      setContentVisible(false);
      setShowText(false);
      setTimeout(() => {
        setContentView("restofworld");
        setRowAnimatedNumber(1.59);
        setTimeout(() => {
          setShowText(true);
          setContentVisible(true);
          setPlayCount(5);
        }, 300);
      }, 300);
    }
  }

  handlePlayRef.current = handlePlay;
  handleBackRef.current = handleBack;

  function startNumberAnimation() {
    const targetValue = 14.5;
    const duration = 2000; // 2 seconds total
    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: starts fast, slows down near the end (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      // Add some randomness for slot machine effect (more random at start, less near end)
      const randomness = (1 - progress) * 0.3; // Less random as we approach target
      const randomOffset = (Math.random() - 0.5) * randomness;
      
      const currentValue = startValue + (targetValue - startValue) * easedProgress + randomOffset;
      
      // Ensure we don't go over target
      const clampedValue = Math.min(currentValue, targetValue);
      
      setAnimatedNumber(clampedValue);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exactly 14.5
        setAnimatedNumber(targetValue);
        animationFrameRef.current = null;
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }

  function startApacNumberAnimation() {
    const targetValue = 3.48; // APAC TAM (24% of 14.5B)
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const randomness = (1 - progress) * 0.2;
      const randomOffset = (Math.random() - 0.5) * randomness;
      const currentValue = targetValue * easedProgress + randomOffset;
      const clampedValue = Math.min(Math.max(currentValue, 0), targetValue);

      setApacAnimatedNumber(clampedValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setApacAnimatedNumber(targetValue);
        animationFrameRef.current = null;
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }

  function startEuropeNumberAnimation() {
    const targetValue = 4.5;
    const duration = 2000;
    const startTime = performance.now();
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const randomness = (1 - progress) * 0.2;
      const randomOffset = (Math.random() - 0.5) * randomness;
      const currentValue = targetValue * easedProgress + randomOffset;
      setEuropeAnimatedNumber(Math.min(Math.max(currentValue, 0), targetValue));
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setEuropeAnimatedNumber(targetValue);
        animationFrameRef.current = null;
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }

  function startNaNumberAnimation() {
    const targetValue = 4.93;
    const duration = 2000;
    const startTime = performance.now();
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const randomness = (1 - progress) * 0.2;
      const randomOffset = (Math.random() - 0.5) * randomness;
      const currentValue = targetValue * easedProgress + randomOffset;
      setNaAnimatedNumber(Math.min(Math.max(currentValue, 0), targetValue));
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setNaAnimatedNumber(targetValue);
        animationFrameRef.current = null;
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }

  function startRowNumberAnimation() {
    const targetValue = 1.59;
    const duration = 2000;
    const startTime = performance.now();
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const randomness = (1 - progress) * 0.15;
      const randomOffset = (Math.random() - 0.5) * randomness;
      const currentValue = targetValue * easedProgress + randomOffset;
      setRowAnimatedNumber(Math.min(Math.max(currentValue, 0), targetValue));
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setRowAnimatedNumber(targetValue);
        animationFrameRef.current = null;
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    return () => {
      if (shrinkTimeoutRef.current) clearTimeout(shrinkTimeoutRef.current);
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#FDFBEE]">
      <header className="relative flex items-center justify-between border-b border-slate-200 bg-[#FDFBEE] px-4 py-3">
        <motion.div
          className="absolute inset-y-0 right-0 z-0 bg-black"
          style={{ bottom: -1 }}
          initial={false}
          animate={{
            left: isFullScreenPanel ? "0%" : playPhase === "shrunk" ? "38%" : "100%",
          }}
          transition={{
            type: "tween",
            duration: isFullScreenPanel ? 0.7 : 1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        />
        <div className="relative z-10 flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleBack}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white/80 text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            type="button"
            onClick={handlePlay}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white/80 text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          <span className="text-[10px] text-slate-400 ml-1">(Press → for next slide and ← for previous slide)</span>
        </div>
        <motion.button
          type="button"
          onClick={onClose}
          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white ${playPhase === "shrunk" || isFullScreenPanel ? "text-white hover:bg-white/20 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={closeLabel}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div
          className="flex h-full min-h-0 min-w-0 items-center justify-start overflow-hidden bg-[#FDFBEE]"
          initial={false}
          animate={{
            width: playPhase === "shrunk" || isFullScreenPanel ? "62%" : "100%",
            paddingLeft: isFullScreenPanel ? 0 : playPhase === "shrunk" ? 24 : 0,
            paddingRight: isFullScreenPanel ? 0 : playPhase === "shrunk" ? 24 : 0,
            paddingTop: isFullScreenPanel ? 0 : playPhase === "shrunk" ? 24 : 0,
            paddingBottom: isFullScreenPanel ? 0 : playPhase === "shrunk" ? 24 : 0,
          }}
          transition={{
            type: "tween",
            duration: isFullScreenPanel ? 0.7 : 1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <motion.div
            className="h-full w-full shrink-0 origin-left overflow-hidden"
            style={{ transformOrigin: "left center" }}
            initial={false}
            animate={{
              scale: playPhase === "shrunk" && !isFullScreenPanel ? 0.62 : 1,
              x: isFullScreenPanel ? "-100%" : 0,
            }}
            transition={{
              type: "tween",
              duration: isFullScreenPanel ? 0.7 : 1,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <TrajectoryMap
              highlightAPAC={highlightAPAC}
              wholeMapOrange={wholeMapOrange}
              highlightRegion={contentView === "apac" ? "APAC" : contentView === "europe" ? "Europe" : contentView === "northamerica" ? "NorthAmerica" : contentView === "restofworld" ? "RestOfWorld" : contentView === "competitive" ? "Muted" : undefined}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-y-0 right-0 flex flex-col bg-black"
          initial={false}
          animate={{
            left: isFullScreenPanel ? "0%" : playPhase === "shrunk" ? "38%" : "100%",
          }}
          transition={{
            type: "tween",
            duration: isFullScreenPanel ? 0.7 : 1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-none py-6 px-6">
            <AnimatePresence mode="wait">
              {contentView === "global" && contentVisible && (
                <motion.div
                  key="global-content"
                  className="flex flex-col items-center gap-8 pb-16"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-1 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: showText ? 1 : 0,
                      y: showText ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                      <span>Global TCSPs TAM </span>
                      <span className="tabular-nums">
                        {animatedNumber.toFixed(1)}b USD
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">
                      (Trust & Corporate service providers)
                    </div>
                  </motion.div>

                  <TAMPieChart visible={showText} />

                  <div className="flex flex-row items-start gap-2 self-start -ml-2">
                <div className="flex flex-col items-start gap-0.5">
                  <TAMPieChart
                    visible={showText}
                    size="small"
                    align="left"
                    showLegend={false}
                    centerLabel="TAM 14.5b"
                  />
                  <motion.div
                    className="w-44 md:w-48 text-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showText ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="text-xs text-white/70">Total TCSPs market size</span>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-end justify-center pt-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showText ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <svg
                    className="h-5 w-32 md:w-36 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="12"
                      x2="180"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                    <path
                      d="M180 7l10 5-10 5"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>

                <div className="flex flex-col items-start gap-0.5">
                  <TAMPieChart
                    visible={showText}
                    size="small"
                    align="left"
                    showLegend={false}
                    centerLabel="Split"
                    data={SPLIT_PIE_DATA}
                  />
                  <motion.div
                    className="w-44 md:w-48 text-left text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showText ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="flex flex-col gap-1 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: SPLIT_PIE_DATA[0].color }}
                          aria-hidden
                        />
                        <span>Domestic structuring (onshore) 8.7B (60%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: SPLIT_PIE_DATA[1].color }}
                          aria-hidden
                        />
                        <span>Offshore & Cross border structuring 5.8B (40%)</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-end justify-center pt-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showText ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  <svg
                    className="h-5 w-32 md:w-36 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="12"
                      x2="180"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                    <path
                      d="M180 7l10 5-10 5"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>

                <div className="flex flex-col items-start gap-0.5">
                  <TAMPieChart
                    visible={showText}
                    size="small"
                    align="left"
                    showLegend={false}
                    centerLabel="By size"
                    data={FIRM_SIZE_PIE_DATA}
                  />
                  <motion.div
                    className="w-44 md:w-48 text-left text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showText ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="flex flex-col gap-1 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: FIRM_SIZE_PIE_DATA[0].color }}
                          aria-hidden
                        />
                        <span>Large TCSPs firms 38%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: FIRM_SIZE_PIE_DATA[1].color }}
                          aria-hidden
                        />
                        <span>Mid size TCSPs firms 11%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: FIRM_SIZE_PIE_DATA[2].color }}
                          aria-hidden
                        />
                        <span>Boutique TCSPs firms 51%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Section 1: TAM Validation */}
              <motion.div
                className="w-full mt-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }}
                transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  TAM Validation
                </p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-[10px] text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Source</th>
                        <th className="px-3 py-2 text-left">Base Year</th>
                        <th className="px-3 py-2 text-left">Estimate</th>
                        <th className="px-3 py-2 text-left">Growth Trajectory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TAM_SOURCES.map((row, idx) => (
                        <tr
                          key={row.source}
                          className={`text-[10px] text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}
                        >
                          <td className="px-3 py-2">{row.source}</td>
                          <td className="px-3 py-2">{row.year}</td>
                          <td className="px-3 py-2 text-[#93C5FD] font-medium">{row.estimate}</td>
                          <td className="px-3 py-2">{row.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-[11px] text-white/55 leading-[1.6]">
                    Five independent research firms converge on{" "}
                    <span className="text-white font-medium">$12–15.5B</span>. Boyar uses the median (
                    <span className="text-[#93C5FD] font-medium">$14.5B</span>), conservative, citable, and
                    institutionally defensible.
                  </p>
                </div>
              </motion.div>

              {/* Section 2: Market Structure */}
              <motion.div
                className="w-full mt-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }}
                transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  Market Structure
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p
                      className="text-xl font-semibold text-white"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      35–45%
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Top 8 players combined share
                    </p>
                  </div>
                  <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p
                      className="text-xl font-semibold text-white"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      ~7%
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Largest single player (TMF Group)
                    </p>
                  </div>
                  <div className="flex-1 min-w-[130px] rounded-xl border border-[#6EE7B7]/[0.10] bg-[#6EE7B7]/[0.04] px-4 py-3">
                    <p
                      className="text-xl font-semibold text-[#6EE7B7]"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      51%
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Revenue held by boutique firms
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      No Monopoly, No Moat
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      TMF Group, the world's largest TCSP, holds ~7% market share with €907M revenue across 87
                      countries. No single firm dominates pricing, distribution, or client access.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Boutique Firms Own the Market
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      51% of TCSP revenue flows through boutique firms; not large corporates. The market
                      structurally favours specialised, relationship-driven operators over platform businesses.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      High Margins, Low Capital Intensity
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Industry EBITDA margins range 30–38% at scale. Intertrust: 37.5%. TMF Group: 31%. Asset-light
                      model with recurring revenue from administration and compliance fees.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Fragmentation = Opportunity
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      55–65% of the market is held by hundreds of small firms. The barrier to entry is not capital;
                      it is regulatory credentialing and banking acceptance. Boyar has cleared both.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Section 3: Offshore & Cross-Border Segment */}
              <motion.div
                className="w-full mt-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }}
                transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  Offshore & Cross-Border Boyar&apos;s Core Arena
                </p>
                <div className="rounded-xl border border-[#FCD34D]/[0.12] bg-[#FCD34D]/[0.04] px-5 py-4 text-center mb-4">
                  <p
                    className="text-3xl font-semibold text-[#FCD34D]"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    $5.8B
                  </p>
                  <p className="text-[10px] text-white/40 mt-1.5 tracking-wide">
                    Offshore & cross-border structuring 40% of global TAM
                  </p>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Boyar&apos;s Addressable Segment
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Every Boyar service (company formation, trust structures, full structures, banking
                      introductions) sits within the $5.8B offshore & cross-border segment. This is not an adjacent
                      market. This is the core.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Faster Growth Than Domestic
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Cross-border structuring demand is accelerating faster than domestic TCSP services, driven by
                      HNWI mobility, regulatory complexity, and the globalisation of capital flows. Over 60% of
                      multinationals now outsource governance and compliance.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Regulatory Moat for Licensed Operators
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Post-2020 AML/KYC tightening has raised the compliance bar globally. Unlicensed operators are
                      being systematically de-risked by banks and counterparties. Licensed boutiques like Boyar benefit
                      from structurally reduced competition.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Section 4: Boyar Positioning Statement */}
              <motion.div
                className="w-full mt-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }}
                transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="rounded-2xl border border-[#6EE7B7]/[0.12] bg-[#6EE7B7]/[0.03] px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#6EE7B7]/60 font-medium mb-3">
                    Boyar Partners Market Entry Thesis
                  </p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>
                      Boyar Partners enters a <span className="text-white font-medium">$14.5B market</span> where:
                    </p>
                    <div className="space-y-1.5 pl-3">
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>No single player holds more than 7% market share</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>Boutique firms generate 51% of industry revenue</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>The offshore segment ($5.8B) is growing faster than domestic</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>Regulatory barriers protect licensed operators from unlicensed entrants</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>
                          India-based cost structure enables 2–3× margin advantage over Western-domiciled competitors
                        </span>
                      </p>
                    </div>
                    <p className="mt-3 text-white/70">
                      This is not a winner-take-all market. It is a trust-based, relationship-driven industry where a
                      credentialed boutique with the right jurisdictional coverage can build a defensible practice from
                      day one.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {contentView === "apac" && contentVisible && (
            <motion.div
              key="apac-content"
              className="flex flex-col items-center gap-8 pb-16"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showText ? 1 : 0,
                  y: showText ? 0 : 20,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  <span>APAC TCSPs TAM </span>
                  <span className="tabular-nums">
                    {apacAnimatedNumber.toFixed(2)}b USD
                  </span>
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-1">
                  24% of global TAM · Fastest-growing region
                </div>
              </motion.div>

              <TAMPieChart visible={showText} centerLabel="APAC" data={APAC_BREAKDOWN_DATA} />

              {/* Sub-region TAM cards */}
              <div className="flex flex-wrap gap-2.5 self-stretch">
                <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                  <p
                    className="text-lg font-semibold text-[#16a34a]"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    $1.60B
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    East Asia · 46% of APAC TAM
                  </p>
                </div>
                <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                  <p
                    className="text-lg font-semibold text-[#f59e0b]"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    $0.73B
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    Southeast Asia · 21% of APAC TAM
                  </p>
                </div>
                <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                  <p
                    className="text-lg font-semibold text-[#22d3ee]"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    $0.70B
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    South Asia · 20% of APAC TAM
                  </p>
                </div>
                <div className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                  <p
                    className="text-lg font-semibold text-[#a78bfa]"
                    style={{ fontFamily: "var(--font-benzin)" }}
                  >
                    $0.45B
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    Oceania · 13% of APAC TAM
                  </p>
                </div>
              </div>

              {/* Market Growth Insight */}
              <div className="w-full mt-10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  Why APAC is the Fastest-Growing TCSP Region
                </p>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Explosive HNWI Growth
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Asia-Pacific HNWI wealth grew 12.1% in 2021, outpacing every other region. China and India alone
                      are adding ~300,000 new HNWIs per year. Each one is a potential client for cross-border
                      structuring, trust formation, and banking introduction services.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Regulatory Maturation Creates Demand
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Hong Kong&apos;s SFC, Singapore&apos;s MAS, and India&apos;s IFSCA are all tightening compliance
                      requirements, driving demand for licensed TCSP operators. The compliance bar is rising, which
                      eliminates unlicensed competitors and benefits credentialed firms like Boyar.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">
                      Cross-Border Corridor Boom
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      India to UAE, India to Singapore, China to BVI, Australia to Hong Kong. APAC cross-border investment
                      corridors are expanding at 15–20% annually. Each corridor generates demand for company formation,
                      trust structures, and banking access: Boyar&apos;s exact service stack.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-Regional Maturity Map */}
              <div className="w-full mt-10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  Sub-Regional Maturity Map
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      East Asia Mature &amp; Consolidating
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Hong Kong and Singapore are established global TCSP hubs. Tricor, Vistra, and TMF dominate.
                      Market is mature with high competition but also high volume. Growth driven by PE fund services
                      and cross-border M&amp;A support.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                      Southeast Asia Emerging Hotspot
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Singapore is the anchor, but Vietnam, Thailand, and Philippines are rapidly growing. HNWI
                      population expanding 8–10% annually. Digital-first TCSP platforms gaining traction. Regulatory
                      frameworks still developing. Early mover advantage available.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
                      South Asia High Growth, Early Stage
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      India&apos;s GIFT City (IFSCA) is positioning as a global financial services hub. India outbound
                      structuring demand is surging: India to UAE, India to Singapore, India to BVI corridors. Market is
                      early-stage with massive upside. Boyar&apos;s India base is a structural advantage.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
                      Oceania Mature &amp; Stable
                    </p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">
                      Australia and New Zealand have mature corporate governance and superannuation trust markets.
                      Growth is steady at 3–4% CAGR. Market is dominated by domestic players. Cross-border demand
                      primarily flows to Singapore and Hong Kong.
                    </p>
                  </div>
                </div>
              </div>

              {/* APAC Growth Drivers */}
              <div className="w-full mt-10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">
                  APAC Growth Drivers
                </p>
                <div className="space-y-2">
                  {[
                    {
                      label: "HNWI Population Expansion",
                      body:
                        "Asia-Pacific added 1.2M new HNWIs in 2021 alone. Wealth creation in tech, real estate, and manufacturing is driving demand for asset protection and cross-border structuring.",
                    },
                    {
                      label: "Regulatory Tightening",
                      body:
                        "FATF mutual evaluations, MAS licensing reforms, and IFSCA regulations are raising compliance requirements. Licensed TCSPs benefit; unlicensed operators are being de-risked by banking partners.",
                    },
                    {
                      label: "Digital Transformation",
                      body:
                        "55% of APAC TCSPs have adopted digital platforms for entity management and compliance. Tech-enabled boutiques can compete with legacy incumbents on service delivery.",
                    },
                    {
                      label: "Cross-Border Capital Flows",
                      body:
                        "Intra-APAC FDI flows exceeded $600B in 2023. Every cross-border investment generates demand for entity formation, banking, and ongoing corporate services.",
                    },
                    {
                      label: "India as Operating Base Advantage",
                      body:
                        "India-domiciled TCSPs operate at 30–40% of the cost base of Hong Kong or Singapore competitors. Boyar&apos;s India headquarters provides a structural margin advantage while serving the same global client base.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 flex items-start gap-3"
                    >
                      <div className="h-5 w-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] text-white/60 font-medium shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-white/90 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-white/55 leading-[1.6]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boyar APAC Positioning */}
              <div className="w-full">
                <div className="rounded-2xl border border-[#6EE7B7]/[0.12] bg-[#6EE7B7]/[0.03] px-5 py-5 mt-10 mb-16">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#6EE7B7]/60 font-medium mb-3">
                    Boyar Partners APAC Thesis
                  </p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>
                      APAC represents <span className="text-white font-medium">$3.48B</span> of the global TCSP TAM,
                      the fastest-growing region at <span className="text-white font-medium">~8% CAGR</span>.
                    </p>
                    <p>Boyar is positioned at the intersection of three structural advantages:</p>
                    <div className="space-y-1.5 pl-3 mt-2">
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>India-based cost structure (30–40% lower than HK/Singapore competitors)</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>Direct access to the India to UAE, India to Singapore, and India to BVI corridors</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-white/25 mt-px">•</span>
                        <span>Licensed and banking-accepted in a market where compliance is the moat</span>
                      </p>
                    </div>
                    <p className="mt-3 text-white/70">
                      APAC is not just Boyar&apos;s home region: it is the region where a credentialed, cost-efficient
                      boutique has the widest structural advantage over legacy incumbents.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {contentView === "europe" && contentVisible && (
            <motion.div
              key="europe-content"
              className="flex flex-col items-center gap-8 pb-16"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-2">Regional Deep Dive</div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  <span>Europe TCSPs TAM </span>
                  <span className="tabular-nums">{europeAnimatedNumber.toFixed(2)}b USD</span>
                </div>
                <div className="text-xs md:text-sm text-white/50 mt-1">
                  31% of global TAM · The industry&apos;s birthplace · 5.7M HNWIs
                </div>
              </motion.div>

              <TAMPieChart visible={showText} centerLabel="Europe" data={EUROPE_BREAKDOWN_DATA} />

              <div className="flex flex-wrap gap-2.5 self-stretch">
                {EUROPE_SUB_REGIONS.map((r) => (
                  <div key={r.name} className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                    <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-benzin)", color: r.color }}>{r.tam}</p>
                    <p className="mt-1 text-[10px] text-white/40">{r.name} · {r.share} of Europe</p>
                    <p className="mt-1 text-[10px] text-white/35">{r.countries}</p>
                    <p className="mt-1 text-[10px] text-white/45 leading-snug">{r.note}</p>
                  </div>
                ))}
              </div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">The European Paradox. Fewer Millionaires, Richer Ultra-Wealthy</p>
                <div className="flex flex-wrap gap-2.5 mb-4">
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>5.7M</p>
                    <p className="mt-1 text-[10px] text-white/40">Europe HNWIs (Capgemini 2025)</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-[#F87171]" style={{ fontFamily: "var(--font-benzin)" }}>-2.1%</p>
                    <p className="mt-1 text-[10px] text-white/40">HNWI population decline in 2024</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-[#6EE7B7]" style={{ fontFamily: "var(--font-benzin)" }}>+3.5%</p>
                    <p className="mt-1 text-[10px] text-white/40">Ultra-HNWI ($30M+) growth in 2024</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Millionaires Are Leaving, But the Ultra-Rich Are Growing</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">Europe lost 75,000 millionaires in 2024: UK (−14,000), Germany (−41,000), France (−21,000). Economic stagnation and tax migration drove the decline. But ultra-HNWIs ($30M+) grew 3.5%: wealth is concentrating upward. Luxembourg&apos;s HNWI population dropped 7.5%, yet it remains the #2 global fund centre. The paradox: fewer clients, but each remaining client is richer and needs more complex multi-jurisdictional structuring.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Revenue Per Client Is Rising</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">As wealth concentrates among UHNWIs, the average structuring engagement becomes larger and more complex. A millionaire might need a single BVI company. An ultra-HNWI needs a trust, a holding company, a foundation, banking across three jurisdictions, and ongoing compliance across all of them. Fewer clients, higher revenue per mandate. This is structurally favourable for boutique TCSPs that deliver high-touch, bespoke advisory.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">The Great European Wealth Transfer</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">European &apos;old money&apos; families are undertaking generational succession at unprecedented scale. Multi-century family businesses, landed estates, and dynastic wealth require restructuring through trusts, foundations, and corporate vehicles, often across the UK, Switzerland, Luxembourg, and offshore jurisdictions. 81% of inheritors plan to switch advisory firms within 1–2 years of inheritance (Capgemini 2025). Every firm switch is a restructuring event.</p>
                  </div>
                </div>
                <p className="mt-3 text-[9px] text-white/30">Sources: Capgemini World Wealth Report 2025</p>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Europe&apos;s TCSP Hubs</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Hub</th>
                        <th className="px-3 py-2 text-left">Regulator</th>
                        <th className="px-3 py-2 text-left">Specialty</th>
                        <th className="px-3 py-2 text-left">Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EUROPE_HUBS.map((row, idx) => (
                        <tr key={row.hub} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.hub}</td>
                          <td className="px-3 py-2">{row.regulator}</td>
                          <td className="px-3 py-2">{row.specialty}</td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${
                                row.maturity === "Dominant" ? "bg-[#003399]" :
                                row.maturity === "Mature" ? "bg-[#6EE7B7]" :
                                row.maturity === "Growing" ? "bg-[#FCD34D]" : "bg-[#f59e0b]"
                              }`} />
                              {row.maturity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-[11px] font-semibold text-white/90 mb-1.5">In Perspective</p>
                  <div className="space-y-1.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>Luxembourg has a population of 660,000, smaller than Austin, Texas, yet it is the world&apos;s #2 investment fund centre.</p>
                    <p>Jersey is 50 square miles with 108,000 residents. It administers £1.4 trillion in funds.</p>
                    <p>A FINMA-licensed Swiss trustee in Geneva can administer trusts under BVI, Jersey, New Zealand, Singapore, or Bahamas law: jurisdiction-agnostic from a single desk.</p>
                    <p>Post-Brexit, UK fund managers have moved domicile to Ireland and Luxembourg while keeping operations in London, creating dual-structure TCSP demand that didn&apos;t exist before 2021.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Regulatory Shift. EU AMLA</p>
                <div className="rounded-xl border border-[#003399]/[0.15] bg-[#003399]/[0.05] px-5 py-4 mb-4">
                  <p className="text-[11px] font-semibold text-white/90 mb-2">Europe&apos;s Biggest AML Overhaul in a Decade</p>
                  <p className="text-[11px] text-white/55 leading-[1.6]">The EU Anti-Money Laundering Authority (AMLA) commenced operations in Frankfurt on 1 July 2025 with ~430 staff. For the first time, the EU has a single, directly applicable AML regulation replacing all five previous directives. AMLA can impose fines up to 10% of annual turnover or €10 million. Cash transactions above €10,000 are banned across all member states. Obliged entities now include crypto-asset service providers, crowdfunding platforms, and even professional football clubs.</p>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Compliance Cost Is Rising. TCSPs Benefit</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">The new Single Rulebook (Regulation 2024/1624) applies directly across all EU member states, eliminating the fragmented national transpositions that created loopholes. For every business operating cross-border in Europe, compliance costs are rising. This drives outsourcing to specialist TCSPs who can absorb compliance at scale. An estimated 1% of the EU&apos;s annual GDP is involved in suspicious financial activity: the compliance opportunity is enormous.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Licensed Operators Win, Unlicensed Operators Exit</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">AMLA will directly supervise the highest-risk cross-border financial institutions starting 2028. National regulators are already tightening enforcement in anticipation. Banks are de-risking intermediaries who cannot demonstrate full AML/KYC compliance. Licensed TCSPs with robust compliance infrastructure are inheriting clients from departing unlicensed operators, exactly the pattern already seen in APAC.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Post-Brexit Creates Dual-Jurisdiction Demand</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">The UK&apos;s departure from the EU passport system has split what was a single structuring decision into two. Fund managers now need an EU-domiciled vehicle (Luxembourg or Ireland) AND a UK operational base. Companies serving European clients need EU substance alongside UK operations. Every dual-jurisdiction requirement generates incremental demand for company formation, corporate administration, and compliance services.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Competitive Landscape. Europe&apos;s Incumbents</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Firm</th>
                        <th className="px-3 py-2 text-left">HQ</th>
                        <th className="px-3 py-2 text-left">Revenue</th>
                        <th className="px-3 py-2 text-left">Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EUROPE_COMPETITORS.map((row, idx) => (
                        <tr key={row.name} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.name}</td>
                          <td className="px-3 py-2">{row.hq}</td>
                          <td className="px-3 py-2 text-[#93C5FD] font-medium">{row.revenue}</td>
                          <td className="px-3 py-2">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-[#003399]/[0.12] bg-[#003399]/[0.03] px-4 py-3">
                  <p className="text-[11px] font-semibold text-white/90 mb-1">Europe&apos;s Role in Boyar&apos;s Model</p>
                  <p className="text-[11px] text-white/55 leading-[1.6]">Europe is the most mature and competitive TCSP market in the world. TMF Group alone generates €907M from its European base. For Boyar, Europe is primarily a <span className="text-white/80">structuring destination</span>, not an initial client source. Boyar&apos;s clients from APAC and MENA structure entities in Cyprus, Malta, UK, and BVI through Boyar&apos;s 40+ jurisdiction network. European regulatory tightening (AMLA) benefits all licensed TCSPs globally by raising the compliance floor. Future expansion into serving European HNWIs structuring into APAC represents a natural second-phase corridor.</p>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">What Is Driving European TCSP Demand</p>
                <div className="space-y-2">
                  {[
                    { label: "AMLA Regulatory Harmonisation", body: "For the first time, a single EU AML regulation replaces five directives. Compliance is no longer optional or subject to national interpretation. Every cross-border financial entity in Europe must upgrade its AML/KYC infrastructure. This drives outsourcing to specialist TCSPs and raises the barrier to entry for non-compliant operators." },
                    { label: "Post-Brexit Dual-Jurisdiction Structuring", body: "UK fund managers have migrated domicile to Ireland and Luxembourg while retaining London operations. Companies serving EU clients need substance in both jurisdictions. This structural split has created an entirely new layer of TCSP demand that didn't exist before 2021: entity formation, directors, registered offices, and compliance in two jurisdictions instead of one." },
                    { label: "UHNWI Wealth Concentration", body: "Europe lost 75,000 millionaires in 2024 but gained ultra-HNWIs ($30M+) at 3.5% growth. Wealth is concentrating upward, and ultra-rich clients require more complex, multi-entity, multi-jurisdiction structures. Revenue per TCSP client is rising even as client count contracts." },
                    { label: "Cyprus & Malta: The EU's Emerging Structuring Hubs", body: "Cyprus (12.5% corporate tax, 65+ double tax treaties, EU passport) and Malta (flexible AIF regimes, cost-effective fund administration) are capturing structuring demand that previously defaulted to Luxembourg. For APAC and MENA clients structuring into the EU, Cyprus and Malta offer compelling entry points; both are in Boyar's active jurisdiction network." },
                    { label: "European Old Money Succession", body: "Multi-century family businesses, landed estates, and dynastic wealth across Europe are undertaking generational transfer. These families need trust structures, foundations, holding companies, and succession vehicles, often spanning the UK, Switzerland, and multiple EU jurisdictions. Each succession event generates multi-year TCSP revenue." },
                    { label: "Crown Dependencies Competing for Private Funds", body: "Jersey and Guernsey are actively competing for the private funds market in 2025, introducing new vehicle structures and regulatory innovations. This jurisdictional competition creates choice for fund managers and generates advisory demand for TCSPs who can guide managers to the optimal domicile and structure." },
                  ].map((item, index) => (
                    <div key={item.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] text-white/60 font-medium shrink-0 mt-0.5">{index + 1}</div>
                      <div>
                        <p className="text-[11px] font-semibold text-white/90 mb-0.5">{item.label}</p>
                        <p className="text-[11px] text-white/55 leading-[1.6]">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="w-full">
                <div className="rounded-2xl border border-[#003399]/[0.15] bg-[#003399]/[0.04] px-5 py-5 mt-10 mb-16">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#93C5FD]/60 font-medium mb-3">Boyar Partners Europe Thesis</p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>Europe represents <span className="text-white font-medium">$4.50B</span> of the global TCSP TAM, the industry&apos;s most mature market, home to <span className="text-white font-medium">5.7 million HNWIs</span>, and the birthplace of the modern TCSP model.</p>
                    <p>For Boyar, Europe operates on two levels:</p>
                    <div className="space-y-1.5 pl-3 mt-2">
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Structuring destination:</span> Cyprus, Malta, UK, and BVI are active jurisdictions in Boyar&apos;s network, used by APAC and MENA clients structuring into or through Europe</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Regulatory tailwind:</span> AMLA&apos;s harmonisation raises the global compliance floor, benefiting all licensed TCSPs including Boyar, even those not domiciled in Europe</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Referral corridor:</span> European TCSPs (Trident, JTC, Ocorian) serving clients who need APAC structuring have no boutique cross-border partner in India; Boyar fills this gap</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Phase-2 expansion:</span> European HNWIs structuring into APAC represent a natural future client segment as Boyar builds track record and jurisdictional credibility</span></p>
                    </div>
                    <p className="mt-3 text-white/70">Europe is the TCSP industry&apos;s centre of gravity. Boyar does not need to compete head-on with TMF or Intertrust in their home market. It needs to be a credible structuring partner for European jurisdictions (which it already is across 40+ jurisdictions) and a visible referral destination for European TCSPs whose clients need APAC and cross-border capability.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {contentView === "northamerica" && contentVisible && (
            <motion.div
              key="na-content"
              className="flex flex-col items-center gap-8 pb-16"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-2">Regional Deep Dive</div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  <span>North America TCSPs TAM </span>
                  <span className="tabular-nums">{naAnimatedNumber.toFixed(2)}b USD</span>
                </div>
                <div className="text-xs md:text-sm text-white/50 mt-1">
                  34% of global TAM · Largest regional market · 8.4M HNWIs
                </div>
              </motion.div>

              <TAMPieChart visible={showText} centerLabel="N. America" data={NA_BREAKDOWN_DATA} />

              <div className="flex flex-wrap gap-2.5 self-stretch">
                {NA_SUB_REGIONS.map((r) => (
                  <div key={r.name} className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                    <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-benzin)", color: r.color }}>{r.tam}</p>
                    <p className="mt-1 text-[10px] text-white/40">{r.name} · {r.share} of N. America</p>
                    <p className="mt-1 text-[10px] text-white/35">{r.countries}</p>
                    <p className="mt-1 text-[10px] text-white/45 leading-snug">{r.note}</p>
                  </div>
                ))}
              </div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">The World&apos;s Largest Wealth Concentration</p>
                <div className="flex flex-wrap gap-2.5 mb-4">
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>8.4M</p>
                    <p className="mt-1 text-[10px] text-white/40">North America HNWIs, 36% of global total (Capgemini 2025)</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-[#6EE7B7]" style={{ fontFamily: "var(--font-benzin)" }}>+7.3%</p>
                    <p className="mt-1 text-[10px] text-white/40">NA HNWI population growth in 2024, highest globally</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-[#FCA5A5]" style={{ fontFamily: "var(--font-benzin)" }}>7.9M</p>
                    <p className="mt-1 text-[10px] text-white/40">US millionaires alone (added 562,000 in one year)</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">The US Added More Millionaires in One Year Than Most Countries Have Total</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">The US HNWI population grew 7.6% in 2024, adding 562,000 new millionaires to reach 7.9 million, more than the entire HNWI populations of APAC and Europe combined. A favourable interest rate environment, strong equity returns (S&P 500 up ~24% in 2024), and AI-driven portfolio gains fuelled the expansion. The US now commands 34% of global liquid private wealth, 36% of the world&apos;s millionaire population, and 33% of its billionaires.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Alternative Investments Are Now Mainstream for HNWIs</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">As of January 2025, HNWIs allocate 15% of their portfolios to alternative investments including private equity, hedge funds, and crypto assets (Capgemini 2025). 61% of millennial and Gen Z HNWIs are actively allocating to alternatives. US Bitcoin ETFs alone saw $29.4B in inflows by August 2025. Each alternative investment vehicle requires entity structuring, fund administration, and compliance: core TCSP services.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">The $83.5 Trillion Transfer Hits America Hardest</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">North America holds the largest share of global wealth transferring to next-gen heirs. 30% of HNWIs will receive an inheritance by end of 2030, 63% by 2035, and 84% by 2040. 81% of inheritors plan to switch advisory firms within 1–2 years. In a market with 7.9M millionaires, that&apos;s potentially millions of restructuring events, each requiring entity formation, trust creation, and compliance review.</p>
                  </div>
                </div>
                <p className="mt-3 text-[9px] text-white/30">Sources: Capgemini World Wealth Report 2025, USA Wealth Report 2025 (Henley & Partners)</p>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Key Structuring Jurisdictions</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Jurisdiction</th>
                        <th className="px-3 py-2 text-left">Specialty</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NA_KEY_JURISDICTIONS.map((row, idx) => (
                        <tr key={row.jurisdiction} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.jurisdiction}</td>
                          <td className="px-3 py-2">{row.specialty}</td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${
                                row.status === "Dominant" ? "bg-[#B31942]" :
                                row.status === "Rising" ? "bg-[#6EE7B7]" : "bg-[#FCD34D]"
                              }`} />
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-[11px] font-semibold text-white/90 mb-1.5">In Perspective</p>
                  <div className="space-y-1.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>Delaware hosts 1.8 million business entities, more than its own population of 1 million. 66% of Fortune 500 companies are incorporated there.</p>
                    <p>Wyoming ranks #1 in the Tax Foundation&apos;s 2025 State Tax Competitiveness Index. Its &quot;Cowboy Cocktail&quot; (anonymous LLCs + trusts) is a term of art in asset protection circles. Annual LLC maintenance: $60.</p>
                    <p>The Cayman Islands (population 68,000) administers $4.97 trillion in fund net asset value, more than the GDP of Germany.</p>
                    <p>South Dakota granted 8 new special-purpose trust charters to digital asset custodians in 2024 alone.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Regulatory Earthquake. Corporate Transparency Act Gutted</p>
                <div className="rounded-xl border border-[#B31942]/[0.15] bg-[#B31942]/[0.05] px-5 py-4 mb-4">
                  <p className="text-[11px] font-semibold text-white/90 mb-2">The US Just Reversed Its Own Transparency Rules</p>
                  <p className="text-[11px] text-white/55 leading-[1.6]">On March 26, 2025, FinCEN issued an interim final rule exempting ALL US-created entities and US persons from beneficial ownership reporting under the Corporate Transparency Act. The rule, which was originally estimated to cost businesses $21.7 billion in compliance, now applies only to foreign entities registered in the US. Over 99% of previously covered entities are now exempt. US Treasury Secretary Scott Bessent called it &quot;a victory for common sense.&quot;</p>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">What This Means for the Global TCSP Market</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">While the EU is tightening AML with AMLA (fines up to 10% of turnover), the US has moved in the opposite direction, rolling back transparency requirements for domestic entities. This creates a regulatory divergence that will reshape cross-border structuring flows. US jurisdictions like Delaware and Wyoming are now comparatively more private than their European counterparts. Expect increased demand for US entity formation from international clients seeking privacy-friendly structures.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Foreign Entities Still Must Report</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">The CTA exemption applies only to US-created entities. Foreign companies registered to do business in the US must still file beneficial ownership reports, but they no longer need to report US persons as beneficial owners. This asymmetry creates a two-tier system: US-formed entities have near-complete privacy, while foreign-formed entities face ongoing disclosure. For Boyar&apos;s international clients forming US entities, this is a significant structuring advantage.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">The SEC Is Compensating with Enforcement</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">While FinCEN retreats on transparency, the SEC is intensifying enforcement. The SEC initiated 46 separate enforcement actions against crypto entities in 2024. US asset managers filed 30+ new crypto-ETF applications in early 2025, all requiring compliant structuring and administration. The regulatory environment is not relaxing: it&apos;s bifurcating (less disclosure, more enforcement). TCSPs that can navigate both sides win.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Competitive Landscape. North America&apos;s Incumbents</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Firm</th>
                        <th className="px-3 py-2 text-left">HQ</th>
                        <th className="px-3 py-2 text-left">Revenue</th>
                        <th className="px-3 py-2 text-left">Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NA_COMPETITORS.map((row, idx) => (
                        <tr key={row.name} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.name}</td>
                          <td className="px-3 py-2">{row.hq}</td>
                          <td className="px-3 py-2 text-[#FCA5A5] font-medium">{row.revenue}</td>
                          <td className="px-3 py-2">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-[#B31942]/[0.12] bg-[#B31942]/[0.03] px-4 py-3">
                  <p className="text-[11px] font-semibold text-white/90 mb-1">North America&apos;s TCSP Model Is Different</p>
                  <p className="text-[11px] text-white/55 leading-[1.6]">Unlike Europe and APAC, North America&apos;s TCSP market is dominated by bank-owned trust companies (Wilmington Trust, Northern Trust) and legal infrastructure providers (CSC, CT Corporation) rather than independent boutiques. The market is structurally oriented toward domestic entity management and domestic trust administration, not cross-border structuring. International clients forming US entities (Delaware LLCs, Wyoming trusts, BVI holding companies) typically work through offshore TCSPs, not US domestic providers. This is Boyar&apos;s corridor: serving APAC and MENA clients who need US and Caribbean entity structures as part of a multi-jurisdictional package.</p>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">What Is Driving North America TCSP Demand</p>
                <div className="space-y-2">
                  {[
                    { label: "Millionaire Population Explosion", body: "The US added 562,000 new millionaires in a single year (2024). North America's HNWI population grew 7.3%, the highest of any region globally. Every new HNWI entering sophisticated wealth management generates demand for entity structuring, trust formation, and tax-efficient corporate vehicles." },
                    { label: "CTA Rollback Creates Privacy Arbitrage", body: "The March 2025 CTA reversal means US-formed entities no longer require beneficial ownership disclosure to FinCEN. While Europe tightens with AMLA, the US is loosening. International clients seeking privacy-friendly structuring now have a stronger case for US entity formation, particularly in Wyoming ($60/year, anonymous LLCs) and South Dakota (dynasty trusts, no perpetuities rule)." },
                    { label: "Alternative Investment Vehicle Boom", body: "US Bitcoin ETFs saw $29.4B in inflows by August 2025. The SEC was reviewing 92 crypto-ETF applications in 2025. BlackRock's tokenized fund (BUIDL) accumulated nearly $2B shortly after its 2024 launch. Each regulated investment product requires entity structuring, fund administration, and compliance services. The tokenisation of real-world assets, over 200 active institutional projects, is creating entirely new TCSP demand verticals." },
                    { label: "Wyoming and South Dakota: The New Offshore", body: "Wyoming and South Dakota are functionally becoming America's onshore-offshore jurisdictions. Wyoming offers anonymous LLCs, Statutory Foundations (trust-LLC hybrids), and the lowest business tax climate in the US. South Dakota offers dynasty trusts with no rule against perpetuities and no state income tax. 8 new digital asset trust charters were granted in South Dakota in 2024 alone. These states are attracting international structuring demand that previously went to Caribbean jurisdictions." },
                    { label: "Cross-Border M&A Resurgence", body: "Cross-border transactions accounted for over 32% of global M&A volume in Q1 2025, up from 26% a year earlier (J.P. Morgan). Asian and Middle Eastern buyers are once again active in outbound US acquisitions. Every inbound cross-border deal requires US holding structure setup, banking, compliance, and ongoing corporate administration." },
                    { label: "Caribbean Offshore Centres Remain Indispensable", body: "BVI hosts 400,000+ active companies. Cayman administers $4.97 trillion in fund NAV. Despite global transparency pushes, Caribbean centres remain the backbone of international fund structuring, PE vehicles, and holding company architecture. For Boyar's clients structuring through BVI and Cayman, North America is not just a market: it is an interconnected structuring ecosystem." },
                  ].map((item, index) => (
                    <div key={item.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] text-white/60 font-medium shrink-0 mt-0.5">{index + 1}</div>
                      <div>
                        <p className="text-[11px] font-semibold text-white/90 mb-0.5">{item.label}</p>
                        <p className="text-[11px] text-white/55 leading-[1.6]">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="w-full">
                <div className="rounded-2xl border border-[#B31942]/[0.15] bg-[#B31942]/[0.04] px-5 py-5 mt-10 mb-16">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#FCA5A5]/60 font-medium mb-3">Boyar Partners North America Thesis</p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>North America represents <span className="text-white font-medium">$4.93B</span> of the global TCSP TAM, the largest regional market, home to <span className="text-white font-medium">8.4 million HNWIs</span>, and the jurisdiction where privacy rules just shifted dramatically in favour of entity formation.</p>
                    <p>For Boyar, North America operates as a structuring destination and an interconnected ecosystem:</p>
                    <div className="space-y-1.5 pl-3 mt-2">
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Entity formation corridor:</span> Delaware LLCs, Wyoming anonymous structures, and BVI/Cayman holding companies are standard components of Boyar&apos;s multi-jurisdictional service packages for APAC and MENA clients</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Privacy arbitrage opportunity:</span> The CTA rollback makes US entities comparatively more private than European alternatives, a structuring advantage Boyar can offer clients choosing between US and EU jurisdictions</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Caribbean integration:</span> BVI and Cayman are core jurisdictions in Boyar&apos;s 40+ network, used daily for fund structures, holding companies, and asset protection vehicles for international clients</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Domestic market is not the play:</span> The US domestic TCSP market is dominated by bank-owned trust companies and legal infrastructure giants. Boyar&apos;s value is cross-border: serving international clients who need US and Caribbean structures as part of a global package, not competing with CSC for Delaware registered agent business</span></p>
                    </div>
                    <p className="mt-3 text-white/70">North America is the world&apos;s largest wealth pool and the world&apos;s most active structuring ecosystem. Boyar does not need to win market share from CSC or Wilmington Trust. It needs to be the cross-border bridge that connects APAC and MENA capital to North American and Caribbean structures, a corridor no US domestic incumbent serves.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {contentView === "restofworld" && contentVisible && (
            <motion.div
              key="row-content"
              className="flex flex-col items-center gap-8 pb-16"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-2">Regional Deep Dive</div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  <span>Rest of World TCSPs TAM </span>
                  <span className="tabular-nums">{rowAnimatedNumber.toFixed(2)}b USD</span>
                </div>
                <div className="text-xs md:text-sm text-white/50 mt-1">
                  11% of global TAM · MENA + South America + Africa · Frontier growth markets
                </div>
              </motion.div>

              <TAMPieChart visible={showText} centerLabel="RoW" data={ROW_BREAKDOWN_DATA} />

              <div className="flex flex-wrap gap-2.5 self-stretch">
                {ROW_SUB_REGIONS.map((r) => (
                  <div key={r.name} className="flex-1 min-w-[130px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3">
                    <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-benzin)", color: r.color }}>{r.tam}</p>
                    <p className="mt-1 text-[10px] text-white/40">{r.name} · {r.share} of RoW</p>
                    <p className="mt-1 text-[10px] text-white/35">{r.countries}</p>
                    <p className="mt-1 text-[10px] text-white/45 leading-snug">{r.note}</p>
                  </div>
                ))}
              </div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">MENA. Where Wealth Is Moving</p>
                <div className="flex flex-wrap gap-2.5 mb-4">
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-benzin)", color: "#b48c64" }}>$1.2T</p>
                    <p className="mt-1 text-[10px] text-white/40">Wealth managed by top 120 families in DIFC alone</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-benzin)" }}>200</p>
                    <p className="mt-1 text-[10px] text-white/40">New family offices set up in DIFC in 2024 (33% YoY growth)</p>
                  </div>
                  <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xl font-semibold text-[#6EE7B7]" style={{ fontFamily: "var(--font-benzin)" }}>+110%</p>
                    <p className="mt-1 text-[10px] text-white/40">Growth in UAE $100M+ residents over the past decade (Knight Frank)</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Dubai Is No Longer Just a Tax Haven. It&apos;s a Structuring Capital</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">DIFC revenue hit AED 1.78B ($484M) in 2024, up 37% from the previous year. Family-owned businesses in DIFC grew from 600 to 800 (33% rise). Foundation structures surged 51% to 671. State Street, Edmond de Rothschild, BlueCrest, and Tudor Capital all registered in DIFC in 2024. Dubai now hosts 81,000+ resident millionaires, projected to add 7,100 more in 2025. This is not a tax play anymore: it&apos;s an institutional ecosystem.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">The UAE&apos;s Legal Revolution</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">Dubai Law No. 2 of 2025 gives DIFC Courts jurisdiction over non-Muslim inheritance, a historic change. The Federal Trust Law (2023), Federal Personal Status Law (2024), and Family Business Law (2022) have created a modern codified framework for wealth structuring in under three years. DIFC Foundations now offer tax exemptions for passive holding companies. UAE imposes no personal income tax, no capital gains tax, and no inheritance tax.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Saudi Vision 2030 Creates Corporate Structuring Demand</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">Saudi Arabia&apos;s $1 trillion+ diversification programme (NEOM, Red Sea, Qiddiya) requires multinational corporates to establish Regional Headquarters in-Kingdom. This RHQ mandate is generating unprecedented demand for company formation, corporate governance, and cross-border structuring services across the GCC.</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-1">Indian Diaspora in the Gulf: Boyar&apos;s Natural Client Base</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">The UAE&apos;s largest expatriate community is Indian. Indian-origin families in Dubai are professionalising their wealth structures, many for the first time. ASK Wealth Advisors established a DIFC presence in 2025, noting that Indian families &quot;don&apos;t just want products, they want holistic guidance on how to live, invest, and grow globally.&quot; The India to UAE corridor is Boyar&apos;s highest-affinity cross-border flow.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">South America & Africa. Frontier Markets</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#14b8a6]/[0.12] bg-[#14b8a6]/[0.03] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-2">South America ($0.43B)</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">Latin America&apos;s HNWI population declined 8.5% in 2024 (Capgemini), hit by currency depreciation (Brazil −13.3%, Mexico −13.5%). But LatAm HNWIs are among the most active users of offshore structuring globally. Swiss TCSPs in Geneva specialise in serving Latin American clients; Trident Trust Geneva explicitly cites LatAm as its core market. BVI, Cayman, and Panama remain the default structuring jurisdictions. For Boyar, LatAm is a future corridor, reachable through partnership with European TCSPs who already serve these clients from Geneva, London, and Madrid.</p>
                  </div>
                  <div className="rounded-xl border border-[#a78bfa]/[0.12] bg-[#a78bfa]/[0.03] px-4 py-3">
                    <p className="text-[11px] font-semibold text-white/90 mb-2">Africa ($0.29B)</p>
                    <p className="text-[11px] text-white/55 leading-[1.6]">Mauritius is the India to Africa financial bridge. Historically, 54% of India&apos;s FDI was routed through Mauritius. Fund managers use Mauritius as a cost-effective domicile for Africa-focused funds and as a back-office hub administering funds domiciled in Cayman, Singapore, and the UK. South Africa&apos;s HNWI community uses Jersey, Guernsey, and Mauritius for emigration trusts and offshore asset protection. Kenya and Nigeria are emerging as corporate services markets as African PE grows. For Boyar, Mauritius, already in its jurisdiction network, is the entry point to the Africa corridor.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Active Cross-Border Corridors</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Origin</th>
                        <th className="px-3 py-2 text-left">Destination</th>
                        <th className="px-3 py-2 text-left">Structuring Demand</th>
                        <th className="px-3 py-2 text-left">Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROW_CORRIDORS.map((row, idx) => (
                        <tr key={`${row.from}-${row.to}`} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.from}</td>
                          <td className="px-3 py-2">{row.to}</td>
                          <td className="px-3 py-2">{row.flow}</td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full shrink-0 ${row.growth === "High" ? "bg-[#6EE7B7]" : "bg-[#FCD34D]"}`} />
                              {row.growth}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">MENA Structuring Hubs</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                  <table className="w-full border-collapse text-[10px]">
                    <thead className="bg-white/[0.03]">
                      <tr className="text-white/40 font-medium uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Hub</th>
                        <th className="px-3 py-2 text-left">Regulator</th>
                        <th className="px-3 py-2 text-left">Specialty</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MENA_HUBS.map((row, idx) => (
                        <tr key={row.hub} className={`text-white/55 ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-3 py-2">{row.hub}</td>
                          <td className="px-3 py-2">{row.regulator}</td>
                          <td className="px-3 py-2">{row.specialty}</td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${
                                row.status === "Dominant" ? "bg-[#b48c64]" :
                                row.status === "Rising" ? "bg-[#6EE7B7]" :
                                row.status === "Growing" ? "bg-[#FCD34D]" :
                                row.status === "Emerging" ? "bg-[#f59e0b]" : "bg-[#64748b]"
                              }`} />
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-[11px] font-semibold text-white/90 mb-1.5">In Perspective</p>
                  <div className="space-y-1.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>DIFC&apos;s top 120 families and HNWIs manage over $1.2 trillion in wealth, from a single financial centre in a city that barely existed 50 years ago.</p>
                    <p>Dubai hosts 75% of the region&apos;s family offices. One-quarter of MENA family offices were established in just the last five years (HSBC 2024).</p>
                    <p>Forbes Middle East counts 38 billionaires across 8 MENA countries in 2025 with $128.4B combined net worth, more than double the 2024 figure.</p>
                    <p>Mauritius has a population of 1.3 million but generates over 10% of its GDP from its financial services sector. It is the primary conduit for capital flows between India and Africa.</p>
                    <p>Trident Trust has operated in Dubai since 2006 and won the WealthBriefing MENA 2025 award for Succession & Estate Planning. Boutique TCSPs are not just present in this market; they are winning.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">What Is Driving Growth in These Markets</p>
                <div className="space-y-2">
                  {[
                    { label: "DIFC & ADGM: Institutional Momentum", body: "DIFC registered 120+ AI-licensed companies in 6 months, attracted Edmond de Rothschild, State Street, and Tudor Capital in 2024 alone, and saw its operating profit surge 55% to AED 1.33B. ADGM is emerging as a credible alternative with common-law jurisdiction. Together they are transforming the UAE from a wealth booking centre into a full structuring ecosystem with trust, foundation, fund, and corporate vehicle capabilities." },
                    { label: "Saudi Arabia's Forced Regionalisation", body: "The RHQ mandate requires multinationals to establish Saudi-based regional headquarters to retain government contracts. This single regulatory decision is generating mass demand for company formation, substance requirements, directors, corporate secretarial services, and cross-border compliance: classic TCSP services at scale." },
                    { label: "GCC Family Office Professionalisation", body: "58% of MENA family groups are active in venture capital (Campden Wealth/HSBC). The younger generation is driving tech-forward investment strategies. As families shift from informal wealth management to institutional structures, they need foundations, trusts, SPVs, and multi-jurisdictional governance: services that TCSPs provide." },
                    { label: "Latin American Wealth Protection Demand", body: "Despite HNWI population decline, Latin American HNWIs are among the most offshore-active globally. Political instability, currency volatility, and fiscal uncertainty in Brazil, Argentina, and Mexico drive persistent demand for offshore asset protection structures through BVI, Cayman, Panama, and Swiss-administered trusts. Demand is structural, not cyclical." },
                    { label: "Mauritius: The India to Africa Bridge", body: "Mauritius offers investors the advantages of an offshore financial centre with a convenient time zone, OECD compliance, and a substantial network of double taxation agreements. Fund managers increasingly use Mauritius as a back-office solution for servicing funds domiciled in Cayman, Singapore, or the UK. As African PE grows, Mauritius's role as the continental gateway expands." },
                    { label: "Regulatory Convergence Creates Cross-Border Demand", body: "Sharia-compliant structuring, UAE foundation law reforms, and Saudi economic substance requirements are all creating new structuring demand that requires cross-border TCSP expertise. Jersey Finance's 2025 roundtable series across the GCC confirmed that cross-border investment and wealth governance are the dominant themes for regional families. The convergence of Islamic finance with common-law trust structures is a structuring niche that few boutique TCSPs address." },
                  ].map((item, index) => (
                    <div key={item.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] text-white/60 font-medium shrink-0 mt-0.5">{index + 1}</div>
                      <div>
                        <p className="text-[11px] font-semibold text-white/90 mb-0.5">{item.label}</p>
                        <p className="text-[11px] text-white/55 leading-[1.6]">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="w-full">
                <div className="rounded-2xl border border-[#D4A574]/[0.15] bg-[#D4A574]/[0.04] px-5 py-5 mt-10 mb-16">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4A574]/70 font-medium mb-3">Boyar Partners. MENA, LatAm & Africa Thesis</p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>The remaining <span className="text-white font-medium">$1.59B</span> of global TCSP TAM spans the world&apos;s most dynamic frontier markets, where wealth is being created faster than structuring infrastructure can absorb it.</p>
                    <p>Boyar&apos;s positioning across these markets:</p>
                    <div className="space-y-1.5 pl-3 mt-2">
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">MENA is Boyar&apos;s primary secondary market.</span> The India to UAE corridor is the firm&apos;s highest-affinity cross-border flow. Indian-origin HNWIs in Dubai are Boyar&apos;s natural client profile: entrepreneurs and family businesses professionalising cross-border structures for the first time.</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">UAE structuring jurisdictions (DIFC, ADGM, RAK) are active in Boyar&apos;s 40+ jurisdiction network.</span> Foundation structures, free zone companies, and banking introductions across 140+ institutions include UAE coverage.</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Mauritius connects Boyar to Africa.</span> Already in the jurisdiction network, Mauritius enables Boyar to serve India to Africa structuring demand: fund vehicles, holding companies, and DFI-backed structures.</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span><span className="text-white/80">Latin America is a future corridor</span> reachable through referral partnerships with European TCSPs (Trident Geneva, JTC) who already serve LatAm clients and need APAC structuring capability as a reciprocal service.</span></p>
                    </div>
                    <p className="mt-3 text-white/70">These are not mature markets where Boyar competes against entrenched incumbents. They are frontier markets where structuring demand is outpacing supply, and where a licensed, cross-border boutique with the right jurisdictional coverage arrives not as a challenger, but as a missing piece of the ecosystem.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {contentView === "competitive" && contentVisible && (
            <motion.div
              key="competitive-content"
              className="flex flex-col items-center gap-8 pb-16"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-2">Strategic Analysis</div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                  Competitive Positioning
                </div>
                <div className="text-xs md:text-sm text-white/50 mt-1">
                  Where Boyar sits in a $14.5B market, and why it doesn&apos;t compete with anyone
                </div>
              </motion.div>

              <motion.div className="w-full mt-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-3">Market Structure. Four Tiers of TCSP Operators</p>
                <div className="space-y-3">
                  {COMPETITIVE_TIERS.map((tier, i) => (
                    <motion.div
                      key={tier.tier}
                      className="rounded-xl bg-white/[0.04] overflow-hidden"
                      style={{ borderLeft: `3px solid ${tier.color}` }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                      <div className="px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: tier.color }}>{tier.tier}</span>
                            <span className="text-[11px] font-semibold text-white/90">{tier.label}</span>
                          </div>
                          <span className="text-[10px] text-white/35">{tier.revenue}</span>
                        </div>
                        <p className="text-[10px] text-white/40 mb-2">{tier.firms}</p>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">Strength</p>
                            <p className="text-[10px] text-white/55 leading-[1.5]">{tier.strength}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">Limitation</p>
                            <p className="text-[10px] text-white/55 leading-[1.5]">{tier.weakness}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06]">
                          <span className={`text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full shrink-0 ${
                            tier.boyarRelation === "referral" ? "bg-blue-500/10 text-blue-300" :
                            tier.boyarRelation === "partner" ? "bg-emerald-500/10 text-emerald-300" :
                            tier.boyarRelation === "irrelevant" ? "bg-white/[0.06] text-white/30" :
                            "bg-purple-500/10 text-purple-300"
                          }`}>
                            {tier.boyarRelation === "referral" ? "Referral Source" :
                             tier.boyarRelation === "partner" ? "Natural Partner" :
                             tier.boyarRelation === "irrelevant" ? "No Overlap" :
                             "Execution Partner"}
                          </span>
                          <p className="text-[10px] text-white/45 leading-[1.5] flex-1">{tier.boyarNote}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">The Gap No One Occupies</p>
                <div className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-5 py-4">
                  <p className="text-[11px] text-white/70 leading-[1.7]">The TCSP market has a structural gap between <span className="text-white/90 font-medium">Tier 2</span> (mid-size specialists with Western cost bases and limited India/APAC corridor access) and <span className="text-white/90 font-medium">Tier 4</span> (local boutiques with deep single-jurisdiction expertise but zero cross-border capability).</p>
                  <p className="text-[11px] text-white/70 leading-[1.7] mt-2">An HNWI in Mumbai who needs a BVI holding company, a Singapore subsidiary, banking introductions across three jurisdictions, and a trust structure for succession planning has three bad options today:</p>
                  <div className="space-y-1.5 pl-3 mt-2 text-[11px] text-white/55 leading-[1.6]">
                    <p className="flex items-start gap-2"><span className="text-white/25 mt-px">1.</span><span>Engage TMF or Vistra: pay institutional rates ($50K+), wait months, get assigned a junior associate who has never been to India</span></p>
                    <p className="flex items-start gap-2"><span className="text-white/25 mt-px">2.</span><span>Go to Osome for a Singapore formation: get a $800 company but no trust, no banking, no BVI, no advisory, no cross-border coordination</span></p>
                    <p className="flex items-start gap-2"><span className="text-white/25 mt-px">3.</span><span>Contact three separate local boutiques in BVI, Singapore, and Jersey: coordinate everything yourself, with no single accountable advisor</span></p>
                  </div>
                  <p className="text-[11px] text-white/90 leading-[1.7] mt-3 font-medium">Boyar is option four: a single licensed cross-border boutique that delivers the full structure at boutique pricing, coordinated by an advisor who understands the India corridor natively.</p>
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">Five Structural Differentiators</p>
                <div className="space-y-2">
                  {BOYAR_POSITIONING.differentiators.map((d, i) => (
                    <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 flex items-start gap-3">
                      <span className="h-6 w-6 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] text-white/50 font-semibold shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-[11px] text-white/90 font-medium">{d.point}</p>
                        <p className="text-[10px] text-white/45 mt-0.5">{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="w-full mt-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium mb-4">What This Means for Revenue</p>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-4">
                  <div className="grid grid-cols-3 gap-3 text-center mb-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/30">Tech Platform</p>
                      <p className="text-lg font-semibold text-[#F59E0B]" style={{ fontFamily: "var(--font-benzin)" }}>$800</p>
                      <p className="text-[9px] text-white/30 mt-0.5">HK company only</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/30">Boyar Partners</p>
                      <p className="text-lg font-semibold text-[#6EE7B7]" style={{ fontFamily: "var(--font-benzin)" }}>$29,700</p>
                      <p className="text-[9px] text-white/30 mt-0.5">Full Structure</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/30">Global TCSP</p>
                      <p className="text-lg font-semibold text-[#3B82F6]" style={{ fontFamily: "var(--font-benzin)" }}>$50K+</p>
                      <p className="text-[9px] text-white/30 mt-0.5">Equivalent scope</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/50 leading-[1.5] text-center">Boyar&apos;s Full Structure ($29,700) delivers the same multi-entity, multi-jurisdiction outcome as a Tier 1 engagement at 40–60% lower cost. It commands 37× the revenue of a tech platform formation because it solves a 37× more complex problem.</p>
                </div>
              </motion.div>

              <div className="w-full">
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.05] px-5 py-5 mt-10 mb-16">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 font-medium mb-3">Boyar Partners. Competitive Thesis</p>
                  <div className="space-y-2.5 text-[11px] text-white/55 leading-[1.6]">
                    <p>Boyar does not compete within any existing TCSP tier. It occupies the structural gap between them:</p>
                    <div className="space-y-1.5 pl-3 mt-2">
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span>Too small to threaten Tier 1 incumbents, but perfectly sized to absorb their overflow and referrals</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span>Same service quality as Tier 2 specialists, but accessing corridors they cannot naturally reach from Jersey or Geneva</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span>Solving problems that Tier 3 platforms were never designed to solve: trust, advisory, banking, multi-jurisdiction structuring</span></p>
                      <p className="flex items-start gap-2"><span className="text-white/25 mt-px">•</span><span>Coordinating Tier 4 execution partners across 40+ jurisdictions into a single accountable service: the orchestration layer that doesn&apos;t exist today</span></p>
                    </div>
                    <p className="mt-3 text-white/70">The competitive moat is not technology, scale, or pricing. It is <span className="text-white/90 font-medium">regulatory credentialing + jurisdictional breadth + corridor-native positioning</span>, a combination that takes 12–18 months to assemble and cannot be replicated by adding a feature or opening an office.</p>
                    <p className="mt-2 text-white/70">Boyar&apos;s competitive position is not won by outspending incumbents. It is won by existing where they don&apos;t.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
