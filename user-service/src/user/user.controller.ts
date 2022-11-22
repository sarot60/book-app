import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigService } from "@nestjs/config";
import {
  ICreateUserResponse,
  IDeleteUserResponse,
  IGetAllResponse,
  IGetLastPurchasedBookResponse,
  IGetTotalBookPurchasedEachUserResponse,
  IGetUserByIdResponse,
  INewUserResponse,
  IUpdateUserResponse,
  IUserLoginCountResponse
} from "./user.interface";
import { GetUserByIdRequestDto } from "./dto/get-user-by-id-request.dto";
import { DeleteUserRequestDto } from "./dto/delete-user-request.dto";
import { UpdateUserRequestDto } from "./dto/update-user-request.dto";
import { CreateUserRequestDto } from "./dto/create-user.dto";
import { GetAllRequestDto } from "./dto/get-all-request.dto";
import { AuthHelper } from "../auth/helpers/auth.helper";

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

  @MessagePattern({ service: 'user', cmd: 'get-total-book-purchased-by-the-user' })
  private async getTotalBookPurchasedByTheUser(): Promise<IGetTotalBookPurchasedEachUserResponse> {
    return await this.userService.getTotalBookPurchasedByTheUser();
  }

  @MessagePattern({ service: 'user', cmd: 'get-last-purchased-book' })
  private async getLastPurchasedBook(): Promise<IGetLastPurchasedBookResponse> {
    return await this.userService.getLastPurchasedBook();
  }

  @MessagePattern({ service: 'user', cmd: 'report-login-count' })
  private async reportUserLoginCount(@Payload() payload: any): Promise<IUserLoginCountResponse> {
    return await this.userService.reportUserLoginCount(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'report-registered' })
  private async reportUserRegistered(@Payload() payload: any): Promise<INewUserResponse> {
    return await this.userService.reportUserRegistered(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'get-all-top-user' })
  private async getAllTopUser(): Promise<any> {
    return await this.userService.getAllTopUser();
  }
}
