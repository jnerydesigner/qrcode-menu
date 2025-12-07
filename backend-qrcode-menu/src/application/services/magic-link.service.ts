import { env } from '@infra/config/env';
import { RabbitMQEventEmitter } from '@infra/services/queue/rabbitmq-event.emitter';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MagicLinkService {
    constructor(private readonly jwtService: JwtService, private readonly rabbitMqEventEmitter: RabbitMQEventEmitter) { }

    async createMagicLink(email: string) {
        const payload = { email };
        const token = this.jwtService.sign(payload, { expiresIn: '15m' });
        const magicLink = `${env.PATH_FRONTEND}/companies/new?token=${token}`;
        console.log(`Generated magic link for ${email}: ${magicLink}`);

        this.rabbitMqEventEmitter.emit<OutPutEmitterMagicLink>('send-magic-link', { email, magicLink })

    }

    async validateMagicLink(token: string): Promise<{ email: string }> {
        try {
            const payload = this.jwtService.verify(token, {
                secret: env.QR_CODE_SECRET_KEY,
            });
            return { email: payload.email };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}

interface OutPutEmitterMagicLink {
    email: string;
    magicLink: string;
}
