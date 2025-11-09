import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
import { Ingredient } from './ingredient.schema';

@Schema({ collection: 'products_ingredients' })
export class ProductIngredient extends Document {
  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Ingredient', required: true })
  ingredientId: string;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ type: Types.ObjectId, ref: 'Ingredient' })
  ingredient: Ingredient;
}

export const ProductIngredientSchema =
  SchemaFactory.createForClass(ProductIngredient);
