import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🚀</Text>
        <Text style={styles.title}>Oops! This page doesn’t exist.</Text>
        <Text style={styles.description}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>🔙 Go Back Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  link: {
    backgroundColor: "#2e78b7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
