import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/entity/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(userId): Promise<User> {
    const id = Number(userId);

    const userFind = await this.userModel.collection.findOne({id});

    return new Promise(resolve => {
      if (!userFind) {
        throw new HttpException('User does noe exist!', 404);
      }
      resolve(userFind);
    });
  }

  async addUser(user: User): Promise<User[]> {
    const dataUser = {
      id: Number(user.id),
      name: user.name,
    };

    await this.userModel.collection.insertOne(dataUser);

    return new Promise(resolve => {
      this.users.push(dataUser);
      resolve(this.users);
    });
  }

  async deleteUser(userId): Promise<User[]> {
    const id = Number(userId);

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
    console.log('service --->>> ', user);
    const dataUser = await this.userModel.collection.updateOne({id: Number(user.id)}, {$set: user});
    //console.log(dataUser);

    return new Promise(resolve => {
      this.users.push(dataUser);
      resolve(this.users);
    });
  }
}
