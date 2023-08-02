import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findall() {
    return await this.prisma.user.findMany()
  }

  async createUser(body: Prisma.UserCreateInput): Promise<User> {
    const { password, ...data } = body;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });
  }
}
