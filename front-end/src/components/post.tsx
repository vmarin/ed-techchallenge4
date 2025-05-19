import Icon from "@/assets/icons";
import { formatDate } from "@/utils/formatDate";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PostProps = {
  id: string
  title: string
  description: string
  author: string
  createdAt: string
}
export default function Post({ id, title, description, author, createdAt }: PostProps) {
  function handlePress() {
    router.push({ pathname: '/postDetails', params: { id } });
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5} style={s.container}>
      <View style={s.header}>
        {/* Info do usuário e data */}
        <View style={{ gap: 2 }}>
          <Text>{author}</Text>
          <Text>{formatDate(createdAt)}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => router.push({ pathname: '/postDetails', params: { id } })}>
          <Icon name="threeDotsHorizontal" width={32} height={32} />
        </TouchableOpacity> */}
      </View>
      {/* Corpo do post */}
      <View>
        <View>
          <Text>{title}</Text>
          <Text numberOfLines={1} style={s.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    width: '90%'
  }
})