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
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';


@Module({
  imports: [UserModule, AuthModule, PostModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, PrismaService, AuthService, PasswordService, PostService],
})
export class AppModule {}
