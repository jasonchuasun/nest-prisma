import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { AbstractService } from 'src/shared/abstract.service';

@Injectable()
export class UserService extends AbstractService{
  constructor(prisma: PrismaService) {
    super(prisma, "User")
  }
}
