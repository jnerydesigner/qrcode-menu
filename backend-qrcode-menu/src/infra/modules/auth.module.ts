import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AuthService } from '@application/services/auth.service';
import { UsersService } from '@application/services/users.service';
import { AuthController } from '@presenters/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { jwtConstants } from '@infra/constants/constant';

@Module({
    imports: [UsersModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
    })],
    providers: [AuthService, UsersService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
