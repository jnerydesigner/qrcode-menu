import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@application/dtos/auth/login.dto';
import { ComparePasswordUtil } from '@infra/utils/compare-password.util';
import { UserEntity } from '@domain/entities/user.entity';
import { LoggerService } from './logger.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly loggerService: LoggerService,
    ) {
        this.loggerService.setContext(AuthService.name);
    }

    async validateUser(email: string, pass: string): Promise<UserEntity | null> {
        this.loggerService.info(`User ${email} and ${pass} validated`);
        const user = await this.usersService.findOne(email);
        this.loggerService.info(`User ${JSON.stringify(user)} validated`);
        if (!user) return null;
        const comparePassword = await ComparePasswordUtil(pass, user.password);
        this.loggerService.info(`Password compared ${comparePassword}`);
        if (user && comparePassword) {
            return user;
        }
        return null;
    }
    async login(email: string, password: string) {
        const userValidate = await this.validateUser(email, password);
        this.loggerService.info(`User ${userValidate?.email} validated`);
        const payload = { username: userValidate?.email, sub: userValidate?.id, role: userValidate?.role, name: userValidate?.name };
        this.loggerService.info(`Payload generated ${JSON.stringify(payload)}`)
        const accessToken = this.jwtService.sign(payload);
        this.loggerService.info(`Token generated ${accessToken}`)
        return {
            accessToken,
        };
    }
}
