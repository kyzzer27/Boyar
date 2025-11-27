"use client";

import { useState } from "react";
import Image from "next/image";

interface FlagImageProps {
  jurisdictionId: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function FlagImage({ jurisdictionId, FlagComponent, className = "w-full h-full" }: FlagImageProps) {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/images/flags/${jurisdictionId}.png`;
  
  // If image fails to load, show SVG fallback
  if (imageError) {
    return <FlagComponent className={className} />;
  }
  
  return (
    <div className="relative w-full h-full">
      <Image
        src={imagePath}
        alt={`${jurisdictionId} flag`}
        fill
        className="object-contain"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
}

