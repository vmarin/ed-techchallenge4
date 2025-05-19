import { api } from "./api";

// Tipos para melhor organização
interface Post {
  _id?: string; // MongoDB usa _id como padrão
  title: string;
  description: string;
  author?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await api.get("/posts");
    return response.data; // Retorna diretamente os dados
  } catch (error) {
    console.error("Erro ao buscar os posts", error);
    throw new Error("Erro ao buscar os posts");
  }
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar post", error);
    throw new Error("Erro ao buscar post");
  }
}

export async function createPost(data: {
  title: string;
  description: string;
}): Promise<Post> {
  try {
    const payload = {
      ...data,
      author: "Professor João",
      createdAt: new Date().toISOString(),
    };

    const response = await api.post("/posts", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post", error);
    throw new Error("Erro ao criar post");
  }
}

export async function updatePost(
  id: string,
  data: { title: string; description: string }
): Promise<Post> {
  try {
    const payload = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };

    const response = await api.put(`/posts/${id}`, payload); // Mudei para PUT (mais comum em APIs RESTful)
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post", error);
    throw new Error("Erro ao atualizar post");
  }
}

export async function deletePost(id: string): Promise<void> {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error("Erro ao deletar post", error);
    throw new Error("Erro ao deletar post");
  }
}
