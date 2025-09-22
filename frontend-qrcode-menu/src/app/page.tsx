import { PageMenu } from "@/components/PageMenu";
import { CategoryType } from "@/types/category.type";
import { Product } from "@/types/product.type";

export default async function Home() {
  const dataProducts = await fetch("http://localhost:3399/products");
  const products: Product[] = await dataProducts.json();

  const dataCategories = await fetch("http://localhost:3399/categories");
  const categories: CategoryType[] = await dataCategories.json();

  return (
    <div className="min-h-screen bg-white shadow-sm animate-fade-in">
      <PageMenu products={products} categories={categories} />
    </div>
  );
}
