import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import {
  type CreateProductInput,
  CreateProductUseCase,
} from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { FindOneSlugProductUseCase } from '@application/use-case/product/find-one-slug.usecase';
import {
  type UpdateProductInput,
  UpdateProductUseCase,
} from '@application/use-case/product/update-product.usecase';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findOneSlugProductUseCase: FindOneSlugProductUseCase,
    private readonly createManyProductUseCase: CreateManyProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductUseCase,
    private readonly updateProductsUseCase: UpdateProductUseCase,
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

  @Patch('/:productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductBody: UpdateProductInput,
  ) {
    return this.updateProductsUseCase.execute(productId, updateProductBody);
  }

  @Post('/many-products')
  createManyProducts(@Body() manyProducts: CreateProductInput[]) {
    return this.createManyProductUseCase.execute(manyProducts);
  }

  @Get('/slug/:slug')
  findOneSlug(@Param('slug') slug: string) {
    return this.findOneSlugProductUseCase.execute(slug);
  }
}
