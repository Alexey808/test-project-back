import {Get, HttpException, Injectable} from '@nestjs/common';
import { User } from 'src/entity/users/user.interface';
import { mockUsers } from 'src/entity/users/users.mock';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  // private readonly users: User[] = [];
  users = mockUsers;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  create(user: User) {
    this.users.push(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
    // return new Promise(resolve => {
    //   resolve(this.users);
    // });
  }

  getUser(userId): Promise<any> {
    const id = Number(userId);
    return new Promise(resolve => {
      const userFind = this.users.find(user => user.id === id);
      if (!userFind) {
        throw new HttpException('User does noe exist!', 404);
      }
      resolve(userFind);
    });
  }

  addUser(user: User): Promise<any> {
    const dataUser = {
      id: Number(user.id),
      name: user.name,
    };

    const addUser = new this.userModel(dataUser);

    return new Promise(resolve => {
      this.users.push(addUser);
      resolve(this.users);
    });
  }

  deleteUser(userId): Promise<any> {
    const id = Number(userId);
    return new Promise(resolve => {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) {
        throw new HttpException('User does not exist!', 404);
      }
      this.users.splice(1, index);
      resolve(this.users);
    });
  }
}
