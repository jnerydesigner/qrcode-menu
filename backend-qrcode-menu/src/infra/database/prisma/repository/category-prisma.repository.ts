/* eslint-disable @typescript-eslint/no-unsafe-return */

import { PrismaService } from '@application/services/prisma.service';
import { CategoryEntity } from '@domain/entities/category.entity';
import { CategoryMapper } from '@domain/mappers/category.mapper';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';

export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CategoryEntity): Promise<CategoryEntity> {
    const createCategoryMapper: Category = CategoryMapper.toPersistent(data);
    const categoryCreate = await this.prisma.category.create({
      data: createCategoryMapper,
    });

    return CategoryMapper.toDomain(categoryCreate);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const findCategories = await this.prisma.category.findMany();
    const responseCategories = findCategories.map((category) =>
      CategoryMapper.toDomain(category),
    );

    return responseCategories;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const categoryDelete = await this.findCategory(categoryId);

    await this.prisma.category.delete({
      where: {
        id: categoryDelete.id,
      },
    });
  }

  async findCategory(categoryId: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category Not Exists');
    }

    return category;
  }
}
