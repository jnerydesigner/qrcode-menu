import {
    SOCIAL_MEDIA_REPOSITORY,
    type SocialMediaRepository,
} from '@domain/repositories/social-media.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteSocialMediaUseCase {
    constructor(
        @Inject(SOCIAL_MEDIA_REPOSITORY)
        private readonly socialMediaRepository: SocialMediaRepository,
    ) { }

    async execute(input: DeleteSocialMediaInput): Promise<void> {
        await this.socialMediaRepository.delete(input.id);
    }
}

export type DeleteSocialMediaInput = {
    id: string;
};
