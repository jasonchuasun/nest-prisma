import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('user')
  // async findAll(): Promise<User[]> {
  //   return await this.userService.findall();
  // }
  @Get('user')
  async findAll(): Promise<String> {
    return await this.userService.findall();
  }

  @Post('user')
  async createUser(
    @Body() userData: { first_name: string; last_name: string; email: string, password: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }
}
