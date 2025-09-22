import { CreateIngredientUseCase } from '@application/use-case/ingredient/create-ingredient.usecase';
import { CreateManyIngredientUseCase } from '@application/use-case/ingredient/create-many-ingredient.usecase';
import { FindAllIngredientsUseCase } from '@application/use-case/ingredient/find-all-ingredient.usecase';
import { Module } from '@nestjs/common';
import { IngredientController } from '@presenters/controllers/ingredient/ingredient.controller';

@Module({
  controllers: [IngredientController],
  providers: [
    CreateIngredientUseCase,
    CreateManyIngredientUseCase,
    FindAllIngredientsUseCase,
  ],
})
export class IngredientModule {}
