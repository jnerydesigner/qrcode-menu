import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class FindOneSlugProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  execute(slug: string) {
    return this.productRepository.findOneSlug(slug);
  }
}
