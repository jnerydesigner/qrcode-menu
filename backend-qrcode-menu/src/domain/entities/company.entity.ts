import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';
import { SocialMediaEntity } from './social-media.entity';
import { CompanyStatusEnum } from '@infra/database/mongo/schema/company.schema';

export class Company {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  status: CompanyStatusEnum;
  image: string;
  image_small: string;
  products?: any[];
  socialMedias?: SocialMediaEntity[];

  constructor(
    name: string,
    id: string | null,
    created_at?: Date,
    slug?: string,
    status?: CompanyStatusEnum,
    image?: string | null,
    image_small?: string | null,
    products?: any[],
    socialMedias?: SocialMediaEntity[],
  ) {
    this.id = id !== null ? id : new UniqueEntityId().toString();
    this.name = name;
    this.slug = slug !== undefined ? SlugEntity.create(name).toString() : '';
    this.createdAt = created_at ?? new Date();
    this.image = image !== null && image !== undefined ? image : '';
    this.image_small = image_small !== null && image_small !== undefined ? image_small : '';
    this.products = products ?? [];
    this.socialMedias = socialMedias ?? [];
    this.status = status ?? CompanyStatusEnum.DISABLED;
  }

  static create(
    name: string,
  ) {

    const idObject = new UniqueEntityId().toString();
    const slugObject = SlugEntity.create(name).toString();
    const createdAt = new Date();
    const companyStatus = CompanyStatusEnum.DISABLED;
    return new Company(
      name,
      idObject,
      createdAt,
      slugObject,
      companyStatus,
    );
  }
}
