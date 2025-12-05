import { MailService } from "@application/services/mail.service";
import { OnboardingStateMachine } from "@application/services/state-machine/onboarding-state-machine.service";
import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class StateMachineListener {
    constructor(private readonly stateMachine: OnboardingStateMachine, private readonly mailService: MailService) { }

    @EventPattern('state.transition')
    handleTransition(data: any) {
        console.log("📩 [RABBIT EVENT RECEIVED]", data);

        console.log(data.to)


        switch (data.to) {
            case 'EMAIL_SUBMITTED':
                this.mailService.sendOnboardingStep(2, {
                    userName: "John Doe",
                    companyName: "TechSolutions",
                    email: "jander.webmaster@gmail.com"
                });

                break;
            default:
                break;
        }
    }
}
