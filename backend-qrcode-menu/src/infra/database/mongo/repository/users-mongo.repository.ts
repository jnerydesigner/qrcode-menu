import { UsersRepository } from "@domain/repositories/users.repository";
import { Model } from "mongoose";
import { User as UserMongo } from "../schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { FindUserDto } from "@application/dtos/find-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { UserMapper } from "@domain/mappers/user.mapper";


@Injectable()
export class UsersMongoRepository implements UsersRepository {
    constructor(
        @InjectModel(UserMongo.name)
        private readonly userModel: Model<UserMongo>,
    ) { }
    async create(data: UserEntity): Promise<any> {
        const userMapper = UserMapper.toMongo(data)
        console.log(userMapper)
        const created = new this.userModel(userMapper);
        const saved = await created.save();

        return UserMapper.fromMongo(saved);
    }
    async findOne(email: string): Promise<UserEntity> {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userMapper = UserMapper.fromMongo(user);

        return userMapper;
    }
    async find(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async update(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}