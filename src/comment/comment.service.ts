import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class CommentService extends AbstractService {
  constructor(prismaService: PrismaService) {
    super(prismaService, "Comment")
  }
}
