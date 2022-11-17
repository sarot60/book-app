import { Response } from "express";
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, Inject, NotFoundException, Param, Post, Put, Query, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RedisContext, RpcException } from '@nestjs/microservices';
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetAllRequestDto } from "./dto/get-all-request.dto";
import { AuthHelper } from "src/auth/helpers/auth.helper";
import { ConfigService } from "@nestjs/config";
import { UpdateUserRequestDto } from "./dto/update-user-request.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
  ) { }

  @MessagePattern({ service: 'user', cmd: 'create' })
  private async createUser(@Payload() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = this.authHelper.encodePassword(createUserDto.password + this.configService.get<string>('PASSWORD_SECRET'));
    createUserDto.password = hashedPassword;
    return await this.userService.createUser(createUserDto);
  }

  @MessagePattern({ service: 'user', cmd: 'get-all' })
  private async getAllUser(@Payload() payload: GetAllRequestDto): Promise<{ users: User[], total: number }> {
    const { page, limit, search } = payload;
    return await this.userService.getAllUser(page, limit, search);
  }

  @MessagePattern({ service: 'user', cmd: 'update' })
  private async updateUser(@Payload() payload: UpdateUserRequestDto): Promise<any> {
    const id: string = payload.id;
    const body: UpdateUserDto = payload.body;
    return await this.userService.updateUser(id, body);
  }

  @MessagePattern({ service: 'user', cmd: 'get-by-id' })
  private async getUserById(@Payload() id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @MessagePattern({ service: 'user', cmd: 'delete' })
  private async deleteUser(@Payload() id: string): Promise<any> {
    return await this.userService.deleteUser(id);
  }
}
