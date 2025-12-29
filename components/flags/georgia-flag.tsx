export function GeorgiaFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White field */}
      <rect width="3" height="2" fill="#FFFFFF" />
      {/* Red St. George's cross (main cross) */}
      <rect x="0" y="0.9" width="3" height="0.2" fill="#DA291C" />
      <rect x="1.35" y="0" width="0.3" height="2" fill="#DA291C" />
      {/* Four Bolnur-Katskhuri crosses (smaller crosses in each quadrant) */}
      {/* Top-left cross */}
      <g transform="translate(0.5, 0.3) scale(0.15)">
        <rect x="0" y="0.4" width="1" height="0.2" fill="#DA291C" />
        <rect x="0.4" y="0" width="0.2" height="1" fill="#DA291C" />
      </g>
      {/* Top-right cross */}
      <g transform="translate(2.5, 0.3) scale(0.15)">
        <rect x="0" y="0.4" width="1" height="0.2" fill="#DA291C" />
        <rect x="0.4" y="0" width="0.2" height="1" fill="#DA291C" />
      </g>
      {/* Bottom-left cross */}
      <g transform="translate(0.5, 1.5) scale(0.15)">
        <rect x="0" y="0.4" width="1" height="0.2" fill="#DA291C" />
        <rect x="0.4" y="0" width="0.2" height="1" fill="#DA291C" />
      </g>
      {/* Bottom-right cross */}
      <g transform="translate(2.5, 1.5) scale(0.15)">
        <rect x="0" y="0.4" width="1" height="0.2" fill="#DA291C" />
        <rect x="0.4" y="0" width="0.2" height="1" fill="#DA291C" />
      </g>
    </svg>
  );
}














