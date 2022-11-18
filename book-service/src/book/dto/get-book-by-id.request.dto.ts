import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IGetBookByIdRequest } from "../book.interface";

export class GetBookByIdRequestDto implements IGetBookByIdRequest {
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId
}