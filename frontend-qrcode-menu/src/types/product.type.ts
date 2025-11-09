export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image: string;
  categoryId: string;
  createdAt: string;
  category: Category;
  productIngredient: ProductIngredient[];
}

export interface ProductIngredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}
