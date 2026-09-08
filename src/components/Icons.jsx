// Flat vector illustrations for the calculator cards. Every icon is a small
// inline SVG so no image files or icon libraries are needed.

const Coin = ({ x, y, r = 10, fill = '#f6c443', stroke = '#e0a92e' }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth="2" />
    <text x={x} y={y + 4} fontSize={r} fontWeight="700" fill={stroke} textAnchor="middle" fontFamily="Arial">
      ₹
    </text>
  </g>
);

const ICONS = {
  sip: () => (
    <svg viewBox="0 0 96 96">
      <rect x="10" y="66" width="40" height="8" rx="3" fill="#f6c443" stroke="#e0a92e" strokeWidth="2" />
      <rect x="12" y="56" width="40" height="8" rx="3" fill="#f6c443" stroke="#e0a92e" strokeWidth="2" />
      <rect x="10" y="46" width="40" height="8" rx="3" fill="#f6c443" stroke="#e0a92e" strokeWidth="2" />
      <path d="M62 74 V40" stroke="#4f9d5b" strokeWidth="4" strokeLinecap="round" />
      <path d="M62 52 C52 52 46 44 46 34 C56 34 62 42 62 52 Z" fill="#7bc47f" />
      <path d="M62 44 C72 44 78 36 78 26 C68 26 62 34 62 44 Z" fill="#4f9d5b" />
      <path d="M62 60 C52 60 48 54 48 46 C56 46 62 52 62 60 Z" fill="#a8dba8" />
      <circle cx="82" cy="18" r="3" fill="#f6c443" />
    </svg>
  ),
  lumpsum: () => (
    <svg viewBox="0 0 96 96">
      <rect x="14" y="30" width="68" height="48" rx="8" fill="#f2a65a" />
      <rect x="14" y="30" width="68" height="14" rx="6" fill="#e08a3c" />
      <rect x="22" y="20" width="44" height="18" rx="3" fill="#8fd3b6" />
      <rect x="26" y="16" width="44" height="18" rx="3" fill="#5fc39a" />
      <rect x="56" y="48" width="26" height="18" rx="5" fill="#fbe0bf" />
      <circle cx="68" cy="57" r="4" fill="#e08a3c" />
    </svg>
  ),
  swp: () => (
    <svg viewBox="0 0 96 96">
      <ellipse cx="50" cy="58" rx="32" ry="24" fill="#f4a3a8" />
      <circle cx="22" cy="54" r="10" fill="#f4a3a8" />
      <circle cx="18" cy="52" r="2.5" fill="#c0555c" />
      <rect x="30" y="76" width="8" height="10" rx="2" fill="#e2868c" />
      <rect x="62" y="76" width="8" height="10" rx="2" fill="#e2868c" />
      <rect x="44" y="30" width="16" height="5" rx="2" fill="#c0555c" />
      <Coin x="52" y="20" r="9" />
    </svg>
  ),
  mf: () => (
    <svg viewBox="0 0 96 96">
      <rect x="18" y="52" width="12" height="28" rx="2" fill="#7f8ff5" />
      <rect x="36" y="38" width="12" height="42" rx="2" fill="#5367ff" />
      <rect x="54" y="46" width="12" height="34" rx="2" fill="#7f8ff5" />
      <rect x="72" y="26" width="12" height="54" rx="2" fill="#5367ff" />
      <circle cx="30" cy="30" r="12" fill="#fff" stroke="#f26d6d" strokeWidth="4" />
      <path d="M39 39 L48 48" stroke="#f26d6d" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  ssy: () => (
    <svg viewBox="0 0 96 96">
      <rect x="14" y="14" width="44" height="62" rx="6" fill="#e8ecf2" stroke="#b9c2d0" strokeWidth="2" />
      <rect x="20" y="20" width="32" height="14" rx="2" fill="#4fb3a3" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={r + '-' + c} x={20 + c * 11} y={40 + r * 11} width="8" height="8" rx="1.5" fill="#b9c2d0" />
        )),
      )}
      <path d="M66 20 L82 36 L70 48 L54 32 Z" fill="#f6c443" />
      <path d="M54 32 L70 48 L64 56 L46 38 Z" fill="#f2a65a" />
      <Coin x="74" y="70" r="11" />
    </svg>
  ),
  tax: () => (
    <svg viewBox="0 0 96 96">
      <rect x="18" y="12" width="52" height="68" rx="5" fill="#f4f6fb" stroke="#c7cde0" strokeWidth="2" />
      <rect x="26" y="24" width="30" height="4" rx="2" fill="#c7cde0" />
      <rect x="26" y="34" width="36" height="4" rx="2" fill="#c7cde0" />
      <rect x="26" y="44" width="24" height="4" rx="2" fill="#c7cde0" />
      <circle cx="64" cy="64" r="16" fill="#5367ff" />
      <text x="64" y="70" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial">
        %
      </text>
    </svg>
  ),
  ppf: () => (
    <svg viewBox="0 0 96 96">
      <rect x="16" y="56" width="14" height="24" rx="2" fill="#f26d6d" />
      <rect x="36" y="44" width="14" height="36" rx="2" fill="#f2a65a" />
      <rect x="56" y="30" width="14" height="50" rx="2" fill="#5fc39a" />
      <path d="M18 40 L42 28 L62 20 L82 12" stroke="#2f8f6b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M72 10 L84 12 L80 22 Z" fill="#2f8f6b" />
      <Coin x="24" y="26" r="8" />
    </svg>
  ),
  epf: () => (
    <svg viewBox="0 0 96 96">
      <path d="M30 34 C18 44 18 78 48 78 C78 78 78 44 66 34 Z" fill="#6fa8dc" />
      <rect x="36" y="24" width="24" height="12" rx="4" fill="#3d7cc9" />
      <path d="M40 24 L48 14 L56 24 Z" fill="#3d7cc9" />
      <text x="48" y="64" fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial">
        ₹
      </text>
      <rect x="66" y="52" width="18" height="26" rx="3" fill="#f4f6fb" stroke="#b9c2d0" strokeWidth="2" />
      <rect x="70" y="58" width="10" height="3" fill="#b9c2d0" />
      <rect x="70" y="65" width="10" height="3" fill="#b9c2d0" />
    </svg>
  ),
  fd: () => (
    <svg viewBox="0 0 96 96">
      <path d="M14 66 C14 60 20 56 30 58 L48 60 L60 58 C66 57 68 62 62 65 L48 70" fill="#f4c7a1" />
      <path d="M14 66 L14 80 L48 80 C62 80 72 72 84 62 C88 58 82 52 76 56 L60 66" fill="#f2b07e" />
      <circle cx="52" cy="34" r="20" fill="#f6c443" stroke="#e0a92e" strokeWidth="3" />
      <text x="52" y="42" fontSize="22" fontWeight="700" fill="#e0a92e" textAnchor="middle" fontFamily="Arial">
        ₹
      </text>
    </svg>
  ),
  rd: () => (
    <svg viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="32" fill="#f6c443" />
      <circle cx="48" cy="48" r="24" fill="none" stroke="#e0a92e" strokeWidth="3" strokeDasharray="6 5" />
      <text x="48" y="58" fontSize="28" fontWeight="700" fill="#e0a92e" textAnchor="middle" fontFamily="Arial">
        ₹
      </text>
    </svg>
  ),
  emi: () => (
    <svg viewBox="0 0 96 96">
      <path d="M16 46 L48 18 L80 46" stroke="#3d7cc9" strokeWidth="6" fill="none" strokeLinejoin="round" />
      <rect x="24" y="44" width="48" height="36" fill="#6fa8dc" />
      <rect x="40" y="58" width="16" height="22" fill="#f4f6fb" />
      <rect x="60" y="52" width="8" height="10" fill="#f4f6fb" />
      <circle cx="78" cy="72" r="9" fill="#f6c443" stroke="#e0a92e" strokeWidth="2" />
      <rect x="84" y="70" width="10" height="4" fill="#e0a92e" />
    </svg>
  ),
  gst: () => (
    <svg viewBox="0 0 96 96">
      <path d="M22 12 H74 V82 L66 76 L58 82 L50 76 L42 82 L34 76 L26 82 L22 78 Z" fill="#f4f6fb" stroke="#c7cde0" strokeWidth="2" />
      <rect x="30" y="24" width="36" height="4" rx="2" fill="#c7cde0" />
      <rect x="30" y="34" width="26" height="4" rx="2" fill="#c7cde0" />
      <rect x="30" y="44" width="30" height="4" rx="2" fill="#c7cde0" />
      <rect x="30" y="58" width="36" height="6" rx="2" fill="#9b7bf5" />
    </svg>
  ),
  xirr: () => (
    <svg viewBox="0 0 96 96">
      <path d="M14 78 L34 56 L50 64 L82 24" stroke="#2f8f6b" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 22 L84 22 L84 40" stroke="#2f8f6b" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="82" width="70" height="3" fill="#c7cde0" />
      <circle cx="34" cy="56" r="4" fill="#f6c443" />
      <circle cx="50" cy="64" r="4" fill="#f6c443" />
    </svg>
  ),
  elss: () => (
    <svg viewBox="0 0 96 96">
      <path d="M48 12 L78 22 V46 C78 64 64 76 48 84 C32 76 18 64 18 46 V22 Z" fill="#5fc39a" />
      <path d="M48 20 L70 28 V46 C70 60 60 70 48 76 C36 70 26 60 26 46 V28 Z" fill="#8fd3b6" />
      <text x="48" y="58" fontSize="26" fontWeight="700" fill="#1f6b4e" textAnchor="middle" fontFamily="Arial">
        ₹
      </text>
    </svg>
  ),
  bank: ({ color = '#3d7cc9' }) => (
    <svg viewBox="0 0 96 96">
      <path d="M12 34 L48 14 L84 34 Z" fill={color} />
      <rect x="16" y="34" width="64" height="6" fill="#dfe5ef" />
      {[22, 38, 54, 70].map((x) => (
        <rect key={x} x={x} y="42" width="8" height="26" fill={color} opacity="0.75" />
      ))}
      <rect x="14" y="70" width="68" height="6" fill="#dfe5ef" />
      <rect x="10" y="76" width="76" height="6" fill={color} />
      <circle cx="48" cy="27" r="4" fill="#fff" />
    </svg>
  ),
};

export default function CalcIcon({ name, color }) {
  const Icon = ICONS[name] || ICONS.bank;
  return (
    <span className="calc-card-icon" aria-hidden="true">
      <Icon color={color} />
    </span>
  );
}
