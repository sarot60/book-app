import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IDeleteBookRequest, IGetBookByIdRequest } from "../book.interface";

export class DeleteBookRequestDto implements IDeleteBookRequest {
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId
}