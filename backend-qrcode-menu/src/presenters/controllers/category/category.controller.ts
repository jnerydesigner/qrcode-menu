import { type CreateCategoryInputDTO } from '@application/dtos/create-category-input.dto';
import { CreateCategoryUsecase } from '@application/use-case/category/create-category.usecase';
import { DeleteCategoryUseCase } from '@application/use-case/category/delete-category.usecase';
import { FindAllCategoryUsecase } from '@application/use-case/category/find-all-category.usecase';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly findAllCategoryUsecase: FindAllCategoryUsecase,
    private readonly deleteCategoryUsecase: DeleteCategoryUseCase,
  ) {}

  @Post()
  createCategory(@Body() data: CreateCategoryInputDTO) {
    return this.createCategoryUsecase.execute(data.name);
  }

  @Get()
  findAll() {
    return this.findAllCategoryUsecase.execute();
  }

  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    this.deleteCategoryUsecase.execute(categoryId);
  }
}
