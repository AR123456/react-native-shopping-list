import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  // aka handleSubmit
  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress, password });
    if (error) {
      // Handle the error in your app.
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      // Handle the error in your app.
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    setIsVerifying(true);
  };

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      // Handle the error in your app.
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      //TODO something meaningful here in finalizeError block
      // Handle the error in your app.
      // console.log("signUp status:", signUp.status);
      // console.log("missing fields:", signUp.missingFields);
      // console.log("unverified fields:", signUp.unverifiedFields);
      // console.error(
      //   "finalize failed:",
      //   finalizeError.message,
      //   finalizeError.code,
      // );
      console.log("full finalize error:", finalizeError);
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>You're signed in</Text>
      </SafeAreaView>
    );
  }

  if (isVerifying) {
    return (
      <SafeAreaView className="flex-1 justify-center gap-3 p-5">
        <TextInput
          className="rounded-lg border border-gray-300 p-3 text-base"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Pressable
          onPress={handleVerify}
          className="items-center rounded-lg bg-blue-600 p-3 active:bg-blue-700"
        >
          <Text className="text-base font-semibold text-white">Verify</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        className="rounded-lg border border-gray-300 p-3 text-base"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      <TextInput
        className="rounded-lg border border-gray-300 p-3 text-base"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Pressable
        onPress={handleSignUp}
        disabled={fetchStatus === "fetching"}
        className="items-center rounded-lg bg-blue-600 p-3 active:bg-blue-700 disabled:opacity-50"
      >
        <Text className="text-base font-semibold text-white">Sign up</Text>
      </Pressable>
      {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
      <View nativeID="clerk-captcha" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
