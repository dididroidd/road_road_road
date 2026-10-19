import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="circuit/[id]/index" options={{ headerShown: true, title: "Circuit" }} />
        <Stack.Screen name="circuit/[id]/trace" options={{ headerShown: true, title: "Tracé" }} />
      </Stack>
    </>
  );
}
