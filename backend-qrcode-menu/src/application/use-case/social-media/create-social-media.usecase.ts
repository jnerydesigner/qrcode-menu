import { SocialMediaEntity } from '@domain/entities/social-media.entity';
import {
    SOCIAL_MEDIA_REPOSITORY,
    type SocialMediaRepository,
} from '@domain/repositories/social-media.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateSocialMediaUseCase {
    constructor(
        @Inject(SOCIAL_MEDIA_REPOSITORY)
        private readonly socialMediaRepository: SocialMediaRepository,
    ) { }

    async execute(input: CreateSocialMediaInput): Promise<SocialMediaEntity> {
        const socialMediaEntity = SocialMediaEntity.create(
            input.name,
            input.link,
            input.svgPath,
            null,
            input.companyId,
        );

        return this.socialMediaRepository.save(socialMediaEntity);
    }
}




export type CreateSocialMediaInput = {
    name: string;
    link: string;
    svgPath: string;
    companyId: string;
};
