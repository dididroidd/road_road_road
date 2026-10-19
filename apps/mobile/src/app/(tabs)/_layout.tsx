import { Tabs } from "expo-router";

import { colors, fontFamilies } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: fontFamilies.bodyMedium },
        headerTitleStyle: { fontFamily: fontFamilies.display, color: colors.text },
        headerStyle: { backgroundColor: colors.background },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="explorer" options={{ title: "Explorer", headerShown: false }} />
      <Tabs.Screen name="circuits" options={{ title: "Circuits" }} />
      <Tabs.Screen name="favoris" options={{ title: "Favoris" }} />
      <Tabs.Screen name="profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}
