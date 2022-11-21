import { HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Role } from "src/user/role.enum";
import { ICreateLogedinLog, ICreateRegisteredLog } from "../user/user.interface";
import { UserService } from "src/user/user.service";
import { AuthHelper } from "./helpers/auth.helper";
import { LoginLimitHelper } from "./helpers/login-limit.helper";
import { LoginRequestDto } from "./dto/login-request.dto";
import { IBanResponse, ICancelBanResponse, IChangePasswordResponse, ILoginResponse, IRegisterResponse, IValidateTokenResponse } from "./auth.interface";
import { ChangePasswordRequestDto } from "./dto/change-password-request.dto";
import { BanRequestDto } from "./dto/ban-request.dto";
import { CancelBanRequestDto } from "./dto/cancel-ban-request.dto";
import { ValidateTokenRequestDto } from "./dto/validate-token-request.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
    @Inject(LoginLimitHelper) private readonly loginLimitHelper: LoginLimitHelper,
  ) { }

  public async register(payload: CreateUserDto): Promise<IRegisterResponse> {
    const hashedPassword = this.authHelper.encodePassword(payload.password + this.configService.get<string>('PASSWORD_SECRET'));

    payload.password = hashedPassword;
    payload.roles = [Role.User];
    payload.banned = false;

    const newUser: any = await this.userService.createUser(payload);

    const registeredLogData: ICreateRegisteredLog = {
      userId: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    await this.userService.createRegistedLog(registeredLogData);

    return {
      data: {
        userId: newUser._id,
        username: newUser.username,
      },
      status: HttpStatus.OK,
      error: null,
      message: "Register successful"
    }
  }

  public async login(payload: LoginRequestDto): Promise<ILoginResponse> {
    const { username, password } = payload;
    const reqIp = payload.clientIp.split(':').join('/');

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

    const loginLogData: ICreateLogedinLog = {
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    await this.userService.createLogedinLog(loginLogData);

    return {
      data: { accessToken: this.authHelper.generateToken(user.username, user._id) },
      status: HttpStatus.OK,
      error: null,
      message: "Login successful"
    }
  }

  public async changePassword(payload: ChangePasswordRequestDto): Promise<IChangePasswordResponse> {
    const { userId, oldPassword, newPassword } = payload;

    const user: any = await this.userService.getUserPasswordById(userId);
    if (!user) throw new NotFoundException('Invalid user');

    const isPasswordValid: boolean = this.authHelper.isPasswordValid(oldPassword + this.configService.get<string>('PASSWORD_SECRET'), user.password)

    if (!isPasswordValid) throw new UnauthorizedException('Old password is incorrect.');

    const hashedNewPassword = this.authHelper.encodePassword(newPassword + this.configService.get<string>('PASSWORD_SECRET'));

    const updatedPassword = await this.userService.updatePassword(userId, hashedNewPassword);

    if (updatedPassword.matchedCount === 0) new NotFoundException('Invalid user');

    return {
      data: {
        userId
      },
      status: HttpStatus.OK,
      error: null,
      message: 'Update password successful',
    }
  }

  public async validateToken(payload: ValidateTokenRequestDto): Promise<IValidateTokenResponse> {
    const { token } = payload;

    const decoded = await this.authHelper.verify(token);

    if (!decoded) {
      return {
        data: null,
        status: HttpStatus.FORBIDDEN,
        error: { msg: 'Token is invalid' },
        message: 'Token is invalid',
      };
    }

    const auth = await this.authHelper.validateUser(decoded);

    if (!auth) {
      return {
        data: null,
        status: HttpStatus.CONFLICT,
        error: { msg: 'User not found' },
        message: 'User not found',
      };
    }

    return {
      data: {
        _id: decoded._id,
        username: auth.username,
        roles: auth.roles,
        banned: auth.banned,
      },
      status: HttpStatus.OK,
      error: null,
      message: 'Get token successful'
    };
  }

  public async banTheUser(payload: BanRequestDto): Promise<IBanResponse> {
    const userId = payload.userId;
    const banned = await this.userService.updateUser(userId, { banned: true });
    if (!banned) throw new NotFoundException('Invalid user');
    return {
      data: {
        userId: banned._id
      },
      status: HttpStatus.OK,
      error: null,
      message: 'Banned successful'
    }
  }

  public async cancelBanTheUser(payload: CancelBanRequestDto): Promise<ICancelBanResponse> {
    const userId = payload.userId;
    const banned = await this.userService.updateUser(userId, { banned: false });
    if (!banned) throw new NotFoundException('Invalid user');
    return {
      data: {
        userId: banned._id
      },
      status: HttpStatus.OK,
      error: null,
      message: 'Cancel ban successful'
    }
  }
}