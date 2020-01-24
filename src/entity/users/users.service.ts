import { Injectable } from '@nestjs/common';
import { IUser } from 'src/entity/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateId } from '../../tools/geterate-id';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async getUsers(): Promise<IUser[]> {
    return this.userModel.find({}, {_id: 0});
  }

  async getUser(id: string): Promise<IUser> {
    return this.userModel.findOne({id}, {_id: 0});
  }

  async addUser(user: IUser): Promise<IUser> {
    const dataUser: IUser = {
      id: generateId(),
      name: user.name,
    };
    await this.userModel.collection.insertOne(dataUser);
    return {
      id: dataUser.id,
      name: dataUser.name,
    };
  }

  async updateUser(id: string, user: IUser): Promise<IUser> {
    await this.userModel.collection.updateOne({id}, {$set: user});
    return user;
  }

  async deleteUser(id: string): Promise<IUser[]> {
    await this.userModel.collection.deleteOne({id});
    return [];
  }

  async deleteAllUsers(): Promise<IUser[]> {
    await this.userModel.deleteMany({});
    return [];
  }
}
