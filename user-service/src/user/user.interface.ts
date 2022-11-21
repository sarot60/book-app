import { Types } from "mongoose";

export interface IGetAllRequest {
  page: number;
  limit: number;
  search: string;
}

export interface IGetAllResponse {
  data: {
    users: any[],
    total: number,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface ICreateRegisteredLogRequest {
  userId: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ICreateLogedinLogRequest {
  userId: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
}