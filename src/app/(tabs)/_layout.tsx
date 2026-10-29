import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home tab</Label>
        <Icon
          sf="house.fill"
          src={<VectorIcon family={MaterialIcons} name="home" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <Icon
          sf="plus.circle"
          src={<VectorIcon family={MaterialIcons} name="add-circle-outline" />}
        />
        <Label>Planner tab</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
