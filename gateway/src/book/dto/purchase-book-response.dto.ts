import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PurchaseBookResponseDto {
  @ApiProperty({ example: { _id: '6376fa97ddca1ff8e46ca5a5' } })
  data: {
    _id: Types.ObjectId,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Purchase book successful.' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any } | null;
}