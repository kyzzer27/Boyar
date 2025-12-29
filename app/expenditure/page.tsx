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
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Account for initial delay
      if (elapsed < ANIMATION_CONFIG.initialDelay) {
        setRevealProgress(0);
        requestAnimationFrame(animate);
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
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
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

        {/* Mute/Unmute Button - Fixed at top right */}
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/50 hover:bg-black/70 border border-white/20 rounded-lg text-white transition-all flex items-center gap-2"
          style={{ fontFamily: 'var(--font-benzin)' }}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
          {isMuted ? "Unmute" : "Mute"}
        </button>

        {/* Background Audio - Hidden */}
        <audio
          ref={audioRef}
          preload="auto"
          loop
          muted={isMuted}
          volume={isMuted ? 0 : 1}
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
                  Dear Investors,
                </p>
                
                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Welcome to the expenditure overview. Our intent is to ensure full clarity and alignment on how operational funds are allocated so that there is no room for miscommunication or uncertainty regarding the financial framework required to operate this boutique advisory firm.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  As we are not a physical manufacturing business, our cost structure is inherently oriented toward service-driven and sales-enabling assets. Some line items may appear unconventional at first glance; however, each has been carefully assessed and included only because it directly supports client acquisition, operational efficiency, brand positioning, or service delivery at a standard consistent with the expectations of a boutique advisory firm. These expenditures are not discretionary—they are essential components of a competitive, credibility-driven service model.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  We value your partnership deeply. If any investor can help reduce costs by providing equivalent services at a lower rate—without compromising the output quality we must maintain—we genuinely welcome such collaboration. At the same time, we must emphasize that we will not implement cost reductions that weaken execution, dilute brand perception, or hinder outcomes. Forced reductions that impair performance would ultimately waste capital, time, and human resources, which is not in the best interest of the company or its investors.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  We also want to reassure you that no funds will ever be used for personal purposes. Every rupee allocated will be transparently documented and shared through weekly or monthly expenditure reports, accompanied by performance insights that illustrate the value generated from each cost segment. Any usage of contingency reserves will be disclosed prior to allocation, ensuring full transparency and trust.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  We maintain a disciplined governance structure. All expenditure-related matters will be reviewed in monthly board meetings and, as operations mature, transitioned into quarterly reviews. This structured rhythm ensures that financial decisions remain aligned with both short-term priorities and long-term strategic direction. Should any questions or concerns arise, you may use our chatbot system for immediate clarifications or reach out directly to the founders, Joel Yadav or Inderjeet Bandwal.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Finally, we appreciate the trust and patience you have extended to us. Your support allows us to focus on building a firm that not only operates efficiently but also reflects the calibre and professionalism expected from a boutique advisory entity. Our commitment is to manage your capital with discipline, transparency, and respect, always keeping investor interests at the forefront.
                </p>

                <p className="text-justify" style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)',
                  fontWeight: 500
                }}>
                  Thank you once again for your confidence in our vision and for walking this journey with us.
                </p>

                {/* Disclaimer Checkbox */}
                <div className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsDisclaimerRead(!isDisclaimerRead)}
                    className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isDisclaimerRead
                        ? 'bg-white border-white'
                        : 'bg-transparent border-white/70 hover:border-white'
                    }`}
                    style={{
                      boxShadow: isDisclaimerRead
                        ? '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                        : 'none'
                    }}
                  >
                    {isDisclaimerRead && (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <label
                    onClick={() => setIsDisclaimerRead(!isDisclaimerRead)}
                    className="text-white cursor-pointer text-sm sm:text-base md:text-lg"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      textShadow: '3px 3px 10px rgba(0, 0, 0, 1), 0 0 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.9), 0 0 38px rgba(0, 0, 0, 0.85), 1px 1px 2px rgba(0, 0, 0, 1)'
                    }}
                  >
                    I have read the full disclaimer before entering expenditure section
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Enter Button - Appears when disclaimer is checked */}
        {isDisclaimerRead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <button
              onClick={() => {
                setShowDisclaimerText(false);
                // Ensure video plays
                if (videoRef.current) {
                  videoRef.current.play().catch(console.error);
                }
              }}
              className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg sm:text-xl hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-white/50"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                boxShadow: '0 10px 40px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              Enter
            </button>
          </motion.div>
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


