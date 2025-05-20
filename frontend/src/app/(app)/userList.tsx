import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import Header from "@/components/header";
import { deleteUser, getUsers } from "@/services/users";
import Icon from "@/assets/icons";
import { useIsFocused } from "@react-navigation/native";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  async function fetchUsers() {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [isFocused]);

  async function handleDeleteUser(id: string) {
    Alert.alert("Confirmação", "Deseja realmente excluir este usuário?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUser(id);
            fetchUsers();
            Alert.alert("Sucesso", "Usuário excluído com sucesso");
          } catch (error) {
            Alert.alert("Erro", "Erro ao excluir usuário");
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Usuários" showBackButton headerRight={
        <Pressable onPress={() => router.push('/newUser')}>
          <Icon name="newUserIcon" />
        </Pressable>
      } />
      <FlatList
        style={{ marginTop: 20 }}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={s.container}
          >
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/editUser', params: { id: item.id } })}
              style={s.userCard}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text style={{ color: 'gray' }}>{item.role}</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => handleDeleteUser(item.id)}
              style={{ marginLeft: 12 }}
            >
              <Icon name="trashIcon" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 6,
  },
  userCard: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 6,
  }
});

