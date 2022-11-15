import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: [{ categoryId: '637389a40524e4029c9faeae', name: 'cate1' }],
  })
  @IsArray()
  @IsOptional()
  categories: { categoryId: Types.ObjectId, name: string }[];

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @IsEmpty()
  @IsOptional()
  sold: number;

  @IsString()
  @IsOptional()
  imageFileName: string;
}