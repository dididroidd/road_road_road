import type { ExpoConfig } from "expo/config";

// Nom et identifiant provisoires : ils seront fixés avec T28 (identité de l'app).
const config: ExpoConfig = {
  name: "road_road_road",
  slug: "road-road-road",
  scheme: "roadroadroad",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "fr.roadroadroad.app",
  },
  android: {
    package: "fr.roadroadroad.app",
    adaptiveIcon: {
      backgroundColor: "#F7F6F2",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  plugins: ["expo-router", "expo-status-bar", "@maplibre/maplibre-react-native"],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
