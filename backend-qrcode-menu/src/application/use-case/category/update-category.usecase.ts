import { CategoryEntity } from '@domain/entities/category.entity';
import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
} from '@domain/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  execute(categoryId: string, name: string) {
    console.log(name);
    const category = new CategoryEntity(name, categoryId, null, '');
    return this.categoryRepository.updateCategory(category);
  }
}
