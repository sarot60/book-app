import {
  IsNumber,
  IsString,
  IsMongoId,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { IPurchaseBookRequest } from "../book.interface";

export class PurchaseBookRequestDto implements IPurchaseBookRequest {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  bookId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  bookName: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  price: number;
}