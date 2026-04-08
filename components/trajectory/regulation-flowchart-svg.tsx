/** Regulation-to-revenue flowchart — inline SVG (Component 4). */

export function RegulationFlowchartSvg() {
  return (
    <svg
      viewBox="0 0 680 520"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker
          id="arrow-coral"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 z" fill="#C4402A" />
        </marker>
        <marker id="arrow-d85" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#D85A30" />
        </marker>
        <marker id="arrow-gold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#B8860B" />
        </marker>
        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#2A7D5F" />
        </marker>
        <marker id="arrow-navy" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#1E4A6E" />
        </marker>
        <marker id="arrow-char" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#4A3A18" />
        </marker>
        <marker id="arrow-forest" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#2D5F3A" />
        </marker>
      </defs>

      {/* Row 1 */}
      <rect
        x="220"
        y="30"
        width="240"
        height="56"
        rx="8"
        fill="#C4402A"
        stroke="#9A3220"
        strokeWidth="1.5"
      />
      <text x="340" y="52" textAnchor="middle" fill="#FCEBEB" fontSize="13" fontWeight="600">
        New regulation enacted
      </text>
      <text x="340" y="70" textAnchor="middle" fill="#F7C1C1" fontSize="10">
        Pillar Two, MiCA, substance...
      </text>

      {/* Row 2 */}
      <rect x="40" y="140" width="186" height="56" rx="8" fill="#D85A30" stroke="#993C1D" strokeWidth="1.5" />
      <text x="133" y="162" textAnchor="middle" fill="#FAECE7" fontSize="11" fontWeight="600">
        Existing clients adapt
      </text>
      <text x="133" y="180" textAnchor="middle" fill="#F5C4B3" fontSize="9">
        Restructure mandates
      </text>

      <rect x="248" y="140" width="186" height="56" rx="8" fill="#B8860B" stroke="#854F0B" strokeWidth="1.5" />
      <text x="341" y="162" textAnchor="middle" fill="#FAEEDA" fontSize="11" fontWeight="600">
        Weak firms exit
      </text>
      <text x="341" y="180" textAnchor="middle" fill="#FAC775" fontSize="9">
        32% cite cost barriers
      </text>

      <rect x="455" y="140" width="186" height="56" rx="8" fill="#2A7D5F" stroke="#0F6E56" strokeWidth="1.5" />
      <text x="548" y="162" textAnchor="middle" fill="#E1F5EE" fontSize="11" fontWeight="600">
        Switching cost rises
      </text>
      <text x="548" y="180" textAnchor="middle" fill="#9FE1CB" fontSize="9">
        Architectural lock-in
      </text>

      {/* Row 3 */}
      <rect x="40" y="260" width="186" height="56" rx="8" fill="#1E4A6E" stroke="#0C447C" strokeWidth="1.5" />
      <text x="133" y="282" textAnchor="middle" fill="#E6F1FB" fontSize="11" fontWeight="600">
        New advisory demand
      </text>
      <text x="133" y="300" textAnchor="middle" fill="#B5D4F4" fontSize="9">
        Paid restructuring work
      </text>

      <rect x="248" y="260" width="186" height="56" rx="8" fill="#1E4A6E" stroke="#0C447C" strokeWidth="1.5" />
      <text x="341" y="282" textAnchor="middle" fill="#E6F1FB" fontSize="11" fontWeight="600">
        Clients seek quality
      </text>
      <text x="341" y="300" textAnchor="middle" fill="#B5D4F4" fontSize="9">
        Market concentrates
      </text>

      <rect x="455" y="260" width="186" height="56" rx="8" fill="#1E4A6E" stroke="#0C447C" strokeWidth="1.5" />
      <text x="548" y="282" textAnchor="middle" fill="#E6F1FB" fontSize="11" fontWeight="600">
        Retention exceeds 90%
      </text>
      <text x="548" y="300" textAnchor="middle" fill="#B5D4F4" fontSize="9">
        Recurring revenue locks
      </text>

      {/* Row 4 */}
      <rect x="120" y="370" width="440" height="56" rx="8" fill="#4A3A18" stroke="#6E5A3A" strokeWidth="1.5" />
      <text x="340" y="392" textAnchor="middle" fill="#FAEEDA" fontSize="12" fontWeight="600">
        Boyar&apos;s addressable market widens
      </text>
      <text x="340" y="412" textAnchor="middle" fill="#FAC775" fontSize="10">
        Floor rises, ceiling unlimited, middle expands
      </text>

      {/* Row 5 */}
      <rect x="170" y="470" width="340" height="44" rx="8" fill="#2D5F3A" stroke="#0F6E56" strokeWidth="1.5" />
      <text x="340" y="497" textAnchor="middle" fill="#E1F5EE" fontSize="11" fontWeight="600">
        37 years of proof: Sovereign Group
      </text>

      {/* Arrows row1 → row2 */}
      <path
        d="M 300 86 L 133 140"
        fill="none"
        stroke="#C4402A"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#arrow-coral)"
      />
      <path
        d="M 340 86 L 341 140"
        fill="none"
        stroke="#C4402A"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#arrow-coral)"
      />
      <path
        d="M 380 86 L 548 140"
        fill="none"
        stroke="#C4402A"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#arrow-coral)"
      />

      {/* row2 → row3 */}
      <path d="M 133 196 L 133 260" fill="none" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#arrow-d85)" />
      <path d="M 341 196 L 341 260" fill="none" stroke="#B8860B" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />
      <path d="M 548 196 L 548 260" fill="none" stroke="#2A7D5F" strokeWidth="1.5" markerEnd="url(#arrow-green)" />

      {/* row3 → row4 */}
      <path d="M 133 316 L 200 370" fill="none" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#arrow-navy)" />
      <path d="M 341 316 L 340 370" fill="none" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#arrow-navy)" />
      <path d="M 548 316 L 480 370" fill="none" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#arrow-navy)" />

      {/* row4 → row5 */}
      <path d="M 340 426 L 340 470" fill="none" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#arrow-char)" />
    </svg>
  );
}
