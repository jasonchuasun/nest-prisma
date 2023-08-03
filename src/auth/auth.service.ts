import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { PasswordService } from 'src/shared/password.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async findOne(option: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({
      where: option,
    });
  }

  async findall() {
    return await this.prisma.user.findMany();
  }

  async create(body: Prisma.UserCreateInput): Promise<User> {
    const { password, ...rest } = body;
    
    const hashedPassword = await this.passwordService.hashPassword(password)

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...rest,
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
