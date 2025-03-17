import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import Colors from "@/config/Colors"; // Import Colors.ts

export default function HomeScreen() {
  const colorScheme = useColorScheme(); // Detect system theme
  const theme = Colors[colorScheme || "light"]; // Select colors based on theme

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to Diabetes Care</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Track your blood sugar, set reminders, and manage appointments.
      </Text>
      <View
        style={[styles.separator, { backgroundColor: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "#eee" }]}
      />
      <Text style={{ color: theme.text }}>Start by navigating to a section using the tabs below.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
