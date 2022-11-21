import {
  IsEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ICreateBookRequest } from '../book.interface';

export class CreateBookRequestDto implements ICreateBookRequest{
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsEmpty()
  @IsOptional()
  sold: number;

  @IsString()
  @IsOptional()
  imageFileName: string;
}