import { Body, Controller, Delete, Get, Post, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':userId')
  async getUser(@Param('userId') userId) {
    const user = await this.usersService.getUser(userId);
    return user;
  }

  @Post()
  async addUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.addUser(createUserDTO);
    return user;
  }

  @Delete()
  async deleteUser(@Query() query) {
    const users = await this.usersService.deleteUser(query.userId);
    return users;
  }
}
