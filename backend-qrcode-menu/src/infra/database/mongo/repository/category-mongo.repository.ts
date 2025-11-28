import { ErrorMessage } from '@application/dtos/error.message.dto';
import { CategoryEntity } from '@domain/entities/category.entity';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Category as CategoryMongo } from '../schema/category.schema';
import { Model } from 'mongoose';
import { CategoryMapper } from '@domain/mappers/category.mapper';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product as ProductMongo } from '../schema/product.schema';
import { toObjectId } from '@infra/utils/objectid-converter.util';

@Injectable()
export class CategoryMongoRepository implements CategoryRepository {
  constructor(
    @InjectModel(CategoryMongo.name)
    private readonly categoryModel: Model<CategoryMongo>,

    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
  ) { }


  async create(data: CategoryEntity): Promise<any> {
    const categoryMapper = CategoryMapper.toMongo(data);
    const created = new this.categoryModel(categoryMapper);
    const saved = await created.save();
    return CategoryMapper.fromMongo(saved.toObject());
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoryModel
      .find()
      .sort({ created_at: -1 })
      .lean();
    return categories.map((category) =>
      CategoryMapper.fromMongo(
        category as CategoryMongo & { created_at?: Date },
      ),
    );
  }
  async deleteCategory(categoryId: string): Promise<void | ErrorMessage> {
    const category = await this.categoryModel.findById(categoryId).lean();

    if (!category) {
      throw new NotFoundException('Category Not Exists');
    }
    const hasProducts = await this.productModel.exists({
      category: categoryId,
    });

    if (hasProducts) {
      return {
        status: HttpStatus.EXPECTATION_FAILED,
        message: 'Category is not empty',
      };
    }

    await this.categoryModel.deleteOne({ _id: categoryId });
  }
  async findCategory(categoryId: string): Promise<CategoryEntity> {
    const category = await this.categoryModel.findById(categoryId).lean();

    if (!category) {
      throw new NotFoundException('Category Not Exists');
    }

    return CategoryMapper.fromMongo(
      category as CategoryMongo & { created_at?: Date },
    );
  }
  async updateCategory(data: CategoryEntity): Promise<CategoryEntity> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(
        data.id,
        {
          $set: {
            name: data.name,
            slug: data.slug,
          },
        },
        { new: true },
      )
      .lean();

    if (!updatedCategory) {
      throw new NotFoundException('Category not exists');
    }

    return CategoryMapper.fromMongo(
      updatedCategory as CategoryMongo & { created_at?: Date },
    );
  }

  async findOneById(categoryId: string): Promise<CategoryEntity> {
    const findCategory = await this.categoryModel.findById(toObjectId(categoryId)).lean();

    if (!findCategory) {
      throw new NotFoundException('Category Not Exists');
    }

    return CategoryMapper.fromMongo(
      findCategory as CategoryMongo & { created_at?: Date },
    );
  }
}
