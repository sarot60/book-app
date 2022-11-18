import { Body, Controller, ForbiddenException, Get, HttpCode, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ICreateBookResponse,
  IDeleteBookResponse,
  IGetAllBookResponse,
  IGetBookByIdResponse,
  IPurchaseBookResponse,
  IUpdateBookResponse,
} from './book.interface';
import { BookService } from './book.service';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { DeleteBookRequestDto } from './dto/delete-book-request.dto';
import { GetAllBookRequestDto } from './dto/get-all-book-request.dto';
import { GetBookByIdRequestDto } from './dto/get-book-by-id.request.dto';
import { PurchaseBookRequestDto } from './dto/purchase-book-request.dto';
import { UpdateBookRequestDto } from './dto/update-book-request.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @MessagePattern({ service: 'book', cmd: 'create' })
  private createBook(@Payload() payload: CreateBookRequestDto): Promise<ICreateBookResponse> {
    return this.bookService.createBook(payload);
  }

  @MessagePattern({ service: 'book', cmd: 'get-all' })
  private getAllBook(@Payload() payload: GetAllBookRequestDto): Promise<IGetAllBookResponse> {
    return this.bookService.getAllBook(payload);
  }

  @MessagePattern({ service: 'book', cmd: 'get-by-id' })
  private getBookById(@Payload() payload: GetBookByIdRequestDto): Promise<IGetBookByIdResponse> {
    return this.bookService.getBookById(payload);
  }

  @MessagePattern({ service: 'book', cmd: 'update' })
  private updateBook(@Payload() payload: UpdateBookRequestDto): Promise<IUpdateBookResponse> {
    return this.bookService.updateBook(payload);
  }

  @MessagePattern({ service: 'book', cmd: 'delete' })
  private deleteBook(@Payload() payload: DeleteBookRequestDto): Promise<IDeleteBookResponse> {
    return this.bookService.deleteBook(payload);
  }

  @MessagePattern({ service: 'book', cmd: 'purchase-book' })
  private purchaseBook(@Payload() payload: PurchaseBookRequestDto): Promise<IPurchaseBookResponse> {
    return this.bookService.purchaseBook(payload);
  }
}
