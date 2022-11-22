import { ApiProperty } from "@nestjs/swagger";

export class GetBookByIdResponseDto {
  @ApiProperty({
    example: {
      "_id": "637c5336c0be9c84d7519102",
      "name": "Bravo Hero",
      "categories": [
        "Fantasy",
        "Action"
      ],
      "stock": 100,
      "price": 50,
      "sold": 0,
      "imageFileName": "",
      "createdAt": "2022-11-22T04:42:30.729Z",
      "updatedAt": "2022-11-22T04:44:12.784Z"
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Get book Successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}