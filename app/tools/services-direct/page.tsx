"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Card measurements (slightly smaller than Framer reference)
const CARD_WIDTH = 300;
const CARD_HEIGHT = 420;
const CARD_RADIUS = 40;

// Service carousel images — order matches buttonNames
const travelImages = [
  "/images/services/corporate-services.png",
  "/images/services/private-clients.jpg",
  "/images/services/banking.png",
  "/images/services/tokenization.png",
  "/images/services/international-licensing.png",
  "/images/services/citizenship-stewardship.png",
  "/images/services/fund-administration.png",
];

// Arm rotations: evenly spaced for 7 items
const armRotations = [0, 51.4286, 102.8571, 154.2857, 205.7143, 257.1429, 308.5714]; // degrees

const buttonNames = [
  "Corporate services",
  "Private clients",
  "Banking",
  "Tokenisation",
  "International licensing",
  "Citizenship & Stewardship",
  "Fund administration",
];

// Same content as the other services (products/investor) – one route per carousel button
const contentRoutes: Record<number, string> = {
  0: "/products/investor/corporate-services",
  1: "/products/investor/private-clients",
  2: "/products/investor/banking",
  3: "/products/investor/tokenisation",
  4: "/products/investor/licensing",
  5: "/products/investor/citizenship-stewardship",
  6: "/products/investor/fund-administration",
};

const menuServices: { label: string; href: string }[] = [
  { label: "Corporate services", href: "/products/investor/corporate-services" },
  { label: "Private clients", href: "/products/investor/private-clients" },
  { label: "Banking", href: "/products/investor/banking" },
  { label: "Tokenisation", href: "/products/investor/tokenisation" },
  { label: "International licensing", href: "/products/investor/licensing" },
  { label: "Citizenship & Stewardship", href: "/products/investor/citizenship-stewardship" },
  { label: "Fund administration", href: "/products/investor/fund-administration" },
];

function TravelArm3D({
  imageUrl,
  index,
  rotation,
  carouselRotation,
}: {
  imageUrl: string;
  index: number;
  rotation: number;
  carouselRotation: number;
}) {
  const label = buttonNames[index] ?? "";
  const worldAngle = (carouselRotation + rotation + 360) % 360;
  const forwardness = 180 - Math.min(worldAngle, 360 - worldAngle);
  const armZIndex = 1 + Math.max(0, forwardness);

  const objectFit = 'contain';
  const backgroundColor = '#000000';

  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: objectFit as React.CSSProperties['objectFit'],
    objectPosition: 'center',
    outline: 'none',
  };

  const innerWrapperStyle = {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  };


  return (
    <div
      className="absolute"
      style={{
        height: CARD_HEIGHT,
        width: 1960,
        transformStyle: 'preserve-3d',
        // Position cards higher in the carousel
        top: `calc(50% - ${CARD_HEIGHT / 2}px - 70px)`,
        left:
          index === 0
            ? 'calc(50.0833% - 980px)'
            : 'calc(50% - 980px)',
        transform: `rotateY(${rotation}deg)`,
        zIndex: armZIndex,
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Front card */}
      <div
        data-card-index={index}
        className="rounded-[40px]"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          flexShrink: 0,
          flexGrow: 0,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(90deg)',
          position: 'relative',
          backgroundColor: backgroundColor,
          overflow: 'visible',
          borderRadius: CARD_RADIUS,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        <div style={innerWrapperStyle}>
          <img
            src={imageUrl}
            alt={label}
            draggable={false}
            style={imgStyle}
          />
        </div>
      </div>

      {/* Back card */}
      <div
        data-card-index={index}
        className="rounded-[40px]"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          flexShrink: 0,
          flexGrow: 0,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-90deg)',
          position: 'relative',
          backgroundColor: backgroundColor,
          overflow: 'visible',
          borderRadius: CARD_RADIUS,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        <div style={innerWrapperStyle}>
          <img
            src={imageUrl}
            alt={label}
            draggable={false}
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  );
}

const NAV_SEQUENCE = [0, 1, 2, 3, 4, 5, 6];

