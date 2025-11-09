import { IngredientEntity } from '@domain/entities/ingredient.entity';
import { IngredientMapper } from '@domain/mappers/ingredient.mapper';
import { IngredientRepository } from '@domain/repositories/ingredient.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient as IngredientMongo } from '../schema/ingredient.schema';

@Injectable()
export class IngredientMongoRepository implements IngredientRepository {
  constructor(
    @InjectModel(IngredientMongo.name)
    private readonly ingredientModel: Model<IngredientMongo>,
  ) {}

  async save(ingredient: IngredientEntity): Promise<IngredientEntity> {
    const existingIngredient = await this.ingredientModel
      .findOne({ slug: ingredient.slug })
      .lean();

    if (existingIngredient) {
      return IngredientMapper.fromMongo(
        existingIngredient as IngredientMongo & {
          created_at?: Date;
        },
      );
    }

    const ingredientMapper = IngredientMapper.toMongo(ingredient);
    const created = new this.ingredientModel(ingredientMapper);
    const saved = await created.save();

    return IngredientMapper.fromMongo(saved.toObject());
  }

  async saveMany(ingredients: IngredientEntity[]): Promise<IngredientEntity[]> {
    const savedIngredients: IngredientEntity[] = [];

    for (const ingredient of ingredients) {
      const exists = await this.ingredientModel
        .findOne({ slug: ingredient.slug })
        .lean();

      if (!exists) {
        const ingredientMapper = IngredientMapper.toMongo(ingredient);
        const created = new this.ingredientModel(ingredientMapper);
        const saved = await created.save();

        savedIngredients.push(IngredientMapper.fromMongo(saved.toObject()));
      }
    }

    return savedIngredients;
  }

  async findAll(): Promise<IngredientEntity[]> {
    const ingredients = await this.ingredientModel.find().lean();

    return ingredients.map((ingredient) =>
      IngredientMapper.fromMongo(
        ingredient as IngredientMongo & { created_at?: Date },
      ),
    );
  }

  async findId(ingredientId: string): Promise<IngredientEntity> {
    const ingredientDoc = await this.ingredientModel
      .findById(ingredientId)
      .lean();

    if (!ingredientDoc) {
      throw new Error(`Ingredient with ID ${ingredientId} not found`);
    }

    return IngredientMapper.fromMongo(
      ingredientDoc as IngredientMongo & { created_at?: Date },
    );
  }
}
