import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateUserRequestDto {
  username: string;

  @ApiProperty({example: 'Rado'})
  firstName: string;

  @ApiProperty({example: 'i too'})
  lastName: string;
}