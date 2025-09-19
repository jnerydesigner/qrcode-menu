import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class FindAllProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  execute() {
    return this.productRepository.findAll();
  }
}
