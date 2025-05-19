import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUser, UpdateUser } from '../validations/users.zod';
import * as bcrypt from 'bcrypt';
import { IUsers } from '../schemas/models/users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async searchUser(term: string) {
    return this.userRepository.searchUser(term);
  }
  async getUser(userId: string) {
    const user = await this.userRepository.getUser(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async createUser(user: CreateUser) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      return await this.userRepository.createUser({
        ...user,
        password: hashedPassword,
      });
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Username já está em uso');
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async updateUser(userId: string, user: UpdateUser) {
    const updateUser = await this.userRepository.updateUser(userId, user);

    if (!updateUser) throw new NotFoundException('Usuário não encontrado');
    return updateUser;
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.userRepository.deleteUser(userId);

    if (!deletedUser) throw new NotFoundException('Usuário não encontrado');
    return { message: `Usuário com id ${userId} deletado com sucesso.` };
  }
}
