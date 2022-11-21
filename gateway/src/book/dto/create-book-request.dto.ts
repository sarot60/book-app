import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRequestDto {
  @ApiProperty({
    example: 'Bravo Hero'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: ['Fantasy', 'Action'],
  })
  @IsString()
  categories: string;

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