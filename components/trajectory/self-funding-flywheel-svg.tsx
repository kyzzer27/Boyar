/** Point 4 — Component 7: Self-funding flywheel */

export function SelfFundingFlywheelSvg() {
  return (
    <svg
      viewBox="0 0 680 340"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker id="fw-a1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#2A7D5F" />
        </marker>
        <marker id="fw-a2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#1E4A6E" />
        </marker>
        <marker id="fw-a3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#7A4A0A" />
        </marker>
        <marker id="fw-a4" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#6B3FA0" />
        </marker>
      </defs>

      {/* Left cream panel */}
      <rect x="40" y="115" width="260" height="180" rx="12" fill="#F5EDE0" stroke="#C7B99A" />
      <text x="170" y="145" textAnchor="middle" fill="#4A3A18" fontSize="12" fontWeight="700">
        Cash generated funds growth
      </text>
      <text x="170" y="170" textAnchor="middle" fill="#6E5A3A" fontSize="11">
        80%+ gross margins
      </text>
      <text x="170" y="190" textAnchor="middle" fill="#6E5A3A" fontSize="11">
        ~Zero marginal cost on renewals
      </text>
      <text x="170" y="210" textAnchor="middle" fill="#6E5A3A" fontSize="11">
        No external capital required
      </text>
      <text x="170" y="230" textAnchor="middle" fill="#6E5A3A" fontSize="11">
        Revenue compounds year over year
      </text>
      <text x="170" y="252" textAnchor="middle" fill="#2A7D5F" fontSize="11" fontWeight="700">
        Profitability from Year 1
      </text>

      {/* Right chain */}
      <rect x="230" y="20" width="220" height="50" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="340" y="42" textAnchor="middle" fill="#E1F5EE" fontSize="13" fontWeight="600">
        New client formed
      </text>
      <text x="340" y="60" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        $5K formation fee
      </text>

      <line x1="450" y1="45" x2="458" y2="45" stroke="#1E4A6E" strokeWidth="1.5" markerEnd="url(#fw-a2)" />

      <rect x="460" y="20" width="140" height="50" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="530" y="42" textAnchor="middle" fill="#E6F1FB" fontSize="13" fontWeight="600">
        Annual admin
      </text>
      <text x="530" y="60" textAnchor="middle" fill="#B5D4F4" fontSize="11">
        Mandatory by law
      </text>

      <line x1="530" y1="70" x2="530" y2="108" stroke="#7A4A0A" strokeWidth="1.5" markerEnd="url(#fw-a3)" />

      <rect x="410" y="115" width="240" height="50" rx="8" fill="#7A4A0A" stroke="#854F0B" />
      <text x="530" y="137" textAnchor="middle" fill="#FAEEDA" fontSize="13" fontWeight="600">
        Client adds 2nd entity + trust
      </text>
      <text x="530" y="155" textAnchor="middle" fill="#FAC775" fontSize="11">
        Revenue per client expands
      </text>

      <line x1="530" y1="165" x2="530" y2="203" stroke="#6B3FA0" strokeWidth="1.5" markerEnd="url(#fw-a4)" />

      <rect x="410" y="210" width="240" height="50" rx="8" fill="#6B3FA0" stroke="#4A2060" />
      <text x="530" y="232" textAnchor="middle" fill="#EEEDFE" fontSize="13" fontWeight="600">
        + VASP + banking + estate
      </text>
      <text x="530" y="250" textAnchor="middle" fill="#CECBF6" fontSize="11">
        $5K → $200K lifecycle
      </text>

      {/* Purple to cream */}
      {/* Horizontal connector ending at the vertical green dashed line */}
      <line x1="410" y1="235" x2="340" y2="235" stroke="#6B3FA0" strokeWidth="1.5" markerEnd="url(#fw-a4)" />

      {/* Green dashed connector + bottom bracket (matches warm PNG) */}
      <line
        x1="340"
        y1="70"
        x2="340"
        y2="315"
        stroke="#2A7D5F"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <line
        x1="200"
        y1="295"
        x2="200"
        y2="315"
        stroke="#2A7D5F"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <line
        x1="200"
        y1="315"
        x2="340"
        y2="315"
        stroke="#2A7D5F"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="270" y="305" textAnchor="middle" fill="#2A7D5F" fontSize="11" fontWeight="600">
        Reinvest into next client
      </text>
    </svg>
  );
}
