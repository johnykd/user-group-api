/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('grouped')
  async getGroupedUsers() {
    return this.usersService.getUsersGroupedByDepartment();
  }
}