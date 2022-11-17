import { Body, Controller, HttpCode, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { catchError, firstValueFrom, of } from 'rxjs';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { Request } from 'express';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { LoginDto, ChangePasswordDto, RegisterDto } from './auth.dto';
import { Role } from './roles.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/auth-roles.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post('register')
  private async register(@Body() body: RegisterDto) {
    const newUser = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'register' }, body)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return newUser;
  }

  @HttpCode(200)
  @Post('login')
  private async login(@Body() body: LoginDto, @Req() req: Request) {
    const request = {
      username: body.username,
      password: body.password,
      ip: req.ip
    };

    const accessToken = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'login' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return accessToken;
  }

  @Put('change-password')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthJwtGuard, RolesGuard)
  private async changePassword(@Body() body: ChangePasswordDto) {
    const msg = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'change-password' }, body)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return msg;
  }

  @Put('ban/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthJwtGuard, RolesGuard)
  private async banTheUser(@Param('id') id: string) {
    const bannedMsg = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'ban' }, id)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return bannedMsg;
  }

  @Put('cancel-ban/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthJwtGuard, RolesGuard)
  private async cancelBanTheUser(@Param('id') id: string) {
    const cancelBanMsg = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'cancel-ban' }, id)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return cancelBanMsg;
  }
}