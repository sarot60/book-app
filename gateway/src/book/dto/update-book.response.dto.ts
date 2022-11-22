import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookResponseDto {
  @ApiProperty({
    example: {
      "_id": "637c5336c0be9c84d7519102"
    },
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Update book uccessful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}