import { Types } from "mongoose";

export interface ILoginRequest {
  username: string;
  password: string;
  clientIp: string;
}

export interface ILoginResponse {
  data: {
    accessToken: string,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IChangePasswordRequest {
  userId: Types.ObjectId;
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  data: {
    userId: Types.ObjectId,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IRegisterResponse {
  data: {
    userId: Types.ObjectId,
    username: string;
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}