export function CostaRicaFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue top stripe */}
      <rect width="3" height="0.4" fill="#002B7F" />
      {/* White stripe */}
      <rect y="0.4" width="3" height="0.4" fill="#FFFFFF" />
      {/* Red stripe (with shield) */}
      <rect y="0.8" width="3" height="0.4" fill="#CE1126" />
      {/* White stripe */}
      <rect y="1.2" width="3" height="0.4" fill="#FFFFFF" />
      {/* Blue bottom stripe */}
      <rect y="1.6" width="3" height="0.4" fill="#002B7F" />
      {/* Official shield on left side of red band */}
      <g transform="translate(0.3, 0.75) scale(0.25)">
        {/* Shield shape */}
        <path
          d="M 0.5 0 L 2.5 0 L 3 0.5 L 3 2 L 1.5 2.5 L 0 2 L 0 0.5 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="0.1"
        />
        {/* Three mountains (simplified) */}
        <path
          d="M 0.5 1.5 L 1 1 L 1.5 1.2 L 2 0.8 L 2.5 1 L 3 1.5 L 3 2 L 0.5 2 Z"
          fill="#008000"
        />
        {/* Sun above mountains */}
        <circle cx="1.5" cy="0.8" r="0.3" fill="#FFD700" />
        {/* Stars (simplified as small circles) */}
        <circle cx="0.8" cy="0.5" r="0.1" fill="#FFD700" />
        <circle cx="2.2" cy="0.5" r="0.1" fill="#FFD700" />
      </g>
    </svg>
  );
}














