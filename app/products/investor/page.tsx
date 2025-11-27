"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  revenue: string;
  status: "Active" | "Premium" | "New";
  icon: string;
  color: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Corporate Services",
    description: "Comprehensive corporate solutions including company formation, compliance management, secretarial services, and ongoing administrative support for seamless business operations.",
    price: "From $3,500",
    revenue: "$14,000",
    status: "Active",
    icon: "🏢",
    color: "#34d399",
    features: ["Company formation", "Compliance management", "Secretarial services", "Administrative support"]
  },
  {
    id: 2,
    name: "Private Clients",
    description: "Exclusive wealth management and private client services tailored for high-net-worth individuals, families, and private foundations with personalized offshore solutions.",
    price: "From $15,000",
    revenue: "$60,000",
    status: "Premium",
    icon: "💼",
    color: "#38bdf8",
    features: ["Wealth management", "Private foundations", "Family office services", "Estate planning"]
  },
  {
    id: 3,
    name: "Fund Services",
    description: "Specialized fund administration, regulatory compliance, and operational support for investment funds, hedge funds, and private equity structures.",
    price: "From $8,000",
    revenue: "$32,000",
    status: "Premium",
    icon: "📊",
    color: "#a78bfa",
    features: ["Fund administration", "Regulatory compliance", "Investor relations", "Reporting services"]
  },
  {
    id: 4,
    name: "Banking",
    description: "Corporate banking account setup, multi-currency solutions, and comprehensive financial services integration for international business operations.",
    price: "From $6,500",
    revenue: "$26,000",
    status: "Active",
    icon: "🏦",
    color: "#fbbf24",
    features: ["Account setup", "Multi-currency", "Online banking", "Dedicated support"]
  },
  {
    id: 5,
    name: "International Licensing",
    description: "Global licensing solutions for financial services, gaming, e-commerce, and regulated industries across multiple jurisdictions with expert guidance.",
    price: "From $12,000",
    revenue: "$48,000",
    status: "Premium",
    icon: "🌐",
    color: "#60a5fa",
    features: ["Financial licenses", "Gaming licenses", "E-commerce permits", "Regulatory guidance"]
  }
];

