import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRequestDto {
  @ApiProperty({
    example: 'Bravo Hero'
  })
  @IsNotEmpty()
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