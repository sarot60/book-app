import { IsNotEmpty, IsString } from "class-validator";
import { ILoginRequest } from "../auth.interface";

export class LoginRequestDto implements ILoginRequest{
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  clientIp: string;
}