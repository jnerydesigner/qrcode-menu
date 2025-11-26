import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@application/dtos/auth/login.dto';
import { ComparePasswordUtil } from '@infra/utils/compare-password.util';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<UserEntity | null> {
        const user = await this.usersService.findOne(email);
        if (!user) return null;
        const comparePassword = await ComparePasswordUtil(pass, user.password);
        if (user && comparePassword) {
            return user;
        }
        return null;
    }
    async login(email: string, password: string) {
        const userValidate = await this.validateUser(email, password);
        const payload = { username: userValidate?.email, sub: userValidate?.id, role: userValidate?.role, name: userValidate?.name };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
        };
    }
}
