import Icon from "@/assets/icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function BackButton() {
  return (
    <Pressable style={s.button} onPress={() => router.back()}>
      <Icon name="arrowLeft" />
    </Pressable>
  )
}

const s = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.07)'
  }
})