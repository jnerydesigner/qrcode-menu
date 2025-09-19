import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
} from '@domain/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  execute(categoryId: string) {
    return this.categoryRepository.deleteCategory(categoryId);
  }
}
