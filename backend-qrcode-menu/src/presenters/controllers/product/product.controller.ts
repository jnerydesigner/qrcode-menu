import { CreateProductRequest } from '@application/dtos/create-product.request';
import { UpdateProductIngredientRequest } from '@application/dtos/update-product-ingredient.request';
import { Role } from '@application/enums/roles.enum';
import { S3UploadService } from '@application/services/s3-upload.service';
import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import {
  type CreateProductInput,
  CreateProductUseCase,
} from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { FindOneSlugProductUseCase } from '@application/use-case/product/find-one-slug.usecase';
import { RemoveIngredientProductUseCase } from '@application/use-case/product/remove-ingredient-product.usecase';
import { UpdateImageProductUseCase } from '@application/use-case/product/update-image.use-case';
import {
  type UpdateProductInput,
  UpdateProductUseCase,
} from '@application/use-case/product/update-product.usecase';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Roles } from '@infra/decorators/role.decorator';
import { JwtAuthGuard } from '@infra/guard/jwt-auth.guard';
import { RolesGuard } from '@infra/guard/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findOneSlugProductUseCase: FindOneSlugProductUseCase,
    private readonly createManyProductUseCase: CreateManyProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductUseCase,
    private readonly updateProductsUseCase: UpdateProductUseCase,
    private readonly removeIngredientProductsUseCase: RemoveIngredientProductUseCase,
    private readonly uploadService: S3UploadService,
    private readonly updateImageProductUseCase: UpdateImageProductUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiBody({ type: CreateProductRequest })
  createProduct(@Body() product: CreateProductInput) {
    return this.createProductUseCase.execute(product);
  }

  @Get()
  @IsPublic()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Get('/:slug')
  findOne(@Param('slug') slug: string) {
    console.log(slug);
    return this.findOneProductUseCase.execute(slug);
  }

  @Patch('/:slug')
  @ApiOperation({ summary: 'Atualiza um Produto' })
  @ApiBody({ type: UpdateProductIngredientRequest })
  updateProduct(
    @Param('slug') slug: string,
    @Body() updateProductBody: UpdateProductInput,
  ) {

    return this.updateProductsUseCase.execute(slug, updateProductBody);
  }

  @Post('/many-products')
  createManyProducts(@Body() manyProducts: CreateProductInput[]) {
    return this.createManyProductUseCase.execute(manyProducts);
  }

  @Get('/slug/:slug')
  findOneSlug(@Param('slug') slug: string) {
    return this.findOneSlugProductUseCase.execute(slug);
  }

  @Delete('/:productId/:ingredientId')
  deleteIngredient(
    @Param('productId') productId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.removeIngredientProductsUseCase.execute(
      productId,
      ingredientId,
    );
  }

  @Patch('/upload/:productId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('productId') productId: string) {
    return this.updateImageProductUseCase.execute(productId, file);
  }
}
