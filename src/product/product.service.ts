import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/shared/abstract.service';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class ProductService extends AbstractService{
  constructor(prisma: PrismaService) {
    super(prisma, "Product")
  }
}
