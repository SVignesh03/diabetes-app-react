import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import api from "@/config/api"; // Import API helper
import Colors from "@/config/Colors"; // Import theme colors

interface UserProfile {
  name: string;
  email: string;
  age?: number;
  phone?: string;
}

export default function ProfileScreen() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const colorScheme = useColorScheme(); // Detect system theme
  const theme = Colors[colorScheme || "light"]; // Select corresponding colors

  useEffect(() => {
    if (!user || !user.id) return;
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user || !user.id) return;

    setLoading(true);
    try {
      const response = await api.get(`/users/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Failed to load profile.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    Alert.alert("Logged Out", "You have been successfully logged out.");
  };

  if (!isSignedIn || !user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>You are not signed in.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      <Text style={[styles.info, { color: theme.text }]}>Name: {profile?.name || "N/A"}</Text>
      <Text style={[styles.info, { color: theme.text }]}>Email: {profile?.email}</Text>
      <Text style={[styles.info, { color: theme.text }]}>Age: {profile?.age || "N/A"}</Text>
      <Text style={[styles.info, { color: theme.text }]}>Phone: {profile?.phone || "N/A"}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit Profile" onPress={() => Alert.alert("Edit Profile", "Feature coming soon!")} color={theme.tint} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  buttonContainer: { marginTop: 20, width: "100%" },
  errorText: { fontSize: 18 },
});
