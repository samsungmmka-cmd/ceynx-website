/**
 * CEYNX logo geometry (generated from the brand master files).
 * Name: "CEYN" in Sora ExtraBold, outlined to paths, + the signature X.
 * Mark: hexagon with crossed X and centre node, bold strokes.
 */
export const LOGO_VIEWBOX = "0 0 5267 1065";
export const LOGO_RATIO = 5267 / 1065;

/** Mark artwork in its own 32-unit box. */
export const MARK = {
  hex: "M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z",
  x: "M10.5 11.5 21.5 20.5M21.5 11.5 10.5 20.5",
  hexStroke: 2.9,
  xStroke: 3.2,
  dot: 2.4,
} as const;

/** Where the 32-unit mark sits inside the horizontal logo. */
export const MARK_TRANSFORM = "translate(-101.5 -37.4) scale(35.6250)";
/** Where the name sits inside the horizontal logo (path data has its baseline at y = 0). */
export const WORD_TRANSFORM = "translate(1228.9 897.5)";
export const LETTERS = "M415 20Q316 20 245 -14.5Q174 -49 128 -105.5Q82 -162 60 -228Q38 -294 38 -356V-378Q38 -447 60.5 -513.5Q83 -580 129.5 -634Q176 -688 246 -720Q316 -752 410 -752Q510 -752 587.5 -714.5Q665 -677 712 -609.5Q759 -542 767 -453H581Q574 -491 551 -519Q528 -547 492 -562.5Q456 -578 410 -578Q367 -578 332.5 -563Q298 -548 274.5 -520.5Q251 -493 238.5 -454Q226 -415 226 -366Q226 -317 238.5 -278Q251 -239 275.5 -211Q300 -183 335 -168.5Q370 -154 415 -154Q485 -154 533.5 -188Q582 -222 592 -279H778Q769 -197 723 -129Q677 -61 599 -20.5Q521 20 415 20ZM976 0V-730H1156V0ZM1136 0V-152H1444V0ZM1136 -295V-447H1423V-295ZM1136 -578V-730H1438V-578ZM1805 -274 1598 -730H1788L1927 -405L1901 -414H1973L1945 -405L2068 -730H2248L2059 -274ZM1841 0V-298H2023V0ZM2426 0V-730H2731L2974 -148H3009L2989 -130V-730H3163V0H2856L2613 -582H2578L2598 -600V0Z";
export const SIGNATURE_X = "M3417.0 -650.0 3958.0 -80.0M3958.0 -650.0 3417.0 -80.0";
export const SIGNATURE_X_STROKE = 160;

/** Standalone SVG string of the horizontal logo, for generated images (e.g. the share image). */
export function logoSvg(colors: { green: string; ink: string; dot: string }) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">` +
    `<g transform="${MARK_TRANSFORM}">` +
    `<path d="${MARK.hex}" fill="none" stroke="${colors.green}" stroke-width="${MARK.hexStroke}" stroke-linejoin="round"/>` +
    `<path d="${MARK.x}" fill="none" stroke="${colors.green}" stroke-width="${MARK.xStroke}" stroke-linecap="round"/>` +
    `<circle cx="16" cy="16" r="${MARK.dot}" fill="${colors.dot}"/></g>` +
    `<g transform="${WORD_TRANSFORM}"><path d="${LETTERS}" fill="${colors.ink}"/>` +
    `<path d="${SIGNATURE_X}" fill="none" stroke="${colors.green}" stroke-width="${SIGNATURE_X_STROKE}" stroke-linecap="round"/></g>` +
    `</svg>`
  );
}
