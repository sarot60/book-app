import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LoginLimitGuard } from "./guards/login-limit.guard";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ service: 'user', cmd: 'register' })
  private async register(@Payload() payload: CreateUserDto) {
    const newUser = this.authService.register(payload);
    return newUser;
  }

  @MessagePattern({ service: 'user', cmd: 'login' })
  @UseGuards(LoginLimitGuard)
  private async login(@Payload() payload: LoginDto): Promise<{ accessToken: string }> {
    const body = { username: payload.username, password: payload.password };
    const clientIp: string = payload.ip.split(':').join('/');
    return this.authService.login(body, clientIp);
  }

  @MessagePattern({ service: 'user', cmd: 'validate-token' })
  private async validateToken(@Payload() payload: string) {
    return this.authService.validateToken(payload);
  }

  @MessagePattern({ service: 'user', cmd: 'change-password' })
  private async changePassword() {
    return 'change password'
  }
}