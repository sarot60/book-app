import { ApiProperty } from "@nestjs/swagger";

export class ReportTopSellBookResponseDto {
  @ApiProperty({
    example: [
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
        "sold": 274,
        "createdAt": "2016-11-26T07:47:52.409Z",
        "updatedAt": "2022-11-22T03:46:37.062Z"
      },
      {
        "_id": "637a88a9f15b44263668b929",
        "name": "Legend",
        "categories": [
          "Young Adult",
          "Teen",
          "Action",
          "Romance"
        ],
        "sold": 236,
        "createdAt": "2017-08-24T13:05:43.977Z",
        "updatedAt": "2017-08-24T13:05:43.977Z"
      },
      {
        "_id": "637a88a9f15b44263668b926",
        "name": "Peter Pan",
        "categories": [
          "Classics",
          "Fantasy",
          "Fiction",
          "Childrens",
          "Fairy Tales"
        ],
        "sold": 214,
        "createdAt": "2018-08-14T09:51:34.486Z",
        "updatedAt": "2018-08-14T09:51:34.486Z"
      },
    ]
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Get report top sell successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}