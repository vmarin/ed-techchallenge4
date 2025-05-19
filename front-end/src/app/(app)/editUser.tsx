import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import Header from "@/components/header";
import Button from "@/components/button";
import { getUserById, updateUser } from "@/services/users";

export default function EditUser() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await getUserById(id);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o usuário');
      }
    }

    loadUser();
  }, [id]);

  async function handleUpdate() {
    try {
      const response = await updateUser(id, { name, email, role });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        router.push('/userList');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o usuário');
    }
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Editar Usuário" showBackButton />
      <TextInput style={s.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={s.input}>
        <Picker.Item label="Aluno" value="student" />
        <Picker.Item label="Professor" value="teacher" />
      </Picker>
      <Button title="Atualizar Usuário" onPress={handleUpdate} />
    </View>
  );
}

const s = StyleSheet.create({
  input: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  }
});
