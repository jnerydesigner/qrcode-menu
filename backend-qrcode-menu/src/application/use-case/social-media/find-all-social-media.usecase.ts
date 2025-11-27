import { SocialMediaEntity } from '@domain/entities/social-media.entity';
import {
    SOCIAL_MEDIA_REPOSITORY,
    type SocialMediaRepository,
} from '@domain/repositories/social-media.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllSocialMediaUseCase {
    constructor(
        @Inject(SOCIAL_MEDIA_REPOSITORY)
        private readonly socialMediaRepository: SocialMediaRepository,
    ) { }

    async execute(input: FindAllSocialMediaInput): Promise<SocialMediaEntity[]> {
        return this.socialMediaRepository.findByCompanyId(input.companyId);
    }
}

export type FindAllSocialMediaInput = {
    companyId: string;
};
