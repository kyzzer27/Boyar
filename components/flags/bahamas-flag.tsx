export function BahamasFlag({ className = "w-16 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Aquamarine top stripe */}
      <rect width="3" height="0.67" fill="#00ABC9" />
      {/* Gold middle stripe */}
      <rect y="0.67" width="3" height="0.66" fill="#FFC72C" />
      {/* Aquamarine bottom stripe */}
      <rect y="1.33" width="3" height="0.67" fill="#00ABC9" />
      {/* Black triangle on hoist side */}
      <polygon points="0,0 0,2 1,1" fill="#000000" />
    </svg>
  );
}

