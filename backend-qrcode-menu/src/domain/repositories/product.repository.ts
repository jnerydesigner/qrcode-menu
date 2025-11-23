import { ProductEntity } from '@domain/entities/product.entity';
import { ProductImage } from '@domain/mappers/product.mapper';

export interface ProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  findProductBySlug(slug: string): Promise<boolean>;
  findOne(productId: string): Promise<ProductEntity>;
  findOneSlug(slug: string): Promise<ProductEntity>;
  saveMany(products: ProductEntity[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  removeIngredient(
    productId: string,
    ingredientId: string,
  ): Promise<ProductEntity>;

  updateImage(productId: string, image: string, imageSmall: string, imageMedium: string): Promise<ProductEntity>;
  verifyExistsImagesproduct(productId: string): Promise<ProductImage | null>;
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
