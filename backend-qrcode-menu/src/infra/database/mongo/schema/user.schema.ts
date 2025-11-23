import { Role } from '@application/enums/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    declare _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);