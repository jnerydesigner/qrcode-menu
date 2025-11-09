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
  ) {}

  async execute(
    productId: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductEntity | null> {
    const product = await this.findProductOrNull(productId);

    if (!product) {
      return null;
    }

    const requestedIngredientIds =
      updateProductInput.productIngredient?.map((p) => p.ingredientId) ?? [];

    console.log('2️⃣ requestedIngredientIds', requestedIngredientIds);

    const productIngredientMany = await Promise.all(
      requestedIngredientIds.map(async (ingredientId) => {
        const ingredient = await this.ingredientRepository.findId(ingredientId);

        console.log('🔍 ingredient found:', ingredient);
        if (!ingredient) {
          throw new Error(`Ingrediente com ID ${ingredientId} não encontrado.`);
        }

        return ingredient;
      }),
    );

    console.log('3️⃣ productIngredientMany', productIngredientMany);

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
      productIngredientMany,
    );

    // Atualiza no repositório
    return await this.productRepository.updateProduct(updatedProduct);
  }

  private async findProductOrNull(
    productId: string,
  ): Promise<ProductEntity | null> {
    try {
      const product = await this.productRepository.findOne(productId);
      console.log('✅ Found product:', product);
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
