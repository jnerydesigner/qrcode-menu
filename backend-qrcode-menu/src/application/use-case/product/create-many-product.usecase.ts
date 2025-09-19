import { ProductEntity } from '@domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class CreateManyProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  execute(createProductInputs: CreateProductInput[]) {
    const products = createProductInputs.map((product) => {
      return new ProductEntity(
        product.name,
        product.description,
        product.price,
        product.image,
        product.categoryId,
        null,
        null,
        '',
      );
    });

    return this.productRepository.saveMany(products);
  }
}

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};
