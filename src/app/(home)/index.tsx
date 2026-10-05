// TBD content
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Show, useClerk, useUser } from "@clerk/expo";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="flex-1 justify-center gap-3 p-5">
      <Text className="text-xl font-semibold">Welcome</Text>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text className="text-base text-blue-600">Sign in</Text>
        </Link>
      </Show>
      <Show when="signed-in">
        <Text className="text-base">
          Hello user {user?.emailAddresses[0].emailAddress}
        </Text>
        <Pressable
          onPress={() => signOut()}
          className="items-center rounded-lg bg-blue-600 p-3 active:bg-blue-700"
        >
          <Text className="text-base font-semibold text-white">Sign Out</Text>
        </Pressable>
      </Show>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
