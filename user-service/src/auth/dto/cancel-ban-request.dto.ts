import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { ICancelBanRequest } from "../auth.interface";

export class CancelBanRequestDto implements ICancelBanRequest {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}