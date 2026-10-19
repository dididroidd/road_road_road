import { useLocalSearchParams } from "expo-router";

import { PlaceholderScreen } from "@/components/PlaceholderScreen";

export default function TraceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PlaceholderScreen title={`Tracé du circuit ${id}`} />;
}
