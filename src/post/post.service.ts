import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/abstract.service';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class PostService extends AbstractService {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Post')
  }
}
