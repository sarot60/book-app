import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { catchError, firstValueFrom } from 'rxjs';

import { MapExceptionFromRpc } from '../common/map-exception-from-rpc-to-http';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { PurchaseBookResponseDto } from './dto/purchase-book-response.dto';
import { PurchaseBookRequestDto } from './dto/purchase-book-request.dto';
import { GetAllBookResponseDto } from './dto/get-all-book-response.dto';
import { GetAllBookRequestDto } from './dto/get-all-book-request.dto';
import { GetBookByIdRequestDto } from './dto/get-book-by-id-request.dto';
import { GetBookByIdResponseDto } from './dto/get-book-by-id-response.dto';
import { DeleteBookResponseDto } from './dto/delete-book-response.dto';
import { DeleteBookRequestDto } from './dto/delete-book-request.dto';
import { UpdateBookResponseDto } from './dto/update-book.response.dto';
import { UpdateBookRequestDto } from './dto/update-book-request.dto';
import { ReportTopSellBookRequestDto } from './dto/report-top-sell-book-request.dto';
import { ReportTopSellBookResponseDto } from './dto/report-top-sell-book-response.dto';
import { ReportSellBookEachCategoryResponseDto } from './dto/report-sell-book-each-category-response.dto';
import { GetTopUserPurchaseBookResponse } from './dto/get-top-user-purchase-book-response.dto';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { AuthBannedGuard } from '../auth/guards/auth-banned.guard';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(@Inject('BOOK_SERVICE') private readonly bookServiceClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateBookResponseDto })
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
  private async updateBook(@Param('id') _id: string, @Body() body: UpdateBookRequestDto): Promise<UpdateBookResponseDto> {
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
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'searchBy', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
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
  private async getBookById(@Param('id') _id: string): Promise<GetBookByIdResponseDto> {
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
  private async deleteBook(@Param('id') _id: string): Promise<DeleteBookResponseDto> {
    const request: DeleteBookRequestDto = { _id };
    const deleteBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'delete' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return deleteBookResponse;
  }

  @Post('purchase-book')
  @UseGuards(AuthJwtGuard, AuthBannedGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PurchaseBookResponseDto })
  private async purchaseBook(@Body() request: PurchaseBookRequestDto): Promise<PurchaseBookResponseDto> {
    const purchaseBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'purchase-book' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return purchaseBookResponse;
  }

  @Get('purchased/top-user')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetTopUserPurchaseBookResponse })
  private async getTopUserPurchasedBook(): Promise<GetTopUserPurchaseBookResponse> {
    const request = '';
    const topUserPurchasedBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'get-top-user-purchased' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return topUserPurchasedBookResponse;
  }

  @Get('report/top-sell-book')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReportTopSellBookResponseDto })
  @ApiQuery({ name: 'fullDate', required: false })
  @ApiQuery({ name: 'day', required: false })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  private async reportTopSellBook(
    @Query('fullDate',) fullDate?: string,
    @Query('day', new DefaultValuePipe(0), ParseIntPipe) day?: number,
    @Query('month', new DefaultValuePipe(0), ParseIntPipe) month?: number,
    @Query('year', new DefaultValuePipe(0), ParseIntPipe) year?: number,
  ): Promise<ReportTopSellBookResponseDto> {
    const request: ReportTopSellBookRequestDto = { fullDate, day, month, year };
    const reportTopSellBookResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'report-top-sell' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportTopSellBookResponse;
  }

  @Get('report/sell-book-each-category')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReportSellBookEachCategoryResponseDto })
  private async reportSellBookEachCategory(
  ): Promise<ReportSellBookEachCategoryResponseDto> {
    const request = '';
    const reportSellBookEachCategoryResponse = await firstValueFrom(this.bookServiceClient
      .send({ service: 'book', cmd: 'report-sell-book-each-category' }, request)
      .pipe(catchError(error => new MapExceptionFromRpc().mapException(error)))
    );
    return reportSellBookEachCategoryResponse;
  }
}
