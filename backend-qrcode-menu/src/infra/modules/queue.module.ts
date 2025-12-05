import { LoggerService } from "@application/services/logger.service";
import { MailService } from "@application/services/mail.service";
import { StateMachineEventsService } from "@application/services/state-machine-event.service";
import { OnboardingStateMachine } from "@application/services/state-machine/onboarding-state-machine.service";
import { TemplateEngine } from "@application/services/template-engine.service";
import { TemplateResolver } from "@application/services/template-resolver.service";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DiscoveryService } from "@nestjs/core";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { StateMachineController } from "@presenters/controllers/state-machine.controller";
import { StateMachineListener } from "@presenters/listeners/state-machine.listner";
import { env } from "process";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'STATE_MACHINE_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: () => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            `amqp://${env.RABBITMQ_DEFAULT_USER}:${env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
                        ],
                        queue: 'state_machine_queue',
                        queueOptions: {
                            durable: false,
                        },
                    },
                }),
            },
        ]),
    ],
    providers: [StateMachineEventsService, OnboardingStateMachine, MailService, LoggerService, TemplateResolver, DiscoveryService, TemplateEngine],
    exports: [],
    controllers: [StateMachineListener, StateMachineController]
})
export class QueueModule { }