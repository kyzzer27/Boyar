"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const GROUP_URLS = [
  "/client-acquisition/models/group-1",
  "/client-acquisition/models/group-2",
  "/client-acquisition/models/group-3",
  "/client-acquisition/models/group-4",
  "/client-acquisition/models/group-5",
  "/client-acquisition/models/group-6",
  "/client-acquisition/models/group-7",
] as const;

const IMG_WIDTH = 90;
const IMG_HEIGHT = 126;

type FlipCardProps = {
  src: string;
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  isArcPhase: boolean;
  onClick: () => void;
};

function FlipCard({
  src,
  index,
  target,
  onHoverStart,
  onHoverEnd,
  isArcPhase,
  onClick,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        zIndex: isArcPhase ? 20 : 1,
        cursor: isArcPhase ? "pointer" : "default",
      }}
      className="group"
      onHoverStart={() => onHoverStart(index)}
      onHoverEnd={() => onHoverEnd()}
      onClick={isArcPhase ? onClick : undefined}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
          style={{ background: "#ffffff" }}
        >
          <img src={src} alt={`card-${index}`} className="h-full w-full object-contain" />
        </div>
      </div>
    </motion.div>
  );
}

function PreviewCard({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{
        width: 260,
        height: 350,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow:
          "0 30px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
        pointerEvents: "auto",
        flexShrink: 0,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`preview-${index}`}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#000" }}
      />
    </motion.div>
  );
}

const TOTAL_CARDS = 7;
const MAX_SCROLL = 800;

const BASE_IMAGES = [
  "/test-cards/card-1.png",
  "/test-cards/card-2.png",
  "/test-cards/card-3.png",
  "/test-cards/card-4.png",
  "/test-cards/card-5.png",
  "/test-cards/card-6.png",
  "/test-cards/card-7.png",
] as const;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

