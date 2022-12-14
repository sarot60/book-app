import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class DeleteUserResponseDto {
  @ApiProperty({
    example: {
      userId: "637b6c47595ec31f51ce2e63"
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Delete user successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}