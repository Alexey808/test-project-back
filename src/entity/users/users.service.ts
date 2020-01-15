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

    console.log('getUsers() -> users -> ', users);

    return wrapPromise(users);
  }

  async getUser(id: string): Promise<User> {
    console.log('------------>', id);
    const userFind = await this.userModel.findOne({id}, {_id: 0});

    console.log('getUser(id) -> user -> ', userFind);

    return wrapPromise(userFind);
  }

  async addUser(user: User) {
    const dataUser = {
      id: generateId(),
      name: user.name,
    };

    console.log('addUser(..) -> user -> ', dataUser);
    // разобраться почему не доабвляются id в бд
    await this.userModel.collection.insertOne(dataUser);
    const users = await this.userModel.find({}, {_id: 0});
    console.log('addUser(..) -> users -> ', users);
    return wrapPromise(users);
  }

  async deleteUser(id): Promise<User[]> {
    await this.userModel.collection.deleteOne({id});

    return new Promise(resolve => {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) {
        throw new HttpException('User does not exist!', 404);
      }
      this.users.splice(1, index);
      resolve(this.users);
    });
  }

  async updateUser(user: User): Promise<User[]> {
    const dataUser = await this.userModel.collection.updateOne({id: user.id}, {$set: user});

    return new Promise(resolve => {
      this.users.push(dataUser);
      resolve(this.users);
    });
  }
}
