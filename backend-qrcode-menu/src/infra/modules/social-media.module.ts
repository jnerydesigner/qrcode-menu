import { CreateSocialMediaUseCase } from '@application/use-case/social-media/create-social-media.usecase';
import { DeleteSocialMediaUseCase } from '@application/use-case/social-media/delete-social-media.usecase';
import { FindAllSocialMediaUseCase } from '@application/use-case/social-media/find-all-social-media.usecase';
import { UpdateSocialMediaUseCase } from '@application/use-case/social-media/update-social-media.usecase';
import { Module } from '@nestjs/common';
import { SocialMediaController } from '@presenters/controllers/social-media/social-media.controller';

@Module({
    controllers: [SocialMediaController],
    providers: [
        CreateSocialMediaUseCase,
        UpdateSocialMediaUseCase,
        DeleteSocialMediaUseCase,
        FindAllSocialMediaUseCase,
    ],
})
export class SocialMediaModule { }
