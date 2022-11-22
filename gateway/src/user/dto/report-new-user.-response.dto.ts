import { ApiProperty } from "@nestjs/swagger";

export class ReportNewUserResponse {
  @ApiProperty({
    example: {
      "logs": [
        {
          "_id": "637bb829bffb3f5c82a612f3",
          "userId": "637bb829bffb3f5c82a612f1",
          "username": "test-register2",
          "firstName": "test Cza member99",
          "lastName": "test Cza member99",
          "createdAt": "2022-11-21T17:40:57.483Z",
          "updatedAt": "2022-11-21T17:40:57.483Z"
        },
        {
          "_id": "637b6ceb639bcf94c5d055b6",
          "userId": "637b6ceb639bcf94c5d055b4",
          "username": "test-register2",
          "firstName": "test Cza member99",
          "lastName": "test Cza member99",
          "createdAt": "2022-11-21T12:19:55.341Z",
          "updatedAt": "2022-11-21T12:19:55.341Z"
        },
        {
          "_id": "637b6c47595ec31f51ce2e65",
          "userId": "637b6c47595ec31f51ce2e63",
          "username": "test-register",
          "firstName": "test Cza member99",
          "lastName": "test Cza member99",
          "createdAt": "2022-11-21T12:17:11.605Z",
          "updatedAt": "2022-11-21T12:17:11.605Z"
        }
      ],
      "total": 3,
    }
  })
  data: {
    logs: any[],
    total: number,
  } | null;

  @ApiProperty({ example: 'Get new user successful' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: null })
  error: { [key: string]: any } | null;
}