import { User } from "@/types/user";
import { api } from "./api";
import uuid from 'react-native-uuid'

export async function getUsers() {
  try {
    const response = await api.get("/users");

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar os usuários')
  }
}

export async function getUserById(id: string) {
  try {
    const response = await api.get(`/users/${id}`);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar usuário')
  }
}

export async function createUser(data: { name: string, email: string, password: string, role: string }) {
  try {
    const payload = {
      ...data,
      id: uuid.v4(),
      createdAt: new Date().toISOString()
    }

    const response = await api.post('/users', payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao criar usuário')
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const payload = {
      ...data,
      modifiedAt: new Date().toISOString()
    }

    const response = await api.patch(`/users/${id}`, payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao atualizar usuário')
  }
}

export async function deleteUser(id: string) {
  try {
    await api.delete(`/users/${id}`);

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao deletar usuário')
  }
}
