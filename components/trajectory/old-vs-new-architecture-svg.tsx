/** Card 2 — Component 2: Old vs New comparison (inline SVG). */

export function OldVsNewArchitectureSvg() {
  return (
    <svg
      viewBox="0 0 680 408"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker
          id="arrow-gold-panel"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 z" fill="#B8860B" />
        </marker>
      </defs>

      {/* Outer panels end above strike lines so labels sit clearly below the cards */}
      {/* LEFT PANEL — bottom y = 360 (h=330 from y=30) */}
      <rect
        x="30"
        y="30"
        width="295"
        height="330"
        rx="16"
        fill="#F5EDE0"
        stroke="#C7B99A"
        strokeWidth="0.5"
      />
      <text x="178" y="62" textAnchor="middle" fill="#6E5A3A" fontSize="14" fontWeight="500">
        The old architecture — dying
      </text>
      <text x="178" y="80" textAnchor="middle" fill="#B4B2A9" fontSize="12">
        1995–2019
      </text>

      <rect x="55" y="100" width="245" height="40" rx="6" fill="#E8E2D4" stroke="#C7B99A" />
      <text x="177.5" y="125" textAnchor="middle" dominantBaseline="middle" fill="#6E5A3A" fontSize="12">
        Legal shell — post box with bank account
      </text>

      <rect x="55" y="152" width="245" height="40" rx="6" fill="#E8E2D4" stroke="#C7B99A" />
      <text x="177.5" y="177" textAnchor="middle" dominantBaseline="middle" fill="#6E5A3A" fontSize="12">
        No local employees required
      </text>

      <rect x="55" y="204" width="245" height="40" rx="6" fill="#E8E2D4" stroke="#C7B99A" />
      <text x="177.5" y="229" textAnchor="middle" dominantBaseline="middle" fill="#6E5A3A" fontSize="12">
        No real economic activity
      </text>

      <rect x="55" y="256" width="245" height="40" rx="6" fill="#E8E2D4" stroke="#C7B99A" />
      <text x="177.5" y="281" textAnchor="middle" dominantBaseline="middle" fill="#6E5A3A" fontSize="12">
        $1,500 commodity formation
      </text>

      <rect x="55" y="308" width="245" height="40" rx="6" fill="#E8E2D4" stroke="#C7B99A" />
      <text x="177.5" y="333" textAnchor="middle" dominantBaseline="middle" fill="#6E5A3A" fontSize="12">
        One-time transaction, no relationship
      </text>

      {/* Arrow between panels */}
      <line
        x1="325"
        y1="205"
        x2="355"
        y2="205"
        stroke="#B8860B"
        strokeWidth="1.5"
        markerEnd="url(#arrow-gold-panel)"
        strokeLinecap="round"
      />

      {/* RIGHT PANEL */}
      <rect
        x="355"
        y="30"
        width="295"
        height="330"
        rx="16"
        fill="#2D5F3A"
        stroke="#0F6E56"
        strokeWidth="0.5"
      />
      <text x="503" y="62" textAnchor="middle" fill="#E1F5EE" fontSize="14" fontWeight="500">
        The new reality — emerging
      </text>
      <text x="503" y="80" textAnchor="middle" fill="#5DCAA5" fontSize="12">
        2025 onwards
      </text>

      <rect x="380" y="100" width="245" height="40" rx="6" fill="#245A35" stroke="#5DCAA5" />
      <text x="502.5" y="125" textAnchor="middle" dominantBaseline="middle" fill="#E1F5EE" fontSize="12">
        Real directors, real decisions, real substance
      </text>

      <rect x="380" y="152" width="245" height="40" rx="6" fill="#245A35" stroke="#5DCAA5" />
      <text x="502.5" y="177" textAnchor="middle" dominantBaseline="middle" fill="#E1F5EE" fontSize="12">
        Local staff and expenditure mandated
      </text>

      <rect x="380" y="204" width="245" height="40" rx="6" fill="#245A35" stroke="#5DCAA5" />
      <text x="502.5" y="229" textAnchor="middle" dominantBaseline="middle" fill="#E1F5EE" fontSize="12">
        Tax benefit proportional to real operations
      </text>

      <rect x="380" y="256" width="245" height="40" rx="6" fill="#245A35" stroke="#5DCAA5" />
      <text x="502.5" y="281" textAnchor="middle" dominantBaseline="middle" fill="#E1F5EE" fontSize="12">
        Advisory-depth structuring required
      </text>

      <rect x="380" y="308" width="245" height="40" rx="6" fill="#245A35" stroke="#5DCAA5" />
      <text x="502.5" y="333" textAnchor="middle" dominantBaseline="middle" fill="#E1F5EE" fontSize="12">
        Permanent recurring relationship
      </text>

      {/* Below both cards: strike lines + captions */}
      <line
        x1="55"
        y1="376"
        x2="300"
        y2="376"
        stroke="#C4402A"
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      <text x="178" y="398" textAnchor="middle" fill="#C4402A" fontSize="11">
        Invalidated by regulation
      </text>

      <line
        x1="380"
        y1="376"
        x2="625"
        y2="376"
        stroke="#5DCAA5"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      <text x="503" y="398" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Boyar&apos;s positioning
      </text>
    </svg>
  );
}
