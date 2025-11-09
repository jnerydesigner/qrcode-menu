import { CategoryEntity } from '@domain/entities/category.entity';
import {
  Prisma,
  Category as CategoryPrisma,
} from '@prisma/client';
import { Category as CategoryMongo } from '@infra/database/mongo/schema/category.schema';

export class CategoryMapper {
  static toPersistent(
    category: CategoryEntity,
  ): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      slug: category.slug,
    };
  }

  static toDomain(categoryPersistent: CategoryPrisma): CategoryEntity {
    return new CategoryEntity(
      categoryPersistent.name,
      categoryPersistent.id,
      categoryPersistent.createdAt,
      categoryPersistent.slug,
    );
  }

  static toMongo(categoryEntity: CategoryEntity): Partial<CategoryMongo> {
    return {
      id: categoryEntity.id,
      name: categoryEntity.name,
      slug: categoryEntity.slug,
    };
  }

  static fromMongo(
    categoryMongo: CategoryMongo & { created_at?: Date },
  ): CategoryEntity {
    return new CategoryEntity(
      categoryMongo.name,
      categoryMongo.id,
      categoryMongo.created_at || new Date(),
      categoryMongo.slug,
    );
  }
}
