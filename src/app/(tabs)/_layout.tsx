import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
//  taking care of error ios vs android
import { Platform } from "react-native";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  // check signed in
  // load grocery store items
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  return (
    <NativeTabs
      tintColor={tabTintColor}
      indicatorColor="#bfdbfe"
      labelVisibilityMode="labeled"
      backgroundColor="#eff6ff"
    >
      <NativeTabs.Trigger name="index">
        <Label>List</Label>
        <Icon
          {...Platform.select({
            ios: {
              sf: {
                default: "list.bullet.clipboard",
                selected: "list.bullet.clipboard.fill",
              } as const,
            },
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
            ios: {
              sf: {
                default: "plus.circle",
                selected: "plus.circle.fill",
              } as const,
            },
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
            ios: {
              sf: {
                default: "chart.bar",
                selected: "chart.bar.fill",
              } as const,
            },
            default: {
              src: {
                default: <VectorIcon family={MaterialIcons} name="insights" />,
                selected: (
                  <VectorIcon family={MaterialIcons} name="multiline-chart" />
                ),
              },
            },
          })}
        />
        <Label>Insights</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
