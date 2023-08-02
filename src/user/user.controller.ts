import { Body, Controller, Get, NotFoundException, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { ExcludeFieldsInterceptor } from 'src/shared/transform.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new ExcludeFieldsInterceptor())
  @Get()
  async findAll() {
    return await this.userService.findall();
  }
  
  @Post()
  async create(
    @Body() userData: Prisma.UserCreateInput,
    ): Promise<User> {
      return await this.userService.create(userData);
    }
    
  @UseInterceptors(new ExcludeFieldsInterceptor())
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user ) {
      throw new NotFoundException('User not found!')
    }

    return user;
  }
}
