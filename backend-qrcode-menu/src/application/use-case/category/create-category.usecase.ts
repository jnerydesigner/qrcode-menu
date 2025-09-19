import { CategoryEntity } from '@domain/entities/category.entity';
import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
} from '@domain/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryUsecase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async execute(name: string) {
    const category = new CategoryEntity(name, null, null, '');

    return await this.categoryRepository.create(category);
  }
}
