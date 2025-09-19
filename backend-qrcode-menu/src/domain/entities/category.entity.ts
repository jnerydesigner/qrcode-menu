import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

export class CategoryEntity {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  constructor(
    name: string,
    id: string | null,
    createdAt: Date | null,
    slug: string,
  ) {
    this.id = id !== null ? id : new UniqueEntityId().toString();
    this.name = name;
    this.slug =
      slug !== undefined || slug === ''
        ? SlugEntity.create(name).toString()
        : slug;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}
