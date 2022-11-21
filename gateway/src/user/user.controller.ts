import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';
import { GetAllResponseDto } from './dto/get-all-response.dto';
import { GetUserByIdRequestDto } from './dto/get-user-by-id-request.dto';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { CreateUserRequestDto, GetAllRequestDto } from './user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthJwtGuard)
  private async createUser(@Body() request: CreateUserRequestDto) {
    const createUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'create' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return createUserResponse;
  }

  @Get()
  @UseGuards(AuthJwtGuard)
  @ApiQuery({ name: 'search', required: false })
  @ApiOkResponse({ type: GetAllResponseDto })
  private async getAllUser(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ): Promise<GetAllRequestDto> {
    const request: GetAllRequestDto = { page, limit, search };

    const getAllResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-all' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return getAllResponse;
  }

  @Put(':id')
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: UpdateUserResponseDto })
  private async updateUser(@Param('id') _id: Types.ObjectId, @Body() body: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
    const request = { _id, ...body };

    const updateUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'update' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return updateUserResponse;
  }

  @Get(':id')
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: GetUserByIdResponseDto })
  private async getUserById(@Param('id') userId: Types.ObjectId): Promise<GetUserByIdResponseDto> {
    const request: GetUserByIdRequestDto = { userId }
    const user = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-by-id' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return user;
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: DeleteUserResponseDto })
  private async deleteUser(@Param('id') userId: Types.ObjectId): Promise<DeleteUserResponseDto> {
    const request: DeleteUserRequestDto = { userId };

    const deleteUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'delete' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return deleteUserResponse;
  }

  @Get('report/new-user')
  @UseGuards(AuthJwtGuard)
  private async getReportNewUser() {

  }

  @Get('report/user-login-count')
  @UseGuards(AuthJwtGuard)
  private async getReportUserLoginCount() {

  }
}