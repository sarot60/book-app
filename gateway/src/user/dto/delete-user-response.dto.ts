import { Types } from "mongoose";

export class DeleteUserResponseDto {
  data: {
    userId: Types.ObjectId,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}