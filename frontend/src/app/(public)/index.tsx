import Header from "@/components/header";
import Posts from "@/components/posts";
import { getPosts } from "@/services/posts";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      setLoading(true);

      const { data } = await getPosts()
      setPosts(data)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os posts')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={s.loadingText}>Carregando posts...</Text>
      </View>
    );
  }


  return (
    <View style={{ flex: 1, gap: 40, padding: 20, paddingTop: 40 }}>
      <Header />
      <Posts data={posts} />
    </View>
  )
}

const s = StyleSheet.create({
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