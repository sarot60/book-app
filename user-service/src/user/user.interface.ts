import { Types } from "mongoose";
import { Role } from "./role.enum";
import { User, UserDocument } from "./schemas/user.schema";

export interface ICreateUserRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  banned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserResponse {
  data: User | UserDocument | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetAllRequest {
  page: number;
  limit: number;
  search: string;
}

export interface IGetAllResponse {
  data: {
    users: User[] | UserDocument[],
    total: number,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetUserByIdRequest {
  userId: Types.ObjectId;
}

export interface IGetUserByIdResponse {
  data: User | UserDocument | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IDeleteUserRequest {
  userId: Types.ObjectId;
}

export interface IDeleteUserResponse {
  data: {
    userId: Types.ObjectId;
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IUpdateUserResponse {
  data: User | UserDocument | null;
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

export interface IUserLoginCountResponse {
  data: {
    count: number;
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface INewUserResponse {
  data: {
    logs: any[],
    total: number,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetTotalBookPurchasedEachUserResponse {
  data: {
    topPurchased: any[];
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IGetLastPurchasedBookResponse {
  data: {
    lastPurchased: any[];
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}