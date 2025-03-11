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

  async getUsers(department?: string): Promise<DepartmentGroups> {
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

  async getDepartmentInfo(department?: string): Promise<any> {
    const url = 'https://dummyjson.com/users';

    try {
      const response = await firstValueFrom(
        this.httpService.get<{ users: User[] }>(url),
      );
      let users = response.data.users;
      // Filter users by department if parameter is provided
      if (department) {
        users = users.filter(
          (user) =>
            user.company.department.toLowerCase() === department.toLowerCase(),
        );
      }
      return {
        male: users.filter((user: any) => user.gender === 'male').length,
        female: users.filter((user: any) => user.gender === 'female').length,
        ageRange: `${Math.min(...users.map((u) => u.age))}-${Math.max(...users.map((u) => u.age))}`,
        hair: users.reduce((acc, user: any) => {
          const color = user.hair.color;
          acc[color] = (acc[color] || 0) + 1;
          return acc;
        }, {}),
        addressUser: users.reduce((acc, user: any) => {
          acc[`${user?.firstName || ''}${user?.lastName || ''}`] =
            user.address.postalCode;
          return acc;
        }, {}),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch department statistics: ${error.message}`,
      );
    }
  }
}
