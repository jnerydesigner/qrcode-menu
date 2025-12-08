import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection: 'company_images',
    timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class CompanyImage extends Document {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    declare _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
    company: Types.ObjectId;

    @Prop({ required: true })
    image_full: string;

    @Prop({ required: true })
    image_medium: string;

    @Prop({ required: true })
    image_small: string;

    @Prop()
    created_at: Date;
}

export const CompanyImageSchema = SchemaFactory.createForClass(CompanyImage);
