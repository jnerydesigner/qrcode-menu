import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject, Logger } from '@nestjs/common';

export class FindAllProductUseCase {
  private logger = new Logger('FindAllProductUseCase');
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  async execute() {
    const products = await this.productRepository.findAll();
    this.logger.log(products);
    return products;
  }
}
