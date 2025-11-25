import { CreateCategoryUsecase } from '@application/use-case/category/create-category.usecase';
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from '@domain/repositories/category.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntity } from '@domain/entities/category.entity';

describe('CreateCategoryUsecase', () => {
    let createCategoryUsecase: CreateCategoryUsecase;
    let categoryRepository: jest.Mocked<CategoryRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCategoryUsecase,
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

        createCategoryUsecase = module.get<CreateCategoryUsecase>(CreateCategoryUsecase);
        categoryRepository = module.get(CATEGORY_REPOSITORY);
    });

    it('deve criar uma nova categoria', async () => {
        const categoryName = 'Bebidas';
        const expectedCategory = new CategoryEntity(categoryName, null, null, '123');

        categoryRepository.create.mockResolvedValue(expectedCategory);

        const result = await createCategoryUsecase.execute(categoryName);

        expect(categoryRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: categoryName,
            }),
        );
        expect(result).toEqual(expectedCategory);
    });

    it('deve propagar erro do repositório', async () => {
        const categoryName = 'Sobremesas';
        const error = new Error('Database connection failed');

        categoryRepository.create.mockRejectedValue(error);

        await expect(createCategoryUsecase.execute(categoryName)).rejects.toThrow(error);
    });
});
