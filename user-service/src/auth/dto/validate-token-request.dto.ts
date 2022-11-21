import { IsNotEmpty, IsString } from "class-validator";
import { IValidateTokenRequest } from "../auth.interface";

export class ValidateTokenRequestDto implements IValidateTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}