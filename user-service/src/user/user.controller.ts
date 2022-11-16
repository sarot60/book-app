import { Response } from "express";
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RedisContext } from '@nestjs/microservices';
import { PaginationParams } from "./dto/pagination.dto";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @MessagePattern({ service: 'user', cmd: 'create' })
  private async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Get()
  @MessagePattern({ service: 'user', cmd: 'get-all' })
  private async getAllUser(
    @Query() { page, limit }: PaginationParams,
    @Query('search') search: string,
  ): Promise<{ users: User[], total: number }> {
    const users = await this.userService.getAllUser(page, limit, search);
    return users;
  }

  @Put(':id')
  @MessagePattern({ service: 'user', cmd: 'update' })
  private async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return updatedUser;
  }

  @Get(':id')
  @MessagePattern({ service: 'user', cmd: 'get-by-id' })
  private async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Delete(':id')
  @MessagePattern({ service: 'user', cmd: 'delete' })
  private async deleteUser(@Param('id') id: string): Promise<any> {
    const deletedUser = await this.userService.deleteUser(id);
    return { message: 'Delete user successful', _id: deletedUser._id };
  }

  @Put('ban/:id')
  @MessagePattern({ service: 'user', cmd: 'ban' })
  private async banTheUser(@Param('id') id: string): Promise<any> {
    const banned = await this.userService.banTheUser(id);
    return { message: 'Banned successful', _id: banned._id };
  }
}
