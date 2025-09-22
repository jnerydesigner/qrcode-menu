import {
  INGREDIENT_REPOSITORY,
  type IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllIngredientsUseCase {
  constructor(
    @Inject(INGREDIENT_REPOSITORY)
    private readonly ingredientRepository: IngredientRepository,
  ) {}
  execute() {
    return this.ingredientRepository.findAll();
  }
}
