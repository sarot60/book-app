import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async readAll(): Promise<User[]> {
    return await this.userModel.find({}, { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
  }

}
