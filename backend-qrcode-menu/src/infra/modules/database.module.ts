import { PrismaService } from '@application/services/prisma.service';
import { CATEGORY_REPOSITORY } from '@domain/repositories/category.repository';
import { COMPANY_REPOSITORY } from '@domain/repositories/company.repository';
import { PRODUCT_REPOSITORY } from '@domain/repositories/product.repository';
import { CategoryPrismaRepository } from '@infra/database/prisma/repository/category-prisma.repository';
import { CompanyPrismaRepository } from '@infra/database/prisma/repository/company-prisma.repository';
import { ProductPrismaRepository } from '@infra/database/prisma/repository/product-prisma.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: COMPANY_REPOSITORY,
      useFactory: (prisma: PrismaService) => {
        return new CompanyPrismaRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: CATEGORY_REPOSITORY,
      useFactory: (prisma: PrismaService) => {
        return new CategoryPrismaRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: PRODUCT_REPOSITORY,
      useFactory: (prisma: PrismaService) => {
        return new ProductPrismaRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
  exports: [
    PrismaService,
    COMPANY_REPOSITORY,
    CATEGORY_REPOSITORY,
    PRODUCT_REPOSITORY,
  ],
})
export class DatabaseModule {}
