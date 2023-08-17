import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from '../shared/prisma.service';
import { PostService } from '../post/post.service';

@Module({
  providers: [CommentService, PostService, PrismaService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
