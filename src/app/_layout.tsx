import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import "../../global.css";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}
