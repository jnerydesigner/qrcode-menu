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
import { toObjectId } from '@infra/utils/objectid-converter.util';

export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,

    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) { }

  async execute(
    productId: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductEntity | null> {

    const product = await this.findProductOrNull(productId);


    if (!product) {
      return null;
    }

    const requestedIngredientIds = updateProductInput.productIngredient?.map(p => p.ingredientId) ?? [];
    // Fetch all requested ingredients in a single batch
    const ingredients = await this.ingredientRepository.findManyByIds(requestedIngredientIds);
    // Validate that all requested ingredients exist
    const missingIds = requestedIngredientIds.filter(id => !ingredients.find(ing => ing.id === id));
    if (missingIds.length) {
      throw new Error(`Ingrediente(s) com ID ${missingIds.join(', ')} não encontrado(s).`);
    }
    const existingIngredients = product.ingredients ?? [];
    // Merge existing ingredients with newly fetched ones, avoiding duplicates
    const mergedIngredients = [
      ...existingIngredients,
      ...ingredients.filter(ing => !existingIngredients.some(e => e.id === ing.id)),
    ];
    const productIngredientMany = mergedIngredients;

    const updatedProduct = new ProductEntity(
      updateProductInput.name ?? product.name,
      updateProductInput.description ?? product.description,
      updateProductInput.price ?? product.price,
      updateProductInput.image ?? product.image,
      updateProductInput.categoryId ?? product.categoryId,
      product.slug,
      product.createdAt,
      product.company,
      product.category,
      productIngredientMany,
      product.id ?? '',
    );

    // Atualiza no repositório
    return await this.productRepository.updateProduct(updatedProduct);
  }

  private async findProductOrNull(
    productId: string,
  ): Promise<ProductEntity | null> {
    try {
      const product = await this.productRepository.findOne(productId);
      return product;
    } catch (error) {
      if (this.isNotFoundError(error)) {
        console.warn('⚠️ Product not found:', productId);
        return null;
      }

      throw error;
    }
  }

  private isNotFoundError(error: unknown): error is Error {
    if (!(error instanceof Error)) return false;

    const statusCode = (error as { statusCode?: number }).statusCode;

    if (typeof statusCode === 'number') {
      return statusCode === 404;
    }

    return error.name === 'NotFoundProductError';
  }
}

// ----------------------
// 🧩 Tipos auxiliares
// ----------------------

export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  productIngredient?: ProductIngredientInput[];
};

export type ProductIngredientInput = {
  ingredientId: string;
};

export type ProductIngredientView = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  slug: string;
};
