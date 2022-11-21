import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Role } from "../roles.enum";

export class ValidateTokenResponseDto {
  data: {
    _id: Types.ObjectId,
    username: string,
    roles: Role[],
    banned: boolean,
  } | null;

  status: number;

  message: string;

  error: { [key: string]: any } | null;
}