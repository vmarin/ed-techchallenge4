import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from '../users.repository';
import { IUsers } from 'src/users/schemas/models/users.interface';
import { User } from 'src/users/schemas/users.schema';
import { CreateUser } from 'src/users/validations/users.zod';

export class UsersMongooseRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getAllUsers(): Promise<IUsers[]> {
    return this.userModel.find({});
  }

  getUser(userId: string): Promise<IUsers> {
    return this.userModel.findById(userId).exec();
  }

  searchUser(term: string): Promise<IUsers[]> {
    const regex = new RegExp(term, 'i');
    return this.userModel
      .find({
        $or: [{ fullName: regex }, { isAdmin: regex }, { role: regex }],
      })
      .exec();
  }

  async createUser(user: CreateUser): Promise<IUsers> {
    const createUser = new this.userModel(user);
    return await createUser.save();
  }

  async updateUser(
    userId: string,
    user: Partial<IUsers>,
  ): Promise<IUsers | null> {
    const updateData = Object.fromEntries(
      Object.entries(user).filter(([, value]) => value !== undefined),
    );

    const result = await this.userModel
      .findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true })
      .exec();

    return result;
  }

  deleteUser(userId: string): Promise<IUsers | null> {
    return this.userModel.findByIdAndDelete({ _id: userId }).exec();
  }
}