function SectionWrapper({ 
  children, 
  className = "", 
  sectionIndex,
  onRef 
}: { 
  children: React.ReactNode; 
  className?: string;
  sectionIndex?: number;
  onRef?: (ref: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (onRef && ref.current) {
      onRef(ref.current);
    }
  }, [onRef]);

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

function ScrollProgress({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

function ProductSection({
  product,
  index,
  sectionIndex,
  currentSection,
  onRef,
  containerRef,
}: {
  product: Product;
  index: number;
  sectionIndex: number;
  currentSection: number;
  onRef: (ref: HTMLElement | null) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { 
    root: containerRef,
    margin: "-40% 0px -40% 0px",
    amount: 0.5,
  });

  // Calculate fold effect based on scroll position
  const foldProgress = useMotionValue(0);
  
  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const updateFold = () => {
      if (!containerRef.current || !sectionRef.current) return;
      
      const container = containerRef.current;
      const section = sectionRef.current;
      const containerScroll = container.scrollTop;
      const containerHeight = container.clientHeight;
      const viewportBottom = containerScroll + containerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Calculate fold based on scroll position
      // If section is above viewport center, it should fold
      const viewportCenter = containerScroll + containerHeight / 2;
      const sectionCenter = sectionTop + sectionHeight / 2;
      
      if (sectionCenter < viewportCenter) {
        // Section is above center - fold it
        const distanceFromCenter = viewportCenter - sectionCenter;
        const maxFoldDistance = containerHeight * 0.8; // Start folding when 80% of viewport away
        const foldAmount = Math.min(1, distanceFromCenter / maxFoldDistance);
        foldProgress.set(foldAmount);
      } else {
        // Section is at or below center - don't fold
        foldProgress.set(0);
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", updateFold, { passive: true });
    updateFold(); // Initial calculation
    
    return () => {
      container.removeEventListener("scroll", updateFold);
    };
  }, [containerRef, foldProgress]);

  const scaleY = useTransform(foldProgress, [0, 1], [1, 0.4]);
  const rotateX = useTransform(foldProgress, [0, 1], [0, 60]);
  const opacity = useTransform(foldProgress, [0, 0.3, 1], [1, 0.9, 0.4]);
  const y = useTransform(foldProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (sectionRef.current) {
      onRef(sectionRef.current);
    }
  }, [onRef]);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative"
      style={{
        transformOrigin: "top center",
        scaleY,
        rotateX,
        opacity,
        y,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left: Icon and Visual */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl sm:text-9xl mb-6"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              {product.icon}
            </motion.div>
            <motion.div
              className="w-32 h-1 rounded-full mb-4"
              style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              {product.name}
            </h3>

            <p 
              className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              {product.description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="text-sm text-gray-400 mb-3" style={{ fontFamily: 'var(--font-benzin)' }}>Key Features:</div>
              {product.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-center gap-3 text-gray-300"
                  style={{ fontFamily: 'var(--font-benzin)' }}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: featureIndex * 0.1 }}
                >
                  <motion.span
                    className="text-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.5,
                      delay: featureIndex * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    ✓
                  </motion.span>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Know More Button */}
            <motion.button
              onClick={() => {
                if (product.name === "Corporate Services") {
                  window.location.href = "/products/investor/corporate-services";
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all group"
              style={{ fontFamily: 'var(--font-benzin)' }}
              whileHover={{ scale: 1.05, borderColor: product.color }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm font-medium">Know More</span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SectionIndicator({ currentSection, totalSections }: { currentSection: number; totalSections: number }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {[...Array(totalSections)].map((_, i) => {
        const sectionNum = i + 1;
        const isActive = currentSection === sectionNum;
        return (
          <motion.button
            key={i}
            className={`w-3 h-3 rounded-full transition-all relative ${
              isActive ? "bg-white" : "bg-white/30"
            }`}
            animate={{
              scale: isActive ? 1.8 : 1,
              opacity: isActive ? 1 : 0.4,
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ProductsInvestorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const totalSections = 2 + products.length; // Hero + Overview + 5 Services

  // Track which section is in view with scroll listener
  useEffect(() => {
    setIsMounted(true);
    
    const updateCurrentSection = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const viewportCenter = scrollTop + containerHeight / 2;
      
      // Find which section is at the center of the viewport
      let closestSection = 1;
      let minDistance = Infinity;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = index + 1;
        }
      });
      
      setCurrentSection(closestSection);
    };

    const container = containerRef.current;
    if (container) {
      // Initial check after a short delay to ensure sections are mounted
      const timeoutId = setTimeout(updateCurrentSection, 300);
      
      // Update on scroll
      container.addEventListener("scroll", updateCurrentSection, { passive: true });
      container.addEventListener("scrollend", updateCurrentSection);
      
      // Also update periodically to catch any missed updates
      const intervalId = setInterval(updateCurrentSection, 100);
      
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        container.removeEventListener("scroll", updateCurrentSection);
        container.removeEventListener("scrollend", updateCurrentSection);
      };
    }
  }, [isMounted]);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <CircularBackground />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/80 backdrop-blur-md z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/tools" className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-2">
              ← Back
            </Link>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Products & Services
            </h1>
            <div className="w-16" /> {/* Spacer */}
          </div>
        </header>

        {isMounted && <ScrollProgress containerRef={containerRef} />}
        <SectionIndicator currentSection={currentSection} totalSections={totalSections} />

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Section 1: Hero */}
          <SectionWrapper 
            sectionIndex={0}
            onRef={(ref) => { sectionRefs.current[0] = ref; }}
          >
            <div className="text-center px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'var(--font-benzin)' }}
                >
                  Our Services
                </motion.h1>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-2 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.div>
                <span className="text-sm" style={{ fontFamily: 'var(--font-benzin)' }}>Scroll to know more</span>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  ↓
                </motion.div>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Section 2: Overview */}
          <SectionWrapper 
            sectionIndex={1}
            onRef={(ref) => { sectionRefs.current[1] = ref; }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'var(--font-benzin)' }}
                >
                  Portfolio Overview
                </h2>
                <p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  style={{ fontFamily: 'var(--font-benzin)' }}
                >
                  {products.length} comprehensive services designed to empower your business growth across global markets
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Products", value: products.length, color: "#34d399" },
                  { label: "Active Services", value: products.filter(p => p.status === "Active").length, color: "#38bdf8" },
                  { label: "Premium Options", value: products.filter(p => p.status === "Premium").length, color: "#a78bfa" },
                  { label: "Total Revenue", value: "$197.7K", color: "#fbbf24" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: stat.color }}
                  >
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: stat.color, fontFamily: 'var(--font-benzin)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400" style={{ fontFamily: 'var(--font-benzin)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Sections 3-10: Individual Products with Folding Effect */}
          {products.map((product, index) => {
            const sectionNumber = index + 3;
            const sectionIndex = sectionNumber - 1; // 0-based index
            
            return (
              <ProductSection
                key={product.id}
                product={product}
                index={index}
                sectionIndex={sectionIndex}
                currentSection={currentSection}
                onRef={(ref) => { sectionRefs.current[sectionIndex] = ref; }}
                containerRef={containerRef}
              />
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}