function IntroAnimation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipIntro = searchParams.get("skipIntro") === "true";

  const [introPhase, setIntroPhase] = useState<"scatter" | "line" | "circle">(skipIntro ? "circle" : "scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
      }
    });
    obs.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => obs.disconnect();
  }, []);

  const virtualScroll = useMotionValue(skipIntro ? MAX_SCROLL : 0);
  const scrollRef = useRef(skipIntro ? MAX_SCROLL : 0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = v;
      virtualScroll.set(v);
    };

    let ty = 0;
    const onTS = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      ty = e.touches[0].clientY;
    };
    const onTM = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      const v = Math.min(Math.max(scrollRef.current + dy, 0), MAX_SCROLL);
      scrollRef.current = v;
      virtualScroll.set(v);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTS, { passive: false });
    el.addEventListener("touchmove", onTM, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTS);
      el.removeEventListener("touchmove", onTM);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 800], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  
  useEffect(() => {
    if (skipIntro) {
      virtualScroll.set(MAX_SCROLL);
      smoothMorph.set(1);
    }
  }, [skipIntro, virtualScroll, smoothMorph]);

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width * 2 - 1) * 40);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  useEffect(() => {
    if (skipIntro) return;
    const t1 = window.setTimeout(() => setIntroPhase("line"), 500);
    const t2 = window.setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [skipIntro]);

  const scatterPositions = useMemo(
    () =>
      BASE_IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 800,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    [],
  );

  const [morphValue, setMorphValue] = useState(skipIntro ? 1 : 0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothMouseX.on("change", setParallaxValue);
    return () => {
      u1();
      u2();
    };
  }, [smoothMorph, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.7, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.7, 1], [30, 0]);

  const showPreview = morphValue > 0.95 && hoveredCard !== null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1000, zIndex: 1 }}
      >
        <div
          className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2"
          style={{ transform: "translateY(-50%)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            style={{
              fontFamily: "'Horizon', sans-serif",
              fontSize: "clamp(1rem, 2.8vw, 1.6rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "#e2e8f0",
              textTransform: "uppercase" as const,
              maxWidth: 320,
              lineHeight: 1.4,
            }}
          >
            7 Different Acquisition Channel Groups
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              marginTop: 16,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "#7c7c9a",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>
      </div>

      <motion.div
        style={{
          opacity: contentOpacity as any,
          y: contentY as any,
          position: "absolute",
          top: "5%",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 16px",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            fontFamily: "'Avenir', 'Avenir Next', sans-serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "0.02em",
          }}
        >
          Know In Brief About Acquisition Channel Groups
        </h2>
      </motion.div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 30,
          pointerEvents: "none",
          paddingBottom: "8%",
        }}
      >
        <AnimatePresence>
          {showPreview && hoveredCard !== null ? (
            <PreviewCard src={BASE_IMAGES[hoveredCard]} index={hoveredCard} onClick={() => router.push(GROUP_URLS[hoveredCard!])} />
          ) : null}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 15 }}>
        {BASE_IMAGES.map((src, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

          if (introPhase === "scatter") {
            target = scatterPositions[i];
          } else if (introPhase === "line") {
            const sp = IMG_WIDTH + 10;
            const tw = TOTAL_CARDS * sp - 10;
            target = { x: i * sp - tw / 2 + IMG_WIDTH / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
          } else {
            const isMobile = containerSize.width < 768;
            const minD = Math.min(containerSize.width, containerSize.height);
            const halfH = containerSize.height / 2;

            const circleRadius = Math.min(minD * 0.34, 280);
            const circleAngle = (i / TOTAL_CARDS) * 360 - 90;
            const circleRad = (circleAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
              scale: 1.4,
            };

            const arcRadius = isMobile ? containerSize.width * 1.0 : containerSize.width * 0.75;
            const arcCenterYFromCenter = halfH * 0.55 + arcRadius;

            const totalSpread = isMobile ? 44 : 38;
            const halfSpread = totalSpread / 2;
            const stepDeg = totalSpread / (TOTAL_CARDS - 1);

            const angleDeg = -90 - halfSpread + i * stepDeg;
            const angleRad = (angleDeg * Math.PI) / 180;

            const arcX = Math.cos(angleRad) * arcRadius + parallaxValue * 0.15;
            const arcY = arcCenterYFromCenter + Math.sin(angleRad) * arcRadius;
            const arcRotation = angleDeg + 90;
            const arcScale = isMobile ? 0.8 : 0.9;

            let arcOpacity = 1;
            if (morphValue > 0.95 && hoveredCard !== null) {
              arcOpacity = hoveredCard === i ? 1 : 0.45;
            }

            target = {
              x: lerp(circlePos.x, arcX, morphValue),
              y: lerp(circlePos.y, arcY, morphValue),
              rotation: lerp(circlePos.rotation, arcRotation, morphValue),
              scale: lerp(circlePos.scale, arcScale, morphValue),
              opacity: lerp(1, arcOpacity, morphValue),
            };
          }

          return (
            <FlipCard
              key={i}
              src={src}
              index={i}
              target={target}
              isArcPhase={morphValue > 0.9}
              onHoverStart={(idx) => {
                if (morphValue > 0.9) setHoveredCard(idx);
              }}
              onHoverEnd={() => {}}
              onClick={() => router.push(GROUP_URLS[i])}
            />
          );
        })}
      </div>

      {morphValue > 0.85 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: morphValue > 0.95 ? 0.7 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-0 right-0 text-center pointer-events-none"
          style={{
            bottom: "6%",
            zIndex: 17,
            fontFamily: "'Avenir', 'Avenir Next', sans-serif",
            fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.04em",
          }}
        >
          Get your cursor on cards and then click on it to open
        </motion.p>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 60,
          background: "linear-gradient(to top, #000000 0%, transparent 100%)",
          zIndex: 16,
        }}
      />
    </div>
  );
}

export default function TestScrollMorphHeroPage() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#000000", position: "relative" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <Suspense fallback={<div className="w-full h-full bg-black"></div>}>
        <IntroAnimation />
      </Suspense>
    </div>
  );
}

