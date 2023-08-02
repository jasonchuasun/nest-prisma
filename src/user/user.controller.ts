import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { ExcludeFieldsInterceptor } from 'src/shared/transform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Get()
  async findAll() {
    return await this.userService.findall();
  }

  @Post()
  async create(
    @Body() userData: Prisma.UserCreateInput & { password_confirm: string },
  ): Promise<User> {
    const { password, ...rest } = userData;

    if (password !== userData.password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const newUser = await this.userService.create({ password, ...rest });
    return newUser;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<string> {
    try {
      await this.userService.delete(id);

      return 'Successfully deleted.';
    } catch {
      throw new NotFoundException('User not found!');
    }
  }
}
