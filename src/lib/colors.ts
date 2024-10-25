import chroma from "chroma-js";

export function generatePalette(baseColor: string, n: number): string[] {
  return chroma.scale([chroma(baseColor).brighten(2), baseColor]).colors(n);
}
