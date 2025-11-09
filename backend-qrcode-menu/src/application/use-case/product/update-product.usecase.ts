import { ProductEntity } from '@domain/entities/product.entity';
import {
  INGREDIENT_REPOSITORY,
  type IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async execute(productId: string, updateProductInput: UpdateProductInput) {
    const productIngredientMany = updateProductInput.productIngredient
      ? await Promise.all(
          updateProductInput.productIngredient.map(async (product) => {
            const productIngredient = await this.ingredientRepository.findId(
              product.ingredientId,
            );

            return productIngredient;
          }),
        )
      : [];

    const product = await this.productRepository.findOne(productId);

    const update = {
      ...product,
      ...updateProductInput,
      productIngredient:
        productIngredientMany.length > 0 ? productIngredientMany : [],
    };

    console.log('UPDATE:', update);

    return await this.productRepository.updateProduct(update as ProductEntity);
  }
}

export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  productIngredient?: ProductIngredientInput[]; // opcional
};

export type ProductIngredientInput = {
  ingredientId: string;
};
