import { Company } from '@domain/entities/company.entity';
import { Company as CompanyMongo } from '@infra/database/mongo/schema/company.schema';
import { SocialMedia as SocialMediaMongo } from '@infra/database/mongo/schema/social-media.schema';
import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { SocialMediaMapper } from './social-media.mapper';

export class CompanyMapper {
  static toMongo(company: Company): Partial<CompanyMongo> {
    const slug = SlugEntity.create(company.name).value;
    return {
      id: company.id,
      name: company.name,
      slug,
      image: '',
      image_small: '',
    };
  }

  static fromMongo(
    companyMongo: CompanyMongo & { created_at?: Date, social_medias?: any[], updated_at?: Date },
  ): Company {
    const socialMedias = (companyMongo.social_medias || []).map((sm) =>
      SocialMediaMapper.fromMongo(sm as any)
    );

    console.log("SocialMedias: ", socialMedias)


    const companyEntity = new Company(
      companyMongo.name,
      companyMongo._id.toString(),
      companyMongo.created_at || new Date(),
      companyMongo.slug,
      companyMongo.image,
      companyMongo.image_small,
      companyMongo.products || [],
      socialMedias,
    );

    console.log("Company Entity: ", companyEntity)
    return companyEntity;
  }
}




