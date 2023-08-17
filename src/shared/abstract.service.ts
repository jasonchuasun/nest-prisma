import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AbstractService {
  constructor(
    protected prisma: PrismaService,
    protected modelname: Prisma.ModelName,
  ) {}

  async findOne(option: any): Promise<any> {
    return await this.prisma[this.modelname].findUnique({
      where: option,
    });
  }

  async findAll(): Promise<any> {
    return await this.prisma[this.modelname].findMany();
  }

  async findManyBy(option: any): Promise<any> {
    return await this.prisma[this.modelname].findMany({
      where: option,
    });
  }

  async create(option: any): Promise<any> {
    return await this.prisma[this.modelname].create({
      data: option,
    });
  }

  async delete(option: any): Promise<string> {
    await this.prisma[this.modelname].delete({
      where: option
    });

    return `Successfully deleted ${this.modelname}`;
  }
}
