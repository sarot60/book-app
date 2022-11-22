import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";
import {
  IBanResponse,
  ICancelBanResponse,
  IChangePasswordResponse,
  ILoginResponse,
  IRegisterResponse,
  IValidateTokenResponse,
} from "./auth.interface";
import { LoginLimitGuard } from "./guards/login-limit.guard";
import { LoginRequestDto } from "./dto/login-request.dto";
import { ChangePasswordRequestDto } from "./dto/change-password-request.dto";
import { BanRequestDto } from "./dto/ban-request.dto";
import { CancelBanRequestDto } from "./dto/cancel-ban-request.dto";
import { ValidateTokenRequestDto } from "./dto/validate-token-request.dto";
import { CreateUserRequestDto } from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ service: 'user', cmd: 'register' })
  private async register(@Payload() payload: CreateUserRequestDto): Promise<IRegisterResponse> {
    return this.authService.register(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'login' })
  @UseGuards(LoginLimitGuard)
  private login(@Payload() payload: LoginRequestDto): Promise<ILoginResponse> {
    return this.authService.login(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'change-password' })
  private async changePassword(@Payload() payload: ChangePasswordRequestDto): Promise<IChangePasswordResponse> {
    return this.authService.changePassword(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'ban' })
  private async banTheUser(@Payload() payload: BanRequestDto): Promise<IBanResponse> {
    return await this.authService.banTheUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'cancel-ban' })
  private async cancelBanTheUser(@Payload() payload: CancelBanRequestDto): Promise<ICancelBanResponse> {
    return await this.authService.cancelBanTheUser(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'validate-token' })
  private async validateToken(@Payload() payload: ValidateTokenRequestDto): Promise<IValidateTokenResponse> {
    return this.authService.validateToken(payload);
  }
}