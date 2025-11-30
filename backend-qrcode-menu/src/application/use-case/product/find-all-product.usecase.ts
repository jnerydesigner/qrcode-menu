import { LoggerService } from '@application/services/logger.service';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject, Logger } from '@nestjs/common';

export class FindAllProductUseCase {

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(FindAllProductUseCase.name);
  }
  async execute() {
    const products = await this.productRepository.findAll();
    this.loggerService.info(JSON.stringify(products));
    return products;
  }
}