function getFrontCardIndex(rotation: number): number {
  let bestIdx = 0;
  let bestForward = -Infinity;
  for (let i = 0; i < armRotations.length; i++) {
    const wa = ((rotation + armRotations[i]) % 360 + 360) % 360;
    const f = 180 - Math.min(wa, 360 - wa);
    if (f > bestForward) { bestForward = f; bestIdx = i; }
  }
  return bestIdx;
}

function getInitialRotation(): number {
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem('services-carousel-rotation');
    if (saved !== null) return parseFloat(saved);
  }
  return 0;
}

export default function ServicesDirectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselRotation, setCarouselRotation] = useState(getInitialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const router = useRouter();
  const rotationRef = useRef(carouselRotation);
  const lastDragX = useRef(0);
  const dragDistance = useRef(0);
  const velocityRef = useRef(0);
  const coastRafRef = useRef<number>(0);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const frontCardIdx = getFrontCardIndex(carouselRotation);

  useEffect(() => {
    rotationRef.current = carouselRotation;
  }, [carouselRotation]);

  useEffect(() => {
    return () => { if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (selectedCard !== null) return;
      e.preventDefault();
      setCarouselRotation((r) => r + e.deltaY * 0.15);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [selectedCard]);

  const handleCarouselMouseDown = useCallback((e: React.MouseEvent) => {
    if (selectedCard !== null) return;
    if (coastRafRef.current) cancelAnimationFrame(coastRafRef.current);
    setIsDragging(true);
    rotationRef.current = carouselRotation;
    lastDragX.current = e.clientX;
    dragDistance.current = 0;
    velocityRef.current = 0;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - lastDragX.current;
      lastDragX.current = moveEvent.clientX;
      dragDistance.current += Math.abs(delta);
      const rotationDelta = -(delta / 1200) * 360;
      velocityRef.current = rotationDelta;
      rotationRef.current += rotationDelta;
      setCarouselRotation(rotationRef.current);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      let vel = velocityRef.current;
      if (Math.abs(vel) > 0.3) {
        const coast = () => {
          vel *= 0.94;
          if (Math.abs(vel) < 0.05) return;
          rotationRef.current += vel;
          setCarouselRotation(rotationRef.current);
          coastRafRef.current = requestAnimationFrame(coast);
        };
        coastRafRef.current = requestAnimationFrame(coast);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [carouselRotation, selectedCard]);

  const handleCarouselClick = useCallback((e: React.MouseEvent) => {
    if (selectedCard !== null) return;
    if (dragDistance.current >= 5 || !carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll('[data-card-index]');
    const cx = e.clientX;
    const cy = e.clientY;
    let bestIdx = -1;
    let bestDist = Infinity;
    let bestCardSize = 0;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
        const dist = Math.hypot(cx - (rect.left + rect.width / 2), cy - (rect.top + rect.height / 2));
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = parseInt(card.getAttribute('data-card-index') || '-1', 10);
          bestCardSize = Math.min(rect.width, rect.height);
        }
      }
    });
    const maxDist = bestCardSize * 0.45;
    if (bestIdx >= 0 && bestDist < maxDist) {
      handleOpenCard(bestIdx);
    }
  }, [selectedCard]);

  const handleOpenCard = useCallback((idx: number) => {
    if (coastRafRef.current) cancelAnimationFrame(coastRafRef.current);
    setSelectedCard(idx);
    sessionStorage.setItem('services-carousel-rotation', String(rotationRef.current));
    navTimeoutRef.current = setTimeout(() => {
      const route = contentRoutes[idx];
      if (route) router.push(route);
    }, 2200);
  }, [router]);

  const handleArrowLeft = useCallback(() => {
    if (selectedCard !== null) return;
    const currentFront = getFrontCardIndex(rotationRef.current);
    const currentSeqIdx = NAV_SEQUENCE.indexOf(currentFront);
    const prevSeqIdx = currentSeqIdx <= 0 ? NAV_SEQUENCE.length - 1 : currentSeqIdx - 1;
    const targetCardIdx = NAV_SEQUENCE[prevSeqIdx];
    setCarouselRotation(-armRotations[targetCardIdx]);
  }, [selectedCard]);

  const handleArrowRight = useCallback(() => {
    if (selectedCard !== null) return;
    const currentFront = getFrontCardIndex(rotationRef.current);
    const currentSeqIdx = NAV_SEQUENCE.indexOf(currentFront);
    const nextSeqIdx = currentSeqIdx >= NAV_SEQUENCE.length - 1 ? 0 : currentSeqIdx + 1;
    const targetCardIdx = NAV_SEQUENCE[nextSeqIdx];
    setCarouselRotation(-armRotations[targetCardIdx]);
  }, [selectedCard]);

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen bg-black text-white relative overflow-hidden"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          touchAction: 'pan-y pinch-zoom',
        }}
      >
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pt-3 pb-2 px-5 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="text-sm text-white/80 hover:text-white transition-colors z-50">
              ← Back
              </button>
            <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 text-white/80 hover:text-white transition-colors rounded hover:bg-white/10"
              aria-label="Services menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-[60] py-2 min-w-[200px] rounded-lg bg-[#0f0f0f] border border-white/10 shadow-xl"
                role="menu"
              >
                {menuServices.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors text-left"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            </div>
          </div>
        </header>

        {menuOpen && (
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
        )}

        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'none',
          }}
        />

        {/* Main layout */}
        <div className="flex flex-col items-center w-full min-h-screen p-0 relative z-10 pt-96 sm:pt-[28rem]">
          <div
            className="absolute top-48 sm:top-64 left-0 right-0 text-center z-20 pointer-events-none transition-opacity duration-500"
            style={{ opacity: selectedCard !== null ? 0 : 1 }}
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Our Service Architecture
              <br />
              <span className="text-white/90">&amp; The Full Mandate</span>
            </h1>
          </div>
          <motion.div
            ref={containerRef}
            className="flex flex-col items-center w-full px-5 relative z-20"
          >
            {/* 3D Carousel */}
            <div
              ref={carouselRef}
              className="relative cursor-grab active:cursor-grabbing mx-auto outline-none focus:outline-none focus:ring-0"
              style={{
                width: 1200,
                height: CARD_HEIGHT,
                minWidth: 1200,
                maxWidth: 1200,
                minHeight: CARD_HEIGHT,
                maxHeight: CARD_HEIGHT,
                transformStyle: 'preserve-3d',
                userSelect: 'none',
                touchAction: 'none',
                overflow: 'visible',
                outline: 'none',
                filter: selectedCard !== null ? 'blur(10px)' : 'none',
                opacity: selectedCard !== null ? 0 : 1,
                transition: 'filter 0.6s ease-out, opacity 0.8s ease-out',
              }}
              onMouseDown={handleCarouselMouseDown}
              onClick={handleCarouselClick}
            >
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(600px)',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: 1200,
                    height: CARD_HEIGHT,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${carouselRotation}deg)`,
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {travelImages.map((imageUrl, index) => (
                      <TravelArm3D
                        key={index}
                        imageUrl={imageUrl}
                        index={index}
                        rotation={armRotations[index]}
                        carouselRotation={carouselRotation}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow buttons + name button below carousel */}
            {selectedCard === null && (
              <div className="flex flex-col items-center gap-3 -mt-8" style={{ position: 'relative', zIndex: 200 }}>
                <p className="text-xs font-bold text-white tracking-wide">
                  Click on below button to view service pages
                </p>
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  aria-label="Rotate left"
                  onClick={(e) => { e.stopPropagation(); handleArrowLeft(); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-transparent hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleOpenCard(frontCardIdx); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="px-6 py-2.5 rounded-lg border border-white/20 bg-transparent hover:bg-white/10 transition-colors text-white text-sm font-medium tracking-wide min-w-[200px] text-center cursor-pointer"
                >
                  {buttonNames[frontCardIdx]}
                </button>

                <button
                  type="button"
                  aria-label="Rotate right"
                  onClick={(e) => { e.stopPropagation(); handleArrowRight(); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-transparent hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Floating card overlay */}
        {selectedCard !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              initial={{ y: 120, scale: 0.85, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: CARD_RADIUS,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src={travelImages[selectedCard]}
                alt={buttonNames[selectedCard]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute text-white text-sm font-medium tracking-wide"
              style={{ bottom: '15%' }}
            >
              Opening {buttonNames[selectedCard]}…
            </motion.p>
          </motion.div>
        )}

      </div>
    </ProtectedRoute>
  );
}
