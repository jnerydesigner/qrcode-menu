import { UpdateProductUseCase } from '@application/use-case/product/update-product.usecase';
import { ProductEntity } from '@domain/entities/product.entity';
import { IngredientRepository } from '@domain/repositories/ingredient.repository';
import { ProductRepository } from '@domain/repositories/product.repository';

describe('UpdateProductUseCase', () => {
  const makeProduct = () =>
    new ProductEntity(
      'Pizza',
      'Delicious pizza',
      25,
      'pizza.png',
      '6910c8887042b03fc68ba3aa',
      '6910c8887042b03fc68ba3ab',
      new Date(),
      'pizza',
      { name: 'Main', slug: 'main' },
      [
        {
          id: '6910c8517042b03fc68ba390',
          name: 'Cheese',
          emoji: '🧀',
          color: '#fff',
          slug: 'cheese',
        },
      ],
    );

  it('should ignore updates when the product does not exist', async () => {
    const notFoundError = Object.assign(new Error('Product not found'), {
      statusCode: 404,
      name: 'NotFoundProductError',
    });

    const productRepository: ProductRepository = {
      save: jest.fn(),
      findProductBySlug: jest.fn(),
      findOne: jest.fn().mockRejectedValue(notFoundError),
      findOneSlug: jest.fn(),
      saveMany: jest.fn(),
      findAll: jest.fn(),
      updateProduct: jest.fn(),
    } as unknown as ProductRepository;

    const ingredientRepository: IngredientRepository = {
      save: jest.fn(),
      saveMany: jest.fn(),
      findAll: jest.fn(),
      findId: jest.fn(),
      findManyByIds: jest.fn(),
    } as unknown as IngredientRepository;

    const useCase = new UpdateProductUseCase(
      productRepository,
      ingredientRepository,
    );

    const result = await useCase.execute('missing-id', {});

    expect(result).toBeNull();
    expect(ingredientRepository.findManyByIds).not.toHaveBeenCalled();
    expect(productRepository.updateProduct).not.toHaveBeenCalled();
  });

  it('should append new ingredients without removing existing ones', async () => {
    const product = makeProduct();
    const newIngredient = {
      id: '6910c8517042b03fc68ba391',
      name: 'Tomato',
      emoji: '🍅',
      color: '#f00',
      slug: 'tomato',
    };

    const productRepository: ProductRepository = {
      save: jest.fn(),
      findProductBySlug: jest.fn(),
      findOne: jest.fn().mockResolvedValue(product),
      findOneSlug: jest.fn(),
      saveMany: jest.fn(),
      findAll: jest.fn(),
      updateProduct: jest
        .fn()
        .mockImplementation(async (entity: ProductEntity) => entity),
    } as unknown as ProductRepository;

    const ingredientRepository: IngredientRepository = {
      save: jest.fn(),
      saveMany: jest.fn(),
      findAll: jest.fn(),
      findId: jest.fn(),
      findManyByIds: jest.fn().mockResolvedValue([newIngredient]),
    } as unknown as IngredientRepository;

    const useCase = new UpdateProductUseCase(
      productRepository,
      ingredientRepository,
    );

    const result = await useCase.execute(product.id, {
      productIngredient: [
        {
          ingredientId: newIngredient.id,
        },
      ],
    });

    expect(productRepository.findOne).toHaveBeenCalledWith(product.id);
    expect(ingredientRepository.findManyByIds).toHaveBeenCalledWith([
      newIngredient.id,
    ]);
    expect(productRepository.updateProduct).toHaveBeenCalledTimes(1);

    const updateCall = (productRepository.updateProduct as jest.Mock).mock
      .calls[0][0] as ProductEntity;

    expect(updateCall.ingredients).toEqual([
      ...(product.ingredients ?? []),
      newIngredient,
    ]);

    expect(result?.ingredients).toEqual([
      ...(product.ingredients ?? []),
      newIngredient,
    ]);
  });
});
