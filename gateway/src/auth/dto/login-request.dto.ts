import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty({ example: 'peter99cza', required: true })
  username: string;

  @ApiProperty({ example: 'ABC123def', required: true })
  password: string;

  clientIp: string;
}