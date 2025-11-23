import { CreateUserDto } from "@application/dtos/create-user.dto";
import { FindUserDto } from "@application/dtos/find-user.dto";
import { UserEntity } from "@domain/entities/user.entity";

export interface UsersRepository {
    create(data: UserEntity): Promise<any>;
    findOne(email: string): Promise<any>;
    find(data: any): Promise<any>;
    update(data: any): Promise<any>;
    delete(data: any): Promise<any>;
}

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');