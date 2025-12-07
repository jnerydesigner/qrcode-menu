import { Controller } from "@nestjs/common";
import { EventPattern, Payload, Ctx, RmqContext } from "@nestjs/microservices";
import { RabbitMQEventListener } from "@infra/services/queue/rabbitmq-event.listener";
import { MailService } from "@application/services/mail.service";

@Controller()
export class MagicLinkListener extends RabbitMQEventListener {
    constructor(private readonly mailService: MailService) {
        super();
    }

    @EventPattern('send-magic-link')
    async handleSendMagicLink(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('Received send magic link event:', data);
        await this.mailService.sendMagicLinkEmail(data.email, data.magicLink);
    }
}