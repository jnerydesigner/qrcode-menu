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
  images?: {
    image_full: string;
    image_medium: string;
    image_small: string;
  };
}

export interface CreateProductType {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  company: string;
}

