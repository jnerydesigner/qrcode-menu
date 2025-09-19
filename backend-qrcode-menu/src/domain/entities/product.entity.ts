import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

export class ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image: string;
  categoryId: string;
  createdAt: Date;

  category?: {
    name: string;
    slug: string;
  };

  constructor(
    name: string,
    description: string,
    price: number,
    image: string,
    categoryId: string,
    id: string | null,
    createdAt: Date | null,
    slug: string,
    category?: { name: string; slug: string },
  ) {
    this.id = id !== null ? id : new UniqueEntityId().toString();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.categoryId = new UniqueEntityId(categoryId).toString();
    this.slug =
      slug !== undefined || slug === ''
        ? SlugEntity.create(name).toString()
        : slug;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.category = category;
  }
}
