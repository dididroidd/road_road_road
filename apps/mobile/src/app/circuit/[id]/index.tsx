import { Link, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import { PlaceholderScreen } from "@/components/PlaceholderScreen";

export default function CircuitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <PlaceholderScreen title={`Circuit ${id}`}>
      <Link href={{ pathname: "/circuit/[id]/trace", params: { id } }}>
        <Text>Voir le tracé</Text>
      </Link>
    </PlaceholderScreen>
  );
}
