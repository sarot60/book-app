import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { AuthHelper } from "./helpers/auth.helper";
import { LoginLimitHelper } from "./helpers/login-limit.helper";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
    @Inject(LoginLimitHelper) private readonly loginLimitHelper: LoginLimitHelper,
  ) { }

  async login(body: any, reqIp: string): Promise<string | { accessToken: string } | never> {
    const { username, password } = body;
    const user: any = await this.userService.getUserByUsername(username);

    if (!user) {
      await this.loginLimitHelper.saveLoginFailedCountToCache(reqIp);
      throw new UnauthorizedException('username or password is incorrect.');
    }

    const isPasswordValid: boolean = this.authHelper.isPasswordValid(password + this.configService.get<string>('PASSWORD_SECRET'), user.password)

    if (!isPasswordValid) {
      await this.loginLimitHelper.saveLoginFailedCountToCache(reqIp);
      throw new UnauthorizedException('password is incorrect.');
    }

    await this.loginLimitHelper.deleteLoginFailedCountFromCache(reqIp);

    return { accessToken: this.authHelper.generateToken(user.username, user._id) };
  }
}