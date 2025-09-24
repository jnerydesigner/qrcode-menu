import { ErrorMessage } from '@application/dtos/error.message.dto';
import { CategoryEntity } from '@domain/entities/category.entity';
import { Category as CategoryPrisma } from '@prisma/client';

export interface CategoryRepository {
  create(data: CategoryEntity): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  deleteCategory(categoryId: string): Promise<void | ErrorMessage>;
  findCategory(categoryId: string): Promise<CategoryPrisma>;
  updateCategory(data: CategoryEntity): Promise<CategoryEntity>;
}

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');
