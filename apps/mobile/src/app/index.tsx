import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Écran d'accueil provisoire : le vrai écran de la maquette arrive avec T15.
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Découvrez les circuits officiels.</Text>
      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.replace("/explorer")}
      >
        <Text style={styles.buttonLabel}>Commencer l'exploration</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 24 },
  title: { fontSize: 32, fontWeight: "700" },
  button: { backgroundColor: "#2A6B3F", borderRadius: 16, padding: 16, alignItems: "center" },
  buttonLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
