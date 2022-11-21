import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { catchError, firstValueFrom, of } from 'rxjs';
import { CreateBookResponseDto } from 'src/book/dto/create-book-response.dto';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';
import { GetAllUserRequestDto } from './dto/get-all-user-request.dto';
import { GetAllUserResponseDto } from './dto/get-all-user-response.dto';
import { GetUserByIdRequestDto } from './dto/get-user-by-id-request.dto';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: CreateBookResponseDto })
  private async createUser(@Body() request: CreateUserRequestDto): Promise<CreateBookResponseDto> {
    const createUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'create' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );

    return createUserResponse;
  }

  @Get()
  @UseGuards(AuthJwtGuard)
  @ApiQuery({ name: 'search', required: false })
  @ApiOkResponse({ type: GetAllUserRequestDto })
  private async getAllUser(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ): Promise<GetAllUserResponseDto> {
    const request: GetAllUserRequestDto = { page, limit, search };

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

  @Get('purchased/total-book')
  @UseGuards(AuthJwtGuard)
  private async getTotalBookPurchasedByTheUser() {
    const request = '';
    const totalPurchasedBookResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-total-book-purchased-by-the-user' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return totalPurchasedBookResponse;
  }

  @Get('purchased/last-book')
  @UseGuards(AuthJwtGuard)
  private async getLastPurchasedBook() {
    const request = '';
    const lastPurchasedBookResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-last-purchased-book' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return lastPurchasedBookResponse;
  }

  @Get('report/new-user')
  @UseGuards(AuthJwtGuard)
  private async getReportNewUser() {
    const request = '';
    const reportNewUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'report-registered' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportNewUserResponse;
  }

  @Get('report/user-login-count')
  @UseGuards(AuthJwtGuard)
  private async getReportUserLoginCount() {
    const request = '';
    const reportLoginCountResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'report-login-count' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportLoginCountResponse;
  }
}