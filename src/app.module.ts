import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './shared/prisma.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './shared/password.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
  controllers: [AppController, UserController, AuthController, ProductController],
  providers: [AppService, UserService, PrismaService, AuthService, PasswordService, ProductService],
})
export class AppModule {}
