import { type MailRequest } from '@application/dtos/mail.dto';
import { MailService } from '@application/services/mail.service';
import { Body, Controller, Post, Res } from '@nestjs/common';

import { type Response } from 'express';


@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post()
    async sendMail(@Res() response: Response, @Body() body: MailRequest) {
        const send = this.mailService.sendOnboardingStep(3, {
            userName: "Jander",
            companyName: "TechSolutions",
            email: "jander.webmaster@gmail.com"
        });

        return response.status(200).json({
            message: 'Mail sent successfully',
            data: send,
        });
    }
}
