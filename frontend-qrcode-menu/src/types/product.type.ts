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
}

export interface Category {
  name: string;
  slug: string;
}
