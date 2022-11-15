import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateBookResponseDto {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  status: number;

  @ApiProperty()
  error: string[];
}