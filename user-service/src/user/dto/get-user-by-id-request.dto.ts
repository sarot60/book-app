import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IGetUserByIdRequest } from '../user.interface';

export class GetUserByIdRequestDto implements IGetUserByIdRequest {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId
}