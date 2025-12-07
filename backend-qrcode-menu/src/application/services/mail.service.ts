import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { ConfigService } from '@nestjs/config';
import * as fsNew from 'fs';
import { LoggerService } from './logger.service';
import { replaceManyWordsTemplate } from '@infra/utils/replace-many-words-template.util';
import { env } from '@infra/config/env';
import { TemplateResolver } from './template-resolver.service';

@Injectable()
export class MailService {
    private logger: any;
    constructor(
        private readonly mailSenderService: MailerService,
        private readonly config: ConfigService,
        private readonly loggerService: LoggerService,
        private readonly templateResolver: TemplateResolver,
    ) {
        this.logger = this.loggerService.setContext(MailService.name);
    }

    async sendOnboardingStep(step: number, context: any): Promise<void> {
        // 1. Renderiza template baseado no step
        const html = await this.templateResolver.render(step, context);

        // 2. Salva preview do template (igual você faz hoje)
        const pathResult = path.join(
            'src',
            'application',
            'templates',
            'result',
            `template-step-${step}.html`,
        );

        await fs.writeFile(pathResult, html);

        this.loggerService.info("Email preview salvo em: " + pathResult);

        // 3. Se envio estiver habilitado, envia
        if (env.SEND_MAIL) {
            await this.sendEmail(html, context.email);
        }
    }

    async sendMagicLinkEmail(email: string, magicLink: string): Promise<void> {
        await this.sendOnboardingStep(1, {
            userName: email.split('@')[0],
            email,
            magicLink
        });
    }

    async loadTemplate(step: number): Promise<void> {
        let template: string;


        const replacementsArr: string[] = [];

        switch (step) {
            case 1:
                template = await this.loadTemplateStepOne();
                template = replaceManyWordsTemplate(template, ['Empresa X', 'Passo 1']);
                break;

            case 2:
                template = await this.loadTemplateStepTwo();
                template = replaceManyWordsTemplate(template, ['Empresa X', 'Passo 2']);
                break;

            case 3:
                template = await this.loadTemplateStepThree();
                template = replaceManyWordsTemplate(template, ['Empresa X', 'Passo 3']);
                break;

            default:
                template = await this.loadTemplateStepOne();
                template = replaceManyWordsTemplate(template, ['Empresa X', 'Passo 1']);
                break;
        }

        const pathResult = path.join(
            'src',
            'application',
            'templates',
            'result',
            'template.result.html',
        );
        console.log("RAW:", process.env.SEND_MAIL);

        this.loggerService.info(JSON.stringify(env.SEND_MAIL));
        await fs.writeFile(pathResult, template);

        if (env.SEND_MAIL) {
            await this.prepareEmailMessage(template, 'jander.webmaster@gmail.com');
        }


    }

    async loadTemplateStepOne(): Promise<string> {
        const pathTemplateStepOne = path.join(
            'src',
            'application',
            'templates',
            'state',
            'workflow-step1.template.html',
        );
        try {
            const templateStepOne = await fs.readFile(pathTemplateStepOne, 'utf8');

            return templateStepOne;
        } catch (e) {
            this.loggerService.info(e);
            throw e;
        }

    }

    async loadTemplateStepTwo(): Promise<string> {
        const pathTemplateStepTwo = path.join(
            'src',
            'application',
            'templates',
            'state',
            'workflow-step2.template.html',
        );
        try {
            const templateStepTwo = await fs.readFile(pathTemplateStepTwo, 'utf8');


            return templateStepTwo;
        } catch (e) {
            this.loggerService.info(e);
            throw e;
        }
    }

    async loadTemplateStepThree(): Promise<string> {
        const pathTemplateStepThree = path.join(
            'src',
            'application',
            'templates',
            'state',
            'workflow-step3.template.html',
        );
        try {
            const templateStepThree = await fs.readFile(pathTemplateStepThree, 'utf8');

            return templateStepThree;
        } catch (e) {
            this.loggerService.info(e);
            throw e;
        }
    }

    async prepareEmailMessage(template: string, to: string) {
        await this.sendEmail(template, to);
    }

    private async sendEmail(htmlContent: string, to: string) {

        this.mailSenderService.sendMail({
            to,
            subject: 'Bem-vindo ao QrCode Menu',
            html: htmlContent,
            context: {
                name: 'Jander',
                email: 'jander.webmaster@gmail.com',
            },
        });
    }


    //         await this.mailSendService.sendMail({
    //             from: `${this.config.get('SENDER_NAME')} <${this.config.get('SENDER_MAIL')}>`,
    //             to: input.to,
    //             subject: `Vaga - ${input.vacancy} - ${input.nameFull}`,
    //             cc: `${this.config.get('SENDER_NAME')} <${this.config.get('SENDER_MAIL')}>`,
    //             html: htmlContent,
    //             attachments: [
    //                 {
    //                     filename: 'curriculo.pdf',
    //                     path: path.join(
    //                         'src',
    //                         'assets',
    //                         'curriculos',
    //                         `${this.fileNameCurriculo}`,
    //                     ),
    //                 },
    //             ],
    //         });

