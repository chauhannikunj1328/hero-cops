/** Temporary placeholder art. Used until a licensed or department-supplied photo is cleared. */
export function CarSeatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 400" className={className} role="img" aria-label="Illustration of a child's car seat (placeholder)">
      <rect width="640" height="400" fill="#dfe6f2" />
      <rect y="300" width="640" height="100" fill="#cdd6e6" />
      <circle cx="520" cy="90" r="42" fill="#f2f4f8" opacity="0.8" />
      {/* seat shell */}
      <path d="M250 300 C238 230 240 150 262 98 C276 66 330 58 358 70 C384 82 392 120 388 168 L380 236 C420 240 446 262 446 300 Z" fill="#1f3c88" />
      <path d="M272 112 C286 86 330 82 348 92 C366 102 368 132 364 170 L356 236 L290 236 C276 198 266 150 272 112 Z" fill="#2f55b5" />
      {/* harness */}
      <path d="M300 112 L318 214 M346 112 L330 214" stroke="#e8ecf5" strokeWidth="9" strokeLinecap="round" />
      <rect x="310" y="196" width="28" height="22" rx="4" fill="#f2b33d" />
      {/* base */}
      <rect x="236" y="296" width="226" height="22" rx="6" fill="#162b63" />
      <rect x="250" y="318" width="198" height="10" rx="4" fill="#121a24" opacity="0.25" />
    </svg>
  );
}
