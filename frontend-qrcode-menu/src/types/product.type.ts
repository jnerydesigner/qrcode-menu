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
  companyEntity: Company;
  ingredients: ProductIngredient[];
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


export interface Company {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  image: string;
}



