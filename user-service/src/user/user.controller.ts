import { Response } from "express";
import { UserService } from './user.service';
import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RedisContext } from '@nestjs/microservices';
import { PaginationParams } from "./dto/pagination.dto";
import { User } from "./schemas/user.schema";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @MessagePattern({ service: 'user', cmd: 'create' })
  private async createUser() {
    return 'create user';
  }

  @Get()
  @MessagePattern({ service: 'user', cmd: 'get-all' })
  private async getAllUser(
    @Query() { page, limit }: PaginationParams,
    @Query('search') search: string,
  ): Promise<{ users: User[], total: number }> {
    const results = await this.userService.getAllUser(page, limit, search);
    return results;
  }

  @Put(':id')
  @MessagePattern({ service: 'user', cmd: 'update' })
  private async updateUser() {
    return 'update user';
  }

  @Get(':id')
  @MessagePattern({ service: 'user', cmd: 'get-by-id' })
  private async getUserById() {
    return 'get user by id';
  }

  @Delete(':id')
  @MessagePattern({ service: 'user', cmd: 'delete' })
  private async deleteUser() {
    return 'delete';
  }

  @Put('ban/:id')
  @MessagePattern({ service: 'user', cmd: 'ban' })
  private async banTheUser() {
    return 'ban the user';
  }
}
