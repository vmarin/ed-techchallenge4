import { IUsers } from '../schemas/models/users.interface';
import { CreateUser, UpdateUser } from '../validations/users.zod';
export abstract class UsersRepository {
  abstract getAllUsers(): Promise<IUsers[]>;
  abstract searchUser(term: string): Promise<IUsers[]>;
  abstract getUser(userId: string): Promise<IUsers>;
  abstract createUser(user: CreateUser): Promise<IUsers>;
  abstract updateUser(userId: string, user: UpdateUser): Promise<IUsers | null>;
  abstract deleteUser(userId: string): Promise<IUsers | null>;
}
