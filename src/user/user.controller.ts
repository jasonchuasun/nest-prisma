import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:role')
  async getUsersBasedOnRole(@Param('role') role: Role) {
    const roleUppercase = role.toUpperCase() as Role;

    this.validateRole(roleUppercase);

    const users = await this.findUsersByRole(roleUppercase);
    
    if (users.length == 0) {
      throw new NotFoundException('No users found')
    }
    
    return users;
  }

  validateRole(role: Role): void {
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Role entered is not valid')
    }
  }

  async findUsersByRole(role: Role): Promise<User[]> {
    return await this.userService.findMany({ role });
  }
}
