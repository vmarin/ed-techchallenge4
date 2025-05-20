import { Pressable, StyleSheet, Text, View } from "react-native"

type ButtonProps = {
  title: string
  onPress: () => void
}

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={s.button}>
      <Text style={[s.text]}>
        {title}
      </Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  button: {
    backgroundColor: '#28fc76',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 18
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: "500",
  }
})