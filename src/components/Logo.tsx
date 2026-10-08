export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.5l11 4v8.6c0 7-4.6 12.3-11 14.4C9.6 27.4 5 22.1 5 15.1V6.5l11-4z"
        fill="var(--color-badge)"
      />
      <path
        d="M10.5 16.2l3.7 3.7 7.3-7.6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
