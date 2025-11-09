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

  async execute(
    productId: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductEntity | null> {
    const product = await this.findProductOrNull(productId);

    if (!product) {
      return null;
    }

    const existingIngredients = product.ingredients ?? [];
    const requestedIngredientIds =
      updateProductInput.productIngredient?.map(
        (product) => product.ingredientId,
      ) ?? [];

    const productIngredientMany = requestedIngredientIds.length
      ? await this.ingredientRepository.findManyByIds(requestedIngredientIds)
      : [];

    const existingIngredientIds = new Set(
      existingIngredients.map((ingredient) => ingredient.id),
    );

    const additionalIngredients = requestedIngredientIds.length
      ? requestedIngredientIds
          .map((ingredientId) =>
            productIngredientMany.find(
              (ingredient) => ingredient.id === ingredientId,
            ),
          )
          .filter((ingredient): ingredient is ProductIngredientView =>
            Boolean(ingredient),
          )
          .filter((ingredient) => !existingIngredientIds.has(ingredient.id))
          .map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            emoji: ingredient.emoji,
            color: ingredient.color,
            slug: ingredient.slug,
          }))
      : [];

    const ingredients =
      additionalIngredients.length > 0
        ? [...existingIngredients, ...additionalIngredients]
        : existingIngredients;

    const updatedProduct = new ProductEntity(
      updateProductInput.name ?? product.name,
      updateProductInput.description ?? product.description,
      updateProductInput.price ?? product.price,
      updateProductInput.image ?? product.image,
      updateProductInput.categoryId ?? product.categoryId,
      product.id,
      product.createdAt,
      product.slug,
      product.category,
      ingredients,
    );

    return await this.productRepository.updateProduct(updatedProduct);
  }

  private async findProductOrNull(
    productId: string,
  ): Promise<ProductEntity | null> {
    try {
      return await this.productRepository.findOne(productId);
    } catch (error) {
      if (this.isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }

  private isNotFoundError(error: unknown): error is Error {
    if (!(error instanceof Error)) {
      return false;
    }

    const statusCode = (error as { statusCode?: number }).statusCode;

    if (typeof statusCode === 'number') {
      return statusCode === 404;
    }

    return error.name === 'NotFoundProductError';
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

type ProductIngredientView = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  slug: string;
};
