import { IsNumber, IsOptional, IsString } from "class-validator";
import { IReportSellBookEachCategoryRequest } from "../book.interface";

export class ReportSellBookEachCategoryRequestDto implements IReportSellBookEachCategoryRequest {
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