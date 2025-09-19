import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
} from '@domain/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategoryUsecase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async execute() {
    return await this.categoryRepository.findAll();
  }
}
