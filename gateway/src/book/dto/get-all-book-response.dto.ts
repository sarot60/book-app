export class GetAllBookResponseDto {
  data: {
    books: any[],
    total: number,
  };
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}