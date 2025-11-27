import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

export class SocialMediaEntity {
    id: string;
    name: string;
    link: string;
    svgPath: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: string | null;

    constructor(
        name: string,
        link: string,
        svgPath: string,
        slug?: string | null,
        createdAt?: Date | null,
        updatedAt?: Date | null,
        id?: string | null | UniqueEntityId,
        companyId?: string | null | UniqueEntityId,
    ) {
        this.id = id instanceof UniqueEntityId ? id.toString() : new UniqueEntityId(id ?? undefined).toString();
        this.name = name;
        this.link = link;
        this.svgPath = svgPath;

        this.slug = slug && slug.length > 0 ? slug : SlugEntity.create(name).toString();
        this.createdAt = createdAt ? new Date(createdAt) : new Date();
        this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();

        this.companyId = companyId instanceof UniqueEntityId
            ? companyId.toString()
            : companyId
                ? new UniqueEntityId(companyId).toString()
                : null;
    }

    static create(
        name: string,
        link: string,
        svgPath: string,
        slug?: string | null,
        companyId?: string | null,
    ) {
        return new SocialMediaEntity(
            name,
            link,
            svgPath,
            slug ?? null,
            new Date(),
            new Date(),
            new UniqueEntityId(),
            companyId ?? null,
        );
    }
}
