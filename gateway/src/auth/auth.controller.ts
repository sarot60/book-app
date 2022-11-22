import { Body, Controller, HttpCode, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiNotFoundResponse } from '@nestjs/swagger';

import { Role } from './roles.enum';
import { Roles } from './roles.decorator';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { RolesGuard } from './guards/auth-roles.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ChangePasswordResponseDto } from './dto/change-password-response.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { BanRequestDto } from './dto/ban-request.dto';
import { BanResponseDto } from './dto/ban-response.dto';
import { CancelBanRequestDto } from './dto/cancel-ban-request.dto';
import { CancelBanResponseDto } from './dto/cancel-ban-response.dto';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponseDto })
  private async register(@Body() request: RegisterRequestDto): Promise<RegisterResponseDto> {

    const registerResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'register' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return registerResponse;
  }

  @HttpCode(200)
  @Post('login')
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiNotFoundResponse()
  private async login(@Body() body: LoginRequestDto, @Req() req: Request): Promise<LoginResponseDto> {
    const request: LoginRequestDto = { username: body.username, password: body.password, clientIp: req.ip };

    const loginResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'login' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return loginResponse;
  }

  @Put('change-password')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthJwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChangePasswordResponseDto })
  private async changePassword(@Body() request: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto> {
    
    const changePasswordResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'change-password' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return changePasswordResponse;
  }

  @Put('ban/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthJwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BanResponseDto })
  private async banTheUser(@Param('id') id: string): Promise<BanResponseDto> {
    const request: BanRequestDto = { userId: id };

    const bannedResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'ban' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return bannedResponse;
  }

  @Put('cancel-ban/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthJwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CancelBanResponseDto })
  private async cancelBanTheUser(@Param('id') id: string): Promise<CancelBanResponseDto> {
    const request: CancelBanRequestDto = { userId: id };

    const cancelBanResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'cancel-ban' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return cancelBanResponse;
  }
}