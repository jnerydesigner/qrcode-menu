import { Company } from '@domain/entities/company.entity';
import { Company as CompanyMongo } from '@infra/database/mongo/schema/company.schema';
import { SlugEntity } from '@domain/value-objects/slug-entity.value';

export class CompanyMapper {
  static toMongo(company: Company): Partial<CompanyMongo> {
    const slug = SlugEntity.create(company.name).value;
    return {
      id: company.id,
      name: company.name,
      slug,
      image: '',
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
