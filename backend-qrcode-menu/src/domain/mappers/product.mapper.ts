import { ProductEntity } from '@domain/entities/product.entity';
import { Products, Prisma } from '@prisma/client';
import { Product as ProductMongo } from '@infra/database/mongo/schema/product.schema';
import { Types } from 'mongoose';

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

  static toMongo(
    product: ProductEntity,
  ): Partial<ProductMongo> & { _id?: Types.ObjectId } {
    const ingredients = product.ingredients ?? [];
    const categoryObjectId = Types.ObjectId.isValid(product.categoryId)
      ? new Types.ObjectId(product.categoryId)
      : null;

    if (!categoryObjectId) {
      throw new Error(`Invalid category identifier: ${product.categoryId}`);
    }

    const ingredientObjectIds = ingredients.map((ingredient) => {
      if (!Types.ObjectId.isValid(ingredient.id)) {
        throw new Error(`Invalid ingredient identifier: ${ingredient.id}`);
      }

      return new Types.ObjectId(ingredient.id);
    });

    const payload: Partial<ProductMongo> & { _id?: Types.ObjectId } = {
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      slug: product.slug,
      created_at: product.createdAt,
      category: categoryObjectId,
      ingredients: ingredientObjectIds,
    };

    if (product.id) {
      payload._id = new Types.ObjectId(product.id);
    }

    return payload;
  }

  static fromMongo(
    productMongo: ProductMongo & {
      created_at?: Date;
      category?: { _id?: Types.ObjectId; name: string; slug: string };
      ingredients?: (
        | {
            _id?: Types.ObjectId;
            id?: string;
            name: string;
            emoji: string;
            color: string;
            slug: string;
          }
        | Types.ObjectId
      )[];
    },
  ): ProductEntity {
    const ingredients = (productMongo.ingredients ?? [])
      .map((ingredient) => {
        if (
          ingredient instanceof Types.ObjectId ||
          ingredient === null ||
          ingredient === undefined
        ) {
          return null;
        }

        return {
          id:
            'id' in ingredient && ingredient.id
              ? ingredient.id
              : ingredient._id?.toString() ?? '',
          name: ingredient.name,
          emoji: ingredient.emoji,
          color: ingredient.color,
          slug: ingredient.slug,
        };
      })
      .filter((ingredient): ingredient is {
        id: string;
        name: string;
        emoji: string;
        color: string;
        slug: string;
      } => Boolean(ingredient));

    const category = productMongo.category;
    const mappedCategory =
      category && !(category instanceof Types.ObjectId)
        ? {
            name: category.name,
            slug: category.slug,
          }
        : undefined;

    const categoryId = category instanceof Types.ObjectId
      ? category.toHexString()
      : category && 'id' in category && category.id
        ? (category as { id: string }).id
        : (productMongo as any).categoryId ?? category?._id?.toHexString() ?? '';

    return new ProductEntity(
      productMongo.name,
      productMongo.description,
      productMongo.price,
      productMongo.image,
      categoryId,
      (productMongo as any)._id?.toString?.() ?? (productMongo as any).id,
      productMongo.created_at || new Date(),
      productMongo.slug,
      mappedCategory,
      ingredients,
    );
  }
}
