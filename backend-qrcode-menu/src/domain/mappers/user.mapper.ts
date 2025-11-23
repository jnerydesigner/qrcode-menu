import { Role } from "@application/enums/roles.enum";
import { UserEntity } from "@domain/entities/user.entity";
import { UserDocument } from "@infra/database/mongo/schema/user.schema";
import { Types } from "mongoose";

export class UserMapper {
    static toMongo(user: UserEntity) {
        return {
            _id: user.id ? new Types.ObjectId(user.id) : undefined,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        };
    }

    static fromMongo(user: UserDocument): UserEntity {
        return new UserEntity(
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at,
            user.updated_at,
            user._id.toString(),
        );
    }
}