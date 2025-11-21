import { ProductEntity } from '@domain/entities/product.entity';

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
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
