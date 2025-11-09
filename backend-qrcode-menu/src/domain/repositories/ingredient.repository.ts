import { IngredientEntity } from '@domain/entities/ingredient.entity';

export interface IngredientRepository {
  save(ingredient: IngredientEntity): Promise<IngredientEntity>;
  saveMany(ingredients: IngredientEntity[]): Promise<IngredientEntity[]>;
  findAll(): Promise<IngredientEntity[]>;
  findId(ingredientId: string): Promise<IngredientEntity>;
}

export const INGREDIENT_REPOSITORY = Symbol('INGREDIENT_REPOSITORY');
