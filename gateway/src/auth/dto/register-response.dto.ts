import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class RegisterResponseDto {
  @ApiProperty({ example: { userId: '637a5b098649d8c3eba3b09b', username: 'perter99cza' } })
  data: {
    userId: Types.ObjectId,
    username: string,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Register successful' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any } | null;
}