/** Pratiques vélo proposées dans l'app (voir docs/sources-de-donnees.md). */
export const PRACTICES = ["route", "vtt", "gravel", "vae"] as const;

export type Practice = (typeof PRACTICES)[number];

export const PRACTICE_LABELS: Record<Practice, string> = {
  route: "Route",
  vtt: "VTT",
  gravel: "Gravel",
  vae: "VAE",
};

export function isPractice(value: string): value is Practice {
  return (PRACTICES as readonly string[]).includes(value);
}
