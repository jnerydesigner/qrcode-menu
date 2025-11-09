import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

export class IngredientEntity {
  id: string;
  emoji: string;
  name: string;
  slug: string;
  color: string;
  createdAt: Date;

  constructor(
    emoji: string,
    color: string,
    name: string,
    id: string | null,
    createdAt: Date | null,
    slug: string,
  ) {
    this.id = id !== null ? id : new UniqueEntityId().toString();
    this.name = name;
    this.emoji = emoji;
    this.color = color;
    this.slug =
      slug && slug.length > 0 ? slug : SlugEntity.create(name).toString();
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}
