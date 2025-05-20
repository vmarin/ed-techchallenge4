import { api } from "./api";
import uuid from 'react-native-uuid'

export async function getPosts() {
  try {
    const response = await api.get("/posts");

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar os posts')
  }
}

export async function getPostById(id: string) {
  try {
    const response = await api.get(`/posts/${id}`);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar post')
  }
}

export async function createPost(data: { title: string, description: string }) {
  try {
    const payload = {
      ...data,
      id: uuid.v4(),
      author: 'Professor João',
      createdAt: new Date().toISOString()
    }

    const response = await api.post('/posts', payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao criar post')
  }
}

export async function updatePost(id: string, data: { title: string, description: string }) {
  try {
    const payload = {
      ...data,
      modifiedAt: new Date().toISOString()
    }

    const response = await api.patch(`/posts/${id}`, payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao atualizar post')
  }
}

export async function deletePost(id: string) {
  try {
    await api.delete(`/posts/${id}`);

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao deletar post')
  }
}
