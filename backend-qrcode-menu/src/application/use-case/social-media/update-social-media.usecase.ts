import { SocialMediaEntity } from '@domain/entities/social-media.entity';
import {
    SOCIAL_MEDIA_REPOSITORY,
    type SocialMediaRepository,
} from '@domain/repositories/social-media.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateSocialMediaUseCase {
    constructor(
        @Inject(SOCIAL_MEDIA_REPOSITORY)
        private readonly socialMediaRepository: SocialMediaRepository,
    ) { }

    async execute(input: UpdateSocialMediaInput): Promise<SocialMediaEntity> {
        const updateData: Partial<SocialMediaEntity> = {};

        if (input.name !== undefined) updateData.name = input.name;
        if (input.link !== undefined) updateData.link = input.link;
        if (input.svgPath !== undefined) updateData.svgPath = input.svgPath;

        return this.socialMediaRepository.update(input.id, updateData);
    }
}

export type UpdateSocialMediaInput = {
    id: string;
    name?: string;
    link?: string;
    svgPath?: string;
};
