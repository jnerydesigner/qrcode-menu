/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { ProductEntity } from '@domain/entities/product.entity';
import { Products, Prisma } from '@prisma/client';

export class ProductMapper {
  static toPersistent(product: ProductEntity): Products {
    return {
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      image: product.image,
      price: new Prisma.Decimal(product.price),
      slug: product.slug,
      createdAt: product.createdAt,
    };
  }

  static toDomain(
    product: Products & { category?: { name: string; slug: string } },
  ): ProductEntity {
    return new ProductEntity(
      product.name,
      product.description,
      product.price.toNumber(),
      product.image,
      product.categoryId,
      product.id,
      product.createdAt,
      product.slug,
      product.category,
    );
  }
}
