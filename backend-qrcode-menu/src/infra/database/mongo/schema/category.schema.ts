/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from './product.schema';

@Schema({
  collection: 'categories',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Category extends Document {
  @Prop({
    type: String,
    default: () => new Types.UUID().toString(),
    unique: true,
  })
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  created_at: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
