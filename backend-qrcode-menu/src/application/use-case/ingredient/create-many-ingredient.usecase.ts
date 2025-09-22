import { IngredientEntity } from '@domain/entities/ingredient.entity';
import {
  INGREDIENT_REPOSITORY,
  type IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateManyIngredientUseCase {
  constructor(
    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async execute(ingredients: CreateIngredientInput[]) {
    const ingredientsMany = ingredients.map((ingredient) => {
      return new IngredientEntity(
        ingredient.emoji,
        ingredient.color,
        ingredient.name,
        null,
        null,
        '',
      );
    });

    return this.ingredientRepository.saveMany(ingredientsMany);
  }
}

export type CreateIngredientInput = {
  emoji: string;
  color: string;
  name: string;
};
