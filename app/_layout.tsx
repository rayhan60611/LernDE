import "../global.css";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import {
  NotoSansBengali_400Regular,
  NotoSansBengali_500Medium,
  NotoSansBengali_600SemiBold,
  NotoSansBengali_700Bold
} from "@expo-google-fonts/noto-sans-bengali";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, useApp } from "../src/context/AppContext";
import { WordInspectorProvider } from "../src/context/WordInspectorContext";
import { StartupOnboardingGate } from "../src/components/onboarding/StartupOnboardingGate";

SplashScreen.preventAutoHideAsync().catch(() => {});

const RootNavigation: React.FC = () => {
  const { themeMode } = useApp();
  return (
    <StartupOnboardingGate>
      <StatusBar
        style={
          themeMode === "light" || themeMode === "pink" ? "dark" : "light"
        }
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </StartupOnboardingGate>
  );
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSansBengali_400Regular,
    NotoSansBengali_500Medium,
    NotoSansBengali_600SemiBold,
    NotoSansBengali_700Bold
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <WordInspectorProvider>
          <RootNavigation />
        </WordInspectorProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
