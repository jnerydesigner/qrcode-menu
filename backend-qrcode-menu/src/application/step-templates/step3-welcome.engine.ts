import { Injectable } from "@nestjs/common";
import { StepStrategy } from "@application/services/step-strategy.interface";
import { StepHandler } from "@infra/decorators/template-step.decorator";

@Injectable()
@StepHandler(3)
export class Step3WelcomeEmail implements StepStrategy {
    private company = "Qr Code Menu";

    getTemplateFile() {
        return 'template-step-3.html';
    }

    getReplacements(context: any) {
        const config: Record<string, string> = {
            BTN_CREATE_COMPANY_SCREEN: 'Click e vamos para o Sistema de Cardapio Digital',
        };
        return {
            TITLE: '🎉 Bem-vindo ao QR Code Menu!',
            USER: context.userName,
            COMPANY: this.company,
            ACTION_URL: context.confirmUrl,
            DESCRIPTION: `Agora que já validou sua conta, vamos ao sistema de criação de produtos para seu cardapio Digital.
                           `,
            BTN_CREATE_COMPANY_SCREEN: config.BTN_CREATE_COMPANY_SCREEN,
        };
    }
}
