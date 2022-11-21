import { Types } from 'mongoose';

export class UpdateUserResponseDto {
  data: { [key: string]: any } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}