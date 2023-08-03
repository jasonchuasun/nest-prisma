import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Prisma, Role } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findMany(option: Prisma.UserWhereInput) {
    const users =  await this.prisma.user.findMany({
      where: option
    });

    return users;
  }
}
