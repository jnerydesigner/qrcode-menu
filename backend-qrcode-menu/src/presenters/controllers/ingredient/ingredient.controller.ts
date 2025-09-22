import {
  type CreateIngredientInput,
  CreateIngredientUseCase,
} from '@application/use-case/ingredient/create-ingredient.usecase';
import { CreateManyIngredientUseCase } from '@application/use-case/ingredient/create-many-ingredient.usecase';
import { FindAllIngredientsUseCase } from '@application/use-case/ingredient/find-all-ingredient.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('ingredients')
export class IngredientController {
  constructor(
    private readonly createIngredientUseCase: CreateIngredientUseCase,
    private readonly createManyIngredientUseCase: CreateManyIngredientUseCase,
    private readonly findAllIngredientsUseCase: FindAllIngredientsUseCase,
  ) {}

  @Post()
  createIngredient(@Body() createIngredientBody: CreateIngredientInput) {
    return this.createIngredientUseCase.execute(createIngredientBody);
  }

  @Post('/many')
  createManyIngredients(
    @Body() createIngredientsBody: CreateIngredientInput[],
  ) {
    return this.createManyIngredientUseCase.execute(createIngredientsBody);
  }

  @Get()
  findAll() {
    return this.findAllIngredientsUseCase.execute();
  }
}
