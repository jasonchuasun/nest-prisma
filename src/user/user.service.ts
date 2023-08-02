import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findall() {
    return await this.prisma.user.findMany();
  }

  async create(body: Prisma.UserCreateInput): Promise<User> {
    const { password, ...rest } = body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prisma.user.create({
      data: {
        ...rest,        
        password: hashedPassword,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
