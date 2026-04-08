/** Point 5 — Component 4: Structural protection flowchart */

export function StructuralProtectionSvg() {
  return (
    <svg
      viewBox="0 0 680 340"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker id="sp-a1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#4A3A18" />
        </marker>
        <marker id="sp-a2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#2D5F3A" />
        </marker>
        <marker id="sp-a3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#6E2020" />
        </marker>
      </defs>

      <rect x="190" y="20" width="300" height="44" rx="8" fill="#4A3A18" stroke="#6E5A3A" />
      <text x="340" y="46" textAnchor="middle" fill="#FAEEDA" fontSize="14" fontWeight="700">
        Why no disciplined TCSP has failed
      </text>

      <line x1="260" y1="64" x2="115" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sp-a1)" />
      <line x1="300" y1="64" x2="290" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sp-a1)" />
      <line x1="380" y1="64" x2="440" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sp-a1)" />
      <line x1="420" y1="64" x2="582" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sp-a1)" />

      <rect x="30" y="105" width="170" height="56" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="115" y="128" textAnchor="middle" fill="#E1F5EE" fontSize="13" fontWeight="600">
        90%+ retention
      </text>
      <text x="115" y="148" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Architectural lock-in
      </text>

      <rect x="215" y="105" width="150" height="56" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="290" y="128" textAnchor="middle" fill="#E6F1FB" fontSize="13" fontWeight="600">
        80%+ margins
      </text>
      <text x="290" y="148" textAnchor="middle" fill="#B5D4F4" fontSize="11">
        On admin renewals
      </text>

      <rect x="380" y="105" width="120" height="56" rx="8" fill="#6B3FA0" stroke="#4A2060" />
      <text x="440" y="128" textAnchor="middle" fill="#EEEDFE" fontSize="13" fontWeight="600">
        Recurring
      </text>
      <text x="440" y="148" textAnchor="middle" fill="#CECBF6" fontSize="11">
        Annual by law
      </text>

      <rect x="515" y="105" width="135" height="56" rx="8" fill="#7A4A0A" stroke="#854F0B" />
      <text x="582.5" y="128" textAnchor="middle" fill="#FAEEDA" fontSize="13" fontWeight="600">
        Counter-cyclical
      </text>
      <text x="582.5" y="148" textAnchor="middle" fill="#FAC775" fontSize="11">
        Recessions add demand
      </text>

      <line x1="115" y1="161" x2="115" y2="205" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#sp-a2)" />
      <line x1="290" y1="161" x2="290" y2="205" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#sp-a2)" />
      <line x1="440" y1="161" x2="440" y2="205" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#sp-a2)" />
      <line x1="582.5" y1="161" x2="582.5" y2="205" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#sp-a2)" />

      <rect x="80" y="205" width="520" height="50" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="340" y="228" textAnchor="middle" fill="#E1F5EE" fontSize="14" fontWeight="700">
        Self-funding growth, profitability from Year 1
      </text>
      <text x="340" y="246" textAnchor="middle" fill="#5DCAA5" fontSize="12">
        No external capital ever required
      </text>

      <line x1="340" y1="255" x2="340" y2="290" stroke="#6E2020" strokeWidth="1.5" markerEnd="url(#sp-a3)" />

      <rect x="130" y="290" width="420" height="40" rx="8" fill="#6E2020" stroke="#9A3220" />
      <text x="340" y="314" textAnchor="middle" fill="#FCEBEB" fontSize="13" fontWeight="700">
        Zero failures across 37+ years, 4+ firms, multiple cycles
      </text>
    </svg>
  );
}
