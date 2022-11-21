import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({ example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldGVyOTljemEiLCJfaWQiOiI2Mzc3MzJkYmEzMTIzNzlkNDQwYjM2MWYiLCJpYXQiOjE2NjkwMjY5MDYsImV4cCI6MTY2OTAzMDUwNn0.WXdYXAmPiczQLbtJMQlM9oelX6JPP9hBokDkqVNFAdY' } })
  data: {
    accessToken: string,
  };

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any };
}