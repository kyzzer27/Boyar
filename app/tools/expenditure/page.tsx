"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ExpenditurePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial time to 15 seconds
    video.currentTime = 15;

    const handleTimeUpdate = () => {
      // Loop from 15 seconds to 1 minute (60 seconds)
      if (video.currentTime >= 60) {
        video.currentTime = 15;
      }
    };

    const handleLoadedMetadata = () => {
      // Ensure video starts at 15 seconds
      video.currentTime = 15;
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Play video
    video.play().catch((error) => {
      console.error("Error playing video:", error);
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Full-screen video background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        muted
        loop={false}
        preload="auto"
      >
        <source src="/videos/expenditure-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Back button overlay */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-all duration-200 font-medium"
      >
        ← Back
      </button>
    </div>
  );
}

