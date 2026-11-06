import Link from "next/link";

/** Brand mark: hexagonal node, echoing the globe and 3D cube motifs. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ceynx-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--c-mint)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--c-emerald)" }} />
          <stop offset="1" style={{ stopColor: "var(--c-mint)" }} />
        </linearGradient>
      </defs>
      <path d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z" fill="none" stroke="url(#ceynx-mark)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10.5 11.5 21.5 20.5M21.5 11.5 10.5 20.5" stroke="url(#ceynx-mark)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.4" style={{ fill: "#ffffff" }} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-[0.14em] text-ink ${className}`}>
      CEYN<span className="text-mint">X</span>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="CEYNX home">
      <LogoMark />
      <Wordmark className="text-xl" />
    </Link>
  );
}
