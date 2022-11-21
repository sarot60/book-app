import { Response } from "express";
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, Inject, NotFoundException, Param, Post, Put, Query, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RedisContext, RpcException } from '@nestjs/microservices';
import { User } from "./schemas/user.schema";
import { CreateUserRequestDto } from "./dto/create-user.dto";
import { GetAllRequestDto } from "./dto/get-all-request.dto";
import { AuthHelper } from "src/auth/helpers/auth.helper";
import { ConfigService } from "@nestjs/config";
import { UpdateUserRequestDto } from "./dto/update-user-request.dto";
import { ICreateUserResponse, IDeleteUserResponse, IGetAllResponse, IGetUserByIdResponse, IUpdateUserResponse } from "./user.interface";
import { GetUserByIdRequestDto } from "./dto/get-user-by-id-request.dto";
import { DeleteUserRequestDto } from "./dto/delete-user-request.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
  ) { }

  @MessagePattern({ service: 'user', cmd: 'create' })
  private async createUser(@Payload() payload: CreateUserRequestDto): Promise<ICreateUserResponse> {

    const hashedPassword = this.authHelper.encodePassword(payload.password + this.configService.get<string>('PASSWORD_SECRET'));
    payload.password = hashedPassword;

    return await this.userService.createUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'get-all' })
  private async getAllUser(@Payload() payload: GetAllRequestDto): Promise<IGetAllResponse> {
    return await this.userService.getAllUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'update' })
  private async updateUser(@Payload() payload: UpdateUserRequestDto): Promise<IUpdateUserResponse> {
    return await this.userService.updateUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'get-by-id' })
  private async getUserById(@Payload() payload: GetUserByIdRequestDto): Promise<IGetUserByIdResponse> {
    return await this.userService.getUserById(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'delete' })
  private async deleteUser(@Payload() payload: DeleteUserRequestDto): Promise<IDeleteUserResponse> {
    return await this.userService.deleteUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'report-login-count' })
  private async reportUserLoginCount() {

  }

  @MessagePattern({ service: 'user', cmd: 'report-registered' })
  private async reportUserRegistered() {

  }
}
