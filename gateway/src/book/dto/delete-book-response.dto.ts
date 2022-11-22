import { ApiProperty } from '@nestjs/swagger';

export class DeleteBookResponseDto {
  @ApiProperty({
    example: {
      "_id": "637c5336c0be9c84d7519102"
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Delete book successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}