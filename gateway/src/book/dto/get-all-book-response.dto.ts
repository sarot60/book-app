import { ApiProperty } from "@nestjs/swagger";

export class GetAllBookResponseDto {
  @ApiProperty({
    example: {
      users: [
        {
          "_id": "637a88a9f15b44263668b92c",
          "name": "The Ruins of Gorlan",
          "categories": [
            "Action",
            "Fantasy",
            "Teen",
            "Fiction",
            "Childrens"
          ],
          "stock": 626,
          "price": 300.04,
          "sold": 274,
          "imageFileName": null,
          "createdAt": "2016-11-26T07:47:52.409Z",
          "updatedAt": "2022-11-22T03:46:37.062Z"
        }
      ],
      total: 10,
    }
  })
  data: {
    users: any[],
    total: number,
  } | null;

  @ApiProperty({ example: "Get books successful" })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}