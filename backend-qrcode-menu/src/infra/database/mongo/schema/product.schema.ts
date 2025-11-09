import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';

@Schema({
  collection: 'products',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Product extends Document {
  @Prop({
    type: String,
    default: () => new Types.UUID().toString(),
    unique: true,
  })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop()
  image: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: String, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  created_at: Date;

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        emoji: { type: String, required: true },
        color: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
    default: [],
  })
  productIngredient: {
    id: string;
    name: string;
    emoji: string;
    color: string;
    slug: string;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
