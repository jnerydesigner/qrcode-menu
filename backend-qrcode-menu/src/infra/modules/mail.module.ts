import { LoggerService } from '@application/services/logger.service';
import { MailService } from '@application/services/mail.service';
import { TemplateEngine } from '@application/services/template-engine.service';
import { TemplateResolver } from '@application/services/template-resolver.service';
import { Step1WelcomeEmail } from '@application/step-templates/step1-welcome.engine';
import { Step2WelcomeEmail } from '@application/step-templates/step2-welcome.engine';
import { Step3WelcomeEmail } from '@application/step-templates/step3-welcome.engine';
import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { DiscoveryService } from '@nestjs/core';
import { MailController } from '@presenters/controllers/mail/mail.controller';


@Module({
    providers: [MailService, ConfigService, LoggerService, TemplateEngine, TemplateResolver, DiscoveryService, Step1WelcomeEmail, Step2WelcomeEmail, Step3WelcomeEmail],
    controllers: [MailController],
    exports: [MailService]
})
export class MailModule { }
