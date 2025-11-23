import { CATEGORY_REPOSITORY } from '@domain/repositories/category.repository';
import { COMPANY_REPOSITORY } from '@domain/repositories/company.repository';
import { INGREDIENT_REPOSITORY } from '@domain/repositories/ingredient.repository';
import { PRODUCT_REPOSITORY } from '@domain/repositories/product.repository';
import { USERS_REPOSITORY } from '@domain/repositories/users.repository';
import { CategoryMongoRepository } from '@infra/database/mongo/repository/category-mongo.repository';
import { CompanyMongoRepository } from '@infra/database/mongo/repository/company-mongo.repository';
import { IngredientMongoRepository } from '@infra/database/mongo/repository/ingredient-mongo.repository';
import { ProductMongoRepository } from '@infra/database/mongo/repository/product-mongo.repository';
import { UsersMongoRepository } from '@infra/database/mongo/repository/users-mongo.repository';
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
import { ProductImage, ProductImageSchema } from '@infra/database/mongo/schema/product_image.schema';
import { User, UserSchema } from '@infra/database/mongo/schema/user.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const mongooseFeatureModules = [
  MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Company.name, schema: CompanySchema },
    { name: Ingredient.name, schema: IngredientSchema },
    { name: Product.name, schema: ProductSchema },
    { name: ProductImage.name, schema: ProductImageSchema },
    { name: User.name, schema: UserSchema },
  ]),
];

const repositoryProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (userModel: Model<User>) => new UsersMongoRepository(userModel),
    inject: [getModelToken(User.name)],
  },
  {
    provide: COMPANY_REPOSITORY,
    useFactory: (companyModel: Model<Company>, productModel: Model<Product>) =>
      new CompanyMongoRepository(companyModel, productModel),
    inject: [getModelToken(Company.name), getModelToken(Product.name)],
  },
  {
    provide: CATEGORY_REPOSITORY,
    useFactory: (
      categoryModel: Model<Category>,
      productModel: Model<Product>,
    ) => new CategoryMongoRepository(categoryModel, productModel),
    inject: [getModelToken(Category.name)],
  },
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (
      productModel: Model<Product>,
      categoryModel: Model<Category>,
      ingredientModel: Model<Ingredient>,
      productImageModel: Model<ProductImage>,
    ) =>
      new ProductMongoRepository(
        productModel,
        categoryModel,
        ingredientModel,
        productImageModel,
      ),
    inject: [
      getModelToken(Product.name),
      getModelToken(Category.name),
      getModelToken(Ingredient.name),
      getModelToken(ProductImage.name),
    ],
  },
  {
    provide: INGREDIENT_REPOSITORY,
    useFactory: (ingredientModel: Model<Ingredient>) =>
      new IngredientMongoRepository(ingredientModel),
    inject: [getModelToken(Ingredient.name)],
  },
];

@Global()
@Module({
  imports: [...mongooseFeatureModules],
  providers: [...repositoryProviders],
  exports: [
    COMPANY_REPOSITORY,
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
    INGREDIENT_REPOSITORY,
    USERS_REPOSITORY
  ],
})
export class DatabaseModule { }
