import { ApiProperty } from "@nestjs/swagger";

export class ValidateTokenRequestDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldGVyOTljemEiLCJfaWQiOiI2Mzc3MzJkYmEzMTIzNzlkNDQwYjM2MWYiLCJpYXQiOjE2NjkwMjY5MDYsImV4cCI6MTY2OTAzMDUwNn0.WXdYXAmPiczQLbtJMQlM9oelX6JPP9hBokDkqVNFAdY' })
  token: string;
}