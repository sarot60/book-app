import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IDeleteUserRequest } from '../user.interface';

export class DeleteUserRequestDto implements IDeleteUserRequest {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId
}