import { ApiProperty } from "@nestjs/swagger";

export class GetLastPurchasedBookResponse {
  @ApiProperty({
    example: {
      "lastPurchased": [
        {
          "_id": "63629b4166c960b11f462cb1",
          "lastPurchase": "2022-01-20T20:44:17.121Z",
          "username": "adminBA",
          "firstName": "Hero",
          "lastName": "i am hero"
        },
        {
          "_id": "637732dba312379d440b361f",
          "lastPurchase": "2018-06-09T06:00:34.612Z",
          "username": "peter99cza",
          "firstName": "Perter",
          "lastName": "Hall"
        },
        {
          "_id": "637a5b098649d8c3eba3b094",
          "lastPurchase": "2021-05-14T08:39:27.592Z",
          "username": "aron1920",
          "firstName": "Aron",
          "lastName": "Allen"
        },
      ]
    }
  })
  data: {
    topPurchased: any[];
  } | null;

  @ApiProperty({ example: 'Get last purchase successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}