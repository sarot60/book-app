import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class ChangePasswordResponseDto {
  @ApiProperty({ example: { userId: '637a5b098649d8c3eba3b09b' } })
  data: {
    userId: Types.ObjectId,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Change password successful' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any };
}