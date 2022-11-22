import { ApiProperty } from "@nestjs/swagger";

export class GetTopUserPurchaseBookResponse {
  @ApiProperty({
    example: [
      {
        "userDetail": {
          "_id": "637732dba312379d440b361f",
          "username": "peter99cza",
          "firstName": "Perter",
          "lastName": "Hall"
        },
        "totalQuantity": 274,
        "totalPrice": 106020.25,
        "eachCategory": [
          {
            "categoryName": "Classics",
            "totalQuantity": 123,
            "totalPrice": 48651.15
          },
          {
            "categoryName": "Fiction",
            "totalQuantity": 235,
            "totalPrice": 84943.87
          },
          {
            "categoryName": "Horror",
            "totalQuantity": 69,
            "totalPrice": 25053.01
          },
          {
            "categoryName": "Fantasy",
            "totalQuantity": 115,
            "totalPrice": 38397.95
          },
          {
            "categoryName": "Vampires",
            "totalQuantity": 61,
            "totalPrice": 18646.85
          },
          {
            "categoryName": "Young Adult",
            "totalQuantity": 70,
            "totalPrice": 29321.5
          },
          {
            "categoryName": "Magic",
            "totalQuantity": 24,
            "totalPrice": 5300.64
          },
          {
            "categoryName": "Adventure",
            "totalQuantity": 85,
            "totalPrice": 23622.6
          },
          {
            "categoryName": "Dragons",
            "totalQuantity": 24,
            "totalPrice": 5300.64
          },
          {
            "categoryName": "School",
            "totalQuantity": 61,
            "totalPrice": 18321.96
          },
          {
            "categoryName": "Novels",
            "totalQuantity": 61,
            "totalPrice": 18321.96
          },
          {
            "categoryName": "Childrens",
            "totalQuantity": 84,
            "totalPrice": 29827.94
          },
          {
            "categoryName": "Fairy Tales",
            "totalQuantity": 23,
            "totalPrice": 11505.98
          },
          {
            "categoryName": "Romance",
            "totalQuantity": 105,
            "totalPrice": 52244.82
          },
          {
            "categoryName": "Paranormal",
            "totalQuantity": 30,
            "totalPrice": 6229.8
          },
          {
            "categoryName": "Teen",
            "totalQuantity": 39,
            "totalPrice": 21076.38
          },
          {
            "categoryName": "Action",
            "totalQuantity": 39,
            "totalPrice": 21076.38
          },
          {
            "categoryName": "Time Travel",
            "totalQuantity": 51,
            "totalPrice": 21817.8
          },
          {
            "categoryName": "Historical Fiction",
            "totalQuantity": 51,
            "totalPrice": 21817.8
          },
          {
            "categoryName": "Adult",
            "totalQuantity": 51,
            "totalPrice": 21817.8
          },
          {
            "categoryName": "Mystery",
            "totalQuantity": 8,
            "totalPrice": 6406.16
          },
          {
            "categoryName": "Drama",
            "totalQuantity": 8,
            "totalPrice": 6406.16
          }
        ]
      },
      {
        "userDetail": {
          "_id": "637a5b098649d8c3eba3b09b",
          "username": "chrisSer",
          "firstName": "Chris",
          "lastName": "Carter"
        },
        "totalQuantity": 187,
        "totalPrice": 74779.61,
        "eachCategory": [
          {
            "categoryName": "Classics",
            "totalQuantity": 27,
            "totalPrice": 21620.79
          },
          {
            "categoryName": "Fiction",
            "totalQuantity": 160,
            "totalPrice": 60188.27
          },
          {
            "categoryName": "Horror",
            "totalQuantity": 34,
            "totalPrice": 23074.41
          },
          {
            "categoryName": "Fantasy",
            "totalQuantity": 113,
            "totalPrice": 30011.48
          },
          {
            "categoryName": "Vampires",
            "totalQuantity": 7,
            "totalPrice": 1453.62
          },
          {
            "categoryName": "Young Adult",
            "totalQuantity": 68,
            "totalPrice": 23646.6
          },
          {
            "categoryName": "Magic",
            "totalQuantity": 41,
            "totalPrice": 9055.26
          },
          {
            "categoryName": "Adventure",
            "totalQuantity": 41,
            "totalPrice": 9055.26
          },
          {
            "categoryName": "Dragons",
            "totalQuantity": 41,
            "totalPrice": 9055.26
          },
          {
            "categoryName": "School",
            "totalQuantity": 0,
            "totalPrice": 0
          },
          {
            "categoryName": "Novels",
            "totalQuantity": 0,
            "totalPrice": 0
          },
          {
            "categoryName": "Childrens",
            "totalQuantity": 65,
            "totalPrice": 19502.6
          },
          {
            "categoryName": "Fairy Tales",
            "totalQuantity": 0,
            "totalPrice": 0
          },
          {
            "categoryName": "Romance",
            "totalQuantity": 74,
            "totalPrice": 44768.13
          },
          {
            "categoryName": "Paranormal",
            "totalQuantity": 7,
            "totalPrice": 1453.62
          },
          {
            "categoryName": "Teen",
            "totalQuantity": 92,
            "totalPrice": 34093.94
          },
          {
            "categoryName": "Action",
            "totalQuantity": 92,
            "totalPrice": 34093.94
          },
          {
            "categoryName": "Time Travel",
            "totalQuantity": 20,
            "totalPrice": 8556
          },
          {
            "categoryName": "Historical Fiction",
            "totalQuantity": 20,
            "totalPrice": 8556
          },
          {
            "categoryName": "Adult",
            "totalQuantity": 20,
            "totalPrice": 8556
          },
          {
            "categoryName": "Mystery",
            "totalQuantity": 27,
            "totalPrice": 21620.79
          },
          {
            "categoryName": "Drama",
            "totalQuantity": 27,
            "totalPrice": 21620.79
          }
        ]
      },
    ]
  })
  data: any[] | null;

  @ApiProperty({ example: 'Get top user purchase book successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}