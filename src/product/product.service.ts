import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/abstract.service';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class ProductService extends AbstractService{
  constructor(prisma: PrismaService) {
    super(prisma, "Product")
  }
}
