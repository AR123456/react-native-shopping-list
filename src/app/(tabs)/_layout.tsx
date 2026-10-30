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
        <Label>List</Label>
        <Icon
          {...Platform.select({
            ios: { sf: "list.bullet.clipboard" as const },
            default: {
              src: (
                <VectorIcon
                  family={MaterialIcons}
                  name="format-list-bulleted"
                />
              ),
            },
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
        <Label>Planner</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <Icon
          {...Platform.select({
            ios: { sf: "chart.bar" as const },
            default: {
              src: <VectorIcon family={MaterialIcons} name="insights" />,
            },
          })}
        />
        <Label>Insights</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
