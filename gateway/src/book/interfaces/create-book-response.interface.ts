import { Types } from 'mongoose';

export interface ICreateBookResponse {
  _id: Types.ObjectId;
  status: number;
  error: string[];
}
