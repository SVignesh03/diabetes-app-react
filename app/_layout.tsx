import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main Tab Screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Modal Screens */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />

        {/* Individual Screens */}
        <Stack.Screen name="screens/SettingsScreen" options={{ title: "Settings" }} />
        <Stack.Screen name="screens/LogsScreen" options={{ title: "Logs" }} />
        <Stack.Screen name="screens/RemindersScreen" options={{ title: "Reminders" }} />
        <Stack.Screen name="screens/AppointmentsScreen" options={{ title: "Appointments" }} />
      </Stack>
    </ThemeProvider>
  );
}
