import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('BOOK_SERVICE') private bookServiceClient: ClientProxy,
  ) { }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) throw new NotFoundException('Invalid user');
    return updatedUser;
  }

  public async getAllUser(page: number = 0, limit?: number, search?: string): Promise<{ users: User[], total: number }> {
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

    return { users, total };
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserPasswordById(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 1 }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('Invalid user');
    return user;
  }

  public async updatePassword(id: string, password: string) {
    const updatedUser = await this.userModel.updateOne({ _id: id }, { password }).exec();
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
}
