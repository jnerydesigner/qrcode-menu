import { Injectable } from "@nestjs/common";
import { StepStrategy } from "@application/services/step-strategy.interface";
import { StepHandler } from "@infra/decorators/template-step.decorator";

@Injectable()
@StepHandler(1)
export class Step1WelcomeEmail implements StepStrategy {
    private company = "Qr Code Menu";


    getTemplateFile() {
        return 'template-step-1.html';
    }

    getReplacements(context: any) {
        const config: Record<string, string> = {
            BTN_CREATE_COMPANY_SCREEN: 'Continue sua jornada de configuração clicando aqui',
        };
        return {
            TITLE: '🎉 Bem-vindo ao QR Code Menu!',
            USER: context.userName,
            COMPANY: this.company,
            ACTION_URL: context.magicLink,
            DESCRIPTION: `Estamos muito felizes aqui na ${this.company} em tê-lo conosco. Este é o início de uma jornada incrível.
                            Click no botão abaixo para começar a jornada de configuração da sua abertura de Conta.
                            Complete esta etapa para desbloquear novos recursos e avançar no processo de configuração.`,
            BTN_CREATE_COMPANY_SCREEN: config.BTN_CREATE_COMPANY_SCREEN,
        };
    }
}
