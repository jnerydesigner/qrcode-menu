import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StateMachineEventsService {
    constructor(
        @Inject('STATE_MACHINE_SERVICE')
        private readonly client: ClientProxy,
    ) { }

    async emit(event: string, payload: any) {
        console.log(`➡️ [STATE MACHINE EMIT] Event "${event}" emitted`, payload);

        return this.client.emit(event, payload).toPromise();
    }
}
