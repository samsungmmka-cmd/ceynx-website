import Link from "next/link";
import {
  LETTERS,
  LOGO_RATIO,
  LOGO_VIEWBOX,
  MARK,
  MARK_TRANSFORM,
  SIGNATURE_X,
  SIGNATURE_X_STROKE,
  WORD_TRANSFORM,
} from "@/content/logo-geometry";

/**
 * Brand mark: hexagonal node with a crossed X.
 * Colours come from theme tokens: --c-logo (green) and --c-logo-dot (centre node).
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d={MARK.hex} fill="none" style={{ stroke: "var(--c-logo)" }} strokeWidth={MARK.hexStroke} strokeLinejoin="round" />
      <path d={MARK.x} fill="none" style={{ stroke: "var(--c-logo)" }} strokeWidth={MARK.xStroke} strokeLinecap="round" />
      <circle cx="16" cy="16" r={MARK.dot} style={{ fill: "var(--c-logo-dot)" }} />
    </svg>
  );
}

/**
 * Full horizontal logo: mark + "CEYN" (Sora ExtraBold, outlined) + signature X.
 * Letters use currentColor, so they follow the text colour of the theme.
 */
export function LogoFull({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`w-auto text-ink ${className}`}
      style={{ aspectRatio: LOGO_RATIO }}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={MARK_TRANSFORM}>
        <path d={MARK.hex} fill="none" style={{ stroke: "var(--c-logo)" }} strokeWidth={MARK.hexStroke} strokeLinejoin="round" />
        <path d={MARK.x} fill="none" style={{ stroke: "var(--c-logo)" }} strokeWidth={MARK.xStroke} strokeLinecap="round" />
        <circle cx="16" cy="16" r={MARK.dot} style={{ fill: "var(--c-logo-dot)" }} />
      </g>
      <g transform={WORD_TRANSFORM}>
        <path d={LETTERS} fill="currentColor" />
        <path d={SIGNATURE_X} fill="none" style={{ stroke: "var(--c-logo)" }} strokeWidth={SIGNATURE_X_STROKE} strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="CEYNX home">
      <LogoFull className="h-7 sm:h-8" />
    </Link>
  );
}
