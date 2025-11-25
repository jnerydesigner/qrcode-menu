import { CreateProductUseCase, CreateProductInput } from '@application/use-case/product/create-product.usecase';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '@domain/repositories/product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '@domain/entities/product.entity';

describe('CreateProductUseCase', () => {
    let createProductUseCase: CreateProductUseCase;
    let productRepository: jest.Mocked<ProductRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProductUseCase,
                {
                    provide: PRODUCT_REPOSITORY,
                    useValue: {
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
                    } as jest.Mocked<ProductRepository>,
                },
            ],
        }).compile();

        createProductUseCase = module.get<CreateProductUseCase>(CreateProductUseCase);
        productRepository = module.get(PRODUCT_REPOSITORY);
    });

    it('deve criar um novo produto', async () => {
        const input: CreateProductInput = {
            name: 'Pizza Margherita',
            description: 'Pizza clássica italiana',
            price: 35.90,
            image: '',
            categoryId: '123',
            company: 'company-slug',
        };

        const expectedProduct = new ProductEntity(
            input.name,
            input.description,
            input.price,
            '',
            input.categoryId,
            '',
            null,
            input.company,
            null,
            [],
            '456',
        );

        productRepository.save.mockResolvedValue(expectedProduct);

        const result = await createProductUseCase.execute(input);

        expect(productRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                name: input.name,
                description: input.description,
                price: input.price,
                company: input.company,
            }),
        );
        expect(result).toEqual(expectedProduct);
    });

    it('deve propagar erro do repositório', async () => {
        const input: CreateProductInput = {
            name: 'Hamburguer',
            description: 'Hamburguer artesanal',
            price: 25.00,
            image: '',
            categoryId: '789',
            company: 'burger-co',
        };

        const error = new Error('Save failed');
        productRepository.save.mockRejectedValue(error);

        await expect(createProductUseCase.execute(input)).rejects.toThrow(error);
    });
});
