import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

export function PlaceholderScreen({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: { ...typography.heading, color: colors.text },
});
