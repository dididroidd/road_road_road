import { PRACTICE_LABELS, PRACTICES } from "@road/shared";
import { Text } from "react-native";

import { PlaceholderScreen } from "@/components/PlaceholderScreen";

export default function ProfilScreen() {
  return (
    <PlaceholderScreen title="Profil">
      {/* Vérifie que @road/shared est bien importable depuis l'app (critère de T01). */}
      <Text>Pratiques : {PRACTICES.map((p) => PRACTICE_LABELS[p]).join(", ")}</Text>
    </PlaceholderScreen>
  );
}
