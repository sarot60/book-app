import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { catchError, firstValueFrom, of } from 'rxjs';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { Request } from 'express';
import { AuthJwtGuard } from './auth-jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post('register')
  private async register(@Body() body) {
    const newUser = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'register' }, body)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return newUser;
  }

  @HttpCode(200)
  @Post('login')
  private async login(@Body() body, @Req() req: Request) {
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
  @UseGuards(AuthJwtGuard)
  private async changePassword(@Body() body) {
    const request = body;
    const msg = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'change-password' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return msg;
  }
}