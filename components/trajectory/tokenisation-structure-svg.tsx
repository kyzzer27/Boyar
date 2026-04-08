/** Point 3 — Component 4: Token + underlying TCSP structure diagram */

export function TokenisationStructureSvg() {
  return (
    <svg
      viewBox="0 0 680 480"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Token */}
      <rect
        x="190"
        y="20"
        width="300"
        height="50"
        rx="8"
        fill="#4A2060"
        stroke="#6B3FA0"
        strokeWidth="1"
      />
      <text x="340" y="44" textAnchor="middle" fill="#EEEDFE" fontSize="14" fontWeight="700">
        Token on blockchain
      </text>
      <text x="340" y="90" textAnchor="middle" fill="#6E5A3A" fontSize="11">
        What the market sees
      </text>

      <line
        x1="340"
        y1="70"
        x2="340"
        y2="125"
        stroke="#6B3FA0"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Main container */}
      <rect
        x="120"
        y="125"
        width="440"
        height="320"
        rx="16"
        fill="#F5EDE0"
        stroke="#C7B99A"
        strokeWidth="0.5"
      />
      <text x="340" y="152" textAnchor="middle" fill="#4A3A18" fontSize="13" fontWeight="700">
        What sits underneath — all TCSP work
      </text>

      {/* Row 1 */}
      <rect x="150" y="170" width="175" height="50" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="237.5" y="192" textAnchor="middle" fill="#E1F5EE" fontSize="12" fontWeight="600">
        SPV / holding co.
      </text>
      <text x="237.5" y="208" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Formation + governance
      </text>

      <rect x="355" y="170" width="175" height="50" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="442.5" y="192" textAnchor="middle" fill="#E1F5EE" fontSize="12" fontWeight="600">
        Trust / fund entity
      </text>
      <text x="442.5" y="208" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        Regulated wrapper
      </text>

      {/* Row 2 */}
      <rect x="150" y="235" width="175" height="50" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="237.5" y="257" textAnchor="middle" fill="#E6F1FB" fontSize="12" fontWeight="600">
        Banking access
      </text>
      <text x="237.5" y="273" textAnchor="middle" fill="#B5D4F4" fontSize="11">
        Multi-jurisdiction
      </text>

      <rect x="355" y="235" width="175" height="50" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="442.5" y="257" textAnchor="middle" fill="#E6F1FB" fontSize="12" fontWeight="600">
        Custodian setup
      </text>
      <text x="442.5" y="273" textAnchor="middle" fill="#B5D4F4" fontSize="11">
        Regulated third party
      </text>

      {/* Row 3 */}
      <rect x="150" y="300" width="175" height="50" rx="8" fill="#7A4A0A" stroke="#854F0B" />
      <text x="237.5" y="322" textAnchor="middle" fill="#FAEEDA" fontSize="12" fontWeight="600">
        Compliance monitoring
      </text>
      <text x="237.5" y="338" textAnchor="middle" fill="#FAC775" fontSize="11">
        AML / KYC / ongoing
      </text>

      <rect x="355" y="300" width="175" height="50" rx="8" fill="#7A4A0A" stroke="#854F0B" />
      <text x="442.5" y="322" textAnchor="middle" fill="#FAEEDA" fontSize="12" fontWeight="600">
        Governance docs
      </text>
      <text x="442.5" y="338" textAnchor="middle" fill="#FAC775" fontSize="11">
        Board, resolutions
      </text>

      {/* Bottom wide */}
      <rect x="150" y="365" width="380" height="50" rx="8" fill="#D85A30" stroke="#993C1D" />
      <text x="340" y="386" textAnchor="middle" fill="#FAECE7" fontSize="12" fontWeight="700">
        Annual administration + renewal
      </text>
      <text x="340" y="404" textAnchor="middle" fill="#F5C4B3" fontSize="11">
        Recurring revenue — as long as the token exists
      </text>

      <text x="340" y="460" textAnchor="middle" fill="#C4402A" fontSize="12" fontWeight="700">
        Traditional TCSPs have no tokenisation practice
      </text>
    </svg>
  );
}
