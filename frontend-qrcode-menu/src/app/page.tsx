import { PageMenu } from "@/components/PageMenu";
import { CategoryType } from "@/types/category.type";
import { CompanyType } from "@/types/company.type";
import { Product } from "@/types/product.type";

export default async function Home() {
  const dataProducts = await fetch("http://localhost:3399/products");
  const products: Product[] = await dataProducts.json();
  console.log("Products:", products);

  const dataCategories = await fetch("http://localhost:3399/categories");
  const categories: CategoryType[] = await dataCategories.json();

  // Fetch company data - adjust the endpoint as needed
  const dataCompany = await fetch("http://localhost:3399/company/hamburgueria-da-vila");
  const company: CompanyType = await dataCompany.json();

  return (
    <div className="min-h-screen bg-white shadow-sm animate-fade-in">
      <PageMenu products={products} categories={categories} company={company} />
    </div>
  );
}
