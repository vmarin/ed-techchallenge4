import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";
import Header from "@/components/header";
import { formatDate } from "@/utils/formatDate";
import { deletePost, getPostById } from "@/services/posts";
import { redirectWithDelay } from "@/utils/navigation";
import { useAuth } from "@/contexts/authContext";

export default function PostDetails() {
  const { user } = useAuth()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function fetchPostDetails() {
    try {
      setLoading(true)

      const { data } = await getPostById(id)
      setPost(data)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do post')

      redirectWithDelay('/', 2)
    } finally {
      setLoading(false)
    }
  }

  function handleDelete() {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir esta postagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim, excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(id)
              Alert.alert("Sucesso", "Post excluído com sucesso");
              router.push("/");
            } catch (error) {
              Alert.alert("Erro", "Erro ao excluir post");
            }
          },
        },
      ]
    );
  }

  useEffect(() => {
    fetchPostDetails()
  }, [])

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={s.loadingText}>Carregando post...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={s.loadingContainer}>
        <Text style={s.loadingText}>Post não encontrado ou erro ao carregar.</Text>
        {/* <Button title="Voltar para a Home" onPress={() => router.push("/")} /> */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 10 }}>
      <Header title="Detalhes da Postagem" showBackButton={true} />

      <View style={s.contentContainer}>
        {/* Linha Título e Data */}
        <View style={s.row}>
          <Text style={s.title}>{post.title}</Text>
          <Text style={s.date}>{formatDate(post.createdAt)}</Text>
        </View>

        {/* Autor */}
        <Text style={s.author}>Por {post.author}</Text>

        {/* Descrição */}
        <Text style={s.description}>{post.description}</Text>
      </View>

      {/* Botões */}
      <View style={s.footer}>
        {user && user.role !== 'student' && (
          <>
            <Button title="Editar" onPress={() => router.push({ pathname: '/editPost', params: { id } })} />
            <Button title="Excluir" onPress={handleDelete} />
          </>
        )}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
    flex: 0.8,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22,
    textAlign: "justify",
  },
  footer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
})