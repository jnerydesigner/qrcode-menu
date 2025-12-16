import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum MagicLinkStatus {
    CREATED = 'CREATED',
    RESENT = 'RESENT'
}

@Schema({
    collection: 'magic_link',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class MagicLink extends Document {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    declare _id: Types.ObjectId;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, unique: true })
    magic_link: string;

    @Prop({ type: String, enum: MagicLinkStatus, default: MagicLinkStatus.CREATED })
    status: MagicLinkStatus;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const MagicLinkSchema = SchemaFactory.createForClass(MagicLink);