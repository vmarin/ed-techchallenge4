import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import { router } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/header";
import { createPost } from "@/services/posts";
import { redirectWithDelay } from "@/utils/navigation";

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function onSubmit() {

    if (!description.trim()) {
      Alert.alert('Erro', 'O post não pode estar vazio!')
    }

    try {
      const response = await createPost({
        title,
        description,
      })

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Post criado com sucesso!')

        setTitle('')
        setDescription('')

        router.push('/')
      } else {
        throw new Error('Erro ao criar post')
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post')

      redirectWithDelay('/', 2)
    }

  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 10 }}>
      <Header title="Nova Postagem" showBackButton={true} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <TextInput multiline style={s.title} placeholder="Titulo do post" value={title} onChangeText={setTitle} />
          <TextInput multiline style={s.description} placeholder="O que você tem em mente?" value={description} onChangeText={setDescription} />
        </View>
        <Button title="Criar postagem" onPress={onSubmit} />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  title: {
    marginTop: 20,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: '#000'
  },
  description: {
    height: '50%',
    textAlignVertical: "top",
    gap: 10,
    marginTop: 15,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: '#000'
  }
})