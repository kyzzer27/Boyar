"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StructuralInsightCard1Expanded } from "@/components/trajectory/structural-insight-card1-expanded";
import { StructuralInsightCard2Expanded } from "@/components/trajectory/structural-insight-card2-expanded";
import { StructuralInsightCard3Expanded } from "@/components/trajectory/structural-insight-card3-expanded";
import { StructuralInsightCard4Expanded } from "@/components/trajectory/structural-insight-card4-expanded";
import { StructuralInsightCard5Expanded } from "@/components/trajectory/structural-insight-card5-expanded";
import { useRouter } from "next/navigation";
import type { AnimationPlaybackControls } from "framer-motion";
import { AnimatePresence, LayoutGroup, animate, motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Image from "next/image";
import { TrajectoryDetailsPanel } from "@/components/trajectory/trajectory-details-panel";
import CompetitiveLandscape from "./CompetitiveLandscape";

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

const TRAJECTORY_SKIP_CARD_IMAGES: readonly string[] = [
  "/trajectory-skip-cards/card-1.png",
  "/trajectory-skip-cards/card-2.png",
  "/trajectory-skip-cards/card-3.png",
  "/trajectory-skip-cards/card-4.png",
  "/trajectory-skip-cards/card-5-orange.png",
];

const LINE1_WORDS = ["THE", "BOYAR", "TRAJECTORY"];
const LINE2_WORDS = ["YEAR", "BY", "YEAR"];

const PARAGRAPH_TEXT =
  "The year-by-year blueprint for how Boyar Partners compounds from a founder-led practice into a 53-jurisdiction advisory platform — through disciplined execution, interlocking moats, and revenue that grows behind relationships, not ahead of them.";
const PARAGRAPH_WORDS = PARAGRAPH_TEXT.split(" ");

/** p ∈ [0, CREAM_END) = cream rises; after that sheet stays full. */
const CREAM_END = 0.15;
const CARD_COUNT = TRAJECTORY_SKIP_CARD_IMAGES.length;
const CARD_STEP_P = 0.002; // cards cascade almost instantly after cream fills

/** First card appears only after cream completely fills the screen. */
function cardHangAt(index: number): number {
  return CREAM_END + index * CARD_STEP_P;
}

/** Scroll after hang before “stick” still. */
const HANG_UNTIL_STICK_P = 0.002;

function cardStickAt(index: number): number {
  return cardHangAt(index) + HANG_UNTIL_STICK_P;
}

function visibleCardCount(progress: number): number {
  let n = 0;
  for (let i = 0; i < CARD_COUNT; i++) {
    if (progress >= cardHangAt(i)) n++;
    else break;
  }
  return n;
}

/** Pendulum after throw until user scrolls past cardStickAt(i). */
const HANG_SWAY: Record<string, number | number[]> = {
  rotateZ: [0, 2.6, -2.6, 0],
  rotateX: [0, 1.4, -1.4, 0],
  y: [0, -6, 0],
  opacity: 1,
};

const HANG_SWAY_OPTS = {
  repeat: Infinity,
  duration: 2.35,
  ease: "easeInOut",
} as const;

/** After hang / interrupt: rest pose. */
const STICK_SETTLE: Record<string, number> = {
  rotateZ: 0,
  rotateX: 0,
  y: 0,
  x: 0,
  scale: 1,
  opacity: 1,
};

const STICK_SETTLE_OPTS = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.45,
};

/**
 * Primary sticky-note motion: arcs up from below, tilts in 3D, overshoots scale, then rests.
 * Shown every time a card enters; then hang sway until scroll stick.
 */
const STICKY_NOTE_THROW: Record<string, (string | number)[] | number[]> = {
  x: ["0vw", "0vw", "0vw", "0vw"],
  y: ["48vh", "10vh", "0vh", "0vh"],
  rotateZ: [-28, -10, 1.4, 0],
  rotateX: [16, 5, 0, 0],
  scale: [0.82, 0.94, 1.04, 1],
  opacity: [0, 0.92, 1, 1],
};

const STICKY_NOTE_THROW_OPTS = {
  duration: 0.78,
  times: [0, 0.12, 0.72, 1],
  ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
};

const LAYOUT_SHIFT = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.6,
};

