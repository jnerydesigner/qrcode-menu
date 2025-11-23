import { ResizeImageService } from '@application/services/resize-image.service';
import { S3UploadService } from '@application/services/s3-upload.service';
import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import { CreateProductUseCase } from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { FindOneSlugProductUseCase } from '@application/use-case/product/find-one-slug.usecase';
import { RemoveIngredientProductUseCase } from '@application/use-case/product/remove-ingredient-product.usecase';
import { UpdateImageProductUseCase } from '@application/use-case/product/update-image.use-case';
import { UpdateProductUseCase } from '@application/use-case/product/update-product.usecase';
import { S3ConfigService } from '@infra/config/s3.config';
import { Module } from '@nestjs/common';
import { ProductController } from '@presenters/controllers/product/product.controller';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FindOneProductUseCase,
    CreateManyProductUseCase,
    FindAllProductUseCase,
    FindOneSlugProductUseCase,
    UpdateProductUseCase,
    RemoveIngredientProductUseCase,
    S3UploadService,
    S3ConfigService,
    UpdateImageProductUseCase,
    ResizeImageService
  ],
})
export class ProductModule { }
