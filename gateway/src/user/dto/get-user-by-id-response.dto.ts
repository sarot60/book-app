import { ApiProperty } from "@nestjs/swagger";

export class GetUserByIdResponseDto {
  @ApiProperty({
    example: {
      "_id": "637c45a9e24591f1c6df69b8",
      "username": "dizmanER11",
      "firstName": "Jack",
      "lastName": "I am Jack",
      "roles": [
        "admin",
        "user"
      ],
      "banned": false,
      "createdAt": "2022-11-22T03:44:41.511Z",
      "updatedAt": "2022-11-22T03:44:41.511Z"
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Get user Successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}