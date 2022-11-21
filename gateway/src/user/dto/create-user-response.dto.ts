
export interface CreateUserResponseDto {
  data: { [key: string]: any } | null;
  message: string;
  status: number;
  error: { [key: string]: any } | null;
}