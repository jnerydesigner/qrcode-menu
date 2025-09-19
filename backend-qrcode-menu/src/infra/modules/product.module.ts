import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import { CreateProductUseCase } from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { Module } from '@nestjs/common';
import { ProductController } from '@presenters/controllers/product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FindOneProductUseCase,
    CreateManyProductUseCase,
    FindAllProductUseCase,
  ],
})
export class ProductModule {}
