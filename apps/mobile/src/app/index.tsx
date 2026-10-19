import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MIN_TOUCH_TARGET, colors, radii, spacing, typography } from "@/theme";

// Écran d'accueil provisoire : le vrai écran de la maquette arrive avec T15.
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Découvrez les circuits officiels.</Text>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.replace("/explorer")}
      >
        <Text style={styles.buttonLabel}>Commencer l'exploration</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.xl,
    backgroundColor: colors.background,
  },
  title: { ...typography.hero, color: colors.text },
  button: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
  },
  buttonPressed: { backgroundColor: colors.primaryPressed },
  buttonLabel: { ...typography.bodyStrong, color: colors.textOnPrimary },
});
