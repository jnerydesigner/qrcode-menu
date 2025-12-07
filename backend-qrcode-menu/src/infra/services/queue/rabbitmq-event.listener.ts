import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export abstract class RabbitMQEventListener {
    // Base class for RabbitMQ listeners
    // Subclasses should implement methods decorated with @EventPattern
}
