import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { ICreateLogedinLogRequest, ICreateRegisteredLogRequest, IGetAllResponse } from './user.interface';
import { RegisteredLog, RegisteredLogDocument } from './schemas/registered-log.schema';
import { LogedinLog, LogedinLogDocument } from './schemas/logedin-log.schema';
import { GetAllRequestDto } from './dto/get-all-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RegisteredLog.name) private registeredLogModel: Model<RegisteredLogDocument>,
    @InjectModel(LogedinLog.name) private logedinLogModel: Model<LogedinLogDocument>,
    @Inject('BOOK_SERVICE') private bookServiceClient: ClientProxy,
  ) { }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  public async updateUser(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
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

  public async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserPasswordById(id: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id, { password: 1 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async updatePassword(userId: Types.ObjectId, hashedPassword: string) {
    const updatedUser = await this.userModel.updateOne({ _id: userId }, { password: hashedPassword }).exec();
    if (updatedUser.matchedCount === 0) throw new NotFoundException('Invalid user');
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    if (!deletedUser) throw new NotFoundException('Invalid user');
    return {
      status: HttpStatus.OK,
      error: null,
      message: ['Deleted successful.']
    }
  }

  public async createRegistedLog(data: ICreateRegisteredLogRequest): Promise<void> {
    await new this.registeredLogModel(data).save();
  }

  public async createLogedinLog(data: ICreateLogedinLogRequest): Promise<void> {
    await new this.logedinLogModel(data).save();
  }
}
