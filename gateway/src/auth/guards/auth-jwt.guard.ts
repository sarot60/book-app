import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ValidateTokenResponseDto } from '../dto/validate-token-response.dto';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const dataToken: ValidateTokenResponseDto = await this.authService.validateToken(token);
    const data = dataToken.data;

    if (!data) {
      throw new UnauthorizedException();
      // throw new UnauthorizedException(dataToken.message);
    }

    const { _id, username, banned, roles } = data;
    const status = dataToken.status

    req.user = { _id, username, banned, roles };

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}