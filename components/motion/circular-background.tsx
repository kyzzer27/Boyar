"use client";

import { useEffect, useState, useMemo, memo } from "react";

function CircularBackgroundComponent() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const orbs = useMemo(() => {
    const basePositions = [
      { x: 0.2, y: 0.3 },
      { x: 0.8, y: 0.2 },
      { x: 0.3, y: 0.7 },
      { x: 0.7, y: 0.8 },
    ];
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: 60 + ((i * 37) % 80),
      x: basePositions[i].x * dimensions.width,
      y: basePositions[i].y * dimensions.height,
      duration: 20 + i * 10,
      delay: i * 1.5,
      moveX: ((i % 2 === 0 ? 1 : -1) * (60 + i * 30)),
      moveY: ((i % 2 === 0 ? -1 : 1) * (50 + i * 25)),
    }));
  }, [dimensions.width, dimensions.height]);

  const shapes = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 50 + i * 8,
      x: (dimensions.width / 9) * (i + 1),
      y: dimensions.height / 2 + Math.sin(i) * 150,
      duration: 8 + i * 2,
      delay: i * 0.5,
      isCircle: i % 2 === 0,
    })),
    [dimensions.width, dimensions.height]
  );

  const lines = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x1: (dimensions.width / 6) * (i + 1),
      y1: dimensions.height / 2,
      x2: (dimensions.width / 6) * (i + 2),
      y2: dimensions.height / 2,
      duration: 3 + i,
      delay: i * 0.3,
    })),
    [dimensions.width, dimensions.height]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        contain: "layout style paint",
        isolation: "isolate",
      }}
    >
      {/* Orbs — CSS animated */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            filter: "blur(2px)",
            backfaceVisibility: "hidden",
            ["--mx" as string]: `${orb.moveX}px`,
            ["--my" as string]: `${orb.moveY}px`,
            animation: `bg-orb-drift ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
          }}
        />
      ))}

      {/* Center glow — CSS animated */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          left: "50%",
          top: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 50%, transparent 70%)",
          filter: "blur(20px)",
          backfaceVisibility: "hidden",
          animation: "bg-center-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: -1 }}
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Shapes — CSS animated */}
      {shapes.map((s) => (
        <div
          key={`shape-${s.id}`}
          className="absolute"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: s.isCircle ? "50%" : "25%",
            background: "rgba(255,255,255,0.05)",
            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
            backfaceVisibility: "hidden",
            animation: `bg-shape-float ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Lines — CSS animated */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: -1 }}>
        {lines.map((l) => (
          <line
            key={`line-${l.id}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="5,5"
            style={{
              animation: `bg-line-dash ${l.duration}s ease-in-out ${l.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export const CircularBackground = memo(CircularBackgroundComponent);
