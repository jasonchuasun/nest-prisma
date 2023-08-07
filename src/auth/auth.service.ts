import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { PasswordService } from 'src/shared/password.service';
import { AbstractService } from 'src/shared/abstract.service';

@Injectable()
export class AuthService extends AbstractService {
  constructor(
    prisma: PrismaService,
    // , private passwordService: PasswordService
  ) {
    super(prisma, 'User');
  }

  // async create(body: Prisma.UserCreateInput): Promise<User> {
  //   const { password, ...rest } = body;

  //   const hashedPassword = await this.passwordService.hashPassword(password);

  //   return await this.prisma.user.create({
  //     data: {
  //       password: hashedPassword,
  //       ...rest,
  //     },
  //   });
  // }

  // async delete(id: number) {
  //   return await this.prisma.user.delete({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  // }
}
