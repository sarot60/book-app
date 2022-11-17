import { HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Role } from "src/user/role.enum";
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

  public async register(payload) {
    const hashedPassword = this.authHelper.encodePassword(payload.password + this.configService.get<string>('PASSWORD_SECRET'));

    payload.password = hashedPassword;
    payload.roles = [Role.User];
    payload.banned = false;

    const newUser = await this.userService.createUser(payload);

    delete newUser.password;

    return newUser;
  }

  public async login(body: any, reqIp: string): Promise<{ accessToken: string }> {
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

  public async changePassword(password, newPassword) {

  }

  public async validateToken(token: string) {
    const decoded = await this.authHelper.verify(token);

    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], _id: null };
    }

    const auth = await this.authHelper.validateUser(decoded);

    if (!auth) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], _id: null };
    }

    return {
      status: HttpStatus.OK,
      error: null,
      _id: decoded._id,
      username: auth.username,
      roles: auth.roles,
      banned: auth.banned,
    };
  }
}