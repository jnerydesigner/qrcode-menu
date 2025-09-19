import { CategoryEntity } from '@domain/entities/category.entity';
import { Category as CategoryPrisma } from '@prisma/client';

export class CategoryMapper {
  static toPersistent(category: CategoryEntity): CategoryPrisma {
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
}
