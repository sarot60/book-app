import { IsNumber, IsOptional, IsString } from "class-validator";
import { IGetAllBookRequest } from "../book.interface";

export class GetAllBookRequestDto implements IGetAllBookRequest {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  searchBy: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsString()
  @IsOptional()
  sortBy: string;
}