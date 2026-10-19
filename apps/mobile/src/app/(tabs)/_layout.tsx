import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2A6B3F" }}>
      <Tabs.Screen name="explorer" options={{ title: "Explorer", headerShown: false }} />
      <Tabs.Screen name="circuits" options={{ title: "Circuits" }} />
      <Tabs.Screen name="favoris" options={{ title: "Favoris" }} />
      <Tabs.Screen name="profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}
