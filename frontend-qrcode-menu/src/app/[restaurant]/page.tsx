import { findCompanyBySlug } from "@/api/companies";
import { PageMenu } from "@/components/PageMenu";
import { CategoryType } from "@/types/category.type";
import { CompanyType } from "@/types/company.type";
import { Product } from "@/types/product.type";

type tParams = Promise<{ restaurant: string }>;

export default async function CompanyMenu({ params }: { params: tParams }) {
    const { restaurant } = await params;

    const company = await findCompanyBySlug<CompanyType>(restaurant);
    console.log(company);

    // Extract unique categories from products
    const categoryMap = Array.from(
        new Map(
            company.products.map((product) => [product.category._id, product.category])
        ).values()
    ).map((category) => ({
        id: category._id,
        name: category.name,
        slug: category.slug,
        createdAt: category.created_at
    }));

    const products: Product[] = company.products.map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        slug: product.slug,
        company: product.company,
        image: product.image,
        categoryId: product.category._id,
        createdAt: product.created_at,
        category: {
            name: product.category.name,
            slug: product.category.slug
        },
        ingredients: product.ingredients.map((ingredient) => ({
            id: ingredient._id,
            name: ingredient.name,
            emoji: ingredient.emoji,
            color: ingredient.color,
            slug: ingredient.slug
        })),
        companyEntity: {
            id: company.id,
            name: company.name,
            slug: company.slug,
            createdAt: company.createdAt,
            image: company.image,
            products: []
        }
    }));

    return (
        <div className="min-h-screen bg-white shadow-sm animate-fade-in">
            <PageMenu products={products} categories={categoryMap} company={company} />
        </div>
    );
}
