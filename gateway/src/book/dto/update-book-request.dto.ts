import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateBookRequestDto {
  @ApiProperty({
    example: 'Bravo Hero'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Fantasy',
  })
  @IsString()
  category: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  price: number;

  @IsEmpty()
  @IsOptional()
  sold: number;

  @IsString()
  @IsOptional()
  imageFileName: string;
}