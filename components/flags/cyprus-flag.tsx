export function CyprusFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White field */}
      <rect width="3" height="2" fill="#FFFFFF" />
      {/* Copper/orange island map silhouette in center */}
      <path
        d="M 1.2 0.7 L 1.4 0.6 L 1.6 0.65 L 1.8 0.7 L 1.9 0.85 L 1.85 1.0 L 1.7 1.15 L 1.5 1.2 L 1.3 1.15 L 1.15 1.0 L 1.1 0.85 Z"
        fill="#D52B1E"
      />
      {/* Two olive branches below the map */}
      <g transform="translate(1.1, 1.3) scale(0.15)">
        {/* Left olive branch */}
        <path
          d="M 0 0 L 0.5 0.2 L 0.3 0.4 L 0.7 0.5 L 0.4 0.7 L 0.8 0.8 L 0.5 1.0 L 0.2 0.8 L 0.4 0.6 L 0.1 0.5 L 0.3 0.3 L 0 0.1 Z"
          fill="#008000"
        />
        {/* Right olive branch */}
        <path
          d="M 2 0 L 1.5 0.2 L 1.7 0.4 L 1.3 0.5 L 1.6 0.7 L 1.2 0.8 L 1.5 1.0 L 1.8 0.8 L 1.6 0.6 L 1.9 0.5 L 1.7 0.3 L 2 0.1 Z"
          fill="#008000"
        />
      </g>
    </svg>
  );
}

