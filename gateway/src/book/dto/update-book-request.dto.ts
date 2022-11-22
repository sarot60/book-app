import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateBookRequestDto {
  @ApiProperty({
    example: 'Bravo Hero'
  })
  name: string;

  @ApiProperty({
    example: ['Fantasy', 'Action'],
  })
  categories: string;

  @ApiProperty({ example: 100 })
  stock: number;

  @ApiProperty({ example: 50 })
  price: number;

  sold: number;

  imageFileName: string;
}