import { FindOneCategoryUseCase } from "@application/use-case/category/find-one-category.usecase";
import { CategoryEntity } from "@domain/entities/category.entity";
import { CATEGORY_REPOSITORY, CategoryRepository } from "@domain/repositories/category.repository";
import { Test, TestingModule } from "@nestjs/testing";

describe("FindOneCategory", () => {
    let findOneCategoryUseCase: FindOneCategoryUseCase;
    let categoryRepository: jest.Mocked<CategoryRepository>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindOneCategoryUseCase,
                {
                    provide: CATEGORY_REPOSITORY,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findCategory: jest.fn(),
                        updateCategory: jest.fn(),
                        deleteCategory: jest.fn(),
                        findOneById: jest.fn(),
                    } as jest.Mocked<CategoryRepository>,
                },
            ],
        }).compile();

        findOneCategoryUseCase = module.get<FindOneCategoryUseCase>(FindOneCategoryUseCase);
        categoryRepository = module.get(CATEGORY_REPOSITORY);
    })

    it("should find a category by id", async () => {
        const categoryId = "1";
        const category = new CategoryEntity(
            "Category",
            categoryId,
            new Date(),
            "category",
        );
        categoryRepository.findOneById.mockResolvedValue(category);
        const result = await findOneCategoryUseCase.execute(categoryId);

        expect(result).toEqual(category);
    });
});