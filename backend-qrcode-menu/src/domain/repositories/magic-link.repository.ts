import { MagicLinkEntity } from "@domain/entities/magic-link.entity";

export interface MagicLinkRepository {
    create(data: MagicLinkEntity): Promise<MagicLinkEntity>;
    findOne(email: string): Promise<MagicLinkEntity | null>;
    update(id: string, magicLink: string): Promise<MagicLinkEntity>;
    delete(id: string): Promise<void>;
}

export const MAGIC_LINK_REPOSITORY = 'MAGIC_LINK_REPOSITORY'