import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

export function PlaceholderScreen({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, padding: 24 },
  title: { fontSize: 20, fontWeight: "600" },
});
