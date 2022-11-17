import { Role } from "../auth/roles.enum";

export class CreateUserRequestDto {
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

export class GetAllRequestDto {
  page: number;
  limit: number;
  search?: string;
}