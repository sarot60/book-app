import { ApiProperty } from "@nestjs/swagger";

export class GetAllUserResponseDto {
  @ApiProperty({
    example: {
      users: [
        {
          "_id": "637c45a9e24591f1c6df69b8",
          "username": "dizmanER11",
          "firstName": "Jack",
          "lastName": "I am Jack"
        }
      ],
      total: 1,
    }
  })
  data: {
    users: any[],
    total: number,
  } | null;

  @ApiProperty({example: "Get users successful"})
  message: string;

  @ApiProperty({example: 200})
  status: number;

  @ApiProperty({example: null})
  error: { [key: string]: any } | null;
}