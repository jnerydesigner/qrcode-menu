import { Test, TestingModule } from '@nestjs/testing';
import { ProductMongoRepository } from './product-mongo.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Category } from '../schema/category.schema';
import { Ingredient } from '../schema/ingredient.schema';
import { NotFoundProductError } from '@infra/errors/notfound.error';
import { Types } from 'mongoose';

describe('ProductMongoRepository', () => {
    let repository: ProductMongoRepository;
    let productModel: any;

    const mockProductModel = {
        findByIdAndUpdate: jest.fn(),
    };

    const mockCategoryModel = {};
    const mockIngredientModel = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductMongoRepository,
                {
                    provide: getModelToken(Product.name),
                    useValue: mockProductModel,
                },
                {
                    provide: getModelToken(Category.name),
                    useValue: mockCategoryModel,
                },
                {
                    provide: getModelToken(Ingredient.name),
                    useValue: mockIngredientModel,
                },
            ],
        }).compile();

        repository = module.get<ProductMongoRepository>(ProductMongoRepository);
        productModel = module.get(getModelToken(Product.name));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('updateImage', () => {
        it('should update image successfully', async () => {
            const productId = new Types.ObjectId().toString();
            const image = 'http://example.com/image.jpg';
            const mockUpdatedProduct = {
                _id: new Types.ObjectId(productId),
                name: 'Test Product',
                image: image,
                category: { name: 'Category' },
                company: { name: 'Company', slug: 'company-slug' },
                ingredients: [],
            };

            const mockQuery = {
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(mockUpdatedProduct),
            };

            productModel.findByIdAndUpdate.mockReturnValue(mockQuery);

            const result = await repository.updateImage(productId, image);

            expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
                expect.any(Types.ObjectId),
                { $set: { image } },
                { new: true },
            );
            expect(result.image).toBe(image);
        });

        it('should throw NotFoundProductError if product not found', async () => {
            const productId = new Types.ObjectId().toString();
            const image = 'http://example.com/image.jpg';

            const mockQuery = {
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(null),
            };

            productModel.findByIdAndUpdate.mockReturnValue(mockQuery);

            await expect(repository.updateImage(productId, image)).rejects.toThrow(
                NotFoundProductError,
            );
        });
    });
});
