import { ApiProperty } from "@nestjs/swagger";

export class ReportSellBookEachCategoryResponseDto {
  @ApiProperty({
    example: [
      {
        "name": "Classics",
        "books": [
          "Dracula",
          "The Adventures of Tom Sawyer",
          "Peter Pan",
          "Flowers in the Attic"
        ],
        "totalSold": 576
      },
      {
        "name": "Fiction",
        "books": [
          "Dracula",
          "Eragon",
          "The Adventures of Tom Sawyer",
          "Peter Pan",
          "Fallen",
          "Interview with the Vampire",
          "Dragonfly in Amber",
          "Flowers in the Attic",
          "The Ruins of Gorlan"
        ],
        "totalSold": 1357
      },
      {
        "name": "Horror",
        "books": [
          "Dracula",
          "Interview with the Vampire",
          "Flowers in the Attic"
        ],
        "totalSold": 307
      },
    ]
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Get report sell book each category successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}