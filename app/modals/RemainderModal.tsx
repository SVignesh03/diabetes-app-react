import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReminderModal() {
  const router = useRouter();
  const [reminderText, setReminderText] = useState('');

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set a Reminder</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter reminder (e.g., Take insulin at 8AM)"
            value={reminderText}
            onChangeText={setReminderText}
          />

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={() => { /* Save reminder logic */ }} />
            <Button title="Close" color="red" onPress={() => router.back()} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
