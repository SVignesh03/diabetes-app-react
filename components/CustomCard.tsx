import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface CustomCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  style?: ViewStyle; // ✅ Allow passing styles
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomCard;
