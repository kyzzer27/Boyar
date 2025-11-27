export function GuernseyFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White background */}
      <rect width="3" height="2" fill="#FFFFFF" />
      {/* Red cross (St. George's cross) */}
      <rect x="0" y="0.9" width="3" height="0.2" fill="#E8112D" />
      <rect x="1.35" y="0" width="0.3" height="2" fill="#E8112D" />
      {/* Gold cross inside (simplified as a smaller cross) */}
      <g transform="translate(1.35, 0.9)">
        {/* Gold horizontal bar */}
        <rect x="-0.15" y="0.05" width="0.3" height="0.1" fill="#FFD700" />
        {/* Gold vertical bar */}
        <rect x="0.05" y="-0.15" width="0.1" height="0.3" fill="#FFD700" />
      </g>
    </svg>
  );
}

