import { Types } from 'mongoose';

export class UpdateBookResponseDto {
  data: {
    _id: Types.ObjectId,
  }
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}