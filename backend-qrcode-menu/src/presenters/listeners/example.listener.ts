import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { RabbitMQEventListener } from '@infra/services/queue/rabbitmq-event.listener';

@Controller()
export class ExampleListener extends RabbitMQEventListener {
    @EventPattern('example.event')
    handleExampleEvent(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('Received example event:', data);

        // Se você precisar acessar o canal ou a mensagem original:
        // const channel = context.getChannelRef();
        // const originalMsg = context.getMessage();
        // channel.ack(originalMsg);
    }
}
