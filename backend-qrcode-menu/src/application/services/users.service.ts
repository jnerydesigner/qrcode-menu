import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, type UsersRepository } from '@domain/repositories/users.repository';
import { CreateUserDto } from '@application/dtos/create-user.dto';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async create(data: CreateUserDto): Promise<any> {
        const userEntity = UserEntity.create(
            data.name,
            data.email,
            data.password,
            data.role,
        );

        return this.usersRepository.create(userEntity);
    }

    async findOne(email: string): Promise<UserEntity> {
        const findUser = await this.usersRepository.findOne(email);
        if (!findUser) throw new Error('User not found');

        return findUser;
    }

    async find(data: any): Promise<any> {
        return this.usersRepository.find(data);
    }

    async update(data: any): Promise<any> {
        return this.usersRepository.update(data);
    }

    async delete(data: any): Promise<any> {
        return this.usersRepository.delete(data);
    }
}
