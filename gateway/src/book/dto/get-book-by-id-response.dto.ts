export class GetBookByIdResponseDto {
  data: { [key: string]: any };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}