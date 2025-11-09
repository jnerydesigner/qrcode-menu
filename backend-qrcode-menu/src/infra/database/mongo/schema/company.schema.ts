import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'companies',
  timestamps: { createdAt: 'created_at', updatedAt: false },
})
export class Company extends Document {
  @Prop({
    type: String,
    default: () => new Types.UUID().toString(),
    unique: true,
  })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  created_at: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
