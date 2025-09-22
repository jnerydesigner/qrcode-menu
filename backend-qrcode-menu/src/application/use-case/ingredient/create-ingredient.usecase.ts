import { IngredientEntity } from '@domain/entities/ingredient.entity';
import {
  INGREDIENT_REPOSITORY,
  type IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateIngredientUseCase {
  constructor(
    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async execute(ingredient: CreateIngredientInput) {
    const ingredientEntity = new IngredientEntity(
      ingredient.emoji,
      ingredient.color,
      ingredient.name,
      null,
      null,
      '',
    );

    return this.ingredientRepository.save(ingredientEntity);
  }
}

export type CreateIngredientInput = {
  emoji: string;
  color: string;
  name: string;
};
