import { SocialMediaEntity } from '@domain/entities/social-media.entity';

export interface SocialMediaRepository {
    save(socialMedia: SocialMediaEntity): Promise<SocialMediaEntity>;
    findAll(): Promise<SocialMediaEntity[]>;
    findById(id: string): Promise<SocialMediaEntity>;
    findByCompanyId(companyId: string): Promise<SocialMediaEntity[]>;
    update(
        id: string,
        socialMedia: Partial<SocialMediaEntity>,
    ): Promise<SocialMediaEntity>;
    delete(id: string): Promise<void>;
}

export const SOCIAL_MEDIA_REPOSITORY = 'SOCIAL_MEDIA_REPOSITORY';
