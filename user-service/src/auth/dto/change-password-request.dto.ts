import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { IChangePasswordRequest } from "../auth.interface";

export class ChangePasswordRequestDto implements IChangePasswordRequest  {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}