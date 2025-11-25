import { CreateCategoryUsecase } from '@application/use-case/category/create-category.usecase';
import { DeleteCategoryUseCase } from '@application/use-case/category/delete-category.usecase';
import { FindAllCategoryUsecase } from '@application/use-case/category/find-all-category.usecase';
import { FindOneCategoryUseCase } from '@application/use-case/category/find-one-category.usecase';
import { UpdateCategoryUseCase } from '@application/use-case/category/update-category.usecase';
import { Module } from '@nestjs/common';
import { CategoryController } from '@presenters/controllers/category/category.controller';

@Module({
  providers: [
    CreateCategoryUsecase,
    FindAllCategoryUsecase,
    DeleteCategoryUseCase,
    UpdateCategoryUseCase,
    FindOneCategoryUseCase
  ],
  controllers: [CategoryController],
})
export class CategoryModule { }
