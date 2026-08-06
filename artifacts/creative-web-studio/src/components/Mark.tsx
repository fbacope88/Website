/**
 * Brand mark: a tiny browser window holding a cursor — the same chrome
 * (rounded frame, traffic-light dots) used on every site mockup elsewhere
 * on the page, so the logo reads as "we build this" rather than a
 * generic icon. Single monoline stroke, currentColor throughout.
 */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2 10.5h28" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6.5" cy="6.3" r="1.05" fill="currentColor" />
      <circle cx="10.3" cy="6.3" r="1.05" fill="currentColor" />
      <circle cx="14.1" cy="6.3" r="1.05" fill="currentColor" />
      <path
        d="M12.5 14.2 L12.5 25.4 L15.9 22.1 L18.3 27.2 L20.6 26.1 L18.2 21 L22 20.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}
