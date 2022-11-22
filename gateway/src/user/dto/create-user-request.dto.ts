import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../auth/roles.enum";

export class CreateUserRequestDto {
  @ApiProperty({ example: 'dizmanER11', required: true })
  username: string;

  @ApiProperty({ example: 'Akenh182JKb23', required: true })
  password: string;

  @ApiProperty({ example: 'Akenh182JKb23', required: true })
  passwordConfirm: string;

  @ApiProperty({ example: 'Jack' })
  firstName: string;

  @ApiProperty({ example: 'I am Jack' })
  lastName: string;

  @ApiProperty({ example: ['admin','user'] })
  roles: Role[] = [Role.User];

  banned: boolean = false;
  createdAt: Date;
  updatedAt: Date;
}