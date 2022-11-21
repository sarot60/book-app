import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { Types } from "mongoose";

export class UpdateUserRequestDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsString()
  @IsOptional()
  username: string;
}