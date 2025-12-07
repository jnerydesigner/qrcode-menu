import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQEventEmitter {
    constructor(
        @Inject('STATE_MACHINE_SERVICE')
        private readonly client: ClientProxy,
    ) { }

    emit<T>(pattern: string, data: T) {
        return this.client.emit(pattern, data);
    }
}
