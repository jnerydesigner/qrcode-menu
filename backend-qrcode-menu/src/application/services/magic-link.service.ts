import { MAGIC_LINK_REPOSITORY, type MagicLinkRepository } from '@domain/repositories/magic-link.repository';
import { MagicLinkEntity } from '@domain/entities/magic-link.entity';
import { MagicLinkStatus } from '@infra/database/mongo/schema/magic-link.schema';
import { env } from '@infra/config/env';
import { RabbitMQEventEmitter } from '@infra/services/queue/rabbitmq-event.emitter';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MagicLinkService {
    constructor(private readonly jwtService: JwtService, private readonly rabbitMqEventEmitter: RabbitMQEventEmitter,
        @Inject(MAGIC_LINK_REPOSITORY)
        private readonly magicLinkRepository: MagicLinkRepository
    ) { }

    async createMagicLink(email: string): Promise<MagicLinkResponse> {
        const payload = { email };
        const token = this.jwtService.sign(payload, { expiresIn: '15m' });
        const magicLink = `${env.PATH_FRONTEND}/companies/new?token=${token}`;
        console.log(`Generated magic link for ${email}: ${magicLink}`);

        const existingMagicLink = await this.magicLinkRepository.findOne(email);

        let status: MagicLinkStatus;

        if (existingMagicLink) {
            // Magic link já existe, atualizar com novo token
            await this.magicLinkRepository.update(existingMagicLink.id, magicLink);
            status = MagicLinkStatus.RESENT;
            console.log(`Magic link resent for ${email}`);
        } else {
            // Criar novo magic link
            const newMagicLink = MagicLinkEntity.create(email, magicLink);
            await this.magicLinkRepository.create(newMagicLink);
            status = MagicLinkStatus.CREATED;
            console.log(`New magic link created for ${email}`);
        }

        // Emitir evento para enviar email
        this.rabbitMqEventEmitter.emit<OutPutEmitterMagicLink>('send-magic-link', { email, magicLink });

        return {
            status,
            email,
            magicLink
        };
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

export interface MagicLinkResponse {
    status: MagicLinkStatus;
    email: string;
    magicLink: string;
}
