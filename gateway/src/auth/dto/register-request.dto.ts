import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequestDto {
  @ApiProperty({ example: 'sonearfes10', required: true })
  username: string;

  @ApiProperty({ example: 'tcmzqQHnur2JzgK&', required: true })
  password: string;

  @ApiProperty({ example: 'tcmzqQHnur2JzgK&', required: true })
  passwordConfirm: string;

  @ApiProperty({ example: 'sonear', required: false })
  firstName: string;

  @ApiProperty({ example: 'alles', required: false })
  lastName: string;
}