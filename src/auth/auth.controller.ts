import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ExcludeFieldsInterceptor } from './interceptors/transform.interceptor';
import { Prisma, User } from '@prisma/client';
import { AuthService } from './auth.service';
import { PasswordService } from '../shared/password.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.authService.findOne({
      id: Number(id),
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Get()
  async findAll() {
    const users = await this.authService.findAll();

    if (users.length == 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  @UseInterceptors(new ExcludeFieldsInterceptor(['password']))
  @Post()
  async create(
    @Body() userData: Prisma.UserCreateInput & { password_confirm: string },
  ) {
    const { password_confirm, ...rest } = userData;

    this.passwordService.comparePasswordAndPasswordConfirmation(
      userData.password,
      password_confirm,
    );

    await this.checkIfEmailIsTaken(userData.email);

    return await this.authService.create(rest);
  }

  async checkIfEmailIsTaken(email: string): Promise<void> {
    const user = await this.authService.findOne({ email: email });

    if (user) {
      throw new NotFoundException('Email is already taken');
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<string> {
    await this.checkIfUserExists(id);

    await this.authService.delete(id);

    return 'Successfully deleted';
  }

  async checkIfUserExists(id: number): Promise<void> {
    const user = await this.authService.findOne({
      id: Number(id),
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }
  }
}
