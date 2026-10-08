/**
 * Monochrome placeholder art per story, sized to fill the template's grey image frames.
 * Replace with rights-cleared photos in Framer. Never use news photos without a license.
 */
export type ArtKind = "car-seat" | "glove" | "eggs" | "groceries" | "home" | "car";

const BG = "#f4f4f4";
const FLOOR = "#ebebeb";
const INK = "#0c0407";
const MID = "#4c4c4c";
const LIGHT = "#e9e9e9";

export function StoryArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} role="img" aria-label={`Placeholder illustration: ${LABEL[kind]}`} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="480" fill={BG} />
      <rect y="360" width="640" height="120" fill={FLOOR} />
      {ART[kind]}
    </svg>
  );
}

const LABEL: Record<ArtKind, string> = {
  "car-seat": "a child's car seat",
  glove: "a boxing glove",
  eggs: "a carton of eggs",
  groceries: "a bag of groceries",
  home: "a house",
  car: "a car on a quiet street",
};

const ART: Record<ArtKind, React.ReactNode> = {
  "car-seat": (
    <g>
      <path d="M250 360 C238 280 240 190 262 132 C276 96 330 88 358 100 C384 112 392 154 388 206 L380 286 C420 290 446 314 446 360 Z" fill={INK} />
      <path d="M272 146 C286 118 330 114 348 124 C366 134 368 166 364 206 L356 286 L290 286 C276 244 266 190 272 146 Z" fill={MID} />
      <path d="M300 146 L318 260 M346 146 L330 260" stroke={BG} strokeWidth="9" strokeLinecap="round" />
      <rect x="310" y="242" width="28" height="22" rx="4" fill={LIGHT} />
      <rect x="236" y="356" width="226" height="22" rx="6" fill={INK} />
    </g>
  ),
  glove: (
    <g>
      <path d="M248 200 C248 140 290 110 340 110 C400 110 430 150 430 205 L430 268 C430 300 410 318 380 318 L292 318 C266 318 248 300 248 272 Z" fill={INK} />
      <path d="M248 228 C214 228 198 250 206 274 C214 298 240 300 262 290" fill={INK} />
      <path d="M300 150 C320 136 360 136 384 150" stroke={MID} strokeWidth="10" fill="none" strokeLinecap="round" />
      <rect x="282" y="318" width="120" height="48" rx="6" fill={MID} />
      <rect x="282" y="334" width="120" height="8" fill={LIGHT} />
    </g>
  ),
  eggs: (
    <g>
      <path d="M180 300 L460 300 L440 362 L200 362 Z" fill={INK} />
      {[220, 276, 332, 388].map((x) => (
        <ellipse key={x} cx={x + 16} cy="268" rx="24" ry="32" fill={LIGHT} stroke={MID} strokeWidth="3" />
      ))}
      <path d="M180 300 L460 300" stroke={MID} strokeWidth="6" />
    </g>
  ),
  groceries: (
    <g>
      <path d="M232 190 L408 190 L424 362 L216 362 Z" fill={INK} />
      <path d="M276 190 C276 150 296 132 320 132 C344 132 364 150 364 190" stroke={MID} strokeWidth="12" fill="none" />
      <rect x="252" y="150" width="34" height="60" rx="6" fill={MID} />
      <circle cx="350" cy="168" r="26" fill={LIGHT} stroke={MID} strokeWidth="4" />
      <path d="M300 140 L316 112 L330 140 Z" fill={MID} />
    </g>
  ),
  home: (
    <g>
      <path d="M200 236 L320 140 L440 236 Z" fill={INK} />
      <rect x="222" y="236" width="196" height="126" fill={MID} />
      <rect x="298" y="292" width="44" height="70" fill={INK} />
      <rect x="240" y="262" width="40" height="34" fill={LIGHT} />
      <rect x="360" y="262" width="40" height="34" fill={LIGHT} />
    </g>
  ),
  car: (
    <g>
      <path d="M170 330 L190 270 C196 254 210 246 226 246 L408 246 C424 246 438 254 446 270 L470 330 Z" fill={INK} />
      <rect x="160" y="320" width="320" height="34" rx="10" fill={INK} />
      <path d="M220 270 L300 270 L300 310 L206 310 Z M318 270 L410 270 L428 310 L318 310 Z" fill={MID} />
      <circle cx="226" cy="358" r="24" fill={MID} stroke={INK} strokeWidth="8" />
      <circle cx="414" cy="358" r="24" fill={MID} stroke={INK} strokeWidth="8" />
    </g>
  ),
};
