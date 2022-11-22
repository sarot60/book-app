import { ApiProperty } from "@nestjs/swagger";

export class GetTotalBookPurchasedEachUserResponseDto {
  @ApiProperty({
    example: {
      "topPurchased": [
        {
          "_id": "637732dba312379d440b361f",
          "purchasedQuantity": 274,
          "username": "peter99cza",
          "firstName": "Perter",
          "lastName": "Hall"
        },
        {
          "_id": "637a5b098649d8c3eba3b09b",
          "purchasedQuantity": 187,
          "username": "chrisSer",
          "firstName": "Chris",
          "lastName": "Carter"
        },
      ]
    }
  })
  data: {
    topPurchased: any[];
  } | null;

  @ApiProperty({ example: 'Get total purchase successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}