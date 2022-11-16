import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('BOOK_SERVICE') private bookServiceClient: ClientProxy,
  ) { }

  public async createUser(payload) {
    return
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
}
