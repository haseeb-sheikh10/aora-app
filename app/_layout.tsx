import { SplashScreen, Stack } from "expo-router";
import useLoadFonts from "@/hooks/useLoadFonts";
import { useEffect } from "react";

export default function RootLayout() {
  const { fontsLoaded, error } = useLoadFonts();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
