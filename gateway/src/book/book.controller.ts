import { Body, Controller, Get, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { ICreateBookResponse } from './interfaces/create-book-response.interface';
import { firstValueFrom } from 'rxjs';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(@Inject('BOOK_SERVICE') private readonly bookServiceClient: ClientProxy) { }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateBookResponseDto })
  private async createBook(@Body() request: CreateBookRequestDto): Promise<CreateBookResponseDto> {
    const createBookResponse: ICreateBookResponse = await firstValueFrom(this.bookServiceClient.send('create-book', request));
    return createBookResponse;
  }
}
