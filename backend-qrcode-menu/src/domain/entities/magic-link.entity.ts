import { UniqueEntityId } from "@domain/value-objects/unique-entity-id.value";
import { MagicLinkStatus } from "@infra/database/mongo/schema/magic-link.schema";

export class MagicLinkEntity {
    private readonly _id: string;
    private readonly _email: string;
    private readonly _magicLink: string;
    private readonly _status: MagicLinkStatus;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    constructor(
        id: string,
        email: string,
        magicLink: string,
        status: MagicLinkStatus,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = id;
        this._email = email;
        this._magicLink = magicLink;
        this._status = status;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get magicLink(): string {
        return this._magicLink;
    }

    get status(): MagicLinkStatus {
        return this._status;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    // Builder Pattern
    static builder(): MagicLinkEntity.Builder {
        return new MagicLinkEntity.Builder();
    }

    // Factory method for quick creation
    static create(email: string, magicLink: string, status: MagicLinkStatus = MagicLinkStatus.CREATED): MagicLinkEntity {
        return MagicLinkEntity.builder()
            .withEmail(email)
            .withMagicLink(magicLink)
            .withStatus(status)
            .build();
    }
}

export namespace MagicLinkEntity {
    export class Builder {
        private _id?: string;
        private _email?: string;
        private _magicLink?: string;
        private _status?: MagicLinkStatus;
        private _createdAt?: Date;
        private _updatedAt?: Date;

        withId(id: string): Builder {
            this._id = id;
            return this;
        }

        withEmail(email: string): Builder {
            this._email = email;
            return this;
        }

        withMagicLink(magicLink: string): Builder {
            this._magicLink = magicLink;
            return this;
        }

        withStatus(status: MagicLinkStatus): Builder {
            this._status = status;
            return this;
        }

        withCreatedAt(createdAt: Date): Builder {
            this._createdAt = createdAt;
            return this;
        }

        withUpdatedAt(updatedAt: Date): Builder {
            this._updatedAt = updatedAt;
            return this;
        }

        build(): MagicLinkEntity {
            // Validations
            if (!this._email) {
                throw new Error('Email is required');
            }

            if (!this._magicLink) {
                throw new Error('Magic link is required');
            }

            // Default values
            const id = this._id || new UniqueEntityId().toString();
            const status = this._status || MagicLinkStatus.CREATED;
            const createdAt = this._createdAt || new Date();
            const updatedAt = this._updatedAt || new Date();

            return new MagicLinkEntity(
                id,
                this._email,
                this._magicLink,
                status,
                createdAt,
                updatedAt
            );
        }
    }
}