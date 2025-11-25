/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { type CreateCategoryInputDTO } from '@application/dtos/create-category-input.dto';
import { CreateCategoryUsecase as CreateCategoryUseCase } from '@application/use-case/category/create-category.usecase';
import { DeleteCategoryUseCase } from '@application/use-case/category/delete-category.usecase';
import { FindAllCategoryUsecase as FindAllCategoryUseCase } from '@application/use-case/category/find-all-category.usecase';
import { FindOneCategoryUseCase } from '@application/use-case/category/find-one-category.usecase';
import { UpdateCategoryUseCase } from '@application/use-case/category/update-category.usecase';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUseCase,
    private readonly findAllCategoryUsecase: FindAllCategoryUseCase,
    private readonly deleteCategoryUsecase: DeleteCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
  ) { }

  @Post()
  createCategory(@Body() data: CreateCategoryInputDTO) {
    return this.createCategoryUsecase.execute(data.name);
  }

  @Get()
  findAll() {
    return this.findAllCategoryUsecase.execute();
  }

  @Delete('/:categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ) {
    const result = await this.deleteCategoryUsecase.execute(categoryId);

    if (result && result.status !== HttpStatus.OK) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get('/:categoryId')
  findOneCategory(
    @Param('categoryId') categoryId: string,
  ) {
    console.log(categoryId);
    return this.findOneCategoryUseCase.execute(categoryId);
  }

  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: { name: string },
  ) {
    return this.updateCategoryUseCase.execute(categoryId, data.name);
  }
}
