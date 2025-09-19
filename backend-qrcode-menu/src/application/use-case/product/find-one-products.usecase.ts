import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class FindOneProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  execute(productId: string) {
    return this.productRepository.findOne(productId);
  }
}

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};
