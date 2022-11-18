import { Body, Controller, Delete, Get, HttpStatus, Inject, NotAcceptableException, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { catchError, firstValueFrom, NotFoundError } from 'rxjs';
import { MapExceptionFromRpc } from 'src/common/map-exception-from-rpc-to-http';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { PurchaseBookResponseDto } from './dto/purchase-book-response.dto';
import { PurchaseBookRequestDto } from './dto/purchase-book-request.dto';
import { GetAllBookResponseDto } from './dto/get-all-book-response.dto';
import { GetAllBookRequestDto } from './dto/get-all-book-request.dto';
import { GetBookByIdRequestDto } from './dto/get-book-by-id-request.dto';
import { Types } from 'mongoose';
import { GetBookByIdResponseDto } from './dto/get-book-by-id-response.dto';
import { DeleteBookResponseDto } from './dto/delete-book-response.dto';
import { DeleteBookRequestDto } from './dto/delete-book-request.dto';
import { UpdateBookResponseDto } from './dto/update-book.response.dto';
import { UpdateBookRequestDto } from './dto/update-book-request.dto';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(@Inject('BOOK_SERVICE') private readonly bookServiceClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateBookResponseDto })
  private async createBook(@Body() request: CreateBookRequestDto): Promise<CreateBookResponseDto> {
    const createBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'create' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return createBookResponse;
  }

  @Put(':id')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateBookResponseDto })
  private async updateBook(@Param('id') _id: Types.ObjectId, @Body() body: UpdateBookRequestDto): Promise<UpdateBookResponseDto> {
    const request = { _id, ...body };
    const updateBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'update' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return updateBookResponse;
  }

  @Get()
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetAllBookResponseDto })
  private async getAllBook(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('searchBy') searchBy?: string,
    @Query('sort') sort?: string,
    @Query('sortBy') sortBy?: string,
  ): Promise<GetAllBookResponseDto> {
    const request: GetAllBookRequestDto = { page, limit, search, searchBy, sort, sortBy };
    const getAllBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'get-all' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return getAllBookResponse;
  }

  @Get(':id')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetBookByIdResponseDto })
  private async getBookById(@Param('id') _id: Types.ObjectId): Promise<GetBookByIdResponseDto> {
    const request: GetBookByIdRequestDto = { _id };
    const getBookByIdResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'get-by-id' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return getBookByIdResponse;
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteBookResponseDto })
  private async deleteBook(@Param('id') _id: Types.ObjectId): Promise<DeleteBookResponseDto> {
    const request: DeleteBookRequestDto = { _id };
    const deleteBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'delete' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return deleteBookResponse;
  }

  @Post('purchase-book')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PurchaseBookResponseDto })
  private async purchaseBook(@Body() request: PurchaseBookRequestDto): Promise<PurchaseBookResponseDto> {
    const purchaseBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'purchase-book' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return purchaseBookResponse;
  }

  private async reportTopSellBook() {

  }

  private async reportSellBookEachCategory() {

  }
}
