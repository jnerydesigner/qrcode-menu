import { MagicLinkService } from "@application/services/magic-link.service";
import { RabbitMQEventEmitter } from "@infra/services/queue/rabbitmq-event.emitter";
import { Module } from "@nestjs/common";
import { MagicLinkController } from "@presenters/controllers/magic-link.controller";
import { MagicLinkListener } from "@presenters/listeners/magic-link.listener";

import { MailModule } from "./mail.module";

@Module({
    imports: [MailModule],
    providers: [MagicLinkService, RabbitMQEventEmitter],
    exports: [MagicLinkService],
    controllers: [MagicLinkController, MagicLinkListener]
})
export class MagicLinkModule { }