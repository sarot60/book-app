export class GetAllUserResponseDto {
  data: {
    users: any[],
    total: number,
  } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}