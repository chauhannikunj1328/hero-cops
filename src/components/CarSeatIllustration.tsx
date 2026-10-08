/** Temporary placeholder art, monochrome to sit inside the template's grey image frames. */
export function CarSeatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} role="img" aria-label="Illustration of a child's car seat (placeholder)" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="480" fill="#f4f4f4" />
      <rect y="360" width="640" height="120" fill="#ebebeb" />
      <path d="M250 360 C238 280 240 190 262 132 C276 96 330 88 358 100 C384 112 392 154 388 206 L380 286 C420 290 446 314 446 360 Z" fill="#0c0407" />
      <path d="M272 146 C286 118 330 114 348 124 C366 134 368 166 364 206 L356 286 L290 286 C276 244 266 190 272 146 Z" fill="#4c4c4c" />
      <path d="M300 146 L318 260 M346 146 L330 260" stroke="#f4f4f4" strokeWidth="9" strokeLinecap="round" />
      <rect x="310" y="242" width="28" height="22" rx="4" fill="#e9e9e9" />
      <rect x="236" y="356" width="226" height="22" rx="6" fill="#0c0407" />
    </svg>
  );
}
