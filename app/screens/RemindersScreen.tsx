import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Button, Alert, StyleSheet, useColorScheme 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "@/config/api"; // ✅ Import API helper
import Colors from "@/config/Colors"; // ✅ Import Colors
import CustomCard from "@/components/CustomCard"; // ✅ Custom Card component

interface Reminder {
  _id: string;
  title: string;
  dateTime: string;
}

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // ✅ Detect light/dark mode
  const theme = Colors[colorScheme || "light"]; // ✅ Apply theme colors

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await api.get("/reminders");
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      Alert.alert("Error", "Failed to fetch reminders.");
    }
  };

  const addReminder = async () => {
    try {
      const newReminder = { title: "Medication Reminder", dateTime: date.toISOString() };
      const response = await api.post("/reminders", newReminder);
      setReminders([...reminders, response.data]);
      Alert.alert("Success", "Reminder added successfully!");
    } catch (error) {
      console.error("Error adding reminder:", error);
      Alert.alert("Error", "Failed to add reminder.");
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await api.delete(`/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder._id !== id));
      Alert.alert("Deleted", "Reminder removed successfully.");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      Alert.alert("Error", "Failed to delete reminder.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Reminders</Text>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} color={theme.tint} />
      <Button title="Add Reminder" onPress={addReminder} color={theme.tint} />

      <FlatList
        data={reminders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CustomCard 
            title={item.title} 
            description={new Date(item.dateTime).toLocaleString()}
            style={{ backgroundColor: theme.tint }}
          >
            <Button title="Delete" color="red" onPress={() => deleteReminder(item._id)} />
          </CustomCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
