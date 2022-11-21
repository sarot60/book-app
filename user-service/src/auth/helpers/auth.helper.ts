import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserService } from "../../user/user.service";

@Injectable()
export class AuthHelper {
  private readonly jwtService: JwtService;
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  constructor(jwtService: JwtService, userService: UserService, configService: ConfigService) {
    this.jwtService = jwtService;
    this.userService = userService;
    this.configService = configService;
  }

  public generateToken(username: string, userId: string): string {
    return this.jwtService.sign({ username: username, _id: userId });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword)
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async validateUser(decoded) {
    return this.userService.localGetUserById(decoded._id);
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  public async verify(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (err) { }
  }
}