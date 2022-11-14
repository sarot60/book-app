import { Response } from "express";
import { UsersService } from './users.service';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUserList(@Res() response: Response) {
    const users = await this.usersService.readAll();
    return response.status(HttpStatus.OK).json({
      users
    })
  }
}
