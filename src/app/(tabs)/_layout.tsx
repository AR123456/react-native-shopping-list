//  sdk 54 right from docs
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {/* do I need md for android ? */}
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <Icon sf="plus.circle" drawable="custom_settings_drawable" />
        <Label>Planner</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
