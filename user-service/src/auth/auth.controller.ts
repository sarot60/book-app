import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LoginLimitGuard } from "./guards/login-limit.guard";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ service: 'user', cmd: 'register' })
  private async register(@Payload() payload: CreateUserDto) {
    return this.authService.register(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'login' })
  @UseGuards(LoginLimitGuard)
  private async login(@Payload() payload: LoginDto): Promise<{ accessToken: string }> {
    const body = { username: payload.username, password: payload.password };
    const clientIp: string = payload.ip.split(':').join('/');
    return this.authService.login(body, clientIp);
  }

  @MessagePattern({ service: 'user', cmd: 'change-password' })
  private async changePassword(@Payload() payload: ChangePasswordDto) {
    const { _id, oldPassword, newPassword } = payload;
    return this.authService.changePassword(_id, oldPassword, newPassword);
  }

  @MessagePattern({ service: 'user', cmd: 'ban' })
  private async banTheUser(@Payload() id: string): Promise<any> {
    return await this.authService.banTheUser(id);
  }

  @MessagePattern({ service: 'user', cmd: 'cancel-ban' })
  private async cancelBanTheUser(@Payload() id: string): Promise<any> {
    return await this.authService.cancelBanTheUser(id);
  }

  @MessagePattern({ service: 'user', cmd: 'validate-token' })
  private async validateToken(@Payload() payload: string) {
    return this.authService.validateToken(payload);
  }
}