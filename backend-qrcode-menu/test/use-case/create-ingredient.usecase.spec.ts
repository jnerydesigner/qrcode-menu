import { CreateIngredientUseCase, CreateIngredientInput } from '@application/use-case/ingredient/create-ingredient.usecase';
import {
    INGREDIENT_REPOSITORY,
    IngredientRepository,
} from '@domain/repositories/ingredient.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { IngredientEntity } from '@domain/entities/ingredient.entity';

describe('CreateIngredientUseCase', () => {
    let createIngredientUseCase: CreateIngredientUseCase;
    let ingredientRepository: jest.Mocked<IngredientRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateIngredientUseCase,
                {
                    provide: INGREDIENT_REPOSITORY,
                    useValue: {
                        save: jest.fn(),
                        saveMany: jest.fn(),
                        findAll: jest.fn(),
                        findId: jest.fn(),
                        findManyByIds: jest.fn(),
                    } as jest.Mocked<IngredientRepository>,
                },
            ],
        }).compile();

        createIngredientUseCase = module.get<CreateIngredientUseCase>(CreateIngredientUseCase);
        ingredientRepository = module.get(INGREDIENT_REPOSITORY);
    });

    it('deve criar um novo ingrediente', async () => {
        const input: CreateIngredientInput = {
            name: 'Tomate',
            emoji: '🍅',
            color: '#FF0000',
        };

        const expectedIngredient = new IngredientEntity(
            input.emoji,
            input.color,
            input.name,
            null,
            null,
            '123',
        );

        ingredientRepository.save.mockResolvedValue(expectedIngredient);

        const result = await createIngredientUseCase.execute(input);

        expect(ingredientRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                name: input.name,
                emoji: input.emoji,
                color: input.color,
            }),
        );
        expect(result).toEqual(expectedIngredient);
    });

    it('deve propagar erro do repositório', async () => {
        const input: CreateIngredientInput = {
            name: 'Queijo',
            emoji: '🧀',
            color: '#FFFF00',
        };

        const error = new Error('Database error');
        ingredientRepository.save.mockRejectedValue(error);

        await expect(createIngredientUseCase.execute(input)).rejects.toThrow(error);
    });
});
