import { ConflictException, ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateBookResponse, IDeleteBookResponse, IGetAllBookResponse, IGetBookByIdResponse, IPurchaseBookResponse, IUpdateBookResponse } from './book.interface';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { DeleteBookRequestDto } from './dto/delete-book-request.dto';
import { GetAllBookRequestDto } from './dto/get-all-book-request.dto';
import { GetBookByIdRequestDto } from './dto/get-book-by-id.request.dto';
import { PurchaseBookRequestDto } from './dto/purchase-book-request.dto';
import { UpdateBookRequestDto } from './dto/update-book-request.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { PurchaseBook, PurchaseBookDocument } from './schemas/purchase-book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(PurchaseBook.name) private readonly purchaseBookModel: Model<PurchaseBookDocument>,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) { }

  public async createBook(payload: CreateBookRequestDto): Promise<ICreateBookResponse> {
    const newBook = new this.bookModel(payload);
    await newBook.save();
    if (!newBook) {
      throw new ConflictException('Create error.');
    }
    const responseData: ICreateBookResponse = {
      data: { _id: newBook._id, name: newBook.name },
      status: HttpStatus.OK,
      error: null,
      message: "Create book successful."
    };
    return responseData;
  }

  public async getAllBook(payload: GetAllBookRequestDto): Promise<IGetAllBookResponse> {
    let { page, limit, search, searchBy, sort, sortBy } = payload;

    page = +page || 1;
    limit = +limit || 10;

    const filters: Record<string, any> = {};
    const sortFilters: Record<string, any> = {};

    if (search) {
      if (searchBy) {
        filters[searchBy] = new RegExp(`^${search}`, 'i');
      } else {
        filters.name = new RegExp(`^${search}`, 'i');
      }
    }

    if (sort) {
      if (sortBy) {
        sortFilters[sortBy] = sort || -1;
      } else {
        sortFilters._id = sort || -1;
      }
    } else {
      sortFilters._id = -1;
    }

    const books = await this.bookModel
      .find(filters)
      .sort(sortFilters)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.bookModel.count(filters);

    return {
      data: {
        books,
        total,
      },
      message: 'Get books Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async getBookById(payload: GetBookByIdRequestDto): Promise<IGetBookByIdResponse> {
    const book = await this.bookModel.findById(payload._id).exec();
    if (!book) throw new NotFoundException('Invalid Book');
    return {
      data: book,
      message: 'Get book Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async updateBook(payload: UpdateBookRequestDto): Promise<IUpdateBookResponse> {
    const _id = payload._id;
    const updatedBook = await this.bookModel.findByIdAndUpdate(_id, payload, { new: true });
    if (!updatedBook) throw new NotFoundException('Invalid Book');
    return {
      data: { _id: updatedBook._id },
      message: 'Update book Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async deleteBook(payload: DeleteBookRequestDto): Promise<IDeleteBookResponse> {
    const deleteBook = await this.bookModel.findByIdAndRemove(payload._id);
    if (!deleteBook) throw new NotFoundException('Invalid Book');
    return {
      data: { _id: deleteBook._id },
      message: 'Get book Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async purchaseBook(payload: PurchaseBookRequestDto): Promise<IPurchaseBookResponse> {
    const newOrder = new this.purchaseBookModel(payload);
    await newOrder.save();
    if (!newOrder) {
      throw new ConflictException('Create error.');
    }
    return {
      data: { _id: newOrder._id },
      status: HttpStatus.OK,
      error: null,
      message: "Purchase book successful."
    }
  }
}
