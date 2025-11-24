import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AuthService } from '@application/services/auth.service';
import { UsersService } from '@application/services/users.service';
import { AuthController } from '@presenters/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { jwtConstants } from '@infra/constants/constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@infra/strategies/jwt.strategy';
import { RolesGuard } from '@infra/guard/roles.guard';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy, RolesGuard],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
