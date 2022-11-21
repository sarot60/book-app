import { Types } from "mongoose";
import { Role } from "src/user/role.enum";

export interface ILoginRequest {
  username: string;
  password: string;
  clientIp: string;
}

export interface ILoginResponse {
  data: {
    accessToken: string,
  } | null;
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
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IRegisterResponse {
  data: {
    userId: Types.ObjectId,
    username: string;
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IBanRequest {
  userId: Types.ObjectId;
}

export interface IBanResponse {
  data: {
    userId: Types.ObjectId,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface ICancelBanRequest {
  userId: Types.ObjectId;
}

export interface ICancelBanResponse {
  data: {
    userId: Types.ObjectId,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}

export interface IValidateTokenRequest {
  token: string;
}

export interface IValidateTokenResponse {
  data: {
    _id: Types.ObjectId,
    username: string,
    roles: Role[],
    banned: boolean,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}