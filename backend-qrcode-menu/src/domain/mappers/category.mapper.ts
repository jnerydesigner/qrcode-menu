import { CategoryEntity } from '@domain/entities/category.entity';
import { Category as CategoryMongo } from '@infra/database/mongo/schema/category.schema';
import { Types } from 'mongoose';

export class CategoryMapper {
  static toMongo(
    categoryEntity: CategoryEntity,
  ): Partial<CategoryMongo> & { _id?: Types.ObjectId } {
    const payload: Partial<CategoryMongo> & { _id?: Types.ObjectId } = {
      name: categoryEntity.name,
      slug: categoryEntity.slug,
      created_at: categoryEntity.createdAt,
    };

    if (categoryEntity.id) {
      payload._id = new Types.ObjectId(categoryEntity.id);
    }

    return payload;
  }

  static fromMongo(
    categoryMongo: CategoryMongo & { created_at?: Date },
  ): CategoryEntity {
    return new CategoryEntity(
      categoryMongo.name,
      (categoryMongo as any)._id?.toString?.() ?? (categoryMongo as any).id,
      categoryMongo.created_at || new Date(),
      categoryMongo.slug,
    );
  }
}
