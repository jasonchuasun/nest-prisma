import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../shared/prisma.service';
import { PasswordService } from '../shared/password.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
