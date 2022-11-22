import { ConflictException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';

import {
  ICreateLogedinLogRequest,
  ICreateRegisteredLogRequest,
  ICreateUserResponse,
  IDeleteUserResponse,
  IGetAllResponse,
  IGetLastPurchasedBookResponse,
  IGetTotalBookPurchasedEachUserResponse,
  IGetUserByIdResponse,
  INewUserResponse,
  IUpdateUserResponse,
  IUserLoginCountResponse
} from './user.interface';
import { User, UserDocument } from './schemas/user.schema';
import { RegisteredLog, RegisteredLogDocument } from './schemas/registered-log.schema';
import { LogedinLog, LogedinLogDocument } from './schemas/logedin-log.schema';
import { GetAllRequestDto } from './dto/get-all-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdRequestDto } from './dto/get-user-by-id-request.dto';
import { DeleteUserRequestDto } from './dto/delete-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { CreateUserRequestDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RegisteredLog.name) private registeredLogModel: Model<RegisteredLogDocument>,
    @InjectModel(LogedinLog.name) private logedinLogModel: Model<LogedinLogDocument>,
    @Inject('BOOK_SERVICE') private bookServiceClient: ClientProxy,
  ) { }

  public async createUser(payload: CreateUserRequestDto): Promise<ICreateUserResponse> {
    const newUser = new this.userModel(payload);
    await newUser.save();

    if (!newUser) {
      throw new ConflictException('Create user error.');
    }

    return {
      data: newUser,
      message: 'Create user successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async updateUser(payload: UpdateUserRequestDto): Promise<IUpdateUserResponse> {
    const _id = payload._id;

    const findUser = await this.userModel.findById(_id, { _id: 1 });
    if (!findUser) throw new NotFoundException('Invalid user');

    const checkUserExists = await this.userModel.findOne({ username: payload.username, _id: { $ne: _id } }, { _id: 1 });
    if (checkUserExists) throw new NotFoundException('username is already taken');

    const updatedUser = await this.userModel.findByIdAndUpdate(_id, payload, { new: true });

    return {
      data: updatedUser,
      message: 'Update user Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async localUpdateUser(_id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true });
    if (!updatedUser) throw new NotFoundException('Invalid user');
    return updatedUser;
  }

  public async getAllUser(payload: GetAllRequestDto): Promise<IGetAllResponse> {
    let { page, limit, search } = payload;

    page = +page || 1;
    limit = +limit;

    const filters: Record<string, any> = {}

    if (search) {
      filters.$or = [
        { username: new RegExp(`^${search}`, 'i') },
        { firstName: new RegExp(`^${search}`, 'i') },
        { lastName: new RegExp(`^${search}`, 'i') },
      ];
    }

    const users = await this.userModel
      .find(filters, { _id: 1, username: 1, firstName: 1, lastName: 1 })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.userModel.count(filters);

    return {
      data: {
        users,
        total,
      },
      message: 'Get books Successful',
      status: HttpStatus.OK,
      error: null,
    };
  }

  public async getUserById(payload: GetUserByIdRequestDto): Promise<IGetUserByIdResponse> {
    const { userId } = payload;
    const user = await this.userModel.findById(userId, { password: 0 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return {
      data: user,
      message: 'Get user Successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async localGetUserById(userId: Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findById(userId, { password: 0 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserPasswordById(id: Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findById(id, { password: 1 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  public async updatePassword(userId: Types.ObjectId, hashedPassword: string) {
    const updatedUser = await this.userModel.updateOne({ _id: userId }, { password: hashedPassword }).exec();
    if (updatedUser.matchedCount === 0) throw new NotFoundException('Invalid user');
    return updatedUser;
  }

  public async deleteUser(payload: DeleteUserRequestDto): Promise<IDeleteUserResponse> {
    const { userId } = payload;

    const deletedUser = await this.userModel.findByIdAndRemove(userId);
    if (!deletedUser) throw new NotFoundException('Invalid user');

    return {
      data: {
        userId: deletedUser._id,
      },
      status: HttpStatus.OK,
      error: null,
      message: 'Delete user successful'
    }
  }

  public async createRegistedLog(data: ICreateRegisteredLogRequest): Promise<void> {
    await new this.registeredLogModel(data).save();
  }

  public async createLogedinLog(data: ICreateLogedinLogRequest): Promise<void> {
    await new this.logedinLogModel(data).save();
  }

  public async getTotalBookPurchasedByTheUser(): Promise<IGetTotalBookPurchasedEachUserResponse> {
    const users = await this.userModel.find({}, { _id: 1, username: 1, firstName: 1, lastName: 1 })

    const purchasedTotalPerUser = await firstValueFrom(this.bookServiceClient.send({ service: 'book', cmd: 'get-total-book-purchase' }, ''));

    const totalPurchase: any[] = [];
    users.forEach(u => {
      let purchase = purchasedTotalPerUser.find((pur: any) => pur.userId === u._id.toString());
      if (purchase) {
        totalPurchase.push({
          _id: u._id,
          purchasedQuantity: purchase.totalQuantity,
          username: u.username,
          firstName: u.firstName,
          lastName: u.lastName,
        });
      }
    })

    return {
      data: {
        topPurchased: totalPurchase.sort((a, b) => b.purchasedQuantity - a.purchasedQuantity)
      },
      message: 'Get total purchase successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async getLastPurchasedBook(): Promise<IGetLastPurchasedBookResponse> {
    const users = await this.userModel.find({}, { _id: 1, username: 1, firstName: 1, lastName: 1 })

    const lastPurchasedBook = await firstValueFrom(this.bookServiceClient.send({ service: 'book', cmd: 'get-last-purchase-book' }, ''));

    const lastPurchase: any[] = [];
    users.forEach(u => {
      let purchase = lastPurchasedBook.find((pur: any) => pur.userId === u._id.toString());
      if (purchase) {
        lastPurchase.push({
          _id: u._id,
          lastPurchase: purchase.lastPurchase,
          username: u.username,
          firstName: u.firstName,
          lastName: u.lastName,
        });
      }
    })

    return {
      data: {
        lastPurchased: lastPurchase,
      },
      message: 'Get last purchase successful',
      status: HttpStatus.OK,
      error: null,
    };
  }

  public async reportUserLoginCount(payload: any): Promise<IUserLoginCountResponse> {
    const { fullDate, day, month, year }: any = payload;

    const filters = this.generateDateFilter(fullDate, day, month, year);

    const loginCount = await this.logedinLogModel.count(filters);
    return {
      data: {
        count: loginCount,
      },
      message: 'Get user login count successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  public async reportUserRegistered(payload: any): Promise<INewUserResponse> {
    const { fullDate, day, month, year }: any = payload;

    const filters = this.generateDateFilter(fullDate, day, month, year);

    const newUsers = await this.registeredLogModel.find(filters).sort({ createdAt: -1 });
    const total = await this.registeredLogModel.count();
    return {
      data: {
        logs: newUsers,
        total
      },
      message: 'Get new user successful',
      status: HttpStatus.OK,
      error: null,
    }
  }

  private generateDateFilter(fullDate: string, day: number, month: number, year: number) {
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

    return filters;
  }

  // send to book service
  public async getAllTopUser(): Promise<any> {
    return await this.userModel.find({}, { password: 0, roles: 0, banned: 0, createdAt: 0, updatedAt: 0 })
  }
}