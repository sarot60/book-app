import { IsObject, IsString } from "class-validator";

export class UpdateUserRequestDto {
  @IsString()
  id: string;

  @IsObject()
  body: any;
}