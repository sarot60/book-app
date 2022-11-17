import { IsNotEmpty } from "class-validator";

export class GetAllRequestDto {
  page?: number;
  limit?: number;
  search?: string;
}