import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User } from '@prisma/client';
import { ExcludeFieldsInterceptor } from '../auth/interceptors/transform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Get('/:role')
  async getUsersBasedOnRole(@Param('role') role: Role): Promise<User[]> {
    const roleUppercase = role.toUpperCase() as Role;

    this.validateRole(roleUppercase);

    const users = await this.userService.findManyBy({ role: roleUppercase });

    if (users.length == 0) {
      throw new NotFoundException('No users found');
    }

    return users
  }

  validateRole(role: Role): void {
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Role entered is not valid');
    }
  }
}
