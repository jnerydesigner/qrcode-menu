import { IngredientEntity } from '@domain/entities/ingredient.entity';
import { Ingredient } from '@prisma/client';
import { Ingredient as IngredientMongo } from '@infra/database/mongo/schema/ingredient.schema';
import { Types } from 'mongoose';

export class IngredientMapper {
  static toPersistent(ingredient: IngredientEntity): Ingredient {
    return {
      id: ingredient.id,
      color: ingredient.color,
      emoji: ingredient.emoji,
      createdAt: ingredient.createdAt,
      name: ingredient.name,
      slug: ingredient.slug,
    };
  }

  static toDomain(ingredient: Ingredient): IngredientEntity {
    return new IngredientEntity(
      ingredient.emoji,
      ingredient.color,
      ingredient.name,
      ingredient.id,
      ingredient.createdAt,
      ingredient.slug,
    );
  }

  static toMongo(
    ingredient: IngredientEntity,
  ): Partial<IngredientMongo> & { _id?: Types.ObjectId } {
    const payload: Partial<IngredientMongo> & { _id?: Types.ObjectId } = {
      color: ingredient.color,
      emoji: ingredient.emoji,
      name: ingredient.name,
      slug: ingredient.slug,
      created_at: ingredient.createdAt,
    };

    if (ingredient.id) {
      payload._id = new Types.ObjectId(ingredient.id);
    }

    return payload;
  }

  static fromMongo(
    ingredientMongo: IngredientMongo & { created_at?: Date },
  ): IngredientEntity {
    return new IngredientEntity(
      ingredientMongo.emoji,
      ingredientMongo.color,
      ingredientMongo.name,
      (ingredientMongo as any)._id?.toString?.() ?? (ingredientMongo as any).id,
      ingredientMongo.created_at || new Date(),
      ingredientMongo.slug,
    );
  }
}
