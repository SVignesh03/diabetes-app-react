import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/config/api"; // Import API helper
import Colors from "@/config/Colors"; // Import Colors.ts

interface Appointment {
  _id: string;
  doctor: string;
  date: string;
  time: string;
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const colorScheme = useColorScheme(); // Detect system theme
  const theme = Colors[colorScheme || "light"]; // Select colors based on theme

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments from backend using api.ts
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "Failed to load appointments.");
    }
    setLoading(false);
  };

  // Delete an appointment
  const handleDeleteAppointment = async (id: string) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      Alert.alert("Deleted", "Appointment has been removed.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      Alert.alert("Error", "Failed to delete appointment.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Upcoming Appointments</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.tint} />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[styles.appointmentCard, { backgroundColor: theme.tabIconDefault }]}>
              <Text style={[styles.doctor, { color: theme.text }]}>{item.doctor}</Text>
              <Text style={{ color: theme.text }}>
                {item.date} at {item.time}
              </Text>
              <Button
                title="Cancel"
                color="red"
                onPress={() => handleDeleteAppointment(item._id)}
              />
            </View>
          )}
        />
      )}

      <Button
        title="Add Appointment"
        color={theme.tint}
        onPress={() => router.push("/modal/appointment")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  appointmentCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  doctor: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
