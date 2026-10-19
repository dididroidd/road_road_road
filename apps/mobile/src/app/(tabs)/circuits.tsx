import { Link } from "expo-router";
import { Text } from "react-native";

import { PlaceholderScreen } from "@/components/PlaceholderScreen";

export default function CircuitsScreen() {
  return (
    <PlaceholderScreen title="Circuits">
      <Link href={{ pathname: "/circuit/[id]", params: { id: "demo" } }}>
        <Text>Ouvrir un circuit de démonstration</Text>
      </Link>
    </PlaceholderScreen>
  );
}
