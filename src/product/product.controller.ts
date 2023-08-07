import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.findOne({ id: Number(id) });

    if (!product) {
      throw new NotFoundException('No product found');
    }

    return product;
  }

  @Get()
  async findAll(): Promise<Product[]> {
    const products = await this.productService.findAll();

    if (!products) {
      throw new NotFoundException('No product found');
    }

    return products
  }

  @Post()
  async create(@Body() productData: Prisma.UserWhereInput): Promise<Product> {
    return await this.productService.create(productData);
  }
}
