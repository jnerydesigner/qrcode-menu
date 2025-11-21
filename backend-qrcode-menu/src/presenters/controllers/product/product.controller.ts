import { CreateProductRequest } from '@application/dtos/create-product.request';
import { UpdateProductIngredientRequest } from '@application/dtos/update-product-ingredient.request';
import { CreateManyProductUseCase } from '@application/use-case/product/create-many-product.usecase';
import {
  type CreateProductInput,
  CreateProductUseCase,
} from '@application/use-case/product/create-product.usecase';
import { FindAllProductUseCase } from '@application/use-case/product/find-all-product.usecase';
import { FindOneProductUseCase } from '@application/use-case/product/find-one-products.usecase';
import { FindOneSlugProductUseCase } from '@application/use-case/product/find-one-slug.usecase';
import { RemoveIngredientProductUseCase } from '@application/use-case/product/remove-ingredient-product.usecase';
import {
  type UpdateProductInput,
  UpdateProductUseCase,
} from '@application/use-case/product/update-product.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiBody({ type: CreateProductRequest })
  createProduct(@Body() product: CreateProductInput) {
    console.log('Create product', product);
    return this.createProductUseCase.execute(product);
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Get('/:productId')
  findOne(@Param('productId') productId: string) {
    return this.findOneProductUseCase.execute(productId);
  }

  @Patch('/:productId')
  @ApiOperation({ summary: 'Atualiza um Produto' })
  @ApiBody({ type: UpdateProductIngredientRequest })
  updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductBody: UpdateProductInput,
  ) {
    return this.updateProductsUseCase.execute(productId, updateProductBody);
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
}
