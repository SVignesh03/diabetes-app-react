import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "@/config/api"; // Import centralized API helper
import Colors from "@/config/Colors"; // Import theme colors

interface Log {
  _id: string;
  type: "blood_sugar" | "blood_pressure";
  value: number;
  date: string;
}

export default function LogsScreen() {
  const colorScheme = useColorScheme(); // Get system theme
  const theme = Colors[colorScheme || "light"]; // Apply correct theme

  const [logs, setLogs] = useState<Log[]>([]);
  const [newLog, setNewLog] = useState({ type: "blood_sugar", value: "", date: new Date() });
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch logs from API
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      Alert.alert("Error", "Failed to fetch logs.");
    }
    setLoading(false);
  };

  // Add a new log
  const addLog = async () => {
    if (!newLog.value) {
      Alert.alert("Error", "Please enter a value.");
      return;
    }

    try {
      const response = await api.post("/logs", {
        ...newLog,
        value: Number(newLog.value),
        date: newLog.date.toISOString(),
      });
      setLogs([...logs, response.data]);
      setNewLog({ type: "blood_sugar", value: "", date: new Date() });
    } catch (error) {
      console.error("Error adding log:", error);
      Alert.alert("Error", "Failed to add log.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Health Logs</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.tint} />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[styles.logItem, { borderBottomColor: theme.tint }]}>
              <Text style={{ color: theme.text }}>
                {item.type === "blood_sugar" ? "Blood Sugar" : "Blood Pressure"}: {item.value}
              </Text>
              <Text style={{ color: theme.text }}>{new Date(item.date).toLocaleString()}</Text>
            </View>
          )}
        />
      )}

      <TextInput
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.tint }]}
        placeholder="Enter Value"
        placeholderTextColor={theme.text}
        keyboardType="numeric"
        value={newLog.value}
        onChangeText={(text) => setNewLog({ ...newLog, value: text })}
      />

      <Button title="Select Date & Time" onPress={() => setShowPicker(true)} color={theme.tint} />

      {showPicker && (
        <DateTimePicker
          value={newLog.date}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setNewLog({ ...newLog, date: selectedDate });
            }
          }}
        />
      )}

      <Button title="Add Log" onPress={addLog} color={theme.tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  logItem: { padding: 10, borderBottomWidth: 1 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});
