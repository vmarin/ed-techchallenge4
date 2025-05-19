import { api } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
}

export async function loginService(email: string, password: string): Promise<LoginResponse | null> {
  try {
    const response = await api.get(`/users?email=${email}&password=${password}`);

    const users = await response.data

    if (users.length > 0) {
      const user = users[0];
      // Simulando um token JWT
      const token = 'mocked-jwt-token';
      return { user, token };
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
