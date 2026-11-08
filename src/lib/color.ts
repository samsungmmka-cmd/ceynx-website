/** Mix a colour (hex or CSS variable) with transparency; works with theme variables. */
export function tint(color: string, percent: number) {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}
