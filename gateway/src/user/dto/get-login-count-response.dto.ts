import { ApiProperty } from "@nestjs/swagger";

export class GetUserLoginCountResponse {
  @ApiProperty({
    example: {
      "count": 52
    }
  })
  data: {
    count: number
  } | null;

  @ApiProperty({ example: 'Get user login count successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}