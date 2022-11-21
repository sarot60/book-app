import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class BanRequestDto {
  @ApiProperty({ example: '637a5b098649d8c3eba3b09b' })
  userId: Types.ObjectId;
}