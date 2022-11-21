import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserRequestDto } from "./create-user.dto";
import { Types } from "mongoose";

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsString()
  @IsOptional()
  username: string;
}