    // private async sendEmailMessage(
    //     input: MailRequest,
    //     htmlContent: string,
    // ): Promise<void> {



    // async loadTemplate(templateName: string) {
    //     await fs.mkdir('src/assets', { recursive: true });
    //     const pathToTemplate = path.join(
    //         'src',
    //         'assets',
    //         'template',
    //         `${templateName}.html`,
    //     );
    //     try {
    //         const template = await fs.readFile(pathToTemplate, 'utf8');
    //         return template;
    //     } catch (e) {
    //         this.logger.error(e);
    //     }
    // }

    // saudation() {
    //     const now = new Date();
    //     const hour = now.getHours();

    //     let saudation: string;

    //     if (hour >= 6 && hour < 12) {
    //         saudation = 'Bom dia';
    //     } else if (hour >= 12 && hour < 18) {
    //         saudation = 'Boa tarde';
    //     } else {
    //         saudation = 'Boa noite';
    //     }

    //     return saudation;
    // }

    // async sendMail(input: MailRequest) {
    //     const skills = input.skills
    //         .trim()
    //         .replace(/,$/, '')
    //         .replace(/,(\S)/g, ', $1')
    //         .trim();

    //     const replacements: Replacement = [
    //         ['user', 'Jander Nery'],
    //         ['company', input.company],
    //         ['recruiter', input.nameRecruiter],
    //         ['vacancy', input.vacancy],
    //         ['habilities', skills],
    //         ['githubAvatar', input.githubAvatar],
    //         ['nameFull', input.nameFull],
    //         ['specialty', input.specialty],
    //         ['saudation', this.saudation()],
    //         ['availability', input.availability],
    //         [
    //             'curriculo',
    //             process.env.URL_CURRICULO ||
    //             'https://seliga-dev.s3.us-east-1.amazonaws.com/curriculo-jander-da-costa-nery-2025.pdf',
    //         ],
    //     ];

    //     this.logger.log(replacements);
    //     const emailContent = await this.loadTemplate('mail-recruiter-v3');
    //     this.logger.log(input.skills);

    //     let updatedContent = emailContent;

    //     for (const [key, value] of replacements) {
    //         const regex = new RegExp(`{{${key}}}`, 'g');
    //         updatedContent = updatedContent.replace(regex, value);
    //     }

    //     // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    //     const previewFile = `./src/assets/email_preview.html`;

    //     try {
    //         await fs.mkdir('src/assets', { recursive: true });
    //         await fs.writeFile(previewFile, updatedContent);
    //         this.logger.log(`Template salvo em: ${previewFile}`);

    //         this.logger.log('Por favor, verifique o arquivo antes de continuar');
    //     } catch (error) {
    //         this.logger.error('Erro ao salvar o preview:', error);
    //     }

    //     await this.sendEmailMessage(input, updatedContent);
    // }

    // private async sendEmailMessage(
    //     input: MailRequest,
    //     htmlContent: string,
    // ): Promise<void> {
    //     const shouldSendEmail =
    //         this.config.get('SEND_MAIL') === 'true' ||
    //         this.config.get('SEND_MAIL') === true;

    //     if (!shouldSendEmail) {
    //         this.logger.warn(
    //             'Envio de email desabilitado. Configure SEND_MAIL=true para enviar emails.',
    //         );
    //         this.logger.log('Detalhes do email que seria enviado:');
    //         this.logger.log(`- Para: ${input.to}`);
    //         this.logger.log(`- Assunto: Vaga - ${input.vacancy} - ${input.nameFull}`);
    //         return;
    //     }

    //     try {
    //         this.logger.log(`Enviando email para: ${input.to}`);
    //         await this.mailSendService.sendMail({
    //             from: `${this.config.get('SENDER_NAME')} <${this.config.get('SENDER_MAIL')}>`,
    //             to: input.to,
    //             subject: `Vaga - ${input.vacancy} - ${input.nameFull}`,
    //             cc: `${this.config.get('SENDER_NAME')} <${this.config.get('SENDER_MAIL')}>`,
    //             html: htmlContent,
    //             attachments: [
    //                 {
    //                     filename: 'curriculo.pdf',
    //                     path: path.join(
    //                         'src',
    //                         'assets',
    //                         'curriculos',
    //                         `${this.fileNameCurriculo}`,
    //                     ),
    //                 },
    //             ],
    //         });
    //         this.logger.log(`Email enviado com sucesso para: ${input.to}`);
    //     } catch (error) {
    //         this.logger.error('Erro ao enviar email:', error);
    //         throw error;
    //     }
    // }

    // convertPdfToBase64() {
    //     const curriculoPath = path.join(
    //         'src',
    //         'assets',
    //         'curriculos',
    //         `${this.fileNameCurriculo}`,
    //     );

    //     const pdfBuffer = fsNew.readFileSync(curriculoPath);
    //     return pdfBuffer.toString('base64');
    // }

    // generateDownloadUrl() {
    //     const base64Pdf = this.convertPdfToBase64();
    //     return `data:application/pdf;base64,${base64Pdf}`;
    // }
}
