import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserResponseDto {
  @ApiProperty({
    example: {
      "_id": "637bbc88a6e221d75a91963b",
      "username": "member99GGG2",
      "password": "$2b$10$4ZQbMjk2ARr.yGDA1O7GOO2uOfWD/w6uXKVfD7arARDIsI8zOLS66",
      "firstName": "Rado",
      "lastName": "i too",
      "roles": [
        "user"
      ],
      "banned": false,
      "createdAt": "2022-11-21T17:59:36.377Z",
      "updatedAt": "2022-11-22T04:15:59.177Z",
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Update user Successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}