import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateBookResponseDto {
  @ApiProperty({ example: { _id: '6376976bf3c64cf3426090fd', name: 'Bravo Hero' } })
  data: {
    _id: Types.ObjectId,
    name: string,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Create book successful.' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any };
}