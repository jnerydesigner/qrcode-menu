import type { CategoryType } from "./category.type";
import type { IngredientType } from "./ingredients.type";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image: string;
  categoryId: string;
  createdAt: string;
  category: CategoryType;
  ingredients: IngredientType[];
}

export interface CreateProductType {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}
