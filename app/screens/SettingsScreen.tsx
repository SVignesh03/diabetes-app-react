import React, { useState } from "react";
import { View, Text, Switch, Button, Alert, StyleSheet, useColorScheme } from "react-native";
import Colors from "@/config/Colors"; // Import Colors.ts

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const theme = Colors[colorScheme || "light"]; // Get the correct theme colors

  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const resetSettings = () => {
    setNotificationsEnabled(true);
    setDarkMode(false);
    Alert.alert("Settings Reset", "All settings have been restored to default.");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <Button title="Reset Settings" color={theme.tint} onPress={resetSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
});
