/** Card 2 — Component 6: Relocation structuring cascade (inline SVG). */

function ArrowMarker({ id, fill }: { id: string; fill: string }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L8,4 L0,8 z" fill={fill} />
    </marker>
  );
}

export function RelocationCascadeSvg() {
  return (
    <svg
      viewBox="0 0 680 460"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <ArrowMarker id="m-navy" fill="#1E4A6E" />
        <ArrowMarker id="m-forest" fill="#2D5F3A" />
        <ArrowMarker id="m-amber" fill="#7A4A0A" />
        <ArrowMarker id="m-coral" fill="#D85A30" />
        <ArrowMarker id="m-char" fill="#4A3A18" />
        <ArrowMarker id="m-burg" fill="#6E2020" />
      </defs>

      {/* Row 1 */}
      <rect x="210" y="20" width="260" height="50" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="340" y="48" textAnchor="middle" fill="#E6F1FB" fontSize="14" fontWeight="500">
        One millionaire relocates
      </text>

      {/* Row 1 → Row 2 */}
      <line x1="340" y1="70" x2="112.5" y2="115" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#m-navy)" strokeLinecap="round" />
      <line x1="340" y1="70" x2="272.5" y2="115" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#m-navy)" strokeLinecap="round" />
      <line x1="340" y1="70" x2="422.5" y2="115" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#m-navy)" strokeLinecap="round" />
      <line x1="340" y1="70" x2="577.5" y2="115" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#m-navy)" strokeLinecap="round" />

      {/* Row 2 */}
      <rect x="30" y="115" width="165" height="50" rx="6" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="112.5" y="136" textAnchor="middle" fill="#E1F5EE" fontSize="13" fontWeight="500">
        Corporate restructure
      </text>
      <text x="112.5" y="152" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Holding + subsidiaries
      </text>

      <rect x="205" y="115" width="135" height="50" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="272.5" y="136" textAnchor="middle" fill="#E1F5EE" fontSize="13" fontWeight="500">
        Trust migration
      </text>
      <text x="272.5" y="152" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Asset protection
      </text>

      <rect x="350" y="115" width="145" height="50" fill="#7A4A0A" stroke="#854F0B" />
      <text x="422.5" y="136" textAnchor="middle" fill="#FAEEDA" fontSize="13" fontWeight="500">
        Banking intros
      </text>
      <text x="422.5" y="152" textAnchor="middle" fill="#FAC775" fontSize="11">
        New jurisdiction
      </text>

      <rect x="505" y="115" width="145" height="50" fill="#7A4A0A" stroke="#854F0B" />
      <text x="577.5" y="136" textAnchor="middle" fill="#FAEEDA" fontSize="13" fontWeight="500">
        Residency plan
      </text>
      <text x="577.5" y="152" textAnchor="middle" fill="#FAC775" fontSize="11">
        CBI / visa
      </text>

      {/* Row 2 → Row 3 */}
      <line x1="112.5" y1="165" x2="112.5" y2="210" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#m-forest)" strokeLinecap="round" />
      <line x1="272.5" y1="165" x2="272.5" y2="210" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#m-forest)" strokeLinecap="round" />
      <line x1="422.5" y1="165" x2="422.5" y2="210" stroke="#7A4A0A" strokeWidth="1.5" markerEnd="url(#m-amber)" strokeLinecap="round" />
      <line x1="577.5" y1="165" x2="577.5" y2="210" stroke="#7A4A0A" strokeWidth="1.5" markerEnd="url(#m-amber)" strokeLinecap="round" />

      {/* Row 3 */}
      <rect x="30" y="210" width="165" height="50" fill="#D85A30" stroke="#993C1D" />
      <text x="112.5" y="231" textAnchor="middle" fill="#FAECE7" fontSize="13" fontWeight="500">
        Succession redesign
      </text>
      <text x="112.5" y="247" textAnchor="middle" fill="#F5C4B3" fontSize="11">
        Multi-gen planning
      </text>

      <rect x="205" y="210" width="135" height="50" fill="#D85A30" stroke="#993C1D" />
      <text x="272.5" y="231" textAnchor="middle" fill="#FAECE7" fontSize="13" fontWeight="500">
        Compliance
      </text>
      <text x="272.5" y="247" textAnchor="middle" fill="#F5C4B3" fontSize="11">
        Ongoing annual
      </text>

      <rect x="350" y="210" width="145" height="50" fill="#D85A30" stroke="#993C1D" />
      <text x="422.5" y="231" textAnchor="middle" fill="#FAECE7" fontSize="13" fontWeight="500">
        VASP license
      </text>
      <text x="422.5" y="247" textAnchor="middle" fill="#F5C4B3" fontSize="11">
        If digital assets
      </text>

      <rect x="505" y="210" width="145" height="50" fill="#D85A30" stroke="#993C1D" />
      <text x="577.5" y="231" textAnchor="middle" fill="#FAECE7" fontSize="13" fontWeight="500">
        Estate planning
      </text>
      <text x="577.5" y="247" textAnchor="middle" fill="#F5C4B3" fontSize="11">
        Cross-border wills
      </text>

      {/* Row 3 → Row 4 converge */}
      <line x1="112.5" y1="260" x2="340" y2="315" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#m-coral)" strokeLinecap="round" />
      <line x1="272.5" y1="260" x2="340" y2="315" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#m-coral)" strokeLinecap="round" />
      <line x1="422.5" y1="260" x2="340" y2="315" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#m-coral)" strokeLinecap="round" />
      <line x1="577.5" y1="260" x2="340" y2="315" stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#m-coral)" strokeLinecap="round" />

      {/* Row 4 */}
      <rect x="100" y="315" width="480" height="56" rx="8" fill="#4A3A18" stroke="#6E5A3A" />
      <text x="340" y="338" textAnchor="middle" fill="#FAEEDA" fontSize="14" fontWeight="700">
        Permanent multi-jurisdictional relationship
      </text>
      <text x="340" y="358" textAnchor="middle" fill="#FAC775" fontSize="12">
        Recurring annual revenue across 3+ jurisdictions
      </text>

      {/* Row 4 → Row 5 */}
      <line x1="340" y1="371" x2="340" y2="410" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#m-char)" strokeLinecap="round" />

      {/* Row 5 */}
      <rect x="180" y="410" width="320" height="40" rx="8" fill="#6E2020" stroke="#9A3220" />
      <text x="340" y="434" textAnchor="middle" fill="#FCEBEB" fontSize="13" fontWeight="700">
        142,000 of these cascades in 2025 alone
      </text>
    </svg>
  );
}
