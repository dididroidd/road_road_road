import { Map as MapLibreMap } from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";

// Fond de carte de démonstration sans clé ; le style outdoor arrive avec T17.
const DEMO_STYLE = "https://demotiles.maplibre.org/style.json";

export default function ExplorerScreen() {
  return <MapLibreMap style={styles.map} mapStyle={DEMO_STYLE} />;
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
