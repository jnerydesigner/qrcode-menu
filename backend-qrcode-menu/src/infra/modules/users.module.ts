import { UsersService } from '@application/services/users.service';
import { Module } from '@nestjs/common';
import { UsersController } from '@presenters/controllers/users/users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [],
})
export class UsersModule { }
