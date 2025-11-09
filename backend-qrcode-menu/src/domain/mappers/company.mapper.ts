import { Company } from '@domain/entities/company.entity';
import { Prisma, Company as CompanyPrisma } from '@prisma/client';
import { Company as CompanyMongo } from '@infra/database/mongo/schema/company.schema';
import { SlugEntity } from '@domain/value-objects/slug-entity.value';

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

  static toMongo(company: Company): Partial<CompanyMongo> {
    const slug = SlugEntity.create(company.name).value;
    return {
      id: company.id,
      name: company.name,
      slug,
    };
  }

  static fromMongo(
    companyMongo: CompanyMongo & { created_at?: Date },
  ): Company {
    return new Company(
      companyMongo.name,
      companyMongo.id,
      companyMongo.created_at || new Date(),
      companyMongo.slug,
    );
  }
}
