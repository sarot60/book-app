import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class GetUserByIdRequestDto {
  @ApiProperty({example: '637c45a9e24591f1c6df69b8'})
  userId: string;
}