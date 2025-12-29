export function BermudaFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red field (Red Ensign) */}
      <rect width="3" height="2" fill="#C8102E" />
      {/* Union Jack in canton */}
      <g transform="scale(0.5)">
        {/* Blue field */}
        <rect width="1.5" height="1" fill="#012169" />
        {/* White diagonal cross (St. Andrew's) */}
        <line x1="0" y1="0" x2="1.5" y2="1" stroke="#FFFFFF" strokeWidth="0.15" />
        <line x1="1.5" y1="0" x2="0" y2="1" stroke="#FFFFFF" strokeWidth="0.15" />
        {/* Red diagonal cross (St. Patrick's) */}
        <line x1="0" y1="0" x2="1.5" y2="1" stroke="#C8102E" strokeWidth="0.1" />
        <line x1="1.5" y1="0" x2="0" y2="1" stroke="#C8102E" strokeWidth="0.1" />
        {/* White horizontal cross (St. George's) */}
        <rect x="0" y="0.4" width="1.5" height="0.2" fill="#FFFFFF" />
        {/* White vertical cross */}
        <rect x="0.65" y="0" width="0.2" height="1" fill="#FFFFFF" />
        {/* Red horizontal cross */}
        <rect x="0" y="0.45" width="1.5" height="0.1" fill="#C8102E" />
        {/* Red vertical cross */}
        <rect x="0.7" y="0" width="0.1" height="1" fill="#C8102E" />
      </g>
      {/* Simplified coat of arms on fly side - red lion on white shield */}
      <g transform="translate(1.8, 0.3) scale(0.4)">
        <rect x="0" y="0" width="2" height="2.5" fill="#FFFFFF" stroke="#000000" strokeWidth="0.1" />
        <path d="M 0.5 0.5 L 1.5 0.5 L 1.2 1.5 L 0.8 1.5 Z" fill="#C8102E" />
        <circle cx="1" cy="1.2" r="0.15" fill="#FFD700" />
      </g>
    </svg>
  );
}














