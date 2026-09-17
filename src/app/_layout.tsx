import { Stack, Slot } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import "../../global.css";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
