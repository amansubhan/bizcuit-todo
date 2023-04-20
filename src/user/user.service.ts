import { Injectable } from '@nestjs/common';

export type User = {
  id?: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'appleseed',
    },
    {
      userId: 2,
      username: 'james',
      password: 'flinch',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
