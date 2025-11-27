import {
    type CreateSocialMediaInput,
    CreateSocialMediaUseCase,
} from '@application/use-case/social-media/create-social-media.usecase';
import {
    type DeleteSocialMediaInput,
    DeleteSocialMediaUseCase,
} from '@application/use-case/social-media/delete-social-media.usecase';
import {
    type FindAllSocialMediaInput,
    FindAllSocialMediaUseCase,
} from '@application/use-case/social-media/find-all-social-media.usecase';
import {
    type UpdateSocialMediaInput,
    UpdateSocialMediaUseCase,
} from '@application/use-case/social-media/update-social-media.usecase';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

@Controller('social-media')
export class SocialMediaController {
    constructor(
        private readonly createSocialMediaUseCase: CreateSocialMediaUseCase,
        private readonly updateSocialMediaUseCase: UpdateSocialMediaUseCase,
        private readonly deleteSocialMediaUseCase: DeleteSocialMediaUseCase,
        private readonly findAllSocialMediaUseCase: FindAllSocialMediaUseCase,
    ) { }

    @Post()
    create(@Body() createSocialMediaBody: CreateSocialMediaInput) {
        return this.createSocialMediaUseCase.execute(createSocialMediaBody);
    }

    @Get('company/:companyId')
    findByCompany(@Param('companyId') companyId: string) {
        return this.findAllSocialMediaUseCase.execute({ companyId });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSocialMediaBody: Omit<UpdateSocialMediaInput, 'id'>,
    ) {
        return this.updateSocialMediaUseCase.execute({
            id,
            ...updateSocialMediaBody,
        });
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.deleteSocialMediaUseCase.execute({ id });
    }
}
