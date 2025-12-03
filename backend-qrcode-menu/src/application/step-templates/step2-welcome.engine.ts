import { Injectable } from "@nestjs/common";
import { StepStrategy } from "@application/services/step-strategy.interface";
import { StepHandler } from "@infra/decorators/template-step.decorator";

@Injectable()
@StepHandler(2)
export class Step2WelcomeEmail implements StepStrategy {
    private company = "Qr Code Menu";

    getTemplateFile() {
        return 'template-step-2.html';
    }

    getReplacements(context: any) {
        const config: Record<string, string> = {
            BTN_CREATE_COMPANY_SCREEN: 'Click aqui para validar sua conta',
        };
        return {
            TITLE: '🎉 Bem-vindo ao QR Code Menu!',
            USER: context.userName,
            COMPANY: this.company,
            ACTION_URL: context.confirmUrl,
            DESCRIPTION: `Agora que já criou sua conta, vamos valida-la para que possamos avançar no processo de configuração.
                           `,
            BTN_CREATE_COMPANY_SCREEN: config.BTN_CREATE_COMPANY_SCREEN,
        };
    }
}
