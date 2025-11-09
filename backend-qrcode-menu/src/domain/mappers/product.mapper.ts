import { ProductEntity } from '@domain/entities/product.entity';
import { Products, Prisma } from '@prisma/client';
import { Product as ProductMongo } from '@infra/database/mongo/schema/product.schema';

export class ProductMapper {
  static toPersistent(product: ProductEntity): Products {
    return {
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      image: product.image,
      price: new Prisma.Decimal(product.price),
      slug: product.slug,
      createdAt: product.createdAt,
    };
  }

  static toDomain(
    product: Products & {
      category?: { name: string; slug: string };
      productIngredient?: {
        ingredient: {
          id: string;
          name: string;
          emoji: string;
          color: string;
          slug: string;
        };
      }[];
    },
  ): ProductEntity {
    const ingredients =
      product.productIngredient?.map((pi) => ({
        id: pi.ingredient.id,
        name: pi.ingredient.name,
        emoji: pi.ingredient.emoji,
        color: pi.ingredient.color,
        slug: pi.ingredient.slug,
      })) ?? [];

    return new ProductEntity(
      product.name,
      product.description,
      product.price.toNumber(),
      product.image,
      product.categoryId,
      product.id,
      product.createdAt,
      product.slug,
      product.category,
      ingredients,
    );
  }

  static toMongo(product: ProductEntity): Partial<ProductMongo> {
    const productIngredients = product.productIngredient ?? [];

    return {
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      slug: product.slug,
      created_at: product.createdAt,

      productIngredient: productIngredients.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        emoji: ingredient.emoji,
        color: ingredient.color,
        slug: ingredient.slug,
      })),
    };
  }

  static fromMongo(
    productMongo: ProductMongo & {
      created_at?: Date;
      category?: { name: string; slug: string };
      productIngredient?: {
        id: string;
        name: string;
        emoji: string;
        color: string;
        slug: string;
      }[];
    },
  ): ProductEntity {
    const ingredients =
      productMongo.productIngredient?.map((pi) => ({
        id: pi.id,
        name: pi.name,
        emoji: pi.emoji,
        color: pi.color,
        slug: pi.slug,
      })) ?? [];

    return new ProductEntity(
      productMongo.name,
      productMongo.description,
      productMongo.price,
      productMongo.image,
      productMongo.categoryId,
      productMongo.id,
      productMongo.created_at || new Date(),
      productMongo.slug,
      productMongo.category,
      ingredients,
    );
  }
}
