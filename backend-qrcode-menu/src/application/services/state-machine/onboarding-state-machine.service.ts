import { Injectable } from '@nestjs/common';
import { StateMachineEventsService } from '../state-machine-event.service';


export enum OnboardingState {
    UNREGISTERED = 'UNREGISTERED',
    EMAIL_SUBMITTED = 'EMAIL_SUBMITTED',
    AWAITING_VERIFICATION = 'AWAITING_VERIFICATION',
    VERIFIED = 'VERIFIED',
    COMPANY_CREATED = 'COMPANY_CREATED',
    AWAITING_COMPANY_ACTIVATION = 'AWAITING_COMPANY_ACTIVATION',
    COMPANY_ACTIVE = 'COMPANY_ACTIVE',
}

@Injectable()
export class OnboardingStateMachine {
    constructor(private readonly events: StateMachineEventsService) { }

    async transition(userId: string, from: OnboardingState, to: OnboardingState, meta: any = {}) {
        console.log(`🚀 TRANSITION: ${from} → ${to} | user=${userId}`);

        await this.events.emit('state.transition', {
            userId,
            from,
            to,
            meta,
            timestamp: new Date().toISOString(),
        });

        return to;
    }

    async receivedMagicLink() {
        return null;
    }

    async emailSubmitted(userId: string) {
        return this.transition(
            userId,
            OnboardingState.UNREGISTERED,
            OnboardingState.EMAIL_SUBMITTED,
        );
    }

    async awaitingVerification(userId: string) {
        return this.transition(
            userId,
            OnboardingState.EMAIL_SUBMITTED,
            OnboardingState.AWAITING_VERIFICATION,
        );
    }

    async verified(userId: string) {
        return this.transition(
            userId,
            OnboardingState.AWAITING_VERIFICATION,
            OnboardingState.VERIFIED,
        );
    }

    async companyCreated(userId: string, companyId: string) {
        return this.transition(
            userId,
            OnboardingState.VERIFIED,
            OnboardingState.COMPANY_CREATED,
            { companyId },
        );
    }

    async awaitingCompanyActivation(userId: string, companyId: string) {
        return this.transition(
            userId,
            OnboardingState.COMPANY_CREATED,
            OnboardingState.AWAITING_COMPANY_ACTIVATION,
            { companyId },
        );
    }

    async companyActive(userId: string, companyId: string) {
        return this.transition(
            userId,
            OnboardingState.AWAITING_COMPANY_ACTIVATION,
            OnboardingState.COMPANY_ACTIVE,
            { companyId },
        );
    }
}
