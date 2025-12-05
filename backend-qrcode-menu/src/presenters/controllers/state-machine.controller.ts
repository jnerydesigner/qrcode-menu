import { Controller, Post, Body, Param } from '@nestjs/common';
import { OnboardingStateMachine, OnboardingState } from '../../application/services/state-machine/onboarding-state-machine.service';

@Controller('state-machine')
export class StateMachineController {
    constructor(private readonly stateMachine: OnboardingStateMachine) { }

    @Post('email-submitted')
    async emailSubmitted(@Body('userId') userId: string) {
        return this.stateMachine.emailSubmitted(userId);
    }

    @Post('verify')
    async verify(@Body('userId') userId: string) {
        return this.stateMachine.verified(userId);
    }

    @Post('transition')
    async transition(
        @Body('userId') userId: string,
        @Body('from') from: OnboardingState,
        @Body('to') to: OnboardingState,
        @Body('meta') meta: any,
    ) {
        return this.stateMachine.transition(userId, from, to, meta);
    }
}
