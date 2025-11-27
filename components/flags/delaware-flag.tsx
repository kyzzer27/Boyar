export function DelawareFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Colonial blue field */}
      <rect width="3" height="2" fill="#3C3B6E" />
      {/* Buff-colored diamond in center */}
      <path
        d="M 1.5 0.3 L 2.2 1 L 1.5 1.7 L 0.8 1 Z"
        fill="#F0DC82"
      />
      {/* State coat of arms inside diamond - simplified */}
      <g transform="translate(1.2, 0.7) scale(0.3)">
        {/* Shield shape */}
        <path
          d="M 0.5 0 L 1.5 0 L 2 0.5 L 2 1.5 L 1.5 2 L 0.5 2 L 0 1.5 L 0 0.5 Z"
          fill="#3C3B6E"
        />
        {/* Horizontal stripes (representing the shield design) */}
        <rect x="0" y="0.3" width="2" height="0.15" fill="#FFFFFF" />
        <rect x="0" y="0.6" width="2" height="0.15" fill="#FFFFFF" />
        <rect x="0" y="0.9" width="2" height="0.15" fill="#FFFFFF" />
        {/* Date text area (simplified as a line) */}
        <rect x="0.3" y="1.3" width="1.4" height="0.2" fill="#F0DC82" />
        <text x="1" y="1.45" fontSize="0.15" fill="#3C3B6E" textAnchor="middle">1787</text>
      </g>
      {/* "DEC 7 1787" text below diamond */}
      <text
        x="1.5"
        y="1.85"
        fontSize="0.12"
        fill="#F0DC82"
        textAnchor="middle"
        fontFamily="serif"
        fontWeight="bold"
      >
        DEC 7 1787
      </text>
    </svg>
  );
}

