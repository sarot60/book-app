import { ApiProperty } from "@nestjs/swagger";

export class BanRequestDto {
  @ApiProperty({ example: '637a5b098649d8c3eba3b09b' })
  userId: string;
}