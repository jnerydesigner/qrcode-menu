/* eslint-disable @typescript-eslint/no-base-to-string */
import { ProductEntity } from '@domain/entities/product.entity';
import { Product as ProductMongo } from '@infra/database/mongo/schema/product.schema';
import { Types } from 'mongoose';
import { Company } from '@domain/entities/company.entity';

export class ProductMapper {
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

    const companyObjectId =
      product.company && Types.ObjectId.isValid(product.company)
        ? new Types.ObjectId(product.company)
        : undefined;

    const payload: Partial<ProductMongo> & { _id?: Types.ObjectId } = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      slug: product.slug,
      created_at: product.createdAt,
      company: companyObjectId,
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
      category?:
        | {
            _id?: Types.ObjectId;
            id?: string;
            name: string;
            slug: string;
          }
        | Types.ObjectId;
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
        | null
        | undefined
      )[];
    },
  ): ProductEntity {
    // 👇 Tipagem explícita para o elemento do map
    const ingredients = (productMongo.ingredients ?? [])
      .map(
        (
          ingredient:
            | {
                _id?: Types.ObjectId;
                id?: string;
                name: string;
                emoji: string;
                color: string;
                slug: string;
              }
            | Types.ObjectId
            | null
            | undefined,
        ): {
          id: string;
          name: string;
          emoji: string;
          color: string;
          slug: string;
        } | null => {
          // Ignora nulos, undefined e ObjectId puro
          if (!ingredient || ingredient instanceof Types.ObjectId) {
            return null;
          }

          // Converte o objeto populado em ProductIngredientView
          return {
            id: (ingredient as any).id ?? ingredient._id?.toString() ?? '',
            name: ingredient.name,
            emoji: ingredient.emoji,
            color: ingredient.color,
            slug: ingredient.slug,
          };
        },
      )
      .filter(
        (
          ingredient,
        ): ingredient is {
          id: string;
          name: string;
          emoji: string;
          color: string;
          slug: string;
        } => ingredient !== null,
      );

      console.log("From Mongo Mapper", JSON.stringify(ingredients))

    // Categoria (populate ou ObjectId)
    const category = productMongo.category;
    const c = productMongo.company as any;

    const companyEntity = new Company(
      c.name,
      c.id ?? c._id?.toString() ?? null,
      c.created_at,
      c.slug,
      c.image,
    );

    console.log("From Mongo Mapper", JSON.stringify(companyEntity))
    const mappedCategory =
      category && !(category instanceof Types.ObjectId)
        ? {
            name: category.name,
            slug: category.slug,
          }
        : undefined;

    // ID da categoria (String)
    const categoryId =
      category instanceof Types.ObjectId
        ? category.toHexString()
        : category && 'id' in category && category.id
          ? (category as { id: string }).id
          : ((productMongo as any).categoryId ??
            category?._id?.toHexString() ??
            '');

    const companyId =
      (productMongo.company as any)?._id?.toString?.() ??
      (productMongo.company as any)?.id ??
      productMongo.company?.toString?.();

    console.log('Company Mapper', companyEntity);
    // Cria a entidade de domínio
    return new ProductEntity(
      productMongo.name,
      productMongo.description,
      productMongo.price,
      productMongo.image,
      categoryId,
      productMongo.slug,
      productMongo.created_at || new Date(),
      companyId,
      mappedCategory,
      ingredients,
      (productMongo as any)._id?.toString?.() ?? (productMongo as any).id,

      companyEntity,
    );
  }
}
