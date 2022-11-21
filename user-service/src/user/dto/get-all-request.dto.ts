import { IsNumber, IsOptional, IsString } from "class-validator";
import { IGetAllRequest } from "../user.interface";

export class GetAllRequestDto implements IGetAllRequest {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}