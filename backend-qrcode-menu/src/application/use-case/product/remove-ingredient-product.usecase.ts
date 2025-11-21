import { Inject } from '@nestjs/common';
import { ProductEntity } from '@domain/entities/product.entity';

import {
  INGREDIENT_REPOSITORY,
  type IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';

export class RemoveIngredientProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,

    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async execute(
    productId: string,
    ingredientId: string,
  ): Promise<ProductEntity | null> {
    // Atualiza no repositório
    return await this.productRepository.removeIngredient(
      productId,
      ingredientId,
    );
  }
}
