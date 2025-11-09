import { PrismaService } from '@application/services/prisma.service';
import { IngredientEntity } from '@domain/entities/ingredient.entity';
import { IngredientMapper } from '@domain/mappers/ingredient.mapper';
import { IngredientRepository } from '@domain/repositories/ingredient.repository';

export class IngredientPrismaRepository implements IngredientRepository {
  constructor(private readonly prisma: PrismaService) {}
  findId(ingredientId: string): Promise<IngredientEntity> {
    throw new Error('Method not implemented.');
  }

  async save(ingredient: IngredientEntity): Promise<IngredientEntity> {
    const ingredientExists = await this.prisma.ingredient.findFirst({
      where: {
        slug: ingredient.slug,
      },
    });

    if (!ingredientExists) {
      const ingredientMapper = IngredientMapper.toPersistent(ingredient);
      const ingredientSave = await this.prisma.ingredient.create({
        data: ingredientMapper,
      });

      return IngredientMapper.toDomain(ingredientSave);
    }

    return IngredientMapper.toDomain(ingredientExists);
  }

  async saveMany(ingredients: IngredientEntity[]): Promise<IngredientEntity[]> {
    const ingredientsSave: IngredientEntity[] = [];
    for (const ingredient of ingredients) {
      const findIngredient = await this.prisma.ingredient.findFirst({
        where: {
          slug: ingredient.slug,
        },
      });

      if (!findIngredient) {
        const ingredientMapper = IngredientMapper.toPersistent(ingredient);
        const ingredientSave = await this.prisma.ingredient.create({
          data: ingredientMapper,
        });

        const ingredientDomain = IngredientMapper.toDomain(ingredientSave);
        ingredientsSave.push(ingredientDomain);
      }
    }

    return ingredientsSave;
  }

  async findAll(): Promise<IngredientEntity[]> {
    const findAllIngredients = await this.prisma.ingredient.findMany();

    return findAllIngredients.map((ingredient) =>
      IngredientMapper.toDomain(ingredient),
    );
  }
}
