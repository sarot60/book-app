import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IBanRequest } from "../auth.interface";

export class BanRequestDto implements IBanRequest {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}