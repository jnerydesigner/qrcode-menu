import { ProductEntity } from '@domain/entities/product.entity';
import { ProductMapper } from '@domain/mappers/product.mapper';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ExistsProductError } from '@infra/errors/exists-product.error';
import { NotFoundProductError } from '@infra/errors/notfound.error';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product as ProductMongo } from '../schema/product.schema';
import { Category as CategoryMongo } from '../schema/category.schema';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
    @InjectModel(CategoryMongo.name)
    private readonly categoryModel: Model<CategoryMongo>,
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

    return ProductMapper.fromMongo(saved.toObject());
  }

  async findProductBySlug(slug: string): Promise<boolean> {
    const exists = await this.productModel.exists({ slug });
    return Boolean(exists);
  }

  async findOne(productId: string): Promise<ProductEntity> {
    const product = await this.productModel.findOne({ id: productId }).lean();
    console.log({ product });

    if (!product) {
      throw new NotFoundProductError(`Product id ${productId} not exists`);
    }

    console.log(product);

    return ProductMapper.fromMongo(
      product as unknown as ProductMongo & {
        created_at?: Date;
        category?: { name: string; slug: string };
        productIngredient?: {
          id: string;
          name: string;
          emoji: string;
          color: string;
          slug: string;
        }[];
      },
    );
  }

  async findOneSlug(slug: string): Promise<ProductEntity> {
    const product = await this.productModel.findOne({ slug }).lean();

    if (!product) {
      throw new NotFoundProductError(`Product slug ${slug} not exists`);
    }

    const category = await this.categoryModel
      .findOne({ id: product.categoryId })
      .lean();

    const mappedProduct = {
      ...product,
      category: {
        id: category?.id ?? '',
        name: category?.name ?? '',
        slug: category?.slug ?? '',
      },
    };

    return ProductMapper.fromMongo(
      mappedProduct as unknown as ProductMongo & {
        created_at?: Date;
        category?: { id: string; name: string; slug: string };
        productIngredient?: {
          id: string;
          name: string;
          emoji: string;
          color: string;
          slug: string;
        }[];
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

        savedProducts.push(ProductMapper.fromMongo(saved.toObject()));
      }
    }

    return savedProducts;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    const mappedProducts = await Promise.all(
      products.map(async (product) => {
        const category = await this.categoryModel
          .findOne({ id: product.categoryId })
          .lean();

        return {
          ...product,
          category: {
            id: category?.id ?? '',
            name: category?.name ?? '',
            slug: category?.slug ?? '',
          },
        };
      }),
    );

    console.log({ mappedProducts });

    return mappedProducts.map((product) =>
      ProductMapper.fromMongo(
        product as unknown as ProductMongo & {
          created_at?: Date;
          category?: { name: string; slug: string };
          productIngredient?: {
            id: string;
            name: string;
            emoji: string;
            color: string;
            slug: string;
          }[];
        },
      ),
    );
  }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    const mongoUpdateMapper = ProductMapper.toMongo(product);

    // 🔍 Busca o produto atual
    const currentProduct = await this.productModel
      .findOne({ id: product.id })
      .lean();
    if (!currentProduct) {
      throw new NotFoundProductError(`Product id ${product.id} not exists`);
    }

    // 🔄 Faz o merge entre os ingredientes atuais e os novos
    const mergedIngredients = [
      ...(currentProduct.productIngredient ?? []),
      ...(mongoUpdateMapper.productIngredient ?? []),
    ];

    // 🔧 Monta o objeto atualizado
    const updateData = {
      ...mongoUpdateMapper,
      productIngredient: mergedIngredients,
    };

    const updatedProduct = await this.productModel
      .findOneAndUpdate({ id: product.id }, updateData, { new: true })
      .lean();

    return ProductMapper.fromMongo(
      updatedProduct as unknown as ProductMongo & { created_at?: Date },
    );
  }
}
