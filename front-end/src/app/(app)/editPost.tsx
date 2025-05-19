import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/header";
import { api } from "@/services/api";
import { updatePost } from "@/services/posts";
import { redirectWithDelay } from "@/utils/navigation";

export default function EditPost() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${id}`);
        const post = response.data;

        setTitle(post.title);
        setDescription(post.description);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do post');

        redirectWithDelay('/', 2)
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function onSubmit() {

    if (!description.trim()) {
      Alert.alert('Erro', 'O post não pode estar vazio!')
    }

    try {
      const response = await updatePost(id, {
        title,
        description,
      })

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Post editado com sucesso!')

        router.push('/')
      } else {
        throw new Error('Erro ao editar post')
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar o post')

      redirectWithDelay('/', 2)
    }

  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 10 }}>
      <Header title="Editar Postagem" showBackButton={true} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <TextInput multiline style={s.title} placeholder="Titulo do post" value={title} onChangeText={setTitle} />
          <TextInput multiline style={s.description} placeholder="O que você tem em mente?" value={description} onChangeText={setDescription} />
        </View>
        <Button title="Editar postagem" onPress={onSubmit} />
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