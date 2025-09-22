import { IngredientEntity } from '@domain/entities/ingredient.entity';
import { Ingredient } from '@prisma/client';

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
}
