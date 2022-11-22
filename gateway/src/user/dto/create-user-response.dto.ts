import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponseDto {
  @ApiProperty({
    example: {
      _id: "637bbc77a6e221d75a919635",
      username: "member99G2x",
      password: "$2b$10$lDheV5kfcj4eVf5ff5GKxuNkB6U9YNTPFhctvbaGIuQFkU/NNEnNe",
      firstName: "jacky",
      lastName: "diaz",
      roles: [
        "user"
      ],
      banned: false,
      createdAt: "2022-11-21T17:59:19.786Z",
      updatedAt: "2022-11-22T04:06:39.271Z",
    }
  })
  data: { [key: string]: any } | null;

  @ApiProperty({ example: 'Create user Successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}