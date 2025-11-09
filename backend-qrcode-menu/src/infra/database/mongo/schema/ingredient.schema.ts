import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductIngredient } from './product-ingredient.schema';

@Schema({
  collection: 'ingredients',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Ingredient extends Document {
  @Prop({
    type: String,
    default: () => new Types.UUID().toString(),
    unique: true,
  })
  declare id: string;

  @Prop({ required: true })
  emoji: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  created_at: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductIngredient' }] })
  productIngredient: ProductIngredient[];
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
