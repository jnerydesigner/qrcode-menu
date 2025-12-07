import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { MagicLinkService } from '@application/services/magic-link.service';
import { IsPublic } from '@infra/decorators/is-public.decorator';

@Controller('magic-link')
export class MagicLinkController {
    constructor(private readonly magicLinkService: MagicLinkService) { }

    @IsPublic()
    @Post()
    sendMagicLink(@Body('email') email: string) {
        this.magicLinkService.createMagicLink(email);
        return {
            message: 'Magic link sent successfully'
        };
    }

    @IsPublic()
    @Get('validate')
    validateMagicLink(@Query('token') token: string) {
        this.magicLinkService.validateMagicLink(token);
        return {
            message: 'Magic link validated successfully'
        }
    }
}
