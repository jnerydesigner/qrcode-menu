import { LoggerService } from '@application/services/logger.service';
import { MailService } from '@application/services/mail.service';
import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { MailController } from '@presenters/controllers/mail/mail.controller';


@Module({
    providers: [MailService, ConfigService, LoggerService],
    controllers: [MailController],
})
export class MailModule { }
