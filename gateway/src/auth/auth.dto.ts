import { Role } from "./roles.enum";

export class RegisterDto {
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  roles: Role[] = [Role.User];
  banned: boolean = false;
  createdAt: Date;
  updatedAt: Date;
}

export class LoginDto {
  username: string;
  password: string;
}

export class ChangePasswordDto {
  _id: string;
  oldPassword: string;
  newPassword: string;
}