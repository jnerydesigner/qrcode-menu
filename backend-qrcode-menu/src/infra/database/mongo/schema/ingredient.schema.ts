import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'ingredients',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Ingredient extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  declare _id: Types.ObjectId;

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
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
