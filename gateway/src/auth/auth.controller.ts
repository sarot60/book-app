import { Body, Controller, HttpCode, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { catchError, firstValueFrom, of } from 'rxjs';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { Request } from 'express';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { Role } from './roles.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/auth-roles.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ChangePasswordResponseDto } from './dto/change-password-response.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post('register')
  @ApiOkResponse({ type: RegisterResponseDto })
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