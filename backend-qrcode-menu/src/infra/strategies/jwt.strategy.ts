import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: PayloadUserInput): Promise<PayloadUserOutput> {
        if (!payload || !payload.sub || !payload.role) {
            throw new UnauthorizedException();
        }
        return {
            userId: payload.sub,
            username: payload.username,
            name: payload.name,
            email: payload.username,
            role: payload.role
        };
    }
}

interface PayloadUserInput {
    username: string;
    sub: string;
    role: string;
    name: string;
}

interface PayloadUserOutput {
    userId: string;
    username: string;
    name: string;
    email: string;
    role: string;
}
