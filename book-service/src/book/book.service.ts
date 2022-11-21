import {
  Inject,
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import {
  IUpdateBookResponse,
  ICreateBookResponse,
  IDeleteBookResponse,
  IGetAllBookResponse,
  IGetBookByIdResponse,
  IPurchaseBookResponse,
  IReportTopSellBookResponse,
  IReportSellBookEachCategoryResponse,
} from './book.interface';

import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { DeleteBookRequestDto } from './dto/delete-book-request.dto';
import { GetAllBookRequestDto } from './dto/get-all-book-request.dto';
import { GetBookByIdRequestDto } from './dto/get-book-by-id.request.dto';
import { PurchaseBookRequestDto } from './dto/purchase-book-request.dto';
import { ReportSellBookEachCategoryRequestDto } from './dto/report-sell-book-each-category-response.dto';
import { ReportTopSellBookRequestDto } from './dto/report-top-sell-book-request.dto';
import { UpdateBookRequestDto } from './dto/update-book-request.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { PurchaseBook, PurchaseBookDocument } from './schemas/purchase-book.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
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

    const quantity = payload.quantity;

    const book = await this.bookModel.findById(payload.bookId).exec();
    if (!book) {
      throw new NotFoundException('Invalid Book');
    }

    const bookStock = book.stock;
    const bookPrice = book.price;
    const bookSold = book.sold;

    if (quantity > bookStock) {
      throw new ForbiddenException('Error!, Quantity more than book stock');
    }

    payload.price = quantity * bookPrice;

    const newBookStock = bookStock - quantity;
    const newBookSold = bookSold + quantity;

    const updatedBook = await this.bookModel.findByIdAndUpdate(payload.bookId, { sold: newBookSold, stock: newBookStock }, { new: true });
    if (!updatedBook) {
      throw new ConflictException('Error update stock in book');
    }

    const newOrder = new this.purchaseBookModel(payload);
    await newOrder.save();
    if (!newOrder) {
      throw new ConflictException('Create error');
    }
    return {
      data: { _id: newOrder._id },
      status: HttpStatus.OK,
      error: null,
      message: "Purchase book successful"
    }
  }

  public async reportTopSellBook(payload: ReportTopSellBookRequestDto): Promise<IReportTopSellBookResponse> {
    const { fullDate, day, month, year }: ReportTopSellBookRequestDto = payload;

    const filters: Record<string, any> = {};

    if (fullDate) {
      filters.createdAt = {
        $gt: new Date(fullDate).setDate(new Date(fullDate).getDate()),
        $lt: new Date(fullDate).setDate(new Date(fullDate).getDate() + 1)
      };
    } else if (day || month || year) {
      const dayFilter = { $eq: [{ $dayOfMonth: "$createdAt" }, day] };
      const monthFilter = { $eq: [{ $month: "$createdAt" }, month] };
      const yearFilter = { $eq: [{ $year: "$createdAt" }, year] };

      filters.$expr = { $and: [] };

      if (day) filters.$expr.$and.push(dayFilter);
      if (month) filters.$expr.$and.push(monthFilter);
      if (year) filters.$expr.$and.push(yearFilter);
    }

    const topSellBook = await this.bookModel
      .find(filters, { price: 0, stock: 0, imageFileName: 0 })
      .sort({ sold: -1 })

    return {
      data: topSellBook,
      message: 'Get report top sell successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async reportSellBookEachCategory(payload: ReportSellBookEachCategoryRequestDto): Promise<IReportSellBookEachCategoryResponse> {
    const { fullDate, day, month, year }: ReportTopSellBookRequestDto = payload;

    const filters: Record<string, any> = {};

    if (fullDate) {
      filters.createdAt = {
        $gt: new Date(fullDate).setDate(new Date(fullDate).getDate()),
        $lt: new Date(fullDate).setDate(new Date(fullDate).getDate() + 1)
      };
    } else if (day || month || year) {
      const dayFilter = { $eq: [{ $dayOfMonth: "$createdAt" }, day] };
      const monthFilter = { $eq: [{ $month: "$createdAt" }, month] };
      const yearFilter = { $eq: [{ $year: "$createdAt" }, year] };

      filters.$expr = { $and: [] };

      if (day) filters.$expr.$and.push(dayFilter);
      if (month) filters.$expr.$and.push(monthFilter);
      if (year) filters.$expr.$and.push(yearFilter);
    }

    const sellBookEachCategory = await this.bookModel.find(filters, { price: 0, stock: 0, imageFileName: 0 });

    return {
      data: sellBookEachCategory,
      message: 'Get report sell book each category successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async getTopUserPurchasedBook() {
    const results = [];

    const users = await firstValueFrom(this.userServiceClient.send({ service: 'user', cmd: 'get-all-top-user' }, ''));

    const totalPurchaseBookEachUser = await this.purchaseBookModel.aggregate([
      { $group: { _id: "$userId", totalQuantity: { $sum: "$quantity" }, totalPrice: { $sum: "$price" } } },
      { $project: { _id: 0, userId: "$_id", totalQuantity: 1, totalPrice: 1 }, }
    ]);

    const categories = await this.categoryModel.find({}, { name: 1 });
    let categoriesName = [];
    categories.forEach(c => {
      categoriesName.push({ categoryName: c.name, totalQuantity: 0, totalPrice: 0 });
    });

    const allPurchasedBook = await this.purchaseBookModel.find({}, { userId: 1, quantity: 1, price: 1, bookId: 1, categories: 1 });

    users.forEach((u: any) => {
      let purchase = totalPurchaseBookEachUser.find((pur: any) => pur.userId.toString() === u._id.toString());
      if (purchase) {
        results.push({
          userDetail: u,
          totalQuantity: purchase.totalQuantity,
          totalPrice: purchase.totalPrice,
          eachCategory: JSON.parse(JSON.stringify(categoriesName))
        })
      }
    });

    allPurchasedBook.forEach((a) => {
      let index = results.findIndex(r => r.userDetail._id.toString() === a.userId.toString());

      if (index !== -1) {
        results[index].eachCategory.map((eachCate) => {
          let cate: string = a.categories.find(aCate => aCate === eachCate.categoryName)
          if (cate) {
            let newPrice: number = (eachCate.totalPrice + a.price)
            eachCate.totalQuantity += a.quantity;
            eachCate.totalPrice = Math.round(newPrice * 100) / 100;
          }
          return eachCate;
        })
      }
    })

    return results;
  }

  // send to user service
  public async getTotalBookPurchaseToUserService() {
    return await this.purchaseBookModel.aggregate([
      { $group: { _id: "$userId", totalQuantity: { $sum: "$quantity" } } },
      { $project: { _id: 0, userId: "$_id", totalQuantity: 1 }, }
    ])
  }

  // send to user service
  public async getLastPurchasedBookToUserService() {
    return await this.purchaseBookModel.aggregate([
      { $group: { _id: "$userId", lastPurchase: { $last: "$createdAt" } } },
      { $sort: { "lastPurchase": -1 } },
      { $project: { _id: 0, userId: "$_id", lastPurchase: 1 }, }
    ]);
  }
}
