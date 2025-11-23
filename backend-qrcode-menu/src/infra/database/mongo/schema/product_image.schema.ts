import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection: 'product_images',
    timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class ProductImage extends Document {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    declare _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;

    @Prop({ required: true })
    image_full: string;

    @Prop({ required: true })
    image_medium: string;

    @Prop({ required: true })
    image_small: string;

    @Prop()
    created_at: Date;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
