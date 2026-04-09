"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ExpenditureDashboard } from "@/components/expenditure/expenditure-dashboard";
import { InitialMonthCostChart } from "@/components/expenditure/initial-month-cost-chart";

// Animation Configuration - Easy to edit (Hollywood Director Style)
const ANIMATION_CONFIG = {
  duration: 3.5, // Total animation duration - slow, cinematic reveal
  blurDuration: 0.8, // Blur fade-out duration - longer for premium feel
  easing: [0.16, 1, 0.3, 1], // Smooth ease-out curve for elegant motion
  initialDelay: 0.2, // Small delay before reveal starts for dramatic effect
};

export default function ExpenditurePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [revealProgress, setRevealProgress] = useState(0); // 0 = closed, 1 = fully open
  const [isDisclaimerRead, setIsDisclaimerRead] = useState(false);
  const [showVideoSection, setShowVideoSection] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showDisclaimerText, setShowDisclaimerText] = useState(true);
  const [showInitialMonthCost, setShowInitialMonthCost] = useState(false);

  useEffect(() => {
    // Start the eye-opening reveal animation with initial delay
    const startTime = Date.now();
    let animationId: number;
    let done = false;
    
    // Cubic bezier easing function for smooth, elegant motion
    const cubicBezier = (t: number, x1: number, y1: number, x2: number, y2: number): number => {
      // Simplified cubic bezier approximation
      const cx = 3 * x1;
      const bx = 3 * (x2 - x1) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * y1;
      const by = 3 * (y2 - y1) - cy;
      const ay = 1 - cy - by;
      
      const sampleCurveX = (t: number): number => {
        return ((ax * t + bx) * t + cx) * t;
      };
      
      const sampleCurveY = (t: number): number => {
        return ((ay * t + by) * t + cy) * t;
      };
      
      // Binary search for t
      let t0 = 0;
      let t1 = 1;
      let t2 = t;
      let x2_ = sampleCurveX(t2);
      
      for (let i = 0; i < 12; i++) {
        if (Math.abs(x2_ - t) < 0.0001) break;
        if (x2_ > t) t1 = t2;
        else t0 = t2;
        t2 = (t0 + t1) / 2;
        x2_ = sampleCurveX(t2);
      }
      
      return sampleCurveY(t2);
    };
    
    const animate = () => {
      if (done) return;
      
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Account for initial delay
      if (elapsed < ANIMATION_CONFIG.initialDelay) {
        setRevealProgress(0);
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate progress after delay
      const adjustedElapsed = elapsed - ANIMATION_CONFIG.initialDelay;
      const progress = Math.min(adjustedElapsed / ANIMATION_CONFIG.duration, 1);
      
      // Apply cubic bezier easing for smooth, gradual reveal
      const [x1, y1, x2, y2] = ANIMATION_CONFIG.easing;
      const easedProgress = cubicBezier(progress, x1, y1, x2, y2);
      
      setRevealProgress(easedProgress);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        done = true;
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      done = true;
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // Ensure video autoplays and goes fullscreen
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (video) {
      // Set video properties for autoplay (start muted for autoplay compatibility)
      video.muted = true; // Required for autoplay in most browsers
      video.volume = 1; // Set volume to max when unmuted
      
      // Try to play immediately
      const playVideo = async () => {
        try {
          await video.play();
          
          // Request fullscreen after animation completes
          setTimeout(async () => {
            try {
              if (video.requestFullscreen) {
                await video.requestFullscreen();
              } else if ((video as any).webkitRequestFullscreen) {
                await (video as any).webkitRequestFullscreen();
              } else if ((video as any).mozRequestFullScreen) {
                await (video as any).mozRequestFullScreen();
              } else if ((video as any).msRequestFullscreen) {
                await (video as any).msRequestFullscreen();
              }
            } catch (err) {
              console.error("Fullscreen request failed:", err);
            }
          }, ANIMATION_CONFIG.duration * 1000 + 200);
        } catch (err) {
          console.error("Autoplay prevented:", err);
          // If autoplay fails, try again when user interacts
          const handleInteraction = () => {
            video.play();
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
          };
          document.addEventListener("click", handleInteraction);
          document.addEventListener("touchstart", handleInteraction);
        }
      };

      // Handle audio playback starting at 01:05:00 (65 seconds)
      const handleTimeUpdate = () => {
        if (audio && video.currentTime >= 65 && audio.paused) {
          // Start audio at 65 seconds (01:05:00)
          audio.currentTime = 0; // Start audio from beginning
          audio.muted = isMuted;
          audio.volume = isMuted ? 0 : 1;
          audio.play().catch((err) => {
            console.error("Audio autoplay prevented:", err);
          });
        }
      };

      // Wait for video to be ready
      if (video.readyState >= 2) {
        playVideo();
        video.addEventListener("timeupdate", handleTimeUpdate);
      } else {
        video.addEventListener("loadeddata", () => {
          playVideo();
          video.addEventListener("timeupdate", handleTimeUpdate);
        }, { once: true });
      }

      return () => {
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isMuted]);

  const toggleMute = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (video) {
      video.muted = newMutedState;
      if (!newMutedState) {
        video.volume = 1;
      }
    }
    
    // Also control audio volume
    if (audio) {
      audio.muted = newMutedState;
      audio.volume = newMutedState ? 0 : 1;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white relative">
        {/* Dashboard - Shown First */}
        <AnimatePresence>
          {showDashboard && (
            <ExpenditureDashboard
              onButtonClick={(buttonId) => {
                console.log("Button clicked:", buttonId);
                // Only show disclaimer/video section when disclaimer button is clicked
                if (buttonId === "disclaimer") {
                  setShowVideoSection(true);
                  setShowDashboard(false);
                  setIsDisclaimerRead(false); // Reset disclaimer state
                  setShowDisclaimerText(true); // Show disclaimer text
                } else if (buttonId === "initial-month-cost") {
                  setShowInitialMonthCost(true);
                  setShowDashboard(false);
                } else if (buttonId === "burn-rate-summary") {
                  router.push("/expenditure/burn-rate-summary");
                } else if (buttonId === "brief-assessment") {
                  router.push("/expenditure/burn-rate-summary/brief-assessment");
                } else {
                  // Handle other button clicks (can add navigation or other actions here)
                  console.log(`Navigate to ${buttonId} section`);
                }
              }}
              onClose={() => router.back()}
            />
          )}
        </AnimatePresence>

        {/* Video Section - Shown after disclaimer is accepted */}
        <AnimatePresence>
          {showVideoSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-black text-white relative"
            >
        {/* Back Button - Fixed at top left */}
        <button
          onClick={() => {
            setShowVideoSection(false);
            setShowDashboard(true);
            setIsDisclaimerRead(false);
            setShowDisclaimerText(true);
          }}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-black/50 hover:bg-black/70 border border-white/20 rounded-lg text-white transition-all flex items-center gap-2"
          style={{ fontFamily: 'var(--font-benzin)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>



        {/* Background Audio - Hidden */}
        <audio
          ref={audioRef}
          preload="auto"
          loop
          muted={isMuted}
          onError={(e) => {
            console.error("Audio loading error:", e);
          }}
          onLoadedData={() => {
            console.log("Audio loaded successfully");
            if (audioRef.current) {
              audioRef.current.volume = isMuted ? 0 : 1;
            }
          }}
        >
          <source src="/audio/Nicholas_Dodd_-_Dinner_Jackets_(mp3.pm).mp3" type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>

        {/* Black Overlay - Starts covering everything, fades out gradually */}
        <motion.div
          className="fixed inset-0 bg-black z-40"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: revealProgress >= 0.8 ? Math.max(0, 1 - (revealProgress - 0.8) * 5) : 1 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Fullscreen Video Container with Eye-Opening Reveal */}
        <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <motion.div
            className="w-full h-full flex items-center justify-center relative"
            style={{
              clipPath: `circle(${revealProgress * 141.42}% at 50% 50%)`,
              filter: revealProgress < (ANIMATION_CONFIG.blurDuration / ANIMATION_CONFIG.duration)
                ? `blur(${20 * (1 - revealProgress / (ANIMATION_CONFIG.blurDuration / ANIMATION_CONFIG.duration))}px)`
                : 'blur(0px)',
              transition: 'clip-path 0.05s linear, filter 0.1s ease-out',
              willChange: 'clip-path, filter'
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              autoPlay
              playsInline
              loop
              preload="auto"
              muted={isMuted}
              onError={(e) => {
                console.error("Video loading error:", e);
              }}
              onLoadedData={() => {
                console.log("Video loaded successfully");
              }}
            >
              <source src="/videos/14710623_3840_2160_60fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Scrollable Text Overlay - Above Video */}
        {showDisclaimerText && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-start justify-center pt-20 sm:pt-24 md:pt-32">
          <div className="w-full max-w-4xl mx-4 sm:mx-6 md:mx-8 pointer-events-auto">
            <div className="p-6 sm:p-8 md:p-10 max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: '#ffffff',
                fontWeight: 500
              }}>
                <p className="font-bold text-lg sm:text-xl md:text-2xl mb-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#ffffff',
                  textShadow: '3px 3px 12px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 700
                }}>
                  To Our Investors,
                </p>
                
                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Welcome to the Expenditure Overview. This section is designed to provide complete transparency into how operational capital is deployed — ensuring there is no ambiguity regarding the financial framework underpinning this firm's operations.
                </p>

                <p className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 12px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 700
                }}>
                  On Our Cost Structure
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  As a boutique advisory firm — not a capital-intensive manufacturing operation — our expenditure profile is inherently weighted toward service enablement, client acquisition infrastructure, and brand positioning. Certain line items may appear unconventional relative to traditional business models; however, each has been evaluated against a simple threshold: does this expenditure directly support client acquisition, operational capacity, service delivery, or brand credibility at a standard consistent with our market positioning? Only items that meet this criterion have been included. These are not discretionary costs — they are structural requirements of a credibility-driven, high-touch service model.
                </p>

                <p className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 12px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 700
                }}>
                  On Cost Optimisation
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  We actively welcome investor collaboration in reducing costs where equivalent quality can be maintained at a lower rate. What we will not do is implement reductions that compromise execution quality, dilute market positioning, or impair client-facing outcomes. Cost savings that weaken performance are not savings — they are misallocations that erode capital, time, and operational momentum.
                </p>

                <p className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 12px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 700
                }}>
                  On Fund Governance & Accountability
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  No allocated capital will be directed toward personal use under any circumstance. Every rupee deployed will be documented transparently and shared via weekly or monthly expenditure reports, accompanied by performance commentary illustrating the return generated from each cost segment. Any draw on contingency reserves will be disclosed and approved prior to deployment.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  All expenditure decisions are subject to structured governance: monthly board-level review during the current operating phase, transitioning to quarterly cadence as the firm matures. This rhythm ensures financial discipline remains anchored to both near-term execution priorities and long-term strategic direction.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  For immediate queries, our investor chatbot is available at all times. For matters requiring direct engagement, Joel Yadav and Inderjeet Bandwal remain personally accessible.
                </p>

                <p className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 12px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 700
                }}>
                  A Note of Gratitude
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Your trust, patience, and partnership afford us the runway to build a firm that reflects the operational discipline and professional calibre this market demands. We do not take that lightly. Our commitment is to steward your capital with rigour, transparency, and an unwavering focus on investor-aligned outcomes.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Thank you for your confidence in what we are building together.
                </p>


              </div>
            </div>
          </div>
        </div>
        )}



            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial Month Cost Chart */}
        <AnimatePresence>
          {showInitialMonthCost && (
            <InitialMonthCostChart
              onClose={() => {
                setShowInitialMonthCost(false);
                setShowDashboard(true);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}


