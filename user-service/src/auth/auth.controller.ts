import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LoginLimitGuard } from "./guards/login-limit.guard";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ service: 'user', cmd: 'login' })
  @UseGuards(LoginLimitGuard)
  async login(@Payload() payload: LoginDto): Promise<{ accessToken: string } | string> {
    const body = { username: payload.username, password: payload.password };
    const clientIp: string = payload.ip.split(':').join('/');
    return this.authService.login(body, clientIp);
  }
}