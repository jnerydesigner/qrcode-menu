import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { STEP_HANDLER_METADATA } from '@infra/decorators/template-step.decorator';
import { TemplateEngine } from './template-engine.service';
import * as path from 'node:path';

@Injectable()
export class TemplateResolver implements OnModuleInit {
    private readonly logger = new Logger(TemplateResolver.name);

    private handlerMap = new Map<number, any>();

    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly templateEngine: TemplateEngine,
    ) { }

    onModuleInit() {
        const providers = this.discoveryService.getProviders();

        for (const wrapper of providers) {
            const { instance, metatype } = wrapper;
            if (!instance || !metatype) continue;

            const step = Reflect.getMetadata(STEP_HANDLER_METADATA, metatype);

            if (step !== undefined) {
                this.logger.log(`Registrando StepHandler [step=${step}] → ${metatype.name}`);
                this.handlerMap.set(step, instance);
            }
        }
    }

    async render(step: number, context: any): Promise<string> {
        const handler = this.handlerMap.get(step);

        if (!handler) {
            throw new Error(`Nenhum StepHandler encontrado para step ${step}`);
        }

        const pathResult = path.join(
            'src',
            'application',
            'templates',
            'state'
        );

        const templateFile = handler.getTemplateFile(context);
        const replacements = await handler.getReplacements(context);

        return this.templateEngine.render(pathResult, templateFile, replacements, context);
    }
}
