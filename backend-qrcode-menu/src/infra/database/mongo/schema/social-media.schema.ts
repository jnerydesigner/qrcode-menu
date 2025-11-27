import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from './company.schema';

export type SocialMediaDocument = SocialMedia & Document;

@Schema({
    collection: 'social_media',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class SocialMedia {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    declare _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    link: string;

    @Prop({ required: true })
    svg_path: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
    company: Types.ObjectId;


    created_at: Date;
}

export const SocialMediaSchema = SchemaFactory.createForClass(SocialMedia);


