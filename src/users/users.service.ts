/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface Company {
  department: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  company: Company;
}

interface GroupedUser {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

export interface DepartmentGroups {
  [key: string]: GroupedUser[];
}

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUsersByCompanyDepartmentFilter(
    department?: string,
  ): Promise<DepartmentGroups> {
    const url = 'https://dummyjson.com/users';

    try {
      const response = await firstValueFrom(
        this.httpService.get<{ users: User[] }>(url),
      );
      const users = response.data.users;

      const filteredUsers = department
        ? users.filter(
            (user) =>
              user.company.department.toLowerCase() ===
              department.toLowerCase(),
          )
        : users;

      return filteredUsers.reduce((acc: DepartmentGroups, user: User) => {
        const dept = user.company.department;
        if (!acc[dept]) {
          acc[dept] = [];
        }
        acc[dept].push({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          age: user.age,
          department: user.company.department,
        });
        return acc;
      }, {});
    } catch (error) {
      throw new Error(
        `Failed to fetch and filter users by department: ${error.message}`,
      );
    }
  }
}
