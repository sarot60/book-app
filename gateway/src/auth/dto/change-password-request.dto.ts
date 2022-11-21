import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class ChangePasswordRequestDto {
  @ApiProperty({ example: '637a5b098649d8c3eba3b09b', required: true })
  userId: Types.ObjectId;

  @ApiProperty({ example: 'dF169aY5', required: true })
  oldPassword: string;

  @ApiProperty({ example: 'ABC123def', required: true })
  newPassword: string;
}