import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Ingredient } from './ingredient.schema';
import { Company } from './company.schema';
import { ProductImage } from './product_image.schema';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: Ingredient.name }], default: [] })
  ingredients: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  company: Types.ObjectId | Company;

  @Prop({ type: [{ type: Types.ObjectId, ref: ProductImage.name }], default: [] })
  images: Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
