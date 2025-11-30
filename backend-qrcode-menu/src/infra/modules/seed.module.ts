import { SeedService } from '@application/services/seed.service';
import {
  Category,
  CategorySchema,
} from '@infra/database/mongo/schema/category.schema';
import {
  Ingredient,
  IngredientSchema,
} from '@infra/database/mongo/schema/ingredient.schema';
import {
  Product,
  ProductSchema,
} from '@infra/database/mongo/schema/product.schema';
import {
  Company,
  CompanySchema,
} from '@infra/database/mongo/schema/company.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMedia, SocialMediaSchema } from '@infra/database/mongo/schema/social-media.schema';
import { ProductImage, ProductImageSchema } from '@infra/database/mongo/schema/product_image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Ingredient.name, schema: IngredientSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Company.name, schema: CompanySchema },
      { name: SocialMedia.name, schema: SocialMediaSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule { }
