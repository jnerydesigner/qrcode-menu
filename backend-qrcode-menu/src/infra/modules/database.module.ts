import { PrismaService } from '@application/services/prisma.service';
import { CATEGORY_REPOSITORY } from '@domain/repositories/category.repository';
import { COMPANY_REPOSITORY } from '@domain/repositories/company.repository';
import { INGREDIENT_REPOSITORY } from '@domain/repositories/ingredient.repository';
import { PRODUCT_REPOSITORY } from '@domain/repositories/product.repository';
import { CategoryPrismaRepository } from '@infra/database/prisma/repository/category-prisma.repository';
import { CompanyPrismaRepository } from '@infra/database/prisma/repository/company-prisma.repository';
import { IngredientPrismaRepository } from '@infra/database/prisma/repository/ingredient-prisma.repository';
import { ProductPrismaRepository } from '@infra/database/prisma/repository/product-prisma.repository';
import { CategoryMongoRepository } from '@infra/database/mongo/repository/category-mongo.repository';
import { CompanyMongoRepository } from '@infra/database/mongo/repository/company-mongo.repository';
import { IngredientMongoRepository } from '@infra/database/mongo/repository/ingredient-mongo.repository';
import { ProductMongoRepository } from '@infra/database/mongo/repository/product-mongo.repository';
import {
  Category,
  CategorySchema,
} from '@infra/database/mongo/schema/category.schema';
import {
  Company,
  CompanySchema,
} from '@infra/database/mongo/schema/company.schema';
import {
  Ingredient,
  IngredientSchema,
} from '@infra/database/mongo/schema/ingredient.schema';
import {
  Product,
  ProductSchema,
} from '@infra/database/mongo/schema/product.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const databaseProvider = process.env.DATABASE_PROVIDER ?? 'prisma';

const mongooseFeatureModules =
  databaseProvider === 'mongo'
    ? [
        MongooseModule.forFeature([
          { name: Category.name, schema: CategorySchema },
          { name: Company.name, schema: CompanySchema },
          { name: Ingredient.name, schema: IngredientSchema },
          { name: Product.name, schema: ProductSchema },
        ]),
      ]
    : [];

const repositoryProviders =
  databaseProvider === 'mongo'
    ? [
        {
          provide: COMPANY_REPOSITORY,
          useFactory: (companyModel: Model<Company>) =>
            new CompanyMongoRepository(companyModel),
          inject: [getModelToken(Company.name)],
        },
        {
          provide: CATEGORY_REPOSITORY,
          useFactory: (categoryModel: Model<Category>) =>
            new CategoryMongoRepository(categoryModel),
          inject: [getModelToken(Category.name)],
        },
        {
          provide: PRODUCT_REPOSITORY,
          useFactory: (
            productModel: Model<Product>,
            categoryModel: Model<Category>,
          ) => new ProductMongoRepository(productModel, categoryModel),
          inject: [getModelToken(Product.name), getModelToken(Category.name)],
        },
        {
          provide: INGREDIENT_REPOSITORY,
          useFactory: (ingredientModel: Model<Ingredient>) =>
            new IngredientMongoRepository(ingredientModel),
          inject: [getModelToken(Ingredient.name)],
        },
      ]
    : [
        {
          provide: COMPANY_REPOSITORY,
          useFactory: (prisma: PrismaService) =>
            new CompanyPrismaRepository(prisma),
          inject: [PrismaService],
        },
        {
          provide: CATEGORY_REPOSITORY,
          useFactory: (prisma: PrismaService) =>
            new CategoryPrismaRepository(prisma),
          inject: [PrismaService],
        },
        {
          provide: PRODUCT_REPOSITORY,
          useFactory: (prisma: PrismaService) =>
            new ProductPrismaRepository(prisma),
          inject: [PrismaService],
        },
        {
          provide: INGREDIENT_REPOSITORY,
          useFactory: (prisma: PrismaService) =>
            new IngredientPrismaRepository(prisma),
          inject: [PrismaService],
        },
      ];

@Global()
@Module({
  imports: [...mongooseFeatureModules],
  providers: [PrismaService, ...repositoryProviders],
  exports: [
    PrismaService,
    COMPANY_REPOSITORY,
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
    INGREDIENT_REPOSITORY,
  ],
})
export class DatabaseModule {}
