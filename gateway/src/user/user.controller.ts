import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
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
  private async updateUser(@Param('id') id: string, @Body() body) {
    const request = { id, body };
    const updateUserResponse = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'update' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return updateUserResponse;
  }

  @Get(':id')
  @UseGuards(AuthJwtGuard)
  private async getUserById(@Param('id') id: string) {
    const user = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'get-by-id' }, id)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return user;
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  private async deleteUser(@Param('id') id: string): Promise<any> {
    const delUserMsg = await firstValueFrom(this.userServiceClient
      .send({ service: 'user', cmd: 'delete' }, id)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return delUserMsg;
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