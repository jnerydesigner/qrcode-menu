import * as bcrypt from 'bcrypt'

export class UserEntity {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        name: string,
        email: string,
        password: string,
        role: string,
        createdAt: Date,
        updatedAt: Date,
        id?: string,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    static create(
        name: string,
        email: string,
        password: string,
        role: string,
    ): UserEntity {
        return new UserEntity(
            name,
            email,
            UserEntity.criptPassword(password),
            role,
            new Date(),
            new Date(),
        );
    }

    private static criptPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }
}