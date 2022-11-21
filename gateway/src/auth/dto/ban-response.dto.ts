import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class BanResponseDto {
  @ApiProperty({ example: { userId: '637a5b098649d8c3eba3b09b' } })
  data: {
    userId: Types.ObjectId,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Banned successful' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any } | null;
}