import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { catchError, firstValueFrom } from 'rxjs';

import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';
import { GetAllUserRequestDto } from './dto/get-all-user-request.dto';
import { GetAllUserResponseDto } from './dto/get-all-user-response.dto';
import { GetLastPurchasedBookResponse } from './dto/get-last-purchase-book-response.dto';
import { GetUserLoginCountResponse } from './dto/get-login-count-response.dto';
import { GetTotalBookPurchasedEachUserResponseDto } from './dto/get-total-book-purchase-each-user-response.dto';
import { GetUserByIdRequestDto } from './dto/get-user-by-id-request.dto';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { ReportNewUserResponse } from './dto/report-new-user.-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  private async createUser(@Body() request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const createUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'create' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return createUserResponse;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiQuery({ name: 'search', required: false })
  @ApiOkResponse({ type: GetAllUserResponseDto })
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
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: UpdateUserResponseDto })
  private async updateUser(@Param('id') _id: string, @Body() body: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
    const request = { _id, ...body };
    const updateUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'update' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return updateUserResponse;
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: GetUserByIdResponseDto })
  private async getUserById(@Param('id') userId: string): Promise<GetUserByIdResponseDto> {
    const request: GetUserByIdRequestDto = { userId }
    const userResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-by-id' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return userResponse;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: DeleteUserResponseDto })
  private async deleteUser(@Param('id') userId: string): Promise<DeleteUserResponseDto> {
    const request: DeleteUserRequestDto = { userId };
    const deleteUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'delete' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return deleteUserResponse;
  }

  @Get('purchased/total-book')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: GetTotalBookPurchasedEachUserResponseDto })
  private async getTotalBookPurchasedByTheUser(): Promise<GetTotalBookPurchasedEachUserResponseDto> {
    const request = '';
    const totalPurchasedBookResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-total-book-purchased-by-the-user' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return totalPurchasedBookResponse;
  }

  @Get('purchased/last-book')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: GetLastPurchasedBookResponse })
  private async getLastPurchasedBook(): Promise<GetLastPurchasedBookResponse> {
    const request = '';
    const lastPurchasedBookResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-last-purchased-book' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return lastPurchasedBookResponse;
  }

  @Get('report/new-user')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: ReportNewUserResponse })
  @ApiQuery({ name: 'fullDate', required: false })
  @ApiQuery({ name: 'day', required: false })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  private async getReportNewUser(
    @Query('fullDate',) fullDate?: string,
    @Query('day', new DefaultValuePipe(0), ParseIntPipe) day?: number,
    @Query('month', new DefaultValuePipe(0), ParseIntPipe) month?: number,
    @Query('year', new DefaultValuePipe(0), ParseIntPipe) year?: number,
  ): Promise<ReportNewUserResponse> {
    const request = { fullDate, day, month, year };
    const reportNewUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'report-registered' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportNewUserResponse;
  }

  @Get('report/user-login-count')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @ApiOkResponse({ type: GetUserLoginCountResponse })
  @ApiQuery({ name: 'fullDate', required: false })
  @ApiQuery({ name: 'day', required: false })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  private async getReportUserLoginCount(
    @Query('fullDate',) fullDate?: string,
    @Query('day', new DefaultValuePipe(0), ParseIntPipe) day?: number,
    @Query('month', new DefaultValuePipe(0), ParseIntPipe) month?: number,
    @Query('year', new DefaultValuePipe(0), ParseIntPipe) year?: number,
  ): Promise<GetUserLoginCountResponse> {
    const request = { fullDate, day, month, year };
    const reportLoginCountResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'report-login-count' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportLoginCountResponse;
  }
}