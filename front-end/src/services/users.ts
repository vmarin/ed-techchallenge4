import { User } from "@/types/user";
import { api } from "./api";

export interface MongoUser extends Omit<User, "id"> {
  _id?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export async function getUsers(): Promise<MongoUser[]> {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os usuários", error);
    throw new Error("Erro ao buscar os usuários");
  }
}

export async function getUserById(id: string): Promise<MongoUser> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    throw new Error("Erro ao buscar usuário");
  }
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<MongoUser> {
  try {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const response = await api.post("/users", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário", error);

    // Melhoria: Tratamento mais específico de erros
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error("Email já está em uso");
    }

    throw new Error("Erro ao criar usuário");
  }
}

export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<MongoUser> {
  try {
    const payload = {
      ...data,
      modifiedAt: new Date().toISOString(),
    };

    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);

    // Tratamento de erro específico para usuário não encontrado
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    }

    throw new Error("Erro ao atualizar usuário");
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Erro ao deletar usuário", error);

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    }

    throw new Error("Erro ao deletar usuário");
  }
}
