import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SocialMedia } from './social-media.schema';

@Schema({
  collection: 'companies',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Company extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  image_small: string;


  @Prop()
  created_at: Date;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  products: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'SocialMedias' }],
    default: [],
  })
  social_medias: Types.ObjectId[];


}

export const CompanySchema = SchemaFactory.createForClass(Company);
