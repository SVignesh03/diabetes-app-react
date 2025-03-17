import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import ReminderModal from '../modals/RemainderModal';

export type RootStackParamList = {
  Main: undefined;
  ReminderModal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
        {/* Main Tab Navigation */}
        <Stack.Screen name="Main" component={TabNavigator} />
        
        {/* Modal Screens */}
        <Stack.Screen name="ReminderModal" component={ReminderModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
