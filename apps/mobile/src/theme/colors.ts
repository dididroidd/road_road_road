import type { Practice } from "@road/shared";

// Palette de la maquette. Contrastes vérifiés (WCAG AA : 4,5:1 pour le texte, 3:1 pour les tracés).
export const palette = {
  forest: "#2A6B3F", // couleur principale (boutons, onglet actif)
  forestDark: "#1F5130",
  forestTint: "#EEF4ED",
  cream: "#F7F6F2", // fond des écrans
  sand: "#F0EDE8",
  white: "#FFFFFF",
  ink: "#1A1F16", // texte principal (15,5:1 sur crème)
  muted: "#6B6B60", // texte secondaire (5,0:1 sur crème ; le #7A7A6E de la maquette n'atteint que 4,0:1)
  border: "#E4E1DA",
  heart: "#E04848",
} as const;

export const colors = {
  background: palette.cream,
  surface: palette.white,
  surfaceMuted: palette.sand,
  text: palette.ink,
  textMuted: palette.muted,
  textOnPrimary: palette.white,
  primary: palette.forest,
  primaryPressed: palette.forestDark,
  primaryTint: palette.forestTint,
  border: palette.border,
  favorite: palette.heart,
} as const;

type ColorPair = { foreground: string; background: string };

/** Une couleur par pratique, utilisée partout : tracés sur la carte, badges, filtres. */
export const practiceColors: Record<Practice, ColorPair & { line: string }> = {
  route: { line: "#2E6DA4", foreground: "#245C8F", background: "#E3EEF8" },
  vtt: { line: "#3F7D3A", foreground: "#2F6B2C", background: "#E4F1E1" },
  gravel: { line: "#B07A2A", foreground: "#7A5418", background: "#F6EBDA" },
  vae: { line: "#7A4FB5", foreground: "#6A3FA6", background: "#EFE7F8" },
};

export const DIFFICULTIES = ["facile", "moyen", "difficile"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

/** Toujours accompagnées d'un libellé : la couleur seule ne doit pas porter l'information. */
export const difficultyColors: Record<Difficulty, ColorPair> = {
  facile: { foreground: "#226B3E", background: "#E3F1E7" },
  moyen: { foreground: "#7A4F00", background: "#FFF1D6" },
  difficile: { foreground: "#A1221B", background: "#FCE4E2" },
};
