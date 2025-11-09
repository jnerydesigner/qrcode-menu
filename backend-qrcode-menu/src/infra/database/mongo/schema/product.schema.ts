import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Ingredient } from './ingredient.schema';

@Schema({
  collection: 'products',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Product extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  declare _id: Types.ObjectId;

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

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Types.ObjectId | Category;

  @Prop()
  created_at: Date;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Ingredient.name }],
    default: [],
  })
  ingredients: (Types.ObjectId | Ingredient)[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
