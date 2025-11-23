export interface CompanyType {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    image: string;
    image_small: string;
    products: ProductType[];
}

export interface ProductType {
    id: string;
    _id: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    image: string;
    categoryId: string;
    createdAt: string;
    created_at: string;
    category: CategoryType;
    company: string;
    ingredients: IngredientType[];
}

export interface IngredientType {
    id: string;
    _id: string;
    name: string;
    emoji: string;
    color: string;
    slug: string;
    created_at: string;
}

export type CategoryType = {
    id: string;
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    created_at: string;
};