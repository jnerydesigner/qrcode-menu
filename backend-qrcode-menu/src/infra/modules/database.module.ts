import { LoggerService } from '@application/services/logger.service';
import { CATEGORY_REPOSITORY } from '@domain/repositories/category.repository';
import { COMPANY_REPOSITORY } from '@domain/repositories/company.repository';
import { ICONS_REPOSITORY } from '@domain/repositories/icons.repository';
import { INGREDIENT_REPOSITORY } from '@domain/repositories/ingredient.repository';
import { MAGIC_LINK_REPOSITORY } from '@domain/repositories/magic-link.repository';
import { PRODUCT_REPOSITORY } from '@domain/repositories/product.repository';
import { SOCIAL_MEDIA_REPOSITORY } from '@domain/repositories/social-media.repository';
import { USERS_REPOSITORY } from '@domain/repositories/users.repository';
import { CategoryMongoRepository } from '@infra/database/mongo/repository/category-mongo.repository';
import { CompanyMongoRepository } from '@infra/database/mongo/repository/company-mongo.repository';
import { IconsMongoRepository } from '@infra/database/mongo/repository/icons-mongo.repository';
import { IngredientMongoRepository } from '@infra/database/mongo/repository/ingredient-mongo.repository';
import { MagicLinkMongoRepository } from '@infra/database/mongo/repository/magic-link-mongo.repository';
import { ProductMongoRepository } from '@infra/database/mongo/repository/product-mongo.repository';
import { SocialMediaMongoRepository } from '@infra/database/mongo/repository/social-media-mongo.repository';
import { UsersMongoRepository } from '@infra/database/mongo/repository/users-mongo.repository';
import {
  Category,
  CategorySchema,
} from '@infra/database/mongo/schema/category.schema';
import {
  Company,
  CompanySchema,
} from '@infra/database/mongo/schema/company.schema';
import { CompanyImage, CompanyImageSchema } from '@infra/database/mongo/schema/company_image.schema';
import { Icons, IconsSchema } from '@infra/database/mongo/schema/icons.schema';
import {
  Ingredient,
  IngredientSchema,
} from '@infra/database/mongo/schema/ingredient.schema';
import { MagicLink, MagicLinkSchema } from '@infra/database/mongo/schema/magic-link.schema';
import {
  Product,
  ProductSchema,
} from '@infra/database/mongo/schema/product.schema';
import { ProductImage, ProductImageSchema } from '@infra/database/mongo/schema/product_image.schema';
import {
  SocialMedia,
  SocialMediaSchema,
} from '@infra/database/mongo/schema/social-media.schema';

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
    { name: SocialMedia.name, schema: SocialMediaSchema },
    { name: User.name, schema: UserSchema },
    { name: Icons.name, schema: IconsSchema },
    { name: CompanyImage.name, schema: CompanyImageSchema },
    { name: MagicLink.name, schema: MagicLinkSchema },
  ]),
];

const repositoryProviders = [
  {
    provide: MAGIC_LINK_REPOSITORY,
    useFactory: (magicLinkModel: Model<MagicLink>) => new MagicLinkMongoRepository(magicLinkModel),
    inject: [getModelToken(MagicLink.name)],
  },
  {
    provide: USERS_REPOSITORY,
    useFactory: (userModel: Model<User>) => new UsersMongoRepository(userModel),
    inject: [getModelToken(User.name)],
  },
  {
    provide: ICONS_REPOSITORY,
    useFactory: (iconsModel: Model<Icons>) => new IconsMongoRepository(iconsModel),
    inject: [getModelToken(Icons.name)],
  },
  {
    provide: COMPANY_REPOSITORY,
    useFactory: (companyModel: Model<Company>, productModel: Model<Product>, socialMediaModel: Model<SocialMedia>, companyImageModel: Model<CompanyImage>, logger: LoggerService) =>
      new CompanyMongoRepository(companyModel, productModel, socialMediaModel, companyImageModel, logger),
    inject: [getModelToken(Company.name), getModelToken(Product.name), getModelToken(SocialMedia.name), getModelToken(CompanyImage.name), LoggerService],
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
  {
    provide: SOCIAL_MEDIA_REPOSITORY,
    useFactory: (socialMediaModel: Model<SocialMedia>) =>
      new SocialMediaMongoRepository(socialMediaModel),
    inject: [getModelToken(SocialMedia.name)],
  },
];

@Global()
@Module({
  imports: [...mongooseFeatureModules],
  providers: [...repositoryProviders, LoggerService],
  exports: [
    COMPANY_REPOSITORY,
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
    INGREDIENT_REPOSITORY,
    SOCIAL_MEDIA_REPOSITORY,
    USERS_REPOSITORY,
    ICONS_REPOSITORY,
    MAGIC_LINK_REPOSITORY
  ],
})
export class DatabaseModule { }
