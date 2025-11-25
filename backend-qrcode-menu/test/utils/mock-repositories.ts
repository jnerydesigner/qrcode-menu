import { CategoryRepository } from "@domain/repositories/category.repository";
import { CompanyRepository } from "@domain/repositories/company.repository";
import { IngredientRepository } from "@domain/repositories/ingredient.repository";
import { ProductRepository } from "@domain/repositories/product.repository";


export const mockCompanyRepository = (): jest.Mocked<CompanyRepository> => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findCompanyBySlug: jest.fn(),
    findCompanyById: jest.fn(),
    updateCompany: jest.fn(),
    deleteCompany: jest.fn(),
} as jest.Mocked<CompanyRepository>);

export const mockCategoryRepository = (): jest.Mocked<CategoryRepository> => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
});

export const mockIngredientRepository = (): jest.Mocked<IngredientRepository> => ({
    save: jest.fn(),
    saveMany: jest.fn(),
    findAll: jest.fn(),
    findId: jest.fn(),
    findManyByIds: jest.fn(),
});

export const mockProductRepository = (): jest.Mocked<ProductRepository> => ({
    save: jest.fn(),
    findProductBySlug: jest.fn(),
    findOne: jest.fn(),
    findOneSlug: jest.fn(),
    saveMany: jest.fn(),
    findAll: jest.fn(),
    updateProduct: jest.fn(),
    removeIngredient: jest.fn(),
    updateImage: jest.fn(),
    verifyExistsImagesproduct: jest.fn(),
});
