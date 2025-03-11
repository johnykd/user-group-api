/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Query } from '@nestjs/common';
import { UsersService, DepartmentGroups } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('department')
  async getUsersByDepartment(
    @Query('department') department?: string,
  ): Promise<DepartmentGroups> {
    return this.usersService.getUsersByCompanyDepartmentFilter(
      department?.toLowerCase(),
    );
  }
}