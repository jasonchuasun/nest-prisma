import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AbstractService {
  constructor(
    protected prisma: PrismaService,
    protected modelname: Prisma.ModelName,
  ) {}

  async findOne(options: any): Promise<any> {
    return await this.prisma[this.modelname].findUnique({
      where: options,
    });
  }

  async findAll(options?: any): Promise<any> {
    return await this.prisma[this.modelname].findMany(options);
  }

  async findManyBy(options: any): Promise<any> {
    return await this.prisma[this.modelname].findMany({
      where: options,
    });
  }

  async create(options: any): Promise<any> {
    return await this.prisma[this.modelname].create({
      data: options,
    });
  }

  async delete(options: any): Promise<string> {
    await this.prisma[this.modelname].delete({
      where: options
    });

    return `Successfully deleted ${this.modelname}`;
  }
}
