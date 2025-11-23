import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';
import { Company } from './company.entity';

export class ProductEntity {
  id: string | undefined;
  name: string;
  description: string;
  price: number;
  slug: string;
  company?: string;
  image: string;
  categoryId: string;
  createdAt: Date;

  category?: {
    name: string;
    slug: string;
  };

  ingredients?: {
    id: string;
    name: string;
    emoji: string;
    color: string;
    slug: string;
  }[];



  companyEntity?: Company;

  images?: {
    image_full: string;
    image_medium: string;
    image_small: string;
  };

  constructor(
    name: string,
    description: string,
    price: number,
    image: string,
    categoryId: string,
    slug: string,
    createdAt: Date | null,
    company?: string,
    category?: null | { name: string; slug: string },
    ingredients?: {
      id: string;
      name: string;
      emoji: string;
      color: string;
      slug: string;
    }[],
    id?: string | null,
    companyEntity?: Company,
    images?: {
      image_full: string;
      image_medium: string;
      image_small: string;
    },
  ) {
    this.id = id ?? new UniqueEntityId().toString();
    this.name = name;
    this.description = description;
    this.price = price;
    this.slug =
      slug && slug.length > 0 ? slug : SlugEntity.create(name).toString();
    this.image = image || 'https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/image-not-found-compressed.png';
    this.categoryId = categoryId;
    this.company = company ?? '';

    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.category =
      category === null
        ? {
          name: '',
          slug: '',
        }
        : category;
    this.ingredients = ingredients ?? [];
    this.companyEntity = companyEntity ? companyEntity : undefined;
    this.images = images ? images : undefined;
  }
}
