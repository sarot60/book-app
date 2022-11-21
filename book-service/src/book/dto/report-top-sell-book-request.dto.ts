import { IsNumber, IsOptional, IsString } from "class-validator";
import { IReportTopSellBookRequest } from "../book.interface";

export class ReportTopSellBookRequestDto implements IReportTopSellBookRequest {
  @IsOptional()
  @IsString()
  fullDate: string;

  @IsOptional()
  @IsNumber()
  day: number;

  @IsOptional()
  @IsNumber()
  month: number;

  @IsOptional()
  @IsNumber()
  year: number;
}