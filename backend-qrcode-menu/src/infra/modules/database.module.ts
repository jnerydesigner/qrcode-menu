import { PrismaService } from '@application/services/prisma.service';
import { COMPANY_REPOSITORY } from '@domain/repositories/company.repository';
import { CompanyPrismaRepository } from '@infra/database/prisma/repository/company-prisma.repository';
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
  ],
  exports: [PrismaService, COMPANY_REPOSITORY],
})
export class DatabaseModule {}