export default function TrajectorySkipPage() {
  const router = useRouter();
  const [introDone, setIntroDone] = useState(false);
  const [runMarketGlow, setRunMarketGlow] = useState(false);
  const baselineStatsRef = useRef<HTMLDivElement | null>(null);
  const [baselineValues, setBaselineValues] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const eatRealScrollRef = useRef<HTMLDivElement | null>(null);
  const eatRealScrollCleanupRef = useRef<(() => void) | null>(null);
  const [eatRealProgress, setEatRealProgress] = useState(0);
  const [card1DetailOpen, setCard1DetailOpen] = useState(false);
  const [card2DetailOpen, setCard2DetailOpen] = useState(false);
  const [card3DetailOpen, setCard3DetailOpen] = useState(false);
  const [card4DetailOpen, setCard4DetailOpen] = useState(false);
  const [card5DetailOpen, setCard5DetailOpen] = useState(false);
  const card1ExpandedRef = useRef<HTMLDivElement | null>(null);
  const card2ExpandedRef = useRef<HTMLDivElement | null>(null);
  const card3ExpandedRef = useRef<HTMLDivElement | null>(null);
  const card4ExpandedRef = useRef<HTMLDivElement | null>(null);
  const card5ExpandedRef = useRef<HTMLDivElement | null>(null);
  const [trajectoryPanelOpen, setTrajectoryPanelOpen] = useState(false);
  const [trajectoryPanelYear, setTrajectoryPanelYear] = useState(0);

  const openTrajectoryPanel = (yearIndex: number) => {
    setTrajectoryPanelYear(yearIndex);
    setTrajectoryPanelOpen(true);
  };
  /** Plain HTML nodes only — `animate()` + layout parent must not share the same element. */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** True after user scrolls past cardStickAt(i) and settle runs. */
  const cardStuckDoneRef = useRef<boolean[]>(
    Array.from({ length: CARD_COUNT }, () => false),
  );
  const hangAnimRef = useRef<(AnimationPlaybackControls | null)[]>(
    Array.from({ length: CARD_COUNT }, () => null),
  );
  const throwAnimRef = useRef<(AnimationPlaybackControls | null)[]>(
    Array.from({ length: CARD_COUNT }, () => null),
  );
  /** True after STICKY_NOTE_THROW finishes (not skipped). */
  const cardThrowCompleteRef = useRef<boolean[]>(
    Array.from({ length: CARD_COUNT }, () => false),
  );
  const eatRealProgressRef = useRef(0);
  const lastEatRealProgressRef = useRef(0);
  const [barsAutoT, setBarsAutoT] = useState(0);
  const barsAnimStartedRef = useRef(false);
  const [frozenProgress, setFrozenProgress] = useState<number | null>(null);
  const frozenScrollYRef = useRef<number>(0);

  // Second scroll driver (for heading/paragraph/bars after card details)
  const [sd2Progress, setSd2Progress] = useState(0);
  const sd2Ref = useRef<HTMLDivElement | null>(null);
  const sd2CleanupRef = useRef<(() => void) | null>(null);
  const sd2LastPRef = useRef(0);
  const [sd2BarsAutoT, setSd2BarsAutoT] = useState(0);
  const sd2BarsAnimStartedRef = useRef(false);

  const anyCardDetailOpenRef = useRef(false);
  const scrollSnapTimeoutRef = useRef<number | null>(null);
  const scrollSnapReleaseTimeoutRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollSnapInFlightRef = useRef(false);
  const lastScrollSnapTargetPRef = useRef<number | null>(null);

  const [scrollLocked, setScrollLocked] = useState(false);
  const scrollLockYRef = useRef(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const countdownDoneRef = useRef(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIntroDone(true);
      document.getElementById("first-page")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 2300);

    const lockTimer = setTimeout(() => {
      const firstPage = document.getElementById("first-page");
      if (firstPage) {
        scrollLockYRef.current = firstPage.getBoundingClientRect().top + window.scrollY;
      }
      setScrollLocked(true);
    }, 3100);

    const glowTimer = setTimeout(() => {
      setRunMarketGlow(true);
    }, 3300);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(lockTimer);
      clearTimeout(glowTimer);
    };
  }, []);

  useEffect(() => {
    if (!scrollLocked) return;
    function clampScroll() {
      if (window.scrollY < scrollLockYRef.current) {
        window.scrollTo({ top: scrollLockYRef.current, behavior: "instant" as ScrollBehavior });
      }
    }
    window.addEventListener("scroll", clampScroll, { passive: false });
    return () => window.removeEventListener("scroll", clampScroll);
  }, [scrollLocked]);

  useEffect(() => {
    const targets: [number, number, number] = [14.33, 22.35, 6.51];
    let rafId = 0;
    let cancelled = false;
    let didRun = false;
    let obs: IntersectionObserver | null = null;

    function runCountUp() {
      if (didRun || cancelled) return;
      didRun = true;
      obs?.disconnect();
      const duration = 1800;
      const start = performance.now();
      function tick(now: number) {
        if (cancelled) return;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - p) ** 3;
        setBaselineValues([
          targets[0] * eased,
          targets[1] * eased,
          targets[2] * eased,
        ]);
        if (p < 1) {
          rafId = requestAnimationFrame(tick);
        } else if (!countdownDoneRef.current) {
          countdownDoneRef.current = true;
          setShowScrollHint(true);
          setTimeout(() => setShowScrollHint(false), 3000);
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function attach() {
      const el = baselineStatsRef.current;
      if (!el || obs) return;
      obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          runCountUp();
        },
        { threshold: 0, rootMargin: "0px 0px 40% 0px" },
      );
      obs.observe(el);
    }

    attach();
    const retryId = window.setTimeout(() => {
      if (!cancelled) attach();
    }, 150);

    const fallbackId = window.setTimeout(() => {
      if (!cancelled) runCountUp();
    }, 5500);

    return () => {
      cancelled = true;
      clearTimeout(retryId);
      clearTimeout(fallbackId);
      obs?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /**
   * Callback ref: scroll math must attach *after* the node exists. With ProtectedRoute,
   * the first paint can be the loading spinner — useLayoutEffect([]) would skip setup forever.
   */
  function bindEatRealScrollDriver(node: HTMLDivElement | null) {
    eatRealScrollRef.current = node;
    eatRealScrollCleanupRef.current?.();
    eatRealScrollCleanupRef.current = null;
    if (!node) return;

    lastScrollYRef.current = window.scrollY;

    let ticking = false;
    const SNAP_DELAY_MS = 80;
    const SNAP_EPS_P = 0.012;
    function update() {
      ticking = false;
      const el = eatRealScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const elH = Math.max(1, el.offsetHeight);
      /**
       * Old: progress only when rect.top ≤ 0 → full viewport of maroon before cream moved.
       * Now: p = (vh − top) / height → 0 when driver top hits viewport bottom, 1 when
       * scrolled through (same idea as Framer useScroll offset start/end).
       */
      const raw = (vh - rect.top) / elH;
      const next = Math.max(0, Math.min(1, raw));
      // Quantize updates to reduce render/animation load while scrolling.
      // (Keeps scroll smooth and avoids re-rendering on tiny progress changes.)
      if (Math.abs(next - lastEatRealProgressRef.current) < 0.002) return;
      lastEatRealProgressRef.current = next;
      setEatRealProgress(next);
    }

    function onScroll() {
      // Track direction (down = +1, up = -1).
      const currentY = window.scrollY;
      const dir = currentY >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = currentY;

      // After the user pauses scrolling, snap to the next card hang-point.
      if (scrollSnapTimeoutRef.current != null) window.clearTimeout(scrollSnapTimeoutRef.current);
      scrollSnapTimeoutRef.current = window.setTimeout(() => {
        if (scrollSnapInFlightRef.current) return;
        if (anyCardDetailOpenRef.current) return;

        const pNow = eatRealProgressRef.current;
        if (pNow <= 0.001 || pNow >= 0.998) return;

        const nVisibleNow = visibleCardCount(pNow);

        let targetP: number | null = null;
        if (dir > 0) {
          if (nVisibleNow >= CARD_COUNT) return;
          targetP = cardHangAt(nVisibleNow);
        } else {
          if (nVisibleNow <= 0) return;
          targetP = cardHangAt(Math.max(0, nVisibleNow - 1));
        }

        if (targetP == null) return;
        targetP = clamp01(targetP);

        if (lastScrollSnapTargetPRef.current != null) {
          const prev = lastScrollSnapTargetPRef.current;
          if (Math.abs(prev - targetP) < 1e-6 && Math.abs(pNow - targetP) < SNAP_EPS_P) return;
        }

        if (Math.abs(pNow - targetP) < SNAP_EPS_P) return;

        scrollSnapInFlightRef.current = true;
        lastScrollSnapTargetPRef.current = targetP;

        const el = eatRealScrollRef.current;
        if (!el) {
          scrollSnapInFlightRef.current = false;
          return;
        }

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const elH = Math.max(1, el.offsetHeight);
        const desiredTop = vh - targetP * elH;
        const newScrollY = window.scrollY + (rect.top - desiredTop);

        window.scrollTo({ top: newScrollY, behavior: "smooth" });

        if (scrollSnapReleaseTimeoutRef.current != null) {
          window.clearTimeout(scrollSnapReleaseTimeoutRef.current);
        }
        scrollSnapReleaseTimeoutRef.current = window.setTimeout(() => {
          scrollSnapInFlightRef.current = false;
        }, 650);
      }, SNAP_DELAY_MS);

      // Snap to bars section when scrolling past paragraph blur.
      if (scrollBarSnapTimeoutRef.current != null) window.clearTimeout(scrollBarSnapTimeoutRef.current);
      scrollBarSnapTimeoutRef.current = window.setTimeout(() => {
        if (scrollSnapInFlightRef.current) return;
        const pNow2 = eatRealProgressRef.current;
        // If currently in paragraph-blur to bars-start zone, snap forward to bars.
        if (dir > 0 && pNow2 >= paraBlurStartPRef.current - 0.005 && pNow2 < barsStartPRef.current) {
          scrollSnapInFlightRef.current = true;
          const el2 = eatRealScrollRef.current;
          if (!el2) { scrollSnapInFlightRef.current = false; return; }
          const rect2 = el2.getBoundingClientRect();
          const vh2 = window.innerHeight;
          const elH2 = Math.max(1, el2.offsetHeight);
          const desiredTop2 = vh2 - barsStartPRef.current * elH2;
          const newScrollY2 = window.scrollY + (rect2.top - desiredTop2);
          window.scrollTo({ top: newScrollY2, behavior: "smooth" });
          if (scrollSnapReleaseTimeoutRef.current != null) window.clearTimeout(scrollSnapReleaseTimeoutRef.current);
          scrollSnapReleaseTimeoutRef.current = window.setTimeout(() => { scrollSnapInFlightRef.current = false; }, 650);
        }
      }, SNAP_DELAY_MS);

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });
    ro.observe(node);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(update);

    eatRealScrollCleanupRef.current = () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollSnapTimeoutRef.current != null) window.clearTimeout(scrollSnapTimeoutRef.current);
      if (scrollSnapReleaseTimeoutRef.current != null)
        window.clearTimeout(scrollSnapReleaseTimeoutRef.current);
      scrollSnapInFlightRef.current = false;
    };
  }

  // Second scroll driver binding (simpler — no card snapping logic)
  function bindSecondScrollDriver(node: HTMLDivElement | null) {
    sd2Ref.current = node;
    sd2CleanupRef.current?.();
    sd2CleanupRef.current = null;
    if (!node) return;
    let ticking2 = false;
    function update2() {
      ticking2 = false;
      const el = sd2Ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const elH = Math.max(1, el.offsetHeight);
      const raw = (vh - rect.top) / elH;
      const next = Math.max(0, Math.min(1, raw));
      if (Math.abs(next - sd2LastPRef.current) < 0.002) return;
      sd2LastPRef.current = next;
      setSd2Progress(next);
    }
    function onScroll2() {
      if (!ticking2) { ticking2 = true; requestAnimationFrame(update2); }
    }
    const ro2 = new ResizeObserver(() => requestAnimationFrame(update2));
    ro2.observe(node);
    window.addEventListener("scroll", onScroll2, { passive: true });
    window.addEventListener("resize", onScroll2);
    requestAnimationFrame(update2);
    sd2CleanupRef.current = () => {
      ro2.disconnect();
      window.removeEventListener("scroll", onScroll2);
      window.removeEventListener("resize", onScroll2);
    };
  }

  const offWhite = "#FDFBEE";
  const maroonBg = "#110000";

  /** 0–1 = scroll progress through driver (starts when driver enters viewport, not when its top hits 0). */
  const p = frozenProgress ?? eatRealProgress;
  eatRealProgressRef.current = p;
  const whiteFill =
    p < CREAM_END ? easeOutCubic(Math.min(1, p / CREAM_END)) : 1;

  // Maroon rise:
  // - maroon reaches full-screen first (heading is clear)
  // - then heading blur/flip runs
  // - then paragraph appears
  // Extra dead-zone after 5th card: page stays still for ~1 scroll before maroon begins.
  const MAROON_RISE_START_P = Math.min(0.94, cardHangAt(CARD_COUNT - 1) + 0.08);
  // Keep the fill quick so "heading clear" happens early.
  const MAROON_RISE_END_P = Math.min(0.96, MAROON_RISE_START_P + 0.03);

  const maroonFill =
    p < MAROON_RISE_START_P
      ? 0
      : easeOutCubic(
          Math.min(1, (p - MAROON_RISE_START_P) / (MAROON_RISE_END_P - MAROON_RISE_START_P)),
        );

  const MAROON_FULL_P = MAROON_RISE_END_P;

  // Budget: everything from MAROON_FULL_P to 1.0 is divided into discrete "scroll units".
  // Total phases needed:
  //   3 heading gap + 2 line1 blur/flip + (line2 overlaps) + 5 paragraph highlight
  //   + 2 paragraph disappear + 0 post-bar idle maroon = 15
  const TOTAL_MAROON_PHASES = 15;
  const ONE_SCROLL_P = (1 - MAROON_FULL_P) / TOTAL_MAROON_PHASES;

  // Sentence 1: blur then flip — heading visible for 1 scroll before animating.
  const LINE1_BLUR_START_P = MAROON_FULL_P + 1 * ONE_SCROLL_P;
  const LINE1_BLUR_END_P = LINE1_BLUR_START_P + 1 * ONE_SCROLL_P;
  const LINE1_FLIP_START_P = LINE1_BLUR_END_P;
  const LINE1_FLIP_END_P = LINE1_FLIP_START_P + 1 * ONE_SCROLL_P;

  // Sentence 2: blur starts on the next scroll, total 2 scrolls.
  const LINE2_BLUR_START_P = MAROON_FULL_P + 2 * ONE_SCROLL_P;
  const LINE2_BLUR_END_P = LINE2_BLUR_START_P + 1 * ONE_SCROLL_P;
  const LINE2_FLIP_START_P = LINE2_BLUR_END_P;
  const LINE2_FLIP_END_P = LINE2_FLIP_START_P + 1 * ONE_SCROLL_P;

  // Paragraph: starts only after sentence 2 flip is finished ("gone").
  const PARAGRAPH_IN_START_P = MAROON_FULL_P + 4 * ONE_SCROLL_P;
  const PARAGRAPH_HIGHLIGHT_END_P = PARAGRAPH_IN_START_P + 5 * ONE_SCROLL_P;

  // Paragraph disappear: blur then flip over 2 scrolls.
  const PARA_BLUR_START_P = PARAGRAPH_HIGHLIGHT_END_P;
  const PARA_BLUR_END_P = PARA_BLUR_START_P + 1 * ONE_SCROLL_P;
  const PARA_FLIP_START_P = PARA_BLUR_END_P;
  const PARA_FLIP_END_P = PARA_FLIP_START_P + 1 * ONE_SCROLL_P;

  // 5 bars appear after paragraph disappears, staggered over 2 scroll-units.
  // Post-bar idle maroon fills remaining 2 phases until p=1.0.
  const BARS_START_P = PARA_FLIP_END_P;
  const BARS_END_P = BARS_START_P + 2 * ONE_SCROLL_P;
  const BAR_COUNT = 5;
  const BAR_HEIGHTS = [0.20, 0.40, 0.60, 0.80, 1.0]; // strictly ascending

  const line1BlurT = clamp01((p - LINE1_BLUR_START_P) / (LINE1_BLUR_END_P - LINE1_BLUR_START_P));
  const line1FlipT = clamp01((p - LINE1_FLIP_START_P) / (LINE1_FLIP_END_P - LINE1_FLIP_START_P));
  const line2BlurT = clamp01((p - LINE2_BLUR_START_P) / (LINE2_BLUR_END_P - LINE2_BLUR_START_P));
  const line2FlipT = clamp01((p - LINE2_FLIP_START_P) / (LINE2_FLIP_END_P - LINE2_FLIP_START_P));

  const line1Opacity = p >= MAROON_FULL_P ? 1 - line1FlipT * 0.9 : 0;
  const line2Opacity = p >= MAROON_FULL_P ? 1 - line2FlipT * 0.9 : 0;

  const paragraphT =
    PARAGRAPH_HIGHLIGHT_END_P <= PARAGRAPH_IN_START_P
      ? 0
      : clamp01((p - PARAGRAPH_IN_START_P) / (PARAGRAPH_HIGHLIGHT_END_P - PARAGRAPH_IN_START_P));

  // Paragraph blur/flip (disappear) — mirrors heading animation.
  const paraBlurT = clamp01((p - PARA_BLUR_START_P) / (PARA_BLUR_END_P - PARA_BLUR_START_P));
  const paraFlipT = clamp01((p - PARA_FLIP_START_P) / (PARA_FLIP_END_P - PARA_FLIP_START_P));

  // Fast fade-in at paragraph start.
  const paragraphFadeIn = clamp01((p - PARAGRAPH_IN_START_P) / Math.max(0.01, ONE_SCROLL_P * 0.25));
  // Disappear: fade out driven by flip.
  const paragraphFadeOut = 1 - paraFlipT * 0.9;
  const paragraphOpacity = Math.min(paragraphFadeIn, paragraphFadeOut);

  // Keep paragraph fixed while scroll only drives the word highlight.
  const paragraphTranslateY = 0;

  const paragraphActive = paragraphFadeIn > 0.05 ? 1 : 0;
  // >1 exponent makes highlighting progress very slowly early on.
  const paragraphHighlightProgress = paragraphActive ? Math.pow(paragraphT, 2.2) : 0;
  // Use ceil so the last word becomes active even if scroll progress ends slightly under 1.
  const activeWordCount = Math.min(
    PARAGRAPH_WORDS.length,
    Math.max(0, Math.ceil(paragraphHighlightProgress * PARAGRAPH_WORDS.length - 1e-6)),
  );

  const showMaroonParagraph = p >= PARAGRAPH_IN_START_P;
  const paragraphOpacityGated = showMaroonParagraph ? paragraphOpacity : 0;

  // Bar graph reveal progress (0→1 over BARS_START_P → BARS_END_P).
  const showBars = p >= BARS_START_P && paragraphOpacity < 0.15;

  // Auto-play bar animation: on showBars trigger, animate barsAutoT from 0→1 over 2.5s.
  useEffect(() => {
    if (!showBars) {
      if (barsAnimStartedRef.current) {
        barsAnimStartedRef.current = false;
        setBarsAutoT(0);
      }
      return;
    }
    if (barsAnimStartedRef.current) return;
    barsAnimStartedRef.current = true;
    const DURATION = 2500;
    const startTime = performance.now();
    let rafId: number;
    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / DURATION);
      setBarsAutoT(t);
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [showBars]);

  // Store refs for snap handler access.
  const paraBlurStartPRef = useRef(PARA_BLUR_START_P);
  paraBlurStartPRef.current = PARA_BLUR_START_P;
  const barsStartPRef = useRef(BARS_START_P);
  barsStartPRef.current = BARS_START_P;
  const scrollBarSnapTimeoutRef = useRef<number | null>(null);

  // ---- Second driver derived values (replicates the phases for heading/paragraph/bars) ----
  const sd2 = sd2Progress;
  const sd2MaroonFill = sd2 < 0.02 ? easeOutCubic(sd2 / 0.02) : 1;
  const SD2_TOTAL_PHASES = 15;
  const SD2_ONE_P = 1 / SD2_TOTAL_PHASES;
  const SD2_LINE1_BLUR_START = 3 * SD2_ONE_P;
  const SD2_LINE1_BLUR_END = 4 * SD2_ONE_P;
  const SD2_LINE1_FLIP_START = SD2_LINE1_BLUR_END;
  const SD2_LINE1_FLIP_END = 5 * SD2_ONE_P;
  const SD2_LINE2_BLUR_START = 4 * SD2_ONE_P;
  const SD2_LINE2_BLUR_END = 5 * SD2_ONE_P;
  const SD2_LINE2_FLIP_START = SD2_LINE2_BLUR_END;
  const SD2_LINE2_FLIP_END = 6 * SD2_ONE_P;
  const SD2_PARA_IN_START = 6 * SD2_ONE_P;
  const SD2_PARA_HL_END = 11 * SD2_ONE_P;
  const SD2_PARA_BLUR_START = SD2_PARA_HL_END;
  const SD2_PARA_BLUR_END = 12 * SD2_ONE_P;
  const SD2_PARA_FLIP_START = SD2_PARA_BLUR_END;
  const SD2_PARA_FLIP_END = 13 * SD2_ONE_P;
  const SD2_BARS_START = SD2_PARA_FLIP_END;

  const sd2L1BlurT = clamp01((sd2 - SD2_LINE1_BLUR_START) / (SD2_LINE1_BLUR_END - SD2_LINE1_BLUR_START));
  const sd2L1FlipT = clamp01((sd2 - SD2_LINE1_FLIP_START) / (SD2_LINE1_FLIP_END - SD2_LINE1_FLIP_START));
  const sd2L2BlurT = clamp01((sd2 - SD2_LINE2_BLUR_START) / (SD2_LINE2_BLUR_END - SD2_LINE2_BLUR_START));
  const sd2L2FlipT = clamp01((sd2 - SD2_LINE2_FLIP_START) / (SD2_LINE2_FLIP_END - SD2_LINE2_FLIP_START));
  const sd2L1Opacity = sd2 >= 0.02 ? 1 - sd2L1FlipT * 0.9 : 0;
  const sd2L2Opacity = sd2 >= 0.02 ? 1 - sd2L2FlipT * 0.9 : 0;
  const sd2ParaT = SD2_PARA_HL_END <= SD2_PARA_IN_START ? 0 : clamp01((sd2 - SD2_PARA_IN_START) / (SD2_PARA_HL_END - SD2_PARA_IN_START));
  const sd2ParaBlurT = clamp01((sd2 - SD2_PARA_BLUR_START) / (SD2_PARA_BLUR_END - SD2_PARA_BLUR_START));
  const sd2ParaFlipT = clamp01((sd2 - SD2_PARA_FLIP_START) / (SD2_PARA_FLIP_END - SD2_PARA_FLIP_START));
  const sd2ParaFadeIn = clamp01((sd2 - SD2_PARA_IN_START) / Math.max(0.01, SD2_ONE_P * 0.25));
  const sd2ParaFadeOut = 1 - sd2ParaFlipT * 0.9;
  const sd2ParaOpacity = Math.min(sd2ParaFadeIn, sd2ParaFadeOut);
  const sd2ParaActive = sd2ParaFadeIn > 0.05 ? 1 : 0;
  const sd2ParaHLProgress = sd2ParaActive ? Math.pow(sd2ParaT, 2.2) : 0;
  const sd2ActiveWordCount = Math.min(PARAGRAPH_WORDS.length, Math.max(0, Math.ceil(sd2ParaHLProgress * PARAGRAPH_WORDS.length - 1e-6)));
  const sd2ShowPara = sd2 >= SD2_PARA_IN_START;
  const sd2ParaOpacityGated = sd2ShowPara ? sd2ParaOpacity : 0;
  const sd2ShowBars = sd2 >= SD2_BARS_START && sd2ParaOpacity < 0.15;

  useEffect(() => {
    if (!sd2ShowBars) {
      if (sd2BarsAnimStartedRef.current) { sd2BarsAnimStartedRef.current = false; setSd2BarsAutoT(0); }
      return;
    }
    if (sd2BarsAnimStartedRef.current) return;
    sd2BarsAnimStartedRef.current = true;
    const DURATION = 2500;
    const startTime = performance.now();
    let rafId: number;
    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / DURATION);
      setSd2BarsAutoT(t);
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [sd2ShowBars]);

  /** Cards only while cream is active (hide once maroon title phase begins). */
  const whiteOverlayOpacity = 1;

  /** Cards only when cream ≥ half the viewport (matches first cardHangAt). */
  // Hide card layer once maroon title animation starts.
  // Show cards earlier as the cream sheet begins rising.
  // Show cream/cards as soon as the cream sheet starts rising.
  const cardsLayerOpacity = whiteFill >= 0.05 && maroonFill <= 0.25 ? 1 : 0;

  const nVisible = visibleCardCount(p);

  /**
   * Throw → hang sway → scroll past stick → settle still. First card uses same pipeline once cream is half screen.
   */
  useLayoutEffect(() => {
    const progress = eatRealProgress;
    for (let i = 0; i < CARD_COUNT; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      if (progress < cardHangAt(i)) continue;

      if (progress >= cardStickAt(i)) {
        const hadThrowInFlight = throwAnimRef.current[i] != null;
        throwAnimRef.current[i]?.stop();
        throwAnimRef.current[i] = null;
        hangAnimRef.current[i]?.stop();
        hangAnimRef.current[i] = null;
        if (cardStuckDoneRef.current[i]) continue;
        cardStuckDoneRef.current[i] = true;

        const threwFully = cardThrowCompleteRef.current[i];
        if (!threwFully && hadThrowInFlight) {
          void animate(el, { ...STICK_SETTLE }, { ...STICK_SETTLE_OPTS });
        } else if (!threwFully && !hadThrowInFlight) {
          void animate(el, { ...STICKY_NOTE_THROW }, { ...STICKY_NOTE_THROW_OPTS });
        } else {
          void animate(el, { ...STICK_SETTLE }, { ...STICK_SETTLE_OPTS });
        }
        continue;
      }

      if (cardStuckDoneRef.current[i]) continue;

      if (!cardThrowCompleteRef.current[i]) {
        if (!throwAnimRef.current[i]) {
          throwAnimRef.current[i] = animate(el, { ...STICKY_NOTE_THROW }, {
            ...STICKY_NOTE_THROW_OPTS,
            onComplete: () => {
              throwAnimRef.current[i] = null;
              cardThrowCompleteRef.current[i] = true;
              const target = cardRefs.current[i];
              if (!target) return;
              const pNow = eatRealProgressRef.current;
              if (pNow >= cardStickAt(i)) {
                if (!cardStuckDoneRef.current[i]) {
                  cardStuckDoneRef.current[i] = true;
                  void animate(target, { ...STICK_SETTLE }, { ...STICK_SETTLE_OPTS });
                }
                return;
              }
              if (pNow < cardHangAt(i)) return;
              if (hangAnimRef.current[i]) return;
              hangAnimRef.current[i] = animate(target, { ...HANG_SWAY }, { ...HANG_SWAY_OPTS });
            },
          });
        }
        continue;
      }

      if (!hangAnimRef.current[i]) {
        hangAnimRef.current[i] = animate(el, { ...HANG_SWAY }, { ...HANG_SWAY_OPTS });
      }
    }
  }, [eatRealProgress, nVisible]);

  useEffect(() => {
    for (let i = 0; i < CARD_COUNT; i++) {
      if (eatRealProgress < cardHangAt(i) - 0.012) {
        cardStuckDoneRef.current[i] = false;
        cardThrowCompleteRef.current[i] = false;
        throwAnimRef.current[i]?.stop();
        throwAnimRef.current[i] = null;
        hangAnimRef.current[i]?.stop();
        hangAnimRef.current[i] = null;
      }
    }
  }, [eatRealProgress]);

  // When card detail opens: freeze animation, shrink driver, scroll to detail.
  const positionAndScrollToDetail = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    const driver = eatRealScrollRef.current;
    if (!driver) return;
    // Freeze the scroll progress so cards stay visible.
    // Ensure all cards are shown by freezing at least at the last card's stick position.
    const freezeP = Math.max(eatRealProgressRef.current, cardStickAt(CARD_COUNT - 1));
    setFrozenProgress(freezeP);
    frozenScrollYRef.current = window.scrollY;
    // Shrink driver so the card details (in regular flow after the driver) are near.
    const driverRect = driver.getBoundingClientRect();
    const scrolledIntoDriver = -driverRect.top + window.innerHeight;
    driver.style.minHeight = `${scrolledIntoDriver + 100}px`;
    // After DOM updates, scroll to the card detail.
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  // When card detail closes: restore driver and scroll position.
  const anyDetailOpen = card1DetailOpen || card2DetailOpen || card3DetailOpen || card4DetailOpen || card5DetailOpen;
  const prevAnyDetailOpenRef = useRef(false);
  useEffect(() => {
    if (prevAnyDetailOpenRef.current && !anyDetailOpen) {
      // Detail just closed — restore.
      const driver = eatRealScrollRef.current;
      if (driver) {
        driver.style.minHeight = '2800vh';
      }
      setFrozenProgress(null);
      // Scroll back to where the user was when they opened the detail.
      window.scrollTo({ top: frozenScrollYRef.current, behavior: "auto" });
    }
    prevAnyDetailOpenRef.current = anyDetailOpen;
  }, [anyDetailOpen]);

  useEffect(() => {
    anyCardDetailOpenRef.current =
      card1DetailOpen || card2DetailOpen || card3DetailOpen || card4DetailOpen || card5DetailOpen;
  }, [card1DetailOpen, card2DetailOpen, card3DetailOpen, card4DetailOpen, card5DetailOpen]);

  // Decide scrollbar theme by what's visually behind the scroll thumb:
  // - cream phase => thumb black
  // - maroon phase => thumb off-white
  //
  // We use a robust heuristic:
  // - cream must dominate (>= 50% cream height)
  // - and the maroon return sheet must not be active.
  // - and the user must not have scrolled down into the second maroon driver (sd2).
  const isCreamScrollTheme = (whiteFill >= 0.5 && maroonFill <= 0.02) && sd2Progress <= 0.01;
  useEffect(() => {
    if (typeof document === "undefined") return;
    const nextTheme = isCreamScrollTheme ? "cream" : "maroon";
    if (document.documentElement.dataset.scrollTheme !== nextTheme) {
      document.documentElement.dataset.scrollTheme = nextTheme;
    }
  }, [isCreamScrollTheme]);

  // Paragraph word highlight is driven by scroll progress during render
  // to keep the animation deterministic and avoid extra state.

  return (
    <ProtectedRoute>
      <main
        className="min-h-screen bg-black text-white"
        style={{ scrollbarGutter: "stable" }}
      >
        <header className="fixed left-0 top-0 z-30 w-full border-b border-white/10 bg-black/75 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80 transition hover:border-white/40 hover:text-white"
              onClick={() => router.back()}
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 text-[10px] font-semibold">
                BP
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/90">
                Boyar Partners
              </p>
              <span
                className="text-sm uppercase tracking-[0.18em] text-white/60"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Trajectory
              </span>
            </div>
            <div className="w-8 sm:w-[64px]" />
          </div>
        </header>

        {/* Scroll hint after countdown */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-[100] flex items-center gap-3 pointer-events-none"
            >
              <div
                className="text-white text-right leading-relaxed"
                style={{
                  fontFamily: "'Avenir', 'Avenir Next', 'Nunito Sans', sans-serif",
                  fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                  fontWeight: 500,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)",
                  letterSpacing: "0.02em",
                }}
              >
                Scroll Slowly<br />
                In This Page
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  width="20"
                  height="28"
                  viewBox="0 0 20 28"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}
                >
                  <path d="M10 2 L10 22" />
                  <path d="M3 16 L10 24 L17 16" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section
          className={`relative flex min-h-screen items-center justify-center overflow-x-hidden transition-opacity duration-700 ${introDone ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ backgroundColor: "#066742" }}
        >
          <div className="bp-fly-corner-logo">
            <Image
              src="/bp-logo-transparent-black.png"
              alt="Boyar Partners logo"
              width={210}
              height={210}
              className="h-28 w-28 object-contain sm:h-36 sm:w-36"
              priority
            />
          </div>

          <div className="relative z-10">
            <div className="bp-center-row">
              <div className="bp-fly-name">
                <Image
                  src="/images/bp-logo-text-pasted-clean-distressed.png"
                  alt="Boyar Partners pasted wordmark"
                  width={299}
                  height={170}
                  className="h-20 w-auto object-contain sm:h-28"
                  priority
                />
              </div>
              <span className="bp-fly-line" aria-hidden="true" />
              <h1 className="bp-fly-title text-4xl text-black sm:text-6xl">
                Trajectory
              </h1>
            </div>
          </div>
        </section>

        <section
          id="first-page"
          className="bg-[#110000]"
          style={{ backgroundColor: "#110000" }}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="relative flex flex-col items-start justify-start pb-0 pt-24 text-left sm:pt-32">
              <h2
                className="mt-12 max-w-[560px] text-left text-4xl sm:mt-16 sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "var(--font-benzin)",
                  color: "#FDFBEE",
                }}
              >
                Why the timing is <span className="font-extrabold">RIGHT?</span>
              </h2>
              <div className="mt-14 w-full pr-1">
                <p
                  className={`text-2xl sm:text-3xl ${runMarketGlow ? "bp-market-glow" : ""}`}
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  <span
                    className="bp-market-sweep"
                    data-text="The Trust & Corporate Services Market Is Accelerating"
                  >
                    The Trust & Corporate Services Market Is Accelerating
                  </span>
                </p>
                <p className="mt-6 max-w-none text-base leading-relaxed text-white/60 sm:text-lg">
                  The global trust and corporate service market is projected to grow
                  from $14.33 billion in 2025 to $15.05 billion in 2026, reflecting
                  a CAGR of 5.0%. By 2035, the market is expected to reach $22.35
                  billion, growing at a projected CAGR of 6.51%. That is the baseline,
                  a $14 billion industry on a steady climb.
                </p>
              </div>

              <div
                ref={baselineStatsRef}
                id="stats-baseline"
                className="mt-10 w-full sm:mt-12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  THE MARKET BASELINE
                </p>
                <div className="mt-6 grid w-full grid-cols-1 gap-8 sm:mt-8 sm:grid-cols-3 sm:gap-6">
                  <article className="text-center sm:text-left">
                    <p
                      className="text-5xl tabular-nums text-[#FDFBEE] sm:text-6xl lg:text-7xl"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      ${baselineValues[0].toFixed(2)}B
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/50 sm:text-sm">
                      Global TCSP market size, 2025
                    </p>
                  </article>
                  <article className="text-center sm:text-left">
                    <p
                      className="text-5xl tabular-nums text-[#FDFBEE] sm:text-6xl lg:text-7xl"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      ${baselineValues[1].toFixed(2)}B
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/50 sm:text-sm">
                      Projected market size by 2035
                    </p>
                  </article>
                  <article className="text-center sm:text-left">
                    <p
                      className="text-5xl tabular-nums text-[#FDFBEE] sm:text-6xl lg:text-7xl"
                      style={{ fontFamily: "var(--font-benzin)" }}
                    >
                      {baselineValues[2].toFixed(2)}%
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/50 sm:text-sm">
                      Compound annual growth rate
                    </p>
                  </article>
                </div>
                <p className="mt-5 max-w-[700px] text-base leading-relaxed text-white/60 sm:mt-6 sm:text-lg">
                  That is the baseline, a $14 billion industry on a steady climb.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={bindEatRealScrollDriver}
            className="relative left-1/2 -mt-8 w-screen max-w-[100vw] -translate-x-1/2 sm:-mt-12 min-h-[1400vh] sm:min-h-[2800vh]"
          >
              <div className="relative flex h-[min(100dvh,100svh)] min-h-0 w-full flex-col items-center justify-center overflow-x-hidden overflow-y-visible [contain:layout] sticky top-0">
                <div
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: maroonBg }}
                />
                {/*
                  Use dvh (not %) for height — % often collapses to 0 with absolute + flex parents.
                */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-[1] w-full overflow-hidden"
                  style={{
                    height: `${Math.max(0, whiteFill) * 100}vh`,
                    maxHeight: "min(100dvh, 100svh)",
                    backgroundColor: offWhite,
                    borderRadius: "14px 14px 0 0",
                    opacity: whiteOverlayOpacity,
                    willChange: "height, width",
                  }}
                />

                {/* Maroon "return sheet" (covers the cream sheet from the bottom). */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-[1] w-full overflow-hidden"
                  style={{
                    height: `${Math.max(0, maroonFill) * 100}vh`,
                    maxHeight: "min(100dvh, 100svh)",
                    backgroundColor: maroonBg,
                    borderRadius: "14px 14px 0 0",
                    opacity: 1,
                    willChange: "height, width",
                  }}
                />

                {/* Big title + paragraph on the maroon sheet */}
                <div
                  className="absolute inset-0 z-[3] flex items-center justify-center px-4 pointer-events-none"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  <div className="relative text-center" style={{ fontFamily: "var(--font-benzin)" }}>
                    {/* Line 1 */}
                    <div
                      style={{
                        opacity: line1Opacity,
                        transform: `translateY(${line1FlipT * 10}px) rotateX(${line1FlipT * 92}deg)`,
                        transformOrigin: "50% 50%",
                        backfaceVisibility: "hidden",
                        willChange: "transform, opacity, filter",
                      }}
                    >
                      <div className="text-4xl font-extrabold tracking-[0.05em] text-[#FDFBEE] sm:text-5xl lg:text-6xl">
                        {LINE1_WORDS.map((w, i) => {
                          const wordPhase = line1BlurT * LINE1_WORDS.length - i;
                          const wordBlurT = clamp01(wordPhase);
                          const blurPx = wordBlurT * 10;
                          return (
                            <span
                              key={`${w}-${i}`}
                              style={{
                                display: "inline-block",
                                filter: `blur(${blurPx}px)`,
                                opacity: 1 - wordBlurT * 0.2,
                                marginRight: i === LINE1_WORDS.length - 1 ? 0 : 8,
                                willChange: "filter, opacity",
                              }}
                            >
                              {w}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Line 2 */}
                    <div
                      style={{
                        opacity: line2Opacity,
                        transform: `translateY(${line2FlipT * 10}px) rotateX(${line2FlipT * 92}deg)`,
                        transformOrigin: "50% 50%",
                        backfaceVisibility: "hidden",
                        willChange: "transform, opacity, filter",
                      }}
                    >
                      <div className="mt-3 text-4xl font-extrabold tracking-[0.05em] text-[#FDFBEE] sm:text-5xl lg:text-6xl">
                        {LINE2_WORDS.map((w, i) => {
                          const wordPhase = line2BlurT * LINE2_WORDS.length - i;
                          const wordBlurT = clamp01(wordPhase);
                          const blurPx = wordBlurT * 10;
                          return (
                            <span
                              key={`${w}-${i}`}
                              style={{
                                display: "inline-block",
                                filter: `blur(${blurPx}px)`,
                                opacity: 1 - wordBlurT * 0.2,
                                marginRight: i === LINE2_WORDS.length - 1 ? 0 : 8,
                                willChange: "filter, opacity",
                              }}
                            >
                              {w}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Paragraph (later phase) — with blur/flip disappear */}
                    {showMaroonParagraph ? (
                      <div
                        style={{
                          opacity: paragraphOpacityGated,
                          transform: `translateY(${paragraphTranslateY + paraFlipT * 10}px) rotateX(${paraFlipT * 92}deg)`,
                          transformOrigin: "50% 50%",
                          backfaceVisibility: "hidden",
                          willChange: "transform, opacity, filter",
                        }}
                      >
                        <p
                          className="mx-auto mt-10 w-full max-w-[1100px] px-4 text-center font-extrabold leading-relaxed text-[#FDFBEE] text-[26px] sm:text-[30px] lg:text-[34px] tracking-[0.01em]"
                        >
                          {PARAGRAPH_WORDS.map((word, idx) => {
                            const isActive = idx < activeWordCount;
                            const wordBlurPx = paraBlurT * 10;
                            return (
                              <span
                                key={`${idx}-${word}`}
                                style={{
                                  display: "inline",
                                  color: isActive ? "#FDFBEE" : "rgba(253,251,238,0.32)",
                                  filter: paraBlurT > 0 ? `blur(${wordBlurPx}px)` : undefined,
                                  transition: "color 180ms linear",
                                }}
                              >
                                {word}
                                {idx < PARAGRAPH_WORDS.length - 1 ? " " : null}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    ) : null}

                    {/* 5 Vertical Bars — realfood.gov-style reveal */}
                    {showBars ? (
                      <>
                      <div
                        className="mt-16 flex items-end justify-center gap-2 sm:gap-10 md:gap-12 pointer-events-auto"
                        style={{ height: "min(65vh, 520px)", willChange: "opacity" }}
                      >
                        {BAR_HEIGHTS.map((relH, i) => {
                          // Each bar gets 1/BAR_COUNT of the total animation — truly sequential.
                          const barStart = i / BAR_COUNT;
                          const barEnd = (i + 1) / BAR_COUNT;
                          const barLocalT = clamp01((barsAutoT - barStart) / (barEnd - barStart));
                          // Ease-out cubic for smooth plant-like growth.
                          const barEased = 1 - Math.pow(1 - barLocalT, 3);
                          const maxH = relH * 100;
                          return (
                            <div
                              key={i}
                              className="relative flex flex-col items-center justify-end cursor-pointer transition-transform hover:scale-[1.02]"
                              style={{ height: "100%", width: "clamp(56px, 16vw, 180px)" }}
                              onClick={() => openTrajectoryPanel(i)}
                            >
                              <div
                                className="flex flex-col items-start justify-start overflow-hidden p-1 sm:p-3 md:p-4 text-left"
                                style={{
                                  width: "100%",
                                  height: `${maxH * barEased}%`,
                                  backgroundColor: i < 3 ? "#B10000" : "#FF0000",
                                  borderRadius: 0,
                                  opacity: barEased > 0 ? 1 : 0,
                                  transformOrigin: "bottom center",
                                  willChange: "height, opacity",
                                }}
                              >
                                {barEased > 0.1 && (
                                  <span
                                    className={`font-black tracking-tight text-[#110000] leading-none ${
                                      i === 0 ? "text-base sm:text-lg md:text-xl" :
                                      i === 1 ? "text-lg sm:text-xl md:text-2xl" :
                                      i === 2 ? "text-xl sm:text-2xl md:text-3xl" :
                                      i === 3 ? "text-2xl sm:text-3xl md:text-4xl" :
                                                "text-3xl sm:text-4xl md:text-5xl"
                                    }`}
                                    style={{ fontFamily: "var(--font-benzin)" }}
                                  >
                                    {["Year 1", "Year 2", "Year 3", "Year 4-5", "Year 6-7"][i]}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="mt-10 md:mt-12 text-[#FFFFFF] font-extrabold text-lg sm:text-xl lg:text-2xl tracking-wide pointer-events-none drop-shadow-md pb-24"
                        style={{ fontFamily: "var(--font-avenir)", opacity: barsAutoT > 0.8 ? 1 : 0, transition: "opacity 0.8s ease", willChange: "opacity" }}
                      >
                        Click on bars to see Year by Year Trajectory
                      </div>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* No fractional opacity here — it blended PNGs over maroon and washed white text to grey. */}
                <div
                  className="absolute inset-0 z-[2] flex min-h-0 w-full flex-col items-center justify-center overflow-hidden px-2 py-0 sm:px-4 md:px-6 [perspective:900px]"
                  style={{
                    opacity: cardsLayerOpacity > 0 ? 1 : 0,
                    pointerEvents: cardsLayerOpacity > 0 ? "auto" : "none",
                  }}
                >
                  {nVisible >= 1 && (
                    <p
                      className="mb-4 text-center text-[15px] sm:text-base font-bold tracking-wide"
                      style={{
                        fontFamily: "Avenir, 'Avenir Next', Montserrat, sans-serif",
                        color: "#000000",
                        opacity: maroonFill <= 0.05 ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      (Click on know more to open card section)
                    </p>
                  )}
                  <LayoutGroup>
                    <div className="flex min-h-0 w-full max-w-[min(100%,1560px)] flex-row flex-nowrap items-center justify-center gap-1 sm:gap-5 md:gap-6 lg:gap-7">
                      {TRAJECTORY_SKIP_CARD_IMAGES.slice(0, nVisible).map((src, i) => (
                        <motion.div
                          key={src}
                          layout="position"
                          transition={LAYOUT_SHIFT}
                          className="relative flex shrink-0 flex-col items-center gap-2 sm:gap-2.5"
                        >
                          <div className="[filter:drop-shadow(0_16px_28px_rgba(17,0,0,0.32))]">
                            {/* Inner div gets all WAAPI transforms; outer handles row push only. */}
                            <div
                              ref={(el) => {
                                cardRefs.current[i] = el;
                              }}
                              role="presentation"
                              className="relative aspect-[292/392] w-[60px] overflow-hidden rounded-[12px] border-0 bg-transparent will-change-transform sm:w-[200px] sm:rounded-[20px] md:w-[240px] lg:w-[272px] xl:w-[300px] isolate [transform-style:preserve-3d]"
                              style={{ transformOrigin: "50% 45%" }}
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 120px, (max-width: 1024px) 200px, 300px"
                                className="block bg-transparent object-cover object-center [transform:translateZ(0)_scale(1.06)]"
                                draggable={false}
                              />
                            </div>
                          </div>
                          {i === 0 ? (
                            <button
                              type="button"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={() => { setCard1DetailOpen((o) => { if (!o) positionAndScrollToDetail(card1ExpandedRef); return !o; }); }}
                            >
                              {card1DetailOpen ? "close" : "click here to know more"}
                            </button>
                          ) : i === 1 ? (
                            <button
                              type="button"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={() => { setCard2DetailOpen((o) => { if (!o) positionAndScrollToDetail(card2ExpandedRef); return !o; }); }}
                            >
                              {card2DetailOpen ? "close" : "click here to know more"}
                            </button>
                          ) : i === 2 ? (
                            <button
                              type="button"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={() => { setCard3DetailOpen((o) => { if (!o) positionAndScrollToDetail(card3ExpandedRef); return !o; }); }}
                            >
                              {card3DetailOpen ? "close" : "click here to know more"}
                            </button>
                          ) : i === 3 ? (
                            <button
                              type="button"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={() => { setCard4DetailOpen((o) => { if (!o) positionAndScrollToDetail(card4ExpandedRef); return !o; }); }}
                            >
                              {card4DetailOpen ? "close" : "click here to know more"}
                            </button>
                          ) : i === 4 ? (
                            <button
                              type="button"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={() => { setCard5DetailOpen((o) => { if (!o) positionAndScrollToDetail(card5ExpandedRef); return !o; }); }}
                            >
                              {card5DetailOpen ? "close" : "click here to know more"}
                            </button>
                          ) : (
                            <a
                              href="#"
                              className="max-w-[60px] text-center text-[7px] leading-tight text-black underline-offset-2 hover:underline sm:max-w-[200px] sm:text-xs md:max-w-[240px] lg:max-w-[272px] xl:max-w-[300px]"
                              style={{ fontFamily: "var(--font-avenir)" }}
                              onClick={(e) => e.preventDefault()}
                            >
                              click here to know more
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </LayoutGroup>
                </div>

              </div>
          </div>

          {/* Card detail — regular flow after scroll driver, in cream */}
          {card1DetailOpen ? (
            <div ref={card1ExpandedRef} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
              <StructuralInsightCard1Expanded />
            </div>
          ) : null}
          {card2DetailOpen ? (
            <div ref={card2ExpandedRef} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
              <StructuralInsightCard2Expanded />
            </div>
          ) : null}
          {card3DetailOpen ? (
            <div ref={card3ExpandedRef} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
              <StructuralInsightCard3Expanded />
            </div>
          ) : null}
          {card4DetailOpen ? (
            <div ref={card4ExpandedRef} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
              <StructuralInsightCard4Expanded />
            </div>
          ) : null}
          {card5DetailOpen ? (
            <div ref={card5ExpandedRef} className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
              <StructuralInsightCard5Expanded />
            </div>
          ) : null}

          {/* Second scroll driver — heading/paragraph/bars after card details */}
          {(card1DetailOpen || card2DetailOpen || card3DetailOpen || card4DetailOpen || card5DetailOpen) ? (
            <div
              ref={bindSecondScrollDriver}
              className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 min-h-[1400vh] sm:min-h-[2800vh]"
            >
              <div className="relative flex h-[min(100dvh,100svh)] min-h-0 w-full flex-col items-center justify-center overflow-x-hidden overflow-y-visible [contain:layout] sticky top-0">
                <div className="absolute inset-0 z-0" style={{ backgroundColor: maroonBg }} />

                {/* Heading */}
                <div className="relative z-[2] flex flex-col items-center px-4 text-center">
                  <div style={{ opacity: sd2L1Opacity, transform: `translateY(${sd2L1FlipT * 10}px) rotateX(${sd2L1FlipT * 92}deg)`, transformOrigin: '50% 50%', backfaceVisibility: 'hidden', willChange: 'transform, opacity, filter' }}>
                    <div className="text-4xl font-extrabold tracking-[0.05em] text-[#FDFBEE] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-benzin)' }}>
                      {LINE1_WORDS.map((w, i) => {
                        const wp = sd2L1BlurT * LINE1_WORDS.length - i;
                        const wb = clamp01(wp) * 10;
                        return <span key={`s2-${w}-${i}`} style={{ display: 'inline-block', filter: `blur(${wb}px)`, opacity: 1 - clamp01(wp) * 0.2, marginRight: i === LINE1_WORDS.length - 1 ? 0 : 8, willChange: 'filter, opacity' }}>{w}</span>;
                      })}
                    </div>
                  </div>
                  <div style={{ opacity: sd2L2Opacity, transform: `translateY(${sd2L2FlipT * 10}px) rotateX(${sd2L2FlipT * 92}deg)`, transformOrigin: '50% 50%', backfaceVisibility: 'hidden', willChange: 'transform, opacity, filter' }}>
                    <div className="mt-3 text-4xl font-extrabold tracking-[0.05em] text-[#FDFBEE] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-benzin)' }}>
                      {LINE2_WORDS.map((w, i) => {
                        const wp = sd2L2BlurT * LINE2_WORDS.length - i;
                        const wb = clamp01(wp) * 10;
                        return <span key={`s2b-${w}-${i}`} style={{ display: 'inline-block', filter: `blur(${wb}px)`, opacity: 1 - clamp01(wp) * 0.2, marginRight: i === LINE2_WORDS.length - 1 ? 0 : 8, willChange: 'filter, opacity' }}>{w}</span>;
                      })}
                    </div>
                  </div>

                  {/* Paragraph */}
                  {sd2ShowPara ? (
                    <div style={{ opacity: sd2ParaOpacityGated, transform: `translateY(${sd2ParaFlipT * 10}px) rotateX(${sd2ParaFlipT * 92}deg)`, transformOrigin: '50% 50%', backfaceVisibility: 'hidden', willChange: 'transform, opacity, filter' }}>
                      <p className="mx-auto mt-10 w-full max-w-[1100px] px-4 text-center font-extrabold leading-relaxed text-[#FDFBEE] text-[26px] sm:text-[30px] lg:text-[34px] tracking-[0.01em]" style={{ fontFamily: 'var(--font-benzin)' }}>
                        {PARAGRAPH_WORDS.map((word, idx) => {
                          const isActive = idx < sd2ActiveWordCount;
                          const wordBlurPx2 = sd2ParaBlurT * 10;
                          return <span key={`s2p-${idx}-${word}`} style={{ color: isActive ? '#FDFBEE' : 'rgba(253,251,238,0.35)', filter: sd2ParaBlurT > 0 ? `blur(${wordBlurPx2}px)` : 'none', transition: 'color 0.35s ease', willChange: 'color, filter' }}>{word}{idx < PARAGRAPH_WORDS.length - 1 ? ' ' : null}</span>;
                        })}
                      </p>
                    </div>
                  ) : null}

                  {/* Bars */}
                  {sd2ShowBars ? (
                    <>
                    <div className="mt-16 flex items-end justify-center gap-2 sm:gap-10 md:gap-12 pointer-events-auto" style={{ height: 'min(65vh, 520px)' }}>
                      {BAR_HEIGHTS.map((relH, i) => {
                        const barDelay = i / BAR_HEIGHTS.length;
                        const barLocalT = clamp01((sd2BarsAutoT - barDelay) / (1 - barDelay));
                        const eased = 1 - (1 - barLocalT) ** 3;
                        return (
                          <div 
                            key={`s2bar-${i}`} 
                            className="relative flex flex-col items-center justify-end cursor-pointer transition-transform hover:scale-[1.02]" 
                            style={{ height: '100%', width: 'clamp(56px, 16vw, 180px)' }}
                            onClick={() => openTrajectoryPanel(i)}
                          >
                            <div
                              className="flex flex-col items-start justify-start overflow-hidden p-1 sm:p-3 md:p-4 text-left"
                              style={{ width: '100%', height: `${relH * eased * 100}%`, backgroundColor: i < 3 ? '#B10000' : '#FF0000', borderRadius: 0 }}
                            >
                              {eased > 0.1 && (
                                <span
                                  className={`font-black tracking-tight text-[#110000] leading-none ${
                                    i === 0 ? "text-base sm:text-lg md:text-xl" :
                                    i === 1 ? "text-lg sm:text-xl md:text-2xl" :
                                    i === 2 ? "text-xl sm:text-2xl md:text-3xl" :
                                    i === 3 ? "text-2xl sm:text-3xl md:text-4xl" :
                                              "text-3xl sm:text-4xl md:text-5xl"
                                  }`}
                                  style={{ fontFamily: "var(--font-benzin)" }}
                                >
                                  {["Year 1", "Year 2", "Year 3", "Year 4-5", "Year 6-7"][i]}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="mt-10 md:mt-12 text-[#FFFFFF] font-extrabold text-lg sm:text-xl lg:text-2xl tracking-wide pointer-events-none drop-shadow-md pb-24"
                      style={{ fontFamily: 'var(--font-avenir)', opacity: sd2BarsAutoT > 0.8 ? 1 : 0, transition: 'opacity 0.8s ease', willChange: 'opacity' }}
                    >
                      Click on bars to see Year by Year Trajectory
                    </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}




          {/* Extended maroon space */}
          <div
            className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
            style={{ backgroundColor: maroonBg, height: "20vh" }}
            aria-hidden="true"
          />

          {/* Competitive Landscape Section */}
          <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
            <CompetitiveLandscape />
          </section>

          {/* Revenue Architecture at Maturity */}
          <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
            <div className="cl-root">
              <div className="cl-hero" style={{ paddingTop: 60, paddingBottom: 40 }}>
                <div className="cl-hero-lbl">Part IV — Revenue Architecture</div>
                <h1>The Revenue Architecture<br/><span className="cl-red">At Maturity</span></h1>
                <p>By Year 5, Boyar&apos;s revenue should look like this (illustrative):</p>
              </div>

              <div className="cl-content" style={{ paddingTop: 0, paddingBottom: 80 }}>
                <div className="cl-panel cl-on" style={{ paddingTop: 24 }}>
                  <div className="cl-mc">
                    <h4>Core Corporate Services <span className="cl-r">(30%)</span></h4>
                    <p>Company formation, corporate services, registered office, director services, accounting — high-volume, moderate-margin, maximum stickiness through renewals.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>Structuring & Trust <span className="cl-r">(25%)</span></h4>
                    <p>Full structure mandates, standalone trusts, cross-border structuring, succession planning — high-value, high-margin, relationship-intensive.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>Licensing <span className="cl-r">(20%)</span></h4>
                    <p>VASP/CASP, iGaming, EMI, MSB, forex, fund licenses — highest margin, project-based but with recurring compliance components.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>Banking & Financial Services <span className="cl-r">(10%)</span></h4>
                    <p>Banking introductions, private banking desk, insurance brokerage — largely referral-based with recurring relationship fees.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>Fund Administration <span className="cl-r">(10%)</span></h4>
                    <p>NAV, investor reporting, compliance monitoring — recurring, operational, builds over time.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>Citizenship, Estate & Advisory <span className="cl-r">(5%)</span></h4>
                    <p>Residency programs, estate planning, family office advisory — high-touch, ultra-high-value, reputation-defining.</p>
                  </div>

                  <div className="cl-closing">
                    <h3>The Key Insight</h3>
                    <p>No single vertical dominates. Revenue concentration risk — which is Boyar&apos;s biggest vulnerability in Year 1 (Full Structure = 53% of revenue) — gets systematically diversified by Year 5. But the client remains concentrated in the best possible way: a single HNWI or corporate client might generate revenue across 4–5 of these verticals simultaneously.</p>
                  </div>
                </div>
              </div>

              <footer className="cl-footer">
                <p>Boyar Partners — Confidential Investor Document — 2025</p>
              </footer>
            </div>
          </section>

          {/* What Ambition Looks Like */}
          <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-[#FDFBEE]">
            <div className="cl-root">
              <div className="cl-hero" style={{ paddingTop: 60, paddingBottom: 40 }}>
                <div className="cl-hero-lbl">Part V — The Vision</div>
                <h1>What Ambition<br/><span className="cl-red">Looks Like</span></h1>
              </div>

              <div className="cl-content" style={{ paddingTop: 0, paddingBottom: 80 }}>
                <div className="cl-panel cl-on" style={{ paddingTop: 24 }}>
                  <div className="cl-block">
                    <div className="cl-block-t">Not Another Vistra</div>
                    <p>The most ambitious outcome for Boyar Partners isn&apos;t becoming another Vistra. Vistra is a volume play — 9,000 people, 50+ jurisdictions, PE-backed, acquisition-driven. That&apos;s one model.</p>
                  </div>

                  <div className="cl-mc">
                    <h4>The Rothschild & Co of Corporate Advisory <span className="cl-r">for the Digital Economy</span></h4>
                    <p>A firm that is small by headcount but disproportionately influential in the deals that matter. A firm where the partner who structures your holding company in Singapore is the same person who introduces you to the private banker in Geneva and advises on your family trust in New Zealand. A firm where 53 jurisdictions aren&apos;t just pins on a map but living, breathing relationships with regulators, banks, and legal counsel.</p>
                  </div>

                  <div className="cl-block">
                    <div className="cl-block-t">Success by 2032</div>
                  </div>

                  <div className="cl-stats">
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Active Clients</div>
                      <div className="cl-stat-val">200+ <span className="cl-r">across 53 jurisdictions</span></div>
                    </div>
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Revenue</div>
                      <div className="cl-stat-val cl-r">$10M–$15M</div>
                    </div>
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Recurring Revenue</div>
                      <div className="cl-stat-val">60%+</div>
                    </div>
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Gross Margins</div>
                      <div className="cl-stat-val">Above <span className="cl-r">55%</span></div>
                    </div>
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Boyar Network</div>
                      <div className="cl-stat-val">100+ <span className="cl-r">global partners</span></div>
                    </div>
                    <div className="cl-stat">
                      <div className="cl-stat-lbl">Brand Promise</div>
                      <div className="cl-stat-val" style={{ fontSize: 14 }}>If you cross borders, <span className="cl-r">start here</span></div>
                    </div>
                  </div>

                  <div className="cl-closing">
                    <h3>The Trajectory</h3>
                    <p>Not a hockey stick — a compound curve. The kind that looks modest in Year 1, impressive by Year 3, and inevitable by Year 7.</p>
                  </div>
                </div>
              </div>

              <footer className="cl-footer">
                <p>Boyar Partners — Confidential Investor Document — 2025</p>
              </footer>
            </div>
          </section>

          <TrajectoryDetailsPanel 
            isOpen={trajectoryPanelOpen}
            initialYearIndex={trajectoryPanelYear}
            onClose={() => setTrajectoryPanelOpen(false)}
          />
        </section>

        <style jsx global>{`
          /* Native Firefox scrollbar styling properties as fallback */
          html {
            scrollbar-width: auto;
            scrollbar-color: #555 #FDFBEE;
          }
          html[data-scroll-theme="maroon"] {
            scrollbar-color: #aaa #110000;
          }
          
          /* WebKit Chrome-like Custom Scrollbar */
          html::-webkit-scrollbar {
            width: 14px;
            height: 14px;
          }
          html::-webkit-scrollbar-track {
            background: #FDFBEE !important;
          }
          html::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.4) !important;
            border-radius: 9999px;
            border: 4px solid #FDFBEE;
            background-clip: padding-box;
          }
          html::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.6) !important;
          }

          /* Maroon Theme Scrollbar */
          html[data-scroll-theme="maroon"]::-webkit-scrollbar-track {
            background: #110000 !important;
          }
          html[data-scroll-theme="maroon"]::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3) !important;
            border: 4px solid #110000;
          }
          html[data-scroll-theme="maroon"]::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.5) !important;
          }
        `}</style>

        <style jsx>{`
          @font-face {
            font-family: "Die Grotesk D";
            src: url("https://realfood.gov/font/die-grotesk-d-bold.woff2") format("woff2");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }

          .bp-fly-logo {
            will-change: transform, opacity;
            animation: bp-logo-fly-in 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          .bp-fly-corner-logo {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 20;
            will-change: transform, opacity;
            animation: bp-corner-logo-fly-in 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          .bp-center-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.15rem;
            padding: 0 1rem;
          }

          .bp-fly-line {
            width: 5px;
            height: 80px;
            border-radius: 9999px;
            background: rgba(0, 0, 0, 0.9);
            will-change: transform, opacity;
            animation: bp-line-fly-in 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          .bp-fly-name {
            will-change: transform, opacity;
            animation: bp-name-fly-in 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          .bp-fly-title {
            font-family: "Die Grotesk D", sans-serif;
            will-change: transform, opacity;
            animation: bp-title-fly-in 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          .bp-market-glow {
            color: rgba(253, 251, 238, 0.62);
          }

          .bp-market-sweep {
            position: relative;
            display: inline-block;
            color: rgba(253, 251, 238, 0.62);
          }

          .bp-market-sweep::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 0%;
            overflow: hidden;
            white-space: nowrap;
            color: rgba(253, 251, 238, 0.96);
            text-shadow: 0 0 14px rgba(253, 251, 238, 0.26);
          }

          .bp-market-glow .bp-market-sweep::after {
            animation: bp-market-train 1350ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          }

          @keyframes bp-logo-fly-in {
            0% {
              transform: translate(-38vw, -34vh) scale(0.62) rotate(-24deg);
              opacity: 0;
            }
            100% {
              transform: translate(0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes bp-corner-logo-fly-in {
            0% {
              transform: translate(-48vw, 18vh) scale(0.58) rotate(-22deg);
              opacity: 0;
            }
            100% {
              transform: translate(calc(50vw - 132px), calc(-50vh + 96px)) scale(1) rotate(0deg);
              opacity: 0.96;
            }
          }

          @keyframes bp-line-fly-in {
            0% {
              transform: translate(-26vw, -20vh) scaleY(0.3);
              opacity: 0;
            }
            100% {
              transform: translate(0, 0) scaleY(1);
              opacity: 1;
            }
          }

          @keyframes bp-name-fly-in {
            0% {
              transform: translate(-33vw, 24vh) scale(0.8);
              opacity: 0;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
          }

          @keyframes bp-title-fly-in {
            0% {
              transform: translate(32vw, -28vh) scale(0.78);
              opacity: 0;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
          }

          @keyframes bp-market-train {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </main>
    </ProtectedRoute>
  );
}
