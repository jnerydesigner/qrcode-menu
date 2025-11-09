import { ProductEntity } from '@domain/entities/product.entity';
import { ProductMapper } from '@domain/mappers/product.mapper';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ExistsProductError } from '@infra/errors/exists-product.error';
import { NotFoundProductError } from '@infra/errors/notfound.error';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product as ProductMongo } from '../schema/product.schema';
import { Category as CategoryMongo } from '../schema/category.schema';
import { Ingredient as IngredientMongo } from '../schema/ingredient.schema';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
    @InjectModel(CategoryMongo.name)
    private readonly categoryModel: Model<CategoryMongo>,
    @InjectModel(IngredientMongo.name)
    private readonly ingredientModel: Model<IngredientMongo>,
  ) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    const exists = await this.productModel.exists({ slug: product.slug });

    if (exists) {
      throw new ExistsProductError(
        `A produto com slug "${product.slug}" já existe.`,
      );
    }

    const productMapper = ProductMapper.toMongo(product);
    const created = new this.productModel(productMapper);
    const saved = await created.save();

    await this.categoryModel.updateOne(
      { _id: productMapper.category as Types.ObjectId },
      { $addToSet: { products: saved._id } },
    );

    const ingredientIds = (productMapper.ingredients ?? []) as Types.ObjectId[];
    if (ingredientIds.length > 0) {
      await this.ingredientModel.updateMany(
        { _id: { $in: ingredientIds } },
        { $addToSet: { products: saved._id } },
      );
    }

    const populatedProduct = await this.productModel
      .findById(saved._id)
      .populate('category')
      .populate('ingredients')
      .lean();

    return ProductMapper.fromMongo(
      populatedProduct as unknown as ProductMongo & { created_at?: Date },
    );
  }

  async findProductBySlug(slug: string): Promise<boolean> {
    const exists = await this.productModel.exists({ slug });
    return Boolean(exists);
  }

  async findOne(productId: string): Promise<ProductEntity> {
    const product = await this.productModel
      .findById(productId)
      .populate('category')
      .populate('ingredients')
      .lean();

    if (!product) {
      throw new NotFoundProductError(`Product id ${productId} not exists`);
    }

    return ProductMapper.fromMongo(
      product as unknown as ProductMongo & {
        created_at?: Date;
        category?: { name: string; slug: string };
      },
    );
  }

  async findOneSlug(slug: string): Promise<ProductEntity> {
    const product = await this.productModel
      .findOne({ slug })
      .populate('category')
      .populate('ingredients')
      .lean();

    if (!product) {
      throw new NotFoundProductError(`Product slug ${slug} not exists`);
    }

    return ProductMapper.fromMongo(
      product as unknown as ProductMongo & {
        created_at?: Date;
        category?: { name: string; slug: string };
      },
    );
  }

  async saveMany(products: ProductEntity[]): Promise<ProductEntity[]> {
    const savedProducts: ProductEntity[] = [];

    for (const product of products) {
      const exists = await this.productModel.exists({ slug: product.slug });

      if (!exists) {
        const productMapper = ProductMapper.toMongo(product);
        const created = new this.productModel(productMapper);
        const saved = await created.save();

        await this.categoryModel.updateOne(
          { _id: productMapper.category as Types.ObjectId },
          { $addToSet: { products: saved._id } },
        );

        const ingredientIds = (productMapper.ingredients ?? []) as Types.ObjectId[];
        if (ingredientIds.length > 0) {
          await this.ingredientModel.updateMany(
            { _id: { $in: ingredientIds } },
            { $addToSet: { products: saved._id } },
          );
        }

        const populatedProduct = await this.productModel
          .findById(saved._id)
          .populate('category')
          .populate('ingredients')
          .lean();

        savedProducts.push(
          ProductMapper.fromMongo(
            populatedProduct as unknown as ProductMongo & { created_at?: Date },
          ),
        );
      }
    }

    return savedProducts;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel
      .find()
      .sort({ created_at: -1 })
      .populate('category')
      .populate('ingredients')
      .lean();

    return products.map((product) =>
      ProductMapper.fromMongo(
        product as unknown as ProductMongo & {
          created_at?: Date;
          category?: { name: string; slug: string };
        },
      ),
    );
  }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    const mongoUpdateMapper = ProductMapper.toMongo(product);

    const currentProduct = await this.productModel
      .findById(product.id)
      .lean();

    if (!currentProduct) {
      throw new NotFoundProductError(`Product id ${product.id} not exists`);
    }

    const { _id, created_at, ...updatePayload } = mongoUpdateMapper;

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(product.id, updatePayload, { new: true })
      .populate('category')
      .populate('ingredients')
      .lean();

    if (!updatedProduct) {
      throw new NotFoundProductError(`Product id ${product.id} not exists`);
    }

    const currentCategoryId = (currentProduct.category as Types.ObjectId)?.toHexString?.()
      ?? (currentProduct as any).categoryId
      ?? '';
    const nextCategoryId = product.categoryId;

    if (currentCategoryId && currentCategoryId !== nextCategoryId) {
      await this.categoryModel.updateOne(
        { _id: new Types.ObjectId(currentCategoryId) },
        { $pull: { products: new Types.ObjectId(product.id) } },
      );
    }

    await this.categoryModel.updateOne(
      { _id: new Types.ObjectId(nextCategoryId) },
      { $addToSet: { products: new Types.ObjectId(product.id) } },
    );

    const currentIngredientIds = (currentProduct.ingredients ?? []).map((id) =>
      id instanceof Types.ObjectId ? id.toHexString() : id?.toString?.() ?? '',
    );
    const nextIngredientIds = ((updatePayload.ingredients ?? []) as Types.ObjectId[]).map(
      (id) => id.toHexString(),
    );

    const ingredientIdsToRemove = currentIngredientIds.filter(
      (id) => id && !nextIngredientIds.includes(id),
    );
    const ingredientIdsToAdd = nextIngredientIds.filter(
      (id) => id && !currentIngredientIds.includes(id),
    );

    if (ingredientIdsToRemove.length > 0) {
      await this.ingredientModel.updateMany(
        {
          _id: {
            $in: ingredientIdsToRemove.map((id) => new Types.ObjectId(id)),
          },
        },
        { $pull: { products: new Types.ObjectId(product.id) } },
      );
    }

    if (ingredientIdsToAdd.length > 0) {
      await this.ingredientModel.updateMany(
        {
          _id: { $in: ingredientIdsToAdd.map((id) => new Types.ObjectId(id)) },
        },
        { $addToSet: { products: new Types.ObjectId(product.id) } },
      );
    }

    return ProductMapper.fromMongo(
      updatedProduct as unknown as ProductMongo & { created_at?: Date },
    );
  }
}
