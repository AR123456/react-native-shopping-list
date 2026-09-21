// TBD content
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Show, useClerk, useUser } from "@clerk/expo";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View>
      <Text>Welcome</Text>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </Show>
      <Show when="signed-in">
        <Text>Hello user{user?.emailAddresses[0].emailAddress} </Text>
        <Pressable onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Pressable>
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({});
