import {
  IsDate,
  IsEnum,
  Matches,
  IsArray,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Match } from '../validators/match.validator';
import { UserExists } from '../validators/user-exists.validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @UserExists()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  public password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'password do not match' })
  public passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  public lastName: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  public roles: Role[] = [Role.User];

  @IsBoolean()
  public banned: boolean = false;

  @IsDate()
  @IsOptional()
  public createdAt: Date;

  @IsDate()
  @IsOptional()
  public updatedAt: Date;
}