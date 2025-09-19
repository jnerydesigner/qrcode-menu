import { CategoryEntity } from '@domain/entities/category.entity';
import { Category as CategoryPrisma } from '@prisma/client';

export interface CategoryRepository {
  create(data: CategoryEntity): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  deleteCategory(categoryId: string): Promise<void>;
  findCategory(categoryId: string): Promise<CategoryPrisma>;
}

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');
