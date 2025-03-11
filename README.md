
## Features

- Group users by department
- Filter users by specific department

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

#### GET /users/department

Get users grouped by department.

Query Parameters:
- `department` (optional): Filter users by specific department

## API Usage Examples

```bash
# Get all users
curl http://localhost:3000/users
# Get users from a specific department
curl http://localhost:3000/users/?department=engineering

# Get department info from a specific department
curl http://localhost:3000/users/departmentInfo?department=engineering

```
Example department
Accounting, Training, Support, Human Resources, Engineering, Services, Marketing

## Tech Stack

- NestJS
- TypeScript
- Node.js

## License

This project is MIT licensed.