/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUsersGroupedByDepartment() {
    const url = 'https://dummyjson.com/users';

    // Fetch user data from API
    const response = await firstValueFrom(this.httpService.get(url));
    const users = response.data.users;

    // Group users by department
    const groupedData = users.reduce((acc, user) => {
      const { department } = user;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
      });
      return acc;
    }, {});

    return groupedData;
  }
}
