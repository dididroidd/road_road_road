import type { TextStyle } from "react-native";

// Noms des polices chargées dans src/theme/fonts.ts.
export const fontFamilies = {
  display: "Fraunces_700Bold",
  displaySemiBold: "Fraunces_600SemiBold",
  body: "Outfit_400Regular",
  bodyMedium: "Outfit_500Medium",
  bodySemiBold: "Outfit_600SemiBold",
  bodyBold: "Outfit_700Bold",
} as const;

export const typography = {
  hero: { fontFamily: fontFamilies.display, fontSize: 40, lineHeight: 44 },
  title: { fontFamily: fontFamilies.display, fontSize: 28, lineHeight: 34 },
  heading: { fontFamily: fontFamilies.displaySemiBold, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: fontFamilies.body, fontSize: 16, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamilies.bodySemiBold, fontSize: 16, lineHeight: 22 },
  label: { fontFamily: fontFamilies.bodyMedium, fontSize: 14, lineHeight: 18 },
  caption: { fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 16 },
  overline: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  stat: { fontFamily: fontFamilies.display, fontSize: 24, lineHeight: 28 },
} satisfies Record<string, TextStyle>;
