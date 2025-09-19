import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import {
  type CreateProductInput,
  CreateProductUseCase,
} from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly createManyProductUseCase: CreateManyProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductUseCase,
  ) {}

  @Post()
  createProduct(@Body() product: CreateProductInput) {
    return this.createProductUseCase.execute(product);
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Get('/:productId')
  findOne(@Param('productId') productId: string) {
    return this.findOneProductUseCase.execute(productId);
  }

  @Post('/many-products')
  createManyProducts(@Body() manyProducts: CreateProductInput[]) {
    return this.createManyProductUseCase.execute(manyProducts);
  }
}
