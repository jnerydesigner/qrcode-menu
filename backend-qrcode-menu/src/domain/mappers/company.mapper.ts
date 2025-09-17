import { Company } from '@domain/entities/company.entity';
import { Prisma, Company as CompanyPrisma } from '@prisma/client';

export class CompanyMapper {
  static toDomain(company: CompanyPrisma): Company {
    return new Company(
      company.name,
      company.id,
      company.createdAt,
      company.slug,
    );
  }

  static toPrisma(company: Company): Prisma.CompanyCreateInput {
    return {
      id: company.id,
      name: company.name,
      slug: company.slug,
      createdAt: company.createdAt,
    };
  }
}
