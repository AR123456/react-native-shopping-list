import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
//  taking care of error ios vs android
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home tab</Label>
        <Icon
          {...Platform.select({
            ios: { sf: "house.fill" as const },
            default: { src: <VectorIcon family={MaterialIcons} name="home" /> },
          })}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <Icon
          {...Platform.select({
            ios: { sf: "plus.circle" as const },
            default: {
              src: (
                <VectorIcon family={MaterialIcons} name="add-circle-outline" />
              ),
            },
          })}
        />
        <Label>Planner tab</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
