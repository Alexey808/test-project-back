import { Body, Controller, Delete, Get, Post, Param, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') userId) {
    return await this.usersService.getUser(userId);
  }

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async addUser(@Body() createUserDTO: UserDTO) {
    return await this.usersService.addUser(createUserDTO);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDTO: UserDTO) {
    return await this.usersService.updateUser(id, updateUserDTO);
  }

  @Delete()
  async deleteUser(@Query() query) {
    return await this.usersService.deleteUser(query.id);
  }

  @Delete()
  async deleteAllUsers() {
    console.log('deleteAllUsers');
    return await this.usersService.deleteAllUsers();
  }
}
