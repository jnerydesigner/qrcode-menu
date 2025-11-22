import { ProductEntity } from '@domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) { }
  execute(createProductInput: CreateProductInput) {
    const productEntity = new ProductEntity(
      createProductInput.name,
      createProductInput.description,
      createProductInput.price,
      '',
      createProductInput.categoryId,
      '',
      null,
      createProductInput.company,
      null,
      [],
    );

    return this.productRepository.save(productEntity);
  }
}

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  company: string;
};
