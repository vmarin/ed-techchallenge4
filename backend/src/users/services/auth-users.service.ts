import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthUsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ username: 'admin' });

    if (!adminExists) {
      const password = 'admin';
      const hashedPassword = await hash(password, 10);

      const adminUser = new this.userModel({
        username: 'admin',
        password: hashedPassword,
        fullName: 'Admin User',
      });

      await adminUser.save();
      console.log('Usuário admin criado com sucesso');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
