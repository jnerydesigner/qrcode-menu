import { ProductEntity } from '@domain/entities/product.entity';
import { ProductMapper } from '@domain/mappers/product.mapper';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ExistsProductError } from '@infra/errors/exists-product.error';
import { NotFoundProductError } from '@infra/errors/notfound.error';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product as ProductMongo } from '../schema/product.schema';
import { Category as CategoryMongo } from '../schema/category.schema';
import { Ingredient as IngredientMongo } from '../schema/ingredient.schema';
import { toObjectId } from '@infra/utils/objectid-converter.util';

type PopulatedProductMongo = ProductMongo & {
  created_at?: Date;
  category?: {
    _id?: Types.ObjectId;
    id?: string;
    name: string;
    slug: string;
  };
  ingredients?: (
    | Types.ObjectId
    | {
      _id?: Types.ObjectId;
      id?: string;
      name: string;
      emoji: string;
      color: string;
      slug: string;
    }
  )[];
};

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  private logger = new Logger('ProductMongoRepository');
  constructor(
    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
    @InjectModel(CategoryMongo.name)
    private readonly categoryModel: Model<CategoryMongo>,
    @InjectModel(IngredientMongo.name)
    private readonly ingredientModel: Model<IngredientMongo>,
  ) { }

  async save(product: ProductEntity): Promise<ProductEntity> {
    const exists = await this.productModel.exists({ slug: product.slug });

    if (exists) {
      throw new ExistsProductError(
        `A produto com slug "${product.slug}" já existe.`,
      );
    }

    const productMapper = ProductMapper.toMongo(product);

    console.log('Product Mapper', productMapper);
    const created = new this.productModel(productMapper);
    const saved = await created.save();

    console.log('Saved Product:', saved);

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
      .lean<PopulatedProductMongo>();

    if (!populatedProduct) {
      throw new NotFoundProductError(
        `Produto salvo não encontrado após persistência.`,
      );
    }

    return ProductMapper.fromMongo(populatedProduct);
  }

  async findProductBySlug(slug: string): Promise<boolean> {
    const exists = await this.productModel.exists({ slug });
    return Boolean(exists);
  }

  async findOne(productId: string): Promise<ProductEntity> {
    const prodId = toObjectId(productId);
    const product = await this.productModel
      .findById(prodId)
      .populate({
        path: 'category',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate({
        path: 'company',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate('ingredients')
      .lean<PopulatedProductMongo>();

    console.log('Product found One:', product);

    if (!product) {
      throw new NotFoundProductError(`Product id ${prodId} not exists`);
    }

    return ProductMapper.fromMongo(product);
  }

  async findOneSlug(slug: string): Promise<ProductEntity> {
    const product = await this.productModel
      .findOne({ slug })
      .populate({
        path: 'category',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate({
        path: 'company',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate('ingredients')
      .lean<PopulatedProductMongo>();

    console.log('Product found One:', product);
    if (!product) {
      throw new NotFoundProductError(`Product slug ${slug} not exists`);
    }

    return ProductMapper.fromMongo(product);
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

        const ingredientIds = (productMapper.ingredients ??
          []) as Types.ObjectId[];
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
          .lean<PopulatedProductMongo>();

        if (!populatedProduct) {
          throw new NotFoundProductError(
            `Produto salvo não encontrado após persistência.`,
          );
        }
        savedProducts.push(ProductMapper.fromMongo(populatedProduct));
      }
    }

    return savedProducts;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel
      .find()
      .sort({ created_at: -1 })
      .populate({
        path: 'category',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate({
        path: 'company',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate('ingredients')
      .lean();

    console.log('find all', products)

    const productsMapper = products.map((product) =>
      ProductMapper.fromMongo(product as PopulatedProductMongo),
    );

    this.logger.log(productsMapper);
    console.log('find all', productsMapper)

    return productsMapper;
  }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    if (!product.id) {
      throw new NotFoundException('Id não existe');
    }

    const productResponseMongo = await this.productModel.findById(
      toObjectId(product.id),
    );

    if (!productResponseMongo) {
      throw new NotFoundProductError(
        `Produto com ID ${product.id} não encontrado para atualização.`,
      );
    }

    // 🔍 Extrai os IDs já existentes no banco
    const existingIngredientIds = (
      (productResponseMongo.ingredients as Types.ObjectId[]) ?? []
    ).map((id) => id.toString());

    // 🔍 Extrai os IDs vindos do domínio
    const incomingIngredientIds =
      product.ingredients?.map((ing) => ing.id) ?? [];

    console.log('💾 existingIngredientIds (mongo):', existingIngredientIds);
    console.log('📦 incomingIngredientIds (domain):', incomingIngredientIds);

    // 🧮 Combina ambos os arrays, removendo duplicatas
    const mergedIngredientIds = Array.from(
      new Set([...existingIngredientIds, ...incomingIngredientIds]),
    );

    // ⚙️ Converte de volta para ObjectId[]
    const mergedObjectIds = mergedIngredientIds.map(
      (id) => new Types.ObjectId(id),
    );

    console.log('✅ mergedObjectIds (final):', mergedObjectIds);

    // 🚀 Atualiza apenas se houver diferença real
    const shouldUpdateIngredients =
      JSON.stringify(existingIngredientIds.sort()) !==
      JSON.stringify(incomingIngredientIds.sort());

    const updateData: Record<string, any> = {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      slug: product.slug,
      category: new Types.ObjectId(product.categoryId),
    };

    if (shouldUpdateIngredients) {
      updateData.ingredients = mergedObjectIds;
      console.log('🧩 Updating ingredients...');
    } else {
      console.log('🟡 Ingredients unchanged — skipping field update');
    }

    await this.productModel.updateOne(
      { _id: new Types.ObjectId(product.id) },
      { $set: updateData },
      { upsert: false },
    );

    // 🔁 Retorna o documento populado
    const updated = await this.productModel
      .findById(toObjectId(product.id))
      .populate('category')
      .populate('ingredients')
      .lean<PopulatedProductMongo>();

    if (!updated) {
      throw new Error(`Produto não encontrado após update`);
    }

    return ProductMapper.fromMongo(updated);
  }

  async removeIngredient(
    productId: string,
    ingredientId: string,
  ): Promise<ProductEntity> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        toObjectId(productId),
        { $pull: { ingredients: toObjectId(ingredientId) } },
        { new: true },
      )
      .lean();

    if (!updatedProduct) {
      throw new NotFoundProductError(
        `Produto com ID ${productId} não encontrado para remoção de ingrediente.`,
      );
    }

    console.log(`✅ Ingrediente ${ingredientId} removido com sucesso.`);

    return ProductMapper.fromMongo(updatedProduct);
  }

  async updateImage(productId: string, image: string): Promise<ProductEntity> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        toObjectId(productId),
        { $set: { image } },
        { new: true },
      )
      .populate('category')
      .populate('ingredients')
      .lean<PopulatedProductMongo>();

    if (!updatedProduct) {
      throw new NotFoundProductError(
        `Produto com ID ${productId} não encontrado para atualização de imagem.`,
      );
    }

    return ProductMapper.fromMongo(updatedProduct);
  }
}
