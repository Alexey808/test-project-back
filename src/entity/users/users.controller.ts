import { Body, Controller, Delete, Get, Post, Param, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/create-user.dto';
import { IUser } from './user.interface';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<IUser> {
    return await this.usersService.getUser(userId);
  }

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }

  @Post()
  async addUser(@Body() createUserDTO: UserDTO): Promise<IUser> {
    return await this.usersService.addUser(createUserDTO);
  }

  @Put()
  async updateUser(@Body() updateUserDTO: UserDTO[]): Promise<IUser[]> {
    return await this.usersService.updateUser(updateUserDTO);
  }

  @Delete()
  async deleteUser(@Query() user: IUser): Promise<IUser[]> {
    if (user && Boolean(user.id)) {
      return await this.usersService.deleteUser(user.id);
    } else {
      return await this.usersService.deleteAllUsers();
    }
  }
}
