import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PurchaseBookRequestDto {
  @ApiProperty({ example: '637632627b08619650859735' })
  userId: Types.ObjectId;

  @ApiProperty({ example: '63769982030056c4a5db25d4' })
  bookId: Types.ObjectId;

  @ApiProperty({ example: 'Bravo Hero' })
  bookName: string;

  @ApiProperty({ example: ['Fantasy', 'Action'] })
  categories: string;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: 1000 })
  price: number;
}