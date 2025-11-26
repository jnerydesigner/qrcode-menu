import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'icons',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Icons extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  svg_tag: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const IconsSchema = SchemaFactory.createForClass(Icons);
