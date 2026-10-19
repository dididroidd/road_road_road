import type { ViewStyle } from "react-native";

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 12, // tuiles, champs
  lg: 16, // cartes, boutons
  xl: 22, // panneaux du bas
  pill: 999, // chips
} as const;

/** Zone de tap minimale, pensée pour une utilisation avec des gants. */
export const MIN_TOUCH_TARGET = 48;

export const shadows = {
  card: {
    shadowColor: "#1A1F16",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sheet: {
    shadowColor: "#1A1F16",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
} satisfies Record<string, ViewStyle>;
