export function GibraltarFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White and red horizontal stripes */}
      {/* Top white stripe */}
      <rect width="3" height="0.5" fill="#FFFFFF" />
      {/* Red stripe */}
      <rect y="0.5" width="3" height="0.5" fill="#C8102E" />
      {/* White stripe */}
      <rect y="1.0" width="3" height="0.5" fill="#FFFFFF" />
      {/* Bottom red stripe */}
      <rect y="1.5" width="3" height="0.5" fill="#C8102E" />
      {/* Castle and key emblem in center */}
      <g transform="translate(1.2, 0.6) scale(0.4)">
        {/* Castle (simplified) */}
        <rect x="0.2" y="0.5" width="1.6" height="1" fill="#8B4513" />
        {/* Castle towers */}
        <rect x="0.2" y="0.3" width="0.4" height="0.5" fill="#8B4513" />
        <rect x="0.8" y="0.3" width="0.4" height="0.5" fill="#8B4513" />
        <rect x="1.4" y="0.3" width="0.4" height="0.5" fill="#8B4513" />
        {/* Castle gate */}
        <rect x="0.7" y="0.7" width="0.6" height="0.8" fill="#654321" />
        {/* Key hanging from castle */}
        <g transform="translate(1.0, 1.5)">
          {/* Key shaft */}
          <rect x="0.05" y="0" width="0.1" height="0.4" fill="#FFD700" />
          {/* Key head */}
          <circle cx="0.1" cy="0.5" r="0.15" fill="#FFD700" />
          {/* Key teeth */}
          <rect x="0.15" y="0.45" width="0.05" height="0.1" fill="#FFD700" />
        </g>
      </g>
    </svg>
  );
}














