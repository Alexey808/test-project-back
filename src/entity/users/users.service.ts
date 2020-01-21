import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/entity/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { wrapPromise } from '../../tools/wrap-promise';
import { generateId } from '../../tools/geterate-id';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find({}, {_id: 0});
    return wrapPromise(users);
  }

  async getUser(id: string): Promise<User> {
    const userFind = await this.userModel.findOne({id}, {_id: 0});
    return wrapPromise(userFind);
  }

  async addUser(user: User): Promise<User> {
    const dataUser = {
      id: generateId(),
      name: user.name,
    };

    await this.userModel.collection.insertOne(dataUser);
    //const users = await this.userModel.find({}, {_id: 0});
    return wrapPromise(dataUser);
  }

  async deleteUser(id: string): Promise<User[]> {
    await this.userModel.collection.deleteOne({id});
    const users = await this.userModel.find({}, {_id: 0});
    return wrapPromise(users);
  }

  async updateUser(id: string, user: User): Promise<User[]> {
    await this.userModel.collection.updateOne({id}, {$set: user});
    const users = await this.userModel.find({}, {_id: 0});
    return wrapPromise(users);
  }
}
