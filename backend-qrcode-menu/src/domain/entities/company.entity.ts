import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

export class Company {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;

  constructor(
    name: string,
    id: string | null,
    created_at?: Date,
    slug?: string,
  ) {
    this.id = id !== null ? id : new UniqueEntityId().toString();
    this.name = name;
    this.slug = slug !== undefined ? SlugEntity.create(name).toString() : '';
    this.createdAt = created_at ?? new Date();
  }
}
