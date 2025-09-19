/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaService } from '@application/services/prisma.service';
import { ProductEntity } from '@domain/entities/product.entity';
import { ProductMapper } from '@domain/mappers/product.mapper';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ExistsProductError } from '@infra/errors/exists-product.error';
import { NotFoundProductError } from '@infra/errors/notfound.error';

export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    const findProduct = await this.findProductBySlug(product.slug);
    if (findProduct) {
      throw new ExistsProductError(
        `A produto com slug "${product.slug}" já existe.`,
      );
    }

    const productMapper = ProductMapper.toPersistent(product);
    const productSave = await this.prisma.products.create({
      data: productMapper,
    });

    return ProductMapper.toDomain(productSave);
  }

  async findProductBySlug(slug: string): Promise<boolean> {
    const findProduct = await this.prisma.products.findFirst({
      where: {
        slug,
      },
    });

    if (findProduct) {
      return true;
    }

    return false;
  }

  async findOne(productId: string): Promise<ProductEntity> {
    const findOne = await this.prisma.products.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!findOne) {
      throw new NotFoundProductError(`Product id ${productId} not exists`);
    }

    return ProductMapper.toDomain(findOne);
  }

  async saveMany(products: ProductEntity[]): Promise<ProductEntity[]> {
    const productsSave: ProductEntity[] = [];

    for (const product of products) {
      const findProduct = await this.prisma.products.findFirst({
        where: { slug: product.slug },
      });

      if (!findProduct) {
        const productMapper = ProductMapper.toPersistent(product);
        const productSave = await this.prisma.products.create({
          data: productMapper,
        });

        const productDomain = ProductMapper.toDomain(productSave);
        productsSave.push(productDomain);
      }
    }

    return productsSave;
  }

  async findAll(): Promise<ProductEntity[]> {
    const findAll = await this.prisma.products.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    const productMany = findAll.map((product) =>
      ProductMapper.toDomain(product),
    );

    return productMany;
  }
}
