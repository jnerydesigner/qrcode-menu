import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class FindOneProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) { }
  execute(slug: string) {
    return this.productRepository.findOneSlug(slug);
  }
}

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};
