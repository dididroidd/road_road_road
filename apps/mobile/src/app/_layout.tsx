import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { colors } from "@/theme";
import { useAppFonts } from "@/theme/fonts";

// Garde l'écran de démarrage tant que les polices ne sont pas chargées.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="circuit/[id]/index" options={{ headerShown: true, title: "Circuit" }} />
        <Stack.Screen name="circuit/[id]/trace" options={{ headerShown: true, title: "Tracé" }} />
      </Stack>
    </>
  );
}
