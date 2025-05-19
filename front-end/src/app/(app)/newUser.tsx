import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import Header from "@/components/header";
import Button from "@/components/button";
import { createUser } from "@/services/users";

export default function NewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  async function handleCreate() {
    if (!name || !email || !password || !role) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await createUser({ name, email, password, role });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        router.push('/userList');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar o usuário');
    }
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Criar Usuário" showBackButton />
      <TextInput style={s.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={s.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={s.input}>
        <Picker.Item label="Aluno" value="student" />
        <Picker.Item label="Professor" value="teacher" />
      </Picker>
      <Button title="Criar Usuário" onPress={handleCreate} />
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
