// for sign in - attempt from claude
import { useSignIn } from "@clerk/expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  const { signIn, fetchStatus } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSignIn = async () => {
    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      console.error("sign-in failed:", error.message, error.code);
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        console.error("finalize failed:", finalizeError.message);
      }
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn.status);
    }
  };

  const handleVerify = async () => {
    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) {
      console.error("verify failed:", error.message, error.code);
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        console.error("finalize failed:", finalizeError.message);
      }
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <View className="flex-1 justify-center gap-3 p-5">
        <TextInput
          className="rounded-lg border border-gray-300 p-3 text-base"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerify} />
        <Button
          title="I need a new code"
          onPress={() => signIn.mfa.sendEmailCode()}
        />
        <Button title="Start over" onPress={() => signIn.reset()} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center gap-3 p-5">
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
      <Button
        title="Sign in"
        onPress={handleSignIn}
        disabled={fetchStatus === "fetching"}
      />
      <Link href="/(auth)/sign-up">
        <Text>Need an account? Sign up</Text>
      </Link>
    </View>
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
