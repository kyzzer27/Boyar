/** Point 4 — Component 4: Switching cost architecture */

export function SwitchingCostSvg() {
  return (
    <svg
      viewBox="0 0 680 380"
      className="mx-auto h-auto w-full max-w-[680px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,4 L0,8 z" fill="#4A3A18" />
        </marker>
        <marker id="sc-arr-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#6E2020" />
        </marker>
        <marker id="sc-arr-gr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#2D5F3A" />
        </marker>
      </defs>

      <rect x="200" y="20" width="280" height="44" rx="8" fill="#4A3A18" stroke="#6E5A3A" />
      <text x="340" y="46" textAnchor="middle" fill="#FAEEDA" fontSize="14" fontWeight="700">
        To switch providers, client must move:
      </text>

      {/* Fan arrows from row1 bottom to row2 */}
      <line x1="260" y1="64" x2="130" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <line x1="300" y1="64" x2="290" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <line x1="380" y1="64" x2="410" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
      <line x1="420" y1="64" x2="560" y2="105" stroke="#4A3A18" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />

      <rect x="40" y="105" width="180" height="56" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="130" y="128" textAnchor="middle" fill="#E1F5EE" fontSize="13" fontWeight="600">
        3 holding companies
      </text>
      <text x="130" y="148" textAnchor="middle" fill="#5DCAA5" fontSize="11">
        3 jurisdictions, directors
      </text>

      <rect x="240" y="105" width="100" height="56" rx="8" fill="#1E4A6E" stroke="#0C447C" />
      <text x="290" y="128" textAnchor="middle" fill="#E6F1FB" fontSize="13" fontWeight="600">
        Trust
      </text>
      <text x="290" y="148" textAnchor="middle" fill="#B5D4F4" fontSize="11">
        Trustee change
      </text>

      <rect x="360" y="105" width="100" height="56" rx="8" fill="#6B3FA0" stroke="#4A2060" />
      <text x="410" y="128" textAnchor="middle" fill="#EEEDFE" fontSize="13" fontWeight="600">
        VASP license
      </text>
      <text x="410" y="148" textAnchor="middle" fill="#CECBF6" fontSize="11">
        Re-application
      </text>

      <rect x="480" y="105" width="160" height="56" rx="8" fill="#7A4A0A" stroke="#854F0B" />
      <text x="560" y="128" textAnchor="middle" fill="#FAEEDA" fontSize="13" fontWeight="600">
        Banking relations
      </text>
      <text x="560" y="148" textAnchor="middle" fill="#FAC775" fontSize="11">
        KYC restart on all
      </text>

      {/* Row2 to row3 */}
      <line x1="130" y1="161" x2="130" y2="215" stroke="#6E2020" strokeWidth="1.5" markerEnd="url(#sc-arr-red)" />
      <line x1="290" y1="161" x2="290" y2="215" stroke="#6E2020" strokeWidth="1.5" markerEnd="url(#sc-arr-red)" />
      <line x1="410" y1="161" x2="410" y2="215" stroke="#6E2020" strokeWidth="1.5" markerEnd="url(#sc-arr-red)" />
      <line x1="560" y1="161" x2="560" y2="215" stroke="#6E2020" strokeWidth="1.5" markerEnd="url(#sc-arr-red)" />

      <rect x="40" y="215" width="600" height="44" rx="8" fill="#6E2020" stroke="#9A3220" />
      <text x="340" y="242" textAnchor="middle" fill="#FCEBEB" fontSize="13" fontWeight="700">
        Cost of switching exceeds cost of staying — every time
      </text>

      <line x1="340" y1="259" x2="340" y2="300" stroke="#2D5F3A" strokeWidth="1.5" markerEnd="url(#sc-arr-gr)" />

      <rect x="140" y="300" width="400" height="50" rx="8" fill="#2D5F3A" stroke="#0F6E56" />
      <text x="340" y="322" textAnchor="middle" fill="#E1F5EE" fontSize="14" fontWeight="700">
        Industry retention exceeds 90%
      </text>
      <text x="340" y="340" textAnchor="middle" fill="#5DCAA5" fontSize="12">
        Not from contracts — from architecture
      </text>
    </svg>
  );
}
