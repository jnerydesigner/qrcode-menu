import { Category } from '@infra/database/mongo/schema/category.schema';
import { Ingredient } from '@infra/database/mongo/schema/ingredient.schema';
import { Product } from '@infra/database/mongo/schema/product.schema';
import { Company } from '@infra/database/mongo/schema/company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { categorydata } from '@infra/database/mongo/data/category';
import { ingredientsData } from '@infra/database/mongo/data/ingredients';
import { productDataImages, productsData } from '@infra/database/mongo/data/products';
import { socialMediaData } from '@infra/database/mongo/data/social-media';
import { SocialMedia } from '@infra/database/mongo/schema/social-media.schema';
import { ProductImage } from '@infra/database/mongo/schema/product_image.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(SocialMedia.name) private socialMediaModel: Model<SocialMedia>,
    @InjectModel(ProductImage.name) private productImageModel: Model<ProductImage>,
  ) { }

  async run() {
    console.log('🌱 Iniciando seed...');

    await this.categoryModel.deleteMany();
    await this.ingredientModel.deleteMany();
    await this.productImageModel.deleteMany();
    await this.productModel.deleteMany();
    await this.socialMediaModel.deleteMany();

    await this.categoryModel.insertMany(categorydata);

    await this.ingredientModel.insertMany(ingredientsData);

    const companyHamburgueria = await this.companyModel.findOne({ slug: 'hamburgueria-da-vila' });


    for (const socialMedia of socialMediaData) {
      await this.socialMediaModel.create({ ...socialMedia, company: companyHamburgueria?._id });
    }
    for (const product of productsData) {
      const category = await this.categoryModel.findOne({ slug: product.category });
      if (!category) {
        throw new Error(`Categoria não encontrada: ${product.category}`);
      }

      const ingredientIds: Types.ObjectId[] = [];

      for (const ingredientSlug of product.ingredients ?? []) {
        const ingredient = await this.ingredientModel.findOne({ slug: ingredientSlug });

        if (!ingredient) {
          console.warn(`⚠️ Ingrediente não encontrado: ${ingredientSlug}`);
          continue;
        }

        const ingredientId = ingredient._id as Types.ObjectId;

        if (!ingredientId) {
          throw new Error(`Ingrediente não encontrado: ${ingredientSlug}`);
        }

        ingredientIds.push(ingredientId);
      }

      const productCreated = await this.productModel.create({
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        company: companyHamburgueria?._id,
        category: category._id,
        ingredients: ingredientIds,
      });

      console.log(`✔ Produto criado: ${productCreated.name}`);

      const imageData = productDataImages.find((img) => img.product === product.slug);



      if (imageData) {
        const imageCreated = await this.productImageModel.create({
          ...imageData,
          product: productCreated._id,
        });
        console.log(imageCreated)
        await this.productModel.updateOne({ _id: productCreated._id }, { image: imageCreated.image_small, images: imageCreated._id });
      } else {
        console.log(`⚠️ Imagem não encontrada para o produto: ${product.name}`);
        await this.productModel.updateOne({ _id: productCreated._id }, { image: 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png' });
      }
    }



    console.log('✅ Seed finalizado!');
  }
}
